namespace EduPlatform.API.Models;

public class LessonComment
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int Upvotes { get; set; } = 0;
    public int Downvotes { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    
    public User User { get; set; } = null!;
    public ICollection<CommentVote> Votes { get; set; } = new List<CommentVote>();
}

public class CommentVote
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int CommentId { get; set; }
    public bool IsUpvote { get; set; } // true = upvote, false = downvote
    public DateTime VotedAt { get; set; } = DateTime.UtcNow;
    
    public User User { get; set; } = null!;
    public LessonComment Comment { get; set; } = null!;
}
