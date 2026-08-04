namespace EduPlatform.API.Models;

public class Bookmark
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
    public string LessonTitle { get; set; } = string.Empty;
    public string TrackTitle { get; set; } = string.Empty;
    public DateTime SavedAt { get; set; } = DateTime.UtcNow;
    
    public User User { get; set; } = null!;
}
