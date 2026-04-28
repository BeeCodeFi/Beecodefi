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
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
    public DbSet<TutorialProgress> TutorialProgress => Set<TutorialProgress>();

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
    }
}
