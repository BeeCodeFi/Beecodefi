namespace EduPlatform.API.Models;

public class InterviewProgress
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Category { get; set; } = string.Empty; // "html", "css", "javascript"
    public string QuestionId { get; set; } = string.Empty; // "html-1", "css-5", "js-3"
    public DateTime ReadAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public User User { get; set; } = null!;
}
