namespace EduPlatform.API.DTOs;

public sealed class AdminAnalyticsDto
{
    public int TotalUsers { get; set; }
    public int ActiveUsersLast30Days { get; set; }
    public int TotalLessonsCompleted { get; set; }
    public int TotalQuizAttempts { get; set; }
    public double AverageQuizScore { get; set; }
    public int UnreadFeedback { get; set; }
    public List<ActivityPointDto> Activity { get; set; } = [];
    public List<AdminUserDto> Users { get; set; } = [];
    public List<AdminFeedbackDto> Feedback { get; set; } = [];
    public List<LessonFeedbackInsightDto> LessonFeedback { get; set; } = [];
}

public sealed class ActivityPointDto
{
    public DateTime Date { get; set; }
    public int LessonsCompleted { get; set; }
    public int QuizAttempts { get; set; }
}

public sealed class AdminUserDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? LastActivityDate { get; set; }
    public int CurrentStreak { get; set; }
    public int LongestStreak { get; set; }
    public int LessonsCompleted { get; set; }
    public int QuizAttempts { get; set; }
    public double AverageQuizScore { get; set; }
}

public sealed class AdminFeedbackDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public bool IsRead { get; set; }
}

public sealed class LessonFeedbackInsightDto
{
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
    public int Helpful { get; set; }
    public int NotHelpful { get; set; }
}
