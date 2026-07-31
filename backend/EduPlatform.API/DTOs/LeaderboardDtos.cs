namespace EduPlatform.API.DTOs;

public class LeaderboardEntryDto
{
    public int Rank { get; set; }
    public string UserName { get; set; } = string.Empty;
    public int TotalPoints { get; set; }
    public int QuizzesCompleted { get; set; }
    public int LessonsCompleted { get; set; }
    public double AverageScore { get; set; }
    public int CurrentStreak { get; set; }
    public string? ProfileImageUrl { get; set; }
}

public class UserStatsDto
{
    public int TotalPoints { get; set; }
    public int QuizzesCompleted { get; set; }
    public int LessonsCompleted { get; set; }
    public double AverageScore { get; set; }
    public int CurrentStreak { get; set; }
    public int LongestStreak { get; set; }
    public int GlobalRank { get; set; }
}
