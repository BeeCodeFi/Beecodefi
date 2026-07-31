using System.Security.Claims;
using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProgressController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProgressController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("mark")]
    public async Task<IActionResult> MarkComplete([FromBody] MarkProgressDto dto)
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var existing = await _db.TutorialProgress
            .FirstOrDefaultAsync(p =>
                p.UserId == userId &&
                p.TutorialSlug == dto.TutorialSlug &&
                p.LessonSlug == dto.LessonSlug);

        if (existing != null)
            return Ok(new { message = "Already completed" });

        _db.TutorialProgress.Add(new TutorialProgress
        {
            UserId = userId,
            TutorialSlug = dto.TutorialSlug,
            LessonSlug = dto.LessonSlug,
            CompletedAt = DateTime.UtcNow
        });

        await _db.SaveChangesAsync();
        return Ok(new { message = "Progress saved" });
    }

    [HttpDelete("unmark")]
    public async Task<IActionResult> UnmarkComplete([FromQuery] string tutorialSlug, [FromQuery] string lessonSlug)
    {
        if (string.IsNullOrWhiteSpace(tutorialSlug) || string.IsNullOrWhiteSpace(lessonSlug))
            return BadRequest(new { message = "Tutorial slug and lesson slug are required" });

        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var matchingProgress = await _db.TutorialProgress
            .Where(p => p.UserId == userId && p.TutorialSlug == tutorialSlug && p.LessonSlug == lessonSlug)
            .ToListAsync();

        if (matchingProgress.Count == 0)
            return Ok(new { message = "Progress already removed" });

        _db.TutorialProgress.RemoveRange(matchingProgress);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Progress removed" });
    }

    [HttpGet]
    public async Task<ActionResult<List<ProgressDto>>> GetProgress()
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var progress = await _db.TutorialProgress
            .Where(p => p.UserId == userId)
            .Select(p => new ProgressDto
            {
                TutorialSlug = p.TutorialSlug,
                LessonSlug = p.LessonSlug,
                CompletedAt = p.CompletedAt
            })
            .AsNoTracking()
            .ToListAsync();

        return Ok(progress);
    }
}
