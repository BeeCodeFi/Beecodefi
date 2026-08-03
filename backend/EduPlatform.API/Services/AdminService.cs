using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class AdminService : IAdminService
{
    private readonly AppDbContext _db;

    public AdminService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<AdminAnalyticsDto> GetAnalyticsAsync(CancellationToken cancellationToken)
    {
        var users = await _db.Users
            .AsNoTracking()
            .OrderByDescending(user => user.LastActivityDate ?? user.CreatedAt)
            .Select(user => new AdminUserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                LastActivityDate = user.LastActivityDate,
                CurrentStreak = user.CurrentStreak,
                LongestStreak = user.LongestStreak,
                LessonsCompleted = user.TutorialProgress.Count,
                QuizAttempts = user.QuizAttempts.Count,
                AverageQuizScore = user.QuizAttempts.Any()
                    ? Math.Round(user.QuizAttempts.Average(attempt =>
                        attempt.TotalQuestions == 0
                            ? 0
                            : (double)attempt.Score / attempt.TotalQuestions * 100), 1)
                    : 0,
            })
            .ToListAsync(cancellationToken);

        var thirtyDaysAgo = DateTime.UtcNow.Date.AddDays(-29);
        var lessonActivity = await _db.TutorialProgress
            .AsNoTracking()
            .Where(progress => progress.CompletedAt >= thirtyDaysAgo)
            .GroupBy(progress => progress.CompletedAt.Date)
            .Select(group => new ActivityPointDto
            {
                Date = group.Key,
                LessonsCompleted = group.Count(),
                QuizAttempts = 0,
            })
            .ToListAsync(cancellationToken);

        var quizActivity = await _db.QuizAttempts
            .AsNoTracking()
            .Where(attempt => attempt.CompletedAt >= thirtyDaysAgo)
            .GroupBy(attempt => attempt.CompletedAt.Date)
            .Select(group => new { Date = group.Key, Count = group.Count() })
            .ToListAsync(cancellationToken);

        var activity = Enumerable.Range(0, 30)
            .Select(offset => thirtyDaysAgo.AddDays(offset))
            .Select(date => new ActivityPointDto
            {
                Date = date,
                LessonsCompleted = lessonActivity.FirstOrDefault(point => point.Date == date)?.LessonsCompleted ?? 0,
                QuizAttempts = quizActivity.FirstOrDefault(point => point.Date == date)?.Count ?? 0,
            })
            .ToList();

        var feedback = await _db.ContactMessages
            .AsNoTracking()
            .OrderByDescending(message => message.CreatedAt)
            .Take(100)
            .Select(message => new AdminFeedbackDto
            {
                Id = message.Id,
                Name = message.Name,
                Email = message.Email,
                Subject = message.Subject,
                Message = message.Message,
                CreatedAt = message.CreatedAt,
                IsRead = message.IsRead,
            })
            .ToListAsync(cancellationToken);

        var lessonFeedback = await _db.LessonFeedback
            .AsNoTracking()
            .GroupBy(feedback => new { feedback.TutorialSlug, feedback.LessonSlug })
            .Select(group => new LessonFeedbackInsightDto
            {
                TutorialSlug = group.Key.TutorialSlug,
                LessonSlug = group.Key.LessonSlug,
                Helpful = group.Count(feedback => feedback.IsHelpful),
                NotHelpful = group.Count(feedback => !feedback.IsHelpful),
            })
            .OrderByDescending(insight => insight.Helpful + insight.NotHelpful)
            .ToListAsync(cancellationToken);

        return new AdminAnalyticsDto
        {
            TotalUsers = users.Count,
            ActiveUsersLast30Days = users.Count(user => user.LastActivityDate >= thirtyDaysAgo),
            TotalLessonsCompleted = users.Sum(user => user.LessonsCompleted),
            TotalQuizAttempts = users.Sum(user => user.QuizAttempts),
            AverageQuizScore = users.Where(user => user.QuizAttempts > 0)
                .Select(user => user.AverageQuizScore)
                .DefaultIfEmpty(0)
                .Average(),
            UnreadFeedback = feedback.Count(message => !message.IsRead),
            Activity = activity,
            Users = users,
            Feedback = feedback,
            LessonFeedback = lessonFeedback,
        };
    }
}
