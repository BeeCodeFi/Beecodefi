import { TutorialLesson } from "@/types";

export const cssLessons: TutorialLesson[] = [
  // ─── Lesson 1: Introduction to CSS ───────────────────────────────────────
  {
    slug: "introduction",
    title: "Introduction to CSS",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/What_is_CSS",
    content: `You know how HTML gives your page structure — headings, paragraphs, buttons. But everything looks plain and boring. That's where CSS comes in.

**CSS** stands for **Cascading Style Sheets**. It controls how your HTML looks — colors, fonts, sizes, spacing, layout, animations. Every beautiful website you've ever visited uses CSS.

## What Does CSS Actually Do?

Think of your website like a house:
- **HTML** is the bricks and walls (structure)
- **CSS** is the paint, furniture, and decoration (appearance)
- **JavaScript** is the electricity and plumbing (behavior)

Without CSS, every page looks like a black-and-white Word document. With CSS, you control every visual detail.

## How CSS Works: Rules

CSS is made of **rules**. A rule has two parts:

1. **Selector** — Which HTML element to style
2. **Declaration block** — What styles to apply

\`\`\`
selector {
    property: value;
    property: value;
}
\`\`\`

For example, this makes all paragraphs blue with bigger text:

\`\`\`
p {
    color: blue;
    font-size: 18px;
}
\`\`\`

## Three Ways to Add CSS

**1. Inline** — Written directly on the HTML element. Quick but messy.
\`<p style="color: red;">Hello</p>\`

**2. Internal** — Inside a \`<style>\` tag in the \`<head>\`. Fine for one page.

**3. External** — A separate \`.css\` file linked with \`<link>\`. This is the **best practice** for real projects because you can style hundreds of pages from one file.

## What is the "Cascade"?

The "C" in CSS stands for **Cascading**. When multiple rules try to style the same element, CSS has rules to decide which one wins. We'll cover this in detail later. For now, just know:
- More specific rules win over general ones
- Rules written later in the file override earlier ones

## CSS is Not a Programming Language

Just like HTML, CSS has no logic — no if-statements, no loops. It's a **description language**. You describe how things should look, and the browser applies it.`,
    keyTakeaways: [
      "CSS controls the visual appearance of your HTML",
      "A CSS rule = selector + declaration block { property: value; }",
      "External .css files are the best practice for real projects",
      "The 'cascade' decides which rule wins when multiple rules conflict",
      "CSS is a description language, not a programming language",
    ],
    codeExamples: [
      {
        title: "Your First CSS Rules",
        language: "html",
        description: "See how CSS transforms plain HTML into something beautiful.",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: sans-serif;
      background: #f0f4ff;
      padding: 2rem;
    }

    h1 {
      color: #6366f1;
      font-size: 2rem;
    }

    p {
      color: #374151;
      line-height: 1.7;
      max-width: 500px;
    }

    .highlight {
      background: #fef9c3;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>Hello, CSS!</h1>
  <p>This page uses CSS to add <span class="highlight">color</span>,
     spacing, and style to plain HTML.</p>
  <p>Without CSS, this would just be black text on a white background.</p>
</body>
</html>`,
        livePreview: true,
      },
      {
        title: "Inline vs Internal vs External",
        language: "html",
        description: "The three ways to write CSS — and why external is best.",
        code: `<!-- WAY 1: Inline (avoid — hard to maintain) -->
<p style="color: red; font-size: 18px;">Red inline text</p>

<!-- WAY 2: Internal (ok for demos) -->
<head>
  <style>
    .box {
      background: #6366f1;
      color: white;
      padding: 1rem;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="box">Styled with internal CSS</div>
</body>

<!-- WAY 3: External (best practice) -->
<!-- In your HTML file: -->
<head>
  <link rel="stylesheet" href="styles.css">
</head>

<!-- In styles.css file: -->
/* All your styles go here */
body { font-family: sans-serif; }`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-intro-1",
        title: "Style a Heading",
        instruction: "Write a CSS rule that makes all <h1> elements have color: indigo and font-size: 2rem.",
        startingCode: `h1 {\n\n}`,
        expectedOutput: `h1 {\n    color: indigo;\n    font-size: 2rem;\n}`,
        hints: [
          "Selectors go before the { curly braces }",
          "Each declaration ends with a semicolon",
          "color sets text color, font-size sets the size",
        ],
      },
      {
        id: "css-intro-2",
        title: "Style by Class",
        instruction: "Write a CSS rule for elements with class 'card' — give it a white background, 1rem padding, and a border-radius of 8px.",
        startingCode: `.card {\n\n}`,
        expectedOutput: `.card {\n    background: white;\n    padding: 1rem;\n    border-radius: 8px;\n}`,
        hints: [
          "Class selectors start with a dot: .classname",
          "background sets the background color",
          "border-radius rounds the corners",
        ],
      },
      {
        id: "css-intro-3",
        title: "Multiple Properties",
        instruction: "Style the body element: set font-family to sans-serif, background-color to #f9fafb, and color to #1f2937.",
        startingCode: `body {\n\n}`,
        expectedOutput: `body {\n    font-family: sans-serif;\n    background-color: #f9fafb;\n    color: #1f2937;\n}`,
        hints: [
          "The body selector targets the whole page",
          "font-family sets the font",
          "color sets text color, background-color sets the page background",
        ],
      },
      {
        id: "css-intro-4",
        title: "Comment Your CSS",
        instruction: "Add a CSS comment that says 'Base styles' above this rule: body { margin: 0; }",
        startingCode: `body {\n    margin: 0;\n}`,
        expectedOutput: `/* Base styles */\nbody {\n    margin: 0;\n}`,
        hints: [
          "CSS comments use /* text here */",
          "Comments are ignored by the browser",
          "Put the comment on the line above the rule",
        ],
      },
    ],
  },

  // ─── Lesson 2: The Cascade & Inheritance ──────────────────────────────
  {
    slug: "cascade-and-inheritance",
    title: "The Cascade & Inheritance",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade",
    content: `CSS can feel magical because many rules can target the same element at once. The **cascade** decides which rule wins, while **inheritance** lets some properties flow from a parent to its children automatically.

## How the Cascade Works
When multiple rules apply to the same element, the browser uses a priority order:

1. **Importance** — \`!important\` beats normal rules
2. **Origin** — browser, user, and author styles
3. **Specificity** — more specific selectors win
4. **Source order** — later rules win if everything else is equal

## Specificity in Plain English
- **ID** selectors like \`#hero\` are very specific
- **Class** selectors like \`.card\` are less specific
- **Element** selectors like \`p\` are the least specific

## Inheritance
Some CSS properties **inherit** from parent to child automatically. For example, text color and font-family often pass down.

Other properties, like borders, margins, and padding, do not inherit by default.

## Why This Matters
This is the reason one rule can override another unexpectedly. Understanding cascade and inheritance helps you write CSS that behaves predictably and stay easier to debug.

### Example
\`\`\`css
body {
  color: #222;
  font-family: sans-serif;
}

.card {
  color: blue;
}
\`\`\`

Even though \`body\` sets a color, the more specific \`.card\` rule will override it for elements with that class.
`,
    keyTakeaways: [
      "The cascade decides which conflicting rule wins",
      "Specificity is a scoring system based on selector type",
      "Inheritance passes some properties from parent to child",
      "Later rules can win when specificity is equal",
      "Understanding cascade and inheritance makes CSS easier to debug",
    ],
    codeExamples: [
      {
        title: "Cascade in Action",
        language: "html",
        description: "See how specificity and order change which rule is applied.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { color: #334155; font-family: sans-serif; }
  .card { color: blue; }
  p { color: green; }
</style>
</head>
<body>
  <div class="card">
    <p>This paragraph uses the more specific class rule.</p>
  </div>
</body>
</html>`,
        livePreview: true,
      },
      {
        title: "Inherited vs Non-Inherited Properties",
        language: "html",
        description: "Color inherits, but border and margin do not.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  .parent {
    color: purple;
    font-family: serif;
    border: 2px solid #4f46e5;
  }
</style>
</head>
<body>
  <div class="parent">
    <p>This text inherits the parent's color and font.</p>
  </div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-cascade-1",
        title: "Specificity Order",
        instruction: "Write a rule for .card that gives it color: purple and padding: 1rem.",
        startingCode: `.card {

}`,
        expectedOutput: `.card {
    color: purple;
    padding: 1rem;
}`,
        hints: ["Use a class selector with a dot", "color changes text color", "padding adds space inside the box"],
      },
      {
        id: "css-cascade-2",
        title: "Inheritance Example",
        instruction: "Write a rule for .parent that makes its children inherit a font-family of Georgia.",
        startingCode: `.parent {

}`,
        expectedOutput: `.parent {
    font-family: Georgia;
}`,
        hints: ["font-family is an inherited property", "Apply the rule to the parent element"],
      },
      {
        id: "css-cascade-3",
        title: "Later Rule Wins",
        instruction: "Write two rules so the last one wins for all paragraphs: first color black, then color orange.",
        startingCode: `p {
    color: black;
}

p {

}`,
        expectedOutput: `p {
    color: black;
}

p {
    color: orange;
}`,
        hints: ["The later rule overrides the earlier one when specificity is the same"],
      },
    ],
  },

  // ─── Lesson 3: Selectors & Specificity ──────────────────────────────────
  {
    slug: "selectors-and-specificity",
    title: "Selectors & Specificity",
    difficulty: "beginner",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity",
    content: `Selectors are how you tell CSS *which* HTML elements to style. The more selectors you learn, the more precise control you have. Specificity is the scoring system that decides which rule wins when two rules conflict.

## The Basic Selectors

**Element selector** — targets every element of that type.
\`p { color: gray; }\` — every \`<p>\` on the page becomes gray.

**Class selector** — targets elements with a specific class. Starts with a dot.
\`.highlight { background: yellow; }\` — every element with \`class="highlight"\`.

**ID selector** — targets one unique element. Starts with #. Use sparingly.
\`#hero { font-size: 3rem; }\` — the one element with \`id="hero"\`.

**Universal selector** — targets everything. Often used for resets.
\`* { box-sizing: border-box; }\`

## Combining Selectors

**Descendant** — targets elements inside other elements.
\`.card p { color: gray; }\` — any \`<p>\` anywhere inside \`.card\`.

**Direct child** — only direct children, not grandchildren.
\`.card > h3 { margin: 0; }\`

**Adjacent sibling** — the element directly after another.
\`h2 + p { font-size: 1.1rem; }\` — a \`<p>\` that comes right after an \`<h2>\`.

**Grouping** — apply same styles to multiple selectors.
\`h1, h2, h3 { font-weight: bold; }\`

## Attribute Selectors

Target elements based on their HTML attributes:
- \`[type="email"]\` — exact match
- \`[href^="https"]\` — starts with
- \`[href$=".pdf"]\` — ends with
- \`[class*="btn"]\` — contains

## Specificity: The Points System

When two rules target the same element, specificity decides the winner. Think of it like points:

| Selector type | Points |
|---|---|
| Inline style | 1000 |
| ID selector (#) | 100 |
| Class, attribute, pseudo-class | 10 |
| Element, pseudo-element | 1 |

Higher points = wins. If tied, the rule that comes **later** in the file wins.

So \`.card p\` = 10+1 = **11 points**, but \`#hero p\` = 100+1 = **101 points** — the ID wins.

**Best practice:** Keep specificity low. Use classes for most styling. Avoid IDs and \`!important\`.`,
    keyTakeaways: [
      "Element (p), Class (.name), and ID (#name) are the three core selectors",
      "Descendant selectors (.parent .child) target nested elements",
      "Specificity scores: ID=100, Class=10, Element=1",
      "The higher specificity score wins; ties go to the later rule",
      "Avoid !important — it makes CSS unpredictable",
    ],
    codeExamples: [
      {
        title: "Every Selector Type",
        language: "html",
        description: "See all selector types working together in one example.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  /* Element */
  p { color: #374151; line-height: 1.6; }

  /* Class */
  .card { background: white; border: 1px solid #e5e7eb;
          padding: 1.5rem; border-radius: 8px; margin: 1rem 0; }

  /* Descendant */
  .card p { font-size: 0.9rem; color: #6b7280; }

  /* Direct child */
  .card > h3 { margin-top: 0; color: #111827; }

  /* Grouping */
  h1, h2, h3 { font-family: sans-serif; }

  /* Attribute */
  a[href^="https"] { color: green; }
  a[href$=".pdf"]  { color: red; }

  /* Adjacent sibling */
  h3 + p { font-style: italic; }
</style>
</head>
<body>
  <h1>Selector Demo</h1>
  <div class="card">
    <h3>Card Title</h3>
    <p>This paragraph is inside a card — smaller and gray.</p>
    <p>Second paragraph — also italic because it follows h3.</p>
    <a href="https://example.com">HTTPS link (green)</a> |
    <a href="doc.pdf">PDF link (red)</a>
  </div>
</body>
</html>`,
        livePreview: true,
      },
      {
        title: "Specificity in Action",
        language: "html",
        description: "Watch which rules win based on specificity scores.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  /* 1 point — element */
  p { color: black; }

  /* 10 points — class WINS over element */
  .featured { color: blue; }

  /* 20 points — two classes */
  .card .featured { color: green; }

  /* 100 points — ID WINS over everything */
  #special { color: red; }
</style>
</head>
<body>
  <p>Plain black paragraph (1pt)</p>
  <p class="featured">Blue featured (10pts)</p>
  <div class="card">
    <p class="featured">Green — two classes (20pts)</p>
  </div>
  <p id="special" class="featured">RED — ID wins (100pts)</p>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-sel-1",
        title: "PDF Link Selector",
        instruction: "Write an attribute selector that targets links ending in '.pdf' and makes them red.",
        startingCode: `/* Target PDF links */\n`,
        expectedOutput: `[href$=".pdf"] {\n    color: red;\n}`,
        hints: [
          "$= means 'ends with' in attribute selectors",
          "Attribute selectors use square brackets [attr=value]",
          "Wrap the value in quotes",
        ],
      },
      {
        id: "css-sel-2",
        title: "Descendant vs Child",
        instruction: "Write two rules: one using descendant selector for any .link inside .nav, one using direct child for only direct .link children of .nav.",
        startingCode: `/* Descendant */\n\n\n/* Direct child */`,
        expectedOutput: `.nav .link {\n    color: blue;\n}\n\n.nav > .link {\n    font-weight: bold;\n}`,
        hints: [
          "Descendant: .parent .child (space between)",
          "Direct child: .parent > .child (> arrow between)",
        ],
      },
      {
        id: "css-sel-3",
        title: "Group Selectors",
        instruction: "Write one CSS rule that sets font-weight: 700 on h1, h2, and h3 all at once.",
        startingCode: `/* Group these headings */`,
        expectedOutput: `h1, h2, h3 {\n    font-weight: 700;\n}`,
        hints: [
          "Use commas to group selectors",
          "Each selector separated by a comma gets the same styles",
        ],
      },
      {
        id: "css-sel-4",
        title: "Adjacent Sibling",
        instruction: "Write a rule that targets a <p> that comes directly after an <h2> and gives it font-size: 1.125rem.",
        startingCode: `/* p right after h2 */`,
        expectedOutput: `h2 + p {\n    font-size: 1.125rem;\n}`,
        hints: [
          "The + combinator selects the adjacent sibling",
          "h2 + p means: a p immediately following an h2",
        ],
      },
    ],
  },

  // ─── Lesson 3: Pseudo-classes & Pseudo-elements ──────────────────────────
  {
    slug: "pseudo-classes-and-elements",
    title: "Pseudo-classes & Pseudo-elements",
    difficulty: "beginner",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes",
    content: `Pseudo-classes and pseudo-elements let you style elements based on their **state** or **position** — without adding any extra HTML. They're how you make buttons change color on hover, style every other table row, or add decorative content automatically.

## Pseudo-classes (Single Colon :)

A pseudo-class targets an element in a **specific state or position**. You write it as \`selector:pseudo-class\`.

### Interaction States (Most Common)

- \`:hover\` — The mouse is over the element. Great for buttons and links.
- \`:focus\` — The element has keyboard focus (someone tabbed to it).
- \`:active\` — The element is being clicked right now.
- \`:visited\` — A link the user has already visited.

### Structural (Position-Based)

- \`:first-child\` — The first child of its parent.
- \`:last-child\` — The last child.
- \`:nth-child(n)\` — Super powerful. Select by position.
  - \`:nth-child(2)\` — The second child
  - \`:nth-child(odd)\` — Every odd child (1st, 3rd, 5th...)
  - \`:nth-child(even)\` — Every even child (2nd, 4th...)
  - \`:nth-child(3n)\` — Every 3rd child
- \`:only-child\` — The element is the only child.

### Form States

- \`:required\` / \`:optional\` — Required or not.
- \`:valid\` / \`:invalid\` — Based on HTML validation.
- \`:checked\` — A checked checkbox or radio button.
- \`:disabled\` — A disabled input.
- \`:placeholder-shown\` — Input currently showing placeholder text.

### Logical

- \`:not(.something)\` — Everything that does NOT match.
- \`:is(h1, h2, h3)\` — Shorter way to group selectors.

## Pseudo-elements (Double Colon ::)

Pseudo-elements style **virtual parts** of an element — parts that don't literally exist in the HTML.

- \`::before\` — Insert virtual content before the element's content.
- \`::after\` — Insert virtual content after.
- \`::first-letter\` — Just the first letter of text.
- \`::first-line\` — Just the first line of text.
- \`::placeholder\` — The placeholder text in inputs.
- \`::selection\` — Text the user has highlighted/selected.
- \`::marker\` — The bullet or number in a list item.

**Important:** \`::before\` and \`::after\` MUST have a \`content\` property — even if it's just \`content: ""\`. Without it they won't appear.

## The Key Difference

- **Pseudo-class** = "style this *existing* element when it's in this *state*"
- **Pseudo-element** = "style this *virtual part* of the element"`,
    keyTakeaways: [
      ":hover, :focus, :active style elements based on user interaction",
      ":nth-child(even/odd) enables zebra-stripe patterns easily",
      "::before and ::after create virtual content — need content: ''",
      ":not() selects everything that DOESN'T match",
      "::selection styles the text users highlight with their mouse",
    ],
    codeExamples: [
      {
        title: "Interactive Pseudo-classes",
        language: "html",
        description: "Hover effects, focus styles, and structural selectors.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 2rem; }

  /* Hover + active on button */
  .btn {
    background: #6366f1; color: white;
    border: none; padding: 0.75rem 1.5rem;
    border-radius: 8px; cursor: pointer;
    transition: all 0.2s;
  }
  .btn:hover  { background: #4f46e5; transform: translateY(-2px); }
  .btn:active { transform: translateY(0); }

  /* Focus style for accessibility */
  input:focus {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }

  /* Zebra stripes */
  tr:nth-child(even) { background: #f9fafb; }
  tr:nth-child(odd)  { background: white; }

  /* First and last */
  li:first-child { font-weight: bold; color: #6366f1; }
  li:last-child  { color: #9ca3af; font-style: italic; }

  /* Not selector */
  p:not(.intro) { font-size: 0.875rem; color: #6b7280; }
</style>
</head>
<body>
  <button class="btn">Hover me!</button>
  <input type="text" placeholder="Focus me...">

  <table border="1" cellpadding="8" style="margin:1rem 0;width:100%">
    <tr><td>Row 1 (odd - white)</td></tr>
    <tr><td>Row 2 (even - gray)</td></tr>
    <tr><td>Row 3 (odd - white)</td></tr>
    <tr><td>Row 4 (even - gray)</td></tr>
  </table>

  <ul>
    <li>First item (bold blue)</li>
    <li>Middle item</li>
    <li>Last item (gray italic)</li>
  </ul>

  <p class="intro">This IS .intro — normal size</p>
  <p>This is NOT .intro — smaller gray</p>
</body>
</html>`,
        livePreview: true,
      },
      {
        title: "Pseudo-elements",
        language: "html",
        description: "::before, ::after, ::selection, and ::placeholder in action.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 2rem; }

  /* Decorative line after heading */
  .title::after {
    content: "";
    display: block;
    width: 3rem; height: 3px;
    background: #6366f1;
    margin-top: 0.5rem;
    border-radius: 2px;
  }

  /* Required field asterisk */
  .required::after {
    content: " *";
    color: #ef4444;
    font-weight: bold;
  }

  /* Drop cap */
  .article::first-letter {
    font-size: 3rem; font-weight: 700;
    float: left; margin-right: 0.25rem;
    line-height: 1; color: #6366f1;
  }

  /* Custom selection color */
  ::selection { background: #6366f1; color: white; }

  /* Custom placeholder */
  input::placeholder { color: #9ca3af; font-style: italic; }

  input { border: 1px solid #d1d5db; padding: 0.5rem;
          border-radius: 4px; margin-top: 0.5rem; }
</style>
</head>
<body>
  <h2 class="title">CSS Pseudo-elements</h2>
  <label class="required">Your name</label>
  <br><input type="text" placeholder="Type here...">
  <p class="article">Try selecting this text with your mouse to see the purple selection color. The first letter is a big drop cap!</p>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-pseudo-1",
        title: "Hover Button",
        instruction: "Write a :hover rule for .btn that changes background to #4f46e5.",
        startingCode: `.btn {\n    background: #6366f1;\n    color: white;\n    padding: 0.75rem 1.5rem;\n}\n\n/* Add hover rule */`,
        expectedOutput: `.btn {\n    background: #6366f1;\n    color: white;\n    padding: 0.75rem 1.5rem;\n}\n\n.btn:hover {\n    background: #4f46e5;\n}`,
        hints: [
          "Pseudo-classes attach directly to the selector with a colon",
          ".btn:hover means: .btn when the mouse is over it",
        ],
      },
      {
        id: "css-pseudo-2",
        title: "Zebra Stripe Table",
        instruction: "Make even table rows have background #f9fafb using :nth-child.",
        startingCode: `/* Style even rows */`,
        expectedOutput: `tr:nth-child(even) {\n    background: #f9fafb;\n}`,
        hints: [
          "Use tr:nth-child(even) for even rows",
          "background sets the background color",
        ],
      },
      {
        id: "css-pseudo-3",
        title: "Required Field Asterisk",
        instruction: "Use ::after to add a red asterisk (*) after any element with class 'required'.",
        startingCode: `.required::after {\n\n}`,
        expectedOutput: `.required::after {\n    content: " *";\n    color: red;\n}`,
        hints: [
          "::after MUST have a content property",
          "content: \" *\" adds a space then asterisk",
          "color: red makes it red",
        ],
      },
      {
        id: "css-pseudo-4",
        title: "Focus Ring",
        instruction: "Write a :focus rule for input elements that adds a 2px solid #6366f1 outline with 2px offset.",
        startingCode: `/* Focus style for inputs */`,
        expectedOutput: `input:focus {\n    outline: 2px solid #6366f1;\n    outline-offset: 2px;\n}`,
        hints: [
          "input:focus targets focused input elements",
          "outline is like a border but doesn't affect layout",
          "outline-offset creates space between element and outline",
        ],
      },
    ],
  },

  // ─── Lesson 4: Colors & Typography ──────────────────────────────────────
  {
    slug: "colors-and-typography",
    title: "Colors & Typography",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/color",
    content: `Colors and typography are the soul of design. Getting these right makes a massive difference in how professional and readable your site looks. The good news — CSS gives you tremendous control over both.

## CSS Color Formats

There are several ways to write colors in CSS:

**Named colors** — 147 color names like \`red\`, \`blue\`, \`coral\`, \`rebeccapurple\`.
Good for quick demos, not for real projects.

**Hex codes** — A \`#\` followed by 6 hex digits. Most common format.
\`#6366f1\` (indigo), \`#ffffff\` (white), \`#000000\` (black)
Shorthand: \`#fff\` = \`#ffffff\`, \`#f00\` = \`#ff0000\`

**RGB** — Red, Green, Blue values from 0–255.
\`rgb(99, 102, 241)\` — same indigo as \`#6366f1\`

**RGBA** — RGB + Alpha (transparency). Alpha goes from 0 (invisible) to 1 (solid).
\`rgba(99, 102, 241, 0.5)\` — 50% transparent indigo

**HSL** — Hue, Saturation, Lightness. The most intuitive for designers.
- **Hue** = color (0–360 degrees around the color wheel)
- **Saturation** = 0% (gray) to 100% (vivid)
- **Lightness** = 0% (black) to 100% (white)
\`hsl(239, 84%, 67%)\` — that same indigo color

**Why HSL is great:** To make a color lighter, just increase lightness. To make it more muted, decrease saturation. Very predictable!

## CSS Custom Properties (Variables)

Instead of copy-pasting \`#6366f1\` everywhere, define it once and reuse it:

\`\`\`css
:root {
    --primary: #6366f1;
}

.btn { background: var(--primary); }
.link { color: var(--primary); }
\`\`\`

Change one line, the whole site updates. Essential for real projects.

## Typography: Font Properties

**font-family** — Which font to use. Always provide fallbacks.
\`font-family: 'Inter', -apple-system, sans-serif;\`

**font-size** — Size of text. Use \`rem\` (relative to root, usually 16px).
\`font-size: 1.5rem\` = 24px if root is 16px

**font-weight** — Thickness. 100 (thin) to 900 (black). 400 = normal, 700 = bold.

**line-height** — Space between lines. Use unitless like \`1.6\`. Never use pixels here.

**letter-spacing** — Space between characters. Use \`em\` units.

**text-align** — \`left\`, \`center\`, \`right\`, \`justify\`

**text-transform** — \`uppercase\`, \`lowercase\`, \`capitalize\`

## Readable Body Text Recipe

The single most important typography setting: \`line-height: 1.5\` to \`1.75\` on your body text. Dense line spacing is the #1 thing that makes text hard to read.`,
    keyTakeaways: [
      "Hex (#6366f1), RGB, RGBA, HSL, and named colors are all valid in CSS",
      "HSL is the most intuitive: adjust hue, saturation, or lightness independently",
      "CSS custom properties (--name: value) enable theme-wide color changes",
      "Use rem for font-size to respect user browser preferences",
      "line-height: 1.5 to 1.75 makes body text much more readable",
    ],
    codeExamples: [
      {
        title: "Color Formats Side by Side",
        language: "html",
        description: "The same color written six different ways — and gradients.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 2rem; }
  .swatch {
    display: inline-block; width: 80px; height: 80px;
    border-radius: 8px; margin: 0.5rem;
    display: inline-flex; align-items: center;
    justify-content: center; color: white; font-size: 10px;
    text-align: center;
  }

  /* Same indigo color, 5 ways */
  .hex  { background: #6366f1; }
  .rgb  { background: rgb(99, 102, 241); }
  .rgba { background: rgba(99, 102, 241, 0.6); }
  .hsl  { background: hsl(239, 84%, 67%); }
  .named { background: rebeccapurple; }

  /* Gradients */
  .grad1 { background: linear-gradient(135deg, #6366f1, #ec4899); }
  .grad2 { background: linear-gradient(to right, #f97316, #eab308, #22c55e); }

  /* CSS Variables */
  :root { --brand: #6366f1; }
  .var-demo { background: var(--brand); }
</style>
</head>
<body>
  <div class="swatch hex">hex</div>
  <div class="swatch rgb">rgb()</div>
  <div class="swatch rgba">rgba()</div>
  <div class="swatch hsl">hsl()</div>
  <div class="swatch named">named</div>
  <div class="swatch grad1">gradient</div>
  <div class="swatch grad2">rainbow</div>
  <div class="swatch var-demo">var()</div>
</body>
</html>`,
        livePreview: true,
      },
      {
        title: "Typography System",
        language: "html",
        description: "Building a readable, professional type scale.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  /* Import a nice font */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

  body {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    line-height: 1.65;
    color: #1f2937;
    padding: 2rem;
    max-width: 640px;
  }

  /* Type scale */
  h1 { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.025em; margin-bottom: 0.5rem; }
  h2 { font-size: 1.875rem; font-weight: 700; letter-spacing: -0.02em; }
  h3 { font-size: 1.25rem; font-weight: 600; }
  p  { margin-bottom: 1rem; }

  .muted    { color: #6b7280; font-size: 0.875rem; }
  .label    { text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.75rem; font-weight: 600; color: #6366f1; }
  .truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
  a { color: #6366f1; text-decoration: none; }
  a:hover { text-decoration: underline; }
</style>
</head>
<body>
  <p class="label">Tutorial</p>
  <h1>CSS Typography</h1>
  <p class="muted">Estimated time: 20 minutes</p>
  <h2>Font Properties</h2>
  <p>Good typography makes text readable and beautiful. Line height is the most important property — this paragraph has line-height: 1.65 which makes it very comfortable to read.</p>
  <h3>Text Utilities</h3>
  <p class="truncate">This text is truncated if too long for its container.</p>
  <a href="#">This is a styled link</a>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-color-1",
        title: "Define a CSS Variable",
        instruction: "Define --primary-color as #6366f1 on :root, then use it as the background of .btn.",
        startingCode: `:root {\n\n}\n\n.btn {\n\n}`,
        expectedOutput: `:root {\n    --primary-color: #6366f1;\n}\n\n.btn {\n    background: var(--primary-color);\n}`,
        hints: [
          "Custom properties start with -- (double dash)",
          "Use var(--name) to access them",
          ":root is like targeting the <html> element",
        ],
      },
      {
        id: "css-color-2",
        title: "RGBA Overlay",
        instruction: "Create a .overlay element with a semi-transparent black background — rgba with 0 for all color channels and 0.5 alpha.",
        startingCode: `.overlay {\n\n}`,
        expectedOutput: `.overlay {\n    background: rgba(0, 0, 0, 0.5);\n}`,
        hints: [
          "rgba(red, green, blue, alpha)",
          "0,0,0 is black",
          "0.5 alpha = 50% transparent",
        ],
      },
      {
        id: "css-color-3",
        title: "Readable Body Text",
        instruction: "Style the body with font-family sans-serif, font-size 1rem, and line-height 1.6.",
        startingCode: `body {\n\n}`,
        expectedOutput: `body {\n    font-family: sans-serif;\n    font-size: 1rem;\n    line-height: 1.6;\n}`,
        hints: [
          "line-height is unitless — 1.6 means 1.6× the font size",
          "rem is relative to the root font size (usually 16px)",
        ],
      },
      {
        id: "css-color-4",
        title: "Gradient Background",
        instruction: "Give .hero a linear-gradient from #6366f1 to #8b5cf6 at 135 degrees.",
        startingCode: `.hero {\n\n}`,
        expectedOutput: `.hero {\n    background: linear-gradient(135deg, #6366f1, #8b5cf6);\n}`,
        hints: [
          "linear-gradient(angle, color1, color2)",
          "135deg goes diagonally from top-left to bottom-right",
        ],
      },
    ],
  },

  // ─── Lesson 5: CSS Units ─────────────────────────────────────────────────
  {
    slug: "css-units",
    title: "CSS Units Deep Dive",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units",
    content: `Every time you set a size in CSS — font-size, padding, width — you need to pick a unit. Picking the right unit is one of the most important decisions in CSS. Use the wrong one and your layout breaks on mobile or ignores user accessibility settings.

## Absolute Units

**px (pixels)** — Fixed size. 1px = 1 pixel on the screen.
- Good for: borders (1px), shadows, fine details
- Bad for: font sizes and spacing (ignores user's browser font settings)

That last point is important. If a user has set their browser font to 20px for accessibility, \`font-size: 16px\` in CSS overrides their preference. That's bad.

## Relative Units (The Good Ones)

**rem** — Relative to the **root** element's font size (usually 16px).
- \`1rem\` = 16px, \`1.5rem\` = 24px, \`2rem\` = 32px
- **Use for:** font-size, margin, padding — almost everything
- Respects user's browser font size preference ✅

**em** — Relative to the **parent** element's font size.
- Compounds when nested! A child with \`1.2em\` inside a parent with \`1.2em\` = 1.44× the base.
- **Use for:** padding inside buttons (scales with button's font size)
- Avoid for font-size (compounding is confusing)

**%** — Percentage of the **parent** element's size.
- \`width: 50%\` = half the parent's width
- \`font-size: 100%\` = same as parent
- Great for responsive widths

## Viewport Units

**vw** — 1% of the viewport (browser window) **width**.
**vh** — 1% of the viewport **height**.
- \`width: 100vw\` = full browser width
- \`height: 100vh\` = full browser height (common for hero sections)
- \`font-size: 5vw\` = fluid text that scales with window width

**dvh** — Dynamic viewport height. Like \`vh\` but accounts for mobile browser's address bar. Use this instead of \`vh\` for full-height mobile layouts.

## The Golden Rules

1. **Font sizes** → use \`rem\`
2. **Spacing** (margin/padding) → use \`rem\`
3. **Widths** → use \`%\`, \`vw\`, or nothing (let it be responsive)
4. **Heights** → avoid fixed heights; use \`min-height\` with \`vh\`
5. **Borders** → \`px\` is fine here
6. **Never** use \`px\` for font-size in real projects

## The clamp() Function

\`clamp(minimum, preferred, maximum)\` — creates a fluid value that scales between two limits.

\`font-size: clamp(1rem, 2.5vw, 2.5rem)\`

This means: at least 1rem, scale with the viewport, but never bigger than 2.5rem. No media queries needed!`,
    keyTakeaways: [
      "px is absolute — use only for borders and fine details, not font sizes",
      "rem is relative to root font size — best choice for most sizing",
      "em compounds when nested — use carefully, prefer rem for font-size",
      "vw/vh scale with the viewport — great for full-screen layouts",
      "clamp(min, preferred, max) creates fluid sizes without media queries",
    ],
    codeExamples: [
      {
        title: "Units in Practice",
        language: "html",
        description: "See how different units behave differently.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 2rem; }

  /* rem — relative to root (16px usually) */
  .rem-text { font-size: 1.5rem; }  /* = 24px */
  .rem-box  { padding: 1rem; margin-bottom: 1rem;
              background: #ede9fe; border-radius: 4px; }

  /* em — relative to parent */
  .em-parent { font-size: 20px; background: #fef9c3; padding: 1em; }
  .em-child  { font-size: 1.5em; } /* = 30px (1.5 * 20px) */

  /* % — relative to parent */
  .container { width: 100%; max-width: 600px; background: #f0fdf4; padding: 1rem; }
  .half      { width: 50%; background: #86efac; padding: 0.5rem; }

  /* vw/vh */
  .viewport-demo {
    width: 100%; height: 30vh;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    display: flex; align-items: center; justify-content: center;
    color: white; font-size: 2vw; border-radius: 8px;
  }

  /* clamp */
  .fluid-text {
    font-size: clamp(1rem, 3vw, 2.5rem);
    font-weight: bold;
    color: #6366f1;
  }
</style>
</head>
<body>
  <p class="rem-text rem-box">1.5rem text (24px at default)</p>
  <div class="em-parent">
    20px parent — <span class="em-child">1.5em child = 30px</span>
  </div>
  <div class="container">
    Full width
    <div class="half">50% wide</div>
  </div>
  <div class="viewport-demo">30vh tall, 2vw text — resize the window!</div>
  <p class="fluid-text">Fluid text with clamp() — resize window to see it scale</p>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-units-1",
        title: "Font Size with rem",
        instruction: "Set font-size on h1 to 2.5rem and on p to 1rem.",
        startingCode: `h1 {\n\n}\n\np {\n\n}`,
        expectedOutput: `h1 {\n    font-size: 2.5rem;\n}\n\np {\n    font-size: 1rem;\n}`,
        hints: ["rem is relative to the root font size (usually 16px)", "1rem = 16px, 2.5rem = 40px"],
      },
      {
        id: "css-units-2",
        title: "Full Viewport Height",
        instruction: "Make .hero exactly the full height of the browser viewport.",
        startingCode: `.hero {\n    display: flex;\n\n}`,
        expectedOutput: `.hero {\n    display: flex;\n    min-height: 100vh;\n}`,
        hints: ["vh = viewport height", "100vh = 100% of the browser window height", "Use min-height so content can still grow"],
      },
      {
        id: "css-units-3",
        title: "Fluid Heading",
        instruction: "Use clamp() to set font-size: minimum 1.5rem, preferred 4vw, maximum 3rem.",
        startingCode: `.heading {\n\n}`,
        expectedOutput: `.heading {\n    font-size: clamp(1.5rem, 4vw, 3rem);\n}`,
        hints: ["clamp(min, preferred, max)", "vw scales with viewport width"],
      },
    ],
  },

  // ─── Lesson 6: The Box Model ─────────────────────────────────────────────
  {
    slug: "box-model",
    title: "The Box Model",
    difficulty: "beginner",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model",
    content: `Every single element on a web page is a box. Understanding the box model is the key to controlling spacing, sizing, and layout. Once it clicks, CSS spacing becomes predictable.

## The Four Layers of Every Box

Imagine an onion — every HTML element has four layers from inside out:

1. **Content** — The actual stuff: text, an image, a video.
2. **Padding** — Space between the content and the border. Padding is INSIDE the box. It has the same background color as the element.
3. **Border** — A line around the padding. Can be styled many ways.
4. **Margin** — Space OUTSIDE the border. Transparent — shows the background behind the element.

## The Critical Setting: box-sizing

Here's the confusing default behavior: if you set \`width: 300px\` on a box with \`padding: 20px\` and \`border: 2px\`, the actual rendered width is 300 + 20 + 20 + 2 + 2 = **344px**. That's maddening.

The fix: **\`box-sizing: border-box\`** makes \`width\` and \`height\` *include* the padding and border. So 300px stays 300px. Always use this.

\`\`\`css
*, *::before, *::after {
    box-sizing: border-box;
}
\`\`\`

This is the first thing most developers put in every CSS file.

## Margin & Padding Shorthand

Instead of four separate properties, use shorthand:

- **4 values:** \`margin: top right bottom left\` (clockwise from top)
- **3 values:** \`margin: top left-right bottom\`
- **2 values:** \`margin: top-bottom left-right\`
- **1 value:** \`margin: all-sides\`

Examples:
- \`padding: 1rem\` — same on all sides
- \`padding: 1rem 2rem\` — 1rem top/bottom, 2rem left/right
- \`margin: 0 auto\` — 0 top/bottom, auto left/right (horizontally centers a block)

## Margin Collapsing

When two **vertical** margins meet, they collapse into one — the larger one wins. This only happens with vertical margins (top/bottom), never horizontal.

Example: a heading with \`margin-bottom: 2rem\` and a paragraph with \`margin-top: 1rem\` won't have 3rem between them — they collapse to just 2rem (the bigger one).

This doesn't happen inside **flex** or **grid** containers.

## Display: Block vs Inline

- **Block elements** (\`div\`, \`p\`, \`h1\`) take up the full width and start on a new line.
- **Inline elements** (\`span\`, \`a\`, \`strong\`) only take as much width as their content.
- **Inline-block** — like inline but you can set width, height, and vertical margins.
- **\`display: none\`** — completely removes the element.`,
    keyTakeaways: [
      "Every element is a box: content → padding → border → margin",
      "Always use box-sizing: border-box so width includes padding and border",
      "Padding is space inside the border; margin is space outside",
      "margin: 0 auto centers a block element horizontally",
      "Vertical margins collapse — only the larger one counts",
    ],
    codeExamples: [
      {
        title: "Box Model Visualized",
        language: "html",
        description: "See content, padding, border, and margin all at once.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: sans-serif; background: #f3f4f6; padding: 2rem; }

  .outer {
    background: #fde68a; /* margin area - yellow */
    padding: 2rem;
  }

  .box {
    background: #bfdbfe; /* padding area - blue */
    border: 4px solid #1d4ed8;
    padding: 2rem;
    width: 300px;
  }

  .content {
    background: #ddd6fe; /* content area - purple */
    padding: 0.5rem;
    text-align: center;
  }

  /* Compare content-box vs border-box */
  .content-box {
    box-sizing: content-box;
    width: 200px; padding: 20px; border: 4px solid #ef4444;
    background: #fecaca; margin-bottom: 1rem;
  }
  .border-box {
    box-sizing: border-box;
    width: 200px; padding: 20px; border: 4px solid #22c55e;
    background: #bbf7d0;
  }
</style>
</head>
<body>
  <div class="outer">
    Margin (yellow)
    <div class="box">
      Padding (blue) + Border (dark blue)
      <div class="content">Content (purple)</div>
    </div>
  </div>

  <h3>content-box vs border-box (both set to width: 200px)</h3>
  <div class="content-box">content-box: WIDER than 200px (adds padding+border)</div>
  <div class="border-box">border-box: EXACTLY 200px (includes padding+border)</div>
</body>
</html>`,
        livePreview: true,
      },
      {
        title: "Spacing & Centering",
        language: "html",
        description: "Margin shorthand, auto centering, and display types.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: sans-serif; background: #f9fafb; padding: 2rem; }

  /* Centered container */
  .container {
    max-width: 500px;
    margin: 0 auto; /* centers horizontally */
    background: white;
    padding: 1.5rem 2rem; /* 1.5rem top/bottom, 2rem sides */
    border-radius: 8px;
  }

  /* Block vs inline */
  .block-demo { background: #e0e7ff; margin-bottom: 0.5rem; padding: 0.5rem; }
  .inline-demo { background: #d1fae5; padding: 0.25rem 0.5rem; }
  .inline-block-demo {
    display: inline-block;
    background: #fef3c7;
    width: 120px; /* width works on inline-block */
    padding: 0.5rem;
    text-align: center;
  }
</style>
</head>
<body>
  <div class="container">
    <p>This container is centered with <code>margin: 0 auto</code></p>
    <div class="block-demo">Block (full width)</div>
    This is inline: <span class="inline-demo">span 1</span> <span class="inline-demo">span 2</span>
    <br><br>
    <span class="inline-block-demo">inline-block</span>
    <span class="inline-block-demo">inline-block</span>
  </div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-box-1",
        title: "Box Sizing Reset",
        instruction: "Write the universal CSS reset that applies border-box to all elements including pseudo-elements.",
        startingCode: `/* Box sizing reset */`,
        expectedOutput: `*, *::before, *::after {\n    box-sizing: border-box;\n}`,
        hints: ["* selects all elements", "*::before and *::after include pseudo-elements"],
      },
      {
        id: "css-box-2",
        title: "Center a Container",
        instruction: "Make .container 960px wide, horizontally centered, with 2rem padding on all sides.",
        startingCode: `.container {\n\n}`,
        expectedOutput: `.container {\n    width: 960px;\n    margin: 0 auto;\n    padding: 2rem;\n}`,
        hints: ["margin: 0 auto centers a block element", "The element needs a fixed width to be centered"],
      },
      {
        id: "css-box-3",
        title: "Padding Shorthand",
        instruction: "Set padding on .card using shorthand: 1rem top/bottom and 1.5rem left/right.",
        startingCode: `.card {\n\n}`,
        expectedOutput: `.card {\n    padding: 1rem 1.5rem;\n}`,
        hints: ["Two values: vertical horizontal", "First value = top and bottom, second = left and right"],
      },
      {
        id: "css-box-4",
        title: "Inline to Block",
        instruction: "Make a span display as a block element with 200px width.",
        startingCode: `span.box {\n\n}`,
        expectedOutput: `span.box {\n    display: block;\n    width: 200px;\n}`,
        hints: ["display: block makes the element take full width and start on new line", "Width works on block elements"],
      },
    ],
  },

  // ─── Lesson 7: Borders, Shadows & Outlines ──────────────────────────────
  {
    slug: "borders-shadows-outlines",
    title: "Borders, Shadows & Outlines",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/border",
    content: `Borders, shadows, and outlines are the visual "edges" of your UI elements. Used well, they create depth, separate sections, and draw attention. Used poorly, they make things look cluttered. Let's learn them properly.

## Borders

The \`border\` shorthand sets width, style, and color in one line:
\`border: 2px solid #e5e7eb;\`

**Border styles:** \`solid\`, \`dashed\`, \`dotted\`, \`double\`, \`none\`

Set individual sides:
- \`border-top: 3px solid #6366f1;\`
- \`border-bottom: 1px dashed #ccc;\`
- \`border-left: 4px solid #10b981;\` (a "left accent" border)

**Shorthand for all four sides:**
- \`border-width\`, \`border-style\`, \`border-color\` each accept 1-4 values like margin/padding.

## Border Radius

Rounds the corners of the element. Makes rectangles look like cards, pills, or circles.

- \`border-radius: 8px\` — slightly rounded
- \`border-radius: 1rem\` — very rounded
- \`border-radius: 9999px\` — pill shape (works on any element)
- \`border-radius: 50%\` — perfect circle (when width = height)
- Individual corners: \`border-top-left-radius: 16px;\`

## Box Shadow

Creates a shadow behind the element. Up to 6 values:
\`box-shadow: offsetX offsetY blur spread color;\`

- \`box-shadow: 0 2px 4px rgba(0,0,0,0.1)\` — subtle drop shadow
- \`box-shadow: 0 20px 60px rgba(0,0,0,0.2)\` — dramatic depth
- Multiple shadows: \`box-shadow: shadow1, shadow2\`
- Inner shadow: \`box-shadow: inset 0 2px 4px rgba(0,0,0,0.1)\`

**Colored glow effect:** \`box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4)\`

## Text Shadow

Like box-shadow but for text:
\`text-shadow: offsetX offsetY blur color;\`
\`text-shadow: 0 2px 4px rgba(0,0,0,0.3);\`

## Outline vs Border

The key difference: **borders** take up space (affect layout). **Outlines** don't — they're drawn outside the border without affecting size.

Outlines are mainly for **accessibility** — they show which element has keyboard focus. Never set \`outline: none\` without providing an alternative focus style.

\`outline: 2px solid #6366f1;\`
\`outline-offset: 4px;\` — gap between element edge and outline`,
    keyTakeaways: [
      "border shorthand: width style color — e.g. border: 2px solid #ccc",
      "border-radius: 50% makes a circle; 9999px makes a pill",
      "box-shadow: offsetX offsetY blur spread color for depth and elevation",
      "Multiple box-shadows create layered depth effects",
      "Never remove outline without providing an accessible alternative",
    ],
    codeExamples: [
      {
        title: "Borders & Border Radius",
        language: "html",
        description: "Different border styles and corner rounding techniques.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 2rem; display: flex; flex-wrap: wrap; gap: 1rem; }
  .box { width: 100px; height: 100px; display: flex; align-items: center;
         justify-content: center; font-size: 11px; text-align: center; }

  .solid   { border: 2px solid #6366f1; }
  .dashed  { border: 2px dashed #f59e0b; }
  .dotted  { border: 3px dotted #10b981; }
  .thick   { border: 6px solid #3b82f6; }
  .accent  { border-left: 4px solid #6366f1; background: #eef2ff; padding: 1rem; }

  /* Border radius */
  .rounded-sm  { border: 2px solid #6366f1; border-radius: 8px; }
  .rounded-lg  { border: 2px solid #6366f1; border-radius: 24px; }
  .pill        { border: 2px solid #6366f1; border-radius: 9999px; }
  .circle      { border: 2px solid #6366f1; border-radius: 50%; background: #eef2ff; }
  .mixed       { border: 2px solid #6366f1; border-radius: 24px 8px; }
</style>
</head>
<body>
  <div class="box solid">solid</div>
  <div class="box dashed">dashed</div>
  <div class="box dotted">dotted</div>
  <div class="box thick">thick</div>
  <div class="box rounded-sm">8px radius</div>
  <div class="box rounded-lg">24px radius</div>
  <div class="box pill">pill 9999px</div>
  <div class="box circle">50% circle</div>
</body>
</html>`,
        livePreview: true,
      },
      {
        title: "Box Shadows — Depth System",
        language: "html",
        description: "Building a consistent shadow scale for your UI.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 3rem; background: #f3f4f6;
         display: flex; flex-wrap: wrap; gap: 2rem; }

  .card {
    background: white; border-radius: 12px; padding: 1.5rem;
    width: 180px; text-align: center;
  }
  .shadow-xs  { box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
  .shadow-sm  { box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  .shadow-md  { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
  .shadow-lg  { box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
  .shadow-xl  { box-shadow: 0 20px 40px rgba(0,0,0,0.2); }

  /* Colored glow */
  .glow       { box-shadow: 0 4px 20px rgba(99,102,241,0.4); }

  /* Inset (inner shadow) */
  .inset      { box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); background: #f9fafb; }
</style>
</head>
<body>
  <div class="card shadow-xs">xs shadow</div>
  <div class="card shadow-sm">sm shadow</div>
  <div class="card shadow-md">md shadow</div>
  <div class="card shadow-lg">lg shadow</div>
  <div class="card shadow-xl">xl shadow</div>
  <div class="card glow">indigo glow</div>
  <div class="card inset">inset shadow</div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-border-1",
        title: "Card Border",
        instruction: "Give .card a 1px solid #e5e7eb border and 12px border-radius.",
        startingCode: `.card {\n    padding: 1.5rem;\n\n}`,
        expectedOutput: `.card {\n    padding: 1.5rem;\n    border: 1px solid #e5e7eb;\n    border-radius: 12px;\n}`,
        hints: ["border shorthand: width style color", "border-radius rounds all four corners"],
      },
      {
        id: "css-border-2",
        title: "Circle Avatar",
        instruction: "Make .avatar exactly circular: set width and height to 48px, border-radius to 50%.",
        startingCode: `.avatar {\n    background: #6366f1;\n\n}`,
        expectedOutput: `.avatar {\n    background: #6366f1;\n    width: 48px;\n    height: 48px;\n    border-radius: 50%;\n}`,
        hints: ["border-radius: 50% makes a circle when width = height", "Set both width and height to the same value"],
      },
      {
        id: "css-border-3",
        title: "Drop Shadow",
        instruction: "Add a box-shadow to .card: 0 offset-x, 4px offset-y, 12px blur, rgba(0,0,0,0.1) color.",
        startingCode: `.card {\n    background: white;\n\n}`,
        expectedOutput: `.card {\n    background: white;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}`,
        hints: ["box-shadow: offsetX offsetY blur color", "rgba(0,0,0,0.1) = 10% opaque black"],
      },
    ],
  },

  // ─── Lesson 8: Backgrounds ───────────────────────────────────────────────
  {
    slug: "backgrounds",
    title: "Backgrounds Deep Dive",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/background",
    content: `Backgrounds do more than just fill boxes with color. CSS backgrounds can be gradients, images, patterns, and layered combinations. Mastering them unlocks beautiful hero sections, cards, and decorative effects.

## Background Color

The simplest: \`background-color: #f9fafb;\`
Or the shorthand \`background:\` which works for colors, images, and gradients.

## Background Images

\`background-image: url("photo.jpg");\`

You'll almost always pair this with:
- \`background-size: cover\` — fills the container, cropping if needed ✅ (most common)
- \`background-size: contain\` — fits entire image inside container (may leave gaps)
- \`background-size: 100% 100%\` — stretches to fit exactly (distorts)
- \`background-position: center\` — centers the image
- \`background-repeat: no-repeat\` — prevents tiling

The full pattern for a hero image:
\`\`\`css
.hero {
    background-image: url("hero.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
\`\`\`

## Gradients

Gradients are images generated by CSS — no image file needed.

**Linear gradient** — Color transitions in a straight line:
\`background: linear-gradient(135deg, #667eea, #764ba2);\`
\`background: linear-gradient(to right, #f97316, #ec4899);\`

Multiple color stops:
\`background: linear-gradient(to right, red, yellow, green);\`

**Radial gradient** — Color radiates from a center point:
\`background: radial-gradient(circle, #6366f1, #0f172a);\`

**Conic gradient** — Color sweeps around a center (like a pie chart):
\`background: conic-gradient(#6366f1, #ec4899, #6366f1);\`

## Multiple Backgrounds

You can stack multiple backgrounds! Listed first = on top:
\`\`\`css
background:
    linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), /* dark overlay */
    url("hero.jpg") center/cover no-repeat;
\`\`\`

This is the standard "image with dark overlay" technique for readable text on images.

## Background Shorthand

\`background: color image position/size repeat attachment\`

Example: \`background: #1a1a2e url("bg.svg") center/cover no-repeat;\`

## background-attachment

- \`scroll\` (default) — background scrolls with the element
- \`fixed\` — background stays fixed while page scrolls (parallax effect)
- \`local\` — background scrolls with the element's content`,
    keyTakeaways: [
      "background-size: cover fills the container perfectly, cropping if needed",
      "Gradients are CSS-generated images — no external file needed",
      "Layer multiple backgrounds with commas — first listed is on top",
      "Overlay technique: gradient + image with comma",
      "background shorthand: color image position/size repeat",
    ],
    codeExamples: [
      {
        title: "Gradients Gallery",
        language: "html",
        description: "Linear, radial, conic, and layered gradients.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 2rem; display: flex; flex-wrap: wrap; gap: 1rem; }
  .swatch { width: 150px; height: 100px; border-radius: 8px; display: flex;
            align-items: center; justify-content: center; color: white;
            font-size: 11px; text-align: center; font-weight: 600; }

  .linear1  { background: linear-gradient(135deg, #667eea, #764ba2); }
  .linear2  { background: linear-gradient(to right, #f97316, #ec4899); }
  .linear3  { background: linear-gradient(to bottom, #0f172a, #1e40af); }
  .rainbow  { background: linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #6366f1); }
  .radial   { background: radial-gradient(circle at 30% 50%, #6366f1, #0f172a); }
  .conic    { background: conic-gradient(#6366f1, #ec4899, #f97316, #6366f1); border-radius: 50%; }
  .overlay  {
    background:
      linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
      linear-gradient(135deg, #667eea, #764ba2);
  }
</style>
</head>
<body>
  <div class="swatch linear1">Linear 135°</div>
  <div class="swatch linear2">to right</div>
  <div class="swatch linear3">to bottom</div>
  <div class="swatch rainbow">rainbow</div>
  <div class="swatch radial">radial</div>
  <div class="swatch conic">conic</div>
  <div class="swatch overlay">overlay trick</div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-bg-1",
        title: "Hero Background Image",
        instruction: "Set .hero to use background-image url('hero.jpg'), cover size, center position, and no-repeat.",
        startingCode: `.hero {\n    height: 400px;\n\n}`,
        expectedOutput: `.hero {\n    height: 400px;\n    background-image: url('hero.jpg');\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;\n}`,
        hints: ["background-size: cover fills the container", "background-position: center keeps focus on the middle"],
      },
      {
        id: "css-bg-2",
        title: "Gradient Background",
        instruction: "Give .card a linear gradient from #6366f1 to #8b5cf6 going to the right.",
        startingCode: `.card {\n\n}`,
        expectedOutput: `.card {\n    background: linear-gradient(to right, #6366f1, #8b5cf6);\n}`,
        hints: ["linear-gradient(direction, color1, color2)", "'to right' goes left to right"],
      },
      {
        id: "css-bg-3",
        title: "Image with Overlay",
        instruction: "Layer a semi-transparent black overlay (rgba(0,0,0,0.5)) on top of a background image url('bg.jpg') using multiple backgrounds.",
        startingCode: `.hero {\n    height: 400px;\n\n}`,
        expectedOutput: `.hero {\n    height: 400px;\n    background:\n        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),\n        url('bg.jpg') center/cover no-repeat;\n}`,
        hints: ["Multiple backgrounds are comma-separated", "The gradient goes first (on top)", "Use center/cover in the url() part"],
      },
    ],
  },

  // ─── Lesson 9: Flexbox ───────────────────────────────────────────────────
  {
    slug: "flexbox",
    title: "Flexbox Layout",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox",
    content: `Flexbox is the layout system you'll use every single day. It solves the layouts that used to require hacks — centering things, equal-height columns, distributing space. If you only learn one CSS layout system, make it Flexbox.

## What is Flexbox?

Add \`display: flex\` to any container. Its direct children immediately become **flex items** that you can control with flex properties.

## Two Axes

Everything in Flexbox is about two axes:
- **Main axis** — the direction items flow (default: horizontal, left to right)
- **Cross axis** — perpendicular to main axis (default: vertical)

Change the direction with \`flex-direction\`:
- \`row\` (default) — horizontal
- \`column\` — vertical
- \`row-reverse\` — horizontal, right to left
- \`column-reverse\` — vertical, bottom to top

## Aligning Items

**\`justify-content\`** — controls items along the **main axis**
- \`flex-start\` — items at the start (default)
- \`flex-end\` — items at the end
- \`center\` — items in the middle
- \`space-between\` — equal gaps between items, none at edges
- \`space-around\` — equal gaps around all items
- \`space-evenly\` — truly equal spacing everywhere

**\`align-items\`** — controls items along the **cross axis**
- \`stretch\` — items fill the cross axis (default)
- \`flex-start\` — items at the top
- \`flex-end\` — items at the bottom
- \`center\` — items in the middle ← most useful

## Spacing with gap

\`gap: 1rem\` — space between flex items. Much cleaner than margin on every item.

## flex-wrap

By default, flex items try to fit on one line. \`flex-wrap: wrap\` lets them wrap to the next line when there's not enough space.

## Item Properties

**\`flex-grow\`** — Can the item grow to fill extra space? 0 = no, 1 = yes.
**\`flex-shrink\`** — Can the item shrink if there's not enough space? 1 = yes.
**\`flex-basis\`** — The starting size before grow/shrink.
**\`flex\` shorthand** — \`flex: grow shrink basis\`

Common patterns:
- \`flex: 1\` — all items share space equally
- \`flex: 0 0 250px\` — fixed 250px, never grow or shrink
- \`flex: 1 1 200px\` — start at 200px, but grow and shrink

**\`align-self\`** — Override \`align-items\` for one specific item.

**\`margin-left: auto\`** — Push an item all the way to the right (within a row).`,
    keyTakeaways: [
      "display: flex makes a container — its children are flex items",
      "justify-content aligns items on the main axis (horizontal by default)",
      "align-items aligns items on the cross axis (vertical by default)",
      "flex: 1 makes items grow equally to fill available space",
      "gap provides clean, consistent spacing between flex items",
    ],
    codeExamples: [
      {
        title: "Common Flexbox Layouts",
        language: "html",
        description: "Navbar, card row, centering, and sidebar — the patterns you'll use daily.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: sans-serif; margin: 0; }

  /* Navbar */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #1e293b; color: white;
  }
  .nav-links { display: flex; gap: 1.5rem; list-style: none; margin: 0; padding: 0; }

  /* Card row with wrapping */
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1.5rem;
  }
  .card {
    flex: 1 1 200px; /* grow, shrink, min 200px */
    background: #eef2ff; border-radius: 8px; padding: 1rem;
  }

  /* Perfect centering */
  .hero {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    font-size: 1.25rem; font-weight: bold;
  }

  /* Push last item right */
  .toolbar {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1.5rem;
    background: #f9fafb; border-bottom: 1px solid #e5e7eb;
  }
  .toolbar .spacer { margin-left: auto; }
</style>
</head>
<body>
  <nav class="navbar">
    <div>🐝 BEECODEFI</div>
    <ul class="nav-links">
      <li>Home</li><li>Tutorials</li><li>Quiz</li>
    </ul>
  </nav>
  <div class="toolbar">
    <span>File</span><span>Edit</span><span>View</span>
    <button class="spacer">Save</button>
  </div>
  <div class="hero">Perfectly Centered!</div>
  <div class="cards">
    <div class="card">Card 1 — flex: 1 1 200px</div>
    <div class="card">Card 2 — grows and shrinks</div>
    <div class="card">Card 3 — wraps to next line</div>
    <div class="card">Card 4 on next row</div>
  </div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-flex-1",
        title: "Perfect Centering",
        instruction: "Create a flex container that centers content both horizontally and vertically, with min-height 100vh.",
        startingCode: `.center {\n\n}`,
        expectedOutput: `.center {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-height: 100vh;\n}`,
        hints: ["display: flex turns on flexbox", "justify-content centers on main axis (horizontal)", "align-items centers on cross axis (vertical)"],
      },
      {
        id: "css-flex-2",
        title: "Navbar Layout",
        instruction: "Style .navbar as flex with space-between justify-content and center align-items.",
        startingCode: `.navbar {\n    display: flex;\n\n}`,
        expectedOutput: `.navbar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}`,
        hints: ["space-between puts items at each end with space in between"],
      },
      {
        id: "css-flex-3",
        title: "Equal Width Columns",
        instruction: "Give .col flex: 1 so all columns share the available space equally.",
        startingCode: `.row {\n    display: flex;\n    gap: 1rem;\n}\n\n.col {\n\n}`,
        expectedOutput: `.row {\n    display: flex;\n    gap: 1rem;\n}\n\n.col {\n    flex: 1;\n}`,
        hints: ["flex: 1 is shorthand for flex: 1 1 0", "Each item gets an equal share of the space"],
      },
      {
        id: "css-flex-4",
        title: "Wrapping Cards",
        instruction: "Add flex-wrap: wrap and gap: 1.5rem to .card-container.",
        startingCode: `.card-container {\n    display: flex;\n\n}`,
        expectedOutput: `.card-container {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 1.5rem;\n}`,
        hints: ["flex-wrap: wrap allows items to go to the next line", "gap adds space between items"],
      },
    ],
  },

  // ─── Lesson 10: CSS Grid ─────────────────────────────────────────────────
  {
    slug: "css-grid",
    title: "CSS Grid Layout",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids",
    content: `If Flexbox is one-dimensional (a row OR a column), CSS Grid is two-dimensional — rows AND columns at the same time. It's the perfect tool for page layouts, image galleries, dashboards, and any design that needs a grid.

## Setting Up a Grid

Add \`display: grid\` to a container. Then define the columns with \`grid-template-columns\`.

\`\`\`css
.grid {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    gap: 1rem;
}
\`\`\`

This creates 3 columns: first is 200px, the other two share the remaining space.

## The fr Unit

\`fr\` stands for "fraction of available space". It's like \`flex: 1\` but for grid.
- \`1fr 1fr 1fr\` — three equal columns
- \`1fr 2fr\` — second column is twice as wide
- \`200px 1fr\` — first fixed, second flexible

## repeat()

Instead of writing \`1fr 1fr 1fr 1fr\`, use:
\`grid-template-columns: repeat(4, 1fr);\`

## Responsive Grid Without Media Queries

The most useful grid trick:
\`\`\`css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
\`\`\`

This means: "make as many columns as fit, each at least 250px wide." On a phone, it becomes 1 column. On a tablet, 2. On desktop, 3 or 4. No media queries needed!

## Placing Items

By default, grid items auto-flow into cells. But you can place them precisely using grid lines (numbered from 1):

- \`grid-column: 1 / 3\` — span from line 1 to line 3 (2 columns wide)
- \`grid-column: span 2\` — span 2 columns from wherever you are
- \`grid-column: 1 / -1\` — span ALL columns (-1 means last line)
- \`grid-row: 1 / 3\` — span 2 rows tall

## Named Areas

For complex layouts, name your areas:
\`\`\`css
grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
\`\`\`

Then assign items: \`grid-area: header;\` \`grid-area: sidebar;\` etc.

## Grid vs Flexbox: When to Use Which?

- **Flexbox** — One direction: a row of buttons, a list of cards, a navbar
- **Grid** — Two directions: page layout, image gallery, dashboard`,
    keyTakeaways: [
      "display: grid + grid-template-columns defines the grid structure",
      "fr unit distributes space proportionally (like flex: 1)",
      "repeat(auto-fit, minmax(250px, 1fr)) creates responsive grids without media queries",
      "grid-column: 1 / -1 spans all columns",
      "Named areas with grid-template-areas make complex layouts readable",
    ],
    codeExamples: [
      {
        title: "Grid in Practice",
        language: "html",
        description: "Auto-responsive grid, spanning items, and named template areas.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: sans-serif; padding: 1.5rem; }

  /* Auto-responsive grid */
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .gallery-item {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white; border-radius: 8px; padding: 1rem;
    text-align: center; font-size: 0.875rem;
  }
  .gallery-item.wide { grid-column: span 2; background: linear-gradient(135deg, #ec4899, #f97316); }
  .gallery-item.tall { grid-row: span 2; background: linear-gradient(135deg, #10b981, #0891b2); }

  /* Page layout with named areas */
  .page {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 60px 1fr 40px;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    gap: 1rem; height: 300px;
    border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;
  }
  .page-header  { grid-area: header;  background: #1e293b; color: white; display: flex; align-items: center; padding: 0 1rem; }
  .page-sidebar { grid-area: sidebar; background: #f1f5f9; padding: 1rem; font-size: 0.875rem; }
  .page-main    { grid-area: main;    padding: 1rem; }
  .page-footer  { grid-area: footer;  background: #f9fafb; display: flex; align-items: center; padding: 0 1rem; font-size: 0.75rem; color: #6b7280; }
</style>
</head>
<body>
  <h2>Auto-Responsive Gallery</h2>
  <div class="gallery">
    <div class="gallery-item">Normal</div>
    <div class="gallery-item wide">Wide (span 2)</div>
    <div class="gallery-item">Normal</div>
    <div class="gallery-item tall">Tall (span 2 rows)</div>
    <div class="gallery-item">Normal</div>
    <div class="gallery-item">Normal</div>
  </div>

  <h2>Named Area Page Layout</h2>
  <div class="page">
    <header class="page-header">🐝 Header</header>
    <aside class="page-sidebar">Sidebar nav links here</aside>
    <main class="page-main">Main content area</main>
    <footer class="page-footer">© 2026 BEECODEFI</footer>
  </div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-grid-1",
        title: "Three Column Grid",
        instruction: "Create a .grid with 3 equal columns using the fr unit and 1.5rem gap.",
        startingCode: `.grid {\n    display: grid;\n\n}`,
        expectedOutput: `.grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 1.5rem;\n}`,
        hints: ["repeat(3, 1fr) = 1fr 1fr 1fr", "fr distributes available space equally"],
      },
      {
        id: "css-grid-2",
        title: "Responsive Grid",
        instruction: "Create a grid that auto-fits columns with minimum 280px width using minmax.",
        startingCode: `.cards {\n    display: grid;\n    gap: 1rem;\n\n}`,
        expectedOutput: `.cards {\n    display: grid;\n    gap: 1rem;\n    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n}`,
        hints: ["auto-fit fills the available space", "minmax(min, max) sets min and max column size"],
      },
      {
        id: "css-grid-3",
        title: "Full Width Item",
        instruction: "Make .featured span all columns using grid-column.",
        startingCode: `.featured {\n\n}`,
        expectedOutput: `.featured {\n    grid-column: 1 / -1;\n}`,
        hints: ["1 = first grid line, -1 = last grid line", "grid-column: start / end"],
      },
      {
        id: "css-grid-4",
        title: "Named Grid Area",
        instruction: "Assign .header the grid area named 'header' using grid-area.",
        startingCode: `.header {\n\n}`,
        expectedOutput: `.header {\n    grid-area: header;\n}`,
        hints: ["grid-area assigns an element to a named area", "The name must match one defined in grid-template-areas"],
      },
    ],
  },

  // ─── Lesson 11: Positioning & Stacking ──────────────────────────────────
  {
    slug: "positioning",
    title: "Positioning & Stacking",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/position",
    content: `Normal document flow places elements one after another. CSS positioning lets you break out of that flow and place elements exactly where you want them — sticky headers, dropdown menus, modals, tooltips.

## The Five Position Values

**static** — The default. Elements flow normally. \`top\`, \`left\` etc. have no effect here.

**relative** — The element stays in normal flow but you can offset it from where it *would* be. Its original space is preserved. Most importantly, it creates a **positioning context** for any absolute children.

\`\`\`css
.nudged { position: relative; top: 10px; left: 20px; }
\`\`\`

**absolute** — Completely removed from normal flow (no space reserved). Positioned relative to its nearest **positioned ancestor** (any element with position other than static). If none, it positions relative to the viewport.

**fixed** — Like absolute but always relative to the **viewport**. Stays in place during scrolling. Perfect for sticky navbars, chatbots, cookie banners.

**sticky** — Hybrid of relative and fixed. Behaves like relative until you scroll to a threshold, then sticks like fixed. Perfect for sticky table headers or sidebars.

## Offsets: top, right, bottom, left

These only work on non-static positioned elements. The shorthand \`inset\` sets all four:
\`inset: 0;\` = \`top: 0; right: 0; bottom: 0; left: 0;\` (fills parent)

## The Parent-Child Pattern

The most common positioning pattern:

1. Set parent to \`position: relative\`
2. Set child to \`position: absolute\` with offset values
3. The child is now precisely placed *within* the parent

Use this for: badges on cards, close buttons on modals, labels on images.

## z-index

Controls which element appears *on top* when elements overlap. Higher value = on top. Only works on positioned elements (not static).

**Create a system:** Don't use random z-index values. Define a scale:
- 10 — dropdowns
- 20 — sticky elements
- 40 — overlays/backdrops
- 50 — modals
- 60 — tooltips`,
    keyTakeaways: [
      "static is default — no positioning effects apply",
      "relative offsets the element but keeps its space in the flow",
      "absolute removes element from flow, positions inside nearest positioned ancestor",
      "fixed is like absolute but relative to the viewport — stays during scroll",
      "sticky toggles between relative and fixed when you scroll",
    ],
    codeExamples: [
      {
        title: "Positioning Patterns",
        language: "html",
        description: "Sticky header, absolute badge, fixed button, and modal.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: sans-serif; margin: 0; padding-top: 60px; }

  /* Fixed navbar */
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 60px; z-index: 50;
    background: #1e293b; color: white;
    display: flex; align-items: center; padding: 0 2rem;
  }

  /* Relative parent + absolute child */
  .card {
    position: relative;
    background: white; border: 1px solid #e5e7eb;
    border-radius: 12px; padding: 1.5rem;
    margin: 1rem; width: 200px; display: inline-block;
  }
  .badge {
    position: absolute;
    top: -8px; right: -8px;
    background: #ef4444; color: white;
    border-radius: 9999px;
    padding: 2px 8px; font-size: 11px; font-weight: bold;
  }

  /* Sticky sidebar */
  .layout { display: flex; gap: 1rem; padding: 1rem; }
  .sidebar {
    position: sticky;
    top: 70px;
    height: fit-content;
    width: 200px; shrink: 0;
    background: #f8fafc; border-radius: 8px; padding: 1rem;
    font-size: 0.875rem; border: 1px solid #e2e8f0;
  }
  .content { flex: 1; }
  .section { background: #eef2ff; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem; }
</style>
</head>
<body>
  <nav class="navbar">🐝 Fixed Navbar — stays here while you scroll</nav>
  <div class="layout">
    <aside class="sidebar">
      <strong>Sticky Sidebar</strong><br>
      Stays visible as you scroll down
    </aside>
    <div class="content">
      <div class="card">
        Card with badge
        <span class="badge">NEW</span>
      </div>
      <div class="section">Section 1 — scroll down to see sticky sidebar</div>
      <div class="section">Section 2</div>
      <div class="section">Section 3</div>
      <div class="section">Section 4</div>
    </div>
  </div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-pos-1",
        title: "Sticky Header",
        instruction: "Make .header sticky at the top of the screen with z-index 50.",
        startingCode: `.header {\n    background: white;\n\n}`,
        expectedOutput: `.header {\n    background: white;\n    position: sticky;\n    top: 0;\n    z-index: 50;\n}`,
        hints: ["position: sticky combines relative and fixed behavior", "top: 0 means stick at the very top"],
      },
      {
        id: "css-pos-2",
        title: "Badge on Card",
        instruction: "Set .card to position relative, then .badge to position absolute at top: -8px, right: -8px.",
        startingCode: `.card {\n\n}\n\n.badge {\n\n}`,
        expectedOutput: `.card {\n    position: relative;\n}\n\n.badge {\n    position: absolute;\n    top: -8px;\n    right: -8px;\n}`,
        hints: ["Parent must be position: relative", "Absolute child positions inside that parent"],
      },
      {
        id: "css-pos-3",
        title: "Fixed Overlay",
        instruction: "Create a full-screen overlay using position: fixed, inset: 0, and background rgba(0,0,0,0.5).",
        startingCode: `.overlay {\n\n}`,
        expectedOutput: `.overlay {\n    position: fixed;\n    inset: 0;\n    background: rgba(0, 0, 0, 0.5);\n}`,
        hints: ["position: fixed is relative to the viewport", "inset: 0 is shorthand for top/right/bottom/left: 0"],
      },
    ],
  },

  // ─── Lesson 12: Transitions & Animations ────────────────────────────────
  {
    slug: "transitions-and-animations",
    title: "Transitions & Animations",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions",
    content: `Motion makes interfaces feel alive and responsive. CSS gives you two tools: **transitions** for smooth state changes (hover, focus), and **keyframe animations** for complex multi-step sequences.

## CSS Transitions

A transition smoothly animates a property change from one value to another. Without transitions, changes are instant. With them, they're smooth.

\`transition: property duration timing-function delay;\`

Examples:
- \`transition: background-color 0.2s ease;\` — smooth color change
- \`transition: all 0.3s ease;\` — animates ALL changes
- \`transition: transform 0.3s ease, opacity 0.3s ease;\` — multiple specific properties

**Timing functions:**
- \`ease\` — starts fast, slows at end (default, most natural)
- \`linear\` — constant speed (good for spinners)
- \`ease-in\` — starts slow, ends fast
- \`ease-out\` — starts fast, ends slow (good for exit animations)
- \`ease-in-out\` — slow start and end (most polished feel)
- \`cubic-bezier()\` — fully custom curve

## CSS Transform

Transform changes an element's visual appearance without affecting layout:
- \`translate(x, y)\` or \`translateX()\` / \`translateY()\` — move
- \`scale(n)\` or \`scaleX()\ / scaleY()\` — resize
- \`rotate(45deg)\` — rotate
- \`skew(10deg)\` — skew

Transforms are GPU-accelerated = butter-smooth 60fps animations.

## Keyframe Animations

For multi-step, looping, or self-playing animations (no hover needed):

\`\`\`css
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}

.element {
    animation: fadeIn 0.5s ease-out forwards;
}
\`\`\`

**animation shorthand:** \`name duration timing fill-mode\`
- \`animation-iteration-count: infinite\` — loop forever
- \`animation-direction: alternate\` — play forward then backward
- \`animation-delay: 0.2s\` — wait before starting
- \`animation-fill-mode: forwards\` — stay at end state after animation

## Performance Rule

Only animate \`transform\` and \`opacity\`. These are composited by the GPU. Animating \`width\`, \`height\`, \`margin\`, or \`top/left\` triggers expensive layout recalculations and causes jank.

## Accessibility

Always respect users who prefer less motion:
\`\`\`css
@media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
}
\`\`\``,
    keyTakeaways: [
      "Transitions animate between two states — add them to the base element, not :hover",
      "transform (translate, scale, rotate) is GPU-accelerated and smooth",
      "@keyframes defines multi-step named animations",
      "Only animate transform and opacity for best performance",
      "Always add prefers-reduced-motion for accessibility",
    ],
    codeExamples: [
      {
        title: "Transitions & Transforms",
        language: "html",
        description: "Hover effects, loading spinner, and staggered entrance animation.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 2rem; }

  /* Button with multiple transitions */
  .btn {
    background: #6366f1; color: white; border: none;
    padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }
  .btn:hover {
    background: #4f46e5;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
  }
  .btn:active { transform: translateY(0); }

  /* Loading spinner */
  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner {
    width: 40px; height: 40px;
    border: 4px solid #e5e7eb;
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 1rem 0;
  }

  /* Pulse */
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  /* Fade in cards with stagger */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cards { display: flex; gap: 1rem; margin-top: 1rem; }
  .card {
    background: #eef2ff; border-radius: 8px; padding: 1rem; flex: 1;
    animation: fadeUp 0.5s ease-out both;
  }
  .card:nth-child(1) { animation-delay: 0s; }
  .card:nth-child(2) { animation-delay: 0.1s; }
  .card:nth-child(3) { animation-delay: 0.2s; }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
  }
</style>
</head>
<body>
  <button class="btn">Hover me — watch the transition</button>
  <div class="spinner"></div>
  <div class="cards">
    <div class="card">Staggered</div>
    <div class="card">Entrance</div>
    <div class="card">Animation</div>
  </div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-anim-1",
        title: "Button Hover Transition",
        instruction: "Add transition to .btn for background-color over 0.2s with ease timing.",
        startingCode: `.btn {\n    background: #6366f1;\n    color: white;\n    padding: 0.75rem 1.5rem;\n\n}`,
        expectedOutput: `.btn {\n    background: #6366f1;\n    color: white;\n    padding: 0.75rem 1.5rem;\n    transition: background 0.2s ease;\n}`,
        hints: ["Add transition to the base element, not :hover", "transition: property duration timing"],
      },
      {
        id: "css-anim-2",
        title: "Lift on Hover",
        instruction: "On .card:hover, use transform: translateY(-4px) and add box-shadow.",
        startingCode: `.card {\n    transition: all 0.3s ease;\n}\n\n.card:hover {\n\n}`,
        expectedOutput: `.card {\n    transition: all 0.3s ease;\n}\n\n.card:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);\n}`,
        hints: ["translateY(-4px) moves the element up 4 pixels", "Negative Y = up"],
      },
      {
        id: "css-anim-3",
        title: "Spin Keyframe",
        instruction: "Create @keyframes 'spin' that rotates to 360deg, then apply it as infinite linear on .spinner.",
        startingCode: `@keyframes spin {\n\n}\n\n.spinner {\n    width: 40px; height: 40px;\n    border-radius: 50%;\n    border: 3px solid #e5e7eb;\n    border-top-color: #6366f1;\n\n}`,
        expectedOutput: `@keyframes spin {\n    to { transform: rotate(360deg); }\n}\n\n.spinner {\n    width: 40px; height: 40px;\n    border-radius: 50%;\n    border: 3px solid #e5e7eb;\n    border-top-color: #6366f1;\n    animation: spin 0.8s linear infinite;\n}`,
        hints: ["Use 'to' for the final state", "animation: name duration timing iteration-count"],
      },
    ],
  },

  // ─── Lesson 13: Responsive Design ───────────────────────────────────────
  {
    slug: "responsive-design",
    title: "Responsive Design & Media Queries",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design",
    content: `Your website needs to look great on a phone, tablet, laptop, and 4K monitor. Responsive design is how you achieve that. The good news: modern CSS makes it easier than ever.

## The Viewport Meta Tag

Without this tag, mobile browsers zoom out and show a tiny desktop view. Always include it:

\`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`

## Mobile-First Approach

Write your base CSS for **small screens**. Then use \`min-width\` media queries to add styles for larger screens.

Why mobile-first?
- Most web traffic is mobile
- It forces you to prioritize essential content
- Enhancing for larger screens is easier than squeezing desktop designs down

## Media Queries

\`@media (condition) { /* styles here */ }\`

**Common breakpoints:**
- \`(min-width: 640px)\` — sm: large phones / small tablets
- \`(min-width: 768px)\` — md: tablets
- \`(min-width: 1024px)\` — lg: desktops
- \`(min-width: 1280px)\` — xl: large desktops

**Other useful queries:**
- \`(prefers-color-scheme: dark)\` — user prefers dark mode
- \`(prefers-reduced-motion: reduce)\` — user wants less animation
- \`(orientation: landscape)\` — device is in landscape

## Fluid Layouts

Rather than jumping between fixed breakpoints, use fluid CSS:
- \`max-width\` + \`margin: 0 auto\` for containers
- \`%\` for widths
- \`clamp()\` for fluid sizes
- \`auto-fit\` grids that reflow automatically

## Fluid Typography with clamp()

\`font-size: clamp(1rem, 2.5vw, 2rem)\` scales smoothly with the viewport — no jumps at breakpoints.

## Flexible Images

Always add this to your global styles:
\`\`\`css
img { max-width: 100%; height: auto; }
\`\`\`
This ensures images never overflow their container.`,
    keyTakeaways: [
      "Always include the viewport meta tag in every HTML file",
      "Mobile-first: base styles for small screens, enhance with min-width",
      "Common breakpoints: 640px, 768px, 1024px, 1280px",
      "clamp() creates fluid values that scale smoothly — no breakpoints needed",
      "img { max-width: 100%; height: auto } prevents images overflowing",
    ],
    codeExamples: [
      {
        title: "Mobile-First Responsive Layout",
        language: "html",
        description: "One column on mobile, two on tablet, three on desktop.",
        code: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: sans-serif; margin: 0; padding: 1rem; background: #f9fafb; }

  /* Mobile first: single column */
  .container { max-width: 1200px; margin: 0 auto; }
  .grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }

  /* Fluid title */
  .title { font-size: clamp(1.5rem, 4vw, 3rem); font-weight: 800; margin-bottom: 1rem; }

  /* Tablet: 2 columns */
  @media (min-width: 768px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* Desktop: 3 columns */
  @media (min-width: 1024px) {
    .grid { grid-template-columns: repeat(3, 1fr); }
    body { padding: 2rem; }
  }

  .card {
    background: white; border-radius: 12px; padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .card-title { font-weight: 600; margin-bottom: 0.5rem; }
  .card-body  { color: #6b7280; font-size: 0.875rem; }

  /* Dark mode */
  @media (prefers-color-scheme: dark) {
    body  { background: #0f172a; color: #f1f5f9; }
    .card { background: #1e293b; }
    .card-body { color: #94a3b8; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1 class="title">Responsive Grid</h1>
    <div class="grid">
      <div class="card"><div class="card-title">Card 1</div><div class="card-body">Responsive with media queries and clamp()</div></div>
      <div class="card"><div class="card-title">Card 2</div><div class="card-body">Resize window to see columns change</div></div>
      <div class="card"><div class="card-title">Card 3</div><div class="card-body">Dark mode via prefers-color-scheme</div></div>
    </div>
  </div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-resp-1",
        title: "Mobile to Desktop Grid",
        instruction: "Start .grid as 1 column. Add a media query at 1024px to make it 3 columns.",
        startingCode: `.grid {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n}\n\n/* Add media query */`,
        expectedOutput: `.grid {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n}\n\n@media (min-width: 1024px) {\n    .grid {\n        grid-template-columns: repeat(3, 1fr);\n    }\n}`,
        hints: ["min-width queries are mobile-first", "Write the media query after the base styles"],
      },
      {
        id: "css-resp-2",
        title: "Fluid Heading",
        instruction: "Set .hero-title font-size using clamp(): minimum 1.75rem, preferred 5vw, maximum 4rem.",
        startingCode: `.hero-title {\n    font-weight: 800;\n\n}`,
        expectedOutput: `.hero-title {\n    font-weight: 800;\n    font-size: clamp(1.75rem, 5vw, 4rem);\n}`,
        hints: ["clamp(min, preferred, max)", "vw scales with the viewport width"],
      },
      {
        id: "css-resp-3",
        title: "Dark Mode",
        instruction: "Write a media query for prefers-color-scheme: dark that sets body background to #0f172a and color to #f1f5f9.",
        startingCode: `/* Dark mode styles */`,
        expectedOutput: `@media (prefers-color-scheme: dark) {\n    body {\n        background: #0f172a;\n        color: #f1f5f9;\n    }\n}`,
        hints: ["Use @media (prefers-color-scheme: dark)", "This respects the user's OS dark mode preference"],
      },
    ],
  },

  // ─── Lesson 14: CSS Variables & Custom Properties ────────────────────────
  {
    slug: "css-variables",
    title: "CSS Variables & Custom Properties",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",
    content: `CSS Custom Properties — commonly called CSS Variables — let you store values and reuse them everywhere. They're the foundation of theming, dark mode, and design systems. Once you use them, you can't go back.

## Why Variables?

Imagine your brand color \`#6366f1\` is used in 50 places. If you rebrand, you change 50 lines. With a variable, you change **one line**.

## Defining Variables

Variables are defined with a \`--\` prefix. Usually defined on \`:root\` (equivalent to \`<html>\`) so they're available everywhere:

\`\`\`css
:root {
    --color-primary: #6366f1;
    --color-bg: #ffffff;
    --font-size-base: 1rem;
    --spacing-4: 1rem;
}
\`\`\`

## Using Variables

Access them with \`var()\`:
\`\`\`css
.btn { background: var(--color-primary); }
.body { font-size: var(--font-size-base); }
\`\`\`

## Fallback Values

If a variable isn't defined, use a fallback:
\`color: var(--accent, #6366f1);\`

## Scope & Inheritance

Variables cascade and inherit. You can override them locally for a component:
\`\`\`css
.danger-section {
    --color-primary: #ef4444; /* overrides locally */
}
\`\`\`
All children in \`.danger-section\` now see the red primary color.

## Dark Mode with Variables

Define two sets of values, switch with a class or media query:
\`\`\`css
:root { --bg: white; --text: #1f2937; }
[data-theme="dark"] { --bg: #0f172a; --text: #f1f5f9; }
body { background: var(--bg); color: var(--text); }
\`\`\`

Toggle with JavaScript: \`document.documentElement.setAttribute('data-theme', 'dark')\`

## Dynamic with JavaScript

\`\`\`js
// Read a variable
getComputedStyle(document.documentElement).getPropertyValue('--spacing-4');

// Update a variable
document.documentElement.style.setProperty('--color-primary', '#ef4444');
\`\`\`

## Design Tokens

Use variables for all design decisions — colors, spacing, radii, shadows, font sizes. This is what frameworks like Tailwind do under the hood.`,
    keyTakeaways: [
      "Variables are defined with -- prefix: --name: value",
      "Access them with var(--name) — optionally add fallback var(--name, default)",
      "Define on :root for global scope, on a selector for local override",
      "Variables enable dark mode by swapping the :root values",
      "JavaScript can read and update CSS variables at runtime",
    ],
    codeExamples: [
      {
        title: "Design Token System",
        language: "html",
        description: "A complete design system powered by CSS variables with dark mode.",
        code: `<!DOCTYPE html>
<html data-theme="light">
<head>
<style>
  /* ── Design Tokens ── */
  :root {
    --color-primary:   #6366f1;
    --color-secondary: #8b5cf6;
    --color-success:   #10b981;
    --color-danger:    #ef4444;
    --color-bg:        #ffffff;
    --color-surface:   #f9fafb;
    --color-text:      #1f2937;
    --color-muted:     #6b7280;
    --color-border:    #e5e7eb;
    --radius:          0.75rem;
    --shadow:          0 4px 12px rgba(0,0,0,0.1);
    --transition:      0.2s ease;
  }

  /* Dark mode */
  [data-theme="dark"] {
    --color-bg:      #0f172a;
    --color-surface: #1e293b;
    --color-text:    #f1f5f9;
    --color-muted:   #94a3b8;
    --color-border:  #334155;
  }

  *, *::before, *::after { box-sizing: border-box; }
  body {
    font-family: sans-serif;
    background: var(--color-bg);
    color: var(--color-text);
    transition: background var(--transition), color var(--transition);
    padding: 2rem;
  }

  .card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    margin-bottom: 1rem;
  }
  .btn {
    background: var(--color-primary); color: white;
    border: none; padding: 0.625rem 1.25rem;
    border-radius: calc(var(--radius) / 2);
    cursor: pointer; transition: all var(--transition);
    margin-right: 0.5rem;
  }
  .btn:hover { filter: brightness(1.1); }
  .btn-danger { background: var(--color-danger); }
</style>
</head>
<body>
  <div class="card">
    <h2>Design Token System</h2>
    <p style="color: var(--color-muted)">Every style references a token</p>
    <button class="btn" onclick="document.documentElement.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')">
      Toggle Dark Mode
    </button>
    <button class="btn btn-danger">Danger Action</button>
  </div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-var-1",
        title: "Define Theme Variables",
        instruction: "Define --primary as #6366f1 and --bg as #f9fafb on :root.",
        startingCode: `:root {\n\n}`,
        expectedOutput: `:root {\n    --primary: #6366f1;\n    --bg: #f9fafb;\n}`,
        hints: ["Variables start with -- (two dashes)", "Defined just like regular properties: --name: value"],
      },
      {
        id: "css-var-2",
        title: "Use a Variable",
        instruction: "Set .btn background to var(--primary) and body background to var(--bg).",
        startingCode: `.btn {\n\n}\n\nbody {\n\n}`,
        expectedOutput: `.btn {\n    background: var(--primary);\n}\n\nbody {\n    background: var(--bg);\n}`,
        hints: ["var() references a custom property", "Syntax: var(--variable-name)"],
      },
      {
        id: "css-var-3",
        title: "Dark Mode Override",
        instruction: "Add a [data-theme='dark'] rule that overrides --bg to #0f172a and --text to #f1f5f9.",
        startingCode: `:root { --bg: white; --text: #1f2937; }\n\n/* Dark mode */`,
        expectedOutput: `:root { --bg: white; --text: #1f2937; }\n\n[data-theme="dark"] {\n    --bg: #0f172a;\n    --text: #f1f5f9;\n}`,
        hints: ["Use attribute selector [data-theme='dark']", "Override just the variables — everything else adapts"],
      },
    ],
  },

  // ─── Lesson 15: Overflow & Scrolling ────────────────────────────────────
  {
    slug: "overflow-and-scrolling",
    title: "Overflow & Scrolling",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/overflow",
    content: `What happens when content is bigger than its container? CSS gives you precise control with overflow properties and modern scroll customization.

## The overflow Property

- \`visible\` (default) — content spills out of the container
- \`hidden\` — content is clipped at the container edge, no scrollbar
- \`scroll\` — always shows scrollbars (even when not needed)
- \`auto\` — shows scrollbars only when content overflows ✅ (best choice)

Set specific axes: \`overflow-x\` (horizontal) and \`overflow-y\` (vertical).

## Common Patterns

**Scrollable area:** \`overflow-y: auto; max-height: 300px;\`

**Clip rounded corners on images:** \`overflow: hidden\` on the parent with \`border-radius\` — prevents image corners from sticking out.

**Horizontal scroll table:** \`overflow-x: auto\` on a wrapper around a \`<table>\`.

**Text truncation:**
\`\`\`css
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
\`\`\`
The three properties together are required — all three, every time.

## scroll-behavior

\`scroll-behavior: smooth\` on \`html\` or the scroll container makes anchor links (#section) scroll smoothly instead of jumping.

## Custom Scrollbars

Style scrollbars in Webkit browsers (Chrome, Edge, Safari):
\`\`\`css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
\`\`\`

Firefox uses: \`scrollbar-width: thin; scrollbar-color: #c1c1c1 transparent;\`

## scroll-snap

CSS scroll snap creates carousel-like scrolling:
\`\`\`css
.scroll-container {
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    display: flex;
}
.slide { scroll-snap-align: start; flex: 0 0 100%; }
\`\`\``,
    keyTakeaways: [
      "overflow: auto shows scrollbars only when needed — preferred over scroll",
      "overflow: hidden clips content and is often used with border-radius",
      "Text truncation needs all three: white-space, overflow, text-overflow",
      "scroll-behavior: smooth on html makes anchor links animate",
      "scroll-snap enables pure CSS carousels without JavaScript",
    ],
    codeExamples: [
      {
        title: "Overflow Patterns",
        language: "html",
        description: "Scrollable containers, text truncation, and custom scrollbars.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 2rem; }

  /* Scrollable box */
  .scroll-box {
    max-height: 150px; overflow-y: auto;
    border: 1px solid #e5e7eb; border-radius: 8px;
    padding: 1rem; margin-bottom: 1.5rem;
    scrollbar-width: thin;
    scrollbar-color: #6366f1 transparent;
  }

  /* Text truncation */
  .truncate {
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    max-width: 200px;
    background: #eef2ff; padding: 0.5rem; border-radius: 4px;
    margin-bottom: 1.5rem;
  }

  /* Overflow hidden for rounded images */
  .avatar-container {
    width: 80px; height: 80px;
    border-radius: 50%; overflow: hidden;
    border: 3px solid #6366f1; margin-bottom: 1.5rem;
  }
  .avatar-container img { width: 100%; height: 100%; object-fit: cover; }

  /* Horizontal scroll */
  .horiz-scroll {
    overflow-x: auto; white-space: nowrap;
    padding-bottom: 0.5rem;
    border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem;
  }
  .pill {
    display: inline-block; background: #eef2ff; color: #6366f1;
    padding: 0.25rem 0.75rem; border-radius: 9999px;
    margin-right: 0.5rem; font-size: 0.875rem;
  }
</style>
</head>
<body>
  <h3>Scrollable Box</h3>
  <div class="scroll-box">
    <p>Line 1 — scroll to see more content</p>
    <p>Line 2</p><p>Line 3</p><p>Line 4</p><p>Line 5</p>
    <p>Line 6</p><p>Line 7 — end of content</p>
  </div>

  <h3>Text Truncation</h3>
  <div class="truncate">This is very long text that gets truncated with an ellipsis</div>

  <h3>Horizontal Scroll</h3>
  <div class="horiz-scroll">
    <span class="pill">HTML</span><span class="pill">CSS</span>
    <span class="pill">JavaScript</span><span class="pill">React</span>
    <span class="pill">Node.js</span><span class="pill">TypeScript</span>
    <span class="pill">Git</span><span class="pill">SQL</span>
  </div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-overflow-1",
        title: "Scrollable Sidebar",
        instruction: "Make .sidebar scrollable vertically with max-height 400px, showing scrollbar only when needed.",
        startingCode: `.sidebar {\n    width: 250px;\n\n}`,
        expectedOutput: `.sidebar {\n    width: 250px;\n    max-height: 400px;\n    overflow-y: auto;\n}`,
        hints: ["overflow-y: auto shows vertical scrollbar only when needed", "max-height limits the height"],
      },
      {
        id: "css-overflow-2",
        title: "Text Ellipsis",
        instruction: "Create a .label class that truncates long text with an ellipsis using all three required properties.",
        startingCode: `.label {\n    max-width: 150px;\n\n}`,
        expectedOutput: `.label {\n    max-width: 150px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}`,
        hints: ["You need all three properties for truncation", "white-space: nowrap prevents text wrapping"],
      },
    ],
  },

  // ─── Lesson 16: Filters & Blend Modes ───────────────────────────────────
  {
    slug: "filters-and-blend-modes",
    title: "Filters & Blend Modes",
    difficulty: "advanced",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS/filter",
    content: `CSS filters and blend modes bring Photoshop-like effects directly to the browser. No image editing needed — you can blur, saturate, tint, and overlay entirely in CSS.

## CSS Filters

The \`filter\` property applies visual effects to an element and all its children:

- \`blur(4px)\` — Gaussian blur
- \`brightness(1.5)\` — 1 = normal, >1 = brighter, <1 = darker
- \`contrast(1.2)\` — Increase/decrease contrast
- \`grayscale(100%)\` — Convert to grayscale
- \`saturate(2)\` — Increase color saturation
- \`hue-rotate(90deg)\` — Shift all colors around the wheel
- \`invert(100%)\` — Invert colors (great for dark mode toggles)
- \`sepia(100%)\` — Warm vintage tone
- \`opacity(0.5)\` — Transparency (same as opacity property)
- \`drop-shadow(x y blur color)\` — Like box-shadow but follows element shape

**Combine multiple filters:**
\`filter: grayscale(50%) brightness(1.2) contrast(1.1);\`

## backdrop-filter

Like \`filter\` but applies to whatever is **behind** the element, not the element itself. Perfect for frosted glass effects:

\`\`\`css
.glass-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
\`\`\`

The parent must not have \`overflow: hidden\` for backdrop-filter to work.

## CSS Blend Modes

Blend modes control how two overlapping layers of color mix together — just like Photoshop layer modes.

**mix-blend-mode** — blends an element with what's behind it
**background-blend-mode** — blends background layers together

Common blend modes:
- \`multiply\` — Darken. Good for dark overlays on images.
- \`screen\` — Lighten. Good for light effects.
- \`overlay\` — Increases contrast. Good for texture overlays.
- \`difference\` — Creates striking negative effect.
- \`color\` — Applies the hue/saturation of the top layer to the brightness of the bottom.

## Practical Uses

- **Hover effects:** \`filter: grayscale(100%)\` to \`grayscale(0%)\` on hover
- **Frosted glass nav:** \`backdrop-filter: blur()\` on a semi-transparent header
- **Image tinting:** \`background-blend-mode: multiply\` with a color overlay
- **Dark mode images:** \`filter: invert(1) hue-rotate(180deg)\` to invert images`,
    keyTakeaways: [
      "filter applies visual effects to an element and its children",
      "backdrop-filter blurs/tints whatever is behind the element",
      "Combining filters: filter: grayscale() brightness() contrast()",
      "mix-blend-mode blends an element with the content behind it",
      "drop-shadow() in filter follows the element's actual shape, unlike box-shadow",
    ],
    codeExamples: [
      {
        title: "Filters & Glassmorphism",
        language: "html",
        description: "Image filters, frosted glass card, and blend mode tinting.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; margin: 0; }

  /* Filter demos */
  .filters { display: flex; flex-wrap: wrap; gap: 1rem; padding: 2rem; background: #f9fafb; }
  .filter-box {
    width: 120px; height: 80px; border-radius: 8px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    display: flex; align-items: center; justify-content: center;
    color: white; font-size: 11px; text-align: center;
  }
  .blur        { filter: blur(3px); }
  .bright      { filter: brightness(1.5); }
  .gray        { filter: grayscale(100%); }
  .saturate    { filter: saturate(3); }
  .hue         { filter: hue-rotate(120deg); }
  .sepia       { filter: sepia(100%); }

  /* Glassmorphism */
  .glass-bg {
    background: linear-gradient(135deg, #667eea, #764ba2);
    padding: 3rem 2rem; position: relative;
  }
  .glass-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px; padding: 1.5rem; color: white;
    max-width: 300px;
  }
  .glass-card h3 { margin-top: 0; }
</style>
</head>
<body>
  <div class="filters">
    <div class="filter-box">Normal</div>
    <div class="filter-box blur">blur(3px)</div>
    <div class="filter-box bright">brightness(1.5)</div>
    <div class="filter-box gray">grayscale</div>
    <div class="filter-box saturate">saturate(3)</div>
    <div class="filter-box hue">hue-rotate</div>
    <div class="filter-box sepia">sepia</div>
  </div>

  <div class="glass-bg">
    <div class="glass-card">
      <h3>Glassmorphism</h3>
      <p>backdrop-filter: blur(12px) on a semi-transparent background</p>
    </div>
  </div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-filter-1",
        title: "Grayscale Hover",
        instruction: "Make .photo grayscale by default, and remove the grayscale on hover using filter.",
        startingCode: `.photo {\n    transition: filter 0.3s ease;\n\n}\n\n.photo:hover {\n\n}`,
        expectedOutput: `.photo {\n    transition: filter 0.3s ease;\n    filter: grayscale(100%);\n}\n\n.photo:hover {\n    filter: grayscale(0%);\n}`,
        hints: ["filter: grayscale(100%) converts to black and white", "grayscale(0%) brings back color"],
      },
      {
        id: "css-filter-2",
        title: "Frosted Glass",
        instruction: "Create a .glass element with semi-transparent white background rgba(255,255,255,0.2) and backdrop-filter blur of 10px.",
        startingCode: `.glass {\n\n}`,
        expectedOutput: `.glass {\n    background: rgba(255, 255, 255, 0.2);\n    backdrop-filter: blur(10px);\n}`,
        hints: ["backdrop-filter blurs what's behind the element", "Use rgba for semi-transparent background"],
      },
    ],
  },

  // ─── Lesson 17: Modern CSS Features ─────────────────────────────────────
  {
    slug: "modern-css",
    title: "Modern CSS Features",
    difficulty: "advanced",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    content: `CSS is evolving faster than ever. The modern features shipped in the last few years are genuinely game-changing — they replace JavaScript workarounds, reduce code, and unlock layouts that weren't possible before.

## Container Queries

The biggest CSS innovation in years. Instead of styling based on the **viewport** size, style based on the **container** size.

\`\`\`css
.card-wrapper { container-type: inline-size; }

@container (min-width: 400px) {
    .card { display: flex; gap: 1rem; }
}
\`\`\`

This means a card component can adapt to its own space — whether it's in a narrow sidebar or a wide main area — without any changes.

## :has() — The Parent Selector

For 25 years, CSS had no parent selector. Now it does.

\`\`\`css
/* Style .card differently if it contains an img */
.card:has(img) { display: grid; grid-template-rows: 200px auto; }

/* Disable submit button if form has invalid fields */
form:has(:invalid) .btn-submit { opacity: 0.5; pointer-events: none; }

/* Style nav when it contains a .active link */
nav:has(.active) { border-bottom: 2px solid #6366f1; }
\`\`\`

## Native CSS Nesting

You can now nest CSS rules like Sass — no preprocessor needed:

\`\`\`css
.card {
    padding: 1.5rem;

    & .title { font-size: 1.25rem; }    /* & = parent */
    &:hover  { box-shadow: ...; }
    & + .card { margin-top: 1rem; }
}
\`\`\`

## Cascade Layers (@layer)

Control the cascade explicitly. Lower layers lose to higher layers regardless of specificity:

\`\`\`css
@layer base, components, utilities;

@layer base { * { box-sizing: border-box; } }
@layer components { .btn { padding: 0.75rem; } }
@layer utilities { .hidden { display: none; } }
\`\`\`

## Logical Properties

Write CSS that works in any text direction (left-to-right, right-to-left):

| Physical | Logical |
|---|---|
| margin-left/right | margin-inline |
| margin-top/bottom | margin-block |
| padding-left | padding-inline-start |
| width | inline-size |
| height | block-size |

## Other Modern Utilities

- \`aspect-ratio: 16 / 9\` — Maintain proportions
- \`text-wrap: balance\` — Even line lengths on headings
- \`accent-color\` — Style native form controls (checkboxes, radios)
- \`color-mix(in srgb, #6366f1 70%, white)\` — Mix colors in CSS
- \`:is(h1, h2, h3)\` — Group selectors without specificity penalty
- \`:where()\` — Like :is() but zero specificity`,
    keyTakeaways: [
      "Container queries style elements based on parent size, not viewport",
      ":has() is the parent selector — style elements based on their children",
      "Native CSS nesting removes the need for Sass/LESS preprocessors",
      "@layer gives explicit control over cascade ordering",
      "Logical properties (margin-inline, padding-block) work in all text directions",
    ],
    codeExamples: [
      {
        title: "Container Queries & :has()",
        language: "html",
        description: "Component-level responsiveness and the parent selector.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: sans-serif; padding: 2rem; background: #f9fafb; }

  /* Container Query */
  .card-wrapper {
    container-type: inline-size;
    margin-bottom: 1rem;
  }

  .card {
    background: white; border-radius: 12px;
    border: 1px solid #e5e7eb; padding: 1rem;
    overflow: hidden;
  }

  /* When container is wide enough, use side-by-side layout */
  @container (min-width: 450px) {
    .card { display: flex; gap: 1rem; align-items: center; }
    .card img { width: 120px; height: 120px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
  }

  /* :has() — style parent based on children */
  .card:has(.badge) { border-color: #6366f1; }

  .badge {
    display: inline-block; background: #6366f1; color: white;
    font-size: 11px; padding: 2px 8px; border-radius: 9999px; margin-bottom: 0.5rem;
  }

  /* Native Nesting */
  .feature-card {
    background: white; border-radius: 12px; padding: 1.5rem;
    transition: all 0.2s ease;

    & .icon { font-size: 2rem; margin-bottom: 0.5rem; }
    & h3    { margin: 0 0 0.5rem; color: #1f2937; }
    & p     { color: #6b7280; font-size: 0.875rem; margin: 0; }
    &:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.1); transform: translateY(-2px); }
  }

  /* text-wrap: balance */
  .balanced-title {
    text-wrap: balance;
    font-size: 1.5rem; font-weight: 700; max-width: 300px; text-align: center;
    color: #1f2937; margin: 1rem 0;
  }

  /* aspect-ratio */
  .video-thumb {
    aspect-ratio: 16 / 9; width: 100%; max-width: 400px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 8px; display: flex; align-items: center;
    justify-content: center; color: white; font-size: 2rem;
    margin-top: 1rem;
  }
</style>
</head>
<body>
  <h2>Container Query (resize browser to see layout change)</h2>
  <div style="max-width: 600px">
    <div class="card-wrapper">
      <div class="card">
        <div>
          <span class="badge">:has() active</span>
          <h3>Container Query Card</h3>
          <p>Stacks vertically in narrow space, side-by-side when container is wide.</p>
        </div>
      </div>
    </div>
  </div>

  <h2>Native Nesting</h2>
  <div class="feature-card" style="max-width:300px">
    <div class="icon">🚀</div>
    <h3>Native Nesting</h3>
    <p>CSS now nests like Sass. No preprocessor needed.</p>
  </div>

  <h2>text-wrap: balance</h2>
  <p class="balanced-title">Headlines with Balanced Text Line Lengths Look Much Better</p>

  <div class="video-thumb">▶ 16:9 aspect-ratio</div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-modern-1",
        title: "Set Up Container Query",
        instruction: "Make .wrapper a container with container-type: inline-size, then when it's 500px wide give .card display: flex.",
        startingCode: `.wrapper {\n\n}\n\n/* Container query */`,
        expectedOutput: `.wrapper {\n    container-type: inline-size;\n}\n\n@container (min-width: 500px) {\n    .card { display: flex; }\n}`,
        hints: ["container-type: inline-size on the parent", "@container works like @media"],
      },
      {
        id: "css-modern-2",
        title: "aspect-ratio",
        instruction: "Create .video-embed with width: 100% and aspect-ratio: 16 / 9.",
        startingCode: `.video-embed {\n\n}`,
        expectedOutput: `.video-embed {\n    width: 100%;\n    aspect-ratio: 16 / 9;\n}`,
        hints: ["aspect-ratio: width / height", "16/9 is the standard widescreen ratio"],
      },
      {
        id: "css-modern-3",
        title: "Balanced Text",
        instruction: "Add text-wrap: balance to .headline to even out line lengths.",
        startingCode: `.headline {\n    font-size: 2rem;\n    font-weight: 700;\n\n}`,
        expectedOutput: `.headline {\n    font-size: 2rem;\n    font-weight: 700;\n    text-wrap: balance;\n}`,
        hints: ["text-wrap: balance distributes text evenly across lines", "Most useful for multi-line headings"],
      },
    ],
  },

  // ─── Lesson 18: CSS Architecture ────────────────────────────────────────
  {
    slug: "css-architecture",
    title: "CSS Architecture & Best Practices",
    difficulty: "advanced",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    content: `Writing CSS that works for a demo is easy. Writing CSS that stays maintainable as your project grows — across multiple developers and hundreds of components — is a skill. This lesson covers methodologies and best practices that professional teams use.

## Why CSS Architecture Matters

CSS is global by default. A class \`.title\` defined anywhere affects every element with that class. In large projects, this causes conflicts, specificity wars, and styles breaking unexpectedly when someone adds a new rule.

Good CSS architecture prevents these problems.

## BEM (Block Element Modifier)

The most widely-used CSS naming convention. Structure: \`block__element--modifier\`

\`\`\`css
/* Block — a standalone component */
.card { }

/* Element — a part of the block */
.card__title { }
.card__image { }
.card__footer { }

/* Modifier — a variant of block or element */
.card--featured { }
.card--dark { }
.card__title--large { }
\`\`\`

BEM keeps specificity flat (all single classes), makes HTML self-documenting, and prevents accidental collisions.

## Utility-First CSS

Instead of writing component-specific CSS, use small, single-purpose utility classes:

\`\`\`html
<div class="flex items-center gap-4 p-6 rounded-xl bg-white shadow-md">
\`\`\`

This is the Tailwind CSS approach. Benefits: highly consistent, no naming required, zero dead CSS. Downsides: verbose HTML.

## Component-Scoped CSS

In frameworks (React, Vue, Svelte), scope styles to a component so they can't leak:
- CSS Modules: \`styles.module.css\`
- Styled Components / Emotion (CSS-in-JS)
- Vue's \`<style scoped>\`

## The 7-1 Pattern (for large projects)

Organize your CSS files into 7 folders + 1 main file:
1. \`base/\` — reset, typography, variables
2. \`components/\` — buttons, cards, forms
3. \`layout/\` — grid, header, footer
4. \`pages/\` — page-specific styles
5. \`themes/\` — dark mode, seasonal
6. \`abstracts/\` — functions, mixins (Sass)
7. \`vendors/\` — third-party CSS

## General Best Practices

- **Avoid ID selectors** for styling — too specific, use classes
- **Keep specificity low and flat** — mostly single classes
- **Never use !important** in components — it creates tech debt
- **Use CSS variables** for anything that repeats or varies
- **Mobile-first always** — base + enhancement pattern
- **Comment your hacks** — if you write something weird, explain why
- **Organize properties consistently** — position → display → box model → typography → visual`,
    keyTakeaways: [
      "BEM naming (.block__element--modifier) prevents naming conflicts",
      "Keep specificity low — mostly single classes, avoid IDs for styling",
      "Never use !important in components — it creates unmaintainable code",
      "CSS variables make theming and design changes painless",
      "Mobile-first approach: write base styles, enhance with min-width queries",
    ],
    codeExamples: [
      {
        title: "BEM Methodology",
        language: "html",
        description: "Clean, self-documenting HTML and CSS using BEM.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: sans-serif; padding: 2rem; background: #f9fafb; }

  /* Block */
  .card {
    background: white; border: 1px solid #e5e7eb;
    border-radius: 12px; overflow: hidden; max-width: 300px; margin-bottom: 1rem;
  }

  /* Elements */
  .card__image { width: 100%; height: 180px; object-fit: cover; display: block; background: linear-gradient(135deg, #6366f1, #8b5cf6); }
  .card__body  { padding: 1.25rem; }
  .card__tag   { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6366f1; margin-bottom: 0.5rem; }
  .card__title { font-size: 1.125rem; font-weight: 700; margin: 0 0 0.5rem; color: #1f2937; }
  .card__text  { font-size: 0.875rem; color: #6b7280; margin: 0 0 1rem; line-height: 1.5; }
  .card__footer { display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid #f3f4f6; }

  /* Modifiers */
  .card--featured { border-color: #6366f1; box-shadow: 0 0 0 2px #6366f1; }
  .card--dark     { background: #1e293b; border-color: #334155; }
  .card--dark .card__title { color: #f1f5f9; }
  .card--dark .card__text  { color: #94a3b8; }

  /* Button component */
  .btn            { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.875rem; font-weight: 600; }
  .btn--primary   { background: #6366f1; color: white; }
  .btn--ghost     { background: transparent; color: #6366f1; border: 1px solid #6366f1; }
  .btn--small     { padding: 0.25rem 0.75rem; font-size: 0.75rem; }
</style>
</head>
<body>
  <!-- Normal card -->
  <div class="card">
    <div class="card__image"></div>
    <div class="card__body">
      <div class="card__tag">Tutorial</div>
      <h3 class="card__title">BEM Card Component</h3>
      <p class="card__text">Clean, maintainable, predictable CSS.</p>
      <div class="card__footer">
        <button class="btn btn--primary btn--small">Read more</button>
        <button class="btn btn--ghost btn--small">Save</button>
      </div>
    </div>
  </div>

  <!-- Featured modifier -->
  <div class="card card--featured">
    <div class="card__body">
      <div class="card__tag">Featured</div>
      <h3 class="card__title">Featured Card</h3>
      <p class="card__text">Same block, --featured modifier adds an indigo border.</p>
    </div>
  </div>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "css-arch-1",
        title: "BEM Element",
        instruction: "Write a CSS rule for the title element of a .card block using BEM naming.",
        startingCode: `/* Card title using BEM */`,
        expectedOutput: `.card__title {\n    font-size: 1.25rem;\n    font-weight: 700;\n}`,
        hints: ["BEM element: .block__element", "Double underscore __ separates block from element"],
      },
      {
        id: "css-arch-2",
        title: "BEM Modifier",
        instruction: "Write a CSS rule for the featured variant of .card using BEM modifier syntax.",
        startingCode: `/* Featured card modifier */`,
        expectedOutput: `.card--featured {\n    border-color: #6366f1;\n    box-shadow: 0 0 0 2px #6366f1;\n}`,
        hints: ["BEM modifier: .block--modifier", "Double dash -- separates block from modifier"],
      },
      {
        id: "css-arch-3",
        title: "Properties Order",
        instruction: "Reorder these properties correctly: font-size, position, color, display, z-index, padding. Order: positioning → display → box model → typography → visual.",
        startingCode: `.element {\n    font-size: 1rem;\n    position: relative;\n    color: #333;\n    display: flex;\n    z-index: 10;\n    padding: 1rem;\n}`,
        expectedOutput: `.element {\n    position: relative;\n    z-index: 10;\n    display: flex;\n    padding: 1rem;\n    font-size: 1rem;\n    color: #333;\n}`,
        hints: ["Position + z-index go first", "Then display", "Then box model (padding/margin)", "Then typography (font-size, color)"],
      },
    ],
  },
];
