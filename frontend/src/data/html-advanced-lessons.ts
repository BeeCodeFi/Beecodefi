import { TutorialLesson } from "@/types";

// Advanced HTML lessons to be added to html-tutorials.ts
export const htmlAdvancedLessons: TutorialLesson[] = [
  {
    slug: "canvas-api",
    title: "Canvas API - Drawing Graphics",
    difficulty: "advanced",
    estimatedMinutes: 30,
    mdnReference:
      "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API",
    content: `The HTML5 Canvas API provides a powerful way to draw graphics using JavaScript. You can create charts, animations, games, and image manipulations directly in the browser.

## What is Canvas?

The \`<canvas>\` element creates a drawing surface. By itself, it does nothing — you need JavaScript to draw on it. The canvas has a 2D rendering context that provides methods for drawing shapes, text, images, and more.

## Basic Canvas Setup

\`\`\`html
<canvas id="myCanvas" width="800" height="600"></canvas>
\`\`\`

Then in JavaScript:
\`\`\`javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
\`\`\`

## Drawing Shapes

**Rectangle:**
- \`fillRect(x, y, width, height)\` — Filled rectangle
- \`strokeRect(x, y, width, height)\` — Rectangle outline
- \`clearRect(x, y, width, height)\` — Clear area

**Paths:**
- \`beginPath()\` — Start a new path
- \`moveTo(x, y)\` — Move without drawing
- \`lineTo(x, y)\` — Draw line to point
- \`arc(x, y, radius, startAngle, endAngle)\` — Draw arc/circle
- \`fill()\` — Fill the path
- \`stroke()\` — Draw the path outline

## Colors and Styles

- \`fillStyle = color\` — Set fill color
- \`strokeStyle = color\` — Set stroke color
- \`lineWidth = width\` — Set line width
- \`font = '20px Arial'\` — Set font for text
- \`fillText(text, x, y)\` — Draw filled text
- \`strokeText(text, x, y)\` — Draw text outline

## Gradients and Patterns

Create linear or radial gradients:
\`\`\`javascript
const gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, 'red');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
\`\`\`

## Canvas Use Cases

- **Data visualization** — Charts and graphs
- **Games** — 2D game graphics
- **Image editing** — Filters and effects
- **Animations** — Frame-by-frame drawing
- **Signatures** — Drawing input for forms
- **Generative art** — Procedural graphics`,
    keyTakeaways: [
      "Canvas provides a JavaScript-controlled drawing surface",
      "Get the 2D context with getContext('2d')",
      "Draw shapes with fillRect, strokeRect, and path methods",
      "Use fillStyle and strokeStyle to set colors",
      "Canvas is resolution-dependent (use CSS for responsive sizing)",
    ],
    codeExamples: [
      {
        title: "Canvas Basics - Shapes and Colors",
        language: "html",
        description:
          "Drawing basic shapes, lines, and text on canvas with different colors.",
        code: `<canvas id="canvas1" width="600" height="400"></canvas>

<script>
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// Filled rectangle
ctx.fillStyle = '#6366f1';
ctx.fillRect(50, 50, 150, 100);

// Rectangle outline
ctx.strokeStyle = '#ec4899';
ctx.lineWidth = 3;
ctx.strokeRect(250, 50, 150, 100);

// Circle
ctx.fillStyle = '#10b981';
ctx.beginPath();
ctx.arc(125, 250, 60, 0, Math.PI * 2);
ctx.fill();

// Line
ctx.strokeStyle = '#f59e0b';
ctx.lineWidth = 5;
ctx.beginPath();
ctx.moveTo(250, 200);
ctx.lineTo(400, 300);
ctx.stroke();

// Text
ctx.fillStyle = '#1f2937';
ctx.font = 'bold 24px Arial';
ctx.fillText('Canvas API', 450, 100);
</script>`,
        livePreview: true,
      },
      {
        title: "Canvas Animation - Moving Ball",
        language: "html",
        description:
          "Creating a simple animation loop with requestAnimationFrame.",
        code: `<canvas id="canvas2" width="600" height="400"></canvas>

<script>
const canvas = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');

let x = 50;
let y = 200;
let dx = 2;
let dy = 1.5;
const radius = 20;

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#6366f1';
    ctx.fill();
    ctx.closePath();

    // Bounce off walls
    if (x + dx > canvas.width - radius || x + dx < radius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - radius || y + dy < radius) {
        dy = -dy;
    }

    // Move ball
    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}

draw();
</script>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "canvas-1",
        title: "Draw a Rectangle",
        instruction:
          "Use canvas to draw a filled blue rectangle at position (100, 100) with width 200 and height 150.",
        startingCode: `<canvas id="c" width="400" height="300"></canvas>
<script>
const ctx = document.getElementById('c').getContext('2d');
// Your code here
</script>`,
        expectedOutput: `ctx.fillStyle = 'blue';
ctx.fillRect(100, 100, 200, 150);`,
        hints: [
          "Set fillStyle to 'blue' first",
          "Use fillRect(x, y, width, height)",
        ],
      },
    ],
    quickQuiz: {
      question: "What method do you use to get the 2D drawing context of a canvas?",
      options: [
        "canvas.getContext('2d')",
        "canvas.get2DContext()",
        "canvas.createContext()",
        "canvas.drawContext()"
      ],
      correctAnswer: 0,
      explanation: "Use canvas.getContext('2d') to get the CanvasRenderingContext2D object that provides all drawing methods."
    },
  },
  {
    slug: "svg-graphics",
    title: "SVG - Scalable Vector Graphics",
    difficulty: "advanced",
    estimatedMinutes: 30,
    mdnReference:
      "https://developer.mozilla.org/en-US/docs/Web/SVG",
    content: `SVG (Scalable Vector Graphics) is an XML-based format for vector graphics that scale perfectly at any size without losing quality. Unlike raster images (JPG, PNG), SVGs use mathematical descriptions of shapes.

## Why Use SVG?

- **Scalability** — Looks sharp on all screen sizes and resolutions
- **Small file size** — Often smaller than raster images
- **Animatable** — Can be animated with CSS or JavaScript
- **Styleable** — Can be styled with CSS
- **Accessible** — Search engines and screen readers can read SVG content
- **Interactive** — Supports hover, click, and other events

## Inline SVG vs External SVG

**Inline SVG** — Embedded directly in HTML:
\`\`\`html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="blue" />
</svg>
\`\`\`

**External SVG** — Referenced as an image:
\`\`\`html
<img src="icon.svg" alt="Icon">
\`\`\`

Inline SVG allows CSS styling and JavaScript manipulation, while external SVG is simpler but less flexible.

## Basic SVG Shapes

- \`<rect>\` — Rectangle
- \`<circle>\` — Circle
- \`<ellipse>\` — Ellipse
- \`<line>\` — Line
- \`<polyline>\` — Connected lines
- \`<polygon>\` — Closed shape
- \`<path>\` — Complex paths (most powerful)

## SVG Coordinate System

SVG uses a coordinate system where:
- (0, 0) is the top-left corner
- X increases to the right
- Y increases downward
- The \`viewBox\` attribute defines the SVG coordinate system

## Styling SVG

SVG has special styling properties:
- \`fill\` — Fill color
- \`stroke\` — Outline color
- \`stroke-width\` — Outline thickness
- \`opacity\` — Transparency
- \`transform\` — Rotate, scale, translate

## SVG Icons vs Icon Fonts

SVG icons are now preferred over icon fonts because:
- Better accessibility
- Easier to style (multi-color)
- No font loading delays
- Better semantic meaning`,
    keyTakeaways: [
      "SVG graphics scale perfectly without quality loss",
      "Inline SVG can be styled with CSS and animated",
      "Use <circle>, <rect>, <path> for basic shapes",
      "viewBox defines the SVG coordinate system",
      "SVG icons are preferred over icon fonts for accessibility",
    ],
    codeExamples: [
      {
        title: "SVG Basic Shapes",
        language: "html",
        description:
          "Creating different SVG shapes with fill and stroke styles.",
        code: `<!-- Circle -->
<svg width="200" height="200">
  <circle cx="100" cy="100" r="80" 
          fill="#6366f1" stroke="#4f46e5" stroke-width="3" />
</svg>

<!-- Rectangle with rounded corners -->
<svg width="200" height="150">
  <rect x="20" y="20" width="160" height="110" rx="10"
        fill="#10b981" opacity="0.8" />
</svg>

<!-- Star using polygon -->
<svg width="200" height="200">
  <polygon points="100,10 40,180 190,60 10,60 160,180"
           fill="#f59e0b" stroke="#dc2626" stroke-width="2" />
</svg>

<!-- Path (heart shape) -->
<svg width="200" height="200" viewBox="0 0 100 100">
  <path d="M50,90 C20,70 10,50 10,35 C10,20 20,10 30,10 C40,10 45,15 50,25 C55,15 60,10 70,10 C80,10 90,20 90,35 C90,50 80,70 50,90 Z"
        fill="#ec4899" />
</svg>`,
        livePreview: true,
      },
      {
        title: "Animated SVG Icon",
        language: "html",
        description:
          "Creating an animated loading spinner with SVG and CSS.",
        code: `<svg width="100" height="100" viewBox="0 0 50 50" class="spinner">
  <circle cx="25" cy="25" r="20" 
          fill="none" stroke="#6366f1" 
          stroke-width="4" stroke-dasharray="80" 
          stroke-dashoffset="60" />
</svg>

<style>
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

<!-- Hover effect on SVG -->
<svg width="100" height="100" viewBox="0 0 100 100" class="icon-hover">
  <rect x="10" y="10" width="80" height="80" rx="10"
        fill="#6366f1" />
  <text x="50" y="60" text-anchor="middle" 
        fill="white" font-size="40" font-weight="bold">A</text>
</svg>

<style>
.icon-hover rect {
  transition: fill 0.3s ease;
}
.icon-hover:hover rect {
  fill: #4f46e5;
}
</style>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "svg-1",
        title: "Create an SVG Circle",
        instruction:
          "Create an SVG with a blue circle at center (100, 100) with radius 50.",
        startingCode: `<svg width="200" height="200">
  <!-- Your circle here -->
</svg>`,
        expectedOutput: `<svg width="200" height="200">
  <circle cx="100" cy="100" r="50" fill="blue" />
</svg>`,
        hints: [
          "Use <circle> with cx, cy (center) and r (radius)",
          "Add fill attribute for color",
        ],
      },
    ],
    quickQuiz: {
      question: "What does SVG stand for?",
      options: [
        "Scalable Vector Graphics",
        "Simple Vector Graphics",
        "Standard Visual Graphics",
        "Structured Vector Geometry"
      ],
      correctAnswer: 0,
      explanation: "SVG stands for Scalable Vector Graphics - it's an XML-based format for vector graphics that scale perfectly at any resolution."
    },
  },
  {
    slug: "web-components",
    title: "Web Components - Custom Elements",
    difficulty: "advanced",
    estimatedMinutes: 35,
    mdnReference:
      "https://developer.mozilla.org/en-US/docs/Web/API/Web_components",
    content: `Web Components are a set of web platform APIs that allow you to create reusable custom HTML elements with encapsulated functionality. They're framework-agnostic and work with vanilla JavaScript.

## The Three Technologies

Web Components consist of three main technologies:

**1. Custom Elements** — Define your own HTML tags
**2. Shadow DOM** — Encapsulated styling and markup
**3. HTML Templates** — Reusable markup with \`<template>\` and \`<slot>\`

## Creating a Custom Element

Custom elements must:
- Have a hyphen in the name (e.g., \`my-button\`, not \`mybutton\`)
- Extend \`HTMLElement\` or another HTML element
- Be registered with \`customElements.define()\`

Basic structure:
\`\`\`javascript
class MyElement extends HTMLElement {
  constructor() {
    super();
    // Initialize
  }

  connectedCallback() {
    // Called when element is added to DOM
    this.innerHTML = \`<p>Hello!</p>\`;
  }
}

customElements.define('my-element', MyElement);
\`\`\`

## Shadow DOM

Shadow DOM provides encapsulation — styles and scripts inside don't leak out, and outside styles don't leak in.

\`\`\`javascript
class MyComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`
      <style>p { color: blue; }</style>
      <p>Shadow DOM content</p>
    \`;
  }
}
\`\`\`

## HTML Templates

The \`<template>\` element holds HTML that isn't rendered until JavaScript clones it:

\`\`\`html
<template id="my-template">
  <style>/* scoped styles */</style>
  <div class="card">
    <slot name="title"></slot>
    <slot></slot>
  </div>
</template>
\`\`\`

## Slots

Slots allow you to compose content:
- **Default slot** — \`<slot></slot>\` accepts any content
- **Named slots** — \`<slot name="header"></slot>\` accepts specific content

## Lifecycle Callbacks

- \`constructor()\` — Element created
- \`connectedCallback()\` — Added to DOM
- \`disconnectedCallback()\` — Removed from DOM
- \`attributeChangedCallback()\` — Attribute changed
- \`adoptedCallback()\` — Moved to new document

## When to Use Web Components

- Building design systems
- Creating reusable widgets
- Framework-agnostic components
- Micro-frontends
- Component libraries`,
    keyTakeaways: [
      "Web Components create reusable custom HTML elements",
      "Custom element names must contain a hyphen",
      "Shadow DOM provides style and markup encapsulation",
      "Use <template> and <slot> for reusable markup",
      "connectedCallback() runs when element is added to DOM",
    ],
    codeExamples: [
      {
        title: "Simple Custom Element",
        language: "html",
        description:
          "Creating a basic custom element that displays a greeting.",
        code: `<!-- Use the custom element -->
<greeting-card name="Ayush"></greeting-card>

<script>
class GreetingCard extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name') || 'World';
    this.innerHTML = \`
      <div style="border: 2px solid #6366f1; padding: 20px; border-radius: 8px;">
        <h2 style="color: #6366f1; margin: 0;">Hello, \${name}!</h2>
        <p style="margin: 10px 0 0;">Welcome to Web Components</p>
      </div>
    \`;
  }
}

customElements.define('greeting-card', GreetingCard);
</script>`,
        livePreview: true,
      },
      {
        title: "Web Component with Shadow DOM",
        language: "html",
        description:
          "A custom element with Shadow DOM for true style encapsulation.",
        code: `<!-- Custom button with encapsulated styles -->
<custom-button>Click Me</custom-button>

<script>
class CustomButton extends HTMLElement {
  constructor() {
    super();
    
    // Attach shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });
    
    // Create button
    shadow.innerHTML = \`
      <style>
        button {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s;
        }
        button:hover {
          transform: translateY(-2px);
        }
        button:active {
          transform: translateY(0);
        }
      </style>
      <button><slot></slot></button>
    \`;
    
    // Add click handler
    shadow.querySelector('button').addEventListener('click', () => {
      alert('Custom button clicked!');
    });
  }
}

customElements.define('custom-button', CustomButton);
</script>

<!-- Regular button not affected by shadow styles -->
<button>Regular Button</button>`,
        livePreview: true,
      },
      {
        title: "Web Component with Slots",
        language: "html",
        description:
          "Using named slots to compose flexible component content.",
        code: `<!-- User card with named slots -->
<user-card>
  <span slot="name">Ayush Kumar</span>
  <span slot="role">Full Stack Developer</span>
  <p slot="bio">Passionate about web development and teaching.</p>
</user-card>

<script>
class UserCard extends HTMLElement {
  constructor() {
    super();
    
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`
      <style>
        .card {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          max-width: 300px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .name {
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 8px;
        }
        .role {
          color: #6366f1;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
          display: block;
        }
        .bio {
          color: #6b7280;
          line-height: 1.6;
        }
      </style>
      <div class="card">
        <div class="name"><slot name="name"></slot></div>
        <span class="role"><slot name="role"></slot></span>
        <div class="bio"><slot name="bio"></slot></div>
      </div>
    \`;
  }
}

customElements.define('user-card', UserCard);
</script>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "webcomp-1",
        title: "Create a Custom Element",
        instruction:
          "Define a custom element called 'hello-world' that displays 'Hello, World!' in a paragraph.",
        startingCode: `<hello-world></hello-world>

<script>
class HelloWorld extends HTMLElement {
  connectedCallback() {
    // Your code here
  }
}

// Register the element
</script>`,
        expectedOutput: `this.innerHTML = '<p>Hello, World!</p>';
customElements.define('hello-world', HelloWorld);`,
        hints: [
          "Set this.innerHTML in connectedCallback()",
          "Use customElements.define() to register",
        ],
      },
    ],
    quickQuiz: {
      question: "What must all custom element names contain?",
      options: [
        "A hyphen (-)",
        "An underscore (_)",
        "Capital letters",
        "Numbers"
      ],
      correctAnswer: 0,
      explanation: "Custom element names must contain a hyphen to distinguish them from standard HTML elements. Examples: my-button, user-card."
    },
  },
  {
    slug: "drag-and-drop-api",
    title: "Drag and Drop API",
    difficulty: "advanced",
    estimatedMinutes: 25,
    mdnReference:
      "https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API",
    content: `The HTML5 Drag and Drop API allows users to drag elements around the page and drop them in designated areas. It's commonly used for file uploads, reordering lists, kanban boards, and interactive interfaces.

## Making Elements Draggable

Add the \`draggable="true"\` attribute to any element to make it draggable:

\`\`\`html
<div draggable="true">Drag me!</div>
\`\`\`

By default, images and links are draggable without the attribute.

## Drag Events

**On the draggable element:**
- \`dragstart\` — User starts dragging
- \`drag\` — Element is being dragged (fires continuously)
- \`dragend\` — Drag operation ends

**On the drop target:**
- \`dragenter\` — Dragged element enters a drop target
- \`dragover\` — Dragged element is over a drop target (must call \`preventDefault()\`)
- \`dragleave\` — Dragged element leaves a drop target
- \`drop\` — Element is dropped (must call \`preventDefault()\`)

## DataTransfer Object

The \`dataTransfer\` object carries data during the drag operation:

\`\`\`javascript
// Set data on dragstart
e.dataTransfer.setData('text/plain', 'Hello');

// Get data on drop
const data = e.dataTransfer.getData('text/plain');
\`\`\`

## Drop Effect

Control the cursor during drag:
- \`copy\` — Indicates a copy will be created
- \`move\` — Indicates item will be moved
- \`link\` — Indicates a link will be created
- \`none\` — No drop allowed

## File Drag and Drop

Users can drag files from their computer into the browser:

\`\`\`javascript
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  // Handle files
});
\`\`\`

## Common Use Cases

- Reordering lists (todo apps, kanban boards)
- File upload interfaces
- Drag-to-trash functionality
- Building custom UI components
- Game development`,
    keyTakeaways: [
      "Add draggable='true' to make elements draggable",
      "Must call preventDefault() on dragover and drop events",
      "Use dataTransfer to pass data between drag and drop",
      "Files can be dragged from the user's file system",
      "Provide visual feedback for valid/invalid drop zones",
    ],
    codeExamples: [
      {
        title: "Basic Drag and Drop",
        language: "html",
        description:
          "Simple drag and drop between two containers with visual feedback.",
        code: `<style>
.container {
  display: inline-block;
  width: 200px;
  min-height: 150px;
  padding: 20px;
  margin: 10px;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  vertical-align: top;
}
.container.drag-over {
  background: #f0f9ff;
  border-color: #6366f1;
}
.item {
  padding: 12px 16px;
  margin: 8px 0;
  background: #6366f1;
  color: white;
  border-radius: 6px;
  cursor: move;
}
.item.dragging {
  opacity: 0.5;
}
</style>

<div class="container" id="container1">
  <h3>Container 1</h3>
  <div class="item" draggable="true">Item 1</div>
  <div class="item" draggable="true">Item 2</div>
  <div class="item" draggable="true">Item 3</div>
</div>

<div class="container" id="container2">
  <h3>Container 2</h3>
</div>

<script>
let draggedItem = null;

// Drag events on items
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('dragstart', (e) => {
    draggedItem = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });

  item.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
  });
});

// Drop events on containers
document.querySelectorAll('.container').forEach(container => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    container.classList.add('drag-over');
  });

  container.addEventListener('dragleave', () => {
    container.classList.remove('drag-over');
  });

  container.addEventListener('drop', (e) => {
    e.preventDefault();
    container.classList.remove('drag-over');
    if (draggedItem) {
      container.appendChild(draggedItem);
    }
  });
});
</script>`,
        livePreview: true,
      },
      {
        title: "File Drop Zone",
        language: "html",
        description:
          "Drag and drop files from your computer to upload them.",
        code: `<style>
.drop-zone {
  width: 400px;
  height: 200px;
  border: 3px dashed #cbd5e1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #64748b;
  transition: all 0.3s;
}
.drop-zone.drag-over {
  background: #f0f9ff;
  border-color: #6366f1;
  color: #6366f1;
}
.file-list {
  margin-top: 20px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  max-width: 400px;
}
.file-item {
  padding: 8px;
  margin: 4px 0;
  background: white;
  border-radius: 4px;
  font-size: 14px;
}
</style>

<div class="drop-zone" id="dropZone">
  <svg width="48" height="48" fill="currentColor">
    <path d="M24 4L4 14v24l20 10 20-10V14L24 4zm0 4.84L40 16v20L24 43.16 8 36V16l16-7.16z"/>
  </svg>
  <p><strong>Drag files here</strong> or click to browse</p>
  <input type="file" id="fileInput" style="display:none" multiple>
</div>

<div class="file-list" id="fileList" style="display:none"></div>

<script>
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

// Prevent default drag behaviors on whole page
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  document.body.addEventListener(eventName, (e) => e.preventDefault());
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  
  const files = e.dataTransfer.files;
  handleFiles(files);
});

dropZone.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  handleFiles(e.target.files);
});

function handleFiles(files) {
  fileList.style.display = 'block';
  fileList.innerHTML = '<h4>Uploaded Files:</h4>';
  
  Array.from(files).forEach(file => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.textContent = \`\${file.name} (\${(file.size / 1024).toFixed(2)} KB)\`;
    fileList.appendChild(item);
  });
}
</script>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "drag-1",
        title: "Make an Element Draggable",
        instruction:
          "Add the necessary attribute to make the div draggable.",
        startingCode: `<div id="box">Drag me!</div>`,
        expectedOutput: `<div id="box" draggable="true">Drag me!</div>`,
        hints: [
          'Add draggable="true" attribute',
          "This makes any element draggable",
        ],
      },
    ],
    quickQuiz: {
      question: "What must you call on the dragover event to allow dropping?",
      options: [
        "preventDefault()",
        "allowDrop()",
        "enableDrop()",
        "acceptDrop()"
      ],
      correctAnswer: 0,
      explanation: "You must call preventDefault() on dragover events to allow an element to receive drop events. Without this, the drop event won't fire."
    },
  },
  {
    slug: "web-storage-api",
    title: "Web Storage - localStorage & sessionStorage",
    difficulty: "advanced",
    estimatedMinutes: 25,
    mdnReference:
      "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API",
    content: `Web Storage provides a way to store data locally in the user's browser. Unlike cookies, web storage data is never sent to the server and has a much larger storage limit (5-10 MB vs 4 KB for cookies).

## Two Types of Web Storage

**localStorage** — Data persists even after the browser is closed. Perfect for saving user preferences, themes, cached data.

**sessionStorage** — Data is cleared when the tab/browser is closed. Perfect for temporary data like form inputs, shopping carts during a session.

## Storage API Methods

Both localStorage and sessionStorage have the same API:

\`\`\`javascript
// Store data
localStorage.setItem('key', 'value');

// Retrieve data
const value = localStorage.getItem('key');

// Remove specific item
localStorage.removeItem('key');

// Clear all data
localStorage.clear();

// Get number of items
const length = localStorage.length;

// Get key by index
const key = localStorage.key(0);
\`\`\`

## Storing Complex Data

Web Storage only stores strings. For objects, use JSON:

\`\`\`javascript
// Store object
const user = { name: 'Ayush', role: 'developer' };
localStorage.setItem('user', JSON.stringify(user));

// Retrieve object
const storedUser = JSON.parse(localStorage.getItem('user'));
\`\`\`

## Storage Events

Listen for storage changes from other tabs/windows:

\`\`\`javascript
window.addEventListener('storage', (e) => {
  console.log('Key:', e.key);
  console.log('Old value:', e.oldValue);
  console.log('New value:', e.newValue);
});
\`\`\`

## Security Considerations

- Storage is NOT encrypted — don't store sensitive data like passwords or tokens
- Storage is accessible via JavaScript — vulnerable to XSS attacks
- Storage is domain-specific — each domain has its own storage
- Always validate data retrieved from storage

## Common Use Cases

- User preferences (theme, language, layout)
- Caching API responses
- Saving form data (auto-save drafts)
- Shopping cart persistence
- Remember user choices
- Offline-first applications

## localStorage vs sessionStorage vs Cookies

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|----------------|---------|
| Persistence | Until cleared | Until tab closes | Set expiration |
| Storage Size | 5-10 MB | 5-10 MB | 4 KB |
| Sent to Server | No | No | Yes (every request) |
| Accessible From | JavaScript | JavaScript | JavaScript & Server |
| Scope | Domain | Tab/Window | Domain |`,
    keyTakeaways: [
      "localStorage persists data; sessionStorage clears on tab close",
      "Both provide 5-10 MB storage (much more than cookies)",
      "Only strings can be stored - use JSON for objects",
      "Data is not sent to the server (unlike cookies)",
      "Never store sensitive data in web storage (no encryption)",
    ],
    codeExamples: [
      {
        title: "Theme Switcher with localStorage",
        language: "html",
        description:
          "Saving and loading user theme preference with localStorage.",
        code: `<style>
body { transition: background 0.3s, color 0.3s; }
body.dark { background: #1f2937; color: #f3f4f6; }
body.light { background: #ffffff; color: #1f2937; }
.theme-toggle {
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #6366f1;
  color: white;
  margin: 20px;
}
</style>

<button class="theme-toggle" id="themeToggle">
  Toggle Theme
</button>

<p>Your theme preference is saved and will persist across sessions!</p>

<script>
// Load saved theme or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.className = currentTheme;

document.getElementById('themeToggle').addEventListener('click', () => {
  const newTheme = document.body.className === 'light' ? 'dark' : 'light';
  document.body.className = newTheme;
  
  // Save theme preference
  localStorage.setItem('theme', newTheme);
  
  console.log('Theme saved:', newTheme);
});
</script>`,
        livePreview: true,
      },
      {
        title: "Form Auto-Save with sessionStorage",
        language: "html",
        description:
          "Auto-saving form data to sessionStorage to prevent data loss on accidental refresh.",
        code: `<style>
.form-container {
  max-width: 400px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin: 20px;
}
input, textarea {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}
button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 12px;
}
.saved-indicator {
  color: #10b981;
  font-size: 12px;
  margin-left: 8px;
}
</style>

<div class="form-container">
  <h3>Contact Form <span class="saved-indicator" id="saveIndicator"></span></h3>
  <form id="contactForm">
    <input type="text" id="name" placeholder="Your Name" required>
    <input type="email" id="email" placeholder="Your Email" required>
    <textarea id="message" rows="4" placeholder="Your Message" required></textarea>
    <button type="submit">Send</button>
    <button type="button" id="clearBtn">Clear Data</button>
  </form>
</div>

<script>
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const saveIndicator = document.getElementById('saveIndicator');

// Load saved data on page load
nameInput.value = sessionStorage.getItem('contactName') || '';
emailInput.value = sessionStorage.getItem('contactEmail') || '';
messageInput.value = sessionStorage.getItem('contactMessage') || '';

// Auto-save on input
let saveTimeout;
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener('input', () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      sessionStorage.setItem('contactName', nameInput.value);
      sessionStorage.setItem('contactEmail', emailInput.value);
      sessionStorage.setItem('contactMessage', messageInput.value);
      
      // Show saved indicator
      saveIndicator.textContent = '✓ Saved';
      setTimeout(() => saveIndicator.textContent = '', 2000);
    }, 500);
  });
});

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Form submitted! Data cleared from sessionStorage.');
  
  // Clear sessionStorage after submission
  sessionStorage.removeItem('contactName');
  sessionStorage.removeItem('contactEmail');
  sessionStorage.removeItem('contactMessage');
  
  form.reset();
});

// Clear data button
document.getElementById('clearBtn').addEventListener('click', () => {
  sessionStorage.clear();
  form.reset();
  alert('Form data cleared!');
});
</script>`,
        livePreview: true,
      },
      {
        title: "Shopping Cart with localStorage",
        language: "html",
        description:
          "Building a persistent shopping cart that survives page refreshes.",
        code: `<style>
.product-list { display: flex; gap: 12px; margin: 20px; flex-wrap: wrap; }
.product {
  border: 1px solid #e5e7eb;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}
.product button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 8px;
}
.cart {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border: 2px solid #6366f1;
  padding: 16px;
  border-radius: 12px;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.cart-item {
  padding: 8px;
  border-bottom: 1px solid #e5e7eb;
}
</style>

<div class="product-list">
  <div class="product">
    <h4>Laptop</h4>
    <p>$999</p>
    <button onclick="addToCart('Laptop', 999)">Add to Cart</button>
  </div>
  <div class="product">
    <h4>Mouse</h4>
    <p>$29</p>
    <button onclick="addToCart('Mouse', 29)">Add to Cart</button>
  </div>
  <div class="product">
    <h4>Keyboard</h4>
    <p>$79</p>
    <button onclick="addToCart('Keyboard', 79)">Add to Cart</button>
  </div>
</div>

<div class="cart">
  <h3>Shopping Cart</h3>
  <div id="cartItems"></div>
  <p><strong>Total: $<span id="cartTotal">0</span></strong></p>
  <button onclick="clearCart()" style="background:#ef4444;color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;margin-top:8px;">Clear Cart</button>
</div>

<script>
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price) {
  const cart = getCart();
  cart.push({ name, price });
  saveCart(cart);
  renderCart();
}

function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="color:#94a3b8;">Cart is empty</p>';
    cartTotal.textContent = '0';
    return;
  }
  
  cartItems.innerHTML = cart.map(item => 
    \`<div class="cart-item">\${item.name} - $\${item.price}</div>\`
  ).join('');
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total;
}

// Render cart on page load
renderCart();
</script>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "storage-1",
        title: "Save User Name",
        instruction:
          "Write code to save a username to localStorage and retrieve it.",
        startingCode: `// Save 'Ayush' to localStorage with key 'username'

// Retrieve and log the username`,
        expectedOutput: `localStorage.setItem('username', 'Ayush');
const username = localStorage.getItem('username');
console.log(username);`,
        hints: [
          "Use localStorage.setItem(key, value) to save",
          "Use localStorage.getItem(key) to retrieve",
        ],
      },
    ],
    quickQuiz: {
      question: "What's the main difference between localStorage and sessionStorage?",
      options: [
        "localStorage persists after browser close; sessionStorage doesn't",
        "localStorage is faster",
        "sessionStorage has more storage space",
        "localStorage is sent to the server"
      ],
      correctAnswer: 0,
      explanation: "localStorage data persists even after the browser is closed, while sessionStorage data is cleared when the tab/window is closed."
    },
  },
  {
    slug: "geolocation-api",
    title: "Geolocation API - User Location",
    difficulty: "advanced",
    estimatedMinutes: 20,
    mdnReference:
      "https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API",
    content: `The Geolocation API allows web applications to access the user's geographic location. It provides latitude, longitude, altitude, speed, and heading information when available.

## Browser Support & Permissions

The Geolocation API is supported in all modern browsers, but requires:
- **HTTPS** (or localhost for development) — browsers block geolocation on insecure connections
- **User permission** — users must explicitly grant location access

## Getting User Location

The \`navigator.geolocation\` object provides three methods:

**1. getCurrentPosition()** — Get current location once
\`\`\`javascript
navigator.geolocation.getCurrentPosition(success, error, options);
\`\`\`

**2. watchPosition()** — Track location continuously (returns watch ID)
\`\`\`javascript
const watchId = navigator.geolocation.watchPosition(success, error);
\`\`\`

**3. clearWatch()** — Stop tracking
\`\`\`javascript
navigator.geolocation.clearWatch(watchId);
\`\`\`

## Position Object

The success callback receives a Position object with:
\`\`\`javascript
{
  coords: {
    latitude: 37.7749,        // Decimal degrees
    longitude: -122.4194,
    accuracy: 100,            // Meters
    altitude: null,           // Meters above sea level
    altitudeAccuracy: null,
    heading: null,            // Degrees from north
    speed: null               // Meters per second
  },
  timestamp: 1619123456789
}
\`\`\`

## Error Handling

The error callback receives a PositionError with:
- \`PERMISSION_DENIED\` (1) — User denied permission
- \`POSITION_UNAVAILABLE\` (2) — Location unavailable
- \`TIMEOUT\` (3) — Request timed out

## Options

Configure geolocation requests with an options object:
\`\`\`javascript
{
  enableHighAccuracy: true,  // Use GPS if available (slower, more battery)
  timeout: 10000,            // Max time to wait (ms)
  maximumAge: 0              // Max age of cached position (ms)
}
\`\`\`

## Common Use Cases

- Store locators ("Find stores near you")
- Weather apps (local weather)
- Delivery apps (track orders)
- Location-based services
- Geotagging content
- Fitness/running trackers

## Privacy & Best Practices

- Always explain why you need location
- Request permission at the right time (not immediately on page load)
- Handle errors gracefully with fallbacks
- Don't request high accuracy unless necessary (saves battery)
- Respect user privacy — never share location without consent`,
    keyTakeaways: [
      "Geolocation API requires HTTPS and user permission",
      "Use getCurrentPosition() for one-time location requests",
      "Use watchPosition() to track location continuously",
      "latitude and longitude are in decimal degrees",
      "Always handle errors gracefully with user-friendly messages",
    ],
    codeExamples: [
      {
        title: "Get Current Location",
        language: "html",
        description:
          "Requesting user location and displaying coordinates on a map.",
        code: `<style>
.location-demo {
  max-width: 600px;
  margin: 20px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}
button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}
button:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}
.result {
  margin-top: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  font-family: monospace;
}
.error {
  color: #ef4444;
  background: #fef2f2;
}
</style>

<div class="location-demo">
  <h3>📍 Get Your Location</h3>
  <p>Click the button to share your location</p>
  
  <button id="getLocationBtn">Get My Location</button>
  
  <div id="result"></div>
</div>

<script>
const btn = document.getElementById('getLocationBtn');
const result = document.getElementById('result');

btn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    result.innerHTML = '<div class="result error">Geolocation is not supported by your browser</div>';
    return;
  }
  
  btn.disabled = true;
  btn.textContent = 'Getting location...';
  result.innerHTML = '';
  
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      
      result.innerHTML = \`
        <div class="result">
          <strong>Location Found!</strong><br><br>
          <strong>Latitude:</strong> \${latitude.toFixed(6)}<br>
          <strong>Longitude:</strong> \${longitude.toFixed(6)}<br>
          <strong>Accuracy:</strong> ±\${accuracy.toFixed(0)} meters<br><br>
          <a href="https://www.google.com/maps?q=\${latitude},\${longitude}" 
             target="_blank" 
             style="color:#6366f1;">
            View on Google Maps →
          </a>
        </div>
      \`;
      
      btn.disabled = false;
      btn.textContent = 'Get My Location';
    },
    (error) => {
      let message = '';
      switch(error.code) {
        case error.PERMISSION_DENIED:
          message = 'Location access denied. Please enable location permissions.';
          break;
        case error.POSITION_UNAVAILABLE:
          message = 'Location information unavailable.';
          break;
        case error.TIMEOUT:
          message = 'Request timed out. Please try again.';
          break;
        default:
          message = 'An unknown error occurred.';
      }
      
      result.innerHTML = \`<div class="result error"><strong>Error:</strong> \${message}</div>\`;
      
      btn.disabled = false;
      btn.textContent = 'Get My Location';
    },
    options
  );
});
</script>`,
        livePreview: true,
      },
      {
        title: "Track Location in Real-Time",
        language: "html",
        description:
          "Watching position changes continuously (useful for fitness apps).",
        code: `<style>
.tracker {
  max-width: 600px;
  margin: 20px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}
.controls {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}
.start-btn { background: #10b981; color: white; }
.stop-btn { background: #ef4444; color: white; }
button:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}
.updates {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
}
.update-item {
  padding: 8px;
  margin: 4px 0;
  background: #f8fafc;
  border-radius: 6px;
  font-size: 14px;
}
.status {
  padding: 8px 16px;
  border-radius: 6px;
  margin-bottom: 12px;
  font-weight: 500;
}
.status.tracking { background: #d1fae5; color: #065f46; }
.status.stopped { background: #fee2e2; color: #991b1b; }
</style>

<div class="tracker">
  <h3>🎯 Location Tracker</h3>
  
  <div id="status" class="status stopped">● Tracking stopped</div>
  
  <div class="controls">
    <button class="start-btn" id="startBtn">Start Tracking</button>
    <button class="stop-btn" id="stopBtn" disabled>Stop Tracking</button>
  </div>
  
  <div class="updates" id="updates">
    <p style="color:#94a3b8; text-align:center;">No updates yet</p>
  </div>
</div>

<script>
let watchId = null;
let updateCount = 0;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const status = document.getElementById('status');
const updates = document.getElementById('updates');

startBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported');
    return;
  }
  
  watchId = navigator.geolocation.watchPosition(
    (position) => {
      updateCount++;
      const { latitude, longitude, accuracy, speed } = position.coords;
      const time = new Date(position.timestamp).toLocaleTimeString();
      
      const updateItem = document.createElement('div');
      updateItem.className = 'update-item';
      updateItem.innerHTML = \`
        <strong>Update #\${updateCount}</strong> at \${time}<br>
        Lat: \${latitude.toFixed(6)}, Lng: \${longitude.toFixed(6)}<br>
        Accuracy: ±\${accuracy.toFixed(0)}m
        \${speed ? \`, Speed: \${(speed * 3.6).toFixed(1)} km/h\` : ''}
      \`;
      
      updates.insertBefore(updateItem, updates.firstChild);
      
      // Remove first "No updates" message
      const placeholder = updates.querySelector('p');
      if (placeholder) placeholder.remove();
    },
    (error) => {
      console.error('Geolocation error:', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );
  
  // Update UI
  startBtn.disabled = true;
  stopBtn.disabled = false;
  status.textContent = '● Tracking active';
  status.className = 'status tracking';
});

stopBtn.addEventListener('click', () => {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  
  // Update UI
  startBtn.disabled = false;
  stopBtn.disabled = true;
  status.textContent = '● Tracking stopped';
  status.className = 'status stopped';
});
</script>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "geo-1",
        title: "Get User's Latitude and Longitude",
        instruction:
          "Use the Geolocation API to get and log the user's latitude and longitude.",
        startingCode: `// Get current position and log coordinates
`,
        expectedOutput: `navigator.geolocation.getCurrentPosition((position) => {
  console.log('Lat:', position.coords.latitude);
  console.log('Lng:', position.coords.longitude);
});`,
        hints: [
          "Use navigator.geolocation.getCurrentPosition()",
          "Access coords.latitude and coords.longitude from position object",
        ],
      },
    ],
    quickQuiz: {
      question: "What protocol is required for the Geolocation API to work?",
      options: [
        "HTTPS (or localhost)",
        "HTTP is fine",
        "FTP",
        "Any protocol works"
      ],
      correctAnswer: 0,
      explanation: "The Geolocation API requires HTTPS (or localhost for development). Browsers block geolocation requests on insecure HTTP connections for security."
    },
  },
];
