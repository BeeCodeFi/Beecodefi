using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IStatsService
{
    Task<PlatformStatsDto> GetPlatformStatsAsync(CancellationToken cancellationToken);
}
