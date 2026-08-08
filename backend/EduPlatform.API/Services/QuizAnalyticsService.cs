using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class QuizAnalyticsService : IQuizAnalyticsService
{
    private readonly AppDbContext _db;

    public QuizAnalyticsService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<QuizAnalyticsDto> GetUserQuizAnalyticsAsync(int userId)
    {
        var attempts = await _db.QuizAttempts
            .Where(qa => qa.UserId == userId)
            .Include(qa => qa.Quiz)
            .ToListAsync();

        if (!attempts.Any())
        {
            return new QuizAnalyticsDto
            {
                TotalAttempts = 0,
                AverageScore = 0,
                BestScore = 0,
                WorstScore = 0,
                AverageTimeTaken = TimeSpan.Zero,
                FirstAttemptDate = DateTime.UtcNow,
                LastAttemptDate = DateTime.UtcNow,
                TopicPerformance = new List<TopicPerformanceDto>(),
                WeeklyPerformance = new List<WeeklyPerformanceDto>(),
                WeakAreas = new List<WeakAreaDto>()
            };
        }

        var topicPerformance = await GetTopicPerformanceAsync(userId);
        var weeklyPerformance = await GetWeeklyPerformanceAsync(userId);
        var weakAreas = await IdentifyWeakAreasAsync(userId);

        return new QuizAnalyticsDto
        {
            TotalAttempts = attempts.Count,
            AverageScore = attempts.Average(a => a.Score),
            BestScore = attempts.Max(a => a.Score),
            WorstScore = attempts.Min(a => a.Score),
            AverageTimeTaken = TimeSpan.Zero, // TimeTaken not available in current model
            FirstAttemptDate = attempts.Min(a => a.CompletedAt),
            LastAttemptDate = attempts.Max(a => a.CompletedAt),
            TopicPerformance = topicPerformance,
            WeeklyPerformance = weeklyPerformance,
            WeakAreas = weakAreas
        };
    }

    public async Task<List<QuizAttemptAnalyticsDto>> GetUserAttemptHistoryAsync(int userId, int limit = 20)
    {
        var attempts = await _db.QuizAttempts
            .Where(qa => qa.UserId == userId)
            .Include(qa => qa.Quiz)
            .OrderByDescending(qa => qa.CompletedAt)
            .Take(limit)
            .ToListAsync();

        return attempts.Select(a => new QuizAttemptAnalyticsDto
        {
            Id = a.Id,
            QuizTopic = a.Quiz.Topic,
            QuizTitle = a.Quiz.Title,
            Score = a.Score,
            TotalQuestions = a.TotalQuestions,
            TimeTaken = TimeSpan.Zero, // TimeTaken not available in current model
            AttemptDate = a.CompletedAt,
            Mode = "Practice", // Mode not available in current model
            QuestionPerformance = new List<QuestionPerformanceDto>() // Would need detailed question tracking
        }).ToList();
    }

    public async Task<List<TopicPerformanceDto>> GetTopicPerformanceAsync(int userId)
    {
        var attempts = await _db.QuizAttempts
            .Where(qa => qa.UserId == userId)
            .Include(qa => qa.Quiz)
            .ToListAsync();

        var topicGroups = attempts
            .GroupBy(a => a.Quiz.Topic)
            .Select(g => new TopicPerformanceDto
            {
                Topic = g.Key,
                Attempts = g.Count(),
                AverageScore = g.Average(a => a.Score),
                MasteryLevel = CalculateMasteryLevel(g.Average(a => a.Score), g.Count()),
                TotalQuestions = g.Sum(a => a.TotalQuestions),
                CorrectAnswers = g.Sum(a => (int)(a.Score / 100.0 * a.TotalQuestions))
            })
            .OrderByDescending(t => t.MasteryLevel)
            .ToList();

        return topicGroups;
    }

    public async Task<List<WeakAreaDto>> IdentifyWeakAreasAsync(int userId)
    {
        var topicPerformance = await GetTopicPerformanceAsync(userId);
        
        var weakAreas = topicPerformance
            .Where(t => t.MasteryLevel < 60) // Below 60% mastery
            .Select(t => new WeakAreaDto
            {
                Topic = t.Topic,
                Category = CategorizeTopic(t.Topic),
                AverageScore = t.AverageScore,
                Attempts = t.Attempts,
                Recommendation = GenerateRecommendation(t.Topic, t.AverageScore, t.Attempts)
            })
            .OrderBy(t => t.AverageScore)
            .ToList();

        return weakAreas;
    }

    public async Task<List<WeeklyPerformanceDto>> GetWeeklyPerformanceAsync(int userId, int weeks = 12)
    {
        var attempts = await _db.QuizAttempts
            .Where(qa => qa.UserId == userId && qa.CompletedAt >= DateTime.UtcNow.AddDays(-weeks * 7))
            .ToListAsync();

        var weeklyData = new List<WeeklyPerformanceDto>();

        for (int i = weeks - 1; i >= 0; i--)
        {
            var weekStart = DateTime.UtcNow.AddDays(-i * 7);
            var weekEnd = weekStart.AddDays(7);

            var weekAttempts = attempts
                .Where(a => a.CompletedAt >= weekStart && a.CompletedAt < weekEnd)
                .ToList();

            weeklyData.Add(new WeeklyPerformanceDto
            {
                WeekStart = weekStart.ToString("yyyy-MM-dd"),
                Attempts = weekAttempts.Count(),
                AverageScore = weekAttempts.Any() ? weekAttempts.Average(a => a.Score) : 0,
                TotalTimeMinutes = 0 // TimeTaken not available in current model
            });
        }

        return weeklyData;
    }

    private double CalculateMasteryLevel(double averageScore, int attempts)
    {
        // Consider both score and consistency (number of attempts)
        var baseScore = averageScore;
        var attemptBonus = Math.Min(attempts * 2, 20); // Up to 20% bonus for attempts
        
        return Math.Min(baseScore + attemptBonus, 100);
    }

    private string CategorizeTopic(string topic)
    {
        var lowerTopic = topic.ToLowerInvariant();
        
        if (lowerTopic.Contains("html") || lowerTopic.Contains("css"))
            return "Frontend Basics";
        if (lowerTopic.Contains("javascript") || lowerTopic.Contains("js"))
            return "JavaScript";
        if (lowerTopic.Contains("react") || lowerTopic.Contains("vue") || lowerTopic.Contains("angular"))
            return "Frontend Frameworks";
        if (lowerTopic.Contains("node") || lowerTopic.Contains("express"))
            return "Backend";
        if (lowerTopic.Contains("sql") || lowerTopic.Contains("database"))
            return "Database";
        if (lowerTopic.Contains("type") || lowerTopic.Contains("ts"))
            return "TypeScript";
        
        return "General";
    }

    private string GenerateRecommendation(string topic, double averageScore, int attempts)
    {
        if (attempts < 3)
            return $"Practice {topic} more frequently to build consistency";
        
        if (averageScore < 40)
            return $"Review fundamentals of {topic} and start with easier questions";
        
        if (averageScore < 60)
            return $"Focus on {topic} weak areas and review explanations for incorrect answers";
        
        if (averageScore < 80)
            return $"Good progress on {topic}. Try timed mode to improve speed";
        
        return $"Strong performance in {topic}. Try advanced questions or teach others to reinforce learning";
    }
}