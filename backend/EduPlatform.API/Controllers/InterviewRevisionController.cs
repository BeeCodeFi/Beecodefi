using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;

namespace EduPlatform.API.Controllers;

[Authorize]
[ApiController]
[Route("api/interview-revisions")]
public class InterviewRevisionController : BaseController
{
    private readonly AppDbContext _context;

    public InterviewRevisionController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/interview-revisions?category=html
    [HttpGet]
    public async Task<ActionResult<List<RevisionDto>>> GetRevisions([FromQuery] string? category = null)
    {
        var userId = GetUserId();
        var query = _context.InterviewRevisions
            .Where(ir => ir.UserId == userId);

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(ir => ir.Category == category);
        }

        var revisions = await query
            .OrderByDescending(ir => ir.MarkedAt)
            .Select(ir => new RevisionDto(
                ir.Id,
                ir.Category,
                ir.QuestionId,
                ir.MarkedAt
            ))
            .ToListAsync();

        return Ok(revisions);
    }

    // POST: api/interview-revisions
    [HttpPost]
    public async Task<ActionResult<RevisionDto>> MarkForRevision(MarkRevisionDto dto)
    {
        var userId = GetUserId();
        
        // Check if already marked
        var existing = await _context.InterviewRevisions
            .FirstOrDefaultAsync(ir => 
                ir.UserId == userId && 
                ir.Category == dto.Category && 
                ir.QuestionId == dto.QuestionId);

        if (existing != null)
        {
            return Ok(new RevisionDto(
                existing.Id,
                existing.Category,
                existing.QuestionId,
                existing.MarkedAt
            ));
        }

        var revision = new InterviewRevision
        {
            UserId = userId,
            Category = dto.Category,
            QuestionId = dto.QuestionId,
            MarkedAt = DateTime.UtcNow
        };

        _context.InterviewRevisions.Add(revision);
        await _context.SaveChangesAsync();

        return Ok(new RevisionDto(
            revision.Id,
            revision.Category,
            revision.QuestionId,
            revision.MarkedAt
        ));
    }

    // DELETE: api/interview-revisions?category=html&questionId=html-1
    [HttpDelete]
    public async Task<IActionResult> UnmarkRevision([FromQuery] string category, [FromQuery] string questionId)
    {
        var userId = GetUserId();
        
        var revision = await _context.InterviewRevisions
            .FirstOrDefaultAsync(ir => 
                ir.UserId == userId && 
                ir.Category == category && 
                ir.QuestionId == questionId);

        if (revision == null)
        {
            return NotFound(new { message = "Revision mark not found" });
        }

        _context.InterviewRevisions.Remove(revision);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Revision mark removed" });
    }

    // DELETE: api/interview-revisions/all?category=html
    [HttpDelete("all")]
    public async Task<IActionResult> ClearAllRevisions([FromQuery] string? category = null)
    {
        var userId = GetUserId();
        
        var query = _context.InterviewRevisions
            .Where(ir => ir.UserId == userId);

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(ir => ir.Category == category);
        }

        var revisions = await query.ToListAsync();
        _context.InterviewRevisions.RemoveRange(revisions);
        await _context.SaveChangesAsync();

        return Ok(new { message = $"Removed {revisions.Count} revision marks", count = revisions.Count });
    }
}
