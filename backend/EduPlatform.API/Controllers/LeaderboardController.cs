using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

public class LeaderboardController : BaseController
{
    private readonly ILeaderboardService _leaderboardService;

    public LeaderboardController(ILeaderboardService leaderboardService)
    {
        _leaderboardService = leaderboardService;
    }

    [HttpGet]
    public async Task<ActionResult<List<LeaderboardEntryDto>>> GetLeaderboard([FromQuery] int limit = 100)
    {
        var leaderboard = await _leaderboardService.GetLeaderboardAsync(limit);
        return Ok(leaderboard);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserStatsDto>> GetMyStats()
    {
        var stats = await _leaderboardService.GetMyStatsAsync(GetUserId());
        return Ok(stats);
    }
}
