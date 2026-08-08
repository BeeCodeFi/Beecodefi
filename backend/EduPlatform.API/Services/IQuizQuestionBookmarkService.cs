using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IQuizQuestionBookmarkService
{
    Task<List<QuizQuestionBookmarkDto>> GetQuizQuestionBookmarksAsync(int userId);
    Task<QuizQuestionBookmarkDto> AddQuizQuestionBookmarkAsync(int userId, CreateQuizQuestionBookmarkDto dto);
    Task DeleteQuizQuestionBookmarkAsync(int userId, int questionId, string quizTopic);
    Task<bool> IsQuestionBookmarkedAsync(int userId, int questionId, string quizTopic);
}
