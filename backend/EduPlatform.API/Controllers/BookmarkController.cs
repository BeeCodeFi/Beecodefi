using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

[Authorize]
public class BookmarkController : BaseController
{
    private readonly IBookmarkService _bookmarkService;

    public BookmarkController(IBookmarkService bookmarkService)
    {
        _bookmarkService = bookmarkService;
    }

    // GET /api/bookmark
    [HttpGet]
    public async Task<ActionResult<List<BookmarkDto>>> GetBookmarks()
    {
        var bookmarks = await _bookmarkService.GetBookmarksAsync(GetUserId());
        return Ok(bookmarks);
    }

    // POST /api/bookmark
    [HttpPost]
    public async Task<ActionResult<BookmarkDto>> AddBookmark([FromBody] CreateBookmarkDto dto)
    {
        var bookmark = await _bookmarkService.AddBookmarkAsync(GetUserId(), dto);
        return Ok(bookmark);
    }

    // DELETE /api/bookmark?tutorialSlug=X&lessonSlug=Y
    [HttpDelete]
    public async Task<IActionResult> DeleteBookmark([FromQuery] string tutorialSlug, [FromQuery] string lessonSlug)
    {
        if (string.IsNullOrWhiteSpace(tutorialSlug) || string.IsNullOrWhiteSpace(lessonSlug))
        {
            return BadRequest(new { message = "tutorialSlug and lessonSlug are required" });
        }

        await _bookmarkService.DeleteBookmarkAsync(GetUserId(), tutorialSlug, lessonSlug);
        return Ok(new { message = "Bookmark deleted" });
    }

    // GET /api/bookmark/check?tutorialSlug=X&lessonSlug=Y
    [HttpGet("check")]
    public async Task<ActionResult<bool>> CheckBookmark([FromQuery] string tutorialSlug, [FromQuery] string lessonSlug)
    {
        if (string.IsNullOrWhiteSpace(tutorialSlug) || string.IsNullOrWhiteSpace(lessonSlug))
        {
            return BadRequest(new { message = "tutorialSlug and lessonSlug are required" });
        }

        var isBookmarked = await _bookmarkService.IsBookmarkedAsync(GetUserId(), tutorialSlug, lessonSlug);
        return Ok(isBookmarked);
    }
}
