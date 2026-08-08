namespace EduPlatform.API.Services;

public interface IXPService
{
    Task AddXPAsync(int userId, int amount, string reason);
}
