using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

[Authorize]
public class StreakController : BaseController
{
    private readonly IStreakService _streakService;

    public StreakController(IStreakService streakService)
    {
        _streakService = streakService;
    }

    // GET /api/streak
    [HttpGet]
    public async Task<ActionResult<StreakDto>> GetStreak()
    {
        try
        {
            var userId = GetUserId();
            Console.WriteLine($"[STREAK API] Getting streak for userId: {userId}");
            var streak = await _streakService.GetStreakAsync(userId);
            Console.WriteLine($"[STREAK API] Returning streak data: Current={streak.CurrentStreak}, Longest={streak.LongestStreak}, LastActive={streak.LastActiveDate}");
            return Ok(streak);
        }
        catch (KeyNotFoundException ex)
        {
            Console.WriteLine($"[STREAK API] User not found: {ex.Message}");
            return NotFound(new { message = ex.Message });
        }
    }

    // POST /api/streak/ping
    [HttpPost("ping")]
    public async Task<IActionResult> PingStreak()
    {
        try
        {
            await _streakService.UpdateStreakAsync(GetUserId());
            return Ok(new { message = "Streak updated" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
