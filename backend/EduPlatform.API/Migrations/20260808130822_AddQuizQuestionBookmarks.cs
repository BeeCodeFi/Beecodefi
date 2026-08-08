using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EduPlatform.API.Migrations
{
    /// <inheritdoc />
    public partial class AddQuizQuestionBookmarks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "LessonComments",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "CommentVotes",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "CodeSnippets",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "QuizQuestionBookmarks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    QuestionId = table.Column<int>(type: "integer", nullable: false),
                    QuizTopic = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    QuestionText = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    BookmarkedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizQuestionBookmarks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuizQuestionBookmarks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LessonComments_UserId1",
                table: "LessonComments",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_CommentVotes_UserId1",
                table: "CommentVotes",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_CodeSnippets_UserId1",
                table: "CodeSnippets",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_QuizQuestionBookmarks_UserId_QuestionId_QuizTopic",
                table: "QuizQuestionBookmarks",
                columns: new[] { "UserId", "QuestionId", "QuizTopic" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CodeSnippets_Users_UserId1",
                table: "CodeSnippets",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CommentVotes_Users_UserId1",
                table: "CommentVotes",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LessonComments_Users_UserId1",
                table: "LessonComments",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CodeSnippets_Users_UserId1",
                table: "CodeSnippets");

            migrationBuilder.DropForeignKey(
                name: "FK_CommentVotes_Users_UserId1",
                table: "CommentVotes");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonComments_Users_UserId1",
                table: "LessonComments");

            migrationBuilder.DropTable(
                name: "QuizQuestionBookmarks");

            migrationBuilder.DropIndex(
                name: "IX_LessonComments_UserId1",
                table: "LessonComments");

            migrationBuilder.DropIndex(
                name: "IX_CommentVotes_UserId1",
                table: "CommentVotes");

            migrationBuilder.DropIndex(
                name: "IX_CodeSnippets_UserId1",
                table: "CodeSnippets");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "LessonComments");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "CommentVotes");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "CodeSnippets");
        }
    }
}
