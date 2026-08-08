import { InterviewQuestion } from './html-questions';

export const nodejsInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'node-1',
    question: 'What is Node.js and what are its key features?',
    answer: `**Node.js** is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows you to run JavaScript on the server side.

**Key Features:**
- **Asynchronous and Event-Driven** — All APIs are non-blocking and event-driven
- **Single-Threaded** — Uses a single-threaded model with event looping
- **Fast Execution** — Built on V8 JavaScript engine, compiles to native machine code
- **Highly Scalable** — Event mechanism helps server handle many concurrent requests
- **No Buffering** — Node.js applications never buffer any data
- **Cross-Platform** — Runs on Windows, Linux, macOS, etc.
- **NPM Ecosystem** — Largest package ecosystem with over 1 million packages

**Basic Example:**
\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

**When to Use Node.js:**
- Real-time applications (chat, streaming)
- REST APIs and microservices
- Single-page applications (SPAs)
- Data-intensive applications
- I/O-heavy applications

**When NOT to Use Node.js:**
- CPU-intensive applications (video processing, image manipulation)
- Simple CRUD applications (overkill for simple cases)`,
    difficulty: 'beginner',
    category: 'Basics',
    tags: ['fundamentals', 'introduction', 'features', 'runtime'],
  },
  {
    id: 'node-2',
    question: 'What is the difference between Node.js and browser JavaScript?',
    answer: `**Node.js** and **browser JavaScript** share the same language but run in different environments with different capabilities.

**Key Differences:**

| Feature | Node.js | Browser |
|---------|---------|---------|
| Runtime | V8 engine on server | V8/SafariSpiderMonkey/etc. in browser |
| DOM API | No DOM access | Full DOM API |
| Window Object | No window object | Global window object |
| Global Object | \`global\` object | \`window\` object |
| Modules | CommonJS/ES Modules | ES Modules (limited) |
| File System | Full file system access | No file system access |
| Network | Full network access | Limited by CORS/security |
| Console | Server-side console | Browser console |

**Global Objects:**

**Node.js:**
\`\`\`javascript
// Node.js globals
console.log('Hello'); // ✓
process.env.NODE_ENV; // ✓
__dirname; // ✓
__filename; // ✓
require('./module'); // ✓

// Browser globals
window.alert('Hello'); // ✗
document.getElementById('app'); // ✗
localStorage.setItem('key', 'value'); // ✗
\`\`\`

**Browser:**
\`\`\`javascript
// Browser globals
console.log('Hello'); // ✓
window.alert('Hello'); // ✓
document.getElementById('app'); // ✓
localStorage.setItem('key', 'value'); // ✓

// Node.js globals
process.env.NODE_ENV; // ✗
__dirname; // ✗
require('./module'); // ✗
\`\`\`

**Module Systems:**

**Node.js (CommonJS):**
\`\`\`javascript
const fs = require('fs');
module.exports = { myFunction };
\`\`\`

**Browser (ES Modules):**
\`\`\`javascript
import { myFunction } from './module.js';
export { myFunction };
\`\`\`

**Environment-Specific Code:**
\`\`\`javascript
// Check if running in Node.js
if (typeof process !== 'undefined' && process.versions?.node) {
  console.log('Running in Node.js');
} else {
  console.log('Running in browser');
}
\`\`\``,
    difficulty: 'beginner',
    category: 'Basics',
    tags: ['environment', 'browser', 'comparison', 'globals'],
  },
  {
    id: 'node-3',
    question: 'What is the event loop in Node.js?',
    answer: `**The event loop** is the mechanism that allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded.

**How It Works:**

The event loop continuously checks the call stack and callback queue. When the call stack is empty, it processes events from the queue.

**Event Loop Phases:**

\`\`\`javascript
┌───────────────────────────┐
│     Timers (setTimeout)    │
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│  Pending Callbacks (I/O)   │
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│     Idle, Prepare         │
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│      Poll (new I/O)        │
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│     Check (setImmediate)   │
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│  Close Callbacks (cleanup) │
└───────────────────────────┘
\`\`\`

**Example:**
\`\`\`javascript
console.log('1 - Start');

setTimeout(() => {
  console.log('2 - setTimeout');
}, 0);

setImmediate(() => {
  console.log('3 - setImmediate');
});

Promise.resolve().then(() => {
  console.log('4 - Promise');
});

console.log('5 - End');

// Output order:
// 1 - Start
// 5 - End
// 4 - Promise (microtask, runs before macrotasks)
// 2 - setTimeout (or 3 - setImmediate, order varies)
// 3 - setImmediate (or 2 - setTimeout)
\`\`\`

**Microtasks vs Macrotasks:**

**Microtasks (higher priority):**
- Promise callbacks (.then, .catch)
- queueMicrotask()
- process.nextTick()

**Macrotasks (lower priority):**
- setTimeout
- setInterval
- setImmediate
- I/O callbacks

**process.nextTick():**
\`\`\`javascript
console.log('Start');

process.nextTick(() => {
  console.log('nextTick');
});

setTimeout(() => {
  console.log('setTimeout');
}, 0);

console.log('End');

// Output:
// Start
// End
// nextTick (runs before setTimeout)
// setTimeout
\`\`\`

**Key Points:**
- Event loop enables asynchronous, non-blocking I/O
- Microtasks run before macrotasks
- process.nextTick() has highest priority
- Timers don't guarantee exact timing
- I/O operations are offloaded to system kernel`,
    difficulty: 'intermediate',
    category: 'Core',
    tags: ['event-loop', 'asynchronous', 'callbacks', 'timers'],
  },
  {
    id: 'node-4',
    question: 'What is the difference between CommonJS and ES Modules in Node.js?',
    answer: `**CommonJS** (CJS) is the original module system in Node.js. **ES Modules** (ESM) is the standardized JavaScript module system.

**CommonJS (CJS):**

\`\`\`javascript
// Exporting
module.exports = {
  myFunction: () => console.log('Hello'),
  myValue: 42
};

// Or individual exports
exports.myFunction = () => console.log('Hello');
exports.myValue = 42;

// Importing
const { myFunction, myValue } = require('./module');
const module = require('./module');
\`\`\`

**ES Modules (ESM):**

\`\`\`javascript
// Exporting
export const myFunction = () => console.log('Hello');
export const myValue = 42;

// Or default export
export default {
  myFunction: () => console.log('Hello'),
  myValue: 42
};

// Importing
import { myFunction, myValue } from './module.js';
import module from './module.js';
\`\`\`

**Key Differences:**

| Feature | CommonJS | ES Modules |
|---------|----------|------------|
| Syntax | \`require()\`, \`module.exports\` | \`import\`, \`export\` |
| File Extension | .js, .cjs | .js (with "type": "module"), .mjs |
| Loading | Synchronous | Asynchronous |
| Caching | Cached in \`require.cache\` | Cached in module registry |
| Top-level await | Not supported | Supported |
| Dynamic import | \`require()\` | \`import()\` |
| __dirname | Available | Not available (use \`fileURLToPath\`) |

**Enabling ES Modules:**

**1. package.json:**
\`\`\`json
{
  "type": "module"
}
\`\`\`

**2. File extension:**
\`\`\`javascript
// Use .mjs extension for ES modules
// Use .cjs extension for CommonJS
\`\`\`

**Mixing Module Systems:**

\`\`\`javascript
// Import CommonJS in ES Module
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cjsModule = require('./cjs-module.cjs');

// Import ES Module in CommonJS
const esmModule = await import('./esm-module.mjs');
\`\`\`

**Dynamic Import:**
\`\`\`javascript
// ES Modules
const module = await import('./module.js');

// Conditional loading
if (condition) {
  const module = await import('./heavy-module.js');
}
\`\`\`

**__dirname in ES Modules:**
\`\`\`javascript
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
\`\`\`

**Best Practice:** Use ES Modules for new projects. They're the standard and offer better tree-shaking and static analysis.`,
    difficulty: 'intermediate',
    category: 'Modules',
    tags: ['modules', 'commonjs', 'es-modules', 'import-export'],
  },
  {
    id: 'node-5',
    question: 'What are buffers and streams in Node.js?',
    answer: `**Buffers** and **streams** are two important concepts in Node.js for handling binary data and efficient data processing.

**Buffers:**

Buffers are fixed-size chunks of memory used to store binary data.

\`\`\`javascript
// Creating buffers
const buf1 = Buffer.alloc(10); // 10 bytes, zero-filled
const buf2 = Buffer.from('Hello'); // From string
const buf3 = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // From array

// Reading/writing
buf1.write('Hello');
console.log(buf1.toString()); // "Hello"

// Buffer operations
const buf4 = Buffer.concat([buf2, buf3]);
console.log(buf4.toString()); // "HelloHello"
\`\`\`

**Streams:**

Streams are objects that let you read data from a source or write data to a destination in a continuous fashion.

**Types of Streams:**
- **Readable** — For reading data (fs.createReadStream)
- **Writable** — For writing data (fs.createWriteStream)
- **Duplex** — Both readable and writable (net.Socket)
- **Transform** — Can modify data as it's written and read (zlib.createGzip)

**Example: File Copy with Streams:**
\`\`\`javascript
const fs = require('fs');

// Without streams (loads entire file into memory)
const data = fs.readFileSync('large-file.txt');
fs.writeFileSync('copy.txt', data);

// With streams (processes in chunks)
const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('copy.txt');

readStream.pipe(writeStream);

// With error handling
readStream
  .on('error', (err) => console.error('Read error:', err))
  .pipe(writeStream)
  .on('error', (err) => console.error('Write error:', err))
  .on('finish', () => console.log('Copy complete'));
\`\`\`

**Stream Events:**

\`\`\`javascript
const readStream = fs.createReadStream('file.txt');

readStream
  .on('data', (chunk) => {
    console.log('Received chunk:', chunk.length);
  })
  .on('end', () => {
    console.log('Stream ended');
  })
  .on('error', (err) => {
    console.error('Error:', err);
  });
\`\`\`

**Transform Stream:**
\`\`\`javascript
const { Transform } = require('stream');

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

readStream
  .pipe(upperCaseTransform)
  .pipe(writeStream);
\`\`\`

**Benefits of Streams:**
- Memory efficiency — Process data in chunks, not all at once
- Time efficiency — Start processing before all data is available
- Composability — Chain streams together with pipe()
- Backpressure handling — Automatically manage flow control

**When to Use:**
- Large file operations
- Network communications
- Real-time data processing
- Data compression/encryption`,
    difficulty: 'intermediate',
    category: 'Core',
    tags: ['buffers', 'streams', 'data-processing', 'file-system'],
  },
  {
    id: 'node-6',
    question: 'What is the difference between process.nextTick() and setImmediate()?',
    answer: `**process.nextTick()** and **setImmediate()** are both used for scheduling callbacks, but they fire at different points in the event loop.

**process.nextTick():**
- Fires **before** the event loop continues
- Has **higher priority** than other microtasks
- Can cause I/O starvation if overused
- Part of the microtask queue

**setImmediate():**
- Fires **after** I/O callbacks in the event loop
- Has **lower priority** than process.nextTick()
- Safer for preventing I/O starvation
- Part of the check phase in the event loop

**Example:**
\`\`\`javascript
console.log('Start');

process.nextTick(() => {
  console.log('nextTick 1');
  process.nextTick(() => {
    console.log('nextTick 2');
  });
});

setImmediate(() => {
  console.log('setImmediate 1');
  setImmediate(() => {
    console.log('setImmediate 2');
  });
});

console.log('End');

// Output:
// Start
// End
// nextTick 1
// nextTick 2
// setImmediate 1
// setImmediate 2
\`\`\`

**Event Loop Order:**
\`\`\`javascript
console.log('1 - Start');

setTimeout(() => console.log('2 - setTimeout'), 0);
setImmediate(() => console.log('3 - setImmediate'));
process.nextTick(() => console.log('4 - nextTick'));
Promise.resolve().then(() => console.log('5 - Promise'));

console.log('6 - End');

// Output:
// 1 - Start
// 6 - End
// 4 - nextTick (highest priority)
// 5 - Promise (microtask)
// 2 - setTimeout (or 3 - setImmediate)
// 3 - setImmediate (or 2 - setTimeout)
\`\`\`

**When to Use Each:**

**process.nextTick():**
- When you need to run code immediately after current operation
- For handling errors before continuing
- When you need to ensure callback runs before event loop continues
- Breaking up long-running operations

**setImmediate():**
- When you want to run code after I/O callbacks
- For non-urgent background processing
- When you want to prevent I/O starvation
- For recursive operations that shouldn't block I/O

**Example - Recursive Operations:**

\`\`\`javascript
// ❌ Bad - process.nextTick can cause I/O starvation
function processItem(items, index) {
  if (index < items.length) {
    // Process item
    processItem(items, index + 1); // Recursive nextTick
  }
}

// ✅ Good - setImmediate allows I/O to happen
function processItem(items, index) {
  if (index < items.length) {
    // Process item
    setImmediate(() => processItem(items, index + 1));
  }
}
\`\`\`

**Best Practice:** Use \`setImmediate()\` for most cases. Use \`process.nextTick()\` only when you truly need immediate execution after the current operation.`,
    difficulty: 'intermediate',
    category: 'Core',
    tags: ['event-loop', 'timing', 'callbacks', 'process'],
  },
  {
    id: 'node-7',
    question: 'What is the difference between fork, spawn, and exec in Node.js?',
    answer: `**fork**, **spawn**, and **exec** are methods in the \`child_process\` module for creating new processes in Node.js.

**spawn():**
- Spawns a new process
- Returns a stream-based ChildProcess object
- Best for long-running processes with large output
- Streams output as it arrives

\`\`\`javascript
const { spawn } = require('child_process');

const ls = spawn('ls', ['-la', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(\`stdout: \${data}\`);
});

ls.stderr.on('data', (data) => {
  console.error(\`stderr: \${data}\`);
});

ls.on('close', (code) => {
  console.log(\`child process exited with code \${code}\`);
});
\`\`\`

**exec():**
- Spawns a shell and runs a command within that shell
- Buffers the output and passes it to a callback
- Best for one-time commands with small output
- Has max buffer size limitation

\`\`\`javascript
const { exec } = require('child_process');

exec('ls -la /usr', (error, stdout, stderr) => {
  if (error) {
    console.error(\`exec error: \${error}\`);
    return;
  }
  console.log(\`stdout: \${stdout}\`);
  console.error(\`stderr: \${stderr}\`);
});
\`\`\`

**fork():**
- Spawns a new Node.js process
- Specialized for Node.js processes
- Enables communication between parent and child via IPC
- Best for CPU-intensive tasks

\`\`\`javascript
// parent.js
const { fork } = require('child_process');

const child = fork('./child.js');

child.on('message', (message) => {
  console.log('Parent received:', message);
});

child.send({ hello: 'parent' });

// child.js
process.on('message', (message) => {
  console.log('Child received:', message);
  process.send({ hello: 'child' });
});
\`\`\`

**Comparison:**

| Feature | spawn | exec | fork |
|---------|-------|------|------|
| Output | Streams | Buffered | Streams (IPC) |
| Best For | Long processes | Small output | Node.js processes |
| Communication | Limited | None | IPC channel |
| Shell | No | Yes | No |
| Performance | Fast | Slower | Fast (Node.js) |
| Memory | Low | High (buffer) | Medium |

**When to Use Each:**

**spawn:**
- Long-running processes
- Large output streams
- Real-time data processing
- When you need to control the process

**exec:**
- Simple one-time commands
- Small output
- When you need shell features (pipes, redirects)
- Quick scripts

**fork:**
- CPU-intensive tasks
- Parallel processing in Node.js
- When you need IPC between processes
- Multi-process applications

**Example - CPU-Intensive Task:**
\`\`\`javascript
// parent.js
const { fork } = require('child_process');

function heavyCalculation(data) {
  return new Promise((resolve) => {
    const child = fork('./calc-worker.js');
    child.send(data);
    child.on('message', resolve);
  });
}

// calc-worker.js
process.on('message', (data) => {
  // Perform heavy calculation
  const result = expensiveOperation(data);
  process.send(result);
});
\`\`\``,
    difficulty: 'advanced',
    category: 'Process',
    tags: ['child-process', 'spawn', 'exec', 'fork', 'ipc'],
  },
  {
    id: 'node-8',
    question: 'What is the cluster module in Node.js?',
    answer: `**The cluster module** allows you to create child processes (workers) that share the same server port, enabling Node.js to take advantage of multi-core systems.

**Basic Usage:**
\`\`\`javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(\`Master \${process.pid} is running\`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    cluster.fork(); // Restart worker
  });
} else {
  // Workers can share any TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello from worker ' + process.pid);
  }).listen(3000);

  console.log(\`Worker \${process.pid} started\`);
}
\`\`\`

**How It Works:**
- Master process manages workers
- Workers share the same port
- OS load balances incoming connections across workers
- Each worker runs in its own process/memory space

**Cluster Events:**
\`\`\`javascript
cluster.on('fork', (worker) => {
  console.log('Worker forked:', worker.id);
});

cluster.on('online', (worker) => {
  console.log('Worker online:', worker.id);
});

cluster.on('listening', (worker, address) => {
  console.log('Worker listening:', address);
});

cluster.on('exit', (worker, code, signal) => {
  console.log('Worker died:', worker.id);
});
\`\`\`

**Worker Communication:**
\`\`\`javascript
// Master to worker
if (cluster.isMaster) {
  const worker = cluster.fork();
  worker.send('Hello from master');
}

// Worker
if (cluster.isWorker) {
  process.on('message', (msg) => {
    console.log('Worker received:', msg);
  });
}
\`\`\`

**Graceful Shutdown:**
\`\`\`javascript
if (cluster.isMaster) {
  process.on('SIGTERM', () => {
    console.log('Master received SIGTERM');
    
    for (const id in cluster.workers) {
      cluster.workers[id].send('shutdown');
    }
  });
} else {
  process.on('message', (msg) => {
    if (msg === 'shutdown') {
      // Close server gracefully
      server.close(() => {
        process.exit(0);
      });
    }
  });
}
\`\`\`

**Benefits:**
- Utilizes multiple CPU cores
- Improved performance for CPU-bound tasks
- Better fault tolerance (worker crash doesn't kill app)
- Zero-downtime restarts

**Limitations:**
- Each worker has its own memory (no shared state)
- Increased memory usage
- Complex state management
- Not ideal for I/O-bound tasks (Node.js already handles these well)

**When to Use:**
- CPU-intensive applications
- High-throughput APIs
- When you need to utilize multiple cores
- Production servers requiring high availability

**Alternative:** Consider using process managers like PM2 instead of managing clusters manually.`,
    difficulty: 'advanced',
    category: 'Process',
    tags: ['cluster', 'multi-core', 'performance', 'workers'],
  },
  {
    id: 'node-9',
    question: 'What is middleware in Express.js?',
    answer: `**Middleware** functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.

**Basic Middleware:**
\`\`\`javascript
const express = require('express');
const app = express();

// Simple middleware
function logger(req, res, next) {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // Pass control to next middleware
}

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World');
});
\`\`\`

**Middleware Types:**

**1. Application-level middleware:**
\`\`\`javascript
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});
\`\`\`

**2. Router-level middleware:**
\`\`\`javascript
const router = express.Router();

router.use((req, res, next) => {
  console.log('Router middleware');
  next();
});

router.get('/users', (req, res) => {
  res.send('Users');
});

app.use('/api', router);
\`\`\`

**3. Error-handling middleware:**
\`\`\`javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
\`\`\`

**4. Built-in middleware:**
\`\`\`javascript
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static('public')); // Serve static files
\`\`\`

**Third-party Middleware:**
\`\`\`javascript
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
\`\`\`

**Middleware Order:**
\`\`\`javascript
app.use(express.json()); // 1. Parse body
app.use(logger); // 2. Log request
app.use(authenticate); // 3. Check auth
app.get('/protected', handler); // 4. Handle request
\`\`\`

**Next Function:**
\`\`\`javascript
app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // Continue to next middleware
  } else {
    next(new Error('Not authenticated')); // Skip to error handler
  }
});
\`\`\`

**Custom Middleware Example:**
\`\`\`javascript
function validateUser(req, res, next) {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }
  
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password too short' });
  }
  
  next(); // Valid, continue
}

app.post('/login', validateUser, (req, res) => {
  // Handle login
});
\`\`\`

**Best Practices:**
- Order middleware correctly
- Always call next() unless ending response
- Use error-handling middleware for errors
- Keep middleware focused and reusable
- Use third-party middleware for common tasks`,
    difficulty: 'intermediate',
    category: 'Express',
    tags: ['express', 'middleware', 'request-response', 'routing'],
  },
  {
    id: 'node-10',
    question: 'What is the difference between require and import in Node.js?',
    answer: `**require** is the CommonJS module system, while **import** is the ES6 module system. They have different behaviors and use cases.

**require (CommonJS):**

\`\`\`javascript
// Synchronous loading
const fs = require('fs');
const { readFile } = require('fs');

// Dynamic require
const moduleName = 'fs';
const fs = require(moduleName);

// Conditional require
if (condition) {
  const module = require('./module');
}
\`\`\`

**import (ES Modules):**

\`\`\`javascript
// Static loading (top-level only)
import fs from 'fs';
import { readFile } from 'fs';

// Named imports
import { readFile, writeFile } from 'fs';

// Default import
import fs from 'fs';

// Namespace import
import * as fs from 'fs';

// Dynamic import (returns Promise)
const fs = await import('fs');
\`\`\`

**Key Differences:**

| Feature | require | import |
|---------|---------|--------|
| Loading | Synchronous | Asynchronous |
| Hoisting | Not hoisted | Hoisted to top |
| Dynamic | Yes (runtime) | Limited (import()) |
| Conditional | Yes | No (top-level only) |
| File Extension | .js, .json | .js (with "type": "module"), .mjs |
| Tree Shaking | No | Yes |
| this | Module object | undefined |
| Caching | require.cache | Module registry |

**Synchronous vs Asynchronous:**
\`\`\`javascript
// require - Synchronous, blocks execution
const fs = require('fs'); // Loads immediately
console.log('After require');

// import - Asynchronous, doesn't block
import fs from 'fs'; // Loads during module evaluation
console.log('After import');
\`\`\`

**Dynamic Import:**
\`\`\`javascript
// require - Always dynamic
const moduleName = condition ? 'fs' : 'path';
const module = require(moduleName);

// import - Dynamic with import()
if (condition) {
  const fs = await import('fs');
  const fs = await import('./module.js');
}
\`\`\`

**Enabling ES Modules:**
\`\`\`json
// package.json
{
  "type": "module"
}
\`\`\`

**Mixed Usage:**
\`\`\`javascript
// Using require in ES Module
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cjsModule = require('./cjs-module.cjs');

// Using import in CommonJS
const esmModule = await import('./esm-module.mjs');
\`\`\`

**Best Practice:** Use ES Modules (import) for new projects. They offer better performance, tree-shaking, and are the modern standard. Use require only when working with legacy CommonJS code.`,
    difficulty: 'intermediate',
    category: 'Modules',
    tags: ['require', 'import', 'modules', 'commonjs', 'es-modules'],
  },
  {
    id: 'node-11',
    question: 'What is EventEmitter in Node.js?',
    answer: `**EventEmitter** is a class in Node.js that facilitates communication between objects using events. It's the foundation for many Node.js APIs.

**Basic Usage:**
\`\`\`javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Register event listener
myEmitter.on('event', () => {
  console.log('Event occurred!');
});

// Emit event
myEmitter.emit('event'); // "Event occurred!"
\`\`\`

**EventEmitter Methods:**

**on() - Add listener:**
\`\`\`javascript
myEmitter.on('data', (data) => {
  console.log('Received:', data);
});
\`\`\`

**once() - Add one-time listener:**
\`\`\`javascript
myEmitter.once('connect', () => {
  console.log('Connected!');
});

myEmitter.emit('connect'); // "Connected!"
myEmitter.emit('connect'); // No output
\`\`\`

**emit() - Trigger event:**
\`\`\`javascript
myEmitter.emit('event', arg1, arg2, ...);
\`\`\`

**removeListener() - Remove specific listener:**
\`\`\`javascript
const handler = () => console.log('Handler');
myEmitter.on('event', handler);
myEmitter.removeListener('event', handler);
\`\`\`

**removeAllListeners() - Remove all listeners:**
\`\`\`javascript
myEmitter.removeAllListeners('event');
\`\`\`

**Error Events:**
\`\`\`javascript
myEmitter.on('error', (err) => {
  console.error('Error:', err);
});

// If no error listener, errors will crash the process
myEmitter.emit('error', new Error('Something went wrong'));
\`\`\`

**Practical Example:**
\`\`\`javascript
const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    this.emit('log', message);
    console.log(message);
  }

  error(message) {
    this.emit('error', new Error(message));
  }
}

const logger = new Logger();

logger.on('log', (message) => {
  // Could send to external service
  console.log('Log event:', message);
});

logger.on('error', (err) => {
  // Could send to error tracking service
  console.error('Error event:', err.message);
});

logger.log('Application started');
logger.error('Database connection failed');
\`\`\`

**Built-in EventEmitter Usage:**
\`\`\`javascript
const fs = require('fs');

const readStream = fs.createReadStream('file.txt');

readStream.on('data', (chunk) => {
  console.log('Received chunk');
});

readStream.on('end', () => {
  console.log('Stream ended');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});
\`\`\`

**EventEmitter Max Listeners:**
\`\`\`javascript
// Default max listeners is 10
myEmitter.setMaxListeners(20); // Increase limit

// Check current listener count
console.log(myEmitter.listenerCount('event'));
\`\`\`

**Best Practices:**
- Always handle error events
- Remove listeners when no longer needed
- Use appropriate listener limits
- Avoid memory leaks with long-lived emitters
- Consider using once() for one-time events`,
    difficulty: 'intermediate',
    category: 'Core',
    tags: ['events', 'eventemitter', 'patterns', 'communication'],
  },
  {
    id: 'node-12',
    question: 'What is the difference between readFile and createReadStream in Node.js?',
    answer: `**readFile** loads the entire file into memory, while **createReadStream** reads the file in chunks using streams.

**readFile:**
\`\`\`javascript
const fs = require('fs');

// Asynchronous
fs.readFile('large-file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data); // Entire file in memory
});

// Synchronous (blocks event loop)
const data = fs.readFileSync('file.txt', 'utf8');
\`\`\`

**createReadStream:**
\`\`\`javascript
const fs = require('fs');

const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024 // 64KB chunks
});

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length);
  // Process chunk immediately
});

readStream.on('end', () => {
  console.log('Stream finished');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});
\`\`\`

**Key Differences:**

| Feature | readFile | createReadStream |
|---------|----------|------------------|
| Memory | Loads entire file | Reads in chunks |
| Speed | Faster for small files | Slower for small files |
| Blocking | Sync version blocks | Never blocks |
| Large Files | Can cause memory issues | Memory efficient |
| Processing | Must wait for full read | Process as data arrives |
| Use Case | Small files, config | Large files, data transfer |

**When to Use readFile:**
- Small files (< 100MB)
- Configuration files
- When you need the entire file at once
- Simple file operations
- Quick scripts

**When to Use createReadStream:**
- Large files (> 100MB)
- Memory-constrained environments
- Real-time data processing
- File uploads/downloads
- When you need to process data as it arrives

**Example - File Copy:**

\`\`\`javascript
// ❌ Bad for large files - loads entire file into memory
const fs = require('fs');
const data = fs.readFileSync('large-file.txt');
fs.writeFileSync('copy.txt', data);

// ✅ Good for large files - streams in chunks
const fs = require('fs');
const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('copy.txt');

readStream.pipe(writeStream);
\`\`\`

**Example - File Processing:**

\`\`\`javascript
// Process file line by line with streams
const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('large-file.txt');
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  console.log('Line:', line);
  // Process each line as it arrives
});
\`\`\`

**Memory Comparison:**
\`\`\`javascript
// readFile - Memory usage = file size
fs.readFile('1GB-file.txt', (err, data) => {
  // Uses ~1GB memory
});

// createReadStream - Memory usage = chunk size
fs.createReadStream('1GB-file.txt', { highWaterMark: 64 * 1024 });
// Uses ~64KB memory
\`\`\`

**Best Practice:** Use \`createReadStream\` for large files and when memory efficiency matters. Use \`readFile\` for small files and simplicity.`,
    difficulty: 'intermediate',
    category: 'File System',
    tags: ['file-system', 'streams', 'readfile', 'performance'],
  },
  {
    id: 'node-13',
    question: 'What is the difference between process.env and configuration files?',
    answer: `**process.env** and **configuration files** are both used for application configuration, but they serve different purposes and have different use cases.

**process.env:**
\`\`\`javascript
// Access environment variables
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;

// Set environment variable
process.env.NODE_ENV = 'production';
\`\`\`

**Configuration Files:**
\`\`\`javascript
// config.json
{
  "port": 3000,
  "database": {
    "host": "localhost",
    "port": 5432
  }
}

// config.js
module.exports = {
  port: 3000,
  database: {
    host: 'localhost',
    port: 5432
  }
};
\`\`\`

**Key Differences:**

| Feature | process.env | Config Files |
|---------|-------------|--------------|
| Purpose | Environment-specific | Application settings |
| Security | Secrets (with .env) | Non-sensitive data |
| Flexibility | Runtime changes | Build-time changes |
| Deployment | Easy (12-factor app) | Requires config management |
| Type | Strings only | Any JSON type |
| Validation | Manual | Can be validated |

**Environment Variables (.env):**
\`\`\`bash
# .env file
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://localhost/mydb
API_KEY=secret_key_here
\`\`\`

\`\`\`javascript
// Using dotenv package
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 3000,
  database: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY
};
\`\`\`

**Configuration File Example:**
\`\`\`javascript
// config/default.json
{
  "port": 3000,
  "database": {
    "host": "localhost",
    "port": 5432
  }
}

// config/production.json
{
  "port": 80,
  "database": {
    "host": "prod-db.example.com",
    "port": 5432
  }
}

// Using config package
const config = require('config');
const port = config.get('port');
const dbHost = config.get('database.host');
\`\`\`

**Best Practices:**

**Use process.env for:**
- API keys and secrets
- Environment-specific settings
- Deployment configuration
- Sensitive data
- Settings that change between environments

**Use config files for:**
- Application structure
- Feature flags
- Default settings
- Non-sensitive configuration
- Complex nested configuration

**Combined Approach:**
\`\`\`javascript
// config.js
require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 3000,
  database: {
    url: process.env.DATABASE_URL,
    poolSize: parseInt(process.env.DB_POOL_SIZE) || 10
  },
  features: {
    enableCache: process.env.ENABLE_CACHE === 'true',
    maxUploadSize: parseInt(process.env.MAX_UPLOAD_SIZE) || 10485760
  }
};
\`\`\`

**12-Factor App Methodology:**
- Store config in environment variables
- Keep config separate from code
- Never commit secrets to version control
- Use .env files for local development
- Validate config at startup`,
    difficulty: 'intermediate',
    category: 'Configuration',
    tags: ['environment', 'configuration', 'env', 'best-practices'],
  },
  {
    id: 'node-14',
    question: 'What is the difference between http and https modules in Node.js?',
    answer: `**http** and **https** modules are used to create HTTP and HTTPS servers in Node.js. The main difference is that HTTPS uses SSL/TLS for encrypted communication.

**HTTP Server:**
\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello HTTP!');
});

server.listen(80, () => {
  console.log('HTTP server running on port 80');
});
\`\`\`

**HTTPS Server:**
\`\`\`javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello HTTPS!');
});

server.listen(443, () => {
  console.log('HTTPS server running on port 443');
});
\`\`\`

**Key Differences:**

| Feature | HTTP | HTTPS |
|---------|------|-------|
| Protocol | Unencrypted | Encrypted (SSL/TLS) |
| Port | 80 (default) | 443 (default) |
| Performance | Faster | Slower (encryption overhead) |
| Security | Not secure | Secure |
| Setup | Simple | Requires certificates |
| SEO | Lower ranking | Higher ranking |

**HTTP Request:**
\`\`\`javascript
const http = require('http');

const options = {
  hostname: 'example.com',
  port: 80,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(\`Status: \${res.statusCode}\`);
  res.on('data', (chunk) => {
    console.log(chunk.toString());
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
\`\`\`

**HTTPS Request:**
\`\`\`javascript
const https = require('https');

const options = {
  hostname: 'example.com',
  port: 443,
  path: '/',
  method: 'GET'
};

const req = https.request(options, (res) => {
  console.log(\`Status: \${res.statusCode}\`);
  res.on('data', (chunk) => {
    console.log(chunk.toString());
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
\`\`\`

**Self-Signed Certificates (Development):**
\`\`\`javascript
const https = require('https');
const fs = require('fs');

// Generate self-signed certificate
// openssl req -nodes -new -x509 -keyout private-key.pem -out certificate.pem

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem'),
  rejectUnauthorized: false // Only for development
};

const server = https.createServer(options, (req, res) => {
  res.end('Hello HTTPS!');
});

server.listen(443);
\`\`\`

**HTTP/2 Support:**
\`\`\`javascript
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
}, (req, res) => {
  res.end('Hello HTTP/2!');
});

server.listen(443);
\`\`\`

**Best Practices:**
- Always use HTTPS in production
- Use valid certificates from trusted CAs
- Implement proper SSL/TLS configuration
- Use HTTP/2 for better performance
- Redirect HTTP to HTTPS
- Keep certificates secure`,
    difficulty: 'intermediate',
    category: 'Networking',
    tags: ['http', 'https', 'ssl', 'tls', 'security'],
  },
  {
    id: 'node-15',
    question: 'What is the difference between callbacks, promises, and async/await in Node.js?',
    answer: `**Callbacks**, **promises**, and **async/await** are three different ways to handle asynchronous operations in Node.js, each with different syntax and use cases.

**Callbacks:**
\`\`\`javascript
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Data:', data);
});

// Callback hell (nested callbacks)
fs.readFile('file1.txt', (err, data1) => {
  fs.readFile('file2.txt', (err, data2) => {
    fs.readFile('file3.txt', (err, data3) => {
      // Nested deeply
    });
  });
});
\`\`\`

**Promises:**
\`\`\`javascript
const fs = require('fs').promises;

fs.readFile('file.txt', 'utf8')
  .then(data => {
    console.log('Data:', data);
  })
  .catch(err => {
    console.error('Error:', err);
  });

// Chaining promises
fs.readFile('file1.txt', 'utf8')
  .then(data1 => {
    return fs.readFile('file2.txt', 'utf8');
  })
  .then(data2 => {
    return fs.readFile('file3.txt', 'utf8');
  })
  .then(data3 => {
    console.log('All files read');
  })
  .catch(err => {
    console.error('Error:', err);
  });
\`\`\`

**Async/Await:**
\`\`\`javascript
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log('Data:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}

readFile();

// Sequential async operations
async function readFiles() {
  try {
    const data1 = await fs.readFile('file1.txt', 'utf8');
    const data2 = await fs.readFile('file2.txt', 'utf8');
    const data3 = await fs.readFile('file3.txt', 'utf8');
    console.log('All files read');
  } catch (err) {
    console.error('Error:', err);
  }
}
\`\`\`

**Comparison:**

| Feature | Callbacks | Promises | Async/Await |
|---------|-----------|----------|-------------|
| Syntax | Nested functions | .then()/.catch() | async/await |
| Readability | Poor (callback hell) | Good | Excellent |
| Error Handling | Err-first pattern | .catch() | try/catch |
| Chaining | Manual | Built-in | await keyword |
| Parallel | Complex | Promise.all() | Promise.all() |
| Debugging | Difficult | Easier | Easiest |

**Parallel Operations:**

\`\`\`javascript
// Promises
Promise.all([
  fs.readFile('file1.txt', 'utf8'),
  fs.readFile('file2.txt', 'utf8'),
  fs.readFile('file3.txt', 'utf8')
])
  .then(([data1, data2, data3]) => {
    console.log('All files read');
  });

// Async/Await
async function readFilesParallel() {
  const [data1, data2, data3] = await Promise.all([
    fs.readFile('file1.txt', 'utf8'),
    fs.readFile('file2.txt', 'utf8'),
    fs.readFile('file3.txt', 'utf8')
  ]);
  console.log('All files read');
}
\`\`\`

**Error Handling:**

\`\`\`javascript
// Callback
fs.readFile('file.txt', (err, data) => {
  if (err) return handleError(err);
  process(data);
});

// Promise
fs.readFile('file.txt')
  .then(process)
  .catch(handleError);

// Async/Await
try {
  const data = await fs.readFile('file.txt');
  process(data);
} catch (err) {
  handleError(err);
}
\`\`\`

**Best Practice:** Use async/await for new code. It's the most readable and maintainable approach. Use promises when working with libraries that return them. Avoid callbacks unless working with legacy code.`,
    difficulty: 'intermediate',
    category: 'Asynchronous',
    tags: ['callbacks', 'promises', 'async-await', 'asynchronous'],
  },
  {
    id: 'node-16',
    question: 'What is the difference between util.promisify and util.callbackify?',
    answer: `**util.promisify** converts callback-based functions to Promise-based functions. **util.callbackify** does the reverse - converts Promise-based functions to callback-based functions.

**util.promisify:**
\`\`\`javascript
const util = require('util');
const fs = require('fs');

// Convert callback-based readFile to promise-based
const readFilePromise = util.promisify(fs.readFile);

// Now use with promises
readFilePromise('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Or with async/await
async function readFile() {
  try {
    const data = await readFilePromise('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

**Custom Promisification:**
\`\`\`javascript
const util = require('util');

function callbackFunction(arg1, arg2, callback) {
  setTimeout(() => {
    callback(null, arg1 + arg2);
  }, 1000);
}

const promisedFunction = util.promisify(callbackFunction);

promisedFunction('Hello', ' World')
  .then(result => console.log(result)) // "Hello World"
  .catch(err => console.error(err));
\`\`\`

**util.callbackify:**
\`\`\`javascript
const util = require('util');

async function asyncFunction(arg1, arg2) {
  return arg1 + arg2;
}

const callbackFunction = util.callbackify(asyncFunction);

callbackFunction('Hello', ' World', (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result); // "Hello World"
  }
});
\`\`\`

**Error Handling:**

\`\`\`javascript
// promisify - errors reject the promise
const readFile = util.promisify(fs.readFile);

readFile('nonexistent.txt')
  .catch(err => console.error('Error:', err));

// callbackify - rejected promises become callback errors
const asyncFunc = async () => {
  throw new Error('Something went wrong');
};

const callbackFunc = util.callbackify(asyncFunc);

callbackFunc((err, result) => {
  if (err) {
    console.error('Error:', err); // "Error: Something went wrong"
  }
});
\`\`\`

**Custom Promise Implementation:**
\`\`\`javascript
const util = require('util');

// Custom function with promisify support
function customFunction(arg1, callback) {
  // Must follow Node.js callback convention
  // callback(error, result)
  setTimeout(() => {
    callback(null, arg1 * 2);
  }, 100);
}

customFunction[util.promisify.custom] = async (arg1) => {
  // Custom promisify implementation
  return arg1 * 2;
};

const promised = util.promisify(customFunction);
\`\`\`

**When to Use Each:**

**util.promisify:**
- Converting legacy callback APIs to promises
- Modernizing old code
- Using async/await with callback-based libraries
- Better error handling and chaining

**util.callbackify:**
- Providing callback interfaces for promise-based code
- Interoperability with callback-based systems
- When you need to support both interfaces

**Built-in Promisified API:**
\`\`\`javascript
// Node.js now has built-in promise support
const fs = require('fs').promises;

// No need for util.promisify
async function readFile() {
  const data = await fs.readFile('file.txt', 'utf8');
  console.log(data);
}
\`\`\`

**Best Practice:** Use the built-in promise APIs when available (fs.promises). Use util.promisify for custom callback functions or third-party libraries without promise support.`,
    difficulty: 'advanced',
    category: 'Utilities',
    tags: ['promisify', 'callbackify', 'promises', 'callbacks', 'util'],
  },
  {
    id: 'node-17',
    question: 'What is the difference between setImmediate and setTimeout in Node.js?',
    answer: `**setImmediate** and **setTimeout** both schedule callbacks, but they execute at different points in the event loop.

**setTimeout:**
\`\`\`javascript
setTimeout(() => {
  console.log('setTimeout');
}, 0); // Minimum delay is 1ms
\`\`\`

**setImmediate:**
\`\`\`javascript
setImmediate(() => {
  console.log('setImmediate');
});
\`\`\`

**Execution Order:**
\`\`\`javascript
console.log('Start');

setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));

console.log('End');

// Output:
// Start
// End
// setTimeout OR setImmediate (order varies)
\`\`\`

**Event Loop Position:**

\`\`\`javascript
┌───────────────────────────┐
│     Timers (setTimeout)    │  ← setTimeout callbacks run here
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│  Pending Callbacks (I/O)   │
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│     Idle, Prepare         │
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│      Poll (new I/O)        │
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│     Check (setImmediate)   │  ← setImmediate callbacks run here
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│  Close Callbacks (cleanup) │
└───────────────────────────┘
\`\`\`

**Key Differences:**

| Feature | setTimeout | setImmediate |
|---------|------------|--------------|
| Minimum Delay | 1ms | 0ms |
| Event Loop Phase | Timers phase | Check phase |
| Order | Can be delayed | Runs after I/O |
| Precision | Less precise | More consistent |
| Browser Support | Yes | No |

**When Order is Predictable:**
\`\`\`javascript
// In I/O cycle - setImmediate runs first
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('setTimeout'), 0);
  setImmediate(() => console.log('setImmediate'));
  // Output: setImmediate, setTimeout
});

// In main module - order varies
setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));
// Output: varies (setTimeout or setImmediate)
\`\`\`

**Recursive Operations:**

\`\`\`javascript
// setTimeout - can cause I/O starvation
function recursiveTimeout() {
  setTimeout(() => {
    console.log('timeout');
    recursiveTimeout();
  }, 0);
}

// setImmediate - allows I/O between callbacks
function recursiveImmediate() {
  setImmediate(() => {
    console.log('immediate');
    recursiveImmediate();
  });
}
\`\`\`

**When to Use Each:**

**setTimeout:**
- When you need a minimum delay
- Time-based operations
- Debouncing/throttling
- Browser compatibility needed

**setImmediate:**
- When you want to run code after I/O callbacks
- Breaking up long-running operations
- Recursive operations that shouldn't block I/O
- When order relative to I/O matters

**Best Practice:** Use \`setImmediate\` for most cases in Node.js when you want to defer execution. Use \`setTimeout\` when you actually need a time delay.`,
    difficulty: 'intermediate',
    category: 'Timers',
    tags: ['timers', 'settimeout', 'setimmediate', 'event-loop'],
  },
  {
    id: 'node-18',
    question: 'What is the difference between buffer and string in Node.js?',
    answer: `**Buffers** are binary data storage, while **strings** are text data. They serve different purposes and have different performance characteristics.

**Buffer:**
\`\`\`javascript
const buf = Buffer.from('Hello');

console.log(buf); // <Buffer 48 65 6c 6c 6f>
console.log(buf.length); // 5
console.log(buf[0]); // 72 (ASCII code for 'H')
console.log(buf.toString()); // "Hello"
\`\`\`

**String:**
\`\`\`javascript
const str = 'Hello';

console.log(str); // "Hello"
console.log(str.length); // 5
console.log(str[0]); // "H"
console.log(str.charCodeAt(0)); // 72
\`\`\`

**Key Differences:**

| Feature | Buffer | String |
|---------|--------|--------|
| Data Type | Binary | Text |
| Encoding | None | UTF-8 (default) |
| Memory | Fixed size | Variable size |
| Mutability | Mutable | Immutable |
| Performance | Better for binary | Better for text |
| Use Case | Images, files, network | Text processing |

**Creating Buffers:**
\`\`\`javascript
// From string
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.from('Hello', 'utf8');
const buf3 = Buffer.from('Hello', 'base64');

// From array
const buf4 = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]);

// Allocate empty buffer
const buf5 = Buffer.alloc(10); // 10 zero-filled bytes
const buf6 = Buffer.allocUnsafe(10); // 10 uninitialized bytes
\`\`\`

**Buffer Operations:**
\`\`\`javascript
const buf = Buffer.from('Hello World');

// Slice
const sliced = buf.slice(0, 5); // "Hello"

// Concat
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.from(' World');
const concatenated = Buffer.concat([buf1, buf2]);

// Write
buf.write('Node.js');

// Compare
const bufA = Buffer.from('ABC');
const bufB = Buffer.from('ABC');
console.log(bufA.equals(bufB)); // true
\`\`\`

**Encoding/Decoding:**
\`\`\`javascript
// String to Buffer
const str = 'Hello';
const buf = Buffer.from(str, 'utf8');

// Buffer to String
const decoded = buf.toString('utf8');

// Different encodings
const base64 = Buffer.from('Hello').toString('base64');
const hex = Buffer.from('Hello').toString('hex');

console.log(base64); // "SGVsbG8="
console.log(hex); // "48656c6c6f"
\`\`\`

**When to Use Buffers:**
- Reading/writing binary files
- Network protocols
- Image processing
- Cryptography
- When working with binary data

**When to Use Strings:**
- Text processing
- User input/output
- JSON data
- Database queries
- When working with text data

**Performance Comparison:**
\`\`\`javascript
// String concatenation (slow for large operations)
let str = '';
for (let i = 0; i < 10000; i++) {
  str += 'data';
}

// Buffer concatenation (faster)
const chunks = [];
for (let i = 0; i < 10000; i++) {
  chunks.push(Buffer.from('data'));
}
const buf = Buffer.concat(chunks);
\`\`\`

**Best Practice:** Use buffers for binary data and performance-critical operations. Use strings for text and readability. Convert between them as needed.`,
    difficulty: 'intermediate',
    category: 'Core',
    tags: ['buffers', 'strings', 'binary', 'data-types'],
  },
  {
    id: 'node-19',
    question: 'What is the difference between package.json and package-lock.json?',
    answer: `**package.json** is the manifest file for your project, while **package-lock.json** automatically records the exact versions of installed dependencies.

**package.json:**
\`\`\`json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My awesome project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
\`\`\`

**package-lock.json:**
\`\`\`json
{
  "name": "my-project",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "requires": true,
  "dependencies": {
    "express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-...",
      "requires": {
        "accepts": "~1.3.8",
        "body-parser": "1.20.1"
      }
    }
  }
}
\`\`\`

**Key Differences:**

| Feature | package.json | package-lock.json |
|---------|--------------|-------------------|
| Purpose | Project manifest | Exact dependency versions |
| Version Ranges | Semantic versioning | Exact versions |
| Manual Editing | Yes | No (auto-generated) |
| Commit to Git | Yes | Yes |
| Shared | Yes | Yes |
| Generated By | Developer | npm install |

**Semantic Versioning in package.json:**
\`\`\`json
{
  "dependencies": {
    "express": "^4.18.0",    // >=4.18.0 <5.0.0
    "lodash": "~4.17.21",    // >=4.17.21 <4.18.0
    "moment": "2.29.4"       // Exactly 2.29.4
  }
}
\`\`\`

**Version Ranges:**
- \`^1.2.3\` — Compatible with >=1.2.3 <2.0.0
- \`~1.2.3\` — Compatible with >=1.2.3 <1.3.0
- \`1.2.3\` — Exactly 1.2.3
- \`*\` — Any version
- \`latest\` — Latest version

**Why package-lock.json Matters:**
\`\`\`bash
# Without package-lock.json
npm install express@^4.18.0
# Might install 4.18.0, 4.18.1, 4.19.0, etc.

# With package-lock.json
npm install
# Always installs the exact version recorded
\`\`\`

**Benefits of package-lock.json:**
- Consistent installs across machines
- Prevents "works on my machine" issues
- Faster installs (cached versions)
- Security audit capabilities
- Better dependency tree management

**When to Commit:**
- ✅ Always commit package-lock.json
- ✅ Commit when dependencies change
- ✅ Commit when updating versions
- ❌ Don't manually edit it

**Updating Dependencies:**
\`\`\`bash
# Update to latest compatible versions
npm update

# Update specific package
npm update express

# Update to latest major version
npm install express@latest

# Check for outdated packages
npm outdated
\`\`\`

**Best Practice:** Always commit both package.json and package-lock.json to version control. This ensures consistent installations across all environments and developers.`,
    difficulty: 'beginner',
    category: 'Package Management',
    tags: ['npm', 'package-json', 'package-lock', 'dependencies'],
  },
  {
    id: 'node-20',
    question: 'What is the difference between Yarn and npm?',
    answer: `**npm** (Node Package Manager) and **Yarn** are both package managers for JavaScript, but they have different approaches and features.

**npm:**
\`\`\`bash
# Install dependencies
npm install

# Add dependency
npm install express

# Add dev dependency
npm install --save-dev jest

# Update dependency
npm update express

# Run script
npm run start
\`\`\`

**Yarn:**
\`\`\`bash
# Install dependencies
yarn install

# Add dependency
yarn add express

# Add dev dependency
yarn add --dev jest

# Update dependency
yarn upgrade express

# Run script
yarn start
\`\`\`

**Key Differences:**

| Feature | npm | Yarn |
|---------|-----|------ |
| Speed | Slower | Faster (parallel installs) |
| Lock File | package-lock.json | yarn.lock |
| Offline Mode | Limited | Yes |
| Workspaces | Added in v7 | Built-in |
| Determinism | Good | Better |
| Output | Verbose | Concise |
| Plugin System | No | Yes |

**Performance:**
\`\`\`bash
# npm - Sequential installation
npm install
# Takes longer for large projects

# Yarn - Parallel installation
yarn install
# Faster, especially for many dependencies
\`\`\`

**Lock Files:**

**npm (package-lock.json):**
\`\`\`json
{
  "name": "my-project",
  "lockfileVersion": 2,
  "dependencies": {
    "express": {
      "version": "4.18.2"
    }
  }
}
\`\`\`

**Yarn (yarn.lock):**
\`\`\`yaml
# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
# yarn lockfile v1

express@^4.18.0:
  version "4.18.2"
  resolved "https://registry.yarnpkg.com/express/-/express-4.18.2.tgz"
  integrity sha512-...
\`\`\`

**Workspaces (Monorepos):**

**npm (v7+):**
\`\`\`json
// package.json
{
  "workspaces": [
    "packages/*"
  ]
}
\`\`\`

**Yarn:**
\`\`\`json
// package.json
{
  "workspaces": {
    "packages": [
      "packages/*"
    ]
  }
}
\`\`\`

**Offline Mode:**
\`\`\`bash
# Yarn offline mode
yarn install --offline

# npm has limited offline support
npm install --prefer-offline
\`\`\`

**When to Use Each:**

**Use npm when:**
- Starting a new project (comes with Node.js)
- Need maximum compatibility
- Using Node.js built-in features
- Simple project setup

**Use Yarn when:**
- Need faster installation
- Working with monorepos
- Need offline capabilities
- Want better determinism
- Need plugin system

**Migration:**
\`\`\`bash
# From npm to Yarn
rm package-lock.json
yarn install

# From Yarn to npm
rm yarn.lock
npm install
\`\`\`

**Best Practice:** Choose one package manager and stick with it for consistency. Both are excellent choices for modern JavaScript development.`,
    difficulty: 'beginner',
    category: 'Package Management',
    tags: ['npm', 'yarn', 'package-manager', 'dependencies'],
  },
];
