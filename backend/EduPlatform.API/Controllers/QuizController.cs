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

    [HttpPost("submit")]
    public async Task<ActionResult<QuizResultDto>> Submit([FromBody] SubmitQuizDto dto)
    {
        int? userId = GetOptionalUserId();
        var result = await _quizService.SubmitQuizAsync(dto, userId);
        return Ok(result);
    }

    [Authorize]
    [HttpGet("history")]
    public async Task<ActionResult<List<QuizAttemptDto>>> GetHistory()
    {
        int userId = GetUserId();
        var history = await _quizService.GetHistoryAsync(userId);
        return Ok(history);
    }
}
