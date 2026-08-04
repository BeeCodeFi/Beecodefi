using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IQuizService
{
    Task<List<QuizTopicDto>> GetTopicsAsync(int? userId = null);
    Task<List<QuizQuestionDto>> GetQuestionsByTopicAsync(string topic);
    Task<QuizResultDto> SubmitQuizAsync(SubmitQuizDto dto, int? userId = null);
    Task<QuizResultDto> SubmitLessonQuizAsync(SubmitLessonQuizDto dto, int? userId = null);
    Task<PaginatedQuizHistoryDto> GetHistoryAsync(int userId, int page = 1, int pageSize = 10);
}
