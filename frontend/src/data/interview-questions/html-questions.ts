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
];