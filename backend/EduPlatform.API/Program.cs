using System.Text;
using AspNetCoreRateLimit;
using EduPlatform.API.Data;
using EduPlatform.API.Middleware;
using EduPlatform.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Validate critical environment variables on startup
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrWhiteSpace(connectionString) ||
    connectionString.Contains("PLACEHOLDER", StringComparison.OrdinalIgnoreCase))
{
    connectionString = builder.Configuration["DATABASE_URL"];
}
var jwtKey = builder.Configuration["Jwt:Key"];
var adminEmail = builder.Configuration["Admin:Email"] ?? "kumaryursh@gmail.com";

if (string.IsNullOrEmpty(connectionString) || connectionString.Contains("PLACEHOLDER"))
{
    var errorMsg = "ConnectionStrings__DefaultConnection environment variable is required. " +
                   "Set it in your hosting provider dashboard to your Neon PostgreSQL connection string. " +
                   "Format: postgresql://user:password@ep-example.us-east-2.aws.neon.tech/database?sslmode=require";
    throw new InvalidOperationException(errorMsg);
}

if (string.IsNullOrEmpty(jwtKey) || jwtKey.Contains("PLACEHOLDER") || jwtKey.Length < 32)
{
    var errorMsg = "Jwt__Key environment variable is required (minimum 32 characters). " +
                   "Generate a secure key using: openssl rand -base64 32";
    throw new InvalidOperationException(errorMsg);
}

connectionString = NormalizeConnectionString(connectionString);

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString, npgsqlOptions =>
        npgsqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(10),
            errorCodesToAdd: null)));

// Services
builder.Services.AddHttpClient();
builder.Services.AddSingleton<TokenService>();
builder.Services.AddSingleton<ITokenService>(sp => sp.GetRequiredService<TokenService>());
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IQuizService, QuizService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IBadgeService, BadgeService>();
builder.Services.AddScoped<IProgressService, ProgressService>();
builder.Services.AddScoped<ILeaderboardService, LeaderboardService>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IStatsService, StatsService>();
builder.Services.AddScoped<IStreakService, StreakService>();
builder.Services.AddScoped<IBookmarkService, BookmarkService>();
builder.Services.AddHostedService<RefreshTokenCleanupService>();

// Rate Limiting
builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(options =>
{
    options.EnableEndpointRateLimiting = true;
    options.StackBlockedRequests = false;
    options.HttpStatusCode = 429;
    options.RealIpHeader = "X-Real-IP";
    options.ClientIdHeader = "X-ClientId";
    options.GeneralRules = new List<RateLimitRule>
    {
        // Global: 100 requests per minute per IP
        new RateLimitRule { Endpoint = "*", Period = "1m", Limit = 100 },
        // Auth endpoints: 5 requests per minute per IP
        new RateLimitRule { Endpoint = "POST:/api/auth/login", Period = "1m", Limit = 5 },
        new RateLimitRule { Endpoint = "POST:/api/auth/register", Period = "1m", Limit = 5 },
        new RateLimitRule { Endpoint = "POST:/api/auth/forgot-password", Period = "1m", Limit = 3 },
        new RateLimitRule { Endpoint = "POST:/api/auth/reset-password", Period = "1m", Limit = 3 },
        // Contact form: 2 requests per 5 minutes per IP
        new RateLimitRule { Endpoint = "POST:/api/contact", Period = "5m", Limit = 2 },
    };
});
builder.Services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
builder.Services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
builder.Services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "BEECODEFI",
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? "BEECODEFI-Users",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireAssertion(context =>
            string.Equals(
                context.User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value,
                adminEmail,
                StringComparison.OrdinalIgnoreCase)));
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "https://localhost:3000",
                "https://beecodefi-edu.vercel.app")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

// Security Headers
app.Use(async (context, next) =>
{
    // HSTS — Force HTTPS for 1 year (only in production)
    if (!app.Environment.IsDevelopment())
    {
        context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }
    
    // Prevent clickjacking
    context.Response.Headers.Add("X-Frame-Options", "DENY");
    
    // Prevent MIME sniffing
    context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
    
    // XSS protection
    context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
    
    // Referrer policy
    context.Response.Headers.Add("Referrer-Policy", "strict-origin-when-cross-origin");
    
    // Content Security Policy
    context.Response.Headers.Add("Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https: blob:; " +
        "font-src 'self' data:; " +
        "connect-src 'self' https://beecodefi-api.onrender.com https://vercel.live wss://ws-us3.pusher.com; " +
        "frame-ancestors 'none'; " +
        "base-uri 'self'; " +
        "form-action 'self'");
    
    // Permissions Policy (formerly Feature-Policy)
    context.Response.Headers.Add("Permissions-Policy",
        "camera=(), microphone=(), geolocation=(), interest-cohort=()");
    
    await next();
});

// HTTPS Redirection (only in production)
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Startup diagnostics
var startupLogger = app.Logger;
var resendKey = builder.Configuration["Resend:ApiKey"];
startupLogger.LogInformation("Resend API key configured: {Configured}", !string.IsNullOrEmpty(resendKey));

// Apply migrations and seed database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    
    try
    {
        logger.LogInformation("Applying database migrations...");
        await db.Database.MigrateAsync();
        logger.LogInformation("Database migrations applied successfully");
        
        logger.LogInformation("Initializing seed data...");
        await SeedData.InitializeAsync(db);
        logger.LogInformation("Seed data initialized successfully");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while migrating or seeding the database");
        throw;
    }
}

app.UseCors();
app.UseIpRateLimiting();
app.UseMiddleware<ExceptionMiddleware>();
app.UseStaticFiles(); // Serve uploaded avatars from wwwroot
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

var port = Environment.GetEnvironmentVariable("PORT") ?? "5219";
app.Urls.Add($"http://0.0.0.0:{port}");

app.Run();

static string NormalizeConnectionString(string value)
{
    if (value.StartsWith("postgres://", StringComparison.OrdinalIgnoreCase) ||
        value.StartsWith("postgresql://", StringComparison.OrdinalIgnoreCase))
    {
        var uri = new Uri(value);
        var userInfo = uri.UserInfo.Split(':', 2);
        var builder = new NpgsqlConnectionStringBuilder
        {
            Host = uri.Host,
            Port = uri.IsDefaultPort ? 5432 : uri.Port,
            Database = uri.AbsolutePath.TrimStart('/'),
            Username = Uri.UnescapeDataString(userInfo[0]),
            Password = userInfo.Length > 1 ? Uri.UnescapeDataString(userInfo[1]) : string.Empty,
        };

        foreach (var parameter in uri.Query.TrimStart('?').Split('&', StringSplitOptions.RemoveEmptyEntries))
        {
            var pair = parameter.Split('=', 2);
            if (pair.Length == 2 && pair[0].Equals("sslmode", StringComparison.OrdinalIgnoreCase))
            {
                builder.SslMode = Enum.Parse<SslMode>(pair[1], ignoreCase: true);
            }
        }

        value = builder.ConnectionString;
    }

    var connectionStringBuilder = new NpgsqlConnectionStringBuilder(value)
    {
        SslMode = SslMode.Require,
    };

    return connectionStringBuilder.ConnectionString;
}
