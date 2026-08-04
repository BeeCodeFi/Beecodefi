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
            .OrderBy(q => q.DisplayOrder)
            .ThenBy(q => q.Id)
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
                Category = quiz.Category,
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

    public async Task<QuizResultDto> SubmitLessonQuizAsync(SubmitLessonQuizDto dto, int? userId = null)
    {
        Console.WriteLine($"[QuizService] SubmitLessonQuizAsync called - UserId: {userId}, Topic: {dto.QuizTopic}");
        
        if (userId.HasValue)
        {
            try
            {
                var attempt = new LessonQuizAttempt
                {
                    UserId = userId.Value,
                    QuizTopic = dto.QuizTopic,
                    QuizTitle = dto.QuizTitle,
                    Category = dto.Category,
                    Score = dto.Score,
                    TotalQuestions = dto.TotalQuestions,
                    CompletedAt = DateTime.UtcNow
                };
                
                Console.WriteLine($"[QuizService] Adding LessonQuizAttempt to database...");
                _db.LessonQuizAttempts.Add(attempt);
                
                Console.WriteLine($"[QuizService] Saving changes to database...");
                await _db.SaveChangesAsync();
                
                Console.WriteLine($"[QuizService] Successfully saved lesson quiz attempt with ID: {attempt.Id}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[QuizService ERROR] Failed to save lesson quiz: {ex.Message}");
                Console.WriteLine($"[QuizService ERROR] Inner exception: {ex.InnerException?.Message}");
                throw;
            }
        }
        else
        {
            Console.WriteLine($"[QuizService] No userId provided, skipping database save");
        }

        return new QuizResultDto
        {
            Score = dto.Score,
            TotalQuestions = dto.TotalQuestions,
            Percentage = Math.Round((double)dto.Score / dto.TotalQuestions * 100, 1),
            Results = new List<QuestionResultDto>()
        };
    }

    public async Task<bool> CheckLessonQuizTableExistsAsync()
    {
        try
        {
            await _db.LessonQuizAttempts.AnyAsync();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<int> GetLessonQuizCountAsync(int? userId)
    {
        try
        {
            if (userId.HasValue)
            {
                return await _db.LessonQuizAttempts.CountAsync(q => q.UserId == userId.Value);
            }
            return await _db.LessonQuizAttempts.CountAsync();
        }
        catch
        {
            return -1;
        }
    }

    public async Task<PaginatedQuizHistoryDto> GetHistoryAsync(int userId, int page = 1, int pageSize = 10)
    {
        Console.WriteLine($"[QuizService] GetHistoryAsync called for user {userId}");
        
        // Ensure valid page and pageSize values
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        try
        {
            // Get regular quiz attempts
            var quizAttempts = await _db.QuizAttempts
                .Where(a => a.UserId == userId)
                .Include(a => a.Quiz)
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
                .ToListAsync();

            Console.WriteLine($"[QuizService] Found {quizAttempts.Count} regular quiz attempts");

            // Get lesson quiz attempts
            var lessonQuizAttempts = await _db.LessonQuizAttempts
                .Where(a => a.UserId == userId)
                .Select(a => new QuizAttemptDto
                {
                    Id = -a.Id, // Negative ID to distinguish from regular quizzes
                    QuizTitle = a.QuizTitle,
                    Topic = a.QuizTopic,
                    Category = a.Category,
                    Score = a.Score,
                    TotalQuestions = a.TotalQuestions,
                    Percentage = Math.Round((double)a.Score / a.TotalQuestions * 100, 1),
                    CompletedAt = a.CompletedAt
                })
                .ToListAsync();

            Console.WriteLine($"[QuizService] Found {lessonQuizAttempts.Count} lesson quiz attempts");

            // Combine both lists and sort by completion date
            var combinedList = quizAttempts
                .Concat(lessonQuizAttempts)
                .OrderByDescending(a => a.CompletedAt)
                .ToList();

            var totalCount = combinedList.Count;
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var items = combinedList
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            Console.WriteLine($"[QuizService] Returning {items.Count} items out of {totalCount} total");

            return new PaginatedQuizHistoryDto
            {
                Items = items,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                TotalPages = totalPages,
                HasNextPage = page < totalPages,
                HasPreviousPage = page > 1
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[QuizService ERROR] GetHistoryAsync failed: {ex.Message}");
            Console.WriteLine($"[QuizService ERROR] Inner: {ex.InnerException?.Message}");
            throw;
        }
    }
}
