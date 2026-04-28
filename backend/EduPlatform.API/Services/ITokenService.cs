using EduPlatform.API.Models;

namespace EduPlatform.API.Services;

public interface ITokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    int? ValidateRefreshToken(string token);
}
