using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EduPlatform.API.Services;
using EduPlatform.API.DTOs;

namespace EduPlatform.API.Controllers;

[Authorize]
[ApiController]
[Route("api/quiz-analytics")]
public class QuizAnalyticsController : BaseController
{
    private readonly IQuizAnalyticsService _analyticsService;

    public QuizAnalyticsController(IQuizAnalyticsService analyticsService)
    {
        _analyticsService = analyticsService;
    }

    // GET: api/quiz-analytics/overview
    // Get comprehensive quiz analytics for current user
    [HttpGet("overview")]
    public async Task<ActionResult<QuizAnalyticsDto>> GetOverview()
    {
        var userId = GetUserId();
        var analytics = await _analyticsService.GetUserQuizAnalyticsAsync(userId);
        return Ok(analytics);
    }

    // GET: api/quiz-analytics/history
    // Get quiz attempt history
    [HttpGet("history")]
    public async Task<ActionResult<List<QuizAttemptAnalyticsDto>>> GetHistory([FromQuery] int limit = 20)
    {
        var userId = GetUserId();
        var history = await _analyticsService.GetUserAttemptHistoryAsync(userId, limit);
        return Ok(history);
    }

    // GET: api/quiz-analytics/topics
    // Get performance by topic
    [HttpGet("topics")]
    public async Task<ActionResult<List<TopicPerformanceDto>>> GetTopicPerformance()
    {
        var userId = GetUserId();
        var performance = await _analyticsService.GetTopicPerformanceAsync(userId);
        return Ok(performance);
    }

    // GET: api/quiz-analytics/weak-areas
    // Get identified weak areas with recommendations
    [HttpGet("weak-areas")]
    public async Task<ActionResult<List<WeakAreaDto>>> GetWeakAreas()
    {
        var userId = GetUserId();
        var weakAreas = await _analyticsService.IdentifyWeakAreasAsync(userId);
        return Ok(weakAreas);
    }

    // GET: api/quiz-analytics/weekly
    // Get weekly performance data
    [HttpGet("weekly")]
    public async Task<ActionResult<List<WeeklyPerformanceDto>>> GetWeeklyPerformance([FromQuery] int weeks = 12)
    {
        var userId = GetUserId();
        var weeklyData = await _analyticsService.GetWeeklyPerformanceAsync(userId, weeks);
        return Ok(weeklyData);
    }
}