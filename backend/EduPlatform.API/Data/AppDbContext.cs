using Microsoft.EntityFrameworkCore;
using EduPlatform.API.Models;

namespace EduPlatform.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Quiz> Quizzes => Set<Quiz>();
    public DbSet<Question> Questions => Set<Question>();
    public DbSet<Answer> Answers => Set<Answer>();
    public DbSet<QuizAttempt> QuizAttempts => Set<QuizAttempt>();
    public DbSet<LessonQuizAttempt> LessonQuizAttempts => Set<LessonQuizAttempt>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
    public DbSet<TutorialProgress> TutorialProgress => Set<TutorialProgress>();
    public DbSet<Badge> Badges => Set<Badge>();
    public DbSet<UserBadge> UserBadges => Set<UserBadge>();
    public DbSet<LessonFeedback> LessonFeedback => Set<LessonFeedback>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<Bookmark> Bookmarks => Set<Bookmark>();
    public DbSet<RecentActivity> RecentActivities => Set<RecentActivity>();
    public DbSet<InterviewRevision> InterviewRevisions => Set<InterviewRevision>();
    public DbSet<InterviewProgress> InterviewProgress => Set<InterviewProgress>();
    public DbSet<InterviewNote> InterviewNotes => Set<InterviewNote>();
    public DbSet<CodeSnippet> CodeSnippets => Set<CodeSnippet>();
    public DbSet<LessonComment> LessonComments => Set<LessonComment>();
    public DbSet<CommentVote> CommentVotes => Set<CommentVote>();
    public DbSet<QuizQuestionBookmark> QuizQuestionBookmarks => Set<QuizQuestionBookmark>();
    public DbSet<LessonCodeExample> LessonCodeExamples => Set<LessonCodeExample>();
    public DbSet<LessonCodeExampleVote> LessonCodeExampleVotes => Set<LessonCodeExampleVote>();
    public DbSet<LessonTip> LessonTips => Set<LessonTip>();
    public DbSet<LessonTipVote> LessonTipVotes => Set<LessonTipVote>();
    public DbSet<StudySession> StudySessions => Set<StudySession>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(u => u.Email).IsUnique();
            entity.Property(u => u.Email).HasMaxLength(256);
            entity.Property(u => u.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Quiz>(entity =>
        {
            entity.HasIndex(q => q.Topic);
            entity.Property(q => q.Title).HasMaxLength(200);
            entity.Property(q => q.Topic).HasMaxLength(50);
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasOne(q => q.Quiz)
                .WithMany(qz => qz.Questions)
                .HasForeignKey(q => q.QuizId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Answer>(entity =>
        {
            entity.HasOne(a => a.Question)
                .WithMany(q => q.Answers)
                .HasForeignKey(a => a.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<QuizAttempt>(entity =>
        {
            entity.HasOne(qa => qa.User)
                .WithMany(u => u.QuizAttempts)
                .HasForeignKey(qa => qa.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(qa => qa.Quiz)
                .WithMany(q => q.Attempts)
                .HasForeignKey(qa => qa.QuizId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<LessonQuizAttempt>(entity =>
        {
            entity.HasOne(lqa => lqa.User)
                .WithMany()
                .HasForeignKey(lqa => lqa.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(lqa => lqa.QuizTopic);
            entity.Property(lqa => lqa.QuizTopic).HasMaxLength(100);
            entity.Property(lqa => lqa.QuizTitle).HasMaxLength(200);
            entity.Property(lqa => lqa.Category).HasMaxLength(50);
        });

        modelBuilder.Entity<TutorialProgress>(entity =>
        {
            entity.HasOne(tp => tp.User)
                .WithMany(u => u.TutorialProgress)
                .HasForeignKey(tp => tp.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(tp => new { tp.UserId, tp.TutorialSlug, tp.LessonSlug }).IsUnique();
        });

        modelBuilder.Entity<ContactMessage>(entity =>
        {
            entity.Property(c => c.Email).HasMaxLength(256);
            entity.Property(c => c.Subject).HasMaxLength(200);
        });

        modelBuilder.Entity<Badge>(entity =>
        {
            entity.HasIndex(b => b.Requirement).IsUnique();
            entity.Property(b => b.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<UserBadge>(entity =>
        {
            entity.HasOne(ub => ub.User)
                .WithMany()
                .HasForeignKey(ub => ub.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(ub => ub.Badge)
                .WithMany(b => b.UserBadges)
                .HasForeignKey(ub => ub.BadgeId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(ub => new { ub.UserId, ub.BadgeId }).IsUnique();
        });

        modelBuilder.Entity<LessonFeedback>(entity =>
        {
            entity.Property(feedback => feedback.TutorialSlug).HasMaxLength(100);
            entity.Property(feedback => feedback.LessonSlug).HasMaxLength(150);
            entity.HasIndex(feedback => new { feedback.TutorialSlug, feedback.LessonSlug });
            entity.HasOne(feedback => feedback.User)
                .WithMany()
                .HasForeignKey(feedback => feedback.UserId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasIndex(rt => rt.Token).IsUnique();
            entity.HasIndex(rt => rt.ExpiresAt);
            entity.HasIndex(rt => new { rt.UserId, rt.IsRevoked, rt.ExpiresAt });
            entity.Property(rt => rt.Token).HasMaxLength(200);
            entity.HasOne(rt => rt.User)
                .WithMany()
                .HasForeignKey(rt => rt.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Bookmark>(entity =>
        {
            entity.HasOne(b => b.User)
                .WithMany(u => u.Bookmarks)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(b => new { b.UserId, b.TutorialSlug, b.LessonSlug }).IsUnique();
            entity.Property(b => b.TutorialSlug).HasMaxLength(100);
            entity.Property(b => b.LessonSlug).HasMaxLength(150);
            entity.Property(b => b.LessonTitle).HasMaxLength(200);
            entity.Property(b => b.TrackTitle).HasMaxLength(200);
        });

        modelBuilder.Entity<RecentActivity>(entity =>
        {
            entity.HasOne(ra => ra.User)
                .WithMany(u => u.RecentActivities)
                .HasForeignKey(ra => ra.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(ra => new { ra.UserId, ra.Timestamp });
            entity.Property(ra => ra.TutorialSlug).HasMaxLength(100);
            entity.Property(ra => ra.LessonSlug).HasMaxLength(150);
            entity.Property(ra => ra.TutorialTitle).HasMaxLength(200);
            entity.Property(ra => ra.LessonTitle).HasMaxLength(200);
        });

        modelBuilder.Entity<InterviewRevision>(entity =>
        {
            entity.HasOne(ir => ir.User)
                .WithMany()
                .HasForeignKey(ir => ir.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(ir => new { ir.UserId, ir.Category, ir.QuestionId }).IsUnique();
            entity.Property(ir => ir.Category).HasMaxLength(50);
            entity.Property(ir => ir.QuestionId).HasMaxLength(50);
        });

        modelBuilder.Entity<InterviewProgress>(entity =>
        {
            entity.HasOne(ip => ip.User)
                .WithMany()
                .HasForeignKey(ip => ip.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(ip => new { ip.UserId, ip.Category, ip.QuestionId }).IsUnique();
            entity.Property(ip => ip.Category).HasMaxLength(50);
            entity.Property(ip => ip.QuestionId).HasMaxLength(50);
        });

        modelBuilder.Entity<InterviewNote>(entity =>
        {
            entity.HasOne(n => n.User)
                .WithMany()
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(n => new { n.UserId, n.Category, n.QuestionId }).IsUnique();
            entity.Property(n => n.Category).HasMaxLength(50);
            entity.Property(n => n.QuestionId).HasMaxLength(50);
        });

        modelBuilder.Entity<CodeSnippet>(entity =>
        {
            entity.HasOne(cs => cs.User)
                .WithMany()
                .HasForeignKey(cs => cs.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(cs => cs.ShareId).IsUnique();
            entity.Property(cs => cs.Name).HasMaxLength(200);
            entity.Property(cs => cs.Language).HasMaxLength(50);
            entity.Property(cs => cs.ShareId).HasMaxLength(50);
        });

        modelBuilder.Entity<LessonComment>(entity =>
        {
            entity.HasOne(lc => lc.User)
                .WithMany()
                .HasForeignKey(lc => lc.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(lc => new { lc.TutorialSlug, lc.LessonSlug });
            entity.Property(lc => lc.TutorialSlug).HasMaxLength(100);
            entity.Property(lc => lc.LessonSlug).HasMaxLength(150);
            entity.Property(lc => lc.Content).HasMaxLength(2000);
        });

        modelBuilder.Entity<CommentVote>(entity =>
        {
            entity.HasOne(cv => cv.User)
                .WithMany()
                .HasForeignKey(cv => cv.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(cv => cv.Comment)
                .WithMany(c => c.Votes)
                .HasForeignKey(cv => cv.CommentId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(cv => new { cv.UserId, cv.CommentId }).IsUnique();
        });

        modelBuilder.Entity<QuizQuestionBookmark>(entity =>
        {
            entity.HasOne(qqb => qqb.User)
                .WithMany(u => u.QuizQuestionBookmarks)
                .HasForeignKey(qqb => qqb.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(qqb => new { qqb.UserId, qqb.QuestionId, qqb.QuizTopic }).IsUnique();
            entity.Property(qqb => qqb.QuizTopic).HasMaxLength(100);
            entity.Property(qqb => qqb.QuestionText).HasMaxLength(1000);
        });

        modelBuilder.Entity<LessonCodeExample>(entity =>
        {
            entity.HasOne(lce => lce.User)
                .WithMany()
                .HasForeignKey(lce => lce.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(lce => new { lce.TutorialSlug, lce.LessonSlug });
            entity.HasIndex(lce => lce.IsApproved);
            entity.Property(lce => lce.TutorialSlug).HasMaxLength(100);
            entity.Property(lce => lce.LessonSlug).HasMaxLength(150);
            entity.Property(lce => lce.Title).HasMaxLength(200);
            entity.Property(lce => lce.Description).HasMaxLength(1000);
            entity.Property(lce => lce.Language).HasMaxLength(50);
        });

        modelBuilder.Entity<LessonCodeExampleVote>(entity =>
        {
            entity.HasOne(lcev => lcev.User)
                .WithMany()
                .HasForeignKey(lcev => lcev.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(lcev => lcev.CodeExample)
                .WithMany(lce => lce.Votes)
                .HasForeignKey(lcev => lcev.CodeExampleId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(lcev => new { lcev.UserId, lcev.CodeExampleId }).IsUnique();
        });

        modelBuilder.Entity<LessonTip>(entity =>
        {
            entity.HasOne(lt => lt.User)
                .WithMany()
                .HasForeignKey(lt => lt.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(lt => new { lt.TutorialSlug, lt.LessonSlug });
            entity.HasIndex(lt => lt.IsApproved);
            entity.Property(lt => lt.TutorialSlug).HasMaxLength(100);
            entity.Property(lt => lt.LessonSlug).HasMaxLength(150);
            entity.Property(lt => lt.Tip).HasMaxLength(500);
        });

        modelBuilder.Entity<LessonTipVote>(entity =>
        {
            entity.HasOne(ltv => ltv.User)
                .WithMany()
                .HasForeignKey(ltv => ltv.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(ltv => ltv.Tip)
                .WithMany(lt => lt.Votes)
                .HasForeignKey(ltv => ltv.TipId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(ltv => new { ltv.UserId, ltv.TipId }).IsUnique();
        });

        modelBuilder.Entity<StudySession>(entity =>
        {
            entity.HasOne(ss => ss.User)
                .WithMany(u => u.StudySessions)
                .HasForeignKey(ss => ss.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(ss => new { ss.UserId, ss.Category }).IsUnique();
            entity.Property(ss => ss.Category).HasMaxLength(50);
        });
    }
}
