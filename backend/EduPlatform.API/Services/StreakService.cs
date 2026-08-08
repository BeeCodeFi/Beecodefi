using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class StreakService : IStreakService
{
    private readonly AppDbContext _db;
    private readonly IBadgeService _badgeService;

    public StreakService(AppDbContext db, IBadgeService badgeService)
    {
        _db = db;
        _badgeService = badgeService;
    }

    public async Task<StreakDto> GetStreakAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("User not found");

        Console.WriteLine($"[STREAK SERVICE] Getting streak for user {userId}: Current={user.CurrentStreak}, Longest={user.LongestStreak}, LastActive={user.LastActivityDate}");

        // Check if streak is still valid
        var today = DateTime.UtcNow.Date;
        var lastActivityDate = user.LastActivityDate?.Date;

        if (!lastActivityDate.HasValue)
        {
            // No activity yet
            Console.WriteLine($"[STREAK SERVICE] No activity yet for user {userId}");
            return new StreakDto
            {
                CurrentStreak = 0,
                LongestStreak = user.LongestStreak,
                LastActiveDate = null
            };
        }

        var daysSinceLastActivity = (today - lastActivityDate.Value).Days;
        Console.WriteLine($"[STREAK SERVICE] Days since last activity: {daysSinceLastActivity}");

        if (daysSinceLastActivity > 1)
        {
            // Streak is broken - update database to reflect this
            Console.WriteLine($"[STREAK SERVICE] Streak broken for user {userId}, resetting to 0");
            user.CurrentStreak = 0;
            await _db.SaveChangesAsync();
            
            return new StreakDto
            {
                CurrentStreak = 0,
                LongestStreak = user.LongestStreak,
                LastActiveDate = user.LastActivityDate
            };
        }

        // Streak is still valid (today or yesterday)
        Console.WriteLine($"[STREAK SERVICE] Streak still valid for user {userId}");
        return new StreakDto
        {
            CurrentStreak = user.CurrentStreak,
            LongestStreak = user.LongestStreak,
            LastActiveDate = user.LastActivityDate
        };
    }

    public async Task UpdateStreakAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("User not found");

        Console.WriteLine($"[STREAK SERVICE] UpdateStreak called for user {userId}");

        var today = DateTime.UtcNow.Date;
        var lastActivityDate = user.LastActivityDate?.Date;

        Console.WriteLine($"[STREAK SERVICE] Before update: Current={user.CurrentStreak}, Longest={user.LongestStreak}, LastActive={user.LastActivityDate}, Today={today}");

        // If already active today, don't update
        if (lastActivityDate.HasValue && lastActivityDate.Value == today)
        {
            Console.WriteLine($"[STREAK SERVICE] User {userId} already active today, skipping update");
            return;
        }

        if (!lastActivityDate.HasValue)
        {
            // First activity ever
            Console.WriteLine($"[STREAK SERVICE] First activity ever for user {userId}");
            user.CurrentStreak = 1;
            user.LongestStreak = 1;
            user.LastActivityDate = today;
        }
        else
        {
            var daysSinceLastActivity = (today - lastActivityDate.Value).Days;
            Console.WriteLine($"[STREAK SERVICE] Days since last activity: {daysSinceLastActivity}");

            if (daysSinceLastActivity == 1)
            {
                // Consecutive day - increment streak
                Console.WriteLine($"[STREAK SERVICE] Consecutive day! Incrementing streak for user {userId}");
                user.CurrentStreak++;
                user.LongestStreak = Math.Max(user.LongestStreak, user.CurrentStreak);
                user.LastActivityDate = today;
            }
            else if (daysSinceLastActivity > 1)
            {
                // Streak broken - reset to 1
                Console.WriteLine($"[STREAK SERVICE] Streak broken for user {userId}, resetting to 1");
                user.CurrentStreak = 1;
                user.LastActivityDate = today;
                // LongestStreak remains unchanged
            }
            // If daysSinceLastActivity == 0, already handled above
        }

        Console.WriteLine($"[STREAK SERVICE] After update: Current={user.CurrentStreak}, Longest={user.LongestStreak}, LastActive={user.LastActivityDate}");
        await _db.SaveChangesAsync();
        Console.WriteLine($"[STREAK SERVICE] Changes saved to database for user {userId}");
        
        // Check and unlock badges
        await _badgeService.CheckAndUnlockBadgesAsync(userId);
    }
}
