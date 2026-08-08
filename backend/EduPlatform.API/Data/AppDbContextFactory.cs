using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace EduPlatform.API.Data;

/// <summary>
/// Used only by EF Core tooling (dotnet ef migrations) at design time.
/// Provides a dummy connection string so migrations can be created/applied
/// without needing the real Neon PostgreSQL env var to be set locally.
/// </summary>
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        // Use a dummy Npgsql connection string — only needed for schema inference,
        // not for actually connecting during migration generation.
        optionsBuilder.UseNpgsql(
            "Host=localhost;Database=beecodefi_dev;Username=postgres;Password=postgres"
        );

        return new AppDbContext(optionsBuilder.Options);
    }
}
