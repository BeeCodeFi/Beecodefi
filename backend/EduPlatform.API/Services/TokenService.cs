using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using EduPlatform.API.Models;
using Microsoft.IdentityModel.Tokens;

namespace EduPlatform.API.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;
    private static readonly Dictionary<string, int> _refreshTokens = new();

    public TokenService(IConfiguration config)
    {
        _config = config;
    }

    public string GenerateAccessToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _config["Jwt:Key"] ?? throw new InvalidOperationException("JWT key not configured")));

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name)
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
    }

    public int? ValidateRefreshToken(string token)
    {
        return _refreshTokens.TryGetValue(token, out var userId) ? userId : null;
    }

    public void StoreRefreshToken(string token, int userId)
    {
        _refreshTokens[token] = userId;
    }

    public void RevokeRefreshToken(string token)
    {
        _refreshTokens.Remove(token);
    }
}
