using System.ComponentModel.DataAnnotations;

namespace EduPlatform.API.DTOs;

public class RecentActivityDto
{
    public int Id { get; set; }
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
    public string TutorialTitle { get; set; } = string.Empty;
    public string LessonTitle { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
}

public class CreateRecentActivityDto
{
    [Required, MaxLength(100)]
    public string TutorialSlug { get; set; } = string.Empty;

    [Required, MaxLength(150)]
    public string LessonSlug { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public string TutorialTitle { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public string LessonTitle { get; set; } = string.Empty;
}
