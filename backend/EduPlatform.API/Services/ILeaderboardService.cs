using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface ILeaderboardService
{
    Task<PaginatedLeaderboardDto> GetLeaderboardAsync(int page = 1, int pageSize = 20);
    Task<UserStatsDto> GetMyStatsAsync(int userId);
}
