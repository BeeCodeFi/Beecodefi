using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IXPService
{
    Task AddXPAsync(int userId, int amount, string reason);
    Task<int> CalculateXPWithMultiplierAsync(int userId, int baseAmount);
    Task<double> GetStreakMultiplierAsync(int userId);
    Task<XPInfoDto> GetXPInfoAsync(int userId);
}
