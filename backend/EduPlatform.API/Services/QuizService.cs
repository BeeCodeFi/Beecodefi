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
                Description = quiz.Description,
                Difficulty = quiz.Difficulty,
                QuestionCount = quiz.Questions.Count,
                BestScore = bestScore
            });
        }

        return result;
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
                UserAnswer = userAnswer?.Text
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
                Score = a.Score,
                TotalQuestions = a.TotalQuestions,
                Percentage = Math.Round((double)a.Score / a.TotalQuestions * 100, 1),
                CompletedAt = a.CompletedAt
            })
            .AsNoTracking()
            .ToListAsync();
    }
}
