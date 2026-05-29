using System.ComponentModel.DataAnnotations;

namespace EduPlatform.API.DTOs;

public class UpdateProfileDto
{
    [StringLength(100, MinimumLength = 1)]
    public string? Name { get; set; }

    [EmailAddress]
    public string? Email { get; set; }
}

public class ChangePasswordDto
{
    [Required]
    public string CurrentPassword { get; set; } = string.Empty;

    [Required, MinLength(6)]
    public string NewPassword { get; set; } = string.Empty;
}

public class ResetProgressDto
{
    [Required]
    public string Type { get; set; } = string.Empty; // "quiz", "tutorial", or "all"

    public string? TutorialSlug { get; set; } // optional: reset specific tutorial
    public string? QuizTopic { get; set; }    // optional: reset specific quiz topic
}

public class AccountStatsDto
{
    public int QuizzesCompleted { get; set; }
    public int TotalLessonsCompleted { get; set; }
    public double AverageQuizScore { get; set; }
    public DateTime MemberSince { get; set; }
}

public class AvatarUploadDto
{
    [Required]
    public string Image { get; set; } = string.Empty; // base64 data URL (e.g. data:image/jpeg;base64,...)
}
