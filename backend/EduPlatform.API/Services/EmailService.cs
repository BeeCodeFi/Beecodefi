using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

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
        var smtpUser = _config["Smtp:Username"];
        var smtpPass = _config["Smtp:Password"];

        if (string.IsNullOrEmpty(smtpUser) || string.IsNullOrEmpty(smtpPass) || smtpPass == "your-app-password")
        {
            _logger.LogWarning("SMTP not configured. Contact message from {Email} logged but not sent.", email);
            return;
        }

        var host = _config["Smtp:Host"] ?? "smtp.gmail.com";
        var port = int.Parse(_config["Smtp:Port"] ?? "587");
        var toEmail = _config["Smtp:ToEmail"] ?? "kumaryursh@gmail.com";

        var msg = new MimeMessage();
        msg.From.Add(new MailboxAddress("BEECODEFI Contact", smtpUser));
        msg.To.Add(new MailboxAddress("Ayush Kumar", toEmail));
        msg.Subject = $"[BEECODEFI Contact] {subject}";
        msg.ReplyTo.Add(new MailboxAddress(name, email));

        var htmlContent = $@"
            <h2>New Contact Message from BEECODEFI</h2>
            <p><strong>Name:</strong> {System.Net.WebUtility.HtmlEncode(name)}</p>
            <p><strong>Email:</strong> {System.Net.WebUtility.HtmlEncode(email)}</p>
            <p><strong>Subject:</strong> {System.Net.WebUtility.HtmlEncode(subject)}</p>
            <hr/>
            <p>{System.Net.WebUtility.HtmlEncode(message)}</p>";

        msg.Body = new TextPart("html") { Text = htmlContent };

        using var client = new SmtpClient();
        await client.ConnectAsync(host, port, SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(smtpUser, smtpPass);
        await client.SendAsync(msg);
        await client.DisconnectAsync(true);
    }
}
