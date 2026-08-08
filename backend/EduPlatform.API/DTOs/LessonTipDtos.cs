namespace EduPlatform.API.DTOs;

public class LessonTipDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
    public string Tip { get; set; } = string.Empty;
    public int Upvotes { get; set; }
    public int Downvotes { get; set; }
    public bool IsApproved { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool? UserVote { get; set; } // null = no vote, true = upvote, false = downvote
    public bool IsOwner { get; set; }
}

public class CreateLessonTipDto
{
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
    public string Tip { get; set; } = string.Empty;
}

public class UpdateLessonTipDto
{
    public string Tip { get; set; } = string.Empty;
}

public class VoteLessonTipDto
{
    public bool IsUpvote { get; set; }
}