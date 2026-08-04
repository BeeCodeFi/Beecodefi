using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class AccountService : IAccountService
{
    private readonly AppDbContext _db;

    public AccountService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<UserDto> GetProfileAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("User not found");

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            ProfileImageUrl = user.ProfileImageUrl
        };
    }

    public async Task<UserDto> UpdateProfileAsync(int userId, UpdateProfileDto dto)
    {
        var user = await _db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("User not found");

        if (!string.IsNullOrWhiteSpace(dto.Name))
            user.Name = dto.Name.Trim();

        if (!string.IsNullOrWhiteSpace(dto.Email))
        {
            var normalizedEmail = dto.Email.Trim().ToLowerInvariant();
            if (normalizedEmail != user.Email)
            {
                if (await _db.Users.AnyAsync(u => u.Email == normalizedEmail && u.Id != userId))
                    throw new InvalidOperationException("Email already in use");
                user.Email = normalizedEmail;
            }
        }

        await _db.SaveChangesAsync();

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            ProfileImageUrl = user.ProfileImageUrl
        };
    }

    public async Task ChangePasswordAsync(int userId, ChangePasswordDto dto)
    {
        var user = await _db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("User not found");

        if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
            throw new UnauthorizedAccessException("Current password is incorrect");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        await _db.SaveChangesAsync();
    }

    public async Task<UserDto> UploadAvatarAsync(int userId, AvatarUploadDto dto)
    {
        if (string.IsNullOrEmpty(dto.Image) || !dto.Image.StartsWith("data:image/"))
            throw new InvalidOperationException("Invalid image format");

        // Limit to ~300KB base64 (~220KB raw image)
        if (dto.Image.Length > 307_200)
            throw new InvalidOperationException("Image too large. Please use a smaller crop.");

        var user = await _db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("User not found");

        user.ProfileImageUrl = dto.Image;
        await _db.SaveChangesAsync();

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            ProfileImageUrl = user.ProfileImageUrl
        };
    }

    public async Task DeleteAvatarAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("User not found");

        user.ProfileImageUrl = null;
        await _db.SaveChangesAsync();
    }

    public async Task ResetProgressAsync(int userId, ResetProgressDto dto)
    {
        switch (dto.Type.ToLowerInvariant())
        {
            case "quiz":
                if (!string.IsNullOrEmpty(dto.QuizTopic))
                {
                    var quiz = await _db.Quizzes.FirstOrDefaultAsync(q => q.Topic == dto.QuizTopic)
                        ?? throw new KeyNotFoundException($"Quiz with topic '{dto.QuizTopic}' not found");
                    
                    await _db.QuizAttempts
                        .Where(qa => qa.UserId == userId && qa.QuizId == quiz.Id)
                        .ExecuteDeleteAsync();
                    
                    // Also delete lesson quiz attempts for this topic
                    await _db.LessonQuizAttempts
                        .Where(lqa => lqa.UserId == userId && lqa.QuizTopic == dto.QuizTopic)
                        .ExecuteDeleteAsync();
                }
                else
                {
                    // Delete all quiz attempts
                    await _db.QuizAttempts
                        .Where(qa => qa.UserId == userId)
                        .ExecuteDeleteAsync();
                    
                    // Delete all lesson quiz attempts
                    await _db.LessonQuizAttempts
                        .Where(lqa => lqa.UserId == userId)
                        .ExecuteDeleteAsync();
                }
                break;

            case "tutorial":
                if (!string.IsNullOrEmpty(dto.TutorialSlug))
                {
                    await _db.TutorialProgress
                        .Where(tp => tp.UserId == userId && tp.TutorialSlug == dto.TutorialSlug)
                        .ExecuteDeleteAsync();
                }
                else
                {
                    await _db.TutorialProgress
                        .Where(tp => tp.UserId == userId)
                        .ExecuteDeleteAsync();
                }
                break;

            case "all":
                // Delete all quiz attempts
                await _db.QuizAttempts.Where(qa => qa.UserId == userId).ExecuteDeleteAsync();
                
                // Delete all lesson quiz attempts
                await _db.LessonQuizAttempts.Where(lqa => lqa.UserId == userId).ExecuteDeleteAsync();
                
                // Delete all tutorial progress
                await _db.TutorialProgress.Where(tp => tp.UserId == userId).ExecuteDeleteAsync();
                break;

            default:
                throw new InvalidOperationException("Type must be 'quiz', 'tutorial', or 'all'");
        }
    }

    public async Task DeleteAccountAsync(int userId, string currentPassword)
    {
        var user = await _db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("User not found");

        if (!BCrypt.Net.BCrypt.Verify(currentPassword, user.PasswordHash))
            throw new UnauthorizedAccessException("Password is incorrect");

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
    }
}
