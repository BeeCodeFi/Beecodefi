using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace EduPlatform.API.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly TokenService _tokenService;
    private readonly IEmailService _emailService;
    private readonly ILogger<AuthService> _logger;

    public AuthService(AppDbContext db, TokenService tokenService, IEmailService emailService, ILogger<AuthService> logger)
    {
        _db = db;
        _tokenService = tokenService;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
    {
        if (await _db.Users.AnyAsync(u => u.Email == dto.Email.ToLowerInvariant()))
            throw new InvalidOperationException("Email already registered");

        var baseUsername = dto.Name.Replace(" ", "").ToLowerInvariant();
        var uniqueSuffix = Guid.NewGuid().ToString().Substring(0, 6);
        
        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email.ToLowerInvariant(),
            Username = $"{baseUsername}{uniqueSuffix}",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            CreatedAt = DateTime.UtcNow
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return GenerateAuthResponse(user);
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email.ToLowerInvariant())
            ?? throw new UnauthorizedAccessException("Invalid email or password");

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password");

        return GenerateAuthResponse(user);
    }

    public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
    {
        var userId = _tokenService.ValidateRefreshToken(refreshToken)
            ?? throw new UnauthorizedAccessException("Invalid refresh token");

        var user = await _db.Users.FindAsync(userId)
            ?? throw new UnauthorizedAccessException("User not found");

        _tokenService.RevokeRefreshToken(refreshToken);
        return GenerateAuthResponse(user);
    }

    public async Task ForgotPasswordAsync(string email, string frontendBaseUrl)
    {
        // Always succeed — never reveal whether an email is registered (anti-enumeration)
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email.ToLowerInvariant());
        if (user == null)
        {
            _logger.LogInformation("Password reset requested for unknown email: {Email}", email);
            return;
        }

        // Generate a cryptographically secure token
        var rawToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(48));

        // Store the SHA-256 hash in the DB (the raw token goes in the URL)
        using var sha = SHA256.Create();
        var tokenHash = Convert.ToHexString(sha.ComputeHash(Encoding.UTF8.GetBytes(rawToken)));

        user.PasswordResetToken = tokenHash;
        user.PasswordResetTokenExpiry = DateTime.UtcNow.AddHours(1);
        await _db.SaveChangesAsync();

        var resetLink = $"{frontendBaseUrl.TrimEnd('/')}/reset-password?token={Uri.EscapeDataString(rawToken)}";
        await _emailService.SendPasswordResetEmailAsync(user.Email, user.Name, resetLink);
    }

    public async Task ResetPasswordAsync(string rawToken, string newPassword)
    {
        using var sha = SHA256.Create();
        var tokenHash = Convert.ToHexString(sha.ComputeHash(Encoding.UTF8.GetBytes(rawToken)));

        var user = await _db.Users.FirstOrDefaultAsync(u => u.PasswordResetToken == tokenHash)
            ?? throw new InvalidOperationException("Invalid or expired reset link");

        if (user.PasswordResetTokenExpiry == null || user.PasswordResetTokenExpiry < DateTime.UtcNow)
            throw new InvalidOperationException("This reset link has expired. Please request a new one.");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
        user.PasswordResetToken = null;
        user.PasswordResetTokenExpiry = null;
        await _db.SaveChangesAsync();
    }

    private AuthResponseDto GenerateAuthResponse(User user)
    {
        var accessToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken();
        _tokenService.StoreRefreshToken(refreshToken, user.Id);

        return new AuthResponseDto
        {
            Token = accessToken,
            RefreshToken = refreshToken,
            User = new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                ProfileImageUrl = user.ProfileImageUrl,
                TotalXP = user.TotalXP,
                Username = user.Username,
                Bio = user.Bio
            }
        };
    }
}
