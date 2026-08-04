using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IBookmarkService
{
    Task<List<BookmarkDto>> GetBookmarksAsync(int userId);
    Task<BookmarkDto> AddBookmarkAsync(int userId, CreateBookmarkDto dto);
    Task DeleteBookmarkAsync(int userId, string tutorialSlug, string lessonSlug);
    Task<bool> IsBookmarkedAsync(int userId, string tutorialSlug, string lessonSlug);
}
