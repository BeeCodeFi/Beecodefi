using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

public class QuizController : BaseController
{
    private readonly IQuizService _quizService;

    public QuizController(IQuizService quizService)
    {
        _quizService = quizService;
    }

    [HttpGet("topics")]
    public async Task<ActionResult<List<QuizTopicDto>>> GetTopics()
    {
        int? userId = GetOptionalUserId();
        var topics = await _quizService.GetTopicsAsync(userId);
        return Ok(topics);
    }

    [HttpGet("{topic}")]
    public async Task<ActionResult<List<QuizQuestionDto>>> GetQuestions(string topic)
    {
        try
        {
            var questions = await _quizService.GetQuestionsByTopicAsync(topic);
            return Ok(questions);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPost("submit-lesson")]
    public async Task<ActionResult<QuizResultDto>> SubmitLessonQuiz([FromBody] SubmitLessonQuizDto dto)
    {
        try
        {
            int? userId = GetOptionalUserId();
            Console.WriteLine($"[QUIZ] Submitting lesson quiz - User: {userId}, Topic: {dto.QuizTopic}, Score: {dto.Score}/{dto.TotalQuestions}");
            
            var result = await _quizService.SubmitLessonQuizAsync(dto, userId);
            
            Console.WriteLine($"[QUIZ] Lesson quiz submitted successfully for user {userId}");
            return Ok(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[QUIZ ERROR] Failed to submit lesson quiz: {ex.Message}");
            Console.WriteLine($"[QUIZ ERROR] Stack trace: {ex.StackTrace}");
            return StatusCode(500, new { error = ex.Message, details = ex.ToString() });
        }
    }

    [HttpPost("submit")]
    public async Task<ActionResult<QuizResultDto>> Submit([FromBody] SubmitQuizDto dto)
    {
        int? userId = GetOptionalUserId();
        var result = await _quizService.SubmitQuizAsync(dto, userId);
        return Ok(result);
    }

    [HttpGet("history")]
    public async Task<ActionResult<PaginatedQuizHistoryDto>> GetHistory([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            int userId = GetUserId();
            Console.WriteLine($"[QUIZ HISTORY] Fetching history for user {userId}, page {page}");
            
            var history = await _quizService.GetHistoryAsync(userId, page, pageSize);
            
            Console.WriteLine($"[QUIZ HISTORY] Found {history.TotalCount} total attempts for user {userId}");
            return Ok(history);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[QUIZ HISTORY ERROR] {ex.Message}");
            Console.WriteLine($"[QUIZ HISTORY ERROR] Stack: {ex.StackTrace}");
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpGet("debug-lesson-quizzes")]
    public async Task<ActionResult> DebugLessonQuizzes()
    {
        try
        {
            int? userId = GetOptionalUserId();
            
            // Check if table exists
            var tableExists = await _quizService.CheckLessonQuizTableExistsAsync();
            
            // Get count
            var count = await _quizService.GetLessonQuizCountAsync(userId);
            
            return Ok(new { 
                tableExists, 
                userId,
                lessonQuizCount = count,
                message = tableExists 
                    ? $"Table exists with {count} records" 
                    : "LessonQuizAttempts table does NOT exist!"
            });
        }
        catch (Exception ex)
        {
            return Ok(new { 
                error = ex.Message,
                innerError = ex.InnerException?.Message,
                stackTrace = ex.StackTrace
            });
        }
    }
}
