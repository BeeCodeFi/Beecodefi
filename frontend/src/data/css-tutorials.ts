import { TutorialLesson } from "@/types";

export const cssLessons: TutorialLesson[] = [
  // ──────────────────────────────────────────
  //  Lesson 1: Introduction to CSS
  // ──────────────────────────────────────────
  {
    slug: "introduction",
    title: "Introduction to CSS",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/What_is_CSS",
    content: `CSS (Cascading Style Sheets) is the language used to describe how HTML elements should look on screen, paper, or other media. While HTML provides structure, CSS provides presentation.

## What is CSS?

CSS is a **style sheet language** — not a programming language, and not a markup language either. It is designed to enable the separation of content from presentation, including layout, colors, and fonts.

## How CSS Works

CSS rules consist of **selectors** and **declarations**. A selector targets HTML elements, and declarations define the styles to apply. Each declaration has a **property** and a **value**, separated by a colon.

\`\`\`
selector {
    property: value;
    property: value;
}
\`\`\`

## Ways to Add CSS

There are three ways to apply CSS to an HTML document:
- **Inline** — Using the \`style\` attribute directly on an element
- **Internal** — Using a \`<style>\` tag in the \`<head>\`
- **External** — Linking a separate \`.css\` file with \`<link>\` (recommended)

External stylesheets are the best practice because they keep styles separate from HTML, enable reuse across multiple pages, and allow browser caching.

## The Cascade

The "cascade" in CSS determines which styles win when multiple rules target the same element. The cascade considers:
- **Source order** — Later rules override earlier ones
- **Specificity** — More specific selectors win (Inline > ID > Class > Element)
- **Importance** — \`!important\` overrides normal rules (use sparingly)
- **Origin** — Author styles override browser defaults

## Inheritance

Some CSS properties are **inherited** from parent to child elements (e.g., \`color\`, \`font-family\`, \`line-height\`). Others are not (e.g., \`border\`, \`margin\`, \`padding\`). You can force inheritance with \`inherit\` or reset with \`initial\`/\`unset\`.`,
    keyTakeaways: [
      "CSS controls the visual presentation of HTML content",
      "External stylesheets are the recommended way to add CSS",
      "CSS rules consist of selectors and declaration blocks",
      "The cascade determines which styles win when conflicts arise",
      "Some properties inherit from parent elements, others don't",
    ],
    codeExamples: [
      {
        title: "CSS Selectors & Properties",
        language: "css",
        description: "The fundamental building blocks of CSS — selectors target elements and declarations style them.",
        code: `/* Element Selector — targets all <body> elements */
body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #333;
    margin: 0;
}

/* Class Selector — targets class="container" */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

/* ID Selector — targets id="hero" */
#hero {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 4rem 2rem;
    text-align: center;
}

/* Combinators — target nested elements */
.card > h3 {       /* Direct child */
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
}

.card p {           /* Descendant */
    color: #666;
}`,
      },
      {
        title: "Three Ways to Add CSS",
        language: "html",
        description: "Inline, internal, and external — external is always preferred.",
        code: `<!-- 1. INLINE (avoid when possible) -->
<p style="color: red; font-size: 18px;">Inline styled text</p>

<!-- 2. INTERNAL (ok for single-page demos) -->
<head>
    <style>
        .highlight {
            background: yellow;
            padding: 0.25rem;
        }
    </style>
</head>

<!-- 3. EXTERNAL (best practice) -->
<head>
    <link rel="stylesheet" href="styles.css">
</head>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-intro-ex1",
        title: "Style a Heading",
        instruction: "Write a CSS rule that makes all <h1> elements blue with a font-size of 2rem.",
        startingCode: `h1 {\n    \n}`,
        expectedOutput: `h1 {\n    color: blue;\n    font-size: 2rem;\n}`,
        hints: ["Use the 'color' property for text color", "Use 'font-size' with rem units"],
      },
      {
        id: "css-intro-ex2",
        title: "Select by Class",
        instruction: "Write a CSS rule targeting elements with class 'card' that adds a 1px solid #e5e7eb border and 1.5rem padding.",
        startingCode: `.card {\n    \n}`,
        expectedOutput: `.card {\n    border: 1px solid #e5e7eb;\n    padding: 1.5rem;\n}`,
        hints: ["Class selectors start with a period (.)", "Use the 'border' shorthand property"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 2: Selectors & Specificity
  // ──────────────────────────────────────────
  {
    slug: "selectors-and-specificity",
    title: "Selectors & Specificity",
    difficulty: "beginner",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity",
    content: `CSS selectors are patterns that match elements in the DOM. Specificity is the algorithm browsers use to decide which CSS rule wins when multiple rules target the same element. Mastering both is essential for writing predictable CSS.

## Simple Selectors

- **Element** — \`p { }\` matches all paragraphs
- **Class** — \`.card { }\` matches elements with \`class="card"\`
- **ID** — \`#hero { }\` matches the element with \`id="hero"\`
- **Universal** — \`* { }\` matches everything
- **Attribute** — \`[type="email"] { }\` matches by attribute value

## Combinator Selectors

Combinators describe relationships between selectors:
- **Descendant** — \`.card p { }\` — any \`<p>\` inside \`.card\`
- **Child** — \`.card > p { }\` — direct \`<p>\` children only
- **Adjacent sibling** — \`h2 + p { }\` — \`<p>\` immediately after \`<h2>\`
- **General sibling** — \`h2 ~ p { }\` — all \`<p>\` siblings after \`<h2>\`

## Attribute Selectors

Target elements by their attributes:
- \`[href] { }\` — Has the attribute
- \`[href="url"] { }\` — Exact match
- \`[href^="https"] { }\` — Starts with
- \`[href$=".pdf"] { }\` — Ends with
- \`[href*="google"] { }\` — Contains

## Grouping Selectors

Combine selectors with commas to apply the same styles:
\`h1, h2, h3 { font-weight: 700; }\`

## Specificity Scoring

Specificity is calculated as a score with three components:
- **ID selectors** — Each adds (1,0,0)
- **Class/attribute/pseudo-class** — Each adds (0,1,0)
- **Element/pseudo-element** — Each adds (0,0,1)

Higher scores win. If equal, the later rule wins. Inline styles override all selectors. \`!important\` overrides everything (avoid it).

## Specificity Examples

- \`p { }\` → (0,0,1)
- \`.card { }\` → (0,1,0)
- \`#hero { }\` → (1,0,0)
- \`.card .title { }\` → (0,2,0)
- \`#hero .card p { }\` → (1,1,1)`,
    keyTakeaways: [
      "Selectors match elements by type, class, ID, attributes, or relationships",
      "Specificity is scored: ID (1,0,0) > Class (0,1,0) > Element (0,0,1)",
      "Combinators describe parent-child or sibling relationships",
      "Attribute selectors can match exact values, prefixes, or substrings",
      "Avoid !important — use more specific selectors instead",
    ],
    codeExamples: [
      {
        title: "CSS Selectors Showcase",
        language: "css",
        description: "Every selector type you'll use in real projects.",
        code: `/* Element Selectors */
h1 { font-size: 2.5rem; }
p  { line-height: 1.6; }

/* Class Selectors (most common) */
.btn         { padding: 0.75rem 1.5rem; }
.btn-primary { background: #6366f1; color: white; }
.btn-outline { border: 2px solid #6366f1; color: #6366f1; }

/* ID Selector (use sparingly) */
#main-header { position: sticky; top: 0; }

/* Attribute Selectors */
[type="email"]    { border-color: #6366f1; }
[href^="https"]   { color: green; }
[href$=".pdf"]    { color: red; }
[data-theme="dark"] { background: #0f172a; }

/* Combinators */
.card > h3        { margin: 0; }
.card p           { color: #6b7280; }
h2 + p            { font-size: 1.125rem; }
.active ~ .tab    { opacity: 0.5; }

/* Grouping */
h1, h2, h3 {
    font-weight: 700;
    letter-spacing: -0.01em;
}`,
      },
      {
        title: "Specificity Battle",
        language: "css",
        description: "Understanding which rule wins when multiple rules target the same element.",
        code: `/* Specificity: (0,0,1) — Element */
p { color: black; }

/* Specificity: (0,1,0) — Class WINS over element */
.highlight { color: blue; }

/* Specificity: (0,2,0) — Two classes */
.card .highlight { color: green; }

/* Specificity: (1,0,0) — ID WINS over classes */
#special { color: red; }

/* Specificity: (1,1,1) — ID + Class + Element */
#sidebar .nav-link a { color: purple; }

/* !important overrides everything (AVOID!) */
.override { color: orange !important; }

/* BEST PRACTICE: Keep specificity low and flat */
/* Use single classes for most styling */
.card-title { font-size: 1.25rem; }
.card-body  { padding: 1.5rem; }
.card-link  { color: #6366f1; }`,
      },
    ],
    interactiveExercises: [
      {
        id: "css-spec-ex1",
        title: "Specificity Comparison",
        instruction: "Which selector has higher specificity: '.nav .link' or '#nav a'? Write the winning selector with color: red.",
        startingCode: `/* Which selector wins? */`,
        expectedOutput: `#nav a { color: red; }`,
        hints: ["#nav a = (1,0,1), .nav .link = (0,2,0)", "ID selectors (1,0,0) beat class selectors (0,1,0)"],
      },
      {
        id: "css-spec-ex2",
        title: "Attribute Selector",
        instruction: "Write a CSS rule that targets all links ending with '.pdf' and makes them red.",
        startingCode: `/* Select PDF links */`,
        expectedOutput: `[href$=".pdf"] { color: red; }`,
        hints: ["Use the $= attribute selector for 'ends with'", "Wrap the value in quotes"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 3: Pseudo-classes & Pseudo-elements
  // ──────────────────────────────────────────
  {
    slug: "pseudo-classes-and-elements",
    title: "Pseudo-classes & Pseudo-elements",
    difficulty: "beginner",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes",
    content: `Pseudo-classes and pseudo-elements let you style elements based on their **state**, **position**, or **virtual parts** — without adding extra HTML. They are essential for interactive UIs and polished designs.

## Pseudo-classes (Single Colon :)

Pseudo-classes select elements based on state or position:

### User-Action States
- \`:hover\` — Mouse is over the element
- \`:focus\` — Element has keyboard focus
- \`:active\` — Element is being clicked/pressed
- \`:focus-visible\` — Focus from keyboard navigation (not mouse click)
- \`:visited\` — Link has been visited

### Structural Pseudo-classes
- \`:first-child\` / \`:last-child\` — First or last child element
- \`:nth-child(n)\` — Select by position (even, odd, 2n+1, etc.)
- \`:first-of-type\` / \`:last-of-type\` — First/last of a specific type
- \`:only-child\` — Element is the only child

### Form Pseudo-classes
- \`:required\` / \`:optional\` — Required or optional fields
- \`:valid\` / \`:invalid\` — Validation state
- \`:checked\` — Checked radio/checkbox
- \`:disabled\` / \`:enabled\` — Disabled or enabled fields
- \`:placeholder-shown\` — Input showing its placeholder

### Other Useful Pseudo-classes
- \`:not(selector)\` — Negation (everything that doesn't match)
- \`:is(selector)\` / \`:where(selector)\` — Group selectors concisely
- \`:empty\` — Element has no children
- \`:has(selector)\` — Parent selector (newest, very powerful)

## Pseudo-elements (Double Colon ::)

Pseudo-elements style **virtual parts** of an element:
- \`::before\` / \`::after\` — Insert content before/after (requires \`content\` property)
- \`::first-line\` — First line of text
- \`::first-letter\` — First letter (for drop caps)
- \`::placeholder\` — Input placeholder text
- \`::selection\` — Text selected by the user
- \`::marker\` — List item bullet/number

## Key Difference

Pseudo-classes select **existing elements** in a certain state. Pseudo-elements create **virtual elements** that don't exist in the HTML.`,
    keyTakeaways: [
      "Pseudo-classes (:) style elements based on state or position",
      "Pseudo-elements (::) create virtual content not in the HTML",
      "::before and ::after require the content property to work",
      ":nth-child() enables powerful pattern-based selection",
      ":focus-visible provides keyboard-only focus styles",
    ],
    codeExamples: [
      {
        title: "Pseudo-classes in Action",
        language: "css",
        description: "Styling interactive states, structural positions, and form validation.",
        code: `/* Interactive States */
.btn:hover {
    background: #4f46e5;
    transform: translateY(-1px);
}

.btn:active {
    transform: translateY(0);
}

/* Keyboard-only focus (not on mouse click) */
.btn:focus-visible {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
}

/* Structural: zebra-striped table */
tr:nth-child(even) {
    background: #f9fafb;
}

/* First and last items */
.nav-item:first-child { margin-left: 0; }
.nav-item:last-child  { margin-right: 0; }

/* Negation: all paragraphs except .intro */
p:not(.intro) {
    font-size: 0.875rem;
}

/* Form Validation States */
input:valid {
    border-color: #22c55e;
}

input:invalid:not(:placeholder-shown) {
    border-color: #ef4444;
}

input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Checked state (custom toggles) */
input[type="checkbox"]:checked + label {
    text-decoration: line-through;
    color: #9ca3af;
}`,
      },
      {
        title: "Pseudo-elements",
        language: "css",
        description: "Creating decorative content and styling text parts.",
        code: `/* Required field indicator */
.required-label::after {
    content: " *";
    color: #ef4444;
    font-weight: bold;
}

/* Decorative line under heading */
.section-title::after {
    content: "";
    display: block;
    width: 3rem;
    height: 3px;
    background: #6366f1;
    margin-top: 0.5rem;
    border-radius: 2px;
}

/* Drop Cap */
.article-body::first-letter {
    font-size: 3rem;
    font-weight: 700;
    float: left;
    margin-right: 0.5rem;
    line-height: 1;
    color: #6366f1;
}

/* Custom text selection */
::selection {
    background: #6366f1;
    color: white;
}

/* Custom placeholder */
input::placeholder {
    color: #9ca3af;
    font-style: italic;
}

/* Custom list markers */
li::marker {
    color: #6366f1;
    font-weight: bold;
}`,
      },
    ],
    interactiveExercises: [
      {
        id: "css-pseudo-ex1",
        title: "Zebra Stripes",
        instruction: "Style even table rows with a light gray background (#f9fafb) using a pseudo-class.",
        startingCode: `/* Style even rows */`,
        expectedOutput: `tr:nth-child(even) {\n    background: #f9fafb;\n}`,
        hints: [":nth-child(even) targets even-numbered children", "Use 'background' for the background color"],
      },
      {
        id: "css-pseudo-ex2",
        title: "Required Asterisk",
        instruction: "Use ::after to add a red asterisk (*) after elements with class 'required'.",
        startingCode: `.required::after {\n    \n}`,
        expectedOutput: `.required::after {\n    content: " *";\n    color: red;\n}`,
        hints: ["::after requires the content property", "Set color to red for the asterisk"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 4: Colors & Typography
  // ──────────────────────────────────────────
  {
    slug: "colors-and-typography",
    title: "Colors & Typography",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/color",
    content: `Colors and typography are the foundation of visual design. CSS provides powerful tools for controlling both, from named colors to custom font stacks and typographic scales.

## CSS Color Values

CSS supports multiple ways to define colors:
- **Named colors** — \`red\`, \`blue\`, \`rebeccapurple\` (147 named colors)
- **Hex** — \`#ff0000\`, \`#6366f1\` (6-digit or 3-digit shorthand like \`#f00\`)
- **RGB** — \`rgb(99, 102, 241)\` (red, green, blue 0-255)
- **RGBA** — \`rgba(99, 102, 241, 0.5)\` (with alpha transparency)
- **HSL** — \`hsl(239, 84%, 67%)\` (hue, saturation, lightness)
- **HSLA** — \`hsla(239, 84%, 67%, 0.5)\` (with alpha)

HSL is often the most intuitive — adjust **hue** (0-360 on the color wheel), **saturation** (0% gray to 100% vivid), and **lightness** (0% black to 100% white).

## Backgrounds

CSS provides rich background control:
- \`background-color\` — Solid color
- \`background-image\` — Images or gradients
- \`background-size\` — cover, contain, or specific sizes
- \`background-position\` — Where the background is placed
- \`background: linear-gradient()\` — Gradient backgrounds
- \`background: radial-gradient()\` — Circular gradients

## Typography Properties

Typography controls how text looks:
- \`font-family\` — Which font to use (with fallbacks)
- \`font-size\` — Size of the text (use \`rem\` for scalability)
- \`font-weight\` — Boldness (100-900 or keywords like \`bold\`)
- \`line-height\` — Spacing between lines (1.5-1.75 for body text)
- \`letter-spacing\` — Space between characters
- \`text-align\` — Horizontal alignment (left, center, right, justify)
- \`text-transform\` — Uppercase, lowercase, capitalize
- \`text-decoration\` — Underline, strikethrough, etc.

## Font Stacks & Web Fonts

Always provide fallback fonts. End with a generic family name (\`serif\`, \`sans-serif\`, \`monospace\`). Load custom fonts with \`@font-face\` or Google Fonts. Use \`font-display: swap\` to prevent invisible text while fonts load.`,
    keyTakeaways: [
      "CSS supports hex, RGB, HSL, and named colors",
      "HSL is the most intuitive color model for adjustments",
      "Use rem for font-size to respect user preferences",
      "Always provide font fallbacks in font-family declarations",
      "Line-height of 1.5-1.75 is ideal for body text readability",
    ],
    codeExamples: [
      {
        title: "Color Systems in CSS",
        language: "css",
        description: "The many ways to define colors, from simple names to precise HSL values.",
        code: `/* Hex Colors */
.primary { color: #6366f1; }
.muted   { color: #9ca3af; }

/* RGB / RGBA */
.overlay {
    background: rgba(0, 0, 0, 0.5);
}

/* HSL — Hue (0-360), Saturation %, Lightness % */
.brand-light { color: hsl(239, 84%, 80%); }
.brand       { color: hsl(239, 84%, 67%); }
.brand-dark  { color: hsl(239, 84%, 50%); }

/* Gradients */
.hero {
    background: linear-gradient(135deg, #667eea, #764ba2);
}

.sunset {
    background: linear-gradient(to right, #f97316, #ec4899, #8b5cf6);
}

/* CSS Custom Properties for Theming */
:root {
    --color-primary: hsl(239, 84%, 67%);
    --color-text: hsl(0, 0%, 20%);
    --color-bg: hsl(0, 0%, 100%);
}

body {
    color: var(--color-text);
    background-color: var(--color-bg);
}`,
      },
      {
        title: "Typography System",
        language: "css",
        description: "Building a readable, professional typographic system.",
        code: `/* Base Typography */
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont,
                 'Segoe UI', Roboto, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #1f2937;
}

/* Heading Scale */
h1 { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.025em; }
h2 { font-size: 2rem;   font-weight: 700; letter-spacing: -0.02em; }
h3 { font-size: 1.5rem; font-weight: 600; }
h4 { font-size: 1.25rem; font-weight: 600; }

/* Text Utilities */
.text-muted    { color: #6b7280; }
.text-small    { font-size: 0.875rem; }
.text-center   { text-align: center; }
.text-uppercase { text-transform: uppercase; letter-spacing: 0.05em; }
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Links */
a {
    color: #6366f1;
    text-decoration: none;
    transition: color 0.2s;
}
a:hover {
    color: #4f46e5;
    text-decoration: underline;
}`,
      },
    ],
    interactiveExercises: [
      {
        id: "css-color-ex1",
        title: "Create a Color Variable",
        instruction: "Define a CSS custom property --primary with value #6366f1 on the :root selector, then use it as the color for .btn.",
        startingCode: `:root {\n    \n}\n\n.btn {\n    \n}`,
        expectedOutput: `:root {\n    --primary: #6366f1;\n}\n\n.btn {\n    color: var(--primary);\n}`,
        hints: ["Custom properties start with --", "Access them using var()"],
      },
      {
        id: "css-color-ex2",
        title: "Gradient Background",
        instruction: "Create a linear gradient background that goes from #6366f1 to #ec4899 at a 135deg angle.",
        startingCode: `.hero {\n    \n}`,
        expectedOutput: `.hero {\n    background: linear-gradient(135deg, #6366f1, #ec4899);\n}`,
        hints: ["linear-gradient takes an angle and color stops", "135deg goes from top-left to bottom-right"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 5: The Box Model
  // ──────────────────────────────────────────
  {
    slug: "box-model",
    title: "The Box Model",
    difficulty: "beginner",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model",
    content: `Every element in CSS is treated as a rectangular box. The **CSS Box Model** describes how these boxes are sized and how space is distributed around them. Mastering the box model is essential for controlling layout.

## Box Model Components

From inside out, every box has four areas:
- **Content** — The actual content (text, images, etc.)
- **Padding** — Space between content and the border
- **Border** — A line around the padding
- **Margin** — Space outside the border, separating the element from others

## Content Box vs Border Box

By default, CSS uses \`content-box\` sizing — the \`width\` and \`height\` properties set the size of the **content area only**. Padding and border are added on top, making the element bigger than expected.

With \`border-box\` sizing, \`width\` and \`height\` include content + padding + border. This is much more intuitive and is why virtually all modern projects apply \`box-sizing: border-box\` globally.

## Margin Collapsing

When two vertical margins meet, they don't add up — the larger one wins. This is called **margin collapsing**. Key rules:
- Only **vertical** (top/bottom) margins collapse, never horizontal
- Margins inside **flex** and **grid** containers do NOT collapse
- Padding or border between margins prevents collapsing

## Display Property

The \`display\` property controls how an element generates boxes:
- \`block\` — Takes full width, starts on new line (\`div\`, \`p\`, \`h1\`)
- \`inline\` — Takes only content width, no line break (\`span\`, \`a\`, \`strong\`)
- \`inline-block\` — Like inline but respects width/height/margin
- \`none\` — Removes the element from the layout entirely

## Overflow

When content exceeds the box dimensions:
- \`overflow: visible\` — Content spills out (default)
- \`overflow: hidden\` — Content is clipped
- \`overflow: auto\` — Scrollbars only when needed`,
    keyTakeaways: [
      "The box model has four layers: content, padding, border, margin",
      "Always use box-sizing: border-box for intuitive sizing",
      "Vertical margins collapse — the larger one wins",
      "Padding creates space inside; margin creates space outside",
      "The display property controls block vs inline behavior",
    ],
    codeExamples: [
      {
        title: "Box Model in Action",
        language: "css",
        description: "Understanding how content, padding, border, and margin work together.",
        code: `/* Apply border-box globally (best practice) */
*, *::before, *::after {
    box-sizing: border-box;
}

/* Box Model Example */
.card {
    width: 300px;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    margin-bottom: 1.5rem;
}
/* With border-box: .card is exactly 300px wide total */

/* Margin shorthand: top right bottom left */
.section {
    margin: 2rem 1rem 3rem 1rem;
}

/* Padding shorthand: vertical horizontal */
.container {
    padding: 2rem 1.5rem;
}

/* Auto margin for horizontal centering */
.centered {
    width: 600px;
    margin: 0 auto;
}`,
      },
      {
        title: "Display & Overflow",
        language: "css",
        description: "Controlling how elements are rendered and how content overflow is handled.",
        code: `/* Block vs Inline vs Inline-Block */
.block {
    display: block;
    width: 100%;            /* Takes full width */
    margin-bottom: 1rem;
}

.inline {
    display: inline;
    /* width/height IGNORED, vertical margin IGNORED */
    padding: 0.25rem 0.5rem;
}

.inline-block {
    display: inline-block;
    width: 200px;           /* Width works! */
    padding: 1rem;          /* All padding works */
}

/* Hide but preserve space */
.invisible { visibility: hidden; }

/* Hide completely */
.hidden { display: none; }

/* Overflow handling */
.scroll-container {
    max-height: 300px;
    overflow-y: auto;
}

.text-clip {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}`,
      },
    ],
    interactiveExercises: [
      {
        id: "css-box-ex1",
        title: "Box Sizing Reset",
        instruction: "Write the universal CSS reset that applies border-box sizing to all elements and their pseudo-elements.",
        startingCode: `/* Your CSS here */`,
        expectedOutput: `*, *::before, *::after {\n    box-sizing: border-box;\n}`,
        hints: ["Use * to select all elements", "Include ::before and ::after pseudo-elements"],
      },
      {
        id: "css-box-ex2",
        title: "Center a Block",
        instruction: "Make a .container with max-width of 1024px that is horizontally centered on the page.",
        startingCode: `.container {\n    \n}`,
        expectedOutput: `.container {\n    max-width: 1024px;\n    margin: 0 auto;\n}`,
        hints: ["margin: 0 auto centers a block element", "Use max-width for responsiveness"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 6: Flexbox Layout
  // ──────────────────────────────────────────
  {
    slug: "flexbox",
    title: "Flexbox Layout",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox",
    content: `Flexbox (Flexible Box Layout) is a one-dimensional layout system designed for distributing space and aligning items. It excels at creating navbars, card rows, centering, and responsive layouts.

## Creating a Flex Container

Apply \`display: flex\` to a parent element. Its direct children become **flex items**.

## Main Axis vs Cross Axis

- **Main axis** — The primary direction (row = horizontal, column = vertical)
- **Cross axis** — Perpendicular to the main axis

## Container Properties

- \`flex-direction\` — \`row\`, \`row-reverse\`, \`column\`, \`column-reverse\`
- \`justify-content\` — Align along **main** axis: \`flex-start\`, \`center\`, \`space-between\`, \`space-around\`, \`space-evenly\`
- \`align-items\` — Align along **cross** axis: \`stretch\`, \`flex-start\`, \`center\`, \`flex-end\`, \`baseline\`
- \`flex-wrap\` — \`nowrap\` (default), \`wrap\`, \`wrap-reverse\`
- \`gap\` — Space between items

## Item Properties

- \`flex-grow\` — How much the item grows (0 = don't grow)
- \`flex-shrink\` — How much the item shrinks (1 = can shrink)
- \`flex-basis\` — Starting size before growing/shrinking
- \`flex\` — Shorthand: \`flex: grow shrink basis\`
- \`align-self\` — Override alignment for one item
- \`order\` — Change visual order

## Common Patterns

- Navigation bars (\`space-between\`)
- Card rows (\`flex-wrap: wrap\`)
- Perfect centering (\`justify-content: center; align-items: center\`)
- Footer at bottom (\`flex-direction: column; min-height: 100vh\`)`,
    keyTakeaways: [
      "display: flex creates a flex container with flex items",
      "justify-content aligns along the main axis; align-items along the cross axis",
      "flex: 1 makes items grow equally to fill available space",
      "gap provides clean spacing between flex items",
      "flex-wrap: wrap allows items to flow to the next line",
    ],
    codeExamples: [
      {
        title: "Flexbox Layouts",
        language: "css",
        description: "Essential flexbox patterns for everyday layouts.",
        code: `/* Navigation Bar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

/* Card Row with Wrapping */
.card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.card {
    flex: 1 1 300px;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
}

/* Perfect Centering */
.hero {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Sidebar Layout */
.layout {
    display: flex;
    min-height: 100vh;
}
.sidebar      { flex: 0 0 250px; }
.main-content { flex: 1; padding: 2rem; }`,
      },
      {
        title: "Flex Item Properties",
        language: "css",
        description: "Controlling how individual items grow, shrink, and align.",
        code: `/* flex shorthand: grow shrink basis */
.equal  { flex: 1; }           /* Equal sizing */
.double { flex: 2; }           /* Twice as wide */
.fixed  { flex: 0 0 200px; }  /* Fixed 200px */

/* Override alignment for one item */
.flex-container { display: flex; align-items: center; }
.push-down      { align-self: flex-end; }

/* Push item to the right */
.spacer { margin-left: auto; }

/* Footer at page bottom */
.page         { display: flex; flex-direction: column; min-height: 100vh; }
.page-content { flex: 1; }
.page-footer  { flex: none; }

/* Visual order */
.first { order: -1; }
.last  { order: 999; }`,
      },
    ],
    interactiveExercises: [
      {
        id: "css-flex-ex1",
        title: "Center a Box",
        instruction: "Create a flex container that centers its child both horizontally and vertically, filling the full viewport height.",
        startingCode: `.center {\n    \n}`,
        expectedOutput: `.center {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-height: 100vh;\n}`,
        hints: ["Use display: flex", "justify-content and align-items both set to center"],
      },
      {
        id: "css-flex-ex2",
        title: "Navbar Layout",
        instruction: "Create a navbar with items spread out using space-between and vertically centered.",
        startingCode: `.navbar {\n    display: flex;\n    \n}`,
        expectedOutput: `.navbar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}`,
        hints: ["space-between distributes items evenly", "align-items: center for vertical centering"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 7: CSS Grid
  // ──────────────────────────────────────────
  {
    slug: "css-grid",
    title: "CSS Grid Layout",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids",
    content: `CSS Grid is a two-dimensional layout system for controlling both rows and columns simultaneously. It's ideal for page layouts, dashboards, galleries, and precise placement.

## Creating a Grid

Apply \`display: grid\` to a container. Define the structure with \`grid-template-columns\` and \`grid-template-rows\`.

## The fr Unit

The \`fr\` (fraction) unit distributes available space proportionally. \`1fr 2fr\` gives the second column twice the space.

## Grid Lines and Placement

Items can be placed on specific lines:
- \`grid-column: start / end\` — Column span
- \`grid-row: start / end\` — Row span
- \`grid-column: 1 / -1\` — Span all columns
- \`grid-column: span 2\` — Span 2 columns

## Grid Template Areas

Named areas provide visual layout definitions:
\`grid-template-areas: "sidebar header" "sidebar main"\`

## Auto-fit vs Auto-fill

- \`repeat(auto-fit, minmax(250px, 1fr))\` — Collapses empty tracks
- \`repeat(auto-fill, minmax(250px, 1fr))\` — Keeps empty tracks

## Implicit Grid

Extra items auto-create rows. Control with \`grid-auto-rows: minmax(200px, auto)\`.`,
    keyTakeaways: [
      "CSS Grid handles two-dimensional layouts (rows + columns)",
      "The fr unit distributes space proportionally",
      "grid-template-areas creates visual, readable layouts",
      "auto-fit with minmax() creates responsive grids without media queries",
      "gap provides spacing between grid items without affecting edges",
    ],
    codeExamples: [
      {
        title: "Grid Fundamentals",
        language: "css",
        description: "Creating responsive grids with columns, rows, and auto-placement.",
        code: `/* 3-Column Grid */
.grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

/* Responsive Grid (no media queries!) */
.grid-auto {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

/* Spanning */
.featured { grid-column: 1 / -1; }
.wide     { grid-column: span 2; }

/* Implicit rows with min height */
.gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(200px, auto);
    gap: 1rem;
}`,
      },
      {
        title: "Grid Template Areas",
        language: "css",
        description: "Named areas create intuitive page layouts.",
        code: `/* Dashboard Layout */
.dashboard {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 64px 1fr 48px;
    grid-template-areas:
        "sidebar header"
        "sidebar main"
        "sidebar footer";
    min-height: 100vh;
}

.sidebar { grid-area: sidebar; background: #1e293b; }
.header  { grid-area: header;  background: white; }
.main    { grid-area: main;    padding: 2rem; }
.footer  { grid-area: footer;  background: #f9fafb; }

/* Responsive: Stack on mobile */
@media (max-width: 768px) {
    .dashboard {
        grid-template-columns: 1fr;
        grid-template-areas:
            "header"
            "main"
            "sidebar"
            "footer";
    }
}`,
      },
    ],
    interactiveExercises: [
      {
        id: "css-grid-ex1",
        title: "Responsive Card Grid",
        instruction: "Create a responsive grid that auto-fits cards with a minimum width of 250px and 1.5rem gap.",
        startingCode: `.cards {\n    \n}`,
        expectedOutput: `.cards {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n    gap: 1.5rem;\n}`,
        hints: ["Use repeat() with auto-fit", "minmax() sets the min and max size"],
      },
      {
        id: "css-grid-ex2",
        title: "Span Full Width",
        instruction: "Make an element span all columns in a grid using grid-column.",
        startingCode: `.full-width {\n    \n}`,
        expectedOutput: `.full-width {\n    grid-column: 1 / -1;\n}`,
        hints: ["-1 refers to the last grid line", "grid-column: start / end"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 8: Positioning & Stacking
  // ──────────────────────────────────────────
  {
    slug: "positioning",
    title: "Positioning & Stacking",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/position",
    content: `CSS positioning places elements precisely on the page. Understanding positioning is crucial for dropdowns, tooltips, sticky headers, and modals.

## Position Values

- **static** — Default. Elements flow in order. Offsets have no effect.
- **relative** — Offset from normal position. Still takes up original space. Creates a positioning context for absolute children.
- **absolute** — Removed from flow. Positioned relative to nearest positioned ancestor (or viewport).
- **fixed** — Removed from flow. Positioned relative to the viewport. Stays in place during scrolling.
- **sticky** — Hybrid of relative and fixed. Acts relative until a scroll threshold, then sticks.

## Offset Properties

\`top\`, \`bottom\`, \`left\`, \`right\` — Only work on positioned elements (not static). \`inset\` is shorthand for all four.

## z-index & Stacking Contexts

\`z-index\` controls overlap ordering. Higher values are on top. Only works on positioned elements or flex/grid children. Stacking contexts are triggered by \`position\` + \`z-index\`, \`opacity < 1\`, \`transform\`, \`filter\`.

## The Absolute-Relative Pattern

The most common pattern: \`position: relative\` on a parent creates a context, then \`position: absolute\` on a child positions it within that parent.`,
    keyTakeaways: [
      "static is the default — elements flow in document order",
      "relative creates a positioning context without leaving the flow",
      "absolute positions relative to nearest positioned ancestor",
      "fixed stays relative to the viewport during scrolling",
      "sticky becomes fixed when scrolled past a threshold",
    ],
    codeExamples: [
      {
        title: "CSS Positioning Patterns",
        language: "css",
        description: "Practical positioning for common UI components.",
        code: `/* Absolute inside Relative */
.card {
    position: relative;
}

.card .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ef4444;
    color: white;
    border-radius: 9999px;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
}

/* Fixed Navbar */
.navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 50;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Sticky Sidebar */
.sidebar {
    position: sticky;
    top: 80px;
    height: fit-content;
}`,
      },
      {
        title: "Z-index & Modals",
        language: "css",
        description: "Managing stacking order for overlapping elements.",
        code: `/* Layering System */
:root {
    --z-dropdown: 10;
    --z-sticky:   20;
    --z-backdrop: 40;
    --z-modal:    50;
    --z-tooltip:  60;
}

/* Dropdown */
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: var(--z-dropdown);
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Modal */
.modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: var(--z-backdrop);
    background: rgba(0, 0, 0, 0.5);
}

.modal {
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: var(--z-modal);
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    max-width: 500px; width: 90%;
}`,
      },
    ],
    interactiveExercises: [
      {
        id: "css-pos-ex1",
        title: "Sticky Header",
        instruction: "Make a header that sticks to the top when scrolled, with z-index of 50.",
        startingCode: `.header {\n    \n}`,
        expectedOutput: `.header {\n    position: sticky;\n    top: 0;\n    z-index: 50;\n}`,
        hints: ["Use position: sticky", "Set top: 0 to stick at the top"],
      },
      {
        id: "css-pos-ex2",
        title: "Absolute Badge",
        instruction: "Position a .badge absolutely in the top-right corner of its .card parent.",
        startingCode: `.card {\n    \n}\n\n.card .badge {\n    \n}`,
        expectedOutput: `.card {\n    position: relative;\n}\n\n.card .badge {\n    position: absolute;\n    top: -8px;\n    right: -8px;\n}`,
        hints: ["Parent needs position: relative", "Child uses position: absolute with top/right"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 9: Transitions & Animations
  // ──────────────────────────────────────────
  {
    slug: "transitions-and-animations",
    title: "Transitions & Animations",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions",
    content: `CSS transitions and animations bring your interface to life. Transitions handle simple state changes (hover, focus), while keyframe animations handle complex, multi-step sequences.

## CSS Transitions

Transitions smoothly animate property changes:
- \`transition-property\` — Which property to animate
- \`transition-duration\` — How long (\`0.2s\`, \`300ms\`)
- \`transition-timing-function\` — The curve (\`ease\`, \`ease-in-out\`, \`linear\`)
- \`transition-delay\` — Wait before starting

Shorthand: \`transition: property duration timing-function delay\`

## CSS Transforms

Transforms modify an element visually without affecting layout:
- \`translate(x, y)\` — Move
- \`scale(x, y)\` — Resize
- \`rotate(angle)\` — Rotate
- \`skew(x, y)\` — Skew

Transforms are GPU-accelerated = excellent performance.

## Keyframe Animations

For multi-step sequences:
- Define with \`@keyframes name { from { } to { } }\`
- Apply with \`animation: name duration timing-function iteration-count\`
- \`animation-fill-mode: forwards\` — Keep final state after animation
- \`animation-direction: alternate\` — Play back and forth

## Performance

Only animate \`transform\` and \`opacity\` for smooth 60fps. These are composited on the GPU. Avoid animating \`width\`, \`height\`, \`margin\`, or \`top\`/\`left\`.`,
    keyTakeaways: [
      "Transitions animate property changes between two states",
      "Use transform and opacity for performant animations",
      "@keyframes defines multi-step animation sequences",
      "ease-in-out is the most natural-feeling timing function",
      "Avoid animating layout properties like width, height, margin",
    ],
    codeExamples: [
      {
        title: "Transitions & Transforms",
        language: "css",
        description: "Smooth hover effects and interactive feedback.",
        code: `/* Button Hover */
.btn {
    background: #6366f1;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn:hover {
    background: #4f46e5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.btn:active { transform: translateY(0); }

/* Card Lift */
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* Smooth color transition */
.nav-link {
    color: #6b7280;
    transition: color 0.15s ease;
}
.nav-link:hover { color: #1f2937; }`,
      },
      {
        title: "Keyframe Animations",
        language: "css",
        description: "Complex multi-step animations with @keyframes.",
        code: `/* Fade In from Below */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in { animation: fadeInUp 0.5s ease-out forwards; }

/* Pulse */
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.05); }
}

.pulse { animation: pulse 2s ease-in-out infinite; }

/* Loading Spinner */
@keyframes spin {
    to { transform: rotate(360deg); }
}

.spinner {
    width: 2rem; height: 2rem;
    border: 3px solid #e5e7eb;
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

/* Staggered Entrance */
.card { animation: fadeInUp 0.5s ease-out both; }
.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }`,
      },
    ],
    interactiveExercises: [
      {
        id: "css-anim-ex1",
        title: "Hover Transition",
        instruction: "Add a transition to a button that changes background-color over 0.3s with ease-in-out timing.",
        startingCode: `.btn {\n    background-color: #6366f1;\n    \n}`,
        expectedOutput: `.btn {\n    background-color: #6366f1;\n    transition: background-color 0.3s ease-in-out;\n}`,
        hints: ["transition shorthand: property duration timing-function"],
      },
      {
        id: "css-anim-ex2",
        title: "Spinner Animation",
        instruction: "Create a @keyframes 'spin' that rotates 360deg, then apply it as an infinite linear animation.",
        startingCode: `@keyframes spin {\n    \n}\n\n.spinner {\n    \n}`,
        expectedOutput: `@keyframes spin {\n    to { transform: rotate(360deg); }\n}\n\n.spinner {\n    animation: spin 1s linear infinite;\n}`,
        hints: ["Use 'to' for the end state", "animation: name duration timing iteration"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 10: Responsive Design
  // ──────────────────────────────────────────
  {
    slug: "responsive-design",
    title: "Responsive Design",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design",
    content: `Responsive design ensures your website works on every device — phones to ultra-wide monitors. Key techniques: fluid layouts, media queries, flexible images, and modern CSS functions.

## The Viewport Meta Tag

Every responsive page needs: \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`

## Mobile-First Approach

Start with small-screen styles, then enhance for larger screens using \`min-width\` media queries.

## Media Queries

- \`@media (min-width: 640px)\` — Small tablets
- \`@media (min-width: 768px)\` — Tablets
- \`@media (min-width: 1024px)\` — Desktops
- \`@media (prefers-color-scheme: dark)\` — Dark mode
- \`@media (prefers-reduced-motion)\` — Accessibility

## Relative Units

- \`rem\` — Relative to root font-size (best for sizing)
- \`em\` — Relative to parent font-size
- \`vw\`/\`vh\` — Viewport width/height
- \`dvh\` — Dynamic viewport height (mobile address bar)

## Fluid Typography

\`clamp(min, preferred, max)\` — e.g., \`clamp(1rem, 2.5vw, 2.5rem)\`

## Container Queries

Style based on container size, not viewport. Perfect for reusable components.`,
    keyTakeaways: [
      "Always include the viewport meta tag",
      "Mobile-first: base styles for small screens, enhance with min-width",
      "Use rem for consistent, accessible sizing",
      "clamp() creates fluid values without media queries",
      "Container queries enable component-level responsiveness",
    ],
    codeExamples: [
      {
        title: "Mobile-First Layout",
        language: "css",
        description: "Building responsive pages from mobile up.",
        code: `/* Mobile Base */
.container {
    padding: 1rem;
    width: 100%;
}

.heading { font-size: clamp(1.5rem, 4vw, 3rem); }

.layout {
    display: grid;
    gap: 2rem;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
        max-width: 768px;
        margin: 0 auto;
    }
    .layout { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    .container { max-width: 1024px; }
    .layout { grid-template-columns: repeat(3, 1fr); }
}

/* Fluid Images */
img { max-width: 100%; height: auto; }

/* Show/hide by breakpoint */
.desktop-only { display: none; }
@media (min-width: 768px) {
    .desktop-only { display: block; }
    .mobile-only  { display: none; }
}`,
      },
      {
        title: "Advanced Responsive Patterns",
        language: "css",
        description: "Container queries, fluid spacing, and user preferences.",
        code: `/* Container Queries */
.card-wrapper { container-type: inline-size; }

@container (min-width: 400px) {
    .card { display: flex; gap: 1.5rem; }
}

/* Fluid Spacing */
.section { padding: clamp(1rem, 5vw, 4rem); }

/* Responsive hero title */
.hero-title {
    font-size: clamp(2rem, 5vw + 1rem, 5rem);
    line-height: 1.1;
}

/* Accessibility: reduced motion */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
    :root {
        --color-bg: #0f172a;
        --color-text: #f1f5f9;
    }
}

/* Responsive image cropping */
.hero-img {
    width: 100%;
    height: clamp(200px, 40vw, 500px);
    object-fit: cover;
}`,
      },
    ],
    interactiveExercises: [
      {
        id: "css-resp-ex1",
        title: "Mobile-First Grid",
        instruction: "Write a media query that changes .grid from 1 column to 3 columns at 1024px.",
        startingCode: `.grid {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n}\n\n/* Media query here */`,
        expectedOutput: `.grid {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n}\n\n@media (min-width: 1024px) {\n    .grid {\n        grid-template-columns: repeat(3, 1fr);\n    }\n}`,
        hints: ["Use min-width for mobile-first", "1024px is a desktop breakpoint"],
      },
      {
        id: "css-resp-ex2",
        title: "Fluid Typography",
        instruction: "Set a heading's font-size using clamp() with min 1.5rem, preferred 4vw, max 3rem.",
        startingCode: `.heading {\n    \n}`,
        expectedOutput: `.heading {\n    font-size: clamp(1.5rem, 4vw, 3rem);\n}`,
        hints: ["clamp(min, preferred, max)", "vw units scale with viewport"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 11: CSS Variables & Custom Properties
  // ──────────────────────────────────────────
  {
    slug: "css-variables",
    title: "CSS Variables & Custom Properties",
    difficulty: "advanced",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",
    content: `CSS Custom Properties (CSS Variables) let you define reusable values. They make theming, dark mode, and design systems much easier.

## Defining & Using Variables

Define with \`--\` prefix, usually on \`:root\`: \`--primary: #6366f1;\`
Access with \`var()\`: \`color: var(--primary);\`

## Scope & Inheritance

Variables cascade and inherit. Override on any element to change values for that subtree — a \`.dark-section\` can redefine \`--bg\` and all children adapt automatically.

## Fallback Values

\`var(--accent, #6366f1)\` — Uses #6366f1 if --accent isn't defined.

## Dynamic with JavaScript

Read/update at runtime:
\`document.documentElement.style.setProperty('--primary', '#ef4444');\`

## Dark Mode

Define two sets of variable values and switch via media query or class toggle. The entire site updates because all styles reference the same variables.

## Design Tokens

Variables are ideal for design tokens: colors, spacing scales, radii, shadows, typography.`,
    keyTakeaways: [
      "CSS variables are defined with -- prefix and accessed with var()",
      "Define global variables on :root for site-wide use",
      "Variables cascade and inherit, allowing local overrides",
      "var() supports fallback values as a second argument",
      "JavaScript can dynamically update CSS variables at runtime",
    ],
    codeExamples: [
      {
        title: "Design System Tokens",
        language: "css",
        description: "Building a complete design system with custom properties.",
        code: `/* Design Tokens */
:root {
    --color-primary: #6366f1;
    --color-primary-hover: #4f46e5;
    --color-bg: #ffffff;
    --color-surface: #f9fafb;
    --color-text: #1f2937;
    --color-text-muted: #6b7280;
    --color-border: #e5e7eb;

    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;

    --radius-sm: 0.375rem;
    --radius-md: 0.75rem;
    --radius-full: 9999px;

    --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}

/* Usage */
.card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-6);
    box-shadow: var(--shadow-sm);
}

.btn-primary {
    background: var(--color-primary);
    color: white;
    padding: var(--space-2) var(--space-6);
    border-radius: var(--radius-sm);
}`,
      },
      {
        title: "Dark Mode Toggle",
        language: "css",
        description: "One set of rules, two themes — powered by CSS variables.",
        code: `/* Light theme (default) */
:root {
    --bg: #ffffff;
    --surface: #f9fafb;
    --text: #1f2937;
    --text-muted: #6b7280;
    --border: #e5e7eb;
}

/* Dark theme via media query */
@media (prefers-color-scheme: dark) {
    :root {
        --bg: #0f172a;
        --surface: #1e293b;
        --text: #f1f5f9;
        --text-muted: #94a3b8;
        --border: #334155;
    }
}

/* OR: via class toggle (JS-controlled) */
[data-theme="dark"] {
    --bg: #0f172a;
    --surface: #1e293b;
    --text: #f1f5f9;
    --border: #334155;
}

/* Everything adapts automatically */
body { background: var(--bg); color: var(--text); }
.card { background: var(--surface); border-color: var(--border); }

/* Local override */
.dark-section {
    --bg: #1e293b;
    --text: #f1f5f9;
    background: var(--bg);
    color: var(--text);
}`,
      },
    ],
    interactiveExercises: [
      {
        id: "css-var-ex1",
        title: "Theme Variables",
        instruction: "Define --primary on :root and use it for a button's background-color.",
        startingCode: `:root {\n    \n}\n\n.btn {\n    \n}`,
        expectedOutput: `:root {\n    --primary: #6366f1;\n}\n\n.btn {\n    background-color: var(--primary);\n}`,
        hints: ["Custom properties start with --", "Use var() to reference them"],
      },
      {
        id: "css-var-ex2",
        title: "Fallback Value",
        instruction: "Set color using var() with --accent as the variable and #6366f1 as the fallback.",
        startingCode: `.highlight {\n    \n}`,
        expectedOutput: `.highlight {\n    color: var(--accent, #6366f1);\n}`,
        hints: ["var() takes an optional second argument", "Syntax: var(--name, fallback)"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 12: Modern CSS Features
  // ──────────────────────────────────────────
  {
    slug: "modern-css",
    title: "Modern CSS Features",
    difficulty: "advanced",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    content: `CSS is evolving rapidly. Modern features like container queries, :has(), cascade layers, native nesting, and logical properties reduce the need for JavaScript and complex workarounds.

## Container Queries

Style based on **container** size, not viewport:
- \`container-type: inline-size\` on parent
- \`@container (min-width: 400px) { }\` to query

## :has() — The Parent Selector

Select elements based on descendants:
- \`.card:has(img)\` — Cards with images
- \`form:has(:invalid)\` — Forms with invalid inputs
- \`.grid:has(> :nth-child(4))\` — Grids with 4+ items

## Cascade Layers

\`@layer\` controls cascade order explicitly:
\`@layer base, components, utilities;\`

## Native CSS Nesting

Like Sass, now built into CSS:
\`.card { & .title { font-weight: bold; } &:hover { opacity: 0.9; } }\`

## Logical Properties

Direction-agnostic CSS:
- \`margin-inline\` = left + right
- \`padding-block\` = top + bottom

## Other Features

- \`aspect-ratio: 16 / 9\` — Maintain proportions
- \`accent-color\` — Style native form controls
- \`:is()\`/\`:where()\` — Efficient selector grouping
- \`color-mix()\` — Blend colors
- \`text-wrap: balance\` — Even heading lines`,
    keyTakeaways: [
      "Container queries enable truly responsive components",
      ":has() selects parents based on their children",
      "@layer gives explicit control over cascade ordering",
      "Native CSS nesting reduces repetition",
      "Logical properties work across text directions",
    ],
    codeExamples: [
      {
        title: "Container Queries & :has()",
        language: "css",
        description: "Component-level responsiveness and parent selection.",
        code: `/* Container Queries */
.card-wrapper { container-type: inline-size; }

.card { display: block; padding: 1rem; }

@container (min-width: 400px) {
    .card {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 1rem;
    }
}

/* :has() — Parent selector */
.card:has(img) {
    grid-template-rows: 200px auto;
}

form:has(:invalid) .submit-btn {
    opacity: 0.5;
    pointer-events: none;
}

.input-group:has(input:focus) {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}`,
      },
      {
        title: "Layers, Nesting & Logical Properties",
        language: "css",
        description: "Cascade control, native nesting, and direction-agnostic CSS.",
        code: `/* Cascade Layers */
@layer base, components, utilities;

@layer base {
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
    }
}

@layer components {
    /* Native CSS Nesting */
    .card {
        padding: 1.5rem;
        border-radius: 0.75rem;

        & .title {
            font-size: 1.25rem;
            font-weight: 600;
        }

        &:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
    }
}

@layer utilities {
    .sr-only {
        position: absolute;
        width: 1px; height: 1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
    }
}

/* Logical Properties */
.card {
    margin-inline: auto;
    padding-block: 1.5rem;
    padding-inline: 2rem;
    border-inline-start: 3px solid #6366f1;
}

/* Modern Utilities */
.video { aspect-ratio: 16 / 9; width: 100%; }
.balanced { text-wrap: balance; }
input[type="checkbox"] { accent-color: #6366f1; }`,
      },
    ],
    interactiveExercises: [
      {
        id: "css-modern-ex1",
        title: "Aspect Ratio",
        instruction: "Create a video container with 16:9 aspect ratio at 100% width.",
        startingCode: `.video {\n    \n}`,
        expectedOutput: `.video {\n    width: 100%;\n    aspect-ratio: 16 / 9;\n}`,
        hints: ["aspect-ratio takes width / height"],
      },
      {
        id: "css-modern-ex2",
        title: "Container Query",
        instruction: "Make .wrapper a size container, then at 500px min-width give .card display: flex.",
        startingCode: `.wrapper {\n    \n}\n\n/* Container query */`,
        expectedOutput: `.wrapper {\n    container-type: inline-size;\n}\n\n@container (min-width: 500px) {\n    .card { display: flex; }\n}`,
        hints: ["container-type: inline-size on parent", "@container works like @media for containers"],
      },
    ],
  },
];
