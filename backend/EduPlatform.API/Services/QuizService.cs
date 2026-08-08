using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class QuizService : IQuizService
{
    private readonly AppDbContext _db;
    private readonly IStreakService _streakService;
    private readonly IBadgeService _badgeService;
    private readonly IXPService _xpService;

    public QuizService(AppDbContext db, IStreakService streakService, IBadgeService badgeService, IXPService xpService)
    {
        _db = db;
        _streakService = streakService;
        _badgeService = badgeService;
        _xpService = xpService;
    }

    public async Task<List<QuizTopicDto>> GetTopicsAsync(int? userId = null)
    {
        var quizzes = await _db.Quizzes
            .Include(q => q.Questions)
            .OrderBy(q => q.DisplayOrder)
            .ThenBy(q => q.Id)
            .AsNoTracking()
            .ToListAsync();

        var result = new List<QuizTopicDto>();

        foreach (var quiz in quizzes)
        {
            int? bestScore = null;
            if (userId.HasValue)
            {
                bestScore = await _db.QuizAttempts
                    .Where(a => a.QuizId == quiz.Id && a.UserId == userId.Value)
                    .MaxAsync(a => (int?)a.Score);
            }

            result.Add(new QuizTopicDto
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Topic = quiz.Topic,
                Category = quiz.Category,
                Description = quiz.Description,
                Difficulty = quiz.Difficulty,
                QuestionCount = quiz.Questions.Count,
                BestScore = bestScore
            });
        }

        return result;
    }

    public async Task<List<QuizQuestionDto>> GetQuestionsByTopicAsync(string topic)
    {
        var quiz = await _db.Quizzes
            .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
            .AsNoTracking()
            .FirstOrDefaultAsync(q => q.Topic.ToLower() == topic.ToLower())
            ?? throw new KeyNotFoundException($"Quiz for topic '{topic}' not found");

        return quiz.Questions.Select(q => new QuizQuestionDto
        {
            Id = q.Id,
            Text = q.Text,
            CodeSnippet = q.CodeSnippet,
            Answers = q.Answers.Select(a => new QuizAnswerDto
            {
                Id = a.Id,
                Text = a.Text
            }).OrderBy(_ => Guid.NewGuid()).ToList()
        }).ToList();
    }

    public async Task<QuizResultDto> SubmitQuizAsync(SubmitQuizDto dto, int? userId = null)
    {
        var quiz = await _db.Quizzes
            .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
            .FirstOrDefaultAsync(q => q.Id == dto.QuizId)
            ?? throw new KeyNotFoundException("Quiz not found");

        var results = new List<QuestionResultDto>();
        int score = 0;

        foreach (var question in quiz.Questions)
        {
            var correctAnswer = question.Answers.First(a => a.IsCorrect);
            dto.Answers.TryGetValue(question.Id, out var userAnswerId);
            var userAnswer = question.Answers.FirstOrDefault(a => a.Id == userAnswerId);
            var isCorrect = userAnswerId == correctAnswer.Id;

            if (isCorrect) score++;

            results.Add(new QuestionResultDto
            {
                QuestionId = question.Id,
                QuestionText = question.Text,
                IsCorrect = isCorrect,
                CorrectAnswer = correctAnswer.Text,
                UserAnswer = userAnswer?.Text,
                Explanation = question.Explanation
            });
        }

        if (userId.HasValue)
        {
            var today = DateTime.UtcNow.Date;
            var tomorrow = today.AddDays(1);
            
            // Check if user already has an attempt for this quiz today
            var existingAttemptToday = await _db.QuizAttempts
                .Where(a => a.UserId == userId.Value 
                    && a.QuizId == dto.QuizId 
                    && a.CompletedAt >= today 
                    && a.CompletedAt < tomorrow)
                .FirstOrDefaultAsync();

            if (existingAttemptToday != null)
            {
                // Update existing attempt if new score is better
                if (score > existingAttemptToday.Score)
                {
                    existingAttemptToday.Score = score;
                    existingAttemptToday.CompletedAt = DateTime.UtcNow;
                    _db.QuizAttempts.Update(existingAttemptToday);
                }
                // If score is not better, just update the timestamp but keep the best score
                else
                {
                    existingAttemptToday.CompletedAt = DateTime.UtcNow;
                    _db.QuizAttempts.Update(existingAttemptToday);
                }
            }
            else
            {
                // Create new attempt for a different day
                _db.QuizAttempts.Add(new QuizAttempt
                {
                    UserId = userId.Value,
                    QuizId = dto.QuizId,
                    Score = score,
                    TotalQuestions = quiz.Questions.Count,
                    CompletedAt = DateTime.UtcNow
                });
            }
            
            await _db.SaveChangesAsync();
            
            // Update streak when quiz is completed
            await _streakService.UpdateStreakAsync(userId.Value);
            
            // Check and unlock badges
            await _badgeService.CheckAndUnlockBadgesAsync(userId.Value);
            
            // Track in Recent Activity
            var existingActivity = await _db.RecentActivities
                .Where(ra => ra.UserId == userId.Value 
                    && ra.TutorialSlug == "quiz"
                    && ra.LessonSlug == quiz.Topic)
                .ToListAsync();
            
            if (existingActivity.Any())
            {
                _db.RecentActivities.RemoveRange(existingActivity);
            }
            
            _db.RecentActivities.Add(new RecentActivity
            {
                UserId = userId.Value,
                TutorialSlug = "quiz",
                LessonSlug = quiz.Topic,
                TutorialTitle = "Quiz",
                LessonTitle = quiz.Title,
                Timestamp = DateTime.UtcNow
            });
            
            await _db.SaveChangesAsync();

            // Award XP
            await _xpService.AddXPAsync(userId.Value, score * 10, $"Completed quiz: {quiz.Title}");
        }

        return new QuizResultDto
        {
            Score = score,
            TotalQuestions = quiz.Questions.Count,
            Percentage = Math.Round((double)score / quiz.Questions.Count * 100, 1),
            Results = results
        };
    }

    public async Task<QuizResultDto> SubmitLessonQuizAsync(SubmitLessonQuizDto dto, int? userId = null)
    {
        Console.WriteLine($"[QuizService] SubmitLessonQuizAsync called - UserId: {userId}, Topic: {dto.QuizTopic}");
        
        if (userId.HasValue)
        {
            try
            {
                var today = DateTime.UtcNow.Date;
                var tomorrow = today.AddDays(1);
                
                // Check if user already has an attempt for this lesson quiz today
                var existingAttemptToday = await _db.LessonQuizAttempts
                    .Where(a => a.UserId == userId.Value 
                        && a.QuizTopic == dto.QuizTopic 
                        && a.CompletedAt >= today 
                        && a.CompletedAt < tomorrow)
                    .FirstOrDefaultAsync();

                if (existingAttemptToday != null)
                {
                    Console.WriteLine($"[QuizService] Found existing attempt today, updating...");
                    
                    // Update existing attempt if new score is better
                    if (dto.Score > existingAttemptToday.Score)
                    {
                        existingAttemptToday.Score = dto.Score;
                        existingAttemptToday.CompletedAt = DateTime.UtcNow;
                        _db.LessonQuizAttempts.Update(existingAttemptToday);
                        Console.WriteLine($"[QuizService] Updated with better score: {dto.Score}");
                    }
                    else
                    {
                        // Just update timestamp, keep the best score
                        existingAttemptToday.CompletedAt = DateTime.UtcNow;
                        _db.LessonQuizAttempts.Update(existingAttemptToday);
                        Console.WriteLine($"[QuizService] Updated timestamp only, kept existing score: {existingAttemptToday.Score}");
                    }
                }
                else
                {
                    Console.WriteLine($"[QuizService] No existing attempt today, creating new entry...");
                    
                    var attempt = new LessonQuizAttempt
                    {
                        UserId = userId.Value,
                        QuizTopic = dto.QuizTopic,
                        QuizTitle = dto.QuizTitle,
                        Category = dto.Category,
                        Score = dto.Score,
                        TotalQuestions = dto.TotalQuestions,
                        CompletedAt = DateTime.UtcNow
                    };
                    
                    _db.LessonQuizAttempts.Add(attempt);
                }
                
                Console.WriteLine($"[QuizService] Saving changes to database...");
                await _db.SaveChangesAsync();
                Console.WriteLine($"[QuizService] Successfully saved/updated lesson quiz attempt");
                
                // Update streak when lesson quiz is completed
                await _streakService.UpdateStreakAsync(userId.Value);
                
                // Check and unlock badges
                await _badgeService.CheckAndUnlockBadgesAsync(userId.Value);
                
                // Track in Recent Activity
                var existingActivity = await _db.RecentActivities
                    .Where(ra => ra.UserId == userId.Value 
                        && ra.TutorialSlug == "lesson-quiz"
                        && ra.LessonSlug == dto.QuizTopic)
                    .ToListAsync();
                
                if (existingActivity.Any())
                {
                    _db.RecentActivities.RemoveRange(existingActivity);
                }
                
                _db.RecentActivities.Add(new RecentActivity
                {
                    UserId = userId.Value,
                    TutorialSlug = "lesson-quiz",
                    LessonSlug = dto.QuizTopic,
                    TutorialTitle = dto.Category ?? "Lesson Quiz",
                    LessonTitle = dto.QuizTitle,
                    Timestamp = DateTime.UtcNow
                });
                
                await _db.SaveChangesAsync();

            // Award XP
            await _xpService.AddXPAsync(userId.Value, dto.Score * 5, $"Completed lesson quiz: {dto.QuizTitle}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[QuizService ERROR] Failed to save lesson quiz: {ex.Message}");
                Console.WriteLine($"[QuizService ERROR] Inner exception: {ex.InnerException?.Message}");
                throw;
            }
        }
        else
        {
            Console.WriteLine($"[QuizService] No userId provided, skipping database save");
        }

        return new QuizResultDto
        {
            Score = dto.Score,
            TotalQuestions = dto.TotalQuestions,
            Percentage = Math.Round((double)dto.Score / dto.TotalQuestions * 100, 1),
            Results = new List<QuestionResultDto>()
        };
    }

    public async Task<bool> CheckLessonQuizTableExistsAsync()
    {
        try
        {
            await _db.LessonQuizAttempts.AnyAsync();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<int> GetLessonQuizCountAsync(int? userId)
    {
        try
        {
            if (userId.HasValue)
            {
                // Count unique quizzes (distinct quiz topics) not total attempts
                return await _db.LessonQuizAttempts
                    .Where(q => q.UserId == userId.Value)
                    .Select(q => q.QuizTopic)
                    .Distinct()
                    .CountAsync();
            }
            
            // Count unique quizzes across all users
            return await _db.LessonQuizAttempts
                .Select(q => q.QuizTopic)
                .Distinct()
                .CountAsync();
        }
        catch
        {
            return -1;
        }
    }

    public async Task<PaginatedQuizHistoryDto> GetHistoryAsync(int userId, int page = 1, int pageSize = 10)
    {
        Console.WriteLine($"[QuizService] GetHistoryAsync called for user {userId}");
        
        // Ensure valid page and pageSize values
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        try
        {
            // Get all regular quiz attempts for the user
            var allQuizAttempts = await _db.QuizAttempts
                .Where(a => a.UserId == userId)
                .Include(a => a.Quiz)
                .OrderByDescending(a => a.CompletedAt)
                .Select(a => new QuizAttemptDto
                {
                    Id = a.Id,
                    QuizTitle = a.Quiz.Title,
                    Topic = a.Quiz.Topic,
                    Category = a.Quiz.Category,
                    Score = a.Score,
                    TotalQuestions = a.TotalQuestions,
                    Percentage = Math.Round((double)a.Score / a.TotalQuestions * 100, 1),
                    CompletedAt = a.CompletedAt
                })
                .ToListAsync();

            Console.WriteLine($"[QuizService] Found {allQuizAttempts.Count} regular quiz attempts");

            // Get all lesson quiz attempts for the user
            var allLessonQuizAttempts = await _db.LessonQuizAttempts
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.CompletedAt)
                .Select(a => new QuizAttemptDto
                {
                    Id = -a.Id, // Negative ID to distinguish from regular quizzes
                    QuizTitle = a.QuizTitle,
                    Topic = a.QuizTopic,
                    Category = a.Category,
                    Score = a.Score,
                    TotalQuestions = a.TotalQuestions,
                    Percentage = Math.Round((double)a.Score / a.TotalQuestions * 100, 1),
                    CompletedAt = a.CompletedAt
                })
                .ToListAsync();

            Console.WriteLine($"[QuizService] Found {allLessonQuizAttempts.Count} lesson quiz attempts");

            // Group by quiz+date in memory (one per quiz per day)
            var groupedQuizAttempts = allQuizAttempts
                .GroupBy(a => new { a.Topic, Date = a.CompletedAt.Date })
                .Select(g => g.OrderByDescending(a => a.CompletedAt).First())
                .ToList();

            var groupedLessonQuizAttempts = allLessonQuizAttempts
                .GroupBy(a => new { a.Topic, Date = a.CompletedAt.Date })
                .Select(g => g.OrderByDescending(a => a.CompletedAt).First())
                .ToList();

            // Combine both lists and sort by completion date
            var combinedList = groupedQuizAttempts
                .Concat(groupedLessonQuizAttempts)
                .OrderByDescending(a => a.CompletedAt)
                .ToList();

            var totalCount = combinedList.Count;
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var items = combinedList
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            Console.WriteLine($"[QuizService] Returning {items.Count} items out of {totalCount} total (after grouping)");

            return new PaginatedQuizHistoryDto
            {
                Items = items,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                TotalPages = totalPages,
                HasNextPage = page < totalPages,
                HasPreviousPage = page > 1
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[QuizService ERROR] GetHistoryAsync failed: {ex.Message}");
            Console.WriteLine($"[QuizService ERROR] Inner: {ex.InnerException?.Message}");
            throw;
        }
    }

    public async Task<Dictionary<string, int>> GetBestScoresAsync(int userId)
    {
        var scores = new Dictionary<string, int>();

        // Get regular quiz scores
        var regularScores = await _db.QuizAttempts
            .Where(a => a.UserId == userId)
            .Include(a => a.Quiz)
            .GroupBy(a => a.Quiz.Topic)
            .Select(g => new { Topic = g.Key, BestScore = g.Max(a => a.Score) })
            .ToListAsync();

        foreach (var rs in regularScores)
        {
            scores[rs.Topic] = rs.BestScore;
        }

        // Get lesson quiz scores
        var lessonScores = await _db.LessonQuizAttempts
            .Where(a => a.UserId == userId)
            .GroupBy(a => a.QuizTopic)
            .Select(g => new { Topic = g.Key, BestScore = g.Max(a => a.Score) })
            .ToListAsync();

        foreach (var ls in lessonScores)
        {
            // If there's overlap, keep the highest (shouldn't be overlap in practice)
            if (scores.TryGetValue(ls.Topic, out var existingScore))
            {
                scores[ls.Topic] = Math.Max(existingScore, ls.BestScore);
            }
            else
            {
                scores[ls.Topic] = ls.BestScore;
            }
        }

        return scores;
    }
}
