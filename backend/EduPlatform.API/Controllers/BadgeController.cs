using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

public class BadgeController : BaseController
{
    private readonly IBadgeService _badgeService;

    public BadgeController(IBadgeService badgeService)
    {
        _badgeService = badgeService;
    }

    [HttpGet]
    public async Task<ActionResult<List<BadgeDto>>> GetAllBadges()
    {
        int? userId = GetOptionalUserId();
        var badges = await _badgeService.GetAllBadgesAsync(userId);
        return Ok(badges);
    }

    [Authorize]
    [HttpGet("my")]
    public async Task<ActionResult<List<BadgeDto>>> GetMyBadges()
    {
        var badges = await _badgeService.GetMyBadgesAsync(GetUserId());
        return Ok(badges);
    }

    [Authorize]
    [HttpPost("check")]
    public async Task<ActionResult<List<BadgeDto>>> CheckAndUnlockBadges()
    {
        var newlyUnlocked = await _badgeService.CheckAndUnlockBadgesAsync(GetUserId());
        return Ok(newlyUnlocked);
    }
}
