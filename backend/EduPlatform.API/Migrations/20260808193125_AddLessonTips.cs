using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EduPlatform.API.Migrations
{
    /// <inheritdoc />
    public partial class AddLessonTips : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LessonTips",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    TutorialSlug = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LessonSlug = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Tip = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Upvotes = table.Column<int>(type: "integer", nullable: false),
                    Downvotes = table.Column<int>(type: "integer", nullable: false),
                    IsApproved = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UserId1 = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonTips", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LessonTips_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LessonTips_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LessonTipVotes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    TipId = table.Column<int>(type: "integer", nullable: false),
                    IsUpvote = table.Column<bool>(type: "boolean", nullable: false),
                    VotedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId1 = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonTipVotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LessonTipVotes_LessonTips_TipId",
                        column: x => x.TipId,
                        principalTable: "LessonTips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LessonTipVotes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LessonTipVotes_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_LessonTips_IsApproved",
                table: "LessonTips",
                column: "IsApproved");

            migrationBuilder.CreateIndex(
                name: "IX_LessonTips_TutorialSlug_LessonSlug",
                table: "LessonTips",
                columns: new[] { "TutorialSlug", "LessonSlug" });

            migrationBuilder.CreateIndex(
                name: "IX_LessonTips_UserId",
                table: "LessonTips",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonTips_UserId1",
                table: "LessonTips",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_LessonTipVotes_TipId",
                table: "LessonTipVotes",
                column: "TipId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonTipVotes_UserId_TipId",
                table: "LessonTipVotes",
                columns: new[] { "UserId", "TipId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LessonTipVotes_UserId1",
                table: "LessonTipVotes",
                column: "UserId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LessonTipVotes");

            migrationBuilder.DropTable(
                name: "LessonTips");
        }
    }
}
