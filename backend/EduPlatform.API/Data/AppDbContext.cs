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
    }
}
