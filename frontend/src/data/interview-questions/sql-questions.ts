import { InterviewQuestion } from './html-questions';

export const sqlInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'sql-1',
    question: 'What is SQL and what are its main components?',
    answer: `**SQL** (Structured Query Language) is a standard language for managing and manipulating relational databases. It's used for storing, retrieving, and manipulating data in database systems.

**Main Components of SQL:**

**1. DDL (Data Definition Language)**
- Defines database structure
- \`CREATE\` — Create database objects (tables, indexes)
- \`ALTER\` — Modify database objects
- \`DROP\` — Delete database objects
- \`TRUNCATE\` — Remove all data from a table

**2. DML (Data Manipulation Language)**
- Manipulates data within tables
- \`SELECT\` — Retrieve data
- \`INSERT\` — Add new data
- \`UPDATE\` — Modify existing data
- \`DELETE\` — Remove data

**3. DCL (Data Control Language)**
- Controls access to data
- \`GRANT\` — Give user permissions
- \`REVOKE\` — Remove user permissions

**4. TCL (Transaction Control Language)**
- Manages database transactions
- \`COMMIT\` — Save changes
- \`ROLLBACK\` — Undo changes
- \`SAVEPOINT\` — Create rollback points

**Basic Example:**
\`\`\`sql
-- DDL
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

-- DML
INSERT INTO users (id, name, email) VALUES (1, 'John', 'john@example.com');
SELECT * FROM users WHERE id = 1;
UPDATE users SET email = 'new@example.com' WHERE id = 1;
DELETE FROM users WHERE id = 1;

-- DCL
GRANT SELECT, INSERT ON users TO user1;

-- TCL
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
\`\`\`

**Key Concepts:**
- SQL is declarative — you specify what you want, not how
- Relational databases use tables with rows and columns
- Primary keys uniquely identify rows
- Foreign keys establish relationships between tables
- SQL is case-insensitive for keywords but case-sensitive for data`,
    difficulty: 'beginner',
    category: 'Basics',
    tags: ['fundamentals', 'ddl', 'dml', 'sql-components'],
  },
  {
    id: 'sql-2',
    question: 'What is the difference between WHERE and HAVING clauses?',
    answer: `**WHERE** filters rows before grouping, while **HAVING** filters groups after grouping in aggregate queries.

**WHERE Clause:**
- Filters individual rows
- Used with SELECT, UPDATE, DELETE
- Cannot use aggregate functions
- Applied before GROUP BY

**HAVING Clause:**
- Filters grouped results
- Used only with GROUP BY
- Can use aggregate functions
- Applied after GROUP BY

**Example:**
\`\`\`sql
-- WHERE - Filter rows before grouping
SELECT department, AVG(salary) as avg_salary
FROM employees
WHERE salary > 50000  -- Filter individual rows
GROUP BY department;

-- HAVING - Filter groups after aggregation
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;  -- Filter grouped results

-- Combined WHERE and HAVING
SELECT department, AVG(salary) as avg_salary
FROM employees
WHERE hire_date > '2020-01-01'  -- Filter rows first
GROUP BY department
HAVING AVG(salary) > 50000;  -- Then filter groups
\`\`\`

**Key Differences:**

| Feature | WHERE | HAVING |
|---------|-------|--------|
| Timing | Before grouping | After grouping |
| Aggregates | Cannot use | Can use |
| Purpose | Filter rows | Filter groups |
| Required | No | Requires GROUP BY |

**Common Mistakes:**
\`\`\`sql
-- ❌ Wrong - WHERE with aggregate
SELECT department, AVG(salary)
FROM employees
WHERE AVG(salary) > 50000  -- Error!
GROUP BY department;

-- ✅ Correct - HAVING with aggregate
SELECT department, AVG(salary)
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;
\`\`\`

**Best Practice:** Use WHERE to filter rows when possible (more efficient). Use HAVING only when you need to filter based on aggregate values.`,
    difficulty: 'intermediate',
    category: 'Querying',
    tags: ['where', 'having', 'group-by', 'aggregates', 'filtering'],
  },
  {
    id: 'sql-3',
    question: 'What are the different types of JOINs in SQL?',
    answer: `**JOINs** combine rows from two or more tables based on a related column between them.

**Types of JOINs:**

**1. INNER JOIN**
- Returns only matching rows
- Most common type of join

\`\`\`sql
SELECT orders.id, customers.name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;
\`\`\`

**2. LEFT JOIN (LEFT OUTER JOIN)**
- Returns all rows from left table
- Matching rows from right table
- NULL for non-matching right table rows

\`\`\`sql
SELECT customers.name, orders.id
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id;
\`\`\`

**3. RIGHT JOIN (RIGHT OUTER JOIN)**
- Returns all rows from right table
- Matching rows from left table
- NULL for non-matching left table rows

\`\`\`sql
SELECT customers.name, orders.id
FROM customers
RIGHT JOIN orders ON customers.id = orders.customer_id;
\`\`\`

**4. FULL JOIN (FULL OUTER JOIN)**
- Returns all rows from both tables
- NULL where no match exists

\`\`\`sql
SELECT customers.name, orders.id
FROM customers
FULL OUTER JOIN orders ON customers.id = orders.customer_id;
\`\`\`

**5. CROSS JOIN**
- Returns Cartesian product of tables
- Every row from first table combined with every row from second

\`\`\`sql
SELECT customers.name, products.name
FROM customers
CROSS JOIN products;
\`\`\`

**Visual Example:**

\`\`\`sql
-- Table A: Users
-- id | name
-- 1  | John
-- 2  | Jane
-- 3  | Bob

-- Table B: Orders
-- id | user_id | product
-- 1  | 1       | Laptop
-- 2  | 1       | Phone
-- 3  | 3       | Tablet

-- INNER JOIN: Only matching users (John, Bob)
-- LEFT JOIN: All users (John, Jane, Bob), NULL for Jane's orders
-- RIGHT JOIN: All orders, NULL for unmatched users
-- FULL JOIN: All users and all orders
\`\`\`

**Best Practice:** Use INNER JOIN when you only need matching data. Use LEFT JOIN when you need all records from the primary table regardless of matches.`,
    difficulty: 'intermediate',
    category: 'Querying',
    tags: ['joins', 'inner-join', 'left-join', 'relationships', 'tables'],
  },
  {
    id: 'sql-4',
    question: 'What is the difference between DELETE and TRUNCATE?',
    answer: `**DELETE** and **TRUNCATE** both remove data from tables, but they work differently and have different use cases.

**DELETE:**
- DML (Data Manipulation Language) command
- Can use WHERE clause to filter rows
- Slower for large tables
- Can be rolled back
- Triggers fire
- Logs individual row deletions

**TRUNCATE:**
- DDL (Data Definition Language) command
- Removes all rows (no WHERE clause)
- Faster for large tables
- Cannot be rolled back (in some databases)
- Triggers don't fire
- Logs page deallocations

**Syntax:**
\`\`\`sql
-- DELETE - Remove specific rows
DELETE FROM users WHERE id = 1;
DELETE FROM users WHERE created_at < '2020-01-01';

-- TRUNCATE - Remove all rows
TRUNCATE TABLE users;
\`\`\`

**Comparison:**

| Feature | DELETE | TRUNCATE |
|---------|--------|----------|
| Type | DML | DDL |
| WHERE clause | Yes | No |
| Speed | Slower | Faster |
| Rollback | Yes | Usually no |
| Triggers | Yes | No |
| Identity reset | No | Yes |
| Logging | Row-level | Page-level |

**Performance:**
\`\`\`sql
-- DELETE - Slow for large tables
DELETE FROM large_table; -- Can take minutes

-- TRUNCATE - Fast for large tables
TRUNCATE TABLE large_table; -- Usually seconds
\`\`\`

**Identity Reset:**
\`\`\`sql
-- DELETE - Identity continues
DELETE FROM users;
INSERT INTO users (name) VALUES ('John'); -- id might be 101

-- TRUNCATE - Identity resets
TRUNCATE TABLE users;
INSERT INTO users (name) VALUES ('John'); -- id will be 1
\`\`\`

**Foreign Key Constraints:**
\`\`\`sql
-- DELETE - Can delete with foreign key constraints
DELETE FROM users WHERE id = 1;

-- TRUNCATE - Cannot truncate table with foreign key references
TRUNCATE TABLE users; -- Error if referenced by other tables
\`\`\`

**When to Use Each:**

**Use DELETE when:**
- You need to delete specific rows
- You need WHERE clause filtering
- You need rollback capability
- Triggers should fire
- Table has foreign key references

**Use TRUNCATE when:**
- You need to delete all rows
- Speed is important (large tables)
- You don't need rollback
- Triggers shouldn't fire
- You want to reset identity

**Best Practice:** Use TRUNCATE for quickly clearing large tables when you don't need the features of DELETE. Use DELETE for selective row removal.`,
    difficulty: 'intermediate',
    category: 'Data Manipulation',
    tags: ['delete', 'truncate', 'ddl', 'dml', 'performance'],
  },
  {
    id: 'sql-5',
    question: 'What is database normalization and what are the normal forms?',
    answer: `**Normalization** is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves dividing tables into smaller, related tables and defining relationships between them.

**Normal Forms:**

**1. First Normal Form (1NF)**
- Each column contains atomic (indivisible) values
- Each record is unique
- No repeating groups

\`\`\`sql
-- ❌ Not 1NF - Repeating groups
CREATE TABLE orders (
  id INT,
  customer_name VARCHAR(100),
  products VARCHAR(500) -- "Laptop, Phone, Tablet"
);

-- ✅ 1NF - Atomic values
CREATE TABLE orders (
  id INT,
  customer_name VARCHAR(100)
);

CREATE TABLE order_items (
  order_id INT,
  product_name VARCHAR(100)
);
\`\`\`

**2. Second Normal Form (2NF)**
- Must be in 1NF
- All non-key attributes depend on the entire primary key
- No partial dependencies

\`\`\`sql
-- ❌ Not 2NF - Partial dependency
CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  product_name VARCHAR(100),  -- Depends only on product_id
  quantity INT
);

-- ✅ 2NF - Remove partial dependencies
CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  quantity INT
);

CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);
\`\`\`

**3. Third Normal Form (3NF)**
- Must be in 2NF
- No transitive dependencies
- Non-key attributes depend only on the primary key

\`\`\`sql
-- ❌ Not 3NF - Transitive dependency
CREATE TABLE customers (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(100)  -- Depends on city
);

-- ✅ 3NF - Remove transitive dependencies
CREATE TABLE customers (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  city_id INT
);

CREATE TABLE cities (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  state VARCHAR(100)
);
\`\`\`

**Higher Normal Forms:**

**4. Boyce-Codd Normal Form (BCNF)**
- Stronger version of 3NF
- Every determinant is a candidate key

**5. Fourth Normal Form (4NF)**
- No multi-valued dependencies

**6. Fifth Normal Form (5NF)**
- No join dependencies

**Benefits of Normalization:**
- Reduces data redundancy
- Improves data integrity
- Makes updates easier
- Reduces storage space
- Prevents anomalies

**Drawbacks:**
- More complex queries
- Performance overhead from joins
- May require more tables

**Denormalization:**
Sometimes intentionally violate normalization for performance:
- Add redundant columns
- Pre-compute aggregations
- Duplicate data to avoid joins

**Best Practice:** Normalize to at least 3NF for most applications. Consider denormalization only for performance-critical read-heavy operations.`,
    difficulty: 'advanced',
    category: 'Database Design',
    tags: ['normalization', 'database-design', '1nf', '2nf', '3nf'],
  },
  {
    id: 'sql-6',
    question: 'What are primary keys and foreign keys?',
    answer: `**Primary keys** and **foreign keys** are constraints that define relationships between tables and ensure data integrity.

**Primary Key:**
- Uniquely identifies each row in a table
- Cannot contain NULL values
- Must be unique
- One per table (usually)

**Foreign Key:**
- Establishes relationship between tables
- Points to primary key in another table
- Can contain NULL values (depending on constraint)
- Enforces referential integrity

**Creating Keys:**
\`\`\`sql
-- Primary Key
CREATE TABLE customers (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

-- Or add after creation
ALTER TABLE customers
ADD PRIMARY KEY (id);

-- Foreign Key
CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_id INT,
  order_date DATE,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Or add after creation
ALTER TABLE orders
ADD FOREIGN KEY (customer_id) REFERENCES customers(id);
\`\`\`

**Composite Primary Key:**
\`\`\`sql
-- Multiple columns as primary key
CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  quantity INT,
  PRIMARY KEY (order_id, product_id)
);
\`\`\`

**Foreign Key Constraints:**
\`\`\`sql
-- ON DELETE - What happens when referenced row is deleted
CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
  ON DELETE CASCADE     -- Delete orders when customer deleted
  -- ON DELETE SET NULL  -- Set customer_id to NULL
  -- ON DELETE RESTRICT  -- Prevent deletion (default)
  -- ON DELETE NO ACTION -- Similar to RESTRICT
);

-- ON UPDATE - What happens when referenced key is updated
CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
  ON UPDATE CASCADE     -- Update orders when customer id updated
  -- ON UPDATE RESTRICT  -- Prevent update (default)
);
\`\`\`

**Referential Integrity:**
\`\`\`sql
-- ❌ Cannot insert order with non-existent customer
INSERT INTO orders (customer_id) VALUES (999); -- Error

-- ❌ Cannot delete customer with existing orders
DELETE FROM customers WHERE id = 1; -- Error if orders exist

-- ✅ Must delete orders first or use CASCADE
DELETE FROM orders WHERE customer_id = 1;
DELETE FROM customers WHERE id = 1;
\`\`\`

**Benefits:**
- Prevents orphaned records
- Ensures data consistency
- Enforces relationships
- Enables cascading operations

**Best Practice:** Always use primary keys to uniquely identify rows. Use foreign keys to enforce relationships and referential integrity.`,
    difficulty: 'beginner',
    category: 'Database Design',
    tags: ['primary-key', 'foreign-key', 'constraints', 'relationships', 'integrity'],
  },
  {
    id: 'sql-7',
    question: 'What are indexes and how do they improve performance?',
    answer: `**Indexes** are database objects that improve the speed of data retrieval operations on tables at the cost of additional writes and storage space.

**How Indexes Work:**
- Similar to book index - helps find data quickly
- Create a separate data structure (usually B-tree)
- Store indexed column values with row pointers
- Allow database to find rows without scanning entire table

**Creating Indexes:**
\`\`\`sql
-- Single column index
CREATE INDEX idx_email ON users(email);

-- Composite index (multiple columns)
CREATE INDEX idx_name_email ON users(last_name, first_name);

-- Unique index (also enforces uniqueness)
CREATE UNIQUE INDEX idx_email ON users(email);

-- Drop index
DROP INDEX idx_email ON users;
\`\`\`

**Index Types:**

**1. B-Tree Index (Default)**
- Good for equality and range queries
- Most common type
- Supports ORDER BY efficiently

\`\`\`sql
-- Efficient with B-tree index
SELECT * FROM users WHERE email = 'john@example.com';
SELECT * FROM users WHERE created_at > '2020-01-01';
\`\`\`

**2. Hash Index**
- Only for equality comparisons
- Faster than B-tree for exact matches
- Cannot be used for range queries

\`\`\`sql
-- Efficient with hash index
SELECT * FROM users WHERE email = 'john@example.com';

-- ❌ Cannot use hash index
SELECT * FROM users WHERE email LIKE 'john%';
\`\`\`

**3. Full-Text Index**
- For text search
- Supports natural language search
- Good for large text columns

\`\`\`sql
CREATE FULLTEXT INDEX idx_content ON articles(content);

SELECT * FROM articles 
WHERE MATCH(content) AGAINST('database optimization');
\`\`\`

**When Indexes Help:**
- WHERE clause conditions
- JOIN operations
- ORDER BY clauses
- GROUP BY clauses

**When Indexes Don't Help:**
- Small tables (full table scan is faster)
- Columns with many NULL values
- Frequently updated columns (overhead)
- Functions on indexed columns

**Index Examples:**
\`\`\`sql
-- ❌ Index not used (function on column)
SELECT * FROM users WHERE UPPER(email) = 'JOHN@EXAMPLE.COM';

-- ✅ Index used (direct comparison)
SELECT * FROM users WHERE email = 'john@example.com';

-- ❌ Index not used (leading wildcard)
SELECT * FROM users WHERE email LIKE '%@example.com';

-- ✅ Index used (trailing wildcard)
SELECT * FROM users WHERE email LIKE 'john%';
\`\`\`

**Performance Impact:**
- Speeds up SELECT queries
- Slows down INSERT/UPDATE/DELETE (indexes must be updated)
- Increases storage requirements
- Can cause index fragmentation

**Best Practice:** Create indexes on columns frequently used in WHERE, JOIN, and ORDER BY clauses. Avoid over-indexing frequently updated tables.`,
    difficulty: 'intermediate',
    category: 'Performance',
    tags: ['indexes', 'performance', 'b-tree', 'query-optimization'],
  },
  {
    id: 'sql-8',
    question: 'What is the difference between UNION and UNION ALL?',
    answer: `**UNION** and **UNION ALL** combine results from multiple SELECT statements, but they handle duplicates differently.

**UNION:**
- Combines results and removes duplicates
- Slower (needs to check for duplicates)
- Sorts results (implicit DISTINCT)
- Returns distinct rows only

**UNION ALL:**
- Combines results and keeps duplicates
- Faster (no duplicate checking)
- No sorting
- Returns all rows including duplicates

**Syntax:**
\`\`\`sql
-- UNION - Removes duplicates
SELECT name FROM customers
UNION
SELECT name FROM suppliers;

-- UNION ALL - Keeps duplicates
SELECT name FROM customers
UNION ALL
SELECT name FROM suppliers;
\`\`\`

**Example:**
\`\`\`sql
-- Table A: employees
-- name
-- John
-- Jane
-- Bob

-- Table B: contractors
-- name
-- John
-- Alice

-- UNION Result:
-- John
-- Jane
-- Bob
-- Alice

-- UNION ALL Result:
-- John
-- Jane
-- Bob
-- John
-- Alice
\`\`\`

**Performance Comparison:**
\`\`\`sql
-- UNION - Slower due to duplicate removal
SELECT id FROM table1
UNION
SELECT id FROM table2;

-- UNION ALL - Faster, no duplicate check
SELECT id FROM table1
UNION ALL
SELECT id FROM table2;
\`\`\`

**Rules for UNION/UNION ALL:**
- Same number of columns in all SELECT statements
- Compatible data types
- Same column order
- Only one ORDER BY at the end

**ORDER BY with UNION:**
\`\`\`sql
-- ✅ Correct - ORDER BY at the end
SELECT name FROM customers
UNION
SELECT name FROM suppliers
ORDER BY name;

-- ❌ Wrong - ORDER BY in individual SELECT
SELECT name FROM customers ORDER BY name
UNION
SELECT name FROM suppliers;
\`\`\`

**When to Use Each:**

**Use UNION when:**
- You need distinct results
- Duplicates should be removed
- Data quality is important
- Result set is not too large

**Use UNION ALL when:**
- You need all rows including duplicates
- Performance is critical
- You know there are no duplicates
- Working with large datasets

**Performance Tip:**
\`\`\`sql
-- If you need UNION but know there are no duplicates
-- UNION ALL is still faster
SELECT id FROM table1 WHERE condition
UNION ALL
SELECT id FROM table2 WHERE condition
-- WHERE conditions ensure no overlap
\`\`\`

**Best Practice:** Use UNION ALL by default for better performance. Use UNION only when you specifically need to remove duplicates.`,
    difficulty: 'intermediate',
    category: 'Querying',
    tags: ['union', 'union-all', 'set-operations', 'performance'],
  },
  {
    id: 'sql-9',
    question: 'What are SQL transactions and ACID properties?',
    answer: `**Transactions** are sequences of database operations that are treated as a single unit of work. They either all succeed or all fail, maintaining data integrity.

**ACID Properties:**

**A - Atomicity**
- All operations in a transaction succeed or fail together
- No partial commits
- If any operation fails, entire transaction is rolled back

**C - Consistency**
- Database remains in a consistent state
- All constraints are satisfied
- Data is valid after transaction

**I - Isolation**
- Transactions don't interfere with each other
- Concurrent transactions are isolated
- Each transaction sees a consistent view

**D - Durability**
- Committed changes persist even after system failure
- Data is written to non-volatile storage
- Changes are permanent

**Transaction Syntax:**
\`\`\`sql
-- Start transaction
BEGIN TRANSACTION;

-- Perform operations
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Commit if successful
COMMIT;

-- Or rollback if error
ROLLBACK;
\`\`\`

**Example - Bank Transfer:**
\`\`\`sql
BEGIN TRANSACTION;

-- Deduct from sender
UPDATE accounts 
SET balance = balance - 100 
WHERE id = 1;

-- Add to receiver
UPDATE accounts 
SET balance = balance + 100 
WHERE id = 2;

-- Check if both succeeded
IF @@ERROR = 0
  COMMIT;
ELSE
  ROLLBACK;
\`\`\`

**Transaction Isolation Levels:**

**1. READ UNCOMMITTED**
- Can read uncommitted changes
- Dirty reads possible
- Lowest isolation

**2. READ COMMITTED**
- Can only read committed changes
- Prevents dirty reads
- Default in many databases

**3. REPEATABLE READ**
- Same query returns same results
- Prevents non-repeatable reads
- Default in MySQL

**4. SERIALIZABLE**
- Highest isolation
- Prevents all concurrency issues
- Slowest performance

**Setting Isolation Level:**
\`\`\`sql
-- Set isolation level
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Or for session
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
\`\`\`

**Savepoints:**
\`\`\`sql
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
SAVEPOINT after_first_update;

UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Rollback to savepoint if error
ROLLBACK TO after_first_update;

-- Or commit all
COMMIT;
\`\`\`

**When to Use Transactions:**
- Multiple related operations
- Data integrity is critical
- Operations must all succeed or fail together
- Financial transactions
- Complex updates

**Best Practice:** Always use transactions for multi-step operations that must maintain data integrity. Keep transactions as short as possible to avoid locking issues.`,
    difficulty: 'advanced',
    category: 'Transactions',
    tags: ['transactions', 'acid', 'isolation', 'consistency', 'rollback'],
  },
  {
    id: 'sql-10',
    question: 'What is the difference between CHAR and VARCHAR data types?',
    answer: `**CHAR** and **VARCHAR** are both used for storing text strings, but they handle storage and performance differently.

**CHAR:**
- Fixed-length string
- Pads with spaces to fill specified length
- Faster for fixed-length data
- Always uses specified storage

**VARCHAR:**
- Variable-length string
- Stores only actual characters + length info
- More efficient for variable-length data
- Uses only needed storage

**Syntax:**
\`\`\`sql
-- CHAR - Fixed length
CREATE TABLE users (
  name CHAR(50)  -- Always uses 50 characters
);

-- VARCHAR - Variable length
CREATE TABLE users (
  name VARCHAR(50)  -- Uses only actual length + 2 bytes
);
\`\`\`

**Storage Comparison:**
\`\`\`sql
-- CHAR(10) storing "Hi"
-- Storage: 10 characters (padded with 8 spaces)
-- "Hi        "

-- VARCHAR(10) storing "Hi"
-- Storage: 2 characters + length info
-- "Hi"
\`\`\`

**Performance:**
\`\`\`sql
-- CHAR - Faster for fixed-length data
-- Predictable row size
-- Better for frequently updated columns

-- VARCHAR - More efficient storage
-- Better for variable-length data
-- Can be slower for updates due to row movement
\`\`\`

**When to Use CHAR:**
- Fixed-length data (zip codes, phone numbers)
- When all values have similar length
- When storage space is not a concern
- For frequently updated columns
- When performance is critical

**When to Use VARCHAR:**
- Variable-length data (names, addresses)
- When storage efficiency matters
- When values vary significantly in length
- For most text data
- When flexibility is needed

**Example:**
\`\`\`sql
-- ✅ Good use of CHAR
CREATE TABLE users (
  country_code CHAR(2),  -- Always 2 characters (US, UK, etc.)
  phone_number CHAR(10)   -- Always 10 digits
);

-- ✅ Good use of VARCHAR
CREATE TABLE users (
  name VARCHAR(100),      -- Varies in length
  email VARCHAR(255),      -- Varies in length
  address VARCHAR(500)     -- Varies in length
);
\`\`\`

**Space Padding:**
\`\`\`sql
-- CHAR pads with spaces
SELECT name = 'John  ';  -- TRUE if name is CHAR(10)

-- VARCHAR does not pad
SELECT name = 'John';    -- TRUE if name is VARCHAR(10)
\`\`\`

**Best Practice:** Use VARCHAR for most text data. Use CHAR only for truly fixed-length data like codes, identifiers, or when performance is critical and data length is consistent.`,
    difficulty: 'beginner',
    category: 'Data Types',
    tags: ['char', 'varchar', 'data-types', 'storage', 'performance'],
  },
  {
    id: 'sql-11',
    question: 'What are aggregate functions in SQL?',
    answer: `**Aggregate functions** perform calculations on multiple values and return a single result. They're commonly used with GROUP BY to summarize data.

**Common Aggregate Functions:**

**COUNT()**
- Counts rows or non-NULL values

\`\`\`sql
-- Count all rows
SELECT COUNT(*) FROM users;

-- Count non-NULL values
SELECT COUNT(email) FROM users;

-- Count distinct values
SELECT COUNT(DISTINCT country) FROM users;
\`\`\`

**SUM()**
- Adds up numeric values

\`\`\`sql
SELECT SUM(amount) FROM orders;
SELECT SUM(quantity * price) FROM order_items;
\`\`\`

**AVG()**
- Calculates average

\`\`\`sql
SELECT AVG(salary) FROM employees;
SELECT AVG(price) FROM products;
\`\`\`

**MIN() / MAX()**
- Finds minimum/maximum values

\`\`\`sql
SELECT MIN(price), MAX(price) FROM products;
SELECT MIN(hire_date), MAX(hire_date) FROM employees;
\`\`\`

**GROUP BY with Aggregates:**
\`\`\`sql
-- Count users per country
SELECT country, COUNT(*) as user_count
FROM users
GROUP BY country;

-- Average salary per department
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department;

-- Total sales per product
SELECT product_id, SUM(quantity) as total_sold
FROM order_items
GROUP BY product_id;
\`\`\`

**Multiple Grouping:**
\`\`\`sql
-- Group by multiple columns
SELECT department, job_title, AVG(salary) as avg_salary
FROM employees
GROUP BY department, job_title;
\`\`\`

**HAVING with Aggregates:**
\`\`\`sql
-- Filter groups based on aggregate values
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;

-- Count departments with more than 10 employees
SELECT department, COUNT(*) as employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 10;
\`\`\`

**NULL Handling:**
\`\`\`sql
-- Aggregate functions ignore NULL values
SELECT SUM(salary) FROM employees;  -- Excludes NULL salaries
SELECT COUNT(salary) FROM employees;  -- Counts non-NULL salaries

-- COUNT(*) includes NULL rows
SELECT COUNT(*) FROM employees;  -- Counts all rows
\`\`\`

**Performance Tips:**
\`\`\`sql
-- ❌ Slow - scans entire table
SELECT COUNT(*) FROM large_table;

-- ✅ Faster - Use indexed column if possible
SELECT COUNT(id) FROM large_table;

-- ❌ Slow - multiple aggregations
SELECT COUNT(*), SUM(amount), AVG(amount) FROM orders;

-- ✅ Consider caching for frequently used aggregations
\`\`\`

**Best Practice:** Use aggregate functions with GROUP BY for data summarization. Use HAVING to filter aggregated results. Consider indexes on grouped columns for performance.`,
    difficulty: 'intermediate',
    category: 'Querying',
    tags: ['aggregates', 'group-by', 'having', 'count', 'sum', 'avg'],
  },
  {
    id: 'sql-12',
    question: 'What are SQL views and when should you use them?',
    answer: `**Views** are virtual tables based on the result set of a SQL query. They don't store data themselves but provide a way to save complex queries for reuse.

**Creating Views:**
\`\`\`sql
-- Simple view
CREATE VIEW customer_orders AS
SELECT customers.name, orders.id, orders.order_date
FROM customers
JOIN orders ON customers.id = orders.customer_id;

-- Complex view with aggregations
CREATE VIEW department_summary AS
SELECT 
  department,
  COUNT(*) as employee_count,
  AVG(salary) as avg_salary,
  MAX(salary) as max_salary
FROM employees
GROUP BY department;
\`\`\`

**Using Views:**
\`\`\`sql
-- Use view like a table
SELECT * FROM customer_orders;
SELECT * FROM department_summary WHERE avg_salary > 50000;
\`\`\`

**Modifying Views:**
\`\`\`sql
-- Add column to view
CREATE OR REPLACE VIEW customer_orders AS
SELECT 
  customers.name, 
  customers.email,
  orders.id, 
  orders.order_date,
  orders.total_amount
FROM customers
JOIN orders ON customers.id = orders.customer_id;

-- Drop view
DROP VIEW customer_orders;
\`\`\`

**Updatable Views:**
\`\`\`sql
-- Simple views can be updatable
CREATE VIEW active_users AS
SELECT id, name, email FROM users WHERE status = 'active';

-- Can update through view
UPDATE active_users SET email = 'new@example.com' WHERE id = 1;

-- Complex views with aggregations are not updatable
CREATE VIEW department_summary AS
SELECT department, COUNT(*) as count FROM employees GROUP BY department;
-- Cannot update this view
\`\`\`

**Benefits of Views:**
- Simplify complex queries
- Provide security (hide sensitive columns)
- Encapsulate business logic
- Improve code reusability
- Provide consistent data interface

**Security Example:**
\`\`\`sql
-- Hide salary information
CREATE VIEW employee_info AS
SELECT id, name, department, hire_date
FROM employees;

-- Grant access to view instead of table
GRANT SELECT ON employee_info TO hr_users;
\`\`\`

**Performance Considerations:**
- Views don't improve performance by default
- Query is executed each time view is accessed
- Materialized views can improve performance (if supported)
- Complex views can be slow

**Materialized Views (if supported):**
\`\`\`sql
-- PostgreSQL materialized view
CREATE MATERIALIZED VIEW department_summary AS
SELECT department, COUNT(*), AVG(salary)
FROM employees
GROUP BY department;

-- Refresh materialized view
REFRESH MATERIALIZED VIEW department_summary;
\`\`\`

**When to Use Views:**
- Reusing complex queries
- Implementing row-level security
- Providing simplified data access
- Hiding sensitive columns
- Creating consistent data interfaces

**When NOT to Use Views:**
- When you need better performance (consider indexes)
- For simple queries (overkill)
- When view adds unnecessary complexity
- When you need real-time data aggregation

**Best Practice:** Use views to simplify complex queries and implement security. Avoid nesting views too deeply as it can impact performance.`,
    difficulty: 'intermediate',
    category: 'Database Objects',
    tags: ['views', 'virtual-tables', 'security', 'reusability'],
  },
  {
    id: 'sql-13',
    question: 'What are stored procedures and functions in SQL?',
    answer: `**Stored procedures** and **functions** are precompiled SQL code stored in the database that can be executed repeatedly.

**Stored Procedures:**
- Can perform multiple operations
- Can return multiple result sets
- Can use transactions
- Can modify data
- Called with EXECUTE or CALL

**Functions:**
- Return a single value
- Cannot modify data (deterministic)
- Can be used in SELECT statements
- Must return a value

**Stored Procedure Example:**
\`\`\`sql
-- Create stored procedure
CREATE PROCEDURE get_user_orders(IN user_id INT)
BEGIN
  SELECT * FROM orders WHERE customer_id = user_id;
  SELECT SUM(total_amount) as total FROM orders WHERE customer_id = user_id;
END;

-- Execute stored procedure
CALL get_user_orders(1);
-- or
EXECUTE get_user_orders(1);
\`\`\`

**Function Example:**
\`\`\`sql
-- Create function
CREATE FUNCTION calculate_discount(amount DECIMAL(10,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
  IF amount > 1000 THEN
    RETURN amount * 0.9;  -- 10% discount
  ELSE
    RETURN amount;
  END IF;
END;

-- Use function in query
SELECT 
  id, 
  total_amount,
  calculate_discount(total_amount) as discounted_amount
FROM orders;
\`\`\`

**Parameters:**
\`\`\`sql
-- IN parameter (input)
CREATE PROCEDURE get_user(IN user_id INT)

-- OUT parameter (output)
CREATE PROCEDURE get_user_count(OUT count INT)
BEGIN
  SELECT COUNT(*) INTO count FROM users;
END;

-- INOUT parameter (input and output)
CREATE PROCEDURE increment_value(INOUT value INT)
BEGIN
  SET value = value + 1;
END;
\`\`\`

**Using OUT Parameters:**
\`\`\`sql
-- Call procedure with OUT parameter
CALL get_user_count(@user_count);
SELECT @user_count;
\`\`\`

**Benefits:**
- Improved performance (precompiled)
- Reduced network traffic
- Code reusability
- Enhanced security (can grant execute permission)
- Centralized business logic

**Stored Procedure with Transaction:**
\`\`\`sql
CREATE PROCEDURE transfer_funds(
  IN from_account INT,
  IN to_account INT,
  IN amount DECIMAL(10,2)
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;
  
  START TRANSACTION;
  
  UPDATE accounts SET balance = balance - amount WHERE id = from_account;
  UPDATE accounts SET balance = balance + amount WHERE id = to_account;
  
  COMMIT;
END;
\`\`\`

**When to Use Stored Procedures:**
- Complex business logic
- Multiple operations in one call
- Performance-critical operations
- Security requirements
- Centralized data access

**When to Use Functions:**
- Calculations in queries
- Data transformations
- Reusable computations
- SELECT statement operations

**Best Practice:** Use stored procedures for complex operations and functions for reusable calculations. Keep them simple and well-documented.`,
    difficulty: 'advanced',
    category: 'Database Objects',
    tags: ['stored-procedures', 'functions', 'performance', 'business-logic'],
  },
  {
    id: 'sql-14',
    question: 'What is the difference between DROP, DELETE, and TRUNCATE?',
    answer: `**DROP**, **DELETE**, and **TRUNCATE** are all used to remove data or objects, but they work at different levels and have different effects.

**DROP:**
- Removes entire database objects (tables, indexes, views)
- DDL (Data Definition Language) command
- Cannot be rolled back in most databases
- Removes structure and data
- Removes all associated objects (indexes, constraints)

**DELETE:**
- Removes data from tables
- DML (Data Manipulation Language) command
- Can be rolled back
- Can use WHERE clause
- Triggers fire
- Logs individual row deletions

**TRUNCATE:**
- Removes all data from tables
- DDL (Data Definition Language) command
- Cannot be rolled back (usually)
- Cannot use WHERE clause
- Resets identity columns
- Faster than DELETE for large tables

**Syntax Comparison:**
\`\`\`sql
-- DROP - Remove entire table
DROP TABLE users;

-- DELETE - Remove specific rows
DELETE FROM users WHERE id = 1;
DELETE FROM users WHERE created_at < '2020-01-01';

-- TRUNCATE - Remove all rows
TRUNCATE TABLE users;
\`\`\`

**Comparison Table:**

| Feature | DROP | DELETE | TRUNCATE |
|---------|------|--------|----------|
| Type | DDL | DML | DDL |
| Removes | Table structure | Data only | Data only |
| WHERE clause | No | Yes | No |
| Rollback | No | Yes | Usually no |
| Triggers | No | Yes | No |
| Identity reset | N/A | No | Yes |
| Speed | Fast | Slow | Fast |
| Foreign keys | Must drop first | Handles constraints | Cannot if referenced |

**Examples:**

**DROP:**
\`\`\`sql
-- Drop table and all data
DROP TABLE users;

-- Drop index
DROP INDEX idx_email ON users;

-- Drop view
DROP VIEW customer_orders;
\`\`\`

**DELETE:**
\`\`\`sql
-- Delete specific rows
DELETE FROM users WHERE id = 1;

-- Delete with join
DELETE FROM orders
WHERE customer_id IN (SELECT id FROM users WHERE status = 'inactive');

-- Delete all rows (slow)
DELETE FROM users;
\`\`\`

**TRUNCATE:**
\`\`\`sql
-- Remove all rows (fast)
TRUNCATE TABLE users;

-- Reset identity
TRUNCATE TABLE users; -- Auto-increment resets to 1
\`\`\`

**When to Use Each:**

**Use DROP when:**
- You want to remove the entire table/object
- Schema changes
- Complete table removal
- No longer need the structure

**Use DELETE when:**
- You need to delete specific rows
- You need WHERE clause filtering
- You need rollback capability
- Triggers should fire
- Table has foreign key references

**Use TRUNCATE when:**
- You need to delete all rows quickly
- Performance is critical
- You want to reset identity
- No WHERE clause needed
- No foreign key references

**Best Practice:** Use DROP to remove objects, DELETE for selective row removal, and TRUNCATE for quickly clearing large tables when appropriate.`,
    difficulty: 'intermediate',
    category: 'Data Manipulation',
    tags: ['drop', 'delete', 'truncate', 'ddl', 'dml'],
  },
  {
    id: 'sql-15',
    question: 'What are SQL constraints and what types exist?',
    answer: `**Constraints** are rules enforced on data columns to ensure data accuracy and integrity. They prevent invalid data from being entered into the database.

**Types of Constraints:**

**1. NOT NULL**
- Column cannot contain NULL values
- Ensures data is always provided

\`\`\`sql
CREATE TABLE users (
  id INT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);
\`\`\`

**2. UNIQUE**
- All values in column must be different
- Allows one NULL value (in most databases)

\`\`\`sql
CREATE TABLE users (
  id INT,
  email VARCHAR(100) UNIQUE
);

-- Or add separately
ALTER TABLE users ADD UNIQUE (email);
\`\`\`

**3. PRIMARY KEY**
- Uniquely identifies each row
- Combination of NOT NULL and UNIQUE
- One per table (usually)

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);

-- Composite primary key
CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  PRIMARY KEY (order_id, product_id)
);
\`\`\`

**4. FOREIGN KEY**
- Enforces referential integrity
- Links to primary key in another table
- Prevents orphaned records

\`\`\`sql
CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);
\`\`\`

**5. CHECK**
- Custom validation rule
- Values must satisfy condition

\`\`\`sql
CREATE TABLE employees (
  id INT,
  age INT CHECK (age >= 18),
  salary DECIMAL(10,2) CHECK (salary > 0)
);

-- Named constraint
CREATE TABLE products (
  id INT,
  price DECIMAL(10,2),
  CONSTRAINT positive_price CHECK (price > 0)
);
\`\`\`

**6. DEFAULT**
- Provides default value if none specified
- Used when column not specified in INSERT

\`\`\`sql
CREATE TABLE users (
  id INT,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

**7. INDEX**
- Improves query performance
- Creates index on column(s)

\`\`\`sql
CREATE TABLE users (
  id INT,
  email VARCHAR(100),
  INDEX idx_email (email)
);
\`\`\`

**Adding Constraints to Existing Tables:**
\`\`\`sql
-- Add NOT NULL
ALTER TABLE users MODIFY name VARCHAR(100) NOT NULL;

-- Add UNIQUE
ALTER TABLE users ADD UNIQUE (email);

-- Add FOREIGN KEY
ALTER TABLE orders 
ADD FOREIGN KEY (customer_id) REFERENCES customers(id);

-- Add CHECK
ALTER TABLE employees 
ADD CONSTRAINT check_age CHECK (age >= 18);

-- Add DEFAULT
ALTER TABLE users 
ALTER COLUMN status SET DEFAULT 'active';
\`\`\`

**Dropping Constraints:**
\`\`\`sql
-- Drop constraint
ALTER TABLE users DROP CONSTRAINT unique_email;

-- Drop foreign key
ALTER TABLE orders DROP FOREIGN KEY fk_customer;
\`\`\`

**Benefits:**
- Data integrity
- Business rule enforcement
- Prevents invalid data
- Database-level validation
- Consistent data

**Best Practice:** Use constraints to enforce data integrity at the database level. This provides a safety net even if application validation fails.`,
    difficulty: 'intermediate',
    category: 'Database Design',
    tags: ['constraints', 'data-integrity', 'primary-key', 'foreign-key', 'validation'],
  },
  {
    id: 'sql-16',
    question: 'What is the difference between ROWNUM, ROW_NUMBER, and RANK?',
    answer: `**ROWNUM**, **ROW_NUMBER**, and **RANK** are used to number rows in query results, but they work differently and have different use cases.

**ROWNUM (Oracle-specific):**
- Pseudo-column that assigns numbers to rows
- Assigned before ORDER BY
- Can't be used with ORDER BY directly
- Limited to Oracle database

**ROW_NUMBER():**
- Window function that assigns unique numbers
- Assigned after ORDER BY
- Works in most modern databases
- No gaps in numbering

**RANK():**
- Window function that assigns ranks
- Same values get same rank
- Creates gaps for tied values
- Works in most modern databases

**Examples:**

**ROW_NUMBER():**
\`\`\`sql
-- Sequential numbering
SELECT 
  name,
  salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num
FROM employees;

-- Partition by department
SELECT 
  department,
  name,
  salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank
FROM employees;
\`\`\`

**RANK():**
\`\`\`sql
-- Ranking with ties
SELECT 
  name,
  salary,
  RANK() OVER (ORDER BY salary DESC) as salary_rank
FROM employees;

-- If two employees have same salary, they get same rank
-- Next rank is skipped (1, 2, 2, 4...)
\`\`\`

**DENSE_RANK():**
\`\`\`sql
-- Ranking without gaps
SELECT 
  name,
  salary,
  DENSE_RANK() OVER (ORDER BY salary DESC) as dense_rank
FROM employees;

-- If two employees have same salary, they get same rank
-- Next rank continues (1, 2, 2, 3...)
\`\`\`

**Comparison:**

| Function | Ties | Gaps | Use Case |
|----------|------|------|----------|
| ROW_NUMBER() | No | No | Sequential numbering |
| RANK() | Yes | Yes | Competition ranking |
| DENSE_RANK() | Yes | No | Dense ranking |

**Example Results:**
\`\`\`sql
-- Data: salaries (100, 90, 90, 80, 70)

-- ROW_NUMBER(): 1, 2, 3, 4, 5
-- RANK(): 1, 2, 2, 4, 5
-- DENSE_RANK(): 1, 2, 2, 3, 4
\`\`\`

**NTILE():**
\`\`\`sql
-- Divide rows into groups
SELECT 
  name,
  salary,
  NTILE(4) OVER (ORDER BY salary DESC) as quartile
FROM employees;

-- Divides employees into 4 quartiles based on salary
\`\`\`

**LAG() and LEAD():**
\`\`\`sql
-- Access previous/next rows
SELECT 
  name,
  salary,
  LAG(salary) OVER (ORDER BY salary DESC) as prev_salary,
  LEAD(salary) OVER (ORDER BY salary DESC) as next_salary
FROM employees;
\`\`\`

**When to Use Each:**

**ROW_NUMBER():**
- Pagination
- Sequential numbering
- When you need unique row numbers

**RANK():**
- Competition rankings
- When ties should share rank
- When gaps are acceptable

**DENSE_RANK():**
- Dense rankings
- When ties should share rank
- When you don't want gaps

**Best Practice:** Use ROW_NUMBER() for pagination and sequential numbering. Use RANK() or DENSE_RANK() for competition-style rankings where ties matter.`,
    difficulty: 'advanced',
    category: 'Window Functions',
    tags: ['row-number', 'rank', 'window-functions', 'pagination', 'ranking'],
  },
  {
    id: 'sql-17',
    question: 'What are subqueries and correlated subqueries?',
    answer: `**Subqueries** are queries nested inside another query. They can be used in SELECT, FROM, WHERE, and HAVING clauses.

**Types of Subqueries:**

**1. Scalar Subquery**
- Returns single value
- Used in WHERE clause comparisons

\`\`\`sql
-- Scalar subquery in WHERE
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Scalar subquery in SELECT
SELECT 
  name,
  salary,
  (SELECT AVG(salary) FROM employees) as avg_salary
FROM employees;
\`\`\`

**2. Row Subquery**
- Returns single row
- Used in comparisons

\`\`\`sql
SELECT * FROM employees
WHERE (department, salary) = (
  SELECT department, MAX(salary) 
  FROM employees 
  GROUP BY department
);
\`\`\`

**3. Column Subquery**
- Returns single column
- Used with IN, ANY, ALL

\`\`\`sql
SELECT * FROM employees
WHERE department_id IN (
  SELECT id FROM departments WHERE location = 'New York'
);
\`\`\`

**4. Table Subquery**
- Returns multiple rows and columns
- Used in FROM clause (derived table)

\`\`\`sql
SELECT * FROM (
  SELECT department, AVG(salary) as avg_salary
  FROM employees
  GROUP BY department
) as dept_avg
WHERE avg_salary > 50000;
\`\`\`

**Correlated Subqueries:**
- References outer query
- Executes once per row
- Can be slow for large datasets

\`\`\`sql
-- Correlated subquery
SELECT * FROM employees e1
WHERE salary > (
  SELECT AVG(salary) 
  FROM employees e2 
  WHERE e2.department = e1.department
);

-- Non-correlated (usually faster)
SELECT * FROM employees e1
WHERE salary > (
  SELECT AVG(salary) 
  FROM employees 
  WHERE department = e1.department
);
\`\`\`

**EXISTS vs IN:**
\`\`\`sql
-- EXISTS - Returns true if subquery returns any rows
SELECT * FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);

-- IN - Checks if value matches any in subquery
SELECT * FROM customers
WHERE id IN (SELECT customer_id FROM orders);
\`\`\`

**Performance Considerations:**
\`\`\`sql
-- ❌ Slow - Correlated subquery
SELECT * FROM employees e
WHERE salary > (SELECT AVG(salary) FROM employees WHERE department = e.department);

-- ✅ Faster - JOIN with GROUP BY
SELECT e.*
FROM employees e
JOIN (
  SELECT department, AVG(salary) as avg_salary
  FROM employees
  GROUP BY department
) dept_avg ON e.department = dept_avg.department
WHERE e.salary > dept_avg.avg_salary;
\`\`\`

**CTE (Common Table Expression):**
\`\`\`sql
-- CTE for better readability
WITH dept_avg AS (
  SELECT department, AVG(salary) as avg_salary
  FROM employees
  GROUP BY department
)
SELECT e.*
FROM employees e
JOIN dept_avg d ON e.department = d.department
WHERE e.salary > d.avg_salary;
\`\`\`

**Best Practice:** Use JOINs instead of correlated subqueries when possible. Use CTEs for complex subqueries to improve readability. Consider EXISTS instead of IN for better performance with large datasets.`,
    difficulty: 'advanced',
    category: 'Querying',
    tags: ['subqueries', 'correlated-subqueries', 'exists', 'in', 'performance'],
  },
  {
    id: 'sql-18',
    question: 'What is the difference between clustered and non-clustered indexes?',
    answer: `**Clustered** and **non-clustered** indexes are two types of database indexes that organize data differently and serve different purposes.

**Clustered Index:**
- Determines physical order of data
- One per table (usually)
- The table itself is the index
- Faster for range queries
- Slower for inserts/updates (data must be moved)

**Non-Clustered Index:**
- Separate structure from data
- Multiple per table possible
- Contains pointers to actual data
- Additional storage required
- Can be created on any column

**Clustered Index:**
\`\`\`sql
-- Primary key creates clustered index (default in many databases)
CREATE TABLE users (
  id INT PRIMARY KEY,  -- Clustered index on id
  name VARCHAR(100),
  email VARCHAR(100)
);

-- Explicit clustered index
CREATE CLUSTERED INDEX idx_name ON users(name);
\`\`\`

**Non-Clustered Index:**
\`\`\`sql
-- Non-clustered index
CREATE INDEX idx_email ON users(email);

-- Multiple non-clustered indexes
CREATE INDEX idx_name ON users(name);
CREATE INDEX idx_created ON users(created_at);
\`\`\`

**How They Work:**

**Clustered Index:**
- Data stored in index order
- Like a phone book sorted by name
- Finding by key is very fast
- Range queries are efficient
- Only one per table

**Non-Clustered Index:**
- Index stores key + row pointer
- Like a book index pointing to pages
- Additional lookup required to get data
- Multiple indexes possible
- Takes extra storage

**Performance Comparison:**
\`\`\`sql
-- Clustered index - Fast for range queries
SELECT * FROM users 
WHERE id BETWEEN 100 AND 200;

-- Non-clustered index - Two lookups (index + data)
SELECT * FROM users 
WHERE email = 'john@example.com';
\`\`\`

**Covering Index:**
\`\`\`sql
-- Non-clustered index that includes all needed columns
CREATE INDEX idx_covering ON users(name, email, phone);

-- Query can be satisfied from index alone (no data lookup)
SELECT name, email, phone FROM users WHERE name = 'John';
\`\`\`

**When to Use Clustered Index:**
- Primary key columns
- Frequently ranged queries
- Columns used in ORDER BY
- When you need data sorted by key
- Most frequently accessed column

**When to Use Non-Clustered Index:**
- Lookup columns (WHERE clause)
- JOIN columns
- Foreign key columns
- Columns frequently used together
- When you need multiple indexes

**Best Practice:** Use clustered index on primary key or most frequently ranged query column. Use non-clustered indexes for lookup columns and foreign keys. Consider covering indexes for frequently accessed column combinations.`,
    difficulty: 'advanced',
    category: 'Performance',
    tags: ['indexes', 'clustered-index', 'non-clustered-index', 'performance'],
  },
  {
    id: 'sql-19',
    question: 'What are CTEs (Common Table Expressions) and when should you use them?',
    answer: `**CTEs (Common Table Expressions)** are temporary result sets that can be referenced within a SELECT, INSERT, UPDATE, or DELETE statement. They improve query readability and organization.

**Basic CTE:**
\`\`\`sql
WITH department_avg AS (
  SELECT department, AVG(salary) as avg_salary
  FROM employees
  GROUP BY department
)
SELECT * FROM department_avg WHERE avg_salary > 50000;
\`\`\`

**Multiple CTEs:**
\`\`\`sql
WITH 
  high_paid AS (
    SELECT * FROM employees WHERE salary > 100000
  ),
  departments AS (
    SELECT DISTINCT department FROM high_paid
  )
SELECT * FROM departments;
\`\`\`

**Recursive CTE:**
\`\`\`sql
WITH RECURSIVE employee_hierarchy AS (
  -- Base case
  SELECT id, name, manager_id, 1 as level
  FROM employees
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Recursive case
  SELECT e.id, e.name, e.manager_id, h.level + 1
  FROM employees e
  JOIN employee_hierarchy h ON e.manager_id = h.id
)
SELECT * FROM employee_hierarchy;
\`\`\`

**CTE vs Subquery:**
\`\`\`sql
-- ❌ Subquery - harder to read
SELECT * FROM (
  SELECT department, AVG(salary) as avg_salary
  FROM employees
  GROUP BY department
) as dept_avg
WHERE avg_salary > 50000;

-- ✅ CTE - easier to read
WITH department_avg AS (
  SELECT department, AVG(salary) as avg_salary
  FROM employees
  GROUP BY department
)
SELECT * FROM department_avg WHERE avg_salary > 50000;
\`\`\`

**Reusable CTE:**
\`\`\`sql
WITH high_salary_employees AS (
  SELECT * FROM employees WHERE salary > 100000
)
-- Use multiple times
SELECT COUNT(*) FROM high_salary_employees;
SELECT AVG(salary) FROM high_salary_employees;
\`\`\`

**CTE for Data Modification:**
\`\`\`sql
WITH old_data AS (
  SELECT * FROM users WHERE status = 'inactive'
)
DELETE FROM users WHERE id IN (SELECT id FROM old_data);
\`\`\`

**Benefits:**
- Improved readability
- Better organization
- Reusable within query
- Easier to debug
- Can be recursive

**Performance Note:**
- CTEs are not automatically cached
- Performance similar to subqueries
- Recursive CTEs can be slow
- Use materialized CTEs if supported

**When to Use CTEs:**
- Complex queries with multiple steps
- Reusing subqueries
- Hierarchical data (recursive)
- Improving code readability
- Breaking down complex logic

**When NOT to Use CTEs:**
- Simple queries (overkill)
- When performance is critical (test first)
- When subquery is simpler
- Single-use calculations

**Best Practice:** Use CTEs to improve query readability and organization. They're especially useful for complex queries and hierarchical data structures.`,
    difficulty: 'intermediate',
    category: 'Querying',
    tags: ['cte', 'common-table-expression', 'query-organization', 'readability'],
  },
  {
    id: 'sql-20',
    question: 'What is database sharding and how does it differ from partitioning?',
    answer: `**Sharding** and **partitioning** are both techniques for distributing data across multiple storage locations, but they work at different levels and serve different purposes.

**Partitioning:**
- Splits single table data across multiple files
- Database-level operation
- Transparent to application
- Same schema across partitions
- Often based on ranges or hash

**Sharding:**
- Splits data across multiple database instances
- Application-level operation
- Requires application awareness
- Different schemas possible
- Often based on customer ID or geography

**Partitioning Example:**
\`\`\`sql
-- Range partitioning
CREATE TABLE orders (
  id INT,
  order_date DATE,
  amount DECIMAL(10,2)
) PARTITION BY RANGE (YEAR(order_date)) (
  PARTITION p2020 VALUES LESS THAN (2021),
  PARTITION p2021 VALUES LESS THAN (2022),
  PARTITION p2022 VALUES LESS THAN (2023),
  PARTITION pmax VALUES LESS THAN MAXVALUE
);

-- Hash partitioning
CREATE TABLE users (
  id INT,
  name VARCHAR(100)
) PARTITION BY HASH(id) PARTITIONS 4;
\`\`\`

**Sharding Example:**
\`\`\`sql
-- Shard 1 (users with ID 1-1000)
-- Database: shard1
-- Table: users

-- Shard 2 (users with ID 1001-2000)
-- Database: shard2
-- Table: users

-- Application routes queries to appropriate shard
SELECT * FROM shard1.users WHERE id = 500;
SELECT * FROM shard2.users WHERE id = 1500;
\`\`\`

**Key Differences:**

| Feature | Partitioning | Sharding |
|---------|---------------|----------|
| Level | Database | Application |
| Transparency | Transparent | Requires code changes |
| Scalability | Limited | High |
| Complexity | Low | High |
| Failover | Database-level | Shard-level |
| Schema | Same | Can differ |

**Partitioning Benefits:**
- Improved query performance (partition pruning)
- Easier maintenance (partition operations)
- Better storage management
- Transparent to applications

**Sharding Benefits:**
- Horizontal scalability
- Better performance for large datasets
- Geographic distribution
- Isolation of failure domains
- Independent scaling

**Partitioning Types:**
- **Range** - Based on value ranges
- **List** - Based on value lists
- **Hash** - Based on hash function
- **Composite** - Combination of methods

**Sharding Strategies:**
- **Horizontal** - Split rows across shards
- **Vertical** - Split tables across shards
- **Key-based** - Sharding key determines shard
- **Geographic** - Based on location

**When to Use Partitioning:**
- Large tables (> 10M rows)
- Time-series data
- Data archiving needs
- Performance improvement needed
- Maintenance operations on subsets

**When to Use Sharding:**
- Exceeded single database capacity
- Need horizontal scalability
- Geographic distribution
- High availability requirements
- Multi-tenant applications

**Best Practice:** Start with partitioning for single-database scalability. Move to sharding only when you've exceeded what a single database can handle.`,
    difficulty: 'advanced',
    category: 'Scalability',
    tags: ['sharding', 'partitioning', 'scalability', 'distributed-databases'],
  },
];
