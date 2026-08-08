using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class XPService : IXPService
{
    private readonly AppDbContext _db;

    public XPService(AppDbContext db)
    {
        _db = db;
    }

    public async Task AddXPAsync(int userId, int amount, string reason)
    {
        if (amount <= 0) return;

        var user = await _db.Users.FindAsync(userId);
        if (user == null) return;

        user.TotalXP += amount;

        // Log it as RecentActivity
        var activity = new RecentActivity
        {
            UserId = userId,
            TutorialSlug = "system",
            LessonSlug = "xp",
            TutorialTitle = "Earned XP",
            LessonTitle = reason,
            Timestamp = DateTime.UtcNow
        };
        _db.RecentActivities.Add(activity);

        await _db.SaveChangesAsync();
    }

    public async Task<int> CalculateXPWithMultiplierAsync(int userId, int baseAmount)
    {
        if (baseAmount <= 0) return 0;

        var multiplier = await GetStreakMultiplierAsync(userId);
        var finalAmount = (int)(baseAmount * multiplier);
        
        return finalAmount;
    }

    public async Task<double> GetStreakMultiplierAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId);
        if (user == null) return 1.0;

        // Streak-based multipliers:
        // 1-3 day streak: 1.0x (no bonus)
        // 4-7 day streak: 1.25x
        // 8-14 day streak: 1.5x
        // 15-30 day streak: 1.75x
        // 31+ day streak: 2.0x
        
        return user.CurrentStreak switch
        {
            >= 31 => 2.0,
            >= 15 => 1.75,
            >= 8 => 1.5,
            >= 4 => 1.25,
            _ => 1.0
        };
    }

    public async Task<XPInfoDto> GetXPInfoAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId);
        if (user == null)
        {
            return new XPInfoDto();
        }

        var streakMultiplier = await GetStreakMultiplierAsync(userId);
        
        // Calculate level based on XP (level = sqrt(XP / 100))
        var level = (int)Math.Sqrt(user.TotalXP / 100.0) + 1;
        var xpForCurrentLevel = (int)Math.Pow((level - 1), 2) * 100;
        var xpToNextLevel = (int)Math.Pow(level, 2) * 100 - xpForCurrentLevel;

        // Daily XP goal: 100 XP per day
        var today = DateTime.UtcNow.Date;
        var dailyXPEarned = await _db.RecentActivities
            .Where(ra => ra.UserId == userId && 
                       ra.TutorialSlug == "system" && 
                       ra.LessonSlug == "xp" &&
                       ra.Timestamp >= today)
            .CountAsync() * 10; // Estimate 10 XP per activity

        // Weekly XP goal: 500 XP per week
        var weekAgo = DateTime.UtcNow.Date.AddDays(-7);
        var weeklyXPEarned = await _db.RecentActivities
            .Where(ra => ra.UserId == userId && 
                       ra.TutorialSlug == "system" && 
                       ra.LessonSlug == "xp" &&
                       ra.Timestamp >= weekAgo)
            .CountAsync() * 10; // Estimate 10 XP per activity

        return new XPInfoDto
        {
            TotalXP = user.TotalXP,
            Level = level,
            XPToNextLevel = xpToNextLevel,
            XPForCurrentLevel = user.TotalXP - xpForCurrentLevel,
            StreakMultiplier = streakMultiplier,
            CurrentStreak = user.CurrentStreak,
            DailyXPGoal = 100,
            DailyXPEarned = dailyXPEarned,
            WeeklyXPGoal = 500,
            WeeklyXPEarned = weeklyXPEarned
        };
    }
}
