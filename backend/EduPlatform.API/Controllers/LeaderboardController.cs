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
    public async Task<ActionResult<PaginatedLeaderboardDto>> GetLeaderboard([FromQuery] int page = 1, [FromQuery] int pageSize = 20, [FromQuery] string timeframe = "all", [FromQuery] string track = "all")
    {
        var leaderboard = await _leaderboardService.GetLeaderboardAsync(page, pageSize, timeframe, track);
        return Ok(leaderboard);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserStatsDto>> GetMyStats()
    {
        var stats = await _leaderboardService.GetMyStatsAsync(GetUserId());
        return Ok(stats);
    }

    [HttpGet("xp")]
    public async Task<ActionResult<PaginatedLeaderboardDto>> GetXPLeaderboard([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var leaderboard = await _leaderboardService.GetXPLeaderboardAsync(page, pageSize);
        return Ok(leaderboard);
    }
}
