using EduPlatform.API.DTOs;
using EduPlatform.API.Services;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IConfiguration _config;
    private readonly IWebHostEnvironment _env;

    public AuthController(IAuthService authService, IConfiguration config, IWebHostEnvironment env)
    {
        _authService = authService;
        _config = config;
        _env = env;
    }

    /// <summary>
    /// Dev-only endpoint — tests SMTP connectivity and returns the exact error if it fails.
    /// Remove or restrict this before going to production.
    /// </summary>
    [HttpGet("test-email")]
    public async Task<IActionResult> TestEmail()
    {
        var host = _config["Smtp:Host"] ?? "smtp.gmail.com";
        var port = int.Parse(_config["Smtp:Port"] ?? "587");
        var user = _config["Smtp:Username"] ?? "";
        var pass = _config["Smtp:Password"] ?? "";

        try
        {
            using var client = new SmtpClient();
            await client.ConnectAsync(host, port, SecureSocketOptions.SslOnConnect);
            await client.AuthenticateAsync(user, pass);
            await client.DisconnectAsync(true);
            return Ok(new { success = true, message = $"SMTP connected and authenticated as {user}" });
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
