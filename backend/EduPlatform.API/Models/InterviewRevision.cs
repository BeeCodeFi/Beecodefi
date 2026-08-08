namespace EduPlatform.API.Models;

public class InterviewRevision
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Category { get; set; } = string.Empty; // e.g., "html", "css", "javascript"
    public string QuestionId { get; set; } = string.Empty; // e.g., "html-1", "css-5"
    public DateTime MarkedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public User User { get; set; } = null!;
}
