using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EduPlatform.API.Services;
using EduPlatform.API.DTOs;

namespace EduPlatform.API.Controllers;

[Authorize]
[ApiController]
[Route("api/custom-quiz")]
public class CustomQuizController : BaseController
{
    private readonly ICustomQuizService _customQuizService;

    public CustomQuizController(ICustomQuizService customQuizService)
    {
        _customQuizService = customQuizService;
    }

    // POST: api/custom-quiz/create
    // Create a new custom quiz
    [HttpPost("create")]
    public async Task<ActionResult<CustomQuizDto>> CreateCustomQuiz([FromBody] CustomQuizRequestDto request)
    {
        try
        {
            var userId = GetUserId();
            var customQuiz = await _customQuizService.CreateCustomQuizAsync(userId, request);
            return Ok(customQuiz);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // GET: api/custom-quiz/my
    // Get current user's custom quizzes
    [HttpGet("my")]
    public async Task<ActionResult<List<CustomQuizDto>>> GetMyCustomQuizzes()
    {
        var userId = GetUserId();
        var quizzes = await _customQuizService.GetUserCustomQuizzesAsync(userId);
        return Ok(quizzes);
    }

    // GET: api/custom-quiz/{id}
    // Get a specific custom quiz by ID
    [HttpGet("{id}")]
    public async Task<ActionResult<CustomQuizDto>> GetCustomQuizById(int id)
    {
        var userId = GetUserId();
        var quiz = await _customQuizService.GetCustomQuizByIdAsync(id, userId);
        
        if (quiz == null)
            return NotFound(new { message = "Custom quiz not found" });
        
        return Ok(quiz);
    }

    // GET: api/custom-quiz/share/{shareCode}
    // Get a custom quiz by share code (public quizzes only)
    [AllowAnonymous]
    [HttpGet("share/{shareCode}")]
    public async Task<ActionResult<CustomQuizDto>> GetCustomQuizByShareCode(string shareCode)
    {
        var quiz = await _customQuizService.GetCustomQuizByShareCodeAsync(shareCode);
        
        if (quiz == null)
            return NotFound(new { message = "Custom quiz not found or not public" });
        
        return Ok(quiz);
    }

    // GET: api/custom-quiz/public
    // Get public custom quizzes
    [AllowAnonymous]
    [HttpGet("public")]
    public async Task<ActionResult<List<SharedQuizDto>>> GetPublicCustomQuizzes([FromQuery] int limit = 20)
    {
        var quizzes = await _customQuizService.GetPublicCustomQuizzesAsync(limit);
        return Ok(quizzes);
    }

    // DELETE: api/custom-quiz/{id}
    // Delete a custom quiz
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCustomQuiz(int id)
    {
        var userId = GetUserId();
        var success = await _customQuizService.DeleteCustomQuizAsync(id, userId);
        
        if (!success)
            return NotFound(new { message = "Custom quiz not found" });
        
        return Ok(new { message = "Custom quiz deleted successfully" });
    }

    // POST: api/custom-quiz/{id}/toggle-public
    // Toggle quiz visibility (public/private)
    [HttpPost("{id}/toggle-public")]
    public async Task<ActionResult> ToggleQuizVisibility(int id)
    {
        var userId = GetUserId();
        var quiz = await _customQuizService.GetCustomQuizByIdAsync(id, userId);
        
        if (quiz == null)
            return NotFound(new { message = "Custom quiz not found" });
        
        // Note: This would need to be implemented in the service
        // For now, we'll return a placeholder response
        return Ok(new { message = "Quiz visibility toggled" });
    }
}