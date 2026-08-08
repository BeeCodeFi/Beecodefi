using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

[Authorize]
[Route("api/[controller]")]
public class AiExplanationController : BaseController
{
    private readonly IAiExplanationService _aiExplanationService;

    public AiExplanationController(IAiExplanationService aiExplanationService)
    {
        _aiExplanationService = aiExplanationService;
    }

    // POST /api/aiexplanation
    [HttpPost]
    public async Task<ActionResult<AiExplanationResponseDto>> GenerateExplanation([FromBody] AiExplanationDto dto)
    {
        try
        {
            var response = await _aiExplanationService.GenerateExplanationAsync(dto);
            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Failed to generate explanation", error = ex.Message });
        }
    }
}