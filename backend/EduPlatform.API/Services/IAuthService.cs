using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto> LoginAsync(LoginDto dto);
    Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
    Task ForgotPasswordAsync(string email, string frontendBaseUrl);
    Task ResetPasswordAsync(string token, string newPassword);
}
