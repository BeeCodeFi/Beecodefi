using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace EduPlatform.API.Controllers;

public class ProfileController : BaseController
{
    private readonly AppDbContext _db;
    private readonly IBadgeService _badgeService;

    public ProfileController(AppDbContext db, IBadgeService badgeService)
    {
        _db = db;
        _badgeService = badgeService;
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<UserProfileDto>> GetProfile(string username)
    {
        var user = await _db.Users
            .Include(u => u.QuizAttempts)
            .Include(u => u.TutorialProgress)
            .FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());

        if (user == null)
        {
            return NotFound("User not found.");
        }

        // Get badges for this user
        var badges = await _badgeService.GetMyBadgesAsync(user.Id);

        // Get recent activity (last 10 items)
        var recentActivities = await _db.RecentActivities
            .Where(r => r.UserId == user.Id)
            .OrderByDescending(r => r.Timestamp)
            .Take(10)
            .Select(r => new RecentActivityDto
            {
                Id = r.Id,
                TutorialSlug = r.TutorialSlug,
                LessonSlug = r.LessonSlug,
                TutorialTitle = r.TutorialTitle,
                LessonTitle = r.LessonTitle,
                Timestamp = r.Timestamp
            })
            .ToListAsync();

        var profile = new UserProfileDto
        {
            Id = user.Id,
            Name = user.Name,
            Username = user.Username,
            Bio = user.Bio,
            ProfileImageUrl = user.ProfileImageUrl,
            TotalXP = user.TotalXP,
            Level = (int)Math.Floor(Math.Sqrt(user.TotalXP / 10.0)) + 1,
            CurrentStreak = user.CurrentStreak,
            LongestStreak = user.LongestStreak,
            CreatedAt = user.CreatedAt,
            BadgesCount = badges.Count(b => b.IsUnlocked),
            LessonsCompleted = user.TutorialProgress.Count,
            QuizzesCompleted = user.QuizAttempts.Count,
            UnlockedBadges = badges.Where(b => b.IsUnlocked).ToList(),
            RecentActivities = recentActivities
        };

        return Ok(profile);
    }

}
