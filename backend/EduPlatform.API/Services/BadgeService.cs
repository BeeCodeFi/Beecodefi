using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class BadgeService : IBadgeService
{
    private readonly AppDbContext _db;

    public BadgeService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<BadgeDto>> GetAllBadgesAsync(int? userId)
    {
        var badges = await _db.Badges.ToListAsync();
        var userBadges = userId.HasValue 
            ? await _db.UserBadges.Where(ub => ub.UserId == userId.Value).ToListAsync()
            : new List<UserBadge>();

        var result = new List<BadgeDto>();

        foreach (var badge in badges)
        {
            var userBadge = userBadges.FirstOrDefault(ub => ub.BadgeId == badge.Id);
            var progress = userId.HasValue ? await CalculateProgressAsync(userId.Value, badge.Requirement) : 0;

            result.Add(new BadgeDto
            {
                Id = badge.Id,
                Name = badge.Name,
                Description = badge.Description,
                Icon = badge.Icon,
                Category = badge.Category,
                Color = badge.Color,
                IsUnlocked = userBadge != null,
                UnlockedAt = userBadge?.UnlockedAt,
                Progress = progress,
                RequiredCount = badge.RequiredCount
            });
        }

        return result;
    }

    public async Task<List<BadgeDto>> GetMyBadgesAsync(int userId)
    {
        var userBadges = await _db.UserBadges
            .Where(ub => ub.UserId == userId)
            .Include(ub => ub.Badge)
            .OrderByDescending(ub => ub.UnlockedAt)
            .ToListAsync();

        return userBadges.Select(ub => new BadgeDto
        {
            Id = ub.Badge.Id,
            Name = ub.Badge.Name,
            Description = ub.Badge.Description,
            Icon = ub.Badge.Icon,
            Category = ub.Badge.Category,
            Color = ub.Badge.Color,
            IsUnlocked = true,
            UnlockedAt = ub.UnlockedAt,
            Progress = ub.Badge.RequiredCount,
            RequiredCount = ub.Badge.RequiredCount
        }).ToList();
    }

    public async Task<List<BadgeDto>> CheckAndUnlockBadgesAsync(int userId)
    {
        var newlyUnlocked = new List<BadgeDto>();

        var allBadges = await _db.Badges.ToListAsync();
        var userBadgeIds = await _db.UserBadges
            .Where(ub => ub.UserId == userId)
            .Select(ub => ub.BadgeId)
            .ToListAsync();

        foreach (var badge in allBadges.Where(b => !userBadgeIds.Contains(b.Id)))
        {
            var progress = await CalculateProgressAsync(userId, badge.Requirement);
            
            if (progress >= badge.RequiredCount)
            {
                var userBadge = new UserBadge
                {
                    UserId = userId,
                    BadgeId = badge.Id,
                    UnlockedAt = DateTime.UtcNow
                };
                _db.UserBadges.Add(userBadge);

                newlyUnlocked.Add(new BadgeDto
                {
                    Id = badge.Id,
                    Name = badge.Name,
                    Description = badge.Description,
                    Icon = badge.Icon,
                    Category = badge.Category,
                    Color = badge.Color,
                    IsUnlocked = true,
                    UnlockedAt = userBadge.UnlockedAt,
                    Progress = progress,
                    RequiredCount = badge.RequiredCount
                });
            }
        }

        if (newlyUnlocked.Any())
        {
            await _db.SaveChangesAsync();
        }

        return newlyUnlocked;
    }

    private async Task<int> CalculateProgressAsync(int userId, string requirement)
    {
        return requirement switch
        {
            "first_quiz" => (await _db.QuizAttempts.CountAsync(a => a.UserId == userId) +
                             await _db.LessonQuizAttempts.CountAsync(a => a.UserId == userId)) > 0 ? 1 : 0,
            "5_quizzes" => await _db.QuizAttempts.CountAsync(a => a.UserId == userId) +
                           await _db.LessonQuizAttempts.CountAsync(a => a.UserId == userId),
            "10_quizzes" => await _db.QuizAttempts.CountAsync(a => a.UserId == userId) +
                            await _db.LessonQuizAttempts.CountAsync(a => a.UserId == userId),
            "25_quizzes" => await _db.QuizAttempts.CountAsync(a => a.UserId == userId) +
                            await _db.LessonQuizAttempts.CountAsync(a => a.UserId == userId),
            "50_quizzes" => await _db.QuizAttempts.CountAsync(a => a.UserId == userId) +
                            await _db.LessonQuizAttempts.CountAsync(a => a.UserId == userId),
            "first_lesson" => await _db.TutorialProgress.CountAsync(p => p.UserId == userId) > 0 ? 1 : 0,
            "10_lessons" => await _db.TutorialProgress.CountAsync(p => p.UserId == userId),
            "25_lessons" => await _db.TutorialProgress.CountAsync(p => p.UserId == userId),
            "50_lessons" => await _db.TutorialProgress.CountAsync(p => p.UserId == userId),
            "100_lessons" => await _db.TutorialProgress.CountAsync(p => p.UserId == userId),
            "perfect_quiz" => (await _db.QuizAttempts
                .Where(a => a.UserId == userId && a.Score == a.TotalQuestions)
                .CountAsync() +
                await _db.LessonQuizAttempts
                .Where(a => a.UserId == userId && a.Score == a.TotalQuestions)
                .CountAsync()) > 0 ? 1 : 0,
            "3_day_streak" => await GetUserStreakAsync(userId),
            "7_day_streak" => await GetUserStreakAsync(userId),
            "30_day_streak" => await GetUserStreakAsync(userId),
            "complete_html" => await _db.TutorialProgress
                .Where(p => p.UserId == userId && p.TutorialSlug == "html")
                .CountAsync(),
            "complete_css" => await _db.TutorialProgress
                .Where(p => p.UserId == userId && p.TutorialSlug == "css")
                .CountAsync(),
            "complete_javascript" => await _db.TutorialProgress
                .Where(p => p.UserId == userId && p.TutorialSlug == "javascript")
                .CountAsync(),
            "complete_foundations" => await GetFoundationsProgressAsync(userId),
            _ => 0
        };
    }

    private async Task<int> GetFoundationsProgressAsync(int userId)
    {
        var htmlCount = await _db.TutorialProgress
            .Where(p => p.UserId == userId && p.TutorialSlug == "html")
            .CountAsync();
        var cssCount = await _db.TutorialProgress
            .Where(p => p.UserId == userId && p.TutorialSlug == "css")
            .CountAsync();
        var jsCount = await _db.TutorialProgress
            .Where(p => p.UserId == userId && p.TutorialSlug == "javascript")
            .CountAsync();
        
        int completed = 0;
        if (htmlCount >= 11) completed++; // HTML has 11 lessons
        if (cssCount >= 18) completed++;  // CSS has 18 lessons
        if (jsCount >= 24) completed++;   // JS has 24 lessons
        
        return completed;
    }

    private async Task<int> GetUserStreakAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId);
        return user?.CurrentStreak ?? 0;
    }
}
