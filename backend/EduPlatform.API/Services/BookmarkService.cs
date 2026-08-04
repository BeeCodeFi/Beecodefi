using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class BookmarkService : IBookmarkService
{
    private readonly AppDbContext _db;

    public BookmarkService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<BookmarkDto>> GetBookmarksAsync(int userId)
    {
        return await _db.Bookmarks
            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.SavedAt)
            .Select(b => new BookmarkDto
            {
                Id = b.Id,
                TutorialSlug = b.TutorialSlug,
                LessonSlug = b.LessonSlug,
                LessonTitle = b.LessonTitle,
                TrackTitle = b.TrackTitle,
                SavedAt = b.SavedAt
            })
            .ToListAsync();
    }

    public async Task<BookmarkDto> AddBookmarkAsync(int userId, CreateBookmarkDto dto)
    {
        // Check if already exists
        var existing = await _db.Bookmarks
            .FirstOrDefaultAsync(b => 
                b.UserId == userId && 
                b.TutorialSlug == dto.TutorialSlug && 
                b.LessonSlug == dto.LessonSlug);

        if (existing != null)
        {
            return new BookmarkDto
            {
                Id = existing.Id,
                TutorialSlug = existing.TutorialSlug,
                LessonSlug = existing.LessonSlug,
                LessonTitle = existing.LessonTitle,
                TrackTitle = existing.TrackTitle,
                SavedAt = existing.SavedAt
            };
        }

        var bookmark = new Bookmark
        {
            UserId = userId,
            TutorialSlug = dto.TutorialSlug,
            LessonSlug = dto.LessonSlug,
            LessonTitle = dto.LessonTitle,
            TrackTitle = dto.TrackTitle,
            SavedAt = DateTime.UtcNow
        };

        _db.Bookmarks.Add(bookmark);
        await _db.SaveChangesAsync();

        return new BookmarkDto
        {
            Id = bookmark.Id,
            TutorialSlug = bookmark.TutorialSlug,
            LessonSlug = bookmark.LessonSlug,
            LessonTitle = bookmark.LessonTitle,
            TrackTitle = bookmark.TrackTitle,
            SavedAt = bookmark.SavedAt
        };
    }

    public async Task DeleteBookmarkAsync(int userId, string tutorialSlug, string lessonSlug)
    {
        var bookmark = await _db.Bookmarks
            .FirstOrDefaultAsync(b => 
                b.UserId == userId && 
                b.TutorialSlug == tutorialSlug && 
                b.LessonSlug == lessonSlug);

        if (bookmark != null)
        {
            _db.Bookmarks.Remove(bookmark);
            await _db.SaveChangesAsync();
        }
    }

    public async Task<bool> IsBookmarkedAsync(int userId, string tutorialSlug, string lessonSlug)
    {
        return await _db.Bookmarks
            .AnyAsync(b => 
                b.UserId == userId && 
                b.TutorialSlug == tutorialSlug && 
                b.LessonSlug == lessonSlug);
    }
}
