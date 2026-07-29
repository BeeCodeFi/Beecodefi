using System.Security.Claims;
using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly AppDbContext _db;

    public AccountController(AppDbContext db)
    {
        _db = db;
    }

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    // GET /api/account/profile
    [HttpGet("profile")]
    public async Task<ActionResult<UserDto>> GetProfile()
    {
        var user = await _db.Users.FindAsync(GetUserId());
        if (user == null) return NotFound();

        return Ok(new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            ProfileImageUrl = user.ProfileImageUrl
        });
    }

    // PUT /api/account/profile
    [HttpPut("profile")]
    public async Task<ActionResult<UserDto>> UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        var userId = GetUserId();
        var user = await _db.Users.FindAsync(userId);
        if (user == null) return NotFound();

        if (!string.IsNullOrWhiteSpace(dto.Name))
            user.Name = dto.Name.Trim();

        if (!string.IsNullOrWhiteSpace(dto.Email))
        {
            var normalizedEmail = dto.Email.Trim().ToLowerInvariant();
            if (normalizedEmail != user.Email)
            {
                if (await _db.Users.AnyAsync(u => u.Email == normalizedEmail && u.Id != userId))
                    return Conflict(new { message = "Email already in use" });
                user.Email = normalizedEmail;
            }
        }

        await _db.SaveChangesAsync();

        return Ok(new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            ProfileImageUrl = user.ProfileImageUrl
        });
    }

    // PUT /api/account/password
    [HttpPut("password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var user = await _db.Users.FindAsync(GetUserId());
        if (user == null) return NotFound();

        if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
            return BadRequest(new { message = "Current password is incorrect" });

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Password updated successfully" });
    }

    // POST /api/account/avatar
    [HttpPost("avatar")]
    public async Task<ActionResult<UserDto>> UploadAvatar([FromBody] AvatarUploadDto dto)
    {
        if (string.IsNullOrEmpty(dto.Image) || !dto.Image.StartsWith("data:image/"))
            return BadRequest(new { message = "Invalid image format" });

        // Limit to ~300KB base64 (~220KB raw image)
        if (dto.Image.Length > 307_200)
            return BadRequest(new { message = "Image too large. Please use a smaller crop." });

        var user = await _db.Users.FindAsync(GetUserId());
        if (user == null) return NotFound();

        user.ProfileImageUrl = dto.Image; // stored as base64 data URL directly in DB
        await _db.SaveChangesAsync();

        return Ok(new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            ProfileImageUrl = user.ProfileImageUrl
        });
    }

    // DELETE /api/account/avatar
    [HttpDelete("avatar")]
    public async Task<IActionResult> DeleteAvatar()
    {
        var user = await _db.Users.FindAsync(GetUserId());
        if (user == null) return NotFound();

        user.ProfileImageUrl = null;
        await _db.SaveChangesAsync();

        return Ok(new { message = "Avatar removed" });
    }

    // GET /api/account/stats
    [HttpGet("stats")]
    public async Task<ActionResult<AccountStatsDto>> GetStats()
    {
        var userId = GetUserId();
        var user = await _db.Users.FindAsync(userId);
        if (user == null) return NotFound();

        var quizAttempts = await _db.QuizAttempts
            .Where(q => q.UserId == userId)
            .ToListAsync();

        var lessonsCompleted = await _db.TutorialProgress
            .CountAsync(p => p.UserId == userId);

        // Count distinct quizzes the user has attempted (each subcategory = 1)
        var quizzesCompleted = quizAttempts
            .Select(q => q.QuizId)
            .Distinct()
            .Count();

        return Ok(new AccountStatsDto
        {
            QuizzesCompleted = quizzesCompleted,
            TotalLessonsCompleted = lessonsCompleted,
            AverageQuizScore = quizAttempts.Count > 0
                ? Math.Round(quizAttempts.Average(q => (double)q.Score / q.TotalQuestions * 100), 1)
                : 0,
            MemberSince = user.CreatedAt
        });
    }

    // POST /api/account/reset-progress
    [HttpPost("reset-progress")]
    public async Task<IActionResult> ResetProgress([FromBody] ResetProgressDto dto)
    {
        var userId = GetUserId();

        switch (dto.Type.ToLower())
        {
            case "quiz":
                if (!string.IsNullOrEmpty(dto.QuizTopic))
                {
                    var quizIds = await _db.Quizzes
                        .Where(q => q.Topic == dto.QuizTopic)
                        .Select(q => q.Id)
                        .ToListAsync();
                    await _db.QuizAttempts
                        .Where(qa => qa.UserId == userId && quizIds.Contains(qa.QuizId))
                        .ExecuteDeleteAsync();
                }
                else
                {
                    await _db.QuizAttempts
                        .Where(qa => qa.UserId == userId)
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
                await _db.QuizAttempts.Where(qa => qa.UserId == userId).ExecuteDeleteAsync();
                await _db.TutorialProgress.Where(tp => tp.UserId == userId).ExecuteDeleteAsync();
                break;

            default:
                return BadRequest(new { message = "Type must be 'quiz', 'tutorial', or 'all'" });
        }

        return Ok(new { message = "Progress reset successfully" });
    }

    // DELETE /api/account
    [HttpDelete]
    public async Task<IActionResult> DeleteAccount([FromBody] ChangePasswordDto dto)
    {
        var user = await _db.Users.FindAsync(GetUserId());
        if (user == null) return NotFound();

        if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
            return BadRequest(new { message = "Password is incorrect" });

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Account deleted" });
    }
}
