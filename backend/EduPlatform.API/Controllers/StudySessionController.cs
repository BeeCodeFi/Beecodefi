using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;

namespace EduPlatform.API.Controllers;

[Authorize]
[ApiController]
[Route("api/study-sessions")]
public class StudySessionController : BaseController
{
    private readonly AppDbContext _context;

    public StudySessionController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/study-sessions?category=javascript
    // Returns the total study time for a category
    [HttpGet]
    public async Task<ActionResult<StudySessionSummaryDto>> GetStudySession([FromQuery] string? category = null)
    {
        var userId = GetUserId();
        
        if (string.IsNullOrEmpty(category))
        {
            return BadRequest(new { message = "Category is required" });
        }

        var session = await _context.StudySessions
            .FirstOrDefaultAsync(s => s.UserId == userId && s.Category == category);

        if (session == null)
        {
            // Return empty session if none exists
            return Ok(new StudySessionSummaryDto
            {
                Category = category,
                TotalSeconds = 0,
                Sessions = new List<StudySessionDto>()
            });
        }

        return Ok(new StudySessionSummaryDto
        {
            Category = category,
            TotalSeconds = session.TotalSeconds,
            Sessions = new List<StudySessionDto>
            {
                new StudySessionDto
                {
                    Id = session.Id,
                    Category = session.Category,
                    TotalSeconds = session.TotalSeconds,
                    LastUpdatedAt = session.LastUpdatedAt,
                    CreatedAt = session.CreatedAt
                }
            }
        });
    }

    // POST: api/study-sessions
    // Updates or creates a study session with additional time
    [HttpPost]
    public async Task<ActionResult<StudySessionDto>> UpdateStudySession([FromBody] UpdateStudySessionDto dto)
    {
        var userId = GetUserId();

        if (string.IsNullOrEmpty(dto.Category))
        {
            return BadRequest(new { message = "Category is required" });
        }

        if (dto.AdditionalSeconds < 0)
        {
            return BadRequest(new { message = "Additional seconds cannot be negative" });
        }

        var existing = await _context.StudySessions
            .FirstOrDefaultAsync(s => s.UserId == userId && s.Category == dto.Category);

        if (existing != null)
        {
            existing.TotalSeconds += dto.AdditionalSeconds;
            existing.LastUpdatedAt = DateTime.UtcNow;
            _context.StudySessions.Update(existing);
            await _context.SaveChangesAsync();

            return Ok(new StudySessionDto
            {
                Id = existing.Id,
                Category = existing.Category,
                TotalSeconds = existing.TotalSeconds,
                LastUpdatedAt = existing.LastUpdatedAt,
                CreatedAt = existing.CreatedAt
            });
        }

        var session = new StudySession
        {
            UserId = userId,
            Category = dto.Category,
            TotalSeconds = dto.AdditionalSeconds,
            LastUpdatedAt = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow
        };

        _context.StudySessions.Add(session);
        await _context.SaveChangesAsync();

        return Ok(new StudySessionDto
        {
            Id = session.Id,
            Category = session.Category,
            TotalSeconds = session.TotalSeconds,
            LastUpdatedAt = session.LastUpdatedAt,
            CreatedAt = session.CreatedAt
        });
    }

    // POST: api/study-sessions/reset
    // Resets the study session for a category to zero
    [HttpPost("reset")]
    public async Task<ActionResult<StudySessionDto>> ResetStudySession([FromBody] ResetStudySessionDto dto)
    {
        var userId = GetUserId();

        if (string.IsNullOrEmpty(dto.Category))
        {
            return BadRequest(new { message = "Category is required" });
        }

        var session = await _context.StudySessions
            .FirstOrDefaultAsync(s => s.UserId == userId && s.Category == dto.Category);

        if (session == null)
        {
            return NotFound(new { message = "Study session not found for this category" });
        }

        session.TotalSeconds = 0;
        session.LastUpdatedAt = DateTime.UtcNow;
        _context.StudySessions.Update(session);
        await _context.SaveChangesAsync();

        return Ok(new StudySessionDto
        {
            Id = session.Id,
            Category = session.Category,
            TotalSeconds = session.TotalSeconds,
            LastUpdatedAt = session.LastUpdatedAt,
            CreatedAt = session.CreatedAt
        });
    }

    // DELETE: api/study-sessions?category=javascript
    // Deletes the study session for a category
    [HttpDelete]
    public async Task<IActionResult> DeleteStudySession([FromQuery] string? category = null)
    {
        var userId = GetUserId();

        if (string.IsNullOrEmpty(category))
        {
            return BadRequest(new { message = "Category is required" });
        }

        var session = await _context.StudySessions
            .FirstOrDefaultAsync(s => s.UserId == userId && s.Category == category);

        if (session == null)
        {
            return NotFound(new { message = "Study session not found for this category" });
        }

        _context.StudySessions.Remove(session);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Study session deleted successfully" });
    }
}