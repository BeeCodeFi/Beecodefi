using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface ILessonTipService
{
    Task<List<LessonTipDto>> GetTipsAsync(string tutorialSlug, string lessonSlug, int? userId = null);
    Task<LessonTipDto?> GetTipAsync(int id, int? userId = null);
    Task<LessonTipDto> CreateTipAsync(int userId, CreateLessonTipDto dto);
    Task<LessonTipDto?> UpdateTipAsync(int userId, int id, UpdateLessonTipDto dto);
    Task<bool> DeleteTipAsync(int userId, int id);
    Task<LessonTipDto?> VoteTipAsync(int userId, int tipId, bool isUpvote);
    Task<bool> RemoveVoteAsync(int userId, int tipId);
    Task<bool> ApproveTipAsync(int tipId); // Admin function
}