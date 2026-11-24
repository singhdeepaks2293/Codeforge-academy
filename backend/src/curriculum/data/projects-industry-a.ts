import type { Project } from '../types.js';

export const PROJECTS_INDUSTRY: Project[] = [
  {
    "id": "proj-rest-api-service",
    "slug": "rest-api-service",
    "level": 2,
    "title": "REST API Service with Auth",
    "description": "Build a production-style REST API in Python with JWT authentication, user accounts and a full CRUD resource, backed by SQLite and covered by automated tests. The service supports pagination, filtering, validation and structured error responses, and ships in a Docker container. It is the backend pattern behind most real web and mobile products.",
    "skills": ["Python", "REST API design", "JWT authentication", "SQLite", "Input validation", "Pagination", "Testing", "Docker"],
    "language": "python",
    "functionalRequirements": [
      "Register users with a hashed password and log in to receive a JWT access token",
      "Protect resource endpoints so only authenticated users can access them",
      "Provide full CRUD for a resource such as notes or tasks, owned by the creating user",
      "List resources with pagination, sorting and filtering by status or search text",
      "Validate all request bodies and return 400 with field-level errors",
      "Return consistent JSON error responses with a code and message",
      "Support token refresh and logout by invalidating refresh tokens",
      "Seed a demo user and sample data with a single command"
    ],
    "nonFunctionalRequirements": [
      "Passwords are never stored or logged in plain text",
      "Every endpoint responds in under 200 ms on local data",
      "All endpoints are covered by automated tests",
      "The API runs identically inside Docker and on the host"
    ],
    "architecture": "The service is layered: HTTP handlers validate input and call service functions, which enforce ownership rules and talk to a small repository layer over SQLite. Authentication is a middleware that verifies the JWT and attaches the user to the request context. Passwords are hashed with a slow salted hash, access tokens are short-lived, and refresh tokens are stored hashed in the database so they can be revoked.",
    "databaseSchema": "users: id INTEGER PK, email TEXT UNIQUE, password_hash TEXT, created_at TEXT; refresh_tokens: id INTEGER PK, user_id INTEGER FK, token_hash TEXT, expires_at TEXT, revoked INTEGER; items: id INTEGER PK, user_id INTEGER FK, title TEXT, body TEXT, status TEXT, created_at TEXT, updated_at TEXT",
    "apis": [
      "POST /api/auth/register — create a user account",
      "POST /api/auth/login — exchange credentials for access and refresh tokens",
      "POST /api/auth/refresh — rotate the refresh token",
      "POST /api/auth/logout — revoke the refresh token",
      "GET /api/items?page=&limit=&status=&q= — paginated list of the caller's items",
      "POST /api/items — create an item",
      "GET /api/items/{id} — fetch one item",
      "PUT /api/items/{id} — update an item",
      "DELETE /api/items/{id} — delete an item",
      "GET /api/health — liveness check"
    ],
    "fileStructure": "rest-api-service/\n  app/\n    __init__.py\n    main.py\n    config.py\n    auth.py\n    security.py\n    models.py\n    schemas.py\n    db.py\n    routers/\n      __init__.py\n      auth.py\n      items.py\n  tests/\n    test_auth.py\n    test_items.py\n    test_pagination.py\n  Dockerfile\n  docker-compose.yml\n  requirements.txt\n  README.md",
    "taskBreakdown": [
      "Set up the project layout, config and SQLite database",
      "Implement user registration and password hashing",
      "Implement JWT login, refresh and logout",
      "Build the items CRUD with ownership checks",
      "Add pagination, filtering and validation",
      "Add consistent error handling and the health endpoint",
      "Write the test suite and Docker image",
      "Document every endpoint in the README"
    ],
    "milestones": [
      {
        "id": "proj-rest-api-service-m1",
        "order": 1,
        "title": "Project setup and database",
        "objectives": ["Create the project structure", "Set up SQLite with the users and items tables", "Add a health endpoint"],
        "instructions": "Create the package layout and a database module that opens SQLite, enables foreign keys and creates the users, refresh_tokens and items tables. Add a minimal HTTP server with a GET /api/health endpoint returning status ok. Run it and confirm the health check responds.",
        "concepts": ["Project layout", "SQLite", "Health checks"],
        "hints": ["Keep database code in one module so routers never open connections directly.", "Use a single schema creation function run at startup.", "Return JSON from every endpoint, including errors."],
        "acceptanceCriteria": ["The server starts and GET /api/health returns 200", "The database file is created with all three tables", "Restarting the server keeps existing data"],
        "tests": ["Call GET /api/health and check the body", "Inspect the SQLite tables after startup", "Restart the server and call health again"]
      },
      {
        "id": "proj-rest-api-service-m2",
        "order": 2,
        "title": "Registration and password hashing",
        "objectives": ["Register users with validated input", "Hash passwords securely", "Reject duplicate emails"],
        "instructions": "Implement POST /api/auth/register with validation for email format and a minimum password length of 8. Hash the password with a salted slow hash and store only the hash. A second registration with the same email must return 409, and the response must never include the password hash.",
        "concepts": ["Password hashing", "Input validation", "Unique constraints"],
        "hints": ["Use bcrypt or pbkdf2 from the standard library via hashlib.", "Validate before touching the database.", "Return 201 with the user id and email only."],
        "acceptanceCriteria": ["Registration returns 201 for valid input", "Duplicate email returns 409", "The stored password is a hash, not plain text"],
        "tests": ["Register a user and inspect the database row", "Register the same email twice", "Register with a 4-character password"]
      },
      {
        "id": "proj-rest-api-service-m3",
        "order": 3,
        "title": "JWT login, refresh and logout",
        "objectives": ["Issue JWT access tokens on login", "Protect endpoints with auth middleware", "Support refresh and logout"],
        "instructions": "Implement login that verifies the password against the hash and issues a short-lived JWT access token plus a refresh token stored hashed in the database. Add middleware that verifies the Bearer token and rejects missing or expired tokens with 401. Implement refresh to rotate the refresh token and logout to revoke it.",
        "concepts": ["JWT", "Access vs refresh tokens", "Auth middleware"],
        "hints": ["Keep access tokens short-lived, around 15 minutes.", "Hash refresh tokens before storing them, like passwords.", "Attach the user id to the request context in middleware."],
        "acceptanceCriteria": ["Login with correct credentials returns both tokens", "Login with a wrong password returns 401", "A revoked refresh token cannot be reused"],
        "tests": ["Log in and decode the access token claims", "Call a protected route without a token", "Log out then try to refresh"]
      },
      {
        "id": "proj-rest-api-service-m4",
        "order": 4,
        "title": "Items CRUD, pagination and tests",
        "objectives": ["Build owner-scoped CRUD", "Add pagination and filtering", "Cover the API with tests and Docker"],
        "instructions": "Implement the items CRUD so every query is scoped to the authenticated user, so one user can never read or modify another user's item. Add page and limit query parameters with a default limit of 20 and a maximum of 100, plus status filtering and text search. Write tests for auth, ownership, pagination and validation, then add a Dockerfile that runs the service and document the endpoints.",
        "concepts": ["Ownership scoping", "Pagination", "Automated testing", "Docker"],
        "hints": ["Always add WHERE user_id = ? to item queries.", "Return total count alongside the page so clients can build a pager.", "Test the cross-user access case explicitly."],
        "acceptanceCriteria": ["A user cannot access another user's item (404 or 403)", "Pagination returns the correct page and total", "All tests pass and the Docker image serves the API"],
        "tests": ["Create items as user A and fetch as user B", "Request page 2 with limit 5", "Run the full test suite and build the Docker image"]
      }
    ],
    "reviewChecklist": [
      "Passwords are hashed and never appear in responses or logs",
      "Every item query is scoped to the authenticated user",
      "Validation errors are consistent JSON with field names",
      "Pagination defaults and limits are enforced",
      "Tests cover auth, ownership and pagination"
    ],
    "finalAssessment": [
      "Register two users and log both in",
      "Create items as one user and prove the other cannot see them",
      "Demonstrate pagination and filtering",
      "Show a refresh token being revoked on logout",
      "Run the test suite and the Docker image"
    ]
  },
  {
    "id": "proj-fullstack-ecommerce",
    "slug": "fullstack-ecommerce",
    "level": 3,
    "title": "Full-Stack E-Commerce App",
    "description": "Build a complete online store with a TypeScript backend and a React-style frontend: a browsable product catalog, a persistent cart, a checkout flow that creates orders, and an admin panel for managing products and viewing orders. Stock is decremented only when an order is placed, and every price is computed server-side so the client can never change what it pays.",
    "skills": ["TypeScript", "Node.js", "Express", "React", "SQLite", "REST APIs", "State management", "Authentication"],
    "language": "typescript",
    "functionalRequirements": [
      "Browse products with search, category filter, sorting and pagination",
      "View a product detail page with stock, images and description",
      "Add, update and remove items in a cart that persists across sessions",
      "Check out to create an order with shipping details and a payment stub",
      "Decrement stock only when an order is confirmed, and reject checkout when stock is insufficient",
      "Let customers view their order history and order status",
      "Provide an admin panel to create, edit and delete products and view all orders",
      "Restrict admin routes to users with the admin role"
    ],
    "nonFunctionalRequirements": [
      "Prices and totals are always computed on the server",
      "The catalog page loads in under 2 seconds with 500 products",
      "Cart state survives a page reload",
      "The admin panel is inaccessible to non-admin users",
      "The app works with JavaScript disabled only for static content is not required; the SPA must handle API failures gracefully"
    ],
    "architecture": "The backend is an Express API in TypeScript with routes for auth, products, cart, orders and admin, a service layer for pricing and stock rules, and SQLite for persistence. The frontend is a single-page app with pages for catalog, product detail, cart, checkout, orders and admin, sharing cart state through a context. Checkout runs inside a database transaction that checks stock, creates the order and its lines, and decrements stock atomically.",
    "databaseSchema": "users: id INTEGER PK, email TEXT UNIQUE, password_hash TEXT, role TEXT, created_at TEXT; products: id INTEGER PK, name TEXT, description TEXT, price_cents INTEGER, stock INTEGER, category TEXT, image_url TEXT, created_at TEXT; carts: id INTEGER PK, user_id INTEGER FK, product_id INTEGER FK, quantity INTEGER; orders: id INTEGER PK, user_id INTEGER FK, total_cents INTEGER, status TEXT, shipping_name TEXT, shipping_address TEXT, created_at TEXT; order_items: id INTEGER PK, order_id INTEGER FK, product_id INTEGER FK, quantity INTEGER, unit_price_cents INTEGER",
    "apis": [
      "GET /api/products?search=&category=&sort=&page=&limit=",
      "GET /api/products/{id}",
      "POST /api/products (admin)",
      "PUT /api/products/{id} (admin)",
      "DELETE /api/products/{id} (admin)",
      "GET /api/cart, POST /api/cart/items, PUT /api/cart/items/{id}, DELETE /api/cart/items/{id}",
      "POST /api/checkout — create an order from the cart",
      "GET /api/orders, GET /api/orders/{id}",
      "GET /api/admin/orders (admin)",
      "POST /api/auth/register, POST /api/auth/login"
    ],
    "fileStructure": "ecommerce/\n  server/\n    src/\n      index.ts\n      db.ts\n      auth.ts\n      routes/\n        products.ts\n        cart.ts\n        orders.ts\n        admin.ts\n      services/\n        pricing.ts\n        stock.ts\n    tests/\n      checkout.test.ts\n      products.test.ts\n  client/\n    src/\n      main.tsx\n      App.tsx\n      api.ts\n      context/CartContext.tsx\n      pages/\n        Catalog.tsx\n        ProductDetail.tsx\n        Cart.tsx\n        Checkout.tsx\n        Orders.tsx\n        Admin.tsx\n  package.json\n  README.md",
    "taskBreakdown": [
      "Design the schema and seed products",
      "Build product catalog API and pages",
      "Implement the cart API and frontend state",
      "Build checkout with a transactional stock check",
      "Add order history and status pages",
      "Build the admin product and order management",
      "Add auth and role-based route protection",
      "Test checkout edge cases and polish the UI"
    ],
    "milestones": [
      {
        "id": "proj-fullstack-ecommerce-m1",
        "order": 1,
        "title": "Catalog API and pages",
        "objectives": ["Seed a product catalog", "Build search, filter and sort", "Render catalog and product detail pages"],
        "instructions": "Create the products table and seed at least 30 products across four categories with realistic names, prices and stock. Build the list endpoint with search, category filter, sorting by price or name, and pagination. Build the catalog and product detail pages that consume it and show stock state clearly.",
        "concepts": ["REST list endpoints", "Seeding", "Pagination", "SPA routing"],
        "hints": ["Store prices in integer cents to avoid float errors.", "Seed with a script so a fresh database is one command away.", "Show an out-of-stock badge instead of hiding the product."],
        "acceptanceCriteria": ["Catalog lists products with pagination", "Search and category filter work", "Product detail shows price and stock"],
        "tests": ["Fetch page 2 of the catalog", "Search for a product name", "Open a product with zero stock"]
      },
      {
        "id": "proj-fullstack-ecommerce-m2",
        "order": 2,
        "title": "Cart",
        "objectives": ["Persist cart items per user", "Sync cart state in the UI", "Enforce stock limits in the cart"],
        "instructions": "Implement cart endpoints backed by the database so the cart survives logout and reload, and a frontend cart context that syncs with the server. Adding more than the available stock must be rejected with a clear error, and changing a quantity recomputes the totals server-side.",
        "concepts": ["Server-side cart", "React context", "Stock validation"],
        "hints": ["Keep cart totals computed on the server, never trust the client.", "Optimistic UI updates still need a server confirmation.", "Merge a guest cart into the user cart on login if you support guests."],
        "acceptanceCriteria": ["Cart survives a page reload", "Quantity above stock is rejected", "Totals match the server computation"],
        "tests": ["Add items, reload, check the cart", "Add 999 of a low-stock item", "Change a quantity and verify the total"]
      },
      {
        "id": "proj-fullstack-ecommerce-m3",
        "order": 3,
        "title": "Checkout and orders",
        "objectives": ["Create orders atomically", "Decrement stock on order", "Show order history"],
        "instructions": "Implement checkout inside a database transaction: validate the cart is non-empty, check every line against current stock, create the order and its lines with server-computed prices, decrement stock, and clear the cart. If any check fails, nothing is written. Build the checkout form and the order history page with statuses.",
        "concepts": ["Database transactions", "Atomicity", "Order lifecycle"],
        "hints": ["Do the stock check and the decrement in the same transaction.", "Store the unit price on each order line so later price changes do not rewrite history.", "Return 409 when stock is insufficient."],
        "acceptanceCriteria": ["A successful checkout creates an order and decrements stock", "Checkout with insufficient stock fails and changes nothing", "Order history lists the new order"],
        "tests": ["Check out a full cart and verify stock", "Reduce stock mid-cart and check out again", "Check out with an empty cart"]
      },
      {
        "id": "proj-fullstack-ecommerce-m4",
        "order": 4,
        "title": "Admin panel and auth",
        "objectives": ["Protect admin routes by role", "Manage products from the UI", "View and update orders"],
        "instructions": "Add roles to users and middleware that returns 403 for non-admin access to admin routes. Build the admin pages for creating, editing and deleting products and for listing all orders with a status update control. Add login and registration pages, and verify a regular customer cannot reach any admin page or API route.",
        "concepts": ["Role-based access control", "Admin UI", "Route protection"],
        "hints": ["Check the role on the server for every admin route, not just in the UI.", "Reuse the product form for create and edit.", "Seed one admin account for testing."],
        "acceptanceCriteria": ["Non-admin users get 403 on admin routes", "Admin can create and edit a product", "Admin can change an order status"],
        "tests": ["Call an admin endpoint as a customer", "Create a product from the admin panel", "Update an order status"]
      }
    ],
    "reviewChecklist": [
      "Prices are computed server-side on every order",
      "Checkout is transactional and stock cannot go negative",
      "Cart persists across reloads",
      "Admin routes return 403 for customers",
      "Catalog search, filter and pagination all work"
    ],
    "finalAssessment": [
      "Browse, search and filter the catalog",
      "Add items to the cart, reload, and check out",
      "Show stock decreasing and the order in history",
      "Attempt checkout with insufficient stock",
      "Log in as a customer and prove admin routes are blocked"
    ]
  },
  {
    "id": "proj-data-pipeline-etl",
    "slug": "data-pipeline-etl",
    "level": 3,
    "title": "Data Pipeline: ETL with Python",
    "description": "Build an ETL pipeline that extracts sales data from CSV files and a public JSON API, transforms it into a clean consistent shape, and loads it into SQLite for reporting. The pipeline runs on a schedule, logs every run, quarantines bad rows instead of crashing, and enforces data quality checks before any data reaches the reporting tables.",
    "skills": ["Python", "ETL design", "Pandas-style transforms", "SQLite", "Data quality", "Scheduling", "Logging", "CSV and JSON"],
    "language": "python",
    "functionalRequirements": [
      "Extract rows from CSV files in a watched folder and from a JSON HTTP API",
      "Transform dates, currencies and categories into one canonical format",
      "Deduplicate rows by a natural key and keep the newest record",
      "Load clean rows into SQLite with an upsert, and quarantine invalid rows with a reason",
      "Run data quality checks for missing values, negative amounts and unknown categories",
      "Run on a schedule and record every run with row counts and duration",
      "Support a full reload and an incremental load based on a watermark",
      "Produce a daily summary report of totals by category and region"
    ],
    "nonFunctionalRequirements": [
      "A single bad row never fails the whole run",
      "Every run is idempotent: re-running produces the same tables",
      "Runs are logged with start, end, rows read, loaded and quarantined",
      "The pipeline handles 100,000 rows in under a minute locally",
      "Configuration is in a file, not hardcoded in code"
    ],
    "architecture": "The pipeline has four stages wired by a small runner: extractors read CSV files and the JSON API into raw records, transformers normalise fields and validate each row, the loader upserts clean rows into SQLite inside a transaction and writes bad rows to a quarantine table, and a checker runs data quality assertions against the loaded tables before the run is marked successful. A watermark table stores the last processed timestamp for incremental loads, and a runs table records every execution.",
    "databaseSchema": "sales: id INTEGER PK, order_id TEXT UNIQUE, order_date TEXT, region TEXT, category TEXT, amount_cents INTEGER, currency TEXT, loaded_at TEXT; quarantine: id INTEGER PK, source TEXT, raw_json TEXT, reason TEXT, run_id INTEGER; runs: id INTEGER PK, started_at TEXT, finished_at TEXT, rows_read INTEGER, rows_loaded INTEGER, rows_quarantined INTEGER, status TEXT; watermarks: source TEXT PK, last_value TEXT",
    "apis": [
      "Internal: extract_csv(path) -> list of raw rows",
      "Internal: extract_api(url, since) -> list of raw rows",
      "Internal: transform(row) -> clean row or QuarantineReason",
      "Internal: load(rows) -> counts of inserted, updated and quarantined",
      "Internal: run_quality_checks() -> list of failed checks",
      "CLI: python -m pipeline run --full | --incremental",
      "CLI: python -m pipeline report --date YYYY-MM-DD"
    ],
    "fileStructure": "data-pipeline/\n  pipeline/\n    __init__.py\n    config.py\n    extract.py\n    transform.py\n    load.py\n    quality.py\n    report.py\n    runner.py\n  data/\n    incoming/\n    sample_sales.csv\n  tests/\n    test_transform.py\n    test_load.py\n    test_quality.py\n  config.yaml\n  README.md",
    "taskBreakdown": [
      "Define the canonical sales schema and config file",
      "Build the CSV and API extractors",
      "Implement transforms and row validation",
      "Build the loader with upsert and quarantine",
      "Add data quality checks and run logging",
      "Add incremental loads with watermarks",
      "Add scheduling and the daily report",
      "Test with dirty data and measure performance"
    ],
    "milestones": [
      {
        "id": "proj-data-pipeline-etl-m1",
        "order": 1,
        "title": "Schema, config and CSV extract",
        "objectives": ["Define the canonical schema", "Read CSV files into raw rows", "Create the SQLite tables"],
        "instructions": "Write the config file with the incoming folder, database path and API URL, and create the sales, quarantine, runs and watermarks tables. Implement the CSV extractor that reads every file in the incoming folder and yields raw dictionaries. Load a sample file and confirm the rows land in the database.",
        "concepts": ["ETL stages", "Canonical schema", "Configuration"],
        "hints": ["Keep raw and clean data in separate tables.", "Read CSVs with the csv module and DictReader.", "Store money as integer cents."],
        "acceptanceCriteria": ["Sample CSV loads into the sales table", "Config controls the folder and database path", "All four tables exist"],
        "tests": ["Load the sample CSV and count rows", "Load the same file twice and check for duplicates", "Point config at an empty folder"]
      },
      {
        "id": "proj-data-pipeline-etl-m2",
        "order": 2,
        "title": "Transforms and quarantine",
        "objectives": ["Normalise dates and currencies", "Validate every row", "Quarantine bad rows with reasons"],
        "instructions": "Implement the transform stage: parse dates into ISO format, normalise currency codes to uppercase, convert amounts to integer cents, and standardise category names. Rows that fail validation are written to the quarantine table with a human-readable reason instead of crashing the run. Deduplicate by order_id, keeping the newest record.",
        "concepts": ["Data normalisation", "Validation", "Quarantine pattern"],
        "hints": ["Return either a clean row or a reason, never raise for bad data.", "Test the transform with deliberately dirty rows.", "Log a sample of quarantined rows per run."],
        "acceptanceCriteria": ["Dirty rows are quarantined with reasons", "Valid rows load cleanly", "Duplicates keep the newest record"],
        "tests": ["Transform a row with a bad date", "Transform a row with a negative amount", "Load two files with the same order_id"]
      },
      {
        "id": "proj-data-pipeline-etl-m3",
        "order": 3,
        "title": "API extract, watermarks and scheduling",
        "objectives": ["Fetch data from a JSON API", "Run incrementally with watermarks", "Schedule runs and log them"],
        "instructions": "Add an API extractor that fetches JSON records with a since parameter driven by the watermark table, updating the watermark only after a successful load. Add a runner that records each run in the runs table with counts and status, and schedule it with a cron entry or a simple loop with a sleep interval. Prove an incremental run fetches only new records.",
        "concepts": ["Incremental loads", "Watermarks", "Scheduling", "Run metadata"],
        "hints": ["Update the watermark in the same transaction as the load.", "A failed run must not advance the watermark.", "Use urllib from the standard library for the API call."],
        "acceptanceCriteria": ["An incremental run loads only new records", "A failed run leaves the watermark unchanged", "Every run is recorded with counts"],
        "tests": ["Run twice incrementally and compare row counts", "Simulate an API failure and check the watermark", "Inspect the runs table"]
      },
      {
        "id": "proj-data-pipeline-etl-m4",
        "order": 4,
        "title": "Data quality checks and reporting",
        "objectives": ["Enforce quality checks after load", "Fail the run on critical checks", "Produce a daily summary report"],
        "instructions": "Implement quality checks that run after loading: no null order ids, no negative amounts, no unknown categories, and row counts within an expected range. A failed critical check marks the run failed and alerts in the log. Add the daily report command that prints totals by category and region, and test the pipeline end to end on a dirty dataset of at least 10,000 rows.",
        "concepts": ["Data quality", "Assertions", "Reporting", "Performance testing"],
        "hints": ["Run checks as SQL queries against the loaded tables.", "Separate warnings from failures.", "Generate a large dirty test file with a script."],
        "acceptanceCriteria": ["A quality failure marks the run failed", "The daily report totals match the database", "10,000 rows load in under a minute"],
        "tests": ["Inject a negative amount and run checks", "Generate the daily report and verify totals", "Time a 10,000-row load"]
      }
    ],
    "reviewChecklist": [
      "Bad rows are quarantined, never crash the run",
      "Re-running is idempotent",
      "Watermarks advance only on success",
      "Quality checks run after every load",
      "Every run is logged with counts and status"
    ],
    "finalAssessment": [
      "Load a dirty dataset and show the quarantine table",
      "Run the pipeline twice and prove idempotency",
      "Demonstrate an incremental API load",
      "Trigger a quality failure and show the run marked failed",
      "Generate the daily summary report"
    ]
  },
  {
    "id": "proj-cicd-pipeline",
    "slug": "cicd-pipeline",
    "level": 3,
    "title": "CI/CD Pipeline for a Web App",
    "description": "Build a complete CI/CD pipeline for a small Go web service: on every push it builds, lints and tests the code, builds a container image, and deploys it to a staging environment, with a manual approval step before production and an automatic rollback when the health check fails. The pipeline is defined as code and runs the same way locally and in CI.",
    "skills": ["Go", "CI/CD", "GitHub Actions", "Docker", "Testing", "Linting", "Deployment", "Rollback"],
    "language": "go",
    "functionalRequirements": [
      "Run build, vet and unit tests on every pull request",
      "Run a linter and fail the pipeline on new findings",
      "Build a Docker image tagged with the commit SHA",
      "Deploy automatically to staging on merge to main",
      "Require manual approval before production deployment",
      "Run a smoke test and health check after every deploy",
      "Roll back automatically to the previous image when the health check fails",
      "Keep a deploy log with who deployed what, when, and the result"
    ],
    "nonFunctionalRequirements": [
      "The pipeline definition lives in version control as code",
      "A failed stage stops the pipeline and reports the failure clearly",
      "No secrets are stored in the repository",
      "Rollback completes in under 2 minutes",
      "The same commands run locally and in CI"
    ],
    "architecture": "The pipeline is a GitHub Actions workflow with jobs for test, lint, build and deploy, plus a Makefile that wraps each step so developers can run the exact same commands locally. The Go service exposes a health endpoint used by the deploy job as a gate. Deployment is a script that pulls the new image, starts it beside the old one, checks health, and only then swaps traffic; on failure it restores the previous image and records the outcome in a deploy log file.",
    "databaseSchema": "",
    "apis": [
      "GET /health — returns 200 with version and uptime when healthy",
      "GET / — the demo web service homepage",
      "CI: make test, make lint, make build, make image, make deploy-staging, make deploy-prod, make rollback"
    ],
    "fileStructure": "cicd-pipeline/\n  app/\n    main.go\n    handlers.go\n    main_test.go\n  .github/\n    workflows/\n      ci.yml\n      deploy.yml\n  scripts/\n    deploy.sh\n    smoke.sh\n    rollback.sh\n  Dockerfile\n  Makefile\n  deploy-log.json\n  README.md",
    "taskBreakdown": [
      "Build the small Go web service with a health endpoint",
      "Add the Makefile with test, lint, build and image targets",
      "Write the CI workflow for pull requests",
      "Add the Docker image build with commit SHA tags",
      "Write the staging deploy script with a health gate",
      "Add manual approval and the production deploy",
      "Implement automatic rollback on health failure",
      "Document the pipeline and the deploy log"
    ],
    "milestones": [
      {
        "id": "proj-cicd-pipeline-m1",
        "order": 1,
        "title": "Go service and local build",
        "objectives": ["Build a Go web service", "Add a health endpoint", "Create the Makefile targets"],
        "instructions": "Create a small Go HTTP service with a homepage and a GET /health endpoint that returns the version and uptime as JSON. Add a Makefile with test, vet, lint and build targets that run go test, go vet and a linter. Run make test and make build locally and confirm both pass.",
        "concepts": ["Go HTTP servers", "Health endpoints", "Makefiles"],
        "hints": ["Read the version from an environment variable with a default.", "Keep handlers in a separate file from main.", "The health endpoint must not depend on any external service."],
        "acceptanceCriteria": ["GET /health returns 200 with version", "make test passes", "make build produces a binary"],
        "tests": ["curl the health endpoint", "Run make test", "Run make lint"]
      },
      {
        "id": "proj-cicd-pipeline-m2",
        "order": 2,
        "title": "CI workflow and container image",
        "objectives": ["Run tests on every pull request", "Fail on lint findings", "Build a tagged Docker image"],
        "instructions": "Write a GitHub Actions workflow that runs on pull requests: check out the code, set up Go, run make test, make lint and make build, and build the Docker image tagged with the commit SHA. Push the workflow to a branch, open a pull request, and confirm the checks run; then deliberately break a test to confirm the pipeline fails.",
        "concepts": ["GitHub Actions", "CI gates", "Container images"],
        "hints": ["Cache Go modules to keep runs fast.", "Use the commit SHA as the image tag so every build is traceable.", "Keep secrets out of the workflow file; use repository secrets."],
        "acceptanceCriteria": ["A pull request triggers the CI workflow", "A broken test fails the pipeline", "The image builds with the SHA tag"],
        "tests": ["Open a pull request and watch the checks", "Break a test and open another pull request", "Inspect the built image tag"]
      },
      {
        "id": "proj-cicd-pipeline-m3",
        "order": 3,
        "title": "Staging deploy with health gate",
        "objectives": ["Deploy to staging on merge", "Gate on a health check", "Record the deploy"],
        "instructions": "Write a deploy script that pulls the new image, starts it, waits, then calls the health endpoint with retries. Only when health passes does it stop the old container; otherwise it leaves the old one running. Wire it into a deploy workflow that runs on merge to main and appends an entry to the deploy log with the SHA, environment, time and result.",
        "concepts": ["Deployment scripts", "Health gates", "Deploy logs"],
        "hints": ["Start the new container on a different port first, then swap.", "Retry health for up to 30 seconds before declaring failure.", "Log every deploy attempt, successful or not."],
        "acceptanceCriteria": ["Merging to main deploys staging", "A healthy deploy swaps traffic", "The deploy log records the deploy"],
        "tests": ["Merge a change and check staging", "Deploy a build with a broken health endpoint", "Read the deploy log"]
      },
      {
        "id": "proj-cicd-pipeline-m4",
        "order": 4,
        "title": "Production approval and rollback",
        "objectives": ["Require approval for production", "Run smoke tests after deploy", "Roll back automatically on failure"],
        "instructions": "Add a production deploy job that requires a manual approval in GitHub Environments, then runs the deploy script and a smoke script that exercises the homepage and health endpoint. Extend the deploy script so a failed health check after the swap restores the previous image automatically, and add a manual rollback command that redeploys the last known-good image. Test rollback by deploying a version whose health endpoint fails.",
        "concepts": ["Manual approvals", "Smoke tests", "Automatic rollback"],
        "hints": ["Keep the previous image tag recorded before every deploy.", "Rollback is just a deploy of the previous tag.", "The smoke script should exit non-zero on any failure."],
        "acceptanceCriteria": ["Production deploy waits for approval", "A failing deploy rolls back automatically", "Manual rollback restores the previous version"],
        "tests": ["Deploy a broken version to staging and watch it roll back", "Run the smoke script against a healthy deploy", "Run make rollback and verify the version"]
      }
    ],
    "reviewChecklist": [
      "CI fails on broken tests and lint findings",
      "Images are tagged with the commit SHA",
      "Staging deploys automatically on merge",
      "Production requires manual approval",
      "A failed health check rolls back automatically",
      "Every deploy is recorded in the log"
    ],
    "finalAssessment": [
      "Open a pull request and show CI passing",
      "Break a test and show CI failing",
      "Merge to main and show the staging deploy",
      "Deploy a broken version and show automatic rollback",
      "Show the deploy log entries"
    ]
  },
  {
    "id": "proj-ml-image-classifier-api",
    "slug": "ml-image-classifier-api",
    "level": 3,
    "title": "ML Model Service: Image Classifier API",
    "description": "Build and serve a small image classifier using only the Python standard library: train a simple nearest-centroid classifier on tiny downscaled images, save the model to disk with a version number, and serve predictions over HTTP with confidence scores. The service supports loading a specific model version, logs every prediction, and can be retrained from new data without code changes.",
    "skills": ["Python", "Machine learning", "Nearest-centroid classification", "HTTP APIs", "Model versioning", "Evaluation metrics", "JSON", "Testing"],
    "language": "python",
    "functionalRequirements": [
      "Train a classifier from a folder of labelled images downscaled to 16 by 16 grayscale",
      "Save the trained model to disk with a version number and training metadata",
      "Serve predictions over HTTP, accepting a base64 image and returning the label and confidence",
      "Support loading and switching between model versions at runtime",
      "Report accuracy, precision and recall on a held-out test set",
      "Log every prediction with the model version, label and confidence",
      "Reject images that are not valid or are too large with a 400 error",
      "Provide a retrain endpoint or command that rebuilds the model from the data folder"
    ],
    "nonFunctionalRequirements": [
      "Training uses only the Python standard library, no ML frameworks",
      "Prediction latency is under 100 ms per image locally",
      "Model files are versioned and a previous version can be restored",
      "The service never crashes on a malformed image",
      "Prediction logs are append-only"
    ],
    "architecture": "The project has three parts: a training script that reads labelled images, downscales them to 16 by 16 grayscale vectors, computes one centroid per class, and writes a versioned JSON model file; an evaluation script that scores the model on a held-out set; and an HTTP service that loads a model file into memory, preprocesses incoming images the same way, and returns the nearest centroid with a confidence derived from relative distances. A model registry maps version numbers to files so the service can switch versions without restarting.",
    "databaseSchema": "predictions: id INTEGER PK, model_version TEXT, input_hash TEXT, label TEXT, confidence REAL, created_at TEXT; models: version TEXT PK, created_at TEXT, train_accuracy REAL, test_accuracy REAL, classes TEXT",
    "apis": [
      "POST /predict — body {image_base64, model_version?} returns {label, confidence, model_version}",
      "GET /models — list available model versions with metrics",
      "POST /models/{version}/activate — switch the active model",
      "GET /models/{version} — model metadata and class list",
      "GET /health — service status and active model version",
      "CLI: python -m trainer train --data data/train --version v2",
      "CLI: python -m trainer evaluate --version v2"
    ],
    "fileStructure": "ml-image-classifier/\n  classifier/\n    __init__.py\n    images.py\n    model.py\n    train.py\n    evaluate.py\n    server.py\n  data/\n    train/\n      cat/\n      dog/\n    test/\n  models/\n    v1.json\n  tests/\n    test_model.py\n    test_images.py\n    test_server.py\n  README.md",
    "taskBreakdown": [
      "Build the image loading and downscaling helpers",
      "Implement the nearest-centroid model and training",
      "Add model saving, loading and versioning",
      "Evaluate accuracy, precision and recall on the test set",
      "Build the HTTP prediction service",
      "Add model switching and prediction logging",
      "Write tests and generate a small demo dataset",
      "Document training, evaluation and deployment"
    ],
    "milestones": [
      {
        "id": "proj-ml-image-classifier-api-m1",
        "order": 1,
        "title": "Image preprocessing",
        "objectives": ["Load images without external libraries", "Downscale to 16 by 16 grayscale", "Produce a feature vector per image"],
        "instructions": "Write image helpers using only the standard library: parse simple image formats such as PGM or raw grayscale files, or decode a small bundled dataset of pixel arrays, and downscale each image to a 16 by 16 grayscale vector normalised to the range 0 to 1. Generate a small synthetic dataset of shapes or use a tiny labelled set, and verify that two images of the same class produce similar vectors.",
        "concepts": ["Image representation", "Downscaling", "Feature vectors", "Normalisation"],
        "hints": ["Start with a synthetic dataset of simple shapes so training is deterministic.", "A vector is just a flat list of 256 numbers.", "Normalise pixel values by dividing by 255."],
        "acceptanceCriteria": ["Every image becomes a 256-length vector", "Same-class images are closer than different-class images", "Preprocessing handles odd image sizes"],
        "tests": ["Preprocess three images and print vector lengths", "Compare distances within and across classes", "Preprocess a 1 by 1 image"]
      },
      {
        "id": "proj-ml-image-classifier-api-m2",
        "order": 2,
        "title": "Training and evaluation",
        "objectives": ["Compute one centroid per class", "Save a versioned model file", "Measure accuracy on a test set"],
        "instructions": "Implement training: average the feature vectors of each class to form its centroid, then save the centroids, class names, version and training metadata to a JSON model file. Write the evaluation script that predicts each test image, builds a confusion matrix, and reports accuracy, precision and recall per class. Train version v1 and record its test accuracy.",
        "concepts": ["Nearest-centroid classification", "Train and test split", "Confusion matrix", "Precision and recall"],
        "hints": ["The centroid is the mean vector of the class.", "Prediction is the nearest centroid by Euclidean distance.", "Keep the test set untouched during training."],
        "acceptanceCriteria": ["Training produces a versioned model file", "Test accuracy is reported per class", "A model trained on shapes scores above 80 percent on the test set"],
        "tests": ["Train on the synthetic data and check accuracy", "Evaluate v1 and inspect the confusion matrix", "Load the saved model and predict one image"]
      },
      {
        "id": "proj-ml-image-classifier-api-m3",
        "order": 3,
        "title": "Prediction API",
        "objectives": ["Serve predictions over HTTP", "Return label and confidence", "Validate incoming images"],
        "instructions": "Build the HTTP service with the standard library http.server: POST /predict accepts a JSON body with a base64 image, preprocesses it exactly as training did, finds the nearest centroid, and returns the label, a confidence score from the relative distances, and the active model version. Invalid base64 or oversized images return 400. Log every prediction to SQLite.",
        "concepts": ["HTTP servers", "Base64", "Confidence scores", "Logging"],
        "hints": ["Reuse the exact preprocessing code from training.", "Confidence can be the share of inverse distance among classes.", "Cap the accepted image size before decoding."],
        "acceptanceCriteria": ["POST /predict returns a label and confidence", "A malformed image returns 400", "Predictions are logged with model version"],
        "tests": ["Predict a known test image through the API", "Send invalid base64", "Send an oversized payload"]
      },
      {
        "id": "proj-ml-image-classifier-api-m4",
        "order": 4,
        "title": "Versioning, retraining and polish",
        "objectives": ["Switch model versions at runtime", "Retrain from new data", "Document the service"],
        "instructions": "Add the model registry endpoints to list versions and activate one without restarting the service. Add a retrain command that trains a new version from the data folder and records its metrics. Train a v2 on expanded data, compare its accuracy with v1, switch the active model, and finish the README with training, evaluation and API examples.",
        "concepts": ["Model versioning", "Retraining", "A/B comparison"],
        "hints": ["Store model metadata in SQLite as well as in the JSON file.", "Never overwrite a model version; always create a new one.", "Keep the old version loadable after switching."],
        "acceptanceCriteria": ["Two versions exist and can be switched", "Retraining creates a new version with metrics", "The README documents the full workflow"],
        "tests": ["Activate v1, predict, activate v2, predict", "Retrain and check the new version appears", "Verify the old version still loads"]
      }
    ],
    "reviewChecklist": [
      "Training uses only the standard library",
      "Preprocessing is identical in training and serving",
      "Test accuracy, precision and recall are reported",
      "Invalid images return 400 without crashing",
      "Model versions can be switched without a restart"
    ],
    "finalAssessment": [
      "Train a model and report its test accuracy",
      "Predict an image through the API and explain the confidence",
      "Show the confusion matrix",
      "Switch model versions live",
      "Retrain from new data and compare versions"
    ]
  },
  {
    "id": "proj-cli-file-organiser",
    "slug": "cli-file-organiser",
    "level": 2,
    "title": "CLI Tool: File Organiser",
    "description": "Build a fast Rust command-line tool that organises a messy folder by file type and date, with a dry-run preview, a persistent undo log, and a TOML configuration file for custom rules. It handles name collisions safely, reports a summary of every run, and is quick enough to scan thousands of files in a blink.",
    "skills": ["Rust", "CLI design", "File system operations", "TOML configuration", "Error handling", "Dry-run mode", "Undo design", "Testing"],
    "language": "rust",
    "functionalRequirements": [
      "Scan a target folder and classify files by extension and by year-month of modification",
      "Move files into folders such as Images/2026-11 or Documents/2026-10",
      "Preview all planned moves with a --dry-run flag that changes nothing",
      "Read custom categories and rules from a TOML config file",
      "Rename on collision instead of overwriting, using a numbered suffix",
      "Write an undo log after every run and restore files with an undo command",
      "Support recursive scanning with --recursive",
      "Print a summary of moves per category at the end of each run"
    ],
    "nonFunctionalRequirements": [
      "Never overwrites an existing file",
      "Dry-run changes nothing on disk",
      "Handles 10,000 files in under 5 seconds",
      "All errors print a clear message and a non-zero exit code",
      "The tool is a single static binary with no runtime dependencies"
    ],
    "architecture": "The tool is organised as a small Rust binary with modules for configuration, scanning, planning and execution. The scanner walks the directory and classifies each file, the planner turns classifications into move operations without touching the disk, and the executor performs the moves and appends each one to a JSON undo log. Dry-run runs the planner and prints the operations. The undo command reads the latest log and reverses the moves in reverse order.",
    "databaseSchema": "",
    "apis": [
      "CLI: organise <folder> [--dry-run] [--recursive] [--config path]",
      "CLI: organise undo [--log path]",
      "CLI: organise --init-config — write a sample config file",
      "Config: organiser.toml with [categories] mapping names to extension lists and [rules] for date folders"
    ],
    "fileStructure": "file-organiser/\n  src/\n    main.rs\n    config.rs\n    scanner.rs\n    planner.rs\n    executor.rs\n    undo.rs\n  tests/\n    integration.rs\n  organiser.toml\n  Cargo.toml\n  README.md",
    "taskBreakdown": [
      "Set up the Cargo project and argument parsing",
      "Implement the scanner and default categories",
      "Implement the planner and dry-run output",
      "Implement the executor with collision handling",
      "Add the TOML config file support",
      "Add the undo log and undo command",
      "Add recursive mode and the summary report",
      "Write integration tests with temporary directories"
    ],
    "milestones": [
      {
        "id": "proj-cli-file-organiser-m1",
        "order": 1,
        "title": "Project setup and scanner",
        "objectives": ["Create the Cargo project", "Parse command-line arguments", "Scan and classify a folder"],
        "instructions": "Create the Cargo project with a binary that takes a folder path and a --dry-run flag. Implement the scanner using std::fs to list files and classify them by extension into Images, Documents, Audio, Video, Archives, Code and Other. Run it on a test folder and print each file with its category.",
        "concepts": ["Rust modules", "std::fs", "Argument parsing", "Enums"],
        "hints": ["Normalise extensions to lowercase before matching.", "Use Path::extension rather than string splitting.", "Skip directories when scanning."],
        "acceptanceCriteria": ["The binary runs and lists files with categories", "Unknown extensions are classified as Other", "A missing folder prints an error and exits non-zero"],
        "tests": ["Run on a folder with mixed files", "Run on a missing folder", "Run on an empty folder"]
      },
      {
        "id": "proj-cli-file-organiser-m2",
        "order": 2,
        "title": "Planner, dry-run and executor",
        "objectives": ["Plan moves without executing", "Preview moves in dry-run", "Move files with collision handling"],
        "instructions": "Write the planner that maps each file to a destination folder based on its category and the year-month of its modification time. Dry-run prints every planned move and changes nothing. The executor creates destination folders, moves files, and renames on collision by appending (1), (2) and so on, never overwriting.",
        "concepts": ["Planning vs execution", "Dry-run pattern", "Collision handling"],
        "hints": ["The planner returns data; only the executor touches the disk.", "Use the file modification time for the date folder.", "Check for an existing destination before moving."],
        "acceptanceCriteria": ["Dry-run prints moves and changes nothing", "Real runs move files into category and date folders", "Colliding names are renamed, not overwritten"],
        "tests": ["Dry-run a messy folder and verify nothing moved", "Organise a folder with two same-named files", "Check the destination folder structure"]
      },
      {
        "id": "proj-cli-file-organiser-m3",
        "order": 3,
        "title": "Config file and undo log",
        "objectives": ["Load categories from TOML", "Write an undo log per run", "Restore files with undo"],
        "instructions": "Add TOML config support so users can define their own categories and extension lists, with the built-in defaults used when no config is present. After every real run, write a JSON undo log recording each source and destination. Implement the undo subcommand that reads the latest log, moves every file back, and removes empty folders it created.",
        "concepts": ["TOML configuration", "Undo logs", "Serde"],
        "hints": ["Keep the config format simple: a table of category to extension list.", "Reverse moves in reverse order during undo.", "Handle a missing file during undo with a warning, not a crash."],
        "acceptanceCriteria": ["A custom config changes the categories used", "Undo restores the original layout", "A missing file during undo is reported, not fatal"],
        "tests": ["Organise with a custom config", "Organise then undo", "Delete a moved file then undo"]
      },
      {
        "id": "proj-cli-file-organiser-m4",
        "order": 4,
        "title": "Recursive mode, summary and tests",
        "objectives": ["Scan subfolders recursively", "Print a per-category summary", "Cover the tool with tests"],
        "instructions": "Add a --recursive flag that walks subfolders while skipping the destination folders the tool creates. Print a summary at the end of each run with the count of files moved per category. Write integration tests using temporary directories that cover scanning, dry-run, collisions, undo and config, and verify performance on a generated folder of 10,000 files.",
        "concepts": ["Recursive directory walking", "Reporting", "Integration testing"],
        "hints": ["Use the walkdir approach manually or with a small crate.", "Exclude the undo log file from scanning.", "Generate the large test folder with a script."],
        "acceptanceCriteria": ["Recursive mode moves nested files", "The summary counts are correct", "10,000 files organise in under 5 seconds"],
        "tests": ["Organise a nested folder recursively", "Run the integration test suite", "Time a 10,000-file run"]
      }
    ],
    "reviewChecklist": [
      "Dry-run never changes the disk",
      "No file is ever overwritten",
      "Undo restores the original layout",
      "Custom config categories work",
      "Recursive mode skips its own destination folders",
      "Integration tests use temporary directories only"
    ],
    "finalAssessment": [
      "Dry-run a messy folder and show the preview",
      "Organise it and show the date-based folders",
      "Undo it and show the restored layout",
      "Organise with a custom config file",
      "Show the test suite passing and the timing on 10,000 files"
    ]
  },
  {
    "id": "proj-realtime-chat",
    "slug": "realtime-chat",
    "level": 3,
    "title": "Real-Time Chat Application",
    "description": "Build a real-time chat application in Go with WebSocket connections, chat rooms, online presence, message history and per-user rate limiting. Users sign in, join rooms, see who is online, and receive messages instantly; missed messages are loaded from history when they reconnect. The server is built to handle many concurrent connections safely.",
    "skills": ["Go", "WebSockets", "Concurrency", "Goroutines and channels", "SQLite", "Authentication", "Rate limiting", "Testing"],
    "language": "go",
    "functionalRequirements": [
      "Register and log in users with JWT authentication",
      "Connect over WebSocket with a valid token and join named rooms",
      "Broadcast messages to every member of a room in real time",
      "Store message history and load the last 50 messages on joining a room",
      "Show online presence: who is in each room and when they were last seen",
      "Support direct messages between two users",
      "Rate limit each user to 10 messages per 10 seconds",
      "Allow room creation and listing, with a default general room"
    ],
    "nonFunctionalRequirements": [
      "Messages are delivered in under 100 ms on localhost",
      "The server handles 500 concurrent connections without errors",
      "A slow client cannot block other clients",
      "A disconnected client reconnects and catches up from history",
      "Messages are never lost when the server restarts"
    ],
    "architecture": "The server is a Go HTTP service with a hub that owns the set of rooms and clients. Each WebSocket connection runs a read goroutine and a write goroutine communicating through channels, and the hub is the only goroutine that mutates room membership, so no locks are needed around the core state. Messages are written to SQLite before broadcast so history survives restarts. Presence is tracked with a heartbeat and a last-seen timestamp, and a token-bucket limiter per user drops excess messages with a warning.",
    "databaseSchema": "users: id INTEGER PK, username TEXT UNIQUE, password_hash TEXT, created_at TEXT; rooms: id INTEGER PK, name TEXT UNIQUE, created_by INTEGER FK, created_at TEXT; messages: id INTEGER PK, room_id INTEGER FK, user_id INTEGER FK, body TEXT, created_at TEXT; direct_messages: id INTEGER PK, sender_id INTEGER FK, receiver_id INTEGER FK, body TEXT, created_at TEXT",
    "apis": [
      "POST /api/auth/register, POST /api/auth/login",
      "GET /api/rooms — list rooms",
      "POST /api/rooms — create a room",
      "GET /api/rooms/{id}/messages?before=&limit=50 — message history",
      "GET /api/users/online — presence list",
      "WS /ws?token= — WebSocket: send {type: join, room} and {type: message, room, body}",
      "WS server events: {type: message}, {type: presence}, {type: error}"
    ],
    "fileStructure": "realtime-chat/\n  cmd/server/main.go\n  internal/\n    auth/auth.go\n    chat/hub.go\n    chat/client.go\n    chat/store.go\n    chat/limiter.go\n    httpapi/handlers.go\n  web/\n    index.html\n    app.js\n    style.css\n  go.mod\n  README.md",
    "taskBreakdown": [
      "Set up the Go module, auth and SQLite store",
      "Build the hub with rooms and client registration",
      "Implement the WebSocket read and write pumps",
      "Add message history loading on join",
      "Add presence with heartbeats",
      "Add direct messages and rate limiting",
      "Build the web client",
      "Load-test with 500 concurrent connections"
    ],
    "milestones": [
      {
        "id": "proj-realtime-chat-m1",
        "order": 1,
        "title": "Auth, store and HTTP API",
        "objectives": ["Register and log in users", "Create and list rooms", "Store messages in SQLite"],
        "instructions": "Set up the Go module, the SQLite schema, and JWT auth for registration and login. Implement the rooms endpoints for listing and creating rooms, and a history endpoint that returns the last 50 messages for a room. Test the API with curl before touching WebSockets.",
        "concepts": ["Go modules", "JWT", "SQLite", "REST endpoints"],
        "hints": ["Hash passwords with bcrypt.", "Keep the store behind an interface so it is testable.", "Return messages newest last so the client can append them."],
        "acceptanceCriteria": ["Users can register and log in", "Rooms can be created and listed", "History returns messages in order"],
        "tests": ["Register two users via curl", "Create a room and list it", "Insert messages and fetch history"]
      },
      {
        "id": "proj-realtime-chat-m2",
        "order": 2,
        "title": "WebSocket hub and broadcast",
        "objectives": ["Accept WebSocket connections", "Join rooms and broadcast messages", "Persist messages before broadcast"],
        "instructions": "Implement the hub as a single goroutine owning room membership, with register, unregister and broadcast channels. Each client gets a read pump that forwards incoming messages to the hub and a write pump that drains its outbound channel. When a message arrives, write it to SQLite first, then broadcast it to every client in the room.",
        "concepts": ["Goroutines and channels", "Hub pattern", "WebSocket pumps"],
        "hints": ["Only the hub mutates the rooms map, so no mutex is needed there.", "Give each client a buffered outbound channel and drop slow clients.", "Set read deadlines and handle ping and pong."],
        "acceptanceCriteria": ["Two clients in a room both receive a message", "A client in another room does not receive it", "Messages survive a server restart"],
        "tests": ["Connect two clients and exchange messages", "Connect a client to a different room", "Restart the server and fetch history"]
      },
      {
        "id": "proj-realtime-chat-m3",
        "order": 3,
        "title": "Presence, direct messages and rate limiting",
        "objectives": ["Track who is online", "Support direct messages", "Limit message rate per user"],
        "instructions": "Add presence by broadcasting a join and leave event whenever a client connects or disconnects, plus a heartbeat that updates last-seen timestamps. Add direct messages routed by user id and stored separately. Add a token-bucket rate limiter allowing 10 messages per 10 seconds per user, returning an error event when the limit is hit.",
        "concepts": ["Presence", "Heartbeats", "Token bucket", "Direct messaging"],
        "hints": ["Broadcast presence to the room, not to every connected client.", "Refill tokens on a timer rather than on every message.", "Rate limiting happens before the message is stored."],
        "acceptanceCriteria": ["Joining shows the user as online to others", "Direct messages reach only the recipient", "Sending 20 messages quickly triggers a rate-limit error"],
        "tests": ["Join and watch the presence event", "Send a direct message", "Send 20 messages in 2 seconds"]
      },
      {
        "id": "proj-realtime-chat-m4",
        "order": 4,
        "title": "Web client and load test",
        "objectives": ["Build a working web client", "Reconnect and catch up from history", "Handle 500 concurrent connections"],
        "instructions": "Build a small web client with login, a room list, a message pane, an online users list and a message box. On reconnect it reloads history from the API so no messages are missed. Write a load test that opens 500 WebSocket connections, sends messages, and measures delivery latency and error rate, then fix any bottlenecks it reveals.",
        "concepts": ["WebSocket clients", "Reconnection", "Load testing"],
        "hints": ["Reconnect with exponential backoff.", "Keep the client simple: plain HTML and JavaScript is enough.", "Measure p95 latency, not just the average."],
        "acceptanceCriteria": ["The web client sends and receives messages", "Reconnecting loads missed history", "500 connections run without errors and p95 latency is under 100 ms"],
        "tests": ["Use the web client end to end", "Kill the connection and reconnect", "Run the 500-connection load test"]
      }
    ],
    "reviewChecklist": [
      "Only the hub mutates room state",
      "Messages are stored before broadcast",
      "Presence updates on join, leave and heartbeat",
      "Rate limiting drops excess messages with an error",
      "A slow client cannot block the hub"
    ],
    "finalAssessment": [
      "Chat between two browser windows in real time",
      "Show presence updating when a user leaves",
      "Send a direct message",
      "Trigger the rate limiter",
      "Show the 500-connection load test results"
    ]
  },
  {
    "id": "proj-task-management-saas",
    "slug": "task-management-saas",
    "level": 3,
    "title": "Task Management SaaS",
    "description": "Build a multi-tenant task management product like a small Trello: organisations own workspaces, workspaces hold boards, boards hold lists and cards, and every change appears in an activity feed. Roles control who can invite members and edit boards, and a billing stub models plans with member limits that the app actually enforces.",
    "skills": ["TypeScript", "Node.js", "Express", "React", "SQLite", "Multi-tenancy", "RBAC", "Activity feeds", "Billing"],
    "language": "typescript",
    "functionalRequirements": [
      "Create organisations and invite members by email with a role",
      "Create workspaces inside an organisation and boards inside a workspace",
      "Manage lists and cards with titles, descriptions, due dates, labels and assignees",
      "Drag cards between lists, persisting their new position",
      "Record every create, move and comment in an activity feed",
      "Enforce roles: owner, admin, member and viewer, with viewer read-only",
      "Enforce plan limits: the free plan allows 3 members and 5 boards per workspace",
      "Provide a billing stub page showing the current plan, usage and an upgrade button that switches plans"
    ],
    "nonFunctionalRequirements": [
      "Users can only see data from organisations they belong to",
      "Every board mutation is recorded in the activity feed",
      "Plan limits are enforced on the server, not just in the UI",
      "Board loads with 200 cards in under 1 second",
      "All API errors are consistent JSON"
    ],
    "architecture": "The backend is an Express and TypeScript API with a middleware chain that authenticates the user, loads the organisation, and checks the membership role before any handler runs. Data is scoped by organisation id on every query. Cards carry a fractional position value so reordering is a single update. The activity feed is an append-only table written in the same transaction as the change it describes. The frontend is a React app with board, list and card components and a drag-and-drop interaction.",
    "databaseSchema": "users: id INTEGER PK, email TEXT UNIQUE, password_hash TEXT, name TEXT; organisations: id INTEGER PK, name TEXT, plan TEXT, created_at TEXT; memberships: id INTEGER PK, org_id INTEGER FK, user_id INTEGER FK, role TEXT, UNIQUE(org_id, user_id); workspaces: id INTEGER PK, org_id INTEGER FK, name TEXT; boards: id INTEGER PK, workspace_id INTEGER FK, name TEXT; lists: id INTEGER PK, board_id INTEGER FK, name TEXT, position REAL; cards: id INTEGER PK, list_id INTEGER FK, title TEXT, description TEXT, due_date TEXT, assignee_id INTEGER FK, position REAL; activities: id INTEGER PK, org_id INTEGER FK, user_id INTEGER FK, action TEXT, detail TEXT, created_at TEXT",
    "apis": [
      "POST /api/auth/register, POST /api/auth/login",
      "POST /api/orgs, GET /api/orgs, POST /api/orgs/{id}/invite",
      "POST /api/orgs/{id}/workspaces, GET /api/orgs/{id}/workspaces",
      "POST /api/workspaces/{id}/boards, GET /api/workspaces/{id}/boards",
      "GET /api/boards/{id} — board with lists, cards and activity",
      "POST /api/boards/{id}/lists, POST /api/lists/{id}/cards",
      "PUT /api/cards/{id} — edit, move and reorder",
      "DELETE /api/cards/{id}",
      "GET /api/boards/{id}/activity",
      "GET /api/billing/{orgId}, POST /api/billing/{orgId}/upgrade"
    ],
    "fileStructure": "task-saas/\n  server/\n    src/\n      index.ts\n      db.ts\n      auth.ts\n      middleware/\n        requireAuth.ts\n        requireRole.ts\n      routes/\n        orgs.ts\n        boards.ts\n        cards.ts\n        billing.ts\n  client/\n    src/\n      App.tsx\n      api.ts\n      pages/\n        Boards.tsx\n        BoardView.tsx\n        Billing.tsx\n      components/\n        CardModal.tsx\n        ActivityFeed.tsx\n  package.json\n  README.md",
    "taskBreakdown": [
      "Design the multi-tenant schema and seed data",
      "Build auth, organisations and invites",
      "Build workspaces, boards, lists and cards",
      "Implement card drag-and-drop with fractional positions",
      "Add the activity feed",
      "Add roles and plan limit enforcement",
      "Build the billing stub page",
      "Test tenancy isolation and role enforcement"
    ],
    "milestones": [
      {
        "id": "proj-task-management-saas-m1",
        "order": 1,
        "title": "Tenancy, auth and organisations",
        "objectives": ["Register users", "Create organisations", "Invite members with roles"],
        "instructions": "Build auth and the organisation model with a memberships table carrying a role per user. Implement organisation creation, which makes the creator the owner, and an invite endpoint that adds a member by email with a chosen role. Write middleware that loads the organisation and the caller's role for every nested route.",
        "concepts": ["Multi-tenancy", "Membership roles", "Middleware"],
        "hints": ["Scope every query by organisation id.", "An invite for an existing member should update the role, not duplicate it.", "Store the role in the membership, not on the user."],
        "acceptanceCriteria": ["An owner can invite a member", "A member sees only their organisations", "Inviting the same user twice does not duplicate the membership"],
        "tests": ["Create an org and invite a member", "List orgs as two different users", "Invite the same email twice"]
      },
      {
        "id": "proj-task-management-saas-m2",
        "order": 2,
        "title": "Boards, lists and cards",
        "objectives": ["Create workspaces and boards", "Manage lists and cards", "Move cards between lists"],
        "instructions": "Implement workspaces, boards, lists and cards with CRUD endpoints, all scoped through the organisation. Cards carry a fractional position so moving a card is a single update to its list and position. Build the board view in React with lists as columns and cards that can be dragged between them.",
        "concepts": ["Nested resources", "Fractional positioning", "Drag and drop"],
        "hints": ["Position a new card after the last card in its list.", "To move between two cards, use the midpoint of their positions.", "Return the full board in one response to keep the UI simple."],
        "acceptanceCriteria": ["Boards, lists and cards can be created", "Dragging a card persists its new list and position", "Reloading the board shows the same layout"],
        "tests": ["Create a board with lists and cards", "Move a card and reload", "Delete a list and check its cards are handled"]
      },
      {
        "id": "proj-task-management-saas-m3",
        "order": 3,
        "title": "Activity feed and roles",
        "objectives": ["Record every board change", "Show the activity feed", "Enforce viewer read-only access"],
        "instructions": "Add an append-only activities table and write an entry in the same transaction as every card create, move, edit and delete, including who did it and what changed. Build the activity feed panel on the board page. Enforce roles in middleware: viewers receive 403 on any write, members can edit cards, and only admins and owners can invite or delete boards.",
        "concepts": ["Audit trails", "Transactions", "Role-based access control"],
        "hints": ["Write the activity row in the same transaction as the change.", "Keep activity text human-readable.", "Check the role on the server for every write."],
        "acceptanceCriteria": ["Every card change appears in the feed", "A viewer gets 403 on writes", "A member cannot invite users"],
        "tests": ["Move a card and check the feed", "Attempt a write as a viewer", "Attempt an invite as a member"]
      },
      {
        "id": "proj-task-management-saas-m4",
        "order": 4,
        "title": "Billing stub and plan limits",
        "objectives": ["Model free and pro plans", "Enforce member and board limits", "Build the billing page"],
        "instructions": "Add a plan field to organisations with free and pro values. Enforce the limits server-side: free allows 3 members per organisation and 5 boards per workspace, and exceeding them returns 402 with a clear message. Build the billing page showing the current plan, usage counts and an upgrade button that switches the plan, and verify the limits lift after upgrading.",
        "concepts": ["Plan limits", "Billing stubs", "Server-side enforcement"],
        "hints": ["Check limits in the create handlers, not just in the UI.", "Count current usage from the database at request time.", "The upgrade endpoint is a stub: it flips the plan and records the change."],
        "acceptanceCriteria": ["A free org cannot add a fourth member", "A free workspace cannot create a sixth board", "Upgrading lifts both limits"],
        "tests": ["Add members up to the free limit", "Create boards up to the free limit", "Upgrade and add one more"]
      }
    ],
    "reviewChecklist": [
      "Every query is scoped to the caller's organisations",
      "Viewers cannot write anything",
      "Activity is recorded for every mutation",
      "Plan limits are enforced server-side",
      "Card positions survive reloads"
    ],
    "finalAssessment": [
      "Create an organisation and invite a member and a viewer",
      "Build a board and drag cards between lists",
      "Show the activity feed entries",
      "Prove the viewer cannot edit",
      "Hit the free plan limit, then upgrade and exceed it"
    ]
  },
  {
    "id": "proj-inventory-system",
    "slug": "inventory-system",
    "level": 3,
    "title": "Inventory Management System",
    "description": "Build an inventory system for a small retailer: track products, stock levels and suppliers, raise purchase orders, receive deliveries, and alert when stock falls below its reorder point. Every stock movement is recorded so the current level can always be reconciled, and monthly reports show turnover, low stock and supplier performance.",
    "skills": ["Python", "SQLite", "Inventory modelling", "Stock movements", "Purchase orders", "Reporting", "CSV import and export", "Testing"],
    "language": "python",
    "functionalRequirements": [
      "Manage products with SKU, name, category, reorder point and unit cost",
      "Manage suppliers with contact details and lead time",
      "Record stock movements: purchases, sales, adjustments and returns, each with a reason",
      "Compute current stock from the movement ledger, never from a stored counter alone",
      "Raise purchase orders to suppliers and receive them partially or in full",
      "Alert on products below their reorder point and list them on a dashboard",
      "Import products from CSV and export stock and movement reports to CSV",
      "Produce monthly reports for stock value, turnover and low-stock items"
    ],
    "nonFunctionalRequirements": [
      "Stock can never go negative through a sale",
      "Every movement is recorded with a timestamp and a reason",
      "The ledger reconciles: the sum of movements equals current stock",
      "Reports for 10,000 movements complete in under 2 seconds",
      "All money is stored as integer cents"
    ],
    "architecture": "The system is a Python CLI and library over SQLite with a ledger design: the stock_movements table is the source of truth, and current stock is the sum of movements per product. Products, suppliers and purchase orders are separate tables, and receiving a purchase order writes a movement for each line. A reporting module aggregates the ledger for stock value, turnover and low-stock lists, and a service layer validates every operation before writing.",
    "databaseSchema": "products: id INTEGER PK, sku TEXT UNIQUE, name TEXT, category TEXT, reorder_point INTEGER, unit_cost_cents INTEGER, supplier_id INTEGER FK; suppliers: id INTEGER PK, name TEXT, email TEXT, lead_time_days INTEGER; stock_movements: id INTEGER PK, product_id INTEGER FK, quantity INTEGER, type TEXT, reason TEXT, reference TEXT, created_at TEXT; purchase_orders: id INTEGER PK, supplier_id INTEGER FK, status TEXT, created_at TEXT, received_at TEXT; po_lines: id INTEGER PK, po_id INTEGER FK, product_id INTEGER FK, quantity INTEGER, received INTEGER",
    "apis": [
      "CLI: inv product add --sku --name --category --reorder-point --cost",
      "CLI: inv supplier add --name --email --lead-time",
      "CLI: inv stock in|out|adjust --sku --qty --reason",
      "CLI: inv po create --supplier, inv po receive --id --sku --qty",
      "CLI: inv alerts — list products below reorder point",
      "CLI: inv report --month YYYY-MM — stock value, turnover, low stock",
      "CLI: inv import products.csv, inv export stock.csv"
    ],
    "fileStructure": "inventory/\n  inventory/\n    __init__.py\n    db.py\n    models.py\n    stock.py\n    purchasing.py\n    reports.py\n    cli.py\n  tests/\n    test_stock.py\n    test_purchasing.py\n    test_reports.py\n  data/\n    sample_products.csv\n  README.md",
    "taskBreakdown": [
      "Design the ledger schema and seed data",
      "Implement products and suppliers",
      "Implement stock movements with validation",
      "Implement purchase orders and receiving",
      "Add low-stock alerts and the dashboard",
      "Add CSV import and export",
      "Build the monthly reports",
      "Test reconciliation and edge cases"
    ],
    "milestones": [
      {
        "id": "proj-inventory-system-m1",
        "order": 1,
        "title": "Products, suppliers and the ledger",
        "objectives": ["Create the schema", "Add products and suppliers", "Record stock movements"],
        "instructions": "Create the tables and implement product and supplier management with unique SKUs. Implement stock movements where each row records a signed quantity, a type and a reason, and current stock is always computed as the sum of movements. Seed ten products and two suppliers, then record an opening stock movement for each product.",
        "concepts": ["Ledger design", "Unique constraints", "Derived state"],
        "hints": ["Never store a stock counter; derive it from the ledger.", "Use a signed quantity: positive for in, negative for out.", "Validate the SKU format on creation."],
        "acceptanceCriteria": ["Products and suppliers can be added", "Stock equals the sum of movements", "Duplicate SKUs are rejected"],
        "tests": ["Add a product and record opening stock", "Add the same SKU twice", "Sum movements and compare with reported stock"]
      },
      {
        "id": "proj-inventory-system-m2",
        "order": 2,
        "title": "Sales, adjustments and alerts",
        "objectives": ["Prevent negative stock on sales", "Support adjustments with reasons", "List low-stock products"],
        "instructions": "Implement stock out for sales, rejecting any sale that would take stock below zero, and adjustments that require a reason and can be positive or negative. Add an alerts command that lists every product whose stock is at or below its reorder point, sorted by how far below it is.",
        "concepts": ["Validation", "Negative stock prevention", "Reorder points"],
        "hints": ["Check available stock inside the same transaction as the movement.", "Adjustments need a reason so audits make sense.", "Sort alerts by urgency, not alphabetically."],
        "acceptanceCriteria": ["A sale larger than stock is rejected", "Adjustments require a reason", "Alerts list exactly the products below reorder point"],
        "tests": ["Sell more than is in stock", "Adjust stock with and without a reason", "Check alerts after a large sale"]
      },
      {
        "id": "proj-inventory-system-m3",
        "order": 3,
        "title": "Purchase orders and receiving",
        "objectives": ["Raise purchase orders", "Receive deliveries partially", "Update stock on receipt"],
        "instructions": "Implement purchase orders with lines per product, created against a supplier. Receiving a line writes a stock movement and updates the received count; a purchase order can be received in several deliveries and is complete only when every line is fully received. Add a command to list open purchase orders with their remaining quantities.",
        "concepts": ["Purchase orders", "Partial receiving", "Order lifecycle"],
        "hints": ["Receiving more than ordered is an error.", "Write the movement and the received count in one transaction.", "Keep the order status derived from its lines."],
        "acceptanceCriteria": ["A purchase order can be received in two parts", "Stock increases by the received quantity", "Over-receiving is rejected"],
        "tests": ["Create and partially receive an order", "Receive the remainder and check the status", "Try to receive more than ordered"]
      },
      {
        "id": "proj-inventory-system-m4",
        "order": 4,
        "title": "Reports, import and export",
        "objectives": ["Produce monthly reports", "Import products from CSV", "Export stock to CSV"],
        "instructions": "Build the monthly report with stock value at cost, turnover by category, and the low-stock list, and add CSV import for products and CSV export for stock and movements. Test with 10,000 generated movements, verify the ledger reconciles, and finish the README with a worked example from opening stock to a purchase order to a report.",
        "concepts": ["Aggregation", "CSV import and export", "Reconciliation"],
        "hints": ["Compute stock value as stock times unit cost.", "Validate every CSV row and report the bad ones.", "Reconciliation is a test: sum of movements must equal reported stock for every product."],
        "acceptanceCriteria": ["Monthly report totals match the ledger", "CSV import loads products with errors reported", "10,000 movements report in under 2 seconds"],
        "tests": ["Generate 10,000 movements and time the report", "Import a CSV with one bad row", "Reconcile every product after a full workflow"]
      }
    ],
    "reviewChecklist": [
      "Stock is derived from the ledger, never a bare counter",
      "Sales can never drive stock negative",
      "Every movement has a type, reason and timestamp",
      "Partial receiving works and completes correctly",
      "Reports reconcile with the ledger"
    ],
    "finalAssessment": [
      "Add products and record opening stock",
      "Sell stock down past the reorder point and show the alert",
      "Raise and partially receive a purchase order",
      "Export the stock report to CSV",
      "Prove the ledger reconciles for every product"
    ]
  },
  {
    "id": "proj-blog-cms",
    "slug": "blog-cms",
    "level": 2,
    "title": "Blog Platform with CMS",
    "description": "Build a blog platform with a content management system: authors write posts in Markdown, save drafts, publish on a schedule, tag and search content, and readers can comment. An admin panel manages authors, moderates comments and shows basic reading statistics, and the public site renders posts as clean, fast pages.",
    "skills": ["TypeScript", "Node.js", "Express", "React", "SQLite", "Markdown rendering", "Search", "Authentication"],
    "language": "typescript",
    "functionalRequirements": [
      "Write and edit posts in Markdown with a live preview",
      "Save posts as drafts and publish them, with optional scheduled publishing",
      "Tag posts and browse by tag, author and date",
      "Search posts by title and body text",
      "Let signed-in readers comment, and let authors reply",
      "Moderate comments: approve, hide or delete them from the admin panel",
      "Provide an admin panel listing posts, authors and comments with counts",
      "Generate SEO-friendly slugs and a public RSS feed"
    ],
    "nonFunctionalRequirements": [
      "Drafts are visible only to their author and admins",
      "Published pages load in under 1 second",
      "Search returns results in under 200 ms",
      "Comment spam is limited by rate limiting per user",
      "All user input is escaped or sanitised before rendering"
    ],
    "architecture": "The backend is an Express and TypeScript API with routes for auth, posts, tags and comments, and a Markdown rendering module that converts post bodies to sanitised HTML. SQLite stores posts, tags, comments and users, and a full-text search index covers post titles and bodies. The frontend is a React app with a public reader view, an author editor with live preview, and an admin panel. A scheduled job publishes posts whose publish time has arrived.",
    "databaseSchema": "users: id INTEGER PK, name TEXT, email TEXT UNIQUE, password_hash TEXT, role TEXT; posts: id INTEGER PK, author_id INTEGER FK, title TEXT, slug TEXT UNIQUE, body_markdown TEXT, body_html TEXT, status TEXT, published_at TEXT, created_at TEXT, updated_at TEXT; tags: id INTEGER PK, name TEXT UNIQUE; post_tags: post_id INTEGER FK, tag_id INTEGER FK, PK(post_id, tag_id); comments: id INTEGER PK, post_id INTEGER FK, user_id INTEGER FK, body TEXT, status TEXT, created_at TEXT",
    "apis": [
      "GET /api/posts?status=&tag=&author=&q=&page=",
      "GET /api/posts/{slug}",
      "POST /api/posts, PUT /api/posts/{id}, DELETE /api/posts/{id}",
      "POST /api/posts/{id}/publish, POST /api/posts/{id}/schedule",
      "GET /api/tags, GET /api/tags/{name}/posts",
      "GET /api/posts/{id}/comments, POST /api/posts/{id}/comments",
      "POST /api/admin/comments/{id}/approve, POST /api/admin/comments/{id}/hide",
      "GET /rss.xml — public RSS feed",
      "POST /api/auth/register, POST /api/auth/login"
    ],
    "fileStructure": "blog-cms/\n  server/\n    src/\n      index.ts\n      db.ts\n      markdown.ts\n      search.ts\n      routes/\n        posts.ts\n        comments.ts\n        admin.ts\n      jobs/\n        publishScheduled.ts\n  client/\n    src/\n      App.tsx\n      pages/\n        Home.tsx\n        PostView.tsx\n        Editor.tsx\n        Admin.tsx\n      components/\n        MarkdownPreview.tsx\n  package.json\n  README.md",
    "taskBreakdown": [
      "Design the schema and seed authors and posts",
      "Build post CRUD with drafts and slugs",
      "Add Markdown rendering and the editor preview",
      "Add tags, search and the public reader pages",
      "Add comments with moderation",
      "Add scheduled publishing",
      "Build the admin panel and RSS feed",
      "Test permissions and polish the design"
    ],
    "milestones": [
      {
        "id": "proj-blog-cms-m1",
        "order": 1,
        "title": "Posts, drafts and slugs",
        "objectives": ["Create and edit posts", "Save drafts", "Generate unique slugs"],
        "instructions": "Implement post creation and editing with title, Markdown body and status. Generate a slug from the title and make it unique by appending a number when needed. Drafts are returned only to their author or an admin; published posts are public. Seed five published posts and two drafts.",
        "concepts": ["CRUD", "Slugs", "Draft vs published"],
        "hints": ["Store both the Markdown source and the rendered HTML.", "Generate the slug on the server, not the client.", "Return 404 for a draft requested by a stranger."],
        "acceptanceCriteria": ["Posts can be created as drafts", "Slugs are unique and URL-safe", "Drafts are hidden from anonymous readers"],
        "tests": ["Create a draft and fetch it anonymously", "Create two posts with the same title", "Publish a draft and fetch it publicly"]
      },
      {
        "id": "proj-blog-cms-m2",
        "order": 2,
        "title": "Markdown editor and public pages",
        "objectives": ["Render Markdown safely", "Build the editor with preview", "Build the public home and post pages"],
        "instructions": "Add a Markdown renderer that converts post bodies to HTML and sanitises the output so raw HTML in a post cannot inject scripts. Build the editor page with a live preview pane, and the public home page listing published posts with author, date and tags, plus the post detail page.",
        "concepts": ["Markdown", "HTML sanitisation", "Live preview"],
        "hints": ["Render on the server when saving so the stored HTML is always consistent.", "Use a small Markdown library, not a hand-rolled parser.", "Escape user content in comments as well."],
        "acceptanceCriteria": ["Markdown renders headings, code and links", "Injected script tags are stripped", "The editor preview updates as you type"],
        "tests": ["Save a post with a script tag and inspect the HTML", "Preview Markdown with a code block", "Load the home page and count posts"]
      },
      {
        "id": "proj-blog-cms-m3",
        "order": 3,
        "title": "Tags, search and comments",
        "objectives": ["Tag and filter posts", "Search titles and bodies", "Add moderated comments"],
        "instructions": "Implement tags as a many-to-many relation with endpoints to list tags and filter posts by tag. Add full-text search over titles and bodies using a SQLite FTS table. Add comments that start as pending, are visible only after approval, and can be hidden or deleted by an admin or the post author.",
        "concepts": ["Many-to-many relations", "Full-text search", "Moderation"],
        "hints": ["Sync the FTS table when a post is created or updated.", "Keep comment status as pending, approved or hidden.", "Rate limit comment creation to stop spam."],
        "acceptanceCriteria": ["Filtering by tag returns the right posts", "Search finds posts by a word in the body", "Unapproved comments are hidden from readers"],
        "tests": ["Search for a word that appears in one post", "Filter by a tag", "Post a comment and check it is pending"]
      },
      {
        "id": "proj-blog-cms-m4",
        "order": 4,
        "title": "Scheduled publishing, admin and RSS",
        "objectives": ["Publish posts on a schedule", "Build the admin panel", "Generate an RSS feed"],
        "instructions": "Add a scheduled publish time to posts and a job that runs every minute to publish due posts. Build the admin panel listing posts, authors and pending comments with counts and quick actions. Add the RSS feed endpoint that returns the latest 20 published posts, and verify the whole flow from draft to scheduled publish to public page.",
        "concepts": ["Scheduled jobs", "Admin dashboards", "RSS"],
        "hints": ["Store publish time as an ISO timestamp and compare with now.", "The job can be a simple interval timer in the server.", "RSS is plain XML; set the content type correctly."],
        "acceptanceCriteria": ["A post scheduled for the past publishes within a minute", "The admin panel shows counts and pending comments", "The RSS feed lists the latest posts"],
        "tests": ["Schedule a post 1 minute ahead and wait", "Fetch /rss.xml and parse it", "Approve a comment from the admin panel"]
      }
    ],
    "reviewChecklist": [
      "Drafts are never visible to anonymous readers",
      "Rendered HTML is sanitised",
      "Search and tag filtering return correct results",
      "Comments require approval before appearing",
      "Scheduled posts publish on time"
    ],
    "finalAssessment": [
      "Write a post in Markdown and preview it",
      "Publish it and view it as a reader",
      "Comment on it and approve the comment as admin",
      "Search for it and filter by its tag",
      "Schedule a post and show it publishing automatically"
    ]
  },
  {
    "id": "proj-url-shortener",
    "slug": "url-shortener",
    "level": 2,
    "title": "URL Shortener Service",
    "description": "Build a URL shortener in Go: create short links from long URLs, redirect visitors with the correct status code, track click analytics, support custom aliases and expiry dates, and serve everything behind a small JSON API and a simple web page. Short codes are generated safely under concurrency so two links never collide.",
    "skills": ["Go", "HTTP servers", "SQLite", "Short code generation", "Analytics", "Concurrency", "Testing", "Docker"],
    "language": "go",
    "functionalRequirements": [
      "Create a short link from a long URL and return its short code",
      "Redirect a short code to its target with HTTP 302",
      "Support custom aliases and reject duplicates",
      "Support optional expiry dates, after which the link returns 410",
      "Record every click with timestamp, referrer and user agent",
      "Show analytics per link: total clicks, clicks per day, top referrers",
      "Validate URLs before accepting them",
      "Provide a simple web page to create links and view stats"
    ],
    "nonFunctionalRequirements": [
      "Redirects respond in under 50 ms",
      "Short codes are unique even under concurrent creation",
      "Expired links never redirect",
      "Analytics recording never blocks the redirect",
      "The service runs in a single Docker container"
    ],
    "architecture": "The service is a Go HTTP server with SQLite. Short codes are generated from a counter encoded in base62 inside a transaction, which guarantees uniqueness under concurrency, while custom aliases go through a unique constraint. Redirects look up the code, check expiry, and record the click asynchronously through a channel so the redirect is never delayed by the analytics write. A daily aggregation query powers the analytics endpoints.",
    "databaseSchema": "links: id INTEGER PK, code TEXT UNIQUE, target_url TEXT, alias TEXT UNIQUE, created_by TEXT, expires_at TEXT, created_at TEXT; clicks: id INTEGER PK, link_id INTEGER FK, clicked_at TEXT, referrer TEXT, user_agent TEXT",
    "apis": [
      "POST /api/links — body {url, alias?, expires_at?} returns {code, short_url}",
      "GET /{code} — 302 redirect to the target, 404 for unknown, 410 for expired",
      "GET /api/links — list links with click counts",
      "GET /api/links/{code} — link detail with analytics",
      "GET /api/links/{code}/stats?days=30 — clicks per day and top referrers",
      "DELETE /api/links/{code} — delete a link",
      "GET / — web UI for creating links"
    ],
    "fileStructure": "url-shortener/\n  cmd/server/main.go\n  internal/\n    store/store.go\n    shortcode/code.go\n    analytics/analytics.go\n    handlers/handlers.go\n  web/\n    index.html\n    app.js\n  Dockerfile\n  go.mod\n  README.md",
    "taskBreakdown": [
      "Set up the Go module and SQLite store",
      "Implement base62 short code generation",
      "Build link creation and the redirect handler",
      "Add custom aliases and expiry",
      "Add click tracking and analytics",
      "Build the web UI",
      "Add tests and the Dockerfile",
      "Load-test redirects"
    ],
    "milestones": [
      {
        "id": "proj-url-shortener-m1",
        "order": 1,
        "title": "Store and short codes",
        "objectives": ["Create the schema", "Generate unique short codes", "Validate URLs"],
        "instructions": "Create the links and clicks tables and a store layer. Implement base62 encoding of an incrementing counter inside a transaction so concurrent creation can never produce a duplicate code. Validate that the submitted URL is a well-formed http or https URL before storing it.",
        "concepts": ["Base62 encoding", "Transactions", "URL validation"],
        "hints": ["Encode the row id after inserting, then update the code.", "Use a unique constraint on code as a safety net.", "Reject URLs without a scheme."],
        "acceptanceCriteria": ["Creating a link returns a short code", "Two links get different codes", "An invalid URL returns 400"],
        "tests": ["Create 100 links concurrently and check uniqueness", "Create a link with an invalid URL", "Create a link and inspect the row"]
      },
      {
        "id": "proj-url-shortener-m2",
        "order": 2,
        "title": "Redirects, aliases and expiry",
        "objectives": ["Redirect short codes", "Support custom aliases", "Expire links correctly"],
        "instructions": "Implement the redirect handler: look up the code, return 404 for unknown codes, 410 for expired ones, and 302 to the target otherwise. Add custom alias support with a uniqueness check that returns 409 on a clash, and an optional expiry timestamp. Add the list and delete endpoints.",
        "concepts": ["HTTP redirects", "Status codes", "Expiry"],
        "hints": ["Use 302, not 301, so browsers re-check expiry.", "Validate alias characters: letters, digits, dash and underscore only.", "Compare expiry against the current time in UTC."],
        "acceptanceCriteria": ["A short code redirects with 302", "An unknown code returns 404", "An expired link returns 410"],
        "tests": ["Create and follow a short link", "Create two links with the same alias", "Create a link expired yesterday and request it"]
      },
      {
        "id": "proj-url-shortener-m3",
        "order": 3,
        "title": "Click analytics",
        "objectives": ["Record clicks without blocking redirects", "Aggregate clicks per day", "Show top referrers"],
        "instructions": "Record every redirect click with its timestamp, referrer and user agent, writing through a buffered channel and a background worker so the redirect response is never delayed. Build the stats endpoint that returns total clicks, clicks per day for the last 30 days, and the top referrers. Verify the counts match the number of redirects you performed.",
        "concepts": ["Async writes", "Channels", "Aggregation queries"],
        "hints": ["A buffered channel with a worker goroutine is enough.", "Group clicks by date in SQL.", "Flush the channel before reading stats in tests."],
        "acceptanceCriteria": ["Clicks are recorded for every redirect", "Daily counts add up to the total", "Top referrers are ranked correctly"],
        "tests": ["Follow a link 10 times and check the count", "Follow with different referrers", "Check the daily breakdown"]
      },
      {
        "id": "proj-url-shortener-m4",
        "order": 4,
        "title": "Web UI, tests and Docker",
        "objectives": ["Build the web UI", "Cover the service with tests", "Ship a Docker image"],
        "instructions": "Build a single-page web UI that creates links from a form, lists existing links with their click counts, and shows a stats view for one link. Write tests for code generation, redirects, aliases, expiry and analytics. Add a Dockerfile, run the service from it, and measure redirect latency under load.",
        "concepts": ["Single-page UI", "Integration testing", "Docker"],
        "hints": ["Keep the UI plain HTML and JavaScript.", "Test the redirect handler with httptest.", "Measure p95 latency for redirects."],
        "acceptanceCriteria": ["The UI creates links and shows stats", "All tests pass", "The Docker image serves redirects under 50 ms"],
        "tests": ["Use the UI to create a link", "Run the full test suite", "Load-test 1,000 redirects"]
      }
    ],
    "reviewChecklist": [
      "Short codes are unique under concurrency",
      "Expired links return 410 and never redirect",
      "Analytics never slow down redirects",
      "Custom aliases are validated and unique",
      "Invalid URLs are rejected with 400"
    ],
    "finalAssessment": [
      "Create a short link and follow it",
      "Create a custom alias and show a duplicate being rejected",
      "Create an expired link and show the 410",
      "Generate clicks and show the analytics",
      "Show the test suite and Docker image running"
    ]
  },
  {
    "id": "proj-expense-tracker-backend",
    "slug": "expense-tracker-backend",
    "level": 2,
    "title": "Expense Tracker Backend",
    "description": "Build the backend for an expense tracker in Python: categories and budgets, recurring expenses that generate themselves each month, monthly reports with charts data, and CSV export. Money is handled as integer cents throughout, and every endpoint is authenticated so users only ever see their own spending.",
    "skills": ["Python", "REST APIs", "SQLite", "Money handling", "Recurring schedules", "Reporting", "CSV export", "JWT authentication"],
    "language": "python",
    "functionalRequirements": [
      "Manage expense categories with a monthly budget each",
      "Add, edit and delete expenses with amount, category, date and note",
      "Create recurring expenses that generate an entry on their schedule",
      "List expenses with filters by category, date range and search text",
      "Produce a monthly report with totals per category, budget remaining and daily average",
      "Warn when a category exceeds its monthly budget",
      "Export a month of expenses to CSV",
      "Authenticate all endpoints with JWT and scope all data to the user"
    ],
    "nonFunctionalRequirements": [
      "All money is stored and computed as integer cents",
      "Monthly reports compute in under 200 ms",
      "Recurring expenses generate exactly once per period",
      "A user can never see another user's expenses",
      "Invalid amounts and dates return 400 with a clear message"
    ],
    "architecture": "The service is a Python HTTP API with a small router, a service layer for expenses, budgets and recurring rules, and SQLite for storage. Amounts are stored as integer cents and converted to dollars only when serialising. Recurring expenses are templates with a frequency and a next-due date; a generation function runs on each request and at startup, creating entries and advancing the due date inside a transaction so a period is never generated twice.",
    "databaseSchema": "users: id INTEGER PK, email TEXT UNIQUE, password_hash TEXT; categories: id INTEGER PK, user_id INTEGER FK, name TEXT, budget_cents INTEGER, UNIQUE(user_id, name); expenses: id INTEGER PK, user_id INTEGER FK, category_id INTEGER FK, amount_cents INTEGER, date TEXT, note TEXT, recurring_id INTEGER FK, created_at TEXT; recurring: id INTEGER PK, user_id INTEGER FK, category_id INTEGER FK, amount_cents INTEGER, frequency TEXT, next_due TEXT, note TEXT, active INTEGER",
    "apis": [
      "POST /api/auth/register, POST /api/auth/login",
      "GET /api/categories, POST /api/categories, PUT /api/categories/{id}",
      "GET /api/expenses?category=&from=&to=&q=",
      "POST /api/expenses, PUT /api/expenses/{id}, DELETE /api/expenses/{id}",
      "GET /api/recurring, POST /api/recurring, PUT /api/recurring/{id}",
      "GET /api/reports/monthly?month=YYYY-MM",
      "GET /api/reports/export?month=YYYY-MM — CSV download",
      "GET /api/health"
    ],
    "fileStructure": "expense-tracker-backend/\n  app/\n    __init__.py\n    main.py\n    db.py\n    auth.py\n    services/\n      __init__.py\n      expenses.py\n      recurring.py\n      reports.py\n    routers/\n      __init__.py\n      auth.py\n      expenses.py\n      reports.py\n  tests/\n    test_expenses.py\n    test_recurring.py\n    test_reports.py\n  README.md",
    "taskBreakdown": [
      "Set up auth, the schema and the money helpers",
      "Implement categories and budgets",
      "Implement expense CRUD with filters",
      "Implement recurring expenses",
      "Build the monthly report and budget warnings",
      "Add CSV export",
      "Write the test suite",
      "Document the API"
    ],
    "milestones": [
      {
        "id": "proj-expense-tracker-backend-m1",
        "order": 1,
        "title": "Auth, schema and categories",
        "objectives": ["Register and log in users", "Manage categories with budgets", "Handle money as integer cents"],
        "instructions": "Implement JWT auth and the categories endpoints, with a budget stored in integer cents per category. Add helpers that convert dollars to cents on input and cents to dollars on output, and validate that amounts are positive with at most two decimal places. Seed a demo user with three categories.",
        "concepts": ["JWT", "Integer cents", "Validation"],
        "hints": ["Parse amounts as strings to avoid float rounding.", "Category names are unique per user.", "Return 401 for missing tokens on every endpoint."],
        "acceptanceCriteria": ["Users can register and log in", "Categories can be created with budgets", "10.10 plus 20.20 totals exactly 30.30"],
        "tests": ["Register and log in", "Create a duplicate category name", "Add expenses totalling 0.10 and 0.20"]
      },
      {
        "id": "proj-expense-tracker-backend-m2",
        "order": 2,
        "title": "Expense CRUD and filters",
        "objectives": ["Add, edit and delete expenses", "Filter by category and date", "Scope all data to the user"],
        "instructions": "Implement expense CRUD with validation for amount, date format and category ownership. Add list filters for category, date range and search text. Every query must include the user id so one user can never see another user's expenses, and attempts to use another user's category must fail.",
        "concepts": ["CRUD", "Filtering", "Ownership scoping"],
        "hints": ["Check the category belongs to the user before saving.", "Use query parameters for filters.", "Return expenses newest first by default."],
        "acceptanceCriteria": ["Expenses can be created and listed", "Filters return the right subset", "A user cannot read another user's expense"],
        "tests": ["Create expenses and filter by category", "Filter by a date range", "Fetch another user's expense id"]
      },
      {
        "id": "proj-expense-tracker-backend-m3",
        "order": 3,
        "title": "Recurring expenses",
        "objectives": ["Create recurring templates", "Generate entries on schedule", "Generate each period exactly once"],
        "instructions": "Implement recurring templates with monthly or weekly frequency and a next-due date. A generation function creates an expense for every due period and advances the due date, all inside a transaction so a crash mid-generation cannot duplicate entries. Call it on startup and before listing expenses, and test that running it twice in a row creates no duplicates.",
        "concepts": ["Recurring schedules", "Idempotency", "Transactions"],
        "hints": ["Advance the due date in the same transaction as the insert.", "Support monthly and weekly to start.", "Deactivating a template stops future generation."],
        "acceptanceCriteria": ["A monthly template generates an expense when due", "Running generation twice creates one entry", "Deactivated templates generate nothing"],
        "tests": ["Create a template due yesterday and list expenses", "Run generation twice", "Deactivate a template and run generation"]
      },
      {
        "id": "proj-expense-tracker-backend-m4",
        "order": 4,
        "title": "Reports, budgets and export",
        "objectives": ["Build the monthly report", "Warn on budget overruns", "Export to CSV"],
        "instructions": "Implement the monthly report: totals per category, budget and remaining per category, grand total and daily average, with a warning flag for any category over budget. Add the CSV export endpoint that streams the month's expenses with headers. Write tests for report math, budget warnings and export, and document every endpoint in the README.",
        "concepts": ["Aggregation", "Budget warnings", "CSV streaming"],
        "hints": ["Compute the daily average from the days in the month.", "Use the csv module for export.", "Include the category name in the CSV, not just the id."],
        "acceptanceCriteria": ["Report totals match the stored expenses", "Over-budget categories are flagged", "The CSV has headers and one row per expense"],
        "tests": ["Report a month with known expenses", "Exceed a budget and check the warning", "Export a month and open the CSV"]
      }
    ],
    "reviewChecklist": [
      "Money is integer cents everywhere",
      "Recurring generation is idempotent",
      "All data is scoped to the authenticated user",
      "Budget warnings appear in the monthly report",
      "CSV export matches the listed expenses"
    ],
    "finalAssessment": [
      "Create categories with budgets and add expenses",
      "Show the monthly report with a budget warning",
      "Create a recurring expense and show it generating",
      "Export the month to CSV",
      "Prove one user cannot see another's data"
    ]
  },
  {
    "id": "proj-recommendation-engine",
    "slug": "recommendation-engine",
    "level": 3,
    "title": "Recommendation Engine",
    "description": "Build a recommendation engine in pure Python: collaborative filtering over user ratings, served through an HTTP API, with offline evaluation that measures precision and recall before a model ships. The engine handles new users with popularity fallbacks, retrains from the ratings table, and explains each recommendation with the similar users behind it.",
    "skills": ["Python", "Collaborative filtering", "Cosine similarity", "Evaluation metrics", "HTTP APIs", "SQLite", "Testing", "Data modelling"],
    "language": "python",
    "functionalRequirements": [
      "Store users, items and ratings from 1 to 5",
      "Compute user-user similarity with cosine similarity over shared ratings",
      "Recommend items a user has not rated, ranked by predicted rating",
      "Fall back to popular items for users with no ratings",
      "Expose recommendations, similar users and predicted ratings over HTTP",
      "Evaluate offline with a train and test split, reporting precision at 10 and recall at 10",
      "Support item-based recommendations as an alternative mode",
      "Retrain the model from the ratings table on demand"
    ],
    "nonFunctionalRequirements": [
      "Uses only the Python standard library",
      "Recommendations for a user return in under 200 ms",
      "Evaluation is reproducible from a fixed random seed",
      "New users always get recommendations, never an error",
      "The model file records the data version it was trained on"
    ],
    "architecture": "The engine has a ratings store in SQLite, a model module that builds a user-item matrix in memory and computes cosine similarity between users, and a predictor that estimates a rating as the similarity-weighted average of neighbours ratings. A training script writes the similarity matrix and metadata to a JSON model file, the API loads it and serves recommendations, and an evaluation script splits ratings into train and test sets, measures precision and recall at 10, and reports per-user coverage.",
    "databaseSchema": "users: id INTEGER PK, name TEXT; items: id INTEGER PK, title TEXT, category TEXT; ratings: user_id INTEGER FK, item_id INTEGER FK, rating INTEGER, created_at TEXT, PK(user_id, item_id); models: version TEXT PK, created_at TEXT, precision_at_10 REAL, recall_at_10 REAL, ratings_count INTEGER",
    "apis": [
      "POST /ratings — body {user_id, item_id, rating}",
      "GET /recommendations/{user_id}?n=10&mode=user|item",
      "GET /recommendations/{user_id}/explain?item_id= — similar users behind a recommendation",
      "GET /similar-users/{user_id}?n=5",
      "GET /popular?n=10 — fallback recommendations",
      "POST /train — retrain the model from current ratings",
      "GET /models/latest — latest model metrics",
      "CLI: python -m engine evaluate --seed 42"
    ],
    "fileStructure": "recommendation-engine/\n  engine/\n    __init__.py\n    db.py\n    similarity.py\n    model.py\n    train.py\n    evaluate.py\n    server.py\n  data/\n    seed_ratings.csv\n  tests/\n    test_similarity.py\n    test_model.py\n    test_server.py\n  README.md",
    "taskBreakdown": [
      "Design the schema and seed ratings data",
      "Implement cosine similarity",
      "Implement user-based prediction and ranking",
      "Add the popularity fallback and item-based mode",
      "Build the HTTP API with explanations",
      "Implement offline evaluation",
      "Add retraining and model versioning",
      "Test accuracy and latency"
    ],
    "milestones": [
      {
        "id": "proj-recommendation-engine-m1",
        "order": 1,
        "title": "Ratings store and similarity",
        "objectives": ["Store ratings", "Compute cosine similarity", "Find similar users"],
        "instructions": "Create the schema and seed at least 50 users, 100 items and 1,000 ratings from the CSV file. Implement cosine similarity between two users over the items they both rated, returning 0 when they share nothing. Write a function that returns the top similar users for a given user with their similarity scores.",
        "concepts": ["Cosine similarity", "Sparse ratings", "User vectors"],
        "hints": ["Only shared items count toward similarity.", "Mean-centre ratings before computing similarity for better results.", "Cache the similarity matrix after computing it."],
        "acceptanceCriteria": ["Similarity of a user with themselves is 1", "Users with no shared items score 0", "Top similar users are returned ranked"],
        "tests": ["Compute similarity for known rating pairs", "Find similar users for a seeded user", "Check symmetry of similarity"]
      },
      {
        "id": "proj-recommendation-engine-m2",
        "order": 2,
        "title": "Prediction and ranking",
        "objectives": ["Predict ratings for unseen items", "Rank recommendations", "Add the popularity fallback"],
        "instructions": "Implement prediction as the similarity-weighted average of the top neighbours ratings for an item, falling back to the item average when no neighbour rated it. Rank all unrated items by predicted rating and return the top n. For a user with no ratings, return the most popular items by average rating and rating count.",
        "concepts": ["Weighted prediction", "Ranking", "Cold start"],
        "hints": ["Exclude items the user already rated.", "Require a minimum rating count for popularity so one 5-star rating does not dominate.", "Clamp predictions to the 1 to 5 range."],
        "acceptanceCriteria": ["Recommendations exclude already-rated items", "Predictions stay within 1 to 5", "A brand-new user gets popular items"],
        "tests": ["Recommend for a seeded user and check exclusions", "Recommend for a new user", "Predict a rating and compare with the actual"]
      },
      {
        "id": "proj-recommendation-engine-m3",
        "order": 3,
        "title": "API and explanations",
        "objectives": ["Serve recommendations over HTTP", "Explain each recommendation", "Support item-based mode"],
        "instructions": "Build the HTTP API with endpoints for recommendations, similar users, explanations and popular items. The explain endpoint lists the neighbours whose ratings drove a recommendation and their similarity scores. Add item-based mode, which finds items similar to the ones the user liked, and let the caller choose the mode with a query parameter.",
        "concepts": ["HTTP APIs", "Explainability", "Item-based filtering"],
        "hints": ["An explanation is just the top neighbours who rated that item.", "Item similarity uses the same cosine function on item vectors.", "Keep the model loaded in memory for fast responses."],
        "acceptanceCriteria": ["The API returns ranked recommendations", "Explanations name the neighbours behind a recommendation", "Item mode returns different results from user mode"],
        "tests": ["Call the recommendations endpoint", "Call explain for a recommended item", "Compare user mode and item mode output"]
      },
      {
        "id": "proj-recommendation-engine-m4",
        "order": 4,
        "title": "Offline evaluation and retraining",
        "objectives": ["Split ratings into train and test", "Measure precision and recall at 10", "Retrain on demand"],
        "instructions": "Implement evaluation: split ratings by user with a fixed seed, train on the training split, recommend for each test user, and measure precision at 10 and recall at 10 against the held-out items they actually liked. Record the metrics with the model version. Add the retrain endpoint that rebuilds the model from the current ratings table, and document the metrics in the README.",
        "concepts": ["Train and test split", "Precision at k", "Recall at k", "Reproducibility"],
        "hints": ["A liked item in the test set is one rated 4 or 5.", "Use a fixed seed so results are reproducible.", "Report coverage too: the share of users who got recommendations."],
        "acceptanceCriteria": ["Evaluation reports precision and recall at 10", "Re-running evaluation gives the same numbers", "Retraining creates a new model version with metrics"],
        "tests": ["Run evaluation and inspect the metrics", "Run it twice and compare", "Add ratings, retrain, and check the version"]
      }
    ],
    "reviewChecklist": [
      "Similarity is computed only over shared ratings",
      "Recommendations never include already-rated items",
      "New users get popularity fallbacks",
      "Evaluation is reproducible with a fixed seed",
      "Explanations are grounded in real neighbour ratings"
    ],
    "finalAssessment": [
      "Recommend items for a seeded user and explain one",
      "Show recommendations for a brand-new user",
      "Compare user-based and item-based results",
      "Run offline evaluation and explain the metrics",
      "Add ratings, retrain, and show the new model version"
    ]
  },
  {
    "id": "proj-log-aggregation",
    "slug": "log-aggregation",
    "level": 3,
    "title": "Log Aggregation System",
    "description": "Build a log aggregation system in Go: services send log lines over HTTP, the system parses them into structured fields, indexes them for search, and serves a query API with time ranges, severity filters and full-text search. Old logs are removed by a retention policy, and ingestion keeps working even when a sender misbehaves.",
    "skills": ["Go", "HTTP ingestion", "Log parsing", "Full-text search", "SQLite", "Retention policies", "Concurrency", "Testing"],
    "language": "go",
    "functionalRequirements": [
      "Accept log entries over HTTP as JSON or plain text lines",
      "Parse timestamps, severity, service name and message from each entry",
      "Store logs in SQLite with an index on timestamp, service and severity",
      "Search logs by text, service, severity and time range with pagination",
      "Return per-service and per-severity counts over a time range",
      "Apply a retention policy that deletes logs older than a configured number of days",
      "Accept batches of up to 1,000 entries per request",
      "Return a health endpoint and ingestion statistics"
    ],
    "nonFunctionalRequirements": [
      "Ingestion handles 1,000 entries per second",
      "Search over 100,000 logs returns in under 500 ms",
      "A malformed entry is rejected without failing the batch",
      "Retention runs automatically once a day",
      "The service never loses accepted logs on restart"
    ],
    "architecture": "The service is a Go HTTP server with an ingest endpoint that validates and parses each entry, a writer that inserts batches into SQLite inside a transaction, and a query layer that builds SQL from the search parameters and uses indexes on timestamp, service and severity. A background retention goroutine runs daily and deletes rows older than the configured age. Parsing is a small module that handles JSON entries and a common plain-text format, and malformed entries are counted and reported rather than aborting the batch.",
    "databaseSchema": "logs: id INTEGER PK, timestamp TEXT, service TEXT, level TEXT, message TEXT, fields TEXT; ingest_stats: id INTEGER PK, received INTEGER, accepted INTEGER, rejected INTEGER, recorded_at TEXT; retention: id INTEGER PK, deleted INTEGER, ran_at TEXT",
    "apis": [
      "POST /ingest — body {entries: [{timestamp, service, level, message, fields?}]} or plain text lines",
      "GET /logs?q=&service=&level=&from=&to=&page=&limit=",
      "GET /logs/{id}",
      "GET /stats?from=&to= — counts by service and level",
      "GET /health — status and ingestion counters",
      "POST /admin/retention — run retention immediately",
      "CLI: logagg --retention-days 30 --port 8080"
    ],
    "fileStructure": "log-aggregation/\n  cmd/server/main.go\n  internal/\n    ingest/ingest.go\n    parse/parse.go\n    store/store.go\n    query/query.go\n    retention/retention.go\n  tests/\n    ingest_test.go\n    parse_test.go\n    query_test.go\n  README.md",
    "taskBreakdown": [
      "Design the schema and indexes",
      "Implement the log parser for JSON and plain text",
      "Build batch ingestion with per-entry validation",
      "Implement search with filters and pagination",
      "Add statistics endpoints",
      "Add the retention policy and daily job",
      "Build a log generator for load testing",
      "Test throughput and search latency"
    ],
    "milestones": [
      {
        "id": "proj-log-aggregation-m1",
        "order": 1,
        "title": "Schema, parser and ingestion",
        "objectives": ["Create the schema and indexes", "Parse JSON and plain-text logs", "Ingest batches"],
        "instructions": "Create the logs table with indexes on timestamp, service and level. Implement the parser for JSON entries and for plain-text lines in the format timestamp level service message. Build the ingest endpoint that accepts a batch, validates each entry, inserts the valid ones in a transaction, and returns counts of accepted and rejected entries.",
        "concepts": ["Log formats", "Parsing", "Batch inserts", "Indexes"],
        "hints": ["Reject entries missing a timestamp or message, but keep the rest.", "Use one transaction per batch for speed.", "Normalise level to uppercase."],
        "acceptanceCriteria": ["A batch of mixed valid and invalid entries ingests the valid ones", "The response reports accepted and rejected counts", "Plain-text lines parse correctly"],
        "tests": ["Ingest a JSON batch", "Ingest plain-text lines", "Ingest a batch with one bad entry"]
      },
      {
        "id": "proj-log-aggregation-m2",
        "order": 2,
        "title": "Search and statistics",
        "objectives": ["Search by text, service and level", "Filter by time range", "Return counts by service and level"],
        "instructions": "Implement the search endpoint with query parameters for text, service, level, time range and pagination, building the SQL query from only the parameters supplied. Add the stats endpoint that returns counts grouped by service and by level over a time range. Verify search over a generated set of 100,000 logs returns in under 500 ms.",
        "concepts": ["Query building", "Full-text search", "Aggregation"],
        "hints": ["Use LIKE or a SQLite FTS table for text search.", "Always apply a limit so a query cannot return everything.", "Index the columns you filter on."],
        "acceptanceCriteria": ["Search by text finds matching logs", "Combining filters narrows results correctly", "Search over 100,000 logs is under 500 ms"],
        "tests": ["Search by service and level", "Search by a time range", "Time a search over 100,000 logs"]
      },
      {
        "id": "proj-log-aggregation-m3",
        "order": 3,
        "title": "Retention and stats",
        "objectives": ["Delete logs older than the retention age", "Run retention daily", "Expose ingestion statistics"],
        "instructions": "Implement retention as a function that deletes logs older than the configured number of days and records how many rows it removed. Run it in a background goroutine once a day and expose a manual trigger endpoint. Add ingestion counters to the health endpoint showing total received, accepted and rejected entries.",
        "concepts": ["Retention policies", "Background jobs", "Counters"],
        "hints": ["Delete in batches so a large retention run does not lock the database.", "Record each retention run in its own table.", "Retention age comes from configuration."],
        "acceptanceCriteria": ["Old logs are deleted by retention", "Recent logs are kept", "The health endpoint shows ingestion counters"],
        "tests": ["Insert old logs and run retention", "Check recent logs survive", "Trigger retention manually"]
      },
      {
        "id": "proj-log-aggregation-m4",
        "order": 4,
        "title": "Load testing and polish",
        "objectives": ["Generate realistic log traffic", "Measure ingestion throughput", "Document the API"],
        "instructions": "Write a log generator that produces realistic entries from several fake services at a configurable rate. Measure ingestion throughput and search latency, tune the batch size and indexes if needed, and finish the README with the ingest format, query parameters and retention configuration.",
        "concepts": ["Load testing", "Throughput", "Performance tuning"],
        "hints": ["Test with concurrent senders, not just one.", "Watch for SQLite lock contention under concurrency.", "Document the plain-text format with examples."],
        "acceptanceCriteria": ["Ingestion sustains 1,000 entries per second", "Search stays under 500 ms at 100,000 logs", "The README documents every endpoint"],
        "tests": ["Run the generator at 1,000 entries per second", "Search while ingesting", "Read the README and follow it"]
      }
    ],
    "reviewChecklist": [
      "Malformed entries never fail a batch",
      "Search results respect all supplied filters",
      "Retention deletes only logs older than the configured age",
      "Ingestion throughput meets the target",
      "Accepted logs survive a restart"
    ],
    "finalAssessment": [
      "Ingest a mixed batch and show the accepted and rejected counts",
      "Search by service, level and time range",
      "Show per-service statistics",
      "Run retention and show old logs removed",
      "Show the load test results"
    ]
  },
  {
    "id": "proj-payment-api",
    "slug": "payment-api",
    "level": 3,
    "title": "Payment Processing API",
    "description": "Build a payment processing API in Python that handles charges, refunds, idempotency keys, webhooks and a double-entry ledger, then reconciles the ledger against the recorded charges. Money is always integer cents, every state change is an explicit ledger entry, and a retried request with the same idempotency key returns the original result instead of charging twice.",
    "skills": ["Python", "Payment APIs", "Idempotency", "Double-entry ledger", "Webhooks", "Reconciliation", "SQLite", "Testing"],
    "language": "python",
    "functionalRequirements": [
      "Create a charge for a customer with an amount and currency",
      "Support idempotency keys so a retried charge is never double-charged",
      "Refund a charge fully or partially, never more than the remaining amount",
      "Record every money movement as a double-entry ledger entry",
      "Deliver webhook events for charge succeeded, refunded and failed, with retries",
      "List charges, refunds and ledger entries with pagination",
      "Reconcile the ledger: the sum of entries must equal the expected balances",
      "Support test card numbers that deterministically succeed or decline"
    ],
    "nonFunctionalRequirements": [
      "All money is stored as integer cents",
      "A charge is never created twice for one idempotency key",
      "The ledger always balances: debits equal credits per transaction",
      "Webhook delivery retries with backoff up to 5 attempts",
      "No real card data is ever stored or logged"
    ],
    "architecture": "The API is a Python HTTP service with a service layer for charges and refunds and a ledger module that writes balanced debit and credit entries for every movement. Charges and their idempotency keys are created in a single transaction: the key is stored first, so a retry finds the original charge and returns it. Refunds check the remaining refundable amount before writing. Webhook events are stored in an outbox table and delivered by a background worker with exponential backoff, and a reconciliation job compares ledger totals with charge totals daily.",
    "databaseSchema": "customers: id INTEGER PK, email TEXT UNIQUE, name TEXT; charges: id INTEGER PK, customer_id INTEGER FK, amount_cents INTEGER, currency TEXT, status TEXT, idempotency_key TEXT UNIQUE, created_at TEXT; refunds: id INTEGER PK, charge_id INTEGER FK, amount_cents INTEGER, status TEXT, created_at TEXT; ledger_entries: id INTEGER PK, transaction_id TEXT, account TEXT, debit_cents INTEGER, credit_cents INTEGER, created_at TEXT; webhook_events: id INTEGER PK, type TEXT, payload TEXT, url TEXT, status TEXT, attempts INTEGER, next_attempt_at TEXT",
    "apis": [
      "POST /api/charges — body {customer_id, amount_cents, currency, idempotency_key, card} returns the charge",
      "GET /api/charges/{id}",
      "GET /api/charges?customer_id=&status=&page=",
      "POST /api/charges/{id}/refunds — body {amount_cents} for full or partial refund",
      "GET /api/charges/{id}/refunds",
      "GET /api/ledger?account=&from=&to=",
      "POST /api/webhooks/register — register a webhook URL",
      "POST /api/admin/reconcile — run reconciliation and return discrepancies"
    ],
    "fileStructure": "payment-api/\n  app/\n    __init__.py\n    main.py\n    db.py\n    money.py\n    ledger.py\n    charges.py\n    refunds.py\n    webhooks.py\n    reconcile.py\n  tests/\n    test_charges.py\n    test_refunds.py\n    test_ledger.py\n    test_webhooks.py\n  README.md",
    "taskBreakdown": [
      "Design the schema and money helpers",
      "Implement charges with idempotency keys",
      "Implement the double-entry ledger",
      "Implement refunds with remaining-amount checks",
      "Add the webhook outbox and delivery worker",
      "Build the reconciliation job",
      "Add test card behaviours for success and decline",
      "Write the test suite and document the API"
    ],
    "milestones": [
      {
        "id": "proj-payment-api-m1",
        "order": 1,
        "title": "Charges and idempotency",
        "objectives": ["Create charges", "Enforce idempotency keys", "Simulate card declines"],
        "instructions": "Implement charge creation with amount in integer cents, currency and an idempotency key stored with a unique constraint. Creating a charge with a key that already exists returns the original charge with the same status instead of creating a new one. Add test card numbers: one that always succeeds and one that always declines, and record the resulting status.",
        "concepts": ["Idempotency keys", "Unique constraints", "Test doubles"],
        "hints": ["Store the key and the charge in one transaction.", "Return the original response, including its id, on a retry.", "Never store the full card number, only the last four digits."],
        "acceptanceCriteria": ["Two charges with the same key create one charge", "A declined test card returns a failed charge", "Amounts are stored as integer cents"],
        "tests": ["Charge twice with the same key", "Charge with the decline card", "Charge with a negative amount"]
      },
      {
        "id": "proj-payment-api-m2",
        "order": 2,
        "title": "Double-entry ledger",
        "objectives": ["Write balanced ledger entries", "Record every charge and refund", "Query the ledger by account"],
        "instructions": "Implement the ledger module: every charge writes a debit to the customer receivable account and a credit to the revenue account for the same amount, and every refund writes the reverse. Each pair shares a transaction id, and the module refuses to write an unbalanced pair. Add the ledger query endpoint with account and date filters.",
        "concepts": ["Double-entry bookkeeping", "Debits and credits", "Atomic writes"],
        "hints": ["Write both entries in the same transaction as the charge.", "The sum of debits must equal the sum of credits for each transaction id.", "Use account names like revenue, receivable and refunds."],
        "acceptanceCriteria": ["Every charge has two balanced ledger entries", "The ledger balances overall", "Ledger entries can be filtered by account"],
        "tests": ["Create a charge and inspect its ledger entries", "Sum debits and credits across the ledger", "Query the ledger by account"]
      },
      {
        "id": "proj-payment-api-m3",
        "order": 3,
        "title": "Refunds",
        "objectives": ["Refund fully and partially", "Prevent over-refunding", "Reverse ledger entries on refund"],
        "instructions": "Implement refunds against a charge: the refund amount must be positive and no more than the charge amount minus refunds already made. A refund writes the reverse ledger entries and updates the charge status to refunded or partially_refunded. Refunding a failed charge is an error.",
        "concepts": ["Partial refunds", "Remaining balance", "Reversals"],
        "hints": ["Compute the remaining refundable amount from the database at request time.", "Do the check and the insert in one transaction.", "A full refund changes the charge status to refunded."],
        "acceptanceCriteria": ["A partial refund leaves the charge partially_refunded", "Refunding more than the remaining amount fails", "Refunding a failed charge fails"],
        "tests": ["Refund half a charge", "Refund the remainder", "Try to refund more than the charge"]
      },
      {
        "id": "proj-payment-api-m4",
        "order": 4,
        "title": "Webhooks and reconciliation",
        "objectives": ["Deliver webhook events with retries", "Reconcile the ledger", "Document the API"],
        "instructions": "Implement the webhook outbox: charge and refund events are stored with their payload and target URL, and a worker delivers them with exponential backoff for up to 5 attempts, marking each as delivered or failed. Add the reconciliation job that compares the sum of successful charges minus refunds with the ledger balances and reports any discrepancy. Test with a local webhook receiver that fails the first two attempts.",
        "concepts": ["Outbox pattern", "Retry with backoff", "Reconciliation"],
        "hints": ["Store the event before attempting delivery.", "Backoff delays: 1, 2, 4, 8 and 16 seconds.", "Reconciliation should report zero discrepancies on a healthy system."],
        "acceptanceCriteria": ["A webhook is delivered after transient failures", "Reconciliation reports no discrepancies", "A permanently failing webhook is marked failed after 5 attempts"],
        "tests": ["Register a webhook and create a charge", "Fail delivery twice then succeed", "Run reconciliation and inspect the report"]
      }
    ],
    "reviewChecklist": [
      "Idempotency keys prevent double charges",
      "The ledger balances for every transaction",
      "Refunds can never exceed the remaining amount",
      "Webhooks retry with backoff",
      "No card data beyond the last four digits is stored"
    ],
    "finalAssessment": [
      "Charge the same idempotency key twice and show one charge",
      "Refund a charge partially, then fully",
      "Show the balanced ledger entries for both",
      "Trigger a webhook and show its delivery attempts",
      "Run reconciliation and show zero discrepancies"
    ]
  },
  {
    "id": "proj-video-streaming-backend",
    "slug": "video-streaming-backend",
    "level": 3,
    "title": "Video Streaming Backend",
    "description": "Build a video streaming backend in Go: upload videos with metadata, serve them with HTTP range requests so players can seek, keep a transcoding job queue with a stub worker, and organise videos into playlists. Uploads are validated, thumbnails are generated as placeholders, and playback works in a plain HTML video element.",
    "skills": ["Go", "HTTP range requests", "File uploads", "SQLite", "Job queues", "Metadata", "Playlists", "Testing"],
    "language": "go",
    "functionalRequirements": [
      "Upload a video file with title, description and tags, with a size limit",
      "Store metadata in SQLite and the file on disk with a content hash",
      "Stream video with HTTP range requests so seeking works",
      "Queue a transcoding job per upload and track its status",
      "Generate a thumbnail placeholder per video",
      "Create playlists and add or remove videos with ordering",
      "List and search videos by title and tag",
      "Delete a video and remove its file, thumbnail and jobs"
    ],
    "nonFunctionalRequirements": [
      "Range requests return 206 with the correct byte range",
      "Uploads larger than the limit are rejected before storage",
      "The same file uploaded twice is stored once, by content hash",
      "Transcoding status is always visible and never stuck silently",
      "Playback works in a standard HTML video element"
    ],
    "architecture": "The service is a Go HTTP server with multipart upload handling that streams the file to disk while computing its hash, a metadata store in SQLite, and a job queue table polled by a background worker. The worker runs the transcoding stub, which copies the file to a processed location and marks the job done, and is structured so a real transcoder can replace the stub later. Streaming uses Go's built-in range support, and playlists are a join table with an explicit position.",
    "databaseSchema": "videos: id INTEGER PK, title TEXT, description TEXT, tags TEXT, file_hash TEXT UNIQUE, file_path TEXT, size_bytes INTEGER, duration_seconds INTEGER, status TEXT, created_at TEXT; transcode_jobs: id INTEGER PK, video_id INTEGER FK, status TEXT, created_at TEXT, finished_at TEXT; playlists: id INTEGER PK, name TEXT, created_at TEXT; playlist_items: playlist_id INTEGER FK, video_id INTEGER FK, position INTEGER, PK(playlist_id, video_id)",
    "apis": [
      "POST /api/videos — multipart upload with title, description, tags",
      "GET /api/videos?search=&tag=&page=",
      "GET /api/videos/{id}",
      "GET /api/videos/{id}/stream — range-request streaming, 206 responses",
      "GET /api/videos/{id}/thumbnail",
      "DELETE /api/videos/{id}",
      "GET /api/videos/{id}/jobs — transcoding job status",
      "POST /api/playlists, GET /api/playlists, GET /api/playlists/{id}",
      "POST /api/playlists/{id}/items, DELETE /api/playlists/{id}/items/{videoId}"
    ],
    "fileStructure": "video-streaming/\n  cmd/server/main.go\n  internal/\n    store/store.go\n    upload/upload.go\n    stream/stream.go\n    transcode/worker.go\n    playlists/playlists.go\n  web/\n    index.html\n    player.html\n  storage/\n    uploads/\n    processed/\n    thumbnails/\n  go.mod\n  README.md",
    "taskBreakdown": [
      "Design the schema and storage layout",
      "Implement multipart uploads with hashing and size limits",
      "Implement range-request streaming",
      "Build the transcoding job queue and worker stub",
      "Add thumbnails and video listing",
      "Implement playlists with ordering",
      "Build the player page",
      "Test seeking, duplicates and deletion"
    ],
    "milestones": [
      {
        "id": "proj-video-streaming-backend-m1",
        "order": 1,
        "title": "Uploads and metadata",
        "objectives": ["Accept multipart uploads", "Hash and deduplicate files", "Store metadata"],
        "instructions": "Implement the upload endpoint with a 500 MB size limit, streaming the file to disk while computing its SHA-256 hash. If a file with the same hash already exists, reuse the stored file and return the existing video. Store the title, description, tags, size and hash in SQLite and return the video record.",
        "concepts": ["Multipart uploads", "Content hashing", "Streaming writes"],
        "hints": ["Stream the upload; never load the whole file into memory.", "Enforce the size limit while reading, not after.", "Store files by hash so duplicates share storage."],
        "acceptanceCriteria": ["An upload returns a video record", "Uploading the same file twice stores one file", "An oversized upload is rejected"],
        "tests": ["Upload a small test video", "Upload the same file twice", "Upload a file over the limit"]
      },
      {
        "id": "proj-video-streaming-backend-m2",
        "order": 2,
        "title": "Range-request streaming",
        "objectives": ["Serve 206 partial content", "Support seeking", "Play in a browser video element"],
        "instructions": "Implement the stream endpoint using Go's http.ServeContent so Range headers are honoured with 206 responses, correct Content-Range headers and Accept-Ranges. Build a player page with a video element pointing at the stream endpoint, and verify seeking to the middle of the video works in the browser and with curl range requests.",
        "concepts": ["HTTP range requests", "Partial content", "ServeContent"],
        "hints": ["ServeContent handles ranges for you if you give it the file and its size.", "Test with curl -r to request a byte range.", "The Content-Type must match the video format."],
        "acceptanceCriteria": ["A range request returns 206 with the right bytes", "A full request returns 200", "Seeking works in the browser player"],
        "tests": ["curl a byte range and check the headers", "Request the full file", "Seek in the player page"]
      },
      {
        "id": "proj-video-streaming-backend-m3",
        "order": 3,
        "title": "Transcoding jobs and thumbnails",
        "objectives": ["Queue a job per upload", "Track job status", "Generate thumbnails"],
        "instructions": "Create a transcode job in the pending state for every upload, and a background worker that picks up pending jobs, runs the transcoding stub, and marks them done or failed with an error message. Generate a thumbnail placeholder per video at upload time and serve it from its own endpoint. Expose the job status so the client can poll until processing finishes.",
        "concepts": ["Job queues", "Background workers", "Polling"],
        "hints": ["Claim a job by updating its status atomically so two workers never take it.", "The stub copies the file to the processed folder and sleeps briefly to simulate work.", "A failed job must record its error."],
        "acceptanceCriteria": ["Every upload creates a pending job", "The worker marks jobs done", "A thumbnail is served for each video"],
        "tests": ["Upload and poll the job until done", "Check the processed file exists", "Fetch the thumbnail"]
      },
      {
        "id": "proj-video-streaming-backend-m4",
        "order": 4,
        "title": "Playlists, search and deletion",
        "objectives": ["Manage playlists with ordering", "Search videos", "Delete cleanly"],
        "instructions": "Implement playlists with an ordered join table, supporting adding, removing and reordering videos. Add listing with search by title and filtering by tag. Implement deletion that removes the database rows, the stored file when no other video references it, the thumbnail and any jobs. Build the browse page and verify the full flow from upload to playlist playback.",
        "concepts": ["Ordered relations", "Search", "Cleanup"],
        "hints": ["Reordering is a position update, like the task board pattern.", "Only delete the stored file when its reference count drops to zero.", "Return the playlist with its videos in order."],
        "acceptanceCriteria": ["Playlists preserve video order", "Search finds videos by title and tag", "Deleting a video removes its files and jobs"],
        "tests": ["Create a playlist and reorder its videos", "Search by tag", "Delete a video and check the disk"]
      }
    ],
    "reviewChecklist": [
      "Range requests return correct 206 responses",
      "Duplicate uploads share one stored file",
      "Transcoding jobs always reach a terminal state",
      "Playlists preserve order",
      "Deletion cleans up files, thumbnails and jobs"
    ],
    "finalAssessment": [
      "Upload a video and show its metadata",
      "Seek in the player and show the range request",
      "Poll the transcoding job to done",
      "Build a playlist and play it in order",
      "Delete a video and show the cleanup"
    ]
  },
  {
    "id": "proj-social-feed-service",
    "slug": "social-feed-service",
    "level": 3,
    "title": "Social Media Feed Service",
    "description": "Build a social feed service in Rust: users post short messages, follow each other, and read a timeline built by fan-out on write. Likes and notifications are first-class, feeds are paginated with cursors, and the service stays fast because each user's timeline is materialised when a post is created rather than assembled on every read.",
    "skills": ["Rust", "Fan-out timelines", "SQLite", "REST APIs", "Pagination", "Notifications", "Concurrency", "Testing"],
    "language": "rust",
    "functionalRequirements": [
      "Register users and create posts up to 500 characters",
      "Follow and unfollow users",
      "Build each follower timeline by fan-out when a post is created",
      "Read a timeline paginated with cursor-based pagination",
      "Like and unlike posts, with counts that cannot double-count",
      "Notify users when someone follows them or likes their post",
      "Show a user profile with their posts and follower counts",
      "Delete a post and remove it from every timeline"
    ],
    "nonFunctionalRequirements": [
      "Timeline reads are a single indexed query",
      "A post appears in followers timelines within 100 ms",
      "Liking the same post twice does not change the count",
      "Timeline pagination never skips or repeats posts",
      "The service handles 1,000 follows per user"
    ],
    "architecture": "The service is a Rust HTTP server with SQLite. Posting writes the post, then fans out one timeline row per follower inside the same transaction, so the timeline table is the read model and reads are a single indexed query ordered by creation time. Likes are a table with a unique constraint on user and post, so double likes are impossible. Notifications are rows created alongside follows and likes, and cursor pagination uses the timeline row id as the cursor.",
    "databaseSchema": "users: id INTEGER PK, username TEXT UNIQUE, display_name TEXT, bio TEXT, created_at TEXT; posts: id INTEGER PK, author_id INTEGER FK, body TEXT, created_at TEXT; follows: follower_id INTEGER FK, followee_id INTEGER FK, created_at TEXT, PK(follower_id, followee_id); timeline: id INTEGER PK, user_id INTEGER FK, post_id INTEGER FK, created_at TEXT; likes: user_id INTEGER FK, post_id INTEGER FK, created_at TEXT, PK(user_id, post_id); notifications: id INTEGER PK, user_id INTEGER FK, actor_id INTEGER FK, type TEXT, post_id INTEGER FK, read INTEGER, created_at TEXT",
    "apis": [
      "POST /api/auth/register, POST /api/auth/login",
      "POST /api/posts, DELETE /api/posts/{id}",
      "GET /api/users/{username} — profile with posts and counts",
      "POST /api/users/{username}/follow, DELETE /api/users/{username}/follow",
      "GET /api/timeline?cursor=&limit=20",
      "POST /api/posts/{id}/like, DELETE /api/posts/{id}/like",
      "GET /api/notifications, POST /api/notifications/{id}/read",
      "GET /api/users/{username}/posts"
    ],
    "fileStructure": "social-feed/\n  src/\n    main.rs\n    db.rs\n    auth.rs\n    posts.rs\n    follows.rs\n    timeline.rs\n    likes.rs\n    notifications.rs\n  tests/\n    api_tests.rs\n  Cargo.toml\n  README.md",
    "taskBreakdown": [
      "Design the schema and the fan-out model",
      "Implement auth and user profiles",
      "Implement posting with fan-out",
      "Implement follows with backfill",
      "Add likes and notifications",
      "Add cursor-paginated timeline reads",
      "Add post deletion with timeline cleanup",
      "Test fan-out correctness and performance"
    ],
    "milestones": [
      {
        "id": "proj-social-feed-service-m1",
        "order": 1,
        "title": "Users, profiles and posts",
        "objectives": ["Register users", "Create posts", "Show profiles with counts"],
        "instructions": "Implement registration and login with hashed passwords, and post creation limited to 500 characters. Build the profile endpoint returning the user's posts, follower count and following count. Seed users and posts to work with.",
        "concepts": ["Rust HTTP servers", "Authentication", "Profiles"],
        "hints": ["Validate post length on the server.", "Counts come from the follows table, not a stored counter.", "Return posts newest first."],
        "acceptanceCriteria": ["Users can register and post", "Profiles show correct counts", "A 501-character post is rejected"],
        "tests": ["Register and post", "Fetch a profile", "Post over the limit"]
      },
      {
        "id": "proj-social-feed-service-m2",
        "order": 2,
        "title": "Follows and fan-out timeline",
        "objectives": ["Follow and unfollow", "Fan out posts to followers", "Read a timeline"],
        "instructions": "Implement follow and unfollow. When a post is created, insert one timeline row per follower inside the same transaction as the post. When a user follows someone, backfill their timeline with that person's recent posts. Build the timeline endpoint returning the caller's timeline newest first.",
        "concepts": ["Fan-out on write", "Backfill", "Timeline as a read model"],
        "hints": ["Fan-out and the post insert share one transaction.", "Backfill only the last 100 posts to keep follows fast.", "Your own posts appear in your own timeline too."],
        "acceptanceCriteria": ["A post appears in every follower timeline", "Following backfills recent posts", "Unfollowing stops new posts appearing"],
        "tests": ["Post and check three followers timelines", "Follow a user with old posts", "Unfollow then post"]
      },
      {
        "id": "proj-social-feed-service-m3",
        "order": 3,
        "title": "Likes, notifications and pagination",
        "objectives": ["Like without double counting", "Notify on follows and likes", "Paginate with cursors"],
        "instructions": "Implement likes with a unique constraint on user and post so a second like is a no-op. Create a notification for the post author on a like and for the followed user on a follow. Add cursor pagination to the timeline using the timeline row id, and verify that paging through a long timeline returns every post exactly once.",
        "concepts": ["Unique constraints", "Notifications", "Cursor pagination"],
        "hints": ["Use INSERT OR IGNORE for likes.", "Notifications are rows, not messages.", "The cursor is the last row id seen, not a page number."],
        "acceptanceCriteria": ["Liking twice keeps the count at one", "Notifications appear for likes and follows", "Paging a 50-post timeline returns all 50 exactly once"],
        "tests": ["Like the same post twice", "Check notifications after a like and a follow", "Page through a long timeline"]
      },
      {
        "id": "proj-social-feed-service-m4",
        "order": 4,
        "title": "Deletion and performance",
        "objectives": ["Delete posts everywhere", "Handle high-follower fan-out", "Document the API"],
        "instructions": "Implement post deletion that removes the post, its timeline rows and its likes in one transaction, and only allows the author to delete. Test fan-out with a user who has 1,000 followers and measure post latency, then finish the README with the fan-out design, the pagination contract and API examples.",
        "concepts": ["Cascading deletes", "Fan-out cost", "Documentation"],
        "hints": ["Delete timeline rows by post id.", "Measure the p95 latency of posting to 1,000 followers.", "Foreign keys with cascade can help, but do it explicitly in the transaction."],
        "acceptanceCriteria": ["Deleting a post removes it from all timelines", "A non-author cannot delete a post", "Posting to 1,000 followers completes in under 100 ms"],
        "tests": ["Delete a post and check followers timelines", "Try deleting someone else's post", "Time a post with 1,000 followers"]
      }
    ],
    "reviewChecklist": [
      "Fan-out and the post share one transaction",
      "Timeline reads are a single indexed query",
      "Likes cannot double-count",
      "Cursor pagination never skips or repeats",
      "Deletion removes the post from every timeline"
    ],
    "finalAssessment": [
      "Post and show it in followers timelines",
      "Follow a user and show the backfill",
      "Like a post twice and show the count stays at one",
      "Page through a long timeline without gaps",
      "Delete a post and show it gone everywhere"
    ]
  },
  {
    "id": "proj-hotel-booking",
    "slug": "hotel-booking",
    "level": 3,
    "title": "Hotel Booking System",
    "description": "Build a hotel booking system in TypeScript: browse rooms with an availability calendar, create reservations that hold a room for a date range, pay through a payment stub, and cancel under a policy that refunds according to how far ahead the cancellation happens. Double bookings are impossible because availability is checked and held inside a single transaction.",
    "skills": ["TypeScript", "Node.js", "Express", "React", "SQLite", "Availability calendars", "Reservations", "Payments", "Testing"],
    "language": "typescript",
    "functionalRequirements": [
      "List hotels and rooms with type, capacity, price and amenities",
      "Show an availability calendar for a room over a date range",
      "Search for rooms available for given dates and guest count",
      "Create a reservation that holds the room for the chosen dates",
      "Charge through a payment stub and confirm the reservation on success",
      "Cancel a reservation with a refund based on the cancellation policy",
      "Let guests view and manage their reservations",
      "Provide an admin view of all reservations and occupancy"
    ],
    "nonFunctionalRequirements": [
      "The same room can never be double-booked for overlapping dates",
      "Availability checks and reservations run in one transaction",
      "Prices are computed server-side from nightly rates",
      "Cancellations follow the published policy exactly",
      "Search over a month returns in under 300 ms"
    ],
    "architecture": "The backend is an Express and TypeScript API over SQLite with a reservations table carrying room, guest, check-in, check-out and status. Availability is computed by querying for reservations whose date ranges overlap the requested range, and booking inserts the reservation inside a transaction that re-checks overlap, so concurrent bookings cannot both succeed. The payment stub simulates success or decline by card number, and cancellation computes the refund from the policy: full refund more than 7 days ahead, half within 7 days, none within 24 hours.",
    "databaseSchema": "hotels: id INTEGER PK, name TEXT, city TEXT, description TEXT; rooms: id INTEGER PK, hotel_id INTEGER FK, type TEXT, capacity INTEGER, price_cents INTEGER, amenities TEXT; reservations: id INTEGER PK, room_id INTEGER FK, guest_id INTEGER FK, check_in TEXT, check_out TEXT, guests INTEGER, total_cents INTEGER, status TEXT, created_at TEXT; payments: id INTEGER PK, reservation_id INTEGER FK, amount_cents INTEGER, status TEXT, created_at TEXT; users: id INTEGER PK, email TEXT UNIQUE, password_hash TEXT, role TEXT",
    "apis": [
      "GET /api/hotels, GET /api/hotels/{id}",
      "GET /api/hotels/{id}/rooms",
      "GET /api/rooms/{id}/availability?from=&to=",
      "GET /api/search?city=&from=&to=&guests=",
      "POST /api/reservations — body {room_id, check_in, check_out, guests}",
      "POST /api/reservations/{id}/pay — payment stub",
      "POST /api/reservations/{id}/cancel",
      "GET /api/reservations — the caller's reservations",
      "GET /api/admin/reservations, GET /api/admin/occupancy"
    ],
    "fileStructure": "hotel-booking/\n  server/\n    src/\n      index.ts\n      db.ts\n      availability.ts\n      pricing.ts\n      payments.ts\n      routes/\n        hotels.ts\n        reservations.ts\n        admin.ts\n  client/\n    src/\n      App.tsx\n      pages/\n        Search.tsx\n        HotelDetail.tsx\n        Booking.tsx\n        MyReservations.tsx\n        Admin.tsx\n  package.json\n  README.md",
    "taskBreakdown": [
      "Design the schema and seed hotels and rooms",
      "Implement availability and search",
      "Build the booking flow with overlap checks",
      "Add the payment stub and confirmation",
      "Implement cancellation with the refund policy",
      "Add guest reservation management",
      "Build the admin occupancy view",
      "Test concurrent bookings and the refund policy"
    ],
    "milestones": [
      {
        "id": "proj-hotel-booking-m1",
        "order": 1,
        "title": "Hotels, rooms and availability",
        "objectives": ["Seed hotels and rooms", "Compute availability for a date range", "Search available rooms"],
        "instructions": "Create the schema and seed two hotels with several rooms each, with types, capacities and nightly prices in cents. Implement the availability function that returns false when any confirmed reservation overlaps the requested range, and the search endpoint that filters by city, dates and guest count. Build the search page that shows available rooms with total prices.",
        "concepts": ["Date-range overlap", "Availability", "Search"],
        "hints": ["Two ranges overlap when start A is before end B and end A is after start B.", "Check-out day is not an occupied night.", "Compute totals as nights times nightly price."],
        "acceptanceCriteria": ["Search returns only rooms free for the whole range", "A room with an overlapping booking is excluded", "Total price equals nights times nightly rate"],
        "tests": ["Search with no bookings", "Create a booking and search the same dates", "Search a range touching the check-out day"]
      },
      {
        "id": "proj-hotel-booking-m2",
        "order": 2,
        "title": "Reservations and payment",
        "objectives": ["Create reservations atomically", "Charge through the payment stub", "Confirm on payment success"],
        "instructions": "Implement reservation creation inside a transaction that re-checks availability before inserting, so two simultaneous requests for the same room and dates cannot both succeed. The reservation starts as pending; the payment stub charges the total and on success marks it confirmed, while a decline cancels the hold. Build the booking page with date pickers and a payment form.",
        "concepts": ["Transactions", "Race conditions", "Payment stubs"],
        "hints": ["The transaction is the only correct guard against double booking.", "Use a test card that declines to exercise the failure path.", "Store the total at booking time so later price changes do not affect it."],
        "acceptanceCriteria": ["Two concurrent bookings for the same dates produce one confirmed reservation", "A declined payment cancels the hold", "Confirmed reservations appear in the guest list"],
        "tests": ["Book the same room twice concurrently", "Pay with the decline card", "Pay with the success card"]
      },
      {
        "id": "proj-hotel-booking-m3",
        "order": 3,
        "title": "Cancellation and refunds",
        "objectives": ["Cancel reservations", "Apply the refund policy", "Free the room after cancellation"],
        "instructions": "Implement cancellation with the policy: more than 7 days before check-in refunds the full amount, 1 to 7 days refunds half, and under 24 hours refunds nothing. Record the refund as a payment row with a negative amount and set the reservation status to cancelled. Verify the room becomes available again for the same dates after cancellation.",
        "concepts": ["Cancellation policy", "Refunds", "State transitions"],
        "hints": ["Compute the refund from the check-in date and the current time.", "Only confirmed reservations can be cancelled.", "A cancelled reservation must not block availability."],
        "acceptanceCriteria": ["Cancelling 10 days ahead refunds in full", "Cancelling 3 days ahead refunds half", "Cancelling within 24 hours refunds nothing"],
        "tests": ["Cancel at each policy boundary", "Search the cancelled dates after cancelling", "Cancel an already-cancelled reservation"]
      },
      {
        "id": "proj-hotel-booking-m4",
        "order": 4,
        "title": "Guest pages, admin and polish",
        "objectives": ["Show guest reservations", "Build the admin occupancy view", "Cover the flow with tests"],
        "instructions": "Build the guest reservations page with cancel buttons and refund amounts, and the admin view listing all reservations with an occupancy rate per hotel for a chosen month. Write tests for overlap logic, concurrent booking, the refund policy and the payment stub, and finish the README with the booking flow and the cancellation policy.",
        "concepts": ["Occupancy", "Admin views", "Testing"],
        "hints": ["Occupancy is booked room-nights divided by available room-nights.", "Test the refund boundaries with fixed dates.", "Show the policy on the booking page so guests can see it."],
        "acceptanceCriteria": ["Guests see their reservations with status", "Admin sees occupancy per hotel", "All tests pass"],
        "tests": ["Check occupancy for a month with bookings", "Cancel and verify the refund shown", "Run the full test suite"]
      }
    ],
    "reviewChecklist": [
      "Overlapping bookings are impossible, including concurrent ones",
      "Totals are computed server-side",
      "The refund policy is applied exactly at its boundaries",
      "Cancelled rooms become available again",
      "Declined payments cancel the hold"
    ],
    "finalAssessment": [
      "Search for rooms and book one",
      "Attempt a double booking for the same dates",
      "Pay with a declining card and show the hold released",
      "Cancel at two different times and compare refunds",
      "Show the admin occupancy view"
    ]
  },
  {
    "id": "proj-weather-dashboard",
    "slug": "weather-dashboard",
    "level": 2,
    "title": "Weather Data Dashboard",
    "description": "Build a weather dashboard in TypeScript that fetches current conditions and forecasts from a public weather API, caches responses to stay within rate limits, and renders charts, multi-city comparisons and configurable alerts. When the API is unavailable the dashboard shows the last cached data with a clear stale warning instead of failing.",
    "skills": ["TypeScript", "Node.js", "Express", "React", "HTTP clients", "Caching", "Charts", "API integration"],
    "language": "typescript",
    "functionalRequirements": [
      "Fetch current weather and a 7-day forecast for a city from a public API",
      "Cache API responses for 10 minutes to respect rate limits",
      "Track multiple saved cities and compare them side by side",
      "Render temperature charts and precipitation bars for the forecast",
      "Let users set alerts such as temperature below freezing or rain probability above 70 percent",
      "Evaluate alerts on each refresh and show active alerts prominently",
      "Show a stale-data warning when serving cached data after an API failure",
      "Support searching for a city by name"
    ],
    "nonFunctionalRequirements": [
      "No more than one API call per city per 10 minutes",
      "The dashboard loads cached data in under 500 ms",
      "An API failure never produces a blank page",
      "Alert checks run on every data refresh",
      "API keys are read from environment variables, never committed"
    ],
    "architecture": "The backend is a small Express service with a weather client that calls the public API, a cache layer keyed by city with a 10-minute TTL backed by SQLite, and an alert engine that evaluates each saved rule against fresh or cached data. The frontend is a React dashboard with a city selector, current conditions, forecast charts drawn with a charting library, a comparison table and an alerts panel. On an API failure the backend returns the cached row with a stale flag.",
    "databaseSchema": "cities: id INTEGER PK, name TEXT UNIQUE, country TEXT, latitude REAL, longitude REAL; weather_cache: city_id INTEGER PK, payload TEXT, fetched_at TEXT; alerts: id INTEGER PK, city_id INTEGER FK, type TEXT, threshold REAL, active INTEGER, created_at TEXT; alert_events: id INTEGER PK, alert_id INTEGER FK, message TEXT, created_at TEXT",
    "apis": [
      "GET /api/weather/{city} — current and forecast, cached",
      "GET /api/weather/{city}/forecast",
      "GET /api/cities, POST /api/cities, DELETE /api/cities/{id}",
      "GET /api/compare?cities=a,b,c — side-by-side current conditions",
      "GET /api/alerts, POST /api/alerts, DELETE /api/alerts/{id}",
      "GET /api/alerts/active",
      "GET /api/search?q= — city search"
    ],
    "fileStructure": "weather-dashboard/\n  server/\n    src/\n      index.ts\n      weatherClient.ts\n      cache.ts\n      alerts.ts\n      routes/\n        weather.ts\n        cities.ts\n        alerts.ts\n  client/\n    src/\n      App.tsx\n      api.ts\n      components/\n        CurrentWeather.tsx\n        ForecastChart.tsx\n        CityCompare.tsx\n        AlertsPanel.tsx\n  package.json\n  .env.example\n  README.md",
    "taskBreakdown": [
      "Set up the project and the weather API client",
      "Implement the cache with TTL and stale fallback",
      "Build the current weather and forecast endpoints",
      "Add saved cities and comparison",
      "Build the dashboard UI with charts",
      "Implement alerts and alert events",
      "Add city search",
      "Test caching, stale fallback and alerts"
    ],
    "milestones": [
      {
        "id": "proj-weather-dashboard-m1",
        "order": 1,
        "title": "Weather client and cache",
        "objectives": ["Call the public weather API", "Cache responses for 10 minutes", "Return stale data on failure"],
        "instructions": "Register for a free key at a public weather API and build the client that fetches current conditions and a 7-day forecast by city. Add the cache table: a fresh request within 10 minutes returns the cached payload without calling the API, and an API failure returns the cached payload with a stale flag. Log every API call so you can prove the rate limit is respected.",
        "concepts": ["API clients", "Caching", "TTL", "Graceful degradation"],
        "hints": ["Read the API key from an environment variable.", "Store the fetched timestamp with every cached row.", "Use the API's geocoding endpoint for city search."],
        "acceptanceCriteria": ["Two requests within 10 minutes make one API call", "An API failure returns cached data marked stale", "The API key is not in the repository"],
        "tests": ["Fetch the same city twice and count API calls", "Simulate an API failure", "Fetch after the TTL expires"]
      },
      {
        "id": "proj-weather-dashboard-m2",
        "order": 2,
        "title": "Cities and dashboard UI",
        "objectives": ["Save and manage cities", "Render current conditions", "Compare cities side by side"],
        "instructions": "Implement saved cities with add and remove, and the comparison endpoint that returns current conditions for several cities in one response. Build the dashboard with a city selector, a current conditions card showing temperature, feels-like, humidity, wind and conditions, and a comparison table for saved cities.",
        "concepts": ["React state", "Data fetching", "Comparison views"],
        "hints": ["Fetch comparison data in one request, not one per city.", "Show a loading state while fetching.", "Sort the comparison table by temperature by default."],
        "acceptanceCriteria": ["Cities can be saved and removed", "The dashboard shows current conditions", "Comparison shows several cities at once"],
        "tests": ["Save three cities and compare them", "Remove a city", "Load the dashboard with no saved cities"]
      },
      {
        "id": "proj-weather-dashboard-m3",
        "order": 3,
        "title": "Forecast charts",
        "objectives": ["Render a 7-day forecast", "Chart temperature and precipitation", "Handle missing data gracefully"],
        "instructions": "Add the forecast endpoint and a chart component showing daily high and low temperatures as a line chart and precipitation probability as bars. Handle days with missing data by leaving gaps rather than inventing values, and show the forecast source and fetch time under the chart.",
        "concepts": ["Charts", "Time series", "Missing data"],
        "hints": ["Use a small charting library rather than drawing by hand.", "Label axes with units.", "Keep the chart readable on a narrow screen."],
        "acceptanceCriteria": ["The 7-day forecast renders as a chart", "Temperature and precipitation are both shown", "Missing days show gaps, not zeroes"],
        "tests": ["Load the forecast for a city", "Check the chart data matches the API", "Render with a day missing"]
      },
      {
        "id": "proj-weather-dashboard-m4",
        "order": 4,
        "title": "Alerts and polish",
        "objectives": ["Create alert rules", "Evaluate alerts on refresh", "Show active alerts"],
        "instructions": "Implement alert rules such as temperature below a threshold or rain probability above a threshold, evaluated whenever fresh or cached weather is loaded. Active alerts appear in a prominent panel and are recorded as alert events with a timestamp. Test by creating an alert that is already true for a saved city, and finish the README with setup, the API key instructions and the caching policy.",
        "concepts": ["Alert rules", "Thresholds", "Event history"],
        "hints": ["Evaluate alerts after every fetch, including cached ones.", "Deduplicate alert events so the same condition does not spam.", "Show the rule and the current value in the alert."],
        "acceptanceCriteria": ["An alert triggers when its condition is true", "Active alerts are listed prominently", "The same condition does not create duplicate events"],
        "tests": ["Create a freezing alert for a cold city", "Create a rain alert", "Refresh twice and count alert events"]
      }
    ],
    "reviewChecklist": [
      "API calls respect the 10-minute cache",
      "Stale data is clearly labelled on failure",
      "Charts show real forecast data",
      "Alerts evaluate on every refresh",
      "The API key is never committed"
    ],
    "finalAssessment": [
      "Fetch a city twice and prove only one API call happened",
      "Show the comparison of three cities",
      "Show the 7-day forecast chart",
      "Create an alert and show it triggering",
      "Simulate an API failure and show the stale warning"
    ]
  },
  {
    "id": "proj-iot-platform",
    "slug": "iot-platform",
    "level": 4,
    "title": "IoT Device Management Platform",
    "description": "Build an IoT device management platform in C++: a registry of devices with firmware versions, high-volume telemetry ingestion, remote commands with acknowledgement tracking, firmware rollout management, and alert rules that fire when a device stops reporting or a reading crosses a threshold. The platform is designed for thousands of devices and proves it with a simulated fleet.",
    "skills": ["C++", "IoT", "Telemetry ingestion", "SQLite", "REST APIs", "Firmware management", "Alerting", "Concurrency"],
    "language": "cpp",
    "functionalRequirements": [
      "Register devices with a unique id, type, location and firmware version",
      "Authenticate devices with a per-device token",
      "Ingest telemetry readings over HTTP at high volume",
      "Send commands to a device and track pending, acknowledged and failed states",
      "Manage firmware versions and roll out an update to a group of devices",
      "Raise alerts when a device is silent for more than a threshold or a reading exceeds a limit",
      "Show per-device history, last-seen time and current firmware",
      "Provide a dashboard with fleet health: online count, alert count and firmware distribution"
    ],
    "nonFunctionalRequirements": [
      "Ingestion handles 5,000 readings per second",
      "Telemetry is stored durably before the response is sent",
      "A device token never grants access to another device",
      "Commands are delivered at most once per acknowledgement cycle",
      "The dashboard loads fleet aggregates in under 500 ms"
    ],
    "architecture": "The platform is a C++ HTTP server using a small embedded HTTP layer, with SQLite for the registry, telemetry and commands, and a thread pool for ingestion so slow clients cannot block the server. Telemetry is written in batches inside transactions. Commands are rows with a state machine: pending, delivered, acknowledged or failed, and devices poll for pending commands. Firmware rollouts are a rollout record targeting a device group, with per-device rollout state tracked separately so a partial rollout is visible. A background checker scans for silent devices and threshold breaches and writes alerts.",
    "databaseSchema": "devices: id TEXT PK, type TEXT, location TEXT, firmware_version TEXT, token_hash TEXT, last_seen TEXT, created_at TEXT; telemetry: id INTEGER PK, device_id TEXT FK, metric TEXT, value REAL, recorded_at TEXT; commands: id INTEGER PK, device_id TEXT FK, command TEXT, payload TEXT, status TEXT, created_at TEXT, acked_at TEXT; firmware: version TEXT PK, notes TEXT, released_at TEXT; rollouts: id INTEGER PK, firmware_version TEXT FK, group_filter TEXT, status TEXT, created_at TEXT; rollout_devices: rollout_id INTEGER FK, device_id TEXT FK, status TEXT, PK(rollout_id, device_id); alerts: id INTEGER PK, device_id TEXT FK, type TEXT, message TEXT, created_at TEXT, resolved INTEGER",
    "apis": [
      "POST /api/devices — register a device, returns its token once",
      "GET /api/devices, GET /api/devices/{id}",
      "POST /api/devices/{id}/telemetry — device token auth, batch readings",
      "GET /api/devices/{id}/commands — device polls for pending commands",
      "POST /api/devices/{id}/commands — send a command",
      "POST /api/devices/{id}/commands/{cmdId}/ack — device acknowledges",
      "POST /api/firmware, GET /api/firmware",
      "POST /api/rollouts — start a firmware rollout to a group",
      "GET /api/alerts, GET /api/dashboard"
    ],
    "fileStructure": "iot-platform/\n  src/\n    main.cpp\n    server.cpp\n    server.h\n    db.cpp\n    db.h\n    auth.cpp\n    telemetry.cpp\n    commands.cpp\n    firmware.cpp\n    alerts.cpp\n  simulator/\n    fleet_sim.cpp\n  tests/\n    test_telemetry.cpp\n    test_commands.cpp\n  CMakeLists.txt\n  README.md",
    "taskBreakdown": [
      "Design the schema and the device token scheme",
      "Build the HTTP server and device registration",
      "Implement batched telemetry ingestion",
      "Implement the command queue with acknowledgements",
      "Add firmware versions and rollouts",
      "Add alert rules for silent devices and thresholds",
      "Build the fleet simulator and dashboard",
      "Load-test ingestion with the simulated fleet"
    ],
    "milestones": [
      {
        "id": "proj-iot-platform-m1",
        "order": 1,
        "title": "Device registry and auth",
        "objectives": ["Register devices", "Issue per-device tokens", "Authenticate device requests"],
        "instructions": "Implement device registration that generates a random token, stores only its hash, and returns the plain token once to the caller. Every device endpoint requires the token in a header and rejects tokens belonging to another device. Build the device list and detail endpoints showing firmware version and last-seen time.",
        "concepts": ["Device identity", "Token hashing", "Per-device auth"],
        "hints": ["Hash tokens like passwords; never store them plain.", "The token is shown once at registration and never again.", "Return 401 for a missing or wrong token."],
        "acceptanceCriteria": ["Registration returns a token once", "A device cannot use another device's token", "Device detail shows firmware and last seen"],
        "tests": ["Register a device and use its token", "Use device A's token as device B", "Register two devices with the same id"]
      },
      {
        "id": "proj-iot-platform-m2",
        "order": 2,
        "title": "Telemetry ingestion",
        "objectives": ["Ingest batched readings", "Store durably before responding", "Query per-device history"],
        "instructions": "Implement the telemetry endpoint accepting a batch of readings with metric names, values and timestamps, validating each one and inserting the valid batch in a single transaction. Update the device last-seen time on every accepted batch. Add the history endpoint returning readings for a device over a time range, and test ingestion with a simulator sending batches from 100 devices.",
        "concepts": ["Batch ingestion", "Transactions", "Time-series data"],
        "hints": ["Validate the whole batch before inserting any of it.", "Use a thread pool so ingestion scales.", "Index telemetry by device and time."],
        "acceptanceCriteria": ["Batches ingest and are queryable by time range", "Invalid readings are rejected without losing valid ones", "Last-seen updates on ingestion"],
        "tests": ["Ingest a batch of 100 readings", "Ingest a batch with one bad reading", "Query history for a time range"]
      },
      {
        "id": "proj-iot-platform-m3",
        "order": 3,
        "title": "Commands and firmware rollouts",
        "objectives": ["Queue commands for devices", "Track acknowledgements", "Roll out firmware to a group"],
        "instructions": "Implement commands with a state machine: pending, delivered when the device polls and receives it, acknowledged when the device reports back, and failed after a timeout. Add firmware versions and rollouts that target devices by type or location, creating per-device rollout rows so progress is visible. Devices report their new firmware version after applying an update.",
        "concepts": ["Command state machines", "Polling", "Staged rollouts"],
        "hints": ["Devices poll for commands; the server does not push.", "A command that is never acknowledged must eventually fail.", "Roll out to a small group first, then the rest."],
        "acceptanceCriteria": ["A command moves from pending to acknowledged", "An unacknowledged command eventually fails", "A rollout shows per-device status"],
        "tests": ["Send a command and poll it as the device", "Acknowledge it and check the status", "Start a rollout to 10 devices"]
      },
      {
        "id": "proj-iot-platform-m4",
        "order": 4,
        "title": "Alerts, dashboard and load test",
        "objectives": ["Alert on silent devices", "Alert on threshold breaches", "Build the fleet dashboard"],
        "instructions": "Add a background checker that runs every minute: devices silent for more than 5 minutes raise an alert, and readings above a configured threshold raise an alert with the value. Build the dashboard endpoint with online count, alert count and firmware distribution. Run the fleet simulator with 1,000 devices, measure ingestion throughput, and finish the README with the architecture and the rollout procedure.",
        "concepts": ["Alerting", "Fleet health", "Load testing"],
        "hints": ["Do not create duplicate alerts for a device that is already alerting.", "Aggregate counts in SQL, not in application code.", "The simulator should vary readings so thresholds trigger."],
        "acceptanceCriteria": ["A silent device raises an alert within 6 minutes", "A threshold breach raises an alert with the value", "The dashboard loads in under 500 ms with 1,000 devices"],
        "tests": ["Stop a simulated device and watch for its alert", "Send a reading over the threshold", "Run the 1,000-device load test"]
      }
    ],
    "reviewChecklist": [
      "Device tokens are hashed and scoped per device",
      "Telemetry is durable before the response",
      "Commands always reach a terminal state",
      "Rollouts show per-device progress",
      "Alerts do not duplicate for an ongoing condition"
    ],
    "finalAssessment": [
      "Register devices and ingest telemetry from the simulator",
      "Send a command and watch it acknowledge",
      "Roll out firmware to a device group",
      "Stop a device and show its silent alert",
      "Show the dashboard and the load test numbers"
    ]
  },
  {
    "id": "proj-sensor-firmware",
    "slug": "sensor-firmware",
    "level": 3,
    "title": "Embedded Sensor Firmware",
    "description": "Write C firmware for a temperature sensor node: read the sensor over I2C, calibrate the raw values, log readings over UART, sleep in a low-power mode between readings, and recover from faults with a watchdog timer. The firmware is developed and tested on the host with a hardware abstraction layer, so every behaviour is verifiable without the physical board.",
    "skills": ["C", "Embedded systems", "I2C", "UART", "Sensor calibration", "Low-power design", "Watchdog timers", "Hardware abstraction"],
    "language": "c",
    "functionalRequirements": [
      "Read temperature from a sensor over I2C",
      "Calibrate raw readings with an offset and scale stored in flash",
      "Log readings over UART in a fixed text format",
      "Sample every 10 seconds and sleep in low-power mode between samples",
      "Blink an LED pattern for normal operation, error and calibration modes",
      "Reset via the watchdog timer if the main loop stalls",
      "Support a UART command to request an immediate reading",
      "Store the last 100 readings in a ring buffer for later retrieval"
    ],
    "nonFunctionalRequirements": [
      "Average current draw is under 100 microamps in sleep",
      "A failed sensor read is retried twice, then reported as an error",
      "The watchdog resets the device within 2 seconds of a stall",
      "All hardware access goes through the abstraction layer",
      "The firmware builds with -Wall -Werror and no warnings"
    ],
    "architecture": "The firmware is structured around a hardware abstraction layer: hal_i2c, hal_uart, hal_sleep and hal_watchdog provide the hardware interface, and a host implementation of the same layer lets the code run and be tested on a normal computer. The application is a small state machine with states for sampling, logging, sleeping and error handling. Calibration applies a linear correction to raw values, readings go into a ring buffer, and the watchdog is fed at the top of every loop iteration so a stall triggers a reset.",
    "databaseSchema": "",
    "apis": [
      "UART log line: TEMP <celsius> <raw> <timestamp>",
      "UART command: READ — return an immediate reading",
      "UART command: CAL <offset> <scale> — set calibration",
      "UART command: DUMP — print the ring buffer contents",
      "HAL: hal_i2c_read, hal_uart_write, hal_sleep_ms, hal_watchdog_feed, hal_led_set"
    ],
    "fileStructure": "sensor-firmware/\n  src/\n    main.c\n    sensor.c\n    sensor.h\n    calibration.c\n    calibration.h\n    ring_buffer.c\n    ring_buffer.h\n    state_machine.c\n    state_machine.h\n  hal/\n    hal.h\n    hal_host.c\n    hal_target.c\n  tests/\n    test_sensor.c\n    test_calibration.c\n    test_ring_buffer.c\n  Makefile\n  README.md",
    "taskBreakdown": [
      "Define the HAL and the host implementation",
      "Implement the ring buffer and calibration",
      "Implement the I2C sensor driver with retries",
      "Build the UART logging and commands",
      "Implement the sampling state machine",
      "Add low-power sleep between samples",
      "Add the watchdog timer",
      "Test on the host and document the hardware setup"
    ],
    "milestones": [
      {
        "id": "proj-sensor-firmware-m1",
        "order": 1,
        "title": "HAL and host test harness",
        "objectives": ["Define the HAL interface", "Build a host HAL for testing", "Write the first test"],
        "instructions": "Define the HAL header with functions for I2C, UART, sleep, watchdog and LED control. Implement a host version that simulates the sensor with configurable values, prints UART output to stdout, and records sleep calls. Write a test that drives the sensor module through the host HAL and confirms a reading is returned.",
        "concepts": ["Hardware abstraction layers", "Host testing", "Interfaces"],
        "hints": ["The application code must never call hardware registers directly.", "The host HAL lets you test without a board.", "Keep the HAL functions small and single-purpose."],
        "acceptanceCriteria": ["The firmware builds and runs on the host", "The host HAL simulates sensor values", "A test passes through the HAL"],
        "tests": ["Run the firmware on the host", "Set a simulated temperature and read it", "Check sleep is called between samples"]
      },
      {
        "id": "proj-sensor-firmware-m2",
        "order": 2,
        "title": "Sensor driver and calibration",
        "objectives": ["Read the sensor over I2C", "Retry failed reads", "Apply calibration"],
        "instructions": "Implement the sensor driver: start a conversion, wait, read the raw value over I2C, and retry up to twice on failure before reporting an error. Implement calibration as a linear correction, calibrated equals raw times scale plus offset, with values stored in a struct that can be updated over UART. Test with raw values and known calibration constants.",
        "concepts": ["I2C", "Retries", "Linear calibration"],
        "hints": ["Always check the I2C return code.", "Clamp the calibrated value to the sensor range.", "Store calibration in non-volatile memory on the target."],
        "acceptanceCriteria": ["A valid read returns a calibrated temperature", "Three failed reads report an error", "Calibration constants change the output correctly"],
        "tests": ["Read with a known raw value", "Simulate I2C failures", "Change calibration and read again"]
      },
      {
        "id": "proj-sensor-firmware-m3",
        "order": 3,
        "title": "UART logging, commands and ring buffer",
        "objectives": ["Log readings over UART", "Support UART commands", "Store readings in a ring buffer"],
        "instructions": "Implement the ring buffer holding the last 100 readings with timestamps, overwriting the oldest when full. Log each reading over UART in the fixed format, and implement the READ, CAL and DUMP commands: READ returns an immediate reading, CAL sets the calibration, and DUMP prints the buffer. Test the commands through the host HAL.",
        "concepts": ["Ring buffers", "UART protocols", "Command parsing"],
        "hints": ["A ring buffer needs head and tail indices and a count.", "Parse commands with a small state machine, not sscanf alone.", "Log lines must have a fixed format for parsing."],
        "acceptanceCriteria": ["Readings are logged in the fixed format", "READ returns an immediate reading", "DUMP prints the buffered readings"],
        "tests": ["Fill the buffer past 100 entries", "Send the READ command", "Send CAL and verify the next reading"]
      },
      {
        "id": "proj-sensor-firmware-m4",
        "order": 4,
        "title": "Sleep, watchdog and polish",
        "objectives": ["Sleep between samples", "Feed the watchdog in the loop", "Reset on a stall"],
        "instructions": "Implement the sampling state machine: sample, log, then sleep for 10 seconds in low-power mode, waking on a timer. Feed the watchdog at the top of each loop iteration and configure it to reset the device if it is not fed within 2 seconds. Add a test that stalls the loop and confirms the watchdog fires, and document the hardware wiring and the power budget in the README.",
        "concepts": ["Low-power sleep", "Watchdog timers", "State machines"],
        "hints": ["Feed the watchdog only in the main loop, never in an interrupt.", "Sleep should stop the CPU, not busy-wait.", "Record the sleep duration in the host HAL for testing."],
        "acceptanceCriteria": ["The device sleeps between samples", "A stalled loop triggers a watchdog reset", "The firmware builds with -Wall -Werror and no warnings"],
        "tests": ["Measure simulated sleep between samples", "Stall the loop and watch the watchdog", "Build with -Wall -Werror"]
      }
    ],
    "reviewChecklist": [
      "All hardware access goes through the HAL",
      "Failed reads are retried and then reported",
      "The ring buffer keeps the last 100 readings",
      "The watchdog is fed only in the main loop",
      "The build has no warnings under -Wall -Werror"
    ],
    "finalAssessment": [
      "Run the firmware on the host and show UART logs",
      "Change the calibration and show the corrected reading",
      "Send READ and DUMP commands",
      "Show the device sleeping between samples",
      "Stall the loop and show the watchdog reset"
    ]
  },
  {
    "id": "proj-query-engine",
    "slug": "query-engine",
    "level": 4,
    "title": "Database Query Engine",
    "description": "Build a small database query engine in Rust: parse a subset of SQL, execute it against in-memory tables, support joins and indexes, and explain each query with its execution plan. The engine handles SELECT with WHERE, ORDER BY and LIMIT, two join types, and shows how an index changes a full scan into a lookup.",
    "skills": ["Rust", "SQL parsing", "Query execution", "B-trees", "Indexes", "Query plans", "Testing", "Data structures"],
    "language": "rust",
    "functionalRequirements": [
      "Parse SELECT, FROM, WHERE, ORDER BY and LIMIT for a SQL subset",
      "Support equality, comparison and AND and OR predicates",
      "Execute queries against in-memory tables loaded from CSV",
      "Support inner joins and left joins on equality keys",
      "Build a hash index on a column and use it for equality lookups",
      "Explain a query with its plan: scan, index lookup, join method and row estimates",
      "Return results as a table with column names",
      "Reject invalid SQL with a clear parse error and position"
    ],
    "nonFunctionalRequirements": [
      "An indexed equality lookup on 100,000 rows returns in under 5 ms",
      "A full scan of 100,000 rows completes in under 100 ms",
      "Parse errors name the unexpected token and its position",
      "The engine uses no external crates for parsing or storage",
      "Every query plan is explainable before execution"
    ],
    "architecture": "The engine is a pipeline: a lexer turns SQL text into tokens, a recursive descent parser builds an abstract syntax tree, a planner converts the tree into a plan of scan, filter, join and sort nodes and chooses an index lookup when an equality predicate matches an available index, and an executor runs the plan with iterators over rows. Tables are columnar vectors of typed values loaded from CSV, and indexes are hash maps from a column value to row positions.",
    "databaseSchema": "",
    "apis": [
      "REPL: engine> SELECT name FROM users WHERE age > 30 ORDER BY name LIMIT 10;",
      "REPL: EXPLAIN SELECT ... — print the query plan",
      "REPL: LOAD users FROM users.csv; — load a table",
      "REPL: CREATE INDEX ON users(email); — build a hash index",
      "REPL: SHOW TABLES; SHOW INDEXES;",
      "SQL subset: SELECT columns | * FROM table [JOIN table ON a = b] [WHERE predicate] [ORDER BY column] [LIMIT n]"
    ],
    "fileStructure": "query-engine/\n  src/\n    main.rs\n    lexer.rs\n    parser.rs\n    ast.rs\n    planner.rs\n    executor.rs\n    table.rs\n    index.rs\n  data/\n    users.csv\n    orders.csv\n  tests/\n    lexer_tests.rs\n    parser_tests.rs\n    executor_tests.rs\n  Cargo.toml\n  README.md",
    "taskBreakdown": [
      "Design the value and row types and the table store",
      "Build the lexer for the SQL subset",
      "Build the parser and AST",
      "Implement the executor for scans, filters and sorting",
      "Implement joins",
      "Implement hash indexes and the planner",
      "Add EXPLAIN and the REPL",
      "Benchmark scans versus index lookups"
    ],
    "milestones": [
      {
        "id": "proj-query-engine-m1",
        "order": 1,
        "title": "Tables, lexer and values",
        "objectives": ["Load CSV tables", "Tokenize SQL", "Represent typed values"],
        "instructions": "Implement the table store with typed columns for integers, floats and strings, loaded from CSV files with a header row. Write the lexer that turns SQL text into tokens for keywords, identifiers, numbers, strings, operators and punctuation, and reports an error with the position of an unexpected character.",
        "concepts": ["Lexing", "Tokens", "Typed values", "CSV loading"],
        "hints": ["Keywords are case-insensitive; normalise them to uppercase.", "Keep the token position for error messages.", "Infer column types from the first data row."],
        "acceptanceCriteria": ["CSV files load into tables with correct types", "SQL tokenizes into the expected tokens", "An illegal character reports its position"],
        "tests": ["Load users.csv and count rows", "Tokenize a SELECT statement", "Tokenize SQL with a bad character"]
      },
      {
        "id": "proj-query-engine-m2",
        "order": 2,
        "title": "Parser and executor",
        "objectives": ["Parse SELECT queries", "Execute scans and filters", "Support ORDER BY and LIMIT"],
        "instructions": "Write a recursive descent parser that builds an AST for SELECT with an optional WHERE, ORDER BY and LIMIT, and rejects anything outside the subset with a clear error. Implement the executor: a scan node yields rows, a filter node applies predicates with comparison operators and AND and OR, and sort and limit nodes shape the output. Wire up the REPL to run a query and print a table.",
        "concepts": ["Recursive descent parsing", "Abstract syntax trees", "Iterators"],
        "hints": ["Parse WHERE with proper precedence: AND binds tighter than OR.", "Evaluate predicates row by row.", "Print results with aligned columns."],
        "acceptanceCriteria": ["SELECT with WHERE returns the right rows", "ORDER BY and LIMIT work together", "Invalid SQL reports the unexpected token"],
        "tests": ["Run a filtered SELECT", "Run ORDER BY with LIMIT", "Parse invalid SQL and check the error"]
      },
      {
        "id": "proj-query-engine-m3",
        "order": 3,
        "title": "Joins",
        "objectives": ["Implement inner joins", "Implement left joins", "Join on equality keys"],
        "instructions": "Add JOIN support to the parser and executor: an inner join returns only matching row pairs, and a left join returns every left row with nulls for unmatched right columns. Implement joins as a nested loop first, then add a hash join that builds a map on the right side. Test with users joined to orders and check the row counts match a hand-computed result.",
        "concepts": ["Inner joins", "Left joins", "Nested loop join", "Hash join"],
        "hints": ["A hash join is much faster than a nested loop on large tables.", "Qualify column names with the table name when both sides share one.", "Left join nulls must print as NULL."],
        "acceptanceCriteria": ["Inner join returns only matching rows", "Left join keeps unmatched left rows with NULLs", "Hash join and nested loop join return identical results"],
        "tests": ["Join users to orders", "Left join a user with no orders", "Compare hash and nested loop results"]
      },
      {
        "id": "proj-query-engine-m4",
        "order": 4,
        "title": "Indexes, planner and EXPLAIN",
        "objectives": ["Build hash indexes", "Choose index lookups in the planner", "Explain every query"],
        "instructions": "Implement CREATE INDEX, which builds a hash map from a column value to the row positions that hold it. Extend the planner so an equality predicate on an indexed column produces an index lookup node instead of a full scan. Implement EXPLAIN to print the plan with node types and estimated rows, and benchmark an indexed lookup against a full scan on 100,000 rows.",
        "concepts": ["Hash indexes", "Query planning", "EXPLAIN"],
        "hints": ["The planner only uses an index for equality, not for ranges.", "Estimate rows for a scan as the table size.", "Rebuild the index when the table is reloaded."],
        "acceptanceCriteria": ["EXPLAIN shows an index lookup for an indexed equality query", "EXPLAIN shows a full scan without an index", "An indexed lookup on 100,000 rows is under 5 ms"],
        "tests": ["EXPLAIN a query before and after creating an index", "Time an indexed lookup", "Time a full scan"]
      },
      {
        "id": "proj-query-engine-m5",
        "order": 5,
        "title": "REPL polish and benchmarks",
        "objectives": ["Finish the REPL", "Document the SQL subset", "Publish benchmark numbers"],
        "instructions": "Finish the REPL with command history, SHOW TABLES and SHOW INDEXES, and friendly error messages that show the failing SQL with a caret under the bad token. Write the README documenting the exact SQL subset, the plan output format and the benchmark results comparing scans, nested loop joins, hash joins and index lookups.",
        "concepts": ["REPL design", "Error reporting", "Benchmarking"],
        "hints": ["Keep the REPL loop simple: read, parse, plan, execute, print.", "Show the caret position for parse errors.", "Benchmark with the same data for every method."],
        "acceptanceCriteria": ["The REPL runs queries interactively", "Parse errors show the caret position", "The README documents the subset and benchmarks"],
        "tests": ["Run a session through the REPL", "Trigger a parse error and check the caret", "Re-run the benchmarks"]
      }
    ],
    "reviewChecklist": [
      "The parser rejects SQL outside the subset with a position",
      "Joins return correct rows, including NULLs for left joins",
      "Index lookups are used only for equality on indexed columns",
      "EXPLAIN matches the plan actually executed",
      "Benchmarks show the index advantage on 100,000 rows"
    ],
    "finalAssessment": [
      "Run a filtered SELECT with ORDER BY and LIMIT",
      "Join users to orders and explain the plan",
      "Create an index and show EXPLAIN change",
      "Show the benchmark numbers for scan versus index lookup",
      "Trigger a parse error and show the caret"
    ]
  },
  {
    "id": "proj-search-engine-service",
    "slug": "search-engine-service",
    "level": 3,
    "title": "Search Engine Service",
    "description": "Build a search engine service in Go: index documents into an inverted index, rank results with TF-IDF, serve a search API with highlighting and suggestions, and support incremental updates and deletions. The engine is fast because it never scans documents at query time; it intersects posting lists and scores only the candidates.",
    "skills": ["Go", "Inverted indexes", "TF-IDF ranking", "Tokenization", "REST APIs", "SQLite", "Search suggestions", "Testing"],
    "language": "go",
    "functionalRequirements": [
      "Index documents with a title and body, tokenizing and normalising text",
      "Store an inverted index mapping terms to document ids and positions",
      "Search with AND semantics across terms, ranked by TF-IDF",
      "Highlight matching terms in result snippets",
      "Suggest completions for a partial query from indexed terms",
      "Support phrase search with quoted terms",
      "Update and delete documents, keeping the index consistent",
      "Return results paginated with total counts"
    ],
    "nonFunctionalRequirements": [
      "Search over 10,000 documents returns in under 100 ms",
      "Indexing 10,000 documents completes in under 10 seconds",
      "Deleted documents never appear in results",
      "Ranking is deterministic for the same index",
      "The index survives a restart"
    ],
    "architecture": "The service is a Go HTTP server with SQLite for document storage and the inverted index. Indexing tokenizes text to lowercase, removes stop words and stems lightly, then writes posting rows of term, document and positions in a transaction. Search tokenizes the query, fetches the posting lists, intersects them for AND semantics, scores candidates with TF-IDF using document frequencies from the index, and returns the top results with highlighted snippets built from the stored positions. Suggestions come from a terms table queried by prefix.",
    "databaseSchema": "documents: id INTEGER PK, title TEXT, body TEXT, created_at TEXT; terms: term TEXT PK, doc_freq INTEGER; postings: term TEXT, doc_id INTEGER FK, positions TEXT, tf INTEGER, PK(term, doc_id)",
    "apis": [
      "POST /api/documents — body {title, body} returns the document id",
      "PUT /api/documents/{id} — reindex a document",
      "DELETE /api/documents/{id}",
      "GET /api/documents/{id}",
      "GET /api/search?q=&page=&limit= — ranked results with snippets and highlights",
      "GET /api/suggest?q= — term completions",
      "GET /api/stats — document count, term count, index size",
      "POST /api/index/rebuild — rebuild the whole index from documents"
    ],
    "fileStructure": "search-engine/\n  cmd/server/main.go\n  internal/\n    tokenizer/tokenizer.go\n    index/index.go\n    rank/rank.go\n    search/search.go\n    store/store.go\n  data/\n    sample_docs.json\n  tests/\n    tokenizer_test.go\n    index_test.go\n    search_test.go\n  go.mod\n  README.md",
    "taskBreakdown": [
      "Design the schema for documents, terms and postings",
      "Implement the tokenizer with stop words",
      "Build indexing with posting lists",
      "Implement search with AND and TF-IDF ranking",
      "Add highlighting and snippets",
      "Add suggestions and phrase search",
      "Add update, delete and rebuild",
      "Benchmark indexing and search"
    ],
    "milestones": [
      {
        "id": "proj-search-engine-service-m1",
        "order": 1,
        "title": "Tokenizer and indexing",
        "objectives": ["Tokenize and normalise text", "Build the inverted index", "Load sample documents"],
        "instructions": "Implement the tokenizer: lowercase, split on non-letters, drop a small stop-word list, and record each term's positions in the document. Build the indexer that writes term, document and position rows in a transaction and updates document frequencies. Index a sample set of 100 documents and inspect the terms table.",
        "concepts": ["Tokenization", "Stop words", "Inverted index", "Posting lists"],
        "hints": ["Store positions so phrase search and highlighting work later.", "Update doc_freq when a term gains or loses a document.", "Keep the tokenizer identical for indexing and querying."],
        "acceptanceCriteria": ["Indexing 100 documents populates the terms table", "A term maps to the documents containing it", "Stop words are not indexed"],
        "tests": ["Tokenize a sentence and check the tokens", "Index a document and query its terms", "Index the sample set and count terms"]
      },
      {
        "id": "proj-search-engine-service-m2",
        "order": 2,
        "title": "Search and TF-IDF ranking",
        "objectives": ["Intersect posting lists", "Score with TF-IDF", "Return ranked results"],
        "instructions": "Implement search: tokenize the query the same way as indexing, fetch the posting list for each term, intersect them for AND semantics, and score each candidate with TF-IDF, where IDF comes from the document frequency and TF from the term count in the document. Return results ranked by score with the document title and a snippet, paginated with a total count.",
        "concepts": ["AND semantics", "TF-IDF", "Ranking"],
        "hints": ["Score is the sum over query terms of TF times IDF.", "Normalise by document length so long documents do not always win.", "Return the total count alongside the page."],
        "acceptanceCriteria": ["A query returns only documents containing every term", "Results are ranked with the best match first", "Pagination returns the right page and total"],
        "tests": ["Search for two terms and check the intersection", "Search for a rare term and check it ranks first", "Page through results"]
      },
      {
        "id": "proj-search-engine-service-m3",
        "order": 3,
        "title": "Highlighting, suggestions and phrases",
        "objectives": ["Highlight matches in snippets", "Suggest completions", "Support phrase search"],
        "instructions": "Build snippets from the stored term positions, showing the matching term in context with a marker around it. Add the suggest endpoint that returns terms starting with the typed prefix, ordered by document frequency. Add phrase search: a quoted query matches only documents where the terms appear consecutively, checked using the stored positions.",
        "concepts": ["Snippets", "Highlighting", "Prefix search", "Phrase search"],
        "hints": ["Use positions to find the terms in order for phrases.", "Snippets should be about 30 words around the first match.", "Suggestions come from the terms table, not from scanning documents."],
        "acceptanceCriteria": ["Snippets highlight the matched terms", "Suggestions return terms by prefix", "A phrase query matches only consecutive terms"],
        "tests": ["Search and inspect a snippet", "Suggest a prefix", "Search a phrase that appears split across a sentence"]
      },
      {
        "id": "proj-search-engine-service-m4",
        "order": 4,
        "title": "Updates, deletes and benchmarks",
        "objectives": ["Keep the index consistent on updates", "Never return deleted documents", "Benchmark at 10,000 documents"],
        "instructions": "Implement document update by deleting its old postings and reindexing, and deletion by removing its postings and decrementing document frequencies, all in a transaction. Add the rebuild endpoint that drops and rebuilds the index from the documents table. Index 10,000 generated documents, measure indexing time and search latency, and finish the README with the ranking formula and API examples.",
        "concepts": ["Index maintenance", "Transactions", "Benchmarking"],
        "hints": ["Update is delete plus insert, in one transaction.", "A deleted document must vanish from every posting list.", "Generate the large test set with a script."],
        "acceptanceCriteria": ["Updating a document changes its search results", "Deleted documents never appear in results", "Search over 10,000 documents is under 100 ms"],
        "tests": ["Update a document and search for old and new terms", "Delete a document and search for it", "Benchmark indexing and search at 10,000 documents"]
      }
    ],
    "reviewChecklist": [
      "The tokenizer is identical for indexing and querying",
      "Search uses posting lists, never a full document scan",
      "Ranking is deterministic for the same index",
      "Phrase search checks positions",
      "Deletes remove the document from every posting list"
    ],
    "finalAssessment": [
      "Index the sample documents and show the terms table",
      "Search for two terms and explain the ranking",
      "Show a highlighted snippet",
      "Search a phrase and a prefix suggestion",
      "Delete a document and prove it no longer appears"
    ]
  },
];
