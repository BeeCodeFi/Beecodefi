using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IQuizAnalyticsService
{
    Task<QuizAnalyticsDto> GetUserQuizAnalyticsAsync(int userId);
    Task<List<QuizAttemptAnalyticsDto>> GetUserAttemptHistoryAsync(int userId, int limit = 20);
    Task<List<TopicPerformanceDto>> GetTopicPerformanceAsync(int userId);
    Task<List<WeakAreaDto>> IdentifyWeakAreasAsync(int userId);
    Task<List<WeeklyPerformanceDto>> GetWeeklyPerformanceAsync(int userId, int weeks = 12);
}