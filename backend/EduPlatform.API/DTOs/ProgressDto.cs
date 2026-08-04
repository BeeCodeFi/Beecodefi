using System.ComponentModel.DataAnnotations;

namespace EduPlatform.API.DTOs;

public class MarkProgressDto
{
    [Required]
    public string TutorialSlug { get; set; } = string.Empty;

    [Required]
    public string LessonSlug { get; set; } = string.Empty;
    
    // Optional - for recent activity tracking
    public string? TutorialTitle { get; set; }
    public string? LessonTitle { get; set; }
}

public class ProgressDto
{
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
    public DateTime CompletedAt { get; set; }
}
