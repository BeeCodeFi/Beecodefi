namespace EduPlatform.API.Models;

public class Badge
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty; // "quiz", "lesson", "streak", "special"
    public string Requirement { get; set; } = string.Empty; // e.g., "10_quizzes", "50_lessons", "7_day_streak"
    public int RequiredCount { get; set; }
    public string Color { get; set; } = string.Empty;
    public ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();
}

public class UserBadge
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int BadgeId { get; set; }
    public DateTime UnlockedAt { get; set; }
    public User User { get; set; } = null!;
    public Badge Badge { get; set; } = null!;
}
