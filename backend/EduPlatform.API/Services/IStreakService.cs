using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IStreakService
{
    Task<StreakDto> GetStreakAsync(int userId);
    Task UpdateStreakAsync(int userId);
}
