using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface ILeaderboardService
{
    Task<PaginatedLeaderboardDto> GetLeaderboardAsync(int page = 1, int pageSize = 20, string timeframe = "all", string track = "all");
    Task<UserStatsDto> GetMyStatsAsync(int userId);
    Task<PaginatedLeaderboardDto> GetXPLeaderboardAsync(int page = 1, int pageSize = 20);
}
