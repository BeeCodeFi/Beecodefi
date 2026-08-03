using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface ILeaderboardService
{
    Task<List<LeaderboardEntryDto>> GetLeaderboardAsync(int limit);
    Task<UserStatsDto> GetMyStatsAsync(int userId);
}
