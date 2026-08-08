namespace EduPlatform.API.Models;

public class LessonTip
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
    public string Tip { get; set; } = string.Empty;
    public int Upvotes { get; set; } = 0;
    public int Downvotes { get; set; } = 0;
    public bool IsApproved { get; set; } = false; // Admin approval for community tips
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    
    public User User { get; set; } = null!;
    public ICollection<LessonTipVote> Votes { get; set; } = new List<LessonTipVote>();
}

public class LessonTipVote
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int TipId { get; set; }
    public bool IsUpvote { get; set; } // true = upvote, false = downvote
    public DateTime VotedAt { get; set; } = DateTime.UtcNow;
    
    public User User { get; set; } = null!;
    public LessonTip Tip { get; set; } = null!;
}