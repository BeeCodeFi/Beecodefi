namespace EduPlatform.API.Models;

public class InterviewNote
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Category { get; set; } = string.Empty;    // "html", "css", "javascript"
    public string QuestionId { get; set; } = string.Empty; // e.g. "html-1", "js-3"
    public string NoteText { get; set; } = string.Empty;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public User User { get; set; } = null!;
}
