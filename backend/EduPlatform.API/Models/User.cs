namespace EduPlatform.API.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string? ProfileImageUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? PasswordResetToken { get; set; }
    public DateTime? PasswordResetTokenExpiry { get; set; }
    public int CurrentStreak { get; set; } = 0;
    public int LongestStreak { get; set; } = 0;
    public int TotalXP { get; set; } = 0;
    public string Username { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public DateTime? LastActivityDate { get; set; }
    public ICollection<QuizAttempt> QuizAttempts { get; set; } = new List<QuizAttempt>();
    public ICollection<TutorialProgress> TutorialProgress { get; set; } = new List<TutorialProgress>();
    public ICollection<Bookmark> Bookmarks { get; set; } = new List<Bookmark>();
    public ICollection<RecentActivity> RecentActivities { get; set; } = new List<RecentActivity>();
    public ICollection<CodeSnippet> CodeSnippets { get; set; } = new List<CodeSnippet>();
    public ICollection<LessonComment> Comments { get; set; } = new List<LessonComment>();
    public ICollection<CommentVote> CommentVotes { get; set; } = new List<CommentVote>();
    public ICollection<QuizQuestionBookmark> QuizQuestionBookmarks { get; set; } = new List<QuizQuestionBookmark>();
    public ICollection<LessonCodeExample> LessonCodeExamples { get; set; } = new List<LessonCodeExample>();
    public ICollection<LessonCodeExampleVote> LessonCodeExampleVotes { get; set; } = new List<LessonCodeExampleVote>();
    public ICollection<LessonTip> LessonTips { get; set; } = new List<LessonTip>();
    public ICollection<LessonTipVote> LessonTipVotes { get; set; } = new List<LessonTipVote>();
}
