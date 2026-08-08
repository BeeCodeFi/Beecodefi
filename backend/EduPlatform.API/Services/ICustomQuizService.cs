using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface ICustomQuizService
{
    Task<CustomQuizDto> CreateCustomQuizAsync(int userId, CustomQuizRequestDto request);
    Task<CustomQuizDto?> GetCustomQuizByIdAsync(int id, int userId);
    Task<CustomQuizDto?> GetCustomQuizByShareCodeAsync(string shareCode);
    Task<List<CustomQuizDto>> GetUserCustomQuizzesAsync(int userId);
    Task<List<SharedQuizDto>> GetPublicCustomQuizzesAsync(int limit = 20);
    Task<bool> DeleteCustomQuizAsync(int id, int userId);
    Task<bool> IncrementQuizUsageAsync(int id);
}