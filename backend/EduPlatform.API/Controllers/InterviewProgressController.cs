using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;

namespace EduPlatform.API.Controllers;

[Authorize]
[ApiController]
[Route("api/interview-progress")]
public class InterviewProgressController : BaseController
{
    private readonly AppDbContext _context;

    public InterviewProgressController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/interview-progress?category=html
    [HttpGet]
    public async Task<ActionResult<InterviewProgressSummaryDto>> GetProgress([FromQuery] string? category = null)
    {
        var userId = GetUserId();
        var query = _context.InterviewProgress
            .Where(ip => ip.UserId == userId);

        if (!string.IsNullOrEmpty(category))
            query = query.Where(ip => ip.Category == category);

        var readIds = await query
            .OrderByDescending(ip => ip.ReadAt)
            .Select(ip => ip.QuestionId)
            .ToListAsync();

        return Ok(new InterviewProgressSummaryDto(
            category ?? "all",
            readIds.Count,
            readIds
        ));
    }

    // POST: api/interview-progress
    [HttpPost]
    public async Task<ActionResult<InterviewProgressDto>> MarkAsRead(MarkInterviewProgressDto dto)
    {
        var userId = GetUserId();

        var existing = await _context.InterviewProgress
            .FirstOrDefaultAsync(ip =>
                ip.UserId == userId &&
                ip.Category == dto.Category &&
                ip.QuestionId == dto.QuestionId);

        if (existing != null)
        {
            return Ok(new InterviewProgressDto(
                existing.Id,
                existing.Category,
                existing.QuestionId,
                existing.ReadAt
            ));
        }

        var progress = new InterviewProgress
        {
            UserId = userId,
            Category = dto.Category,
            QuestionId = dto.QuestionId,
            ReadAt = DateTime.UtcNow
        };

        _context.InterviewProgress.Add(progress);
        await _context.SaveChangesAsync();

        return Ok(new InterviewProgressDto(
            progress.Id,
            progress.Category,
            progress.QuestionId,
            progress.ReadAt
        ));
    }

    // DELETE: api/interview-progress/all?category=html
    [HttpDelete("all")]
    public async Task<IActionResult> ClearProgress([FromQuery] string? category = null)
    {
        var userId = GetUserId();
        var query = _context.InterviewProgress
            .Where(ip => ip.UserId == userId);

        if (!string.IsNullOrEmpty(category))
            query = query.Where(ip => ip.Category == category);

        var records = await query.ToListAsync();
        _context.InterviewProgress.RemoveRange(records);
        await _context.SaveChangesAsync();

        return Ok(new { message = $"Cleared {records.Count} read records", count = records.Count });
    }
}
