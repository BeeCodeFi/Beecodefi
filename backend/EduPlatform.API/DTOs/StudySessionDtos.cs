namespace EduPlatform.API.DTOs;

public class StudySessionDto
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty;
    public int TotalSeconds { get; set; }
    public DateTime LastUpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class StudySessionSummaryDto
{
    public string Category { get; set; } = string.Empty;
    public int TotalSeconds { get; set; }
    public List<StudySessionDto> Sessions { get; set; } = new();
}

public class UpdateStudySessionDto
{
    public string Category { get; set; } = string.Empty;
    public int AdditionalSeconds { get; set; }
}

public class ResetStudySessionDto
{
    public string Category { get; set; } = string.Empty;
}