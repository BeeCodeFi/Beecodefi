using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IEmailService _emailService;
    private readonly ILogger<ContactController> _logger;

    public ContactController(AppDbContext db, IEmailService emailService, ILogger<ContactController> logger)
    {
        _db = db;
        _emailService = emailService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ContactDto dto)
    {
        var message = new ContactMessage
        {
            Name = dto.Name,
            Email = dto.Email,
            Subject = dto.Subject,
            Message = dto.Message,
            CreatedAt = DateTime.UtcNow
        };

        _db.ContactMessages.Add(message);
        await _db.SaveChangesAsync();

        try
        {
            await _emailService.SendContactEmailAsync(dto.Name, dto.Email, dto.Subject, dto.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact email notification");
        }

        return Ok(new { message = "Message sent successfully" });
    }
}
