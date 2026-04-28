namespace EduPlatform.API.Models;

public class TutorialProgress
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
    public DateTime CompletedAt { get; set; } = DateTime.UtcNow;
    public User User { get; set; } = null!;
}
