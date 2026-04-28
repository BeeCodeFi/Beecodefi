using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IQuizService
{
    Task<List<QuizTopicDto>> GetTopicsAsync(int? userId = null);
    Task<List<QuizQuestionDto>> GetQuestionsByTopicAsync(string topic);
    Task<QuizResultDto> SubmitQuizAsync(SubmitQuizDto dto, int? userId = null);
    Task<List<QuizAttemptDto>> GetHistoryAsync(int userId);
}
