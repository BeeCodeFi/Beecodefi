import { InterviewQuestion } from './html-questions';

export const jsInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'js-1',
    question: 'What is the difference between `var`, `let`, and `const`?',
    answer: `All three declare variables, but they differ in scope, hoisting, and mutability.

**\`var\`** (avoid in modern code)
\`\`\`javascript
var x = 10;
var x = 20;   // Re-declaration allowed — no error
x = 30;       // Re-assignment allowed
console.log(x); // 30

// Function-scoped, NOT block-scoped
if (true) {
  var leaked = "I leak outside the block";
}
console.log(leaked); // "I leak outside the block"

// Hoisted and initialized as undefined
console.log(hoisted); // undefined (not ReferenceError)
var hoisted = "value";
\`\`\`

**\`let\`** (use for values that change)
\`\`\`javascript
let count = 0;
count = 1;       // Re-assignment allowed
// let count = 2; // SyntaxError: re-declaration not allowed

// Block-scoped
if (true) {
  let blockVar = "only here";
}
// console.log(blockVar); // ReferenceError

// Hoisted but NOT initialized (Temporal Dead Zone)
// console.log(tdzLet); // ReferenceError
let tdzLet = "value";
\`\`\`

**\`const\`** (default choice — use for values that don't change)
\`\`\`javascript
const PI = 3.14;
// PI = 3;      // TypeError: Assignment to constant variable

// Objects/arrays are still mutable
const user = { name: "Ayush" };
user.name = "Kumar"; // Allowed — the reference is const, not the content
// user = {};         // TypeError — can't reassign the reference

const arr = [1, 2, 3];
arr.push(4);   // Allowed
\`\`\`

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Re-declare | Yes | No | No |
| Re-assign | Yes | Yes | No |
| Hoisted | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |`,
    difficulty: 'beginner',
    category: 'Variables',
    tags: ['var', 'let', 'const', 'scope', 'hoisting', 'es6'],
  },
  {
    id: 'js-2',
    question: 'What is hoisting in JavaScript?',
    answer: `**Hoisting** is JavaScript's behavior of moving declarations to the top of their scope before code executes. Only the declaration is hoisted — not the initialization.

**Function declarations** are fully hoisted:
\`\`\`javascript
greet(); // "Hello!" — works before the declaration

function greet() {
  console.log("Hello!");
}
\`\`\`

**\`var\`** declarations are hoisted as \`undefined\`:
\`\`\`javascript
console.log(name); // undefined (not ReferenceError)
var name = "Ayush";
console.log(name); // "Ayush"

// Behind the scenes, JS sees it as:
var name;           // hoisted
console.log(name);  // undefined
name = "Ayush";     // assignment stays in place
\`\`\`

**\`let\` and \`const\`** are hoisted but in the Temporal Dead Zone (TDZ):
\`\`\`javascript
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 10;
\`\`\`

**Function expressions** are NOT hoisted like declarations:
\`\`\`javascript
sayHi(); // TypeError: sayHi is not a function

var sayHi = function() {
  console.log("Hi!");
};
// var sayHi is hoisted as undefined, so calling undefined() throws
\`\`\`

**Best practice:** Always declare variables at the top of their scope and use \`let\`/\`const\` to avoid hoisting confusion.`,
    difficulty: 'beginner',
    category: 'Core Concepts',
    tags: ['hoisting', 'var', 'let', 'const', 'tdz', 'function-declaration'],
  },
  {
    id: 'js-3',
    question: 'What is the difference between `==` and `===`?',
    answer: `**\`==\`** (Loose equality) performs **type coercion** — it converts operands to the same type before comparing.

**\`===\`** (Strict equality) compares both **value AND type** with no coercion.

\`\`\`javascript
// == with type coercion
console.log(1 == "1");      // true  (string "1" coerced to number 1)
console.log(0 == false);    // true  (false coerced to 0)
console.log(null == undefined); // true
console.log([] == false);   // true  (weird coercion chain)
console.log("" == false);   // true

// === strict — no coercion
console.log(1 === "1");     // false (different types)
console.log(0 === false);   // false
console.log(null === undefined); // false
\`\`\`

**Tricky \`==\` coercion table:**
\`\`\`javascript
console.log(null == 0);       // false (null only == undefined)
console.log(null == false);   // false
console.log(undefined == 0);  // false
console.log(NaN == NaN);      // false (NaN is never equal to anything)
\`\`\`

**Always use \`===\`** in real code. The only common exception:
\`\`\`javascript
// Check for both null and undefined at once
if (value == null) {
  // value is null OR undefined
}
\`\`\``,
    difficulty: 'beginner',
    category: 'Operators',
    tags: ['equality', 'type-coercion', 'operators', 'strict-equality'],
  },
  {
    id: 'js-4',
    question: 'What are closures in JavaScript?',
    answer: `A **closure** is a function that remembers and can access variables from its outer (enclosing) scope even after that outer function has finished executing.

\`\`\`javascript
function makeCounter() {
  let count = 0;     // count lives in makeCounter's scope

  return function() {
    count++;          // inner function "closes over" count
    return count;
  };
}

const counter = makeCounter(); // makeCounter finishes executing
console.log(counter()); // 1   — count still accessible!
console.log(counter()); // 2
console.log(counter()); // 3

const counter2 = makeCounter(); // new independent closure
console.log(counter2()); // 1
\`\`\`

**Practical Uses:**

**1. Data privacy / encapsulation:**
\`\`\`javascript
function createUser(name) {
  let _score = 0;    // private — not accessible outside

  return {
    getName: () => name,
    addScore: (n) => { _score += n; },
    getScore: () => _score,
  };
}

const user = createUser("Ayush");
user.addScore(10);
console.log(user.getScore()); // 10
console.log(user._score);     // undefined — private!
\`\`\`

**2. Function factories:**
\`\`\`javascript
function multiplier(factor) {
  return (number) => number * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
\`\`\`

**Common Closure Gotcha:**
\`\`\`javascript
// Bug: all functions share the same i (var)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3

// Fix: use let (block scope creates a new i each iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2
\`\`\``,
    difficulty: 'intermediate',
    category: 'Functions',
    tags: ['closures', 'scope', 'functions', 'encapsulation', 'lexical-scope'],
  },
  {
    id: 'js-5',
    question: 'What is the event loop and how does JavaScript handle asynchronous code?',
    answer: `JavaScript is **single-threaded** — it can only do one thing at a time. The **Event Loop** is the mechanism that handles asynchronous operations without blocking the main thread.

**The components:**
- **Call Stack** — where synchronous code executes (LIFO)
- **Web APIs** — browser-provided async operations (setTimeout, fetch, DOM events)
- **Callback Queue (Task Queue)** — callbacks from completed async ops wait here
- **Microtask Queue** — Promise callbacks (.then, .catch, async/await) — higher priority
- **Event Loop** — constantly checks: "Is the call stack empty? Move next item from queue"

\`\`\`javascript
console.log("1 - Start");          // Call stack

setTimeout(() => {
  console.log("3 - setTimeout");   // Callback Queue (macro task)
}, 0);

Promise.resolve()
  .then(() => console.log("2 - Promise")); // Microtask Queue

console.log("4 - End");            // Call stack

// Output order:
// 1 - Start
// 4 - End
// 2 - Promise    (microtasks before macro tasks!)
// 3 - setTimeout
\`\`\`

**Priority: Call Stack > Microtasks > Callback Queue**

\`\`\`javascript
console.log("start");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve()
  .then(() => console.log("promise 1"))
  .then(() => console.log("promise 2"));

queueMicrotask(() => console.log("microtask"));

console.log("end");

// Output:
// start
// end
// promise 1
// microtask
// promise 2
// timeout
\`\`\``,
    difficulty: 'advanced',
    category: 'Async',
    tags: ['event-loop', 'async', 'call-stack', 'microtasks', 'promises', 'setTimeout'],
  },
  {
    id: 'js-6',
    question: 'What are Promises and how do they work?',
    answer: `A **Promise** is an object representing the eventual completion or failure of an async operation. It has three states: **pending**, **fulfilled**, or **rejected**.

**Creating a Promise:**
\`\`\`javascript
const fetchData = new Promise((resolve, reject) => {
  // Async work here
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve({ data: "User info" }); // fulfilled
    } else {
      reject(new Error("Network error")); // rejected
    }
  }, 1000);
});
\`\`\`

**Consuming Promises:**
\`\`\`javascript
fetchData
  .then(result => {
    console.log(result.data); // "User info"
    return result.data.toUpperCase(); // chain another transformation
  })
  .then(upper => console.log(upper)) // "USER INFO"
  .catch(error => console.error(error.message))
  .finally(() => console.log("Always runs"));
\`\`\`

**Promise combinators:**
\`\`\`javascript
// All must resolve — rejects if any reject
Promise.all([fetch('/api/users'), fetch('/api/posts')])
  .then(([users, posts]) => console.log(users, posts));

// First to resolve wins
Promise.race([slowRequest, fastRequest])
  .then(result => console.log("First:", result));

// All settle (resolve or reject) — never throws
Promise.allSettled([p1, p2, p3])
  .then(results => results.forEach(r => console.log(r.status)));

// First to RESOLVE wins (ignores rejections)
Promise.any([p1, p2, p3])
  .then(first => console.log("First success:", first));
\`\`\`

**Promise chaining vs nesting (avoid "callback hell"):**
\`\`\`javascript
// Bad — callback hell / pyramid of doom
getUser(id, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) { ... });
  });
});

// Good — flat promise chain
getUser(id)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => console.error(err));
\`\`\``,
    difficulty: 'intermediate',
    category: 'Async',
    tags: ['promises', 'async', 'then', 'catch', 'promise-all', 'promise-race'],
  },
  {
    id: 'js-7',
    question: 'What is `async/await` and how does it relate to Promises?',
    answer: `**\`async/await\`** is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code — much easier to read and reason about.

**Basic syntax:**
\`\`\`javascript
// async function always returns a Promise
async function fetchUser(id) {
  try {
    // await pauses execution until the Promise resolves
    const response = await fetch(\`/api/users/\${id}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error; // re-throw so caller can handle it too
  }
}

// Calling it
const user = await fetchUser(1);
// or with .then()
fetchUser(1).then(user => console.log(user));
\`\`\`

**Sequential vs Parallel execution:**
\`\`\`javascript
// Sequential — one after the other (slower)
async function sequential() {
  const users = await fetchUsers();     // wait
  const posts = await fetchPosts();     // then wait
  // Total time = time(users) + time(posts)
}

// Parallel — both start at the same time (faster)
async function parallel() {
  const [users, posts] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
  ]);
  // Total time = max(time(users), time(posts))
}
\`\`\`

**Top-level await (ES2022+):**
\`\`\`javascript
// In ES modules, await can be used at the top level
const data = await fetch('/api/data').then(r => r.json());
console.log(data);
\`\`\`

**Error handling patterns:**
\`\`\`javascript
// Helper to avoid try/catch everywhere
async function safe(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err, null];
  }
}

const [error, user] = await safe(fetchUser(1));
if (error) console.error(error);
else console.log(user);
\`\`\``,
    difficulty: 'intermediate',
    category: 'Async',
    tags: ['async-await', 'promises', 'async', 'try-catch', 'es2017'],
  },
  {
    id: 'js-8',
    question: 'What is `this` in JavaScript and how does its value get determined?',
    answer: `**\`this\`** refers to the object that is currently executing the function. Its value is determined by **how** the function is called, not where it is defined.

**1. Global context:**
\`\`\`javascript
console.log(this); // window (browser) or global (Node.js)
// In strict mode: undefined
\`\`\`

**2. Method call — \`this\` = the object before the dot:**
\`\`\`javascript
const user = {
  name: "Ayush",
  greet() {
    console.log(this.name); // "Ayush"
  }
};
user.greet(); // this = user
\`\`\`

**3. Regular function — \`this\` can be lost:**
\`\`\`javascript
const greet = user.greet;
greet(); // this = undefined (strict) or window — name is undefined!
\`\`\`

**4. Arrow functions — \`this\` inherited from enclosing scope (lexical):**
\`\`\`javascript
const timer = {
  seconds: 0,
  start() {
    setInterval(() => {
      this.seconds++; // this = timer (arrow captures from start())
      console.log(this.seconds);
    }, 1000);
  }
};
timer.start();
\`\`\`

**5. Explicit binding — \`call\`, \`apply\`, \`bind\`:**
\`\`\`javascript
function introduce(greeting) {
  console.log(\`\${greeting}, I'm \${this.name}\`);
}

const person = { name: "Ayush" };

introduce.call(person, "Hello");    // "Hello, I'm Ayush"
introduce.apply(person, ["Hi"]);    // "Hi, I'm Ayush"

const boundFn = introduce.bind(person);
boundFn("Hey");                     // "Hey, I'm Ayush"
\`\`\`

**6. Constructor / \`new\` — \`this\` = newly created object:**
\`\`\`javascript
function Person(name) {
  this.name = name;  // this = new object
}
const p = new Person("Ayush");
console.log(p.name); // "Ayush"
\`\`\``,
    difficulty: 'intermediate',
    category: 'Core Concepts',
    tags: ['this', 'context', 'call', 'apply', 'bind', 'arrow-functions'],
  },
  {
    id: 'js-9',
    question: 'What is the difference between `null` and `undefined`?',
    answer: `Both represent "no value" but they have different meanings and use cases.

**\`undefined\`** — value has not been assigned yet (JavaScript sets this automatically):
\`\`\`javascript
let x;
console.log(x);          // undefined — declared but not assigned

function greet(name) {
  console.log(name);     // undefined — parameter not passed
}
greet();

const obj = {};
console.log(obj.age);    // undefined — property doesn't exist

function noReturn() {}
console.log(noReturn()); // undefined — no return value
\`\`\`

**\`null\`** — intentional absence of a value (you set this explicitly):
\`\`\`javascript
let user = null;          // deliberately empty
user = fetchUser();       // might be null if not found
if (user === null) {
  console.log("User not found");
}
\`\`\`

**Type differences:**
\`\`\`javascript
typeof undefined; // "undefined"
typeof null;      // "object" — famous JavaScript bug (legacy)

null == undefined;  // true  (loose equality)
null === undefined; // false (strict equality — different types)
\`\`\`

**Nullish coalescing and optional chaining:**
\`\`\`javascript
const name = user?.profile?.name ?? "Anonymous";
// user?.profile?.name  — returns undefined if any part is null/undefined
// ?? "Anonymous"       — uses fallback if left side is null or undefined

// ?? vs || difference:
const val1 = 0 || "default";    // "default" — 0 is falsy
const val2 = 0 ?? "default";    // 0         — 0 is not null/undefined
\`\`\``,
    difficulty: 'beginner',
    category: 'Core Concepts',
    tags: ['null', 'undefined', 'nullish-coalescing', 'optional-chaining', 'types'],
  },
  {
    id: 'js-10',
    question: 'What are arrow functions and how do they differ from regular functions?',
    answer: `**Arrow functions** (introduced in ES6) are a concise function syntax with key behavioral differences from regular functions.

**Syntax:**
\`\`\`javascript
// Regular function
function add(a, b) { return a + b; }

// Arrow function variants
const add = (a, b) => a + b;             // implicit return
const square = x => x * x;              // single param, no parens needed
const greet = () => "Hello!";           // no params
const getUser = (id) => ({              // returning object literal
  id,
  name: "Ayush"
});
const multi = (a, b) => {              // block body needs explicit return
  const result = a * b;
  return result;
};
\`\`\`

**Key Differences:**

| Feature | Regular Function | Arrow Function |
|---------|-----------------|----------------|
| \`this\` binding | Dynamic (call-site) | Lexical (from enclosing scope) |
| \`arguments\` object | Yes | No |
| \`new\` (constructor) | Yes | No — throws TypeError |
| \`prototype\` property | Yes | No |
| Can be a generator | Yes | No |

**\`this\` — the most important difference:**
\`\`\`javascript
const obj = {
  name: "Ayush",

  // Regular: this depends on caller
  regularGreet: function() {
    setTimeout(function() {
      console.log(this.name); // undefined — this = window
    }, 100);
  },

  // Arrow: this inherited from obj's method scope
  arrowGreet: function() {
    setTimeout(() => {
      console.log(this.name); // "Ayush" — this = obj
    }, 100);
  }
};
\`\`\`

**\`arguments\` object:**
\`\`\`javascript
function regular() {
  console.log(arguments); // Arguments [1, 2, 3]
}
regular(1, 2, 3);

const arrow = () => {
  console.log(arguments); // ReferenceError
};
// Use rest params instead:
const arrowFixed = (...args) => console.log(args); // [1, 2, 3]
\`\`\``,
    difficulty: 'intermediate',
    category: 'Functions',
    tags: ['arrow-functions', 'this', 'es6', 'functions', 'lexical-scope'],
  },
  {
    id: 'js-11',
    question: 'What is prototypal inheritance in JavaScript?',
    answer: `JavaScript uses **prototypal inheritance** — objects inherit directly from other objects through a **prototype chain**, rather than classical class-based inheritance.

**Every object has a \`[[Prototype]]\`:**
\`\`\`javascript
const animal = {
  breathe() {
    console.log("Breathing...");
  }
};

const dog = Object.create(animal); // dog's prototype = animal
dog.bark = function() {
  console.log("Woof!");
};

dog.bark();    // "Woof!" — own property
dog.breathe(); // "Breathing..." — inherited from animal

console.log(dog.__proto__ === animal); // true
console.log(Object.getPrototypeOf(dog) === animal); // true
\`\`\`

**Constructor functions and \`prototype\`:**
\`\`\`javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Methods on the prototype — shared by all instances (efficient)
Person.prototype.greet = function() {
  console.log(\`Hi, I'm \${this.name}\`);
};

const ayush = new Person("Ayush", 22);
const kumar = new Person("Kumar", 25);

ayush.greet(); // "Hi, I'm Ayush"
kumar.greet(); // "Hi, I'm Kumar"

// Both share the same greet method (not duplicated in memory)
console.log(ayush.greet === kumar.greet); // true
\`\`\`

**The prototype chain lookup:**
\`\`\`javascript
// When you access a property, JS searches:
// 1. Own properties of the object
// 2. Prototype of the object
// 3. Prototype's prototype
// ... up to Object.prototype
// 4. null — end of chain, returns undefined

console.log(ayush.hasOwnProperty('name'));  // true — own
console.log(ayush.hasOwnProperty('greet')); // false — on prototype
\`\`\`

**ES6 \`class\` — syntactic sugar over prototypes:**
\`\`\`javascript
class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(\`\${this.name} makes a sound\`); }
}

class Dog extends Animal {
  speak() { console.log(\`\${this.name} barks\`); }
}

const d = new Dog("Rex");
d.speak(); // "Rex barks"
// Under the hood, this is still prototypal inheritance
\`\`\``,
    difficulty: 'advanced',
    category: 'OOP',
    tags: ['prototype', 'inheritance', 'prototype-chain', 'oop', 'class', 'extends'],
  },
  {
    id: 'js-12',
    question: 'What is the difference between `call()`, `apply()`, and `bind()`?',
    answer: `All three methods explicitly set \`this\` for a function, but differ in when and how the function is called.

**\`call()\`** — invokes immediately, arguments passed one by one:
\`\`\`javascript
function introduce(greeting, punctuation) {
  console.log(\`\${greeting}, I'm \${this.name}\${punctuation}\`);
}

const person = { name: "Ayush" };

introduce.call(person, "Hello", "!"); // "Hello, I'm Ayush!"
\`\`\`

**\`apply()\`** — invokes immediately, arguments passed as an array:
\`\`\`javascript
introduce.apply(person, ["Hi", "."]);  // "Hi, I'm Ayush."

// apply is useful when arguments are already in an array
const numbers = [5, 1, 8, 3, 9];
const max = Math.max.apply(null, numbers); // 9
// Modern equivalent: Math.max(...numbers)
\`\`\`

**\`bind()\`** — returns a NEW function with \`this\` permanently bound, doesn't call immediately:
\`\`\`javascript
const boundIntroduce = introduce.bind(person, "Hey");
// Not called yet — returns a function

boundIntroduce("?"); // "Hey, I'm Ayush?" — first arg was pre-filled

// Common use case: preserve this in callbacks
class Timer {
  constructor() { this.seconds = 0; }

  start() {
    // Without bind, this = window inside setInterval callback
    setInterval(this.tick.bind(this), 1000);
  }

  tick() { this.seconds++; console.log(this.seconds); }
}
\`\`\`

**Summary:**

| Method | Calls Immediately | Arguments |
|--------|------------------|-----------|
| \`call\` | Yes | Comma-separated |
| \`apply\` | Yes | Array |
| \`bind\` | No (returns fn) | Comma-separated (partial application) |`,
    difficulty: 'intermediate',
    category: 'Functions',
    tags: ['call', 'apply', 'bind', 'this', 'context', 'functions'],
  },
  {
    id: 'js-13',
    question: 'What are JavaScript data types?',
    answer: `JavaScript has **8 data types**: 7 **primitive** types and 1 **non-primitive** (Object).

**Primitive types** — immutable, stored by value:
\`\`\`javascript
// 1. Number — integers and floats (64-bit IEEE 754)
let age = 25;
let price = 9.99;
let infinity = Infinity;
let notANumber = NaN;

// 2. String — text
let name = "Ayush";
let template = \`Hello \${name}\`;

// 3. Boolean
let isLoggedIn = true;

// 4. undefined — no value assigned
let x;
console.log(x); // undefined

// 5. null — intentional empty value
let user = null;

// 6. BigInt — integers larger than 2^53 - 1 (ES2020)
let bigNum = 9007199254740993n;

// 7. Symbol — unique, immutable identifier (ES6)
const id = Symbol("id");
const id2 = Symbol("id");
console.log(id === id2); // false — always unique
\`\`\`

**Non-Primitive (Reference type):**
\`\`\`javascript
// 8. Object (includes arrays, functions, dates, etc.)
const obj = { name: "Ayush" };
const arr = [1, 2, 3];
function greet() {}
const date = new Date();

typeof obj;     // "object"
typeof arr;     // "object"
typeof greet;   // "function" (special case)
typeof null;    // "object"  (historical bug)
\`\`\`

**Primitive vs Reference — stored by value vs reference:**
\`\`\`javascript
// Primitives — copied by value
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 — unchanged

// Objects — copied by reference
let obj1 = { name: "Ayush" };
let obj2 = obj1;
obj2.name = "Kumar";
console.log(obj1.name); // "Kumar" — both point to same object!

// Deep copy to avoid this:
let obj3 = { ...obj1 };      // spread (shallow)
let obj4 = structuredClone(obj1); // deep clone (ES2022)
\`\`\``,
    difficulty: 'beginner',
    category: 'Types',
    tags: ['data-types', 'primitive', 'object', 'typeof', 'bigint', 'symbol'],
  },
  {
    id: 'js-14',
    question: 'What is destructuring in JavaScript?',
    answer: `**Destructuring** lets you unpack values from arrays or properties from objects into distinct variables in a concise syntax.

**Array Destructuring:**
\`\`\`javascript
const colors = ["red", "green", "blue"];

// Old way
const first = colors[0];
const second = colors[1];

// Destructuring
const [first, second, third] = colors;
console.log(first);  // "red"
console.log(third);  // "blue"

// Skip elements
const [, , blue] = colors;

// Default values
const [a = "default", b = "fallback"] = ["only-a"];
console.log(b); // "fallback"

// Swap variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2, 1

// Rest element
const [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]
\`\`\`

**Object Destructuring:**
\`\`\`javascript
const user = { name: "Ayush", age: 22, role: "admin" };

const { name, age } = user;
console.log(name); // "Ayush"

// Rename while destructuring
const { name: userName, role: userRole } = user;
console.log(userName); // "Ayush"

// Default values
const { score = 0, level = 1 } = user;
console.log(score); // 0

// Rest properties
const { name: n, ...rest } = user;
console.log(rest); // { age: 22, role: "admin" }

// Nested destructuring
const { address: { city, country } } = {
  address: { city: "Delhi", country: "India" }
};
\`\`\`

**Function parameters:**
\`\`\`javascript
// Old way
function greet(user) {
  console.log(user.name, user.age);
}

// With destructuring
function greet({ name, age, role = "user" }) {
  console.log(name, age, role);
}

greet({ name: "Ayush", age: 22 }); // "Ayush" 22 "user"
\`\`\``,
    difficulty: 'intermediate',
    category: 'ES6+',
    tags: ['destructuring', 'arrays', 'objects', 'es6', 'spread', 'rest'],
  },
  {
    id: 'js-15',
    question: 'What is the spread operator and rest parameters?',
    answer: `Both use \`...\` syntax but in opposite directions.

**Spread operator** — expands an iterable into individual elements:
\`\`\`javascript
// Expand array
const nums = [1, 2, 3];
console.log(Math.max(...nums)); // 3

// Merge arrays
const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b];     // [1, 2, 3, 4]
const withExtra = [0, ...a, 2.5, ...b, 5]; // [0, 1, 2, 2.5, 3, 4, 5]

// Copy array (shallow)
const copy = [...nums];
copy.push(4);
console.log(nums); // [1, 2, 3] — original unchanged

// Spread into function call
function add(x, y, z) { return x + y + z; }
add(...nums); // 6

// Spread object (shallow copy / merge)
const user = { name: "Ayush", age: 22 };
const updated = { ...user, age: 23, role: "admin" };
// { name: "Ayush", age: 23, role: "admin" }

// Convert string to array of characters
const chars = [..."hello"]; // ["h", "e", "l", "l", "o"]

// Convert Set to array
const unique = [...new Set([1, 2, 2, 3, 3])]; // [1, 2, 3]
\`\`\`

**Rest parameters** — collects remaining arguments into an array:
\`\`\`javascript
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3);       // 6
sum(1, 2, 3, 4, 5); // 15

// Rest must be last parameter
function log(level, ...messages) {
  console.log(\`[\${level}]\`, messages.join(" "));
}
log("INFO", "User", "logged", "in"); // "[INFO] User logged in"

// Rest in destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(rest); // [3, 4, 5]

const { a: x, b: y, ...others } = { a: 1, b: 2, c: 3, d: 4 };
console.log(others); // { c: 3, d: 4 }
\`\`\``,
    difficulty: 'intermediate',
    category: 'ES6+',
    tags: ['spread', 'rest', 'es6', 'arrays', 'objects', 'functions'],
  },
  {
    id: 'js-16',
    question: 'What is `typeof` and how does type checking work in JavaScript?',
    answer: `**\`typeof\`** is a unary operator that returns a string indicating the type of a value.

\`\`\`javascript
typeof 42            // "number"
typeof 3.14          // "number"
typeof NaN           // "number" (surprising!)
typeof "hello"       // "string"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof Symbol()      // "symbol"
typeof 42n           // "bigint"
typeof {}            // "object"
typeof []            // "object" (arrays are objects)
typeof null          // "object" (historical bug in JS)
typeof function(){}  // "function" (special case)
\`\`\`

**Better type checking:**
\`\`\`javascript
// Check for null specifically
value === null

// Check for array
Array.isArray([1, 2, 3])    // true
Array.isArray("string")     // false

// Check for NaN
Number.isNaN(NaN)           // true
Number.isNaN("NaN")         // false (unlike global isNaN which coerces)
isNaN("hello")              // true — global isNaN coerces to number first

// Check constructor
[] instanceof Array         // true
{} instanceof Object        // true
new Date() instanceof Date  // true

// Most reliable — Object.prototype.toString
Object.prototype.toString.call([])        // "[object Array]"
Object.prototype.toString.call(null)      // "[object Null]"
Object.prototype.toString.call(new Date())// "[object Date]"
Object.prototype.toString.call(/regex/)   // "[object RegExp]"
\`\`\`

**Practical type guard pattern:**
\`\`\`javascript
function isString(val) { return typeof val === "string"; }
function isNumber(val) { return typeof val === "number" && !isNaN(val); }
function isObject(val) { return val !== null && typeof val === "object"; }
function isArray(val) { return Array.isArray(val); }
\`\`\``,
    difficulty: 'beginner',
    category: 'Types',
    tags: ['typeof', 'type-checking', 'instanceof', 'Array.isArray', 'types'],
  },
  {
    id: 'js-17',
    question: 'What are higher-order functions? Explain `map`, `filter`, and `reduce`.',
    answer: `A **higher-order function** is a function that either takes a function as an argument or returns a function. This is a core concept in functional programming.

**\`map()\`** — transforms each element, returns new array of same length:
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const users = [
  { id: 1, name: "Ayush" },
  { id: 2, name: "Kumar" }
];
const names = users.map(user => user.name);
console.log(names); // ["Ayush", "Kumar"]
\`\`\`

**\`filter()\`** — keeps elements where callback returns true:
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5, 6];

const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]

const adults = users.filter(user => user.age >= 18);
\`\`\`

**\`reduce()\`** — folds array into a single value:
\`\`\`javascript
// reduce(callback(accumulator, currentValue), initialValue)
const sum = [1, 2, 3, 4, 5].reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// Build an object from array
const cart = [
  { name: "Apple", price: 1.5 },
  { name: "Banana", price: 0.5 },
  { name: "Cherry", price: 3.0 }
];

const total = cart.reduce((sum, item) => sum + item.price, 0); // 5.0

// Group by
const groupedByCategory = products.reduce((groups, product) => {
  const key = product.category;
  if (!groups[key]) groups[key] = [];
  groups[key].push(product);
  return groups;
}, {});
\`\`\`

**Chaining:**
\`\`\`javascript
const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .filter(n => n % 2 === 0)   // [2, 4, 6, 8, 10]
  .map(n => n * n)             // [4, 16, 36, 64, 100]
  .reduce((sum, n) => sum + n, 0); // 220
\`\`\``,
    difficulty: 'intermediate',
    category: 'Functional',
    tags: ['higher-order-functions', 'map', 'filter', 'reduce', 'functional', 'arrays'],
  },
  {
    id: 'js-18',
    question: 'What is event delegation and why is it useful?',
    answer: `**Event delegation** is a technique where you attach a single event listener to a **parent element** instead of multiple listeners on each child. It works because DOM events **bubble up** from child to parent.

**Without delegation (inefficient):**
\`\`\`javascript
// Adding 100 listeners for 100 list items
const items = document.querySelectorAll('.list-item');
items.forEach(item => {
  item.addEventListener('click', handleClick);
});
// Problem: dynamically added items won't have listeners
\`\`\`

**With event delegation:**
\`\`\`javascript
// One listener on the parent handles ALL children
const list = document.querySelector('#todo-list');

list.addEventListener('click', function(event) {
  // Check which child was actually clicked
  if (event.target.matches('.list-item')) {
    console.log('Item clicked:', event.target.textContent);
    event.target.classList.toggle('done');
  }

  // Handle delete button inside item
  if (event.target.matches('.delete-btn')) {
    event.target.closest('.list-item').remove();
  }
});

// Dynamically added items work automatically!
const newItem = document.createElement('li');
newItem.className = 'list-item';
newItem.textContent = 'New task';
list.appendChild(newItem); // click will work without new listener
\`\`\`

**Useful event properties:**
\`\`\`javascript
list.addEventListener('click', (e) => {
  e.target          // the element that was actually clicked
  e.currentTarget   // the element with the listener (list in this case)
  e.target.closest('.card')  // walk up DOM to find ancestor
});
\`\`\`

**Benefits:**
- **Memory efficient** — one listener instead of many
- **Dynamic elements** — works for items added after page load
- **Simpler code** — centralized event handling`,
    difficulty: 'intermediate',
    category: 'DOM',
    tags: ['event-delegation', 'event-bubbling', 'DOM', 'events', 'performance'],
  },
  {
    id: 'js-19',
    question: 'What is the difference between `localStorage`, `sessionStorage`, and cookies?',
    answer: `All three store data in the browser, but differ in capacity, lifetime, and accessibility.

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|----------------|---------|
| Capacity | ~5–10MB | ~5–10MB | ~4KB |
| Expiry | Never (until cleared) | Tab/window close | Set manually |
| Sent to server | No | No | Yes (every request) |
| Accessible via JS | Yes | Yes | Yes (unless HttpOnly) |
| Scope | Origin (protocol+domain+port) | Origin + tab | Domain/path configurable |

**localStorage:**
\`\`\`javascript
// Persists until manually cleared
localStorage.setItem("theme", "dark");
localStorage.setItem("user", JSON.stringify({ id: 1, name: "Ayush" }));

const theme = localStorage.getItem("theme"); // "dark"
const user = JSON.parse(localStorage.getItem("user"));

localStorage.removeItem("theme");
localStorage.clear(); // remove all
\`\`\`

**sessionStorage:**
\`\`\`javascript
// Cleared when tab is closed
sessionStorage.setItem("formData", JSON.stringify(formValues));
const saved = JSON.parse(sessionStorage.getItem("formData"));
\`\`\`

**Cookies:**
\`\`\`javascript
// Client-side (limited control)
document.cookie = "token=abc123; path=/; max-age=3600; Secure; SameSite=Strict";

// Cookies are sent automatically with every HTTP request
// Server sets them with: Set-Cookie header
// HttpOnly flag prevents JavaScript access (security)
\`\`\`

**When to use what:**
- **localStorage** — theme preferences, cached data, long-lived settings
- **sessionStorage** — form wizard progress, temp UI state for current tab
- **Cookies** — auth tokens (with HttpOnly+Secure), session IDs, cross-request data`,
    difficulty: 'intermediate',
    category: 'Browser APIs',
    tags: ['localStorage', 'sessionStorage', 'cookies', 'storage', 'browser'],
  },
  {
    id: 'js-20',
    question: 'What is debouncing and throttling?',
    answer: `Both are performance optimization techniques that limit how frequently a function is called.

**Debouncing** — delays execution until after a pause in calls. The timer resets on every call.
\`\`\`javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Search input — only fires 300ms after user stops typing
const searchInput = document.getElementById("search");
const handleSearch = debounce((e) => {
  fetchResults(e.target.value); // API call
}, 300);

searchInput.addEventListener("input", handleSearch);

// Use case: search, form validation, resize handler, autocomplete
\`\`\`

**Throttling** — ensures a function is called at most once per time period, regardless of how many times it's triggered.
\`\`\`javascript
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Scroll handler — fires at most once every 200ms
const handleScroll = throttle(() => {
  updateScrollIndicator();
}, 200);

window.addEventListener("scroll", handleScroll);

// Use case: scroll events, resize, mouse move, button rapid clicks
\`\`\`

**Comparison:**

| | Debounce | Throttle |
|--|----------|----------|
| When it fires | After pause | At regular intervals |
| Best for | Search input, resize end | Scroll, mouse move |
| Middle calls | Dropped | Sampled |`,
    difficulty: 'advanced',
    category: 'Performance',
    tags: ['debounce', 'throttle', 'performance', 'events', 'optimization'],
  },
  {
    id: 'js-21',
    question: 'What are generators and iterators in JavaScript?',
    answer: `**Iterators** are objects with a \`next()\` method that returns \`{ value, done }\`. **Generators** are functions that produce iterators using \`function*\` and \`yield\`.

**Custom iterator:**
\`\`\`javascript
function createRange(start, end) {
  let current = start;
  return {
    next() {
      if (current <= end) {
        return { value: current++, done: false };
      }
      return { value: undefined, done: true };
    },
    [Symbol.iterator]() { return this; }
  };
}

const range = createRange(1, 3);
console.log(range.next()); // { value: 1, done: false }
console.log(range.next()); // { value: 2, done: false }
console.log(range.next()); // { value: 3, done: false }
console.log(range.next()); // { value: undefined, done: true }
\`\`\`

**Generator function — cleaner syntax:**
\`\`\`javascript
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i; // pauses here and returns value
  }
}

const gen = range(1, 5);
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }

// Generators are iterable
for (const num of range(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}

const arr = [...range(1, 5)]; // [1, 2, 3, 4, 5]
\`\`\`

**Infinite generator:**
\`\`\`javascript
function* infiniteId() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const getId = infiniteId();
console.log(getId.next().value); // 1
console.log(getId.next().value); // 2
\`\`\`

**Two-way communication with \`yield\`:**
\`\`\`javascript
function* adder() {
  let total = 0;
  while (true) {
    const num = yield total; // pauses, sends total, receives num
    total += num;
  }
}

const add = adder();
add.next();      // start (first yield)
add.next(5);     // total = 5
add.next(3);     // total = 8
\`\`\``,
    difficulty: 'advanced',
    category: 'ES6+',
    tags: ['generators', 'iterators', 'yield', 'symbol-iterator', 'es6'],
  },
  {
    id: 'js-22',
    question: 'What is the difference between shallow copy and deep copy?',
    answer: `**Shallow copy** copies only the top-level properties. Nested objects/arrays still share the same reference.
**Deep copy** recursively copies all nested values — fully independent.

**Shallow copy methods:**
\`\`\`javascript
const original = {
  name: "Ayush",
  scores: [90, 85, 92],    // nested array
  address: { city: "Delhi" } // nested object
};

// Method 1: Spread
const shallow1 = { ...original };

// Method 2: Object.assign
const shallow2 = Object.assign({}, original);

// Demonstrate the problem
shallow1.name = "Kumar";       // primitive — safe
shallow1.scores.push(95);      // mutates ORIGINAL too!

console.log(original.name);    // "Ayush" — ok
console.log(original.scores);  // [90, 85, 92, 95] — mutated!
\`\`\`

**Deep copy methods:**
\`\`\`javascript
// Method 1: structuredClone (modern — best option, ES2022)
const deep1 = structuredClone(original);
deep1.scores.push(100);
console.log(original.scores); // [90, 85, 92] — untouched!

// Method 2: JSON parse/stringify (simple but has limitations)
const deep2 = JSON.parse(JSON.stringify(original));
// Loses: functions, undefined, Date objects, Map, Set, RegExp, etc.

// Method 3: Recursive function (for full control)
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
  );
}
\`\`\`

**When to use which:**
- **Shallow** — when nested data won't be modified (config objects, simple merges)
- **Deep** — when you need full isolation (state management, undo/redo history)`,
    difficulty: 'intermediate',
    category: 'Core Concepts',
    tags: ['shallow-copy', 'deep-copy', 'structuredClone', 'spread', 'references'],
  },
  {
    id: 'js-23',
    question: 'What are WeakMap and WeakSet and when would you use them?',
    answer: `**WeakMap** and **WeakSet** are collection types whose keys/values are held **weakly** — they don't prevent garbage collection of their keys.

**WeakMap:**
\`\`\`javascript
const weakMap = new WeakMap();

// Keys MUST be objects (not primitives)
let user = { name: "Ayush" };
weakMap.set(user, { sessionData: "xyz" });

console.log(weakMap.get(user)); // { sessionData: "xyz" }
console.log(weakMap.has(user)); // true

user = null; // object is eligible for GC
// weakMap entry is automatically cleaned up — no memory leak!

// WeakMap is NOT iterable — no .size, no forEach, no keys()
\`\`\`

**WeakSet:**
\`\`\`javascript
const weakSet = new WeakSet();

let element = document.getElementById("btn");
weakSet.add(element);

console.log(weakSet.has(element)); // true

element = null; // DOM element removed from memory
// weakSet entry is also garbage collected
\`\`\`

**Practical use cases:**

**1. Private data without memory leaks:**
\`\`\`javascript
const _private = new WeakMap();

class User {
  constructor(name, password) {
    _private.set(this, { password });
    this.name = name;
  }
  checkPassword(input) {
    return _private.get(this).password === input;
  }
}

const u = new User("Ayush", "secret123");
// u.password — undefined (truly private)
u.checkPassword("secret123"); // true
\`\`\`

**2. Tracking DOM nodes without leaking:**
\`\`\`javascript
const processedNodes = new WeakSet();

function processNode(node) {
  if (processedNodes.has(node)) return; // already processed
  processedNodes.add(node);
  // ... do work
}
\`\`\`

**vs Map/Set:**
- \`Map\` keys are strongly referenced — prevents GC
- \`WeakMap\` keys are weakly referenced — GC can reclaim them`,
    difficulty: 'advanced',
    category: 'Data Structures',
    tags: ['WeakMap', 'WeakSet', 'garbage-collection', 'memory', 'es6'],
  },
  {
    id: 'js-24',
    question: 'What is `Symbol` and what are its use cases?',
    answer: `**\`Symbol\`** is a primitive type introduced in ES6. Every Symbol is **unique** and **immutable** — even if two symbols have the same description.

**Creating symbols:**
\`\`\`javascript
const id = Symbol("id");
const id2 = Symbol("id");

console.log(id === id2);      // false — always unique
console.log(id.toString());   // "Symbol(id)"
console.log(id.description);  // "id"
typeof id;                     // "symbol"
\`\`\`

**Use case 1 — Unique object keys (avoid name collisions):**
\`\`\`javascript
const ID = Symbol("id");
const NAME = Symbol("name");

const user = {
  [ID]: 123,
  [NAME]: "Ayush",
  name: "different name property" // no conflict!
};

console.log(user[ID]);   // 123
console.log(user[NAME]); // "Ayush"
console.log(user.name);  // "different name property"

// Symbols are hidden from normal enumeration
Object.keys(user);          // ["name"] — no symbols
JSON.stringify(user);       // {"name":"different name property"} — symbols excluded
Object.getOwnPropertySymbols(user); // [Symbol(id), Symbol(name)]
\`\`\`

**Use case 2 — Well-known symbols to customize JS behavior:**
\`\`\`javascript
class Collection {
  constructor(...items) { this.items = items; }

  // Make iterable with for...of
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        value: this.items[index],
        done: index++ >= this.items.length
      })
    };
  }

  // Customize toString
  get [Symbol.toStringTag]() { return "Collection"; }

  // Used by Array.from, spread
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance.items);
  }
}

const c = new Collection(1, 2, 3);
for (const item of c) console.log(item); // 1, 2, 3
\`\`\`

**Use case 3 — Global shared symbols via \`Symbol.for\`:**
\`\`\`javascript
const s1 = Symbol.for("shared");
const s2 = Symbol.for("shared");
console.log(s1 === s2); // true — registry lookup
\`\`\``,
    difficulty: 'advanced',
    category: 'ES6+',
    tags: ['symbol', 'Symbol.iterator', 'well-known-symbols', 'es6', 'unique'],
  },
  {
    id: 'js-25',
    question: 'What is the module system in JavaScript? Explain `import` and `export`.',
    answer: `JavaScript modules (ES Modules / ESM, ES2015) allow you to split code into files and share functionality between them.

**Named exports — multiple exports per file:**
\`\`\`javascript
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export class Calculator { /* ... */ }

// Can also export at the bottom
function multiply(a, b) { return a * b; }
export { multiply };
\`\`\`

**Named imports:**
\`\`\`javascript
// app.js
import { PI, add, Calculator } from './math.js';
import { add as sum } from './math.js'; // rename
import * as Math from './math.js';      // import everything as namespace

console.log(Math.PI);    // 3.14159
console.log(sum(1, 2));  // 3
\`\`\`

**Default export — one per file:**
\`\`\`javascript
// user.js
export default class User {
  constructor(name) { this.name = name; }
}

// Or:
const config = { apiUrl: "https://api.example.com" };
export default config;
\`\`\`

**Default import:**
\`\`\`javascript
// Can be named anything — no curly braces
import User from './user.js';
import myConfig from './config.js';
\`\`\`

**Mixed exports:**
\`\`\`javascript
// api.js
export default function fetchUser() { /* ... */ }
export const BASE_URL = "https://api.example.com";
export { fetchUser as getUser }; // re-export with alias
\`\`\`

**Dynamic imports (lazy loading):**
\`\`\`javascript
// Load module only when needed
async function loadEditor() {
  const { Editor } = await import('./editor.js');
  return new Editor();
}

// Route-based code splitting in React
const Dashboard = React.lazy(() => import('./Dashboard'));
\`\`\`

**Re-exporting (barrel files):**
\`\`\`javascript
// index.js — single entry point
export { default as Button } from './Button';
export { default as Input } from './Input';
export * from './utils';
\`\`\``,
    difficulty: 'intermediate',
    category: 'Modules',
    tags: ['modules', 'import', 'export', 'esm', 'dynamic-import', 'es6'],
  },
  {
    id: 'js-26',
    question: 'What is the difference between `for...of` and `for...in`?',
    answer: `**\`for...of\`** iterates over **values** of an iterable (arrays, strings, Maps, Sets).
**\`for...in\`** iterates over **enumerable property keys** of an object.

**\`for...of\`:**
\`\`\`javascript
// Arrays — iterates values
const arr = [10, 20, 30];
for (const val of arr) {
  console.log(val); // 10, 20, 30
}

// Strings
for (const char of "hello") {
  console.log(char); // h, e, l, l, o
}

// Map
const map = new Map([["a", 1], ["b", 2]]);
for (const [key, value] of map) {
  console.log(key, value); // "a" 1, "b" 2
}

// Set
for (const item of new Set([1, 2, 3])) {
  console.log(item); // 1, 2, 3
}

// With index — use entries()
for (const [index, val] of arr.entries()) {
  console.log(index, val); // 0 10, 1 20, 2 30
}
\`\`\`

**\`for...in\`:**
\`\`\`javascript
const user = { name: "Ayush", age: 22, role: "admin" };

for (const key in user) {
  console.log(key, user[key]);
  // "name" "Ayush"
  // "age" 22
  // "role" "admin"
}

// WARNING: for...in also iterates inherited properties
function Person(name) { this.name = name; }
Person.prototype.greet = function() {};

const p = new Person("Ayush");
for (const key in p) {
  console.log(key); // "name", "greet" (inherited!)
}

// Fix: check own properties
for (const key in p) {
  if (p.hasOwnProperty(key)) {
    console.log(key); // only "name"
  }
}
\`\`\`

**Summary:**
- Use \`for...of\` for arrays, strings, Maps, Sets (any iterable)
- Use \`for...in\` for plain objects when you need to iterate keys
- Never use \`for...in\` on arrays — order isn't guaranteed and inherited keys leak`,
    difficulty: 'beginner',
    category: 'Loops',
    tags: ['for-of', 'for-in', 'loops', 'iterables', 'objects', 'arrays'],
  },
  {
    id: 'js-27',
    question: 'What is memoization and how do you implement it?',
    answer: `**Memoization** is a performance optimization technique that caches the results of expensive function calls. When the same inputs are seen again, the cached result is returned instead of recomputing.

**Simple memoization:**
\`\`\`javascript
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("Cache hit:", key);
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive Fibonacci without memoization
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
// fib(40) — very slow, exponential time

// With memoization
const memoFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return memoFib(n - 1) + memoFib(n - 2);
});

memoFib(40); // fast — results cached!
\`\`\`

**Using WeakMap for object arguments:**
\`\`\`javascript
function memoizeWithWeakMap(fn) {
  const cache = new WeakMap();
  return function(obj) {
    if (cache.has(obj)) return cache.get(obj);
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}
\`\`\`

**React.useMemo — built-in memoization:**
\`\`\`javascript
const expensiveValue = useMemo(() => {
  return computeExpensiveResult(input);
}, [input]); // recomputes only when input changes
\`\`\`

**When to use memoization:**
- Pure functions (same input always gives same output)
- Expensive computations (fibonacci, sorting, heavy calculations)
- Repeated calls with same arguments
- **Don't use** when: arguments are always unique, computation is cheap, or memory is a concern`,
    difficulty: 'advanced',
    category: 'Performance',
    tags: ['memoization', 'cache', 'performance', 'functional', 'optimization'],
  },
  {
    id: 'js-28',
    question: 'What is the difference between `Object.freeze()`, `Object.seal()`, and `const`?',
    answer: `These three prevent different types of modifications.

**\`const\`** — prevents **reassignment** of the variable binding only. The object itself is still mutable.
\`\`\`javascript
const user = { name: "Ayush" };
user.name = "Kumar";       // Allowed — object is mutable
user.age = 22;             // Allowed — new property
// user = { name: "New" }; // TypeError — can't reassign const
\`\`\`

**\`Object.seal()\`** — prevents adding/removing properties. Existing properties can still be changed.
\`\`\`javascript
const config = Object.seal({ host: "localhost", port: 3000 });

config.port = 8080;       // OK — modifying existing property
config.db = "postgres";   // Silently fails (throws in strict mode)
delete config.host;       // Silently fails

console.log(Object.isSealed(config)); // true
\`\`\`

**\`Object.freeze()\`** — prevents adding, removing, AND modifying properties. Fully immutable (shallow).
\`\`\`javascript
const settings = Object.freeze({ theme: "dark", lang: "en" });

settings.theme = "light";  // Silently fails (throws in strict mode)
settings.size = "lg";      // Silently fails
delete settings.lang;      // Silently fails

console.log(Object.isFrozen(settings)); // true
\`\`\`

**Shallow freeze (nested objects still mutable):**
\`\`\`javascript
const obj = Object.freeze({
  name: "Ayush",
  address: { city: "Delhi" }  // nested object NOT frozen
});

obj.name = "Kumar";           // Fails — top level frozen
obj.address.city = "Mumbai";  // Works! nested object not frozen

// Deep freeze
function deepFreeze(obj) {
  Object.getOwnPropertyNames(obj).forEach(name => {
    const val = obj[name];
    if (typeof val === "object" && val !== null) deepFreeze(val);
  });
  return Object.freeze(obj);
}
\`\`\`

| | const | Object.seal() | Object.freeze() |
|--|-------|--------------|-----------------|
| Add property | Yes | No | No |
| Remove property | Yes | No | No |
| Modify property | Yes | Yes | No |
| Reassign variable | No | Yes | Yes |`,
    difficulty: 'intermediate',
    category: 'Objects',
    tags: ['Object.freeze', 'Object.seal', 'const', 'immutability', 'objects'],
  },
  {
    id: 'js-29',
    question: 'What are Proxy and Reflect in JavaScript?',
    answer: `**Proxy** wraps an object and intercepts fundamental operations on it (get, set, delete, etc.). **Reflect** provides methods to perform those default operations.

**Creating a Proxy:**
\`\`\`javascript
const handler = {
  get(target, property) {
    console.log(\`Getting: \${property}\`);
    return property in target ? target[property] : \`Property '\${property}' not found\`;
  },

  set(target, property, value) {
    if (typeof value !== "number") {
      throw new TypeError(\`\${property} must be a number\`);
    }
    console.log(\`Setting: \${property} = \${value}\`);
    target[property] = value;
    return true; // required for set trap
  },

  deleteProperty(target, property) {
    console.log(\`Deleting: \${property}\`);
    return Reflect.deleteProperty(target, property);
  }
};

const target = { x: 1, y: 2 };
const proxy = new Proxy(target, handler);

proxy.x;             // "Getting: x" → 1
proxy.z;             // "Getting: z" → "Property 'z' not found"
proxy.x = 10;        // "Setting: x = 10"
proxy.x = "hello";   // TypeError: x must be a number
\`\`\`

**Practical use cases:**

**1. Validation:**
\`\`\`javascript
function createValidated(obj, validators) {
  return new Proxy(obj, {
    set(target, key, value) {
      if (validators[key] && !validators[key](value)) {
        throw new Error(\`Invalid value for \${key}: \${value}\`);
      }
      target[key] = value;
      return true;
    }
  });
}

const user = createValidated({}, {
  age: (v) => Number.isInteger(v) && v >= 0 && v <= 150,
  email: (v) => v.includes("@")
});
\`\`\`

**2. Logging / observability:**
\`\`\`javascript
const logged = new Proxy(api, {
  get(target, method) {
    return function(...args) {
      console.log(\`Calling \${method} with\`, args);
      const result = target[method](...args);
      console.log(\`\${method} returned\`, result);
      return result;
    };
  }
});
\`\`\`

**Reflect** mirrors Proxy traps as methods:
\`\`\`javascript
Reflect.get(obj, 'prop');           // obj.prop
Reflect.set(obj, 'prop', value);    // obj.prop = value
Reflect.deleteProperty(obj, 'prop'); // delete obj.prop
Reflect.has(obj, 'prop');           // 'prop' in obj
Reflect.ownKeys(obj);               // Object.getOwnPropertyNames + Symbols
\`\`\``,
    difficulty: 'advanced',
    category: 'Advanced',
    tags: ['proxy', 'reflect', 'meta-programming', 'traps', 'validation', 'es6'],
  },
  {
    id: 'js-30',
    question: 'What is optional chaining (`?.`) and nullish coalescing (`??`)?',
    answer: `Both operators were introduced in ES2020 to handle \`null\`/\`undefined\` values more gracefully.

**Optional Chaining \`?.\`** — short-circuits and returns \`undefined\` if the left side is \`null\` or \`undefined\`, instead of throwing a TypeError.

\`\`\`javascript
const user = {
  name: "Ayush",
  address: {
    city: "Delhi"
  },
  getGreeting: () => "Hello!"
};

// Without optional chaining (verbose and error-prone)
const city = user && user.address && user.address.city;

// With optional chaining
const city = user?.address?.city;          // "Delhi"
const zip = user?.address?.zipCode;        // undefined (no error!)
const country = user?.location?.country;   // undefined

// With methods
user?.getGreeting();     // "Hello!"
user?.nonExistent?.();   // undefined (not an error)

// With arrays
const firstTag = user?.tags?.[0];          // undefined

// With function calls
const result = obj?.method?.();

// Practical: API response
const userName = response?.data?.user?.profile?.name ?? "Anonymous";
\`\`\`

**Nullish Coalescing \`??\`** — returns the right side only if left side is \`null\` or \`undefined\` (not other falsy values).

\`\`\`javascript
// ?? vs || key difference
const score = 0;

score || 100;    // 100 — because 0 is falsy
score ?? 100;    // 0   — because 0 is NOT null/undefined

const name = "";
name || "Anonymous";  // "Anonymous" — empty string is falsy
name ?? "Anonymous";  // ""          — empty string is not null/undefined

// Practical examples
const port = config.port ?? 3000;         // use 3000 only if config.port is null/undefined
const timeout = settings.timeout ?? 5000;

// Nullish assignment ??=
let user = null;
user ??= "Guest";     // assigns only if null/undefined
console.log(user);    // "Guest"

let count = 0;
count ??= 10;
console.log(count);   // 0 — not assigned because 0 is not null/undefined

// Logical OR assignment ||=
count ||= 10;
console.log(count);   // 10 — assigned because 0 is falsy
\`\`\``,
    difficulty: 'beginner',
    category: 'ES6+',
    tags: ['optional-chaining', 'nullish-coalescing', 'es2020', 'null', 'undefined'],
  },
];
