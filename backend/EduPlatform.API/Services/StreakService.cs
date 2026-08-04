using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class StreakService : IStreakService
{
    private readonly AppDbContext _db;

    public StreakService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<StreakDto> GetStreakAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("User not found");

        // Check if streak is still valid
        var today = DateTime.UtcNow.Date;
        var lastActivityDate = user.LastActivityDate?.Date;

        if (!lastActivityDate.HasValue)
        {
            // No activity yet
            return new StreakDto
            {
                CurrentStreak = 0,
                LongestStreak = user.LongestStreak,
                LastActiveDate = null
            };
        }

        var daysSinceLastActivity = (today - lastActivityDate.Value).Days;

        if (daysSinceLastActivity > 1)
        {
            // Streak is broken - return 0 for current streak
            return new StreakDto
            {
                CurrentStreak = 0,
                LongestStreak = user.LongestStreak,
                LastActiveDate = user.LastActivityDate
            };
        }

        // Streak is still valid (today or yesterday)
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

        var today = DateTime.UtcNow.Date;
        var lastActivityDate = user.LastActivityDate?.Date;

        // If already active today, don't update
        if (lastActivityDate.HasValue && lastActivityDate.Value == today)
        {
            return;
        }

        if (!lastActivityDate.HasValue)
        {
            // First activity ever
            user.CurrentStreak = 1;
            user.LongestStreak = 1;
            user.LastActivityDate = today;
        }
        else
        {
            var daysSinceLastActivity = (today - lastActivityDate.Value).Days;

            if (daysSinceLastActivity == 1)
            {
                // Consecutive day - increment streak
                user.CurrentStreak++;
                user.LongestStreak = Math.Max(user.LongestStreak, user.CurrentStreak);
                user.LastActivityDate = today;
            }
            else if (daysSinceLastActivity > 1)
            {
                // Streak broken - reset to 1
                user.CurrentStreak = 1;
                user.LastActivityDate = today;
                // LongestStreak remains unchanged
            }
            // If daysSinceLastActivity == 0, already handled above
        }

        await _db.SaveChangesAsync();
    }
}
