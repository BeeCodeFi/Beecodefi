using EduPlatform.API.Data;
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
}
