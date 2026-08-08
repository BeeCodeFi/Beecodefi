namespace EduPlatform.API.Models;

public class QuizQuestionBookmark
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int QuestionId { get; set; }
    public string QuizTopic { get; set; } = string.Empty;
    public string QuestionText { get; set; } = string.Empty;
    public DateTime BookmarkedAt { get; set; } = DateTime.UtcNow;
    
    public User User { get; set; } = null!;
}
