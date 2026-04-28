namespace EduPlatform.API.Services;

public interface IEmailService
{
    Task SendContactEmailAsync(string name, string email, string subject, string message);
}
