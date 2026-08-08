namespace EduPlatform.API.DTOs;

public class UserProfileDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public string? Skills { get; set; }
    public string? ProfileImageUrl { get; set; }
    public int TotalXP { get; set; }
    public int Level { get; set; }
    public int CurrentStreak { get; set; }
    public int LongestStreak { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // Summary data for profile
    public int BadgesCount { get; set; }
    public int LessonsCompleted { get; set; }
    public int QuizzesCompleted { get; set; }
    
    public List<BadgeDto> UnlockedBadges { get; set; } = new();
    public List<RecentActivityDto> RecentActivities { get; set; } = new();
}


