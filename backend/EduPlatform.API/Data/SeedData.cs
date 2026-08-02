using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Data;

public static class SeedData
{
    public static async Task InitializeAsync(AppDbContext db)
    {
        await db.Database.MigrateAsync();

        // Check if we need to reorder quizzes (check if htmlAdvanced comes before htmlCanvas)
        var needsReorder = false;
        var quizCount = await db.Quizzes.CountAsync();
        
        if (quizCount > 0)
        {
            var htmlAdvancedQuiz = await db.Quizzes.FirstOrDefaultAsync(q => q.Topic == "html-advanced");
            var htmlAccessibilityQuiz = await db.Quizzes.FirstOrDefaultAsync(q => q.Topic == "html-accessibility");
            
            // If both exist and htmlAdvanced has a lower ID than htmlAccessibility, we need to reorder
            if (htmlAdvancedQuiz != null && htmlAccessibilityQuiz != null && htmlAdvancedQuiz.Id < htmlAccessibilityQuiz.Id)
            {
                needsReorder = true;
            }
        }
        
        // Re-seed if no quizzes, incomplete catalog, or needs reordering
        if (quizCount < 27 || needsReorder)
        {
            // Clear old quiz data to reseed
            if (quizCount > 0)
            {
                var oldAttempts = await db.QuizAttempts.ToListAsync();
                db.QuizAttempts.RemoveRange(oldAttempts);
                var oldQuizzes = await db.Quizzes.Include(q => q.Questions).ThenInclude(q => q.Answers).ToListAsync();
                db.Quizzes.RemoveRange(oldQuizzes);
                await db.SaveChangesAsync();
            }

        // ═══════════════════════════════════════════════════
        //  HTML Quizzes (9 subcategories × 5 questions)
        // ═══════════════════════════════════════════════════

        var htmlBasics = new Quiz
        {
            Title = "HTML Basics",
            Topic = "html-basics",
            Category = "HTML",
            Description = "Core HTML concepts including document structure, headings, and basic elements.",
            Difficulty = "Beginner",
            Questions = new List<Question>
            {
                new() { Text = "What does HTML stand for?", Difficulty = "Beginner", Explanation = "HTML stands for Hyper Text Markup Language. It's the standard markup language used to create and structure content on the web.", Answers = new List<Answer> { new() { Text = "Hyper Text Markup Language", IsCorrect = true }, new() { Text = "High Tech Modern Language", IsCorrect = false }, new() { Text = "Hyper Transfer Markup Language", IsCorrect = false }, new() { Text = "Home Tool Markup Language", IsCorrect = false } } },
                new() { Text = "Which HTML element is used to define the largest heading?", Difficulty = "Beginner", Explanation = "The <h1> element represents the most important heading (largest by default). HTML provides six heading levels: <h1> to <h6>, where <h1> is the highest level.", Answers = new List<Answer> { new() { Text = "<h1>", IsCorrect = true }, new() { Text = "<heading>", IsCorrect = false }, new() { Text = "<h6>", IsCorrect = false }, new() { Text = "<head>", IsCorrect = false } } },
                new() { Text = "Which HTML element defines the title of a document?", Difficulty = "Beginner", Explanation = "The <title> element sets the document title shown in the browser's title bar or tab. It's placed inside the <head> section and is required in all HTML documents.", Answers = new List<Answer> { new() { Text = "<title>", IsCorrect = true }, new() { Text = "<head>", IsCorrect = false }, new() { Text = "<meta>", IsCorrect = false }, new() { Text = "<header>", IsCorrect = false } } },
                new() { Text = "Which HTML element is used for bold text?", Difficulty = "Beginner", Explanation = "The <strong> element is the semantic way to indicate strong importance, which browsers typically render as bold. While <b> can also make text bold, <strong> provides meaning about the content's importance.", Answers = new List<Answer> { new() { Text = "<strong>", IsCorrect = true }, new() { Text = "<bold>", IsCorrect = false }, new() { Text = "<b> (presentational only)", IsCorrect = false }, new() { Text = "<em>", IsCorrect = false } } },
                new() { Text = "What does the <meta charset='UTF-8'> tag specify?", Difficulty = "Beginner", Explanation = "The charset attribute specifies the character encoding for the HTML document. UTF-8 is a universal character encoding that can represent any character in the Unicode standard, making it ideal for web pages with international content.", Answers = new List<Answer> { new() { Text = "The character encoding for the document", IsCorrect = true }, new() { Text = "The page title", IsCorrect = false }, new() { Text = "The document language", IsCorrect = false }, new() { Text = "The viewport width", IsCorrect = false } } },
            }
        };

        var htmlLinksMedia = new Quiz
        {
            Title = "Links & Media",
            Topic = "html-links-media",
            Category = "HTML",
            Description = "Hyperlinks, images, media elements, and their attributes.",
            Difficulty = "Beginner",
            Questions = new List<Question>
            {
                new() { Text = "Which attribute is used to provide an alternate text for an image?", Difficulty = "Beginner", Explanation = "The 'alt' attribute provides alternative text for an image when it cannot be displayed. It's crucial for accessibility (screen readers) and SEO, and shows when images fail to load.", Answers = new List<Answer> { new() { Text = "alt", IsCorrect = true }, new() { Text = "title", IsCorrect = false }, new() { Text = "src", IsCorrect = false }, new() { Text = "name", IsCorrect = false } } },
                new() { Text = "What is the correct HTML element for inserting a line break?", Difficulty = "Beginner", Explanation = "The <br> element is a self-closing tag that creates a line break, moving content to the next line without starting a new paragraph. Unlike <p>, it doesn't add vertical spacing.", Answers = new List<Answer> { new() { Text = "<br>", IsCorrect = true }, new() { Text = "<lb>", IsCorrect = false }, new() { Text = "<break>", IsCorrect = false }, new() { Text = "<newline>", IsCorrect = false } } },
                new() { Text = "Which tag is used to create a hyperlink?", Difficulty = "Beginner", Explanation = "The <a> (anchor) element creates hyperlinks using the 'href' attribute to specify the destination URL. It can link to web pages, files, email addresses, locations in the same page, or any URL.", Answers = new List<Answer> { new() { Text = "<a>", IsCorrect = true }, new() { Text = "<link>", IsCorrect = false }, new() { Text = "<href>", IsCorrect = false }, new() { Text = "<url>", IsCorrect = false } } },
                new() { Text = "Which HTML attribute specifies where to open the linked document?", Difficulty = "Intermediate", Explanation = "The 'target' attribute specifies where to display the linked document. Common values: _blank (new window/tab), _self (same frame, default), _parent (parent frame), _top (full window body).", Answers = new List<Answer> { new() { Text = "target", IsCorrect = true }, new() { Text = "href", IsCorrect = false }, new() { Text = "rel", IsCorrect = false }, new() { Text = "link", IsCorrect = false } } },
                new() { Text = "What is the correct HTML for adding a background color?", Difficulty = "Beginner", Explanation = "Inline styles using the 'style' attribute allow you to apply CSS directly to an element. While valid, it's generally better to use external CSS files for separation of concerns and maintainability.", Answers = new List<Answer> { new() { Text = "<body style=\"background-color:yellow;\">", IsCorrect = true }, new() { Text = "<body bg=\"yellow\">", IsCorrect = false }, new() { Text = "<background>yellow</background>", IsCorrect = false }, new() { Text = "<body color=\"yellow\">", IsCorrect = false } } },
            }
        };

        var htmlListsTables = new Quiz
        {
            Title = "Lists & Tables",
            Topic = "html-lists-tables",
            Category = "HTML",
            Description = "Ordered and unordered lists, table elements, and data layout.",
            Difficulty = "Beginner",
            Questions = new List<Question>
            {
                new() { Text = "Which HTML element is used to create an unordered list?", Difficulty = "Beginner", Explanation = "The <ul> element creates an unordered (bulleted) list. Each item is marked with <li> tags. By default, items are displayed with bullet points, though this can be customized with CSS.", Answers = new List<Answer> { new() { Text = "<ul>", IsCorrect = true }, new() { Text = "<ol>", IsCorrect = false }, new() { Text = "<li>", IsCorrect = false }, new() { Text = "<list>", IsCorrect = false } } },
                new() { Text = "Which element is used to define a table row?", Difficulty = "Beginner", Explanation = "The <tr> (table row) element defines a row in an HTML table. Inside <tr>, you use <td> for data cells or <th> for header cells. Tables are structured with <table>, <tr>, and <td>/<th> elements.", Answers = new List<Answer> { new() { Text = "<tr>", IsCorrect = true }, new() { Text = "<td>", IsCorrect = false }, new() { Text = "<th>", IsCorrect = false }, new() { Text = "<row>", IsCorrect = false } } },
                new() { Text = "What does the 'colspan' attribute do in a table?", Difficulty = "Intermediate", Explanation = "The 'colspan' attribute makes a table cell span across multiple columns. For example, <td colspan='3'> will make the cell take up the width of 3 columns. 'rowspan' does the same for rows.", Answers = new List<Answer> { new() { Text = "Makes a cell span multiple columns", IsCorrect = true }, new() { Text = "Makes a cell span multiple rows", IsCorrect = false }, new() { Text = "Adds spacing between columns", IsCorrect = false }, new() { Text = "Sets the column width", IsCorrect = false } } },
                new() { Text = "Which HTML5 element is used for navigation links?", Difficulty = "Intermediate", Explanation = "The <nav> semantic element represents a section of navigation links (major navigation blocks). It helps screen readers and search engines understand the page structure better than using generic <div> elements.", Answers = new List<Answer> { new() { Text = "<nav>", IsCorrect = true }, new() { Text = "<navigation>", IsCorrect = false }, new() { Text = "<menu>", IsCorrect = false }, new() { Text = "<links>", IsCorrect = false } } },
                new() { Text = "Which HTML element is used to define an independent, self-contained piece of content?", Difficulty = "Intermediate", Explanation = "The <article> element represents a self-contained composition that could be independently distributed or reused (blog posts, news articles, forum posts). It makes sense on its own without the rest of the page.", Answers = new List<Answer> { new() { Text = "<article>", IsCorrect = true }, new() { Text = "<section>", IsCorrect = false }, new() { Text = "<div>", IsCorrect = false }, new() { Text = "<aside>", IsCorrect = false } } },
            }
        };

        var htmlForms = new Quiz
        {
            Title = "Forms & Inputs",
            Topic = "html-forms",
            Category = "HTML",
            Description = "Form elements, input types, validation, and form attributes.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "Which input type is used for email addresses in HTML5?", CodeSnippet = "<input type=\"???\" name=\"email\">", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "email", IsCorrect = true }, new() { Text = "mail", IsCorrect = false }, new() { Text = "text", IsCorrect = false }, new() { Text = "address", IsCorrect = false } } },
                new() { Text = "What is the purpose of the <fieldset> element?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "To group related form controls together", IsCorrect = true }, new() { Text = "To create a text input field", IsCorrect = false }, new() { Text = "To define a form action", IsCorrect = false }, new() { Text = "To style form labels", IsCorrect = false } } },
                new() { Text = "Which attribute makes an input field required before form submission?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "required", IsCorrect = true }, new() { Text = "validate", IsCorrect = false }, new() { Text = "mandatory", IsCorrect = false }, new() { Text = "notempty", IsCorrect = false } } },
                new() { Text = "What is the correct way to embed an external JavaScript file?", CodeSnippet = "<??? src=\"app.js\"><???>", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "<script src=\"app.js\"></script>", IsCorrect = true }, new() { Text = "<js src=\"app.js\"></js>", IsCorrect = false }, new() { Text = "<javascript href=\"app.js\">", IsCorrect = false }, new() { Text = "<link rel=\"script\" href=\"app.js\">", IsCorrect = false } } },
                new() { Text = "What does the 'defer' attribute do on a <script> tag?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "Delays script execution until the HTML is fully parsed", IsCorrect = true }, new() { Text = "Downloads the script asynchronously", IsCorrect = false }, new() { Text = "Prevents the script from running", IsCorrect = false }, new() { Text = "Makes the script run immediately", IsCorrect = false } } },
            }
        };

        var htmlSemantic = new Quiz
        {
            Title = "Semantic HTML",
            Topic = "html-semantic",
            Category = "HTML",
            Description = "Semantic elements, accessibility, and meaningful document structure.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "What is the difference between <section> and <div>?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "<section> is semantic and represents a thematic grouping with a heading", IsCorrect = true }, new() { Text = "They are identical in every way", IsCorrect = false }, new() { Text = "<div> is semantic while <section> is not", IsCorrect = false }, new() { Text = "<section> is a block element while <div> is inline", IsCorrect = false } } },
                new() { Text = "What does ARIA stand for in web accessibility?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "Accessible Rich Internet Applications", IsCorrect = true }, new() { Text = "Advanced Responsive Internet Architecture", IsCorrect = false }, new() { Text = "Automated Rich Interface Attributes", IsCorrect = false }, new() { Text = "Accessible Rendered Interactive Application", IsCorrect = false } } },
                new() { Text = "Which attribute should be added to <html> to set the document language?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "lang", IsCorrect = true }, new() { Text = "language", IsCorrect = false }, new() { Text = "locale", IsCorrect = false }, new() { Text = "xml:lang", IsCorrect = false } } },
                new() { Text = "Which element is used to represent a self-contained composition in a document?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "<figure>", IsCorrect = true }, new() { Text = "<image>", IsCorrect = false }, new() { Text = "<picture>", IsCorrect = false }, new() { Text = "<canvas>", IsCorrect = false } } },
                new() { Text = "What is the purpose of the <picture> element in HTML5?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "To provide multiple source images for responsive art direction", IsCorrect = true }, new() { Text = "To display a photo gallery", IsCorrect = false }, new() { Text = "To add image filters", IsCorrect = false }, new() { Text = "To create an image placeholder", IsCorrect = false } } },
            }
        };

        var htmlAdvanced = new Quiz
        {
            Title = "HTML5 & Advanced",
            Topic = "html-advanced",
            Category = "HTML",
            Description = "Custom data attributes, lazy loading, custom elements, and modern HTML5 APIs.",
            Difficulty = "Advanced",
            Questions = new List<Question>
            {
                new() { Text = "What is the purpose of the 'data-*' attributes in HTML5?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "To store custom data private to the page or application", IsCorrect = true }, new() { Text = "To define database connections", IsCorrect = false }, new() { Text = "To create data tables", IsCorrect = false }, new() { Text = "To link external data sources", IsCorrect = false } } },
                new() { Text = "Which attribute would you use to specify that an image should be loaded lazily?", CodeSnippet = "<img src=\"photo.jpg\" ???=\"lazy\">", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "loading", IsCorrect = true }, new() { Text = "defer", IsCorrect = false }, new() { Text = "async", IsCorrect = false }, new() { Text = "lazy", IsCorrect = false } } },
                new() { Text = "What does the 'contenteditable' attribute do?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "Makes the element's content editable by the user", IsCorrect = true }, new() { Text = "Locks the content from being edited", IsCorrect = false }, new() { Text = "Enables spell checking", IsCorrect = false }, new() { Text = "Allows drag and drop of the element", IsCorrect = false } } },
                new() { Text = "Which HTML element is used to embed vector graphics?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "<svg>", IsCorrect = true }, new() { Text = "<canvas>", IsCorrect = false }, new() { Text = "<vector>", IsCorrect = false }, new() { Text = "<img> with .svg src", IsCorrect = false } } },
                new() { Text = "What is the correct way to define a custom element in HTML?", CodeSnippet = "class MyEl extends HTMLElement {}\ncustomElements.define('???', MyEl);", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "A tag name with a hyphen like 'my-element'", IsCorrect = true }, new() { Text = "Any single-word name like 'myelement'", IsCorrect = false }, new() { Text = "A name starting with 'x-' only", IsCorrect = false }, new() { Text = "A name using camelCase like 'myElement'", IsCorrect = false } } },
            }
        };

        var htmlAttributes = new Quiz
        {
            Title = "Attributes & Metadata",
            Topic = "html-attributes-metadata",
            Category = "HTML",
            Description = "HTML attributes, metadata tags, and page-level configuration.",
            Difficulty = "Beginner",
            Questions = new List<Question>
            {
                new() { Text = "Which attribute is used to define the URL of a linked resource?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "href", IsCorrect = true }, new() { Text = "src", IsCorrect = false }, new() { Text = "link", IsCorrect = false }, new() { Text = "url", IsCorrect = false } } },
                new() { Text = "What is the purpose of the <meta> tag?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "To provide metadata about the HTML document", IsCorrect = true }, new() { Text = "To create a paragraph", IsCorrect = false }, new() { Text = "To insert an image", IsCorrect = false }, new() { Text = "To define a link", IsCorrect = false } } },
                new() { Text = "Which attribute is commonly used for responsive viewport settings?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "viewport", IsCorrect = true }, new() { Text = "scale", IsCorrect = false }, new() { Text = "width", IsCorrect = false }, new() { Text = "device", IsCorrect = false } } },
                new() { Text = "Which attribute provides descriptive text for screen readers on images?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "alt", IsCorrect = true }, new() { Text = "title", IsCorrect = false }, new() { Text = "caption", IsCorrect = false }, new() { Text = "description", IsCorrect = false } } },
                new() { Text = "What does the 'rel' attribute typically describe on a link?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "The relationship between the current and linked document", IsCorrect = true }, new() { Text = "The link color", IsCorrect = false }, new() { Text = "The target frame", IsCorrect = false }, new() { Text = "The link language", IsCorrect = false } } },
            }
        };

        var htmlMediaEmbeds = new Quiz
        {
            Title = "Media & Embeds",
            Topic = "html-media-embeds",
            Category = "HTML",
            Description = "Images, audio, video, iframes, and embedded media.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "Which tag is used to embed an image in HTML?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "<img>", IsCorrect = true }, new() { Text = "<picture>", IsCorrect = false }, new() { Text = "<figure>", IsCorrect = false }, new() { Text = "<image>", IsCorrect = false } } },
                new() { Text = "Which HTML element is used to embed a video?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "<video>", IsCorrect = true }, new() { Text = "<embed>", IsCorrect = false }, new() { Text = "<audio>", IsCorrect = false }, new() { Text = "<source>", IsCorrect = false } } },
                new() { Text = "What does the 'controls' attribute do on a media element?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "It shows playback controls to the user", IsCorrect = true }, new() { Text = "It loops the media automatically", IsCorrect = false }, new() { Text = "It changes the media source", IsCorrect = false }, new() { Text = "It hides the media element", IsCorrect = false } } },
                new() { Text = "Which element is used to define multiple media resources for audio or video?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "<source>", IsCorrect = true }, new() { Text = "<track>", IsCorrect = false }, new() { Text = "<media>", IsCorrect = false }, new() { Text = "<file>", IsCorrect = false } } },
                new() { Text = "What is an iframe commonly used for?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "Embedding another HTML page inside the current page", IsCorrect = true }, new() { Text = "Creating a list item", IsCorrect = false }, new() { Text = "Defining a form field", IsCorrect = false }, new() { Text = "Styling text", IsCorrect = false } } },
            }
        };

        var htmlAccessibility = new Quiz
        {
            Title = "Accessibility & ARIA",
            Topic = "html-accessibility-aria",
            Category = "HTML",
            Description = "Accessibility basics, labels, landmarks, and ARIA attributes.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "Why are form labels important for accessibility?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "They help screen readers identify the purpose of a form control", IsCorrect = true }, new() { Text = "They make the form look better", IsCorrect = false }, new() { Text = "They are required for every input", IsCorrect = false }, new() { Text = "They reduce the page size", IsCorrect = false } } },
                new() { Text = "What does ARIA stand for?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "Accessible Rich Internet Applications", IsCorrect = true }, new() { Text = "Advanced Responsive Interface Attributes", IsCorrect = false }, new() { Text = "Accessible Renderable Input Areas", IsCorrect = false }, new() { Text = "Advanced Rich Internet Applications", IsCorrect = false } } },
                new() { Text = "Which HTML landmark element is commonly used for page navigation?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "<nav>", IsCorrect = true }, new() { Text = "<footer>", IsCorrect = false }, new() { Text = "<article>", IsCorrect = false }, new() { Text = "<aside>", IsCorrect = false } } },
                new() { Text = "What is the purpose of the 'aria-label' attribute?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "To provide an accessible name for an element", IsCorrect = true }, new() { Text = "To set the element's color", IsCorrect = false }, new() { Text = "To define the element's id", IsCorrect = false }, new() { Text = "To make the element visible", IsCorrect = false } } },
                new() { Text = "Which element often improves keyboard navigation when used properly?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "<button>", IsCorrect = true }, new() { Text = "<div>", IsCorrect = false }, new() { Text = "<span>", IsCorrect = false }, new() { Text = "<p>", IsCorrect = false } } },
            }
        };

        var htmlCanvas = new Quiz
        {
            Title = "Canvas API & Graphics",
            Topic = "html-canvas",
            Category = "HTML",
            Description = "Drawing graphics with Canvas API, shapes, paths, and animations.",
            Difficulty = "Advanced",
            Questions = new List<Question>
            {
                new() { Text = "What does getContext('2d') return?", Difficulty = "Advanced", Explanation = "The getContext('2d') method returns a CanvasRenderingContext2D object, which provides methods and properties for drawing 2D graphics on the canvas element.", Answers = new List<Answer> { new() { Text = "A 2D rendering context for drawing", IsCorrect = true }, new() { Text = "A 3D rendering context", IsCorrect = false }, new() { Text = "The canvas element itself", IsCorrect = false }, new() { Text = "An image object", IsCorrect = false } } },
                new() { Text = "Which method draws a filled rectangle on canvas?", CodeSnippet = "ctx.???(x, y, width, height);", Difficulty = "Advanced", Explanation = "The fillRect() method draws a filled rectangle at position (x, y) with the specified width and height. Use strokeRect() for an outlined rectangle.", Answers = new List<Answer> { new() { Text = "fillRect", IsCorrect = true }, new() { Text = "drawRect", IsCorrect = false }, new() { Text = "createRect", IsCorrect = false }, new() { Text = "makeRect", IsCorrect = false } } },
                new() { Text = "How do you start a new path in canvas?", Difficulty = "Advanced", Explanation = "The beginPath() method starts a new path by emptying the list of sub-paths. Call this whenever you want to create a new shape.", Answers = new List<Answer> { new() { Text = "beginPath()", IsCorrect = true }, new() { Text = "startPath()", IsCorrect = false }, new() { Text = "newPath()", IsCorrect = false }, new() { Text = "createPath()", IsCorrect = false } } },
                new() { Text = "What is requestAnimationFrame() used for?", Difficulty = "Advanced", Explanation = "requestAnimationFrame() tells the browser to perform an animation and requests that it call a specified function before the next repaint, typically 60 times per second.", Answers = new List<Answer> { new() { Text = "Creating smooth animations by calling a function before each repaint", IsCorrect = true }, new() { Text = "Setting a timer for animations", IsCorrect = false }, new() { Text = "Drawing static images", IsCorrect = false }, new() { Text = "Loading image files", IsCorrect = false } } },
                new() { Text = "How do you clear a canvas area?", CodeSnippet = "ctx.???(0, 0, canvas.width, canvas.height);", Difficulty = "Advanced", Explanation = "The clearRect() method clears the specified rectangular area, making it fully transparent. Often used to clear the entire canvas between animation frames.", Answers = new List<Answer> { new() { Text = "clearRect", IsCorrect = true }, new() { Text = "deleteRect", IsCorrect = false }, new() { Text = "removeRect", IsCorrect = false }, new() { Text = "eraseRect", IsCorrect = false } } },
            }
        };

        var htmlSvg = new Quiz
        {
            Title = "SVG Graphics",
            Topic = "html-svg",
            Category = "HTML",
            Description = "Scalable Vector Graphics, shapes, styling, and responsive images.",
            Difficulty = "Advanced",
            Questions = new List<Question>
            {
                new() { Text = "What does SVG stand for?", Difficulty = "Advanced", Explanation = "SVG stands for Scalable Vector Graphics. It's an XML-based format for vector graphics that scale perfectly at any size without losing quality.", Answers = new List<Answer> { new() { Text = "Scalable Vector Graphics", IsCorrect = true }, new() { Text = "Simple Vector Graphics", IsCorrect = false }, new() { Text = "Standard Visual Graphics", IsCorrect = false }, new() { Text = "Structured Vector Geometry", IsCorrect = false } } },
                new() { Text = "Which SVG element creates a circle?", Difficulty = "Advanced", Explanation = "The <circle> element draws a circle using cx and cy for center coordinates and r for radius. Example: <circle cx='50' cy='50' r='40' />", Answers = new List<Answer> { new() { Text = "<circle>", IsCorrect = true }, new() { Text = "<round>", IsCorrect = false }, new() { Text = "<circ>", IsCorrect = false }, new() { Text = "<ellipse>", IsCorrect = false } } },
                new() { Text = "What is the advantage of inline SVG over external SVG files?", Difficulty = "Advanced", Explanation = "Inline SVG can be styled with CSS and manipulated with JavaScript directly, allows for dynamic changes, and avoids extra HTTP requests.", Answers = new List<Answer> { new() { Text = "Can be styled with CSS and manipulated with JavaScript", IsCorrect = true }, new() { Text = "Smaller file size", IsCorrect = false }, new() { Text = "Better browser support", IsCorrect = false }, new() { Text = "Loads faster", IsCorrect = false } } },
                new() { Text = "What does the viewBox attribute do?", CodeSnippet = "<svg viewBox='0 0 100 100'>", Difficulty = "Advanced", Explanation = "The viewBox attribute defines the coordinate system and aspect ratio for the SVG. It specifies min-x, min-y, width, and height, allowing the SVG to scale responsively.", Answers = new List<Answer> { new() { Text = "Defines the coordinate system and viewport for the SVG", IsCorrect = true }, new() { Text = "Sets the background color", IsCorrect = false }, new() { Text = "Creates a border around the SVG", IsCorrect = false }, new() { Text = "Sets the SVG's z-index", IsCorrect = false } } },
                new() { Text = "Which SVG element is used for complex paths?", Difficulty = "Advanced", Explanation = "The <path> element is the most powerful SVG element. It can create lines, curves, arcs, and complex shapes using the 'd' attribute with path commands.", Answers = new List<Answer> { new() { Text = "<path>", IsCorrect = true }, new() { Text = "<line>", IsCorrect = false }, new() { Text = "<shape>", IsCorrect = false }, new() { Text = "<draw>", IsCorrect = false } } },
            }
        };

        var htmlWebComponents = new Quiz
        {
            Title = "Web Components",
            Topic = "html-web-components",
            Category = "HTML",
            Description = "Custom elements, Shadow DOM, templates, and reusable components.",
            Difficulty = "Advanced",
            Questions = new List<Question>
            {
                new() { Text = "What must custom element names contain?", Difficulty = "Advanced", Explanation = "Custom element names must contain a hyphen (-) to distinguish them from standard HTML elements. Valid examples: my-button, user-card. Invalid: mybutton.", Answers = new List<Answer> { new() { Text = "A hyphen (-)", IsCorrect = true }, new() { Text = "An underscore (_)", IsCorrect = false }, new() { Text = "Capital letters", IsCorrect = false }, new() { Text = "Numbers only", IsCorrect = false } } },
                new() { Text = "What does Shadow DOM provide?", Difficulty = "Advanced", Explanation = "Shadow DOM provides encapsulation for web components. Styles and scripts inside the shadow DOM don't leak out, and outside styles don't affect the shadow DOM content.", Answers = new List<Answer> { new() { Text = "Style and markup encapsulation", IsCorrect = true }, new() { Text = "Faster rendering", IsCorrect = false }, new() { Text = "Better SEO", IsCorrect = false }, new() { Text = "Automatic styling", IsCorrect = false } } },
                new() { Text = "Which lifecycle callback runs when a custom element is added to the DOM?", Difficulty = "Advanced", Explanation = "The connectedCallback() lifecycle method is invoked each time the custom element is appended to a document-connected element. This is where you typically set up event listeners and render content.", Answers = new List<Answer> { new() { Text = "connectedCallback()", IsCorrect = true }, new() { Text = "constructor()", IsCorrect = false }, new() { Text = "mountedCallback()", IsCorrect = false }, new() { Text = "addedCallback()", IsCorrect = false } } },
                new() { Text = "How do you define a custom element?", CodeSnippet = "customElements.??('my-el', MyElement);", Difficulty = "Advanced", Explanation = "Use customElements.define() to register a custom element. First parameter is the tag name (must have a hyphen), second is the class that extends HTMLElement.", Answers = new List<Answer> { new() { Text = "define", IsCorrect = true }, new() { Text = "create", IsCorrect = false }, new() { Text = "register", IsCorrect = false }, new() { Text = "declare", IsCorrect = false } } },
                new() { Text = "What is the purpose of <slot> in web components?", Difficulty = "Advanced", Explanation = "The <slot> element is a placeholder inside a web component that users can fill with their own markup. Named slots allow for multiple insertion points.", Answers = new List<Answer> { new() { Text = "A placeholder for user-provided content", IsCorrect = true }, new() { Text = "A storage location for data", IsCorrect = false }, new() { Text = "A styling container", IsCorrect = false }, new() { Text = "An event handler", IsCorrect = false } } },
            }
        };

        var htmlDragDrop = new Quiz
        {
            Title = "Drag and Drop API",
            Topic = "html-drag-drop",
            Category = "HTML",
            Description = "Drag and drop interfaces, dataTransfer, and file uploads.",
            Difficulty = "Advanced",
            Questions = new List<Question>
            {
                new() { Text = "What attribute makes an element draggable?", Difficulty = "Advanced", Explanation = "The draggable='true' attribute makes any HTML element draggable. By default, only images and links are draggable without this attribute.", Answers = new List<Answer> { new() { Text = "draggable='true'", IsCorrect = true }, new() { Text = "drag='enabled'", IsCorrect = false }, new() { Text = "dragable='yes'", IsCorrect = false }, new() { Text = "can-drag='true'", IsCorrect = false } } },
                new() { Text = "Which event fires when a dragged element enters a drop target?", Difficulty = "Advanced", Explanation = "The dragenter event fires when a dragged element enters a valid drop target. This is commonly used to provide visual feedback to the user.", Answers = new List<Answer> { new() { Text = "dragenter", IsCorrect = true }, new() { Text = "dragin", IsCorrect = false }, new() { Text = "dragstart", IsCorrect = false }, new() { Text = "draginside", IsCorrect = false } } },
                new() { Text = "What must you call on dragover event to allow dropping?", CodeSnippet = "element.addEventListener('dragover', (e) => e.???());", Difficulty = "Advanced", Explanation = "You must call preventDefault() on the dragover event to allow an element to receive drop events. Without this, the drop event won't fire.", Answers = new List<Answer> { new() { Text = "preventDefault", IsCorrect = true }, new() { Text = "allowDrop", IsCorrect = false }, new() { Text = "enableDrop", IsCorrect = false }, new() { Text = "acceptDrop", IsCorrect = false } } },
                new() { Text = "What object carries data during drag operations?", Difficulty = "Advanced", Explanation = "The dataTransfer object holds the data being dragged. Use setData() during dragstart and getData() during drop to pass information between drag and drop events.", Answers = new List<Answer> { new() { Text = "dataTransfer", IsCorrect = true }, new() { Text = "dragData", IsCorrect = false }, new() { Text = "dropData", IsCorrect = false }, new() { Text = "transferData", IsCorrect = false } } },
                new() { Text = "How do you access dropped files?", CodeSnippet = "e.dataTransfer.???", Difficulty = "Advanced", Explanation = "The dataTransfer.files property contains a FileList of files that were dropped. This allows users to drag files from their file system into the browser.", Answers = new List<Answer> { new() { Text = "files", IsCorrect = true }, new() { Text = "fileList", IsCorrect = false }, new() { Text = "droppedFiles", IsCorrect = false }, new() { Text = "uploadedFiles", IsCorrect = false } } },
            }
        };

        var htmlWebStorage = new Quiz
        {
            Title = "Web Storage API",
            Topic = "html-web-storage",
            Category = "HTML",
            Description = "localStorage, sessionStorage, and client-side data persistence.",
            Difficulty = "Advanced",
            Questions = new List<Question>
            {
                new() { Text = "What's the difference between localStorage and sessionStorage?", Difficulty = "Advanced", Explanation = "localStorage persists data even after the browser is closed, while sessionStorage data is cleared when the tab/browser is closed. Both are limited to the same origin.", Answers = new List<Answer> { new() { Text = "localStorage persists; sessionStorage clears on tab close", IsCorrect = true }, new() { Text = "localStorage is faster than sessionStorage", IsCorrect = false }, new() { Text = "sessionStorage has more storage capacity", IsCorrect = false }, new() { Text = "localStorage is sent to the server", IsCorrect = false } } },
                new() { Text = "What data types can Web Storage directly store?", Difficulty = "Advanced", Explanation = "Web Storage can only store strings. To store objects or arrays, you must convert them to JSON strings using JSON.stringify() and parse them back with JSON.parse().", Answers = new List<Answer> { new() { Text = "Strings only", IsCorrect = true }, new() { Text = "Any JavaScript data type", IsCorrect = false }, new() { Text = "Strings and numbers", IsCorrect = false }, new() { Text = "Objects and arrays", IsCorrect = false } } },
                new() { Text = "How do you store an object in localStorage?", CodeSnippet = "localStorage.setItem('user', ???);", Difficulty = "Advanced", Explanation = "Use JSON.stringify() to convert the object to a JSON string before storing. When retrieving, use JSON.parse() to convert it back to an object.", Answers = new List<Answer> { new() { Text = "JSON.stringify(user)", IsCorrect = true }, new() { Text = "user.toString()", IsCorrect = false }, new() { Text = "String(user)", IsCorrect = false }, new() { Text = "user", IsCorrect = false } } },
                new() { Text = "What is the typical storage limit for Web Storage?", Difficulty = "Advanced", Explanation = "Most modern browsers allow 5-10 MB of storage per origin for Web Storage. This is much larger than cookies (4 KB) but much smaller than IndexedDB (hundreds of MB).", Answers = new List<Answer> { new() { Text = "5-10 MB", IsCorrect = true }, new() { Text = "4 KB", IsCorrect = false }, new() { Text = "100 MB", IsCorrect = false }, new() { Text = "Unlimited", IsCorrect = false } } },
                new() { Text = "Should you store sensitive data like passwords in Web Storage?", Difficulty = "Advanced", Explanation = "No! Web Storage is not encrypted and is vulnerable to XSS attacks. Never store sensitive data like passwords, tokens, or credit card information in Web Storage.", Answers = new List<Answer> { new() { Text = "No, it's not encrypted and vulnerable to XSS", IsCorrect = true }, new() { Text = "Yes, it's completely secure", IsCorrect = false }, new() { Text = "Only in sessionStorage", IsCorrect = false }, new() { Text = "Yes, if you encrypt it first", IsCorrect = false } } },
            }
        };

        var htmlGeolocation = new Quiz
        {
            Title = "Geolocation API",
            Topic = "html-geolocation",
            Category = "HTML",
            Description = "User location, permissions, getCurrentPosition, and watchPosition.",
            Difficulty = "Advanced",
            Questions = new List<Question>
            {
                new() { Text = "What protocol is required for Geolocation API?", Difficulty = "Advanced", Explanation = "The Geolocation API requires HTTPS (or localhost for development). Browsers block geolocation requests on insecure HTTP connections for security reasons.", Answers = new List<Answer> { new() { Text = "HTTPS (or localhost)", IsCorrect = true }, new() { Text = "HTTP is fine", IsCorrect = false }, new() { Text = "FTP", IsCorrect = false }, new() { Text = "Any protocol", IsCorrect = false } } },
                new() { Text = "Which method gets the user's current location once?", Difficulty = "Advanced", Explanation = "getCurrentPosition() retrieves the device's current position once. For continuous tracking, use watchPosition() instead.", Answers = new List<Answer> { new() { Text = "getCurrentPosition()", IsCorrect = true }, new() { Text = "getLocation()", IsCorrect = false }, new() { Text = "fetchPosition()", IsCorrect = false }, new() { Text = "requestLocation()", IsCorrect = false } } },
                new() { Text = "What coordinates does the Geolocation API provide?", Difficulty = "Advanced", Explanation = "The API returns latitude and longitude in decimal degrees, plus additional data like accuracy (in meters), altitude, speed, and heading when available.", Answers = new List<Answer> { new() { Text = "latitude and longitude (plus accuracy, altitude, speed, heading)", IsCorrect = true }, new() { Text = "Only latitude and longitude", IsCorrect = false }, new() { Text = "Address and city name", IsCorrect = false }, new() { Text = "ZIP code and country", IsCorrect = false } } },
                new() { Text = "What happens if the user denies location permission?", Difficulty = "Advanced", Explanation = "If the user denies permission, the error callback is called with error.code === 1 (PERMISSION_DENIED). Always handle this gracefully with a user-friendly message.", Answers = new List<Answer> { new() { Text = "The error callback is called with PERMISSION_DENIED", IsCorrect = true }, new() { Text = "The function returns null", IsCorrect = false }, new() { Text = "The browser reloads the page", IsCorrect = false }, new() { Text = "Nothing happens", IsCorrect = false } } },
                new() { Text = "What does enableHighAccuracy option do?", CodeSnippet = "{ enableHighAccuracy: true }", Difficulty = "Advanced", Explanation = "enableHighAccuracy: true requests the most accurate position possible, typically using GPS. This is slower and uses more battery, so only use it when necessary.", Answers = new List<Answer> { new() { Text = "Requests GPS for more accurate position (slower, more battery)", IsCorrect = true }, new() { Text = "Makes the request faster", IsCorrect = false }, new() { Text = "Improves security", IsCorrect = false }, new() { Text = "Returns multiple positions", IsCorrect = false } } },
            }
        };

        // ═══════════════════════════════════════════════════
        //  CSS Quizzes (9 subcategories × 5 questions)
        // ═══════════════════════════════════════════════════

        var cssBasics = new Quiz
        {
            Title = "CSS Basics",
            Topic = "css-basics",
            Category = "CSS",
            Description = "Fundamental CSS properties for color, fonts, backgrounds, and selectors.",
            Difficulty = "Beginner",
            Questions = new List<Question>
            {
                new() { Text = "Which CSS property is used to change the text color?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "color", IsCorrect = true }, new() { Text = "text-color", IsCorrect = false }, new() { Text = "font-color", IsCorrect = false }, new() { Text = "foreground", IsCorrect = false } } },
                new() { Text = "Which property is used to set the background color?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "background-color", IsCorrect = true }, new() { Text = "bgcolor", IsCorrect = false }, new() { Text = "color-background", IsCorrect = false }, new() { Text = "bg-color", IsCorrect = false } } },
                new() { Text = "How do you make text bold in CSS?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "font-weight: bold;", IsCorrect = true }, new() { Text = "text-style: bold;", IsCorrect = false }, new() { Text = "font-bold: true;", IsCorrect = false }, new() { Text = "text-weight: bold;", IsCorrect = false } } },
                new() { Text = "Which property sets the font size?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "font-size", IsCorrect = true }, new() { Text = "text-size", IsCorrect = false }, new() { Text = "size", IsCorrect = false }, new() { Text = "font-style", IsCorrect = false } } },
                new() { Text = "How do you select an element with class 'active'?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = ".active { }", IsCorrect = true }, new() { Text = "#active { }", IsCorrect = false }, new() { Text = "active { }", IsCorrect = false }, new() { Text = "*active { }", IsCorrect = false } } },
            }
        };

        var cssBoxModel = new Quiz
        {
            Title = "Box Model & Layout",
            Topic = "css-box-model",
            Category = "CSS",
            Description = "The CSS box model, padding, margins, display, and box-sizing.",
            Difficulty = "Beginner",
            Questions = new List<Question>
            {
                new() { Text = "Which property is used to create space between the element's border and inner content?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "padding", IsCorrect = true }, new() { Text = "margin", IsCorrect = false }, new() { Text = "spacing", IsCorrect = false }, new() { Text = "border-spacing", IsCorrect = false } } },
                new() { Text = "What does the CSS Box Model consist of?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "Content, Padding, Border, Margin", IsCorrect = true }, new() { Text = "Header, Body, Footer, Sidebar", IsCorrect = false }, new() { Text = "Width, Height, Color, Font", IsCorrect = false }, new() { Text = "Display, Position, Float, Clear", IsCorrect = false } } },
                new() { Text = "What does 'display: none' do?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "Hides the element completely and removes it from the layout", IsCorrect = true }, new() { Text = "Makes the element invisible but keeps its space", IsCorrect = false }, new() { Text = "Sets opacity to 0", IsCorrect = false }, new() { Text = "Moves the element off-screen", IsCorrect = false } } },
                new() { Text = "Which unit is relative to the font-size of the root element?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "rem", IsCorrect = true }, new() { Text = "em", IsCorrect = false }, new() { Text = "px", IsCorrect = false }, new() { Text = "%", IsCorrect = false } } },
                new() { Text = "What does 'box-sizing: border-box' do?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "Includes padding and border in the element's total width and height", IsCorrect = true }, new() { Text = "Adds a border around the box model", IsCorrect = false }, new() { Text = "Removes the border from the box model", IsCorrect = false }, new() { Text = "Sets the box shadow style", IsCorrect = false } } },
            }
        };

        var cssSelectors = new Quiz
        {
            Title = "Selectors & Specificity",
            Topic = "css-selectors",
            Category = "CSS",
            Description = "CSS selectors, combinators, pseudo-classes, and specificity rules.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "How do you apply a style to all <p> elements inside a <div>?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "div p { }", IsCorrect = true }, new() { Text = "div + p { }", IsCorrect = false }, new() { Text = "div > p { } (only direct children)", IsCorrect = false }, new() { Text = "div.p { }", IsCorrect = false } } },
                new() { Text = "What is the default value of the position property?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "static", IsCorrect = true }, new() { Text = "relative", IsCorrect = false }, new() { Text = "absolute", IsCorrect = false }, new() { Text = "fixed", IsCorrect = false } } },
                new() { Text = "Which CSS property controls the stacking order of elements?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "z-index", IsCorrect = true }, new() { Text = "order", IsCorrect = false }, new() { Text = "stack", IsCorrect = false }, new() { Text = "layer", IsCorrect = false } } },
                new() { Text = "Which pseudo-class selects the first child element?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = ":first-child", IsCorrect = true }, new() { Text = ":first-of-type", IsCorrect = false }, new() { Text = ":first", IsCorrect = false }, new() { Text = ":nth-child(first)", IsCorrect = false } } },
                new() { Text = "What is the CSS specificity order (lowest to highest)?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "Element → Class → ID → Inline", IsCorrect = true }, new() { Text = "ID → Class → Element → Inline", IsCorrect = false }, new() { Text = "Inline → ID → Class → Element", IsCorrect = false }, new() { Text = "Class → Element → ID → Inline", IsCorrect = false } } },
            }
        };

        var cssFlexboxGrid = new Quiz
        {
            Title = "Flexbox & Grid",
            Topic = "css-flexbox-grid",
            Category = "CSS",
            Description = "Modern layout techniques with Flexbox and CSS Grid.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "How do you make a flex container?", CodeSnippet = ".container { display: ???; }", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "flex", IsCorrect = true }, new() { Text = "flexbox", IsCorrect = false }, new() { Text = "block-flex", IsCorrect = false }, new() { Text = "inline", IsCorrect = false } } },
                new() { Text = "Which CSS Grid property defines the number of columns?", CodeSnippet = ".grid { display: grid; ???: 1fr 1fr 1fr; }", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "grid-template-columns", IsCorrect = true }, new() { Text = "grid-columns", IsCorrect = false }, new() { Text = "columns", IsCorrect = false }, new() { Text = "grid-auto-columns", IsCorrect = false } } },
                new() { Text = "Which media query targets screens smaller than 768px?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "@media (max-width: 768px)", IsCorrect = true }, new() { Text = "@media (min-width: 768px)", IsCorrect = false }, new() { Text = "@screen (max-width: 768px)", IsCorrect = false }, new() { Text = "@responsive (768px)", IsCorrect = false } } },
                new() { Text = "What does 'flex: 1' mean?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "flex-grow: 1, flex-shrink: 1, flex-basis: 0%", IsCorrect = true }, new() { Text = "Set width to 1px", IsCorrect = false }, new() { Text = "Display only 1 flex item", IsCorrect = false }, new() { Text = "flex-direction: row with 1 column", IsCorrect = false } } },
                new() { Text = "Which property centers flex items along the cross axis?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "align-items", IsCorrect = true }, new() { Text = "justify-content", IsCorrect = false }, new() { Text = "align-content", IsCorrect = false }, new() { Text = "text-align", IsCorrect = false } } },
            }
        };

        var cssVisual = new Quiz
        {
            Title = "Colors & Effects",
            Topic = "css-visual",
            Category = "CSS",
            Description = "CSS visual properties, transitions, custom properties, and modern functions.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "What is the difference between 'visibility: hidden' and 'display: none'?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "visibility: hidden keeps the space; display: none removes it", IsCorrect = true }, new() { Text = "They are identical", IsCorrect = false }, new() { Text = "display: none keeps the space; visibility: hidden removes it", IsCorrect = false }, new() { Text = "visibility: hidden only works on images", IsCorrect = false } } },
                new() { Text = "What does the CSS 'clamp()' function do?", CodeSnippet = "font-size: clamp(1rem, 2.5vw, 2rem);", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "Sets a value that scales between a minimum and maximum", IsCorrect = true }, new() { Text = "Restricts a value to exactly one size", IsCorrect = false }, new() { Text = "Creates a CSS animation clamp", IsCorrect = false }, new() { Text = "Rounds the value to the nearest integer", IsCorrect = false } } },
                new() { Text = "What is a CSS custom property (variable)?", CodeSnippet = ":root { --primary: #6366f1; }\n.btn { color: var(--primary); }", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "A reusable value defined with -- prefix, accessed via var()", IsCorrect = true }, new() { Text = "A JavaScript variable used in CSS", IsCorrect = false }, new() { Text = "A preprocessor feature like SASS variables", IsCorrect = false }, new() { Text = "An attribute selector for custom data", IsCorrect = false } } },
                new() { Text = "Which property creates a smooth transition between states?", CodeSnippet = ".btn { ???: background-color 0.3s ease; }", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "transition", IsCorrect = true }, new() { Text = "animation", IsCorrect = false }, new() { Text = "transform", IsCorrect = false }, new() { Text = "change", IsCorrect = false } } },
                new() { Text = "What does the CSS 'aspect-ratio' property do?", CodeSnippet = ".video { aspect-ratio: 16 / 9; }", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "Sets a preferred width-to-height ratio for the element", IsCorrect = true }, new() { Text = "Crops the element to a specific ratio", IsCorrect = false }, new() { Text = "Only works on images and videos", IsCorrect = false }, new() { Text = "Scales the font proportionally", IsCorrect = false } } },
            }
        };

        var cssAdvanced = new Quiz
        {
            Title = "Advanced CSS",
            Topic = "css-advanced",
            Category = "CSS",
            Description = "Performance optimizations, stacking contexts, containment, and animations.",
            Difficulty = "Advanced",
            Questions = new List<Question>
            {
                new() { Text = "What is the 'will-change' CSS property used for?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "Hints to the browser that a property will change, enabling optimizations", IsCorrect = true }, new() { Text = "Prevents an element from changing", IsCorrect = false }, new() { Text = "Triggers a change event in JavaScript", IsCorrect = false }, new() { Text = "Sets default values that will change on hover", IsCorrect = false } } },
                new() { Text = "How does CSS Grid's 'auto-fit' differ from 'auto-fill'?", CodeSnippet = "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "auto-fit collapses empty tracks; auto-fill keeps them", IsCorrect = true }, new() { Text = "They are identical", IsCorrect = false }, new() { Text = "auto-fill collapses empty tracks; auto-fit keeps them", IsCorrect = false }, new() { Text = "auto-fit only works with fixed widths", IsCorrect = false } } },
                new() { Text = "What is a stacking context in CSS?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "A three-dimensional conceptualization of HTML elements along the z-axis", IsCorrect = true }, new() { Text = "The order in which CSS files are loaded", IsCorrect = false }, new() { Text = "How flex items are stacked vertically", IsCorrect = false }, new() { Text = "The cascade order of stylesheets", IsCorrect = false } } },
                new() { Text = "What does 'contain: layout' do?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "Isolates the element's layout from the rest of the page for performance", IsCorrect = true }, new() { Text = "Centers the element in its container", IsCorrect = false }, new() { Text = "Prevents the element from overflowing", IsCorrect = false }, new() { Text = "Creates a new flex container", IsCorrect = false } } },
                new() { Text = "Which at-rule is used to define a CSS animation?", CodeSnippet = "??? fadeIn { from { opacity: 0; } to { opacity: 1; } }", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "@keyframes", IsCorrect = true }, new() { Text = "@animation", IsCorrect = false }, new() { Text = "@transition", IsCorrect = false }, new() { Text = "@animate", IsCorrect = false } } },
            }
        };

        var cssPositioning = new Quiz
        {
            Title = "Positioning & Responsive Design",
            Topic = "css-positioning-responsive",
            Category = "CSS",
            Description = "Positioning, media queries, and responsive behavior.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "Which CSS property is used to position an element relative to its normal flow?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "position: relative", IsCorrect = true }, new() { Text = "position: absolute", IsCorrect = false }, new() { Text = "position: fixed", IsCorrect = false }, new() { Text = "position: static", IsCorrect = false } } },
                new() { Text = "What does 'position: sticky' do?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "It behaves like relative until a threshold is reached, then becomes fixed", IsCorrect = true }, new() { Text = "It removes the element from the layout", IsCorrect = false }, new() { Text = "It always stays at the top of the page", IsCorrect = false }, new() { Text = "It makes the element invisible", IsCorrect = false } } },
                new() { Text = "Which rule is used to apply styles on smaller screens?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "@media", IsCorrect = true }, new() { Text = "@supports", IsCorrect = false }, new() { Text = "@import", IsCorrect = false }, new() { Text = "@keyframes", IsCorrect = false } } },
                new() { Text = "What does the 'z-index' property control?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "The stacking order of positioned elements", IsCorrect = true }, new() { Text = "The element's width", IsCorrect = false }, new() { Text = "The element's font size", IsCorrect = false }, new() { Text = "The element's color", IsCorrect = false } } },
                new() { Text = "Which CSS unit is commonly used for responsive typography?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "rem", IsCorrect = true }, new() { Text = "px", IsCorrect = false }, new() { Text = "cm", IsCorrect = false }, new() { Text = "pt", IsCorrect = false } } },
            }
        };

        var cssTransforms = new Quiz
        {
            Title = "Transforms & Animations",
            Topic = "css-transforms-animations",
            Category = "CSS",
            Description = "Transforms, transitions, and animation timing.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "Which property is used to rotate an element?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "transform", IsCorrect = true }, new() { Text = "rotate", IsCorrect = false }, new() { Text = "transition", IsCorrect = false }, new() { Text = "animation", IsCorrect = false } } },
                new() { Text = "What does the 'transition' property do?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "It animates changes between CSS property values", IsCorrect = true }, new() { Text = "It changes the element's display mode", IsCorrect = false }, new() { Text = "It defines a new layout", IsCorrect = false }, new() { Text = "It freezes the element", IsCorrect = false } } },
                new() { Text = "Which property allows a transformation to be applied smoothly over time?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "transition", IsCorrect = true }, new() { Text = "filter", IsCorrect = false }, new() { Text = "opacity", IsCorrect = false }, new() { Text = "align-items", IsCorrect = false } } },
                new() { Text = "What does 'transform: scale(1.2)' do?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "Makes the element 20% larger", IsCorrect = true }, new() { Text = "Moves the element downward", IsCorrect = false }, new() { Text = "Changes the element's color", IsCorrect = false }, new() { Text = "Makes the element fully transparent", IsCorrect = false } } },
                new() { Text = "Which property defines a named animation sequence?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "@keyframes", IsCorrect = true }, new() { Text = "animation-name", IsCorrect = false }, new() { Text = "transform", IsCorrect = false }, new() { Text = "transition-delay", IsCorrect = false } } },
            }
        };

        var cssVariables = new Quiz
        {
            Title = "Custom Properties & Theming",
            Topic = "css-variables-theming",
            Category = "CSS",
            Description = "CSS variables, theming, and reusable design tokens.",
            Difficulty = "Advanced",
            Questions = new List<Question>
            {
                new() { Text = "What is a CSS custom property?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "A reusable value defined with -- and accessed with var()", IsCorrect = true }, new() { Text = "A JavaScript function", IsCorrect = false }, new() { Text = "A special HTML attribute", IsCorrect = false }, new() { Text = "A browser-only selector", IsCorrect = false } } },
                new() { Text = "Which syntax defines a CSS variable?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "--primary-color: #6366f1;", IsCorrect = true }, new() { Text = "var-primary-color: #6366f1;", IsCorrect = false }, new() { Text = "@primary-color: #6366f1;", IsCorrect = false }, new() { Text = "primary-color = #6366f1;", IsCorrect = false } } },
                new() { Text = "How do you access a CSS variable in a declaration?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "var(--primary-color)", IsCorrect = true }, new() { Text = "value(--primary-color)", IsCorrect = false }, new() { Text = "get(--primary-color)", IsCorrect = false }, new() { Text = "use(--primary-color)", IsCorrect = false } } },
                new() { Text = "Why are CSS variables useful for theming?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "They let you change design tokens across a whole site from one place", IsCorrect = true }, new() { Text = "They reduce browser compatibility", IsCorrect = false }, new() { Text = "They replace all HTML tags", IsCorrect = false }, new() { Text = "They automatically generate animations", IsCorrect = false } } },
                new() { Text = "Where are CSS variables typically declared?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "In :root for global scope", IsCorrect = true }, new() { Text = "Inside JavaScript functions", IsCorrect = false }, new() { Text = "Inside the body element only", IsCorrect = false }, new() { Text = "Inside HTML comments", IsCorrect = false } } },
            }
        };

        // ═══════════════════════════════════════════════════
        //  JavaScript Quizzes (9 subcategories × 5 questions)
        // ═══════════════════════════════════════════════════

        var jsBasics = new Quiz
        {
            Title = "JS Basics",
            Topic = "js-basics",
            Category = "JavaScript",
            Description = "Variables, data types, operators, and core JavaScript syntax.",
            Difficulty = "Beginner",
            Questions = new List<Question>
            {
                new() { Text = "Which keyword declares a block-scoped variable?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "let", IsCorrect = true }, new() { Text = "var", IsCorrect = false }, new() { Text = "define", IsCorrect = false }, new() { Text = "variable", IsCorrect = false } } },
                new() { Text = "What does the '===' operator check?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "Value and type equality", IsCorrect = true }, new() { Text = "Value equality only", IsCorrect = false }, new() { Text = "Reference equality", IsCorrect = false }, new() { Text = "Type equality only", IsCorrect = false } } },
                new() { Text = "How do you write a single-line comment in JavaScript?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "// comment", IsCorrect = true }, new() { Text = "<!-- comment -->", IsCorrect = false }, new() { Text = "# comment", IsCorrect = false }, new() { Text = "/* comment */", IsCorrect = false } } },
                new() { Text = "What does 'console.log()' do?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "Outputs a message to the browser console", IsCorrect = true }, new() { Text = "Displays an alert box", IsCorrect = false }, new() { Text = "Writes to the HTML document", IsCorrect = false }, new() { Text = "Saves data to a log file", IsCorrect = false } } },
                new() { Text = "Which keyword prevents a variable from being reassigned?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "const", IsCorrect = true }, new() { Text = "let", IsCorrect = false }, new() { Text = "final", IsCorrect = false }, new() { Text = "static", IsCorrect = false } } },
            }
        };

        var jsArraysData = new Quiz
        {
            Title = "Arrays & Data",
            Topic = "js-arrays-data",
            Category = "JavaScript",
            Description = "Array methods, JSON handling, and data type fundamentals.",
            Difficulty = "Beginner",
            Questions = new List<Question>
            {
                new() { Text = "Which array method creates a new array with filtered elements?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "filter()", IsCorrect = true }, new() { Text = "map()", IsCorrect = false }, new() { Text = "reduce()", IsCorrect = false }, new() { Text = "find()", IsCorrect = false } } },
                new() { Text = "Which method converts a JSON string into a JavaScript object?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "JSON.parse()", IsCorrect = true }, new() { Text = "JSON.stringify()", IsCorrect = false }, new() { Text = "JSON.convert()", IsCorrect = false }, new() { Text = "JSON.toObject()", IsCorrect = false } } },
                new() { Text = "Which method adds an element to the end of an array?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "push()", IsCorrect = true }, new() { Text = "append()", IsCorrect = false }, new() { Text = "add()", IsCorrect = false }, new() { Text = "insert()", IsCorrect = false } } },
                new() { Text = "What data type is returned by typeof []?", CodeSnippet = "console.log(typeof []);", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "\"object\"", IsCorrect = true }, new() { Text = "\"array\"", IsCorrect = false }, new() { Text = "\"list\"", IsCorrect = false }, new() { Text = "\"undefined\"", IsCorrect = false } } },
                new() { Text = "What does Array.prototype.map() return?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "A new array with the results of calling a function on every element", IsCorrect = true }, new() { Text = "The original array, modified in place", IsCorrect = false }, new() { Text = "A single value reduced from the array", IsCorrect = false }, new() { Text = "A boolean indicating if all elements match", IsCorrect = false } } },
            }
        };

        var jsFunctionsScope = new Quiz
        {
            Title = "Functions & Scope",
            Topic = "js-functions-scope",
            Category = "JavaScript",
            Description = "Function declarations, closures, scope, and the 'this' keyword.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "What is the correct syntax for an arrow function?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "const fn = () => { }", IsCorrect = true }, new() { Text = "const fn = -> { }", IsCorrect = false }, new() { Text = "const fn = => { }", IsCorrect = false }, new() { Text = "const fn = function=> { }", IsCorrect = false } } },
                new() { Text = "What is the difference between 'let' and 'var'?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "'let' is block-scoped; 'var' is function-scoped", IsCorrect = true }, new() { Text = "'let' is global; 'var' is local", IsCorrect = false }, new() { Text = "'var' cannot be reassigned; 'let' can", IsCorrect = false }, new() { Text = "There is no difference", IsCorrect = false } } },
                new() { Text = "What is a closure in JavaScript?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "A function that has access to its outer scope's variables", IsCorrect = true }, new() { Text = "A way to close a browser window", IsCorrect = false }, new() { Text = "A method to end a loop", IsCorrect = false }, new() { Text = "A type of error handling", IsCorrect = false } } },
                new() { Text = "What does the 'this' keyword refer to in an arrow function?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "The enclosing lexical context", IsCorrect = true }, new() { Text = "The global object", IsCorrect = false }, new() { Text = "The function itself", IsCorrect = false }, new() { Text = "undefined", IsCorrect = false } } },
                new() { Text = "What is the difference between call(), apply(), and bind()?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "call/apply invoke immediately (apply takes array); bind returns a new function", IsCorrect = true }, new() { Text = "They are identical methods with different names", IsCorrect = false }, new() { Text = "call is for arrays, apply is for objects, bind is for strings", IsCorrect = false }, new() { Text = "bind invokes immediately; call and apply return new functions", IsCorrect = false } } },
            }
        };

        var jsDomEvents = new Quiz
        {
            Title = "DOM & Events",
            Topic = "js-dom-events",
            Category = "JavaScript",
            Description = "DOM manipulation, event handling, bubbling, and the event loop.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "What does document.querySelector() return?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "The first element matching the CSS selector", IsCorrect = true }, new() { Text = "All elements matching the CSS selector", IsCorrect = false }, new() { Text = "An array of matching elements", IsCorrect = false }, new() { Text = "The element's inner text", IsCorrect = false } } },
                new() { Text = "What is event bubbling?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "When an event triggers on a child and propagates up to parent elements", IsCorrect = true }, new() { Text = "When events are queued and processed in order", IsCorrect = false }, new() { Text = "When multiple events fire at the same time", IsCorrect = false }, new() { Text = "When an event only fires once", IsCorrect = false } } },
                new() { Text = "What does 'e.preventDefault()' do in an event handler?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "Stops the browser's default action for the event", IsCorrect = true }, new() { Text = "Stops event bubbling", IsCorrect = false }, new() { Text = "Removes the event listener", IsCorrect = false }, new() { Text = "Prevents the function from returning a value", IsCorrect = false } } },
                new() { Text = "What is the event loop in JavaScript?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "A mechanism that handles async callbacks by monitoring the call stack and task queue", IsCorrect = true }, new() { Text = "A for loop that iterates over events", IsCorrect = false }, new() { Text = "A recursive function that listens for DOM events", IsCorrect = false }, new() { Text = "A browser API for scheduling animations", IsCorrect = false } } },
                new() { Text = "What is the output?", CodeSnippet = "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "3, 3, 3", IsCorrect = true }, new() { Text = "0, 1, 2", IsCorrect = false }, new() { Text = "undefined, undefined, undefined", IsCorrect = false }, new() { Text = "0, 0, 0", IsCorrect = false } } },
            }
        };

        var jsEs6 = new Quiz
        {
            Title = "ES6+ Features",
            Topic = "js-es6",
            Category = "JavaScript",
            Description = "Modern JavaScript features including async/await, destructuring, and Promises.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "What does 'async/await' help with?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "Writing asynchronous code that looks synchronous", IsCorrect = true }, new() { Text = "Making code run faster", IsCorrect = false }, new() { Text = "Creating multiple threads", IsCorrect = false }, new() { Text = "Handling CSS animations", IsCorrect = false } } },
                new() { Text = "Which ES6 feature allows extracting values from arrays or objects?", CodeSnippet = "const { name, age } = person;", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "Destructuring", IsCorrect = true }, new() { Text = "Spread operator", IsCorrect = false }, new() { Text = "Template literals", IsCorrect = false }, new() { Text = "Rest parameters", IsCorrect = false } } },
                new() { Text = "What does the spread operator (...) do?", CodeSnippet = "const arr2 = [...arr1, 4, 5];", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "Expands an iterable into individual elements", IsCorrect = true }, new() { Text = "Concatenates two strings", IsCorrect = false }, new() { Text = "Creates a deep copy of an object", IsCorrect = false }, new() { Text = "Removes duplicate values", IsCorrect = false } } },
                new() { Text = "What is the output of typeof null?", CodeSnippet = "console.log(typeof null);", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "\"object\"", IsCorrect = true }, new() { Text = "\"null\"", IsCorrect = false }, new() { Text = "\"undefined\"", IsCorrect = false }, new() { Text = "\"boolean\"", IsCorrect = false } } },
                new() { Text = "What is the purpose of Promise.all()?", CodeSnippet = "const results = await Promise.all([p1, p2, p3]);", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "Waits for all promises to resolve and returns their results", IsCorrect = true }, new() { Text = "Returns the first promise that resolves", IsCorrect = false }, new() { Text = "Runs promises sequentially", IsCorrect = false }, new() { Text = "Catches errors from all promises", IsCorrect = false } } },
            }
        };

        var jsAdvanced = new Quiz
        {
            Title = "Advanced JavaScript",
            Topic = "js-advanced",
            Category = "JavaScript",
            Description = "Floating point quirks, Object.freeze, WeakMap, Symbol, and Proxy.",
            Difficulty = "Advanced",
            Questions = new List<Question>
            {
                new() { Text = "What is the output of this code?", CodeSnippet = "console.log(0.1 + 0.2 === 0.3);", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "false", IsCorrect = true }, new() { Text = "true", IsCorrect = false }, new() { Text = "undefined", IsCorrect = false }, new() { Text = "NaN", IsCorrect = false } } },
                new() { Text = "What does Object.freeze() do?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "Prevents adding, removing, or modifying properties of an object", IsCorrect = true }, new() { Text = "Creates a deep copy of the object", IsCorrect = false }, new() { Text = "Converts the object to an immutable string", IsCorrect = false }, new() { Text = "Locks the object in memory permanently", IsCorrect = false } } },
                new() { Text = "What is a WeakMap in JavaScript?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "A Map where keys are weakly referenced and can be garbage collected", IsCorrect = true }, new() { Text = "A Map with limited storage capacity", IsCorrect = false }, new() { Text = "A Map that automatically deletes old entries", IsCorrect = false }, new() { Text = "A Map that only stores primitive values", IsCorrect = false } } },
                new() { Text = "What is the purpose of Symbol in JavaScript?", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "To create unique, immutable identifiers for object properties", IsCorrect = true }, new() { Text = "To create special string types", IsCorrect = false }, new() { Text = "To define mathematical symbols", IsCorrect = false }, new() { Text = "To encrypt object properties", IsCorrect = false } } },
                new() { Text = "What does the 'Proxy' object do in JavaScript?", CodeSnippet = "const proxy = new Proxy(target, handler);", Difficulty = "Advanced", Answers = new List<Answer> { new() { Text = "Creates a wrapper that intercepts and redefines fundamental operations on an object", IsCorrect = true }, new() { Text = "Creates a copy of the object", IsCorrect = false }, new() { Text = "Establishes a network proxy connection", IsCorrect = false }, new() { Text = "Converts an object to a different type", IsCorrect = false } } },
            }
        };

        var jsObjectsClasses = new Quiz
        {
            Title = "Objects & Classes",
            Topic = "js-objects-classes",
            Category = "JavaScript",
            Description = "Objects, classes, inheritance, and prototypes.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "Which keyword is used to create a class in JavaScript?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "class", IsCorrect = true }, new() { Text = "function", IsCorrect = false }, new() { Text = "object", IsCorrect = false }, new() { Text = "struct", IsCorrect = false } } },
                new() { Text = "What is the purpose of the 'new' keyword?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "To create an instance of an object from a constructor or class", IsCorrect = true }, new() { Text = "To delete an object", IsCorrect = false }, new() { Text = "To declare a variable", IsCorrect = false }, new() { Text = "To define a loop", IsCorrect = false } } },
                new() { Text = "Which syntax is used to create an object literal?", Difficulty = "Beginner", Answers = new List<Answer> { new() { Text = "{ name: 'Ada' }", IsCorrect = true }, new() { Text = "[ name: 'Ada' ]", IsCorrect = false }, new() { Text = "<object>Ad</object>", IsCorrect = false }, new() { Text = "name = 'Ada'", IsCorrect = false } } },
                new() { Text = "What does inheritance allow in JavaScript classes?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "A child class to reuse and extend a parent class", IsCorrect = true }, new() { Text = "A class to inherit CSS styles", IsCorrect = false }, new() { Text = "A function to return a string", IsCorrect = false }, new() { Text = "A variable to become constant", IsCorrect = false } } },
                new() { Text = "What is a prototype in JavaScript?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "An object that provides shared properties and methods to other objects", IsCorrect = true }, new() { Text = "The HTML DOM tree", IsCorrect = false }, new() { Text = "A special array type", IsCorrect = false }, new() { Text = "A compiler feature", IsCorrect = false } } },
            }
        };

        var jsAsyncProgramming = new Quiz
        {
            Title = "Async Programming",
            Topic = "js-async-programming",
            Category = "JavaScript",
            Description = "Promises, async/await, and asynchronous flow control.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "What does a Promise represent?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "A value that may be available now, later, or never", IsCorrect = true }, new() { Text = "A loop that runs forever", IsCorrect = false }, new() { Text = "A CSS animation", IsCorrect = false }, new() { Text = "A type of string", IsCorrect = false } } },
                new() { Text = "What keyword is used to wait for a Promise to resolve?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "await", IsCorrect = true }, new() { Text = "yield", IsCorrect = false }, new() { Text = "break", IsCorrect = false }, new() { Text = "return", IsCorrect = false } } },
                new() { Text = "Which method is used to handle a rejected Promise?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = ".catch()", IsCorrect = true }, new() { Text = ".then()", IsCorrect = false }, new() { Text = ".finally()", IsCorrect = false }, new() { Text = ".resolve()", IsCorrect = false } } },
                new() { Text = "What does 'async' before a function do?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "It makes the function return a Promise", IsCorrect = true }, new() { Text = "It makes the function faster", IsCorrect = false }, new() { Text = "It prevents the function from returning values", IsCorrect = false }, new() { Text = "It prevents errors", IsCorrect = false } } },
                new() { Text = "Which API is commonly used to request data from a server?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "fetch()", IsCorrect = true }, new() { Text = "parse()", IsCorrect = false }, new() { Text = "request()", IsCorrect = false }, new() { Text = "load()", IsCorrect = false } } },
            }
        };

        var jsModulesApis = new Quiz
        {
            Title = "Modules & Browser APIs",
            Topic = "js-modules-browser-apis",
            Category = "JavaScript",
            Description = "ES modules, imports/exports, and browser APIs.",
            Difficulty = "Intermediate",
            Questions = new List<Question>
            {
                new() { Text = "Which keyword imports a named export from another module?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "import", IsCorrect = true }, new() { Text = "require", IsCorrect = false }, new() { Text = "include", IsCorrect = false }, new() { Text = "load", IsCorrect = false } } },
                new() { Text = "Which keyword exports a value from a module?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "export", IsCorrect = true }, new() { Text = "send", IsCorrect = false }, new() { Text = "module", IsCorrect = false }, new() { Text = "return", IsCorrect = false } } },
                new() { Text = "Which browser API is used to store data locally in the browser?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "localStorage", IsCorrect = true }, new() { Text = "window.open", IsCorrect = false }, new() { Text = "document.write", IsCorrect = false }, new() { Text = "console.log", IsCorrect = false } } },
                new() { Text = "What does the DOM API let you do?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "Manipulate page elements and content", IsCorrect = true }, new() { Text = "Compile JavaScript files", IsCorrect = false }, new() { Text = "Create CSS files", IsCorrect = false }, new() { Text = "Handle server sockets", IsCorrect = false } } },
                new() { Text = "What is the purpose of the History API?", Difficulty = "Intermediate", Answers = new List<Answer> { new() { Text = "To manipulate browser history entries and navigation state", IsCorrect = true }, new() { Text = "To create loops", IsCorrect = false }, new() { Text = "To update the CSS cascade", IsCorrect = false }, new() { Text = "To generate random numbers", IsCorrect = false } } },
            }
        };

        db.Quizzes.AddRange(
            // HTML - Progressive difficulty order
            htmlBasics, htmlLinksMedia, htmlListsTables, htmlForms, htmlSemantic, htmlAttributes, htmlMediaEmbeds, htmlAccessibility, htmlAdvanced,
            // CSS - Progressive difficulty order
            cssBasics, cssBoxModel, cssSelectors, cssFlexboxGrid, cssVisual, cssAdvanced, cssPositioning, cssTransforms, cssVariables,
            // JavaScript - Progressive difficulty order
            jsBasics, jsArraysData, jsFunctionsScope, jsDomEvents, jsEs6, jsAdvanced, jsObjectsClasses, jsAsyncProgramming, jsModulesApis
        );
        await db.SaveChangesAsync();
        }  // End of reseed check

        // ═══════════════════════════════════════════════════
        //  Achievement Badges
        // ═══════════════════════════════════════════════════

        if (!await db.Badges.AnyAsync())
        {
            var badges = new List<Badge>
            {
                // Tutorial Completion Badges
                new() { Name = "HTML Master", Description = "Complete all HTML lessons", Icon = "🏗️", Category = "tutorial", Requirement = "complete_html", RequiredCount = 17, Color = "from-orange-400 to-red-600" },
                new() { Name = "CSS Wizard", Description = "Complete all CSS lessons", Icon = "🎨", Category = "tutorial", Requirement = "complete_css", RequiredCount = 18, Color = "from-blue-400 to-indigo-600" },
                new() { Name = "JavaScript Pro", Description = "Complete all JavaScript lessons", Icon = "⚡", Category = "tutorial", Requirement = "complete_javascript", RequiredCount = 24, Color = "from-yellow-400 to-amber-600" },
                new() { Name = "Frontend Foundations", Description = "Complete HTML, CSS, and JavaScript", Icon = "🚀", Category = "tutorial", Requirement = "complete_foundations", RequiredCount = 3, Color = "from-purple-400 to-pink-600" },

                // Quiz Badges
                new() { Name = "First Steps", Description = "Complete your first quiz", Icon = "🎯", Category = "quiz", Requirement = "first_quiz", RequiredCount = 1, Color = "from-blue-400 to-blue-600" },
                new() { Name = "Quiz Novice", Description = "Complete 5 quizzes", Icon = "📝", Category = "quiz", Requirement = "5_quizzes", RequiredCount = 5, Color = "from-green-400 to-green-600" },
                new() { Name = "Quiz Expert", Description = "Complete 10 quizzes", Icon = "🏆", Category = "quiz", Requirement = "10_quizzes", RequiredCount = 10, Color = "from-purple-400 to-purple-600" },
                new() { Name = "Quiz Master", Description = "Complete 25 quizzes", Icon = "⭐", Category = "quiz", Requirement = "25_quizzes", RequiredCount = 25, Color = "from-yellow-400 to-yellow-600" },
                new() { Name = "Quiz Legend", Description = "Complete 50 quizzes", Icon = "👑", Category = "quiz", Requirement = "50_quizzes", RequiredCount = 50, Color = "from-red-400 to-red-600" },
                new() { Name = "Perfect Score", Description = "Get 100% on any quiz", Icon = "💯", Category = "quiz", Requirement = "perfect_quiz", RequiredCount = 1, Color = "from-emerald-400 to-emerald-600" },

                // Lesson Badges
                new() { Name = "Learning Begins", Description = "Complete your first lesson", Icon = "📚", Category = "lesson", Requirement = "first_lesson", RequiredCount = 1, Color = "from-indigo-400 to-indigo-600" },
                new() { Name = "Knowledge Seeker", Description = "Complete 10 lessons", Icon = "🔍", Category = "lesson", Requirement = "10_lessons", RequiredCount = 10, Color = "from-cyan-400 to-cyan-600" },
                new() { Name = "Dedicated Learner", Description = "Complete 25 lessons", Icon = "📖", Category = "lesson", Requirement = "25_lessons", RequiredCount = 25, Color = "from-teal-400 to-teal-600" },
                new() { Name = "Study Champion", Description = "Complete 50 lessons", Icon = "🎓", Category = "lesson", Requirement = "50_lessons", RequiredCount = 50, Color = "from-violet-400 to-violet-600" },
                new() { Name = "Master Scholar", Description = "Complete 100 lessons", Icon = "🌟", Category = "lesson", Requirement = "100_lessons", RequiredCount = 100, Color = "from-amber-400 to-amber-600" },

                // Streak Badges
                new() { Name = "Consistent", Description = "Maintain a 3-day streak", Icon = "🔥", Category = "streak", Requirement = "3_day_streak", RequiredCount = 3, Color = "from-orange-400 to-orange-600" },
                new() { Name = "Committed", Description = "Maintain a 7-day streak", Icon = "⚡", Category = "streak", Requirement = "7_day_streak", RequiredCount = 7, Color = "from-red-400 to-orange-500" },
                new() { Name = "Unstoppable", Description = "Maintain a 30-day streak", Icon = "🚀", Category = "streak", Requirement = "30_day_streak", RequiredCount = 30, Color = "from-pink-400 to-rose-600" },
            };

            db.Badges.AddRange(badges);
            await db.SaveChangesAsync();
        }
    }
}
