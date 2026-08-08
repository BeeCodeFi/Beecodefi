using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EduPlatform.API.Migrations
{
    /// <inheritdoc />
    public partial class StudySessionExistingTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Check if StudySessions table exists and has the correct structure
            // If table exists, ensure it has the correct indexes
            migrationBuilder.Sql(
                @"DO $$
                BEGIN
                    IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'StudySessions') THEN
                        -- Table exists, ensure the unique index exists
                        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'IX_StudySessions_UserId_Category') THEN
                            CREATE UNIQUE INDEX ""IX_StudySessions_UserId_Category"" ON ""StudySessions"" (""UserId"", ""Category"");
                        END IF;
                    END IF;
                END $$;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove the index we added
            migrationBuilder.DropIndex(
                name: "IX_StudySessions_UserId_Category",
                table: "StudySessions");
        }
    }
}
