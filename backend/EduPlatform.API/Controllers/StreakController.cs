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
            var streak = await _streakService.GetStreakAsync(GetUserId());
            return Ok(streak);
        }
        catch (KeyNotFoundException ex)
        {
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
