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

    public async Task SendPasswordResetEmailAsync(string toEmail, string name, string resetLink)
    {
        var smtpUser = _config["Smtp:Username"];
        var smtpPass = _config["Smtp:Password"];

        if (string.IsNullOrEmpty(smtpUser) || string.IsNullOrEmpty(smtpPass) || smtpPass == "your-app-password")
        {
            _logger.LogWarning("SMTP not configured. Password reset link for {Email}: {Link}", toEmail, resetLink);
            return;
        }

        var host = _config["Smtp:Host"] ?? "smtp.gmail.com";
        var port = int.Parse(_config["Smtp:Port"] ?? "587");

        var msg = new MimeMessage();
        msg.From.Add(new MailboxAddress("BEECODEFI", smtpUser));
        msg.To.Add(new MailboxAddress(name, toEmail));
        msg.Subject = "Reset your BEECODEFI password";

        var htmlContent = $@"
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
</head>
<body style='margin:0;padding:0;background:#0f172a;font-family:system-ui,-apple-system,sans-serif;'>
  <table width='100%' cellpadding='0' cellspacing='0' style='background:#0f172a;padding:40px 16px;'>
    <tr><td align='center'>
      <table width='100%' style='max-width:520px;background:#1e293b;border-radius:16px;overflow:hidden;border:1px solid #334155;'>
        <!-- Header -->
        <tr>
          <td style='background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:32px 40px;text-align:center;'>
            <div style='display:inline-flex;align-items:center;gap:10px;'>
              <div style='width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:10px;display:inline-block;line-height:40px;text-align:center;font-size:20px;'>🐝</div>
              <span style='color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.5px;'>BEECODEFI</span>
            </div>
            <p style='color:rgba(255,255,255,0.8);margin:12px 0 0;font-size:14px;'>Free Education for Everyone</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style='padding:40px 40px 32px;'>
            <h2 style='color:#f1f5f9;margin:0 0 12px;font-size:22px;font-weight:700;'>Reset your password</h2>
            <p style='color:#94a3b8;line-height:1.6;margin:0 0 8px;font-size:15px;'>Hi {System.Net.WebUtility.HtmlEncode(name)},</p>
            <p style='color:#94a3b8;line-height:1.6;margin:0 0 28px;font-size:15px;'>
              We received a request to reset your password. Click the button below to choose a new one.
              This link will expire in <strong style='color:#c7d2fe;'>1 hour</strong>.
            </p>
            <div style='text-align:center;margin-bottom:28px;'>
              <a href='{resetLink}' style='display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-weight:600;font-size:15px;'>
                Reset Password
              </a>
            </div>
            <p style='color:#64748b;font-size:13px;line-height:1.6;margin:0;'>
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href='{resetLink}' style='color:#818cf8;word-break:break-all;'>{resetLink}</a>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style='padding:20px 40px 32px;border-top:1px solid #334155;'>
            <p style='color:#475569;font-size:12px;line-height:1.6;margin:0;text-align:center;'>
              If you didn't request a password reset, you can safely ignore this email.<br>
              Your password will remain unchanged.<br><br>
              &copy; {DateTime.UtcNow.Year} BEECODEFI. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>";

        msg.Body = new TextPart("html") { Text = htmlContent };

        using var client = new SmtpClient();
        await client.ConnectAsync(host, port, SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(smtpUser, smtpPass);
        await client.SendAsync(msg);
        await client.DisconnectAsync(true);
    }
}
