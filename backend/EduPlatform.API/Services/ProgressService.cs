using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class ProgressService : IProgressService
{
    private readonly AppDbContext _db;

    public ProgressService(AppDbContext db)
    {
        _db = db;
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
