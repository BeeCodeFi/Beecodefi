using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EduPlatform.API.Migrations
{
    /// <inheritdoc />
    public partial class AddBookmarksAndRecentActivity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bookmarks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    TutorialSlug = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LessonSlug = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    LessonTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    TrackTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    SavedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookmarks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bookmarks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecentActivities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    TutorialSlug = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LessonSlug = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    TutorialTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    LessonTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecentActivities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecentActivities_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookmarks_UserId_TutorialSlug_LessonSlug",
                table: "Bookmarks",
                columns: new[] { "UserId", "TutorialSlug", "LessonSlug" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RecentActivities_UserId_Timestamp",
                table: "RecentActivities",
                columns: new[] { "UserId", "Timestamp" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bookmarks");

            migrationBuilder.DropTable(
                name: "RecentActivities");
        }
    }
}
