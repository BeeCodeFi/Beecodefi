using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class StatsService : IStatsService
{
    private readonly AppDbContext _db;

    public StatsService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<PlatformStatsDto> GetPlatformStatsAsync(CancellationToken cancellationToken)
    {
        var totalUsers = await _db.Users.CountAsync(cancellationToken);
        
        return new PlatformStatsDto
        {
            TotalUsers = totalUsers
        };
    }
}
