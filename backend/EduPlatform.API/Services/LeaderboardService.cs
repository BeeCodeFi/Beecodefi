using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class LeaderboardService : ILeaderboardService
{
    private readonly AppDbContext _db;

    public LeaderboardService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<LeaderboardEntryDto>> GetLeaderboardAsync(int limit)
    {
        var userStats = await _db.Users
            .Select(u => new
            {
                u.Id,
                u.Name,
                u.ProfileImageUrl,
                QuizzesCompleted = _db.QuizAttempts.Count(a => a.UserId == u.Id),
                LessonsCompleted = _db.TutorialProgress.Count(p => p.UserId == u.Id),
                AverageScore = _db.QuizAttempts.Where(a => a.UserId == u.Id).Any()
                    ? _db.QuizAttempts.Where(a => a.UserId == u.Id).Average(a => (double)a.Score / a.TotalQuestions * 100)
                    : 0,
                CurrentStreak = u.CurrentStreak,
                TotalPoints = _db.QuizAttempts.Where(a => a.UserId == u.Id).Sum(a => a.Score * 10) +
                              _db.TutorialProgress.Count(p => p.UserId == u.Id) * 5
            })
            .OrderByDescending(u => u.TotalPoints)
            .ThenByDescending(u => u.CurrentStreak)
            .Take(limit)
            .ToListAsync();

        var leaderboard = userStats.Select((u, index) => new LeaderboardEntryDto
        {
            Rank = index + 1,
            UserName = u.Name,
            TotalPoints = u.TotalPoints,
            QuizzesCompleted = u.QuizzesCompleted,
            LessonsCompleted = u.LessonsCompleted,
            AverageScore = Math.Round(u.AverageScore, 1),
            CurrentStreak = u.CurrentStreak,
            ProfileImageUrl = u.ProfileImageUrl
        }).ToList();

        return leaderboard;
    }

    public async Task<UserStatsDto> GetMyStatsAsync(int userId)
    {
        var quizzesCompleted = await _db.QuizAttempts.CountAsync(a => a.UserId == userId);
        var lessonsCompleted = await _db.TutorialProgress.CountAsync(p => p.UserId == userId);
        var averageScore = await _db.QuizAttempts.Where(a => a.UserId == userId).AnyAsync()
            ? await _db.QuizAttempts.Where(a => a.UserId == userId).AverageAsync(a => (double)a.Score / a.TotalQuestions * 100)
            : 0;

        var user = await _db.Users.FindAsync(userId);
        var currentStreak = user?.CurrentStreak ?? 0;
        var longestStreak = user?.LongestStreak ?? 0;

        var totalPoints = await _db.QuizAttempts.Where(a => a.UserId == userId).SumAsync(a => a.Score * 10) +
                          lessonsCompleted * 5;

        // Calculate global rank
        var usersWithMorePoints = await _db.Users
            .Where(u => _db.QuizAttempts.Where(a => a.UserId == u.Id).Sum(a => a.Score * 10) +
                        _db.TutorialProgress.Count(p => p.UserId == u.Id) * 5 > totalPoints)
            .CountAsync();

        var globalRank = usersWithMorePoints + 1;

        return new UserStatsDto
        {
            TotalPoints = totalPoints,
            QuizzesCompleted = quizzesCompleted,
            LessonsCompleted = lessonsCompleted,
            AverageScore = Math.Round(averageScore, 1),
            CurrentStreak = currentStreak,
            LongestStreak = longestStreak,
            GlobalRank = globalRank
        };
    }
}
