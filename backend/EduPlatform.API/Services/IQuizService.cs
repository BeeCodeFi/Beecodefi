using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

/// <summary>
/// Service for managing quiz-related operations.
/// Note: This service internally depends on IBadgeService to automatically check and unlock badges
/// when quizzes are submitted (both regular quizzes and lesson quizzes).
/// </summary>
public interface IQuizService
{
    Task<List<QuizTopicDto>> GetTopicsAsync(int? userId = null);
    Task<List<QuizQuestionDto>> GetQuestionsByTopicAsync(string topic);
    Task<QuizResultDto> SubmitQuizAsync(SubmitQuizDto dto, int? userId = null);
    Task<QuizResultDto> SubmitLessonQuizAsync(SubmitLessonQuizDto dto, int? userId = null);
    Task<PaginatedQuizHistoryDto> GetHistoryAsync(int userId, int page = 1, int pageSize = 10);
    Task<bool> CheckLessonQuizTableExistsAsync();
    Task<int> GetLessonQuizCountAsync(int? userId);
    Task<Dictionary<string, int>> GetBestScoresAsync(int userId);
}
