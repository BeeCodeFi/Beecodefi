using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IAdminService
{
    Task<AdminAnalyticsDto> GetAnalyticsAsync(CancellationToken cancellationToken);
}
