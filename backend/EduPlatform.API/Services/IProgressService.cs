using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

/// <summary>
/// Service for managing user progress on tutorials and lessons.
/// Note: This service internally depends on IBadgeService to automatically check and unlock badges
/// when lessons are marked as complete.
/// </summary>
public interface IProgressService
{
    Task MarkCompleteAsync(int userId, MarkProgressDto dto);
    Task UnmarkCompleteAsync(int userId, string tutorialSlug, string lessonSlug);
    Task<List<ProgressDto>> GetProgressAsync(int userId);
}
