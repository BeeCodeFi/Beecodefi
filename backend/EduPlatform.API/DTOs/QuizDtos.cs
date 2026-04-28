using System.ComponentModel.DataAnnotations;

namespace EduPlatform.API.DTOs;

public class QuizTopicDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Topic { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Difficulty { get; set; } = string.Empty;
    public int QuestionCount { get; set; }
    public int? BestScore { get; set; }
}

public class QuizQuestionDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string? CodeSnippet { get; set; }
    public List<QuizAnswerDto> Answers { get; set; } = new();
}

public class QuizAnswerDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
}

public class SubmitQuizDto
{
    [Required]
    public int QuizId { get; set; }

    [Required]
    public Dictionary<int, int> Answers { get; set; } = new();
}

public class QuizResultDto
{
    public int Score { get; set; }
    public int TotalQuestions { get; set; }
    public double Percentage { get; set; }
    public List<QuestionResultDto> Results { get; set; } = new();
}

public class QuestionResultDto
{
    public int QuestionId { get; set; }
    public string QuestionText { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
    public string CorrectAnswer { get; set; } = string.Empty;
    public string? UserAnswer { get; set; }
}

public class QuizAttemptDto
{
    public int Id { get; set; }
    public string QuizTitle { get; set; } = string.Empty;
    public string Topic { get; set; } = string.Empty;
    public int Score { get; set; }
    public int TotalQuestions { get; set; }
    public double Percentage { get; set; }
    public DateTime CompletedAt { get; set; }
}
