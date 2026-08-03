using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

[Authorize]
public class ProgressController : BaseController
{
    private readonly IProgressService _progressService;

    public ProgressController(IProgressService progressService)
    {
        _progressService = progressService;
    }

    [HttpPost("mark")]
    public async Task<IActionResult> MarkComplete([FromBody] MarkProgressDto dto)
    {
        await _progressService.MarkCompleteAsync(GetUserId(), dto);
        return Ok(new { message = "Progress saved" });
    }

    [HttpDelete("unmark")]
    public async Task<IActionResult> UnmarkComplete([FromQuery] string tutorialSlug, [FromQuery] string lessonSlug)
    {
        try
        {
            await _progressService.UnmarkCompleteAsync(GetUserId(), tutorialSlug, lessonSlug);
            return Ok(new { message = "Progress removed" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<ProgressDto>>> GetProgress()
    {
        var progress = await _progressService.GetProgressAsync(GetUserId());
        return Ok(progress);
    }
}
