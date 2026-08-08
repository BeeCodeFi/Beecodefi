using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;

namespace EduPlatform.API.Controllers;

[Authorize]
[ApiController]
[Route("api/interview-notes")]
public class InterviewNotesController : BaseController
{
    private readonly AppDbContext _context;

    public InterviewNotesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/interview-notes?category=javascript
    // Returns all notes for the authenticated user (optionally filtered by category)
    [HttpGet]
    public async Task<ActionResult<InterviewNotesSummaryDto>> GetNotes([FromQuery] string? category = null)
    {
        var userId = GetUserId();
        var query = _context.InterviewNotes.Where(n => n.UserId == userId);

        if (!string.IsNullOrEmpty(category))
            query = query.Where(n => n.Category == category);

        var notes = await query
            .OrderByDescending(n => n.UpdatedAt)
            .Select(n => new InterviewNoteDto(n.Id, n.Category, n.QuestionId, n.NoteText, n.UpdatedAt))
            .ToListAsync();

        return Ok(new InterviewNotesSummaryDto(category ?? "all", notes));
    }

    // POST: api/interview-notes
    // Upsert: create or update a note for a specific question
    [HttpPost]
    public async Task<ActionResult<InterviewNoteDto>> SaveNote([FromBody] SaveInterviewNoteDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.NoteText))
            return BadRequest(new { message = "Note text cannot be empty. Use DELETE to remove a note." });

        var userId = GetUserId();

        var existing = await _context.InterviewNotes.FirstOrDefaultAsync(n =>
            n.UserId == userId &&
            n.Category == dto.Category &&
            n.QuestionId == dto.QuestionId);

        if (existing != null)
        {
            existing.NoteText = dto.NoteText.Trim();
            existing.UpdatedAt = DateTime.UtcNow;
            _context.InterviewNotes.Update(existing);
            await _context.SaveChangesAsync();
            return Ok(new InterviewNoteDto(existing.Id, existing.Category, existing.QuestionId, existing.NoteText, existing.UpdatedAt));
        }

        var note = new InterviewNote
        {
            UserId = userId,
            Category = dto.Category,
            QuestionId = dto.QuestionId,
            NoteText = dto.NoteText.Trim(),
            UpdatedAt = DateTime.UtcNow
        };

        _context.InterviewNotes.Add(note);
        await _context.SaveChangesAsync();

        return Ok(new InterviewNoteDto(note.Id, note.Category, note.QuestionId, note.NoteText, note.UpdatedAt));
    }

    // DELETE: api/interview-notes?category=javascript&questionId=js-1
    [HttpDelete]
    public async Task<IActionResult> DeleteNote([FromQuery] string category, [FromQuery] string questionId)
    {
        var userId = GetUserId();

        var note = await _context.InterviewNotes.FirstOrDefaultAsync(n =>
            n.UserId == userId &&
            n.Category == category &&
            n.QuestionId == questionId);

        if (note == null) return NotFound(new { message = "Note not found." });

        _context.InterviewNotes.Remove(note);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Note deleted." });
    }
}
