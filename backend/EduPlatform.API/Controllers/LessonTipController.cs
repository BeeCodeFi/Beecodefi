using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

[Authorize]
[Route("api/[controller]")]
public class LessonTipController : BaseController
{
    private readonly ILessonTipService _tipService;

    public LessonTipController(ILessonTipService tipService)
    {
        _tipService = tipService;
    }

    // GET /api/lessontip?tutorialSlug=X&lessonSlug=Y
    [HttpGet]
    public async Task<ActionResult<List<LessonTipDto>>> GetTips([FromQuery] string tutorialSlug, [FromQuery] string lessonSlug)
    {
        if (string.IsNullOrWhiteSpace(tutorialSlug) || string.IsNullOrWhiteSpace(lessonSlug))
        {
            return BadRequest(new { message = "tutorialSlug and lessonSlug are required" });
        }

        var tips = await _tipService.GetTipsAsync(tutorialSlug, lessonSlug, GetUserId());
        return Ok(tips);
    }

    // GET /api/lessontip/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<LessonTipDto?>> GetTip(int id)
    {
        var tip = await _tipService.GetTipAsync(id, GetUserId());
        if (tip == null)
            return NotFound();
        return Ok(tip);
    }

    // POST /api/lessontip
    [HttpPost]
    public async Task<ActionResult<LessonTipDto>> CreateTip([FromBody] CreateLessonTipDto dto)
    {
        var tip = await _tipService.CreateTipAsync(GetUserId(), dto);
        return Ok(tip);
    }

    // PUT /api/lessontip/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<LessonTipDto?>> UpdateTip(int id, [FromBody] UpdateLessonTipDto dto)
    {
        var tip = await _tipService.UpdateTipAsync(GetUserId(), id, dto);
        if (tip == null)
            return NotFound();
        return Ok(tip);
    }

    // DELETE /api/lessontip/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTip(int id)
    {
        var result = await _tipService.DeleteTipAsync(GetUserId(), id);
        if (!result)
            return NotFound();
        return Ok(new { message = "Tip deleted" });
    }

    // POST /api/lessontip/{id}/vote
    [HttpPost("{id}/vote")]
    public async Task<ActionResult<LessonTipDto?>> VoteTip(int id, [FromBody] VoteLessonTipDto dto)
    {
        var tip = await _tipService.VoteTipAsync(GetUserId(), id, dto.IsUpvote);
        if (tip == null)
            return NotFound();
        return Ok(tip);
    }

    // DELETE /api/lessontip/{id}/vote
    [HttpDelete("{id}/vote")]
    public async Task<IActionResult> RemoveVote(int id)
    {
        var result = await _tipService.RemoveVoteAsync(GetUserId(), id);
        if (!result)
            return NotFound();
        return Ok(new { message = "Vote removed" });
    }
}

// Admin endpoint for approving tips
[Authorize(Roles = "Admin")]
[Route("api/admin/[controller]")]
public class AdminLessonTipController : BaseController
{
    private readonly ILessonTipService _tipService;

    public AdminLessonTipController(ILessonTipService tipService)
    {
        _tipService = tipService;
    }

    // POST /api/admin/lessontip/{id}/approve
    [HttpPost("{id}/approve")]
    public async Task<IActionResult> ApproveTip(int id)
    {
        var result = await _tipService.ApproveTipAsync(id);
        if (!result)
            return NotFound();
        return Ok(new { message = "Tip approved" });
    }
}