using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

public class AuthController : BaseController
{
    private readonly IAuthService _authService;
    private readonly IConfiguration _config;

    public AuthController(IAuthService authService, IConfiguration config)
    {
        _authService = authService;
        _config = config;
    }

    /// <summary>
    /// Dev-only endpoint — tests Resend API connectivity and returns the exact error if it fails.
    /// </summary>
    [HttpGet("test-email")]
    public async Task<IActionResult> TestEmail([FromServices] IEmailService emailService)
    {
        try
        {
            await emailService.SendPasswordResetEmailAsync(
                "kumaryursh@gmail.com",
                "Test User",
                "https://beecodefi-edu.vercel.app/reset-password?token=test123"
            );
            return Ok(new { success = true, message = "Test email dispatched — check inbox and logs." });
        }
        catch (Exception ex)
        {
            return Ok(new { success = false, error = ex.GetType().Name, message = ex.Message });
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto dto)
    {
        try
        {
            var result = await _authService.RegisterAsync(dto);
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto dto)
    {
        try
        {
            var result = await _authService.LoginAsync(dto);
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<AuthResponseDto>> Refresh([FromBody] RefreshTokenDto dto)
    {
        try
        {
            var result = await _authService.RefreshTokenAsync(dto.RefreshToken);
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
    {
        // Always return 200 — never reveal if an email is or isn't registered
        var frontendBaseUrl = _config["FrontendBaseUrl"] ?? "http://localhost:3000";
        await _authService.ForgotPasswordAsync(dto.Email, frontendBaseUrl);
        return Ok(new { message = "If that email is registered, you'll receive a reset link shortly." });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
    {
        try
        {
            await _authService.ResetPasswordAsync(dto.Token, dto.NewPassword);
            return Ok(new { message = "Password updated successfully." });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
