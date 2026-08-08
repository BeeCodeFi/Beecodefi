namespace EduPlatform.API.DTOs;

public class CustomQuizRequestDto
{
    public string[] Topics { get; set; } = Array.Empty<string>();
    public string[] Difficulties { get; set; } = Array.Empty<string>();
    public int QuestionCount { get; set; } = 10;
    public string? Title { get; set; }
    public string? Description { get; set; }
}

public class CustomQuizDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Topic { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Difficulty { get; set; } = string.Empty;
    public int QuestionCount { get; set; }
    public string ShareCode { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public bool IsPublic { get; set; }
}

public class SharedQuizDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Topic { get; set; } = string.Empty;
    public string Difficulty { get; set; } = string.Empty;
    public int QuestionCount { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public int TimesTaken { get; set; }
}