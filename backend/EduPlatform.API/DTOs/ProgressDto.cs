using System.ComponentModel.DataAnnotations;

namespace EduPlatform.API.DTOs;

public class MarkProgressDto
{
    [Required]
    public string TutorialSlug { get; set; } = string.Empty;

    [Required]
    public string LessonSlug { get; set; } = string.Empty;
}

public class ProgressDto
{
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
    public DateTime CompletedAt { get; set; }
}
