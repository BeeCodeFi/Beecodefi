using SendGrid;
using SendGrid.Helpers.Mail;

namespace EduPlatform.API.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration config, ILogger<EmailService> logger)
    {
        _config = config;
        _logger = logger;
    }

    public async Task SendContactEmailAsync(string name, string email, string subject, string message)
    {
        var apiKey = _config["SendGrid:ApiKey"];

        if (string.IsNullOrEmpty(apiKey) || apiKey == "your-sendgrid-api-key")
        {
            _logger.LogWarning("SendGrid API key not configured. Contact message from {Email} logged but not sent.", email);
            return;
        }

        var client = new SendGridClient(apiKey);
        var from = new EmailAddress(_config["SendGrid:FromEmail"] ?? "noreply@beecodefi.com", "BEECODEFI Contact");
        var to = new EmailAddress(_config["SendGrid:ToEmail"] ?? "kumaryursh@gmail.com", "Ayush Kumar");
        var htmlContent = $@"
            <h2>New Contact Message from BEECODEFI</h2>
            <p><strong>Name:</strong> {System.Net.WebUtility.HtmlEncode(name)}</p>
            <p><strong>Email:</strong> {System.Net.WebUtility.HtmlEncode(email)}</p>
            <p><strong>Subject:</strong> {System.Net.WebUtility.HtmlEncode(subject)}</p>
            <hr/>
            <p>{System.Net.WebUtility.HtmlEncode(message)}</p>";

        var msg = MailHelper.CreateSingleEmail(from, to, $"[BEECODEFI Contact] {subject}", message, htmlContent);
        var response = await client.SendEmailAsync(msg);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("Failed to send contact email. Status: {StatusCode}", response.StatusCode);
        }
    }
}
