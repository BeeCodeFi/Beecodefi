import { TutorialCategory } from "@/types";

export const tutorials: TutorialCategory[] = [
  {
    slug: "html",
    title: "HTML Fundamentals",
    description: "Learn the building blocks of every website. Master HTML elements, forms, tables, and semantic markup.",
    icon: "FileCode2",
    color: "from-orange-500 to-red-500",
    lessons: [
      {
        slug: "introduction",
        title: "Introduction to HTML",
        content: `HTML (HyperText Markup Language) is the standard language for creating web pages. It describes the structure of a web page using a series of elements that tell the browser how to display content.

Every HTML document starts with a document type declaration and follows a basic structure with \`<html>\`, \`<head>\`, and \`<body>\` tags.

## Key Concepts
- **Elements** are defined by tags (e.g., \`<p>\`, \`<h1>\`, \`<div>\`)
- **Attributes** provide additional information about elements
- **Nesting** allows elements to contain other elements
- **Semantic HTML** uses meaningful tags like \`<header>\`, \`<nav>\`, \`<main>\``,
        codeExamples: [
          {
            title: "Basic HTML Structure",
            language: "html",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <p>This is my first web page!</p>
    </main>
</body>
</html>`
          },
          {
            title: "Common HTML Elements",
            language: "html",
            code: `<!-- Headings -->
<h1>Main Heading</h1>
<h2>Sub Heading</h2>

<!-- Paragraphs and Links -->
<p>This is a paragraph with a <a href="https://example.com">link</a>.</p>

<!-- Images -->
<img src="photo.jpg" alt="Description of photo" width="300">

<!-- Lists -->
<ul>
    <li>Unordered item 1</li>
    <li>Unordered item 2</li>
</ul>

<ol>
    <li>Ordered item 1</li>
    <li>Ordered item 2</li>
</ol>`
          }
        ]
      },
      {
        slug: "forms-and-inputs",
        title: "HTML Forms & Inputs",
        content: `Forms are essential for collecting user input on web pages. HTML provides various input types and form elements to create interactive forms.

## Form Elements
- \`<form>\` — Container for form controls
- \`<input>\` — Various input types (text, email, password, etc.)
- \`<textarea>\` — Multi-line text input
- \`<select>\` — Dropdown menu
- \`<button>\` — Clickable button
- \`<label>\` — Labels for form controls (important for accessibility)

## Input Types
HTML5 introduced many new input types like \`email\`, \`number\`, \`date\`, \`range\`, \`color\`, and more. These provide built-in validation and better mobile keyboards.`,
        codeExamples: [
          {
            title: "Complete Form Example",
            language: "html",
            code: `<form action="/submit" method="POST">
    <div>
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" required 
               placeholder="Enter your name">
    </div>

    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required
               placeholder="you@example.com">
    </div>

    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" 
               minlength="8" required>
    </div>

    <div>
        <label for="role">Role:</label>
        <select id="role" name="role">
            <option value="">Select a role</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
        </select>
    </div>

    <div>
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4"
                  placeholder="Tell us about yourself"></textarea>
    </div>

    <button type="submit">Submit</button>
</form>`
          }
        ]
      },
      {
        slug: "semantic-html",
        title: "Semantic HTML5",
        content: `Semantic HTML uses elements that clearly describe their meaning to both the browser and the developer. This improves accessibility, SEO, and code maintainability.

## Why Semantic HTML Matters
- **Accessibility**: Screen readers can better navigate semantic content
- **SEO**: Search engines understand page structure better
- **Maintainability**: Code is easier to read and understand
- **Consistency**: Standard structure across pages

## Key Semantic Elements
- \`<header>\` — Introductory content or navigation
- \`<nav>\` — Navigation links
- \`<main>\` — Main content of the page
- \`<article>\` — Self-contained content
- \`<section>\` — Thematic grouping of content
- \`<aside>\` — Sidebar or tangentially related content
- \`<footer>\` — Footer of a section or page`,
        codeExamples: [
          {
            title: "Semantic Page Layout",
            language: "html",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Blog Post</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h1>Understanding Semantic HTML</h1>
                <time datetime="2026-04-28">April 28, 2026</time>
            </header>

            <section>
                <h2>Introduction</h2>
                <p>Semantic HTML gives meaning to your markup...</p>
            </section>

            <section>
                <h2>Benefits</h2>
                <p>Better accessibility, SEO, and readability...</p>
            </section>

            <footer>
                <p>Written by <address>Ayush Kumar</address></p>
            </footer>
        </article>

        <aside>
            <h3>Related Articles</h3>
            <ul>
                <li><a href="#">HTML Forms Guide</a></li>
                <li><a href="#">CSS Basics</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 BEECODEFI</p>
    </footer>
</body>
</html>`
          }
        ]
      }
    ]
  },
  {
    slug: "css",
    title: "CSS Mastery",
    description: "Style your websites beautifully. Master selectors, flexbox, grid, animations, and responsive design.",
    icon: "Palette",
    color: "from-blue-500 to-indigo-500",
    lessons: [
      {
        slug: "introduction",
        title: "Introduction to CSS",
        content: `CSS (Cascading Style Sheets) controls how HTML elements are displayed on screen. It handles layout, colors, fonts, spacing, and visual effects.

## How CSS Works
CSS rules consist of **selectors** and **declarations**. Selectors target HTML elements, and declarations define the styles to apply.

## Ways to Add CSS
1. **Inline** — Using the \`style\` attribute on an element
2. **Internal** — Using a \`<style>\` tag in the \`<head>\`
3. **External** — Linking a separate \`.css\` file (recommended)

## The Cascade
When multiple rules target the same element, CSS uses specificity and order to determine which styles apply. Inline > ID > Class > Element.`,
        codeExamples: [
          {
            title: "CSS Selectors & Properties",
            language: "css",
            code: `/* Element Selector */
body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #333;
}

/* Class Selector */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

/* ID Selector */
#hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 2rem;
}

/* Pseudo-classes */
a:hover {
    color: #6366f1;
    text-decoration: underline;
}

/* Combinators */
.card > h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
}

.card p {
    color: #666;
}`
          }
        ]
      },
      {
        slug: "flexbox-and-grid",
        title: "Flexbox & CSS Grid",
        content: `Modern CSS layout is built on two powerful systems: **Flexbox** for one-dimensional layouts and **CSS Grid** for two-dimensional layouts.

## Flexbox
Flexbox is ideal for laying out items in a single row or column. It excels at distributing space and aligning items.

Key properties:
- \`display: flex\` — Creates a flex container
- \`justify-content\` — Alignment along the main axis
- \`align-items\` — Alignment along the cross axis
- \`flex-direction\` — Row or column layout
- \`gap\` — Space between items

## CSS Grid
Grid is perfect for creating complex two-dimensional layouts with rows and columns.

Key properties:
- \`display: grid\` — Creates a grid container
- \`grid-template-columns\` — Define column sizes
- \`grid-template-rows\` — Define row sizes
- \`gap\` — Space between grid items`,
        codeExamples: [
          {
            title: "Flexbox Layout",
            language: "css",
            code: `/* Navbar with Flexbox */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

/* Card Row */
.card-row {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.card {
    flex: 1 1 300px;
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
}

/* Centering */
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}`
          },
          {
            title: "CSS Grid Layout",
            language: "css",
            code: `/* Responsive Grid */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

/* Dashboard Layout */
.dashboard {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "sidebar header"
        "sidebar main"
        "sidebar footer";
    min-height: 100vh;
}

.sidebar { grid-area: sidebar; }
.header  { grid-area: header; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`
          }
        ]
      },
      {
        slug: "responsive-design",
        title: "Responsive Design",
        content: `Responsive design ensures your website looks great on all devices — phones, tablets, and desktops. The key techniques are fluid layouts, flexible images, and media queries.

## Mobile-First Approach
Start designing for the smallest screen, then add complexity for larger screens using \`min-width\` media queries. This results in cleaner, more performant CSS.

## Key Concepts
- **Viewport meta tag** — Essential for mobile rendering
- **Relative units** — Use \`rem\`, \`em\`, \`%\`, \`vw\`, \`vh\` instead of fixed \`px\`
- **Media queries** — Apply styles at specific breakpoints
- **Fluid typography** — Font sizes that scale with viewport
- **Flexible images** — Images that resize with their container`,
        codeExamples: [
          {
            title: "Responsive CSS Patterns",
            language: "css",
            code: `/* Mobile-First Base Styles */
.container {
    padding: 1rem;
    width: 100%;
}

.heading {
    font-size: clamp(1.5rem, 4vw, 3rem);
}

/* Tablet (768px+) */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
        max-width: 768px;
        margin: 0 auto;
    }

    .grid-responsive {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    .container {
        max-width: 1024px;
    }

    .grid-responsive {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Fluid Image */
img {
    max-width: 100%;
    height: auto;
}

/* Hide on mobile, show on desktop */
.desktop-only {
    display: none;
}

@media (min-width: 768px) {
    .desktop-only {
        display: block;
    }
}`
          }
        ]
      }
    ]
  },
  {
    slug: "javascript",
    title: "JavaScript Essentials",
    description: "Add interactivity to your sites. Learn variables, functions, DOM manipulation, async/await, and ES6+.",
    icon: "Braces",
    color: "from-yellow-500 to-amber-500",
    lessons: [
      {
        slug: "introduction",
        title: "Introduction to JavaScript",
        content: `JavaScript is the programming language of the web. It adds interactivity, handles user events, manipulates the DOM, and communicates with servers.

## Key Concepts
- **Variables** — Store data using \`let\`, \`const\`, and \`var\`
- **Data Types** — String, Number, Boolean, Array, Object, null, undefined
- **Functions** — Reusable blocks of code
- **Control Flow** — if/else, switch, loops (for, while, for...of)
- **Scope** — Block scope (\`let\`/\`const\`) vs function scope (\`var\`)

## Modern JavaScript (ES6+)
ES6 introduced powerful features like arrow functions, destructuring, template literals, spread/rest operators, and modules.`,
        codeExamples: [
          {
            title: "JavaScript Fundamentals",
            language: "javascript",
            code: `// Variables
const name = "Ayush";
let age = 25;
const isStudent = false;

// Arrays
const skills = ["HTML", "CSS", "JavaScript"];
skills.push("React");

// Objects
const developer = {
    name: "Ayush Kumar",
    role: "Full-Stack Developer",
    skills: ["React", "Node.js", ".NET"],
    greet() {
        return \`Hi, I'm \${this.name}!\`;
    }
};

// Arrow Functions
const double = (n) => n * 2;
const numbers = [1, 2, 3, 4, 5];

// Array Methods
const doubled = numbers.map(n => n * 2);        // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0);  // [2, 4]
const sum = numbers.reduce((a, b) => a + b, 0);  // 15

// Destructuring
const { name: devName, role } = developer;
const [first, ...rest] = skills;

// Template Literals
console.log(\`\${devName} is a \${role}\`);`
          }
        ]
      },
      {
        slug: "dom-manipulation",
        title: "DOM Manipulation",
        content: `The Document Object Model (DOM) is a programming interface for HTML documents. JavaScript can access and modify the DOM to dynamically update content, styles, and structure.

## Selecting Elements
- \`document.getElementById()\` — Select by ID
- \`document.querySelector()\` — Select first match (CSS selector)
- \`document.querySelectorAll()\` — Select all matches

## Modifying Elements
- \`element.textContent\` — Get/set text
- \`element.innerHTML\` — Get/set HTML (use carefully, avoid user input)
- \`element.classList\` — Add/remove/toggle CSS classes
- \`element.style\` — Modify inline styles
- \`element.setAttribute()\` — Set attributes

## Event Handling
Events are actions that happen in the browser (clicks, key presses, form submissions). Use \`addEventListener()\` to respond to events.`,
        codeExamples: [
          {
            title: "DOM Manipulation Examples",
            language: "javascript",
            code: `// Selecting Elements
const heading = document.querySelector("h1");
const buttons = document.querySelectorAll(".btn");
const form = document.getElementById("contact-form");

// Modifying Content
heading.textContent = "Welcome to BEECODEFI!";

// Working with Classes
heading.classList.add("text-gradient");
heading.classList.toggle("hidden");

// Creating Elements
const card = document.createElement("div");
card.className = "card";
card.innerHTML = \`
    <h3>New Card</h3>
    <p>Dynamic content!</p>
\`;
document.querySelector(".grid").appendChild(card);

// Event Listeners
buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.target.classList.add("active");
        console.log("Button clicked:", e.target.textContent);
    });
});

// Form Handling
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log("Form data:", data);
});

// Keyboard Events
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});`
          }
        ]
      },
      {
        slug: "async-javascript",
        title: "Async JavaScript",
        content: `JavaScript is single-threaded but uses asynchronous programming to handle operations like API calls, file reading, and timers without blocking the main thread.

## Callbacks → Promises → Async/Await
JavaScript evolved from callback-based patterns to Promises, and then to the modern async/await syntax which makes asynchronous code look synchronous.

## Key Concepts
- **Callbacks** — Functions passed as arguments (can lead to "callback hell")
- **Promises** — Objects representing future values (.then/.catch)
- **Async/Await** — Syntactic sugar over Promises (try/catch for errors)
- **Fetch API** — Modern way to make HTTP requests
- **Error Handling** — Always handle errors in async code`,
        codeExamples: [
          {
            title: "Async Patterns",
            language: "javascript",
            code: `// Promises
function fetchUser(id) {
    return fetch(\`/api/users/\${id}\`)
        .then(response => {
            if (!response.ok) throw new Error("User not found");
            return response.json();
        });
}

fetchUser(1)
    .then(user => console.log(user))
    .catch(error => console.error(error));

// Async/Await (Preferred)
async function getUser(id) {
    try {
        const response = await fetch(\`/api/users/\${id}\`);
        if (!response.ok) throw new Error("User not found");
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
    }
}

// Parallel Requests
async function getDashboardData() {
    const [user, posts, notifications] = await Promise.all([
        fetch("/api/user").then(r => r.json()),
        fetch("/api/posts").then(r => r.json()),
        fetch("/api/notifications").then(r => r.json()),
    ]);

    return { user, posts, notifications };
}

// Real-World Example: Contact Form
async function submitContactForm(formData) {
    const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}`
          }
        ]
      }
    ]
  }
];
