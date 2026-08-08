using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

[Authorize(Policy = "AdminOnly")]
[Route("api/admin")]
public class AdminController : BaseController
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpGet("analytics")]
    public async Task<ActionResult<AdminAnalyticsDto>> GetAnalytics(CancellationToken cancellationToken)
    {
        var analytics = await _adminService.GetAnalyticsAsync(cancellationToken);
        return Ok(analytics);
    }

    [HttpGet("code-examples/pending")]
    public async Task<ActionResult<List<LessonCodeExampleDto>>> GetPendingCodeExamples(CancellationToken cancellationToken)
    {
        var pendingExamples = await _adminService.GetPendingCodeExamplesAsync(cancellationToken);
        return Ok(pendingExamples);
    }

    [HttpPost("code-examples/{id}/approve")]
    public async Task<IActionResult> ApproveCodeExample(int id, CancellationToken cancellationToken)
    {
        var result = await _adminService.ApproveCodeExampleAsync(id, cancellationToken);
        if (!result)
            return NotFound();
        return Ok(new { message = "Code example approved" });
    }

    [HttpDelete("code-examples/{id}/reject")]
    public async Task<IActionResult> RejectCodeExample(int id, CancellationToken cancellationToken)
    {
        var result = await _adminService.RejectCodeExampleAsync(id, cancellationToken);
        if (!result)
            return NotFound();
        return Ok(new { message = "Code example rejected and deleted" });
    }

    [HttpGet("tips/pending")]
    public async Task<ActionResult<List<LessonTipDto>>> GetPendingTips(CancellationToken cancellationToken)
    {
        var pendingTips = await _adminService.GetPendingTipsAsync(cancellationToken);
        return Ok(pendingTips);
    }

    [HttpPost("tips/{id}/approve")]
    public async Task<IActionResult> ApproveTip(int id, CancellationToken cancellationToken)
    {
        var result = await _adminService.ApproveTipAsync(id, cancellationToken);
        if (!result)
            return NotFound();
        return Ok(new { message = "Tip approved" });
    }

    [HttpDelete("tips/{id}/reject")]
    public async Task<IActionResult> RejectTip(int id, CancellationToken cancellationToken)
    {
        var result = await _adminService.RejectTipAsync(id, cancellationToken);
        if (!result)
            return NotFound();
        return Ok(new { message = "Tip rejected and deleted" });
    }
}
