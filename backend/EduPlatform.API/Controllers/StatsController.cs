using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

public class StatsController : BaseController
{
    private readonly IStatsService _statsService;

    public StatsController(IStatsService statsService)
    {
        _statsService = statsService;
    }

    [HttpGet("platform")]
    public async Task<ActionResult<PlatformStatsDto>> GetPlatformStats(CancellationToken cancellationToken)
    {
        var stats = await _statsService.GetPlatformStatsAsync(cancellationToken);
        return Ok(stats);
    }
}
