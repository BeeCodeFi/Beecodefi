namespace EduPlatform.API.Models;

public class CustomQuiz
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Topic { get; set; } = string.Empty; // Comma-separated topics
    public string Difficulty { get; set; } = "Mixed"; // Mixed, Beginner, Intermediate, Advanced
    public int QuestionCount { get; set; }
    public string ShareCode { get; set; } = string.Empty; // Unique code for sharing
    public bool IsPublic { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int TimesTaken { get; set; } = 0;
    
    public User User { get; set; } = null!;
    public ICollection<CustomQuizQuestion> Questions { get; set; } = new List<CustomQuizQuestion>();
}

public class CustomQuizQuestion
{
    public int Id { get; set; }
    public int CustomQuizId { get; set; }
    public int QuestionId { get; set; } // Reference to original Question
    public int DisplayOrder { get; set; }
    
    public CustomQuiz CustomQuiz { get; set; } = null!;
    public Question Question { get; set; } = null!;
}