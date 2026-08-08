using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class QuizQuestionBookmarkService : IQuizQuestionBookmarkService
{
    private readonly AppDbContext _db;

    public QuizQuestionBookmarkService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<QuizQuestionBookmarkDto>> GetQuizQuestionBookmarksAsync(int userId)
    {
        return await _db.QuizQuestionBookmarks
            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.BookmarkedAt)
            .Select(b => new QuizQuestionBookmarkDto
            {
                Id = b.Id,
                QuestionId = b.QuestionId,
                QuizTopic = b.QuizTopic,
                QuestionText = b.QuestionText,
                BookmarkedAt = b.BookmarkedAt
            })
            .ToListAsync();
    }

    public async Task<QuizQuestionBookmarkDto> AddQuizQuestionBookmarkAsync(int userId, CreateQuizQuestionBookmarkDto dto)
    {
        // Check if already exists
        var existing = await _db.QuizQuestionBookmarks
            .FirstOrDefaultAsync(b =>
                b.UserId == userId &&
                b.QuestionId == dto.QuestionId &&
                b.QuizTopic == dto.QuizTopic);

        if (existing != null)
        {
            return new QuizQuestionBookmarkDto
            {
                Id = existing.Id,
                QuestionId = existing.QuestionId,
                QuizTopic = existing.QuizTopic,
                QuestionText = existing.QuestionText,
                BookmarkedAt = existing.BookmarkedAt
            };
        }

        var bookmark = new QuizQuestionBookmark
        {
            UserId = userId,
            QuestionId = dto.QuestionId,
            QuizTopic = dto.QuizTopic,
            QuestionText = dto.QuestionText,
            BookmarkedAt = DateTime.UtcNow
        };

        _db.QuizQuestionBookmarks.Add(bookmark);
        await _db.SaveChangesAsync();

        return new QuizQuestionBookmarkDto
        {
            Id = bookmark.Id,
            QuestionId = bookmark.QuestionId,
            QuizTopic = bookmark.QuizTopic,
            QuestionText = bookmark.QuestionText,
            BookmarkedAt = bookmark.BookmarkedAt
        };
    }

    public async Task DeleteQuizQuestionBookmarkAsync(int userId, int questionId, string quizTopic)
    {
        var bookmark = await _db.QuizQuestionBookmarks
            .FirstOrDefaultAsync(b =>
                b.UserId == userId &&
                b.QuestionId == questionId &&
                b.QuizTopic == quizTopic);

        if (bookmark != null)
        {
            _db.QuizQuestionBookmarks.Remove(bookmark);
            await _db.SaveChangesAsync();
        }
    }

    public async Task<bool> IsQuestionBookmarkedAsync(int userId, int questionId, string quizTopic)
    {
        return await _db.QuizQuestionBookmarks
            .AnyAsync(b =>
                b.UserId == userId &&
                b.QuestionId == questionId &&
                b.QuizTopic == quizTopic);
    }
}
