using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface ICommentService
{
    Task<List<LessonCommentDto>> GetCommentsAsync(string tutorialSlug, string lessonSlug, int? userId = null);
    Task<LessonCommentDto?> GetCommentAsync(int id, int? userId = null);
    Task<LessonCommentDto> CreateCommentAsync(int userId, CreateCommentDto dto);
    Task<LessonCommentDto?> UpdateCommentAsync(int userId, int id, UpdateCommentDto dto);
    Task<bool> DeleteCommentAsync(int userId, int id);
    Task<LessonCommentDto?> VoteCommentAsync(int userId, int commentId, bool isUpvote);
    Task<bool> RemoveVoteAsync(int userId, int commentId);
}
