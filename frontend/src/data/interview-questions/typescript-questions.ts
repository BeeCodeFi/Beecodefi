import { InterviewQuestion } from './html-questions';

export const typescriptInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'ts-1',
    question: 'What is TypeScript and why should you use it?',
    answer: `**TypeScript** is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It's a superset of JavaScript that adds static type definitions.

**Key Benefits:**
- **Type Safety** — Catch errors at compile-time instead of runtime
- **Better IDE Support** — Autocomplete, type hints, and refactoring
- **Improved Readability** — Types serve as documentation
- **Easier Refactoring** — Type system ensures changes don't break existing code
- **Modern JavaScript** — Access to latest ES features while maintaining compatibility

**Basic Example:**
\`\`\`typescript
// JavaScript — no type checking
function greet(name) {
  return "Hello, " + name;
}

greet(123); // Works but might cause issues

// TypeScript — type checking
function greet(name: string): string {
  return "Hello, " + name;
}

greet(123); // Error: Argument of type 'number' is not assignable to parameter of type 'string'
\`\`\`

**Compilation Process:**
\`\`\`typescript
// TypeScript code (.ts)
const message: string = "Hello";

// Compiled to JavaScript (.js)
var message = "Hello";
\`\`\`

**When to Use TypeScript:**
- Large codebases
- Team projects
- Long-term maintenance
- Complex applications
- When you need better tooling and error detection`,
    difficulty: 'beginner',
    category: 'Basics',
    tags: ['fundamentals', 'introduction', 'type-safety', 'benefits'],
  },
  {
    id: 'ts-2',
    question: 'What are the basic types in TypeScript?',
    answer: `TypeScript includes several basic types that cover common JavaScript values:

**Primitive Types:**

\`\`\`typescript
// String
let name: string = "John";

// Number (all numbers are floating-point)
let age: number = 25;
let pi: number = 3.14;

// Boolean
let isActive: boolean = true;

// BigInt
let bigNumber: bigint = 100n;

// Symbol
let sym: symbol = Symbol("id");
\`\`\`

**Special Types:**

\`\`\`typescript
// Any — disables type checking (use sparingly)
let anything: any = "could be anything";
anything = 123; // No error

// Unknown — safer alternative to any
let value: unknown = "unknown";
if (typeof value === "string") {
  console.log(value.toUpperCase()); // Safe after type guard
}

// Void — absence of any type
function log(message: string): void {
  console.log(message);
}

// Never — values that never occur
function error(message: string): never {
  throw new Error(message);
}

// Null and Undefined
let nothing: null = null;
let notDefined: undefined = undefined;
\`\`\`

**Type Inference:**
\`\`\`typescript
// TypeScript infers the type
let message = "Hello"; // inferred as string
let count = 42; // inferred as number

// Explicit types (recommended for function parameters)
function add(a: number, b: number): number {
  return a + b;
}
\`\`\`

**Best Practice:** Let TypeScript infer types when possible, but explicitly type function parameters and return types.`,
    difficulty: 'beginner',
    category: 'Types',
    tags: ['types', 'primitives', 'type-inference', 'basics'],
  },
  {
    id: 'ts-3',
    question: 'What is the difference between interface and type aliases?',
    answer: `**Interfaces** and **type aliases** are similar but have some key differences in TypeScript.

**Type Alias:**
\`\`\`typescript
type User = {
  id: number;
  name: string;
  email: string;
};

// Union types
type ID = string | number;

// Tuple types
type Coordinate = [number, number];

// Primitive types
type Score = number;
\`\`\`

**Interface:**
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Can extend other interfaces
interface AdminUser extends User {
  permissions: string[];
}

// Can implement in classes
class UserService implements User {
  id = 1;
  name = "John";
  email = "john@example.com";
}
\`\`\`

**Key Differences:**

| Feature | Interface | Type Alias |
|---------|-----------|------------|
| Extends | Can extend interfaces/types | Can extend with \`&\` |
| Declaration Merging | ✅ Yes | ❌ No |
| Implements | Can be implemented by classes | Cannot be implemented |
| Union Types | ❌ No | ✅ Yes |
| Tuple Types | ❌ No | ✅ Yes |
| Mapped Types | ❌ No | ✅ Yes |

**Declaration Merging (Interfaces only):**
\`\`\`typescript
interface User {
  id: number;
}

interface User {
  name: string;
}

// Result: User has both id and name
const user: User = {
  id: 1,
  name: "John"
};
\`\`\`

**When to Use Each:**

**Use Interfaces:**
- Defining object shapes
- API contracts
- Class implementations
- When you might need declaration merging

**Use Type Aliases:**
- Union types
- Tuple types
- Primitive aliases
- Complex type combinations
- Mapped types

**Best Practice:** Use interfaces for object shapes that might be extended or implemented. Use type aliases for unions, tuples, and complex type compositions.`,
    difficulty: 'intermediate',
    category: 'Types',
    tags: ['interface', 'type-alias', 'types', 'declaration-merging'],
  },
  {
    id: 'ts-4',
    question: 'What are type annotations and type inference in TypeScript?',
    answer: `**Type annotations** explicitly specify the type of a variable, parameter, or return value. **Type inference** is TypeScript's ability to automatically deduce types based on the assigned value.

**Type Annotations:**
\`\`\`typescript
// Variable annotation
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;

// Function parameter and return type annotations
function greet(name: string): string {
  return "Hello, " + name;
}

// Array annotation
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];
\`\`\`

**Type Inference:**
\`\`\`typescript
// TypeScript infers the type from the value
let message = "Hello"; // inferred as string
let count = 42; // inferred as number
let isActive = true; // inferred as boolean

// Function return type inference
function add(a: number, b: number) {
  return a + b; // inferred as number
}
\`\`\`

**Best Practices:**

**1. Use inference for simple cases:**
\`\`\`typescript
// ✅ Good — TypeScript infers the type
const user = { name: "John", age: 25 };

// ❌ Unnecessary — explicit type when inferred is obvious
const user: { name: string; age: number } = { name: "John", age: 25 };
\`\`\`

**2. Use annotations for function parameters:**
\`\`\`typescript
// ✅ Good — explicit parameter types
function calculateArea(width: number, height: number) {
  return width * height;
}

// ❌ Bad — no parameter types
function calculateArea(width, height) {
  return width * height;
}
\`\`\`

**3. Use annotations for return types when unclear:**
\`\`\`typescript
// ✅ Good — explicit return type
function getUser(): User {
  return { id: 1, name: "John" };
}

// ✅ Good — inference is clear
function add(a: number, b: number) {
  return a + b;
}
\`\`\`

**Contextual Typing:**
\`\`\`typescript
// TypeScript infers type based on context
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.button); // mouseEvent is inferred as MouseEvent
};
\`\`\`

**Summary:** Use type inference when the type is obvious. Use explicit annotations for function parameters and when the type isn't clear from context.`,
    difficulty: 'beginner',
    category: 'Types',
    tags: ['type-annotations', 'type-inference', 'types', 'best-practices'],
  },
  {
    id: 'ts-5',
    question: 'What are union and intersection types in TypeScript?',
    answer: `**Union types** allow a value to be one of several types. **Intersection types** combine multiple types into one.

**Union Types (|):**
\`\`\`typescript
// A value can be string OR number
type ID = string | number;

function printId(id: ID) {
  console.log("Your ID is: " + id);
}

printId("123"); // Works
printId(123); // Works
printId(true); // Error
\`\`\`

**Union Type Narrowing:**
\`\`\`typescript
function printLength(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(value.length);
  } else {
    // TypeScript knows value is number here
    console.log(value.toString().length);
  }
}
\`\`\`

**Discriminated Unions:**
\`\`\`typescript
type SuccessResponse = {
  status: "success";
  data: string;
};

type ErrorResponse = {
  status: "error";
  error: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log(response.data); // TypeScript knows this exists
  } else {
    console.log(response.error); // TypeScript knows this exists
  }
}
\`\`\`

**Intersection Types (&):**
\`\`\`typescript
type Name = {
  name: string;
};

type Age = {
  age: number;
};

type Person = Name & Age;

const person: Person = {
  name: "John",
  age: 25
};
\`\`\`

**Intersection with Interfaces:**
\`\`\`typescript
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;

// Equivalent to:
interface Person extends HasName, HasAge {}
\`\`\`

**Common Use Cases:**

**Union Types:**
- Function parameters that accept multiple types
- API responses that can have different shapes
- Optional properties
- Configuration objects

**Intersection Types:**
- Combining multiple interfaces
- Mixin patterns
- Adding functionality to existing types
- Complex type compositions

**Practical Example:**
\`\`\`typescript
// Union for different event types
type ClickEvent = {
  type: "click";
  x: number;
  y: number;
};

type KeyEvent = {
  type: "keydown" | "keyup";
  key: string;
};

type UIEvent = ClickEvent | KeyEvent;

function handleEvent(event: UIEvent) {
  if (event.type === "click") {
    console.log(\`Clicked at \${event.x}, \${event.y}\`);
  } else {
    console.log(\`Key: \${event.key}\`);
  }
}
\`\`\``,
    difficulty: 'intermediate',
    category: 'Types',
    tags: ['union-types', 'intersection-types', 'types', 'advanced-types'],
  },
  {
    id: 'ts-6',
    question: 'What are enums in TypeScript and how do you use them?',
    answer: `**Enums** allow you to define a set of named constants. They can be numeric or string-based.

**Numeric Enums:**
\`\`\`typescript
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

// Using the enum
let move: Direction = Direction.Up;

// Can also specify custom values
enum Status {
  Pending = 1,
  InProgress = 2,
  Completed = 3
}
\`\`\`

**String Enums:**
\`\`\`typescript
enum LogLevel {
  Error = "ERROR",
  Warning = "WARNING",
  Info = "INFO",
  Debug = "DEBUG"
}

function log(message: string, level: LogLevel) {
  console.log(\`[\${level}] \${message}\`);
}

log("Server started", LogLevel.Info);
\`\`\`

**Const Enums:**
\`\`\`typescript
const enum Direction {
  Up,
  Down,
  Left,
  Right
}

// Compiled to inline values (no runtime enum)
let move = Direction.Up; // becomes: let move = 0
\`\`\`

**Computed Enum Values:**
\`\`\`typescript
enum FileAccess {
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write
}

console.log(FileAccess.Read);    // 2
console.log(FileAccess.Write);   // 4
console.log(FileAccess.ReadWrite); // 6
\`\`\`

**Reverse Mapping (Numeric Enums):**
\`\`\`typescript
enum Direction {
  Up = 1,
  Down
}

console.log(Direction.Up);    // 1
console.log(Direction[1]);    // "Up" (reverse mapping)
\`\`\`

**When to Use Enums:**
- When you have a fixed set of related values
- For constants that represent states or options
- When you want better type safety than plain strings
- For bit flags and computed values

**When NOT to Use Enums:**
- For simple string constants (use string literals instead)
- When you need tree-shaking (enums can't be tree-shaken)
- When working with libraries that don't support TypeScript enums

**Alternative: String Literal Types:**
\`\`\`typescript
// Instead of enum
type Direction = "up" | "down" | "left" | "right";

// Better for tree-shaking and simpler use
let move: Direction = "up";
\`\`\`

**Best Practice:** Use string enums for human-readable constants. Use const enums for performance-critical code. Consider string literal types for simple cases.`,
    difficulty: 'intermediate',
    category: 'Types',
    tags: ['enums', 'constants', 'types', 'numeric', 'string'],
  },
  {
    id: 'ts-7',
    question: 'What are tuples in TypeScript?',
    answer: `**Tuples** are array-like structures where each element has a specific type at a specific position.

**Basic Tuple:**
\`\`\`typescript
// Define a tuple with specific types for each position
let person: [string, number] = ["John", 25];

// Access elements
console.log(person[0]); // "John"
console.log(person[1]); // 25

// Type safety
person[0] = "Jane"; // ✅ OK
person[1] = 30;    // ✅ OK
person[0] = 123;   // ❌ Error - must be string
\`\`\`

**Named Tuples:**
\`\`\`typescript
type Person = [name: string, age: number, isActive: boolean];

let user: Person = ["John", 25, true];
\`\`\`

**Optional Tuple Elements:**
\`\`\`typescript
type OptionalTuple = [string, number?];

let tuple1: OptionalTuple = ["only string"];
let tuple2: OptionalTuple = ["string", 123];
\`\`\`

**Rest Elements in Tuples:**
\`\`\`typescript
type StringNumberBooleans = [string, number, ...boolean[]];
let tuple: StringNumberBooleans = ["hello", 1, true, false, true];
\`\`\`

**Destructuring Tuples:**
\`\`\`typescript
let person: [string, number] = ["John", 25];

const [name, age] = person;
console.log(name); // "John"
console.log(age);  // 25
\`\`\`

**Common Use Cases:**

**1. Return multiple values:**
\`\`\`typescript
function getUser(): [string, number, boolean] {
  return ["John", 25, true];
}

const [name, age, isActive] = getUser();
\`\`\`

**2. Key-value pairs:**
\`\`\`typescript
type KeyValuePair = [string, any];

const data: KeyValuePair[] = [
  ["name", "John"],
  ["age", 25],
  ["active", true]
];
\`\`\`

**3. Fixed-length arrays:**
\`\`\`typescript
type RGB = [number, number, number];

const color: RGB = [255, 0, 0]; // Red
\`\`\`

**Tuple vs Array:**
\`\`\`typescript
// Array - same type for all elements
let numbers: number[] = [1, 2, 3];

// Tuple - different types for each position
let mixed: [string, number, boolean] = ["hello", 42, true];
\`\`\`

**Best Practice:** Use tuples when you need a fixed-length array with specific types at each position. Use arrays for collections of the same type.`,
    difficulty: 'intermediate',
    category: 'Types',
    tags: ['tuples', 'arrays', 'types', 'destructuring'],
  },
  {
    id: 'ts-8',
    question: 'What are type assertions in TypeScript?',
    answer: `**Type assertions** (also called type casting) tell TypeScript to treat a value as a specific type. They don't change the runtime value, only the compile-time type checking.

**Angle Bracket Syntax:**
\`\`\`typescript
let value: any = "Hello World";

let length: number = (<string>value).length;
\`\`\`

**as Syntax (Preferred in JSX):**
\`\`\`typescript
let value: any = "Hello World";

let length: number = (value as string).length;
\`\`\`

**Common Use Cases:**

**1. DOM elements:**
\`\`\`typescript
const button = document.getElementById("myButton") as HTMLButtonElement;
button.click(); // TypeScript knows this is a button
\`\`\`

**2. Narrowing types:**
\`\`\`typescript
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript already knows it's a string
    console.log(value.toUpperCase());
  } else {
    // Force TypeScript to treat as number
    console.log((value as number).toFixed(2));
  }
}
\`\`\`

**3. API responses:**
\`\`\`typescript
interface User {
  id: number;
  name: string;
}

const response = await fetch("/api/user");
const user = (await response.json()) as User;
\`\`\`

**Const Assertions:**
\`\`\`typescript
// Without const assertion
let colors = ["red", "green", "blue"]; // type: string[]
colors.push("yellow"); // Allowed

// With const assertion
let colors = ["red", "green", "blue"] as const;
// type: readonly ["red", "green", "blue"]
colors.push("yellow"); // Error
\`\`\`

**Non-null Assertions (!):**
\`\`\`typescript
function getElement(id: string): HTMLElement | null {
  return document.getElementById(id);
}

const button = getElement("myButton");
button.click(); // Error - might be null

button!.click(); // OK - asserts it's not null
\`\`\`

**⚠️ Important Warnings:**

**Type assertions can be unsafe:**
\`\`\`typescript
let value: any = "Hello";
let number = value as number; // No error at compile time
console.log(number.toFixed(2)); // Runtime error!
\`\`\`

**Use type guards instead when possible:**
\`\`\`typescript
// ❌ Unsafe assertion
function process(value: unknown) {
  console.log((value as string).length);
}

// ✅ Safe type guard
function process(value: unknown) {
  if (typeof value === "string") {
    console.log(value.length);
  }
}
\`\`\`

**Best Practice:** Use type assertions sparingly. Prefer type guards and proper type checking. Use assertions only when you're certain about the type at runtime.`,
    difficulty: 'intermediate',
    category: 'Types',
    tags: ['type-assertions', 'type-casting', 'types', 'type-guards'],
  },
  {
    id: 'ts-9',
    question: 'What are type guards in TypeScript?',
    answer: `**Type guards** are expressions that perform runtime checks to narrow down the type of a variable within a conditional block.

**typeof Type Guard:**
\`\`\`typescript
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
  }
}
\`\`\`

**instanceof Type Guard:**
\`\`\`typescript
class Dog {
  bark() { console.log("Woof!"); }
}

class Cat {
  meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows it's a Dog
  } else {
    animal.meow(); // TypeScript knows it's a Cat
  }
}
\`\`\`

**in Operator Type Guard:**
\`\`\`typescript
interface Bird {
  fly(): void;
}

interface Fish {
  swim(): void;
}

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly(); // TypeScript knows it's a Bird
  } else {
    animal.swim(); // TypeScript knows it's a Fish
  }
}
\`\`\`

**Custom Type Guards:**
\`\`\`typescript
interface User {
  name: string;
  email: string;
}

interface Admin {
  name: string;
  permissions: string[];
}

function isAdmin(person: User | Admin): person is Admin {
  return (person as Admin).permissions !== undefined;
}

function greet(person: User | Admin) {
  if (isAdmin(person)) {
    console.log(\`Admin \${person.name} with permissions: \${person.permissions.join(", ")}\`);
  } else {
    console.log(\`User \${person.name}\`);
  }
}
\`\`\`

**Discriminated Union Type Guard:**
\`\`\`typescript
type SuccessResponse = {
  status: "success";
  data: string;
};

type ErrorResponse = {
  status: "error";
  error: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log(response.data); // TypeScript knows this exists
  } else {
    console.log(response.error); // TypeScript knows this exists
  }
}
\`\`\`

**Equality Type Guard:**
\`\`\`typescript
type Value = string | number | boolean;

function process(value: Value) {
  if (value === true) {
    // TypeScript knows value is true here
    console.log("It's true!");
  } else if (value === false) {
    // TypeScript knows value is false here
    console.log("It's false!");
  } else if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
  }
}
\`\`\`

**Best Practice:** Use type guards instead of type assertions when possible. They provide runtime safety and better type narrowing.`,
    difficulty: 'intermediate',
    category: 'Types',
    tags: ['type-guards', 'type-narrowing', 'types', 'runtime-checks'],
  },
  {
    id: 'ts-10',
    question: 'What are generics in TypeScript?',
    answer: `**Generics** allow you to create reusable components that work with a variety of types while maintaining type safety.

**Basic Generic Function:**
\`\`\`typescript
// Without generics — loses type information
function identity(arg: any): any {
  return arg;
}

// With generics — preserves type information
function identity<T>(arg: T): T {
  return arg;
}

// Usage
let output1 = identity<string>("Hello"); // type: string
let output2 = identity(123); // type: number (inferred)
\`\`\`

**Generic Interfaces:**
\`\`\`typescript
interface Box<T> {
  contents: T;
}

let stringBox: Box<string> = { contents: "Hello" };
let numberBox: Box<number> = { contents: 123 };
\`\`\`

**Generic Classes:**
\`\`\`typescript
class Storage<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T {
    return this.items[index];
  }
}

const stringStorage = new Storage<string>();
stringStorage.add("Hello");
stringStorage.add(123); // Error
\`\`\`

**Generic Constraints:**
\`\`\`typescript
interface Lengthwise {
  length: number;
}

// Constrain T to have a length property
function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("Hello"); // Works (string has length)
logLength([1, 2, 3]); // Works (array has length)
logLength(123); // Error (number doesn't have length)
\`\`\`

**Multiple Type Parameters:**
\`\`\`typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair("hello", 123); // type: [string, number]
\`\`\`

**Generic Type Defaults:**
\`\`\`typescript
interface Box<T = string> {
  contents: T;
}

let defaultBox: Box = { contents: "Hello" }; // T is string
let numberBox: Box<number> = { contents: 123 }; // T is number
\`\`\`

**Use Cases:**

**1. API responses:**
\`\`\`typescript
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

interface User {
  id: number;
  name: string;
}

const user = await fetchData<User>("/api/user");
\`\`\`

**2. Data structures:**
\`\`\`typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}
\`\`\`

**3. Utility functions:**
\`\`\`typescript
function first<T>(array: T[]): T | undefined {
  return array[0];
}

function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}
\`\`\`

**Best Practice:** Use generics when you need to write code that works with multiple types while maintaining type safety. Keep generics simple and well-documented.`,
    difficulty: 'advanced',
    category: 'Generics',
    tags: ['generics', 'type-safety', 'reusability', 'constraints'],
  },
  {
    id: 'ts-11',
    question: 'What are utility types in TypeScript?',
    answer: `**Utility types** are built-in generic types that transform other types to make common type manipulations easier.

**Partial<T> — Makes all properties optional:**
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(id: number, updates: Partial<User>) {
  // updates can have any subset of User properties
  // ...
}

updateUser(1, { name: "John" }); // Only update name
\`\`\`

**Required<T> — Makes all properties required:**
\`\`\`typescript
interface User {
  id?: number;
  name?: string;
}

type CompleteUser = Required<User>;
// All properties are now required
\`\`\`

**Readonly<T> — Makes all properties readonly:**
\`\`\`typescript
interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = { name: "John", age: 25 };
user.name = "Jane"; // Error
\`\`\`

**Record<K, T> — Creates an object type with keys of K and values of T:**
\`\`\`typescript
type UserRoles = Record<string, boolean>;

const roles: UserRoles = {
  admin: true,
  user: false,
  guest: false
};
\`\`\`

**Pick<T, K> — Picks specific properties:**
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserSummary = Pick<User, "id" | "name">;
// { id: number; name: string }
\`\`\`

**Omit<T, K> — Omits specific properties:**
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, "password">;
// { id: number; name: string; email: string }
\`\`\`

**Exclude<T, U> — Excludes types from a union:**
\`\`\`typescript
type AllTypes = string | number | boolean;

type WithoutBoolean = Exclude<AllTypes, boolean>;
// string | number
\`\`\`

**Extract<T, U> — Extracts types from a union:**
\`\`\`typescript
type AllTypes = string | number | boolean;

type OnlyNumbers = Extract<AllTypes, number>;
// number
\`\`\`

**NonNullable<T> — Removes null and undefined:**
\`\`\`typescript
type Value = string | null | undefined;

type NonNullValue = NonNullable<Value>;
// string
\`\`\`

**ReturnType<T> — Gets the return type of a function:**
\`\`\`typescript
function getUser(): { id: number; name: string } {
  return { id: 1, name: "John" };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string }
\`\`\`

**Parameters<T> — Gets parameter types of a function:**
\`\`\`typescript
function greet(name: string, age: number): void {
  console.log(\`Hello \${name}, you are \${age}\`);
}

type GreetParams = Parameters<typeof greet>;
// [string, number]
\`\`\`

**Practical Example:**
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Create a user without ID (for creation)
type CreateUserDto = Omit<User, "id">;

// Update user with optional fields
type UpdateUserDto = Partial<CreateUserDto>;

// Public user view (no password)
type PublicUser = Omit<User, "password">;

// User summary for lists
type UserSummary = Pick<User, "id" | "name">;
\`\`\``,
    difficulty: 'advanced',
    category: 'Types',
    tags: ['utility-types', 'type-transformations', 'built-in-types'],
  },
  {
    id: 'ts-12',
    question: 'What are mapped types in TypeScript?',
    answer: `**Mapped types** allow you to create new types by transforming properties of an existing type.

**Basic Mapped Type:**
\`\`\`typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age: number }
\`\`\`

**Making Properties Optional:**
\`\`\`typescript
type Optional<T> = {
  [K in keyof T]?: T[K];
};

interface User {
  name: string;
  age: number;
}

type PartialUser = Optional<User>;
// { name?: string; age?: number }
\`\`\`

**Adding Modifiers:**
\`\`\`typescript
// + makes it readonly
type Readonly<T> = {
  +readonly [K in keyof T]: T[K];
};

// - removes readonly
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// + makes it optional
type Optional<T> = {
  [K in keyof T]+?: T[K];
};

// - removes optional
type Required<T> = {
  [K in keyof T]-?: T[K];
};
\`\`\`

**Mapping to Different Types:**
\`\`\`typescript
type Stringify<T> = {
  [K in keyof T]: string;
};

interface User {
  id: number;
  name: string;
  age: number;
}

type StringifiedUser = Stringify<User>;
// { id: string; name: string; age: string }
\`\`\`

**Conditional Mapped Types:**
\`\`\`typescript
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }
\`\`\`

**Key Remapping:**
\`\`\`typescript
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

// Filtering keys
type OnlyStringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

interface User {
  name: string;
  age: number;
  email: string;
}

type StringProps = OnlyStringKeys<User>;
// { name: string; email: string }
\`\`\`

**Practical Examples:**

**1. API response transformations:**
\`\`\`typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface User {
  name: string;
  age: number;
}

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null }
\`\`\`

**2. Deep readonly:**
\`\`\`typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface User {
  name: string;
  settings: {
    theme: string;
  };
}

type ReadonlyUser = DeepReadonly<User>;
// All properties are readonly, including nested
\`\`\`

**3. Event handler types:**
\`\`\`typescript
type EventHandler<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

interface Component {
  onClick: (event: MouseEvent) => void;
  onLoad: () => void;
  name: string;
}

type EventHandlers = EventHandler<Component>;
// { onClick: (event: MouseEvent) => void; onLoad: () => void }
\`\`\`

**Best Practice:** Use mapped types when you need to transform an entire type structure. They're powerful for creating type-safe APIs and data transformations.`,
    difficulty: 'advanced',
    category: 'Types',
    tags: ['mapped-types', 'type-transformations', 'advanced-types'],
  },
  {
    id: 'ts-13',
    question: 'What are conditional types in TypeScript?',
    answer: `**Conditional types** allow you to choose types based on a condition, similar to ternary operators in JavaScript.

**Basic Conditional Type:**
\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false
\`\`\`

**Conditional Type with Union:**
\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type Test1 = NonNullable<string>; // string
type Test2 = NonNullable<string | null>; // string
type Test3 = NonNullable<null>; // never
\`\`\`

**Distributive Conditional Types:**
\`\`\`typescript
type ToArray<T> = T extends any ? T[] : never;

type StringOrNumberArray = ToArray<string | number>;
// string[] | number[] (distributed over union)
\`\`\`

**Type Inference in Conditional Types:**
\`\`\`typescript
type Unbox<T> = T extends { infer U }[] ? U : T;

type UnboxedString = Unbox<string[]>; // string
type UnboxedNumber = Unbox<number>; // number
\`\`\`

**Extracting Return Type:**
\`\`\`typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function getUser(): { id: number; name: string } {
  return { id: 1, name: "John" };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string }
\`\`\`

**Extracting Parameter Types:**
\`\`\`typescript
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function greet(name: string, age: number): void {
  console.log(\`Hello \${name}, you are \${age}\`);
}

type GreetParams = Parameters<typeof greet>;
// [string, number]
\`\`\`

**Practical Examples:**

**1. Flatten array types:**
\`\`\`typescript
type Flatten<T> = T extends any[] ? T[number] : T;

type Flat1 = Flatten<string[]>; // string
type Flat2 = Flatten<number>; // number
\`\`\`

**2. Extract promise value:**
\`\`\`typescript
type Awaited<T> = T extends Promise<infer U> ? U : T;

type User = Awaited<Promise<{ id: number; name: string }>>;
// { id: number; name: string }
\`\`\`

**3. Function overloading:**
\`\`\`typescript
type Overload<T> = T extends {
  (arg: string): string;
  (arg: number): number;
} ? T : never;

function process(arg: string | number): string | number {
  return typeof arg === "string" ? arg.toUpperCase() : arg * 2;
}

type ProcessType = Overload<typeof process>;
\`\`\`

**4. Remove readonly:**
\`\`\`typescript
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

interface ReadonlyUser {
  readonly id: number;
  readonly name: string;
}

type User = Mutable<ReadonlyUser>;
// { id: number; name: string }
\`\`\`

**Best Practice:** Use conditional types when you need to make type decisions based on type relationships. They're especially useful for utility types and type inference.`,
    difficulty: 'advanced',
    category: 'Types',
    tags: ['conditional-types', 'type-inference', 'advanced-types'],
  },
  {
    id: 'ts-14',
    question: 'What are the tsconfig.json compiler options?',
    answer: `**tsconfig.json** is the configuration file for TypeScript that specifies compiler options and project settings.

**Basic Structure:**
\`\`\`json
{
  "compilerOptions": {
    // Options here
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
\`\`\`

**Essential Compiler Options:**

**Target:**
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020" // "ES3", "ES5", "ES2015", "ES2020", etc.
  }
}
\`\`\`
Specifies which JavaScript version to compile to.

**Module:**
\`\`\`json
{
  "compilerOptions": {
    "module": "commonjs" // "commonjs", "esnext", "amd", "system", etc.
  }
}
\`\`\`
Specifies the module system for the output.

**Strict Mode Options:**
\`\`\`json
{
  "compilerOptions": {
    "strict": true,              // Enable all strict options
    "noImplicitAny": true,       // Error on implicit any types
    "strictNullChecks": true,   // Strict null checking
    "strictFunctionTypes": true, // Strict function type checking
    "strictBindCallApply": true, // Strict bind/call/apply checking
    "strictPropertyInitialization": true, // Check for initialized class properties
    "noImplicitThis": true,      // Error on 'this' with implicit any type
    "alwaysStrict": true         // Parse in strict mode
  }
}
\`\`\`

**Module Resolution:**
\`\`\`json
{
  "compilerOptions": {
    "moduleResolution": "node",  // "node" or "classic"
    "baseUrl": "./",             // Base directory for module resolution
    "paths": {
      "@/*": ["src/*"]           // Path aliases
    },
    "esModuleInterop": true,     // Enable CommonJS/ES Module interop
    "allowSyntheticDefaultImports": true
  }
}
\`\`\`

**Output Options:**
\`\`\`json
{
  "compilerOptions": {
    "outDir": "./dist",          // Output directory
    "rootDir": "./src",          // Root directory of source files
    "removeComments": true,      // Remove comments from output
    "sourceMap": true,           // Generate source maps
    "declaration": true,         // Generate .d.ts files
    "declarationMap": true       // Generate declaration maps
  }
}
\`\`\`

**Additional Checking Options:**
\`\`\`json
{
  "compilerOptions": {
    "noUnusedLocals": true,      // Error on unused locals
    "noUnusedParameters": true,  // Error on unused parameters
    "noImplicitReturns": true,   // Error on functions without return
    "noFallthroughCasesInSwitch": true, // Error on fallthrough in switch
    "forceConsistentCasingInFileNames": true
  }
}
\`\`\`

**Include/Exclude:**
\`\`\`json
{
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
\`\`\`

**Recommended tsconfig.json:**
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "esnext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
\`\`\`

**Best Practice:** Start with strict mode enabled and adjust specific options as needed. This catches many common errors early.`,
    difficulty: 'intermediate',
    category: 'Configuration',
    tags: ['tsconfig', 'compiler-options', 'configuration', 'setup'],
  },
  {
    id: 'ts-15',
    question: 'What are declaration files (.d.ts) in TypeScript?',
    answer: `**Declaration files** (`.d.ts`) provide type information for JavaScript libraries that don't have built-in TypeScript types.

**What are .d.ts files?**
- Files that contain type definitions
- Don't contain implementation, only types
- Allow TypeScript to understand JavaScript libraries
- Have the `.d.ts` extension

**Basic Example:**
\`\`\`typescript
// my-library.d.ts
declare function greet(name: string): void;
declare const version: string;

interface User {
  id: number;
  name: string;
}
\`\`\`

**Using Declaration Files:**
\`\`\`typescript
// In your TypeScript code
import { greet, version, User } from "my-library";

greet("John"); // TypeScript knows the signature
console.log(version); // TypeScript knows it's a string
\`\`\`

**declare Keyword:**
\`\`\`typescript
// Declare a variable
declare const API_URL: string;

// Declare a function
declare function fetchUser(id: number): Promise<User>;

// Declare a class
declare class HttpClient {
  get(url: string): Promise<any>;
  post(url: string, data: any): Promise<any>;
}

// Declare a module
declare module "my-library" {
  export function greet(name: string): void;
  export const version: string;
}
\`\`\`

**@types Packages:**
\`\`\`bash
# Install type definitions for a package
npm install --save-dev @types/node
npm install --save-dev @types/react
npm install --save-dev @types/lodash
\`\`\`

**Creating Type Definitions for Your Library:**
\`\`\`typescript
// index.d.ts
export interface Config {
  apiKey: string;
  timeout?: number;
}

export function initialize(config: Config): void;
export function fetchData(endpoint: string): Promise<any>;
\`\`\`

**TypeScript Configuration for Declarations:**
\`\`\`json
{
  "compilerOptions": {
    "declaration": true,         // Generate .d.ts files
    "declarationDir": "./types", // Output directory for declarations
    "declarationMap": true      // Generate declaration maps
  }
}
\`\`\`

**Ambient Declarations:**
\`\`\`typescript
// global.d.ts - Add to global scope
declare global {
  interface Window {
    myCustomProperty: string;
  }
}

// Now available globally
window.myCustomProperty = "value";
\`\`\`

**Common Scenarios:**

**1. Third-party library without types:**
\`\`\`typescript
// custom-library.d.ts
declare module "custom-library" {
  export function doSomething(input: string): number;
  export const VERSION: string;
}
\`\`\`

**2. Extending existing types:**
\`\`\`typescript
// Extend Express Request
declare namespace Express {
  interface Request {
    user?: {
      id: number;
      name: string;
    };
  }
}
\`\`\`

**3. Global variables:**
\`\`\`typescript
declare const process: {
  env: {
    NODE_ENV: string;
    API_URL: string;
  };
};
\`\`\`

**Best Practice:** Always use @types packages when available. Create custom .d.ts files only when types don't exist or need extension.`,
    difficulty: 'intermediate',
    category: 'Types',
    tags: ['declaration-files', 'd.ts', 'type-definitions', 'libraries'],
  },
  {
    id: 'ts-16',
    question: 'What is the difference between interface and type for function types?',
    answer: `Both interfaces and type aliases can define function types, but they have different capabilities and use cases.

**Type Alias for Function:**
\`\`\`typescript
type AddFunction = (a: number, b: number) => number;

const add: AddFunction = (a, b) => a + b;
\`\`\`

**Interface for Function:**
\`\`\`typescript
interface AddFunction {
  (a: number, b: number): number;
}

const add: AddFunction = (a, b) => a + b;
\`\`\`

**Key Differences:**

**1. Declaration Merging:**
\`\`\`typescript
// Interface - can be merged
interface AddFunction {
  (a: number, b: number): number;
}

interface AddFunction {
  (a: string, b: string): string;
}

// Result: AddFunction has both overloads

// Type alias - cannot be merged
type AddFunction = (a: number, b: number) => number;
// Cannot add another overload
\`\`\`

**2. Overloading:**
\`\`\`typescript
// Interface - clean overload syntax
interface ParseFunction {
  (input: string): number;
  (input: number): string;
}

const parse: ParseFunction = (input) => {
  return typeof input === "string" ? parseInt(input) : input.toString();
};

// Type alias - union type approach
type ParseFunction = 
  | ((input: string) => number)
  | ((input: number) => string);
\`\`\`

**3. Additional Properties:**
\`\`\`typescript
// Interface - can have properties
interface Counter {
  (start: number): void;
  count: number;
  reset(): void;
}

const counter: Counter = function(start: number) {
  counter.count = start;
} as Counter;

counter.count = 0;
counter.reset = () => { counter.count = 0; };

// Type alias - cannot have properties
type Counter = (start: number) => void;
// Cannot add count or reset
\`\`\`

**4. Extensibility:**
\`\`\`typescript
// Interface - can extend
interface BaseFunction {
  (x: number): number;
}

interface ExtendedFunction extends BaseFunction {
  (x: number, y: number): number;
}

// Type alias - can extend with intersection
type BaseFunction = (x: number) => number;
type ExtendedFunction = BaseFunction & ((x: number, y: number) => number);
\`\`\`

**When to Use Each:**

**Use Type Alias When:**
- Simple function signatures
- Union types of functions
- Need to use type utilities (Partial, Pick, etc.)
- Working with complex type compositions

**Use Interface When:**
- Need declaration merging
- Function overloads
- Need additional properties
- Extending existing function types
- Library definitions that might be extended

**Practical Examples:**

**Event Handlers (Type Alias):**
\`\`\`typescript
type EventHandler<T> = (event: T) => void;

type ClickHandler = EventHandler<MouseEvent>;
type KeyHandler = EventHandler<KeyboardEvent>;
\`\`\`

**API Functions (Interface):**
\`\`\`typescript
interface ApiFunction {
  (endpoint: string): Promise<any>;
  version: string;
  configure(config: any): void;
}
\`\`\`

**Overloaded Functions (Interface):**
\`\`\`typescript
interface Stringify {
  (value: string): string;
  (value: number): string;
  (value: boolean): string;
}

const stringify: Stringify = (value) => String(value);
\`\`\`

**Best Practice:** Use type aliases for simple function types. Use interfaces when you need overloading, additional properties, or declaration merging.`,
    difficulty: 'intermediate',
    category: 'Types',
    tags: ['interface', 'type-alias', 'functions', 'types'],
  },
  {
    id: 'ts-17',
    question: 'What are type predicates in TypeScript?',
    answer: `**Type predicates** are a special return type annotation that tells TypeScript a function performs a type guard.

**Basic Type Predicate:**
\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  }
}
\`\`\`

**Type Predicate Syntax:**
\`\`\`typescript
function isType<T>(value: unknown): value is T {
  // Return true if value is type T
}
\`\`\`

**Common Use Cases:**

**1. Checking object types:**
\`\`\`typescript
interface User {
  name: string;
  email: string;
}

interface Admin {
  name: string;
  permissions: string[];
}

function isAdmin(person: User | Admin): person is Admin {
  return (person as Admin).permissions !== undefined;
}

function greet(person: User | Admin) {
  if (isAdmin(person)) {
    console.log(\`Admin \${person.name}\`);
  } else {
    console.log(\`User \${person.name}\`);
  }
}
\`\`\`

**2. Narrowing union types:**
\`\`\`typescript
type SuccessResponse = {
  status: "success";
  data: any;
};

type ErrorResponse = {
  status: "error";
  error: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function isSuccess(response: ApiResponse): response is SuccessResponse {
  return response.status === "success";
}

function handleResponse(response: ApiResponse) {
  if (isSuccess(response)) {
    console.log(response.data);
  } else {
    console.log(response.error);
  }
}
\`\`\`

**3. Generic type predicates:**
\`\`\`typescript
function hasProperty<T, K extends keyof T>(
  obj: T,
  prop: K
): obj is T & Record<K, NonNullable<T[K]>> {
  return obj[prop] != null;
}

interface User {
  name?: string;
  age?: number;
}

function processUser(user: User) {
  if (hasProperty(user, "name")) {
    // TypeScript knows name is defined
    console.log(user.name.toUpperCase());
  }
}
\`\`\`

**4. Array filtering:**
\`\`\`typescript
function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

const values: (string | undefined)[] = ["hello", undefined, "world"];

const definedValues = values.filter(isDefined);
// Type: string[]
\`\`\`

**5. Checking class instances:**
\`\`\`typescript
class Dog {
  bark() { console.log("Woof!"); }
}

class Cat {
  meow() { console.log("Meow!"); }
}

function isDog(animal: Dog | Cat): animal is Dog {
  return animal instanceof Dog;
}

function makeSound(animal: Dog | Cat) {
  if (isDog(animal)) {
    animal.bark();
  } else {
    animal.meow();
  }
}
\`\`\`

**Type Guard vs Type Predicate:**

\`\`\`typescript
// Type guard (typeof, instanceof, in)
function isString(value: unknown): boolean {
  return typeof value === "string";
}

// Type predicate (special return type)
function isString(value: unknown): value is string {
  return typeof value === "string";
}
\`\`\`

**Best Practice:** Use type predicates when you need to narrow types in conditional blocks. They provide better type safety than regular type guards.`,
    difficulty: 'advanced',
    category: 'Types',
    tags: ['type-predicates', 'type-guards', 'narrowing', 'advanced-types'],
  },
  {
    id: 'ts-18',
    question: 'What are branded types in TypeScript?',
    answer: `**Branded types** are a pattern that adds a "brand" to a type to distinguish it from other types of the same underlying type.

**Basic Branded Type:**
\`\`\`typescript
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<number, "UserId">;
type OrderId = Brand<number, "OrderId">;

function createUserId(id: number): UserId {
  return id as UserId;
}

function createOrderId(id: number): OrderId {
  return id as OrderId;
}

function processUserId(userId: UserId) {
  console.log(userId);
}

const userId = createUserId(123);
const orderId = createOrderId(456);

processUserId(userId); // ✅ OK
processUserId(orderId); // ❌ Error - OrderId is not assignable to UserId
\`\`\`

**Why Use Branded Types?**

**1. Prevent mixing similar types:**
\`\`\`typescript
type Meters = Brand<number, "Meters">;
type Seconds = Brand<number, "Seconds">;

function calculateSpeed(distance: Meters, time: Seconds): number {
  return (distance as number) / (time as number);
}

const distance = 100 as Meters;
const time = 10 as Seconds;

calculateSpeed(distance, time); // ✅ OK
calculateSpeed(time, distance); // ❌ Error - wrong types
\`\`\`

**2. Validate IDs:**
\`\`\`typescript
type ValidatedEmail = Brand<string, "ValidatedEmail">;

function validateEmail(email: string): ValidatedEmail {
  if (!email.includes("@")) {
    throw new Error("Invalid email");
  }
  return email as ValidatedEmail;
}

function sendEmail(email: ValidatedEmail, message: string) {
  // Email is guaranteed to be validated
  console.log(\`Sending to \${email}: \${message}\`);
}

const email = validateEmail("user@example.com");
sendEmail(email, "Hello"); // ✅ OK

const invalidEmail = "invalid" as ValidatedEmail; // Dangerous but possible
sendEmail(invalidEmail, "Hello"); // ✅ Compiles but might fail at runtime
\`\`\`

**3. Currency types:**
\`\`\`typescript
type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

function convertUSDToEUR(amount: USD): EUR {
  return ((amount as number) * 0.85) as EUR;
}

const usdAmount = 100 as USD;
const eurAmount = convertUSDToEUR(usdAmount);
\`\`\`

**Generic Brand Pattern:**
\`\`\`typescript
type Branded<T, B> = T & { readonly __brand: B };

type UserId = Branded<number, "UserId">;
type Email = Branded<string, "Email">;

function createUserId(id: number): UserId {
  return id as UserId;
}

function createEmail(email: string): Email {
  return email as Email;
}
\`\`\`

**Runtime Validation with Branded Types:**
\`\`\`typescript
type PositiveNumber = Brand<number, "Positive">;

function assertPositive(value: number): PositiveNumber {
  if (value <= 0) {
    throw new Error("Value must be positive");
  }
  return value as PositiveNumber;
}

function calculateSquareRoot(value: PositiveNumber): number {
  return Math.sqrt(value as number);
}

const positive = assertPositive(16);
console.log(calculateSquareRoot(positive)); // ✅ OK

const negative = -4 as PositiveNumber; // Dangerous
console.log(calculateSquareRoot(negative)); // ✅ Compiles but returns NaN
\`\`\`

**Limitations:**
- Requires type assertions (can be bypassed)
- No runtime enforcement of the brand
- Can increase complexity
- Not a native TypeScript feature (pattern)

**Best Practice:** Use branded types when you need to prevent mixing similar types (IDs, currencies, units). Combine with runtime validation for safety.`,
    difficulty: 'advanced',
    category: 'Types',
    tags: ['branded-types', 'type-safety', 'patterns', 'advanced-types'],
  },
  {
    id: 'ts-19',
    question: 'What are template literal types in TypeScript?',
    answer: `**Template literal types** allow you to construct string types using template literal syntax, similar to JavaScript template strings.

**Basic Template Literal Type:**
\`\`\`typescript
type Greeting = \`Hello \${string}\`;

const message: Greeting = "Hello World"; // ✅ OK
const invalid: Greeting = "Hi there"; // ❌ Error
\`\`\`

**Union Types in Templates:**
\`\`\`typescript
type Color = "red" | "blue" | "green";
type Quantity = "small" | "medium" | "large";

type Size = \`\${Quantity}-\${Color}\`;

const size1: Size = "small-red"; // ✅ OK
const size2: Size = "medium-blue"; // ✅ OK
const size3: Size = "large-yellow"; // ❌ Error - yellow not in Color
\`\`\`

**String Manipulation Types:**

**Uppercase:**
\`\`\`typescript
type EventName = "click" | "submit" | "load";
type HandlerName = \`on\${Capitalize<EventName>}\`;

type Handler = "onClick" | "onSubmit" | "onLoad";
\`\`\`

**Lowercase:**
\`\`\`typescript
type Status = "Active" | "Inactive" | "Pending";
type LowerStatus = Lowercase<Status>;

type Lower = "active" | "inactive" | "pending";
\`\`\`

**Uppercase:**
\`\`\`typescript
type Role = "admin" | "user" | "guest";
type UpperRole = Uppercase<Role>;

type Upper = "ADMIN" | "USER" | "GUEST";
\`\`\`

**Uncapitalize:**
\`\`\`typescript
type Event = "Click" | "Submit" | "Load";
type LowerEvent = Uncapitalize<Event>;

type Lower = "click" | "submit" | "load";
\`\`\`

**Practical Examples:**

**1. CSS class names:**
\`\`\`typescript
type Size = "sm" | "md" | "lg";
type Color = "red" | "blue" | "green";

type ClassName = \`btn-\${Size}-\${Color}\`;

const className: ClassName = "btn-md-blue"; // ✅ OK
\`\`\`

**2. Event handler names:**
\`\`\`typescript
type Event = "click" | "mousedown" | "mouseup";
type EventHandler = \`on\${Capitalize<Event>}\`;

const handler: EventHandler = "onClick"; // ✅ OK
\`\`\`

**3. API endpoints:**
\`\`\`typescript
type Resource = "users" | "posts" | "comments";
type Action = "list" | "get" | "create" | "update" | "delete";

type Endpoint = \`/api/\${Resource}/\${Action}\`;

const endpoint: Endpoint = "/api/users/list"; // ✅ OK
\`\`\`

**4. Dynamic property access:**
\`\`\`typescript
type Obj = {
  [K in \`get\${Capitalize<string>}\`]: () => any;
};

type Getter = {
  getName: () => string;
  getAge: () => number;
  getEmail: () => string;
};
\`\`\`

**5. String literal inference:**
\`\`\`typescript
type Event = \`on\${string}\`;

function addEventListener(event: Event, handler: () => void) {
  // Can only accept string starting with "on"
}

addEventListener("click", () => {}); // ❌ Error
addEventListener("onclick", () => {}); // ✅ OK
\`\`\`

**Utility Types with Template Literals:**
\`\`\`typescript
type RemovePrefix<T extends string, P extends string> = 
  T extends \`\${P}\${infer Rest}\` ? Rest : T;

type WithoutOn = RemovePrefix<"onclick", "on">; // "click"
\`\`\`

**Best Practice:** Use template literal types when you need to construct string types based on patterns. They're great for CSS classes, event handlers, and API endpoints.`,
    difficulty: 'advanced',
    category: 'Types',
    tags: ['template-literal-types', 'string-types', 'advanced-types'],
  },
  {
    id: 'ts-20',
    question: 'What are keyof and typeof operators in TypeScript?',
    answer: `**keyof** and **typeof** are TypeScript operators that allow you to work with types in a type-safe way.

**keyof Operator:**
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User;
// "id" | "name" | "email"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "John", email: "john@example.com" };

const name = getProperty(user, "name"); // type: string
const id = getProperty(user, "id"); // type: number
const invalid = getProperty(user, "age"); // ❌ Error - "age" is not a key
\`\`\`

**keyof with Index Signatures:**
\`\`\`typescript
type StringMap = { [key: string]: string };
type StringMapKeys = keyof StringMap;
// string | number

type NumberMap = { [key: number]: string };
type NumberMapKeys = keyof NumberMap;
// number
\`\`\`

**typeof Operator:**
\`\`\`typescript
const user = {
  id: 1,
  name: "John",
  email: "john@example.com"
};

type User = typeof user;
// { id: number; name: string; email: string }

function createUser(): User {
  return {
    id: 1,
    name: "John",
    email: "john@example.com"
  };
}
\`\`\`

**typeof with Functions:**
\`\`\`typescript
function greet(name: string, age: number): string {
  return \`Hello \${name}, you are \${age}\`;
}

type Greet = typeof greet;
// (name: string, age: number) => string
\`\`\`

**Combined Usage:**
\`\`\`typescript
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

type Config = typeof config;
// { apiUrl: string; timeout: number; retries: number }

type ConfigKeys = keyof Config;
// "apiUrl" | "timeout" | "retries"

function getConfigValue<K extends keyof Config>(key: K): Config[K] {
  return config[key];
}

const url = getConfigValue("apiUrl"); // type: string
const timeout = getConfigValue("timeout"); // type: number
\`\`\`

**Practical Examples:**

**1. Type-safe object access:**
\`\`\`typescript
function pluck<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

const user = { id: 1, name: "John", email: "john@example.com" };
const summary = pluck(user, ["id", "name"]);
// { id: number; name: string }
\`\`\`

**2. Enum-like objects:**
\`\`\`typescript
const HttpStatus = {
  OK: 200,
  NotFound: 404,
  ServerError: 500
} as const;

type HttpStatus = typeof HttpStatus[keyof typeof HttpStatus];
// 200 | 404 | 500

function handleStatus(status: HttpStatus) {
  // Type-safe status handling
}
\`\`\`

**3. Configuration types:**
\`\`\`typescript
const defaultConfig = {
  theme: "light",
  language: "en",
  showNotifications: true
} as const;

type Config = typeof defaultConfig;
// { readonly theme: "light"; readonly language: "en"; readonly showNotifications: true }

function updateConfig(config: Partial<Config>) {
  // Type-safe config updates
}
\`\`\`

**4. Function parameter types:**
\`\`\`typescript
function add(a: number, b: number): number {
  return a + b;
}

type AddParams = Parameters<typeof add>;
// [number, number]

type AddReturn = ReturnType<typeof add>;
// number
\`\`\`

**Best Practice:** Use keyof for type-safe property access and typeof for inferring types from values. They're powerful for creating type-safe APIs and utilities.`,
    difficulty: 'intermediate',
    category: 'Types',
    tags: ['keyof', 'typeof', 'operators', 'type-safety'],
  },
];
