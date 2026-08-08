using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class CustomQuizService : ICustomQuizService
{
    private readonly AppDbContext _db;
    private readonly Random _random = new();

    public CustomQuizService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<CustomQuizDto> CreateCustomQuizAsync(int userId, CustomQuizRequestDto request)
    {
        // Validate request
        if (request.Topics.Length == 0)
            throw new ArgumentException("At least one topic must be specified");
        
        if (request.QuestionCount < 1 || request.QuestionCount > 50)
            throw new ArgumentException("Question count must be between 1 and 50");

        // Get questions matching criteria
        var questionsQuery = _db.Questions
            .Include(q => q.Quiz)
            .Include(q => q.Answers)
            .Where(q => request.Topics.Contains(q.Quiz.Topic));

        if (request.Difficulties.Length > 0)
        {
            questionsQuery = questionsQuery.Where(q => request.Difficulties.Contains(q.Quiz.Difficulty));
        }

        var availableQuestions = await questionsQuery.ToListAsync();

        if (availableQuestions.Count == 0)
            throw new ArgumentException("No questions found matching the specified criteria");

        // Randomly select questions
        var selectedQuestions = availableQuestions
            .OrderBy(_ => _random.Next())
            .Take(request.QuestionCount)
            .ToList();

        // Generate unique share code
        string shareCode;
        do
        {
            shareCode = GenerateShareCode();
        } while (await _db.CustomQuizzes.AnyAsync(cq => cq.ShareCode == shareCode));

        // Create custom quiz
        var customQuiz = new CustomQuiz
        {
            UserId = userId,
            Title = request.Title ?? $"Custom Quiz - {string.Join(", ", request.Topics)}",
            Description = request.Description ?? $"Custom quiz with {request.QuestionCount} questions",
            Topic = string.Join(", ", request.Topics),
            Difficulty = request.Difficulties.Length > 0 
                ? (request.Difficulties.Length == 1 ? request.Difficulties[0] : "Mixed") 
                : "Mixed",
            QuestionCount = selectedQuestions.Count,
            ShareCode = shareCode,
            IsPublic = false,
            CreatedAt = DateTime.UtcNow
        };

        _db.CustomQuizzes.Add(customQuiz);
        await _db.SaveChangesAsync();

        // Add questions to custom quiz
        foreach (var (question, index) in selectedQuestions.Select((q, i) => (q, i)))
        {
            var customQuizQuestion = new CustomQuizQuestion
            {
                CustomQuizId = customQuiz.Id,
                QuestionId = question.Id,
                DisplayOrder = index
            };
            _db.CustomQuizQuestions.Add(customQuizQuestion);
        }

        await _db.SaveChangesAsync();

        return MapToDto(customQuiz);
    }

    public async Task<CustomQuizDto?> GetCustomQuizByIdAsync(int id, int userId)
    {
        var customQuiz = await _db.CustomQuizzes
            .Include(cq => cq.Questions)
            .ThenInclude(cqq => cqq.Question)
            .ThenInclude(q => q.Answers)
            .FirstOrDefaultAsync(cq => cq.Id == id && cq.UserId == userId);

        return customQuiz == null ? null : MapToDto(customQuiz);
    }

    public async Task<CustomQuizDto?> GetCustomQuizByShareCodeAsync(string shareCode)
    {
        var customQuiz = await _db.CustomQuizzes
            .Include(cq => cq.Questions)
            .ThenInclude(cqq => cqq.Question)
            .ThenInclude(q => q.Answers)
            .Include(cq => cq.User)
            .FirstOrDefaultAsync(cq => cq.ShareCode == shareCode && cq.IsPublic);

        if (customQuiz == null) return null;

        // Increment usage count
        customQuiz.TimesTaken++;
        await _db.SaveChangesAsync();

        return MapToDto(customQuiz);
    }

    public async Task<List<CustomQuizDto>> GetUserCustomQuizzesAsync(int userId)
    {
        var customQuizzes = await _db.CustomQuizzes
            .Where(cq => cq.UserId == userId)
            .OrderByDescending(cq => cq.CreatedAt)
            .ToListAsync();

        return customQuizzes.Select(MapToDto).ToList();
    }

    public async Task<List<SharedQuizDto>> GetPublicCustomQuizzesAsync(int limit = 20)
    {
        var publicQuizzes = await _db.CustomQuizzes
            .Include(cq => cq.User)
            .Where(cq => cq.IsPublic)
            .OrderByDescending(cq => cq.TimesTaken)
            .ThenByDescending(cq => cq.CreatedAt)
            .Take(limit)
            .ToListAsync();

        return publicQuizzes.Select(cq => new SharedQuizDto
        {
            Id = cq.Id,
            Title = cq.Title,
            Description = cq.Description ?? "",
            Topic = cq.Topic,
            Difficulty = cq.Difficulty,
            QuestionCount = cq.QuestionCount,
            CreatedBy = cq.User.Name,
            CreatedAt = cq.CreatedAt,
            TimesTaken = cq.TimesTaken
        }).ToList();
    }

    public async Task<bool> DeleteCustomQuizAsync(int id, int userId)
    {
        var customQuiz = await _db.CustomQuizzes
            .FirstOrDefaultAsync(cq => cq.Id == id && cq.UserId == userId);

        if (customQuiz == null) return false;

        _db.CustomQuizzes.Remove(customQuiz);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> IncrementQuizUsageAsync(int id)
    {
        var customQuiz = await _db.CustomQuizzes.FindAsync(id);
        if (customQuiz == null) return false;

        customQuiz.TimesTaken++;
        await _db.SaveChangesAsync();
        return true;
    }

    private string GenerateShareCode()
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return new string(Enumerable.Repeat(chars, 8)
            .Select(s => s[_random.Next(s.Length)]).ToArray());
    }

    private CustomQuizDto MapToDto(CustomQuiz customQuiz)
    {
        return new CustomQuizDto
        {
            Id = customQuiz.Id,
            Title = customQuiz.Title,
            Description = customQuiz.Description ?? "",
            Topic = customQuiz.Topic,
            Category = "Custom", // Custom quizzes don't have traditional categories
            Difficulty = customQuiz.Difficulty,
            QuestionCount = customQuiz.QuestionCount,
            ShareCode = customQuiz.ShareCode,
            CreatedAt = customQuiz.CreatedAt,
            IsPublic = customQuiz.IsPublic
        };
    }
}