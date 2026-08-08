using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class ProgressService : IProgressService
{
    private readonly AppDbContext _db;
    private readonly IStreakService _streakService;
    private readonly IBadgeService _badgeService;
    private readonly IXPService _xpService;

    public ProgressService(AppDbContext db, IStreakService streakService, IBadgeService badgeService, IXPService xpService)
    {
        _db = db;
        _streakService = streakService;
        _badgeService = badgeService;
        _xpService = xpService;
    }

    public async Task MarkCompleteAsync(int userId, MarkProgressDto dto)
    {
        var existing = await _db.TutorialProgress
            .FirstOrDefaultAsync(p =>
                p.UserId == userId &&
                p.TutorialSlug == dto.TutorialSlug &&
                p.LessonSlug == dto.LessonSlug);

        if (existing != null)
        {
            // Already completed - this is not an error, just return
            return;
        }

        _db.TutorialProgress.Add(new TutorialProgress
        {
            UserId = userId,
            TutorialSlug = dto.TutorialSlug,
            LessonSlug = dto.LessonSlug,
            CompletedAt = DateTime.UtcNow
        });

        await _db.SaveChangesAsync();
        
        // Update streak when lesson is completed
        await _streakService.UpdateStreakAsync(userId);
        
        // Check and unlock badges
        await _badgeService.CheckAndUnlockBadgesAsync(userId);
        
        // Award XP
        await _xpService.AddXPAsync(userId, 50, $"Completed lesson: {dto.LessonSlug}");
        
        // Track in Recent Activity - keep only the most recent for this lesson
        var existingActivity = await _db.RecentActivities
            .Where(ra => ra.UserId == userId 
                && ra.TutorialSlug == dto.TutorialSlug 
                && ra.LessonSlug == dto.LessonSlug)
            .ToListAsync();
        
        if (existingActivity.Any())
        {
            _db.RecentActivities.RemoveRange(existingActivity);
        }
        
        _db.RecentActivities.Add(new RecentActivity
        {
            UserId = userId,
            TutorialSlug = dto.TutorialSlug,
            LessonSlug = dto.LessonSlug,
            TutorialTitle = dto.TutorialTitle ?? dto.TutorialSlug,
            LessonTitle = dto.LessonTitle ?? dto.LessonSlug,
            Timestamp = DateTime.UtcNow
        });
        
        await _db.SaveChangesAsync();
    }

    public async Task UnmarkCompleteAsync(int userId, string tutorialSlug, string lessonSlug)
    {
        if (string.IsNullOrWhiteSpace(tutorialSlug) || string.IsNullOrWhiteSpace(lessonSlug))
            throw new InvalidOperationException("Tutorial slug and lesson slug are required");

        var matchingProgress = await _db.TutorialProgress
            .Where(p => p.UserId == userId && p.TutorialSlug == tutorialSlug && p.LessonSlug == lessonSlug)
            .ToListAsync();

        if (matchingProgress.Count > 0)
        {
            _db.TutorialProgress.RemoveRange(matchingProgress);
            await _db.SaveChangesAsync();
        }
    }

    public async Task<List<ProgressDto>> GetProgressAsync(int userId)
    {
        return await _db.TutorialProgress
            .Where(p => p.UserId == userId)
            .Select(p => new ProgressDto
            {
                TutorialSlug = p.TutorialSlug,
                LessonSlug = p.LessonSlug,
                CompletedAt = p.CompletedAt
            })
            .AsNoTracking()
            .ToListAsync();
    }
}
