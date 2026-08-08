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

    public async Task<PaginatedLeaderboardDto> GetLeaderboardAsync(int page = 1, int pageSize = 20, string timeframe = "all", string track = "all")
    {
        // Ensure valid page and pageSize values
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var now = DateTime.UtcNow;
        var startOfMonth = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);

        var userStatsQuery = _db.Users
            .Select(u => new
            {
                u.Id,
                u.Name,
                u.ProfileImageUrl,
                QuizzesCompleted = track == "all" 
                    ? _db.QuizAttempts.Where(a => a.UserId == u.Id).Select(a => a.QuizId).Distinct().Count() + 
                      _db.LessonQuizAttempts.Where(a => a.UserId == u.Id).Select(a => a.QuizTopic).Distinct().Count()
                    : _db.LessonQuizAttempts.Where(a => a.UserId == u.Id && a.QuizTopic.ToLower().Contains(track.ToLower())).Select(a => a.QuizTopic).Distinct().Count(),
                LessonsCompleted = track == "all"
                    ? _db.TutorialProgress.Count(p => p.UserId == u.Id)
                    : _db.TutorialProgress.Count(p => p.UserId == u.Id && p.TutorialSlug.ToLower() == track.ToLower()),
                AverageScore = track == "all" 
                    ? ((_db.QuizAttempts.Where(a => a.UserId == u.Id).Any() || _db.LessonQuizAttempts.Where(a => a.UserId == u.Id).Any())
                        ? (_db.QuizAttempts.Where(a => a.UserId == u.Id).Sum(a => (double)a.Score / a.TotalQuestions * 100) +
                           _db.LessonQuizAttempts.Where(a => a.UserId == u.Id).Sum(a => (double)a.Score / a.TotalQuestions * 100)) /
                          (_db.QuizAttempts.Count(a => a.UserId == u.Id) + _db.LessonQuizAttempts.Count(a => a.UserId == u.Id))
                        : 0)
                    : (_db.LessonQuizAttempts.Where(a => a.UserId == u.Id && a.QuizTopic.ToLower().Contains(track.ToLower())).Any()
                        ? _db.LessonQuizAttempts.Where(a => a.UserId == u.Id && a.QuizTopic.ToLower().Contains(track.ToLower())).Sum(a => (double)a.Score / a.TotalQuestions * 100) /
                          _db.LessonQuizAttempts.Count(a => a.UserId == u.Id && a.QuizTopic.ToLower().Contains(track.ToLower()))
                        : 0),
                CurrentStreak = u.CurrentStreak,
                // If "monthly", calculate XP from activities in current month
                TotalPoints = timeframe == "monthly"
                    ? ((_db.LessonQuizAttempts.Where(a => a.UserId == u.Id && a.CompletedAt >= startOfMonth && (track == "all" || a.QuizTopic.ToLower().Contains(track.ToLower()))).Select(a => a.QuizTopic).Distinct().Count() * 10) +
                       (_db.TutorialProgress.Count(p => p.UserId == u.Id && p.CompletedAt >= startOfMonth && (track == "all" || p.TutorialSlug.ToLower() == track.ToLower())) * 50))
                    : (track == "all" ? u.TotalXP : 
                        ((_db.LessonQuizAttempts.Where(a => a.UserId == u.Id && a.QuizTopic.ToLower().Contains(track.ToLower())).Select(a => a.QuizTopic).Distinct().Count() * 10) +
                        (_db.TutorialProgress.Count(p => p.UserId == u.Id && p.TutorialSlug.ToLower() == track.ToLower()) * 50))) // 50 XP per lesson based on new XP scale
            })
            // Filter out users with 0 points if filtering by timeframe or track to keep the leaderboard clean
            .Where(u => u.TotalPoints > 0 || (timeframe == "all" && track == "all"))
            .OrderByDescending(u => u.TotalPoints)
            .ThenByDescending(u => u.CurrentStreak);

        var totalCount = await userStatsQuery.CountAsync();
        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        var userStats = await userStatsQuery
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var startRank = ((page - 1) * pageSize) + 1;
        var leaderboard = userStats.Select((u, index) => new LeaderboardEntryDto
        {
            Rank = startRank + index,
            UserName = u.Name,
            TotalPoints = u.TotalPoints,
            QuizzesCompleted = u.QuizzesCompleted,
            LessonsCompleted = u.LessonsCompleted,
            AverageScore = Math.Round(u.AverageScore, 1),
            CurrentStreak = u.CurrentStreak,
            ProfileImageUrl = u.ProfileImageUrl
        }).ToList();

        return new PaginatedLeaderboardDto
        {
            Items = leaderboard,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize,
            TotalPages = totalPages,
            HasNextPage = page < totalPages,
            HasPreviousPage = page > 1
        };
    }

    public async Task<UserStatsDto> GetMyStatsAsync(int userId)
    {
        // Count unique quizzes, not total attempts
        var quizzesCompleted = await _db.QuizAttempts.Where(a => a.UserId == userId).Select(a => a.QuizId).Distinct().CountAsync() +
                               await _db.LessonQuizAttempts.Where(a => a.UserId == userId).Select(a => a.QuizTopic).Distinct().CountAsync();
        var lessonsCompleted = await _db.TutorialProgress.CountAsync(p => p.UserId == userId);
        
        var hasQuizzes = await _db.QuizAttempts.Where(a => a.UserId == userId).AnyAsync() ||
                         await _db.LessonQuizAttempts.Where(a => a.UserId == userId).AnyAsync();
        
        var averageScore = hasQuizzes
            ? (await _db.QuizAttempts.Where(a => a.UserId == userId).SumAsync(a => (double)a.Score / a.TotalQuestions * 100) +
               await _db.LessonQuizAttempts.Where(a => a.UserId == userId).SumAsync(a => (double)a.Score / a.TotalQuestions * 100)) /
              (await _db.QuizAttempts.CountAsync(a => a.UserId == userId) + await _db.LessonQuizAttempts.CountAsync(a => a.UserId == userId))
            : 0;

        var user = await _db.Users.FindAsync(userId);
        var currentStreak = user?.CurrentStreak ?? 0;
        var longestStreak = user?.LongestStreak ?? 0;

        // Points: 10 points per unique quiz + 5 points per lesson
        var totalPoints = (quizzesCompleted * 10) + (lessonsCompleted * 5);

        // Calculate global rank - must use same distinct counting logic
        var usersWithMorePoints = await _db.Users
            .Where(u => (_db.QuizAttempts.Where(a => a.UserId == u.Id).Select(a => a.QuizId).Distinct().Count() * 10) +
                        (_db.LessonQuizAttempts.Where(a => a.UserId == u.Id).Select(a => a.QuizTopic).Distinct().Count() * 10) +
                        (_db.TutorialProgress.Count(p => p.UserId == u.Id) * 5) > totalPoints)
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
