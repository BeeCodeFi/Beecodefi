using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

[Authorize]
[Route("api/[controller]")]
public class XPController : BaseController
{
    private readonly IXPService _xpService;

    public XPController(IXPService xpService)
    {
        _xpService = xpService;
    }

    // GET /api/xp/info
    [HttpGet("info")]
    public async Task<ActionResult<XPInfoDto>> GetXPInfo()
    {
        var userId = GetUserId();
        var xpInfo = await _xpService.GetXPInfoAsync(userId);
        return Ok(xpInfo);
    }
}