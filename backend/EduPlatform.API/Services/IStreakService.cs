using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

/// <summary>
/// Service for managing user streaks (consecutive days of activity).
/// Note: This service internally depends on IBadgeService to automatically check and unlock badges
/// when streaks are updated.
/// </summary>
public interface IStreakService
{
    Task<StreakDto> GetStreakAsync(int userId);
    Task UpdateStreakAsync(int userId);
}
