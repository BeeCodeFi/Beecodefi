namespace EduPlatform.API.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string? ProfileImageUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? PasswordResetToken { get; set; }
    public DateTime? PasswordResetTokenExpiry { get; set; }
    public int CurrentStreak { get; set; } = 0;
    public int LongestStreak { get; set; } = 0;
    public DateTime? LastActivityDate { get; set; }
    public ICollection<QuizAttempt> QuizAttempts { get; set; } = new List<QuizAttempt>();
    public ICollection<TutorialProgress> TutorialProgress { get; set; } = new List<TutorialProgress>();
    public ICollection<Bookmark> Bookmarks { get; set; } = new List<Bookmark>();
    public ICollection<RecentActivity> RecentActivities { get; set; } = new List<RecentActivity>();
}
