using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface ILessonCodeExampleService
{
    Task<List<LessonCodeExampleDto>> GetCodeExamplesAsync(string tutorialSlug, string lessonSlug, int? userId = null);
    Task<LessonCodeExampleDto?> GetCodeExampleAsync(int id, int? userId = null);
    Task<LessonCodeExampleDto> CreateCodeExampleAsync(int userId, CreateLessonCodeExampleDto dto);
    Task<LessonCodeExampleDto?> UpdateCodeExampleAsync(int userId, int id, UpdateLessonCodeExampleDto dto);
    Task<bool> DeleteCodeExampleAsync(int userId, int id);
    Task<LessonCodeExampleDto?> VoteCodeExampleAsync(int userId, int codeExampleId, bool isUpvote);
    Task<bool> RemoveVoteAsync(int userId, int codeExampleId);
    Task<bool> ApproveCodeExampleAsync(int codeExampleId); // Admin function
}