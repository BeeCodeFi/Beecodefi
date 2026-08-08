namespace EduPlatform.API.DTOs;

public class LessonCommentDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int Upvotes { get; set; }
    public int Downvotes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool? UserVote { get; set; } // true = upvote, false = downvote, null = no vote
}

public class CreateCommentDto
{
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
}

public class UpdateCommentDto
{
    public string Content { get; set; } = string.Empty;
}

public class VoteCommentDto
{
    public bool IsUpvote { get; set; }
}
