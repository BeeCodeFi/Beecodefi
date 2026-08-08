using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

[Authorize]
[Route("api/[controller]")]
public class CodeSnippetController : BaseController
{
    private readonly ICodeSnippetService _snippetService;

    public CodeSnippetController(ICodeSnippetService snippetService)
    {
        _snippetService = snippetService;
    }

    // GET /api/codesnippet
    [HttpGet]
    public async Task<ActionResult<List<CodeSnippetDto>>> GetSnippets()
    {
        var snippets = await _snippetService.GetSnippetsAsync(GetUserId());
        return Ok(snippets);
    }

    // GET /api/codesnippet/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<CodeSnippetDto?>> GetSnippet(int id)
    {
        var snippet = await _snippetService.GetSnippetAsync(GetUserId(), id);
        if (snippet == null)
            return NotFound();
        return Ok(snippet);
    }

    // POST /api/codesnippet
    [HttpPost]
    public async Task<ActionResult<CodeSnippetDto>> CreateSnippet([FromBody] CreateCodeSnippetDto dto)
    {
        var snippet = await _snippetService.CreateSnippetAsync(GetUserId(), dto);
        return Ok(snippet);
    }

    // PUT /api/codesnippet/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<CodeSnippetDto?>> UpdateSnippet(int id, [FromBody] UpdateCodeSnippetDto dto)
    {
        var snippet = await _snippetService.UpdateSnippetAsync(GetUserId(), id, dto);
        if (snippet == null)
            return NotFound();
        return Ok(snippet);
    }

    // DELETE /api/codesnippet/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSnippet(int id)
    {
        var result = await _snippetService.DeleteSnippetAsync(GetUserId(), id);
        if (!result)
            return NotFound();
        return Ok(new { message = "Snippet deleted" });
    }
}

// Public endpoint for shared snippets
[AllowAnonymous]
[Route("api/shared")]
public class SharedSnippetController : ControllerBase
{
    private readonly ICodeSnippetService _snippetService;

    public SharedSnippetController(ICodeSnippetService snippetService)
    {
        _snippetService = snippetService;
    }

    // GET /api/shared/{shareId}
    [HttpGet("{shareId}")]
    public async Task<ActionResult<CodeSnippetDto?>> GetSharedSnippet(string shareId)
    {
        var snippet = await _snippetService.GetSnippetByShareIdAsync(shareId);
        if (snippet == null)
            return NotFound();
        return Ok(snippet);
    }
}
