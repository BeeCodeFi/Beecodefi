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

    [Authorize]
    [HttpGet("history")]
    public async Task<ActionResult<PaginatedQuizHistoryDto>> GetHistory([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        int userId = GetUserId();
        var history = await _quizService.GetHistoryAsync(userId, page, pageSize);
        return Ok(history);
    }
}
