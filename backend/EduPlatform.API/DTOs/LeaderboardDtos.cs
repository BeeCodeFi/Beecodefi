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

public class PaginatedLeaderboardDto
{
    public List<LeaderboardEntryDto> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public bool HasNextPage { get; set; }
    public bool HasPreviousPage { get; set; }
}
