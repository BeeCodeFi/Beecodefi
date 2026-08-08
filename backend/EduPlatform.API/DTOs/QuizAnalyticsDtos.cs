namespace EduPlatform.API.DTOs;

public class QuizAnalyticsDto
{
    public int TotalAttempts { get; set; }
    public double AverageScore { get; set; }
    public int BestScore { get; set; }
    public int WorstScore { get; set; }
    public TimeSpan AverageTimeTaken { get; set; }
    public DateTime FirstAttemptDate { get; set; }
    public DateTime LastAttemptDate { get; set; }
    public List<TopicPerformanceDto> TopicPerformance { get; set; } = new();
    public List<WeeklyPerformanceDto> WeeklyPerformance { get; set; } = new();
    public List<WeakAreaDto> WeakAreas { get; set; } = new();
}

public class TopicPerformanceDto
{
    public string Topic { get; set; } = string.Empty;
    public int Attempts { get; set; }
    public double AverageScore { get; set; }
    public double MasteryLevel { get; set; } // 0-100
    public int TotalQuestions { get; set; }
    public int CorrectAnswers { get; set; }
}

public class WeeklyPerformanceDto
{
    public string WeekStart { get; set; } = string.Empty; // ISO week date
    public int Attempts { get; set; }
    public double AverageScore { get; set; }
    public int TotalTimeMinutes { get; set; }
}

public class WeakAreaDto
{
    public string Topic { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public double AverageScore { get; set; }
    public int Attempts { get; set; }
    public string Recommendation { get; set; } = string.Empty;
}

public class QuizAttemptAnalyticsDto
{
    public int Id { get; set; }
    public string QuizTopic { get; set; } = string.Empty;
    public string QuizTitle { get; set; } = string.Empty;
    public int Score { get; set; }
    public int TotalQuestions { get; set; }
    public TimeSpan TimeTaken { get; set; }
    public DateTime AttemptDate { get; set; }
    public string Mode { get; set; } = string.Empty; // Practice, Timed, Exam
    public List<QuestionPerformanceDto> QuestionPerformance { get; set; } = new();
}

public class QuestionPerformanceDto
{
    public int QuestionId { get; set; }
    public string QuestionText { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
    public TimeSpan TimeTaken { get; set; }
    public int Attempts { get; set; }
}