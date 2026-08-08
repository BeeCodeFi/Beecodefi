import { InterviewQuestion } from './html-questions';

export const reactInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'react-1',
    question: 'What is React and what are its key features?',
    answer: `**React** is a JavaScript library for building user interfaces, developed and maintained by Meta (Facebook). It allows developers to create large web applications that can update and render efficiently in response to data changes.

**Key Features:**
- **Component-Based Architecture** — Build encapsulated components that manage their own state
- **Virtual DOM** — React creates an in-memory cache of the DOM, computes differences, and updates the browser efficiently
- **Declarative Syntax** — Describe what the UI should look like, React handles the "how"
- **Unidirectional Data Flow** — Data flows down from parent to child components
- **JSX** — Syntax extension that allows writing HTML-like code in JavaScript
- **Hooks** — Functions that let you use state and other React features in functional components
- **React ecosystem** — Vast ecosystem including React Router, Redux, React Query, etc.

**Basic Example:**
\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\``,
    difficulty: 'beginner',
    category: 'Basics',
    tags: ['fundamentals', 'introduction', 'features'],
  },
  {
    id: 'react-2',
    question: 'What is JSX and how does it work?',
    answer: `**JSX** (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It makes React code more readable and easier to write.

**How JSX Works:**
JSX is not valid JavaScript — it gets compiled by tools like Babel into regular JavaScript function calls.

\`\`\`jsx
// JSX (what you write)
const element = <h1>Hello, World!</h1>;

// Compiled JavaScript (what actually runs)
const element = React.createElement('h1', null, 'Hello, World!');
\`\`\`

**Key JSX Rules:**
1. **Always return a single parent element** — Use fragments \`<>\` or a wrapper div
2. **Use camelCase for attributes** — \`className\` instead of \`class\`, \`htmlFor\` instead of \`for\`
3. **Self-closing tags need /** — \`<img />\`, \`<input />\`, \`<br />\`
4. **JavaScript expressions in {}** — \`{variable}\`, \`{2 + 2}\`, \`{function()}\`
5. **Inline styles as objects** — \`style={{ color: 'red', fontSize: '16px' }}\`

**Examples:**
\`\`\`jsx
// Single parent requirement
function App() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}

// JavaScript expressions
function Greeting({ name }) {
  return <h1>Hello, {name.toUpperCase()}!</h1>;
}

// Inline styles
function StyledBox() {
  return (
    <div style={{ 
      backgroundColor: '#6366f1',
      padding: '20px',
      borderRadius: '8px'
    }}>
      Styled content
    </div>
  );
}
\`\`\``,
    difficulty: 'beginner',
    category: 'JSX',
    tags: ['jsx', 'syntax', 'compilation'],
  },
  {
    id: 'react-3',
    question: 'What is the difference between functional and class components?',
    answer: `**Class Components** (older approach) are ES6 classes that extend React.Component. **Functional Components** (modern approach) are simple JavaScript functions.

**Class Component:**
\`\`\`jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
\`\`\`

**Functional Component (with Hooks):**
\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
\`\`\`

**Key Differences:**

| Feature | Class Components | Functional Components |
|---------|------------------|----------------------|
| Syntax | ES6 class | Simple function |
| State | \`this.state\` and \`this.setState()\` | \`useState\` hook |
| Lifecycle | \`componentDidMount\`, etc. | \`useEffect\` hook |
| \`this\` keyword | Required | No \`this\` |
| Code size | More verbose | More concise |
| Performance | Slightly more overhead | Generally faster |
| Modern React | Less common | Recommended approach |

**Best Practice:** Use functional components with hooks for all new React code.`,
    difficulty: 'beginner',
    category: 'Components',
    tags: ['components', 'functional', 'class', 'hooks'],
  },
  {
    id: 'react-4',
    question: 'What are React Hooks and why were they introduced?',
    answer: `**Hooks** are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8 to solve several problems with class components.

**Why Hooks Were Introduced:**
1. **Stateful logic reuse** — Hard to reuse stateful logic between components with class components
2. **Complex components** — Class components with many lifecycle methods become hard to understand
3. **Confusing \`this\`** — The \`this\` keyword in classes can be confusing
4. **Code organization** — Related code gets split across multiple lifecycle methods

**Common Hooks:**

**useState** — Manage component state
\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

**useEffect** — Handle side effects (replaces lifecycle methods)
\`\`\`jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Runs when userId changes

  return user ? <h1>{user.name}</h1> : <p>Loading...</p>;
}
\`\`\`

**useContext** — Access context without nested consumers
\`\`\`jsx
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}
\`\`\`

**Rules of Hooks:**
1. **Only call hooks at the top level** — Don't call inside loops, conditions, or nested functions
2. **Only call hooks from React functions** — Don't call from regular JavaScript functions

**Why These Rules?**
Hooks rely on the order in which they're called. React preserves state between re-renders by tracking hook call order.`,
    difficulty: 'beginner',
    category: 'Hooks',
    tags: ['hooks', 'useState', 'useEffect', 'rules'],
  },
  {
    id: 'react-5',
    question: 'Explain the useState hook and how to use it.',
    answer: `**useState** is a React hook that adds state to functional components. It returns an array with two elements: the current state value and a function to update it.

**Basic Syntax:**
\`\`\`jsx
const [state, setState] = useState(initialValue);
\`\`\`

**Examples:**

**1. Simple counter:**
\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
\`\`\`

**2. Object state:**
\`\`\`jsx
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateName = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  return (
    <input 
      value={user.name} 
      onChange={updateName} 
      placeholder="Name"
    />
  );
}
\`\`\`

**3. Functional updates (when new state depends on old state):**
\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  // ❌ Wrong if multiple updates happen quickly
  const incrementWrong = () => {
    setCount(count + 1);
    setCount(count + 1); // Both use same initial count
  };

  // ✅ Correct — functional update
  const incrementCorrect = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1); // Each gets the latest value
  };

  return <button onClick={incrementCorrect}>Increment</button>;
}
\`\`\`

**4. Lazy initialization (expensive initial state):**
\`\`\`jsx
function ExpensiveComponent() {
  const [data, setData] = useState(() => {
    // Only runs once on initial render
    return computeExpensiveValue();
  });
  
  return <div>{data}</div>;
}
\`\`\`

**Key Points:**
- State updates trigger re-renders
- State updates are asynchronous
- Always use functional updates when new state depends on old state
- For objects/arrays, create new copies (immutability)`,
    difficulty: 'beginner',
    category: 'Hooks',
    tags: ['hooks', 'useState', 'state', 'functional-updates'],
  },
  {
    id: 'react-6',
    question: 'Explain the useEffect hook and its dependency array.',
    answer: `**useEffect** lets you perform side effects in functional components. It replaces componentDidMount, componentDidUpdate, and componentWillUnmount from class components.

**Basic Syntax:**
\`\`\`jsx
useEffect(() => {
  // Effect code here
  return () => {
    // Cleanup function (optional)
  };
}, [dependencies]); // Dependency array (optional)
\`\`\`

**Dependency Array Behaviors:**

**1. No dependency array — runs after every render:**
\`\`\`jsx
useEffect(() => {
  console.log('Component rendered');
});
\`\`\`

**2. Empty array — runs only once on mount:**
\`\`\`jsx
useEffect(() => {
  console.log('Component mounted');
  // Equivalent to componentDidMount
}, []);
\`\`\`

**3. With dependencies — runs when dependencies change:**
\`\`\`jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Runs when userId changes

  return user ? <h1>{user.name}</h1> : <p>Loading...</p>;
}
\`\`\`

**Cleanup Function:**
\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  // Cleanup runs before component unmounts
  // and before every re-render if dependencies change
  return () => {
    clearInterval(timer);
  };
}, []);
\`\`\`

**Common Use Cases:**

**Data fetching:**
\`\`\`jsx
useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    const data = await fetch('/api/data');
    if (isMounted) {
      setResult(data);
    }
  };

  fetchData();

  return () => { isMounted = false; };
}, []);
\`\`\`

**Event listeners:**
\`\`\`jsx
useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
\`\`\`

**Key Rules:**
- Include all values from the component scope that change
- Missing dependencies can cause stale closures
- ESLint's \`react-hooks/exhaustive-deps\` rule helps catch issues`,
    difficulty: 'intermediate',
    category: 'Hooks',
    tags: ['hooks', 'useEffect', 'side-effects', 'lifecycle', 'dependencies'],
  },
  {
    id: 'react-7',
    question: 'What is the Virtual DOM and how does it improve performance?',
    answer: `The **Virtual DOM** is a lightweight JavaScript representation of the actual DOM. React creates a virtual DOM tree in memory and calculates the most efficient way to update the real DOM.

**How It Works:**

1. **Render** — React creates a virtual DOM tree based on component state
2. **Diff** — When state changes, React creates a new virtual DOM tree and compares it with the previous one
3. **Reconciliation** — React calculates the minimum number of changes needed
4. **Update** — React updates only the changed parts of the real DOM

**Visual Example:**
\`\`\`jsx
// Initial state
const vDOM1 = (
  <div>
    <h1>Hello</h1>
    <p>World</p>
  </div>
);

// After state change
const vDOM2 = (
  <div>
    <h1>Hello</h1>
    <p>React</p>  // Only this changed
  </div>
);

// React calculates: change the <p> text from "World" to "React"
// Real DOM: only updates that one element
\`\`\`

**Performance Benefits:**

| Without Virtual DOM | With Virtual DOM |
|---------------------|-----------------|
| Direct DOM manipulation is slow | Batch updates for efficiency |
| Every change triggers reflow | Minimal DOM operations |
| Hard to optimize | Automatic optimization |
| Manual diffing needed | Built-in diffing algorithm |

**Why DOM Updates Are Expensive:**
- DOM operations are slower than JavaScript operations
- Each DOM change can trigger page reflow/repaint
- Layout calculations are computationally expensive

**Virtual DOM Limitations:**
- Not always faster for simple applications
- Memory overhead (maintains two copies of DOM)
- Initial render might be slightly slower

**When Virtual DOM Helps Most:**
- Large applications with many components
- Frequent state updates
- Complex UI with nested components`,
    difficulty: 'intermediate',
    category: 'Performance',
    tags: ['virtual-dom', 'performance', 'reconciliation', 'diffing'],
  },
  {
    id: 'react-8',
    question: 'What is the difference between controlled and uncontrolled components?',
    answer: `**Controlled components** have their form data controlled by React state. **Uncontrolled components** store form data in the DOM itself, accessed via refs.

**Controlled Component:**
\`\`\`jsx
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email }); // Data from state
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

**Uncontrolled Component:**
\`\`\`jsx
function UncontrolledForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: nameRef.current.value,
      email: emailRef.current.value
    }); // Data from DOM refs
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={nameRef}
        defaultValue=""
        placeholder="Name"
      />
      <input
        ref={emailRef}
        defaultValue=""
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

**Comparison:**

| Feature | Controlled | Uncontrolled |
|---------|------------|--------------|
| Data source | React state | DOM |
| Updates | \`onChange\` handlers | Direct DOM access |
| Validation | Easy (real-time) | Harder (on submit) |
| Performance | More re-renders | Fewer re-renders |
| Best for | Forms, validation | Simple inputs, integrations |

**When to Use Each:**

**Use Controlled Components:**
- Form validation
- Dynamic forms
- Conditional rendering based on input
- When you need instant feedback

**Use Uncontrolled Components:**
- Simple forms with no validation
- Integrating with non-React libraries
- When performance is critical
- File inputs

**Best Practice:** Default to controlled components for most use cases.`,
    difficulty: 'intermediate',
    category: 'Forms',
    tags: ['forms', 'controlled', 'uncontrolled', 'refs', 'state'],
  },
  {
    id: 'react-9',
    question: 'What are React keys and why are they important?',
    answer: `**Keys** are special string attributes used when rendering lists of elements. They help React identify which items have changed, been added, or been removed.

**Basic Example:**
\`\`\`jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

**Why Keys Matter:**

Without proper keys, React uses array indices by default, which causes issues when the list changes:

\`\`\`jsx
// ❌ Bad: Using index as key
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}

// Problem: Reordering items breaks React's diffing
// Items: [A, B, C] -> [C, A, B]
// React thinks A is still at index 0, B at index 1, etc.
\`\`\`

**✅ Good: Using unique IDs**
\`\`\`jsx
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}
\`\`\`

**Key Requirements:**
1. **Unique among siblings** — No duplicate keys in the same list
2. **Stable** — Don't use random values or indices that change
3. **Not globally unique** — Only needs to be unique among siblings

**Common Mistakes:**

**1. Using array index:**
\`\`\`jsx
// ❌ Bad for lists that can reorder
{items.map((item, index) => <div key={index}>...</div>)}
\`\`\`

**2. Using random values:**
\`\`\`jsx
// ❌ Bad — key changes on every render
{items.map(item => <div key={Math.random()}>...</div>)}
\`\`\`

**3. Duplicate keys:**
\`\`\`jsx
// ❌ Bad — duplicate keys
{items.map(item => <div key="item">...</div>)}
\`\`\`

**When Index Keys Are Okay:**
- Static lists that never reorder
- Lists where items are never filtered or sorted
- The list is never modified after initial render

**Best Practice:** Always use stable, unique IDs from your data (like database IDs).`,
    difficulty: 'intermediate',
    category: 'Lists',
    tags: ['keys', 'lists', 'performance', 'reconciliation'],
  },
  {
    id: 'react-10',
    question: 'What is the Context API and when should you use it?',
    answer: `**Context API** provides a way to pass data through the component tree without having to pass props manually at every level. It's designed for sharing "global" data like themes, user info, or locale.

**Basic Example:**

**Create Context:**
\`\`\`jsx
const ThemeContext = React.createContext('light');
\`\`\`

**Provide Context:**
\`\`\`jsx
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
\`\`\`

**Consume Context:**
\`\`\`jsx
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>I am {theme}</button>;
}
\`\`\`

**Complete Example with useState:**
\`\`\`jsx
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}
\`\`\`

**When to Use Context:**
- Theme data (dark/light mode)
- User authentication (current user)
- Language/locale (i18n)
- Application settings
- Shopping cart data

**When NOT to Use Context:**
- To avoid prop drilling for component-specific data
- For data that changes frequently (causes re-renders)
- When only a few components need the data (props are fine)

**Performance Consideration:**
Context causes all consumers to re-render when the context value changes. Use useMemo or split context if performance is an issue.`,
    difficulty: 'intermediate',
    category: 'State Management',
    tags: ['context', 'state-management', 'prop-drilling', 'useContext'],
  },
  {
    id: 'react-11',
    question: 'What is the difference between useEffect and useLayoutEffect?',
    answer: `**useEffect** and **useLayoutEffect** are very similar, but they run at different times in the render cycle.

**useEffect:**
- Runs **after** the render is committed to the screen
- Asynchronous — doesn't block the browser from painting
- Default choice for most side effects

**useLayoutEffect:**
- Runs **before** the browser paints
- Synchronous — blocks the browser from painting
- Use when you need to measure DOM or prevent visual glitches

**Timing Comparison:**
\`\`\`jsx
// Render cycle:
// 1. Component renders
// 2. useLayoutEffect runs (synchronous, blocks paint)
// 3. Browser paints
// 4. useEffect runs (asynchronous, after paint)
\`\`\`

**Example - useEffect (default):**
\`\`\`jsx
function DataComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return data ? <div>{data}</div> : <div>Loading...</div>;
}
\`\`\`

**Example - useLayoutEffect (DOM measurement):**
\`\`\`jsx
function Tooltip({ children }) {
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    // Measure DOM before paint to prevent flicker
    const rect = tooltipRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 8,
      left: rect.left
    });
  }, []);

  return (
    <>
      <div ref={tooltipRef}>{children}</div>
      <div style={{ position: 'absolute', ...position }}>
        Tooltip content
      </div>
    </>
  );
}
\`\`\`

**When to Use Each:**

**useEffect (95% of cases):**
- Data fetching
- Subscriptions
- DOM mutations that don't need to be synchronous
- Logging
- Non-critical updates

**useLayoutEffect (rare cases):**
- DOM measurements (getBoundingClientRect, offsetHeight)
- Preventing layout shifts
- Synchronous DOM mutations
- Scrolling operations
- Animation setup that needs to be visible immediately

**Server-Side Rendering Note:**
useLayoutEffect doesn't run on the server. Use useEffect or check for browser environment:
\`\`\`jsx
useLayoutEffect(() => {
  // This won't run on the server
}, []);

// For SSR compatibility:
useEffect(() => {
  // Runs on both client and server (no-op on server)
}, []);
\`\`\``,
    difficulty: 'intermediate',
    category: 'Hooks',
    tags: ['hooks', 'useEffect', 'useLayoutEffect', 'timing', 'performance'],
  },
  {
    id: 'react-12',
    question: 'What are React custom hooks and how do you create them?',
    answer: `**Custom hooks** are JavaScript functions that start with "use" and can call other hooks. They let you extract and reuse stateful logic between components.

**Creating a Custom Hook:**

\`\`\`jsx
// Custom hook: useWindowSize
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Using the custom hook
function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window size: {width} x {height}
    </div>
  );
}
\`\`\`

**Another Example: useLocalStorage**

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');

  return (
    <input 
      value={name} 
      onChange={(e) => setName(e.target.value)}
    />
  );
}
\`\`\`

**Custom Hook Rules:**
1. **Name must start with "use"** — This convention lets React check for hook rule violations
2. **Call other hooks unconditionally** — At the top level, not inside conditions
3. **Return whatever you want** — Can return values, arrays, objects, functions

**Benefits:**
- Reuse stateful logic without changing component hierarchy
- Test complex logic in isolation
- Keep components focused on rendering
- Share logic across the application

**Common Patterns:**
- \`useFetch\` — Data fetching with loading/error states
- \`useForm\` — Form validation and handling
- \`useToggle\` — Boolean state toggle
- \`useDebounce\` — Debounced values
- \`useMediaQuery\` — Responsive design queries`,
    difficulty: 'intermediate',
    category: 'Hooks',
    tags: ['hooks', 'custom-hooks', 'reusability', 'patterns'],
  },
  {
    id: 'react-13',
    question: 'What is prop drilling and how can you avoid it?',
    answer: `**Prop drilling** is the process of passing data through multiple layers of components that don't need the data themselves, just to get it to a component deeper in the tree.

**Example of Prop Drilling:**
\`\`\`jsx
// ❌ Prop drilling — passing user through unnecessary components
function App() {
  const user = { name: 'John', role: 'admin' };
  return <Header user={user} />;
}

function Header({ user }) {
  return <Navigation user={user} />; // Header doesn't use user
}

function Navigation({ user }) {
  return <UserMenu user={user} />; // Navigation doesn't use user
}

function UserMenu({ user }) {
  return <span>Welcome, {user.name}</span>; // Only this uses user
}
\`\`\`

**Solutions to Avoid Prop Drilling:**

**1. Context API (Recommended for most cases):**
\`\`\`jsx
const UserContext = React.createContext();

function App() {
  const user = { name: 'John', role: 'admin' };
  return (
    <UserContext.Provider value={user}>
      <Header />
    </UserContext.Provider>
  );
}

function Header() {
  return <Navigation />; // No user prop needed
}

function Navigation() {
  return <UserMenu />; // No user prop needed
}

function UserMenu() {
  const user = useContext(UserContext);
  return <span>Welcome, {user.name}</span>;
}
\`\`\`

**2. Component Composition:**
\`\`\`jsx
function App() {
  const user = { name: 'John', role: 'admin' };
  return (
    <Header>
      <Navigation>
        <UserMenu user={user} />
      </Navigation>
    </Header>
  );
}

function Header({ children }) {
  return <header>{children}</header>;
}

function Navigation({ children }) {
  return <nav>{children}</nav>;
}
\`\`\`

**3. State Management Library (Redux, Zustand, etc.):**
\`\`\`jsx
// Using Redux
function UserMenu() {
  const user = useSelector(state => state.user);
  return <span>Welcome, {user.name}</span>;
}
\`\`\`

**When to Use Each Solution:**

| Solution | Best For |
|----------|----------|
| Context | Global data (theme, user, locale) |
| Composition | Layout-specific data |
| State Management | Complex state, many consumers |
| Prop Drilling | Simple, shallow component trees |

**Best Practice:** Use Context for truly global data. For component-specific data, prop drilling is often fine.`,
    difficulty: 'intermediate',
    category: 'Architecture',
    tags: ['prop-drilling', 'context', 'architecture', 'state-management'],
  },
  {
    id: 'react-14',
    question: 'What are React Fragments and why are they useful?',
    answer: `**React Fragments** let you group multiple elements without adding extra DOM nodes. They solve the problem of React requiring a single parent element.

**The Problem:**
\`\`\`jsx
// ❌ Without fragments — extra div wrapper
function Table() {
  return (
    <div>
      <tr>
        <td>Hello</td>
      </tr>
      <tr>
        <td>World</td>
      </tr>
    </div>
  );
}
// Invalid HTML: <div> can't be inside <table>
\`\`\`

**Solution with Fragments:**
\`\`\`jsx
// ✅ With fragments — no extra DOM node
function Table() {
  return (
    <>
      <tr>
        <td>Hello</td>
      </tr>
      <tr>
        <td>World</td>
      </tr>
    </>
  );
}
\`\`\`

**Fragment Syntax Options:**

**1. Short syntax (empty tag):**
\`\`\`jsx
function Columns() {
  return (
    <>
      <td>Hello</td>
      <td>World</td>
    </>
  );
}
\`\`\`

**2. Full syntax (with React.Fragment):**
\`\`\`jsx
function Columns() {
  return (
    <React.Fragment>
      <td>Hello</td>
      <td>World</td>
    </React.Fragment>
  );
}
\`\`\`

**3. Keyed fragments (for lists):**
\`\`\`jsx
function Glossary({ items }) {
  return (
    <dl>
      {items.map(item => (
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.definition}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
\`\`\`

**Use Cases:**

**1. Valid HTML structure:**
\`\`\`jsx
function Table() {
  return (
    <table>
      <tbody>
        <Rows />
      </tbody>
    </table>
  );
}

function Rows() {
  return (
    <>
      <tr><td>Row 1</td></tr>
      <tr><td>Row 2</td></tr>
    </>
  );
}
\`\`\`

**2. CSS Grid/Flexbox layouts:**
\`\`\`jsx
// Without fragments — extra div breaks grid
// With fragments — clean grid layout
function Grid() {
  return (
    <>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </>
  );
}
\`\`\`

**3. Conditional rendering:**
\`\`\`jsx
function Conditional({ show }) {
  return (
    <>
      {show && <div>Visible</div>}
      <div>Always visible</div>
    </>
  );
}
\`\`\`

**Benefits:**
- Cleaner DOM — no unnecessary wrapper divs
- Better CSS — no extra elements affecting layout
- Valid HTML — especially important for tables
- Slightly better performance — fewer DOM nodes`,
    difficulty: 'beginner',
    category: 'Components',
    tags: ['fragments', 'dom', 'structure', 'syntax'],
  },
  {
    id: 'react-15',
    question: 'What is the difference between useMemo and useCallback?',
    answer: `**useMemo** and **useCallback** are performance optimization hooks that memoize values and functions respectively to prevent unnecessary recalculations.

**useMemo — Memoizes values:**
\`\`\`jsx
function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => item.category === filter);
  }, [items, filter]); // Only re-run when items or filter changes

  return <ul>{filteredItems.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
}
\`\`\`

**useCallback — Memoizes functions:**
\`\`\`jsx
function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []); // Function reference never changes

  return <ChildComponent onClick={handleClick} count={count} />;
}
\`\`\`

**Why useCallback Matters:**

Without useCallback, the function is recreated on every render, causing child components that depend on it to re-render unnecessarily:

\`\`\`jsx
// ❌ Without useCallback — function recreated every render
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => console.log('clicked');
  // New function reference on every render

  return <MemoizedChild onClick={handleClick} />;
}

// ✅ With useCallback — function reference stable
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => console.log('clicked'), []);
  // Same function reference across renders

  return <MemoizedChild onClick={handleClick} />;
}
\`\`\`

**When to Use Each:**

**useMemo:**
- Expensive calculations
- Derived state that shouldn't change
- Reference equality checks (e.g., in useEffect dependencies)

**useCallback:**
- Functions passed to memoized child components
- Functions used in useEffect dependencies
- Event handlers passed to multiple children

**Example with Both:**
\`\`\`jsx
function ProductList({ products, category }) {
  const filteredProducts = useMemo(
    () => products.filter(p => p.category === category),
    [products, category]
  );

  const addToCart = useCallback((productId) => {
    dispatch({ type: 'ADD_TO_CART', payload: productId });
  }, [dispatch]);

  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onAddToCart={addToCart}
        />
      ))}
    </div>
  );
}
\`\`\`

**Important Notes:**
- Don't optimize prematurely — measure first
- Memoization has its own performance cost
- Only use when you have a performance problem
- Dependency arrays are critical — include all used values`,
    difficulty: 'advanced',
    category: 'Performance',
    tags: ['performance', 'useMemo', 'useCallback', 'optimization', 'memoization'],
  },
  {
    id: 'react-16',
    question: 'What is React.memo and when should you use it?',
    answer: `**React.memo** is a higher-order component that memoizes a component's result. It only re-renders if its props change, preventing unnecessary re-renders.

**Basic Usage:**
\`\`\`jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  console.log('Rendering ExpensiveComponent');
  return <div>{data}</div>;
});

// Or with arrow function
const ExpensiveComponent = React.memo(({ data }) => {
  console.log('Rendering ExpensiveComponent');
  return <div>{data}</div>;
});
\`\`\`

**Example Problem:**
\`\`\`jsx
// ❌ Without React.memo — child re-renders when parent re-renders
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child name="John" />
    </div>
  );
}

function Child({ name }) {
  console.log('Child rendered');
  return <div>Hello, {name}</div>;
}
// Child renders every time Parent renders (every button click)
\`\`\`

**Solution with React.memo:**
\`\`\`jsx
// ✅ With React.memo — child only re-renders when props change
const Child = React.memo(function Child({ name }) {
  console.log('Child rendered');
  return <div>Hello, {name}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child name="John" />
    </div>
  );
}
// Child only renders when name prop changes
\`\`\`

**Custom Comparison Function:**
\`\`\`jsx
const MyComponent = React.memo(
  function MyComponent({ user, onUpdate }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true to skip re-render
    // Return false to re-render
    return prevProps.user.id === nextProps.user.id;
  }
);
\`\`\`

**When to Use React.memo:**

**✅ Good use cases:**
- Pure functional components (same props = same output)
- Components that render frequently
- Components with expensive render logic
- Components in lists with many items

**❌ Avoid when:**
- Props change frequently
- Component is simple/fast to render
- Component has internal state that changes often
- You're optimizing prematurely

**Important Notes:**
- **Props must be reference-equal** — Use \`useCallback\` for functions, \`useMemo\` for objects
- **Shallow comparison by default** — Nested objects need custom comparison
- **Not a silver bullet** — Can sometimes make performance worse
- **Measure first** — Use React DevTools Profiler to identify actual bottlenecks`,
    difficulty: 'advanced',
    category: 'Performance',
    tags: ['performance', 'React.memo', 'optimization', 're-renders'],
  },
  {
    id: 'react-17',
    question: 'What is the difference between presentational and container components?',
    answer: `**Presentational components** (also called "dumb" components) focus on how things look. **Container components** (also called "smart" components) focus on how things work.

**Presentational Component:**
\`\`\`jsx
// Concerned with HOW things look
// No knowledge of Redux, API calls, or business logic
// Receive data via props, emit events via callbacks
function UserList({ users, onUserClick }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onUserClick(user.id)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

**Container Component:**
\`\`\`jsx
// Concerned with HOW things work
// Contains business logic, data fetching, state management
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleUserClick = (userId) => {
    console.log('User clicked:', userId);
  };

  if (loading) return <div>Loading...</div>;

  return <UserList users={users} onUserClick={handleUserClick} />;
}
\`\`\`

**Comparison:**

| Aspect | Presentational | Container |
|--------|----------------|-----------|
| Purpose | How things look | How things work |
| Data | From props | From API/store |
| Behavior | Callback props | Contains logic |
| Styling | CSS/styled-components | Usually no styling |
| Reusability | Highly reusable | Less reusable |
| Examples | Button, Card, List | Form handlers, data fetchers |

**Benefits of Separation:**

**1. Reusability:**
\`\`\`jsx
// Same presentational component, different containers
<UserList users={adminUsers} onUserClick={handleAdmin} />
<UserList users={regularUsers} onUserClick={handleRegular} />
\`\`\`

**2. Separation of concerns:**
- UI logic in one place
- Business logic in another
- Easier to test each part

**3. Better composition:**
\`\`\`jsx
function Dashboard() {
  return (
    <div>
      <UserListContainer />
      <ProductListContainer />
      <OrderListContainer />
    </div>
  );
}
\`\`\`

**Modern Note:**
With hooks, the line has blurred. Many developers now combine both in a single component using custom hooks:

\`\`\`jsx
// Modern approach with hooks
function UserList() {
  const { users, loading, handleUserClick } = useUsers();

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => handleUserClick(user.id)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
\`\`\``,
    difficulty: 'intermediate',
    category: 'Architecture',
    tags: ['architecture', 'components', 'separation-of-concerns', 'design-patterns'],
  },
  {
    id: 'react-18',
    question: 'What are React Server Components and how do they differ from Client Components?',
    answer: `**React Server Components (RSC)** run on the server and stream HTML to the client. **Client Components** run in the browser like traditional React components.

**Server Component:**
\`\`\`jsx
// Server Component (default in Next.js App Router)
async function UserProfile({ userId }) {
  const user = await db.user.findUnique({ where: { id: userId } });
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

**Client Component:**
\`\`\`jsx
'use client';

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

**Key Differences:**

| Feature | Server Components | Client Components |
|---------|------------------|-------------------|
| Runtime | Server | Browser |
| State | No useState/useEffect | Full React hooks |
| Interactivity | No events | Full interactivity |
| Data Fetching | Direct DB/API access | Need API calls |
| Bundle Size | Not sent to client | Included in bundle |
| 'use client' directive | Not needed | Required |

**When to Use Each:**

**Server Components:**
- Data fetching (can query databases directly)
- Static content
- SEO-critical pages
- Components that don't need interactivity
- Heavy libraries (don't increase client bundle)

**Client Components:**
- Interactive elements (buttons, forms)
- State management
- Browser APIs (window, localStorage)
- Event handlers
- useEffect for side effects

**Mixing Server and Client Components:**

\`\`\`jsx
// Server Component
import Counter from './Counter'; // Client component

async function Page() {
  const data = await fetchData();
  
  return (
    <div>
      <h1>{data.title}</h1>
      <Counter /> {/* Client component rendered on server, hydrated on client */}
    </div>
  );
}
\`\`\`

**Passing Server Data to Client Components:**
\`\`\`jsx
// Server Component
async function ServerComponent() {
  const user = await getUser();
  
  return <ClientComponent initialUser={user} />;
}

// Client Component
'use client';

function ClientComponent({ initialUser }) {
  const [user, setUser] = useState(initialUser);
  
  return <div>{user.name}</div>;
}
\`\`\`

**Benefits of Server Components:**
- Smaller client bundle size
- Direct database access
- Better SEO
- Faster initial page load
- Secure server-side code never reaches client`,
    difficulty: 'advanced',
    category: 'React 18+',
    tags: ['server-components', 'client-components', 'next.js', 'react-18', 'performance'],
  },
  {
    id: 'react-19',
    question: 'What is React Suspense and how does it work?',
    answer: `**React Suspense** lets you declare a loading state while waiting for data or components to load. It coordinates the "loading" state with the data fetching.

**Basic Usage with Lazy Loading:**
\`\`\`jsx
import { Suspense, lazy } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

**Usage with Data Fetching (with React Query or similar):**
\`\`\`jsx
import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    suspense: true // Enable Suspense mode
  });

  return <div>{user.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile userId="123" />
    </Suspense>
  );
}
\`\`\`

**Nested Suspense:**
\`\`\`jsx
function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Header />
      <Suspense fallback={<ContentSkeleton />}>
        <MainContent />
      </Suspense>
      <Footer />
    </Suspense>
  );
}
\`\`\`

**How Suspense Works:**

1. **Throw Promise** — When data isn't ready, throw a promise
2. **Catch Promise** — Suspense catches the promise
3. **Show Fallback** — Suspense shows the fallback UI
4. **Retry** — When promise resolves, Suspense retries rendering
5. **Show Content** — When render succeeds, show the actual content

**Benefits:**
- Declarative loading states
- Automatic coordination of loading states
- Better user experience (less "jumpy" UI)
- Simplifies async code

**Traditional vs Suspense:**

\`\`\`jsx
// ❌ Traditional approach — manual loading states
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}

// ✅ Suspense approach — no manual loading state
function UserProfile({ userId }) {
  const user = use(fetchUser(userId)); // Suspense-enabled fetch
  return <div>{user.name}</div>;
}
\`\`\`

**Important Notes:**
- Still evolving in the React ecosystem
- Requires Suspense-enabled data libraries
- Works great with React Server Components
- Can be combined with Error Boundaries for error handling`,
    difficulty: 'advanced',
    category: 'React 18+',
    tags: ['suspense', 'data-fetching', 'lazy-loading', 'async', 'react-18'],
  },
  {
    id: 'react-20',
    question: 'What are Error Boundaries and how do you implement them?',
    answer: `**Error Boundaries** are React components that catch JavaScript errors in their child component tree, log those errors, and display a fallback UI instead of crashing the entire app.

**Basic Error Boundary:**
\`\`\`jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // You can also log to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
\`\`\`

**Usage:**
\`\`\`jsx
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <ErrorBoundary>
        <MainContent />
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}
\`\`\`

**Functional Component Wrapper (using react-error-boundary library):**
\`\`\`jsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset app state when error boundary resets
      }}
    >
      <MyComponent />
    </ErrorBoundary>
  );
}
\`\`\`

**What Error Boundaries Catch:**
- Rendering errors
- Lifecycle method errors
- Errors in constructors

**What Error Boundaries DON'T Catch:**
- Event handlers (use try/catch in handlers)
- Asynchronous code (use try/catch in async functions)
- Server-side rendering errors
- Errors in the error boundary itself

**Event Handler Error Handling:**
\`\`\`jsx
function Button() {
  const handleClick = () => {
    try {
      // Code that might throw
      riskyOperation();
    } catch (error) {
      console.error('Handler error:', error);
      // Show error UI
    }
  };

  return <button onClick={handleClick}>Click me</button>;
}
\`\`\`

**Best Practices:**
- Place error boundaries at strategic levels (per route, per feature)
- Provide helpful error messages to users
- Log errors to monitoring services
- Include a way to recover from errors
- Don't overuse — only where crashes are likely`,
    difficulty: 'intermediate',
    category: 'Error Handling',
    tags: ['error-boundaries', 'error-handling', 'class-components', 'robustness'],
  },
  {
    id: 'react-21',
    question: 'What is the difference between createElement and JSX?',
    answer: `**React.createElement** is the underlying API that React uses to create elements. **JSX** is syntactic sugar that gets compiled to createElement calls.

**JSX (what you write):**
\`\`\`jsx
const element = <h1 className="greeting">Hello, world!</h1>;
\`\`\`

**createElement (what it compiles to):**
\`\`\`jsx
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);
\`\`\`

**createElement Signature:**
\`\`\`jsx
React.createElement(
  type,      // HTML tag, component, or React fragment
  props,     // Props object (attributes, event handlers)
  ...children // Child elements or text content
);
\`\`\`

**More Examples:**

**Nested elements:**
\`\`\`jsx
// JSX
const element = (
  <div className="container">
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);

// createElement
const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Title'),
  React.createElement('p', null, 'Paragraph')
);
\`\`\`

**With props:**
\`\`\`jsx
// JSX
<button onClick={handleClick} disabled={isDisabled}>
  Click me
</button>

// createElement
React.createElement(
  'button',
  { onClick: handleClick, disabled: isDisabled },
  'Click me'
);
\`\`\`

**With components:**
\`\`\`jsx
// JSX
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

const element = <Greeting name="John" />;

// createElement
const element = React.createElement(Greeting, { name: 'John' });
\`\`\`

**When to Use createElement:**

**1. When you can't use JSX:**
\`\`\`jsx
// Dynamic component creation
const components = {
  header: Header,
  footer: Footer,
  sidebar: Sidebar
};

function DynamicComponent({ type }) {
  const Component = components[type];
  return React.createElement(Component, { someProp: 'value' });
}
\`\`\`

**2. When creating elements programmatically:**
\`\`\`jsx
function createElements(items) {
  return items.map(item =>
    React.createElement('div', { key: item.id }, item.name)
  );
}
\`\`\`

**Why JSX is Preferred:**
- More readable and familiar (HTML-like)
- Easier to write and maintain
- Better IDE support (syntax highlighting, autocomplete)
- Less verbose for complex structures
- Industry standard

**Summary:**
JSX is syntactic sugar for createElement. JSX compiles to createElement at build time. Both produce the same result, but JSX is much more developer-friendly.`,
    difficulty: 'beginner',
    category: 'JSX',
    tags: ['jsx', 'createElement', 'compilation', 'syntax'],
  },
  {
    id: 'react-22',
    question: 'What are refs in React and when should you use them?',
    answer: `**Refs** (references) provide a way to access DOM nodes or React elements created in the render method. They're used for direct DOM manipulation or managing focus.

**Creating Refs:**
\`\`\`jsx
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);
  const divRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <div ref={divRef}>Some content</div>
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
\`\`\`

**Common Use Cases:**

**1. Managing focus:**
\`\`\`jsx
function SearchForm() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Auto-focus on mount
  }, []);

  return <input ref={inputRef} placeholder="Search..." />;
}
\`\`\`

**2. Triggering animations:**
\`\`\`jsx
function AnimatedBox() {
  const boxRef = useRef(null);

  const animate = () => {
    boxRef.current.style.transform = 'translateX(100px)';
  };

  return (
    <div ref={boxRef} className="box">
      <button onClick={animate}>Animate</button>
    </div>
  );
}
\`\`\`

**3. Measuring DOM elements:**
\`\`\`jsx
function MeasuredComponent() {
  const divRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(divRef.current.offsetHeight);
  }, []);

  return (
    <div ref={divRef}>
      Height: {height}px
    </div>
  );
}
\`\`\`

**4. Integrating with non-React libraries:**
\`\`\`jsx
function ChartComponent() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: 'bar',
      data: chartData
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={chartRef} />;
}
\`\`\`

**Callback Refs:**
\`\`\`jsx
function Component() {
  const [height, setHeight] = useState(0);

  const measureRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  return <div ref={measureRef}>Content</div>;
}
\`\`\`

**Forwarding Refs:**
\`\`\`jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="fancy">
    {props.children}
  </button>
));

// Usage
function App() {
  const buttonRef = useRef(null);
  return <FancyButton ref={buttonRef}>Click me</FancyButton>;
}
\`\`\`

**When NOT to Use Refs:**
- Don't use refs for things that can be done with state/props
- Avoid direct DOM manipulation when React can handle it
- Don't use refs to trigger React updates (use state instead)

**Best Practice:** Use refs sparingly. Most of the time, state and props are the right tools.`,
    difficulty: 'intermediate',
    category: 'Refs',
    tags: ['refs', 'useRef', 'dom', 'forwardRef', 'direct-manipulation'],
  },
  {
    id: 'react-23',
    question: 'What is the difference between state and props?',
    answer: `**Props** (properties) are read-only data passed from parent to child components. **State** is data managed within a component that can change over time.

**Props:**
- Passed from parent to child
- Read-only (immutable)
- External to the component
- Used for data flow
- Changes trigger re-renders in child

**State:**
- Managed within the component
- Mutable (can be changed)
- Internal to the component
- Used for component-specific data
- Changes trigger re-renders in the component

**Example:**
\`\`\`jsx
// Parent component with state
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {/* Passing state as prop to child */}
      <Child count={count} />
    </div>
  );
}

// Child component receiving props
function Child({ count }) {
  // count is a prop - read-only
  return <div>Count from parent: {count}</div>;
}
\`\`\`

**Key Differences:**

| Aspect | Props | State |
|--------|-------|-------|
| Source | Parent component | Component itself |
| Mutability | Immutable | Mutable |
| Direction | Parent → Child | Internal |
| Updates | Parent updates it | Component updates it |
| Purpose | Data flow | Component memory |

**When to Use Props:**
- Passing data from parent to child
- Configuration values
- Callback functions
- Component customization

**When to Use State:**
- Component-specific data
- User input
- Data that changes over time
- UI state (modals, toggles, etc.)

**Lifting State Up:**
When multiple components need the same state, lift it to their common parent:

\`\`\`jsx
// ❌ Bad: Duplicated state
function Child1() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}

function Child2() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}

// ✅ Good: Lifted state
function Parent() {
  const [value, setValue] = useState('');
  return (
    <div>
      <Child1 value={value} onChange={setValue} />
      <Child2 value={value} onChange={setValue} />
    </div>
  );
}

function Child1({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}
\`\`\`

**Rule of Thumb:**
- If data comes from outside and doesn't change from within → Props
- If data is internal and changes over time → State`,
    difficulty: 'beginner',
    category: 'State',
    tags: ['state', 'props', 'data-flow', 'components'],
  },
  {
    id: 'react-24',
    question: 'What are React portals and when would you use them?',
    answer: `**React Portals** provide a way to render children into a DOM node outside the parent component's hierarchy. They're useful for modals, tooltips, and dropdowns.

**Basic Usage:**
\`\`\`jsx
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    children,
    document.getElementById('modal-root')
  );
}

// In your HTML:
// <div id="root"></div>
// <div id="modal-root"></div>
\`\`\`

**Example - Modal:**
\`\`\`jsx
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="modal">
            <h2>Modal Content</h2>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
\`\`\`

**Why Use Portals?**

**1. CSS Issues:**
Without portals, z-index and overflow can cause problems:

\`\`\`jsx
// ❌ Without portal - z-index issues
function Card() {
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <Tooltip>Tooltip gets clipped!</Tooltip>
    </div>
  );
}

// ✅ With portal - no clipping
function Card() {
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <Tooltip>Tooltip renders outside!</Tooltip>
    </div>
  );
}
\`\`\`

**2. Event Bubbling:**
Portals preserve event bubbling to React's component tree:

\`\`\`jsx
function Parent() {
  const handleClick = () => {
    console.log('Parent clicked');
  };

  return (
    <div onClick={handleClick}>
      <Modal>
        <button onClick={() => console.log('Button clicked')}>
          Click me
        </button>
      </Modal>
    </div>
  );
}
// Button click still bubbles to Parent despite being in portal
\`\`\`

**Common Use Cases:**
- Modals and dialogs
- Tooltips and popovers
- Dropdowns and menus
- Toast notifications
- Global overlays

**Best Practices:**
- Always clean up portals when component unmounts
- Consider accessibility (focus management, ARIA attributes)
- Ensure portal root exists in your HTML
- Use for UI that should break out of container constraints`,
    difficulty: 'advanced',
    category: 'Advanced',
    tags: ['portals', 'modal', 'dom', 'advanced', 'rendering'],
  },
  {
    id: 'react-25',
    question: 'What is reconciliation in React and how does it work?',
    answer: `**Reconciliation** is the process React uses to determine which parts of the UI need to be updated when state or props change. It's the algorithm behind React's efficient DOM updates.

**How Reconciliation Works:**

1. **Render** — React calls component functions to get new virtual DOM
2. **Diff** — Compare new virtual DOM with previous virtual DOM
3. **Calculate changes** — Determine minimum set of DOM mutations
4. **Update** — Apply only the necessary changes to real DOM

**Key Heuristics:**

**1. Different element types = rebuild:**
\`\`\`jsx
// Before
<div className="before" />

// After
<span className="after" />

// React: destroys <div>, creates <span>
\`\`\`

**2. Same element type = update attributes:**
\`\`\`jsx
// Before
<div className="before" />

// After
<div className="after" />

// React: updates className, keeps the same element
\`\`\`

**3. Component instances = reuse or replace:**
\`\`\`jsx
// Before
<UserProfile userId="1" />

// After
<UserProfile userId="2" />

// React: reuses component, updates props, runs componentDidUpdate
\`\`\`

**4. List reconciliation with keys:**
\`\`\`jsx
// ❌ Without proper keys
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

// After prepending
<ul>
  <li>Item 0</li>  // React thinks Item 1 changed to Item 0
  <li>Item 1</li>  // React thinks Item 2 changed to Item 1
  <li>Item 2</li>  // React thinks Item 3 changed to Item 2
</ul>

// ✅ With keys
<ul>
  <li key="1">Item 1</li>
  <li key="2">Item 2</li>
  <li key="3">Item 3</li>
</ul>

// After prepending
<ul>
  <li key="0">Item 0</li>  // React knows this is new
  <li key="1">Item 1</li>  // React knows this is the same
  <li key="2">Item 2</li>  // React knows this is the same
  <li key="3">Item 3</li>  // React knows this is the same
</ul>
\`\`\`

**Component State Preservation:**
\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// If React reuses the component instance, state is preserved
// If React replaces it, state is reset
\`\`\`

**Performance Implications:**
- Keys should be stable and unique
- Avoid unnecessary component replacements
- Inline functions/objects can cause unnecessary re-renders
- React.memo can help prevent unnecessary updates

**Fiber (New Reconciler):**
React Fiber is the new reconciliation engine (React 16+) that enables:
- Incremental rendering (split work into chunks)
- Priority-based rendering (update important parts first)
- Better error boundaries
- Concurrent features (Suspense, transitions)`,
    difficulty: 'advanced',
    category: 'Core',
    tags: ['reconciliation', 'virtual-dom', 'diffing', 'fiber', 'performance'],
  },
  {
    id: 'react-26',
    question: 'What are React transitions and when should you use them?',
    answer: `**React transitions** (introduced in React 18) allow you to mark certain state updates as "transitions," making them lower priority so the browser can stay responsive to user input.

**Basic Usage:**
\`\`\`jsx
import { startTransition, useTransition } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // Urgent update (input value)
    setQuery(e.target.value);

    // Non-urgent update (search results)
    startTransition(() => {
      setResults(filterResults(e.target.value));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <div>Loading results...</div>}
      <ResultsList results={results} />
    </div>
  );
}
\`\`\`

**Urgent vs Non-Urgent Updates:**

**Urgent (direct):**
- Typing, clicking, pressing
- Need immediate feedback
- Example: Input value updates

**Non-Urgent (transitions):**
- UI transformations
- Page navigation
- Filtering large lists
- Example: Search results, data fetching

**Benefits:**
- Keeps UI responsive during heavy computations
- Prioritizes user interactions
- Better perceived performance
- Smoother user experience

**Example - Tab Switching:**
\`\`\`jsx
function TabContainer() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const selectTab = (newTab) => {
    startTransition(() => {
      setTab(newTab); // Non-urgent - allows input to stay responsive
    });
  };

  return (
    <div>
      <button onClick={() => selectTab('home')}>Home</button>
      <button onClick={() => selectTab('about')}>About</button>
      {isPending && <Spinner />}
      <Suspense fallback={<div>Loading...</div>}>
        <TabContent tab={tab} />
      </Suspense>
    </div>
  );
}
\`\`\`

**useDeferredValue:**
\`\`\`jsx
function Search() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const results = useSearch(deferredQuery); // Uses deferred value

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <Results results={results} />
    </div>
  );
}
\`\`\`

**When to Use Transitions:**
- Heavy UI updates
- Large list filtering
- Page navigation
- Complex computations
- When keeping input responsive is critical

**Best Practices:**
- Mark computationally expensive updates as transitions
- Keep urgent updates (direct) for immediate feedback
- Combine with Suspense for data fetching
- Use useDeferredValue for derived state`,
    difficulty: 'advanced',
    category: 'React 18+',
    tags: ['transitions', 'concurrent', 'react-18', 'performance', 'user-experience'],
  },
  {
    id: 'react-27',
    question: 'What is the difference between useEffect and useInsertionEffect?',
    answer: `**useInsertionEffect** is a special hook introduced for CSS-in-JS libraries to inject styles before DOM mutations. It runs synchronously before all DOM mutations.

**useEffect:**
- Runs after DOM commits
- Asynchronous
- For side effects
- Can cause layout shifts with CSS-in-JS

**useInsertionEffect:**
- Runs before DOM mutations
- Synchronous
- For CSS-in-JS style injection
- Prevents layout shifts

**Example - CSS-in-JS Library:**
\`\`\`jsx
import { useInsertionEffect } from 'react';

function StyledComponent() {
  useInsertionEffect(() => {
    // Inject styles before browser paints
    const style = document.createElement('style');
    style.textContent = '.styled { color: red; background: blue; }';
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <div className="styled">Styled content</div>;
}
\`\`\`

**Timing Comparison:**
\`\`\`jsx
// Render cycle:
// 1. Component renders
// 2. useInsertionEffect runs (synchronous, before DOM mutations)
// 3. DOM mutations happen
// 4. useLayoutEffect runs (synchronous, after DOM mutations, before paint)
// 5. Browser paints
// 6. useEffect runs (asynchronous, after paint)
\`\`\`

**When to Use Each:**

**useInsertionEffect:**
- CSS-in-JS style injection
- Preventing layout shifts
- Synchronous style calculations
- Very specific use cases

**useEffect:**
- Data fetching
- Subscriptions
- Most side effects
- Default choice

**Important Notes:**
- **Don't use in application code** — This is for library authors
- **Only for CSS-in-JS** — That's the primary use case
- **Synchronous blocking** — Can cause performance issues if misused
- **Limited scope** — Not a general-purpose hook

**Why It Exists:**
CSS-in-JS libraries need to inject styles before the browser paints to avoid:
- Flash of unstyled content (FOUC)
- Layout shifts
- Performance issues

For normal application development, you'll almost never need this hook.`,
    difficulty: 'advanced',
    category: 'React 18+',
    tags: ['useInsertionEffect', 'css-in-js', 'react-18', 'hooks', 'libraries'],
  },
  {
    id: 'react-28',
    question: 'What are the rules of hooks and why are they important?',
    answer: `**The Rules of Hooks** are essential guidelines that ensure hooks work correctly. Breaking these rules can cause bugs and unexpected behavior.

**The Two Rules:**

**1. Only Call Hooks at the Top Level**
- Don't call hooks inside loops, conditions, or nested functions
- Always call hooks at the top level of your React function

**2. Only Call Hooks from React Functions**
- Call hooks from React functional components
- Call hooks from custom hooks
- Don't call hooks from regular JavaScript functions

**Why These Rules Matter:**

React relies on the **order** in which hooks are called to associate state with the correct hook:

\`\`\`jsx
function Counter() {
  // ✅ Correct - hooks in same order every render
  const [count, setCount] = useState(0);    // Hook 1
  const [name, setName] = useState('');     // Hook 2

  useEffect(() => {                         // Hook 3
    document.title = \`Count: \${count}\`;
  }, [count]);

  return <div>{count}</div>;
}
\`\`\`

**❌ Breaking Rule 1 - Conditional Hook:**
\`\`\`jsx
function Counter({ isAdmin }) {
  const [count, setCount] = useState(0);

  // ❌ Wrong - hook inside condition
  if (isAdmin) {
    const [adminData, setAdminData] = useState(null);
  }

  return <div>{count}</div>;
}

// Problem: On re-render without isAdmin, hook order changes
// React can't match state to the correct hooks
\`\`\`

**✅ Fix - Always Call Hooks:**
\`\`\`jsx
function Counter({ isAdmin }) {
  const [count, setCount] = useState(0);
  const [adminData, setAdminData] = useState(null); // Always called

  if (!isAdmin) {
    return <div>{count}</div>; // Early return after hooks
  }

  return <div>{count} - {adminData}</div>;
}
\`\`\`

**❌ Breaking Rule 2 - Hook in Regular Function:**
\`\`\`jsx
// ❌ Wrong - hook in regular function
function fetchData() {
  const [data, setData] = useState(null); // Error!
  // ...
}
\`\`\`

**✅ Fix - Use Custom Hook:**
\`\`\`jsx
// ✅ Correct - custom hook
function useFetchData() {
  const [data, setData] = useState(null);
  // ...
  return data;
}

function Component() {
  const data = useFetchData(); // Called from React function
  return <div>{data}</div>;
}
\`\`\`

**ESLint Plugin:**
Install the ESLint plugin to catch rule violations:

\`\`\`bash
npm install eslint-plugin-react-hooks --save-dev
\`\`\`

\`\`\`json
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
\`\`\`

**Why React Needs These Rules:**
- Hooks use an array to store state
- Hook order determines which state belongs to which hook
- Changing order breaks the association
- These rules guarantee consistent hook order

**Summary:**
Always call hooks at the top level of React functions. Never call them conditionally or in loops. Use the ESLint plugin to catch violations automatically.`,
    difficulty: 'beginner',
    category: 'Hooks',
    tags: ['hooks', 'rules', 'best-practices', 'eslint'],
  },
  {
    id: 'react-29',
    question: 'What is React StrictMode and what does it do?',
    answer: `**React StrictMode** is a development tool that highlights potential problems in an application. It activates additional checks and warnings but doesn't affect production builds.

**Enabling StrictMode:**
\`\`\`jsx
import { StrictMode } from 'react';

function App() {
  return (
    <StrictMode>
      <MyComponent />
    </StrictMode>
  );
}
\`\`\`

**What StrictMode Does:**

**1. Double Invoking Component Functions:**
\`\`\`jsx
function MyComponent() {
  console.log('render'); // Logs twice in development with StrictMode

  useEffect(() => {
    console.log('mount'); // Logs once
    return () => console.log('unmount');
  }, []);

  return <div>Hello</div>;
}
\`\`\`

**Purpose:**
- Helps find impure functions (side effects in render)
- Catches issues with state updates
- Ensures components can handle being called multiple times

**2. Double Invoking Effects:**
- Runs setup and cleanup twice in development
- Helps find effects that need cleanup
- Ensures effects work correctly with React's future features

**3. Additional Checks:**
- Deprecated API usage warnings
- Unsafe lifecycle method warnings
- Legacy string ref warnings
- Unexpected mutations warnings

**Example - Finding Side Effects:**
\`\`\`jsx
// ❌ Problem - side effect in render
function BadComponent() {
  const data = fetchData(); // Side effect in render!
  return <div>{data}</div>;
}

// ✅ StrictMode catches this by rendering twice
// In production: might work once but fail on re-render
\`\`\`

**✅ Fix - Move to useEffect:**
\`\`\`jsx
function GoodComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return <div>{data}</div>;
}
\`\`\`

**What StrictMode DOESN'T Do:**
- Doesn't affect production builds
- Doesn't slow down production
- Doesn't add runtime overhead in production
- Only runs in development

**Best Practices:**
- Always use StrictMode in development
- Fix all warnings it produces
- Ensure components work with double renders
- Use it to find bugs early

**Summary:**
StrictMode is a development-only tool that helps you write better React code by catching common mistakes and ensuring your components work correctly with React's features.`,
    difficulty: 'beginner',
    category: 'Development',
    tags: ['strict-mode', 'development', 'debugging', 'best-practices'],
  },
  {
    id: 'react-30',
    question: 'What are the different ways to style React components?',
    answer: `React components can be styled using several approaches, each with different trade-offs.

**1. CSS Modules:**
\`\`\`jsx
// Button.module.css
.button {
  background: blue;
  color: white;
  padding: 10px;
}

// Button.jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.button}>Click me</button>;
}
\`\`\`

**Pros:** Scoped styles, familiar CSS syntax, build-time processing
**Cons:** Build setup required, no dynamic values

**2. Styled Components:**
\`\`\`jsx
import styled from 'styled-components';

const Button = styled.button\`
  background: blue;
  color: white;
  padding: 10px;
  \${props => props.primary && 'background: red;'}
\`;

function App() {
  return <Button primary>Click me</Button>;
}
\`\`\`

**Pros:** Dynamic values, props-based styling, CSS-in-JS
**Cons:** Runtime overhead, larger bundle size

**3. Tailwind CSS:**
\`\`\`jsx
function Button({ primary }) {
  return (
    <button className={\`px-4 py-2 text-white \${primary ? 'bg-red-500' : 'bg-blue-500'}\`}>
      Click me
    </button>
  );
}
\`\`\`

**Pros:** Utility-first, highly customizable, small bundle
**Cons:** HTML classes can get long, learning curve

**4. Inline Styles:**
\`\`\`jsx
function Button({ primary }) {
  const buttonStyle = {
    background: primary ? 'red' : 'blue',
    color: 'white',
    padding: '10px'
  };

  return <button style={buttonStyle}>Click me</button>;
}
\`\`\`

**Pros:** Dynamic values, no build step, JavaScript objects
**Cons:** No pseudo-classes, no media queries, verbose

**5. Traditional CSS:**
\`\`\`css
/* Button.css */
.button {
  background: blue;
  color: white;
  padding: 10px;
}
\`\`\`

\`\`\`jsx
import './Button.css';

function Button() {
  return <button className="button">Click me</button>;
}
\`\`\`

**Pros:** Simple, familiar, no build step
**Cons:** Global scope, naming conflicts

**6. CSS-in-JS (Emotion, JSS):**
\`\`\`jsx
import { css } from '@emotion/react';

const buttonStyle = css\`
  background: blue;
  color: white;
  padding: 10px;
\`;

function Button() {
  return <button css={buttonStyle}>Click me</button>;
}
\`\`\`

**Pros:** Scoped styles, dynamic values, theme support
**Cons:** Runtime overhead, complexity

**Comparison:**

| Method | Scoped | Dynamic | Runtime | Bundle Size |
|--------|--------|---------|---------|-------------|
| CSS Modules | ✅ | ❌ | No | Small |
| Styled Components | ✅ | ✅ | Yes | Large |
| Tailwind | ✅ | ✅ | No | Small |
| Inline | ✅ | ✅ | No | None |
| Traditional CSS | ❌ | ❌ | No | Small |
| CSS-in-JS | ✅ | ✅ | Yes | Medium |

**Choosing the Right Approach:**
- **CSS Modules** — Most projects, scoped styles needed
- **Tailwind** — Rapid development, utility-first approach
- **Styled Components** — Heavy dynamic styling, props-based themes
- **Inline** — Simple dynamic values, small components
- **Traditional CSS** — Simple projects, global styles`,
    difficulty: 'intermediate',
    category: 'Styling',
    tags: ['styling', 'css', 'styled-components', 'tailwind', 'css-modules'],
  },
];
