import { TutorialLesson } from "@/types";

export const jsLessons: TutorialLesson[] = [
  // ─── Lesson 1: Introduction to JavaScript ───────────────────────────────
  {
    slug: "introduction",
    title: "Introduction to JavaScript",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript",
    content: `You know HTML gives pages structure and CSS makes them look good. But nothing moves, clicks, changes, or responds. That's what JavaScript fixes.

JavaScript is the **only programming language that runs natively in the browser**. It's what makes buttons work, menus open, forms validate, and data load without refreshing the page. It also runs on servers (Node.js), mobile apps, and desktop apps. It's everywhere.

## JavaScript vs HTML vs CSS

- **HTML** = the nouns ("here is a button")
- **CSS** = the adjectives ("the button is blue")
- **JavaScript** = the verbs ("when clicked, the button does this")

## Your First JavaScript

You can write JavaScript directly in an HTML file with a \`<script>\` tag, or link an external \`.js\` file:

\`\`\`html
<script src="app.js"></script>
\`\`\`

Always put \`<script>\` at the **bottom of the body** (or use \`defer\`) so HTML loads before JS runs.

## Variables: Storing Data

Variables are named containers for data. Use \`const\` and \`let\`:

- **\`const\`** — value cannot be reassigned. Use this by default.
- **\`let\`** — value can change. Use only when you need to reassign.
- **\`var\`** — old style, has quirks. Avoid in modern code.

\`\`\`js
const name = "Alice";   // never changes
let score = 0;          // will change
score = 100;            // ✅ fine with let
// name = "Bob";        // ❌ error with const
\`\`\`

## Data Types

JavaScript automatically figures out the type of data you put in a variable:

- **String** — text in quotes: \`"hello"\`, \`'world'\`, \`\`template\`\`
- **Number** — any number: \`42\`, \`3.14\`, \`-10\`
- **Boolean** — true or false: \`true\`, \`false\`
- **null** — intentionally empty: \`null\`
- **undefined** — not yet assigned: \`let x;\`
- **Object** — collection of data: \`{ name: "Alice" }\`
- **Array** — ordered list: \`[1, 2, 3]\`

Check the type with \`typeof\`:
\`\`\`js
typeof "hello"  // "string"
typeof 42       // "number"
typeof true     // "boolean"
typeof null     // "object" ← famous JavaScript bug, it's actually null
\`\`\`

## Operators

**Math:** \`+\` \`-\` \`*\` \`/\` \`%\` (remainder) \`**\` (power)

**Comparison — always use triple equals:**
\`\`\`js
5 === 5   // true  (strict — checks value AND type)
5 == "5"  // true  (loose — converts types, avoid this!)
5 !== 3   // true  (strict not equal)
\`\`\`

**Logic:** \`&&\` (AND), \`||\` (OR), \`!\` (NOT)

## console.log — Your Best Friend

\`console.log()\` prints to the browser console. Open it with F12 → Console. Use it constantly while learning.

\`\`\`js
console.log("Hello!");
console.log(42 + 8);        // 50
console.log(typeof "hi");   // "string"
\`\`\``,
    keyTakeaways: [
      "JavaScript adds interactivity — the 'verbs' of a webpage",
      "Use const by default; only use let when you need to reassign",
      "Never use var in modern JavaScript",
      "Always use === (strict equality), never == (loose equality)",
      "console.log() is your debugging tool — use it constantly",
    ],
    codeExamples: [
      {
        title: "Variables, Types & Operators",
        language: "javascript",
        description: "The building blocks of every JavaScript program.",
        code: `// const — cannot be reassigned
const siteName = "BEECODEFI";
const year = 2026;
const isOnline = true;

// let — can be reassigned
let userScore = 0;
userScore = 50;
userScore += 10;  // shorthand: userScore = userScore + 10
console.log(userScore); // 60

// Data types
console.log(typeof siteName);  // "string"
console.log(typeof year);      // "number"
console.log(typeof isOnline);  // "boolean"
console.log(typeof null);      // "object" (JS quirk!)
console.log(typeof undefined); // "undefined"

// Strict equality (always use ===)
console.log(5 === 5);    // true
console.log(5 === "5");  // false (different types!)
console.log(5 == "5");   // true  (type coercion — unreliable!)

// Math operators
console.log(10 + 3);   // 13
console.log(10 % 3);   // 1  (remainder)
console.log(2 ** 10);  // 1024 (2 to the power of 10)

// Logical operators
const isLoggedIn = true;
const hasAccess = true;
console.log(isLoggedIn && hasAccess);  // true (both must be true)
console.log(isLoggedIn || false);      // true (at least one true)
console.log(!isLoggedIn);              // false (negation)`,
      },
      {
        title: "Template Literals & String Basics",
        language: "javascript",
        description: "Modern string syntax with embedded expressions.",
        code: `const firstName = "Alice";
const lastName  = "Johnson";
const age = 28;

// Old way — messy concatenation
const old = "My name is " + firstName + " " + lastName;

// Modern way — template literals (backticks)
const modern = \`My name is \${firstName} \${lastName}\`;
console.log(modern); // "My name is Alice Johnson"

// Expressions inside template literals
console.log(\`In 5 years, I'll be \${age + 5} years old.\`);
console.log(\`2 + 2 = \${2 + 2}\`);

// Multi-line strings (no more \\n)
const message = \`
  Hello \${firstName},
  Welcome to BEECODEFI!
  You are \${age} years old.
\`;
console.log(message);

// Quick string operations
const greeting = "Hello, World!";
console.log(greeting.length);        // 13
console.log(greeting.toUpperCase()); // "HELLO, WORLD!"
console.log(greeting.includes("World")); // true`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-intro-1",
        title: "Declare Variables",
        instruction: "Declare a const 'language' with value 'JavaScript', and a let 'version' with value 2026.",
        startingCode: `// Declare your variables here`,
        expectedOutput: `const language = "JavaScript";\nlet version = 2026;`,
        hints: [
          "const for values that won't change",
          "Strings go in quotes, numbers don't need quotes",
        ],
      },
      {
        id: "js-intro-2",
        title: "Strict Equality",
        instruction: "Write a console.log that checks if 10 strictly equals '10' (should be false).",
        startingCode: `// Use === to compare`,
        expectedOutput: `console.log(10 === "10");`,
        hints: [
          "=== checks value AND type",
          "10 is a number, '10' is a string — different types",
        ],
      },
      {
        id: "js-intro-3",
        title: "Template Literal",
        instruction: "Given const name = 'World', write a template literal that produces 'Hello, World!'",
        startingCode: `const name = "World";\nconsole.log(/* your template literal */);`,
        expectedOutput: `const name = "World";\nconsole.log(\`Hello, \${name}!\`);`,
        hints: [
          "Template literals use backticks ` not quotes",
          "Embed variables with ${variableName}",
        ],
      },
      {
        id: "js-intro-4",
        title: "typeof Check",
        instruction: "Write a console.log that outputs the type of the value true.",
        startingCode: `// Check the type of true`,
        expectedOutput: `console.log(typeof true);`,
        hints: ["typeof is an operator — no parentheses needed (though they work too)"],
      },
    ],
  },

  // ─── Lesson 2: Strings & String Methods ─────────────────────────────────
  {
    slug: "strings",
    title: "Strings & String Methods",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
    content: `Strings are everywhere in programming — usernames, messages, URLs, HTML content. JavaScript has a rich set of built-in string methods that let you search, transform, split, and format text without writing much code.

## Creating Strings

Three ways to create strings — all valid, but backtick template literals are the most modern:

\`\`\`js
const a = "double quotes";
const b = 'single quotes';
const c = \`template literal — can embed \${expressions}\`;
\`\`\`

**Escape characters** in regular strings:
- \`\\n\` — new line
- \`\\t\` — tab
- \`\\'\` — single quote inside single-quoted string
- \`\\\\\` — literal backslash

## String Properties

**\`length\`** — number of characters:
\`"hello".length\` → \`5\`

## Essential String Methods

**Searching:**
- \`.includes("text")\` → true/false — does it contain this?
- \`.startsWith("text")\` → true/false
- \`.endsWith("text")\` → true/false
- \`.indexOf("text")\` → position number, or -1 if not found

**Transforming:**
- \`.toUpperCase()\` / \`.toLowerCase()\`
- \`.trim()\` — remove whitespace from both ends
- \`.trimStart()\` / \`.trimEnd()\`
- \`.replace("old", "new")\` — replace first match
- \`.replaceAll("old", "new")\` — replace all matches
- \`.padStart(n, char)\` / \`.padEnd(n, char)\` — pad to length

**Extracting:**
- \`.slice(start, end)\` — extract a portion (negative indexes work from end)
- \`.substring(start, end)\` — similar to slice
- \`.charAt(index)\` — character at position
- \`string[index]\` — same as charAt, modern syntax

**Splitting & Joining:**
- \`.split("separator")\` → array of parts
- \`array.join("separator")\` → back to string

**Checking:**
- \`.at(-1)\` — last character (negative index shorthand)
- \`.repeat(n)\` — repeat the string n times

## Strings are Immutable

You cannot change a character in a string directly. String methods always return a **new string** — the original is unchanged.

\`\`\`js
const name = "alice";
const upper = name.toUpperCase(); // "ALICE"
console.log(name);  // still "alice" — unchanged!
\`\`\``,
    keyTakeaways: [
      "Strings are immutable — methods return new strings, never modify the original",
      ".trim() is essential for cleaning user input from forms",
      ".split() converts a string to an array; .join() does the reverse",
      ".slice() extracts portions — negative indices count from the end",
      "Template literals with backticks are preferred for string building",
    ],
    codeExamples: [
      {
        title: "String Methods in Action",
        language: "javascript",
        description: "The methods you'll use in every real project.",
        code: `const email = "  Alice@Example.COM  ";

// Cleaning user input
const clean = email.trim().toLowerCase();
console.log(clean); // "alice@example.com"

// Searching
const url = "https://beecodefi.vercel.app/tutorials";
console.log(url.includes("tutorials")); // true
console.log(url.startsWith("https"));   // true
console.log(url.endsWith(".pdf"));       // false
console.log(url.indexOf("vercel"));      // 15

// Extracting
const filename = "profile-photo.jpg";
const ext = filename.slice(-3);         // "jpg" (last 3 chars)
const name = filename.slice(0, -4);     // "profile-photo"
console.log(ext, name);

// Replace
const template = "Hello, {name}! You have {count} messages.";
const msg = template
  .replace("{name}", "Alice")
  .replace("{count}", "3");
console.log(msg); // "Hello, Alice! You have 3 messages."

// Split & Join
const csv = "HTML,CSS,JavaScript,React";
const skills = csv.split(",");   // ["HTML", "CSS", "JavaScript", "React"]
console.log(skills.length);      // 4
console.log(skills.join(" | ")); // "HTML | CSS | JavaScript | React"

// Padding (useful for formatting)
const num = "7";
console.log(num.padStart(3, "0")); // "007"`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-str-1",
        title: "Clean User Input",
        instruction: "Given const input = '  Hello World  ', write code that trims whitespace and converts to lowercase.",
        startingCode: `const input = "  Hello World  ";\nconst cleaned = // your code here\nconsole.log(cleaned);`,
        expectedOutput: `const input = "  Hello World  ";\nconst cleaned = input.trim().toLowerCase();\nconsole.log(cleaned);`,
        hints: [
          ".trim() removes whitespace from both ends",
          "Chain methods: input.trim().toLowerCase()",
        ],
      },
      {
        id: "js-str-2",
        title: "Extract File Extension",
        instruction: "Given const file = 'photo.jpg', use .slice() to extract just the extension 'jpg'.",
        startingCode: `const file = "photo.jpg";\nconst ext = // your code\nconsole.log(ext); // "jpg"`,
        expectedOutput: `const file = "photo.jpg";\nconst ext = file.slice(-3);\nconsole.log(ext);`,
        hints: [
          ".slice(-3) takes the last 3 characters",
          "Negative indexes count from the end",
        ],
      },
      {
        id: "js-str-3",
        title: "Split a CSV String",
        instruction: "Split the string 'red,green,blue' into an array of colors.",
        startingCode: `const colors = "red,green,blue";\nconst arr = // your code\nconsole.log(arr);`,
        expectedOutput: `const colors = "red,green,blue";\nconst arr = colors.split(",");\nconsole.log(arr);`,
        hints: [".split(',') splits on every comma"],
      },
      {
        id: "js-str-4",
        title: "Check Email Domain",
        instruction: "Check if the email 'user@gmail.com' ends with '@gmail.com' using a string method.",
        startingCode: `const email = "user@gmail.com";\nconsole.log(/* check if ends with @gmail.com */);`,
        expectedOutput: `const email = "user@gmail.com";\nconsole.log(email.endsWith("@gmail.com"));`,
        hints: [".endsWith() returns true or false"],
      },
    ],
  },

  // ─── Lesson 3: Numbers, Math & Dates ────────────────────────────────────
  {
    slug: "numbers-math-dates",
    title: "Numbers, Math & Dates",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
    content: `Numbers power every calculation in your apps — scores, prices, ages, positions. JavaScript has a single \`Number\` type for all numbers (integers and decimals), plus the \`Math\` object for calculations and the \`Date\` object for time.

## JavaScript Numbers

JavaScript uses 64-bit floating point for ALL numbers. There's no separate integer type.

\`\`\`js
const price = 9.99;
const qty = 3;
const total = price * qty; // 29.97
\`\`\`

**Special number values:**
- \`Infinity\` / \`-Infinity\` — division by zero
- \`NaN\` — "Not a Number" — result of invalid math like \`"hello" * 2\`

**Check for NaN:**
\`\`\`js
isNaN("hello")  // true
isNaN(42)       // false
Number.isNaN(NaN) // true (more precise)
\`\`\`

## Converting to Numbers

\`\`\`js
Number("42")        // 42
Number("3.14")      // 3.14
Number("")          // 0
Number("abc")       // NaN
parseInt("42px")    // 42 (stops at non-number)
parseFloat("3.14em") // 3.14
+"42"               // 42 (unary + shorthand)
\`\`\`

## Formatting Numbers

\`\`\`js
const price = 1234.5678;
price.toFixed(2)      // "1234.57" (string, rounded)
price.toFixed(0)      // "1235"

// Currency formatting (locale-aware)
new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  .format(1234.56)    // "$1,234.56"
\`\`\`

## The Math Object

Math is a built-in object with math utilities:
- \`Math.round(4.6)\` → 5
- \`Math.floor(4.9)\` → 4 (round down)
- \`Math.ceil(4.1)\` → 5 (round up)
- \`Math.abs(-10)\` → 10 (absolute value)
- \`Math.max(1, 5, 3)\` → 5
- \`Math.min(1, 5, 3)\` → 1
- \`Math.pow(2, 8)\` → 256 (same as 2**8)
- \`Math.sqrt(16)\` → 4
- \`Math.PI\` → 3.141592...
- \`Math.random()\` → random decimal 0 to <1

**Random integer between min and max:**
\`\`\`js
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomInt(1, 6); // dice roll!
\`\`\`

## Dates

\`\`\`js
const now = new Date();          // current date & time
const specific = new Date("2026-01-15");

now.getFullYear()  // 2026
now.getMonth()     // 0-11 (January = 0!)
now.getDate()      // day of month (1-31)
now.getDay()       // 0-6 (Sunday = 0)
now.getHours()     // 0-23
now.getTime()      // milliseconds since epoch (Jan 1, 1970)
\`\`\`

Format dates nicely:
\`\`\`js
new Date().toLocaleDateString('en-US') // "7/29/2026"
new Date().toLocaleString()            // "7/29/2026, 3:45:12 PM"
\`\`\``,
    keyTakeaways: [
      "JavaScript has one Number type for all numbers (integers and floats)",
      "NaN means 'Not a Number' — result of invalid operations like '2' * 'abc'",
      "Math.floor(), Math.ceil(), Math.round() for rounding",
      "Math.random() returns 0 to <1 — multiply and floor to get random integers",
      "Months in JavaScript's Date are 0-indexed — January is 0, not 1",
    ],
    codeExamples: [
      {
        title: "Numbers & Math",
        language: "javascript",
        description: "Number conversion, Math methods, and random numbers.",
        code: `// Number conversion
console.log(Number("42"));     // 42
console.log(Number("3.14"));   // 3.14
console.log(Number(""));       // 0
console.log(Number("hello"));  // NaN
console.log(parseInt("50px")); // 50 (stops at px)

// Check for NaN
const result = Number("abc");
if (Number.isNaN(result)) {
  console.log("That's not a number!");
}

// Formatting
const price = 9.999;
console.log(price.toFixed(2)); // "10.00"

// Math methods
console.log(Math.max(5, 12, 3, 9));   // 12
console.log(Math.min(5, 12, 3, 9));   // 3
console.log(Math.abs(-42));            // 42
console.log(Math.round(4.567));        // 5
console.log(Math.floor(4.999));        // 4
console.log(Math.ceil(4.001));         // 5
console.log(Math.sqrt(144));           // 12

// Random integer helper
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomInt(1, 6));   // dice roll: 1-6
console.log(randomInt(0, 100)); // 0-100

// Currency
const amount = 1234567.89;
const formatted = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(amount);
console.log(formatted); // "$1,234,567.89"`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-num-1",
        title: "Round a Price",
        instruction: "Given const price = 9.9987, use toFixed() to format it to 2 decimal places.",
        startingCode: `const price = 9.9987;\nconsole.log(/* format to 2 decimals */);`,
        expectedOutput: `const price = 9.9987;\nconsole.log(price.toFixed(2));`,
        hints: [".toFixed(n) rounds to n decimal places and returns a string"],
      },
      {
        id: "js-num-2",
        title: "Random Dice Roll",
        instruction: "Write a one-line expression using Math.floor and Math.random to get a random number from 1 to 6.",
        startingCode: `const roll = // your expression\nconsole.log(roll);`,
        expectedOutput: `const roll = Math.floor(Math.random() * 6) + 1;\nconsole.log(roll);`,
        hints: [
          "Math.random() gives 0 to <1",
          "Multiply by 6 to get 0 to <6",
          "Math.floor gives 0-5, then +1 gives 1-6",
        ],
      },
      {
        id: "js-num-3",
        title: "Find the Maximum",
        instruction: "Use Math.max() to find the largest number among 42, 17, 89, 33.",
        startingCode: `const max = // Math.max with all four numbers\nconsole.log(max);`,
        expectedOutput: `const max = Math.max(42, 17, 89, 33);\nconsole.log(max);`,
        hints: ["Math.max() accepts multiple arguments"],
      },
    ],
  },

  // ─── Lesson 4: Functions & Scope ────────────────────────────────────────
  {
    slug: "functions-and-scope",
    title: "Functions & Scope",
    difficulty: "beginner",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
    content: `Functions are the most important concept in programming. A function is a reusable block of code that takes inputs, does something, and optionally returns an output. Instead of writing the same logic 10 times, you write it once in a function.

## Declaring Functions

**Function declaration** — traditional syntax, gets "hoisted" (can be called before it's defined):
\`\`\`js
function greet(name) {
    return \`Hello, \${name}!\`;
}
\`\`\`

**Function expression** — assigned to a variable, not hoisted:
\`\`\`js
const greet = function(name) {
    return \`Hello, \${name}!\`;
};
\`\`\`

**Arrow function** — modern, concise syntax (most common today):
\`\`\`js
const greet = (name) => \`Hello, \${name}!\`;
\`\`\`

Arrow function rules:
- One parameter → parens optional: \`name => name.length\`
- One expression body → curly braces and \`return\` optional
- Multiple statements → need \`{ }\` and explicit \`return\`

## Parameters & Arguments

**Parameters** are the variable names in the function definition.
**Arguments** are the actual values passed when calling the function.

**Default parameters** — fallback when no argument is passed:
\`\`\`js
function greet(name = "friend") {
    return \`Hello, \${name}!\`;
}
greet("Alice") // "Hello, Alice!"
greet()        // "Hello, friend!"
\`\`\`

**Rest parameters** — collect any number of arguments into an array:
\`\`\`js
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4) // 10
\`\`\`

## Return Values

Every function returns something. If there's no \`return\` statement, it returns \`undefined\`. Return immediately exits the function.

## Scope

**Scope** determines where a variable is accessible.

**Global scope** — variables declared outside any function. Accessible everywhere. Use sparingly.

**Function scope** — variables declared with \`var\` inside a function. Only accessible inside that function.

**Block scope** — variables declared with \`const\` or \`let\` inside \`{ }\`. Only accessible within that block.

\`\`\`js
const global = "I'm everywhere";

function example() {
    const local = "I'm inside the function only";
    if (true) {
        const blockLevel = "I'm in this if block only";
    }
    // blockLevel not accessible here
}
// local not accessible here
\`\`\`

## Closures

A closure happens when a function "remembers" variables from its outer scope, even after the outer function has finished running.

\`\`\`js
function makeCounter() {
    let count = 0;        // this variable is "closed over"
    return function() {
        count++;
        return count;
    };
}
const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
\`\`\`

Closures are used constantly — event listeners, callbacks, and private state all rely on them.`,
    keyTakeaways: [
      "Arrow functions (const fn = () => {}) are the modern standard",
      "Default parameters (name = 'default') prevent undefined errors",
      "const and let are block-scoped; var is function-scoped (avoid var)",
      "Functions should do one thing and do it well",
      "Closures let inner functions access outer variables — used everywhere",
    ],
    codeExamples: [
      {
        title: "Function Styles & Patterns",
        language: "javascript",
        description: "Declaration, expression, arrow, defaults, and rest parameters.",
        code: `// Function declaration
function add(a, b) {
  return a + b;
}

// Arrow function (most common today)
const multiply = (a, b) => a * b;

// Default parameters
const greet = (name = "friend", greeting = "Hello") =>
  \`\${greeting}, \${name}!\`;

console.log(greet("Alice"));         // "Hello, Alice!"
console.log(greet("Bob", "Hi"));     // "Hi, Bob!"
console.log(greet());                // "Hello, friend!"

// Rest parameters — collect any number of args
const sum = (...nums) => nums.reduce((acc, n) => acc + n, 0);
console.log(sum(1, 2, 3, 4, 5)); // 15

// Functions as values (pass as argument)
const double = x => x * 2;
const numbers = [1, 2, 3, 4];
console.log(numbers.map(double)); // [2, 4, 6, 8]

// Immediately Invoked Function Expression (IIFE)
const result = ((a, b) => a + b)(10, 20);
console.log(result); // 30`,
      },
      {
        title: "Scope & Closures",
        language: "javascript",
        description: "Understanding variable visibility and closure magic.",
        code: `// Block scope with const/let
const globalName = "Global Alice";

function demoScope() {
  const functionName = "Function Bob";

  if (true) {
    const blockName = "Block Charlie";
    console.log(globalName);   // ✅ accessible
    console.log(functionName); // ✅ accessible
    console.log(blockName);    // ✅ accessible
  }

  // console.log(blockName); // ❌ ReferenceError
}
// console.log(functionName); // ❌ ReferenceError

// Closure — counter factory
function makeCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => (count = start),
    value: () => count,
  };
}

const counter = makeCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.decrement()); // 11
console.log(counter.reset());     // 10
console.log(counter.value());     // 10

// Each counter has its own private count
const c1 = makeCounter();
const c2 = makeCounter(100);
c1.increment(); c1.increment();
console.log(c1.value()); // 2
console.log(c2.value()); // 100 — completely separate`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-fn-1",
        title: "Write an Arrow Function",
        instruction: "Convert this function to an arrow function: function square(n) { return n * n; }",
        startingCode: `// Write as arrow function\nconst square = `,
        expectedOutput: `const square = (n) => n * n;`,
        hints: [
          "Arrow syntax: const name = (params) => expression",
          "Single expression body doesn't need {} or return",
        ],
      },
      {
        id: "js-fn-2",
        title: "Default Parameter",
        instruction: "Write an arrow function 'power' that raises base to exp, with exp defaulting to 2.",
        startingCode: `const power = `,
        expectedOutput: `const power = (base, exp = 2) => base ** exp;`,
        hints: [
          "Default parameter: (param = defaultValue)",
          "** is the exponentiation operator",
        ],
      },
      {
        id: "js-fn-3",
        title: "Rest Parameters",
        instruction: "Write function 'largest' that accepts any number of arguments and returns the maximum.",
        startingCode: `const largest = `,
        expectedOutput: `const largest = (...nums) => Math.max(...nums);`,
        hints: [
          "...nums collects all arguments into an array",
          "Math.max(...nums) spreads the array back as arguments",
        ],
      },
      {
        id: "js-fn-4",
        title: "Closure Counter",
        instruction: "Write a function 'makeAdder' that takes a number x and returns a function that adds x to any number.",
        startingCode: `const makeAdder = (x) => {\n  // return a function\n};`,
        expectedOutput: `const makeAdder = (x) => {\n  return (y) => x + y;\n};`,
        hints: [
          "Return a function from inside a function — that's a closure",
          "The returned function can access x from the outer function",
        ],
      },
    ],
  },

  // ─── Lesson 5: Arrays ───────────────────────────────────────────────────
  {
    slug: "arrays",
    title: "Arrays",
    difficulty: "beginner",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
    content: `An array is an ordered list of values. You'll use arrays constantly — lists of users, products, messages, search results. JavaScript arrays are powerful and come loaded with built-in methods.

## Creating Arrays

\`\`\`js
const fruits = ["apple", "banana", "cherry"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [42, "hello", true, null]; // arrays can hold any type
const empty = [];
\`\`\`

## Accessing Elements

Arrays are zero-indexed — the first item is index 0:
\`\`\`js
fruits[0]   // "apple"
fruits[1]   // "banana"
fruits.at(-1) // "cherry" (last item, modern syntax)
fruits.length // 3
\`\`\`

## Mutating Arrays (Changing the original)

- \`.push(item)\` — add to end
- \`.pop()\` — remove from end, returns removed item
- \`.unshift(item)\` — add to beginning
- \`.shift()\` — remove from beginning, returns removed item
- \`.splice(index, deleteCount, ...items)\` — remove/insert anywhere

## Non-Mutating Methods (Return new arrays)

These are the ones you'll use most in modern JavaScript:

- \`.slice(start, end)\` — extract portion (like string slice)
- \`.concat(arr)\` — join two arrays
- \`[...arr1, ...arr2]\` — spread (modern way to merge)

## Searching Arrays

- \`.includes(value)\` → true/false
- \`.indexOf(value)\` → index or -1
- \`.find(fn)\` → first matching element
- \`.findIndex(fn)\` → index of first match

## Checking & Converting

- \`Array.isArray(value)\` → true/false
- \`.join(separator)\` → to string
- \`Array.from("hello")\` → \`["h","e","l","l","o"]\`

## Sorting

\`.sort()\` sorts in-place and mutates the array. Gotcha: default sort converts to strings, so numbers sort wrong!

\`\`\`js
[10, 1, 20, 2].sort()          // [1, 10, 2, 20] — WRONG for numbers!
[10, 1, 20, 2].sort((a, b) => a - b) // [1, 2, 10, 20] — correct
\`\`\`

## Destructuring

Extract values from arrays into variables cleanly:
\`\`\`js
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]
\`\`\`

## Spread Operator

\`\`\`js
const a = [1, 2, 3];
const b = [4, 5, 6];
const merged = [...a, ...b];    // [1, 2, 3, 4, 5, 6]
const copy = [...a];            // shallow copy
Math.max(...a);                 // 3 (spreads array as arguments)
\`\`\``,
    keyTakeaways: [
      "Arrays are zero-indexed — first item is [0], last is [length - 1]",
      ".push()/.pop() add/remove from end; .unshift()/.shift() from beginning",
      ".at(-1) is the modern way to get the last element",
      "sort() mutates the array and needs a comparator for numbers",
      "Spread [...arr] creates a shallow copy and merges arrays cleanly",
    ],
    codeExamples: [
      {
        title: "Array Methods Reference",
        language: "javascript",
        description: "Every essential array method with real examples.",
        code: `const scores = [85, 92, 78, 95, 88];

// Access
console.log(scores[0]);       // 85
console.log(scores.at(-1));   // 88 (last item)
console.log(scores.length);   // 5

// Mutating
scores.push(100);             // add to end → length 6
const last = scores.pop();    // remove from end → 100
scores.unshift(70);           // add to beginning
scores.splice(1, 1);          // remove 1 item at index 1

// Searching
console.log(scores.includes(92));   // true
console.log(scores.indexOf(78));    // 2
console.log(scores.find(s => s > 90));      // 92
console.log(scores.findIndex(s => s > 90)); // 1

// Sort (always use comparator for numbers!)
const sorted = [...scores].sort((a, b) => a - b);
console.log(sorted); // ascending

// Spread & merge
const bonus = [96, 97];
const all = [...scores, ...bonus];
console.log(all.length); // merged

// Destructuring
const [top, second, ...others] = sorted.reverse();
console.log(\`Top: \${top}, Second: \${second}\`);
console.log(\`Others: \${others.join(", ")}\`);`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-arr-1",
        title: "Add & Remove Items",
        instruction: "Given const arr = [1, 2, 3], add 4 to the end and remove the first item. Log the result.",
        startingCode: `const arr = [1, 2, 3];\n// add 4 to end\n// remove first item\nconsole.log(arr);`,
        expectedOutput: `const arr = [1, 2, 3];\narr.push(4);\narr.shift();\nconsole.log(arr);`,
        hints: [".push() adds to end", ".shift() removes from beginning"],
      },
      {
        id: "js-arr-2",
        title: "Find an Element",
        instruction: "Find the first number greater than 50 in [12, 45, 67, 23, 89].",
        startingCode: `const nums = [12, 45, 67, 23, 89];\nconst found = // use .find()\nconsole.log(found);`,
        expectedOutput: `const nums = [12, 45, 67, 23, 89];\nconst found = nums.find(n => n > 50);\nconsole.log(found);`,
        hints: [".find() returns the first element that matches the condition"],
      },
      {
        id: "js-arr-3",
        title: "Sort Numbers",
        instruction: "Sort [30, 1, 400, 20, 200] in ascending order without mutating the original.",
        startingCode: `const nums = [30, 1, 400, 20, 200];\nconst sorted = // spread then sort\nconsole.log(sorted);\nconsole.log(nums); // should still be original`,
        expectedOutput: `const nums = [30, 1, 400, 20, 200];\nconst sorted = [...nums].sort((a, b) => a - b);\nconsole.log(sorted);\nconsole.log(nums);`,
        hints: ["[...nums] copies the array before sorting", "Comparator: (a, b) => a - b for ascending"],
      },
      {
        id: "js-arr-4",
        title: "Array Destructuring",
        instruction: "Destructure [10, 20, 30, 40, 50] into first, second, and rest.",
        startingCode: `const arr = [10, 20, 30, 40, 50];\nconst [first, second, ...rest] = // destructure\nconsole.log(first, second, rest);`,
        expectedOutput: `const arr = [10, 20, 30, 40, 50];\nconst [first, second, ...rest] = arr;\nconsole.log(first, second, rest);`,
        hints: ["const [a, b, ...c] = array destructures into named variables"],
      },
    ],
  },

  // ─── Lesson 6: Control Flow & Loops ─────────────────────────────────────
  {
    slug: "control-flow",
    title: "Control Flow & Loops",
    difficulty: "beginner",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
    content: `Control flow is how your program makes decisions and repeats actions. Without it, code runs top-to-bottom one time and stops. With it, you can handle conditions and process entire lists of data.

## if / else if / else

The fundamental decision-maker:
\`\`\`js
if (score >= 90) {
    console.log("A");
} else if (score >= 80) {
    console.log("B");
} else if (score >= 70) {
    console.log("C");
} else {
    console.log("F");
}
\`\`\`

## Truthy & Falsy

JavaScript values are either truthy or falsy in boolean contexts.

**Falsy values** (there are only 6):
\`false\`, \`0\`, \`""\` (empty string), \`null\`, \`undefined\`, \`NaN\`

**Everything else is truthy**, including \`[]\`, \`{}\`, \`"0"\`, \`-1\`.

\`\`\`js
if (username) {  // falsy if empty string, null, or undefined
    console.log("Welcome, " + username);
}
\`\`\`

## Ternary Operator

A one-line if/else for simple cases:
\`\`\`js
const status = age >= 18 ? "adult" : "minor";
const msg = isLoggedIn ? "Welcome back!" : "Please sign in";
\`\`\`

## Logical Operators for Defaults

**\`||\` (OR)** — use left if truthy, otherwise right:
\`\`\`js
const name = inputName || "Anonymous";
\`\`\`

**\`&&\` (AND)** — use right only if left is truthy:
\`\`\`js
isLoggedIn && showDashboard();
\`\`\`

**\`??\` (Nullish coalescing)** — like \`||\` but only falls back for \`null\`/\`undefined\` (not \`0\` or \`""\`):
\`\`\`js
const count = userCount ?? 0; // 0 stays 0; null/undefined becomes 0
\`\`\`

## Optional Chaining \`?.\`

Safely access nested properties without crashing:
\`\`\`js
const city = user?.address?.city ?? "Unknown";
// No error if user or address is null/undefined
\`\`\`

## switch

Good when comparing one value against many options:
\`\`\`js
switch (day) {
    case "Monday":
    case "Tuesday":
        console.log("Early week");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    default:
        console.log("Midweek");
}
\`\`\`

## Loops

**\`for\`** — classic, when you know how many times:
\`\`\`js
for (let i = 0; i < 5; i++) { console.log(i); }
\`\`\`

**\`for...of\`** — modern, iterate over array values (use this most):
\`\`\`js
for (const fruit of fruits) { console.log(fruit); }
\`\`\`

**\`for...in\`** — iterate over object keys:
\`\`\`js
for (const key in person) { console.log(key, person[key]); }
\`\`\`

**\`while\`** — when you don't know iterations upfront:
\`\`\`js
while (attempts < 3) { attempts++; }
\`\`\`

**\`break\`** — exit loop immediately. **\`continue\`** — skip to next iteration.`,
    keyTakeaways: [
      "Falsy values: false, 0, '', null, undefined, NaN — everything else is truthy",
      "Ternary (condition ? a : b) for simple one-line conditionals",
      "?? (nullish coalescing) is safer than || for default values",
      "?. (optional chaining) prevents crashes on null/undefined access",
      "for...of is the modern way to loop over arrays",
    ],
    codeExamples: [
      {
        title: "Conditionals & Operators",
        language: "javascript",
        description: "if/else, ternary, nullish coalescing, and optional chaining.",
        code: `// Truthy/falsy
const values = [0, "", null, undefined, NaN, false, "hello", 1, [], {}];
values.forEach(v => console.log(\`\${JSON.stringify(v)}: \${v ? "truthy" : "falsy"}\`));

// Ternary
const score = 75;
const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
console.log(grade); // "C"

// Nullish coalescing (??)
const user = { name: "Alice", age: 0 };
console.log(user.age || 18);   // 18 — WRONG! 0 is falsy
console.log(user.age ?? 18);   // 0 — CORRECT! 0 is not null/undefined

// Optional chaining (?.)
const data = { user: { profile: { city: "Paris" } } };
console.log(data?.user?.profile?.city);  // "Paris"
console.log(data?.user?.missing?.city);  // undefined (no crash!)
console.log(data?.user?.profile?.city ?? "Unknown"); // "Paris"

// Logical assignment
let config = null;
config ??= { theme: "dark" };  // assign if null/undefined
console.log(config);           // { theme: "dark" }`,
      },
      {
        title: "Loops",
        language: "javascript",
        description: "for, for...of, while, and loop control.",
        code: `const fruits = ["apple", "banana", "cherry", "date"];

// for...of — cleanest for arrays
for (const fruit of fruits) {
  console.log(fruit.toUpperCase());
}

// for...of with index (using entries())
for (const [i, fruit] of fruits.entries()) {
  console.log(\`\${i + 1}. \${fruit}\`);
}

// Classic for loop (when you need the index)
for (let i = 0; i < fruits.length; i++) {
  if (fruits[i] === "banana") continue; // skip banana
  console.log(fruits[i]);
}

// while loop
let attempts = 0;
while (attempts < 3) {
  console.log(\`Attempt \${attempts + 1}\`);
  attempts++;
}

// break early
const nums = [1, 4, 7, 2, 9, 3];
for (const n of nums) {
  if (n > 5) {
    console.log(\`First number > 5: \${n}\`);
    break;
  }
}

// for...in — object keys
const person = { name: "Alice", age: 28, city: "Paris" };
for (const key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-cf-1",
        title: "Grade Calculator",
        instruction: "Write a ternary that sets grade to 'pass' if score >= 60, else 'fail'. score = 75.",
        startingCode: `const score = 75;\nconst grade = // ternary here\nconsole.log(grade);`,
        expectedOutput: `const score = 75;\nconst grade = score >= 60 ? "pass" : "fail";\nconsole.log(grade);`,
        hints: ["Ternary: condition ? valueIfTrue : valueIfFalse"],
      },
      {
        id: "js-cf-2",
        title: "Nullish Default",
        instruction: "Use ?? to set username to 'Guest' if it's null or undefined.",
        startingCode: `const input = null;\nconst username = // use ??\nconsole.log(username);`,
        expectedOutput: `const input = null;\nconst username = input ?? "Guest";\nconsole.log(username);`,
        hints: ["?? returns the right side only if left is null or undefined"],
      },
      {
        id: "js-cf-3",
        title: "Loop & Sum",
        instruction: "Use a for...of loop to sum all numbers in [5, 10, 15, 20, 25].",
        startingCode: `const nums = [5, 10, 15, 20, 25];\nlet total = 0;\n// for...of loop\nconsole.log(total);`,
        expectedOutput: `const nums = [5, 10, 15, 20, 25];\nlet total = 0;\nfor (const n of nums) {\n    total += n;\n}\nconsole.log(total);`,
        hints: ["for (const n of nums) gives each number in sequence", "total += n adds n to total"],
      },
      {
        id: "js-cf-4",
        title: "Optional Chaining",
        instruction: "Safely access user?.address?.city — the user object may not have an address. Log 'Unknown' if missing.",
        startingCode: `const user = { name: "Alice" };\nconst city = // optional chain + nullish coalescing\nconsole.log(city);`,
        expectedOutput: `const user = { name: "Alice" };\nconst city = user?.address?.city ?? "Unknown";\nconsole.log(city);`,
        hints: ["?. prevents crashes if address doesn't exist", "?? provides a fallback for null/undefined"],
      },
    ],
  },

  // ─── Lesson 7: Higher-Order Functions ───────────────────────────────────
  {
    slug: "higher-order-functions",
    title: "Higher-Order Functions",
    difficulty: "beginner",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
    content: `Higher-order functions are functions that take other functions as arguments or return functions. They sound fancy, but you use them every day with arrays. \`map\`, \`filter\`, and \`reduce\` are the three you'll reach for constantly.

## Why Higher-Order Functions?

Instead of writing a loop manually:
\`\`\`js
// Old way — verbose
const doubled = [];
for (const n of numbers) {
    doubled.push(n * 2);
}

// New way — clean and readable
const doubled = numbers.map(n => n * 2);
\`\`\`

Same result, but the second version is shorter, reads like English, and doesn't require a mutable variable.

## .map() — Transform Every Item

Creates a **new array** by applying a function to every element. The original array is unchanged.

\`\`\`js
const prices = [10, 20, 30];
const withTax = prices.map(p => p * 1.1); // [11, 22, 33]
const strings = prices.map(p => \`$\${p}\`); // ["$10", "$20", "$30"]
\`\`\`

## .filter() — Keep Matching Items

Creates a **new array** with only elements where the function returns \`true\`.

\`\`\`js
const ages = [15, 22, 17, 31, 19];
const adults = ages.filter(age => age >= 18); // [22, 31, 19]
\`\`\`

## .reduce() — Combine Into One Value

The most powerful and flexible. Takes an accumulator and combines all elements into a single value.

\`\`\`js
const nums = [1, 2, 3, 4, 5];
const total = nums.reduce((acc, n) => acc + n, 0); // 15
//                         ↑ accumulator  ↑ starting value
\`\`\`

reduce can produce anything — a number, string, object, or even another array.

## .forEach() — Side Effects Only

Like \`map\` but returns \`undefined\`. Use it only when you want to do something **with** each item (log it, update the DOM) but don't need a new array.

\`\`\`js
users.forEach(user => sendEmail(user.email));
\`\`\`

## .some() and .every()

- \`.some(fn)\` — returns \`true\` if **at least one** element matches
- \`.every(fn)\` — returns \`true\` if **all** elements match

\`\`\`js
const scores = [85, 92, 78, 95];
scores.some(s => s >= 90)  // true (92 and 95 qualify)
scores.every(s => s >= 70) // true (all pass)
scores.every(s => s >= 90) // false (78 and 85 don't)
\`\`\`

## .flat() and .flatMap()

- \`.flat()\` — flattens nested arrays one level
- \`.flatMap(fn)\` — map then flatten (very useful)

## Chaining

The real power is chaining multiple methods together:

\`\`\`js
const result = products
    .filter(p => p.inStock)
    .map(p => p.price)
    .reduce((sum, price) => sum + price, 0);
\`\`\`

Read it like English: "filter to in-stock products, get their prices, sum them up."`,
    keyTakeaways: [
      ".map() transforms every element — returns same-length new array",
      ".filter() keeps elements passing a test — returns shorter new array",
      ".reduce() combines all elements into one value — most flexible",
      ".some() / .every() check if any / all elements match a condition",
      "Chain map/filter/reduce for clean, readable data transformations",
    ],
    codeExamples: [
      {
        title: "map, filter, reduce in Action",
        language: "javascript",
        description: "Real-world data transformations with higher-order functions.",
        code: `const products = [
  { name: "Laptop",  price: 999,  inStock: true,  category: "tech" },
  { name: "Phone",   price: 599,  inStock: true,  category: "tech" },
  { name: "Desk",    price: 299,  inStock: false, category: "furniture" },
  { name: "Monitor", price: 399,  inStock: true,  category: "tech" },
  { name: "Chair",   price: 199,  inStock: true,  category: "furniture" },
];

// map — get just the names
const names = products.map(p => p.name);
console.log(names); // ["Laptop", "Phone", "Desk", "Monitor", "Chair"]

// filter — only in-stock items
const available = products.filter(p => p.inStock);
console.log(available.length); // 4

// reduce — total cost of in-stock tech items
const techTotal = products
  .filter(p => p.inStock && p.category === "tech")
  .reduce((sum, p) => sum + p.price, 0);
console.log(\`Tech total: $\${techTotal}\`); // $1997

// some / every
console.log(products.some(p => p.price > 900));   // true (Laptop)
console.log(products.every(p => p.price > 100));   // true (all > 100)
console.log(products.every(p => p.inStock));        // false (Desk)

// Chaining — discount in-stock items and format
const discounted = products
  .filter(p => p.inStock)
  .map(p => ({ ...p, price: p.price * 0.9 }))
  .map(p => \`\${p.name}: $\${p.price.toFixed(2)}\`);
console.log(discounted);`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-hof-1",
        title: "Double with map",
        instruction: "Use .map() to create a new array where every number in [1, 2, 3, 4, 5] is doubled.",
        startingCode: `const nums = [1, 2, 3, 4, 5];\nconst doubled = // use .map()\nconsole.log(doubled);`,
        expectedOutput: `const nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);`,
        hints: [".map(n => n * 2) applies the function to each element"],
      },
      {
        id: "js-hof-2",
        title: "Filter Even Numbers",
        instruction: "Use .filter() to keep only even numbers from [1, 2, 3, 4, 5, 6, 7, 8].",
        startingCode: `const nums = [1, 2, 3, 4, 5, 6, 7, 8];\nconst evens = // use .filter()\nconsole.log(evens);`,
        expectedOutput: `const nums = [1, 2, 3, 4, 5, 6, 7, 8];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens);`,
        hints: ["n % 2 === 0 is true for even numbers"],
      },
      {
        id: "js-hof-3",
        title: "Sum with reduce",
        instruction: "Use .reduce() to sum all values in [10, 20, 30, 40, 50].",
        startingCode: `const nums = [10, 20, 30, 40, 50];\nconst sum = // use .reduce()\nconsole.log(sum);`,
        expectedOutput: `const nums = [10, 20, 30, 40, 50];\nconst sum = nums.reduce((acc, n) => acc + n, 0);\nconsole.log(sum);`,
        hints: ["reduce(callback, initialValue)", "acc is the running total, 0 is the start"],
      },
      {
        id: "js-hof-4",
        title: "Chain filter + map",
        instruction: "From ['apple', 'avocado', 'banana', 'apricot'], filter words starting with 'a', then map them to uppercase.",
        startingCode: `const fruits = ["apple", "avocado", "banana", "apricot"];\nconst result = // chain .filter() and .map()\nconsole.log(result);`,
        expectedOutput: `const fruits = ["apple", "avocado", "banana", "apricot"];\nconst result = fruits.filter(f => f.startsWith("a")).map(f => f.toUpperCase());\nconsole.log(result);`,
        hints: [".filter() first, then chain .map() on the result"],
      },
    ],
  },

  // ─── Lesson 8: Objects & Destructuring ──────────────────────────────────
  {
    slug: "objects-and-destructuring",
    title: "Objects & Destructuring",
    difficulty: "beginner",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
    content: `Objects are the most important data structure in JavaScript. Almost everything — DOM elements, API responses, configuration, user data — comes in the form of an object. Mastering objects is mastering JavaScript.

## What is an Object?

An object is a collection of **key-value pairs**. Keys are always strings (or Symbols). Values can be anything.

\`\`\`js
const user = {
    name: "Alice",
    age: 28,
    isAdmin: false,
    address: { city: "Paris", country: "France" }, // nested object
    greet() { return \`Hi, I'm \${this.name}\`; }    // method
};
\`\`\`

## Accessing Properties

\`\`\`js
user.name          // "Alice" — dot notation (preferred)
user["name"]       // "Alice" — bracket notation (needed for dynamic keys)
user.address.city  // "Paris" — nested access
\`\`\`

## Adding, Updating, Deleting

\`\`\`js
user.email = "alice@example.com"; // add
user.age = 29;                    // update
delete user.isAdmin;              // delete
\`\`\`

## Checking Properties

\`\`\`js
"name" in user          // true
user.hasOwnProperty("name") // true
user.missing            // undefined (no error)
user.missing ?? "default"   // "default"
\`\`\`

## Object Methods

- \`Object.keys(obj)\` → array of keys
- \`Object.values(obj)\` → array of values
- \`Object.entries(obj)\` → array of \`[key, value]\` pairs
- \`Object.assign(target, source)\` → merge objects (mutates target)
- \`{ ...obj }\` → spread (shallow copy, preferred)
- \`Object.freeze(obj)\` → make immutable

## Object Destructuring

Extract properties into variables cleanly:

\`\`\`js
const { name, age, city = "Unknown" } = user;
// name = "Alice", age = 28, city = "Unknown" (default)

// Rename while destructuring
const { name: userName } = user;
// userName = "Alice"

// Nested destructuring
const { address: { city } } = user;
\`\`\`

## Spread & Rest with Objects

\`\`\`js
// Copy
const copy = { ...user };

// Merge
const updated = { ...user, age: 29, role: "admin" };

// Rest (pick what you want, collect the rest)
const { name: n, age: a, ...rest } = user;
\`\`\`

## Shorthand Syntax

\`\`\`js
const name = "Alice";
const age = 28;

// Old
const user = { name: name, age: age };

// Modern shorthand (same thing)
const user = { name, age };

// Computed keys
const key = "dynamic";
const obj = { [key]: "value" }; // { dynamic: "value" }
\`\`\``,
    keyTakeaways: [
      "Objects store key-value pairs — keys are strings, values can be anything",
      "Dot notation (obj.key) is preferred; bracket notation for dynamic keys",
      "Object destructuring extracts properties into named variables",
      "Spread {...obj} creates a shallow copy and merges objects",
      "Object.keys/values/entries() convert objects to arrays for iteration",
    ],
    codeExamples: [
      {
        title: "Objects in Depth",
        language: "javascript",
        description: "Creating, reading, transforming, and iterating objects.",
        code: `const product = {
  id: 1,
  name: "Mechanical Keyboard",
  price: 129.99,
  specs: { keys: 87, rgb: true, switch: "Cherry MX Red" },
  tags: ["gaming", "typing", "tech"],
};

// Access
console.log(product.name);           // "Mechanical Keyboard"
console.log(product.specs.switch);   // "Cherry MX Red"
console.log(product.tags[0]);        // "gaming"

// Dynamic key access
const field = "price";
console.log(product[field]);         // 129.99

// Destructuring
const { name, price, specs: { rgb } } = product;
console.log(\`\${name} costs $\${price}, RGB: \${rgb}\`);

// Spread — non-destructive update
const onSale = { ...product, price: 99.99, onSale: true };
console.log(product.price);  // still 129.99 — original unchanged
console.log(onSale.price);   // 99.99

// Object.keys / values / entries
console.log(Object.keys(product));   // ["id", "name", "price", ...]
console.log(Object.values(product)); // [1, "Mechanical Keyboard", ...]

// Iterate with for...of + entries()
for (const [key, value] of Object.entries(product)) {
  if (typeof value !== "object" && !Array.isArray(value)) {
    console.log(\`\${key}: \${value}\`);
  }
}

// Shorthand + computed keys
const field2 = "discount";
const amount = 10;
const promo = { [field2]: amount, name: "Sale" }; // { discount: 10, name: "Sale" }`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-obj-1",
        title: "Destructure an Object",
        instruction: "Destructure name and age from { name: 'Alice', age: 28, city: 'Paris' }.",
        startingCode: `const person = { name: "Alice", age: 28, city: "Paris" };\nconst { /* destructure here */ } = person;\nconsole.log(name, age);`,
        expectedOutput: `const person = { name: "Alice", age: 28, city: "Paris" };\nconst { name, age } = person;\nconsole.log(name, age);`,
        hints: ["const { key1, key2 } = object extracts the named properties"],
      },
      {
        id: "js-obj-2",
        title: "Spread to Update",
        instruction: "Create updatedUser by spreading user and overriding age to 30.",
        startingCode: `const user = { name: "Alice", age: 28, role: "user" };\nconst updatedUser = // spread + override\nconsole.log(updatedUser);`,
        expectedOutput: `const user = { name: "Alice", age: 28, role: "user" };\nconst updatedUser = { ...user, age: 30 };\nconsole.log(updatedUser);`,
        hints: ["{ ...user, age: 30 } copies all properties, then age overrides"],
      },
      {
        id: "js-obj-3",
        title: "Object.keys Loop",
        instruction: "Use Object.keys() to log every key in { a: 1, b: 2, c: 3 }.",
        startingCode: `const obj = { a: 1, b: 2, c: 3 };\n// loop over keys`,
        expectedOutput: `const obj = { a: 1, b: 2, c: 3 };\nObject.keys(obj).forEach(key => console.log(key));`,
        hints: ["Object.keys() returns an array of key strings", "Use .forEach() to iterate"],
      },
      {
        id: "js-obj-4",
        title: "Shorthand Property",
        instruction: "Given const title = 'JS' and const level = 3, create an object lesson using shorthand syntax.",
        startingCode: `const title = "JS";\nconst level = 3;\nconst lesson = // shorthand\nconsole.log(lesson);`,
        expectedOutput: `const title = "JS";\nconst level = 3;\nconst lesson = { title, level };\nconsole.log(lesson);`,
        hints: ["When key and variable have the same name, { name } is shorthand for { name: name }"],
      },
    ],
  },

  // ─── Lesson 9: DOM Manipulation ─────────────────────────────────────────
  {
    slug: "dom-manipulation",
    title: "DOM Manipulation",
    difficulty: "beginner",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
    content: `The DOM (Document Object Model) is JavaScript's view of your HTML page. When the browser loads HTML, it converts it into a tree of objects — every element, attribute, and text node becomes a JavaScript object you can read and change. DOM manipulation is how JavaScript makes pages interactive.

## Selecting Elements

Find elements by CSS selector — the same selectors you use in CSS:

\`\`\`js
// Returns the FIRST matching element (or null)
const btn = document.querySelector(".btn");
const hero = document.querySelector("#hero");
const input = document.querySelector("input[type='email']");

// Returns ALL matching elements as a NodeList
const cards = document.querySelectorAll(".card");
cards.forEach(card => console.log(card));
\`\`\`

Older methods (still work, less flexible):
\`\`\`js
document.getElementById("hero")
document.getElementsByClassName("card") // live HTMLCollection
document.getElementsByTagName("p")
\`\`\`

## Reading & Changing Content

\`\`\`js
const heading = document.querySelector("h1");

// Read/set text content (safe — no HTML parsing)
heading.textContent = "New Heading";

// Read/set HTML (careful with user input — XSS risk!)
heading.innerHTML = "Hello <strong>World</strong>";

// Form inputs use .value
const input = document.querySelector("input");
const userInput = input.value;
input.value = "";  // clear the input
\`\`\`

## Reading & Changing Attributes

\`\`\`js
const img = document.querySelector("img");
img.getAttribute("src")        // read
img.setAttribute("src", "new.jpg") // write
img.removeAttribute("alt")     // remove
img.src = "new.jpg"            // shorthand for common attributes
img.alt = "description"
\`\`\`

## Classes

\`\`\`js
const el = document.querySelector(".card");
el.classList.add("active");
el.classList.remove("hidden");
el.classList.toggle("expanded");   // add if absent, remove if present
el.classList.contains("active");   // true/false check
el.classList.replace("old", "new");
\`\`\`

## Changing Styles

\`\`\`js
// Direct style (use sparingly — prefer CSS classes)
el.style.color = "red";
el.style.fontSize = "1.5rem";  // camelCase!
el.style.display = "none";

// Better: use CSS classes
el.classList.add("text-red");   // defined in your CSS
\`\`\`

## Creating & Inserting Elements

\`\`\`js
const li = document.createElement("li");
li.textContent = "New item";
li.classList.add("list-item");

// Insert into the DOM
ul.appendChild(li);                 // add as last child
ul.prepend(li);                     // add as first child
card.insertAdjacentHTML("beforeend", "<p>Added text</p>");
\`\`\`

## Removing Elements

\`\`\`js
el.remove();                    // remove element itself
parent.removeChild(child);      // remove child from parent
\`\`\`

## Traversing the DOM

\`\`\`js
el.parentElement          // parent
el.children               // HTMLCollection of children
el.firstElementChild      // first child element
el.lastElementChild       // last child element
el.nextElementSibling     // next sibling
el.previousElementSibling // previous sibling
\`\`\``,
    keyTakeaways: [
      "querySelector() finds first match; querySelectorAll() finds all",
      "Use textContent to set text safely; innerHTML only for trusted HTML",
      "classList.toggle() is the easiest way to show/hide elements",
      "createElement() + appendChild() builds elements programmatically",
      "Prefer adding/removing CSS classes over setting inline styles",
    ],
    codeExamples: [
      {
        title: "DOM Manipulation Playground",
        language: "html",
        description: "Select, read, change, create, and delete DOM elements.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 1rem; }
  .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem; margin: 0.5rem 0; }
  .highlight { background: #fef9c3; border-color: #fbbf24; }
  .hidden { display: none; }
  button { padding: 0.5rem 1rem; margin: 0.25rem; cursor: pointer;
           background: #6366f1; color: white; border: none; border-radius: 6px; }
</style>
</head>
<body>
  <h1 id="title">DOM Demo</h1>
  <div id="list"></div>
  <div>
    <input id="nameInput" type="text" placeholder="Enter name..." style="padding:0.5rem;border:1px solid #ccc;border-radius:4px">
    <button onclick="addItem()">Add Card</button>
    <button onclick="highlightAll()">Highlight All</button>
    <button onclick="clearAll()">Clear All</button>
  </div>

  <script>
    // Change heading
    document.querySelector("#title").textContent = "DOM Manipulation!";

    function addItem() {
      const input = document.querySelector("#nameInput");
      const name = input.value.trim();
      if (!name) return;

      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = \`
        <strong>\${name}</strong>
        <button onclick="this.parentElement.remove()">✕ Remove</button>
      \`;

      document.querySelector("#list").appendChild(card);
      input.value = "";
      input.focus();
    }

    function highlightAll() {
      document.querySelectorAll(".card").forEach(card => {
        card.classList.toggle("highlight");
      });
    }

    function clearAll() {
      document.querySelector("#list").innerHTML = "";
    }
  </script>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "js-dom-1",
        title: "Select & Change Text",
        instruction: "Write JavaScript to select the element with id 'title' and change its textContent to 'Hello DOM!'.",
        startingCode: `// Select the element and change its text`,
        expectedOutput: `document.querySelector("#title").textContent = "Hello DOM!";`,
        hints: ["querySelector('#id') selects by id", ".textContent sets the text content"],
      },
      {
        id: "js-dom-2",
        title: "Toggle a Class",
        instruction: "Write code to toggle the class 'active' on the first element with class 'btn'.",
        startingCode: `const btn = document.querySelector(".btn");\n// toggle 'active' class`,
        expectedOutput: `const btn = document.querySelector(".btn");\nbtn.classList.toggle("active");`,
        hints: [".classList.toggle() adds if absent, removes if present"],
      },
      {
        id: "js-dom-3",
        title: "Create & Append",
        instruction: "Create a <li> element with text 'New Item' and append it to the element with id 'list'.",
        startingCode: `const list = document.querySelector("#list");\n// create li and append it`,
        expectedOutput: `const list = document.querySelector("#list");\nconst li = document.createElement("li");\nli.textContent = "New Item";\nlist.appendChild(li);`,
        hints: [
          "document.createElement('li') creates the element",
          ".textContent sets its text",
          ".appendChild() adds it to the parent",
        ],
      },
      {
        id: "js-dom-4",
        title: "QuerySelectorAll",
        instruction: "Select all elements with class 'card' and add the class 'visible' to each one.",
        startingCode: `// Select all cards and add 'visible' class to each`,
        expectedOutput: `document.querySelectorAll(".card").forEach(card => {\n    card.classList.add("visible");\n});`,
        hints: [
          "querySelectorAll returns a NodeList",
          ".forEach() iterates over NodeList elements",
        ],
      },
    ],
  },

  // ─── Lesson 10: Events & Event Handling ─────────────────────────────────
  {
    slug: "events",
    title: "Events & Event Handling",
    difficulty: "beginner",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
    content: `Events are how the browser tells your JavaScript that something happened — a click, a keypress, a form submission, a page load. Event handling is what makes websites interactive.

## addEventListener

The modern, recommended way to listen for events:

\`\`\`js
const btn = document.querySelector("#myBtn");
btn.addEventListener("click", function(event) {
    console.log("Button clicked!");
    console.log(event); // the Event object
});
\`\`\`

Or with an arrow function:
\`\`\`js
btn.addEventListener("click", (e) => {
    console.log("Clicked at:", e.clientX, e.clientY);
});
\`\`\`

## Common Event Types

**Mouse events:** \`click\`, \`dblclick\`, \`mouseenter\`, \`mouseleave\`, \`mousemove\`, \`contextmenu\`

**Keyboard events:** \`keydown\`, \`keyup\`, \`keypress\` (deprecated)
\`\`\`js
document.addEventListener("keydown", (e) => {
    console.log(e.key);    // "Enter", "a", "ArrowLeft"
    console.log(e.code);   // "KeyA", "Enter"
    if (e.key === "Enter") doSomething();
    if (e.ctrlKey && e.key === "s") saveFile();
});
\`\`\`

**Form events:** \`submit\`, \`input\`, \`change\`, \`focus\`, \`blur\`, \`reset\`

**Document/Window:** \`DOMContentLoaded\`, \`load\`, \`resize\`, \`scroll\`

## The Event Object

Every event listener receives an event object with useful properties:
- \`e.target\` — the element that was clicked/interacted with
- \`e.currentTarget\` — the element the listener is attached to
- \`e.preventDefault()\` — stop default browser behavior (e.g. form submit)
- \`e.stopPropagation()\` — stop the event from bubbling up

## preventDefault

Stops what the browser would normally do:
\`\`\`js
form.addEventListener("submit", (e) => {
    e.preventDefault(); // don't reload the page!
    // handle form data with JavaScript instead
});

link.addEventListener("click", (e) => {
    e.preventDefault(); // don't follow the href
});
\`\`\`

## Event Bubbling

When you click an element, the event "bubbles" up through its ancestors. A click on a button inside a div inside a section triggers all three elements' click handlers (inner → outer).

## Event Delegation

Instead of attaching listeners to every item (expensive), attach one listener to the parent and check \`e.target\`:

\`\`\`js
// Instead of adding a listener to every <li>:
ul.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("done");
    }
});
\`\`\`

This is also how you handle dynamically added elements — the parent listener catches events from children added later.

## Removing Event Listeners

\`\`\`js
function handleClick() { console.log("clicked"); }
btn.addEventListener("click", handleClick);
btn.removeEventListener("click", handleClick); // must use same function reference
\`\`\`

## Once Option

Listen only once, then auto-remove:
\`\`\`js
btn.addEventListener("click", handleClick, { once: true });
\`\`\``,
    keyTakeaways: [
      "addEventListener(type, callback) is the modern way to handle events",
      "e.preventDefault() stops browser defaults (form submit, link navigation)",
      "e.target is the actual clicked element; e.currentTarget is where listener lives",
      "Event delegation — listen on parent, check e.target — is more efficient",
      "{ once: true } auto-removes the listener after it fires once",
    ],
    codeExamples: [
      {
        title: "Events in Action",
        language: "html",
        description: "Click, keyboard, form submit, and event delegation.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 1.5rem; }
  button { padding: 0.5rem 1rem; margin: 0.25rem; cursor: pointer;
           background: #6366f1; color: white; border: none; border-radius: 6px; }
  .done { text-decoration: line-through; color: #9ca3af; }
  li { padding: 0.5rem; cursor: pointer; border-radius: 4px; }
  li:hover { background: #f3f4f6; }
  input { padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; }
</style>
</head>
<body>
  <h2>Click Events</h2>
  <button id="countBtn">Clicks: 0</button>
  <button id="colorBtn">Change Color</button>

  <h2>Keyboard Events</h2>
  <input id="liveInput" placeholder="Type here — see it live" style="width:300px">
  <p id="liveOutput" style="color:#6366f1"></p>

  <h2>Form with preventDefault</h2>
  <form id="myForm">
    <input type="text" id="nameField" placeholder="Your name" required>
    <button type="submit">Submit</button>
  </form>
  <p id="formResult"></p>

  <h2>Event Delegation (todo list)</h2>
  <ul id="todos">
    <li>Click me to mark done</li>
    <li>Or me!</li>
    <li>Me too!</li>
  </ul>

  <script>
    // Click counter
    let count = 0;
    document.querySelector("#countBtn").addEventListener("click", (e) => {
      count++;
      e.target.textContent = \`Clicks: \${count}\`;
    });

    // Change color
    const colors = ["#6366f1","#ec4899","#10b981","#f59e0b"];
    let ci = 0;
    document.querySelector("#colorBtn").addEventListener("click", (e) => {
      e.target.style.background = colors[ci++ % colors.length];
    });

    // Live keyboard input
    document.querySelector("#liveInput").addEventListener("input", (e) => {
      document.querySelector("#liveOutput").textContent =
        \`You typed: "\${e.target.value}" (\${e.target.value.length} chars)\`;
    });

    // Form submit with preventDefault
    document.querySelector("#myForm").addEventListener("submit", (e) => {
      e.preventDefault(); // no page reload!
      const name = document.querySelector("#nameField").value.trim();
      document.querySelector("#formResult").textContent = \`Hello, \${name}!\`;
      e.target.reset();
    });

    // Event delegation on ul
    document.querySelector("#todos").addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        e.target.classList.toggle("done");
      }
    });
  </script>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "js-ev-1",
        title: "Click Listener",
        instruction: "Add a click event listener to #myBtn that logs 'Button clicked!' to the console.",
        startingCode: `const btn = document.querySelector("#myBtn");\n// add click listener`,
        expectedOutput: `const btn = document.querySelector("#myBtn");\nbtn.addEventListener("click", () => {\n    console.log("Button clicked!");\n});`,
        hints: [".addEventListener('click', callback)", "Arrow function is fine as the callback"],
      },
      {
        id: "js-ev-2",
        title: "Prevent Form Submit",
        instruction: "Add a submit listener to #myForm that prevents the default page reload.",
        startingCode: `const form = document.querySelector("#myForm");\nform.addEventListener("submit", (e) => {\n    // prevent default\n});`,
        expectedOutput: `const form = document.querySelector("#myForm");\nform.addEventListener("submit", (e) => {\n    e.preventDefault();\n});`,
        hints: ["e.preventDefault() stops the browser's default action"],
      },
      {
        id: "js-ev-3",
        title: "Keyboard Detection",
        instruction: "Add a keydown listener to document that logs e.key whenever a key is pressed.",
        startingCode: `document.addEventListener("keydown", (e) => {\n    // log the key\n});`,
        expectedOutput: `document.addEventListener("keydown", (e) => {\n    console.log(e.key);\n});`,
        hints: ["e.key gives the key name like 'Enter', 'a', 'ArrowLeft'"],
      },
      {
        id: "js-ev-4",
        title: "Event Delegation",
        instruction: "Add one click listener on #list that toggles class 'active' when any <li> inside it is clicked.",
        startingCode: `document.querySelector("#list").addEventListener("click", (e) => {\n    // only act on li elements\n});`,
        expectedOutput: `document.querySelector("#list").addEventListener("click", (e) => {\n    if (e.target.tagName === "LI") {\n        e.target.classList.toggle("active");\n    }\n});`,
        hints: ["e.target is the actual clicked element", "Check tagName === 'LI' to be sure it's a list item"],
      },
    ],
  },

  // ─── Lesson 11: Async JavaScript ────────────────────────────────────────
  {
    slug: "async-javascript",
    title: "Async JavaScript",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises",
    content: `JavaScript is single-threaded — it can only do one thing at a time. But web apps constantly need to wait: for API responses, file reads, timers. Async programming lets you wait for these things without blocking everything else.

## The Problem: Blocking Code

Imagine fetching data from a server takes 3 seconds. If JavaScript just waited, the entire page would freeze — no scrolling, no clicking, nothing. Instead, JavaScript uses an **event loop** to keep running while waiting for slow operations.

## Callbacks (The Old Way)

Early JavaScript used callbacks — functions passed to run "when done":
\`\`\`js
setTimeout(() => console.log("Done after 1s"), 1000);
\`\`\`

The problem: deeply nested callbacks create "callback hell" — unreadable code.

## Promises (Better)

A Promise represents a value that will exist in the future. It's in one of three states:
- **pending** — waiting
- **fulfilled** — succeeded, has a value
- **rejected** — failed, has an error

\`\`\`js
fetch("https://api.example.com/data")
    .then(response => response.json())  // when response arrives
    .then(data => console.log(data))     // when parsed
    .catch(error => console.error(error)); // if anything fails
\`\`\`

## async/await (Modern — Use This)

\`async/await\` is syntactic sugar over Promises. It makes async code look and feel like synchronous code:

\`\`\`js
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Failed:", error);
    }
}
\`\`\`

Rules:
- \`await\` can only be used inside an \`async\` function
- \`await\` pauses the async function until the promise resolves
- Always wrap \`await\` calls in \`try/catch\` for error handling

## Running Things in Parallel

If two operations don't depend on each other, run them simultaneously:

\`\`\`js
// ❌ Sequential — takes 2 seconds total (1 + 1)
const users = await fetchUsers();
const posts = await fetchPosts();

// ✅ Parallel — takes 1 second total (both run at once)
const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);
\`\`\`

## Other Promise Utilities

- \`Promise.all([\...])\` — wait for ALL to resolve; fails if any fail
- \`Promise.allSettled([\...])\` — wait for all, get results even if some fail
- \`Promise.race([\...])\` — resolve/reject as soon as the FIRST one settles
- \`Promise.any([\...])\` — resolve when any ONE succeeds

## Creating Your Own Promises

\`\`\`js
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function example() {
    console.log("Start");
    await delay(1000);
    console.log("1 second later");
}
\`\`\``,
    keyTakeaways: [
      "JavaScript is single-threaded — async prevents blocking the UI",
      "async/await is the modern way — reads like synchronous code",
      "Always wrap await calls in try/catch for proper error handling",
      "Promise.all() runs multiple async operations in parallel — much faster",
      "await pauses only the current async function, not the whole program",
    ],
    codeExamples: [
      {
        title: "async/await with fetch",
        language: "javascript",
        description: "Fetching real API data with async/await and error handling.",
        code: `// Basic async function with error handling
async function getUser(id) {
  try {
    const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const user = await response.json();
    console.log(\`Name: \${user.name}\`);
    console.log(\`Email: \${user.email}\`);
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    return null;
  }
}

// Run multiple requests in parallel
async function getDashboardData() {
  try {
    const [users, posts, todos] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()),
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=5").then(r => r.json()),
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=5").then(r => r.json()),
    ]);

    console.log(\`Users: \${users.length}\`);
    console.log(\`Posts: \${posts.length}\`);
    console.log(\`Todos: \${todos.length}\`);
  } catch (error) {
    console.error("Dashboard load failed:", error);
  }
}

// Utility: promisified delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runSequence() {
  console.log("Step 1");
  await delay(500);
  console.log("Step 2 (after 500ms)");
  await delay(500);
  console.log("Step 3 (after 1s total)");
}

// Call them
getUser(1);
getDashboardData();
runSequence();`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-async-1",
        title: "Async Function",
        instruction: "Write an async function 'fetchData' that awaits fetch('https://api.example.com/data') and returns the JSON.",
        startingCode: `async function fetchData() {\n    // await fetch and return json\n}`,
        expectedOutput: `async function fetchData() {\n    const response = await fetch("https://api.example.com/data");\n    return response.json();\n}`,
        hints: [
          "await pauses until fetch resolves",
          "response.json() also returns a promise — you can return it directly",
        ],
      },
      {
        id: "js-async-2",
        title: "Try/Catch with Await",
        instruction: "Wrap an await call in try/catch: try fetching a URL, catch and log any error.",
        startingCode: `async function safeGet(url) {\n    // try/catch with await\n}`,
        expectedOutput: `async function safeGet(url) {\n    try {\n        const res = await fetch(url);\n        return await res.json();\n    } catch (error) {\n        console.error(error);\n    }\n}`,
        hints: ["try { await ... } catch (error) { handle error }"],
      },
      {
        id: "js-async-3",
        title: "Promise.all",
        instruction: "Use Promise.all to fetch two URLs in parallel and destructure the results.",
        startingCode: `async function getAll() {\n    const [users, posts] = // Promise.all\n    console.log(users, posts);\n}`,
        expectedOutput: `async function getAll() {\n    const [users, posts] = await Promise.all([\n        fetch("/api/users").then(r => r.json()),\n        fetch("/api/posts").then(r => r.json()),\n    ]);\n    console.log(users, posts);\n}`,
        hints: [
          "Promise.all([p1, p2]) runs both in parallel",
          "Destructure the result array with [a, b]",
        ],
      },
    ],
  },

  // ─── Lesson 12: ES6+ Modern Features ────────────────────────────────────
  {
    slug: "es6-features",
    title: "ES6+ Modern JavaScript Features",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    content: `ES6 (2015) transformed JavaScript. The years since have kept bringing improvements. These modern features make code shorter, safer, and more expressive. This lesson covers the most important ones you'll see in every real codebase.

## Destructuring (Recap + Advanced)

You've seen basic destructuring. Here's more:

\`\`\`js
// Swap variables
let a = 1, b = 2;
[a, b] = [b, a]; // a=2, b=1

// Ignore values
const [,, third] = [1, 2, 3]; // third = 3

// Function parameter destructuring
function display({ name, age = 0 }) {
    console.log(\`\${name} is \${age}\`);
}
display({ name: "Alice", age: 28 });
\`\`\`

## Spread & Rest (Recap)

\`\`\`js
// Spread into function arguments
const nums = [3, 1, 4, 1, 5];
Math.max(...nums); // 5

// Clone and extend
const config = { ...defaults, ...overrides };
\`\`\`

## Symbol

A unique, immutable primitive. Good for object keys that should never collide:
\`\`\`js
const id = Symbol("id");
const obj = { [id]: 123 };
\`\`\`

## Map & Set

**Map** — like an object but keys can be anything (not just strings), maintains insertion order, and has a proper \`size\` property:
\`\`\`js
const map = new Map();
map.set("name", "Alice");
map.set(42, "a number key");
map.get("name"); // "Alice"
map.has(42);     // true
map.size;        // 2
map.forEach((value, key) => console.log(key, value));
\`\`\`

**Set** — array with no duplicates:
\`\`\`js
const set = new Set([1, 2, 2, 3, 3, 3]);
console.log([...set]); // [1, 2, 3]

// Remove duplicates from array
const unique = [...new Set(arr)];
\`\`\`

## Optional Chaining & Nullish Coalescing (Recap)

These two are so essential they deserve emphasis:
\`\`\`js
const name = user?.profile?.displayName ?? "Anonymous";
\`\`\`

## Logical Assignment Operators

\`\`\`js
x ??= "default"; // assign if null/undefined
x ||= "fallback"; // assign if falsy
x &&= transform(x); // assign if truthy
\`\`\`

## Numeric Separators

Makes big numbers readable:
\`\`\`js
const million = 1_000_000;
const bytes = 0xFF_FF_FF;
\`\`\`

## Object.fromEntries()

The inverse of \`Object.entries()\`:
\`\`\`js
const entries = [["a", 1], ["b", 2]];
const obj = Object.fromEntries(entries); // { a: 1, b: 2 }

// Transform object values cleanly
const doubled = Object.fromEntries(
    Object.entries(prices).map(([k, v]) => [k, v * 2])
);
\`\`\`

## Array.at() and structuredClone()

\`\`\`js
[1,2,3].at(-1);  // 3 (last element)
[1,2,3].at(-2);  // 2 (second to last)

// Deep clone (no more JSON.parse(JSON.stringify()))
const clone = structuredClone(complexObject);
\`\`\`

## String Methods (ES2019+)

\`\`\`js
"  hello  ".trimStart(); // "hello  "
"  hello  ".trimEnd();   // "  hello"
"ha".repeat(3);          // "hahaha"
"hello".padStart(8, "*"); // "***hello"
\`\`\``,
    keyTakeaways: [
      "Map preserves insertion order and allows non-string keys",
      "Set is an array with automatic duplicate removal",
      "structuredClone() creates a proper deep copy of any object",
      "Logical assignment (??=, ||=, &&=) conditionally assigns in one line",
      "Numeric separators (1_000_000) improve readability of large numbers",
    ],
    codeExamples: [
      {
        title: "Map, Set & Modern Patterns",
        language: "javascript",
        description: "Map, Set, Object.fromEntries, and other modern essentials.",
        code: `// Map — key can be anything
const roles = new Map([
  ["alice@example.com", "admin"],
  ["bob@example.com",   "user"],
  ["carol@example.com", "editor"],
]);
roles.set("dave@example.com", "user");
console.log(roles.get("alice@example.com")); // "admin"
console.log(roles.size); // 4

// Iterate a Map
for (const [email, role] of roles) {
  console.log(\`\${email}: \${role}\`);
}

// Set — unique values only
const tags = new Set(["js", "css", "js", "html", "css"]);
console.log([...tags]); // ["js", "css", "html"]
tags.add("react");
tags.delete("css");
console.log(tags.has("js")); // true

// Deduplicate array
const nums = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(nums)];
console.log(unique); // [1, 2, 3, 4]

// Object.fromEntries — transform object values
const prices = { apple: 1.5, banana: 0.75, cherry: 3.0 };
const discounted = Object.fromEntries(
  Object.entries(prices).map(([fruit, price]) => [fruit, price * 0.9])
);
console.log(discounted);

// structuredClone — proper deep copy
const original = { user: { name: "Alice", scores: [1, 2, 3] } };
const clone = structuredClone(original);
clone.user.name = "Bob";
console.log(original.user.name); // "Alice" — unchanged!

// Numeric separators
const population = 8_100_000_000;
const MAX_SAFE = Number.MAX_SAFE_INTEGER; // 9_007_199_254_740_991
console.log(population.toLocaleString()); // "8,100,000,000"`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-es6-1",
        title: "Deduplicate with Set",
        instruction: "Remove duplicates from [1, 2, 2, 3, 3, 3, 4] using a Set.",
        startingCode: `const nums = [1, 2, 2, 3, 3, 3, 4];\nconst unique = // use Set\nconsole.log(unique);`,
        expectedOutput: `const nums = [1, 2, 2, 3, 3, 3, 4];\nconst unique = [...new Set(nums)];\nconsole.log(unique);`,
        hints: ["new Set(array) removes duplicates", "Spread [...set] converts it back to an array"],
      },
      {
        id: "js-es6-2",
        title: "Map Lookup",
        instruction: "Create a Map with keys 'cat' → 'meow' and 'dog' → 'woof', then get the value for 'cat'.",
        startingCode: `const sounds = new Map();\n// set cat and dog\nconsole.log(sounds.get("cat"));`,
        expectedOutput: `const sounds = new Map();\nsounds.set("cat", "meow");\nsounds.set("dog", "woof");\nconsole.log(sounds.get("cat"));`,
        hints: [".set(key, value) adds to Map", ".get(key) retrieves a value"],
      },
      {
        id: "js-es6-3",
        title: "Object.fromEntries",
        instruction: "Double every value in { a: 1, b: 2, c: 3 } using Object.entries, .map(), and Object.fromEntries.",
        startingCode: `const obj = { a: 1, b: 2, c: 3 };\nconst doubled = // Object.fromEntries + map\nconsole.log(doubled);`,
        expectedOutput: `const obj = { a: 1, b: 2, c: 3 };\nconst doubled = Object.fromEntries(\n    Object.entries(obj).map(([k, v]) => [k, v * 2])\n);\nconsole.log(doubled);`,
        hints: [
          "Object.entries() gives [[key, value], ...]",
          ".map(([k, v]) => [k, v * 2]) transforms each pair",
          "Object.fromEntries() converts back to an object",
        ],
      },
    ],
  },

  // ─── Lesson 13: Classes & OOP ────────────────────────────────────────────
  {
    slug: "classes-and-oop",
    title: "Classes & Object-Oriented Programming",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
    content: `Classes are a way to create blueprints for objects. Instead of manually creating every user object, you define a User class once and create as many user instances as you need — each with the same structure but different data.

## What is a Class?

Think of a class like a cookie cutter and objects like cookies. The cutter defines the shape — the cookies are the actual things you make.

\`\`\`js
class Dog {
    constructor(name, breed) {
        this.name = name;
        this.breed = breed;
    }

    bark() {
        return \`\${this.name} says: Woof!\`;
    }
}

const rex = new Dog("Rex", "German Shepherd");
console.log(rex.bark()); // "Rex says: Woof!"
\`\`\`

## The constructor

The \`constructor\` method runs automatically when you create a new instance with \`new\`. It sets up the initial state using \`this\` — which refers to the new object being created.

## Methods

Functions defined inside a class are called methods. They're shared across all instances (not duplicated).

## Private Fields (#)

Prefix with \`#\` to make a property truly private — only accessible inside the class:

\`\`\`js
class BankAccount {
    #balance = 0;  // private!

    deposit(amount) { this.#balance += amount; }
    get balance() { return this.#balance; }
}

const acc = new BankAccount();
acc.deposit(100);
console.log(acc.balance);   // 100
console.log(acc.#balance);  // SyntaxError — private!
\`\`\`

## Getters & Setters

Computed properties that look like regular property access:

\`\`\`js
class Circle {
    constructor(radius) { this.radius = radius; }

    get area() { return Math.PI * this.radius ** 2; }
    get circumference() { return 2 * Math.PI * this.radius; }
    set diameter(d) { this.radius = d / 2; }
}

const c = new Circle(5);
console.log(c.area);  // 78.54... (no parentheses needed!)
c.diameter = 20;      // sets radius to 10
\`\`\`

## Static Methods & Properties

Belong to the class itself, not to instances. Called as \`ClassName.method()\`:

\`\`\`js
class MathUtils {
    static add(a, b) { return a + b; }
    static PI = 3.14159;
}

MathUtils.add(2, 3); // 5 — no 'new' needed
\`\`\`

## Inheritance (extends)

A subclass inherits all properties and methods from its parent:

\`\`\`js
class Animal {
    constructor(name) { this.name = name; }
    speak() { return \`\${this.name} makes a sound.\`; }
}

class Cat extends Animal {
    speak() {  // override parent method
        return \`\${this.name} meows.\`;
    }
    purr() { return "Purrrr..."; }
}

const cat = new Cat("Whiskers");
cat.speak(); // "Whiskers meows."
cat.purr();  // "Purrrr..."
\`\`\`

## super

Call the parent class's constructor or methods:

\`\`\`js
class Employee extends Person {
    constructor(name, role) {
        super(name);  // must call before using this
        this.role = role;
    }

    introduce() {
        return super.introduce() + \` I work as \${this.role}.\`;
    }
}
\`\`\`

## instanceof

Check if an object was created by a class:
\`\`\`js
cat instanceof Cat;    // true
cat instanceof Animal; // true (inheritance chain)
\`\`\``,
    keyTakeaways: [
      "Classes are blueprints — new ClassName() creates instances",
      "constructor() sets initial state; this refers to the instance",
      "Private fields (#name) are only accessible inside the class",
      "extends creates subclasses; super calls the parent",
      "Static methods belong to the class, not to instances",
    ],
    codeExamples: [
      {
        title: "Classes in Practice",
        language: "javascript",
        description: "Building a real User and BankAccount class with inheritance.",
        code: `// Base class
class User {
  #password;

  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.#password = this.#hash(password);
    this.createdAt = new Date();
    this.isActive = true;
  }

  #hash(pw) { return btoa(pw); } // simple encode (not real hashing!)

  get displayName() {
    return \`\${this.name} <\${this.email}>\`;
  }

  checkPassword(pw) {
    return this.#hash(pw) === this.#password;
  }

  toString() {
    return \`User(\${this.name})\`;
  }

  static create(name, email, pw) {
    return new User(name, email, pw);
  }
}

// Subclass
class AdminUser extends User {
  #permissions;

  constructor(name, email, pw, permissions = []) {
    super(name, email, pw);
    this.#permissions = new Set(permissions);
  }

  can(action) { return this.#permissions.has(action); }

  grant(action) { this.#permissions.add(action); }

  get displayName() {
    return "[ADMIN] " + super.displayName;
  }
}

// Usage
const alice = User.create("Alice", "alice@example.com", "secret123");
console.log(alice.displayName);            // "Alice <alice@example.com>"
console.log(alice.checkPassword("secret123")); // true
console.log(alice.checkPassword("wrong"));     // false

const admin = new AdminUser("Bob", "bob@example.com", "pw", ["delete", "ban"]);
console.log(admin.can("delete")); // true
console.log(admin.can("nuke"));   // false
admin.grant("nuke");
console.log(admin.can("nuke"));   // true
console.log(admin.displayName);   // "[ADMIN] Bob <bob@example.com>"
console.log(admin instanceof User); // true`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-cls-1",
        title: "Create a Basic Class",
        instruction: "Create a Car class with a constructor that sets make and model, and a describe() method that returns 'make model'.",
        startingCode: `class Car {\n    constructor(make, model) {\n        // set properties\n    }\n\n    describe() {\n        // return "make model"\n    }\n}`,
        expectedOutput: `class Car {\n    constructor(make, model) {\n        this.make = make;\n        this.model = model;\n    }\n\n    describe() {\n        return \`\${this.make} \${this.model}\`;\n    }\n}`,
        hints: ["Use this.make = make inside the constructor", "Template literal: \`${this.make} ${this.model}\`"],
      },
      {
        id: "js-cls-2",
        title: "Getter",
        instruction: "Add a getter 'fullName' to Person that returns firstName + ' ' + lastName.",
        startingCode: `class Person {\n    constructor(firstName, lastName) {\n        this.firstName = firstName;\n        this.lastName = lastName;\n    }\n\n    // add getter here\n}`,
        expectedOutput: `class Person {\n    constructor(firstName, lastName) {\n        this.firstName = firstName;\n        this.lastName = lastName;\n    }\n\n    get fullName() {\n        return \`\${this.firstName} \${this.lastName}\`;\n    }\n}`,
        hints: ["Use 'get' keyword before the method name", "Access it like a property: person.fullName (no parentheses)"],
      },
      {
        id: "js-cls-3",
        title: "Extend a Class",
        instruction: "Create an ElectricCar class that extends Car and adds a batteryRange property.",
        startingCode: `class Car {\n    constructor(make, model) {\n        this.make = make;\n        this.model = model;\n    }\n}\n\nclass ElectricCar extends Car {\n    constructor(make, model, batteryRange) {\n        // call super, then set batteryRange\n    }\n}`,
        expectedOutput: `class Car {\n    constructor(make, model) {\n        this.make = make;\n        this.model = model;\n    }\n}\n\nclass ElectricCar extends Car {\n    constructor(make, model, batteryRange) {\n        super(make, model);\n        this.batteryRange = batteryRange;\n    }\n}`,
        hints: ["super(make, model) calls Car's constructor", "Must call super() before using this"],
      },
      {
        id: "js-cls-4",
        title: "Static Method",
        instruction: "Add a static method 'compare' to Car that takes two cars and returns the one with the earlier make (alphabetically).",
        startingCode: `class Car {\n    constructor(make, model) {\n        this.make = make;\n        this.model = model;\n    }\n\n    static compare(carA, carB) {\n        // return the one whose make comes first alphabetically\n    }\n}`,
        expectedOutput: `class Car {\n    constructor(make, model) {\n        this.make = make;\n        this.model = model;\n    }\n\n    static compare(carA, carB) {\n        return carA.make < carB.make ? carA : carB;\n    }\n}`,
        hints: ["Static methods use the 'static' keyword", "String comparison: 'apple' < 'banana' is true"],
      },
    ],
  },

  // ─── Lesson 14: Error Handling ───────────────────────────────────────────
  {
    slug: "error-handling",
    title: "Error Handling",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#exception_handling_statements",
    content: `Errors happen. A network request fails, a user passes wrong data, a server returns 500. How you handle errors determines whether your app crashes or gracefully recovers. JavaScript has solid tools for this.

## try / catch / finally

The fundamental error handling block:

\`\`\`js
try {
    const data = JSON.parse(userInput); // might throw
    processData(data);
} catch (error) {
    console.error("Parsing failed:", error.message);
} finally {
    hideLoadingSpinner(); // runs no matter what
}
\`\`\`

- **try** — code that might fail
- **catch** — runs only if something throws
- **finally** — always runs (use for cleanup)

## The Error Object

\`\`\`js
try {
    null.property; // TypeError
} catch (e) {
    console.log(e.name);    // "TypeError"
    console.log(e.message); // "Cannot read properties of null"
    console.log(e.stack);   // full stack trace
}
\`\`\`

Built-in error types: \`Error\`, \`TypeError\`, \`RangeError\`, \`ReferenceError\`, \`SyntaxError\`, \`URIError\`

## Throwing Errors

You can throw anything, but throw an Error object so you get a stack trace:

\`\`\`js
function divide(a, b) {
    if (b === 0) throw new Error("Division by zero");
    if (typeof a !== "number") throw new TypeError("a must be a number");
    return a / b;
}
\`\`\`

## Custom Error Classes

Extend Error to create domain-specific error types:

\`\`\`js
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "NetworkError";
        this.statusCode = statusCode;
    }
}

// Handle different error types
try {
    validateUser(data);
} catch (e) {
    if (e instanceof ValidationError) {
        showFieldError(e.field, e.message);
    } else if (e instanceof NetworkError) {
        showNetworkAlert(e.statusCode);
    } else {
        throw e; // re-throw unknown errors
    }
}
\`\`\`

## Async Error Handling

Always wrap async code in try/catch:

\`\`\`js
async function fetchUser(id) {
    try {
        const res = await fetch(\`/api/users/\${id}\`);
        if (!res.ok) throw new NetworkError("Request failed", res.status);
        return await res.json();
    } catch (e) {
        if (e instanceof NetworkError) {
            console.error(\`HTTP \${e.statusCode}: \${e.message}\`);
        } else {
            console.error("Unexpected error:", e);
        }
        return null;
    }
}
\`\`\`

## Safe Patterns

**Safe JSON parse:**
\`\`\`js
function safeJsonParse(str, fallback = null) {
    try { return JSON.parse(str); }
    catch { return fallback; }
}
\`\`\`

**Result pattern** (inspired by Rust):
\`\`\`js
async function tryFetch(url) {
    try {
        const data = await fetch(url).then(r => r.json());
        return { ok: true, data };
    } catch (error) {
        return { ok: false, error };
    }
}

const { ok, data, error } = await tryFetch("/api/items");
if (ok) renderItems(data);
else showError(error.message);
\`\`\``,
    keyTakeaways: [
      "try/catch prevents unhandled errors from crashing your app",
      "finally always runs — perfect for cleanup (close connections, hide spinners)",
      "Throw Error objects, not strings, to get proper stack traces",
      "Custom error classes (extends Error) make error handling precise",
      "Always check response.ok after fetch — HTTP errors don't throw automatically",
    ],
    codeExamples: [
      {
        title: "Error Handling Patterns",
        language: "javascript",
        description: "Custom errors, safe parsing, and the result pattern.",
        code: `// Custom error types
class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "AppError";
    this.code = code;
  }
}

class ValidationError extends AppError {
  constructor(message, field) {
    super(message, "VALIDATION_ERROR");
    this.name = "ValidationError";
    this.field = field;
  }
}

// Validation function that throws
function validateAge(age) {
  if (typeof age !== "number") throw new ValidationError("Age must be a number", "age");
  if (age < 0 || age > 150) throw new ValidationError("Age must be 0-150", "age");
  return true;
}

// Handling multiple error types
function processUserInput(input) {
  try {
    validateAge(input.age);
    console.log("Age is valid:", input.age);
  } catch (e) {
    if (e instanceof ValidationError) {
      console.error(\`Validation failed on '\${e.field}': \${e.message}\`);
    } else {
      throw e; // re-throw unexpected errors
    }
  }
}

processUserInput({ age: 28 });        // valid
processUserInput({ age: -5 });        // ValidationError
processUserInput({ age: "old" });     // ValidationError

// Safe utilities
const safeJsonParse = (str, fallback = null) => {
  try { return JSON.parse(str); }
  catch { return fallback; }
};

console.log(safeJsonParse('{"a":1}')); // { a: 1 }
console.log(safeJsonParse("broken"));  // null (fallback)

// Result pattern
async function tryFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new AppError(\`HTTP \${res.status}\`, "HTTP_ERROR");
    return { ok: true, data: await res.json() };
  } catch (error) {
    return { ok: false, error };
  }
}`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-err-1",
        title: "Basic Try/Catch",
        instruction: "Wrap JSON.parse(input) in a try/catch. If it fails, log 'Invalid JSON' to the console.",
        startingCode: `const input = "not valid json";\n// try/catch here`,
        expectedOutput: `const input = "not valid json";\ntry {\n    JSON.parse(input);\n} catch (e) {\n    console.log("Invalid JSON");\n}`,
        hints: ["JSON.parse throws SyntaxError on invalid input", "catch (e) receives the error object"],
      },
      {
        id: "js-err-2",
        title: "Throw a Custom Error",
        instruction: "Write a function 'requirePositive' that throws an Error with message 'Must be positive' if the number is <= 0.",
        startingCode: `function requirePositive(n) {\n    // throw if n <= 0\n}`,
        expectedOutput: `function requirePositive(n) {\n    if (n <= 0) throw new Error("Must be positive");\n}`,
        hints: ["throw new Error('message') creates and throws an error"],
      },
      {
        id: "js-err-3",
        title: "Finally for Cleanup",
        instruction: "Add a finally block that logs 'Cleanup done' regardless of success or failure.",
        startingCode: `try {\n    riskyOperation();\n} catch (e) {\n    console.log("Error:", e.message);\n}\n// add finally`,
        expectedOutput: `try {\n    riskyOperation();\n} catch (e) {\n    console.log("Error:", e.message);\n} finally {\n    console.log("Cleanup done");\n}`,
        hints: ["finally {} comes after catch {}", "It always runs, success or failure"],
      },
      {
        id: "js-err-4",
        title: "Safe JSON Parse",
        instruction: "Write a safeJsonParse function that returns parsed data on success, or null on failure.",
        startingCode: `function safeJsonParse(str) {\n    // try to parse, return null on error\n}`,
        expectedOutput: `function safeJsonParse(str) {\n    try {\n        return JSON.parse(str);\n    } catch {\n        return null;\n    }\n}`,
        hints: ["Return inside try for success", "Return null inside catch for failure", "catch {} without (e) is valid when you don't need the error"],
      },
    ],
  },

  // ─── Lesson 15: Working with APIs ───────────────────────────────────────
  {
    slug: "working-with-apis",
    title: "Working with APIs",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
    content: `APIs (Application Programming Interfaces) are how your frontend JavaScript talks to servers. You send a request, they send back data (usually JSON). This is how weather apps get forecasts, social apps load posts, and login forms work.

## What is an API?

An API is a set of URLs (endpoints) that accept requests and return data. Example:

- \`GET /api/users\` — get all users
- \`GET /api/users/1\` — get user with id 1
- \`POST /api/users\` — create a new user
- \`PUT /api/users/1\` — update user 1
- \`DELETE /api/users/1\` — delete user 1

This pattern is called **REST**. The data format is almost always **JSON**.

## The Fetch API

\`fetch()\` is the built-in browser tool for making HTTP requests:

\`\`\`js
// GET request — simplest case
const response = await fetch("https://api.example.com/users");
const users = await response.json();
console.log(users);
\`\`\`

Always check \`response.ok\` — fetch doesn't throw on HTTP errors (404, 500):

\`\`\`js
if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
}
\`\`\`

## POST Request (Send Data)

\`\`\`js
const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Alice", email: "alice@example.com" }),
});
const newUser = await response.json();
\`\`\`

## PUT / PATCH / DELETE

\`\`\`js
// Update
await fetch(\`/api/users/\${id}\`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
});

// Delete
await fetch(\`/api/users/\${id}\`, { method: "DELETE" });
\`\`\`

## Authentication

Most APIs require a token:

\`\`\`js
const response = await fetch("/api/protected", {
    headers: {
        "Authorization": \`Bearer \${localStorage.getItem("token")}\`,
        "Content-Type": "application/json",
    },
});
\`\`\`

## URL Parameters & Query Strings

\`\`\`js
// Path params
fetch(\`/api/users/\${userId}/posts\`);

// Query string (search, filter, pagination)
const params = new URLSearchParams({ page: 1, limit: 10, search: "alice" });
fetch(\`/api/users?\${params}\`); // /api/users?page=1&limit=10&search=alice
\`\`\`

## Reusable API Client

Build a wrapper instead of repeating fetch boilerplate:

\`\`\`js
class ApiClient {
    constructor(baseUrl, token = null) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    async request(endpoint, options = {}) {
        const headers = { "Content-Type": "application/json" };
        if (this.token) headers["Authorization"] = \`Bearer \${this.token}\`;

        const res = await fetch(this.baseUrl + endpoint, { ...options, headers });
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.status === 204 ? null : res.json();
    }

    get(url) { return this.request(url); }
    post(url, data) { return this.request(url, { method: "POST", body: JSON.stringify(data) }); }
    put(url, data) { return this.request(url, { method: "PUT", body: JSON.stringify(data) }); }
    delete(url) { return this.request(url, { method: "DELETE" }); }
}

const api = new ApiClient("https://jsonplaceholder.typicode.com");
const users = await api.get("/users");
\`\`\``,
    keyTakeaways: [
      "fetch() doesn't throw on HTTP errors — always check response.ok",
      "POST/PUT needs method, Content-Type header, and JSON.stringify body",
      "URLSearchParams builds query strings cleanly",
      "Bearer token goes in the Authorization header",
      "A reusable API client prevents repeating fetch boilerplate",
    ],
    codeExamples: [
      {
        title: "CRUD with the Fetch API",
        language: "javascript",
        description: "Real GET, POST, PUT, DELETE requests against a test API.",
        code: `const BASE = "https://jsonplaceholder.typicode.com";

// GET — fetch a list
async function getUsers() {
  const res = await fetch(\`\${BASE}/users\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  const users = await res.json();
  console.log(\`Fetched \${users.length} users\`);
  console.log(users[0].name, users[0].email);
  return users;
}

// GET with query params
async function searchPosts(userId) {
  const params = new URLSearchParams({ userId, _limit: 3 });
  const res = await fetch(\`\${BASE}/posts?\${params}\`);
  const posts = await res.json();
  posts.forEach(p => console.log(\`- \${p.title}\`));
}

// POST — create
async function createPost(title, body, userId) {
  const res = await fetch(\`\${BASE}/posts\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userId }),
  });
  const created = await res.json();
  console.log("Created post id:", created.id);
  return created;
}

// PUT — full update
async function updatePost(id, data) {
  const res = await fetch(\`\${BASE}/posts/\${id}\`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// DELETE
async function deletePost(id) {
  const res = await fetch(\`\${BASE}/posts/\${id}\`, { method: "DELETE" });
  console.log("Deleted:", res.ok);
}

// Run all
(async () => {
  await getUsers();
  await searchPosts(1);
  const post = await createPost("Hello API", "Learning fetch!", 1);
  await updatePost(1, { ...post, title: "Updated Title" });
  await deletePost(1);
})();`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-api-1",
        title: "Basic GET Request",
        instruction: "Write an async function that fetches '/api/data', checks response.ok, and returns the JSON.",
        startingCode: `async function getData() {\n    // fetch, check ok, return json\n}`,
        expectedOutput: `async function getData() {\n    const res = await fetch("/api/data");\n    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);\n    return res.json();\n}`,
        hints: [
          "Always check response.ok after fetch",
          "res.json() returns a Promise — you can return it directly",
        ],
      },
      {
        id: "js-api-2",
        title: "POST Request",
        instruction: "Write a fetch POST to '/api/users' sending { name: 'Alice' } as JSON.",
        startingCode: `async function createUser(name) {\n    const res = await fetch("/api/users", {\n        // method, headers, body\n    });\n    return res.json();\n}`,
        expectedOutput: `async function createUser(name) {\n    const res = await fetch("/api/users", {\n        method: "POST",\n        headers: { "Content-Type": "application/json" },\n        body: JSON.stringify({ name }),\n    });\n    return res.json();\n}`,
        hints: [
          "method: 'POST'",
          "headers: { 'Content-Type': 'application/json' }",
          "body: JSON.stringify(data)",
        ],
      },
      {
        id: "js-api-3",
        title: "Query Parameters",
        instruction: "Use URLSearchParams to build a query string with page=2 and limit=10, then fetch '/api/posts' with it.",
        startingCode: `async function getPosts() {\n    const params = // URLSearchParams\n    const res = await fetch(\`/api/posts?\${params}\`);\n    return res.json();\n}`,
        expectedOutput: `async function getPosts() {\n    const params = new URLSearchParams({ page: 2, limit: 10 });\n    const res = await fetch(\`/api/posts?\${params}\`);\n    return res.json();\n}`,
        hints: ["new URLSearchParams({ key: value }) builds query strings", "Embed in template literal: `/api/posts?${params}`"],
      },
    ],
  },

  // ─── Lesson 16: Modules & Import/Export ─────────────────────────────────
  {
    slug: "modules",
    title: "Modules & Import/Export",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
    content: `As your codebase grows, keeping all JavaScript in one file becomes a nightmare. Modules let you split code across files, import only what you need, and keep things organized. Every modern framework (React, Vue, Node.js) uses modules.

## What are Modules?

Each file is a module. By default, nothing in a module is visible to other files. You explicitly choose what to share using \`export\`, and what to use from other files using \`import\`.

## Named Exports

Export multiple things from one file:

\`\`\`js
// utils.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }
\`\`\`

Import what you need by name:

\`\`\`js
// main.js
import { add, PI } from "./utils.js";
console.log(add(2, 3)); // 5
console.log(PI);        // 3.14159
\`\`\`

Rename on import:
\`\`\`js
import { add as sum } from "./utils.js";
\`\`\`

Import everything as a namespace:
\`\`\`js
import * as utils from "./utils.js";
utils.add(2, 3);
\`\`\`

## Default Export

One main thing per file. No curly braces when importing:

\`\`\`js
// Button.js
export default function Button({ text, onClick }) {
    return \`<button onclick="\${onClick}">\${text}</button>\`;
}

// App.js
import Button from "./Button.js"; // name it whatever you want
\`\`\`

A file can have both default and named exports.

## Re-exporting

Bundle multiple exports in an index file:

\`\`\`js
// components/index.js
export { default as Button } from "./Button.js";
export { default as Modal } from "./Modal.js";
export { default as Input } from "./Input.js";

// Elsewhere
import { Button, Modal } from "./components";
\`\`\`

## Dynamic Imports

Load a module only when needed (lazy loading):

\`\`\`js
// Only load heavy chart library when user opens the chart view
async function showChart() {
    const { Chart } = await import("./Chart.js");
    new Chart(data);
}
\`\`\`

This is how code-splitting works in React and other frameworks.

## In HTML

Use \`type="module"\` on script tags:

\`\`\`html
<script type="module" src="app.js"></script>
\`\`\`

Module scripts are automatically deferred (don't block HTML parsing) and run in strict mode.

## Organizing a Project

\`\`\`
src/
├── utils/
│   ├── math.js       export math utilities
│   ├── string.js     export string utilities
│   └── index.js      re-export all utils
├── api/
│   ├── users.js      user API functions
│   └── posts.js      post API functions
├── components/
│   └── Button.js     UI components
└── main.js           entry point
\`\`\``,
    keyTakeaways: [
      "Named exports use {} on import; default exports don't",
      "A file can have one default export and many named exports",
      "Re-export from index.js files for clean import paths",
      "Dynamic import() lazy-loads modules — essential for performance",
      "Use type='module' on script tags to enable ES modules in the browser",
    ],
    codeExamples: [
      {
        title: "Named & Default Exports",
        language: "javascript",
        description: "Real module patterns you'll see in every codebase.",
        code: `// ─── math.js ───────────────────────────────────
export const PI = 3.14159265;

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ─── api.js ──────────────────────────────────────
const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUser(id) {
  const res = await fetch(\`\${BASE_URL}/users/\${id}\`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}

export async function getPosts(userId) {
  const res = await fetch(\`\${BASE_URL}/posts?userId=\${userId}\`);
  return res.json();
}

// Default export for main class/function
export default class ApiClient {
  constructor(baseUrl) { this.baseUrl = baseUrl; }
  async get(path) {
    return fetch(this.baseUrl + path).then(r => r.json());
  }
}

// ─── main.js ─────────────────────────────────────
// Named imports
import { clamp, randomInt, PI } from "./math.js";

// Default import (any name works)
import ApiClient from "./api.js";

// Named from default-exporting module
import { getUser, getPosts } from "./api.js";

// Namespace import
import * as math from "./math.js";

console.log(clamp(150, 0, 100)); // 100
console.log(randomInt(1, 6));    // random 1-6
console.log(math.PI);            // 3.14159265

const client = new ApiClient("https://jsonplaceholder.typicode.com");
client.get("/users/1").then(u => console.log(u.name));`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-mod-1",
        title: "Named Export",
        instruction: "Export a function 'double' that returns n * 2, and a const MAX = 100.",
        startingCode: `// Write your exports`,
        expectedOutput: `export function double(n) {\n    return n * 2;\n}\nexport const MAX = 100;`,
        hints: ["Put 'export' keyword before function or const", "Both can be in the same file"],
      },
      {
        id: "js-mod-2",
        title: "Named Import",
        instruction: "Import 'double' and 'MAX' from './utils.js'.",
        startingCode: `// Import double and MAX from utils.js`,
        expectedOutput: `import { double, MAX } from "./utils.js";`,
        hints: ["Named imports use curly braces {}", "File path starts with './'"],
      },
      {
        id: "js-mod-3",
        title: "Default Export",
        instruction: "Write a default export of a class 'Logger' with a log(msg) method that console.logs the message.",
        startingCode: `// Default export Logger class`,
        expectedOutput: `export default class Logger {\n    log(msg) {\n        console.log(msg);\n    }\n}`,
        hints: ["'export default' before the class keyword", "Default exports have no curly braces when importing"],
      },
      {
        id: "js-mod-4",
        title: "Dynamic Import",
        instruction: "Write an async function 'loadChart' that dynamically imports './Chart.js' and calls its default export.",
        startingCode: `async function loadChart(data) {\n    // dynamic import\n}`,
        expectedOutput: `async function loadChart(data) {\n    const { default: Chart } = await import("./Chart.js");\n    new Chart(data);\n}`,
        hints: [
          "Dynamic import: const module = await import('./file.js')",
          "Default export is at module.default",
        ],
      },
    ],
  },

  // ─── Lesson 17: Regular Expressions ─────────────────────────────────────
  {
    slug: "regular-expressions",
    title: "Regular Expressions",
    difficulty: "advanced",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
    content: `Regular expressions (regex) are patterns for matching text. They look intimidating at first, but once they click, they become one of the most powerful tools in your kit. You use them for validation, searching, and text transformation.

## Creating a Regex

Two ways to create a regex:
\`\`\`js
const re1 = /hello/;          // literal syntax (preferred)
const re2 = new RegExp("hello"); // constructor (for dynamic patterns)
\`\`\`

## Testing a Pattern

\`\`\`js
/hello/.test("hello world");  // true
/hello/.test("goodbye");      // false
\`\`\`

## Flags

Add flags after the closing slash:
- \`i\` — case-insensitive: \`/hello/i\` matches "Hello", "HELLO"
- \`g\` — global: find ALL matches, not just the first
- \`m\` — multiline: \`^\` and \`$\` match line boundaries
- \`s\` — dotAll: \`.\` matches newlines too

\`\`\`js
/javascript/i.test("I love JavaScript"); // true
\`\`\`

## Character Classes

| Pattern | Matches |
|---|---|
| \`.\` | Any character except newline |
| \`\\d\` | Digit (0-9) |
| \`\\D\` | Non-digit |
| \`\\w\` | Word character (a-z, A-Z, 0-9, _) |
| \`\\W\` | Non-word character |
| \`\\s\` | Whitespace (space, tab, newline) |
| \`\\S\` | Non-whitespace |
| \`[abc]\` | One of: a, b, or c |
| \`[^abc]\` | NOT a, b, or c |
| \`[a-z]\` | Range: lowercase a to z |

## Quantifiers

| Pattern | Meaning |
|---|---|
| \`?\` | 0 or 1 (optional) |
| \`*\` | 0 or more |
| \`+\` | 1 or more |
| \`{3}\` | Exactly 3 |
| \`{2,5}\` | Between 2 and 5 |
| \`{3,}\` | 3 or more |

## Anchors

- \`^\` — start of string (or line with \`m\` flag)
- \`\$\` — end of string
- \`\\b\` — word boundary

\`\`\`js
/^Hello/.test("Hello World"); // true
/^Hello/.test("Say Hello");   // false — doesn't start with Hello
\`\`\`

## Groups & Capturing

- \`(abc)\` — capturing group: matches and captures "abc"
- \`(?:abc)\` — non-capturing group: matches but doesn't capture
- \`(a|b)\` — alternation: "a" or "b"

## String Methods with Regex

\`\`\`js
const str = "Hello World 2026";

// search — returns index or -1
str.search(/\\d+/);              // 12

// match — returns array of matches
str.match(/\\w+/g);              // ["Hello", "World", "2026"]

// matchAll — iterator of all matches with groups
[...str.matchAll(/(\\w+)/g)];

// replace — replace matches
str.replace(/World/, "JavaScript"); // "Hello JavaScript 2026"
str.replace(/\\d+/, "2027");         // "Hello World 2027"

// replaceAll with regex
"aabbcc".replace(/[bc]/g, "x");    // "aaxxxx"

// split with regex
"one1two2three".split(/\\d/);       // ["one", "two", "three"]
\`\`\`

## Common Patterns

\`\`\`js
// Email validation (simplified)
const emailRe = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

// Phone number (US style)
const phoneRe = /^\\+?1?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$/;

// URL
const urlRe = /^https?:\\/\\/.+/i;

// Strong password (8+ chars, uppercase, lowercase, digit)
const pwRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/;

// Extract all numbers from string
"Order 42 ships in 3 days".match(/\\d+/g); // ["42", "3"]

// Slugify a title
"Hello World! CSS is Great".toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")  // "hello-world-css-is-great"
  .replace(/^-|-$/g, "");       // trim leading/trailing dashes
\`\`\``,
    keyTakeaways: [
      "Test a pattern with /regex/.test(string) — returns true/false",
      "Flags: i (case-insensitive), g (global/all matches), m (multiline)",
      "\\d = digit, \\w = word char, \\s = whitespace, . = any char",
      "Quantifiers: + (1+), * (0+), ? (optional), {n} (exactly n)",
      "^ anchors to start, $ to end — essential for full-string validation",
    ],
    codeExamples: [
      {
        title: "Regex for Validation & Transformation",
        language: "javascript",
        description: "Email validation, extracting data, and text transformation.",
        code: `// ── Validation ──────────────────────────────────
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

console.log(validateEmail("alice@example.com")); // true
console.log(validateEmail("not-an-email"));       // false
console.log(validateEmail("@example.com"));       // false

function validatePassword(pw) {
  // 8+ chars, at least one uppercase, one lowercase, one digit
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw);
}

console.log(validatePassword("Secure1!"));   // true
console.log(validatePassword("weakpass"));   // false
console.log(validatePassword("NoDigit!"));   // false

// ── Extracting Data ───────────────────────────
const log = "2026-07-29 ERROR: Connection timeout after 30s (attempt 3/5)";

const date    = log.match(/\d{4}-\d{2}-\d{2}/)?.[0];  // "2026-07-29"
const numbers = log.match(/\d+/g);  // ["2026","07","29","30","3","5"]
const level   = log.match(/\b(ERROR|WARN|INFO|DEBUG)\b/)?.[0]; // "ERROR"

console.log(date, level, numbers);

// ── Text Transformation ───────────────────────
// Slugify a title
function slugify(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")  // remove special chars
    .replace(/\s+/g, "-")           // spaces to hyphens
    .replace(/^-+|-+$/g, "");       // trim leading/trailing hyphens
}

console.log(slugify("Hello, World! This is CSS."));
// "hello-world-this-is-css"

// Highlight search terms
function highlight(text, term) {
  const re = new RegExp(\`(\${term})\`, "gi");
  return text.replace(re, "<mark>$1</mark>");
}

console.log(highlight("I love JavaScript and JavaScript loves me", "javascript"));
// "I love <mark>JavaScript</mark> and <mark>JavaScript</mark> loves me"

// Extract key=value pairs
const config = "name=Alice age=28 city=Paris";
const pairs = {};
for (const [, key, val] of config.matchAll(/(\w+)=(\w+)/g)) {
  pairs[key] = val;
}
console.log(pairs); // { name: "Alice", age: "28", city: "Paris" }`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-re-1",
        title: "Test an Email",
        instruction: "Write a regex that returns true if a string looks like an email (contains @ and a dot after it).",
        startingCode: `function isEmail(str) {\n    return // regex test\n}\nconsole.log(isEmail("user@example.com")); // true\nconsole.log(isEmail("notanemail"));        // false`,
        expectedOutput: `function isEmail(str) {\n    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(str);\n}\nconsole.log(isEmail("user@example.com"));\nconsole.log(isEmail("notanemail"));`,
        hints: [
          "/pattern/.test(string) returns true/false",
          "^ means start, $ means end — anchors the full match",
          "[^\\s@]+ means one or more characters that are not whitespace or @",
        ],
      },
      {
        id: "js-re-2",
        title: "Extract All Numbers",
        instruction: "Use .match() with a global regex to extract all numbers from the string '3 cats and 12 dogs and 1 bird'.",
        startingCode: `const str = "3 cats and 12 dogs and 1 bird";\nconst nums = // regex match\nconsole.log(nums); // ["3", "12", "1"]`,
        expectedOutput: `const str = "3 cats and 12 dogs and 1 bird";\nconst nums = str.match(/\\d+/g);\nconsole.log(nums);`,
        hints: ["\\d+ matches one or more digits", "The g flag finds ALL matches"],
      },
      {
        id: "js-re-3",
        title: "Replace Spaces with Hyphens",
        instruction: "Use .replace() with a global regex to replace all spaces in 'hello world foo' with hyphens.",
        startingCode: `const str = "hello world foo";\nconst result = str.replace(/* regex */, "-");\nconsole.log(result); // "hello-world-foo"`,
        expectedOutput: `const str = "hello world foo";\nconst result = str.replace(/\\s+/g, "-");\nconsole.log(result);`,
        hints: ["\\s+ matches one or more whitespace characters", "The g flag replaces ALL occurrences"],
      },
      {
        id: "js-re-4",
        title: "Case-Insensitive Test",
        instruction: "Test if the string 'I Love JAVASCRIPT' contains 'javascript' using a case-insensitive flag.",
        startingCode: `const str = "I Love JAVASCRIPT";\nconsole.log(/* regex with i flag */);`,
        expectedOutput: `const str = "I Love JAVASCRIPT";\nconsole.log(/javascript/i.test(str));`,
        hints: ["Add i after the closing slash: /pattern/i", "The i flag makes matching case-insensitive"],
      },
    ],
  },

  // ─── Lesson 18: Browser Storage & Web APIs ───────────────────────────────
  {
    slug: "browser-storage-and-apis",
    title: "Browser Storage & Web APIs",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API",
    content: `The browser gives JavaScript access to powerful built-in APIs beyond the DOM — persistent storage, clipboard, geolocation, notifications, performance, and more. Knowing these lets you build real features without a backend.

## localStorage & sessionStorage

Store data as key-value strings in the browser:

| Feature | localStorage | sessionStorage |
|---|---|---|
| Persists after close? | ✅ Yes | ❌ No |
| Shared across tabs? | ✅ Yes | ❌ No |
| Size limit | ~5-10MB | ~5MB |

\`\`\`js
// Store
localStorage.setItem("theme", "dark");
localStorage.setItem("user", JSON.stringify({ name: "Alice" }));

// Read
const theme = localStorage.getItem("theme"); // "dark"
const user = JSON.parse(localStorage.getItem("user")); // { name: "Alice" }

// Remove
localStorage.removeItem("theme");
localStorage.clear(); // remove everything!

// Check existence
localStorage.getItem("missing"); // null (not undefined)
\`\`\`

Always \`JSON.stringify\` objects when storing, \`JSON.parse\` when reading.

## Safe localStorage Wrapper

\`\`\`js
const storage = {
    get: (key, fallback = null) => {
        try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
        catch { return fallback; }
    },
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    remove: (key) => localStorage.removeItem(key),
};
\`\`\`

## URL & History API

\`\`\`js
// Current URL info
const url = new URL(window.location.href);
url.hostname;     // "beecodefi.vercel.app"
url.pathname;     // "/tutorials/html"
url.searchParams.get("tab"); // query string value

// Navigate without reload (SPA routing)
history.pushState({ page: "about" }, "", "/about");
history.replaceState({}, "", "/new-path");
history.back();
history.forward();
\`\`\`

## Clipboard API

\`\`\`js
// Copy text to clipboard
await navigator.clipboard.writeText("Copied text!");

// Read from clipboard
const text = await navigator.clipboard.readText();
\`\`\`

## Geolocation API

\`\`\`js
navigator.geolocation.getCurrentPosition(
    (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        console.log(\`\${latitude}, \${longitude} (\${accuracy}m accurate)\`);
    },
    (error) => console.error("Denied:", error.message),
    { enableHighAccuracy: true, timeout: 5000 }
);
\`\`\`

## Intersection Observer

Detect when elements enter/leave the viewport — for lazy loading, animations, infinite scroll:

\`\`\`js
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // stop watching
        }
    });
}, { threshold: 0.1 }); // 10% visible triggers

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
\`\`\`

## setTimeout & setInterval

\`\`\`js
// Run once after delay
const id = setTimeout(() => console.log("After 2s"), 2000);
clearTimeout(id); // cancel it

// Run repeatedly
const tick = setInterval(() => console.log("Every second"), 1000);
clearInterval(tick); // stop it

// Modern: delay utility
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
await delay(1000); // clean async pause
\`\`\`

## Performance API

\`\`\`js
// Measure execution time
const start = performance.now();
// ... code to measure ...
const end = performance.now();
console.log(\`Took \${(end - start).toFixed(2)}ms\`);
\`\`\``,
    keyTakeaways: [
      "localStorage persists across sessions; sessionStorage clears on tab close",
      "Always JSON.stringify objects before storing, JSON.parse when reading",
      "Clipboard, Geolocation, and Notifications require user permission",
      "IntersectionObserver is the modern way to detect elements in the viewport",
      "clearTimeout/clearInterval are essential to prevent memory leaks",
    ],
    codeExamples: [
      {
        title: "localStorage & Web APIs",
        language: "html",
        description: "Theme persistence, clipboard, and IntersectionObserver animations.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 2rem; transition: background 0.3s, color 0.3s; }
  body.dark { background: #0f172a; color: #f1f5f9; }
  .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem;
          margin: 1rem 0; opacity: 0; transform: translateY(20px);
          transition: opacity 0.5s, transform 0.5s; }
  .card.visible { opacity: 1; transform: translateY(0); }
  button { padding: 0.5rem 1rem; cursor: pointer; background: #6366f1;
           color: white; border: none; border-radius: 6px; margin: 0.25rem; }
  #output { font-family: monospace; font-size: 0.875rem; color: #6366f1; }
</style>
</head>
<body>
  <h2>Browser Storage & APIs Demo</h2>

  <button onclick="toggleTheme()">Toggle Dark Mode</button>
  <button onclick="copyToClipboard()">Copy Text</button>
  <button onclick="saveData()">Save to localStorage</button>
  <button onclick="loadData()">Load from localStorage</button>

  <p id="output">Output will appear here...</p>

  <h3>Scroll to animate cards:</h3>
  <div id="cardList"></div>

  <script>
    // ── Theme persistence ──────────────────────────────
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") document.body.classList.add("dark");

    function toggleTheme() {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
      log("Theme saved: " + localStorage.getItem("theme"));
    }

    // ── localStorage ───────────────────────────────────
    function saveData() {
      const data = { user: "Alice", score: 42, ts: new Date().toISOString() };
      localStorage.setItem("gameData", JSON.stringify(data));
      log("Saved: " + JSON.stringify(data));
    }

    function loadData() {
      const raw = localStorage.getItem("gameData");
      if (!raw) { log("Nothing saved yet!"); return; }
      const data = JSON.parse(raw);
      log("Loaded: " + JSON.stringify(data));
    }

    // ── Clipboard ─────────────────────────────────────
    async function copyToClipboard() {
      await navigator.clipboard.writeText("Hello from BEECODEFI! 🐝");
      log("Copied to clipboard!");
    }

    function log(msg) {
      document.querySelector("#output").textContent = msg;
    }

    // ── IntersectionObserver ──────────────────────────
    const list = document.querySelector("#cardList");
    for (let i = 1; i <= 8; i++) {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = \`Card \${i} — scroll to animate\`;
      list.appendChild(card);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });

    document.querySelectorAll(".card").forEach(c => observer.observe(c));
  </script>
</body>
</html>`,
        livePreview: true,
      },
    ],
    interactiveExercises: [
      {
        id: "js-storage-1",
        title: "Save to localStorage",
        instruction: "Save the object { name: 'Alice', score: 100 } to localStorage under the key 'player'.",
        startingCode: `const player = { name: "Alice", score: 100 };\n// save to localStorage`,
        expectedOutput: `const player = { name: "Alice", score: 100 };\nlocalStorage.setItem("player", JSON.stringify(player));`,
        hints: [
          "localStorage only stores strings — use JSON.stringify for objects",
          "localStorage.setItem(key, value)",
        ],
      },
      {
        id: "js-storage-2",
        title: "Load from localStorage",
        instruction: "Read the 'player' key from localStorage and parse it back to an object.",
        startingCode: `const player = // load and parse\nconsole.log(player);`,
        expectedOutput: `const player = JSON.parse(localStorage.getItem("player"));\nconsole.log(player);`,
        hints: ["localStorage.getItem(key) returns a string", "JSON.parse converts it back to an object"],
      },
      {
        id: "js-storage-3",
        title: "setTimeout Promise",
        instruction: "Write a 'delay' function that returns a Promise resolving after ms milliseconds.",
        startingCode: `function delay(ms) {\n    // return a Promise\n}`,
        expectedOutput: `function delay(ms) {\n    return new Promise(resolve => setTimeout(resolve, ms));\n}`,
        hints: [
          "new Promise((resolve, reject) => ...)",
          "setTimeout calls resolve after ms milliseconds",
        ],
      },
      {
        id: "js-storage-4",
        title: "Performance Timing",
        instruction: "Use performance.now() to measure how long a for loop of 1,000,000 iterations takes.",
        startingCode: `const start = // start timer\nfor (let i = 0; i < 1_000_000; i++) {}\nconst end = // end timer\nconsole.log(\`Took \${(end - start).toFixed(2)}ms\`);`,
        expectedOutput: `const start = performance.now();\nfor (let i = 0; i < 1_000_000; i++) {}\nconst end = performance.now();\nconsole.log(\`Took \${(end - start).toFixed(2)}ms\`);`,
        hints: ["performance.now() returns high-resolution milliseconds", "Subtract start from end for elapsed time"],
      },
    ],
  },
];
