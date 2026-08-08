using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

[Authorize]
[Route("api/[controller]")]
public class CommentController : BaseController
{
    private readonly ICommentService _commentService;

    public CommentController(ICommentService commentService)
    {
        _commentService = commentService;
    }

    // GET /api/comment?tutorialSlug=X&lessonSlug=Y
    [HttpGet]
    public async Task<ActionResult<List<LessonCommentDto>>> GetComments([FromQuery] string tutorialSlug, [FromQuery] string lessonSlug)
    {
        if (string.IsNullOrWhiteSpace(tutorialSlug) || string.IsNullOrWhiteSpace(lessonSlug))
        {
            return BadRequest(new { message = "tutorialSlug and lessonSlug are required" });
        }

        var comments = await _commentService.GetCommentsAsync(tutorialSlug, lessonSlug, GetUserId());
        return Ok(comments);
    }

    // GET /api/comment/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<LessonCommentDto?>> GetComment(int id)
    {
        var comment = await _commentService.GetCommentAsync(id, GetUserId());
        if (comment == null)
            return NotFound();
        return Ok(comment);
    }

    // POST /api/comment
    [HttpPost]
    public async Task<ActionResult<LessonCommentDto>> CreateComment([FromBody] CreateCommentDto dto)
    {
        var comment = await _commentService.CreateCommentAsync(GetUserId(), dto);
        return Ok(comment);
    }

    // PUT /api/comment/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<LessonCommentDto?>> UpdateComment(int id, [FromBody] UpdateCommentDto dto)
    {
        var comment = await _commentService.UpdateCommentAsync(GetUserId(), id, dto);
        if (comment == null)
            return NotFound();
        return Ok(comment);
    }

    // DELETE /api/comment/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComment(int id)
    {
        var result = await _commentService.DeleteCommentAsync(GetUserId(), id);
        if (!result)
            return NotFound();
        return Ok(new { message = "Comment deleted" });
    }

    // POST /api/comment/{id}/vote
    [HttpPost("{id}/vote")]
    public async Task<ActionResult<LessonCommentDto?>> VoteComment(int id, [FromBody] VoteCommentDto dto)
    {
        var comment = await _commentService.VoteCommentAsync(GetUserId(), id, dto.IsUpvote);
        if (comment == null)
            return NotFound();
        return Ok(comment);
    }

    // DELETE /api/comment/{id}/vote
    [HttpDelete("{id}/vote")]
    public async Task<IActionResult> RemoveVote(int id)
    {
        var result = await _commentService.RemoveVoteAsync(GetUserId(), id);
        if (!result)
            return NotFound();
        return Ok(new { message = "Vote removed" });
    }
}
