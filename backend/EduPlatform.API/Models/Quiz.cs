namespace EduPlatform.API.Models;

public class Quiz
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Topic { get; set; } = string.Empty;       // unique slug e.g. "html-basics"
    public string Category { get; set; } = string.Empty;    // parent grouping e.g. "HTML"
    public string Description { get; set; } = string.Empty;
    public string Difficulty { get; set; } = "Beginner";
    public ICollection<Question> Questions { get; set; } = new List<Question>();
    public ICollection<QuizAttempt> Attempts { get; set; } = new List<QuizAttempt>();
}
