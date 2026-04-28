using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Data;

public static class SeedData
{
    public static async Task InitializeAsync(AppDbContext db)
    {
        await db.Database.MigrateAsync();

        if (await db.Quizzes.AnyAsync()) return;

        var htmlQuiz = new Quiz
        {
            Title = "HTML Fundamentals",
            Topic = "HTML",
            Description = "Test your knowledge of HTML basics, elements, attributes, and document structure.",
            Difficulty = "Beginner",
            Questions = new List<Question>
            {
                new()
                {
                    Text = "What does HTML stand for?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "Hyper Text Markup Language", IsCorrect = true },
                        new() { Text = "High Tech Modern Language", IsCorrect = false },
                        new() { Text = "Hyper Transfer Markup Language", IsCorrect = false },
                        new() { Text = "Home Tool Markup Language", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which HTML element is used to define the largest heading?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "<h1>", IsCorrect = true },
                        new() { Text = "<heading>", IsCorrect = false },
                        new() { Text = "<h6>", IsCorrect = false },
                        new() { Text = "<head>", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which attribute is used to provide an alternate text for an image?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "alt", IsCorrect = true },
                        new() { Text = "title", IsCorrect = false },
                        new() { Text = "src", IsCorrect = false },
                        new() { Text = "name", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which HTML element is used to create an unordered list?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "<ul>", IsCorrect = true },
                        new() { Text = "<ol>", IsCorrect = false },
                        new() { Text = "<li>", IsCorrect = false },
                        new() { Text = "<list>", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "What is the correct HTML element for inserting a line break?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "<br>", IsCorrect = true },
                        new() { Text = "<lb>", IsCorrect = false },
                        new() { Text = "<break>", IsCorrect = false },
                        new() { Text = "<newline>", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which HTML attribute specifies where to open the linked document?",
                    Difficulty = "Intermediate",
                    Answers = new List<Answer>
                    {
                        new() { Text = "target", IsCorrect = true },
                        new() { Text = "href", IsCorrect = false },
                        new() { Text = "rel", IsCorrect = false },
                        new() { Text = "link", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which element is used to define a table row?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "<tr>", IsCorrect = true },
                        new() { Text = "<td>", IsCorrect = false },
                        new() { Text = "<th>", IsCorrect = false },
                        new() { Text = "<row>", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "What does the <meta charset='UTF-8'> tag specify?",
                    Difficulty = "Intermediate",
                    Answers = new List<Answer>
                    {
                        new() { Text = "The character encoding for the document", IsCorrect = true },
                        new() { Text = "The page title", IsCorrect = false },
                        new() { Text = "The document language", IsCorrect = false },
                        new() { Text = "The viewport width", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which HTML5 element is used for navigation links?",
                    Difficulty = "Intermediate",
                    Answers = new List<Answer>
                    {
                        new() { Text = "<nav>", IsCorrect = true },
                        new() { Text = "<navigation>", IsCorrect = false },
                        new() { Text = "<menu>", IsCorrect = false },
                        new() { Text = "<links>", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which input type is used for email addresses in HTML5?",
                    CodeSnippet = "<input type=\"???\" name=\"email\">",
                    Difficulty = "Intermediate",
                    Answers = new List<Answer>
                    {
                        new() { Text = "email", IsCorrect = true },
                        new() { Text = "mail", IsCorrect = false },
                        new() { Text = "text", IsCorrect = false },
                        new() { Text = "address", IsCorrect = false }
                    }
                }
            }
        };

        var cssQuiz = new Quiz
        {
            Title = "CSS Mastery",
            Topic = "CSS",
            Description = "Challenge yourself with CSS selectors, layouts, flexbox, grid, and responsive design.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new()
                {
                    Text = "Which CSS property is used to change the text color?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "color", IsCorrect = true },
                        new() { Text = "text-color", IsCorrect = false },
                        new() { Text = "font-color", IsCorrect = false },
                        new() { Text = "foreground", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "What is the default value of the position property?",
                    Difficulty = "Intermediate",
                    Answers = new List<Answer>
                    {
                        new() { Text = "static", IsCorrect = true },
                        new() { Text = "relative", IsCorrect = false },
                        new() { Text = "absolute", IsCorrect = false },
                        new() { Text = "fixed", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which property is used to create space between the element's border and inner content?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "padding", IsCorrect = true },
                        new() { Text = "margin", IsCorrect = false },
                        new() { Text = "spacing", IsCorrect = false },
                        new() { Text = "border-spacing", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "How do you make a flex container?",
                    CodeSnippet = ".container { display: ???; }",
                    Difficulty = "Intermediate",
                    Answers = new List<Answer>
                    {
                        new() { Text = "flex", IsCorrect = true },
                        new() { Text = "flexbox", IsCorrect = false },
                        new() { Text = "block-flex", IsCorrect = false },
                        new() { Text = "inline", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which CSS property controls the stacking order of elements?",
                    Difficulty = "Intermediate",
                    Answers = new List<Answer>
                    {
                        new() { Text = "z-index", IsCorrect = true },
                        new() { Text = "order", IsCorrect = false },
                        new() { Text = "stack", IsCorrect = false },
                        new() { Text = "layer", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "What does the CSS Box Model consist of?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "Content, Padding, Border, Margin", IsCorrect = true },
                        new() { Text = "Header, Body, Footer, Sidebar", IsCorrect = false },
                        new() { Text = "Width, Height, Color, Font", IsCorrect = false },
                        new() { Text = "Display, Position, Float, Clear", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which CSS Grid property defines the number of columns?",
                    CodeSnippet = ".grid { display: grid; ???: 1fr 1fr 1fr; }",
                    Difficulty = "Intermediate",
                    Answers = new List<Answer>
                    {
                        new() { Text = "grid-template-columns", IsCorrect = true },
                        new() { Text = "grid-columns", IsCorrect = false },
                        new() { Text = "columns", IsCorrect = false },
                        new() { Text = "grid-auto-columns", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "How do you apply a style to all <p> elements inside a <div>?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "div p { }", IsCorrect = true },
                        new() { Text = "div + p { }", IsCorrect = false },
                        new() { Text = "div > p { } (only direct children)", IsCorrect = false },
                        new() { Text = "div.p { }", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which media query targets screens smaller than 768px?",
                    Difficulty = "Intermediate",
                    Answers = new List<Answer>
                    {
                        new() { Text = "@media (max-width: 768px)", IsCorrect = true },
                        new() { Text = "@media (min-width: 768px)", IsCorrect = false },
                        new() { Text = "@screen (max-width: 768px)", IsCorrect = false },
                        new() { Text = "@responsive (768px)", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "What is the CSS specificity order (lowest to highest)?",
                    Difficulty = "Advanced",
                    Answers = new List<Answer>
                    {
                        new() { Text = "Element → Class → ID → Inline", IsCorrect = true },
                        new() { Text = "ID → Class → Element → Inline", IsCorrect = false },
                        new() { Text = "Inline → ID → Class → Element", IsCorrect = false },
                        new() { Text = "Class → Element → ID → Inline", IsCorrect = false }
                    }
                }
            }
        };

        var jsQuiz = new Quiz
        {
            Title = "JavaScript Essentials",
            Topic = "JavaScript",
            Description = "Test your JavaScript skills covering variables, functions, DOM, ES6+, and async programming.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new()
                {
                    Text = "Which keyword declares a block-scoped variable?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "let", IsCorrect = true },
                        new() { Text = "var", IsCorrect = false },
                        new() { Text = "define", IsCorrect = false },
                        new() { Text = "variable", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "What is the output of typeof null?",
                    CodeSnippet = "console.log(typeof null);",
                    Difficulty = "Intermediate",
                    Answers = new List<Answer>
                    {
                        new() { Text = "\"object\"", IsCorrect = true },
                        new() { Text = "\"null\"", IsCorrect = false },
                        new() { Text = "\"undefined\"", IsCorrect = false },
                        new() { Text = "\"boolean\"", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which array method creates a new array with filtered elements?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "filter()", IsCorrect = true },
                        new() { Text = "map()", IsCorrect = false },
                        new() { Text = "reduce()", IsCorrect = false },
                        new() { Text = "find()", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "What does the '===' operator check?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "Value and type equality", IsCorrect = true },
                        new() { Text = "Value equality only", IsCorrect = false },
                        new() { Text = "Reference equality", IsCorrect = false },
                        new() { Text = "Type equality only", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "What is the output of this code?",
                    CodeSnippet = "console.log(0.1 + 0.2 === 0.3);",
                    Difficulty = "Advanced",
                    Answers = new List<Answer>
                    {
                        new() { Text = "false", IsCorrect = true },
                        new() { Text = "true", IsCorrect = false },
                        new() { Text = "undefined", IsCorrect = false },
                        new() { Text = "NaN", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which method converts a JSON string into a JavaScript object?",
                    Difficulty = "Beginner",
                    Answers = new List<Answer>
                    {
                        new() { Text = "JSON.parse()", IsCorrect = true },
                        new() { Text = "JSON.stringify()", IsCorrect = false },
                        new() { Text = "JSON.convert()", IsCorrect = false },
                        new() { Text = "JSON.toObject()", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "What does 'async/await' help with?",
                    Difficulty = "Intermediate",
                    Answers = new List<Answer>
                    {
                        new() { Text = "Writing asynchronous code that looks synchronous", IsCorrect = true },
                        new() { Text = "Making code run faster", IsCorrect = false },
                        new() { Text = "Creating multiple threads", IsCorrect = false },
                        new() { Text = "Handling CSS animations", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "What is a closure in JavaScript?",
                    Difficulty = "Advanced",
                    Answers = new List<Answer>
                    {
                        new() { Text = "A function that has access to its outer scope's variables", IsCorrect = true },
                        new() { Text = "A way to close a browser window", IsCorrect = false },
                        new() { Text = "A method to end a loop", IsCorrect = false },
                        new() { Text = "A type of error handling", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "Which ES6 feature allows extracting values from arrays or objects?",
                    CodeSnippet = "const { name, age } = person;",
                    Difficulty = "Intermediate",
                    Answers = new List<Answer>
                    {
                        new() { Text = "Destructuring", IsCorrect = true },
                        new() { Text = "Spread operator", IsCorrect = false },
                        new() { Text = "Template literals", IsCorrect = false },
                        new() { Text = "Rest parameters", IsCorrect = false }
                    }
                },
                new()
                {
                    Text = "What does the 'this' keyword refer to in an arrow function?",
                    Difficulty = "Advanced",
                    Answers = new List<Answer>
                    {
                        new() { Text = "The enclosing lexical context", IsCorrect = true },
                        new() { Text = "The global object", IsCorrect = false },
                        new() { Text = "The function itself", IsCorrect = false },
                        new() { Text = "undefined", IsCorrect = false }
                    }
                }
            }
        };

        db.Quizzes.AddRange(htmlQuiz, cssQuiz, jsQuiz);
        await db.SaveChangesAsync();
    }
}
