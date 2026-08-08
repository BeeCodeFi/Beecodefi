import { InterviewQuestion } from './html-questions';

export const cssInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'css-1',
    question: 'What is CSS and what does it stand for?',
    answer: `CSS stands for **Cascading Style Sheets**. It is the language used to describe the presentation and visual styling of HTML documents.

**Key Points:**
- CSS controls layout, colors, fonts, spacing, animations, and responsive design
- It separates content (HTML) from presentation (CSS), making code cleaner and maintainable
- "Cascading" refers to how styles are applied using priority rules when multiple styles target the same element
- The latest major version is CSS3, which introduced modules like Flexbox, Grid, animations, and custom properties

**Basic Example:**
\`\`\`css
/* Selector { property: value; } */
h1 {
  color: #6366f1;
  font-size: 2rem;
  font-family: 'Inter', sans-serif;
}
\`\`\``,
    difficulty: 'beginner',
    category: 'Basics',
    tags: ['fundamentals', 'definition', 'introduction'],
  },
  {
    id: 'css-2',
    question: 'What is the CSS Box Model and how does it work?',
    answer: `The **CSS Box Model** describes how every HTML element is rendered as a rectangular box composed of four areas, from inside to outside:

1. **Content** — the actual text, image, or inner element
2. **Padding** — transparent space between content and border
3. **Border** — the visible edge around the padding
4. **Margin** — transparent space outside the border, separating from other elements

\`\`\`css
.box {
  width: 200px;        /* content width */
  padding: 20px;       /* inside spacing */
  border: 2px solid #6366f1;
  margin: 10px;        /* outside spacing */
}
\`\`\`

**box-sizing Property:**
- \`content-box\` (default) — width/height applies to content only. Total = width + padding + border
- \`border-box\` — width/height includes padding and border. Total = width as declared

\`\`\`css
/* Best practice — apply to all elements */
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

With \`border-box\`, a \`width: 200px\` element stays exactly 200px wide regardless of padding or border.`,
    difficulty: 'beginner',
    category: 'Layout',
    tags: ['box-model', 'layout', 'padding', 'margin', 'border'],
  },
  {
    id: 'css-3',
    question: 'What is the difference between class selectors and ID selectors?',
    answer: `**Class selectors** (.) and **ID selectors** (#) are both used to target HTML elements, but they have key differences:

| Feature | Class (.) | ID (#) |
|---------|-----------|--------|
| Syntax | \`.classname\` | \`#idname\` |
| Reusability | Can be used on multiple elements | Should be unique per page |
| Specificity | Lower (0,0,1,0) | Higher (0,1,0,0) |
| JavaScript | \`getElementsByClassName\` | \`getElementById\` |
| Best for | Styling groups of elements | Unique, one-off elements |

\`\`\`html
<p class="highlight">Paragraph 1</p>
<p class="highlight">Paragraph 2</p>
<header id="main-header">Header</header>
\`\`\`

\`\`\`css
/* Class - applies to both paragraphs */
.highlight {
  background-color: yellow;
  padding: 4px;
}

/* ID - applies only to main-header */
#main-header {
  background: #1e1b4b;
  color: white;
}
\`\`\`

**Best Practice:** Prefer classes over IDs for styling. Reserve IDs for JavaScript hooks and anchor links.`,
    difficulty: 'beginner',
    category: 'Selectors',
    tags: ['selectors', 'class', 'id', 'specificity'],
  },
  {
    id: 'css-4',
    question: 'What is CSS specificity and how is it calculated?',
    answer: `**CSS Specificity** determines which CSS rule wins when multiple rules target the same element. It is calculated as a 4-part score: **(inline, ID, class/attribute/pseudo-class, element/pseudo-element)**.

**Specificity Hierarchy (highest to lowest):**

| Type | Score | Example |
|------|-------|---------|
| Inline styles | 1,0,0,0 | \`style="color: red"\` |
| ID selectors | 0,1,0,0 | \`#header\` |
| Classes, attributes, pseudo-classes | 0,0,1,0 | \`.card\`, \`[type]\`, \`:hover\` |
| Elements, pseudo-elements | 0,0,0,1 | \`div\`, \`::before\` |
| Universal selector | 0,0,0,0 | \`*\` |

**Examples:**
\`\`\`css
p { color: black; }                /* 0,0,0,1 */
.text { color: blue; }             /* 0,0,1,0 */
#main .text { color: green; }      /* 0,1,1,0 */
p.text { color: purple; }          /* 0,0,1,1 */
\`\`\`

**\`!important\`** overrides all specificity (use sparingly):
\`\`\`css
p { color: red !important; } /* Overrides everything except another !important */
\`\`\`

**Tip:** When specificity is equal, the rule that appears **last** in the stylesheet wins (cascade order).`,
    difficulty: 'intermediate',
    category: 'Selectors',
    tags: ['specificity', 'cascade', 'selectors', 'inheritance'],
  },
  {
    id: 'css-5',
    question: 'What is the difference between `display: none`, `visibility: hidden`, and `opacity: 0`?',
    answer: `All three hide an element visually, but they behave very differently:

| Property | Removes space? | Accessible to screen readers? | Events? | Animatable? |
|----------|---------------|-------------------------------|---------|-------------|
| \`display: none\` | ✅ Yes | ❌ No | ❌ No | ❌ No |
| \`visibility: hidden\` | ❌ No | ❌ No | ❌ No | ✅ Yes |
| \`opacity: 0\` | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |

\`\`\`css
/* Completely removed from layout */
.hidden-none {
  display: none;
}

/* Invisible but takes up space */
.hidden-visibility {
  visibility: hidden;
}

/* Transparent but still interactive */
.hidden-opacity {
  opacity: 0;
}
\`\`\`

**When to use which:**
- \`display: none\` — toggling components (show/hide modals, dropdowns)
- \`visibility: hidden\` — hiding elements while keeping layout intact (prevent layout shifts)
- \`opacity: 0\` — fade-in/fade-out animations, keeping element interactive`,
    difficulty: 'intermediate',
    category: 'Display',
    tags: ['display', 'visibility', 'opacity', 'hiding elements'],
  },
  {
    id: 'css-6',
    question: 'What is Flexbox and what are its key properties?',
    answer: `**Flexbox** (Flexible Box Layout) is a one-dimensional layout model that distributes space along a single axis (row or column), making it ideal for components and small-scale layouts.

**Enable Flexbox:**
\`\`\`css
.container {
  display: flex;
}
\`\`\`

**Container Properties:**
\`\`\`css
.container {
  display: flex;
  flex-direction: row;          /* row | column | row-reverse | column-reverse */
  justify-content: center;      /* Main axis: flex-start | flex-end | center | space-between | space-around | space-evenly */
  align-items: center;          /* Cross axis: stretch | flex-start | flex-end | center | baseline */
  flex-wrap: wrap;              /* nowrap | wrap | wrap-reverse */
  gap: 16px;                    /* Space between items */
}
\`\`\`

**Item Properties:**
\`\`\`css
.item {
  flex: 1;                      /* Shorthand: flex-grow flex-shrink flex-basis */
  flex-grow: 1;                 /* Grow to fill available space */
  flex-shrink: 1;               /* Shrink if needed */
  flex-basis: 200px;            /* Initial size */
  align-self: flex-start;       /* Override container's align-items */
  order: 2;                     /* Visual order (default: 0) */
}
\`\`\`

**Common Pattern — Centering:**
\`\`\`css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\``,
    difficulty: 'intermediate',
    category: 'Layout',
    tags: ['flexbox', 'layout', 'flex', 'alignment'],
  },
  {
    id: 'css-7',
    question: 'What is CSS Grid and how does it differ from Flexbox?',
    answer: `**CSS Grid** is a two-dimensional layout system that works with both rows and columns simultaneously, making it ideal for full-page layouts.

**Enable Grid:**
\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  grid-template-rows: auto;
  gap: 20px;
}
\`\`\`

**Key Grid Properties:**
\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 2fr;  /* fixed + flexible */
  grid-template-rows: 80px auto 60px;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  gap: 16px;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
\`\`\`

**Grid vs Flexbox:**

| Feature | Flexbox | Grid |
|---------|---------|------|
| Dimensions | 1D (row OR column) | 2D (rows AND columns) |
| Best for | Components, nav bars | Full-page layouts |
| Item placement | Flow-based | Precise placement |
| Browser support | Excellent | Excellent |

**Rule of thumb:** Use **Grid** for the overall page layout, **Flexbox** for the components inside it.`,
    difficulty: 'intermediate',
    category: 'Layout',
    tags: ['css-grid', 'layout', 'grid', 'flexbox'],
  },
  {
    id: 'css-8',
    question: 'What is the CSS `position` property and what are its values?',
    answer: `The **\`position\`** property controls how an element is placed in the document and how it interacts with the normal document flow.

**Values:**

**\`static\`** (default)
\`\`\`css
/* Normal flow, top/right/bottom/left have no effect */
.box { position: static; }
\`\`\`

**\`relative\`**
\`\`\`css
/* Positioned relative to its normal position, stays in flow */
.box {
  position: relative;
  top: 10px;    /* Moves down 10px from where it would normally be */
  left: 20px;
}
\`\`\`

**\`absolute\`**
\`\`\`css
/* Removed from flow, positioned relative to nearest positioned ancestor */
.parent { position: relative; }
.child {
  position: absolute;
  top: 0;
  right: 0;    /* Top-right corner of parent */
}
\`\`\`

**\`fixed\`**
\`\`\`css
/* Removed from flow, positioned relative to the viewport */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;   /* Stays at top on scroll */
}
\`\`\`

**\`sticky\`**
\`\`\`css
/* Hybrid: relative until scroll threshold, then fixed */
.header {
  position: sticky;
  top: 0;    /* Sticks when it reaches top of viewport */
}
\`\`\`

**Key Rule:** \`absolute\` positioning searches for the nearest ancestor with \`position\` other than \`static\`. If none found, it uses the viewport.`,
    difficulty: 'intermediate',
    category: 'Layout',
    tags: ['position', 'absolute', 'relative', 'fixed', 'sticky', 'layout'],
  },
  {
    id: 'css-9',
    question: 'What are CSS pseudo-classes and pseudo-elements? Give examples.',
    answer: `**Pseudo-classes** target elements in a specific **state**. They use a single colon (\`:\`).

\`\`\`css
/* User interaction states */
a:hover    { color: indigo; }          /* Mouse over */
a:focus    { outline: 2px solid blue; } /* Keyboard focus */
a:active   { color: red; }             /* Being clicked */
a:visited  { color: purple; }          /* Already visited */

/* Structural pseudo-classes */
li:first-child   { font-weight: bold; }
li:last-child    { border-bottom: none; }
li:nth-child(2n) { background: #f5f5f5; } /* Every even */
p:not(.intro)    { color: gray; }         /* Negation */

/* Form states */
input:focus    { border-color: blue; }
input:disabled { opacity: 0.5; }
input:checked  { accent-color: indigo; }
\`\`\`

**Pseudo-elements** target a specific **part** of an element. They use double colons (\`::\`).

\`\`\`css
/* Insert content before/after */
.card::before {
  content: "★ ";
  color: gold;
}

.card::after {
  content: "";
  display: block;
  border-bottom: 1px solid #eee;
}

/* First line / first letter */
p::first-line   { font-weight: bold; }
p::first-letter { font-size: 2em; float: left; }

/* Text selection */
::selection {
  background: indigo;
  color: white;
}

/* Placeholder text */
input::placeholder { color: #9ca3af; }
\`\`\``,
    difficulty: 'intermediate',
    category: 'Selectors',
    tags: ['pseudo-class', 'pseudo-element', 'selectors', 'hover', 'before', 'after'],
  },
  {
    id: 'css-10',
    question: 'What are CSS Custom Properties (CSS Variables) and how do you use them?',
    answer: `**CSS Custom Properties** (also called CSS Variables) let you store reusable values in the stylesheet, defined with a \`--\` prefix and accessed via \`var()\`.

**Declaring Variables:**
\`\`\`css
/* Defined on :root to be globally available */
:root {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --font-size-base: 16px;
  --spacing-md: 1rem;
  --border-radius: 8px;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
\`\`\`

**Using Variables:**
\`\`\`css
.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
  box-shadow: var(--shadow);
}

/* Fallback value if variable is not defined */
.text {
  color: var(--color-accent, #333);
}
\`\`\`

**Local Scoping:**
\`\`\`css
.dark-theme {
  --color-primary: #818cf8;  /* Override for dark theme */
}
\`\`\`

**Updating with JavaScript:**
\`\`\`javascript
document.documentElement.style.setProperty('--color-primary', '#f43f5e');
\`\`\`

**Advantages over preprocessor variables (Sass/Less):**
- Work at runtime (can be changed with JS)
- Inherited by child elements
- Respond to media queries and pseudo-classes
- Built into the browser — no build step needed`,
    difficulty: 'intermediate',
    category: 'Modern CSS',
    tags: ['css-variables', 'custom-properties', 'var', 'design-tokens'],
  },
  {
    id: 'css-11',
    question: 'What is responsive design and how do CSS media queries work?',
    answer: `**Responsive design** ensures a website looks and functions well on all screen sizes — from mobile phones to large desktop monitors.

**CSS Media Queries** apply styles conditionally based on device characteristics:

\`\`\`css
/* Mobile-first approach (recommended) */
/* Base styles apply to all screens */
.container {
  padding: 1rem;
  font-size: 14px;
}

/* Tablet and above */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 16px;
  }
}

/* Desktop and above */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem;
  }
}
\`\`\`

**Common Breakpoints:**
\`\`\`css
/* Tailwind-inspired breakpoints */
/* sm  */ @media (min-width: 640px)  { ... }
/* md  */ @media (min-width: 768px)  { ... }
/* lg  */ @media (min-width: 1024px) { ... }
/* xl  */ @media (min-width: 1280px) { ... }
\`\`\`

**Other Media Features:**
\`\`\`css
/* Dark mode preference */
@media (prefers-color-scheme: dark) {
  body { background: #0f0f0f; color: white; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}

/* Print styles */
@media print {
  .navbar, .footer { display: none; }
}

/* Orientation */
@media (orientation: landscape) { ... }
\`\`\``,
    difficulty: 'intermediate',
    category: 'Responsive Design',
    tags: ['responsive', 'media-queries', 'breakpoints', 'mobile-first'],
  },
  {
    id: 'css-12',
    question: 'What is the difference between `em`, `rem`, `px`, `%`, `vw`, and `vh` units?',
    answer: `CSS has several unit types for sizing. Understanding when to use each is critical:

**Absolute Units:**
\`\`\`css
.box {
  width: 200px;    /* pixels — fixed, doesn't scale */
  border: 1pt;     /* points (1pt = 1.33px) */
}
\`\`\`

**Relative Units:**

| Unit | Relative to | Use case |
|------|-------------|----------|
| \`em\` | Parent element's font-size | Spacing relative to local font size |
| \`rem\` | Root (\`html\`) font-size | Consistent typography scale |
| \`%\` | Parent element's value | Fluid widths and heights |
| \`vw\` | Viewport width | Full-width elements |
| \`vh\` | Viewport height | Full-screen sections |
| \`vmin\` | Smaller of vw/vh | Responsive shapes |

\`\`\`css
:root { font-size: 16px; }

h1 { font-size: 2rem; }      /* 32px — scales with root */

.card {
  padding: 1.5em;             /* 1.5x the card's own font size */
  width: 50%;                 /* 50% of parent width */
}

.hero {
  height: 100vh;              /* Full viewport height */
  width: 100vw;               /* Full viewport width */
}

/* Modern: clamp for fluid typography */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* Min: 1.5rem | Preferred: 4vw | Max: 3rem */
}
\`\`\`

**Best Practices:**
- Use \`rem\` for font sizes (accessibility — respects user browser settings)
- Use \`px\` for borders, shadows, fine details
- Use \`%\` or \`fr\` for layout widths
- Use \`vh\`/\`vw\` for full-screen sections`,
    difficulty: 'intermediate',
    category: 'Units',
    tags: ['units', 'rem', 'em', 'px', 'viewport', 'responsive'],
  },
  {
    id: 'css-13',
    question: 'How does CSS inheritance work?',
    answer: `**CSS Inheritance** is the mechanism by which certain CSS properties are automatically passed down from parent elements to their children.

**Inherited Properties** (common examples):
\`\`\`css
body {
  color: #333;           /* Children inherit this */
  font-family: Inter;    /* Children inherit this */
  font-size: 16px;       /* Children inherit this */
  line-height: 1.6;      /* Children inherit this */
}

/* A <p> inside <body> automatically gets color, font-family, etc. */
\`\`\`

**Non-inherited Properties** (common examples):
- \`background\`, \`border\`, \`margin\`, \`padding\`, \`width\`, \`height\`, \`display\`, \`position\`

**Controlling Inheritance:**
\`\`\`css
.child {
  /* Force inherit from parent */
  color: inherit;

  /* Reset to browser default */
  color: initial;

  /* Use the property's computed value (like inherit but smarter) */
  color: unset;

  /* Reset to browser UA stylesheet */
  color: revert;
}
\`\`\`

**Practical Example:**
\`\`\`css
.card {
  font-size: 14px;   /* All text inside .card will be 14px */
  color: #374151;    /* All text inside .card will be dark gray */
  border: 1px solid #e5e7eb;  /* NOT inherited by children */
  background: white;           /* NOT inherited by children */
}
\`\`\``,
    difficulty: 'intermediate',
    category: 'Cascade & Inheritance',
    tags: ['inheritance', 'cascade', 'inherit', 'initial', 'unset'],
  },
  {
    id: 'css-14',
    question: 'What are CSS transitions and how do they work?',
    answer: `**CSS Transitions** allow property changes to occur gradually over a specified duration, creating smooth animations without JavaScript.

**Syntax:**
\`\`\`css
/* transition: property duration timing-function delay; */
.button {
  background: #6366f1;
  transform: scale(1);
  transition: background 0.3s ease, transform 0.2s ease;
}

.button:hover {
  background: #4f46e5;
  transform: scale(1.05);
}
\`\`\`

**Transition Properties:**
\`\`\`css
.element {
  transition-property: background, color, transform; /* What to animate */
  transition-duration: 0.3s;                          /* How long */
  transition-timing-function: ease-in-out;           /* Speed curve */
  transition-delay: 0.1s;                            /* Start after delay */

  /* Shorthand */
  transition: all 0.3s ease;
}
\`\`\`

**Timing Functions:**
\`\`\`css
transition-timing-function: ease;           /* Slow start and end (default) */
transition-timing-function: linear;         /* Constant speed */
transition-timing-function: ease-in;        /* Slow start */
transition-timing-function: ease-out;       /* Slow end */
transition-timing-function: ease-in-out;    /* Slow start and end */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* Custom */
\`\`\`

**Performant Transitions:** Only animate \`transform\` and \`opacity\` for 60fps animations (they don't trigger layout reflow):
\`\`\`css
.card {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}
\`\`\``,
    difficulty: 'intermediate',
    category: 'Animations',
    tags: ['transitions', 'animation', 'hover', 'transform', 'performance'],
  },
  {
    id: 'css-15',
    question: 'What are CSS animations and how are they different from transitions?',
    answer: `**CSS Animations** use \`@keyframes\` to create multi-step animations that can run automatically, loop, and have complex sequences. Transitions only animate between two states (start → end).

**Defining Keyframes:**
\`\`\`css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes slideIn {
  0%   { transform: translateX(-100%); opacity: 0; }
  60%  { transform: translateX(10px); }
  100% { transform: translateX(0); opacity: 1; }
}
\`\`\`

**Applying Animations:**
\`\`\`css
.element {
  animation-name: fadeIn;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0.2s;
  animation-iteration-count: 1;    /* or infinite */
  animation-direction: normal;     /* normal | reverse | alternate */
  animation-fill-mode: forwards;   /* Holds final state after animation */

  /* Shorthand */
  animation: fadeIn 0.5s ease-out 0.2s 1 forwards;
}
\`\`\`

**Transitions vs Animations:**

| | Transitions | Animations |
|--|-------------|------------|
| Trigger | Requires user interaction/state change | Can run automatically |
| Steps | Two states only | Multiple keyframes |
| Looping | No | Yes |
| Control | Limited | Pause, reverse, iteration count |`,
    difficulty: 'intermediate',
    category: 'Animations',
    tags: ['animations', 'keyframes', 'transitions', 'motion'],
  },
  {
    id: 'css-16',
    question: 'What is `z-index` and how does stacking context work?',
    answer: `**\`z-index\`** controls the vertical stacking order of elements along the Z-axis (depth). Higher values appear on top.

**Basic Usage:**
\`\`\`css
.modal-overlay {
  position: fixed;
  z-index: 1000;
}

.modal {
  position: relative;
  z-index: 1001;
}

.tooltip {
  position: absolute;
  z-index: 500;
}
\`\`\`

**Important Rules:**
- \`z-index\` only works on **positioned elements** (\`position\` other than \`static\`)
- Without a position, \`z-index\` has no effect

**Stacking Context:**
A stacking context is a 3D space within which child elements are stacked. New stacking contexts are created by:
\`\`\`css
/* These ALL create a new stacking context */
.element {
  position: relative; z-index: 1;
  opacity: 0.99;           /* Any opacity < 1 */
  transform: translateZ(0); /* Any transform */
  filter: blur(0px);       /* Any filter */
  isolation: isolate;      /* Explicit stacking context */
  will-change: transform;  /* Hint to browser */
}
\`\`\`

**Common Gotcha:**
\`\`\`css
/* Parent has z-index: 1 (creates stacking context) */
.parent { position: relative; z-index: 1; }

/* Child z-index: 9999 is still BELOW .other (z-index: 2) */
/* because the parent stacking context caps it at z-index: 1 */
.child { z-index: 9999; }
.other { position: relative; z-index: 2; }
\`\`\``,
    difficulty: 'advanced',
    category: 'Layout',
    tags: ['z-index', 'stacking-context', 'position', 'layering'],
  },
  {
    id: 'css-17',
    question: 'What is the CSS `transform` property and what can it do?',
    answer: `The **\`transform\`** property applies 2D and 3D transformations to elements without affecting the document flow — other elements don't shift.

**2D Transforms:**
\`\`\`css
.element {
  /* Translate (move) */
  transform: translateX(50px);
  transform: translateY(-20px);
  transform: translate(50px, -20px);

  /* Scale */
  transform: scale(1.5);          /* Scale equally */
  transform: scaleX(2);           /* Scale horizontally */
  transform: scaleY(0.5);         /* Scale vertically */

  /* Rotate */
  transform: rotate(45deg);       /* Clockwise rotation */
  transform: rotate(-90deg);

  /* Skew */
  transform: skewX(20deg);
  transform: skewY(-10deg);

  /* Multiple transforms (right to left) */
  transform: translateY(-10px) scale(1.05) rotate(5deg);
}
\`\`\`

**3D Transforms:**
\`\`\`css
.parent {
  perspective: 1000px;            /* Required for 3D effect */
}

.card {
  transform: rotateX(30deg);
  transform: rotateY(45deg);
  transform: translateZ(100px);
  transform-style: preserve-3d;  /* Children in 3D space */
}
\`\`\`

**Performance Tip:**
\`\`\`css
/* transform uses GPU compositing — very performant */
/* Use for animations instead of changing top/left */
.slide {
  /* ❌ Slow - triggers layout */
  /* top: 10px; */

  /* ✅ Fast - GPU composited */
  transform: translateY(10px);
}
\`\`\``,
    difficulty: 'intermediate',
    category: 'Animations',
    tags: ['transform', 'translate', 'rotate', 'scale', '3d', 'animations'],
  },
  {
    id: 'css-18',
    question: 'What is the difference between `min-width`, `max-width`, and `width`?',
    answer: `These three properties control the sizing behavior of elements:

**\`width\`** — Sets the exact width:
\`\`\`css
.box {
  width: 300px;  /* Always 300px, even if content is smaller or container is smaller */
}
\`\`\`

**\`max-width\`** — Sets the maximum width the element can be:
\`\`\`css
.container {
  width: 100%;       /* Fill parent */
  max-width: 1200px; /* But never wider than 1200px */
  margin: 0 auto;    /* Center when constrained by max-width */
}
/* On small screens: takes full width. On large screens: capped at 1200px */
\`\`\`

**\`min-width\`** — Sets the minimum width the element must be:
\`\`\`css
.button {
  min-width: 120px;  /* Never shrinks below 120px */
  padding: 8px 16px;
}
\`\`\`

**Combined Example:**
\`\`\`css
.card {
  width: 100%;       /* Fill parent by default */
  min-width: 200px;  /* Never smaller than 200px */
  max-width: 400px;  /* Never wider than 400px */
}
\`\`\`

**\`clamp()\` — Modern Alternative:**
\`\`\`css
.element {
  /* clamp(min, preferred, max) */
  width: clamp(200px, 50%, 400px);
  font-size: clamp(1rem, 2.5vw, 2rem);
}
\`\`\``,
    difficulty: 'beginner',
    category: 'Layout',
    tags: ['width', 'max-width', 'min-width', 'responsive', 'sizing'],
  },
  {
    id: 'css-19',
    question: 'What is CSS `overflow` and when would you use it?',
    answer: `**\`overflow\`** controls what happens when content is larger than its container.

**Values:**
\`\`\`css
.box {
  overflow: visible;  /* Default - content spills outside */
  overflow: hidden;   /* Clips content at the edge */
  overflow: scroll;   /* Always shows scrollbars */
  overflow: auto;     /* Shows scrollbars only when needed (best practice) */
}

/* Control axes independently */
.element {
  overflow-x: auto;    /* Horizontal */
  overflow-y: hidden;  /* Vertical */
}
\`\`\`

**Common Use Cases:**

1. **Scrollable containers:**
\`\`\`css
.code-block {
  overflow-x: auto;     /* Horizontal scroll for long code */
  white-space: pre;
}

.sidebar {
  height: 100vh;
  overflow-y: auto;     /* Scroll sidebar independently */
}
\`\`\`

2. **Clip image containers:**
\`\`\`css
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;     /* Clip image to circle */
}
\`\`\`

3. **Clear floats (old technique):**
\`\`\`css
.clearfix {
  overflow: hidden;     /* Contains floated children */
}
\`\`\`

4. **Hide scrollbar but keep scrollability:**
\`\`\`css
.scroll-container {
  overflow: auto;
  scrollbar-width: none;         /* Firefox */
  -ms-overflow-style: none;     /* IE */
}
.scroll-container::-webkit-scrollbar {
  display: none;                  /* Chrome/Safari */
}
\`\`\``,
    difficulty: 'beginner',
    category: 'Layout',
    tags: ['overflow', 'scroll', 'hidden', 'clipping'],
  },
  {
    id: 'css-20',
    question: 'What is the CSS `::before` and `::after` pseudo-element and what is `content`?',
    answer: `**\`::before\`** and **\`::after\`** are pseudo-elements that insert generated content directly before or after an element's content. They must have a \`content\` property to be visible.

**Basic Syntax:**
\`\`\`css
.element::before {
  content: "★ ";   /* Text content */
}

.element::after {
  content: "";      /* Empty string — still required! */
  display: block;
}
\`\`\`

**Practical Examples:**

**Required field indicator:**
\`\`\`css
label.required::after {
  content: " *";
  color: red;
}
\`\`\`

**Decorative underline:**
\`\`\`css
h2 {
  position: relative;
  display: inline-block;
}
h2::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 2px;
}
\`\`\`

**Tooltip with CSS only:**
\`\`\`css
[data-tooltip]::after {
  content: attr(data-tooltip);   /* Read from HTML attribute! */
  position: absolute;
  background: black;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}
[data-tooltip]:hover::after {
  opacity: 1;
}
\`\`\`

**Key Points:**
- \`::before\` and \`::after\` are inline by default — use \`display: block\` or \`display: flex\` when needed
- They don't appear in the DOM (can't be selected with JavaScript)
- They're children of the element, not siblings`,
    difficulty: 'intermediate',
    category: 'Selectors',
    tags: ['pseudo-element', 'before', 'after', 'content', 'generated-content'],
  },
  {
    id: 'css-21',
    question: 'What is a CSS preprocessor? What are the benefits of using Sass?',
    answer: `A **CSS preprocessor** extends CSS with features like variables, nesting, mixins, functions, and imports — then compiles down to regular CSS.

**Popular preprocessors:** Sass (SCSS), Less, Stylus

**Sass (SCSS syntax) features:**

**Variables:**
\`\`\`scss
$primary: #6366f1;
$spacing-md: 1rem;
$border-radius: 8px;

.button {
  background: $primary;
  padding: $spacing-md;
  border-radius: $border-radius;
}
\`\`\`

**Nesting:**
\`\`\`scss
.nav {
  background: #1e1b4b;

  &__item {           /* .nav__item (BEM) */
    padding: 1rem;
    color: white;

    &:hover {         /* .nav__item:hover */
      color: #a5b4fc;
    }

    &.active {        /* .nav__item.active */
      font-weight: bold;
    }
  }
}
\`\`\`

**Mixins:**
\`\`\`scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin respond-to($breakpoint) {
  @if $breakpoint == mobile {
    @media (max-width: 767px) { @content; }
  } @else if $breakpoint == tablet {
    @media (min-width: 768px) { @content; }
  }
}

.hero {
  @include flex-center;
  @include respond-to(mobile) { padding: 1rem; }
}
\`\`\`

**Note:** With modern CSS (Custom Properties, \`clamp()\`, \`color-mix()\`, native nesting in CSS), the gap between Sass and vanilla CSS is narrowing.`,
    difficulty: 'advanced',
    category: 'Modern CSS',
    tags: ['sass', 'scss', 'preprocessor', 'variables', 'mixins', 'nesting'],
  },
  {
    id: 'css-22',
    question: 'What is the BEM naming convention in CSS?',
    answer: `**BEM** stands for **Block, Element, Modifier** — a naming methodology that makes CSS class names more meaningful, reusable, and predictable.

**Structure:**
- **Block** — standalone component (e.g., \`.card\`, \`.navbar\`, \`.button\`)
- **Element** — part of a block, separated by \`__\` (e.g., \`.card__title\`, \`.card__image\`)
- **Modifier** — variation or state, separated by \`--\` (e.g., \`.button--primary\`, \`.card--featured\`)

**Example:**
\`\`\`html
<div class="card card--featured">
  <img class="card__image" src="..." />
  <div class="card__body">
    <h2 class="card__title">Title</h2>
    <p class="card__description">Text...</p>
    <button class="button button--primary">Read More</button>
    <button class="button button--secondary">Share</button>
  </div>
</div>
\`\`\`

\`\`\`css
/* Block */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Block Modifier */
.card--featured {
  border: 2px solid #6366f1;
}

/* Elements */
.card__image { width: 100%; }
.card__title { font-size: 1.25rem; font-weight: bold; }
.card__description { color: #6b7280; }

/* Button Block */
.button { padding: 8px 16px; border-radius: 6px; cursor: pointer; }
.button--primary { background: #6366f1; color: white; }
.button--secondary { background: transparent; border: 1px solid #6366f1; }
\`\`\`

**Benefits:**
- Low specificity (all single classes)
- Self-documenting class names
- Easier to find what styles belong where
- Avoids cascade conflicts`,
    difficulty: 'intermediate',
    category: 'Architecture',
    tags: ['bem', 'naming-convention', 'architecture', 'methodology'],
  },
  {
    id: 'css-23',
    question: 'How does CSS Grid `fr` unit work and how is it different from percentages?',
    answer: `The **\`fr\`** (fraction) unit is exclusive to CSS Grid and represents a fraction of the **available free space** in the grid container — after fixed-size elements are accounted for.

**Basic \`fr\` usage:**
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 3 equal columns */
  /* Same as: repeat(3, 1fr) */
}
\`\`\`

**\`fr\` vs \`%\` — The Key Difference:**
\`\`\`css
/* With % — gap space is NOT accounted for */
.grid-percent {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  gap: 20px;
  /* Problem: Total = 100% + 40px gap = overflow! */
}

/* With fr — gap is subtracted first, then fr divides remaining */
.grid-fr {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  /* Perfect: fr divides remaining space after gap */
}
\`\`\`

**Mixed units — fr takes remaining space:**
\`\`\`css
.layout {
  display: grid;
  /* Sidebar: fixed 250px, Main: takes all remaining space */
  grid-template-columns: 250px 1fr;

  /* More complex */
  grid-template-columns: 200px 2fr 1fr;
  /* 200px fixed, remaining split: 2/3 and 1/3 */
}
\`\`\`

**With \`minmax()\`:**
\`\`\`css
.grid {
  /* Responsive auto-fill columns: min 200px, max 1fr */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
\`\`\``,
    difficulty: 'advanced',
    category: 'Layout',
    tags: ['css-grid', 'fr-unit', 'grid', 'layout', 'responsive'],
  },
  {
    id: 'css-24',
    question: 'What are CSS `will-change` and how does it affect performance?',
    answer: `**\`will-change\`** hints to the browser that an element's property is about to change, allowing it to prepare optimizations in advance (like moving the element to its own GPU layer).

**Usage:**
\`\`\`css
.animated-card {
  will-change: transform, opacity;
}

.scrolling-element {
  will-change: scroll-position;
}
\`\`\`

**How it works:**
- Promotes the element to its own **compositor layer**
- Transformations and opacity changes can be handled by the GPU
- Avoids triggering main thread layout and paint operations
- Achieves **60fps animations**

**When to use:**
\`\`\`css
/* ✅ Good: Add shortly before animation, remove after */
.card:hover {
  will-change: transform;
}

/* ✅ Good: Elements that are frequently animated */
.sidebar {
  will-change: transform; /* Slide in/out animation */
}
\`\`\`

**Cautions:**
\`\`\`css
/* ❌ Bad: Don't apply to everything — wastes memory */
* { will-change: transform; }

/* ❌ Bad: Don't use for elements that rarely change */
h1 { will-change: opacity; }
\`\`\`

**Better Approach — add/remove with JavaScript:**
\`\`\`javascript
element.addEventListener('mouseenter', () => {
  element.style.willChange = 'transform';
});
element.addEventListener('animationend', () => {
  element.style.willChange = 'auto';
});
\`\`\`

**Always prefer animating \`transform\` and \`opacity\`** — they trigger only the composite step, skipping layout and paint entirely.`,
    difficulty: 'advanced',
    category: 'Performance',
    tags: ['will-change', 'performance', 'GPU', 'animations', 'optimization'],
  },
  {
    id: 'css-25',
    question: 'What is the CSS `clip-path` property and what can you create with it?',
    answer: `**\`clip-path\`** clips an element to a specific shape — anything outside the shape is hidden. It can create complex geometric shapes and mask effects.

**Basic Shapes:**
\`\`\`css
/* Circle */
.avatar {
  clip-path: circle(50%);
  /* or: circle(50px at center) */
}

/* Ellipse */
.element {
  clip-path: ellipse(75% 50% at center);
}

/* Inset (rectangle with optional rounded corners) */
.card {
  clip-path: inset(10px 20px 10px 20px round 8px);
  /* inset(top right bottom left round border-radius) */
}

/* Polygon */
.triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.hexagon {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

/* Diagonal section divider */
.hero {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}
\`\`\`

**Animating \`clip-path\`:**
\`\`\`css
.button {
  clip-path: circle(0% at center);
  transition: clip-path 0.4s ease;
}
.button:hover {
  clip-path: circle(150% at center); /* Ripple reveal effect */
}
\`\`\`

**Using SVG path for complex shapes:**
\`\`\`css
.complex {
  clip-path: url(#my-svg-clip-path);
}
\`\`\`

**Practical Use Cases:**
- Circular avatars (better alternative to \`border-radius: 50%\` for non-square images)
- Diagonal section separators
- Reveal animations
- Image masking effects
- Star and arrow shapes`,
    difficulty: 'advanced',
    category: 'Modern CSS',
    tags: ['clip-path', 'shapes', 'masking', 'animations', 'modern-css'],
  },
];
