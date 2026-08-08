export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
}

export const htmlInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'html-1',
    question: 'What is HTML and what does it stand for?',
    answer: `HTML stands for **HyperText Markup Language**. It is the standard markup language used to create and structure content on the web.

**Key Points:**
- HTML defines the structure and layout of web pages using elements and tags
- It tells browsers how to display content like text, images, links, and multimedia
- HTML is not a programming language—it's a markup language that describes content structure
- The latest version is HTML5, which includes new semantic elements and multimedia support

**Example:**
\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My Web Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
\`\`\``,
    difficulty: 'beginner',
    category: 'Basics',
    tags: ['fundamentals', 'definition'],
  },
  {
    id: 'html-2',
    question: 'What is the difference between HTML elements and tags?',
    answer: `**HTML Tags** are the markup syntax used to define elements, while **HTML Elements** are the complete structure including the opening tag, content, and closing tag.

**Tag:** The code enclosed in angle brackets
\`\`\`html
<p>  <!-- Opening tag -->
</p> <!-- Closing tag -->
\`\`\`

**Element:** The complete package
\`\`\`html
<p>This is a paragraph</p>
<!-- The entire thing above is an element -->
\`\`\`

**Key Differences:**
- Tags are just the markers, elements include everything between them
- Some elements are "void" or "self-closing" like \`<img>\` or \`<br>\`
- Elements can be nested inside other elements
- Elements represent the actual content structure, tags are just the syntax`,
    difficulty: 'beginner',
    category: 'Basics',
    tags: ['fundamentals', 'syntax'],
  },
  {
    id: 'html-3',
    question: 'What is the DOCTYPE declaration and why is it important?',
    answer: `The **DOCTYPE** declaration tells the browser which version of HTML the page is written in and how to render it.

**Syntax:**
\`\`\`html
<!DOCTYPE html>
\`\`\`

**Why It's Important:**
1. **Standards Mode**: Ensures the browser renders the page in standards-compliant mode
2. **Prevents Quirks Mode**: Without it, browsers may fall back to "quirks mode" with inconsistent rendering
3. **HTML5 Simplification**: HTML5's DOCTYPE is much simpler than older versions
4. **First Line**: Must be the very first thing in your HTML document

**Old HTML4 DOCTYPE (complex):**
\`\`\`html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" 
"http://www.w3.org/TR/html4/strict.dtd">
\`\`\`

**HTML5 DOCTYPE (simple):**
\`\`\`html
<!DOCTYPE html>
\`\`\``,
    difficulty: 'beginner',
    category: 'Document Structure',
    tags: ['doctype', 'standards'],
  },
  {
    id: 'html-4',
    question: 'What are semantic HTML tags and why should you use them?',
    answer: `**Semantic HTML** uses tags that clearly describe their meaning and content purpose, rather than generic containers like \`<div>\` and \`<span>\`.

**Common Semantic Tags:**
- \`<header>\` - Introductory content or navigation
- \`<nav>\` - Navigation links
- \`<main>\` - Main content of the document
- \`<article>\` - Self-contained content
- \`<section>\` - Thematic grouping of content
- \`<aside>\` - Sidebar content
- \`<footer>\` - Footer information
- \`<figure>\` and \`<figcaption>\` - Images with captions

**Benefits:**
1. **Accessibility**: Screen readers understand the structure better
2. **SEO**: Search engines can identify important content more accurately
3. **Maintainability**: Code is easier to read and understand
4. **Future-proof**: Better support for new technologies

**Example:**
\`\`\`html
<!-- Non-semantic -->
<div class="header">
  <div class="nav">Links</div>
</div>

<!-- Semantic -->
<header>
  <nav>Links</nav>
</header>
\`\`\``,
    difficulty: 'intermediate',
    category: 'HTML5 Features',
    tags: ['semantics', 'accessibility', 'best-practices'],
  },
  {
    id: 'html-5',
    question: 'What is the difference between <div> and <span>?',
    answer: `**\`<div>\`** and **\`<span>\`** are both generic containers, but they have different display behaviors.

**\`<div>\` - Block Element:**
- Takes up the full width available
- Starts on a new line
- Forces content after it to a new line
- Used for larger sections of content

**\`<span>\` - Inline Element:**
- Only takes up as much width as needed
- Stays within the flow of text
- Doesn't force line breaks
- Used for small portions of text or inline styling

**Example:**
\`\`\`html
<div>This is a block element</div>
<div>This starts on a new line</div>

<span>This is inline</span>
<span>and continues on same line</span>
\`\`\`

**When to Use:**
- \`<div>\`: Grouping large sections, layout containers
- \`<span>\`: Styling part of text, inline elements`,
    difficulty: 'beginner',
    category: 'Elements',
    tags: ['elements', 'display', 'layout'],
  },
  {
    id: 'html-6',
    question: 'Explain the difference between <strong> and <b>, <em> and <i>',
    answer: `These pairs look similar visually but have different semantic meanings.

**\`<strong>\` vs \`<b>\`:**
- **\`<strong>\`**: Indicates strong importance or urgency (semantic)
- **\`<b>\`**: Makes text bold for visual effect only (presentational)

**\`<em>\` vs \`<i>\`:**
- **\`<em>\`**: Emphasizes text with meaning (semantic)
- **\`<i>\`**: Italicizes text for visual effect only (presentational)

**Why It Matters:**
- Screen readers treat \`<strong>\` and \`<em>\` differently
- Search engines give more weight to semantic tags
- Better accessibility for users with disabilities

**Example:**
\`\`\`html
<!-- Semantic (recommended) -->
<p><strong>Warning:</strong> Do not delete this file.</p>
<p>The word <em>love</em> has many meanings.</p>

<!-- Presentational (use CSS instead) -->
<p><b>Bold text</b></p>
<p><i>Italic text</i></p>
\`\`\`

**Best Practice**: Use \`<strong>\` and \`<em>\` for meaning, use CSS for visual styling.`,
    difficulty: 'intermediate',
    category: 'Text Formatting',
    tags: ['semantics', 'text', 'accessibility'],
  },
  {
    id: 'html-7',
    question: 'What are data-* attributes and when should you use them?',
    answer: `**Data attributes** allow you to store custom data directly on HTML elements.

**Syntax:**
\`\`\`html
<div data-user-id="12345" data-role="admin">User Info</div>
\`\`\`

**Accessing in JavaScript:**
\`\`\`javascript
const element = document.querySelector('div');
console.log(element.dataset.userId); // "12345"
console.log(element.dataset.role);   // "admin"
\`\`\`

**When to Use:**
- Store configuration data for JavaScript
- Keep metadata with elements (IDs, categories, states)
- Event delegation with custom actions
- Avoid global variables for element-specific data

**CSS Selection:**
\`\`\`css
[data-role="admin"] {
  border: 2px solid red;
}
\`\`\`

**Best Practices:**
- Use lowercase names with hyphens
- Don't store sensitive information (visible in HTML)
- Keep values simple (strings or numbers)
- Prefer data attributes over classes for non-styling data`,
    difficulty: 'intermediate',
    category: 'Attributes',
    tags: ['data-attributes', 'javascript', 'best-practices'],
  },
  {
    id: 'html-8',
    question: 'What is the difference between inline, block, and inline-block elements?',
    answer: `These **display** properties control how elements behave in the layout flow.

**Block Elements:**
- Take full width available
- Start on new line
- Can have width and height
- Examples: \`<div>\`, \`<p>\`, \`<h1>\`, \`<section>\`

**Inline Elements:**
- Only take space they need
- Don't break to new line
- Cannot have width/height (ignored)
- Examples: \`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`

**Inline-Block Elements:**
- Flow with text like inline
- Can have width and height like block
- Best of both worlds
- Examples: \`<img>\`, \`<button>\` by default

**Example:**
\`\`\`html
<style>
  .block { display: block; width: 200px; height: 50px; background: lightblue; }
  .inline { display: inline; width: 200px; height: 50px; background: lightgreen; }
  .inline-block { display: inline-block; width: 200px; height: 50px; background: lightcoral; }
</style>

<div class="block">Block</div>
<div class="block">Block 2</div>

<span class="inline">Inline</span>
<span class="inline">Inline 2</span>

<span class="inline-block">Inline-Block</span>
<span class="inline-block">Inline-Block 2</span>
\`\`\`

**Key Takeaway:** Use \`display\` CSS property to change element behavior.`,
    difficulty: 'intermediate',
    category: 'CSS Display',
    tags: ['display', 'layout', 'css'],
  },
  {
    id: 'html-9',
    question: 'What is the purpose of <meta> tags? List important ones.',
    answer: `**Meta tags** provide metadata about the HTML document. They go in the \`<head>\` section.

**Essential Meta Tags:**

**1. Character Encoding:**
\`\`\`html
<meta charset="UTF-8">
\`\`\`

**2. Viewport (Responsive Design):**
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

**3. Description (SEO):**
\`\`\`html
<meta name="description" content="Learn HTML interview questions">
\`\`\`

**4. Keywords (Legacy SEO):**
\`\`\`html
<meta name="keywords" content="HTML, web development, tutorial">
\`\`\`

**5. Author:**
\`\`\`html
<meta name="author" content="John Doe">
\`\`\`

**6. Robots (SEO):**
\`\`\`html
<meta name="robots" content="index, follow">
\`\`\`

**7. Open Graph (Social Media):**
\`\`\`html
<meta property="og:title" content="My Page">
<meta property="og:image" content="image.jpg">
<meta property="og:description" content="Page description">
\`\`\`

**8. Refresh/Redirect:**
\`\`\`html
<meta http-equiv="refresh" content="5;url=https://example.com">
\`\`\`

**Impact:**
- SEO ranking
- Social media previews
- Mobile responsiveness
- Browser behavior`,
    difficulty: 'intermediate',
    category: 'Document Head',
    tags: ['meta-tags', 'seo', 'responsive'],
  },
  {
    id: 'html-10',
    question: 'Explain the difference between <section>, <article>, and <div>',
    answer: `These are all container elements, but they have different **semantic meanings**.

**\`<div>\` - Generic Container:**
- No semantic meaning
- Use only when no other semantic element fits
- Purely for styling/layout purposes

**\`<section>\` - Thematic Grouping:**
- Groups related content together
- Typically has a heading
- Represents a standalone section of content
- Part of a larger document

**\`<article>\` - Self-Contained Content:**
- Independent, reusable content
- Makes sense on its own
- Could be distributed separately
- Examples: blog posts, news articles, forum posts

**Example Structure:**
\`\`\`html
<article>
  <h1>Blog Post Title</h1>
  
  <section>
    <h2>Introduction</h2>
    <p>Content here...</p>
  </section>
  
  <section>
    <h2>Main Content</h2>
    <p>More content...</p>
  </section>
  
  <section>
    <h2>Conclusion</h2>
    <p>Final thoughts...</p>
  </section>
</article>

<!-- Generic styling container -->
<div class="sidebar">
  <p>Ads or navigation</p>
</div>
\`\`\`

**Decision Tree:**
1. Is it self-contained? → Use \`<article>\`
2. Is it a thematic section? → Use \`<section>\`
3. Just for styling/layout? → Use \`<div>\``,
    difficulty: 'intermediate',
    category: 'Semantic HTML',
    tags: ['semantics', 'html5', 'structure'],
  },
  {
    id: 'html-11',
    question: 'What are void elements (self-closing tags) in HTML?',
    answer: `**Void elements** are elements that cannot have any content and don't need a closing tag.

**Common Void Elements:**
\`\`\`html
<img src="image.jpg" alt="Description">
<br>
<hr>
<input type="text" name="username">
<meta charset="UTF-8">
<link rel="stylesheet" href="style.css">
<area shape="rect" coords="0,0,100,100" href="page.html">
<base href="https://example.com/">
<col>
<embed src="file.pdf">
<source src="video.mp4" type="video/mp4">
<track kind="subtitles" src="subs.vtt">
<wbr>
\`\`\`

**HTML5 Syntax:**
\`\`\`html
<!-- Both are valid in HTML5 -->
<img src="image.jpg" alt="Photo">
<img src="image.jpg" alt="Photo" />

<!-- Closing slash is optional -->
<br>
<br />
\`\`\`

**XHTML Syntax (Requires Self-Closing):**
\`\`\`html
<img src="image.jpg" alt="Photo" />
<br />
<hr />
\`\`\`

**Important:** These elements **cannot** have content between opening and closing tags.`,
    difficulty: 'beginner',
    category: 'Elements',
    tags: ['void-elements', 'self-closing', 'syntax'],
  },
  {
    id: 'html-12',
    question: 'What is the difference between <link> and <a> tags?',
    answer: `Both create connections to other resources, but serve **completely different purposes**.

**\`<link>\` Tag:**
- Used in \`<head>\` section
- Links external resources (CSS, fonts, icons)
- Not visible to users
- Not clickable
- Affects page behavior/appearance

**Example:**
\`\`\`html
<head>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="favicon.ico">
  <link rel="preload" href="font.woff2" as="font">
</head>
\`\`\`

**\`<a>\` Tag (Anchor):**
- Used in \`<body>\` section
- Creates clickable hyperlinks
- Visible to users
- Navigates to other pages/sections
- Interactive element

**Example:**
\`\`\`html
<body>
  <a href="https://example.com">Visit Example</a>
  <a href="#section">Jump to Section</a>
  <a href="mailto:email@example.com">Email Us</a>
  <a href="tel:+1234567890">Call Us</a>
</body>
\`\`\`

**Key Difference:** \`<link>\` is for resources, \`<a>\` is for navigation.`,
    difficulty: 'beginner',
    category: 'Links & Resources',
    tags: ['link', 'anchor', 'navigation'],
  },
  {
    id: 'html-13',
    question: 'Explain HTML5 form validation attributes',
    answer: `HTML5 introduced **built-in form validation** without JavaScript.

**Required Fields:**
\`\`\`html
<input type="text" name="username" required>
\`\`\`

**Pattern Matching (Regex):**
\`\`\`html
<input type="text" pattern="[A-Za-z]{3,}" title="Min 3 letters">
\`\`\`

**Min/Max Length:**
\`\`\`html
<input type="text" minlength="5" maxlength="20">
\`\`\`

**Min/Max Values:**
\`\`\`html
<input type="number" min="1" max="100">
\`\`\`

**Input Types with Built-in Validation:**
\`\`\`html
<input type="email" name="email">
<input type="url" name="website">
<input type="tel" name="phone">
<input type="date" name="birthday">
<input type="number" name="age">
\`\`\`

**Custom Validation Message:**
\`\`\`javascript
input.setCustomValidity("Please enter a valid email");
\`\`\`

**Disable Validation:**
\`\`\`html
<form novalidate>
  <!-- Form content -->
</form>
\`\`\`

**CSS Pseudo-classes:**
\`\`\`css
input:valid { border-color: green; }
input:invalid { border-color: red; }
input:required { border-width: 2px; }
\`\`\`

**Benefits:** Faster development, consistent UX, no JavaScript needed for basic validation.`,
    difficulty: 'intermediate',
    category: 'Forms',
    tags: ['forms', 'validation', 'html5'],
  },
  {
    id: 'html-14',
    question: 'What is the difference between localStorage, sessionStorage, and cookies?',
    answer: `All three store data on the client-side, but have different **use cases and lifespans**.

**localStorage:**
- Stores data **permanently** (until manually cleared)
- Capacity: ~5-10MB
- Never sent to server
- Same origin only
- Survives browser close

\`\`\`javascript
localStorage.setItem('key', 'value');
localStorage.getItem('key');
localStorage.removeItem('key');
localStorage.clear();
\`\`\`

**sessionStorage:**
- Stores data for **one session** only
- Cleared when tab/browser closes
- Capacity: ~5-10MB
- Never sent to server
- Same origin + same tab

\`\`\`javascript
sessionStorage.setItem('key', 'value');
sessionStorage.getItem('key');
\`\`\`

**Cookies:**
- Can set **expiration date**
- Capacity: ~4KB per cookie
- **Sent with every HTTP request**
- Can be server or client side
- Can be secure/httpOnly

\`\`\`javascript
document.cookie = "user=John; expires=Fri, 31 Dec 2024 12:00:00 UTC; path=/";
\`\`\`

**Comparison Table:**

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|----------------|---------|
| Capacity | 5-10MB | 5-10MB | 4KB |
| Lifespan | Forever | Session | Customizable |
| Sent to Server | No | No | Yes |
| Access | Client-side | Client-side | Both |

**When to Use:**
- **localStorage**: User preferences, cached data
- **sessionStorage**: Form data, temporary state
- **Cookies**: Authentication tokens, tracking`,
    difficulty: 'advanced',
    category: 'Storage',
    tags: ['storage', 'cookies', 'web-api'],
  },
  {
    id: 'html-15',
    question: 'What are semantic HTML5 elements? List the main ones.',
    answer: `**Semantic elements** clearly describe their meaning to both browsers and developers.

**Document Structure:**
\`\`\`html
<header>     <!-- Page/section header -->
<nav>        <!-- Navigation links -->
<main>       <!-- Main content -->
<article>    <!-- Self-contained content -->
<section>    <!-- Thematic grouping -->
<aside>      <!-- Side content -->
<footer>     <!-- Page/section footer -->
\`\`\`

**Content Sectioning:**
\`\`\`html
<h1> to <h6> <!-- Headings -->
<address>    <!-- Contact information -->
<figure>     <!-- Self-contained content -->
<figcaption> <!-- Caption for figure -->
\`\`\`

**Text Content:**
\`\`\`html
<strong>  <!-- Strong importance -->
<em>      <!-- Emphasis -->
<mark>    <!-- Highlighted text -->
<time>    <!-- Date/time -->
<abbr>    <!-- Abbreviation -->
<code>    <!-- Code snippet -->
<pre>     <!-- Preformatted text -->
\`\`\`

**Complete Example:**
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Blog</title>
</head>
<body>
  <header>
    <h1>My Blog</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h2>Article Title</h2>
        <time datetime="2024-01-15">January 15, 2024</time>
      </header>
      
      <section>
        <h3>Introduction</h3>
        <p>Content here...</p>
      </section>

      <footer>
        <p>Author: John Doe</p>
      </footer>
    </article>

    <aside>
      <h3>Related Posts</h3>
      <ul>
        <li><a href="#">Post 1</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2024 My Blog</p>
  </footer>
</body>
</html>
\`\`\`

**Benefits:**
- Better SEO
- Improved accessibility
- Easier maintenance
- Clearer code structure`,
    difficulty: 'intermediate',
    category: 'HTML5 Features',
    tags: ['semantics', 'html5', 'accessibility', 'seo'],
  },
  {
    id: 'html-16',
    question: 'What is the difference between GET and POST methods in forms?',
    answer: `**GET** and **POST** are HTTP methods used to send form data to a server.

**GET Method:**
\`\`\`html
<form action="/search" method="GET">
  <input type="text" name="query">
  <button>Search</button>
</form>
<!-- URL becomes: /search?query=searchterm -->
\`\`\`

**Characteristics:**
- Appends data to URL as query string
- Visible in browser address bar
- Can be bookmarked
- Limited data size (~2048 characters)
- Cached by browsers
- Should be used for retrieving data
- **Idempotent** (safe to repeat)

**POST Method:**
\`\`\`html
<form action="/login" method="POST">
  <input type="email" name="email">
  <input type="password" name="password">
  <button>Login</button>
</form>
<!-- Data sent in request body, not visible in URL -->
\`\`\`

**Characteristics:**
- Sends data in request body
- Not visible in URL
- Cannot be bookmarked
- No size limit
- Not cached
- Used for sending sensitive/large data
- Can modify server state

**Comparison:**

| Feature | GET | POST |
|---------|-----|------|
| Data Location | URL | Request Body |
| Security | Less secure | More secure |
| Size Limit | ~2KB | No limit |
| Cacheable | Yes | No |
| Bookmarkable | Yes | No |
| Use Case | Search, filter | Login, submit |

**When to Use:**
- **GET**: Searching, filtering, pagination, sharing links
- **POST**: Login, registration, file upload, data modification

**Security Note:** Neither is completely secure without HTTPS!`,
    difficulty: 'intermediate',
    category: 'Forms',
    tags: ['forms', 'http', 'methods'],
  },
];
