using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class QuizService : IQuizService
{
    private readonly AppDbContext _db;

    public QuizService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<QuizTopicDto>> GetTopicsAsync(int? userId = null)
    {
        var quizzes = await _db.Quizzes
            .Include(q => q.Questions)
            .AsNoTracking()
            .ToListAsync();

        // Define the correct learning order for quizzes
        var orderMap = new Dictionary<string, int>
        {
            // HTML - Progressive difficulty
            ["html-basics"] = 1,
            ["html-links-media"] = 2,
            ["html-lists-tables"] = 3,
            ["html-forms"] = 4,
            ["html-semantic"] = 5,
            ["html-attributes"] = 6,
            ["html-media-embeds"] = 7,
            ["html-accessibility"] = 8,
            ["html-advanced"] = 9,
            ["html-canvas"] = 10,
            ["html-svg"] = 11,
            ["html-web-components"] = 12,
            ["html-drag-drop"] = 13,
            ["html-web-storage"] = 14,
            ["html-geolocation"] = 15,
            // CSS - Progressive difficulty
            ["css-basics"] = 16,
            ["css-box-model"] = 17,
            ["css-selectors"] = 18,
            ["css-flexbox-grid"] = 19,
            ["css-visual"] = 20,
            ["css-advanced"] = 21,
            ["css-positioning"] = 22,
            ["css-transforms"] = 23,
            ["css-variables"] = 24,
            // JavaScript - Progressive difficulty
            ["js-basics"] = 25,
            ["js-arrays-data"] = 26,
            ["js-functions-scope"] = 27,
            ["js-dom-events"] = 28,
            ["js-es6"] = 29,
            ["js-advanced"] = 30,
            ["js-objects-classes"] = 31,
            ["js-async"] = 32,
            ["js-modules-apis"] = 33
        };

        var result = new List<QuizTopicDto>();

        foreach (var quiz in quizzes)
        {
            int? bestScore = null;
            if (userId.HasValue)
            {
                bestScore = await _db.QuizAttempts
                    .Where(a => a.QuizId == quiz.Id && a.UserId == userId.Value)
                    .MaxAsync(a => (int?)a.Score);
            }

            result.Add(new QuizTopicDto
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Topic = quiz.Topic,
                Category = quiz.Category,
                Description = quiz.Description,
                Difficulty = quiz.Difficulty,
                QuestionCount = quiz.Questions.Count,
                BestScore = bestScore
            });
        }

        // Sort by the defined order, with fallback to ID for any unmapped topics
        return result.OrderBy(r => orderMap.TryGetValue(r.Topic, out var order) ? order : 999).ToList();
    }

    public async Task<List<QuizQuestionDto>> GetQuestionsByTopicAsync(string topic)
    {
        var quiz = await _db.Quizzes
            .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
            .AsNoTracking()
            .FirstOrDefaultAsync(q => q.Topic.ToLower() == topic.ToLower())
            ?? throw new KeyNotFoundException($"Quiz for topic '{topic}' not found");

        return quiz.Questions.Select(q => new QuizQuestionDto
        {
            Id = q.Id,
            Text = q.Text,
            CodeSnippet = q.CodeSnippet,
            Answers = q.Answers.Select(a => new QuizAnswerDto
            {
                Id = a.Id,
                Text = a.Text
            }).OrderBy(_ => Guid.NewGuid()).ToList()
        }).ToList();
    }

    public async Task<QuizResultDto> SubmitQuizAsync(SubmitQuizDto dto, int? userId = null)
    {
        var quiz = await _db.Quizzes
            .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
            .FirstOrDefaultAsync(q => q.Id == dto.QuizId)
            ?? throw new KeyNotFoundException("Quiz not found");

        var results = new List<QuestionResultDto>();
        int score = 0;

        foreach (var question in quiz.Questions)
        {
            var correctAnswer = question.Answers.First(a => a.IsCorrect);
            dto.Answers.TryGetValue(question.Id, out var userAnswerId);
            var userAnswer = question.Answers.FirstOrDefault(a => a.Id == userAnswerId);
            var isCorrect = userAnswerId == correctAnswer.Id;

            if (isCorrect) score++;

            results.Add(new QuestionResultDto
            {
                QuestionId = question.Id,
                QuestionText = question.Text,
                IsCorrect = isCorrect,
                CorrectAnswer = correctAnswer.Text,
                UserAnswer = userAnswer?.Text,
                Explanation = question.Explanation
            });
        }

        if (userId.HasValue)
        {
            _db.QuizAttempts.Add(new QuizAttempt
            {
                UserId = userId.Value,
                QuizId = dto.QuizId,
                Score = score,
                TotalQuestions = quiz.Questions.Count,
                CompletedAt = DateTime.UtcNow
            });
            await _db.SaveChangesAsync();
        }

        return new QuizResultDto
        {
            Score = score,
            TotalQuestions = quiz.Questions.Count,
            Percentage = Math.Round((double)score / quiz.Questions.Count * 100, 1),
            Results = results
        };
    }

    public async Task<List<QuizAttemptDto>> GetHistoryAsync(int userId)
    {
        return await _db.QuizAttempts
            .Where(a => a.UserId == userId)
            .Include(a => a.Quiz)
            .OrderByDescending(a => a.CompletedAt)
            .Select(a => new QuizAttemptDto
            {
                Id = a.Id,
                QuizTitle = a.Quiz.Title,
                Topic = a.Quiz.Topic,
                Category = a.Quiz.Category,
                Score = a.Score,
                TotalQuestions = a.TotalQuestions,
                Percentage = Math.Round((double)a.Score / a.TotalQuestions * 100, 1),
                CompletedAt = a.CompletedAt
            })
            .AsNoTracking()
            .ToListAsync();
    }
}
