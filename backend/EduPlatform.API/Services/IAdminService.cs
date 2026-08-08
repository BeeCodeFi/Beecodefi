using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IAdminService
{
    Task<AdminAnalyticsDto> GetAnalyticsAsync(CancellationToken cancellationToken);
    Task<List<LessonCodeExampleDto>> GetPendingCodeExamplesAsync(CancellationToken cancellationToken);
    Task<bool> ApproveCodeExampleAsync(int codeExampleId, CancellationToken cancellationToken);
    Task<bool> RejectCodeExampleAsync(int codeExampleId, CancellationToken cancellationToken);
    Task<List<LessonTipDto>> GetPendingTipsAsync(CancellationToken cancellationToken);
    Task<bool> ApproveTipAsync(int tipId, CancellationToken cancellationToken);
    Task<bool> RejectTipAsync(int tipId, CancellationToken cancellationToken);
}
