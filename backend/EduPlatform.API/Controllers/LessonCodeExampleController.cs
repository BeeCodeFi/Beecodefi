using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

[Authorize]
[Route("api/[controller]")]
public class LessonCodeExampleController : BaseController
{
    private readonly ILessonCodeExampleService _codeExampleService;

    public LessonCodeExampleController(ILessonCodeExampleService codeExampleService)
    {
        _codeExampleService = codeExampleService;
    }

    // GET /api/lessoncodeexample?tutorialSlug=X&lessonSlug=Y
    [HttpGet]
    public async Task<ActionResult<List<LessonCodeExampleDto>>> GetCodeExamples([FromQuery] string tutorialSlug, [FromQuery] string lessonSlug)
    {
        if (string.IsNullOrWhiteSpace(tutorialSlug) || string.IsNullOrWhiteSpace(lessonSlug))
        {
            return BadRequest(new { message = "tutorialSlug and lessonSlug are required" });
        }

        var examples = await _codeExampleService.GetCodeExamplesAsync(tutorialSlug, lessonSlug, GetUserId());
        return Ok(examples);
    }

    // GET /api/lessoncodeexample/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<LessonCodeExampleDto?>> GetCodeExample(int id)
    {
        var example = await _codeExampleService.GetCodeExampleAsync(id, GetUserId());
        if (example == null)
            return NotFound();
        return Ok(example);
    }

    // POST /api/lessoncodeexample
    [HttpPost]
    public async Task<ActionResult<LessonCodeExampleDto>> CreateCodeExample([FromBody] CreateLessonCodeExampleDto dto)
    {
        var example = await _codeExampleService.CreateCodeExampleAsync(GetUserId(), dto);
        return Ok(example);
    }

    // PUT /api/lessoncodeexample/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<LessonCodeExampleDto?>> UpdateCodeExample(int id, [FromBody] UpdateLessonCodeExampleDto dto)
    {
        var example = await _codeExampleService.UpdateCodeExampleAsync(GetUserId(), id, dto);
        if (example == null)
            return NotFound();
        return Ok(example);
    }

    // DELETE /api/lessoncodeexample/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCodeExample(int id)
    {
        var result = await _codeExampleService.DeleteCodeExampleAsync(GetUserId(), id);
        if (!result)
            return NotFound();
        return Ok(new { message = "Code example deleted" });
    }

    // POST /api/lessoncodeexample/{id}/vote
    [HttpPost("{id}/vote")]
    public async Task<ActionResult<LessonCodeExampleDto?>> VoteCodeExample(int id, [FromBody] VoteLessonCodeExampleDto dto)
    {
        var example = await _codeExampleService.VoteCodeExampleAsync(GetUserId(), id, dto.IsUpvote);
        if (example == null)
            return NotFound();
        return Ok(example);
    }

    // DELETE /api/lessoncodeexample/{id}/vote
    [HttpDelete("{id}/vote")]
    public async Task<IActionResult> RemoveVote(int id)
    {
        var result = await _codeExampleService.RemoveVoteAsync(GetUserId(), id);
        if (!result)
            return NotFound();
        return Ok(new { message = "Vote removed" });
    }
}

// Admin endpoint for approving code examples
[Authorize(Roles = "Admin")]
[Route("api/admin/[controller]")]
public class AdminLessonCodeExampleController : BaseController
{
    private readonly ILessonCodeExampleService _codeExampleService;

    public AdminLessonCodeExampleController(ILessonCodeExampleService codeExampleService)
    {
        _codeExampleService = codeExampleService;
    }

    // POST /api/admin/lessoncodeexample/{id}/approve
    [HttpPost("{id}/approve")]
    public async Task<IActionResult> ApproveCodeExample(int id)
    {
        var result = await _codeExampleService.ApproveCodeExampleAsync(id);
        if (!result)
            return NotFound();
        return Ok(new { message = "Code example approved" });
    }
}