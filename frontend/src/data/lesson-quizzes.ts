import { type LessonQuizQuestion } from "@/components/tutorial/LessonQuiz";

/**
 * Maps tutorial slug + lesson slug → inline quiz questions.
 * Key format: "tutorialSlug/lessonSlug"
 */
export const lessonQuizzes: Record<string, LessonQuizQuestion[]> = {
  // ═══════════════════════════════════════
  //  HTML Tutorials
  // ═══════════════════════════════════════

  "html/introduction": [
    { id: "html-intro-1", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correctIndex: 0, explanation: "HTML stands for Hyper Text Markup Language — the standard markup language for creating web pages." },
    { id: "html-intro-2", question: "Which is NOT a valid HTML element?", options: ["<div>", "<span>", "<container>", "<section>"], correctIndex: 2, explanation: "<container> is not a standard HTML element. <div>, <span>, and <section> are all valid." },
    { id: "html-intro-3", question: "What is a void element in HTML?", options: ["An element that cannot have child content or a closing tag", "An element that is invisible", "An element with no attributes", "An element that returns void"], correctIndex: 0, explanation: "Void elements like <br>, <img>, <input> have no closing tag and cannot contain child content." },
  ],

  "html/document-structure": [
    { id: "html-doc-1", question: "What does <!DOCTYPE html> declare?", options: ["The document is HTML5", "The page title", "A JavaScript file", "The character encoding"], correctIndex: 0, explanation: "<!DOCTYPE html> tells the browser to render the page using the HTML5 standard." },
    { id: "html-doc-2", question: "Which element contains metadata about the page?", options: ["<head>", "<body>", "<header>", "<meta>"], correctIndex: 0, explanation: "The <head> element is a container for metadata such as <title>, <meta>, and <link> elements." },
    { id: "html-doc-3", question: "What does <meta charset='UTF-8'> specify?", options: ["The character encoding for the document", "The page title", "The document language", "The viewport width"], correctIndex: 0, explanation: "This meta tag defines the character encoding, ensuring special characters display correctly." },
  ],

  "html/text-fundamentals": [
    { id: "html-text-1", question: "Which element defines the largest heading?", options: ["<h1>", "<heading>", "<h6>", "<head>"], correctIndex: 0, explanation: "HTML has six heading levels, <h1> through <h6>. <h1> is the largest and most important." },
    { id: "html-text-2", question: "What is the correct element for emphasising text?", options: ["<em>", "<italic>", "<i>", "<emphasis>"], correctIndex: 0, explanation: "<em> provides semantic emphasis. <i> is purely presentational and does not convey emphasis to screen readers." },
    { id: "html-text-3", question: "Which element preserves whitespace and line breaks?", options: ["<pre>", "<p>", "<code>", "<br>"], correctIndex: 0, explanation: "The <pre> element displays preformatted text, preserving both spaces and line breaks as authored." },
  ],

  "html/links-and-navigation": [
    { id: "html-link-1", question: "Which attribute specifies the URL in an anchor tag?", options: ["href", "src", "link", "url"], correctIndex: 0, explanation: "The href attribute on <a> defines the destination URL of the hyperlink." },
    { id: "html-link-2", question: "What does target='_blank' do?", options: ["Opens the link in a new tab/window", "Opens the link in the same tab", "Downloads the file", "Opens a blank page"], correctIndex: 0, explanation: "target='_blank' tells the browser to open the linked document in a new browsing context." },
    { id: "html-link-3", question: "Which value of 'href' creates a link to an email address?", options: ["mailto:user@example.com", "email:user@example.com", "mail:user@example.com", "send:user@example.com"], correctIndex: 0, explanation: "The 'mailto:' protocol prefix creates a link that opens the user's email client." },
  ],

  "html/images-and-media": [
    { id: "html-img-1", question: "Which attribute provides alternate text for an image?", options: ["alt", "title", "caption", "text"], correctIndex: 0, explanation: "The alt attribute provides text for screen readers and displays when the image cannot load." },
    { id: "html-img-2", question: "Which element provides a caption for an image?", options: ["<figcaption>", "<caption>", "<label>", "<description>"], correctIndex: 0, explanation: "<figcaption> is used inside a <figure> element to add a caption to images or illustrations." },
    { id: "html-img-3", question: "What does the 'srcset' attribute allow?", options: ["Providing multiple image sources for different screen sizes", "Setting the image source path", "Adding a source code snippet", "Defining a set of styles"], correctIndex: 0, explanation: "srcset lets you provide multiple images so the browser can choose the best one for the current viewport." },
  ],

  "html/lists": [
    { id: "html-list-1", question: "Which element creates an unordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], correctIndex: 0, explanation: "<ul> defines an unordered (bulleted) list. Each item inside uses <li>." },
    { id: "html-list-2", question: "What is a description list in HTML?", options: ["A list of term-description pairs using <dl>, <dt>, <dd>", "A list with descriptions using <ul>", "An ordered list with descriptions", "A list created with CSS"], correctIndex: 0, explanation: "A description list (<dl>) contains terms (<dt>) and their descriptions (<dd>)." },
    { id: "html-list-3", question: "Can you nest lists inside other lists?", options: ["Yes, you can nest <ul> or <ol> inside <li> elements", "No, HTML doesn't support nested lists", "Only ordered lists can be nested", "Only unordered lists can be nested"], correctIndex: 0, explanation: "HTML supports nested lists — you place a new <ul> or <ol> inside an <li> of the parent list." },
  ],

  "html/tables": [
    { id: "html-table-1", question: "Which element defines a table row?", options: ["<tr>", "<td>", "<th>", "<row>"], correctIndex: 0, explanation: "<tr> (table row) creates a row. Inside, you use <td> for data cells or <th> for header cells." },
    { id: "html-table-2", question: "What does 'colspan' do?", options: ["Makes a cell span multiple columns", "Makes a cell span multiple rows", "Sets the column width", "Adds column spacing"], correctIndex: 0, explanation: "The colspan attribute allows a <td> or <th> cell to span across multiple columns." },
    { id: "html-table-3", question: "Which element groups the body content in a table?", options: ["<tbody>", "<body>", "<tdata>", "<content>"], correctIndex: 0, explanation: "<tbody> groups the body content in a table, complementing <thead> for headers and <tfoot> for footers." },
  ],

  "html/forms-and-inputs": [
    { id: "html-form-1", question: "Which attribute makes a form field required?", options: ["required", "validate", "mandatory", "notempty"], correctIndex: 0, explanation: "The 'required' boolean attribute prevents form submission until the field has a value." },
    { id: "html-form-2", question: "What does the 'action' attribute on a form specify?", options: ["The URL where form data is sent", "The type of form validation", "The form's display style", "The JavaScript function to call"], correctIndex: 0, explanation: "The 'action' attribute specifies the URL that processes the form submission." },
    { id: "html-form-3", question: "Which input type creates a dropdown date picker?", options: ["date", "calendar", "datetime", "picker"], correctIndex: 0, explanation: "input type='date' renders a date picker control in supporting browsers." },
  ],

  "html/semantic-html": [
    { id: "html-sem-1", question: "What is the benefit of semantic HTML?", options: ["Better accessibility, SEO, and code readability", "Faster page loading", "Smaller file sizes", "Better CSS styling"], correctIndex: 0, explanation: "Semantic elements convey meaning to browsers, search engines, and assistive technologies, improving accessibility and SEO." },
    { id: "html-sem-2", question: "Which element represents the main content of a page?", options: ["<main>", "<content>", "<body>", "<div id='main'>"], correctIndex: 0, explanation: "<main> represents the dominant content of the <body>, and should be unique per page." },
    { id: "html-sem-3", question: "What is <aside> used for?", options: ["Content tangentially related to the surrounding content", "The main content area", "Navigation links", "Footer information"], correctIndex: 0, explanation: "<aside> is for content indirectly related to the main content, like sidebars or call-out boxes." },
  ],

  "html/attributes": [
    { id: "html-attr-1", question: "What is the purpose of 'data-*' attributes?", options: ["To store custom data private to the page or application", "To define database connections", "To style elements", "To create data tables"], correctIndex: 0, explanation: "data-* attributes let you store extra information on HTML elements without using non-standard attributes." },
    { id: "html-attr-2", question: "What does the 'id' attribute do?", options: ["Provides a unique identifier for the element", "Sets the element's class", "Defines the element type", "Creates an index number"], correctIndex: 0, explanation: "The id attribute must be unique within a document and can be used for CSS targeting and JavaScript selection." },
    { id: "html-attr-3", question: "What does ARIA stand for?", options: ["Accessible Rich Internet Applications", "Advanced Responsive Internet Architecture", "Automated Rich Interface Attributes", "Accessible Rendered Interactive Application"], correctIndex: 0, explanation: "ARIA defines attributes to make web content more accessible to people with disabilities." },
  ],

  "html/html5-apis": [
    { id: "html-api-1", question: "Which element is used to embed video?", options: ["<video>", "<media>", "<movie>", "<embed>"], correctIndex: 0, explanation: "The <video> element is the HTML5 standard for embedding video content with built-in controls." },
    { id: "html-api-2", question: "What is the <canvas> element used for?", options: ["Drawing graphics via JavaScript", "Displaying images", "Creating form layouts", "Embedding PDFs"], correctIndex: 0, explanation: "<canvas> provides a drawable region that can be controlled via the Canvas API in JavaScript." },
    { id: "html-api-3", question: "Which attribute enables lazy loading of images?", codeSnippet: "<img src=\"photo.jpg\" ???=\"lazy\">", options: ["loading", "defer", "async", "lazy"], correctIndex: 0, explanation: "The loading='lazy' attribute defers loading of off-screen images until the user scrolls near them." },
  ],

  // ═══════════════════════════════════════
  //  CSS Tutorials
  // ═══════════════════════════════════════

  "css/introduction": [
    { id: "css-intro-1", question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Cascading Script Sheets"], correctIndex: 0, explanation: "CSS (Cascading Style Sheets) is the language used to style HTML documents." },
    { id: "css-intro-2", question: "Which is the recommended way to add CSS to a page?", options: ["External stylesheet via <link>", "Inline styles on each element", "Internal <style> in <head>", "JavaScript style manipulation"], correctIndex: 0, explanation: "An external stylesheet keeps styles separate from HTML, enabling reuse across pages and better caching." },
    { id: "css-intro-3", question: "What is CSS specificity?", options: ["A set of rules determining which styles apply when rules conflict", "The speed at which CSS is rendered", "The number of CSS files linked", "The order of elements in HTML"], correctIndex: 0, explanation: "Specificity determines which CSS rule wins when multiple rules target the same element. Inline > ID > Class > Element." },
    { id: "css-intro-4", question: "How do you select an element by its class?", options: [".classname { }", "#classname { }", "classname { }", "*classname { }"], correctIndex: 0, explanation: "A period (.) prefix selects elements by class name. # selects by ID." },
  ],

  "css/selectors-and-specificity": [
    { id: "css-spec-1", question: "Which selector has the HIGHEST specificity?", options: ["#header", ".nav .link", "header nav a", "* body .link"], correctIndex: 0, explanation: "An ID selector (#header) has specificity (1,0,0) which beats any number of class or element selectors." },
    { id: "css-spec-2", question: "What does the selector [href$='.pdf'] match?", options: ["Elements whose href attribute ends with .pdf", "Elements whose href contains .pdf", "Elements whose href starts with .pdf", "Elements with a pdf class"], correctIndex: 0, explanation: "The $= attribute selector matches elements whose attribute value ends with the specified string." },
    { id: "css-spec-3", question: "What does the child combinator (>) select?", codeSnippet: ".card > p { color: gray; }", options: ["Only direct <p> children of .card", "All <p> descendants inside .card", "The <p> after .card", "All siblings of .card"], correctIndex: 0, explanation: "The > combinator selects only direct children, not deeper descendants. .card p (no >) selects all descendants." },
  ],

  "css/pseudo-classes-and-elements": [
    { id: "css-pseudo-1", question: "What is the difference between : and :: in CSS?", options: [": is for pseudo-classes (state); :: is for pseudo-elements (virtual content)", "They are the same", ": is old syntax; :: is new syntax for the same thing", ":: is for animations"], correctIndex: 0, explanation: "Single colon pseudo-classes select elements in a state (:hover, :first-child). Double colon pseudo-elements create virtual parts (::before, ::after)." },
    { id: "css-pseudo-2", question: "What is required for ::before and ::after to render?", options: ["The content property must be set", "A display property", "A width and height", "A background color"], correctIndex: 0, explanation: "::before and ::after pseudo-elements require the content property (even if set to empty string '') to be generated." },
    { id: "css-pseudo-3", question: "Which pseudo-class selects elements based on their position?", codeSnippet: "tr:????(even) { background: #f9fafb; }", options: ["nth-child", "nth-element", "even-child", "position"], correctIndex: 0, explanation: ":nth-child() selects elements based on their position among siblings. :nth-child(even) selects every other element." },
  ],

  "css/colors-and-typography": [
    { id: "css-color-1", question: "Which color format uses Hue, Saturation, and Lightness?", options: ["HSL", "RGB", "Hex", "CMYK"], correctIndex: 0, explanation: "HSL (Hue, Saturation, Lightness) is an intuitive color model — adjust hue for color, saturation for vividness, lightness for brightness." },
    { id: "css-color-2", question: "What does 'rgba(0, 0, 0, 0.5)' produce?", options: ["50% transparent black", "Fully opaque black", "50% transparent white", "A gray color"], correctIndex: 0, explanation: "RGBA adds an alpha channel — the 0.5 means 50% opacity. rgb(0,0,0) is black." },
    { id: "css-color-3", question: "What is the recommended unit for font-size?", options: ["rem", "px", "pt", "cm"], correctIndex: 0, explanation: "rem (root em) scales relative to the root font size, respecting user accessibility preferences." },
  ],

  "css/box-model": [
    { id: "css-box-1", question: "What are the four layers of the CSS box model (inside to outside)?", options: ["Content, Padding, Border, Margin", "Margin, Border, Padding, Content", "Content, Border, Padding, Margin", "Border, Content, Margin, Padding"], correctIndex: 0, explanation: "From inside out: Content → Padding → Border → Margin." },
    { id: "css-box-2", question: "What does 'box-sizing: border-box' do?", options: ["Width/height include padding and border", "Width/height only apply to content", "Removes borders from the element", "Adds a box shadow"], correctIndex: 0, explanation: "border-box makes width/height include content + padding + border, making sizing more intuitive." },
    { id: "css-box-3", question: "What happens when two vertical margins meet?", options: ["They collapse — the larger one wins", "They add together", "They cancel each other out", "The first one wins"], correctIndex: 0, explanation: "Vertical margin collapsing means adjacent top/bottom margins merge — only the larger value is used." },
  ],

  "css/flexbox": [
    { id: "css-flex-1", question: "How do you create a flex container?", codeSnippet: ".container { display: ???; }", options: ["flex", "flexbox", "block-flex", "inline"], correctIndex: 0, explanation: "display: flex creates a flex container, enabling flexbox layout for its children." },
    { id: "css-flex-2", question: "Which property aligns flex items along the main axis?", options: ["justify-content", "align-items", "align-content", "flex-direction"], correctIndex: 0, explanation: "justify-content distributes space along the main axis (horizontal by default)." },
    { id: "css-flex-3", question: "What does 'flex: 1 1 300px' mean?", options: ["Grow equally, shrink equally, start at 300px", "Fixed width of 300px", "Three columns of 300px", "Minimum width of 1px"], correctIndex: 0, explanation: "flex shorthand: grow (1), shrink (1), basis (300px) — the item starts at 300px and can grow/shrink equally." },
    { id: "css-flex-4", question: "How do you center an item both horizontally and vertically with flexbox?", options: ["justify-content: center; align-items: center;", "text-align: center; vertical-align: middle;", "margin: auto;", "position: center;"], correctIndex: 0, explanation: "In a flex container, justify-content: center aligns on the main axis and align-items: center on the cross axis." },
  ],

  "css/css-grid": [
    { id: "css-grid-1", question: "What does 'grid-template-columns: repeat(3, 1fr)' create?", options: ["Three equal-width columns", "One column repeated three times wider", "Three rows", "A 3x3 grid"], correctIndex: 0, explanation: "repeat(3, 1fr) creates three columns each taking one fraction of available space." },
    { id: "css-grid-2", question: "What does 'grid-column: 1 / -1' do?", options: ["Spans the item across all columns", "Places it in the first column", "Creates a negative margin", "Hides the element"], correctIndex: 0, explanation: "-1 refers to the last grid line, so 1 / -1 spans from the first to the last column." },
    { id: "css-grid-3", question: "What is the difference between auto-fit and auto-fill?", options: ["auto-fit collapses empty tracks; auto-fill keeps them", "They are identical", "auto-fill collapses empty tracks", "auto-fit creates fixed columns"], correctIndex: 0, explanation: "auto-fit stretches items to fill empty space, while auto-fill keeps empty tracks as blank space." },
  ],

  "css/positioning": [
    { id: "css-pos-1", question: "Which position value removes an element from normal document flow?", options: ["absolute", "relative", "static", "sticky"], correctIndex: 0, explanation: "position: absolute removes the element from the flow and positions it relative to its nearest positioned ancestor." },
    { id: "css-pos-2", question: "What does 'position: sticky' do?", options: ["Acts as relative until a scroll threshold, then becomes fixed", "Makes the element always fixed", "Removes the element from the flow", "Makes the element invisible"], correctIndex: 0, explanation: "Sticky is a hybrid — it scrolls with the page like relative, then sticks in place like fixed when you scroll past the threshold." },
    { id: "css-pos-3", question: "What does z-index control?", options: ["The stacking order of overlapping elements", "The zoom level", "The element's depth in 3D space", "The element's opacity"], correctIndex: 0, explanation: "z-index determines which positioned element appears on top when they overlap. Higher values appear on top." },
  ],

  "css/transitions-and-animations": [
    { id: "css-anim-1", question: "Which CSS properties should you animate for best performance?", options: ["transform and opacity", "width and height", "margin and padding", "top and left"], correctIndex: 0, explanation: "transform and opacity are GPU-accelerated and don't trigger layout recalculations, enabling smooth 60fps animations." },
    { id: "css-anim-2", question: "What defines a multi-step CSS animation?", options: ["@keyframes rule", "@animation rule", "transition property", "animate() function"], correctIndex: 0, explanation: "@keyframes defines named animation sequences with percentage-based steps (from/to or 0%/50%/100%)." },
    { id: "css-anim-3", question: "What does 'animation-fill-mode: forwards' do?", options: ["Keeps the final keyframe styles after the animation ends", "Plays the animation in reverse", "Fills the element with color", "Makes the animation play forward"], correctIndex: 0, explanation: "forwards retains the styles from the last keyframe after the animation completes." },
  ],

  "css/responsive-design": [
    { id: "css-resp-1", question: "What is the mobile-first approach?", options: ["Start styling for small screens, then add styles for larger screens", "Design the desktop version first", "Only support mobile devices", "Use JavaScript for mobile layouts"], correctIndex: 0, explanation: "Mobile-first means writing base styles for small screens and using min-width media queries to enhance for larger screens." },
    { id: "css-resp-2", question: "Which media query targets screens wider than 768px?", options: ["@media (min-width: 768px)", "@media (max-width: 768px)", "@screen (768px)", "@responsive (min: 768px)"], correctIndex: 0, explanation: "min-width: 768px applies styles to viewports 768px and wider — the tablet/desktop breakpoint." },
    { id: "css-resp-3", question: "What does 'clamp(1rem, 2.5vw, 3rem)' do?", options: ["Sets a responsive value between a min of 1rem and max of 3rem", "Clamps the element to the viewport", "Removes spacing entirely", "Sets a fixed font size"], correctIndex: 0, explanation: "clamp() takes a minimum, preferred, and maximum value, creating a fluid responsive size." },
    { id: "css-resp-4", question: "Why is 'max-width: 100%' important for images?", options: ["Prevents images from overflowing their container", "Makes images full-screen", "Removes image borders", "Sets the minimum image width"], correctIndex: 0, explanation: "max-width: 100% ensures images scale down to fit their container while never exceeding their natural size." },
  ],

  "css/css-variables": [
    { id: "css-var-1", question: "How do you define a CSS custom property?", options: ["--property-name: value;", "$property-name: value;", "@property-name: value;", "var-property-name: value;"], correctIndex: 0, explanation: "CSS custom properties use the -- prefix, e.g. --primary: #6366f1;" },
    { id: "css-var-2", question: "How do you use a CSS variable?", options: ["var(--property-name)", "${--property-name}", "get(--property-name)", "@property-name"], correctIndex: 0, explanation: "The var() function references a custom property: color: var(--primary);" },
    { id: "css-var-3", question: "Can CSS variables be updated with JavaScript?", options: ["Yes, using setProperty() on the element's style", "No, they are compile-time only", "Only with a page reload", "Only in Safari"], correctIndex: 0, explanation: "document.documentElement.style.setProperty('--primary', 'red') updates CSS variables at runtime." },
  ],

  "css/modern-css": [
    { id: "css-mod-1", question: "What are container queries?", options: ["Styles based on a container's size instead of the viewport", "Queries to find DOM containers", "Media queries for containers", "Database queries in CSS"], correctIndex: 0, explanation: "Container queries let you style elements based on their parent container's dimensions — perfect for reusable components." },
    { id: "css-mod-2", question: "What does the :has() selector do?", options: ["Selects a parent based on its children", "Checks if an element has attributes", "Tests for CSS support", "Selects elements that have been visited"], correctIndex: 0, explanation: ":has() is the 'parent selector' — .card:has(img) selects cards that contain an image." },
    { id: "css-mod-3", question: "What does 'aspect-ratio: 16 / 9' do?", options: ["Maintains a 16:9 width-to-height ratio", "Sets the element to 16px by 9px", "Creates a 16-column grid with 9 rows", "Sets font size to 16/9 rem"], correctIndex: 0, explanation: "aspect-ratio maintains proportional dimensions — the element will always be 16 units wide for every 9 units tall." },
  ],

  // ═══════════════════════════════════════
  //  JavaScript Tutorials
  // ═══════════════════════════════════════

  "javascript/introduction": [
    { id: "js-intro-1", question: "Which keyword declares a block-scoped variable?", options: ["let", "var", "define", "variable"], correctIndex: 0, explanation: "'let' declares a block-scoped variable, unlike 'var' which is function-scoped." },
    { id: "js-intro-2", question: "What is the output?", codeSnippet: "const x = 5;\nconsole.log(typeof x);", options: ["\"number\"", "\"integer\"", "\"string\"", "\"float\""], correctIndex: 0, explanation: "typeof returns the primitive type as a string. Numbers are 'number' — JavaScript has no separate integer type." },
    { id: "js-intro-3", question: "Which operator should you use for equality checks?", options: ["=== (strict equality)", "== (loose equality)", "= (assignment)", "!= (not equal)"], correctIndex: 0, explanation: "=== checks both value and type. == performs type coercion which can lead to unexpected results." },
    { id: "js-intro-4", question: "What is the correct arrow function syntax?", options: ["const fn = (x) => x * 2", "const fn = -> (x) x * 2", "const fn = => (x) { x * 2 }", "const fn = function=> (x) x * 2"], correctIndex: 0, explanation: "Arrow functions use => after the parameter list: (params) => expression or (params) => { statements }." },
  ],

  "javascript/functions-and-scope": [
    { id: "js-func-1", question: "What is the key difference between arrow functions and regular functions?", options: ["Arrow functions don't have their own 'this'", "Arrow functions are faster", "Arrow functions can't take parameters", "Arrow functions must use return"], correctIndex: 0, explanation: "Arrow functions inherit 'this' from the enclosing scope, while regular functions have their own 'this' binding." },
    { id: "js-func-2", question: "What is a closure?", options: ["A function that remembers variables from its outer scope", "A way to close a browser tab", "A function that runs once", "An error handling mechanism"], correctIndex: 0, explanation: "Closures let inner functions access outer scope variables even after the outer function has returned." },
    { id: "js-func-3", question: "What does a default parameter do?", codeSnippet: "function greet(name = 'World') { }", options: ["Provides a fallback value when no argument is passed", "Makes the parameter required", "Sets the return type", "Creates a constant"], correctIndex: 0, explanation: "Default parameters provide a value used when the argument is undefined or not passed." },
  ],

  "javascript/arrays-and-objects": [
    { id: "js-arr-1", question: "Which method creates a new array by transforming each element?", options: ["map()", "filter()", "reduce()", "forEach()"], correctIndex: 0, explanation: "Array.map() returns a new array with each element transformed by the callback function." },
    { id: "js-arr-2", question: "What does the spread operator (...) do with arrays?", options: ["Expands an array into individual elements", "Creates a loop over the array", "Removes the last element", "Sorts the array"], correctIndex: 0, explanation: "The spread operator unpacks an array: [...arr1, ...arr2] merges two arrays." },
    { id: "js-arr-3", question: "What does destructuring do?", codeSnippet: "const { name, age } = person;", options: ["Extracts values from an object into variables", "Destroys the object", "Creates a copy of the object", "Validates the object shape"], correctIndex: 0, explanation: "Destructuring extracts properties from objects (or elements from arrays) into individual variables." },
    { id: "js-arr-4", question: "What does reduce() return?", options: ["A single accumulated value", "A new array", "A boolean", "An object only"], correctIndex: 0, explanation: "reduce() iterates through an array and accumulates a single result — a number, string, object, or any value." },
  ],

  "javascript/control-flow": [
    { id: "js-flow-1", question: "Which values are falsy in JavaScript?", options: ["false, 0, '', null, undefined, NaN", "false, 0, null", "false, undefined", "Only false and null"], correctIndex: 0, explanation: "JavaScript has 6 falsy values: false, 0, '' (empty string), null, undefined, and NaN. Everything else is truthy." },
    { id: "js-flow-2", question: "Which loop is best for iterating over array values?", options: ["for...of", "for...in", "while", "do...while"], correctIndex: 0, explanation: "for...of iterates over iterable values (arrays, strings, Maps). for...in iterates over object keys." },
    { id: "js-flow-3", question: "What does the ternary operator do?", codeSnippet: "const result = x > 5 ? 'big' : 'small';", options: ["Returns one of two values based on a condition", "Creates a loop", "Declares a variable", "Throws an error"], correctIndex: 0, explanation: "The ternary operator (condition ? valueIfTrue : valueIfFalse) is a concise inline conditional." },
  ],

  "javascript/dom-manipulation": [
    { id: "js-dom-1", question: "What does document.querySelector('.btn') return?", options: ["The first element with class 'btn'", "All elements with class 'btn'", "An array of button elements", "The element's text content"], correctIndex: 0, explanation: "querySelector returns the first element matching the CSS selector, or null if none found." },
    { id: "js-dom-2", question: "How do you add an event listener to a button?", codeSnippet: "btn.???(\"click\", handler);", options: ["addEventListener", "onClick", "attachEvent", "onEvent"], correctIndex: 0, explanation: "addEventListener() attaches an event handler without overwriting existing listeners." },
    { id: "js-dom-3", question: "Why should you prefer textContent over innerHTML?", options: ["textContent is safe from XSS attacks", "textContent is faster", "innerHTML doesn't work in modern browsers", "There is no difference"], correctIndex: 0, explanation: "innerHTML parses content as HTML, which can execute malicious scripts. textContent treats everything as plain text." },
    { id: "js-dom-4", question: "What is event delegation?", options: ["Adding one listener to a parent instead of many to children", "Delegating events to a web worker", "Removing event listeners", "Creating custom events"], correctIndex: 0, explanation: "Event delegation uses a single listener on a parent element and checks event.target — it's more efficient and works for dynamic elements." },
  ],

  "javascript/events": [
    { id: "js-event-1", question: "What is event bubbling?", options: ["Events propagate from child up to parent elements", "Events only fire on the target element", "Events fire from parent down to children", "Events are queued and processed later"], correctIndex: 0, explanation: "In the bubbling phase, an event fired on a child element propagates upward through its ancestors." },
    { id: "js-event-2", question: "What does e.preventDefault() do?", options: ["Stops the browser's default action for the event", "Stops event bubbling", "Removes the event listener", "Prevents the page from loading"], correctIndex: 0, explanation: "preventDefault() cancels the default behavior (like form submission or link navigation) without stopping propagation." },
    { id: "js-event-3", question: "What is the difference between 'input' and 'change' events?", options: ["'input' fires on every keystroke; 'change' fires when value is committed", "They are the same", "'change' fires more often", "'input' only works with text fields"], correctIndex: 0, explanation: "The 'input' event fires immediately on every modification, while 'change' fires when the element loses focus or the value is committed." },
  ],

  "javascript/async-javascript": [
    { id: "js-async-1", question: "What does 'async/await' help with?", options: ["Writing asynchronous code that reads like synchronous code", "Making code run faster", "Creating multiple threads", "Handling CSS animations"], correctIndex: 0, explanation: "async/await is syntactic sugar over Promises, making async code easier to read and write." },
    { id: "js-async-2", question: "What does Promise.all() do?", codeSnippet: "const [a, b] = await Promise.all([p1, p2]);", options: ["Waits for all promises to resolve and returns their results", "Returns the first promise that resolves", "Runs promises one after another", "Catches errors from all promises"], correctIndex: 0, explanation: "Promise.all() runs promises concurrently and resolves when ALL have completed, or rejects if any fails." },
    { id: "js-async-3", question: "What happens if you don't use try/catch with async/await?", options: ["Unhandled promise rejections can crash or silently fail", "The code won't compile", "Errors are automatically handled", "The function returns undefined"], correctIndex: 0, explanation: "Without error handling, rejected promises in async functions become unhandled rejections, which can crash Node.js or cause silent failures." },
    { id: "js-async-4", question: "What is the fetch() API used for?", options: ["Making HTTP requests to servers", "Fetching DOM elements", "Loading CSS files", "Importing JavaScript modules"], correctIndex: 0, explanation: "fetch() is the modern browser API for making HTTP requests, returning a Promise that resolves to a Response object." },
  ],

  "javascript/es6-features": [
    { id: "js-es6-1", question: "What does optional chaining (?.) do?", codeSnippet: "const city = user?.address?.city;", options: ["Returns undefined instead of throwing if a property is null/undefined", "Makes the property required", "Creates a chain of promises", "Assigns a default value"], correctIndex: 0, explanation: "Optional chaining short-circuits to undefined when it hits a null or undefined value, preventing TypeError." },
    { id: "js-es6-2", question: "What is the difference between ?? and ||?", options: ["?? only defaults for null/undefined; || defaults for all falsy values", "They are the same", "?? is for numbers only", "|| is deprecated"], correctIndex: 0, explanation: "Nullish coalescing (??) only treats null and undefined as 'missing'. || also treats 0, '', and false as falsy." },
    { id: "js-es6-3", question: "What does a Set store?", options: ["A collection of unique values", "Key-value pairs", "Ordered numbers only", "Immutable data"], correctIndex: 0, explanation: "Set stores unique values — duplicates are automatically removed. new Set([1,2,2,3]) → {1,2,3}." },
  ],

  "javascript/classes-and-oop": [
    { id: "js-class-1", question: "What does the 'constructor' method do in a class?", options: ["Initializes new instances when called with 'new'", "Destroys the object", "Creates a static method", "Defines a getter"], correctIndex: 0, explanation: "The constructor runs automatically when you create a new instance with the 'new' keyword, setting up initial properties." },
    { id: "js-class-2", question: "What does 'super()' do in a subclass constructor?", options: ["Calls the parent class constructor", "Creates a super variable", "Makes the class static", "Overrides the parent class"], correctIndex: 0, explanation: "super() calls the parent class constructor. It must be called before using 'this' in a subclass constructor." },
    { id: "js-class-3", question: "How do you make a property truly private in a class?", codeSnippet: "class User { ???count = 0; }", options: ["Use the # prefix", "Use the _ prefix", "Use the private keyword", "Use a closure"], correctIndex: 0, explanation: "#field makes the property truly private — it cannot be accessed or modified from outside the class." },
  ],

  "javascript/browser-storage-and-apis": [
    { id: "js-storage-1", question: "What is the difference between localStorage and sessionStorage?", options: ["localStorage persists; sessionStorage clears when the tab closes", "They are the same", "sessionStorage is faster", "localStorage has more storage space"], correctIndex: 0, explanation: "localStorage data persists until explicitly cleared. sessionStorage data is cleared when the browser tab is closed." },
    { id: "js-storage-2", question: "How do you store an object in localStorage?", options: ["JSON.stringify() the object before storing", "Pass the object directly", "Use localStorage.setObject()", "Convert to an array first"], correctIndex: 0, explanation: "localStorage only stores strings. Use JSON.stringify() to store and JSON.parse() to retrieve objects." },
    { id: "js-storage-3", question: "What is Intersection Observer used for?", options: ["Detecting when elements enter or leave the viewport", "Observing CSS changes", "Watching for JavaScript errors", "Monitoring network requests"], correctIndex: 0, explanation: "Intersection Observer detects when elements become visible in the viewport — used for lazy loading, infinite scroll, and scroll-triggered animations." },
  ],

  "javascript/error-handling": [
    { id: "js-err-1", question: "What does the 'finally' block do in try/catch/finally?", options: ["Always runs regardless of whether an error occurred", "Only runs if there's an error", "Only runs if there's no error", "Runs the code one final time"], correctIndex: 0, explanation: "finally always executes after try (and catch if triggered) — perfect for cleanup like closing connections." },
    { id: "js-err-2", question: "How do you create a custom error?", options: ["Extend the Error class", "Use console.error()", "Throw a string", "Use try without catch"], correctIndex: 0, explanation: "class MyError extends Error { } creates a custom error type that can be caught specifically with instanceof." },
    { id: "js-err-3", question: "What should you never do with errors?", options: ["Silently swallow them with empty catch blocks", "Log them to the console", "Re-throw unexpected errors", "Show user-friendly messages"], correctIndex: 0, explanation: "Empty catch blocks hide bugs. Always at minimum log the error, or rethrow it if you can't handle it." },
  ],

  "javascript/working-with-apis": [
    { id: "js-api-1", question: "Does fetch() reject on HTTP error status codes (like 404 or 500)?", options: ["No — you must check response.ok manually", "Yes — it throws an error", "Only for 500 errors", "Only in strict mode"], correctIndex: 0, explanation: "fetch() only rejects on network failure. HTTP errors (404, 500) still resolve — always check response.ok." },
    { id: "js-api-2", question: "How do you send JSON data in a POST request?", options: ["Set Content-Type header and use JSON.stringify() on the body", "Just pass the object directly", "Use response.json()", "Set method to 'JSON'"], correctIndex: 0, explanation: "You must set the Content-Type header to 'application/json' and stringify the body with JSON.stringify()." },
    { id: "js-api-3", question: "What is AbortController used for?", options: ["Cancelling in-flight fetch requests", "Aborting page load", "Stopping event propagation", "Ending a loop"], correctIndex: 0, explanation: "AbortController provides a signal that can be passed to fetch() to cancel the request when needed." },
  ],
};
