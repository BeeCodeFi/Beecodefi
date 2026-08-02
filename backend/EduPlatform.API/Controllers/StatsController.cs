using EduPlatform.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatsController : ControllerBase
{
    private readonly AppDbContext _db;

    public StatsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet("platform")]
    public async Task<ActionResult<PlatformStatsDto>> GetPlatformStats(CancellationToken cancellationToken)
    {
        var totalUsers = await _db.Users.CountAsync(cancellationToken);
        
        return Ok(new PlatformStatsDto
        {
            TotalUsers = totalUsers
        });
    }
}

public sealed class PlatformStatsDto
{
    public int TotalUsers { get; set; }
}
