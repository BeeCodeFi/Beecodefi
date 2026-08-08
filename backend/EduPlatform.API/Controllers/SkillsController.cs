using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;

namespace EduPlatform.API.Controllers;

[Authorize]
[ApiController]
[Route("api/skills")]
public class SkillsController : BaseController
{
    private readonly AppDbContext _context;

    public SkillsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/skills/my
    // Get current user's skills
    [HttpGet("my")]
    public async Task<ActionResult<UserSkillsDto>> GetMySkills()
    {
        var userId = GetUserId();
        var user = await _context.Users.FindAsync(userId);
        
        if (user == null)
            return NotFound(new { message = "User not found" });

        var parsedSkills = ParseSkills(user.Skills);

        return Ok(new UserSkillsDto
        {
            UserId = user.Id,
            Skills = user.Skills,
            ParsedSkills = parsedSkills
        });
    }

    // GET: api/skills/{userId}
    // Get another user's skills (public)
    [AllowAnonymous]
    [HttpGet("{userId}")]
    public async Task<ActionResult<UserSkillsDto>> GetUserSkills(int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        
        if (user == null)
            return NotFound(new { message = "User not found" });

        var parsedSkills = ParseSkills(user.Skills);

        return Ok(new UserSkillsDto
        {
            UserId = user.Id,
            Skills = user.Skills,
            ParsedSkills = parsedSkills
        });
    }

    // PUT: api/skills/my
    // Update current user's skills
    [HttpPut("my")]
    public async Task<ActionResult<UserSkillsDto>> UpdateMySkills([FromBody] SkillsDto dto)
    {
        var userId = GetUserId();
        var user = await _context.Users.FindAsync(userId);
        
        if (user == null)
            return NotFound(new { message = "User not found" });

        // Validate skills format (comma-separated values)
        if (!string.IsNullOrWhiteSpace(dto.Skills))
        {
            var skills = dto.Skills.Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(s => s.Trim())
                .Where(s => s.Length > 0 && s.Length <= 50)
                .ToList();

            if (skills.Count > 20)
                return BadRequest(new { message = "Maximum 20 skills allowed" });

            user.Skills = string.Join(", ", skills);
        }
        else
        {
            user.Skills = null;
        }

        await _context.SaveChangesAsync();

        var parsedSkills = ParseSkills(user.Skills);

        return Ok(new UserSkillsDto
        {
            UserId = user.Id,
            Skills = user.Skills,
            ParsedSkills = parsedSkills
        });
    }

    // GET: api/skills/search
    // Search users by skills
    [AllowAnonymous]
    [HttpGet("search")]
    public async Task<ActionResult<List<UserProfileDto>>> SearchBySkills([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query) || query.Length < 2)
            return BadRequest(new { message = "Query must be at least 2 characters" });

        var searchTerm = query.ToLowerInvariant();

        var users = await _context.Users
            .Where(u => u.Skills != null && u.Skills.ToLowerInvariant().Contains(searchTerm))
            .Select(u => new UserProfileDto
            {
                Id = u.Id,
                Name = u.Name,
                Username = u.Username,
                Bio = u.Bio,
                Skills = u.Skills,
                ProfileImageUrl = u.ProfileImageUrl,
                TotalXP = u.TotalXP,
                Level = CalculateLevel(u.TotalXP),
                CurrentStreak = u.CurrentStreak,
                LongestStreak = u.LongestStreak,
                CreatedAt = u.CreatedAt,
                BadgesCount = 0, // Would need to join with UserBadges
                LessonsCompleted = 0, // Would need to count from TutorialProgress
                QuizzesCompleted = 0, // Would need to count from QuizAttempts
                UnlockedBadges = new List<BadgeDto>(),
                RecentActivities = new List<RecentActivityDto>()
            })
            .Take(20)
            .ToListAsync();

        return Ok(users);
    }

    // GET: api/skills/popular
    // Get popular skills across all users
    [AllowAnonymous]
    [HttpGet("popular")]
    public async Task<ActionResult<List<SkillPopularityDto>>> GetPopularSkills()
    {
        var usersWithSkills = await _context.Users
            .Where(u => u.Skills != null && !string.IsNullOrWhiteSpace(u.Skills))
            .Select(u => u.Skills)
            .ToListAsync();

        var skillCounts = new Dictionary<string, int>();

        foreach (var skills in usersWithSkills)
        {
            var skillList = skills?.Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(s => s.Trim().ToLowerInvariant())
                .Where(s => !string.IsNullOrWhiteSpace(s)) ?? Enumerable.Empty<string>();

            foreach (var skill in skillList)
            {
                if (skillCounts.ContainsKey(skill))
                    skillCounts[skill]++;
                else
                    skillCounts[skill] = 1;
            }
        }

        var popularSkills = skillCounts
            .OrderByDescending(kvp => kvp.Value)
            .Take(20)
            .Select(kvp => new SkillPopularityDto
            {
                Skill = kvp.Key,
                UserCount = kvp.Value
            })
            .ToList();

        return Ok(popularSkills);
    }

    private List<SkillCategoryDto> ParseSkills(string? skills)
    {
        var result = new List<SkillCategoryDto>();

        if (string.IsNullOrWhiteSpace(skills))
            return result;

        var skillList = skills.Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(s => s.Trim())
            .Where(s => !string.IsNullOrWhiteSpace(s))
            .ToList();

        // Categorize skills based on common tech categories
        var categories = new Dictionary<string, List<string>>
        {
            { "Frontend", new[] { "react", "vue", "angular", "javascript", "typescript", "html", "css", "tailwind", "next.js", "redux" }.ToList() },
            { "Backend", new[] { "node.js", "express", "nest.js", "python", "django", "flask", "java", "spring", "c#", ".net", "go", "rust" }.ToList() },
            { "Database", new[] { "sql", "postgresql", "mysql", "mongodb", "redis", "elasticsearch" }.ToList() },
            { "DevOps", new[] { "docker", "kubernetes", "aws", "azure", "gcp", "ci/cd", "jenkins", "git", "terraform" }.ToList() },
            { "Mobile", new[] { "react native", "flutter", "swift", "kotlin", "android", "ios" }.ToList() },
            { "Other", new List<string>() }
        };

        foreach (var skill in skillList)
        {
            var lowerSkill = skill.ToLowerInvariant();
            string category = "Other";
            int level = 1; // Default level

            // Determine category
            foreach (var cat in categories)
            {
                if (cat.Value.Any(s => lowerSkill.Contains(s)))
                {
                    category = cat.Key;
                    break;
                }
            }

            // Simple level estimation based on user's total XP (this would need real logic)
            // For now, we'll just use a default level
            result.Add(new SkillCategoryDto
            {
                Category = category,
                Level = level,
                Tags = new[] { skill }
            });
        }

        return result;
    }

    private int CalculateLevel(int totalXP)
    {
        // Simple level calculation: level = sqrt(XP / 100)
        return (int)Math.Sqrt(totalXP / 100.0) + 1;
    }
}

public class SkillPopularityDto
{
    public string Skill { get; set; } = string.Empty;
    public int UserCount { get; set; }
}