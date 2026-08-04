namespace EduPlatform.API.Models;

public class LessonQuizAttempt
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string QuizTopic { get; set; } = string.Empty;  // e.g., "html/canvas-api"
    public string QuizTitle { get; set; } = string.Empty;  // e.g., "HTML • Canvas API"
    public string Category { get; set; } = string.Empty;   // e.g., "HTML"
    public int Score { get; set; }
    public int TotalQuestions { get; set; }
    public DateTime CompletedAt { get; set; } = DateTime.UtcNow;
    public User User { get; set; } = null!;
}
