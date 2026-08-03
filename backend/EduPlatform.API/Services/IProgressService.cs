using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IProgressService
{
    Task MarkCompleteAsync(int userId, MarkProgressDto dto);
    Task UnmarkCompleteAsync(int userId, string tutorialSlug, string lessonSlug);
    Task<List<ProgressDto>> GetProgressAsync(int userId);
}
