using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduPlatform.API.Migrations
{
    /// <inheritdoc />
    public partial class AddQuizDisplayOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DisplayOrder",
                table: "Quizzes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            // Update existing quizzes with proper display order
            // HTML quizzes (1-15)
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 1 WHERE \"Topic\" = 'html-basics'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 2 WHERE \"Topic\" = 'html-links-media'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 3 WHERE \"Topic\" = 'html-lists-tables'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 4 WHERE \"Topic\" = 'html-forms'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 5 WHERE \"Topic\" = 'html-semantic'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 6 WHERE \"Topic\" = 'html-attributes-metadata'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 7 WHERE \"Topic\" = 'html-media-embeds'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 8 WHERE \"Topic\" = 'html-accessibility-aria'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 9 WHERE \"Topic\" = 'html-advanced'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 10 WHERE \"Topic\" = 'html-canvas'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 11 WHERE \"Topic\" = 'html-svg'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 12 WHERE \"Topic\" = 'html-web-components'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 13 WHERE \"Topic\" = 'html-drag-drop'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 14 WHERE \"Topic\" = 'html-web-storage'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 15 WHERE \"Topic\" = 'html-geolocation'");
            
            // CSS quizzes (16-24)
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 16 WHERE \"Topic\" = 'css-basics'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 17 WHERE \"Topic\" = 'css-box-model'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 18 WHERE \"Topic\" = 'css-selectors'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 19 WHERE \"Topic\" = 'css-flexbox-grid'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 20 WHERE \"Topic\" = 'css-visual'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 21 WHERE \"Topic\" = 'css-advanced'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 22 WHERE \"Topic\" = 'css-positioning-responsive'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 23 WHERE \"Topic\" = 'css-transforms-animations'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 24 WHERE \"Topic\" = 'css-variables-theming'");
            
            // JavaScript quizzes (25-33)
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 25 WHERE \"Topic\" = 'js-basics'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 26 WHERE \"Topic\" = 'js-arrays-data'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 27 WHERE \"Topic\" = 'js-functions-scope'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 28 WHERE \"Topic\" = 'js-dom-events'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 29 WHERE \"Topic\" = 'js-es6'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 30 WHERE \"Topic\" = 'js-advanced'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 31 WHERE \"Topic\" = 'js-objects-classes'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 32 WHERE \"Topic\" = 'js-async-programming'");
            migrationBuilder.Sql("UPDATE \"Quizzes\" SET \"DisplayOrder\" = 33 WHERE \"Topic\" = 'js-modules-browser-apis'");

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_DisplayOrder",
                table: "Quizzes",
                column: "DisplayOrder");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Quizzes_DisplayOrder",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "DisplayOrder",
                table: "Quizzes");
        }
    }
}
