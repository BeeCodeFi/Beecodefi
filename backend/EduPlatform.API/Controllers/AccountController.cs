using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

[Authorize]
public class AccountController : BaseController
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    // GET /api/account/profile
    [HttpGet("profile")]
    public async Task<ActionResult<UserDto>> GetProfile()
    {
        try
        {
            var profile = await _accountService.GetProfileAsync(GetUserId());
            return Ok(profile);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    // PUT /api/account/profile
    [HttpPut("profile")]
    public async Task<ActionResult<UserDto>> UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        try
        {
            var profile = await _accountService.UpdateProfileAsync(GetUserId(), dto);
            return Ok(profile);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    // PUT /api/account/password
    [HttpPut("password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        try
        {
            await _accountService.ChangePasswordAsync(GetUserId(), dto);
            return Ok(new { message = "Password updated successfully" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // POST /api/account/avatar
    [HttpPost("avatar")]
    public async Task<ActionResult<UserDto>> UploadAvatar([FromBody] AvatarUploadDto dto)
    {
        try
        {
            var profile = await _accountService.UploadAvatarAsync(GetUserId(), dto);
            return Ok(profile);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // DELETE /api/account/avatar
    [HttpDelete("avatar")]
    public async Task<IActionResult> DeleteAvatar()
    {
        try
        {
            await _accountService.DeleteAvatarAsync(GetUserId());
            return Ok(new { message = "Avatar deleted" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    // POST /api/account/reset-progress
    [HttpPost("reset-progress")]
    public async Task<IActionResult> ResetProgress([FromBody] ResetProgressDto dto)
    {
        try
        {
            await _accountService.ResetProgressAsync(GetUserId(), dto);
            return Ok(new { message = "Progress reset successfully" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // DELETE /api/account
    [HttpDelete]
    public async Task<IActionResult> DeleteAccount([FromBody] ChangePasswordDto dto)
    {
        try
        {
            await _accountService.DeleteAccountAsync(GetUserId(), dto.CurrentPassword);
            return Ok(new { message = "Account deleted" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
