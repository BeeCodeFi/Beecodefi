using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IBadgeService
{
    Task<List<BadgeDto>> GetAllBadgesAsync(int? userId);
    Task<List<BadgeDto>> GetMyBadgesAsync(int userId);
    Task<List<BadgeDto>> CheckAndUnlockBadgesAsync(int userId);
}
