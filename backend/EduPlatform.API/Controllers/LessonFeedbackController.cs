using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Controllers;

[Route("api/lesson-feedback")]
public class LessonFeedbackController : BaseController
{
    private readonly AppDbContext _db;

    public LessonFeedbackController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] SubmitLessonFeedbackDto dto)
    {
        int? userId = GetOptionalUserId();

        var existing = userId.HasValue
            ? await _db.LessonFeedback.FirstOrDefaultAsync(feedback =>
                feedback.UserId == userId &&
                feedback.TutorialSlug == dto.TutorialSlug &&
                feedback.LessonSlug == dto.LessonSlug)
            : null;

        if (existing != null)
        {
            existing.IsHelpful = dto.IsHelpful;
            existing.CreatedAt = DateTime.UtcNow;
        }
        else
        {
            _db.LessonFeedback.Add(new LessonFeedback
            {
                UserId = userId,
                TutorialSlug = dto.TutorialSlug.Trim(),
                LessonSlug = dto.LessonSlug.Trim(),
                IsHelpful = dto.IsHelpful,
            });
        }

        await _db.SaveChangesAsync();
        return Ok(new { message = "Feedback recorded" });
    }
}