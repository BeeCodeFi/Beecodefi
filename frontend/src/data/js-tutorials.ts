import { TutorialLesson } from "@/types";

export const jsLessons: TutorialLesson[] = [
  // ──────────────────────────────────────────
  //  Lesson 1: Introduction to JavaScript
  // ──────────────────────────────────────────
  {
    slug: "introduction",
    title: "Introduction to JavaScript",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript",
    content: `JavaScript is the programming language of the web. It adds interactivity, handles user events, manipulates the DOM, and communicates with servers. Every modern website uses JavaScript.

## What is JavaScript?

JavaScript is a **dynamic, interpreted** programming language. Despite its name, it has no relation to Java. Created in 1995 by Brendan Eich, it has evolved into one of the most popular languages in the world.

JavaScript runs in the browser (client-side) and on servers (Node.js). It powers everything from simple form validation to complex single-page applications.

## Variables

Use \`const\` and \`let\` to declare variables:
- **const** — Cannot be reassigned (use by default)
- **let** — Can be reassigned (when you need to change the value)
- **var** — Old-style, function-scoped (avoid in modern code)

## Data Types

JavaScript has 8 data types:
- **Primitives**: String, Number, Boolean, null, undefined, BigInt, Symbol
- **Reference**: Object (includes Arrays, Functions, Dates, etc.)

## Type Checking

Use \`typeof\` to check a value's type: \`typeof "hello"\` returns \`"string"\`. Watch out: \`typeof null\` returns \`"object"\` (a famous JavaScript bug).

## Operators

JavaScript provides arithmetic (\`+\`, \`-\`, \`*\`, \`/\`, \`%\`), comparison (\`===\`, \`!==\`, \`<\`, \`>\`), and logical (\`&&\`, \`||\`, \`!\`) operators. Always use \`===\` (strict equality) instead of \`==\` to avoid type coercion bugs.

## Console and Debugging

\`console.log()\` is your best friend for debugging. Other useful methods: \`console.table()\` for arrays/objects, \`console.warn()\`, \`console.error()\`, \`console.time()\` / \`console.timeEnd()\` for performance.`,
    keyTakeaways: [
      "JavaScript is a dynamic, interpreted programming language",
      "Use const by default; use let only when reassignment is needed",
      "JavaScript has 7 primitive types and 1 reference type (Object)",
      "Always use === for equality checks to avoid type coercion",
      "console.log() is essential for debugging",
    ],
    codeExamples: [
      {
        title: "Variables & Data Types",
        language: "javascript",
        description: "Declaring variables and working with JavaScript's data types.",
        code: `// const — immutable binding (use by default)
const name = "JavaScript";
const version = 2024;
const isAwesome = true;

// let — mutable binding (when value changes)
let score = 0;
score = 100;  // allowed with let

// Data Types
const str = "Hello, world!";    // String
const num = 42;                  // Number
const pi = 3.14159;             // Number (no int/float distinction)
const big = 9007199254740991n;  // BigInt
const bool = true;               // Boolean
const empty = null;              // Null (intentional absence)
let undef;                       // Undefined (not yet assigned)

// Type checking
console.log(typeof str);    // "string"
console.log(typeof num);    // "number"
console.log(typeof bool);   // "boolean"
console.log(typeof null);   // "object" (historical bug!)

// Template Literals (string interpolation)
const greeting = \`Hello, \${name}! Version \${version}\`;
console.log(greeting); // "Hello, JavaScript! Version 2024"

// Operators
console.log(10 === "10");  // false (strict equality — recommended)
console.log(10 == "10");   // true  (loose equality — avoid)`,
      },
      {
        title: "Strings & Basic Operations",
        language: "javascript",
        description: "Common string methods and operations you'll use daily.",
        code: `const text = "  Hello, JavaScript World!  ";

// String methods (strings are immutable — methods return new strings)
console.log(text.trim());                    // "Hello, JavaScript World!"
console.log(text.trim().toLowerCase());      // "hello, javascript world!"
console.log(text.trim().toUpperCase());      // "HELLO, JAVASCRIPT WORLD!"
console.log(text.includes("JavaScript"));    // true
console.log(text.trim().startsWith("Hello")); // true
console.log(text.trim().replace("World", "Developer")); // "Hello, JavaScript Developer!"
console.log(text.trim().split(", "));        // ["Hello", "JavaScript World!"]
console.log(text.trim().length);             // 25

// Numbers
const price = 19.99;
console.log(price.toFixed(0));    // "20"
console.log(parseInt("42px"));    // 42
console.log(parseFloat("3.14"));  // 3.14
console.log(Number.isNaN(NaN));   // true
console.log(Math.round(4.7));     // 5
console.log(Math.floor(4.9));     // 4
console.log(Math.ceil(4.1));      // 5
console.log(Math.max(10, 20, 5)); // 20
console.log(Math.random());       // Random 0-1

// Ternary Operator
const age = 20;
const status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-intro-ex1",
        title: "Variable Declaration",
        instruction: "Declare a constant called 'language' with the value 'JavaScript' and a let variable called 'year' set to 2024.",
        startingCode: `// Declare your variables here`,
        expectedOutput: `const language = "JavaScript";\nlet year = 2024;`,
        hints: ["Use const for values that won't change", "Use let for values that might change"],
      },
      {
        id: "js-intro-ex2",
        title: "Template Literal",
        instruction: "Using template literals, create a greeting that says 'Hello, [name]! You are [age] years old.' using the provided variables.",
        startingCode: `const name = "Alice";\nconst age = 25;\n// Create greeting using template literals`,
        expectedOutput: `const name = "Alice";\nconst age = 25;\nconst greeting = \`Hello, \${name}! You are \${age} years old.\`;`,
        hints: ["Template literals use backticks (`)", "Use ${} for variable interpolation"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 2: Functions & Scope
  // ──────────────────────────────────────────
  {
    slug: "functions-and-scope",
    title: "Functions & Scope",
    difficulty: "beginner",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
    content: `Functions are reusable blocks of code that perform a specific task. They are fundamental to JavaScript — you'll use them everywhere.

## Function Declarations

The classic way to define a function. Function declarations are **hoisted** — you can call them before they're defined in the code.

## Function Expressions

Assign a function to a variable. These are NOT hoisted — you must define them before use.

## Arrow Functions

A concise syntax introduced in ES6. Arrow functions:
- Have shorter syntax
- Don't have their own \`this\` (inherit from surrounding scope)
- Can't be used as constructors
- Implicit return for single expressions

## Parameters & Arguments

- **Default parameters** — \`function greet(name = "World")\`
- **Rest parameters** — \`function sum(...numbers)\` collects remaining args
- **Destructured parameters** — \`function greet({ name, age })\`

## Return Values

Functions return \`undefined\` by default. Use \`return\` to send a value back.

## Scope

Scope determines where variables are accessible:
- **Global scope** — Variables declared outside any function
- **Function scope** — Variables declared with \`var\` inside a function
- **Block scope** — Variables declared with \`let\`/\`const\` inside \`{}\`
- **Lexical scope** — Inner functions access outer function variables (closure)

## Closures

A closure is a function that remembers variables from its outer scope, even after the outer function has returned. Closures are used for data privacy, partial application, and event handlers.`,
    keyTakeaways: [
      "Arrow functions provide concise syntax and inherit 'this'",
      "const/let are block-scoped; var is function-scoped",
      "Default parameters prevent undefined argument errors",
      "Closures let functions remember their outer scope",
      "Pure functions (no side effects) are easier to test and debug",
    ],
    codeExamples: [
      {
        title: "Function Types",
        language: "javascript",
        description: "Three ways to define functions and when to use each one.",
        code: `// Function Declaration (hoisted)
function add(a, b) {
    return a + b;
}
console.log(add(5, 3)); // 8

// Function Expression (not hoisted)
const multiply = function(a, b) {
    return a * b;
};

// Arrow Function (concise)
const subtract = (a, b) => a - b;

// Arrow with body (for multiple statements)
const divide = (a, b) => {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
};

// Default Parameters
function greet(name = "World") {
    return \`Hello, \${name}!\`;
}
console.log(greet());         // "Hello, World!"
console.log(greet("Alice"));  // "Hello, Alice!"

// Rest Parameters
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Destructured Parameters
function createUser({ name, email, role = "user" }) {
    return { name, email, role, createdAt: new Date() };
}

const user = createUser({ name: "Alice", email: "alice@example.com" });`,
      },
      {
        title: "Scope & Closures",
        language: "javascript",
        description: "Understanding how scope and closures work in JavaScript.",
        code: `// Block Scope
{
    const x = 10;
    let y = 20;
    // var z = 30; // var would leak out of the block!
}
// console.log(x); // ReferenceError: x is not defined

// Lexical Scope
function outer() {
    const message = "Hello";

    function inner() {
        console.log(message); // Can access outer variable
    }

    inner(); // "Hello"
}

// Closure — function remembers its outer scope
function createCounter() {
    let count = 0; // Private variable

    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count,
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// count is not accessible directly — it's private!

// Practical Closure: rate limiter
function createRateLimiter(maxCalls, timeWindow) {
    let calls = 0;
    setInterval(() => { calls = 0; }, timeWindow);

    return function() {
        if (calls >= maxCalls) return false;
        calls++;
        return true;
    };
}`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-func-ex1",
        title: "Arrow Function",
        instruction: "Write an arrow function called 'double' that takes a number and returns it multiplied by 2.",
        startingCode: `// Write your arrow function here`,
        expectedOutput: `const double = (n) => n * 2;`,
        hints: ["Arrow functions use => syntax", "Single expressions don't need braces or return"],
      },
      {
        id: "js-func-ex2",
        title: "Closure Counter",
        instruction: "Create a function makeCounter() that returns a function. Each call to the returned function should return an incrementing number (1, 2, 3...).",
        startingCode: `function makeCounter() {\n    // Your code here\n}`,
        expectedOutput: `function makeCounter() {\n    let count = 0;\n    return () => ++count;\n}`,
        hints: ["Declare a count variable in the outer function", "Return an inner function that increments and returns count"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 3: Arrays & Objects
  // ──────────────────────────────────────────
  {
    slug: "arrays-and-objects",
    title: "Arrays & Objects",
    difficulty: "beginner",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
    content: `Arrays and objects are the two most important data structures in JavaScript. Arrays store ordered lists; objects store key-value pairs. Together, they can represent almost any data.

## Arrays

Arrays are ordered collections of values. They are zero-indexed (first element is at index 0).

### Array Methods (Immutable — return new arrays)
- \`map(fn)\` — Transform each element
- \`filter(fn)\` — Keep elements that pass a test
- \`reduce(fn, initial)\` — Accumulate into a single value
- \`find(fn)\` — First element that passes a test
- \`some(fn)\` / \`every(fn)\` — Test if some/all elements pass
- \`flat(depth)\` — Flatten nested arrays
- \`includes(value)\` — Check if value exists

### Array Methods (Mutating — modify the original)
- \`push()\` / \`pop()\` — Add/remove from end
- \`unshift()\` / \`shift()\` — Add/remove from start
- \`splice(start, count, ...items)\` — Insert/remove at position
- \`sort(fn)\` — Sort in place
- \`reverse()\` — Reverse in place

## Objects

Objects store data as key-value pairs (properties). Keys are strings (or Symbols).

### Object Operations
- Access: \`obj.name\` or \`obj["name"]\`
- Add/update: \`obj.age = 25\`
- Delete: \`delete obj.age\`
- Check: \`"name" in obj\`

### Object Methods
- \`Object.keys(obj)\` — Array of keys
- \`Object.values(obj)\` — Array of values
- \`Object.entries(obj)\` — Array of [key, value] pairs
- \`Object.assign(target, source)\` — Merge objects
- Spread: \`{ ...obj, newProp: value }\` — Shallow copy + extend

## Destructuring

Extract values from arrays and objects into variables. Essential for clean, readable code.

## Spread & Rest

- **Spread** (\`...\`) — Expand arrays/objects into individual elements
- **Rest** (\`...\`) — Collect remaining elements into an array/object`,
    keyTakeaways: [
      "Arrays are ordered lists; objects are key-value stores",
      "map(), filter(), and reduce() are the most important array methods",
      "Destructuring extracts values into named variables",
      "Spread (...) copies and merges; rest (...) collects remainders",
      "Prefer immutable methods (map, filter) over mutating ones (push, splice)",
    ],
    codeExamples: [
      {
        title: "Array Methods",
        language: "javascript",
        description: "The essential array methods for transforming and querying data.",
        code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map — transform each element
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// filter — keep elements that pass
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6, 8, 10]

// reduce — accumulate to single value
const sum = numbers.reduce((total, n) => total + n, 0);
// 55

// find — first match
const firstBig = numbers.find(n => n > 5);
// 6

// some / every
console.log(numbers.some(n => n > 8));  // true
console.log(numbers.every(n => n > 0)); // true

// Chaining methods
const result = numbers
    .filter(n => n % 2 === 0)   // [2, 4, 6, 8, 10]
    .map(n => n * 3)             // [6, 12, 18, 24, 30]
    .reduce((sum, n) => sum + n, 0); // 90

// Array destructuring
const [first, second, ...rest] = numbers;
console.log(first);  // 1
console.log(rest);   // [3, 4, 5, 6, 7, 8, 9, 10]

// Spread — copy and extend
const moreNums = [...numbers, 11, 12];`,
      },
      {
        title: "Objects & Destructuring",
        language: "javascript",
        description: "Working with objects, destructuring, and the spread operator.",
        code: `// Object creation
const user = {
    name: "Alice",
    email: "alice@example.com",
    age: 28,
    address: { city: "Portland", state: "OR" },
};

// Destructuring
const { name, email, age } = user;
console.log(name); // "Alice"

// Nested destructuring
const { address: { city } } = user;
console.log(city); // "Portland"

// Renaming during destructuring
const { name: userName } = user;
console.log(userName); // "Alice"

// Default values
const { role = "user" } = user;
console.log(role); // "user"

// Spread — shallow copy + extend
const updatedUser = { ...user, age: 29, role: "admin" };

// Object.entries for iteration
Object.entries(user).forEach(([key, value]) => {
    console.log(\`\${key}: \${value}\`);
});

// Computed property names
const field = "email";
const obj = { [field]: "test@test.com" };

// Optional chaining & nullish coalescing
const bio = user.profile?.bio ?? "No bio provided";

// Short-circuit property creation
const config = {
    debug: false,
    ...(process.env.NODE_ENV === "development" && { debug: true }),
};`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-arr-ex1",
        title: "Filter and Map",
        instruction: "Given an array of numbers [1, 2, 3, 4, 5, 6], filter to keep only even numbers, then double each one.",
        startingCode: `const numbers = [1, 2, 3, 4, 5, 6];\n// Filter even, then double`,
        expectedOutput: `const numbers = [1, 2, 3, 4, 5, 6];\nconst result = numbers.filter(n => n % 2 === 0).map(n => n * 2);`,
        hints: ["Use .filter() to keep even numbers (n % 2 === 0)", "Chain .map() to double the result"],
      },
      {
        id: "js-arr-ex2",
        title: "Object Destructuring",
        instruction: "Destructure the user object to extract name and email into variables, with a default role of 'user'.",
        startingCode: `const user = { name: "Alice", email: "alice@test.com" };\n// Destructure here`,
        expectedOutput: `const user = { name: "Alice", email: "alice@test.com" };\nconst { name, email, role = "user" } = user;`,
        hints: ["Use { } on the left side of assignment", "Add = 'user' after role for the default"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 4: Control Flow
  // ──────────────────────────────────────────
  {
    slug: "control-flow",
    title: "Control Flow",
    difficulty: "beginner",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
    content: `Control flow determines the order in which code executes. JavaScript provides conditionals (if/else, switch) and loops (for, while, for...of) to control program flow.

## Conditionals

### if / else if / else
The most common conditional. Checks conditions in order and executes the first matching block.

### Ternary Operator
A concise inline conditional: \`condition ? valueIfTrue : valueIfFalse\`

### Switch
Best for comparing a single value against many possibilities. Don't forget \`break\`!

## Truthy & Falsy

JavaScript has only 6 **falsy** values: \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`. Everything else is **truthy** (including empty arrays \`[]\` and objects \`{}\`).

## Logical Operators

- \`&&\` — AND: returns first falsy value, or last value if all truthy
- \`||\` — OR: returns first truthy value, or last value if all falsy
- \`??\` — Nullish coalescing: returns right side only if left is \`null\`/\`undefined\`
- \`?.\` — Optional chaining: safely access nested properties

## Loops

- \`for\` — Classic counted loop
- \`for...of\` — Iterate over arrays, strings, Maps, Sets (values)
- \`for...in\` — Iterate over object keys (avoid for arrays)
- \`while\` / \`do...while\` — Loop while condition is true
- Array methods (\`forEach\`, \`map\`, \`filter\`) — Preferred for data transformation

## Loop Control

- \`break\` — Exit the loop entirely
- \`continue\` — Skip to the next iteration
- Labels — Name loops for breaking out of nested loops (rare)`,
    keyTakeaways: [
      "JavaScript has 6 falsy values; everything else is truthy",
      "Use === for comparisons; use ?? for null/undefined defaults",
      "for...of iterates values; for...in iterates keys",
      "Prefer array methods (map, filter) over manual loops",
      "Optional chaining (?.) safely navigates nested properties",
    ],
    codeExamples: [
      {
        title: "Conditionals & Logical Operators",
        language: "javascript",
        description: "Decision-making patterns you'll use every day.",
        code: `// if / else if / else
function getGrade(score) {
    if (score >= 90) return "A";
    else if (score >= 80) return "B";
    else if (score >= 70) return "C";
    else if (score >= 60) return "D";
    else return "F";
}

// Ternary
const status = score >= 60 ? "pass" : "fail";

// Logical operators for defaults
const name = user.name || "Anonymous";
const bio = user.bio ?? "No bio";  // Only for null/undefined

// Optional chaining
const city = user?.address?.city;  // undefined if any is null

// Short-circuit evaluation
isAdmin && deleteRecord(id);       // Only runs if isAdmin is true
hasError || submitForm();           // Only runs if no error

// Switch
function getDayType(day) {
    switch (day.toLowerCase()) {
        case "saturday":
        case "sunday":
            return "weekend";
        case "monday":
        case "friday":
            return "bookend";
        default:
            return "weekday";
    }
}

// Nullish coalescing with assignment
let config = {};
config.timeout ??= 3000;  // Sets to 3000 only if null/undefined`,
      },
      {
        title: "Loops & Iteration",
        language: "javascript",
        description: "All the ways to iterate in JavaScript and when to use each.",
        code: `const fruits = ["apple", "banana", "cherry", "date"];

// for...of — iterate VALUES (preferred for arrays)
for (const fruit of fruits) {
    console.log(fruit);
}

// for...of with index (using entries)
for (const [index, fruit] of fruits.entries()) {
    console.log(\`\${index}: \${fruit}\`);
}

// Classic for loop (when you need index control)
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// for...in — iterate KEYS (use for objects)
const user = { name: "Alice", age: 28, role: "admin" };
for (const key in user) {
    console.log(\`\${key}: \${user[key]}\`);
}

// while loop
let attempts = 0;
while (attempts < 3) {
    console.log(\`Attempt \${attempts + 1}\`);
    attempts++;
}

// Array methods (preferred for transformations)
const lengths = fruits.map(f => f.length);        // [5, 6, 6, 4]
const longFruits = fruits.filter(f => f.length > 5); // ["banana", "cherry"]

// break and continue
for (const fruit of fruits) {
    if (fruit === "banana") continue;  // Skip banana
    if (fruit === "date") break;       // Stop at date
    console.log(fruit);                // "apple", "cherry"
}`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-flow-ex1",
        title: "FizzBuzz",
        instruction: "Write a function fizzBuzz(n) that returns 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, 'FizzBuzz' for both, and the number as string otherwise.",
        startingCode: `function fizzBuzz(n) {\n    // Your code here\n}`,
        expectedOutput: `function fizzBuzz(n) {\n    if (n % 15 === 0) return "FizzBuzz";\n    if (n % 3 === 0) return "Fizz";\n    if (n % 5 === 0) return "Buzz";\n    return String(n);\n}`,
        hints: ["Check divisible by 15 first (both 3 and 5)", "Use % (modulo) to check divisibility"],
      },
      {
        id: "js-flow-ex2",
        title: "Safe Property Access",
        instruction: "Access user.address.city safely using optional chaining, with a default of 'Unknown' using nullish coalescing.",
        startingCode: `const user = { name: "Alice" };\n// Safely get city`,
        expectedOutput: `const user = { name: "Alice" };\nconst city = user?.address?.city ?? "Unknown";`,
        hints: ["?. returns undefined if any part is null/undefined", "?? provides a default only for null/undefined"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 5: DOM Manipulation
  // ──────────────────────────────────────────
  {
    slug: "dom-manipulation",
    title: "DOM Manipulation",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
    content: `The DOM (Document Object Model) is the browser's representation of your HTML page as a tree of objects. JavaScript can read and modify any part of this tree, enabling dynamic, interactive web pages.

## Selecting Elements

Modern selection methods:
- \`document.querySelector(selector)\` — First match (CSS selector)
- \`document.querySelectorAll(selector)\` — All matches (returns NodeList)
- \`document.getElementById(id)\` — By ID (fast, but querySelector is more flexible)

\`querySelectorAll\` returns a **NodeList**, not an array. Convert with \`Array.from()\` or spread \`[...nodeList]\` to use array methods.

## Modifying Elements

- \`element.textContent\` — Get/set plain text
- \`element.innerHTML\` — Get/set HTML content (be careful of XSS!)
- \`element.setAttribute(name, value)\` — Set an attribute
- \`element.style.property\` — Set inline styles
- \`element.classList\` — Manage CSS classes

## ClassList API

- \`.add("class")\` — Add a class
- \`.remove("class")\` — Remove a class
- \`.toggle("class")\` — Add if missing, remove if present
- \`.contains("class")\` — Check if element has class
- \`.replace("old", "new")\` — Swap classes

## Creating & Removing Elements

- \`document.createElement(tag)\` — Create a new element
- \`parent.appendChild(child)\` — Add to end
- \`parent.insertBefore(new, ref)\` — Insert before reference
- \`parent.removeChild(child)\` — Remove element
- \`element.remove()\` — Remove self (modern)

## Traversing the DOM

Navigate between elements:
- \`element.parentElement\` — Parent
- \`element.children\` — Direct children (elements only)
- \`element.nextElementSibling\` / \`previousElementSibling\`
- \`element.closest(selector)\` — Nearest ancestor matching selector`,
    keyTakeaways: [
      "querySelector() and querySelectorAll() use CSS selector syntax",
      "Use textContent over innerHTML to prevent XSS vulnerabilities",
      "classList provides add, remove, toggle, and contains methods",
      "createElement() + appendChild() builds dynamic content",
      "closest() finds the nearest ancestor matching a selector",
    ],
    codeExamples: [
      {
        title: "Selecting & Modifying Elements",
        language: "javascript",
        description: "The most common DOM operations for dynamic content.",
        code: `// Selecting elements
const heading = document.querySelector("h1");
const buttons = document.querySelectorAll(".btn");
const form = document.getElementById("signup-form");

// Modifying text & HTML
heading.textContent = "Welcome!";
// heading.innerHTML = "<em>Welcome!</em>"; // Use cautiously (XSS risk)

// Working with classes
heading.classList.add("text-xl", "font-bold");
heading.classList.remove("hidden");
heading.classList.toggle("active");

if (heading.classList.contains("active")) {
    console.log("Heading is active");
}

// Setting attributes
const link = document.querySelector("a");
link.setAttribute("href", "https://example.com");
link.setAttribute("target", "_blank");
link.setAttribute("rel", "noopener noreferrer");

// Modifying styles (use classes instead when possible)
heading.style.color = "#6366f1";
heading.style.marginBottom = "1rem";

// Reading computed styles
const computedStyle = getComputedStyle(heading);
console.log(computedStyle.fontSize);

// Data attributes
const card = document.querySelector("[data-id]");
console.log(card.dataset.id);    // reads data-id
card.dataset.active = "true";    // sets data-active`,
      },
      {
        title: "Creating & Removing Elements",
        language: "javascript",
        description: "Building dynamic content and managing DOM nodes.",
        code: `// Create a new card element
function createCard(title, body) {
    const card = document.createElement("div");
    card.className = "card";

    const h3 = document.createElement("h3");
    h3.textContent = title;

    const p = document.createElement("p");
    p.textContent = body;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.addEventListener("click", () => card.remove());

    card.append(h3, p, deleteBtn);
    return card;
}

// Add cards to the page
const container = document.querySelector(".card-grid");
const newCard = createCard("My Card", "Card content here");
container.appendChild(newCard);

// Insert before a specific element
const firstCard = container.firstElementChild;
container.insertBefore(newCard, firstCard);

// DOM Traversal
const activeCard = document.querySelector(".card.active");
const parent = activeCard.parentElement;
const nextCard = activeCard.nextElementSibling;
const form = activeCard.closest("form"); // Nearest ancestor

// Batch DOM updates with DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const li = document.createElement("li");
    li.textContent = \`Item \${i + 1}\`;
    fragment.appendChild(li);
}
document.querySelector("ul").appendChild(fragment);`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-dom-ex1",
        title: "Toggle a Class",
        instruction: "Select the element with class 'menu' and toggle the class 'open' on it.",
        startingCode: `// Toggle the 'open' class`,
        expectedOutput: `const menu = document.querySelector(".menu");\nmenu.classList.toggle("open");`,
        hints: ["Use querySelector with a class selector", "classList.toggle() adds/removes a class"],
      },
      {
        id: "js-dom-ex2",
        title: "Create & Append",
        instruction: "Create a new <p> element with the text 'Hello World' and append it to the element with id 'content'.",
        startingCode: `// Create and append a paragraph`,
        expectedOutput: `const p = document.createElement("p");\np.textContent = "Hello World";\ndocument.getElementById("content").appendChild(p);`,
        hints: ["Use document.createElement to create elements", "Set textContent, then appendChild to add it"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 6: Events & Event Handling
  // ──────────────────────────────────────────
  {
    slug: "events",
    title: "Events & Event Handling",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events",
    content: `Events let your page respond to user actions — clicks, key presses, form submissions, scrolling, and more. Understanding events is essential for building interactive web applications.

## Adding Event Listeners

Use \`addEventListener\` to attach handlers. It's preferred over inline handlers (\`onclick\`) because:
- Multiple handlers per event
- Easy removal with \`removeEventListener\`
- Control over capture/bubble phase
- Cleaner separation of HTML and JavaScript

## The Event Object

Every handler receives an **event object** with useful properties:
- \`event.target\` — The element that triggered the event
- \`event.currentTarget\` — The element the handler is attached to
- \`event.type\` — Event type (e.g., "click")
- \`event.preventDefault()\` — Stop default behavior (e.g., form submit)
- \`event.stopPropagation()\` — Stop event from bubbling up

## Event Bubbling & Capturing

Events propagate in two phases:
1. **Capturing** — Event travels DOWN from document to target
2. **Bubbling** — Event travels UP from target to document

By default, handlers fire during the bubbling phase. Add \`{ capture: true }\` to listen during capture.

## Event Delegation

Instead of adding listeners to every child element, add ONE listener to the parent and use \`event.target\` to determine which child was clicked. This is:
- More memory efficient (fewer listeners)
- Works for dynamically added elements
- Easier to manage

## Common Event Types

- **Mouse**: click, dblclick, mouseenter, mouseleave, mousemove
- **Keyboard**: keydown, keyup, keypress (deprecated)
- **Form**: submit, input, change, focus, blur
- **Window**: load, resize, scroll, beforeunload
- **Touch**: touchstart, touchmove, touchend`,
    keyTakeaways: [
      "addEventListener is the preferred way to handle events",
      "event.target is the element that triggered the event",
      "preventDefault() stops default browser behavior like form submission",
      "Event delegation attaches one listener to a parent instead of many children",
      "Events bubble up from target to document by default",
    ],
    codeExamples: [
      {
        title: "Event Listeners & The Event Object",
        language: "javascript",
        description: "Adding handlers and working with the event object.",
        code: `// Click event
const btn = document.querySelector(".btn");
btn.addEventListener("click", (event) => {
    console.log("Clicked!", event.target);
});

// Form submission
const form = document.querySelector("#login-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();  // Stop page reload

    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Submitting:", { email });
});

// Input event (fires on every keystroke)
const search = document.querySelector("#search");
search.addEventListener("input", (event) => {
    const query = event.target.value.trim();
    filterResults(query);
});

// Keyboard events
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        openSearch();
    }
});

// Remove event listener
function handleClick() { console.log("Clicked once"); }
btn.addEventListener("click", handleClick);
btn.removeEventListener("click", handleClick);

// Once option — auto-removes after first fire
btn.addEventListener("click", () => {
    console.log("This fires only once");
}, { once: true });`,
      },
      {
        title: "Event Delegation & Bubbling",
        language: "javascript",
        description: "Efficient event handling with delegation pattern.",
        code: `// EVENT DELEGATION — One listener on parent
const todoList = document.querySelector(".todo-list");

todoList.addEventListener("click", (event) => {
    const target = event.target;

    // Toggle complete
    if (target.matches(".todo-checkbox")) {
        const item = target.closest(".todo-item");
        item.classList.toggle("completed");
    }

    // Delete item
    if (target.matches(".delete-btn")) {
        const item = target.closest(".todo-item");
        item.remove();
    }
});

// Works even for dynamically added items!
function addTodo(text) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = \`
        <input type="checkbox" class="todo-checkbox">
        <span>\${text}</span>
        <button class="delete-btn">×</button>
    \`;
    todoList.appendChild(li);
}

// Debounce — limit how often a handler fires
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Only search after user stops typing for 300ms
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", debounce((e) => {
    fetchResults(e.target.value);
}, 300));`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-events-ex1",
        title: "Prevent Form Submit",
        instruction: "Add a submit event listener to a form that prevents the default page reload and logs 'Form submitted'.",
        startingCode: `const form = document.querySelector("form");\n// Add submit handler`,
        expectedOutput: `const form = document.querySelector("form");\nform.addEventListener("submit", (e) => {\n    e.preventDefault();\n    console.log("Form submitted");\n});`,
        hints: ["Use addEventListener with 'submit'", "Call event.preventDefault() first"],
      },
      {
        id: "js-events-ex2",
        title: "Event Delegation",
        instruction: "Add a click handler to .list that checks if the clicked element has class 'item' and logs its textContent.",
        startingCode: `const list = document.querySelector(".list");\n// Delegate click to .item children`,
        expectedOutput: `const list = document.querySelector(".list");\nlist.addEventListener("click", (e) => {\n    if (e.target.matches(".item")) {\n        console.log(e.target.textContent);\n    }\n});`,
        hints: ["Use event.target.matches() to check the clicked element", "event.target.textContent gets the text"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 7: Async JavaScript
  // ──────────────────────────────────────────
  {
    slug: "async-javascript",
    title: "Async JavaScript",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS",
    content: `JavaScript is single-threaded, but it handles asynchronous operations (network requests, timers, file I/O) through an event loop. Understanding async patterns is essential for web development.

## The Event Loop

JavaScript has one call stack. When an async operation starts (like a network request), it's handed off to the browser. When it completes, the callback is queued and executed when the call stack is empty.

## Callbacks (Legacy Pattern)

The original async pattern. A function passed as an argument to another function, called when the operation completes. Multiple nested callbacks create "callback hell" — hard to read and maintain.

## Promises

A Promise represents a value that may be available now, later, or never. It has three states:
- **Pending** — Operation in progress
- **Fulfilled** — Completed successfully (has a value)
- **Rejected** — Failed (has a reason/error)

### Promise Methods
- \`.then(onFulfilled)\` — Handle success
- \`.catch(onRejected)\` — Handle errors
- \`.finally(fn)\` — Run regardless of outcome
- \`Promise.all()\` — Wait for all promises
- \`Promise.allSettled()\` — Wait for all (doesn't short-circuit on error)
- \`Promise.race()\` — First to settle wins
- \`Promise.any()\` — First to fulfill wins

## async / await

Syntactic sugar over Promises that makes async code look synchronous:
- \`async\` before a function makes it return a Promise
- \`await\` pauses execution until a Promise resolves
- Use \`try/catch\` for error handling

## Error Handling

Always handle errors in async code. Unhandled promise rejections can crash your app. Use \`try/catch\` with async/await or \`.catch()\` with promises.`,
    keyTakeaways: [
      "JavaScript uses an event loop for non-blocking async operations",
      "Promises represent eventual completion or failure",
      "async/await makes async code look synchronous",
      "Always use try/catch with async/await for error handling",
      "Promise.all() runs multiple promises concurrently",
    ],
    codeExamples: [
      {
        title: "Promises & async/await",
        language: "javascript",
        description: "Modern asynchronous patterns for handling delayed operations.",
        code: `// Creating a Promise
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Using async/await
async function fetchUser(id) {
    try {
        const response = await fetch(\`/api/users/\${id}\`);

        if (!response.ok) {
            throw new Error(\`HTTP \${response.status}\`);
        }

        const user = await response.json();
        return user;

    } catch (error) {
        console.error("Failed to fetch user:", error.message);
        throw error; // Re-throw for caller to handle
    }
}

// Using the async function
async function displayUser() {
    try {
        const user = await fetchUser(1);
        console.log(user.name);
    } catch (error) {
        showError("Could not load user");
    }
}

// Promise chaining (alternative to await)
fetch("/api/users/1")
    .then(res => res.json())
    .then(user => console.log(user))
    .catch(err => console.error(err))
    .finally(() => hideSpinner());`,
      },
      {
        title: "Concurrent Async Operations",
        language: "javascript",
        description: "Running multiple async tasks in parallel for better performance.",
        code: `// Promise.all — run in parallel, fail fast
async function loadDashboard() {
    try {
        const [user, posts, notifications] = await Promise.all([
            fetch("/api/user").then(r => r.json()),
            fetch("/api/posts").then(r => r.json()),
            fetch("/api/notifications").then(r => r.json()),
        ]);

        renderDashboard({ user, posts, notifications });
    } catch (error) {
        // If ANY request fails, the whole thing fails
        showError("Failed to load dashboard");
    }
}

// Promise.allSettled — get all results regardless
async function loadWidgets() {
    const results = await Promise.allSettled([
        fetch("/api/weather").then(r => r.json()),
        fetch("/api/stocks").then(r => r.json()),
        fetch("/api/news").then(r => r.json()),
    ]);

    results.forEach((result, i) => {
        if (result.status === "fulfilled") {
            renderWidget(i, result.value);
        } else {
            renderError(i, result.reason.message);
        }
    });
}

// Promise.race — first to settle wins
async function fetchWithTimeout(url, ms = 5000) {
    const controller = new AbortController();

    const fetchPromise = fetch(url, { signal: controller.signal });
    const timeoutPromise = delay(ms).then(() => {
        controller.abort();
        throw new Error("Request timed out");
    });

    return Promise.race([fetchPromise, timeoutPromise]);
}

// Sequential async (when order matters)
async function processItems(items) {
    const results = [];
    for (const item of items) {
        const result = await processItem(item);
        results.push(result);
    }
    return results;
}`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-async-ex1",
        title: "Async Fetch",
        instruction: "Write an async function 'getPost' that fetches data from '/api/posts/1', parses the JSON, and returns it. Include error handling.",
        startingCode: `async function getPost() {\n    // Your code here\n}`,
        expectedOutput: `async function getPost() {\n    try {\n        const response = await fetch("/api/posts/1");\n        const data = await response.json();\n        return data;\n    } catch (error) {\n        console.error(error);\n    }\n}`,
        hints: ["Use await with fetch()", "Parse with .json() which also returns a promise"],
      },
      {
        id: "js-async-ex2",
        title: "Parallel Fetch",
        instruction: "Use Promise.all to fetch '/api/user' and '/api/posts' concurrently and destructure the results.",
        startingCode: `async function loadData() {\n    // Fetch both in parallel\n}`,
        expectedOutput: `async function loadData() {\n    const [user, posts] = await Promise.all([\n        fetch("/api/user").then(r => r.json()),\n        fetch("/api/posts").then(r => r.json()),\n    ]);\n    return { user, posts };\n}`,
        hints: ["Promise.all takes an array of promises", "Destructure the array result"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 8: ES6+ Modern Features
  // ──────────────────────────────────────────
  {
    slug: "es6-features",
    title: "ES6+ Modern Features",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference",
    content: `ES6 (2015) was a massive update to JavaScript, and features have continued to be added yearly. Modern JavaScript is more concise, readable, and powerful. Here are the features every developer must know.

## Template Literals

Backtick strings with embedded expressions (\${}) and multi-line support.

## Destructuring

Extract values from arrays and objects into variables — covered in Lesson 3.

## Spread & Rest Operators

\`...\` has two uses:
- **Spread** — Expand arrays/objects: \`[...arr1, ...arr2]\`, \`{...obj, key: val}\`
- **Rest** — Collect remaining items: \`function(a, ...rest)\`, \`const [first, ...rest]\`

## Modules (import/export)

Split code into reusable files:
- \`export default\` — One main export per file
- \`export { name }\` — Named exports (multiple per file)
- \`import name from './file'\` — Default import
- \`import { name } from './file'\` — Named import

## Map, Set, WeakMap, WeakSet

New collection types:
- **Map** — Key-value pairs where keys can be any type (not just strings)
- **Set** — Unique values only (deduplication)
- **WeakMap/WeakSet** — Keys are weakly held (garbage-collected when no other references exist)

## Symbols

Unique identifiers that can be used as property keys. Used for creating truly private properties and defining well-known behaviors.

## Iterators & Generators

- **Iterators** — Objects with a \`next()\` method that returns \`{ value, done }\`
- **Generators** — Functions that can pause and resume (\`function*\`), yielding values with \`yield\`

## Optional Chaining & Nullish Coalescing

- \`?.\` — Safely access nested properties
- \`??\` — Default only for null/undefined (not for 0, '', false)

## Other Modern Features

- \`Array.from()\` — Convert array-like to array
- \`Object.fromEntries()\` — Convert entries to object
- \`structuredClone()\` — Deep clone objects
- \`Array.at(-1)\` — Access from end
- \`String.replaceAll()\` — Replace all occurrences
- Top-level \`await\` — Use await outside async functions in modules`,
    keyTakeaways: [
      "Template literals enable string interpolation and multi-line strings",
      "Modules (import/export) organize code into reusable files",
      "Map and Set provide specialized collection types",
      "Optional chaining (?.) and nullish coalescing (??) handle null/undefined safely",
      "Spread/rest (...) is essential for immutable data patterns",
    ],
    codeExamples: [
      {
        title: "ES6+ Essential Features",
        language: "javascript",
        description: "The most impactful modern JavaScript features in one place.",
        code: `// Template Literals — multiline + interpolation
const html = \`
    <div class="card">
        <h3>\${user.name}</h3>
        <p>\${user.bio || "No bio provided"}</p>
    </div>
\`;

// Destructuring with rename + defaults
const { name: userName, role = "user" } = user;

// Spread — immutable update pattern
const updatedUser = { ...user, name: "New Name" };
const combined = [...array1, ...array2];

// Modules
// export default function Button() { ... }
// export { formatDate, parseDate };
// import Button from "./Button";
// import { formatDate } from "./utils";

// Optional Chaining + Nullish Coalescing
const street = user?.address?.street ?? "No address";

// structuredClone — deep copy
const deepCopy = structuredClone(complexObject);

// Array.at() — access from end
const last = arr.at(-1);
const secondLast = arr.at(-2);

// Object.fromEntries — convert array to object
const params = new URLSearchParams("name=Alice&age=28");
const obj = Object.fromEntries(params);
// { name: "Alice", age: "28" }`,
      },
      {
        title: "Map, Set & Generators",
        language: "javascript",
        description: "Specialized collections and generator functions.",
        code: `// Map — keys can be ANY type
const cache = new Map();
cache.set("user:1", { name: "Alice" });
cache.set(42, "forty-two");           // Number key
cache.set(document.body, "the body"); // Object key

console.log(cache.get("user:1"));     // { name: "Alice" }
console.log(cache.has("user:1"));     // true
console.log(cache.size);              // 3

// Iterate a Map
for (const [key, value] of cache) {
    console.log(key, value);
}

// Set — unique values only
const tags = new Set(["javascript", "css", "javascript", "html"]);
console.log(tags.size); // 3 (no duplicate "javascript")
tags.add("react");
tags.delete("css");
console.log([...tags]); // ["javascript", "html", "react"]

// Deduplicate an array
const unique = [...new Set([1, 2, 2, 3, 3, 3])]; // [1, 2, 3]

// Generator function
function* range(start, end, step = 1) {
    for (let i = start; i < end; i += step) {
        yield i;
    }
}

for (const n of range(0, 10, 2)) {
    console.log(n); // 0, 2, 4, 6, 8
}

// Generator for pagination
function* paginate(items, pageSize) {
    for (let i = 0; i < items.length; i += pageSize) {
        yield items.slice(i, i + pageSize);
    }
}

const pages = paginate(allItems, 10);
console.log(pages.next().value); // First 10 items`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-es6-ex1",
        title: "Deduplicate Array",
        instruction: "Remove duplicate values from [1, 2, 2, 3, 3, 4] using a Set and spread operator.",
        startingCode: `const numbers = [1, 2, 2, 3, 3, 4];\n// Remove duplicates`,
        expectedOutput: `const numbers = [1, 2, 2, 3, 3, 4];\nconst unique = [...new Set(numbers)];`,
        hints: ["new Set() removes duplicates", "Spread into an array with [...]"],
      },
      {
        id: "js-es6-ex2",
        title: "Map Usage",
        instruction: "Create a Map called 'scores', set 'Alice' to 95 and 'Bob' to 87, then get Alice's score.",
        startingCode: `// Create and use a Map`,
        expectedOutput: `const scores = new Map();\nscores.set("Alice", 95);\nscores.set("Bob", 87);\nconsole.log(scores.get("Alice"));`,
        hints: ["new Map() creates a Map", ".set(key, value) adds entries"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 9: Classes & OOP
  // ──────────────────────────────────────────
  {
    slug: "classes-and-oop",
    title: "Classes & Object-Oriented Programming",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
    content: `JavaScript classes provide a clean syntax for object-oriented programming. Under the hood, they use JavaScript's prototype-based inheritance, but the class syntax makes it much more readable.

## Class Basics

A class is a blueprint for creating objects with shared properties and methods.

\`\`\`
class ClassName {
    constructor(params) { ... }
    methodName() { ... }
}
\`\`\`

## Constructor

The \`constructor\` method runs when you create a new instance with \`new\`. It's used to initialize properties.

## Methods

Methods defined in a class are added to the prototype, shared by all instances (memory efficient). Define them without the \`function\` keyword.

## Getters & Setters

\`get\` and \`set\` define computed properties — they look like regular property access but execute code:
- \`get fullName() { return ... }\` — Access as \`user.fullName\`
- \`set fullName(value) { ... }\` — Assign as \`user.fullName = "Alice"\`

## Static Methods

Methods called on the class itself, not on instances. Used for utility functions, factory methods, and singleton patterns.

## Inheritance

The \`extends\` keyword creates a subclass. Use \`super()\` to call the parent constructor and \`super.method()\` to call parent methods.

## Private Fields

\`#\` prefix makes fields truly private — inaccessible outside the class:
- \`#count = 0\` — Private property
- \`#validate()\` — Private method

## Composition vs Inheritance

Modern JavaScript often favors **composition** (combining small, focused functions/objects) over deep inheritance hierarchies. Use classes for clear "is-a" relationships and composition for "has-a" relationships.

## Practical Uses

Classes are used extensively in:
- UI component frameworks
- State management
- Data models/entities
- Service layers
- Design patterns (Observer, Strategy, etc.)`,
    keyTakeaways: [
      "Classes are syntactic sugar over JavaScript's prototype system",
      "constructor() initializes new instances created with 'new'",
      "Static methods belong to the class, not instances",
      "extends + super() enable inheritance",
      "# prefix makes properties truly private",
    ],
    codeExamples: [
      {
        title: "Class Fundamentals",
        language: "javascript",
        description: "Defining classes with constructors, methods, getters, and private fields.",
        code: `class User {
    // Private fields
    #password;
    #loginAttempts = 0;

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.#password = password;
        this.createdAt = new Date();
    }

    // Getter (computed property)
    get displayName() {
        return \`\${this.name} <\${this.email}>\`;
    }

    // Setter with validation
    set email(value) {
        if (!value.includes("@")) {
            throw new Error("Invalid email");
        }
        this._email = value;
    }

    // Regular method
    checkPassword(input) {
        this.#loginAttempts++;
        if (this.#loginAttempts > 5) {
            throw new Error("Too many attempts");
        }
        return input === this.#password;
    }

    // Static method — called on the class
    static fromJSON(json) {
        const data = JSON.parse(json);
        return new User(data.name, data.email, data.password);
    }
}

const user = new User("Alice", "alice@test.com", "secret123");
console.log(user.displayName);       // "Alice <alice@test.com>"
console.log(user.checkPassword("secret123")); // true
// console.log(user.#password);      // SyntaxError: private field`,
      },
      {
        title: "Inheritance & Composition",
        language: "javascript",
        description: "Extending classes and composing behavior from reusable pieces.",
        code: `// Inheritance with extends
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        return \`\${this.name} makes a sound\`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);  // Call parent constructor
        this.breed = breed;
    }
    speak() {
        return \`\${this.name} barks!\`;
    }
    fetch(item) {
        return \`\${this.name} fetches the \${item}\`;
    }
}

const rex = new Dog("Rex", "German Shepherd");
console.log(rex.speak());       // "Rex barks!"
console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true

// COMPOSITION — often better than deep inheritance
// Mix behaviors into objects
const withTimestamps = (Base) => class extends Base {
    constructor(...args) {
        super(...args);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    touch() { this.updatedAt = new Date(); }
};

const withValidation = (Base) => class extends Base {
    validate() {
        for (const [key, value] of Object.entries(this)) {
            if (value === null || value === undefined) {
                throw new Error(\`\${key} is required\`);
            }
        }
        return true;
    }
};

// Compose multiple behaviors
class Product extends withTimestamps(withValidation(class {})) {
    constructor(name, price) {
        super();
        this.name = name;
        this.price = price;
    }
}

const item = new Product("Widget", 9.99);
item.validate();  // true
item.touch();     // Updates timestamp`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-class-ex1",
        title: "Basic Class",
        instruction: "Create a class 'Rectangle' with a constructor that takes width and height, and a method 'area()' that returns the area.",
        startingCode: `// Create Rectangle class`,
        expectedOutput: `class Rectangle {\n    constructor(width, height) {\n        this.width = width;\n        this.height = height;\n    }\n    area() {\n        return this.width * this.height;\n    }\n}`,
        hints: ["constructor() initializes properties with 'this'", "Methods are defined without 'function' keyword"],
      },
      {
        id: "js-class-ex2",
        title: "Inheritance",
        instruction: "Create a 'Square' class that extends 'Rectangle', taking only a 'side' parameter.",
        startingCode: `// Square extends Rectangle`,
        expectedOutput: `class Square extends Rectangle {\n    constructor(side) {\n        super(side, side);\n    }\n}`,
        hints: ["Use extends to inherit from Rectangle", "super() calls the parent constructor"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 10: Error Handling
  // ──────────────────────────────────────────
  {
    slug: "error-handling",
    title: "Error Handling",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
    content: `Robust error handling separates professional code from amateur code. JavaScript provides try/catch for synchronous code and Promise.catch() / try-await-catch for async code.

## try / catch / finally

The basic error handling structure:
- \`try\` — Code that might throw
- \`catch\` — Runs when an error occurs
- \`finally\` — Always runs, regardless of error (cleanup code)

## Error Types

JavaScript has built-in error classes:
- \`Error\` — Generic error
- \`TypeError\` — Wrong type (e.g., calling undefined as a function)
- \`RangeError\` — Value out of range
- \`ReferenceError\` — Using an undeclared variable
- \`SyntaxError\` — Invalid syntax
- \`URIError\` — Malformed URI

## Throwing Errors

Use \`throw\` to create an error manually. You can throw Error objects, strings (not recommended), or custom error classes.

## Custom Error Classes

Extend the Error class for domain-specific errors. This allows you to catch specific error types and handle them differently.

## Error Handling Patterns

- **Guard clauses** — Check inputs early and fail fast
- **Validation** — Validate data at system boundaries
- **Error boundaries** — Catch errors in UI components (React pattern)
- **Retry logic** — Automatically retry failed operations
- **Graceful degradation** — Fall back to simpler functionality

## Async Error Handling

- Use \`try/catch\` with \`async/await\`
- Use \`.catch()\` with Promises
- \`window.addEventListener('unhandledrejection')\` — Global handler for unhandled promise rejections`,
    keyTakeaways: [
      "try/catch/finally handles synchronous errors",
      "Custom error classes enable type-specific error handling",
      "Validate inputs at system boundaries (API endpoints, form handlers)",
      "Always handle errors in async code to prevent silent failures",
      "finally blocks are perfect for cleanup code",
    ],
    codeExamples: [
      {
        title: "Error Handling Patterns",
        language: "javascript",
        description: "Professional error handling with try/catch and custom errors.",
        code: `// Basic try/catch/finally
try {
    const data = JSON.parse(userInput);
    processData(data);
} catch (error) {
    if (error instanceof SyntaxError) {
        console.error("Invalid JSON:", error.message);
    } else {
        throw error; // Re-throw unexpected errors
    }
} finally {
    hideSpinner(); // Always runs
}

// Custom Error Classes
class ValidationError extends Error {
    constructor(field, message) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class NotFoundError extends Error {
    constructor(resource, id) {
        super(\`\${resource} with id \${id} not found\`);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

// Guard clauses — fail fast
function createUser(data) {
    if (!data.email) throw new ValidationError("email", "Email is required");
    if (!data.name) throw new ValidationError("name", "Name is required");
    if (data.age < 0) throw new RangeError("Age must be positive");

    return { ...data, id: generateId() };
}

// Handling specific error types
try {
    const user = createUser(formData);
} catch (error) {
    if (error instanceof ValidationError) {
        showFieldError(error.field, error.message);
    } else if (error instanceof RangeError) {
        showError(error.message);
    } else {
        reportToSentry(error);
        showError("An unexpected error occurred");
    }
}`,
      },
      {
        title: "Async Error Handling & Retry",
        language: "javascript",
        description: "Handling errors in async code and implementing retry logic.",
        code: `// Async try/catch
async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("Request was cancelled");
        } else {
            console.error("Fetch failed:", error.message);
            throw error;
        }
    }
}

// Retry with exponential backoff
async function fetchWithRetry(url, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fetch(url).then(r => r.json());
        } catch (error) {
            if (attempt === maxRetries) throw error;

            const delay = Math.min(1000 * 2 ** attempt, 10000);
            console.log(\`Retry \${attempt}/\${maxRetries} in \${delay}ms\`);
            await new Promise(r => setTimeout(r, delay));
        }
    }
}

// Global unhandled rejection handler
window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
    event.preventDefault(); // Prevents console error
});

// Error wrapper for async event handlers
function safeHandler(fn) {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            console.error("Handler error:", error);
            showToast("Something went wrong");
        }
    };
}

button.addEventListener("click", safeHandler(async () => {
    const data = await fetchData("/api/data");
    renderData(data);
}));`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-error-ex1",
        title: "Custom Error",
        instruction: "Create a custom error class 'NotFoundError' that extends Error with a statusCode property of 404.",
        startingCode: `// Create NotFoundError class`,
        expectedOutput: `class NotFoundError extends Error {\n    constructor(message) {\n        super(message);\n        this.name = "NotFoundError";\n        this.statusCode = 404;\n    }\n}`,
        hints: ["Use extends Error", "Call super(message) in the constructor"],
      },
      {
        id: "js-error-ex2",
        title: "Safe JSON Parse",
        instruction: "Write a function safeParse(json) that returns the parsed object or null if parsing fails.",
        startingCode: `function safeParse(json) {\n    // Your code here\n}`,
        expectedOutput: `function safeParse(json) {\n    try {\n        return JSON.parse(json);\n    } catch {\n        return null;\n    }\n}`,
        hints: ["Wrap JSON.parse in try/catch", "Return null in the catch block"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 11: Working with APIs
  // ──────────────────────────────────────────
  {
    slug: "working-with-apis",
    title: "Working with APIs",
    difficulty: "advanced",
    estimatedMinutes: 30,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
    content: `APIs (Application Programming Interfaces) let your frontend communicate with servers. The Fetch API is the modern standard for making HTTP requests in JavaScript.

## The Fetch API

\`fetch(url, options)\` returns a Promise that resolves to a Response object.

## HTTP Methods

- **GET** — Retrieve data (default)
- **POST** — Create new data
- **PUT** — Replace existing data
- **PATCH** — Partially update data
- **DELETE** — Remove data

## Request Options

- \`method\` — HTTP method
- \`headers\` — HTTP headers (Content-Type, Authorization, etc.)
- \`body\` — Request body (JSON.stringify for objects)
- \`signal\` — AbortController signal for cancellation

## Response Handling

- \`response.ok\` — Boolean, true if status 200-299
- \`response.status\` — HTTP status code
- \`response.json()\` — Parse JSON body
- \`response.text()\` — Get raw text
- \`response.blob()\` — Get binary data

## Authentication

Common patterns:
- **JWT (Bearer tokens)** — \`Authorization: Bearer <token>\`
- **API Keys** — In headers or query parameters
- **Cookies** — Sent automatically with \`credentials: "include"\`

## CORS

Cross-Origin Resource Sharing controls which domains can make requests. The server must include appropriate \`Access-Control-Allow-*\` headers. Preflight requests (\`OPTIONS\`) are sent for non-simple requests.

## Best Practices

- Always check \`response.ok\` before parsing
- Set appropriate \`Content-Type\` headers
- Handle network errors and timeouts
- Use AbortController for request cancellation
- Implement loading, error, and success states in the UI`,
    keyTakeaways: [
      "fetch() returns a Promise with a Response object",
      "Always check response.ok — fetch doesn't throw on HTTP errors",
      "POST/PUT require headers: {'Content-Type': 'application/json'}",
      "AbortController enables request cancellation",
      "Handle loading, error, and success states in every API call",
    ],
    codeExamples: [
      {
        title: "Fetch API — CRUD Operations",
        language: "javascript",
        description: "Making HTTP requests for Create, Read, Update, Delete operations.",
        code: `const API_BASE = "/api";

// GET — Read data
async function getUsers() {
    const response = await fetch(\`\${API_BASE}/users\`);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return response.json();
}

// POST — Create data
async function createUser(userData) {
    const response = await fetch(\`\${API_BASE}/users\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create user");
    }

    return response.json();
}

// PUT — Full update
async function updateUser(id, userData) {
    const response = await fetch(\`\${API_BASE}/users/\${id}\`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Update failed");
    return response.json();
}

// DELETE
async function deleteUser(id) {
    const response = await fetch(\`\${API_BASE}/users/\${id}\`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Delete failed");
}`,
      },
      {
        title: "Advanced API Patterns",
        language: "javascript",
        description: "Authentication, cancellation, and reusable API client.",
        code: `// Reusable API client
class ApiClient {
    #baseUrl;
    #token;

    constructor(baseUrl) {
        this.#baseUrl = baseUrl;
    }

    setToken(token) { this.#token = token; }

    async #request(endpoint, options = {}) {
        const headers = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        if (this.#token) {
            headers["Authorization"] = \`Bearer \${this.#token}\`;
        }

        const response = await fetch(\`\${this.#baseUrl}\${endpoint}\`, {
            ...options,
            headers,
        });

        if (response.status === 401) {
            throw new Error("Unauthorized");
        }

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || \`HTTP \${response.status}\`);
        }

        return response.json();
    }

    get(endpoint)       { return this.#request(endpoint); }
    post(endpoint, data) { return this.#request(endpoint, { method: "POST", body: JSON.stringify(data) }); }
    put(endpoint, data)  { return this.#request(endpoint, { method: "PUT", body: JSON.stringify(data) }); }
    delete(endpoint)     { return this.#request(endpoint, { method: "DELETE" }); }
}

const api = new ApiClient("/api");
api.setToken(localStorage.getItem("token"));
const users = await api.get("/users");

// AbortController — cancel requests
const controller = new AbortController();
fetch("/api/data", { signal: controller.signal });
controller.abort(); // Cancel the request`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-api-ex1",
        title: "POST Request",
        instruction: "Write a function that sends a POST request to '/api/todos' with a JSON body containing { title, completed: false }.",
        startingCode: `async function createTodo(title) {\n    // Your code here\n}`,
        expectedOutput: `async function createTodo(title) {\n    const response = await fetch("/api/todos", {\n        method: "POST",\n        headers: { "Content-Type": "application/json" },\n        body: JSON.stringify({ title, completed: false }),\n    });\n    return response.json();\n}`,
        hints: ["Set method to 'POST'", "Use JSON.stringify for the body", "Set Content-Type header"],
      },
      {
        id: "js-api-ex2",
        title: "Auth Header",
        instruction: "Add a Bearer token authorization header to a fetch request.",
        startingCode: `const token = "abc123";\n// Fetch with auth header`,
        expectedOutput: `const token = "abc123";\nconst response = await fetch("/api/data", {\n    headers: { "Authorization": \`Bearer \${token}\` },\n});`,
        hints: ["Use the Authorization header", "Format: 'Bearer <token>'"],
      },
    ],
  },

  // ──────────────────────────────────────────
  //  Lesson 12: Browser Storage & Web APIs
  // ──────────────────────────────────────────
  {
    slug: "browser-storage-and-apis",
    title: "Browser Storage & Web APIs",
    difficulty: "advanced",
    estimatedMinutes: 25,
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API",
    content: `Modern browsers provide powerful APIs beyond just the DOM. From persistent storage to real-time communication, these APIs enable rich, app-like experiences in the browser.

## localStorage & sessionStorage

Both store key-value pairs as strings:
- **localStorage** — Persists until cleared (survives browser restarts)
- **sessionStorage** — Cleared when the tab is closed

Both have the same API: \`getItem()\`, \`setItem()\`, \`removeItem()\`, \`clear()\`

Store objects by serializing to JSON: \`JSON.stringify()\` / \`JSON.parse()\`

## Cookies

Small pieces of data sent with every HTTP request. Useful for authentication tokens but limited to ~4KB. Use \`document.cookie\` to read/write (or the newer Cookie Store API).

## IndexedDB

A full NoSQL database in the browser. Good for:
- Large amounts of structured data
- Offline-first applications
- Caching API responses

Complex API — consider using a wrapper library like \`idb\`.

## URL & URLSearchParams

Parse and manipulate URLs and query parameters:
- \`new URL(href)\` — Parse a URL
- \`new URLSearchParams(search)\` — Work with query strings
- \`url.searchParams.get("key")\` — Get a parameter

## Intersection Observer

Detect when elements enter or leave the viewport. Perfect for:
- Lazy loading images
- Infinite scrolling
- Triggering animations on scroll
- Analytics (tracking which content is seen)

## Other Web APIs

- **Clipboard API** — \`navigator.clipboard.writeText()\`
- **Geolocation** — \`navigator.geolocation.getCurrentPosition()\`
- **Notifications** — \`new Notification("title")\`
- **Web Workers** — Run JavaScript in background threads
- **History API** — \`history.pushState()\` for client-side routing
- **ResizeObserver** — Detect element size changes
- **MutationObserver** — Detect DOM changes`,
    keyTakeaways: [
      "localStorage persists data across sessions; sessionStorage clears on tab close",
      "Always JSON.stringify/parse when storing objects in web storage",
      "Intersection Observer enables efficient scroll-based features",
      "URLSearchParams simplifies query string manipulation",
      "Web APIs like Clipboard, Geolocation, and Notifications enable native-like features",
    ],
    codeExamples: [
      {
        title: "Web Storage & URL Handling",
        language: "javascript",
        description: "Storing data locally and working with URLs.",
        code: `// localStorage — persists across sessions
const user = { name: "Alice", theme: "dark" };
localStorage.setItem("user", JSON.stringify(user));

const stored = JSON.parse(localStorage.getItem("user"));
console.log(stored.name); // "Alice"

localStorage.removeItem("user");

// Safe storage helper
function storage(key, fallback = null) {
    return {
        get() {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : fallback;
            } catch { return fallback; }
        },
        set(value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        remove() { localStorage.removeItem(key); },
    };
}

const theme = storage("theme", "light");
theme.set("dark");
console.log(theme.get()); // "dark"

// URLSearchParams
const params = new URLSearchParams(window.location.search);
const page = Number(params.get("page")) || 1;
const sort = params.get("sort") || "newest";

// Build URLs
params.set("page", 2);
params.set("sort", "oldest");
const newUrl = \`\${window.location.pathname}?\${params}\`;
history.pushState({}, "", newUrl); // Update URL without reload

// Full URL parsing
const url = new URL("https://example.com/api/users?page=2&sort=name");
console.log(url.hostname);   // "example.com"
console.log(url.pathname);   // "/api/users"
console.log(url.searchParams.get("page")); // "2"`,
      },
      {
        title: "Intersection Observer & Clipboard",
        language: "javascript",
        description: "Scroll-based features and native-like browser APIs.",
        code: `// Intersection Observer — lazy loading images
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;  // Load actual image
                img.classList.add("loaded");
                observer.unobserve(img);    // Stop watching
            }
        });
    },
    { rootMargin: "200px" }  // Start loading 200px before visible
);

// Observe all lazy images
document.querySelectorAll("img[data-src]").forEach((img) => {
    observer.observe(img);
});

// Infinite scroll
const sentinel = document.querySelector("#scroll-sentinel");
const scrollObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
        loadMoreItems();
    }
});
scrollObserver.observe(sentinel);

// Clipboard API
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast("Copied to clipboard!");
    } catch {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
    }
}

// History API — client-side routing
function navigate(path) {
    history.pushState({ path }, "", path);
    renderPage(path);
}

window.addEventListener("popstate", (event) => {
    renderPage(event.state?.path || "/");
});`,
      },
    ],
    interactiveExercises: [
      {
        id: "js-storage-ex1",
        title: "Save to localStorage",
        instruction: "Save a settings object { theme: 'dark', fontSize: 16 } to localStorage under the key 'settings'.",
        startingCode: `const settings = { theme: "dark", fontSize: 16 };\n// Save to localStorage`,
        expectedOutput: `const settings = { theme: "dark", fontSize: 16 };\nlocalStorage.setItem("settings", JSON.stringify(settings));`,
        hints: ["Use localStorage.setItem()", "Objects must be JSON.stringify'd first"],
      },
      {
        id: "js-storage-ex2",
        title: "URL Parameters",
        instruction: "Get the 'page' parameter from the current URL's search params, defaulting to 1 if not found.",
        startingCode: `// Get page from URL`,
        expectedOutput: `const params = new URLSearchParams(window.location.search);\nconst page = Number(params.get("page")) || 1;`,
        hints: ["new URLSearchParams parses query strings", "Use || for default values"],
      },
    ],
  },
];
