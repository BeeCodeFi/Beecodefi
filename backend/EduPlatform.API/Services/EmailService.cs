using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace EduPlatform.API.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailService> _logger;
    private readonly HttpClient _http;

    private static readonly JsonSerializerOptions _json = new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

    public EmailService(IConfiguration config, ILogger<EmailService> logger, IHttpClientFactory httpFactory)
    {
        _config = config;
        _logger = logger;
        _http = httpFactory.CreateClient("Resend");
    }

    public async Task SendContactEmailAsync(string name, string email, string subject, string message)
    {
        var toEmail = _config["Resend:ToEmail"] ?? "kumaryursh@gmail.com";

        var htmlContent = $@"
            <h2>New Contact Message from BEECODEFI</h2>
            <p><strong>Name:</strong> {System.Net.WebUtility.HtmlEncode(name)}</p>
            <p><strong>Email:</strong> {System.Net.WebUtility.HtmlEncode(email)}</p>
            <p><strong>Subject:</strong> {System.Net.WebUtility.HtmlEncode(subject)}</p>
            <hr/>
            <p>{System.Net.WebUtility.HtmlEncode(message)}</p>";

        await SendAsync(
            from: "BEECODEFI Contact <onboarding@resend.dev>",
            to: toEmail,
            subject: $"[BEECODEFI Contact] {subject}",
            html: htmlContent,
            replyTo: email
        );
    }

    public async Task SendPasswordResetEmailAsync(string toEmail, string name, string resetLink)
    {
        var year = DateTime.UtcNow.Year;
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
        <tr>
          <td style='background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:32px 40px;text-align:center;'>
            <span style='color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.5px;'>🐝 BEECODEFI</span>
            <p style='color:rgba(255,255,255,0.8);margin:12px 0 0;font-size:14px;'>Free Education for Everyone</p>
          </td>
        </tr>
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
              If the button doesn't work, copy and paste this link:<br>
              <a href='{resetLink}' style='color:#818cf8;word-break:break-all;'>{resetLink}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style='padding:20px 40px 32px;border-top:1px solid #334155;'>
            <p style='color:#475569;font-size:12px;line-height:1.6;margin:0;text-align:center;'>
              If you didn't request a password reset, you can safely ignore this email.<br>
              &copy; {year} BEECODEFI. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>";

        await SendAsync(
            from: "BEECODEFI <onboarding@resend.dev>",
            to: toEmail,
            subject: "Reset your BEECODEFI password",
            html: htmlContent
        );
    }

    private async Task SendAsync(string from, string to, string subject, string html, string? replyTo = null)
    {
        var apiKey = _config["Resend:ApiKey"];
        if (string.IsNullOrEmpty(apiKey))
        {
            _logger.LogWarning("Resend API key not configured. Email to {To} not sent.", to);
            return;
        }

        var payload = new Dictionary<string, object>
        {
            ["from"] = from,
            ["to"] = new[] { to },
            ["subject"] = subject,
            ["html"] = html
        };
        if (!string.IsNullOrEmpty(replyTo))
            payload["reply_to"] = replyTo;

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.resend.com/emails")
        {
            Content = new StringContent(JsonSerializer.Serialize(payload, _json), Encoding.UTF8, "application/json")
        };
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        try
        {
            var response = await _http.SendAsync(request);
            var body = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                _logger.LogError("Resend API error {Status} for {To}: {Body}", (int)response.StatusCode, to, body);
            else
                _logger.LogInformation("Email sent via Resend to {To}. Response: {Body}", to, body);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to call Resend API for {To}.", to);
        }
    }
}
