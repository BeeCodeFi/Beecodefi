using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Controllers;

[Authorize]
public class RecentActivityController : BaseController
{
    private readonly AppDbContext _db;

    public RecentActivityController(AppDbContext db)
    {
        _db = db;
    }

    // GET /api/recentactivity?limit=5
    [HttpGet]
    public async Task<ActionResult<List<RecentActivityDto>>> GetRecentActivity([FromQuery] int limit = 5)
    {
        var activities = await _db.RecentActivities
            .Where(ra => ra.UserId == GetUserId())
            .OrderByDescending(ra => ra.Timestamp)
            .Take(Math.Min(limit, 20)) // Max 20
            .Select(ra => new RecentActivityDto
            {
                Id = ra.Id,
                TutorialSlug = ra.TutorialSlug,
                LessonSlug = ra.LessonSlug,
                TutorialTitle = ra.TutorialTitle,
                LessonTitle = ra.LessonTitle,
                Timestamp = ra.Timestamp
            })
            .ToListAsync();

        return Ok(activities);
    }
}
