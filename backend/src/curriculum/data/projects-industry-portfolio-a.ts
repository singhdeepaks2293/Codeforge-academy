import type { Project } from '../types.js';

export const PROJECTS_INDUSTRY: Project[] = [
  {
    "id": "proj-portfolio-csv-data-analyzer",
    "slug": "csv-data-analyzer",
    "level": 2,
    "title": "CSV Data Analyzer CLI",
    "description": "Build a command-line tool that reads a CSV file and produces a plain-English summary of the data: row counts, column types, missing values, and descriptive statistics for every numeric column. It answers the questions a data analyst asks first about any new dataset, writes the report as text and JSON, and flags data quality problems instead of crashing on them.",
    "skills": [
      "Python",
      "CSV processing",
      "CLI design",
      "Descriptive statistics",
      "Data quality",
      "JSON output",
      "argparse",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Read any CSV file and detect its delimiter and header row automatically",
      "Report row and column counts, column names and inferred types",
      "Compute count, mean, median, min, max and standard deviation for numeric columns",
      "Count missing values per column and list the distinct values of categorical columns",
      "Write the report to the terminal and to a JSON file",
      "Exit with a clear error for a missing file or an unreadable CSV",
      "Support a --column option to analyse one column in depth",
      "Handle files with at least 100,000 rows without running out of memory"
    ],
    "nonFunctionalRequirements": [
      "A single bad cell never crashes the whole analysis",
      "Statistics match a reference calculation to within rounding error",
      "The tool runs from the command line with no configuration file",
      "Every public function has a unit test"
    ],
    "architecture": "A single Python package with a thin CLI entry point: the CLI parses arguments, a reader module streams the CSV with the csv module, an analysis module infers types and computes statistics in one pass using running sums, and a report module renders the text and JSON output. Nothing is loaded fully into memory except per-column aggregates.",
    "databaseSchema": "",
    "fileStructure": "csv-data-analyzer/\n  analyzer/\n    __init__.py\n    __main__.py\n    cli.py\n    reader.py\n    stats.py\n    report.py\n  tests/\n    test_stats.py\n    test_reader.py\n    test_report.py\n  data/\n    sample.csv\n  README.md",
    "taskBreakdown": [
      "Set up the package layout and argument parsing",
      "Implement the CSV reader with delimiter detection",
      "Implement type inference and running statistics",
      "Build the text and JSON report writers",
      "Add the --column deep-dive option",
      "Write tests with a dirty sample dataset",
      "Document usage with examples in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-csv-data-analyzer-m1",
        "order": 1,
        "title": "Project setup and CSV reading",
        "objectives": [
          "Create the package layout",
          "Parse CLI arguments",
          "Read a CSV and report its shape"
        ],
        "instructions": "Create the package with a __main__.py entry point and argparse handling a file path, --column and --json. Implement the reader with csv.Sniffer to detect the delimiter and DictReader to yield rows. Run it on the sample file and print row count, column names and one row.",
        "concepts": [
          "argparse",
          "csv module",
          "Delimiter sniffing"
        ],
        "hints": [
          "csv.Sniffer needs a sample of the file; fall back to a comma when detection fails.",
          "Keep the reader streaming row by row, never read the whole file.",
          "Print the detected delimiter so the user can spot a wrong guess."
        ],
        "acceptanceCriteria": [
          "The tool prints the row and column counts of the sample file",
          "Column names match the CSV header",
          "A missing file prints an error and exits non-zero"
        ],
        "tests": [
          "Run on data/sample.csv and check the counts",
          "Run on a semicolon-delimited file",
          "Run with a path that does not exist"
        ]
      },
      {
        "id": "proj-portfolio-csv-data-analyzer-m2",
        "order": 2,
        "title": "Type inference and statistics",
        "objectives": [
          "Infer a type for every column",
          "Compute descriptive statistics",
          "Count missing values"
        ],
        "instructions": "Implement type inference by sampling values: integer, float, date-like or text. For numeric columns keep running count, sum, sum of squares, min and max so mean and standard deviation come from one pass, and collect values for the median only when the column is small enough. Count empty cells per column and report them.",
        "concepts": [
          "Type inference",
          "Running statistics",
          "Median and standard deviation"
        ],
        "hints": [
          "Derive variance from sum of squares, but guard against floating-point drift.",
          "Treat empty strings and the literal 'NA' as missing.",
          "Sample at most the first 1,000 rows for type inference."
        ],
        "acceptanceCriteria": [
          "Numeric columns report count, mean, median, min, max and standard deviation",
          "Missing values are counted per column",
          "A column of mixed text and numbers is classified as text"
        ],
        "tests": [
          "Analyse a file with a known mean and compare",
          "Analyse a file with empty cells and check the missing counts",
          "Analyse a column that is all text"
        ]
      },
      {
        "id": "proj-portfolio-csv-data-analyzer-m3",
        "order": 3,
        "title": "Reports: text and JSON",
        "objectives": [
          "Render a readable text report",
          "Write a matching JSON report",
          "Add the --column deep dive"
        ],
        "instructions": "Build the report module: the text report lists one section per column with its type, missing count and statistics or top values, and the JSON report contains the same data as structured objects. Implement --column to print a deeper view of one column, including its ten most common values and a simple text histogram.",
        "concepts": [
          "Report formatting",
          "JSON serialisation",
          "Histograms"
        ],
        "hints": [
          "Build the JSON report from the same data structure as the text report.",
          "Round statistics to two decimal places in text output only.",
          "The histogram buckets should be equal-width across min to max."
        ],
        "acceptanceCriteria": [
          "The text report has one section per column",
          "The JSON file parses and matches the text figures",
          "--column prints the top values and a histogram"
        ],
        "tests": [
          "Generate both reports for the sample file",
          "Load the JSON report and verify a statistic",
          "Run --column on a categorical column"
        ]
      },
      {
        "id": "proj-portfolio-csv-data-analyzer-m4",
        "order": 4,
        "title": "Robustness, tests and docs",
        "objectives": [
          "Handle dirty data gracefully",
          "Cover the code with tests",
          "Document the tool"
        ],
        "instructions": "Test with a dirty dataset: quoted commas, blank lines, ragged rows and a huge file. Make the reader skip blank lines, pad short rows with missing values and report ragged rows instead of failing. Write unit tests for the statistics, the reader and the report, and finish the README with installation, examples and sample output.",
        "concepts": [
          "Defensive parsing",
          "Unit testing",
          "Documentation"
        ],
        "hints": [
          "Count a ragged row as a data quality warning, not a crash.",
          "Generate the large test file with a script rather than checking it in.",
          "Test the statistics against hand-computed values."
        ],
        "acceptanceCriteria": [
          "A dirty file analyses without crashing and reports warnings",
          "All unit tests pass",
          "The README shows a full example run"
        ],
        "tests": [
          "Analyse the dirty dataset and check the warning count",
          "Run the test suite",
          "Time the analysis of a 100,000-row file"
        ]
      }
    ],
    "reviewChecklist": [
      "Statistics match hand-computed values",
      "Missing values are counted, never silently dropped",
      "Text and JSON reports agree with each other",
      "A dirty file produces warnings, not a crash",
      "The CLI exits non-zero with a clear message for a missing file"
    ],
    "finalAssessment": [
      "Analyse the sample dataset and explain each section of the report",
      "Show the JSON report for the same file",
      "Demonstrate the --column deep dive on a numeric and a categorical column",
      "Analyse a dirty file and point to the warnings",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: analyzer data.csv [--column NAME] [--json out.json]",
      "CLI: analyzer --help"
    ]
  },
  {
    "id": "proj-portfolio-personal-expense-cli",
    "slug": "personal-expense-cli",
    "level": 2,
    "title": "Personal Expense Tracker CLI",
    "description": "Build a command-line expense tracker that records spending in SQLite, categorises it, and prints monthly summaries and budget warnings. It is the kind of small, genuinely useful tool that belongs in every portfolio: persistent data, a clean CLI, validation, and reports a real person would actually use.",
    "skills": [
      "Python",
      "SQLite",
      "CLI design",
      "Data modelling",
      "Reporting",
      "Input validation",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Add an expense with amount, category, date and an optional note",
      "List expenses with filters by category, month and minimum amount",
      "Edit and delete expenses by id",
      "Show a monthly summary with totals per category",
      "Set a monthly budget per category and warn when spending passes 80 percent and 100 percent",
      "Export all expenses to CSV",
      "Store all data in a local SQLite database that survives restarts",
      "Reject negative amounts and unknown categories with a clear error"
    ],
    "nonFunctionalRequirements": [
      "Amounts are stored as integer cents to avoid float errors",
      "All commands respond in under 100 ms on 10,000 expenses",
      "Data is never lost when a command fails midway",
      "The database file location is configurable"
    ],
    "architecture": "A single package: the CLI parses subcommands (add, list, edit, delete, summary, budget, export) and calls a small service layer that validates input and talks to a repository module over SQLite. Money is stored as integer cents; dates are ISO strings. Summaries are SQL aggregate queries grouped by category and month.",
    "databaseSchema": "expenses: id INTEGER PK, amount_cents INTEGER, category TEXT, spent_on TEXT, note TEXT, created_at TEXT; budgets: category TEXT PK, monthly_cents INTEGER",
    "fileStructure": "expense-tracker/\n  expenses/\n    __init__.py\n    __main__.py\n    cli.py\n    db.py\n    service.py\n  tests/\n    test_service.py\n    test_cli.py\n  README.md",
    "taskBreakdown": [
      "Design the schema and set up SQLite",
      "Implement add, list, edit and delete",
      "Implement the monthly summary",
      "Add budgets and warnings",
      "Add CSV export",
      "Write tests and the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-personal-expense-cli-m1",
        "order": 1,
        "title": "Schema and adding expenses",
        "objectives": [
          "Create the SQLite schema",
          "Add expenses from the CLI",
          "List what was added"
        ],
        "instructions": "Create the database module that opens SQLite, enables foreign keys and creates the expenses and budgets tables. Implement the add command with validation: amount must be positive, category must be one of food, transport, housing, entertainment, health or other, and the date must be a valid YYYY-MM-DD. Implement list to show expenses newest first.",
        "concepts": [
          "SQLite",
          "Input validation",
          "Subcommands"
        ],
        "hints": [
          "Store money as integer cents: multiply the decimal amount by 100 and round.",
          "Validate before writing anything to the database.",
          "Print the new expense id so it can be edited later."
        ],
        "acceptanceCriteria": [
          "Adding a valid expense returns its id",
          "A negative amount is rejected",
          "List shows the added expense"
        ],
        "tests": [
          "Add three expenses and list them",
          "Add an expense with amount -5",
          "Add an expense with category 'unknown'"
        ]
      },
      {
        "id": "proj-portfolio-personal-expense-cli-m2",
        "order": 2,
        "title": "Editing, deleting and filtering",
        "objectives": [
          "Edit and delete by id",
          "Filter the list",
          "Handle missing ids"
        ],
        "instructions": "Implement edit to change any field of an existing expense and delete to remove one, both by id, returning a clear error for an unknown id. Add list filters for category, month and minimum amount, and confirm that deleting an expense removes it from later summaries.",
        "concepts": [
          "CRUD operations",
          "Query filters",
          "Error handling"
        ],
        "hints": [
          "Use parameterised SQL everywhere; never build queries with string formatting.",
          "Confirm the row exists before updating or deleting.",
          "Filters combine: category plus month must narrow the list."
        ],
        "acceptanceCriteria": [
          "Editing changes the stored amount",
          "Deleting removes the expense",
          "Filtering by month returns only that month"
        ],
        "tests": [
          "Edit an expense amount and list again",
          "Delete an expense and check the summary",
          "List with a category and month filter"
        ]
      },
      {
        "id": "proj-portfolio-personal-expense-cli-m3",
        "order": 3,
        "title": "Monthly summary and budgets",
        "objectives": [
          "Summarise spending by category and month",
          "Set monthly budgets",
          "Warn at 80 percent and 100 percent"
        ],
        "instructions": "Implement summary with a SQL GROUP BY over category for a given month, showing each category total, the month total and the share of spending. Implement budget set and a check that runs after every add: when a category passes 80 percent of its budget print a warning, and at 100 percent print a stronger one.",
        "concepts": [
          "SQL aggregation",
          "GROUP BY",
          "Budget logic"
        ],
        "hints": [
          "Compute the summary with one aggregate query, not in Python loops.",
          "Compare against the budget in cents to avoid float drift.",
          "The warning must appear right after the add that crosses the threshold."
        ],
        "acceptanceCriteria": [
          "The summary totals match the sum of listed expenses",
          "Crossing 80 percent prints a warning",
          "Crossing 100 percent prints an over-budget warning"
        ],
        "tests": [
          "Add expenses totalling 85 percent of a budget",
          "Add one more to cross 100 percent",
          "Run summary for a month with no expenses"
        ]
      },
      {
        "id": "proj-portfolio-personal-expense-cli-m4",
        "order": 4,
        "title": "Export, tests and polish",
        "objectives": [
          "Export expenses to CSV",
          "Cover the service with tests",
          "Document the tool"
        ],
        "instructions": "Implement export to write all expenses as CSV with a header row, ordered by date. Write tests for adding, editing, deleting, summaries, budgets and export using a temporary database file, and finish the README with example commands and sample output.",
        "concepts": [
          "CSV export",
          "Temporary test databases",
          "Documentation"
        ],
        "hints": [
          "Use a fresh temporary database per test so tests never interfere.",
          "Export in date order so the file is easy to read.",
          "Test the budget warning at exactly 80 percent."
        ],
        "acceptanceCriteria": [
          "Exported CSV contains every expense with a header",
          "All tests pass",
          "The README shows a full example session"
        ],
        "tests": [
          "Export and open the CSV",
          "Run the test suite",
          "Restart the tool and confirm data persisted"
        ]
      }
    ],
    "reviewChecklist": [
      "Amounts are stored as integer cents",
      "Unknown ids produce a clear error, not a crash",
      "Summary totals always match the listed expenses",
      "Budget warnings fire at the right thresholds",
      "Data survives a restart"
    ],
    "finalAssessment": [
      "Add expenses across two categories and two months",
      "Show the monthly summary and explain the totals",
      "Set a budget and trigger both warnings",
      "Export to CSV and open the file",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: expenses add --amount 12.50 --category food --date 2026-11-01 [--note TEXT]",
      "CLI: expenses list [--category X] [--month YYYY-MM] [--min-amount N]",
      "CLI: expenses summary [--month YYYY-MM]",
      "CLI: expenses budget set --category X --amount N",
      "CLI: expenses export --out expenses.csv"
    ]
  },
  {
    "id": "proj-portfolio-price-monitor-scraper",
    "slug": "price-monitor-scraper",
    "level": 2,
    "title": "Price Monitor Web Scraper",
    "description": "Build a polite web scraper that watches product pages for price changes: it fetches pages on a schedule, extracts the price with a configurable selector, stores every observation in SQLite, and alerts when a price drops below a target. It handles failures gracefully, respects robots.txt, and never hammers a site.",
    "skills": [
      "Python",
      "Web scraping",
      "HTTP requests",
      "HTML parsing",
      "SQLite",
      "Scheduling",
      "robots.txt",
      "Rate limiting",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Track a list of product URLs with a name and a target price",
      "Fetch each page with a descriptive user agent and a timeout",
      "Extract the price from the page using a configurable CSS-style selector",
      "Record every price observation with a timestamp in SQLite",
      "Alert on the terminal when a price falls at or below the target",
      "Show the price history of a product as a text table",
      "Respect robots.txt and wait at least 2 seconds between requests to the same host",
      "Keep working when one page fails: log the error and move on"
    ],
    "nonFunctionalRequirements": [
      "No host is requested more often than once every 2 seconds",
      "A failed fetch never stops the whole run",
      "Prices are stored as integer cents",
      "The scraper identifies itself with a real user agent"
    ],
    "architecture": "A small package: a tracker store in SQLite holds products and observations; a fetcher module uses urllib with timeouts and a robots.txt check; a parser module extracts prices with regular expressions over the HTML; a runner loops over products, sleeps between same-host requests, and records observations. Alerts are printed and appended to an alerts log file.",
    "databaseSchema": "products: id INTEGER PK, name TEXT, url TEXT UNIQUE, target_cents INTEGER, selector TEXT; observations: id INTEGER PK, product_id INTEGER FK, price_cents INTEGER, observed_at TEXT, status TEXT",
    "fileStructure": "price-monitor/\n  monitor/\n    __init__.py\n    __main__.py\n    cli.py\n    fetcher.py\n    parser.py\n    store.py\n    runner.py\n  tests/\n    test_parser.py\n    test_runner.py\n  products.yaml\n  README.md",
    "taskBreakdown": [
      "Design the schema and the product store",
      "Implement fetching with robots.txt and rate limiting",
      "Implement price extraction",
      "Build the runner and alerting",
      "Add history reporting",
      "Test with local HTML fixtures",
      "Document polite scraping in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-price-monitor-scraper-m1",
        "order": 1,
        "title": "Product store and CLI",
        "objectives": [
          "Create the schema",
          "Add and list tracked products",
          "Validate URLs and targets"
        ],
        "instructions": "Create the store module with the products and observations tables and the add/list commands. Validate that the URL starts with http and the target price is positive, and reject a duplicate URL. Seed the store with two example products.",
        "concepts": [
          "SQLite",
          "CLI subcommands",
          "Validation"
        ],
        "hints": [
          "Store the target as integer cents.",
          "Use a UNIQUE constraint on the URL and report duplicates kindly.",
          "Print the product id after adding."
        ],
        "acceptanceCriteria": [
          "Adding a product stores it in the database",
          "A duplicate URL is rejected",
          "List shows all tracked products"
        ],
        "tests": [
          "Add a product and list it",
          "Add the same URL twice",
          "Add a product with a bad URL"
        ]
      },
      {
        "id": "proj-portfolio-price-monitor-scraper-m2",
        "order": 2,
        "title": "Fetching and price extraction",
        "objectives": [
          "Fetch a page with a timeout and user agent",
          "Check robots.txt",
          "Extract a price from HTML"
        ],
        "instructions": "Implement the fetcher with urllib, a 10-second timeout and a user agent naming the tool. Check robots.txt before fetching and skip disallowed URLs. Implement the parser to find a price with a regular expression over the HTML near the selector text, handling currency symbols, commas and decimals.",
        "concepts": [
          "urllib",
          "robots.txt",
          "Regular expressions"
        ],
        "hints": [
          "Always set a timeout; a hung request must not hang the run.",
          "Normalise the price by stripping currency symbols and commas before parsing.",
          "Return a clear error when no price is found."
        ],
        "acceptanceCriteria": [
          "A local HTML fixture yields the correct price in cents",
          "A disallowed URL is skipped, not fetched",
          "A page with no price is recorded as a failure"
        ],
        "tests": [
          "Fetch a local test page and extract its price",
          "Parse prices like '$1,299.99' and '£49.50'",
          "Fetch a page with no price"
        ]
      },
      {
        "id": "proj-portfolio-price-monitor-scraper-m3",
        "order": 3,
        "title": "Runner, history and alerts",
        "objectives": [
          "Run a full check of all products",
          "Record observations",
          "Alert on target prices"
        ],
        "instructions": "Implement the runner: for each product, fetch, parse and insert an observation row, sleeping at least 2 seconds between requests to the same host. When a price is at or below the target, print an alert and append it to alerts.log. Implement history to print a product's observations as a dated table.",
        "concepts": [
          "Scheduling loops",
          "Rate limiting",
          "Alerting"
        ],
        "hints": [
          "Record failed fetches as observations with a failed status so history shows gaps.",
          "Group the sleep by host, not globally.",
          "The alert must include the product name, old price and new price."
        ],
        "acceptanceCriteria": [
          "A run records one observation per product",
          "A price below target prints an alert",
          "History shows the recorded observations in order"
        ],
        "tests": [
          "Run against local fixtures and check the observations table",
          "Lower a fixture price below target and run again",
          "Show history for a product"
        ]
      },
      {
        "id": "proj-portfolio-price-monitor-scraper-m4",
        "order": 4,
        "title": "Robustness, tests and docs",
        "objectives": [
          "Survive failures without stopping",
          "Test with fixtures",
          "Document polite scraping"
        ],
        "instructions": "Make the runner catch per-product exceptions, log them and continue with the next product. Write tests for the parser on varied price formats, for the runner with a local HTTP server fixture, and for the rate limiter. Finish the README explaining robots.txt, rate limits and why the tool identifies itself.",
        "concepts": [
          "Error isolation",
          "Local test servers",
          "Documentation"
        ],
        "hints": [
          "Use http.server in tests to serve fixture pages locally.",
          "Test that one failing product does not stop the others.",
          "Document the 2-second rule and how to change it."
        ],
        "acceptanceCriteria": [
          "One failing product does not stop the run",
          "All tests pass",
          "The README explains the politeness rules"
        ],
        "tests": [
          "Run with one broken fixture URL",
          "Run the test suite",
          "Show the alerts log after a price drop"
        ]
      }
    ],
    "reviewChecklist": [
      "robots.txt is checked before every fetch",
      "Same-host requests are at least 2 seconds apart",
      "A failed product never stops the run",
      "Prices are stored as integer cents with timestamps",
      "Alerts include the product, old price and new price"
    ],
    "finalAssessment": [
      "Add a product and run a check against a fixture",
      "Show the price history table",
      "Demonstrate a target-price alert",
      "Show a robots.txt refusal being honoured",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: monitor add --name X --url URL --target 49.99 [--selector TEXT]",
      "CLI: monitor run [--once]",
      "CLI: monitor history --name X",
      "CLI: monitor list"
    ]
  },
  {
    "id": "proj-portfolio-weather-api-client",
    "slug": "weather-api-client",
    "level": 1,
    "title": "Weather API Client",
    "description": "Build a friendly command-line weather client that talks to a public weather API: it fetches the current conditions and a 3-day forecast for any city, caches responses for 10 minutes, and presents the result as a readable text report. It teaches the full API-client pattern — requests, JSON parsing, caching, error handling and configuration — in one small, complete tool.",
    "skills": [
      "Python",
      "HTTP APIs",
      "JSON",
      "Caching",
      "CLI design",
      "Error handling",
      "Configuration",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Look up the current weather for a city by name",
      "Show a 3-day forecast with high, low and conditions",
      "Cache API responses for 10 minutes to avoid repeat calls",
      "Read the API key from an environment variable, never from code",
      "Print a readable text report with temperature, wind, humidity and conditions",
      "Support Celsius and Fahrenheit with a --units flag",
      "Handle network errors, unknown cities and bad API keys with clear messages",
      "Support a --json flag that prints the raw structured result"
    ],
    "nonFunctionalRequirements": [
      "The API key never appears in source code or output",
      "A cached response is reused within 10 minutes",
      "An unknown city produces a clear error, not a crash",
      "Every command works offline when a cached response exists"
    ],
    "architecture": "A single package: the CLI parses the city and flags, a client module calls the weather API with urllib and a timeout, a cache module stores responses as JSON files keyed by city and units with a timestamp, and a report module formats the result. The API key comes from the WEATHER_API_KEY environment variable.",
    "databaseSchema": "",
    "fileStructure": "weather-client/\n  weather/\n    __init__.py\n    __main__.py\n    cli.py\n    client.py\n    cache.py\n    report.py\n  tests/\n    test_cache.py\n    test_report.py\n    test_client.py\n  README.md",
    "taskBreakdown": [
      "Set up the CLI and configuration",
      "Implement the API client",
      "Add the 10-minute cache",
      "Build the text report",
      "Handle errors and add --json",
      "Write tests with mocked responses",
      "Document setup in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-weather-api-client-m1",
        "order": 1,
        "title": "CLI and configuration",
        "objectives": [
          "Parse city and flags",
          "Read the API key from the environment",
          "Fail clearly without a key"
        ],
        "instructions": "Create the CLI with a city argument and --units and --json flags. Read WEATHER_API_KEY from the environment at startup and exit with a helpful message when it is missing, explaining how to set it. Print a placeholder report structure so the output shape is visible before the API call exists.",
        "concepts": [
          "argparse",
          "Environment variables",
          "Configuration"
        ],
        "hints": [
          "Never hardcode the API key, even in an example.",
          "Validate --units is c or f before calling the API.",
          "Keep the key out of logs and error messages."
        ],
        "acceptanceCriteria": [
          "Running without the key prints setup instructions",
          "An invalid --units value is rejected",
          "The help text explains every flag"
        ],
        "tests": [
          "Run without the key set",
          "Run --help",
          "Run with --units x"
        ]
      },
      {
        "id": "proj-portfolio-weather-api-client-m2",
        "order": 2,
        "title": "API client and parsing",
        "objectives": [
          "Call the weather API",
          "Parse the JSON response",
          "Handle HTTP errors"
        ],
        "instructions": "Implement the client with urllib, a 10-second timeout and the key in a header. Parse the JSON into a small data structure with current temperature, conditions, humidity, wind and three forecast days. Map HTTP 404 to 'unknown city', 401 to 'bad API key' and timeouts to a clear network error.",
        "concepts": [
          "urllib",
          "JSON parsing",
          "HTTP status codes"
        ],
        "hints": [
          "Set a timeout on every request.",
          "Parse defensively: use .get with defaults for optional fields.",
          "Convert temperatures once, in one place."
        ],
        "acceptanceCriteria": [
          "A mocked API response parses into the right fields",
          "A 404 becomes an unknown-city message",
          "A timeout becomes a network error message"
        ],
        "tests": [
          "Call the client against a local mock server",
          "Return a 404 from the mock and check the message",
          "Return a 401 from the mock"
        ]
      },
      {
        "id": "proj-portfolio-weather-api-client-m3",
        "order": 3,
        "title": "Caching and reporting",
        "objectives": [
          "Cache responses for 10 minutes",
          "Render the text report",
          "Add --json output"
        ],
        "instructions": "Implement the file cache: store each response as JSON under a cache directory, keyed by city and units, with the fetch time. Reuse a response younger than 10 minutes and refetch older ones. Build the report module to print the current conditions and the 3-day forecast in aligned columns, and add --json to print the structured result instead.",
        "concepts": [
          "File caching",
          "Cache expiry",
          "Text formatting"
        ],
        "hints": [
          "Store the fetch time alongside the response.",
          "Hash the cache key so odd city names are safe filenames.",
          "--json must print the same data the text report shows."
        ],
        "acceptanceCriteria": [
          "A second call within 10 minutes makes no HTTP request",
          "An expired entry is refetched",
          "The text report shows current conditions and 3 forecast days"
        ],
        "tests": [
          "Call twice and count HTTP requests",
          "Age a cache entry and call again",
          "Compare --json output with the text report"
        ]
      },
      {
        "id": "proj-portfolio-weather-api-client-m4",
        "order": 4,
        "title": "Error handling, tests and docs",
        "objectives": [
          "Cover the error cases",
          "Test with mocks",
          "Document setup"
        ],
        "instructions": "Write tests with a local mock HTTP server for success, 404, 401 and timeout cases, plus cache expiry tests using a temporary directory. Verify the tool works offline from cache, and finish the README with how to get an API key, set the environment variable and example commands.",
        "concepts": [
          "Mocking HTTP",
          "Test isolation",
          "Documentation"
        ],
        "hints": [
          "Never call the real API from tests.",
          "Test the cache with a fake clock or an aged file.",
          "Document the cache location and how to clear it."
        ],
        "acceptanceCriteria": [
          "All tests pass without network access",
          "The tool works offline from a warm cache",
          "The README documents key setup and examples"
        ],
        "tests": [
          "Run the test suite with networking disabled",
          "Run twice offline after one online call",
          "Read the README and follow it from scratch"
        ]
      }
    ],
    "reviewChecklist": [
      "The API key is read from the environment only",
      "Cache entries expire after 10 minutes",
      "Unknown cities and bad keys produce clear messages",
      "The text and JSON outputs show the same data",
      "Tests never call the real API"
    ],
    "finalAssessment": [
      "Fetch the weather for a city and explain the report",
      "Show the forecast for a second city",
      "Run the same command twice and show the cache being used",
      "Demonstrate the unknown-city error",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "External: GET https://api.open-meteo.example/v1/forecast?city=&days= — current conditions and forecast (any public weather API with the same shape works; the client is written against the documented response fields)",
      "CLI: weather London [--units f] [--json]"
    ]
  },
  {
    "id": "proj-portfolio-password-manager-cli",
    "slug": "password-manager-cli",
    "level": 2,
    "title": "Encrypted Password Manager CLI",
    "description": "Build a command-line password manager that stores logins in an encrypted SQLite database unlocked by one master password. It generates strong passwords, copies nothing to logs, locks after inactivity, and exports an encrypted backup. It is a focused lesson in applied cryptography: key derivation, authenticated encryption, and never storing a secret in plain text.",
    "skills": [
      "Python",
      "Cryptography",
      "SQLite",
      "CLI design",
      "Key derivation",
      "Password generation",
      "Security",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Initialise a vault with a master password",
      "Add, list, show, edit and delete logins (site, username, password, notes)",
      "Encrypt every stored password with a key derived from the master password",
      "Generate strong random passwords of a chosen length",
      "Search logins by site name",
      "Lock the vault after 5 minutes of inactivity",
      "Export an encrypted backup and restore from it",
      "Never write a password or the master password to logs, output or the shell history"
    ],
    "nonFunctionalRequirements": [
      "Passwords are encrypted at rest with authenticated encryption",
      "The master password is never stored anywhere",
      "A wrong master password cannot open the vault",
      "Generated passwords have at least 16 characters by default with mixed character classes"
    ],
    "architecture": "A single package: the CLI collects the master password with getpass, a crypto module derives a key with PBKDF2 and encrypts values with AES-GCM (via the cryptography library when available, with a documented fallback to a stdlib HMAC-based construction for the classroom build), and a vault module stores encrypted blobs in SQLite. The key lives only in memory and is cleared on lock.",
    "databaseSchema": "vault: id INTEGER PK, site TEXT, username TEXT, password_encrypted BLOB, notes_encrypted BLOB, created_at TEXT, updated_at TEXT; meta: key TEXT PK, value TEXT",
    "fileStructure": "password-manager/\n  vault/\n    __init__.py\n    __main__.py\n    cli.py\n    crypto.py\n    store.py\n  tests/\n    test_crypto.py\n    test_store.py\n  README.md\n  SECURITY.md",
    "taskBreakdown": [
      "Design the vault schema and crypto approach",
      "Implement key derivation and encryption",
      "Build add, show, list and delete",
      "Add password generation",
      "Add lock timeout and backup",
      "Write security tests",
      "Document the threat model in SECURITY.md"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-password-manager-cli-m1",
        "order": 1,
        "title": "Vault setup and key derivation",
        "objectives": [
          "Initialise a vault",
          "Derive a key from the master password",
          "Reject a wrong master password"
        ],
        "instructions": "Implement the crypto module: generate a random salt, derive a key with PBKDF2-HMAC-SHA256 with at least 100,000 iterations, and store a verifier that proves the right key without storing the password. Implement vault init to create the database and the salt, and an unlock step that derives the key and checks the verifier.",
        "concepts": [
          "PBKDF2",
          "Salts",
          "Key verification"
        ],
        "hints": [
          "Generate the salt with secrets, never with random.",
          "Use a high iteration count; document why.",
          "The verifier must not leak whether the password was close."
        ],
        "acceptanceCriteria": [
          "Initialising creates the vault file",
          "Unlocking with the right password succeeds",
          "Unlocking with a wrong password fails"
        ],
        "tests": [
          "Initialise a vault and unlock it",
          "Unlock with the wrong password",
          "Inspect the database file and confirm no plain-text password"
        ]
      },
      {
        "id": "proj-portfolio-password-manager-cli-m2",
        "order": 2,
        "title": "Storing and retrieving logins",
        "objectives": [
          "Add a login",
          "Show a login",
          "List and search logins"
        ],
        "instructions": "Implement add to encrypt the password and notes before storing, show to decrypt and print one login, and list to show sites and usernames without revealing passwords. Search filters by site substring. Deleting removes the row and editing re-encrypts the new value.",
        "concepts": [
          "Authenticated encryption",
          "SQLite blobs",
          "Separation of secrets"
        ],
        "hints": [
          "Encrypt before storing; decrypt only when showing.",
          "List must never print passwords.",
          "Use a fresh nonce for every encryption."
        ],
        "acceptanceCriteria": [
          "A stored password is encrypted bytes in the database",
          "Show decrypts it back correctly",
          "List does not reveal any password"
        ],
        "tests": [
          "Add a login and inspect the raw database row",
          "Show the login and compare",
          "List logins and check no password is printed"
        ]
      },
      {
        "id": "proj-portfolio-password-manager-cli-m3",
        "order": 3,
        "title": "Password generation and locking",
        "objectives": [
          "Generate strong passwords",
          "Lock after inactivity",
          "Change the master password"
        ],
        "instructions": "Implement generation with the secrets module: default 16 characters mixing upper, lower, digits and symbols, with a configurable length. Track the last unlock time and require the master password again after 5 minutes. Implement a master-password change that re-encrypts every entry under the new key.",
        "concepts": [
          "secrets module",
          "Session timeouts",
          "Key rotation"
        ],
        "hints": [
          "Use secrets.choice, never random.choice, for passwords.",
          "Clear the in-memory key on lock.",
          "Re-encryption must be all-or-nothing."
        ],
        "acceptanceCriteria": [
          "Generated passwords meet the length and character rules",
          "After 5 minutes the vault asks for the password again",
          "Changing the master password keeps all logins readable"
        ],
        "tests": [
          "Generate passwords of several lengths and check their composition",
          "Wait out the timeout and try to show a login",
          "Change the master password and show a login"
        ]
      },
      {
        "id": "proj-portfolio-password-manager-cli-m4",
        "order": 4,
        "title": "Backup, tests and security docs",
        "objectives": [
          "Export an encrypted backup",
          "Restore from a backup",
          "Document the threat model"
        ],
        "instructions": "Implement export to write the encrypted vault contents to a file that is useless without the master password, and import to restore it. Write tests for encryption round-trips, wrong-password rejection, generation rules and the lock timeout, and write SECURITY.md stating what the tool protects against and what it does not.",
        "concepts": [
          "Encrypted backups",
          "Security testing",
          "Threat modelling"
        ],
        "hints": [
          "The backup must be encrypted, not a plain dump.",
          "Test that tampering with a ciphertext is detected.",
          "State clearly that the tool does not protect a compromised machine."
        ],
        "acceptanceCriteria": [
          "A backup restores all logins under the same master password",
          "Tampering with the backup is detected on import",
          "SECURITY.md states the threat model"
        ],
        "tests": [
          "Export, delete the vault, import and show a login",
          "Flip a byte in the backup and import it",
          "Run the test suite"
        ]
      }
    ],
    "reviewChecklist": [
      "No password or master password is stored in plain text",
      "A wrong master password cannot open the vault",
      "List never prints passwords",
      "Generated passwords use the secrets module",
      "Tampered ciphertext is detected, not silently accepted"
    ],
    "finalAssessment": [
      "Initialise a vault and add three logins",
      "Show one login and list the others",
      "Generate a password and explain its strength",
      "Export a backup and restore it",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: vault init",
      "CLI: vault add --site X --username Y [--generate] [--length N]",
      "CLI: vault show --site X",
      "CLI: vault list [--search TEXT]",
      "CLI: vault export --out backup.enc / vault import --in backup.enc"
    ]
  },
  {
    "id": "proj-portfolio-flask-task-api",
    "slug": "flask-task-api",
    "level": 2,
    "title": "Task API with Flask",
    "description": "Build a REST API for a task manager using Flask and SQLite: projects, tasks with priorities and due dates, and a simple token login. It covers the everyday backend skills hiring managers look for — routing, validation, filtering, pagination and tests — in a small service that is easy to demo and extend.",
    "skills": [
      "Python",
      "Flask",
      "REST APIs",
      "SQLite",
      "Token authentication",
      "Validation",
      "Pagination",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Create, list, update and delete projects and tasks",
      "Filter tasks by project, status and priority, and sort by due date",
      "Paginate list responses with page and limit parameters",
      "Validate task input and return 400 with field-level errors",
      "Authenticate with a simple token issued at login",
      "Mark tasks complete and reopen them",
      "Return consistent JSON errors with a code and message",
      "Seed demo data with a single command"
    ],
    "nonFunctionalRequirements": [
      "Task titles are required and at most 200 characters",
      "A task always belongs to an existing project",
      "List responses include the total count for pagination",
      "All endpoints are covered by tests"
    ],
    "architecture": "A Flask application using the application-factory pattern: blueprints for auth, projects and tasks; a service layer for business rules; a repository layer over SQLite; and a before-request hook that checks the Bearer token on protected routes. Tokens are random strings stored hashed in the database with an expiry.",
    "databaseSchema": "users: id INTEGER PK, email TEXT UNIQUE, password_hash TEXT; tokens: id INTEGER PK, user_id INTEGER FK, token_hash TEXT, expires_at TEXT; projects: id INTEGER PK, name TEXT, owner_id INTEGER FK; tasks: id INTEGER PK, project_id INTEGER FK, title TEXT, status TEXT, priority TEXT, due_date TEXT, created_at TEXT",
    "fileStructure": "flask-task-api/\n  app/\n    __init__.py\n    config.py\n    db.py\n    auth.py\n    routes/\n      __init__.py\n      projects.py\n      tasks.py\n  tests/\n    test_tasks.py\n    test_auth.py\n  requirements.txt\n  README.md",
    "taskBreakdown": [
      "Set up the Flask factory and database",
      "Implement auth with tokens",
      "Build project CRUD",
      "Build task CRUD with filtering and pagination",
      "Add validation and error handling",
      "Write the test suite",
      "Document the API in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-flask-task-api-m1",
        "order": 1,
        "title": "App factory, database and health",
        "objectives": [
          "Create the Flask factory",
          "Set up SQLite tables",
          "Add a health endpoint"
        ],
        "instructions": "Create the application factory that builds the Flask app, registers blueprints and creates the users, tokens, projects and tasks tables. Add GET /api/health returning status ok and the app version. Run the app and confirm the health check responds.",
        "concepts": [
          "Flask factory pattern",
          "Blueprints",
          "SQLite"
        ],
        "hints": [
          "Keep database code in one module.",
          "The factory must accept a test config so tests use a temporary database.",
          "Return JSON from every endpoint."
        ],
        "acceptanceCriteria": [
          "The app starts and GET /api/health returns 200",
          "All four tables exist",
          "A test config uses a separate database file"
        ],
        "tests": [
          "Start the app and call the health endpoint",
          "Inspect the SQLite tables",
          "Start the app twice and confirm data persists"
        ]
      },
      {
        "id": "proj-portfolio-flask-task-api-m2",
        "order": 2,
        "title": "Auth: register, login and tokens",
        "objectives": [
          "Register users with hashed passwords",
          "Issue tokens on login",
          "Protect routes"
        ],
        "instructions": "Implement registration with email and password validation and PBKDF2 hashing, login that verifies the password and issues a random token stored hashed with a 24-hour expiry, and a before-request check that rejects missing or expired tokens with 401 on protected routes.",
        "concepts": [
          "Token authentication",
          "Password hashing",
          "Request hooks"
        ],
        "hints": [
          "Hash tokens before storing them, like passwords.",
          "Return 401 for a missing token and 401 for an expired one.",
          "Never include the password hash in a response."
        ],
        "acceptanceCriteria": [
          "Registration returns 201",
          "Login returns a token",
          "A protected route without a token returns 401"
        ],
        "tests": [
          "Register and log in",
          "Call a protected route without a token",
          "Call with an expired token"
        ]
      },
      {
        "id": "proj-portfolio-flask-task-api-m3",
        "order": 3,
        "title": "Projects and tasks CRUD",
        "objectives": [
          "Build project CRUD",
          "Build task CRUD",
          "Enforce project ownership"
        ],
        "instructions": "Implement project create/list/update/delete and task create/list/update/delete nested under projects. A task requires a title and a valid priority of low, medium or high, and its project must exist. Tasks are only visible to the project owner, so every query filters by the authenticated user.",
        "concepts": [
          "Nested resources",
          "Ownership scoping",
          "Validation"
        ],
        "hints": [
          "Always filter by owner id in task queries.",
          "Return 404 for a task in another user's project.",
          "Validate priority against the allowed set."
        ],
        "acceptanceCriteria": [
          "Tasks can be created, listed, updated and deleted",
          "An invalid priority returns 400",
          "One user cannot see another user's tasks"
        ],
        "tests": [
          "Create a project and tasks as user A",
          "Fetch them as user B",
          "Create a task with priority 'urgent'"
        ]
      },
      {
        "id": "proj-portfolio-flask-task-api-m4",
        "order": 4,
        "title": "Filtering, pagination and tests",
        "objectives": [
          "Filter and sort tasks",
          "Paginate list responses",
          "Cover the API with tests"
        ],
        "instructions": "Add query parameters for status and priority filtering and due-date sorting, plus page and limit with a default limit of 20 and a maximum of 100, returning the total count alongside each page. Write tests for auth, ownership, validation, filtering and pagination, and document every endpoint in the README.",
        "concepts": [
          "Filtering",
          "Pagination",
          "API testing"
        ],
        "hints": [
          "Return the total count so clients can build a pager.",
          "Clamp limit to the maximum instead of erroring.",
          "Test the cross-user case explicitly."
        ],
        "acceptanceCriteria": [
          "Filtering by status returns only matching tasks",
          "Pagination returns the correct page and total",
          "All tests pass"
        ],
        "tests": [
          "Request page 2 with limit 2",
          "Filter by status done",
          "Run the test suite"
        ]
      }
    ],
    "reviewChecklist": [
      "Passwords and tokens are stored hashed",
      "Every task query is scoped to the owner",
      "Validation errors name the bad field",
      "Pagination defaults and limits are enforced",
      "Tests cover auth, ownership and pagination"
    ],
    "finalAssessment": [
      "Register two users and log both in",
      "Create a project and tasks as one user",
      "Prove the other user cannot see them",
      "Demonstrate filtering, sorting and pagination",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "POST /api/auth/register — create a user",
      "POST /api/auth/login — receive a token",
      "GET /api/projects, POST /api/projects",
      "GET /api/projects/{id}/tasks?status=&priority=&sort=due&page=&limit=",
      "POST /api/projects/{id}/tasks",
      "PATCH /api/tasks/{id}, DELETE /api/tasks/{id}",
      "GET /api/health"
    ]
  },
  {
    "id": "proj-portfolio-markdown-notes-app",
    "slug": "markdown-notes-app",
    "level": 2,
    "title": "Markdown Notes App",
    "description": "Build a note-taking app that stores notes as Markdown files on disk: create, edit, search and tag notes from the command line, and render any note to HTML. It shows how a real tool can be built on plain files instead of a database, with full-text search, tags, and a clean export story.",
    "skills": [
      "Python",
      "Markdown",
      "File storage",
      "Full-text search",
      "CLI design",
      "HTML rendering",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Create a note with a title, tags and Markdown body",
      "List notes sorted by updated date, with tag filtering",
      "Edit a note in the user's editor or from the command line",
      "Search note titles and bodies for a word or phrase",
      "Render a note to a standalone HTML file",
      "Delete a note with confirmation",
      "Store every note as a plain Markdown file with YAML front matter",
      "Export all notes as a single HTML document"
    ],
    "nonFunctionalRequirements": [
      "Notes are plain files a user can open in any editor",
      "Search returns results in under 200 ms for 1,000 notes",
      "Deleting a note only removes its file",
      "Rendering escapes HTML in note bodies"
    ],
    "architecture": "A package with a store module that maps note ids to files in a notes directory, a parser for YAML front matter, a search module that builds a simple in-memory index of words to note ids, and a renderer that converts a small Markdown subset (headings, bold, italic, lists, links, code) to HTML with escaping. The CLI wraps all of it.",
    "databaseSchema": "",
    "fileStructure": "markdown-notes/\n  notes/\n    __init__.py\n    __main__.py\n    cli.py\n    store.py\n    frontmatter.py\n    search.py\n    render.py\n  tests/\n    test_store.py\n    test_search.py\n    test_render.py\n  README.md",
    "taskBreakdown": [
      "Design the on-disk note format",
      "Implement create, list and delete",
      "Implement search with an index",
      "Implement Markdown to HTML rendering",
      "Add tags and export",
      "Write tests and the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-markdown-notes-app-m1",
        "order": 1,
        "title": "Note format and storage",
        "objectives": [
          "Define the front-matter format",
          "Create and list notes",
          "Read a note back"
        ],
        "instructions": "Decide the format: a Markdown file whose first block is YAML front matter with id, title, tags, created and updated timestamps, followed by the body. Implement the store to create a file with a slug id, list all notes sorted by updated date, and read one back by id.",
        "concepts": [
          "YAML front matter",
          "File naming",
          "Timestamps"
        ],
        "hints": [
          "Generate the id from the title slug plus a short random suffix.",
          "Store timestamps in ISO format.",
          "Keep the store module free of CLI code."
        ],
        "acceptanceCriteria": [
          "Creating a note writes a Markdown file",
          "List shows the note with its title and tags",
          "Reading the note returns its body"
        ],
        "tests": [
          "Create a note and open the file",
          "Create three notes and list them",
          "Read a note by id"
        ]
      },
      {
        "id": "proj-portfolio-markdown-notes-app-m2",
        "order": 2,
        "title": "Editing, tags and deletion",
        "objectives": [
          "Edit a note",
          "Filter by tag",
          "Delete with confirmation"
        ],
        "instructions": "Implement edit to update the title, tags or body and refresh the updated timestamp, list --tag to filter, and delete to ask for confirmation before removing the file. Editing must preserve the front matter fields that were not changed.",
        "concepts": [
          "File updates",
          "Tag filtering",
          "Confirmation prompts"
        ],
        "hints": [
          "Rewrite the whole file on edit; notes are small.",
          "Update the timestamp on every edit.",
          "Deletion must require typing the note id or answering yes."
        ],
        "acceptanceCriteria": [
          "Editing updates the body and timestamp",
          "Tag filtering returns only matching notes",
          "Delete removes the file after confirmation"
        ],
        "tests": [
          "Edit a note and read it back",
          "List with a tag filter",
          "Delete a note and confirm the file is gone"
        ]
      },
      {
        "id": "proj-portfolio-markdown-notes-app-m3",
        "order": 3,
        "title": "Search and rendering",
        "objectives": [
          "Build a word index",
          "Search titles and bodies",
          "Render Markdown to HTML"
        ],
        "instructions": "Implement the search index: tokenise each note's title and body into lowercase words and map words to note ids, then answer queries by intersecting word sets and ranking by match count. Implement the renderer for headings, bold, italic, unordered lists, links and fenced code blocks, escaping any raw HTML in the body first.",
        "concepts": [
          "Inverted index",
          "Tokenisation",
          "Markdown parsing"
        ],
        "hints": [
          "Escape HTML before applying Markdown rules.",
          "Rank results by the number of matched words.",
          "Handle a query word that matches nothing."
        ],
        "acceptanceCriteria": [
          "Searching finds notes containing the word",
          "A multi-word query ranks the best match first",
          "Rendering produces valid HTML with escaped input"
        ],
        "tests": [
          "Search for a word in two notes",
          "Render a note with a heading, list and code block",
          "Render a note containing a <script> tag"
        ]
      },
      {
        "id": "proj-portfolio-markdown-notes-app-m4",
        "order": 4,
        "title": "Export, tests and docs",
        "objectives": [
          "Export all notes to one HTML file",
          "Test the store, search and renderer",
          "Document the format"
        ],
        "instructions": "Implement export to render every note into a single HTML document with a table of contents. Write tests for front-matter parsing, search ranking, rendering and the store using a temporary notes directory, and document the file format in the README so users can edit notes by hand.",
        "concepts": [
          "HTML export",
          "Temporary test directories",
          "Documentation"
        ],
        "hints": [
          "Use a temporary directory per test.",
          "The export table of contents links to each note section.",
          "Document the front-matter fields exactly."
        ],
        "acceptanceCriteria": [
          "Export produces one HTML file with all notes",
          "All tests pass",
          "The README documents the on-disk format"
        ],
        "tests": [
          "Export three notes and open the HTML",
          "Run the test suite",
          "Edit a note file by hand and list it"
        ]
      }
    ],
    "reviewChecklist": [
      "Notes are plain Markdown files with front matter",
      "Search ranks by match count",
      "Rendered HTML escapes raw HTML from bodies",
      "Delete requires confirmation",
      "Export includes a table of contents"
    ],
    "finalAssessment": [
      "Create notes with tags and bodies",
      "Search for a word and explain the ranking",
      "Render a note to HTML and open it",
      "Export all notes to one file",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: notes new --title X [--tags a,b] [--body TEXT]",
      "CLI: notes list [--tag X]",
      "CLI: notes search QUERY",
      "CLI: notes render --id ID --out note.html",
      "CLI: notes export --out all.html"
    ]
  },
  {
    "id": "proj-portfolio-pdf-report-generator",
    "slug": "pdf-report-generator",
    "level": 2,
    "title": "PDF Report Generator",
    "description": "Build a tool that turns structured data into a polished PDF report: a title page, tables, charts drawn as vector graphics, and page numbers, all generated from a JSON input file and a template. It teaches document generation end to end — data in, layout rules, and a binary file out — without any paid library.",
    "skills": [
      "Python",
      "PDF generation",
      "ReportLab-style layout",
      "Data visualisation",
      "Templating",
      "CLI design",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Read report data from a JSON file with sections, tables and series",
      "Generate a multi-page PDF with a title page and a table of contents",
      "Render data tables with headers, alternating row shading and totals",
      "Draw bar and line charts as vector graphics from data series",
      "Add headers, footers and page numbers to every page",
      "Support a custom title, author and colour theme in the input file",
      "Validate the input and report missing fields with a clear error",
      "Produce a PDF that opens in any standard PDF reader"
    ],
    "nonFunctionalRequirements": [
      "The PDF is generated with only open-source libraries",
      "Tables never split a header from its first row",
      "Charts are vector graphics, not raster images",
      "A malformed input file produces a clear error, not a partial PDF"
    ],
    "architecture": "A package that reads and validates the JSON input, builds an intermediate document model (pages of flowable elements: paragraphs, tables, charts), and renders it with a PDF library to a multi-page document. Charts are drawn with vector primitives. Layout is computed from page size, margins and font metrics.",
    "databaseSchema": "",
    "fileStructure": "pdf-report-generator/\n  reportgen/\n    __init__.py\n    __main__.py\n    cli.py\n    schema.py\n    model.py\n    charts.py\n    render.py\n  tests/\n    test_schema.py\n    test_charts.py\n    test_render.py\n  examples/\n    sales-report.json\n  README.md",
    "taskBreakdown": [
      "Define the JSON input schema",
      "Implement validation",
      "Build the document model and tables",
      "Draw bar and line charts",
      "Add headers, footers and page numbers",
      "Write tests and examples",
      "Document the schema in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-pdf-report-generator-m1",
        "order": 1,
        "title": "Schema and validation",
        "objectives": [
          "Define the report JSON schema",
          "Validate an input file",
          "Report errors clearly"
        ],
        "instructions": "Define the schema: title, author, theme, and a list of sections each with a heading, paragraphs, an optional table and optional chart series. Implement validation that checks required fields and types and returns a list of human-readable errors. Add the example command that writes a valid sample input.",
        "concepts": [
          "JSON schema",
          "Validation",
          "Error messages"
        ],
        "hints": [
          "Validate before rendering anything.",
          "Collect all errors, not just the first.",
          "The example file must pass validation."
        ],
        "acceptanceCriteria": [
          "A valid file passes validation",
          "A file missing the title lists the error",
          "The example file validates"
        ],
        "tests": [
          "Validate the example file",
          "Validate a file with no title",
          "Validate a file with a wrong-typed table"
        ]
      },
      {
        "id": "proj-portfolio-pdf-report-generator-m2",
        "order": 2,
        "title": "Tables and document model",
        "objectives": [
          "Build the document model",
          "Render tables with shading and totals",
          "Handle multi-page tables"
        ],
        "instructions": "Implement the model: sections become a list of flowables. Render tables with a bold header row, alternating row shading, right-aligned numbers and an optional totals row. Long tables split across pages with the header repeated on each page.",
        "concepts": [
          "Document flowables",
          "Table styling",
          "Page breaks"
        ],
        "hints": [
          "Repeat the header row on every page of a split table.",
          "Right-align numeric columns.",
          "Keep the totals row with the last data row when possible."
        ],
        "acceptanceCriteria": [
          "A table renders with a header, shading and totals",
          "A long table repeats its header on the next page",
          "Numbers are right-aligned"
        ],
        "tests": [
          "Build a report with a 3-row table",
          "Build a report with a 60-row table and check page 2",
          "Open the PDF and inspect the table"
        ]
      },
      {
        "id": "proj-portfolio-pdf-report-generator-m3",
        "order": 3,
        "title": "Charts, headers and footers",
        "objectives": [
          "Draw bar charts",
          "Draw line charts",
          "Add headers, footers and page numbers"
        ],
        "instructions": "Implement bar charts with labelled axes and value labels, and line charts with points and a legend, both drawn as vector graphics scaled to the data range. Add a running header with the report title and a footer with the page number on every page except the title page.",
        "concepts": [
          "Vector drawing",
          "Chart scaling",
          "Page templates"
        ],
        "hints": [
          "Scale the chart to the data range with a small margin.",
          "Label axes with the series units.",
          "Page numbers must be correct on every page."
        ],
        "acceptanceCriteria": [
          "A bar chart shows one bar per data point",
          "A line chart shows the series with a legend",
          "Every page after the title has a page number"
        ],
        "tests": [
          "Build a report with both chart types",
          "Check the page numbers in the PDF",
          "Build a chart with a single data point"
        ]
      },
      {
        "id": "proj-portfolio-pdf-report-generator-m4",
        "order": 4,
        "title": "Themes, tests and docs",
        "objectives": [
          "Support colour themes",
          "Test rendering",
          "Document the schema"
        ],
        "instructions": "Add at least two colour themes selectable in the input or with --theme, and verify the theme changes the heading and chart colours. Write tests for validation, chart scaling and the full build using a small example input, and document the complete JSON schema with an example in the README.",
        "concepts": [
          "Theming",
          "PDF testing",
          "Documentation"
        ],
        "hints": [
          "Test the PDF by checking it opens and has the expected page count.",
          "Themes change colours, never layout.",
          "Document every schema field."
        ],
        "acceptanceCriteria": [
          "Switching themes changes the PDF colours",
          "All tests pass",
          "The README documents the full schema"
        ],
        "tests": [
          "Build the same report in both themes",
          "Run the test suite",
          "Follow the README to build a report from scratch"
        ]
      }
    ],
    "reviewChecklist": [
      "Input is fully validated before rendering",
      "Tables repeat headers across pages",
      "Charts are vector graphics with labelled axes",
      "Page numbers are correct on every page",
      "The PDF opens in a standard reader"
    ],
    "finalAssessment": [
      "Validate the example input",
      "Build a report with tables and both chart types",
      "Show the title page, a table page and a chart page",
      "Build the same report in a second theme",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: report build --input report.json --out report.pdf [--theme NAME]",
      "CLI: report validate --input report.json",
      "CLI: report example --out example.json"
    ]
  },
  {
    "id": "proj-portfolio-stock-portfolio-tracker",
    "slug": "stock-portfolio-tracker",
    "level": 3,
    "title": "Stock Portfolio Tracker",
    "description": "Build a portfolio tracker that records stock purchases, fetches current prices from a public API, and reports holdings, gains and losses, and allocation. It handles the real-world mess of investing data — splits, dividends, multiple buys at different prices — and presents it as a clear dashboard in the terminal.",
    "skills": [
      "Python",
      "HTTP APIs",
      "SQLite",
      "Portfolio math",
      "Cost basis",
      "CLI design",
      "Caching",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Record buy and sell transactions with symbol, shares, price and date",
      "Fetch current prices from a public quotes API with caching",
      "Show holdings with shares, average cost, current value and gain or loss",
      "Compute realised gains from sells using FIFO cost basis",
      "Show allocation as a percentage of total portfolio value",
      "Record dividends and include them in total return",
      "Alert when a holding moves more than 5 percent in a day",
      "Export the portfolio to CSV"
    ],
    "nonFunctionalRequirements": [
      "Cost basis uses FIFO and is computed from transactions, never stored as a guess",
      "A sell of more shares than held is rejected",
      "Prices are cached for 15 minutes",
      "Money is stored as integer cents"
    ],
    "architecture": "A package with a transactions store in SQLite, a price client with a 15-minute file cache, and a portfolio engine that replays transactions in date order to compute holdings, average cost and FIFO realised gains. The CLI renders holdings, allocation and performance tables in the terminal.",
    "databaseSchema": "transactions: id INTEGER PK, symbol TEXT, kind TEXT, shares REAL, price_cents INTEGER, traded_on TEXT; dividends: id INTEGER PK, symbol TEXT, amount_cents INTEGER, paid_on TEXT",
    "fileStructure": "stock-portfolio/\n  portfolio/\n    __init__.py\n    __main__.py\n    cli.py\n    store.py\n    prices.py\n    engine.py\n  tests/\n    test_engine.py\n    test_store.py\n  README.md",
    "taskBreakdown": [
      "Design the transaction schema",
      "Implement buy, sell and dividends",
      "Implement the price client with caching",
      "Build the FIFO holdings engine",
      "Add allocation and performance reports",
      "Write tests with known transactions",
      "Document the math in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-stock-portfolio-tracker-m1",
        "order": 1,
        "title": "Transactions and storage",
        "objectives": [
          "Create the schema",
          "Record buys and sells",
          "Validate share counts"
        ],
        "instructions": "Create the transactions and dividends tables and implement buy and sell commands with validation: shares must be positive, price must be positive, the date must be valid. Reject a sell that exceeds the shares held at that date. List transactions in date order.",
        "concepts": [
          "SQLite",
          "Validation",
          "Transaction history"
        ],
        "hints": [
          "Store money as integer cents.",
          "Validate the sell against holdings at that date.",
          "Keep the transaction log append-only."
        ],
        "acceptanceCriteria": [
          "Buys and sells are recorded",
          "An oversell is rejected",
          "Transactions list in date order"
        ],
        "tests": [
          "Buy 10 shares and sell 4",
          "Try to sell 20 shares",
          "List the transactions"
        ]
      },
      {
        "id": "proj-portfolio-stock-portfolio-tracker-m2",
        "order": 2,
        "title": "Price client and caching",
        "objectives": [
          "Fetch a quote from the API",
          "Cache prices for 15 minutes",
          "Handle unknown symbols"
        ],
        "instructions": "Implement the price client with urllib and a timeout, reading the API key from the environment. Cache quotes as JSON files keyed by symbol with a fetch time and reuse them for 15 minutes. An unknown symbol produces a clear error and the holding is shown with its last known price.",
        "concepts": [
          "HTTP APIs",
          "File caching",
          "Error handling"
        ],
        "hints": [
          "Cache by symbol with a timestamp.",
          "Never crash the holdings report when one quote fails.",
          "Keep the API key out of output."
        ],
        "acceptanceCriteria": [
          "A quote is fetched and cached",
          "A second call within 15 minutes makes no request",
          "An unknown symbol shows a clear error"
        ],
        "tests": [
          "Fetch a quote twice and count requests",
          "Fetch an unknown symbol",
          "Age the cache and fetch again"
        ]
      },
      {
        "id": "proj-portfolio-stock-portfolio-tracker-m3",
        "order": 3,
        "title": "Holdings engine: FIFO and gains",
        "objectives": [
          "Compute holdings from transactions",
          "Apply FIFO cost basis",
          "Report gains and allocation"
        ],
        "instructions": "Implement the engine: replay transactions in date order, maintain a queue of buy lots per symbol, and consume lots FIFO on each sell to compute realised gains. Holdings show shares, average cost, current value, unrealised gain and allocation percentage of the total portfolio value.",
        "concepts": [
          "FIFO accounting",
          "Cost basis",
          "Portfolio math"
        ],
        "hints": [
          "Replay in date order, not insertion order.",
          "Average cost is the weighted average of remaining lots.",
          "Allocation percentages must sum to 100."
        ],
        "acceptanceCriteria": [
          "Holdings match hand-computed values",
          "A sell realises the correct FIFO gain",
          "Allocation percentages sum to 100"
        ],
        "tests": [
          "Buy at two prices, sell some, check the realised gain",
          "Buy three symbols and check allocation",
          "Sell everything and check holdings are empty"
        ]
      },
      {
        "id": "proj-portfolio-stock-portfolio-tracker-m4",
        "order": 4,
        "title": "Dividends, alerts and tests",
        "objectives": [
          "Record dividends",
          "Alert on large daily moves",
          "Test the engine"
        ],
        "instructions": "Add dividend recording and include dividends in total return on the performance report. Add a daily-move alert when a holding's price changes more than 5 percent from the previous close. Write tests for FIFO gains, oversell rejection, allocation and the cache, and document the FIFO math in the README.",
        "concepts": [
          "Dividends",
          "Total return",
          "Testing"
        ],
        "hints": [
          "Total return is gains plus dividends.",
          "Test FIFO with multiple lots and partial sells.",
          "Document the FIFO example in the README."
        ],
        "acceptanceCriteria": [
          "Dividends appear in total return",
          "A 6 percent move prints an alert",
          "All tests pass"
        ],
        "tests": [
          "Record a dividend and check performance",
          "Simulate a large price move",
          "Run the test suite"
        ]
      }
    ],
    "reviewChecklist": [
      "FIFO gains match hand-computed values",
      "Oversells are rejected",
      "Allocation percentages sum to 100",
      "Prices are cached for 15 minutes",
      "Money is stored as integer cents"
    ],
    "finalAssessment": [
      "Record buys at two prices and a sell",
      "Show holdings and explain the FIFO gain",
      "Show allocation and performance including a dividend",
      "Demonstrate the daily-move alert",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "External: GET https://api.quotes.example/v1/quote?symbol= — current price (any public quotes API with a symbol and price field works)",
      "CLI: portfolio buy AAPL 10 150.25 --date 2026-01-05",
      "CLI: portfolio holdings",
      "CLI: portfolio performance"
    ]
  },
  {
    "id": "proj-portfolio-faq-chatbot",
    "slug": "faq-chatbot",
    "level": 2,
    "title": "FAQ Chatbot",
    "description": "Build a rule-based chatbot that answers frequently asked questions for a small business: it matches user questions against a knowledge base using keyword overlap and simple similarity, asks a clarifying question when it is unsure, and logs unanswered questions so the knowledge base can grow. It is a complete, honest introduction to conversational software without pretending to be AI.",
    "skills": [
      "Python",
      "Text similarity",
      "CLI design",
      "JSON data",
      "Conversation design",
      "Logging",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Answer questions from a JSON knowledge base of question and answer pairs",
      "Match by keyword overlap and word similarity, not exact text",
      "Ask a clarifying question when two answers are close",
      "Say clearly that it does not know when no answer matches",
      "Log every unanswered question to a file for review",
      "Support a small-talk set of greetings and goodbyes",
      "Let the business add a question and answer from the CLI",
      "Keep a conversation transcript with timestamps"
    ],
    "nonFunctionalRequirements": [
      "The bot never invents an answer: below the confidence threshold it says it does not know",
      "Every question and answer comes from the knowledge base file",
      "Unanswered questions are always logged",
      "The bot responds in under 100 ms per question"
    ],
    "architecture": "A package with a knowledge-base loader, a matcher that tokenises the question, removes stop words and scores each stored question by word overlap, a conversation loop that handles greetings, clarifications and fallbacks, and a logger that appends unanswered questions and transcripts to files.",
    "databaseSchema": "",
    "fileStructure": "faq-chatbot/\n  chatbot/\n    __init__.py\n    __main__.py\n    cli.py\n    kb.py\n    matcher.py\n    conversation.py\n  data/\n    knowledge_base.json\n  tests/\n    test_matcher.py\n    test_kb.py\n  README.md",
    "taskBreakdown": [
      "Design the knowledge-base format",
      "Implement the matcher",
      "Build the ask command and the chat loop",
      "Add clarifications and fallbacks",
      "Add unanswered-question logging",
      "Write tests and the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-faq-chatbot-m1",
        "order": 1,
        "title": "Knowledge base and loading",
        "objectives": [
          "Define the JSON format",
          "Load and validate the base",
          "Add a question from the CLI"
        ],
        "instructions": "Define the knowledge base as a JSON list of objects with question, answer and keywords. Implement loading with validation that every entry has a non-empty question and answer, and the add command that appends a new entry and saves the file. Seed the base with at least 10 realistic business FAQs.",
        "concepts": [
          "JSON data",
          "Validation",
          "Data files"
        ],
        "hints": [
          "Validate on load and report the bad entry.",
          "Keep the file human-editable and pretty-printed.",
          "Seed realistic questions a customer would actually ask."
        ],
        "acceptanceCriteria": [
          "The base loads with at least 10 entries",
          "Adding a question persists it",
          "A malformed entry is reported on load"
        ],
        "tests": [
          "Load the seeded base",
          "Add a question and reload",
          "Load a base with an empty answer"
        ]
      },
      {
        "id": "proj-portfolio-faq-chatbot-m2",
        "order": 2,
        "title": "Matching questions",
        "objectives": [
          "Tokenise and normalise questions",
          "Score by word overlap",
          "Rank the best answer"
        ],
        "instructions": "Implement the matcher: lowercase, strip punctuation, remove a small stop-word list, and score each stored question by the share of the user's words it contains. Return the best match with its score, and test it against paraphrases of the seeded questions.",
        "concepts": [
          "Tokenisation",
          "Stop words",
          "Similarity scoring"
        ],
        "hints": [
          "Score by overlap share, not raw count, so long questions do not always win.",
          "Stem simple plurals by stripping a trailing s.",
          "Test with paraphrases, not just exact copies."
        ],
        "acceptanceCriteria": [
          "An exact question matches with score 1.0",
          "A paraphrase finds the right answer",
          "An unrelated question scores low"
        ],
        "tests": [
          "Ask an exact seeded question",
          "Ask a paraphrased version",
          "Ask something unrelated and check the score"
        ]
      },
      {
        "id": "proj-portfolio-faq-chatbot-m3",
        "order": 3,
        "title": "Conversation: clarifications and fallbacks",
        "objectives": [
          "Ask clarifying questions on close calls",
          "Say 'I don't know' below threshold",
          "Handle greetings and goodbyes"
        ],
        "instructions": "Build the conversation loop: greet the user, read questions until goodbye, and for each one use the matcher. When the top two scores are within 0.05 and both are above threshold, ask which topic the user meant. Below the threshold, say clearly that the bot does not know and log the question. Log every exchange to a transcript file.",
        "concepts": [
          "Conversation design",
          "Confidence thresholds",
          "Transcripts"
        ],
        "hints": [
          "Pick the threshold by testing real questions; document the value you chose.",
          "The clarification must show the two candidate topics.",
          "The fallback must never guess an answer."
        ],
        "acceptanceCriteria": [
          "A close call asks a clarifying question",
          "A low-score question gets an honest 'I don't know'",
          "The transcript records the exchange"
        ],
        "tests": [
          "Ask a question matching two topics",
          "Ask a question the bot cannot answer",
          "Say hello and goodbye"
        ]
      },
      {
        "id": "proj-portfolio-faq-chatbot-m4",
        "order": 4,
        "title": "Unanswered log, tests and docs",
        "objectives": [
          "List unanswered questions",
          "Test the matcher",
          "Document the knowledge base"
        ],
        "instructions": "Implement the unanswered command to list logged questions with counts, so the business can see what to add. Write tests for matching, paraphrases, thresholds and logging, and document in the README how to grow the knowledge base and tune the threshold.",
        "concepts": [
          "Feedback loops",
          "Testing",
          "Documentation"
        ],
        "hints": [
          "Count repeated unanswered questions.",
          "Test the threshold boundary explicitly.",
          "Document how to add entries by hand."
        ],
        "acceptanceCriteria": [
          "Unanswered questions are listed with counts",
          "All tests pass",
          "The README explains tuning the threshold"
        ],
        "tests": [
          "Ask three unanswerable questions and list them",
          "Run the test suite",
          "Add the most common unanswered question and ask it again"
        ]
      }
    ],
    "reviewChecklist": [
      "The bot never invents an answer",
      "Every answer comes from the knowledge base",
      "Close calls ask a clarifying question",
      "Unanswered questions are always logged",
      "The transcript records every exchange"
    ],
    "finalAssessment": [
      "Ask a seeded question and a paraphrase of it",
      "Ask a question with two close matches",
      "Ask something the bot does not know and show the log",
      "Add a new question and answer from the CLI",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: chatbot ask \"What are your opening hours?\"",
      "CLI: chatbot chat (interactive loop)",
      "CLI: chatbot add --question X --answer Y",
      "CLI: chatbot unanswered"
    ]
  },
  {
    "id": "proj-portfolio-image-thumbnail-service",
    "slug": "image-thumbnail-service",
    "level": 2,
    "title": "Image Thumbnail Service",
    "description": "Build a small service that creates thumbnails from uploaded images: it accepts common image formats, resizes without distorting the aspect ratio, stores the originals and thumbnails on disk, and serves them over HTTP with caching headers. It covers the practical skills behind every media pipeline — validation, safe filenames, resizing, and storage layout.",
    "skills": [
      "Python",
      "Image processing",
      "HTTP servers",
      "File storage",
      "Validation",
      "Caching",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Accept image uploads over HTTP in PNG and JPEG formats",
      "Generate thumbnails at 150, 300 and 600 pixels wide",
      "Preserve the aspect ratio; never stretch an image",
      "Reject non-image files and files larger than 5 MB",
      "Store originals and thumbnails under a content-addressed filename",
      "Serve thumbnails over HTTP with cache headers",
      "List stored images with their sizes and dimensions",
      "Delete an image and all of its thumbnails"
    ],
    "nonFunctionalRequirements": [
      "A non-image file is rejected before anything is written to disk",
      "Thumbnails keep the original aspect ratio",
      "No two different images share a filename",
      "Thumbnails are generated in under 500 ms each locally"
    ],
    "architecture": "A Python HTTP service using the standard library http.server: an upload handler validates the magic bytes and size, saves the original under a SHA-256 filename, and a processing module decodes the image and writes resized copies with a pure-Python image helper (or Pillow when installed, with the stdlib path as the fallback). A small SQLite index records images and their variants.",
    "databaseSchema": "images: id INTEGER PK, hash TEXT UNIQUE, original_name TEXT, width INTEGER, height INTEGER, created_at TEXT; variants: id INTEGER PK, image_id INTEGER FK, width INTEGER, path TEXT",
    "fileStructure": "image-thumbnails/\n  thumbs/\n    __init__.py\n    server.py\n    images.py\n    store.py\n  tests/\n    test_images.py\n    test_server.py\n  README.md",
    "taskBreakdown": [
      "Set up the HTTP server and storage layout",
      "Implement upload validation",
      "Implement resizing with aspect-ratio preservation",
      "Add the thumbnail variants and serving",
      "Add listing and deletion",
      "Write tests with generated images",
      "Document the API in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-image-thumbnail-service-m1",
        "order": 1,
        "title": "Server, storage and uploads",
        "objectives": [
          "Serve HTTP with the standard library",
          "Accept an upload",
          "Store the original safely"
        ],
        "instructions": "Create the HTTP server with an upload endpoint that reads a multipart body, checks the magic bytes for PNG or JPEG, rejects anything larger than 5 MB, and saves the original under a filename derived from its SHA-256 hash. Record the image in SQLite and return its id.",
        "concepts": [
          "http.server",
          "Magic bytes",
          "Content addressing"
        ],
        "hints": [
          "Check magic bytes, not the file extension.",
          "Hash the content for the filename.",
          "Reject oversized uploads before reading the whole body."
        ],
        "acceptanceCriteria": [
          "A valid PNG uploads and is stored",
          "A text file renamed .png is rejected",
          "A 6 MB file is rejected"
        ],
        "tests": [
          "Upload a PNG and check the stored file",
          "Upload a text file with a .png name",
          "Upload an oversized file"
        ]
      },
      {
        "id": "proj-portfolio-image-thumbnail-service-m2",
        "order": 2,
        "title": "Resizing without distortion",
        "objectives": [
          "Decode image dimensions",
          "Resize preserving aspect ratio",
          "Write the three variants"
        ],
        "instructions": "Implement the resize helper: read the image dimensions, compute the scale factor for each target width, and write resized copies at 150, 300 and 600 pixels wide with the height scaled by the same factor. A square image stays square; a wide image stays wide.",
        "concepts": [
          "Aspect ratio",
          "Image scaling",
          "Dimensions"
        ],
        "hints": [
          "Compute one scale factor per variant and apply it to both dimensions.",
          "Never upscale an image smaller than the target width.",
          "Store the variant dimensions in the database."
        ],
        "acceptanceCriteria": [
          "All three variants exist after upload",
          "Each variant keeps the original aspect ratio",
          "A small image is not upscaled"
        ],
        "tests": [
          "Upload a 1200x800 image and check variant sizes",
          "Upload a square image",
          "Upload a 100-pixel-wide image"
        ]
      },
      {
        "id": "proj-portfolio-image-thumbnail-service-m3",
        "order": 3,
        "title": "Serving, listing and caching",
        "objectives": [
          "Serve thumbnails over HTTP",
          "Add cache headers",
          "List stored images"
        ],
        "instructions": "Implement the serving endpoint that returns the requested variant with the correct content type and a Cache-Control header, and the list endpoint that returns each image with its dimensions and variant URLs. A request for a missing variant returns 404.",
        "concepts": [
          "HTTP responses",
          "Cache headers",
          "Content types"
        ],
        "hints": [
          "Set the content type from the stored format.",
          "Use a long max-age since the URL is content-addressed.",
          "Return 404 for an unknown image id."
        ],
        "acceptanceCriteria": [
          "A thumbnail is served with the right content type",
          "The response includes a Cache-Control header",
          "Listing shows dimensions and variant URLs"
        ],
        "tests": [
          "Fetch a thumbnail and check its headers",
          "Fetch a missing image",
          "List the stored images"
        ]
      },
      {
        "id": "proj-portfolio-image-thumbnail-service-m4",
        "order": 4,
        "title": "Deletion, tests and docs",
        "objectives": [
          "Delete images and variants",
          "Test the service",
          "Document the API"
        ],
        "instructions": "Implement deletion to remove the original, all variants and the database rows. Write tests that generate small PNG and JPEG fixtures, upload them, check variant dimensions, and test rejection cases, and finish the README with the API reference and storage layout.",
        "concepts": [
          "Deletion",
          "Test fixtures",
          "Documentation"
        ],
        "hints": [
          "Generate test images in code; do not check in binaries.",
          "Test every rejection case.",
          "Document the content-addressed layout."
        ],
        "acceptanceCriteria": [
          "Deleting removes files and database rows",
          "All tests pass",
          "The README documents every endpoint"
        ],
        "tests": [
          "Upload, delete and verify the files are gone",
          "Run the test suite",
          "Follow the README to upload and fetch a thumbnail"
        ]
      }
    ],
    "reviewChecklist": [
      "Non-images are rejected by magic bytes",
      "Thumbnails preserve the aspect ratio",
      "Filenames are content-addressed",
      "Thumbnails are served with cache headers",
      "Deletion removes files and database rows"
    ],
    "finalAssessment": [
      "Upload a PNG and show its three variants",
      "Show the aspect ratio is preserved",
      "Attempt to upload a fake image",
      "Fetch a thumbnail and inspect its headers",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "POST /upload — multipart image upload, returns the image id and variant URLs",
      "GET /images/{id}/{width} — serve a thumbnail",
      "GET /images — list stored images",
      "DELETE /images/{id} — delete an image and its thumbnails"
    ]
  },
  {
    "id": "proj-portfolio-log-analyzer",
    "slug": "log-analyzer",
    "level": 2,
    "title": "Log File Analyzer",
    "description": "Build a tool that reads web server access logs and produces a traffic report: requests per hour, the most visited pages, status code breakdowns, the slowest requests, and suspicious patterns such as repeated 404s from one address. It is the kind of operational tooling every backend team needs, built with nothing but the standard library.",
    "skills": [
      "Python",
      "Log parsing",
      "Regular expressions",
      "CLI design",
      "Reporting",
      "Anomaly detection",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Parse Common Log Format and Combined Log Format lines",
      "Report total requests, unique visitors and bytes served",
      "Show requests per hour as a text chart",
      "List the top 10 requested paths and the top 10 referrers",
      "Break down responses by status code class",
      "List the slowest requests by response time when the log includes it",
      "Flag addresses with more than 50 failed requests in an hour",
      "Skip malformed lines, count them, and report the count"
    ],
    "nonFunctionalRequirements": [
      "Malformed lines are counted and skipped, never fatal",
      "All counts match a hand-checked sample",
      "The tool streams the file and handles a 1 GB log",
      "Reports are reproducible: same input, same output"
    ],
    "architecture": "A package with a parser module using one compiled regular expression per format, an aggregator that keeps counters and per-hour buckets in dictionaries, a detector that tracks failures per address per hour, and a report module that renders text tables and a simple bar chart. The file is read line by line so memory stays flat.",
    "databaseSchema": "",
    "fileStructure": "log-analyzer/\n  loganalyze/\n    __init__.py\n    __main__.py\n    cli.py\n    parser.py\n    aggregate.py\n    detect.py\n    report.py\n  tests/\n    test_parser.py\n    test_aggregate.py\n  data/\n    sample.log\n  README.md",
    "taskBreakdown": [
      "Design the log formats to support",
      "Implement the line parser",
      "Implement aggregation",
      "Build the report",
      "Add the suspicious-activity detector",
      "Write tests with a hand-checked sample",
      "Document usage in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-log-analyzer-m1",
        "order": 1,
        "title": "Parsing log lines",
        "objectives": [
          "Parse Common Log Format",
          "Parse Combined Log Format",
          "Count malformed lines"
        ],
        "instructions": "Write the parser with compiled regular expressions for both formats, extracting the address, timestamp, method, path, status, bytes, referrer and user agent. Lines that match neither format are counted as malformed and skipped. Test against a hand-written sample log with known values.",
        "concepts": [
          "Regular expressions",
          "Log formats",
          "Defensive parsing"
        ],
        "hints": [
          "Compile the patterns once at import time.",
          "Keep a count of malformed lines and report it.",
          "Parse the timestamp into a real datetime."
        ],
        "acceptanceCriteria": [
          "Every well-formed sample line parses correctly",
          "Malformed lines are counted, not fatal",
          "Timestamps parse to datetimes"
        ],
        "tests": [
          "Parse the sample log and check each field",
          "Parse a line with a missing referrer",
          "Parse a garbage line"
        ]
      },
      {
        "id": "proj-portfolio-log-analyzer-m2",
        "order": 2,
        "title": "Aggregation: counts and top lists",
        "objectives": [
          "Count requests, visitors and bytes",
          "Build the top-10 lists",
          "Break down status codes"
        ],
        "instructions": "Implement the aggregator: totals, unique addresses, bytes served, per-path and per-referrer counters, status-code class counts, and per-hour buckets. Verify every number against the hand-checked sample log before moving on.",
        "concepts": [
          "Counters",
          "Aggregation",
          "Dictionaries"
        ],
        "hints": [
          "Use collections.Counter for the top lists.",
          "Count unique visitors with a set of addresses.",
          "Group status codes by their first digit."
        ],
        "acceptanceCriteria": [
          "Totals match the hand-checked sample",
          "Top-10 paths are in the right order",
          "Status classes add up to the total"
        ],
        "tests": [
          "Analyse the sample log and compare every number",
          "Analyse an empty log",
          "Analyse a log with one line"
        ]
      },
      {
        "id": "proj-portfolio-log-analyzer-m3",
        "order": 3,
        "title": "Hourly chart and slow requests",
        "objectives": [
          "Render requests per hour as a chart",
          "List the slowest requests",
          "Add the JSON report option"
        ],
        "instructions": "Implement the hourly text bar chart scaled to the busiest hour, and the slowest-requests list for logs that include response time. Add the --json option to write the same report as structured JSON so other tools can consume it.",
        "concepts": [
          "Text charts",
          "Sorting",
          "JSON output"
        ],
        "hints": [
          "Scale the chart to the busiest hour.",
          "The JSON report must contain the same numbers as the text report.",
          "Handle logs without response times by omitting that section."
        ],
        "acceptanceCriteria": [
          "The hourly chart has one bar per hour",
          "The slowest list is sorted correctly",
          "The JSON report matches the text report"
        ],
        "tests": [
          "Analyse a log spanning three hours",
          "Analyse a log with response times",
          "Compare the JSON and text reports"
        ]
      },
      {
        "id": "proj-portfolio-log-analyzer-m4",
        "order": 4,
        "title": "Suspicious activity, tests and docs",
        "objectives": [
          "Flag repeated failures per address",
          "Test the whole pipeline",
          "Document the formats"
        ],
        "instructions": "Implement the detector: group failed requests (status 400 and above) by address and hour, and flag any address with more than 50 in one hour. Write tests for the parser, aggregator and detector, generate a large test log to check streaming performance, and document the supported formats in the README.",
        "concepts": [
          "Anomaly detection",
          "Thresholds",
          "Performance testing"
        ],
        "hints": [
          "Group failures by address and hour, not just address.",
          "Document the 50-per-hour threshold.",
          "Generate the large log with a script."
        ],
        "acceptanceCriteria": [
          "An address with 60 failures in an hour is flagged",
          "An address with 40 is not flagged",
          "All tests pass"
        ],
        "tests": [
          "Analyse a log with a scanning address",
          "Time the analysis of a large generated log",
          "Run the test suite"
        ]
      }
    ],
    "reviewChecklist": [
      "Malformed lines are counted and skipped",
      "All counts match the hand-checked sample",
      "Status classes add up to the total",
      "The JSON report matches the text report",
      "Suspicious addresses are flagged at the documented threshold"
    ],
    "finalAssessment": [
      "Analyse the sample log and walk through the report",
      "Show the hourly chart and the top-10 lists",
      "Show the slowest requests",
      "Demonstrate a flagged address",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: loganalyze access.log [--top N] [--format auto|common|combined]",
      "CLI: loganalyze access.log --json report.json"
    ]
  },
  {
    "id": "proj-portfolio-quiz-generator",
    "slug": "quiz-generator",
    "level": 2,
    "title": "Quiz Generator from Text",
    "description": "Build a tool that turns a study text into a practice quiz: it extracts key terms and definitions, generates multiple-choice questions with plausible distractors, and runs an interactive quiz session with a score at the end. It shows how far simple text processing can go before any machine learning is needed.",
    "skills": [
      "Python",
      "Text processing",
      "Question generation",
      "CLI design",
      "JSON data",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Read a study text in plain text or Markdown",
      "Extract key terms: capitalised phrases and words from a glossary section",
      "Generate multiple-choice questions with one correct answer and three distractors",
      "Generate fill-in-the-blank questions from definition sentences",
      "Run an interactive quiz session and report the score",
      "Save a generated quiz as JSON for reuse",
      "Shuffle question and answer order on every run",
      "Reject a text too short to generate questions from"
    ],
    "nonFunctionalRequirements": [
      "Every generated question has exactly one correct answer",
      "Distractors come from the same text, never from thin air",
      "A text under 200 words is rejected with a clear message",
      "Shuffling never changes which answer is correct"
    ],
    "architecture": "A package with a text module that splits the input into sentences and extracts candidate terms, a generator that builds multiple-choice questions by pairing a term with its definition and picking distractors from other terms, and a runner that presents questions, reads answers and scores them. Quizzes are stored as JSON.",
    "databaseSchema": "",
    "fileStructure": "quiz-generator/\n  quizgen/\n    __init__.py\n    __main__.py\n    cli.py\n    text.py\n    generate.py\n    runner.py\n  tests/\n    test_generate.py\n    test_text.py\n  data/\n    sample-notes.txt\n  README.md",
    "taskBreakdown": [
      "Design the quiz JSON format",
      "Implement term extraction",
      "Implement question generation",
      "Build the interactive runner",
      "Add shuffling and saving",
      "Write tests with the sample notes",
      "Document the workflow in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-quiz-generator-m1",
        "order": 1,
        "title": "Text input and term extraction",
        "objectives": [
          "Read plain text and Markdown",
          "Split into sentences",
          "Extract candidate terms"
        ],
        "instructions": "Implement the text module to read the input, strip Markdown headings and formatting, split into sentences, and extract candidate terms: capitalised multi-word phrases and any glossary entries of the form 'Term: definition'. Return terms with their source sentence.",
        "concepts": [
          "Text processing",
          "Sentence splitting",
          "Markdown stripping"
        ],
        "hints": [
          "Strip Markdown markers before extracting terms.",
          "A term needs its source sentence to become a question.",
          "Ignore sentences shorter than three words."
        ],
        "acceptanceCriteria": [
          "Terms are extracted from the sample notes",
          "Each term has a source sentence",
          "Markdown formatting does not leak into terms"
        ],
        "tests": [
          "Extract terms from the sample notes",
          "Extract from a text with a glossary section",
          "Extract from an empty file"
        ]
      },
      {
        "id": "proj-portfolio-quiz-generator-m2",
        "order": 2,
        "title": "Question generation",
        "objectives": [
          "Build multiple-choice questions",
          "Pick plausible distractors",
          "Build fill-in-the-blank questions"
        ],
        "instructions": "Implement the generator: for each term, build a multiple-choice question asking for its definition, with three distractors drawn from other terms' definitions, and a fill-in-the-blank question that blanks the term out of its source sentence. Every question records its correct answer index.",
        "concepts": [
          "Distractor selection",
          "Question design",
          "Random sampling"
        ],
        "hints": [
          "Distractors must be real definitions from the same text.",
          "Never use the correct definition as a distractor.",
          "Shuffle the options and update the answer index."
        ],
        "acceptanceCriteria": [
          "Every question has one correct answer and three distractors",
          "Distractors come from the same text",
          "Fill-in-the-blank blanks exactly the term"
        ],
        "tests": [
          "Generate a quiz and inspect every question",
          "Generate twice and check the answers still match",
          "Generate from a text with only two terms"
        ]
      },
      {
        "id": "proj-portfolio-quiz-generator-m3",
        "order": 3,
        "title": "Interactive quiz runner",
        "objectives": [
          "Present questions one by one",
          "Read and score answers",
          "Report the final score"
        ],
        "instructions": "Implement the runner: load a quiz JSON, shuffle the question order, present each question with lettered options, read the user's answer, give immediate feedback, and print the final score with the questions answered wrong. Support running directly from a text file by generating first.",
        "concepts": [
          "Interactive CLI",
          "Scoring",
          "Feedback"
        ],
        "hints": [
          "Accept answers case-insensitively.",
          "Show the correct answer after a wrong one.",
          "The score is the count of correct answers over total."
        ],
        "acceptanceCriteria": [
          "A correct answer is scored correct",
          "A wrong answer shows the correct one",
          "The final score matches the answers given"
        ],
        "tests": [
          "Run a quiz answering everything correctly",
          "Run answering everything wrong",
          "Run with an invalid answer letter"
        ]
      },
      {
        "id": "proj-portfolio-quiz-generator-m4",
        "order": 4,
        "title": "Validation, tests and docs",
        "objectives": [
          "Reject texts that are too short",
          "Test generation",
          "Document the workflow"
        ],
        "instructions": "Reject input texts under 200 words with a clear message, and reject generation when fewer than four terms are found. Write tests for extraction, distractor selection, shuffling correctness and scoring, and document the full workflow with an example in the README.",
        "concepts": [
          "Input validation",
          "Testing",
          "Documentation"
        ],
        "hints": [
          "Test that shuffling never breaks the answer index.",
          "Test generation from the sample notes end to end.",
          "Document the minimum input size."
        ],
        "acceptanceCriteria": [
          "A 50-word text is rejected",
          "All tests pass",
          "The README shows a full example"
        ],
        "tests": [
          "Generate from a tiny text",
          "Run the test suite",
          "Follow the README from scratch"
        ]
      }
    ],
    "reviewChecklist": [
      "Every question has exactly one correct answer",
      "Distractors come from the same text",
      "Shuffling never breaks the answer index",
      "Short texts are rejected clearly",
      "The final score matches the answers given"
    ],
    "finalAssessment": [
      "Generate a quiz from the sample notes and inspect it",
      "Run the quiz and answer questions",
      "Show the final score and review",
      "Demonstrate the short-text rejection",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: quizgen generate --input notes.txt --out quiz.json [--count N]",
      "CLI: quizgen run --quiz quiz.json",
      "CLI: quizgen run --input notes.txt (generate and run in one step)"
    ]
  },
  {
    "id": "proj-portfolio-link-checker",
    "slug": "link-checker",
    "level": 2,
    "title": "Link Checker for Websites",
    "description": "Build a tool that crawls a website or a folder of HTML files and reports every broken link: it checks internal links, external links and images, follows redirects, and prints a report grouped by the page that contains the broken link. It is the kind of quality tooling that keeps documentation sites and portfolios honest.",
    "skills": [
      "Python",
      "HTML parsing",
      "HTTP requests",
      "Web crawling",
      "Concurrency",
      "Reporting",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Crawl a website starting from one URL, or scan a folder of HTML files",
      "Check every internal link, external link and image source",
      "Follow redirects and report the final status",
      "Report broken links grouped by the page that contains them",
      "Skip links to anchors on the same page when the anchor exists",
      "Respect a maximum crawl depth and a maximum page count",
      "Cache external link results within a run so a URL is checked once",
      "Write the report as text and as JSON"
    ],
    "nonFunctionalRequirements": [
      "The same URL is never checked twice in one run",
      "A page that returns 404 is reported, not treated as a crash",
      "External checks use a timeout and a user agent",
      "Crawling stays within the starting host unless told otherwise"
    ],
    "architecture": "A package with a crawler that keeps a queue of URLs, a visited set and a depth counter; an HTML parser built on html.parser that extracts href and src attributes; a checker that issues HEAD requests with a fallback to GET; and a reporter that groups failures by source page. External checks run with a small thread pool.",
    "databaseSchema": "",
    "fileStructure": "link-checker/\n  linkcheck/\n    __init__.py\n    __main__.py\n    cli.py\n    crawler.py\n    extract.py\n    check.py\n    report.py\n  tests/\n    test_extract.py\n    test_check.py\n    test_crawler.py\n  README.md",
    "taskBreakdown": [
      "Design the crawl model",
      "Implement link extraction",
      "Implement the link checker",
      "Build the crawler with depth limits",
      "Build the report",
      "Write tests with a local site fixture",
      "Document usage in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-link-checker-m1",
        "order": 1,
        "title": "Link extraction from HTML",
        "objectives": [
          "Parse HTML with html.parser",
          "Extract links and image sources",
          "Resolve relative URLs"
        ],
        "instructions": "Implement the extractor on top of html.parser: collect href attributes from a tags and src attributes from img tags, resolve relative URLs against the page URL, and skip mailto and javascript links. Test it on a fixture page with absolute, relative, anchor and image links.",
        "concepts": [
          "html.parser",
          "URL resolution",
          "Attribute extraction"
        ],
        "hints": [
          "Use urllib.parse.urljoin for relative URLs.",
          "Skip mailto: and javascript: links explicitly.",
          "Record which page each link came from."
        ],
        "acceptanceCriteria": [
          "All links on the fixture page are extracted",
          "Relative links resolve to absolute URLs",
          "mailto links are skipped"
        ],
        "tests": [
          "Extract links from the fixture page",
          "Extract from a page with only images",
          "Extract from an empty page"
        ]
      },
      {
        "id": "proj-portfolio-link-checker-m2",
        "order": 2,
        "title": "Checking links",
        "objectives": [
          "Issue HEAD requests with a GET fallback",
          "Follow redirects",
          "Handle timeouts and errors"
        ],
        "instructions": "Implement the checker: try a HEAD request with a 10-second timeout and a user agent, fall back to GET when the server rejects HEAD, and record the final status after redirects. Network errors are recorded as failures with the error message, not raised.",
        "concepts": [
          "HTTP HEAD",
          "Redirects",
          "Timeouts"
        ],
        "hints": [
          "Always set a timeout.",
          "Some servers reject HEAD; the GET fallback matters.",
          "Record the final URL after redirects."
        ],
        "acceptanceCriteria": [
          "A live link reports 200",
          "A missing link reports 404",
          "A redirect reports the final status"
        ],
        "tests": [
          "Check a local test server's good and missing pages",
          "Check a redirecting URL",
          "Check an unreachable host"
        ]
      },
      {
        "id": "proj-portfolio-link-checker-m3",
        "order": 3,
        "title": "Crawling with limits",
        "objectives": [
          "Crawl from a starting URL",
          "Enforce depth and page limits",
          "Stay on the starting host"
        ],
        "instructions": "Implement the crawler with a queue, a visited set and depth tracking: start from the seed URL, extract links from each fetched page, enqueue same-host links within the depth limit, and check every discovered link once. Stop when the page limit is reached and report that the crawl was truncated.",
        "concepts": [
          "Breadth-first crawl",
          "Visited sets",
          "Depth limits"
        ],
        "hints": [
          "Check the visited set before fetching.",
          "Normalise URLs so the same page with a trailing slash is not fetched twice.",
          "Report truncation clearly."
        ],
        "acceptanceCriteria": [
          "A small local site is fully crawled",
          "The depth limit is respected",
          "External hosts are not crawled"
        ],
        "tests": [
          "Crawl a local fixture site",
          "Crawl with --max-depth 1",
          "Crawl a site linking to an external host"
        ]
      },
      {
        "id": "proj-portfolio-link-checker-m4",
        "order": 4,
        "title": "Reports, tests and docs",
        "objectives": [
          "Group broken links by source page",
          "Write text and JSON reports",
          "Test end to end"
        ],
        "instructions": "Implement the reporter: list each broken link with its status, the page that contains it, and the link text; summarise totals at the end. Add the --json option with the same data. Write tests for extraction, checking and the full crawl against a local fixture site, and document usage in the README.",
        "concepts": [
          "Reporting",
          "JSON output",
          "Test fixtures"
        ],
        "hints": [
          "Group by source page so fixes are easy.",
          "The JSON report must match the text report.",
          "Serve the fixture site with http.server in tests."
        ],
        "acceptanceCriteria": [
          "The report groups broken links by page",
          "The JSON report matches the text report",
          "All tests pass"
        ],
        "tests": [
          "Crawl the fixture site and read the report",
          "Run the test suite",
          "Check a folder of local HTML files"
        ]
      }
    ],
    "reviewChecklist": [
      "The same URL is checked once per run",
      "Broken links are grouped by source page",
      "Depth and page limits are respected",
      "Crawling stays on the starting host",
      "Network errors are reported, not raised"
    ],
    "finalAssessment": [
      "Crawl a fixture site and walk through the report",
      "Show a redirect being followed",
      "Show the JSON report",
      "Demonstrate the depth limit",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: linkcheck https://example.com [--max-depth 3] [--max-pages 200] [--json report.json]",
      "CLI: linkcheck --local ./site"
    ]
  },
  {
    "id": "proj-portfolio-sentiment-analyzer",
    "slug": "sentiment-analyzer",
    "level": 3,
    "title": "Sentiment Analyzer for Reviews",
    "description": "Build a sentiment analyzer that classifies product reviews as positive, negative or neutral using a lexicon and simple scoring, then aggregates the results into a report: average sentiment per product, the most positive and most negative reviews, and the words that drive the score. It is a complete small NLP project with honest, explainable results.",
    "skills": [
      "Python",
      "Natural language processing",
      "Lexicon-based classification",
      "Text processing",
      "Reporting",
      "CSV and JSON",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Classify a single review as positive, negative or neutral",
      "Read reviews from a CSV file with product, rating and text columns",
      "Score reviews with a word lexicon plus negation handling",
      "Report average sentiment per product",
      "List the most positive and most negative reviews",
      "Show the words that most influenced each classification",
      "Compare the classifier against the star ratings in the data",
      "Handle reviews in mixed case with punctuation and common misspellings of key words"
    ],
    "nonFunctionalRequirements": [
      "The classifier explains every decision with its top contributing words",
      "Negation flips the sentiment of the following word",
      "Accuracy against star ratings is measured and reported, never hidden",
      "A review with no sentiment words is classified neutral"
    ],
    "architecture": "A package with a lexicon module (positive and negative word lists with weights, plus intensifiers and negations), a scorer that tokenises text, applies negation windows and sums weights, a classifier that maps the score to a label with a neutral band, and a reporter that aggregates per product and compares against star ratings.",
    "databaseSchema": "",
    "fileStructure": "sentiment-analyzer/\n  sentiment/\n    __init__.py\n    __main__.py\n    cli.py\n    lexicon.py\n    scorer.py\n    report.py\n  data/\n    lexicon.json\n    sample-reviews.csv\n  tests/\n    test_scorer.py\n    test_report.py\n  README.md",
    "taskBreakdown": [
      "Design the lexicon format",
      "Implement tokenisation and scoring",
      "Add negation and intensifiers",
      "Build the CSV analysis and report",
      "Add the accuracy evaluation",
      "Write tests with hand-scored reviews",
      "Document the approach in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-sentiment-analyzer-m1",
        "order": 1,
        "title": "Lexicon and tokenisation",
        "objectives": [
          "Define the lexicon format",
          "Tokenise review text",
          "Score a single review"
        ],
        "instructions": "Create the lexicon JSON with positive words, negative words, weights, intensifiers and negations. Implement tokenisation that lowercases, strips punctuation and splits on whitespace, then a scorer that sums the weights of lexicon words found in the text.",
        "concepts": [
          "Lexicons",
          "Tokenisation",
          "Weighted scoring"
        ],
        "hints": [
          "Keep the lexicon in a data file, not in code.",
          "Tokenise the same way in every module.",
          "Start with a small lexicon and grow it from errors."
        ],
        "acceptanceCriteria": [
          "A clearly positive review scores positive",
          "A clearly negative review scores negative",
          "A neutral review scores near zero"
        ],
        "tests": [
          "Classify three hand-written reviews",
          "Classify a review with no sentiment words",
          "Check the score of a mixed review"
        ]
      },
      {
        "id": "proj-portfolio-sentiment-analyzer-m2",
        "order": 2,
        "title": "Negation, intensifiers and labels",
        "objectives": [
          "Flip sentiment after negations",
          "Boost scores with intensifiers",
          "Map scores to labels"
        ],
        "instructions": "Extend the scorer: a negation word flips the sign of the next sentiment word within three words, and an intensifier multiplies the following sentiment word by 1.5. Map the final score to positive, negative or neutral with a neutral band around zero, and return the top contributing words for every classification.",
        "concepts": [
          "Negation handling",
          "Intensifiers",
          "Classification thresholds"
        ],
        "hints": [
          "Limit the negation window to three words.",
          "Record which words contributed, for explainability.",
          "Document the neutral band you chose."
        ],
        "acceptanceCriteria": [
          "'not good' is classified negative",
          "'very good' scores higher than 'good'",
          "Every result lists its top words"
        ],
        "tests": [
          "Classify 'not good' and 'not bad'",
          "Classify 'very good' versus 'good'",
          "Check the explanation words"
        ]
      },
      {
        "id": "proj-portfolio-sentiment-analyzer-m3",
        "order": 3,
        "title": "CSV analysis and reporting",
        "objectives": [
          "Read reviews from CSV",
          "Aggregate sentiment per product",
          "List extreme reviews"
        ],
        "instructions": "Implement the analysis command: read the CSV, classify each review, and report per product the review count, average score, and the share of positive, neutral and negative reviews, plus the five most positive and five most negative reviews overall with their explanations.",
        "concepts": [
          "CSV processing",
          "Aggregation",
          "Reporting"
        ],
        "hints": [
          "Skip rows with empty text and count them.",
          "Aggregate with dictionaries, then sort.",
          "The report must include the explanation words."
        ],
        "acceptanceCriteria": [
          "Per-product averages match hand-checked values",
          "The most positive review is genuinely positive",
          "Empty rows are counted, not fatal"
        ],
        "tests": [
          "Analyse the sample reviews file",
          "Check a per-product average by hand",
          "Analyse a file with an empty row"
        ]
      },
      {
        "id": "proj-portfolio-sentiment-analyzer-m4",
        "order": 4,
        "title": "Evaluation, tests and docs",
        "objectives": [
          "Measure accuracy against star ratings",
          "Test the scorer",
          "Document the limitations"
        ],
        "instructions": "Implement the evaluate command: treat 4-5 star reviews as positive, 3 as neutral and 1-2 as negative, and report accuracy and a confusion matrix. Write tests for scoring, negation, intensifiers and aggregation, and document in the README that the classifier is lexicon-based, what it gets wrong, and how to improve it.",
        "concepts": [
          "Evaluation",
          "Confusion matrix",
          "Documentation"
        ],
        "hints": [
          "Report accuracy honestly, including the errors.",
          "Test negation and intensifiers explicitly.",
          "State the limitations in the README."
        ],
        "acceptanceCriteria": [
          "Accuracy and the confusion matrix are reported",
          "All tests pass",
          "The README states the limitations"
        ],
        "tests": [
          "Evaluate the sample reviews",
          "Run the test suite",
          "Show a review the classifier gets wrong and explain why"
        ]
      }
    ],
    "reviewChecklist": [
      "Every classification lists its contributing words",
      "Negation flips the following sentiment word",
      "Accuracy is measured and reported honestly",
      "A review with no sentiment words is neutral",
      "Empty CSV rows are counted, not fatal"
    ],
    "finalAssessment": [
      "Classify three reviews and explain each score",
      "Show negation and intensifier handling",
      "Analyse the sample reviews file",
      "Show the accuracy evaluation",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: sentiment classify --text \"I loved this product\"",
      "CLI: sentiment analyze --input reviews.csv [--out report.json]",
      "CLI: sentiment evaluate --input reviews.csv"
    ]
  },
  {
    "id": "proj-portfolio-house-price-predictor",
    "slug": "house-price-predictor",
    "level": 3,
    "title": "House Price Predictor",
    "description": "Build a house-price predictor using linear regression implemented from scratch with only the standard library: load a housing dataset, train the model with gradient descent, evaluate it with mean absolute error, and serve predictions over the command line. It teaches the whole ML workflow — data, training, evaluation, and honest error reporting — without hiding behind a framework.",
    "skills": [
      "Python",
      "Linear regression",
      "Gradient descent",
      "Machine learning",
      "Data preprocessing",
      "Evaluation metrics",
      "CLI design",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Load a housing CSV with size, bedrooms, age and price columns",
      "Handle missing values by imputing the column median",
      "Normalise features before training",
      "Train a linear regression model with gradient descent",
      "Report mean absolute error and R-squared on a held-out test set",
      "Save the trained model to a JSON file and load it for predictions",
      "Predict a price from the command line for a new house",
      "Show which features influence the price most"
    ],
    "nonFunctionalRequirements": [
      "Training uses only the Python standard library",
      "Features are normalised with statistics from the training set only",
      "The test set is never used during training",
      "Predictions are reported with the model's test error alongside them"
    ],
    "architecture": "A package with a data module that loads and cleans the CSV and splits it into train and test sets, a model module implementing linear regression with gradient descent and feature normalisation, an evaluation module computing MAE and R-squared, and a CLI that trains, evaluates and predicts from a saved JSON model file.",
    "databaseSchema": "",
    "fileStructure": "house-price-predictor/\n  houseprice/\n    __init__.py\n    __main__.py\n    cli.py\n    data.py\n    model.py\n    evaluate.py\n  data/\n    housing.csv\n  tests/\n    test_model.py\n    test_data.py\n  README.md",
    "taskBreakdown": [
      "Generate or obtain the housing dataset",
      "Implement loading, cleaning and splitting",
      "Implement linear regression with gradient descent",
      "Add evaluation metrics",
      "Add model saving and prediction",
      "Write tests with a synthetic dataset",
      "Document the workflow in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-house-price-predictor-m1",
        "order": 1,
        "title": "Data loading and cleaning",
        "objectives": [
          "Load the housing CSV",
          "Impute missing values with the median",
          "Split into train and test sets"
        ],
        "instructions": "Implement the data module: read the CSV, convert columns to floats, replace missing values with the training column median, and split 80/20 into train and test sets with a fixed random seed so the split is reproducible.",
        "concepts": [
          "Data cleaning",
          "Median imputation",
          "Train/test split"
        ],
        "hints": [
          "Compute the median from the training rows only.",
          "Use a fixed seed so results are reproducible.",
          "Count and report the missing values found."
        ],
        "acceptanceCriteria": [
          "Missing values are filled with the median",
          "The split is 80/20 and reproducible",
          "The missing-value count is reported"
        ],
        "tests": [
          "Load the sample data and check the counts",
          "Load a file with missing values",
          "Split twice and compare"
        ]
      },
      {
        "id": "proj-portfolio-house-price-predictor-m2",
        "order": 2,
        "title": "Linear regression with gradient descent",
        "objectives": [
          "Normalise features",
          "Implement gradient descent",
          "Train until convergence"
        ],
        "instructions": "Implement the model: normalise each feature with the training mean and standard deviation, initialise weights to zero, and run gradient descent on the mean squared error with a configurable learning rate and iteration count, stopping early when the loss stops improving.",
        "concepts": [
          "Feature normalisation",
          "Gradient descent",
          "Loss functions"
        ],
        "hints": [
          "Normalise with training statistics only; apply the same to test data.",
          "Start with a small learning rate and watch the loss.",
          "Store the normalisation statistics in the saved model."
        ],
        "acceptanceCriteria": [
          "Training loss decreases over iterations",
          "The model learns a sensible weight for house size",
          "Training converges before the iteration limit"
        ],
        "tests": [
          "Train on the sample data and print the loss curve",
          "Train with a tiny learning rate and compare",
          "Check the learned weights"
        ]
      },
      {
        "id": "proj-portfolio-house-price-predictor-m3",
        "order": 3,
        "title": "Evaluation: MAE and R-squared",
        "objectives": [
          "Compute mean absolute error",
          "Compute R-squared",
          "Compare against a baseline"
        ],
        "instructions": "Implement evaluation: predict the test set, compute MAE and R-squared, and compare against a baseline that always predicts the training mean price. The model must beat the baseline clearly, or the report must say so.",
        "concepts": [
          "Mean absolute error",
          "R-squared",
          "Baselines"
        ],
        "hints": [
          "Always compare against the mean baseline.",
          "Report MAE in the same currency as the price.",
          "Evaluate on the test set only."
        ],
        "acceptanceCriteria": [
          "MAE and R-squared are reported",
          "The model beats the mean baseline",
          "Evaluation uses only the test set"
        ],
        "tests": [
          "Evaluate the trained model",
          "Evaluate the baseline for comparison",
          "Evaluate with a shuffled test set"
        ]
      },
      {
        "id": "proj-portfolio-house-price-predictor-m4",
        "order": 4,
        "title": "Saving, prediction and docs",
        "objectives": [
          "Save the model to JSON",
          "Predict from the CLI",
          "Show feature importance"
        ],
        "instructions": "Implement model saving to JSON including weights, normalisation statistics and test metrics, and the predict command that loads the model, normalises the input the same way, and prints the predicted price alongside the model's test MAE. Add a feature-importance listing ranked by absolute weight, and document the workflow in the README.",
        "concepts": [
          "Model serialisation",
          "Prediction",
          "Feature importance"
        ],
        "hints": [
          "Save the normalisation statistics with the weights.",
          "Always show the test MAE next to a prediction.",
          "Rank features by absolute weight."
        ],
        "acceptanceCriteria": [
          "A saved model loads and predicts",
          "The prediction includes the test MAE",
          "Feature importance is listed"
        ],
        "tests": [
          "Train, save, and predict a new house",
          "Predict with an extreme size and check the output",
          "Run the test suite"
        ]
      }
    ],
    "reviewChecklist": [
      "Training uses only the standard library",
      "Normalisation uses training statistics only",
      "The test set is never used for training",
      "Predictions are shown with the test MAE",
      "The model beats the mean baseline"
    ],
    "finalAssessment": [
      "Train the model and show the loss decreasing",
      "Evaluate and explain MAE and R-squared",
      "Predict the price of a new house",
      "Show which features matter most",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: houseprice train --data housing.csv --out model.json",
      "CLI: houseprice evaluate --model model.json --data housing.csv",
      "CLI: houseprice predict --model model.json --size 1500 --bedrooms 3 --age 10"
    ]
  },
  {
    "id": "proj-portfolio-spam-classifier",
    "slug": "spam-classifier",
    "level": 3,
    "title": "Spam Classifier",
    "description": "Build a spam filter using naive Bayes implemented from scratch: train it on labelled emails, classify new messages with a probability score, and evaluate precision, recall and accuracy on a held-out set. It is the classic first ML project, done properly — with a real train/test split, honest metrics, and an explanation for every decision.",
    "skills": [
      "Python",
      "Naive Bayes",
      "Text classification",
      "Machine learning",
      "Evaluation metrics",
      "CLI design",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Train on a labelled dataset of spam and ham messages",
      "Classify a new message with a spam probability",
      "Explain a classification with the most influential words",
      "Evaluate accuracy, precision, recall and F1 on a held-out test set",
      "Save the trained model and load it for classification",
      "Handle words never seen in training with smoothing",
      "Support training from a CSV file with label and text columns",
      "Report the confusion matrix"
    ],
    "nonFunctionalRequirements": [
      "Training uses only the Python standard library",
      "Unseen words are handled with Laplace smoothing",
      "The test set is never used during training",
      "Every classification can be explained with its top words"
    ],
    "architecture": "A package with a data module that loads labelled messages and splits them, a model module implementing multinomial naive Bayes with Laplace smoothing and log probabilities, an evaluation module computing accuracy, precision, recall, F1 and the confusion matrix, and a CLI for training, classifying and evaluating.",
    "databaseSchema": "",
    "fileStructure": "spam-classifier/\n  spam/\n    __init__.py\n    __main__.py\n    cli.py\n    data.py\n    model.py\n    evaluate.py\n  data/\n    emails.csv\n  tests/\n    test_model.py\n    test_data.py\n  README.md",
    "taskBreakdown": [
      "Obtain or generate the labelled dataset",
      "Implement loading and splitting",
      "Implement naive Bayes with smoothing",
      "Add evaluation metrics",
      "Add explanations and model saving",
      "Write tests with a tiny dataset",
      "Document the approach in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-spam-classifier-m1",
        "order": 1,
        "title": "Data loading and splitting",
        "objectives": [
          "Load labelled messages from CSV",
          "Clean and tokenise text",
          "Split into train and test sets"
        ],
        "instructions": "Implement the data module: read the CSV with label and text columns, lowercase and tokenise each message, and split 80/20 with a fixed seed, keeping the spam share similar in both sets.",
        "concepts": [
          "CSV loading",
          "Tokenisation",
          "Stratified splitting"
        ],
        "hints": [
          "Keep the class balance similar in train and test.",
          "Use a fixed seed for reproducibility.",
          "Count and report the class balance."
        ],
        "acceptanceCriteria": [
          "The dataset loads with labels",
          "The split preserves the spam share",
          "Tokenisation is consistent"
        ],
        "tests": [
          "Load the sample data and check the balance",
          "Split twice and compare",
          "Tokenise a message with punctuation"
        ]
      },
      {
        "id": "proj-portfolio-spam-classifier-m2",
        "order": 2,
        "title": "Naive Bayes training",
        "objectives": [
          "Count word frequencies per class",
          "Apply Laplace smoothing",
          "Compute log probabilities"
        ],
        "instructions": "Implement training: count how often each word appears in spam and ham, compute the class priors, and store log probabilities with Laplace smoothing so unseen words get a small non-zero probability instead of breaking the math.",
        "concepts": [
          "Naive Bayes",
          "Laplace smoothing",
          "Log probabilities"
        ],
        "hints": [
          "Work in log space to avoid underflow.",
          "Smooth every word, including unseen ones.",
          "Store the vocabulary with the model."
        ],
        "acceptanceCriteria": [
          "Training produces a model with priors and word probabilities",
          "An unseen word does not crash classification",
          "The spam prior matches the training share"
        ],
        "tests": [
          "Train on the sample data",
          "Classify a message with only unseen words",
          "Check the stored priors"
        ]
      },
      {
        "id": "proj-portfolio-spam-classifier-m3",
        "order": 3,
        "title": "Classification and explanations",
        "objectives": [
          "Classify with a probability",
          "Explain with top words",
          "Save and load the model"
        ],
        "instructions": "Implement classification: sum the log probabilities of the message's words for each class, add the prior, and convert the difference into a spam probability. Return the top words that pushed the score toward spam or ham. Implement saving the model to JSON and loading it back.",
        "concepts": [
          "Classification",
          "Explainability",
          "Model serialisation"
        ],
        "hints": [
          "Explain with the words that moved the score most.",
          "The probability must be between 0 and 1.",
          "A loaded model classifies identically to the original."
        ],
        "acceptanceCriteria": [
          "A spam message scores above 0.5",
          "A ham message scores below 0.5",
          "Explanations list the influential words"
        ],
        "tests": [
          "Classify a known spam message",
          "Classify a normal message",
          "Save, reload and classify again"
        ]
      },
      {
        "id": "proj-portfolio-spam-classifier-m4",
        "order": 4,
        "title": "Evaluation, tests and docs",
        "objectives": [
          "Compute accuracy, precision, recall and F1",
          "Show the confusion matrix",
          "Test the classifier"
        ],
        "instructions": "Implement evaluation on the held-out test set with accuracy, precision, recall, F1 and the confusion matrix, and report which test messages were misclassified. Write tests for training, smoothing, classification and evaluation on a tiny hand-built dataset, and document the approach and its limits in the README.",
        "concepts": [
          "Precision and recall",
          "F1 score",
          "Confusion matrix"
        ],
        "hints": [
          "Report all four metrics, not just accuracy.",
          "Show the misclassified examples.",
          "Test with a dataset where the answer is known."
        ],
        "acceptanceCriteria": [
          "All four metrics are reported",
          "The confusion matrix adds up to the test set size",
          "All tests pass"
        ],
        "tests": [
          "Evaluate the trained model",
          "Inspect the misclassified messages",
          "Run the test suite"
        ]
      }
    ],
    "reviewChecklist": [
      "Training uses only the standard library",
      "Unseen words are handled with smoothing",
      "The test set is never used for training",
      "Every classification is explained with words",
      "All four metrics are reported"
    ],
    "finalAssessment": [
      "Train the classifier and show the priors",
      "Classify a spam and a ham message with explanations",
      "Evaluate and explain precision and recall",
      "Show the confusion matrix",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: spam train --data emails.csv --out model.json",
      "CLI: spam classify --model model.json --text \"You have won a prize\"",
      "CLI: spam evaluate --model model.json --data emails.csv"
    ]
  },
  {
    "id": "proj-portfolio-sales-dashboard-report",
    "slug": "sales-dashboard-report",
    "level": 3,
    "title": "Sales Dashboard Report Generator",
    "description": "Build a tool that turns raw sales CSV files into a self-contained HTML dashboard: monthly revenue trends, top products, regional breakdowns, and a data quality section. It is the end-to-end data analyst workflow — ingest, clean, aggregate, visualise — producing a file a manager can open in a browser with no server.",
    "skills": [
      "Python",
      "Data analysis",
      "HTML generation",
      "Data visualisation",
      "CSV processing",
      "Reporting",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Read sales CSV files with order, date, product, region and amount columns",
      "Clean the data: parse dates, normalise regions, drop or flag bad rows",
      "Compute monthly revenue and growth versus the previous month",
      "Rank the top 10 products by revenue",
      "Break down revenue by region with shares",
      "Render a single self-contained HTML dashboard with tables and SVG charts",
      "Include a data quality section listing bad rows and their reasons",
      "Support multiple input files merged into one report"
    ],
    "nonFunctionalRequirements": [
      "Bad rows are listed in the report, never silently dropped",
      "All figures in the dashboard match the source data",
      "The HTML file works with no server and no external resources",
      "Money is computed in integer cents"
    ],
    "architecture": "A package with a loader that reads and cleans CSV rows, an analysis module that aggregates monthly revenue, product rankings and regional shares, a charts module that builds inline SVG bar and line charts, and a renderer that assembles one self-contained HTML file with embedded CSS and SVG.",
    "databaseSchema": "",
    "fileStructure": "sales-dashboard/\n  salesdash/\n    __init__.py\n    __main__.py\n    cli.py\n    load.py\n    analyse.py\n    charts.py\n    render.py\n  tests/\n    test_analyse.py\n    test_load.py\n  data/\n    sample-sales.csv\n  README.md",
    "taskBreakdown": [
      "Define the input format",
      "Implement loading and cleaning",
      "Implement monthly, product and region analysis",
      "Build SVG charts",
      "Build the HTML renderer",
      "Write tests with the sample data",
      "Document the format in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-sales-dashboard-report-m1",
        "order": 1,
        "title": "Loading and cleaning",
        "objectives": [
          "Read sales CSV files",
          "Parse dates and amounts",
          "Flag bad rows with reasons"
        ],
        "instructions": "Implement the loader: read one or more CSV files, parse dates into ISO format, convert amounts to integer cents, normalise region names, and collect bad rows with a reason instead of crashing. Report the count of good and bad rows.",
        "concepts": [
          "CSV processing",
          "Data cleaning",
          "Error reporting"
        ],
        "hints": [
          "Store money as integer cents.",
          "Normalise region names to a canonical list.",
          "Keep bad rows with their reason for the report."
        ],
        "acceptanceCriteria": [
          "Valid rows load cleanly",
          "Bad rows are listed with reasons",
          "Multiple files merge into one dataset"
        ],
        "tests": [
          "Load the sample file and check the counts",
          "Load a file with bad dates and amounts",
          "Load two files and check the total"
        ]
      },
      {
        "id": "proj-portfolio-sales-dashboard-report-m2",
        "order": 2,
        "title": "Analysis: monthly, product, region",
        "objectives": [
          "Compute monthly revenue and growth",
          "Rank products by revenue",
          "Break down revenue by region"
        ],
        "instructions": "Implement the analysis: group revenue by month and compute month-over-month growth, rank products by total revenue, and compute each region's revenue and share of the total. Verify the figures against hand-computed values from the sample data.",
        "concepts": [
          "Aggregation",
          "Grouping",
          "Growth rates"
        ],
        "hints": [
          "Compute growth against the previous month only.",
          "Sort products by revenue descending.",
          "Region shares must sum to 100 percent."
        ],
        "acceptanceCriteria": [
          "Monthly totals match hand-checked values",
          "The top product is correct",
          "Region shares sum to 100"
        ],
        "tests": [
          "Analyse the sample data and verify each figure",
          "Analyse a single-month file",
          "Analyse a file with one region"
        ]
      },
      {
        "id": "proj-portfolio-sales-dashboard-report-m3",
        "order": 3,
        "title": "SVG charts and HTML rendering",
        "objectives": [
          "Draw a monthly revenue line chart",
          "Draw a regional bar chart",
          "Assemble the dashboard HTML"
        ],
        "instructions": "Implement SVG charts: a line chart of monthly revenue and a bar chart of regional revenue, both with labelled axes. Build the renderer to assemble a single HTML file with embedded CSS, the charts, summary cards, the top-products table and the data quality section.",
        "concepts": [
          "SVG generation",
          "HTML templating",
          "Embedded CSS"
        ],
        "hints": [
          "Embed all CSS and SVG; the file must work offline.",
          "Label every chart axis.",
          "Escape all data values in the HTML."
        ],
        "acceptanceCriteria": [
          "The dashboard opens in a browser with no server",
          "Both charts show the right values",
          "The data quality section lists the bad rows"
        ],
        "tests": [
          "Build the dashboard and open it",
          "Check the chart values against the data",
          "Open the file with networking disabled"
        ]
      },
      {
        "id": "proj-portfolio-sales-dashboard-report-m4",
        "order": 4,
        "title": "Validation, tests and docs",
        "objectives": [
          "Validate inputs before building",
          "Test the analysis",
          "Document the format"
        ],
        "instructions": "Add the validate command that checks the input files and reports problems without building. Write tests for loading, cleaning, aggregation and chart values, and document the CSV format, the dashboard sections and the cleaning rules in the README.",
        "concepts": [
          "Input validation",
          "Testing",
          "Documentation"
        ],
        "hints": [
          "Validate before building anything.",
          "Test the figures against hand-computed values.",
          "Document every cleaning rule."
        ],
        "acceptanceCriteria": [
          "Validation reports problems without building",
          "All tests pass",
          "The README documents the format and rules"
        ],
        "tests": [
          "Validate a bad file",
          "Run the test suite",
          "Build the dashboard from the sample data"
        ]
      }
    ],
    "reviewChecklist": [
      "Bad rows are listed, never silently dropped",
      "All figures match the source data",
      "The HTML works offline with no server",
      "Region shares sum to 100 percent",
      "Money is computed in integer cents"
    ],
    "finalAssessment": [
      "Build the dashboard from the sample data and open it",
      "Walk through each section and verify a figure",
      "Show the data quality section",
      "Build from two input files",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: salesdash build --input sales/*.csv --out dashboard.html [--title TEXT]",
      "CLI: salesdash validate --input sales.csv"
    ]
  },
  {
    "id": "proj-portfolio-api-rate-limiter",
    "slug": "api-rate-limiter",
    "level": 3,
    "title": "API Rate Limiter Service",
    "description": "Build a rate-limiting service that protects an API: a token bucket and a fixed-window limiter backed by SQLite, per-key and per-IP limits, clear 429 responses with Retry-After headers, and an admin view of current usage. It is the kind of infrastructure component that appears in real backend interviews and real production systems.",
    "skills": [
      "Python",
      "Rate limiting",
      "Token bucket",
      "SQLite",
      "HTTP APIs",
      "Concurrency",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Enforce a token bucket limit per API key",
      "Enforce a fixed-window limit per IP address",
      "Return 429 with a Retry-After header when a limit is exceeded",
      "Expose headers showing the remaining quota and reset time",
      "Support different limits per plan (free, pro)",
      "Persist counters in SQLite so limits survive a restart",
      "Provide an admin endpoint showing usage per key",
      "Clean up expired counters automatically"
    ],
    "nonFunctionalRequirements": [
      "Limits are enforced atomically: concurrent requests cannot exceed the limit",
      "Counters survive a restart",
      "A 429 response always includes Retry-After",
      "The limiter adds under 5 ms per request locally"
    ],
    "architecture": "A package with a store module holding counters in SQLite, a limiter module implementing the token bucket (refill by elapsed time) and the fixed window, and an HTTP service that checks the limiter in a before-request hook and sets X-RateLimit headers on every response. All counter updates run inside a transaction.",
    "databaseSchema": "limits: key TEXT PK, plan TEXT, bucket_tokens REAL, updated_at TEXT; windows: key TEXT, window_start TEXT, count INTEGER, PRIMARY KEY (key, window_start); usage_log: id INTEGER PK, key TEXT, path TEXT, allowed INTEGER, created_at TEXT",
    "fileStructure": "api-rate-limiter/\n  limiter/\n    __init__.py\n    server.py\n    bucket.py\n    window.py\n    store.py\n  tests/\n    test_bucket.py\n    test_window.py\n    test_server.py\n  README.md",
    "taskBreakdown": [
      "Design the limiter algorithms",
      "Implement the token bucket",
      "Implement the fixed window",
      "Build the HTTP service with headers",
      "Add plans and the admin endpoint",
      "Write concurrency tests",
      "Document the limits in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-api-rate-limiter-m1",
        "order": 1,
        "title": "Token bucket algorithm",
        "objectives": [
          "Implement the token bucket",
          "Refill by elapsed time",
          "Test the bucket in isolation"
        ],
        "instructions": "Implement the token bucket: a bucket holds up to N tokens, refills at a configured rate per second, and a request consumes one token or is rejected when empty. Refill based on the elapsed time since the last check, not on a timer. Write unit tests for burst, refill and empty states.",
        "concepts": [
          "Token bucket",
          "Time-based refill",
          "Unit testing"
        ],
        "hints": [
          "Refill from elapsed time, not a background thread.",
          "Cap the bucket at its maximum.",
          "Use a monotonic clock for elapsed time."
        ],
        "acceptanceCriteria": [
          "A burst of N requests is allowed",
          "The N+1th request is rejected",
          "Tokens refill over time"
        ],
        "tests": [
          "Allow a burst and check the rejection",
          "Wait and check refill",
          "Check the bucket never exceeds its maximum"
        ]
      },
      {
        "id": "proj-portfolio-api-rate-limiter-m2",
        "order": 2,
        "title": "Fixed window and persistence",
        "objectives": [
          "Implement the fixed window",
          "Persist counters in SQLite",
          "Survive a restart"
        ],
        "instructions": "Implement the fixed window: count requests per key per window and reject when the count reaches the limit, resetting at the next window. Store both limiters' state in SQLite and reload it at startup so a restart does not reset anyone's quota.",
        "concepts": [
          "Fixed window",
          "SQLite persistence",
          "Window boundaries"
        ],
        "hints": [
          "Store the window start with the count.",
          "Use one transaction per counter update.",
          "A restart must not grant a fresh quota."
        ],
        "acceptanceCriteria": [
          "Requests within a window are counted",
          "The count resets at the window boundary",
          "Counters survive a restart"
        ],
        "tests": [
          "Exhaust a window and check the rejection",
          "Wait for the next window",
          "Restart and check the counter"
        ]
      },
      {
        "id": "proj-portfolio-api-rate-limiter-m3",
        "order": 3,
        "title": "HTTP service and headers",
        "objectives": [
          "Wire the limiter into HTTP",
          "Return 429 with Retry-After",
          "Set quota headers"
        ],
        "instructions": "Build the HTTP service with the standard library: a before-request check that looks up the API key and IP, applies both limiters, and returns 429 with a Retry-After header when either rejects. Every response carries X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers.",
        "concepts": [
          "HTTP middleware",
          "429 responses",
          "Response headers"
        ],
        "hints": [
          "Check the key limiter and the IP limiter both.",
          "Retry-After must be in seconds.",
          "Headers appear on allowed and rejected responses alike."
        ],
        "acceptanceCriteria": [
          "An allowed request carries quota headers",
          "An exceeded request returns 429 with Retry-After",
          "Headers show the remaining quota decreasing"
        ],
        "tests": [
          "Make requests until the limit and inspect headers",
          "Check the Retry-After value",
          "Use two different keys and compare quotas"
        ]
      },
      {
        "id": "proj-portfolio-api-rate-limiter-m4",
        "order": 4,
        "title": "Plans, admin view and concurrency tests",
        "objectives": [
          "Support free and pro plans",
          "Add the admin usage endpoint",
          "Prove limits hold under concurrency"
        ],
        "instructions": "Add plans: free keys get 10 requests per minute, pro keys get 100. Implement the admin endpoint listing per-key usage and remaining quota. Write a concurrency test that fires 50 simultaneous requests against a limit of 10 and asserts exactly 10 succeed, and document the limits and headers in the README.",
        "concepts": [
          "Plans",
          "Admin endpoints",
          "Concurrency testing"
        ],
        "hints": [
          "Update counters inside a transaction so concurrent requests cannot overshoot.",
          "Test with threads, not sequentially.",
          "Document the plans in the README."
        ],
        "acceptanceCriteria": [
          "Free and pro keys have different limits",
          "The admin endpoint shows per-key usage",
          "Exactly 10 of 50 concurrent requests succeed"
        ],
        "tests": [
          "Compare free and pro quotas",
          "Check the admin endpoint",
          "Run the concurrency test"
        ]
      }
    ],
    "reviewChecklist": [
      "Limits hold under concurrent requests",
      "Counters survive a restart",
      "429 responses always include Retry-After",
      "Quota headers appear on every response",
      "Free and pro plans differ"
    ],
    "finalAssessment": [
      "Demonstrate a burst being allowed then rejected",
      "Show the quota headers decreasing",
      "Show the 429 with Retry-After",
      "Compare free and pro plans",
      "Run the concurrency test"
    ],
    "portfolio": true,
    "apis": [
      "GET /api/data — a protected example endpoint",
      "GET /api/admin/usage — usage per key (admin only)",
      "Headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After"
    ]
  },
  {
    "id": "proj-portfolio-file-backup-tool",
    "slug": "file-backup-tool",
    "level": 2,
    "title": "Incremental File Backup Tool",
    "description": "Build an incremental backup tool: it copies a folder to a backup location, skips files that have not changed since the last run, keeps a manifest of hashes, verifies restores, and prunes old backups. It is a practical systems project — hashing, manifests, and careful file handling — that produces a tool you would actually trust with your files.",
    "skills": [
      "Python",
      "File hashing",
      "Incremental backup",
      "Manifests",
      "CLI design",
      "Restore verification",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Back up a source folder to a destination folder",
      "Skip unchanged files using SHA-256 hashes from a manifest",
      "Copy only new and changed files on later runs",
      "Restore a backup to a target folder",
      "Verify a backup by re-hashing every file against the manifest",
      "Keep dated snapshots and prune snapshots older than N days",
      "Exclude files by pattern, such as *.tmp or node_modules",
      "Report how many files were copied, skipped and how many bytes were written"
    ],
    "nonFunctionalRequirements": [
      "A file is never overwritten by an older version",
      "A restore produces byte-identical files",
      "Verification detects a single changed byte",
      "Unchanged files are never recopied"
    ],
    "architecture": "A package with a scanner that walks the source and hashes files with SHA-256, a manifest module that stores the last backup's hashes as JSON, a copier that writes new and changed files into a dated snapshot folder, and a verifier that re-hashes the backup and compares it against the manifest.",
    "databaseSchema": "",
    "fileStructure": "file-backup-tool/\n  backup/\n    __init__.py\n    __main__.py\n    cli.py\n    scan.py\n    manifest.py\n    copy.py\n    verify.py\n  tests/\n    test_scan.py\n    test_backup.py\n  README.md",
    "taskBreakdown": [
      "Design the snapshot and manifest format",
      "Implement scanning and hashing",
      "Implement the incremental copy",
      "Implement restore",
      "Implement verification and pruning",
      "Write tests with temporary folders",
      "Document the workflow in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-file-backup-tool-m1",
        "order": 1,
        "title": "Scanning and hashing",
        "objectives": [
          "Walk a folder tree",
          "Hash files with SHA-256",
          "Respect exclusion patterns"
        ],
        "instructions": "Implement the scanner: walk the source tree, skip excluded patterns, and compute the SHA-256 of each file by reading it in chunks so large files do not exhaust memory. Return a list of relative paths with sizes and hashes.",
        "concepts": [
          "os.walk",
          "SHA-256",
          "Chunked reading"
        ],
        "hints": [
          "Read files in chunks, never all at once.",
          "Use relative paths so the manifest is portable.",
          "Apply exclusions to directories as well as files."
        ],
        "acceptanceCriteria": [
          "Every file is listed with its hash",
          "Excluded patterns are skipped",
          "A large file hashes without high memory use"
        ],
        "tests": [
          "Scan a fixture folder and check the hashes",
          "Scan with an exclusion pattern",
          "Scan a folder with a 50 MB file"
        ]
      },
      {
        "id": "proj-portfolio-file-backup-tool-m2",
        "order": 2,
        "title": "Incremental copy and manifest",
        "objectives": [
          "Compare against the manifest",
          "Copy only new and changed files",
          "Write dated snapshots"
        ],
        "instructions": "Implement the backup run: load the previous manifest, compare hashes, and copy only new or changed files into a new dated snapshot folder, writing a fresh manifest afterwards. Unchanged files are recorded in the manifest without being recopied.",
        "concepts": [
          "Incremental backup",
          "Manifests",
          "Snapshots"
        ],
        "hints": [
          "Compare hashes, not modification times.",
          "Write the manifest only after a successful copy.",
          "The snapshot folder name includes the date and time."
        ],
        "acceptanceCriteria": [
          "The first run copies everything",
          "A second run with no changes copies nothing",
          "Changing one file copies only that file"
        ],
        "tests": [
          "Back up a fixture folder twice",
          "Change one file and back up again",
          "Check the manifest contents"
        ]
      },
      {
        "id": "proj-portfolio-file-backup-tool-m3",
        "order": 3,
        "title": "Restore and verification",
        "objectives": [
          "Restore a snapshot",
          "Verify hashes against the manifest",
          "Report mismatches"
        ],
        "instructions": "Implement restore to copy a snapshot's files to a target folder, and verify to re-hash every file in a snapshot and compare it with the manifest, reporting any missing or mismatched file. A restore must produce byte-identical files.",
        "concepts": [
          "Restore",
          "Verification",
          "Integrity checking"
        ],
        "hints": [
          "Verify by re-hashing, not by trusting sizes.",
          "Report every mismatch, not just the first.",
          "Restore must not delete files outside the target."
        ],
        "acceptanceCriteria": [
          "A restore produces byte-identical files",
          "Verification passes on a good snapshot",
          "Corrupting one byte fails verification"
        ],
        "tests": [
          "Back up, restore and compare hashes",
          "Verify a good snapshot",
          "Flip a byte and verify again"
        ]
      },
      {
        "id": "proj-portfolio-file-backup-tool-m4",
        "order": 4,
        "title": "Pruning, tests and docs",
        "objectives": [
          "Prune old snapshots",
          "Test the full cycle",
          "Document the workflow"
        ],
        "instructions": "Implement prune to delete snapshots older than the given number of days, keeping at least the newest one. Write tests for the full cycle — backup, no-change backup, change, restore, verify, prune — using temporary folders, and document the workflow in the README.",
        "concepts": [
          "Retention",
          "End-to-end testing",
          "Documentation"
        ],
        "hints": [
          "Never prune the newest snapshot.",
          "Test the whole cycle in one test.",
          "Document the exclusion syntax."
        ],
        "acceptanceCriteria": [
          "Old snapshots are pruned but the newest is kept",
          "All tests pass",
          "The README shows a full example"
        ],
        "tests": [
          "Create old snapshots and prune",
          "Run the test suite",
          "Follow the README from scratch"
        ]
      }
    ],
    "reviewChecklist": [
      "Unchanged files are never recopied",
      "A restore produces byte-identical files",
      "Verification detects a single changed byte",
      "The newest snapshot is never pruned",
      "Exclusions apply to files and directories"
    ],
    "finalAssessment": [
      "Back up a folder twice and show the second copies nothing",
      "Change one file and back up again",
      "Restore and verify byte-identical files",
      "Corrupt a byte and show verification failing",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: backup run --source ~/docs --dest /backups [--exclude '*.tmp']",
      "CLI: backup restore --snapshot 2026-11-24 --dest ~/restored",
      "CLI: backup verify --snapshot 2026-11-24",
      "CLI: backup prune --keep-days 30"
    ]
  },
  {
    "id": "proj-portfolio-rss-reader",
    "slug": "rss-reader",
    "level": 2,
    "title": "RSS Reader CLI",
    "description": "Build a command-line RSS reader that fetches feeds, stores articles in SQLite, and lets you read, search and mark articles as read — all from the terminal. It covers feed parsing, polling, deduplication and a pleasant text UI, and it works entirely offline once articles are fetched.",
    "skills": [
      "Python",
      "RSS and Atom parsing",
      "XML",
      "SQLite",
      "CLI design",
      "Deduplication",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Subscribe to RSS and Atom feeds by URL",
      "Fetch all feeds and store new articles in SQLite",
      "List unread articles newest first, grouped by feed",
      "Show an article's title, link, date and summary",
      "Mark articles read and unread, individually or by feed",
      "Search articles by keyword in title and summary",
      "Deduplicate articles by their GUID or link",
      "Export unread articles as an HTML reading list"
    ],
    "nonFunctionalRequirements": [
      "The same article is never stored twice",
      "A failed feed never stops the other feeds updating",
      "Articles are readable offline after fetching",
      "All commands work with no network once articles exist"
    ],
    "architecture": "A package with a feed store in SQLite, a fetcher using urllib with a timeout, a parser built on xml.etree that handles RSS 2.0 and Atom, a deduplicator keyed on GUID then link, and a CLI that lists, shows, searches and marks articles. Fetching records the last fetch time per feed.",
    "databaseSchema": "feeds: id INTEGER PK, url TEXT UNIQUE, title TEXT, last_fetched TEXT; articles: id INTEGER PK, feed_id INTEGER FK, guid TEXT UNIQUE, title TEXT, link TEXT, published TEXT, summary TEXT, read INTEGER",
    "fileStructure": "rss-reader/\n  rss/\n    __init__.py\n    __main__.py\n    cli.py\n    feeds.py\n    parse.py\n    store.py\n  tests/\n    test_parse.py\n    test_store.py\n  README.md",
    "taskBreakdown": [
      "Design the schema",
      "Implement RSS and Atom parsing",
      "Implement subscribing and updating",
      "Build listing, reading and searching",
      "Add export",
      "Write tests with fixture feeds",
      "Document usage in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-rss-reader-m1",
        "order": 1,
        "title": "Feed parsing: RSS and Atom",
        "objectives": [
          "Parse RSS 2.0 feeds",
          "Parse Atom feeds",
          "Extract title, link, date and summary"
        ],
        "instructions": "Implement the parser with xml.etree: handle RSS items and Atom entries, extracting the title, link, publication date and summary for each. Dates come in several formats, so parse them defensively and fall back to the fetch time when a date is unparseable.",
        "concepts": [
          "XML parsing",
          "RSS",
          "Atom"
        ],
        "hints": [
          "Handle both RSS and Atom in one parser.",
          "Parse dates defensively with a fallback.",
          "Strip HTML tags from summaries for the terminal."
        ],
        "acceptanceCriteria": [
          "An RSS fixture parses all its items",
          "An Atom fixture parses all its entries",
          "A bad date falls back to the fetch time"
        ],
        "tests": [
          "Parse the RSS fixture",
          "Parse the Atom fixture",
          "Parse a feed with a malformed date"
        ]
      },
      {
        "id": "proj-portfolio-rss-reader-m2",
        "order": 2,
        "title": "Subscribing and updating",
        "objectives": [
          "Subscribe to a feed",
          "Fetch and store new articles",
          "Deduplicate by GUID"
        ],
        "instructions": "Implement subscribe to add a feed URL and update to fetch every feed, parse it, and insert only articles whose GUID or link is not already stored. A feed that fails to fetch is logged and skipped so the other feeds still update.",
        "concepts": [
          "HTTP fetching",
          "Deduplication",
          "Error isolation"
        ],
        "hints": [
          "Deduplicate on GUID first, then link.",
          "Record the last fetch time per feed.",
          "One failing feed must not stop the update."
        ],
        "acceptanceCriteria": [
          "Subscribing stores the feed",
          "Updating twice stores each article once",
          "A failing feed does not stop the update"
        ],
        "tests": [
          "Subscribe to a local fixture feed and update twice",
          "Update with one broken feed URL",
          "Check the last-fetched time"
        ]
      },
      {
        "id": "proj-portfolio-rss-reader-m3",
        "order": 3,
        "title": "Reading, searching and marking",
        "objectives": [
          "List unread articles",
          "Show an article",
          "Search by keyword"
        ],
        "instructions": "Implement list to show unread articles newest first with their feed, title and date, show to print one article in full, search to match keywords in titles and summaries, and read/unread commands to mark articles. Marking a whole feed as read must work too.",
        "concepts": [
          "SQLite queries",
          "Full-text search",
          "Read state"
        ],
        "hints": [
          "Order by published date, newest first.",
          "Search with LIKE on title and summary.",
          "Mark-read updates the row, not the feed."
        ],
        "acceptanceCriteria": [
          "Unread list shows only unread articles",
          "Search finds matching articles",
          "Marking read removes the article from the unread list"
        ],
        "tests": [
          "List, read and mark articles",
          "Search for a keyword",
          "Mark a whole feed as read"
        ]
      },
      {
        "id": "proj-portfolio-rss-reader-m4",
        "order": 4,
        "title": "Export, tests and docs",
        "objectives": [
          "Export an HTML reading list",
          "Test with fixtures",
          "Document usage"
        ],
        "instructions": "Implement export to write all unread articles as an HTML page with links. Write tests for parsing both formats, deduplication, search and read state using fixture feeds and a temporary database, and document the commands in the README.",
        "concepts": [
          "HTML export",
          "Test fixtures",
          "Documentation"
        ],
        "hints": [
          "Serve fixture feeds with a local HTTP server in tests.",
          "Escape article titles in the HTML.",
          "Test deduplication explicitly."
        ],
        "acceptanceCriteria": [
          "Export produces an HTML page with links",
          "All tests pass",
          "The README documents every command"
        ],
        "tests": [
          "Export unread articles and open the HTML",
          "Run the test suite",
          "Subscribe to a real feed and update"
        ]
      }
    ],
    "reviewChecklist": [
      "Articles are never stored twice",
      "A failing feed never stops the update",
      "Articles are readable offline",
      "Search covers titles and summaries",
      "Exported HTML escapes article titles"
    ],
    "finalAssessment": [
      "Subscribe to a fixture feed and update",
      "List unread articles and read one",
      "Search for a keyword",
      "Export the reading list",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: rss subscribe https://example.com/feed.xml",
      "CLI: rss update",
      "CLI: rss list [--unread] [--feed NAME]",
      "CLI: rss search QUERY",
      "CLI: rss export --out reading.html"
    ]
  },
  {
    "id": "proj-portfolio-invoice-generator",
    "slug": "invoice-generator",
    "level": 2,
    "title": "Invoice Generator",
    "description": "Build an invoice generator for freelancers: define clients and line items, generate numbered invoices as HTML and PDF, track paid and overdue status, and send payment reminders. It is a complete small business tool — data, documents, and state — that a freelancer could genuinely use.",
    "skills": [
      "Python",
      "Invoicing",
      "HTML and PDF generation",
      "SQLite",
      "CLI design",
      "Date arithmetic",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Manage clients with name, email and address",
      "Create invoices with line items, quantities, rates and tax",
      "Number invoices sequentially per year, such as 2026-001",
      "Render an invoice as a printable HTML file",
      "Track invoice status: draft, sent, paid, overdue",
      "List overdue invoices based on the due date",
      "Record payments against an invoice",
      "Export a monthly revenue summary"
    ],
    "nonFunctionalRequirements": [
      "Invoice numbers are unique and sequential per year",
      "Totals are computed in integer cents",
      "Tax is computed per line item and rounded correctly",
      "A paid invoice cannot be edited"
    ],
    "architecture": "A package with clients, invoices, line items and payments in SQLite, a numbering module that finds the next number for the year, a renderer that builds a printable HTML invoice with a table of items, subtotal, tax and total, and a status module that derives overdue from the due date and recorded payments.",
    "databaseSchema": "clients: id INTEGER PK, name TEXT, email TEXT, address TEXT; invoices: id INTEGER PK, number TEXT UNIQUE, client_id INTEGER FK, issued_on TEXT, due_on TEXT, status TEXT, tax_rate REAL; items: id INTEGER PK, invoice_id INTEGER FK, description TEXT, quantity REAL, rate_cents INTEGER; payments: id INTEGER PK, invoice_id INTEGER FK, amount_cents INTEGER, paid_on TEXT",
    "fileStructure": "invoice-generator/\n  invoicing/\n    __init__.py\n    __main__.py\n    cli.py\n    db.py\n    numbering.py\n    render.py\n    status.py\n  tests/\n    test_numbering.py\n    test_totals.py\n  README.md",
    "taskBreakdown": [
      "Design the schema",
      "Implement clients and invoice creation",
      "Implement sequential numbering",
      "Build totals and the HTML renderer",
      "Add payments and overdue tracking",
      "Write tests with known invoices",
      "Document the workflow in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-invoice-generator-m1",
        "order": 1,
        "title": "Clients and invoice creation",
        "objectives": [
          "Create clients",
          "Create draft invoices",
          "Add line items"
        ],
        "instructions": "Create the schema and implement client management plus invoice creation in draft status with an issue date and a due date. Implement adding line items with a description, quantity and rate, validating that quantity and rate are positive.",
        "concepts": [
          "SQLite",
          "Data modelling",
          "Validation"
        ],
        "hints": [
          "Store money as integer cents.",
          "Validate quantity and rate before storing.",
          "An invoice starts as a draft."
        ],
        "acceptanceCriteria": [
          "A client can be created",
          "An invoice can be created in draft",
          "Line items are stored"
        ],
        "tests": [
          "Create a client and an invoice",
          "Add items to the invoice",
          "Add an item with a negative rate"
        ]
      },
      {
        "id": "proj-portfolio-invoice-generator-m2",
        "order": 2,
        "title": "Numbering and totals",
        "objectives": [
          "Number invoices sequentially per year",
          "Compute subtotal, tax and total",
          "Round tax correctly"
        ],
        "instructions": "Implement numbering: the first invoice of a year is YYYY-001 and each next one increments. Compute the subtotal from quantity times rate, apply the tax rate per line and round each line's tax to the nearest cent, then total. Verify the totals against hand-computed values.",
        "concepts": [
          "Sequential numbering",
          "Tax rounding",
          "Money math"
        ],
        "hints": [
          "Round tax per line, then sum.",
          "Find the next number with a query, not a counter in memory.",
          "The number is assigned when the invoice is sent, not created."
        ],
        "acceptanceCriteria": [
          "The first invoice of the year is YYYY-001",
          "Totals match hand-computed values",
          "Two invoices never share a number"
        ],
        "tests": [
          "Create and send two invoices in the same year",
          "Compute totals for a known invoice",
          "Create an invoice in a new year"
        ]
      },
      {
        "id": "proj-portfolio-invoice-generator-m3",
        "order": 3,
        "title": "Rendering and status",
        "objectives": [
          "Render a printable HTML invoice",
          "Track sent, paid and overdue",
          "Record payments"
        ],
        "instructions": "Implement the HTML renderer with the business details, client address, an items table, subtotal, tax and total, and a payment status line. Implement send to assign the number and mark the invoice sent, pay to record a payment, and overdue detection from the due date and unpaid balance.",
        "concepts": [
          "HTML rendering",
          "Invoice lifecycle",
          "Date arithmetic"
        ],
        "hints": [
          "Escape all client and item text in the HTML.",
          "An invoice is overdue only when sent and past due with a balance.",
          "Partial payments reduce the balance."
        ],
        "acceptanceCriteria": [
          "The rendered HTML shows the correct totals",
          "A sent invoice gets a number",
          "An unpaid invoice past its due date is overdue"
        ],
        "tests": [
          "Render an invoice and check the totals",
          "Send an invoice and check its number",
          "Record a partial payment and check the balance"
        ]
      },
      {
        "id": "proj-portfolio-invoice-generator-m4",
        "order": 4,
        "title": "Revenue summary, tests and docs",
        "objectives": [
          "Summarise monthly revenue",
          "Test numbering and totals",
          "Document the workflow"
        ],
        "instructions": "Implement a monthly revenue summary from paid invoices by payment date. Write tests for numbering, totals with tax, status transitions and the paid-invoice edit guard, and document the full workflow in the README.",
        "concepts": [
          "Reporting",
          "Testing",
          "Documentation"
        ],
        "hints": [
          "Revenue counts payments, not invoice totals.",
          "Test the paid-invoice edit guard.",
          "Document the numbering scheme."
        ],
        "acceptanceCriteria": [
          "The revenue summary matches the payments",
          "A paid invoice cannot be edited",
          "All tests pass"
        ],
        "tests": [
          "Record payments and check the summary",
          "Try to edit a paid invoice",
          "Run the test suite"
        ]
      }
    ],
    "reviewChecklist": [
      "Invoice numbers are unique and sequential per year",
      "Totals are computed in integer cents",
      "Tax is rounded per line",
      "A paid invoice cannot be edited",
      "Overdue is derived from due date and balance"
    ],
    "finalAssessment": [
      "Create a client and an invoice with items",
      "Send it and show the number and rendered HTML",
      "Record a payment and show the balance",
      "List overdue invoices",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: invoice client add --name X --email Y",
      "CLI: invoice create --client ID --due 2026-12-15 [--tax 0.2]",
      "CLI: invoice add-item --invoice 2026-001 --desc \"Design\" --qty 5 --rate 50",
      "CLI: invoice render --invoice 2026-001 --out invoice.html",
      "CLI: invoice overdue"
    ]
  },
  {
    "id": "proj-portfolio-git-activity-reporter",
    "slug": "git-activity-reporter",
    "level": 2,
    "title": "Git Activity Reporter",
    "description": "Build a tool that reads a Git repository's history and produces a contributor report: commits per author, files changed most, the busiest days, and a weekly activity chart. It teaches process execution, parsing real tool output, and turning raw history into insight — the same skills behind engineering analytics tools.",
    "skills": [
      "Python",
      "Git",
      "Subprocess",
      "Data analysis",
      "Reporting",
      "CLI design",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Read the commit history of any local Git repository",
      "Report commits per author with lines added and removed",
      "List the most frequently changed files",
      "Show commits per day of the week and per hour",
      "Render a weekly activity chart as text",
      "Support a --since date to limit the range",
      "Export the report as JSON",
      "Handle repositories with no commits gracefully"
    ],
    "nonFunctionalRequirements": [
      "All counts match git log output",
      "The tool never modifies the repository",
      "A repository with no commits produces an empty report, not a crash",
      "Author names are matched case-insensitively for merging"
    ],
    "architecture": "A package with a git module that runs git log with a custom format via subprocess, a parser that turns the output into commit records, an analysis module that aggregates by author, file, weekday and hour, and a report module that renders text tables and a chart. The repository is only ever read, never written.",
    "databaseSchema": "",
    "fileStructure": "git-activity-reporter/\n  gitreport/\n    __init__.py\n    __main__.py\n    cli.py\n    git.py\n    analyse.py\n    report.py\n  tests/\n    test_analyse.py\n    test_git.py\n  README.md",
    "taskBreakdown": [
      "Design the git log format",
      "Implement history reading",
      "Implement author and file analysis",
      "Build the report and chart",
      "Add date filtering and JSON export",
      "Write tests with a fixture repository",
      "Document usage in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-git-activity-reporter-m1",
        "order": 1,
        "title": "Reading Git history",
        "objectives": [
          "Run git log via subprocess",
          "Parse commits and file changes",
          "Handle non-repositories"
        ],
        "instructions": "Implement the git module to run git log with a machine-readable format including the hash, author, date and changed files, and parse the output into commit records. A path that is not a repository produces a clear error, and a repository with no commits produces an empty list.",
        "concepts": [
          "subprocess",
          "git log",
          "Parsing"
        ],
        "hints": [
          "Use a custom --format with a separator that cannot appear in messages.",
          "Never pass user input to a shell; use a list of arguments.",
          "Check the return code before parsing."
        ],
        "acceptanceCriteria": [
          "A fixture repository's commits are read",
          "A non-repository path errors clearly",
          "An empty repository yields an empty report"
        ],
        "tests": [
          "Read a fixture repository",
          "Run on a folder with no .git",
          "Run on an empty repository"
        ]
      },
      {
        "id": "proj-portfolio-git-activity-reporter-m2",
        "order": 2,
        "title": "Author and file analysis",
        "objectives": [
          "Count commits per author",
          "Count lines added and removed",
          "Rank the most changed files"
        ],
        "instructions": "Implement the analysis: group commits by author (merging names case-insensitively), sum lines added and removed per author, and count changes per file. Verify the numbers against git shortlog and git log --stat for the fixture repository.",
        "concepts": [
          "Aggregation",
          "Author normalisation",
          "Verification"
        ],
        "hints": [
          "Normalise author names to lowercase for grouping.",
          "Count a file once per commit it appears in.",
          "Cross-check against git's own output."
        ],
        "acceptanceCriteria": [
          "Author counts match git shortlog",
          "Line counts match git log --stat",
          "The most changed file is correct"
        ],
        "tests": [
          "Analyse the fixture repository",
          "Compare with git shortlog -s",
          "Compare with git log --stat"
        ]
      },
      {
        "id": "proj-portfolio-git-activity-reporter-m3",
        "order": 3,
        "title": "Time patterns and the weekly chart",
        "objectives": [
          "Show commits by weekday and hour",
          "Render a text chart",
          "Support --since filtering"
        ],
        "instructions": "Implement the time analysis: bucket commits by weekday and by hour, and render a text bar chart of commits per weekday. Add --since to filter commits by date, passing the date to git log so the filtering happens at the source.",
        "concepts": [
          "Time bucketing",
          "Text charts",
          "Date filtering"
        ],
        "hints": [
          "Bucket by the commit date, not the current date.",
          "Filter with git log --since.",
          "Scale the chart to the busiest day."
        ],
        "acceptanceCriteria": [
          "The weekday chart matches the commits",
          "The --since filter excludes older commits",
          "The hour breakdown adds up to the total"
        ],
        "tests": [
          "Analyse the fixture repository",
          "Run with --since and compare counts",
          "Check the hour totals"
        ]
      },
      {
        "id": "proj-portfolio-git-activity-reporter-m4",
        "order": 4,
        "title": "JSON export, tests and docs",
        "objectives": [
          "Export the report as JSON",
          "Test against a fixture repository",
          "Document usage"
        ],
        "instructions": "Add the --json option writing the same report as structured JSON. Write tests that build a small Git repository in a temporary directory with known commits and assert the report matches, and document the commands in the README.",
        "concepts": [
          "JSON output",
          "Fixture repositories",
          "Documentation"
        ],
        "hints": [
          "Build the fixture repository with git commands in the test.",
          "The JSON report must match the text report.",
          "Document that the tool never writes to the repository."
        ],
        "acceptanceCriteria": [
          "The JSON report matches the text report",
          "All tests pass",
          "The README documents the commands"
        ],
        "tests": [
          "Export JSON and compare with the text report",
          "Run the test suite",
          "Run the tool on this project itself"
        ]
      }
    ],
    "reviewChecklist": [
      "All counts match git's own output",
      "The repository is never modified",
      "An empty repository produces an empty report",
      "Author names merge case-insensitively",
      "The JSON report matches the text report"
    ],
    "finalAssessment": [
      "Run the tool on a fixture repository",
      "Show the author and file rankings",
      "Show the weekday chart",
      "Demonstrate the --since filter",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: gitreport /path/to/repo [--since 2026-01-01] [--json report.json]",
      "CLI: gitreport . --top-authors 5"
    ]
  },
  {
    "id": "proj-portfolio-movie-recommender",
    "slug": "movie-recommender",
    "level": 3,
    "title": "Movie Recommender",
    "description": "Build a movie recommender that suggests films based on what a user liked: it computes similarity between movies from user ratings, recommends unseen movies similar to the user's favourites, and explains each recommendation. It is a complete recommender system in miniature, built with only the standard library.",
    "skills": [
      "Python",
      "Recommender systems",
      "Cosine similarity",
      "Collaborative filtering",
      "Data analysis",
      "CLI design",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Load movies and user ratings from CSV files",
      "Compute cosine similarity between movies from their rating vectors",
      "Recommend unseen movies similar to a user's highest-rated movies",
      "Explain each recommendation with the similar movie it is based on",
      "Show the most similar movies to any given movie",
      "Handle a user with very few ratings gracefully",
      "Evaluate recommendations by holding out one liked movie per user",
      "Cache the similarity matrix between runs"
    ],
    "nonFunctionalRequirements": [
      "Recommendations never include a movie the user has already rated",
      "Every recommendation names the movie it is similar to",
      "Similarity is symmetric and between -1 and 1",
      "A user with one rating still gets recommendations"
    ],
    "architecture": "A package with a data module loading movies and ratings, a similarity module computing cosine similarity between movie rating vectors, a recommender that scores unseen movies by their similarity to the user's top-rated movies, and an evaluation module that holds out one liked movie per user and measures how often it appears in the recommendations.",
    "databaseSchema": "",
    "fileStructure": "movie-recommender/\n  recommend/\n    __init__.py\n    __main__.py\n    cli.py\n    data.py\n    similarity.py\n    engine.py\n    evaluate.py\n  data/\n    movies.csv\n    ratings.csv\n  tests/\n    test_similarity.py\n    test_engine.py\n  README.md",
    "taskBreakdown": [
      "Design the data format",
      "Implement loading and rating vectors",
      "Implement cosine similarity",
      "Build the recommender",
      "Add evaluation and caching",
      "Write tests with a tiny dataset",
      "Document the approach in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-movie-recommender-m1",
        "order": 1,
        "title": "Data loading and rating vectors",
        "objectives": [
          "Load movies and ratings",
          "Build a rating vector per movie",
          "Validate the data"
        ],
        "instructions": "Implement the data module: read the movies and ratings CSV files, build a dictionary of movie id to a vector of user ratings, and validate that every rating references a known movie and is between 1 and 5.",
        "concepts": [
          "CSV processing",
          "Data validation",
          "Vectors"
        ],
        "hints": [
          "Store ratings as a mapping from user to score per movie.",
          "Validate ratings on load and report bad rows.",
          "Keep the data loading separate from the math."
        ],
        "acceptanceCriteria": [
          "Movies and ratings load correctly",
          "Bad ratings are reported",
          "Each movie has a rating vector"
        ],
        "tests": [
          "Load the sample data and check the counts",
          "Load a file with a bad rating",
          "Inspect a movie's rating vector"
        ]
      },
      {
        "id": "proj-portfolio-movie-recommender-m2",
        "order": 2,
        "title": "Cosine similarity",
        "objectives": [
          "Compute cosine similarity",
          "Handle movies with no shared raters",
          "Cache the similarity matrix"
        ],
        "instructions": "Implement cosine similarity between two movie vectors over their shared raters, returning 0 when there are no shared raters. Compute the full similarity matrix once and cache it as JSON so later runs are fast.",
        "concepts": [
          "Cosine similarity",
          "Sparse vectors",
          "Caching"
        ],
        "hints": [
          "Compare only over users who rated both movies.",
          "Return 0 with no shared raters, not an error.",
          "Cache the matrix with the data file hashes."
        ],
        "acceptanceCriteria": [
          "Similarity is symmetric",
          "Identical movies score 1.0",
          "Movies with no shared raters score 0"
        ],
        "tests": [
          "Compute similarity for two known movies",
          "Check symmetry",
          "Run twice and confirm the cache is used"
        ]
      },
      {
        "id": "proj-portfolio-movie-recommender-m3",
        "order": 3,
        "title": "Recommendations with explanations",
        "objectives": [
          "Score unseen movies",
          "Recommend the top N",
          "Explain each recommendation"
        ],
        "instructions": "Implement the recommender: take a user's highest-rated movies, score every unseen movie by its weighted similarity to those favourites, and return the top N with the explanation naming the favourite each recommendation is most similar to. Never recommend a movie the user has already rated.",
        "concepts": [
          "Recommendation scoring",
          "Ranking",
          "Explainability"
        ],
        "hints": [
          "Exclude rated movies before ranking.",
          "Weight by the user's rating of the favourite.",
          "Every recommendation must name its basis movie."
        ],
        "acceptanceCriteria": [
          "Recommendations exclude rated movies",
          "Each recommendation has an explanation",
          "A user with one rating still gets recommendations"
        ],
        "tests": [
          "Recommend for a sample user",
          "Check no rated movie is recommended",
          "Recommend for a user with one rating"
        ]
      },
      {
        "id": "proj-portfolio-movie-recommender-m4",
        "order": 4,
        "title": "Evaluation, tests and docs",
        "objectives": [
          "Evaluate by holding out a liked movie",
          "Test similarity and recommendations",
          "Document the approach"
        ],
        "instructions": "Implement evaluation: for each user, hold out one liked movie, generate recommendations, and report how often the held-out movie appears in the top 5. Write tests for similarity, recommendation exclusions and evaluation on a tiny hand-built dataset, and document the approach and its cold-start limits in the README.",
        "concepts": [
          "Hold-out evaluation",
          "Hit rate",
          "Documentation"
        ],
        "hints": [
          "Report the hit rate honestly.",
          "Test with a dataset where the answer is known.",
          "Document the cold-start problem."
        ],
        "acceptanceCriteria": [
          "The hit rate is reported",
          "All tests pass",
          "The README states the cold-start limit"
        ],
        "tests": [
          "Run the evaluation",
          "Run the test suite",
          "Recommend for a new user with no ratings and explain the result"
        ]
      }
    ],
    "reviewChecklist": [
      "Recommendations never include rated movies",
      "Every recommendation has an explanation",
      "Similarity is symmetric and in range",
      "The hit rate is reported honestly",
      "The cache is invalidated when the data changes"
    ],
    "finalAssessment": [
      "Recommend movies for a sample user and explain them",
      "Show the most similar movies to one film",
      "Run the evaluation and explain the hit rate",
      "Demonstrate the cold-start case",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "CLI: recommend --user 42 [--count 5]",
      "CLI: recommend similar --movie \"The Matrix\"",
      "CLI: recommend evaluate"
    ]
  }
];
