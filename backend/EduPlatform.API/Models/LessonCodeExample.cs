namespace EduPlatform.API.Models;

public class LessonCodeExample
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string Language { get; set; } = string.Empty;
    public int Upvotes { get; set; } = 0;
    public int Downvotes { get; set; } = 0;
    public bool IsApproved { get; set; } = false; // Admin approval for community examples
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    
    public User User { get; set; } = null!;
    public ICollection<LessonCodeExampleVote> Votes { get; set; } = new List<LessonCodeExampleVote>();
}

public class LessonCodeExampleVote
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int CodeExampleId { get; set; }
    public bool IsUpvote { get; set; } // true = upvote, false = downvote
    public DateTime VotedAt { get; set; } = DateTime.UtcNow;
    
    public User User { get; set; } = null!;
    public LessonCodeExample CodeExample { get; set; } = null!;
}