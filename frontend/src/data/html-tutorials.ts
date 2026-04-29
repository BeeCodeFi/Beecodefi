import { TutorialLesson } from "@/types";

export const htmlLessons: TutorialLesson[] = [
  {
    slug: "introduction",
    title: "Introduction to HTML",
    difficulty: "beginner",
    estimatedMinutes: 15,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax",
    content: `HTML (HyperText Markup Language) is the standard markup language for creating web pages. According to MDN Web Docs, "HTML is a markup language that tells web browsers how to structure the web pages you visit."

HTML consists of a series of **elements** which you use to enclose, wrap, or mark up different parts of content to make it appear or act in a certain way. The enclosing **tags** can make content into a hyperlink, italicize words, change font size, and more.

## What is HTML?

HTML is NOT a programming language — it is a **markup language** that defines the structure of your content. HTML consists of a series of elements which tell the browser how to display content.

Every web page you visit is built with HTML at its core. Even complex web applications built with React, Vue, or Angular ultimately render HTML in the browser.

## Anatomy of an HTML Element

An HTML element consists of three parts:
- **Opening tag** — The name of the element wrapped in angle brackets, e.g. \`<p>\`
- **Content** — The text or nested elements inside
- **Closing tag** — Same as opening tag but with a forward slash, e.g. \`</p>\`

## Void Elements

Some elements consist of a single tag and cannot contain content. These are called **void elements** (or self-closing elements). Examples include \`<br>\`, \`<img>\`, \`<input>\`, and \`<hr>\`.

## Tags Are Case-Insensitive

Tags can be written in uppercase or lowercase, but the best practice is to write all tags in **lowercase** for consistency and readability.`,
    keyTakeaways: [
      "HTML stands for HyperText Markup Language",
      "HTML is a markup language, not a programming language",
      "Elements consist of opening tags, content, and closing tags",
      "Void elements like <br> and <img> have no closing tag",
      "Always write tags in lowercase for best practice",
    ],
    codeExamples: [
      {
        title: "Anatomy of an HTML Element",
        language: "html",
        description: "Understanding the parts of an HTML element — opening tag, content, and closing tag.",
        code: `<!-- A complete HTML element has 3 parts -->

<!-- 1. Opening Tag  2. Content  3. Closing Tag -->
<p>My cat is very grumpy</p>

<!-- Elements can be nested inside each other -->
<p>My cat is <strong>very</strong> grumpy.</p>

<!-- Void elements have no closing tag -->
<br>
<img src="cat.jpg" alt="A grumpy cat">
<hr>
<input type="text" placeholder="Enter name">`,
        livePreview: true,
      },
      {
        title: "Your First HTML Page",
        language: "html",
        description: "A minimal but complete HTML document with all essential parts.",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my very first web page.</p>
    <p>HTML is <strong>awesome</strong>!</p>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "intro-1",
        title: "Create Your First Element",
        instruction: "Wrap the text below in a paragraph tag (<p>) to make it a proper HTML paragraph.",
        startingCode: "Hello, I am learning HTML!",
        expectedOutput: "<p>Hello, I am learning HTML!</p>",
        hints: [
          "A paragraph element starts with <p> and ends with </p>",
          "Place <p> before the text and </p> after",
        ],
      },
      {
        id: "intro-2",
        title: "Make Text Bold",
        instruction: "Make the word 'important' bold using the <strong> tag inside this paragraph.",
        startingCode: '<p>This is an important message.</p>',
        expectedOutput: '<p>This is an <strong>important</strong> message.</p>',
        hints: [
          "Wrap just the word 'important' with <strong> tags",
          "Nesting means putting one element inside another",
        ],
      },
    ],
  },
  {
    slug: "document-structure",
    title: "HTML Document Structure",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax#anatomy_of_an_html_document",
    content: `Every HTML document follows a specific structure. Understanding this structure is essential — it's the skeleton that holds every web page together.

## The DOCTYPE Declaration

Every HTML page must start with \`<!DOCTYPE html>\`. This tells the browser that this document is an HTML5 document. In the early days of the web, doctypes were long and complex. Today, \`<!DOCTYPE html>\` is the shortest valid doctype and the only one you need.

## The \`<html>\` Element

The \`<html>\` element wraps ALL content on the page. It's known as the **root element**. Always include the \`lang\` attribute to specify the document's language (e.g., \`lang="en"\` for English). This helps screen readers and search engines.

## The \`<head>\` Element

The \`<head>\` contains **metadata** — information about the page that isn't displayed as content. Key elements inside the head include:
- \`<meta charset="utf-8">\` — Character encoding (supports all languages)
- \`<meta name="viewport">\` — Mobile responsiveness
- \`<title>\` — The page title shown in the browser tab
- \`<link>\` — External stylesheets
- \`<meta name="description">\` — Page description for SEO

## The \`<body>\` Element

The \`<body>\` element contains ALL visible content — text, images, videos, links, and everything the user sees and interacts with.

## Character Encoding

Always set \`<meta charset="utf-8">\` in your \`<head>\`. UTF-8 supports characters from virtually all human languages, ensuring your page displays correctly worldwide.`,
    keyTakeaways: [
      "<!DOCTYPE html> declares an HTML5 document",
      "<html> is the root element that wraps everything",
      "<head> contains metadata (title, charset, viewport)",
      "<body> contains all visible page content",
      "Always set charset to utf-8 and include a viewport meta tag",
    ],
    codeExamples: [
      {
        title: "Complete HTML5 Document Structure",
        language: "html",
        description: "The standard boilerplate for every HTML5 page with all essential meta tags.",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Character encoding — always set to UTF-8 -->
    <meta charset="UTF-8">

    <!-- Viewport for responsive design on mobile -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Page title — appears in browser tab & search results -->
    <title>My Website — Home</title>

    <!-- SEO description -->
    <meta name="description" content="A brief description of the page content">

    <!-- External CSS -->
    <link rel="stylesheet" href="styles.css">

    <!-- Favicon -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is a properly structured HTML document.</p>

    <!-- JavaScript at the end of body for performance -->
    <script src="app.js"></script>
</body>
</html>`,
        livePreview: false,
      },
      {
        title: "Essential Meta Tags",
        language: "html",
        description: "Common meta tags you should include in every web page for SEO and social sharing.",
        code: `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO Meta Tags -->
    <title>Page Title — Brand Name</title>
    <meta name="description" content="A concise description under 160 characters">
    <meta name="keywords" content="HTML, CSS, tutorial, web development">
    <meta name="author" content="Ayush Kumar">

    <!-- Open Graph (Facebook, LinkedIn) -->
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Page description for social sharing">
    <meta property="og:image" content="https://example.com/image.jpg">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Page Title">
</head>`,
        livePreview: false,
      },
    ],
    interactiveExercises: [
      {
        id: "structure-1",
        title: "Build a Document Skeleton",
        instruction: "Complete the HTML document structure by adding the missing tags. You need: DOCTYPE, html (with lang), head, title, and body.",
        startingCode: `<!-- Add DOCTYPE here -->
<!-- Add html tag with lang="en" -->
<!-- Add head section with a title "My Page" -->
<!-- Add body with a heading "Hello World" -->`,
        expectedOutput: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>`,
        hints: [
          "Start with <!DOCTYPE html> on the first line",
          "The <html> tag needs a lang attribute",
          "Put <title> inside <head>",
        ],
      },
    ],
  },
  {
    slug: "text-fundamentals",
    title: "Text Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Headings_and_paragraphs",
    content: `Text is the foundation of web content. HTML provides a rich set of elements to structure and format text semantically, giving meaning to every piece of content on your page.

## Headings (\`<h1>\` to \`<h6>\`)

HTML offers six levels of headings. As MDN explains, "\`<h1>\` is the highest section level and \`<h6>\` is the lowest." Headings create a document outline that's crucial for:
- **Accessibility** — Screen readers use headings to navigate content
- **SEO** — Search engines use headings to understand page structure
- **Readability** — Users scan headings to find relevant content

**Best Practices:**
- Use only ONE \`<h1>\` per page (the main title)
- Don't skip heading levels (don't go from \`<h2>\` to \`<h4>\`)
- Don't use headings just to make text bigger — use CSS instead

## Paragraphs (\`<p>\`)

The \`<p>\` element defines a paragraph of text. Browsers automatically add margin before and after each paragraph. Multiple spaces and line breaks within a \`<p>\` are collapsed to a single space by the browser.

## Text Formatting Elements

- \`<strong>\` — **Strong importance** (displayed bold). Use for content that is important, serious, or urgent
- \`<em>\` — *Emphasis* (displayed italic). Use to stress emphasis on certain words
- \`<mark>\` — Highlighted text
- \`<small>\` — Smaller text (side comments, fine print)
- \`<del>\` — ~~Deleted text~~ (strikethrough)
- \`<ins>\` — Inserted text (underlined)
- \`<sub>\` — Subscript (H₂O)
- \`<sup>\` — Superscript (x²)

## Line Breaks and Horizontal Rules

- \`<br>\` — Forces a line break within text (use sparingly)
- \`<hr>\` — Creates a thematic break (horizontal line)

## Preformatted Text

The \`<pre>\` element preserves whitespace and line breaks exactly as written in the HTML source. Often used with \`<code>\` for displaying code snippets.`,
    keyTakeaways: [
      "Use h1-h6 for headings in proper hierarchy (don't skip levels)",
      "Only one <h1> per page for the main title",
      "Use <strong> for importance, <em> for emphasis — not just for bold/italic",
      "Browsers collapse multiple spaces into one inside <p> tags",
      "Use <pre> to preserve whitespace formatting",
    ],
    codeExamples: [
      {
        title: "Heading Hierarchy",
        language: "html",
        description: "Proper heading structure creates a clear document outline for accessibility and SEO.",
        code: `<h1>Web Development Guide</h1>

<h2>Chapter 1: HTML Basics</h2>
<p>HTML is the foundation of every website...</p>

<h3>1.1 Elements and Tags</h3>
<p>An element consists of an opening tag, content, and closing tag.</p>

<h3>1.2 Attributes</h3>
<p>Attributes provide additional information about elements.</p>

<h2>Chapter 2: CSS Styling</h2>
<p>CSS controls how HTML elements look on screen...</p>

<h3>2.1 Selectors</h3>
<p>Selectors target HTML elements to apply styles.</p>`,
        livePreview: true,
      },
      {
        title: "Text Formatting Elements",
        language: "html",
        description: "Different HTML elements for formatting and adding semantic meaning to text.",
        code: `<p>This is <strong>very important</strong> text.</p>
<p>This word has <em>emphasis</em> on it.</p>
<p>This is <mark>highlighted</mark> text.</p>
<p><small>This is fine print text.</small></p>
<p>Price: <del>$99</del> <ins>$79</ins> — Save 20%!</p>
<p>Water formula: H<sub>2</sub>O</p>
<p>Area = πr<sup>2</sup></p>

<hr>

<pre><code>function hello() {
    console.log("Hello, World!");
}</code></pre>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "text-1",
        title: "Create a Heading Hierarchy",
        instruction: "Create a proper heading structure: a main title 'My Blog', a section heading 'Latest Posts', and a subsection heading 'Post Title'. Add a paragraph under the subsection.",
        startingCode: "<!-- Create heading hierarchy here -->",
        expectedOutput: `<h1>My Blog</h1>\n<h2>Latest Posts</h2>\n<h3>Post Title</h3>\n<p>This is my blog post content.</p>`,
        hints: [
          "Use <h1> for the main title, <h2> for section, <h3> for subsection",
          "Don't skip from <h1> directly to <h3>",
        ],
      },
    ],
  },
  {
    slug: "links-and-navigation",
    title: "Links & Navigation",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a",
    content: `Links are what make the web a "web" — they connect pages together, enabling navigation between documents. The \`<a>\` (anchor) element is one of the most fundamental HTML elements.

## The Anchor Element (\`<a>\`)

According to MDN, the \`<a>\` element "with its \`href\` attribute, creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address."

The \`href\` attribute (Hypertext REFerence) specifies the URL the link points to.

## Types of Links

- **Absolute URLs** — Full web addresses: \`href="https://example.com"\`
- **Relative URLs** — Paths relative to current page: \`href="about.html"\` or \`href="/contact"\`
- **Anchor links** — Jump to a section on the same page: \`href="#section-id"\`
- **Email links** — Open email client: \`href="mailto:user@example.com"\`
- **Phone links** — Initiate call: \`href="tel:+1234567890"\`

## The \`target\` Attribute

- \`_self\` — Opens in the same tab (default)
- \`_blank\` — Opens in a new tab/window

**Security Note:** When using \`target="_blank"\`, modern browsers automatically set \`rel="noopener"\` to prevent the new page from accessing your page via \`window.opener\`.

## Accessibility Best Practices

As MDN emphasizes, link text should clearly indicate where the link goes. **Don't** use "click here" or "here" as link text — screen readers list all links on a page, and "click here" provides no context.

**Bad:** "To learn more, click <a>here</a>."
**Good:** "Learn more <a>about our products</a>."`,
    keyTakeaways: [
      "The <a> element creates hyperlinks with the href attribute",
      "Use relative URLs for internal links, absolute for external",
      "target=\"_blank\" opens links in a new tab",
      "Link text should be descriptive, never 'click here'",
      "Use mailto: for email links and tel: for phone links",
    ],
    codeExamples: [
      {
        title: "Types of HTML Links",
        language: "html",
        description: "Different link types: absolute, relative, anchor, email, and phone links.",
        code: `<!-- Absolute URL (external site) -->
<a href="https://developer.mozilla.org">MDN Web Docs</a>

<!-- Relative URL (same website) -->
<a href="/about">About Us</a>
<a href="contact.html">Contact Page</a>

<!-- Opens in new tab -->
<a href="https://github.com" target="_blank">
    GitHub (opens in new tab)
</a>

<!-- Anchor link (jump to section on same page) -->
<a href="#features">Jump to Features</a>
<!-- ... further down the page ... -->
<section id="features">
    <h2>Features</h2>
</section>

<!-- Email link -->
<a href="mailto:hello@example.com">Send us an email</a>

<!-- Phone link -->
<a href="tel:+1234567890">Call us: (123) 456-7890</a>

<!-- Download link -->
<a href="resume.pdf" download>Download Resume (PDF)</a>`,
        livePreview: true,
      },
      {
        title: "Navigation Menu",
        language: "html",
        description: "A proper semantic navigation structure using <nav> and anchor elements.",
        code: `<nav aria-label="Main navigation">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/tutorials">Tutorials</a></li>
        <li><a href="/quiz">Quiz</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>

<!-- Breadcrumb navigation -->
<nav aria-label="Breadcrumb">
    <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/tutorials">Tutorials</a></li>
        <li aria-current="page">HTML Basics</li>
    </ol>
</nav>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "links-1",
        title: "Create Different Link Types",
        instruction: "Create three links: one to 'https://example.com' that opens in a new tab, one email link to 'info@example.com', and one anchor link to '#footer'.",
        startingCode: "<!-- Create your links here -->",
        expectedOutput: `<a href="https://example.com" target="_blank">Visit Example</a>\n<a href="mailto:info@example.com">Email Us</a>\n<a href="#footer">Go to Footer</a>`,
        hints: [
          "Use target=\"_blank\" to open in a new tab",
          "Email links use mailto: in the href",
          "Anchor links start with # followed by the target element's id",
        ],
      },
    ],
  },
  {
    slug: "images-and-media",
    title: "Images & Media",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_images",
    content: `Images bring web pages to life. The \`<img>\` element is a void element (no closing tag) that embeds images into your HTML documents.

## The \`<img>\` Element

Two attributes are essential:
- \`src\` — The URL/path to the image file (required)
- \`alt\` — Alternative text describing the image (strongly recommended)

## Why \`alt\` Text Matters

MDN lists several reasons for always including alt text:
- **Accessibility** — Screen readers read alt text to visually impaired users
- **Broken images** — Alt text displays when images fail to load
- **SEO** — Search engines use alt text to understand image content
- **Data saving** — Users who disable images can still understand content

**Rules for good alt text:**
- Describe the image's content and function
- For decorative images, use \`alt=""\` (empty string)
- For images used as links, describe the link destination
- Don't start with "Image of..." — screen readers already announce it's an image

## Width and Height

Always specify \`width\` and \`height\` to prevent **layout shift** — the annoying jump that happens when images load and push content down. The browser reserves space before the image loads.

## The \`<figure>\` and \`<figcaption>\` Elements

Use \`<figure>\` with \`<figcaption>\` to semantically associate an image with its caption. This helps screen readers connect the caption to the image.

## Responsive Images

Use the \`<picture>\` element and \`srcset\` attribute to serve different images for different screen sizes, saving bandwidth on mobile devices.`,
    keyTakeaways: [
      "Always include alt text for accessibility and SEO",
      "Set width and height to prevent layout shift",
      "Use <figure> and <figcaption> for images with captions",
      "Use empty alt=\"\" for purely decorative images",
      "Use srcset for responsive images on different screen sizes",
    ],
    codeExamples: [
      {
        title: "Image Basics",
        language: "html",
        description: "Different ways to embed images with proper attributes.",
        code: `<!-- Basic image with alt text -->
<img
    src="https://placehold.co/400x300"
    alt="A placeholder image showing dimensions"
    width="400"
    height="300"
>

<!-- Image with figure and caption -->
<figure>
    <img
        src="https://placehold.co/600x400"
        alt="A scenic mountain landscape at sunset"
        width="600"
        height="400"
    >
    <figcaption>
        Mount Fuji at sunset — Photo by Ayush Kumar
    </figcaption>
</figure>

<!-- Decorative image (empty alt) -->
<img src="divider.svg" alt="" width="200" height="2">`,
        livePreview: true,
      },
      {
        title: "Responsive Images",
        language: "html",
        description: "Serving different image sizes for different screen widths to improve performance.",
        code: `<!-- srcset: browser chooses best size -->
<img
    src="photo-800.jpg"
    srcset="
        photo-400.jpg 400w,
        photo-800.jpg 800w,
        photo-1200.jpg 1200w
    "
    sizes="(max-width: 600px) 400px,
           (max-width: 1000px) 800px,
           1200px"
    alt="A responsive photo that adapts to screen size"
>

<!-- <picture>: art direction for different formats -->
<picture>
    <source media="(min-width: 800px)" srcset="hero-wide.webp" type="image/webp">
    <source media="(min-width: 800px)" srcset="hero-wide.jpg">
    <source srcset="hero-mobile.webp" type="image/webp">
    <img src="hero-mobile.jpg" alt="Hero banner image">
</picture>`,
        livePreview: false,
      },
    ],
    interactiveExercises: [
      {
        id: "images-1",
        title: "Add an Image with Caption",
        instruction: "Create a figure containing an image (any src) with proper alt text, width, height, and a figcaption describing the image.",
        startingCode: "<!-- Create a figure with image and caption -->",
        expectedOutput: `<figure>\n    <img src="photo.jpg" alt="Description of the photo" width="400" height="300">\n    <figcaption>A beautiful photo</figcaption>\n</figure>`,
        hints: [
          "Use <figure> as the wrapper element",
          "Place <img> inside <figure> with src, alt, width, and height",
          "Add <figcaption> after the <img> for the caption",
        ],
      },
    ],
  },
  {
    slug: "lists",
    title: "HTML Lists",
    difficulty: "beginner",
    estimatedMinutes: 15,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul",
    content: `Lists are one of the most commonly used HTML structures. They organize content into ordered sequences, unordered collections, or term-definition pairs.

## Unordered Lists (\`<ul>\`)

Use unordered lists when the order of items doesn't matter. Each item is wrapped in an \`<li>\` element. By default, browsers display bullet points.

**Common uses:** Navigation menus, feature lists, ingredients

## Ordered Lists (\`<ol>\`)

Use ordered lists when sequence matters. Browsers automatically number the items. You can control the numbering with attributes:
- \`start="5"\` — Start counting from 5
- \`reversed\` — Count backwards
- \`type="A"\` — Use letters (A, B, C) instead of numbers

## Description Lists (\`<dl>\`)

Description lists pair **terms** with their **descriptions**. They use:
- \`<dl>\` — Description list container
- \`<dt>\` — Description term (the word being defined)
- \`<dd>\` — Description details (the definition)

**Common uses:** Glossaries, FAQ pages, metadata displays

## Nesting Lists

Lists can be nested inside each other to create sub-lists. This is useful for creating multi-level navigation menus or structured outlines.

## Accessibility

Lists have built-in semantic meaning. Screen readers announce the type and number of items, helping users understand the content structure.`,
    keyTakeaways: [
      "Use <ul> when order doesn't matter, <ol> when it does",
      "Every list item must be wrapped in <li>",
      "<dl> creates definition/description lists with <dt> and <dd>",
      "Lists can be nested for sub-items",
      "Lists have built-in accessibility features for screen readers",
    ],
    codeExamples: [
      {
        title: "Unordered & Ordered Lists",
        language: "html",
        description: "Basic list types — unordered for bullet points and ordered for numbered items.",
        code: `<!-- Unordered list (bullets) -->
<h3>Skills</h3>
<ul>
    <li>HTML5 & Semantic Markup</li>
    <li>CSS3 & Responsive Design</li>
    <li>JavaScript & TypeScript</li>
    <li>React & Next.js</li>
</ul>

<!-- Ordered list (numbered) -->
<h3>Steps to Deploy</h3>
<ol>
    <li>Write your code</li>
    <li>Test locally</li>
    <li>Push to GitHub</li>
    <li>Deploy to Vercel</li>
</ol>

<!-- Ordered with start number and reverse -->
<h3>Top 3 Countdown</h3>
<ol reversed start="3">
    <li>Bronze: CSS</li>
    <li>Silver: JavaScript</li>
    <li>Gold: HTML</li>
</ol>`,
        livePreview: true,
      },
      {
        title: "Description Lists & Nested Lists",
        language: "html",
        description: "Description lists for glossaries and nested lists for hierarchical content.",
        code: `<!-- Description list (glossary) -->
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language — the structure of web pages.</dd>

    <dt>CSS</dt>
    <dd>Cascading Style Sheets — controls presentation and layout.</dd>

    <dt>JavaScript</dt>
    <dd>A programming language for web interactivity.</dd>
</dl>

<!-- Nested list (sub-items) -->
<h3>Web Development Roadmap</h3>
<ol>
    <li>Frontend
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ul>
    </li>
    <li>Backend
        <ul>
            <li>Node.js</li>
            <li>Databases</li>
            <li>APIs</li>
        </ul>
    </li>
</ol>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "lists-1",
        title: "Create a Shopping List",
        instruction: "Create an unordered list with 3 items: Bread, Milk, and Eggs.",
        startingCode: "<!-- Create your shopping list here -->",
        expectedOutput: `<ul>\n    <li>Bread</li>\n    <li>Milk</li>\n    <li>Eggs</li>\n</ul>`,
        hints: [
          "Start with <ul> for an unordered list",
          "Each item goes inside <li> tags",
        ],
      },
    ],
  },
  {
    slug: "tables",
    title: "HTML Tables",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table",
    content: `Tables are used to display **tabular data** — information best presented in rows and columns, like spreadsheets, schedules, or comparison charts.

**Important:** Tables should NOT be used for page layout. Use CSS Flexbox or Grid for layout purposes.

## Table Structure

A proper HTML table uses these elements:
- \`<table>\` — The table container
- \`<thead>\` — Table header group
- \`<tbody>\` — Table body group
- \`<tfoot>\` — Table footer group
- \`<tr>\` — Table row
- \`<th>\` — Table header cell (bold and centered by default)
- \`<td>\` — Table data cell
- \`<caption>\` — Table title/description

## Spanning Cells

- \`colspan="2"\` — Makes a cell span across 2 columns
- \`rowspan="3"\` — Makes a cell span across 3 rows

## Table Accessibility

- Always use \`<th>\` for header cells with \`scope="col"\` or \`scope="row"\`
- Include a \`<caption>\` to describe the table's purpose
- Use \`<thead>\`, \`<tbody>\`, \`<tfoot>\` for semantic grouping
- These practices help screen readers navigate table data correctly

## Styling Tables

By default, HTML tables look plain. Use CSS to add borders, padding, alternating row colors (zebra stripes), and hover effects. The \`border-collapse: collapse;\` CSS property is commonly used to merge table borders.`,
    keyTakeaways: [
      "Use tables only for tabular data, not page layout",
      "Structure: <thead>, <tbody>, <tfoot> for semantic grouping",
      "Use <th> with scope attribute for accessible headers",
      "colspan and rowspan merge cells across columns/rows",
      "Always include <caption> for table description",
    ],
    codeExamples: [
      {
        title: "Complete Table Example",
        language: "html",
        description: "A properly structured, accessible HTML table with header, body, and footer.",
        code: `<table>
    <caption>Monthly Web Traffic Report</caption>

    <thead>
        <tr>
            <th scope="col">Month</th>
            <th scope="col">Visitors</th>
            <th scope="col">Page Views</th>
            <th scope="col">Bounce Rate</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>January</td>
            <td>12,450</td>
            <td>45,200</td>
            <td>42%</td>
        </tr>
        <tr>
            <td>February</td>
            <td>15,800</td>
            <td>52,100</td>
            <td>38%</td>
        </tr>
        <tr>
            <td>March</td>
            <td>18,200</td>
            <td>61,000</td>
            <td>35%</td>
        </tr>
    </tbody>

    <tfoot>
        <tr>
            <th scope="row">Total</th>
            <td>46,450</td>
            <td>158,300</td>
            <td>38% avg</td>
        </tr>
    </tfoot>
</table>`,
        livePreview: true,
      },
      {
        title: "Spanning Cells",
        language: "html",
        description: "Using colspan and rowspan to merge table cells for complex layouts.",
        code: `<table>
    <caption>Course Schedule</caption>
    <thead>
        <tr>
            <th scope="col">Time</th>
            <th scope="col">Monday</th>
            <th scope="col">Tuesday</th>
            <th scope="col">Wednesday</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>9:00 AM</td>
            <td colspan="2">HTML & CSS Workshop</td>
            <td>JavaScript Lab</td>
        </tr>
        <tr>
            <td>11:00 AM</td>
            <td>React Basics</td>
            <td rowspan="2">Full-Stack Project</td>
            <td>Code Review</td>
        </tr>
        <tr>
            <td>2:00 PM</td>
            <td>API Design</td>
            <td>Pair Programming</td>
        </tr>
    </tbody>
</table>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "tables-1",
        title: "Create a Simple Table",
        instruction: "Create a table with 2 columns (Name, Score) and 2 rows of data. Include proper <thead> and <tbody>.",
        startingCode: "<!-- Create your table here -->",
        expectedOutput: `<table>\n    <thead>\n        <tr><th>Name</th><th>Score</th></tr>\n    </thead>\n    <tbody>\n        <tr><td>Alice</td><td>95</td></tr>\n        <tr><td>Bob</td><td>87</td></tr>\n    </tbody>\n</table>`,
        hints: [
          "Use <th> for header cells inside <thead>",
          "Use <td> for data cells inside <tbody>",
        ],
      },
    ],
  },
  {
    slug: "forms-and-inputs",
    title: "Forms & Inputs",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms",
    content: `Forms are the primary way users interact with web applications — logging in, searching, submitting data, uploading files. HTML5 provides powerful form elements with built-in validation.

## The \`<form>\` Element

The \`<form>\` element wraps all form controls. Key attributes:
- \`action\` — URL where form data is sent
- \`method\` — HTTP method: \`GET\` (data in URL) or \`POST\` (data in request body)
- \`novalidate\` — Disables browser validation (for custom validation)

## Input Types

HTML5 introduced many input types that provide built-in validation and appropriate mobile keyboards:
- **Text:** \`text\`, \`email\`, \`password\`, \`url\`, \`tel\`, \`search\`
- **Numbers:** \`number\`, \`range\`
- **Date/Time:** \`date\`, \`time\`, \`datetime-local\`, \`month\`, \`week\`
- **Selection:** \`checkbox\`, \`radio\`, \`color\`
- **File:** \`file\`
- **Hidden:** \`hidden\`
- **Buttons:** \`submit\`, \`reset\`, \`button\`

## Labels Are Essential

The \`<label>\` element associates text with a form control. This is crucial for:
- **Accessibility** — Screen readers read the label when the input is focused
- **Usability** — Clicking the label focuses/checks the associated input
- Use the \`for\` attribute to match the input's \`id\`

## Validation Attributes

HTML5 built-in validation:
- \`required\` — Field must be filled
- \`minlength\` / \`maxlength\` — Text length limits
- \`min\` / \`max\` — Numeric range
- \`pattern\` — Regex pattern match
- \`placeholder\` — Hint text (NOT a replacement for labels)

## Grouping with \`<fieldset>\` and \`<legend>\`

Use \`<fieldset>\` to group related controls and \`<legend>\` to label the group. Essential for radio buttons and checkbox groups.`,
    keyTakeaways: [
      "Always use <label> elements connected to inputs via for/id",
      "HTML5 input types provide built-in validation and mobile keyboards",
      "Use GET for search forms, POST for data submission",
      "Placeholder text is NOT a replacement for labels",
      "Group related inputs with <fieldset> and <legend>",
    ],
    codeExamples: [
      {
        title: "Complete Registration Form",
        language: "html",
        description: "A well-structured form with various input types, labels, validation, and grouping.",
        code: `<form action="/register" method="POST">
    <fieldset>
        <legend>Personal Information</legend>

        <div>
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name"
                   required minlength="2" maxlength="50"
                   placeholder="John Doe">
        </div>

        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email"
                   required placeholder="john@example.com">
        </div>

        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password"
                   required minlength="8"
                   placeholder="Minimum 8 characters">
        </div>

        <div>
            <label for="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob">
        </div>
    </fieldset>

    <fieldset>
        <legend>Preferences</legend>

        <div>
            <label for="role">Role:</label>
            <select id="role" name="role" required>
                <option value="">Select a role</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
            </select>
        </div>

        <div>
            <label>Experience Level:</label>
            <label><input type="radio" name="level" value="beginner"> Beginner</label>
            <label><input type="radio" name="level" value="intermediate"> Intermediate</label>
            <label><input type="radio" name="level" value="advanced"> Advanced</label>
        </div>

        <div>
            <label>
                <input type="checkbox" name="newsletter">
                Subscribe to newsletter
            </label>
        </div>
    </fieldset>

    <div>
        <label for="bio">Bio:</label>
        <textarea id="bio" name="bio" rows="4"
                  placeholder="Tell us about yourself"
                  maxlength="500"></textarea>
    </div>

    <button type="submit">Create Account</button>
    <button type="reset">Clear Form</button>
</form>`,
        livePreview: true,
      },
      {
        title: "HTML5 Input Types",
        language: "html",
        description: "Exploring various HTML5 input types with built-in validation and appropriate keyboards.",
        code: `<form>
    <div>
        <label for="search">Search:</label>
        <input type="search" id="search" placeholder="Search...">
    </div>

    <div>
        <label for="url">Website:</label>
        <input type="url" id="url" placeholder="https://example.com">
    </div>

    <div>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" placeholder="+1 (555) 000-0000"
               pattern="[+]?[0-9\\s()-]+">
    </div>

    <div>
        <label for="quantity">Quantity (1-10):</label>
        <input type="number" id="quantity" min="1" max="10" value="1">
    </div>

    <div>
        <label for="volume">Volume:</label>
        <input type="range" id="volume" min="0" max="100" value="50">
    </div>

    <div>
        <label for="color">Favorite Color:</label>
        <input type="color" id="color" value="#6366f1">
    </div>

    <div>
        <label for="file">Upload File:</label>
        <input type="file" id="file" accept="image/*,.pdf">
    </div>
</form>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "forms-1",
        title: "Build a Login Form",
        instruction: "Create a simple login form with email and password inputs, each with proper labels. Add a submit button.",
        startingCode: "<form>\n    <!-- Add email input with label -->\n    <!-- Add password input with label -->\n    <!-- Add submit button -->\n</form>",
        expectedOutput: `<form>\n    <label for="email">Email:</label>\n    <input type="email" id="email" required>\n    <label for="password">Password:</label>\n    <input type="password" id="password" required>\n    <button type="submit">Log In</button>\n</form>`,
        hints: [
          "Use type=\"email\" and type=\"password\" for proper input types",
          "Connect labels to inputs using for/id attributes",
          "Add required attribute for validation",
        ],
      },
    ],
  },
  {
    slug: "semantic-html",
    title: "Semantic HTML5",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html",
    content: `Semantic HTML uses elements that clearly describe their **meaning** to both the browser and the developer. Instead of using generic \`<div>\` and \`<span>\` for everything, semantic elements tell browsers, developers, and assistive technologies what role each piece of content plays.

## Why Semantic HTML Matters

- **Accessibility** — Screen readers can better navigate and announce semantic content
- **SEO** — Search engines understand page structure and rank content more accurately
- **Maintainability** — Code is easier to read, understand, and maintain
- **Consistency** — Standard structure across pages and projects

## Structural Semantic Elements

- \`<header>\` — Introductory content, typically contains navigation, logo, heading
- \`<nav>\` — Section containing navigation links
- \`<main>\` — The dominant content of the \`<body>\` (only ONE per page)
- \`<article>\` — Self-contained content that makes sense on its own (blog post, news article, comment)
- \`<section>\` — Thematic grouping of content, typically with a heading
- \`<aside>\` — Content tangentially related to the main content (sidebar, ads, related links)
- \`<footer>\` — Footer of a section or page (copyright, contact info, links)

## Other Important Semantic Elements

- \`<figure>\` / \`<figcaption>\` — Image or diagram with caption
- \`<time>\` — Machine-readable date/time
- \`<address>\` — Contact information
- \`<details>\` / \`<summary>\` — Expandable disclosure widget
- \`<dialog>\` — Modal or non-modal dialog box

## \`<div>\` vs Semantic Elements

\`<div>\` is a generic container with NO semantic meaning. Use it only when no semantic element fits. Always prefer semantic elements when they match the content's purpose.

## The \`<article>\` vs \`<section>\` Question

**\`<article>\`** — Would this content make sense on its own, like in an RSS feed? Use article.
**\`<section>\`** — Is this a thematic group of content with a heading? Use section.`,
    keyTakeaways: [
      "Semantic elements describe meaning, not just appearance",
      "Use <header>, <nav>, <main>, <footer> for page structure",
      "Only one <main> element per page",
      "<article> is for self-contained content, <section> for thematic groups",
      "Prefer semantic elements over <div> whenever possible",
    ],
    codeExamples: [
      {
        title: "Semantic Page Layout",
        language: "html",
        description: "A complete page structure using semantic HTML5 elements instead of generic <div> containers.",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>BEECODEFI — Learn Web Development</title>
</head>
<body>
    <header>
        <nav aria-label="Main navigation">
            <a href="/" class="logo">BEECODEFI</a>
            <ul>
                <li><a href="/tutorials">Tutorials</a></li>
                <li><a href="/quiz">Quiz</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h1>Understanding Semantic HTML</h1>
                <time datetime="2026-04-29">April 29, 2026</time>
                <address>By <a href="/about">Ayush Kumar</a></address>
            </header>

            <section>
                <h2>What are Semantic Elements?</h2>
                <p>Semantic elements describe their content's meaning...</p>
            </section>

            <section>
                <h2>Benefits</h2>
                <p>Better accessibility, SEO, and code readability...</p>
            </section>

            <footer>
                <p>Tags: <a href="/tag/html">HTML</a>, <a href="/tag/a11y">Accessibility</a></p>
            </footer>
        </article>

        <aside>
            <h2>Related Articles</h2>
            <ul>
                <li><a href="#">HTML Forms Guide</a></li>
                <li><a href="#">CSS Grid Layout</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 BEECODEFI. All rights reserved.</p>
        <nav aria-label="Footer navigation">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
        </nav>
    </footer>
</body>
</html>`,
        livePreview: false,
      },
      {
        title: "Details, Dialog & Time Elements",
        language: "html",
        description: "Interactive semantic elements for expandable content, dialogs, and machine-readable dates.",
        code: `<!-- Expandable disclosure widget -->
<details>
    <summary>What is HTML?</summary>
    <p>HTML (HyperText Markup Language) is the standard
    language for creating web pages. It describes the
    structure of a web page using a series of elements.</p>
</details>

<details open>
    <summary>Is HTML a programming language?</summary>
    <p>No! HTML is a <strong>markup language</strong>,
    not a programming language. It defines structure,
    not logic.</p>
</details>

<!-- Machine-readable date/time -->
<p>Published on
    <time datetime="2026-04-29T10:00:00Z">
        April 29, 2026
    </time>
</p>

<!-- Contact information -->
<address>
    Contact us at
    <a href="mailto:hello@beecodefi.com">hello@beecodefi.com</a>
    or visit us at 123 Web Dev Lane.
</address>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "semantic-1",
        title: "Semantify a Page",
        instruction: "Replace the generic <div> tags with appropriate semantic elements: header, main, nav, article, and footer.",
        startingCode: `<div class="header">\n    <div class="nav">Navigation</div>\n</div>\n<div class="content">\n    <div class="post">Blog post content</div>\n</div>\n<div class="footer">Footer</div>`,
        expectedOutput: `<header>\n    <nav>Navigation</nav>\n</header>\n<main>\n    <article>Blog post content</article>\n</main>\n<footer>Footer</footer>`,
        hints: [
          "Replace div.header with <header>",
          "Replace div.nav with <nav>",
          "Replace div.content with <main>",
          "Replace div.post with <article>",
        ],
      },
    ],
  },
  {
    slug: "html-attributes",
    title: "Attributes & Global Attributes",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes",
    content: `Attributes provide additional information about HTML elements. They appear in the opening tag and usually come in **name="value"** pairs.

## Attribute Syntax

An attribute should have:
- A **space** between it and the element name
- The attribute **name**, followed by an equals sign (\`=\`)
- An attribute **value**, wrapped in quotes (double or single)

## Global Attributes

These attributes can be used on ANY HTML element:
- \`id\` — Unique identifier for the element (must be unique on the page)
- \`class\` — One or more class names for CSS/JS targeting
- \`style\` — Inline CSS styles (use sparingly)
- \`title\` — Advisory tooltip text on hover
- \`lang\` — Language of the element's content
- \`dir\` — Text direction (\`ltr\`, \`rtl\`, \`auto\`)
- \`hidden\` — Hides the element from view
- \`tabindex\` — Controls keyboard tab order
- \`contenteditable\` — Makes content editable by the user
- \`draggable\` — Makes an element draggable

## Data Attributes (\`data-*\`)

Custom data attributes let you store extra information on elements:
- Prefixed with \`data-\` followed by your custom name
- Accessible in JavaScript via \`element.dataset\`
- Useful for passing data from HTML to JavaScript
- Should NOT be used for data that has a more appropriate element or attribute

## Boolean Attributes

Some attributes don't need a value — their mere presence means \`true\`:
- \`required\`, \`disabled\`, \`checked\`, \`readonly\`, \`hidden\`, \`autoplay\`, \`loop\`
- Writing \`disabled\` is the same as \`disabled="disabled"\`

## ARIA Attributes

ARIA (Accessible Rich Internet Applications) attributes enhance accessibility:
- \`aria-label\` — Provides an accessible label
- \`aria-describedby\` — References an element that describes this one
- \`aria-hidden\` — Hides from assistive technology
- \`role\` — Defines the element's role`,
    keyTakeaways: [
      "Attributes provide extra information in name=\"value\" pairs",
      "Global attributes (id, class, style, title) work on any element",
      "data-* attributes store custom data accessible via JavaScript",
      "Boolean attributes (required, disabled) don't need a value",
      "ARIA attributes improve accessibility for assistive technologies",
    ],
    codeExamples: [
      {
        title: "Common Attributes in Action",
        language: "html",
        description: "Demonstrating global attributes, data attributes, and ARIA attributes.",
        code: `<!-- ID and Class -->
<div id="hero" class="section hero-section">
    <h1 class="title text-gradient">Welcome</h1>
</div>

<!-- Data attributes -->
<button
    data-action="delete"
    data-item-id="42"
    data-confirm="true"
>
    Delete Item
</button>

<!-- Accessing data attributes in JavaScript -->
<script>
    const btn = document.querySelector('button');
    console.log(btn.dataset.action);   // "delete"
    console.log(btn.dataset.itemId);   // "42"
</script>

<!-- Boolean attributes -->
<input type="text" required disabled>
<input type="checkbox" checked>
<video src="intro.mp4" autoplay muted loop></video>

<!-- ARIA for accessibility -->
<button aria-label="Close dialog" aria-describedby="close-help">
    ✕
</button>
<p id="close-help" hidden>
    Press this button to close the dialog
</p>

<!-- Contenteditable -->
<div contenteditable="true">
    Click here and start typing to edit this text!
</div>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "attrs-1",
        title: "Add Data Attributes",
        instruction: "Add data-price=\"29.99\" and data-category=\"electronics\" to the product div below.",
        startingCode: `<div id="product-1" class="product">\n    <h3>Wireless Mouse</h3>\n</div>`,
        expectedOutput: `<div id="product-1" class="product" data-price="29.99" data-category="electronics">\n    <h3>Wireless Mouse</h3>\n</div>`,
        hints: [
          "Data attributes go in the opening tag",
          "They follow the pattern data-name=\"value\"",
        ],
      },
    ],
  },
  {
    slug: "html5-apis-and-best-practices",
    title: "HTML5 APIs & Best Practices",
    difficulty: "advanced",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    content: `HTML5 isn't just about new elements — it also introduced powerful APIs and modern best practices that every web developer should know.

## HTML5 Multimedia

\`<video>\` and \`<audio>\` elements provide native media playback without plugins:
- Built-in controls with the \`controls\` attribute
- Multiple sources with \`<source>\` for format fallbacks
- Attributes: \`autoplay\`, \`loop\`, \`muted\`, \`preload\`, \`poster\`

## The \`<canvas>\` Element

\`<canvas>\` provides a drawing surface for graphics via JavaScript. Used for:
- Charts and data visualizations
- Game graphics
- Image manipulation
- Animations

## HTML5 Best Practices

**1. Always Declare DOCTYPE**
\`<!DOCTYPE html>\` at the top of every page.

**2. Use UTF-8 Encoding**
\`<meta charset="UTF-8">\` for universal character support.

**3. Include Viewport Meta**
\`<meta name="viewport" content="width=device-width, initial-scale=1.0">\` for mobile responsiveness.

**4. Validate Your HTML**
Use the W3C HTML Validator to catch errors and ensure standards compliance.

**5. Semantic Over Generic**
Prefer \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, etc. over \`<div>\` and \`<span>\`.

**6. Accessibility First**
- All images need \`alt\` text
- Forms need \`<label>\` elements
- Use ARIA attributes when needed
- Ensure keyboard navigability

**7. Performance**
- Lazy-load images with \`loading="lazy"\`
- Use \`async\` or \`defer\` on \`<script>\` tags
- Minimize inline styles

## Character References

Special characters in HTML:
- \`&lt;\` → <
- \`&gt;\` → >
- \`&amp;\` → &
- \`&quot;\` → "
- \`&nbsp;\` → non-breaking space

## HTML Comments

\`<!-- This is a comment -->\` — Invisible to users, useful for developers.`,
    keyTakeaways: [
      "HTML5 provides native <video> and <audio> without plugins",
      "Always validate HTML with the W3C Validator",
      "Use loading=\"lazy\" on images for better performance",
      "Use async/defer attributes on <script> tags",
      "Special characters use entity references like &lt; and &amp;",
    ],
    codeExamples: [
      {
        title: "HTML5 Multimedia",
        language: "html",
        description: "Embedding video and audio content with fallbacks and accessibility features.",
        code: `<!-- Video with controls and fallback -->
<video controls width="640" poster="thumbnail.jpg" preload="metadata">
    <source src="intro.webm" type="video/webm">
    <source src="intro.mp4" type="video/mp4">
    <track kind="subtitles" src="subs_en.vtt" srclang="en" label="English">
    <p>Your browser doesn't support HTML video.
    <a href="intro.mp4">Download the video</a>.</p>
</video>

<!-- Audio player -->
<audio controls>
    <source src="podcast.ogg" type="audio/ogg">
    <source src="podcast.mp3" type="audio/mpeg">
    Your browser doesn't support HTML audio.
</audio>

<!-- Lazy-loaded image (performance optimization) -->
<img
    src="photo.jpg"
    alt="A beautiful landscape"
    loading="lazy"
    width="800"
    height="600"
>

<!-- Script loading strategies -->
<script src="analytics.js" async></script>   <!-- Loads & executes ASAP -->
<script src="app.js" defer></script>         <!-- Executes after HTML parsing -->`,
        livePreview: false,
      },
      {
        title: "HTML5 Interactive Elements",
        language: "html",
        description: "Modern HTML5 elements for interactive content: details, dialog, progress, and meter.",
        code: `<!-- Progress bar -->
<label for="download">Download Progress:</label>
<progress id="download" value="70" max="100">70%</progress>

<!-- Meter (gauge) -->
<label for="score">Test Score:</label>
<meter id="score" value="0.85" min="0" max="1"
       low="0.4" high="0.75" optimum="0.9">
    85%
</meter>

<!-- Expandable FAQ -->
<details>
    <summary>How do I get started with HTML?</summary>
    <p>Start by creating a simple .html file with a text
    editor. Add the basic structure: DOCTYPE, html, head,
    and body elements. Then open it in a browser!</p>
</details>

<details>
    <summary>Do I need to learn HTML before CSS?</summary>
    <p>Yes! HTML provides the structure that CSS styles.
    You need HTML elements before you can style them.</p>
</details>

<!-- HTML Comments -->
<!-- This comment is invisible to users -->
<!-- TODO: Add more FAQ items -->`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "advanced-1",
        title: "Optimize a Page",
        instruction: "Add loading=\"lazy\" to the image, defer to the script tag, and wrap the image in a figure with a caption.",
        startingCode: `<img src="photo.jpg" alt="Mountain view" width="800" height="600">\n<script src="app.js"></script>`,
        expectedOutput: `<figure>\n    <img src="photo.jpg" alt="Mountain view" width="800" height="600" loading="lazy">\n    <figcaption>Beautiful mountain view</figcaption>\n</figure>\n<script src="app.js" defer></script>`,
        hints: [
          "Add loading=\"lazy\" attribute to the img element",
          "Add defer attribute to the script tag",
          "Wrap img in <figure> and add <figcaption>",
        ],
      },
    ],
  },
];
