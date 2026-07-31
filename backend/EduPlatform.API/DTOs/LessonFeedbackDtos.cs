using System.ComponentModel.DataAnnotations;

namespace EduPlatform.API.DTOs;

public class SubmitLessonFeedbackDto
{
    [Required, StringLength(100)]
    public string TutorialSlug { get; set; } = string.Empty;

    [Required, StringLength(150)]
    public string LessonSlug { get; set; } = string.Empty;

    public bool IsHelpful { get; set; }
}