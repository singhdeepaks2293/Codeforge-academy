import type { Project } from '../types.js';

export const PROJECTS: Project[] = [
  {
    "id": "proj-cli-calculator",
    "slug": "cli-calculator",
    "level": 1,
    "title": "CLI Calculator",
    "description": "Build a command-line calculator that evaluates arithmetic expressions typed by the user. It supports the four basic operations plus parentheses and operator precedence, keeps a history of calculations, and handles invalid input gracefully instead of crashing.",
    "skills": [
      "Python",
      "Command-line interfaces",
      "Parsing expressions",
      "Operator precedence",
      "Error handling",
      "Unit testing",
      "REPL design"
    ],
    "language": "python",
    "functionalRequirements": [
      "Read an expression from the user in a read-eval-print loop",
      "Evaluate addition, subtraction, multiplication and division",
      "Respect parentheses and standard operator precedence",
      "Support decimal numbers and negative numbers",
      "Store each calculation in a history list the user can view",
      "Let the user clear the history and quit with a command",
      "Reject invalid input with a clear error message and keep running",
      "Support a help command listing the available operations"
    ],
    "nonFunctionalRequirements": [
      "Responds to each expression in under 100 milliseconds",
      "Never crashes on malformed input",
      "History survives for the whole session",
      "Code is organised into small testable functions",
      "Runs with only the Python standard library"
    ],
    "architecture": "The program is a small REPL: a loop reads a line, a tokenizer splits it into numbers and operators, a parser applies the shunting-yard algorithm to respect precedence, and an evaluator computes the result. History is kept in a plain list in memory. The calculator, parser and REPL are separate modules so each can be tested on its own.",
    "databaseSchema": "",
    "apis": [
      "No external API; the interface is stdin and stdout."
    ],
    "fileStructure": "calculator/\n  main.py\n  calculator/\n    __init__.py\n    tokenizer.py\n    parser.py\n    evaluator.py\n    history.py\n  tests/\n    test_tokenizer.py\n    test_parser.py\n    test_evaluator.py\n  README.md",
    "taskBreakdown": [
      "Set up the project layout and the REPL loop",
      "Implement the tokenizer for numbers, operators and parentheses",
      "Implement the shunting-yard parser",
      "Implement the evaluator for the parsed expression",
      "Add the history feature and the help and quit commands",
      "Add input validation and friendly error messages",
      "Write unit tests for the tokenizer, parser and evaluator",
      "Polish the README with example sessions"
    ],
    "milestones": [
      {
        "id": "proj-cli-calculator-m1",
        "order": 1,
        "title": "Project setup and REPL loop",
        "objectives": [
          "Create the project structure",
          "Build a working read-eval-print loop",
          "Handle quit and help commands"
        ],
        "instructions": "Create the project folders and a main.py that loops, reading a line from the user and echoing it back. Add quit and help commands that exit the loop and print usage text. Run it and confirm you can start it, ask for help, and quit cleanly.",
        "concepts": [
          "Python modules",
          "REPL pattern",
          "Input and output",
          "Program structure"
        ],
        "hints": [
          "Start with the smallest loop that reads and prints a line.",
          "Keep the loop in main.py and put logic in modules later.",
          "Use a while True loop with a break on the quit command."
        ],
        "acceptanceCriteria": [
          "The program starts and shows a prompt",
          "Typing help prints usage information",
          "Typing quit exits the program"
        ],
        "tests": [
          "Run the program and type help",
          "Run the program and type quit",
          "Check the prompt appears for every input"
        ]
      },
      {
        "id": "proj-cli-calculator-m2",
        "order": 2,
        "title": "Tokenizer",
        "objectives": [
          "Split an expression into tokens",
          "Recognise numbers, operators and parentheses",
          "Reject illegal characters"
        ],
        "instructions": "Write a tokenizer that walks the input string and produces a list of tokens: numbers (including decimals), the operators plus, minus, multiply and divide, and opening and closing parentheses. Raise a clear error for any character that is not part of the language, such as a letter.",
        "concepts": [
          "Tokenizing",
          "Regular expressions",
          "Error handling"
        ],
        "hints": [
          "A number is a run of digits with at most one decimal point.",
          "Skip whitespace between tokens.",
          "Return tokens as small objects or tuples with a type and a value."
        ],
        "acceptanceCriteria": [
          "2 + 3 tokenizes to number 2, plus, number 3",
          "3.5 * (2 - 1) tokenizes correctly",
          "An input like 2 + a raises an error"
        ],
        "tests": [
          "Tokenize 2 + 3 and print the token list",
          "Tokenize 3.5 * (2 - 1)",
          "Tokenize 2 + a and confirm the error"
        ]
      },
      {
        "id": "proj-cli-calculator-m3",
        "order": 3,
        "title": "Parser with precedence",
        "objectives": [
          "Convert tokens to a form the evaluator can use",
          "Respect operator precedence",
          "Handle parentheses"
        ],
        "instructions": "Implement the shunting-yard algorithm to convert the token list into postfix order, where operators follow their operands. Multiplication and division bind tighter than addition and subtraction, and parentheses override precedence. Test it on expressions that mix all four operators.",
        "concepts": [
          "Shunting-yard algorithm",
          "Operator precedence",
          "Stacks"
        ],
        "hints": [
          "Keep an operator stack and an output list.",
          "Pop operators with higher or equal precedence before pushing a new one.",
          "A closing parenthesis pops operators until the matching open parenthesis."
        ],
        "acceptanceCriteria": [
          "2 + 3 * 4 parses so that 3 * 4 is evaluated first",
          "(2 + 3) * 4 parses the addition first",
          "Nested parentheses parse correctly"
        ],
        "tests": [
          "Parse 2 + 3 * 4 and check the postfix order",
          "Parse (2 + 3) * 4",
          "Parse ((1 + 2) * 3) - 4"
        ]
      },
      {
        "id": "proj-cli-calculator-m4",
        "order": 4,
        "title": "Evaluator",
        "objectives": [
          "Evaluate a postfix expression",
          "Handle division by zero",
          "Return decimal results"
        ],
        "instructions": "Write an evaluator that processes the postfix token list with a stack: push numbers, and when an operator appears, pop two operands, apply the operator, and push the result. Division by zero must produce a friendly error, not a crash.",
        "concepts": [
          "Stack evaluation",
          "Postfix notation",
          "Division by zero"
        ],
        "hints": [
          "The order of operands matters for subtraction and division.",
          "Use float arithmetic and print results without trailing noise.",
          "Catch the zero-division case before dividing."
        ],
        "acceptanceCriteria": [
          "2 + 3 * 4 evaluates to 14",
          "(2 + 3) * 4 evaluates to 20",
          "10 / 0 reports an error instead of crashing"
        ],
        "tests": [
          "Evaluate 2 + 3 * 4",
          "Evaluate (2 + 3) * 4",
          "Evaluate 10 / 0"
        ]
      },
      {
        "id": "proj-cli-calculator-m5",
        "order": 5,
        "title": "History and commands",
        "objectives": [
          "Record every successful calculation",
          "Show history on demand",
          "Clear history"
        ],
        "instructions": "Add a history list that records each expression and its result. Add a history command that prints the numbered list and a clear command that empties it. History only records successful calculations, not errors.",
        "concepts": [
          "Lists",
          "State management",
          "Command parsing"
        ],
        "hints": [
          "Store each entry as a pair of expression and result.",
          "Number the entries starting at 1 when printing.",
          "Keep history in its own small module."
        ],
        "acceptanceCriteria": [
          "history shows past calculations with numbers",
          "clear empties the history",
          "Failed calculations are not recorded"
        ],
        "tests": [
          "Run two calculations and type history",
          "Type clear then history",
          "Cause an error and check history is unchanged"
        ]
      },
      {
        "id": "proj-cli-calculator-m6",
        "order": 6,
        "title": "Testing and polish",
        "objectives": [
          "Write unit tests for each module",
          "Test edge cases",
          "Document the project"
        ],
        "instructions": "Write unit tests for the tokenizer, parser and evaluator covering normal cases, precedence, parentheses, decimals, negative numbers and errors. Run the full suite, fix any failures, and finish the README with build instructions and example sessions.",
        "concepts": [
          "Unit testing",
          "Test-driven development",
          "Documentation"
        ],
        "hints": [
          "Test one module at a time before testing the whole program.",
          "Include at least one test per error case.",
          "Keep the README short and show real example output."
        ],
        "acceptanceCriteria": [
          "All unit tests pass",
          "Edge cases like empty input and division by zero are covered",
          "The README shows how to run the program"
        ],
        "tests": [
          "Run the full test suite",
          "Try an empty input at the prompt",
          "Follow the README steps from scratch"
        ]
      }
    ],
    "reviewChecklist": [
      "Every module has tests and they all pass",
      "No input can crash the program",
      "History works across a session",
      "Precedence and parentheses are correct",
      "The README is complete and accurate",
      "Code follows a consistent style"
    ],
    "finalAssessment": [
      "Demonstrate 2 + 3 * 4 giving 14",
      "Demonstrate parentheses changing the result",
      "Demonstrate division by zero handled gracefully",
      "Show the history feature working",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-todo-app",
    "slug": "todo-application",
    "level": 1,
    "title": "To-do Application",
    "description": "Build a command-line to-do application that lets a user add tasks, list them, mark them complete, delete them and save them to a file so they survive between sessions. Tasks have a title, an optional due date and a priority.",
    "skills": [
      "Python",
      "File I/O",
      "JSON persistence",
      "Data modelling",
      "CLI design",
      "Input validation",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Add a task with a title, priority and optional due date",
      "List all tasks with their status, priority and due date",
      "Mark a task complete and unmark it",
      "Delete a task by its number",
      "Save tasks to a JSON file automatically after every change",
      "Load tasks from the file when the program starts",
      "Filter the list to show only open or only completed tasks",
      "Sort tasks by priority or by due date"
    ],
    "nonFunctionalRequirements": [
      "Tasks persist across restarts without data loss",
      "The program starts in under a second",
      "Invalid commands print a helpful message",
      "The JSON file stays human-readable",
      "All data changes go through one storage module"
    ],
    "architecture": "The application has three layers: a small command parser in the CLI, a task manager that holds the business rules (add, complete, delete, filter, sort), and a JSON store that reads and writes the task file. The manager never touches the file directly; it asks the store to save after each change, which keeps persistence testable.",
    "databaseSchema": "tasks: id INTEGER PRIMARY KEY (in JSON: id, title, done, priority, due_date, created_at)",
    "apis": [
      "No external API; the interface is stdin and stdout, and tasks.json is the storage file."
    ],
    "fileStructure": "todo/\n  main.py\n  todo/\n    __init__.py\n    models.py\n    manager.py\n    store.py\n    cli.py\n  tests/\n    test_manager.py\n    test_store.py\n  tasks.json\n  README.md",
    "taskBreakdown": [
      "Design the task model and the JSON format",
      "Implement the store that loads and saves tasks",
      "Implement the manager with add, list, complete and delete",
      "Build the CLI command parser",
      "Add filtering and sorting",
      "Add validation for dates and priorities",
      "Write unit tests for the manager and store",
      "Test persistence by restarting the program"
    ],
    "milestones": [
      {
        "id": "proj-todo-app-m1",
        "order": 1,
        "title": "Task model and JSON store",
        "objectives": [
          "Define the task data model",
          "Save tasks to JSON",
          "Load tasks from JSON"
        ],
        "instructions": "Create a Task model with an id, title, done flag, priority and optional due date. Write a store module with save and load functions that read and write a tasks.json file. If the file does not exist yet, loading returns an empty list instead of crashing.",
        "concepts": [
          "Data classes",
          "JSON serialisation",
          "File handling"
        ],
        "hints": [
          "Use a dataclass for the task and convert it to a dict for JSON.",
          "Handle a missing file gracefully.",
          "Keep the file format simple and readable."
        ],
        "acceptanceCriteria": [
          "Saving then loading returns the same tasks",
          "Loading with no file returns an empty list",
          "The JSON file is valid and readable"
        ],
        "tests": [
          "Save two tasks and inspect tasks.json",
          "Delete the file and start the program",
          "Load a hand-edited JSON file"
        ]
      },
      {
        "id": "proj-todo-app-m2",
        "order": 2,
        "title": "Task manager",
        "objectives": [
          "Add tasks",
          "Complete and delete tasks",
          "List tasks"
        ],
        "instructions": "Write a manager that keeps the task list in memory and implements add, list, complete, delete and toggle operations. Each operation validates its input: completing a task that does not exist must report an error. The manager calls the store to persist after every change.",
        "concepts": [
          "Business logic",
          "In-memory state",
          "Validation"
        ],
        "hints": [
          "Give every task a unique incrementing id.",
          "Find tasks by id, not by position.",
          "Return clear success or error results from each operation."
        ],
        "acceptanceCriteria": [
          "Adding a task appears in the list",
          "Completing a task marks it done",
          "Completing a missing task reports an error"
        ],
        "tests": [
          "Add a task and list it",
          "Complete the task and list again",
          "Complete task 99 and check the error"
        ]
      },
      {
        "id": "proj-todo-app-m3",
        "order": 3,
        "title": "CLI commands",
        "objectives": [
          "Parse user commands",
          "Wire commands to the manager",
          "Print readable output"
        ],
        "instructions": "Build the command loop with commands add, list, done, delete, and quit. Parse the arguments from each line, call the manager, and print the result in a readable table-like format with task numbers, status marks and priorities.",
        "concepts": [
          "Command parsing",
          "String formatting",
          "User experience"
        ],
        "hints": [
          "Keep the parser small: split the line and dispatch on the first word.",
          "Print one task per line with aligned columns.",
          "Show a short help text for unknown commands."
        ],
        "acceptanceCriteria": [
          "add creates a task from the command line",
          "list shows all tasks",
          "An unknown command prints help"
        ],
        "tests": [
          "Run add, then list",
          "Run an unknown command",
          "Run done with no number"
        ]
      },
      {
        "id": "proj-todo-app-m4",
        "order": 4,
        "title": "Filtering and sorting",
        "objectives": [
          "Filter by completion status",
          "Sort by priority and due date",
          "Combine filter and sort"
        ],
        "instructions": "Add list options to show only open tasks or only completed tasks, and to sort by priority or due date. Tasks without a due date sort last when sorting by date. The default list shows everything in creation order.",
        "concepts": [
          "Filtering",
          "Sorting",
          "Optional values"
        ],
        "hints": [
          "Filter first, then sort the filtered list.",
          "Use a sort key that puts missing dates last.",
          "Keep the default behaviour unchanged when no options are given."
        ],
        "acceptanceCriteria": [
          "list open shows only incomplete tasks",
          "list by priority orders high to low",
          "Tasks without dates sort last by date"
        ],
        "tests": [
          "Add tasks with different priorities and sort",
          "Complete one task and list open",
          "List by due date with a missing date"
        ]
      },
      {
        "id": "proj-todo-app-m5",
        "order": 5,
        "title": "Validation and persistence checks",
        "objectives": [
          "Validate dates and priorities",
          "Verify data survives restarts",
          "Handle a corrupt file"
        ],
        "instructions": "Validate due dates in YYYY-MM-DD format and priorities in the range 1 to 3, rejecting bad values with a clear message. Test the full cycle: add tasks, quit, restart, and confirm they are still there. Decide what happens when tasks.json is corrupt, and implement a safe fallback that does not delete the file silently.",
        "concepts": [
          "Input validation",
          "Date parsing",
          "Defensive programming"
        ],
        "hints": [
          "Use datetime.strptime to validate dates.",
          "Reject bad input before changing any state.",
          "On a corrupt file, warn the user and start empty."
        ],
        "acceptanceCriteria": [
          "An invalid date is rejected",
          "Tasks survive a restart",
          "A corrupt file does not crash the program"
        ],
        "tests": [
          "Add a task with date 2026-13-40",
          "Add tasks, quit, restart, list",
          "Corrupt tasks.json and start the program"
        ]
      },
      {
        "id": "proj-todo-app-m6",
        "order": 6,
        "title": "Testing and polish",
        "objectives": [
          "Write unit tests",
          "Cover edge cases",
          "Finish the documentation"
        ],
        "instructions": "Write unit tests for the manager and the store, including adding, completing, deleting, filtering and round-tripping through JSON. Run the suite, fix failures, and write a README with usage examples.",
        "concepts": [
          "Unit testing",
          "Test fixtures",
          "Documentation"
        ],
        "hints": [
          "Use a temporary file for store tests so real data is safe.",
          "Test the unhappy paths, not just the happy ones.",
          "Show example commands in the README."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Store tests use temporary files",
          "The README documents every command"
        ],
        "tests": [
          "Run the full test suite",
          "Run the program from a clean directory",
          "Follow the README exactly"
        ]
      }
    ],
    "reviewChecklist": [
      "Tasks persist correctly across restarts",
      "All commands work as documented",
      "Invalid input never crashes the program",
      "Filtering and sorting behave as specified",
      "Tests cover the manager and store",
      "The README is accurate"
    ],
    "finalAssessment": [
      "Add three tasks with different priorities",
      "Complete one and show the filtered list",
      "Restart the program and show tasks are still there",
      "Demonstrate sorting by priority",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-password-generator",
    "slug": "password-generator",
    "level": 1,
    "title": "Password Generator",
    "description": "Build a password generator that creates strong random passwords with configurable length and character sets. It checks password strength, can generate passphrases from words, and never uses predictable randomness.",
    "skills": [
      "Python",
      "Randomness and security",
      "Character sets",
      "Entropy",
      "CLI design",
      "Unit testing",
      "Secure coding"
    ],
    "language": "python",
    "functionalRequirements": [
      "Generate a password of a requested length",
      "Let the user choose which character sets to include (lowercase, uppercase, digits, symbols)",
      "Guarantee at least one character from each selected set",
      "Estimate password strength and estimated crack time",
      "Generate a memorable passphrase from a word list",
      "Generate several passwords at once",
      "Copy the result to the clipboard when possible",
      "Refuse insecure options such as a length below 8"
    ],
    "nonFunctionalRequirements": [
      "Passwords are generated with a cryptographically secure random source",
      "Two runs with the same settings produce different passwords",
      "Strength estimation is shown for every password",
      "No password is ever written to a log or file",
      "The tool runs offline with no network access"
    ],
    "architecture": "The generator is a small library plus a CLI. A character-set module builds the pool from the user options, a generator module draws characters with the secrets module and guarantees one character from each chosen set, and a strength module estimates entropy from the pool size and length. A word list file backs the passphrase mode.",
    "databaseSchema": "",
    "apis": [
      "No external API; the interface is the command line."
    ],
    "fileStructure": "password-generator/\n  main.py\n  passgen/\n    __init__.py\n    generator.py\n    strength.py\n    words.txt\n  tests/\n    test_generator.py\n    test_strength.py\n  README.md",
    "taskBreakdown": [
      "Set up the project and the basic generator",
      "Add character-set options",
      "Guarantee one character per selected set",
      "Implement strength estimation",
      "Add passphrase generation",
      "Add batch generation and clipboard support",
      "Write unit tests",
      "Document security properties in the README"
    ],
    "milestones": [
      {
        "id": "proj-password-generator-m1",
        "order": 1,
        "title": "Basic generator",
        "objectives": [
          "Generate a random password",
          "Use a secure random source",
          "Support a length option"
        ],
        "instructions": "Write a generator that builds a password of a given length from lowercase letters, uppercase letters, digits and symbols, drawing characters with the secrets module. Add a CLI with a length flag and print the generated password. Verify that repeated runs give different results.",
        "concepts": [
          "secrets module",
          "Randomness",
          "Command-line arguments"
        ],
        "hints": [
          "Use secrets.choice, never random.choice, for passwords.",
          "Keep the default length at 16.",
          "Print only the password, nothing else."
        ],
        "acceptanceCriteria": [
          "Generated passwords have the requested length",
          "Two runs give different passwords",
          "Only allowed characters appear"
        ],
        "tests": [
          "Generate a 16-character password",
          "Generate a 12-character password",
          "Generate twice and compare"
        ]
      },
      {
        "id": "proj-password-generator-m2",
        "order": 2,
        "title": "Character set options",
        "objectives": [
          "Let the user pick character sets",
          "Validate the options",
          "Guarantee coverage of each set"
        ],
        "instructions": "Add flags to include or exclude each character set. When a set is selected, the password must contain at least one character from it: place one guaranteed character from each set first, fill the rest randomly, then shuffle. Reject a request with no character sets selected.",
        "concepts": [
          "Character sets",
          "Shuffling",
          "Guarantees"
        ],
        "hints": [
          "Build the pool from the selected sets only.",
          "Shuffle after placing guaranteed characters so their positions are random.",
          "Fail clearly when every set is excluded."
        ],
        "acceptanceCriteria": [
          "A password with symbols contains at least one symbol",
          "Excluding digits produces no digits",
          "Excluding everything is an error"
        ],
        "tests": [
          "Generate with only lowercase",
          "Generate with all sets and check coverage",
          "Generate with no sets"
        ]
      },
      {
        "id": "proj-password-generator-m3",
        "order": 3,
        "title": "Strength estimation",
        "objectives": [
          "Compute password entropy",
          "Estimate crack time",
          "Show a strength label"
        ],
        "instructions": "Implement strength estimation from the size of the character pool and the password length: entropy is length times log base 2 of pool size. Convert entropy into an estimated crack time at a stated guess rate, and label the password Weak, Fair, Strong or Very Strong.",
        "concepts": [
          "Entropy",
          "Logarithms",
          "User feedback"
        ],
        "hints": [
          "Entropy grows with both length and pool size.",
          "State the assumed guesses-per-second in the output.",
          "Use thresholds and document them."
        ],
        "acceptanceCriteria": [
          "A 16-character mixed password is rated Strong or better",
          "An 8-character lowercase password is rated Weak",
          "The crack time is shown"
        ],
        "tests": [
          "Check the strength of a short password",
          "Check the strength of a long mixed password",
          "Compare lengths 8, 12 and 16"
        ]
      },
      {
        "id": "proj-password-generator-m4",
        "order": 4,
        "title": "Passphrase mode",
        "objectives": [
          "Generate a passphrase from words",
          "Load a word list",
          "Estimate passphrase strength"
        ],
        "instructions": "Add a passphrase mode that picks a requested number of random words from a bundled word list and joins them with a separator. Show the entropy based on the word list size and word count, and allow an optional digit to be appended.",
        "concepts": [
          "Word lists",
          "Passphrases",
          "Separators"
        ],
        "hints": [
          "Use secrets.choice to pick each word.",
          "Keep the word list as a plain text file in the project.",
          "Words must be distinct enough to be memorable."
        ],
        "acceptanceCriteria": [
          "A 4-word passphrase is generated",
          "The word count option is respected",
          "Entropy is reported for the passphrase"
        ],
        "tests": [
          "Generate a 4-word passphrase",
          "Generate a 6-word passphrase with dashes",
          "Check the reported entropy"
        ]
      },
      {
        "id": "proj-password-generator-m5",
        "order": 5,
        "title": "Batch mode and clipboard",
        "objectives": [
          "Generate several passwords at once",
          "Copy to clipboard when available",
          "Fail gracefully without a clipboard"
        ],
        "instructions": "Add a count option that prints several passwords, one per line. Add a copy flag that places the password on the clipboard when a clipboard tool is available, and prints a clear message when it is not instead of crashing.",
        "concepts": [
          "Batch output",
          "Optional dependencies",
          "Graceful degradation"
        ],
        "hints": [
          "Try the clipboard tool and catch its failure.",
          "Never print the password twice when copying.",
          "Keep the clipboard code in its own small module."
        ],
        "acceptanceCriteria": [
          "Generating 5 passwords prints 5 lines",
          "Copy works or reports unavailability",
          "Batch passwords are all different"
        ],
        "tests": [
          "Generate 5 passwords",
          "Generate 1 password with copy",
          "Run on a system without clipboard support"
        ]
      },
      {
        "id": "proj-password-generator-m6",
        "order": 6,
        "title": "Testing and documentation",
        "objectives": [
          "Write unit tests",
          "Test security properties",
          "Document safe usage"
        ],
        "instructions": "Write unit tests that check length, character-set coverage, passphrase word counts and strength thresholds, plus a test that the generator never uses the random module. Finish the README with usage examples and a short note on why secrets is used.",
        "concepts": [
          "Unit testing",
          "Security testing",
          "Documentation"
        ],
        "hints": [
          "Test properties (length, coverage) rather than exact outputs.",
          "Check the source does not import random for generation.",
          "Document the minimum recommended length."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "No test depends on a specific password",
          "The README explains the security choices"
        ],
        "tests": [
          "Run the full test suite",
          "Generate 100 passwords and check lengths",
          "Read the README for accuracy"
        ]
      }
    ],
    "reviewChecklist": [
      "Passwords use the secrets module, never random",
      "Every selected character set is represented",
      "Strength labels match the entropy math",
      "Passphrases work from the bundled word list",
      "No password is logged or saved",
      "Tests cover the generator and strength logic"
    ],
    "finalAssessment": [
      "Generate a 16-character password with all sets",
      "Show its strength rating",
      "Generate a 4-word passphrase",
      "Generate 5 passwords at once",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-file-organizer",
    "slug": "file-organizer",
    "level": 1,
    "title": "File Organizer",
    "description": "Build a command-line tool that organises a messy folder by moving files into subfolders by type, such as Images, Documents, Audio and Archives. It supports a dry-run preview, undo, and safe handling of name collisions.",
    "skills": [
      "Python",
      "File system operations",
      "pathlib",
      "CLI design",
      "Dry-run mode",
      "Undo design",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Scan a target folder and group files by extension",
      "Move files into category folders (Images, Documents, Audio, Video, Archives, Code, Other)",
      "Preview the planned moves with a dry-run flag before changing anything",
      "Skip files that are already in the right place",
      "Rename on collision instead of overwriting (file, file (1), file (2))",
      "Undo the last organisation run from a log file",
      "Support recursive organisation of subfolders",
      "Print a summary of how many files were moved per category"
    ],
    "nonFunctionalRequirements": [
      "Never overwrites an existing file",
      "Dry-run changes nothing on disk",
      "Undo restores every file to its original location",
      "Works on folders with thousands of files",
      "Only the standard library is used"
    ],
    "architecture": "The tool has a scanner that walks the folder and classifies each file by extension, a planner that produces a list of move operations, and an executor that performs them and writes a JSON log of every move. The undo command reads the log and reverses the moves. Dry-run runs the planner and prints the operations without calling the executor.",
    "databaseSchema": "",
    "apis": [
      "No external API; the interface is the command line and the file system."
    ],
    "fileStructure": "file-organizer/\n  main.py\n  organizer/\n    __init__.py\n    categories.py\n    scanner.py\n    planner.py\n    executor.py\n    undo.py\n  tests/\n    test_scanner.py\n    test_planner.py\n    test_executor.py\n  README.md",
    "taskBreakdown": [
      "Define the category map and the scanner",
      "Implement the planner and dry-run",
      "Implement the executor with collision handling",
      "Add the undo log and undo command",
      "Add recursive mode",
      "Add the summary report",
      "Write unit tests with temporary directories",
      "Document usage and safety guarantees"
    ],
    "milestones": [
      {
        "id": "proj-file-organizer-m1",
        "order": 1,
        "title": "Categories and scanner",
        "objectives": [
          "Map extensions to categories",
          "Scan a folder",
          "Classify each file"
        ],
        "instructions": "Create a category map from file extensions to folders such as Images, Documents and Archives, with everything else falling into Other. Write a scanner that lists the files in a target folder (non-recursive first) and returns each file with its category.",
        "concepts": [
          "pathlib",
          "Dictionaries",
          "File extensions"
        ],
        "hints": [
          "Normalise extensions to lowercase.",
          "Use pathlib suffixes, not string splitting.",
          "Skip directories when scanning."
        ],
        "acceptanceCriteria": [
          "A .jpg file is classified as Images",
          "An unknown extension is Other",
          "Subfolders are not treated as files"
        ],
        "tests": [
          "Scan a folder with mixed files",
          "Scan a folder with an unknown extension",
          "Scan an empty folder"
        ]
      },
      {
        "id": "proj-file-organizer-m2",
        "order": 2,
        "title": "Planner and dry-run",
        "objectives": [
          "Plan moves without executing them",
          "Print a readable preview",
          "Skip files already in place"
        ],
        "instructions": "Write a planner that turns the scan results into move operations: each file moves into its category folder. Add a dry-run mode that prints the planned moves in a readable list and changes nothing on disk. Files already inside their correct category folder are skipped.",
        "concepts": [
          "Planning",
          "Dry-run pattern",
          "Separation of concerns"
        ],
        "hints": [
          "The planner returns data; it never touches the disk.",
          "Print source arrow destination for each move.",
          "Detect files already in the right folder by comparing parents."
        ],
        "acceptanceCriteria": [
          "Dry-run prints the planned moves",
          "Dry-run leaves the folder unchanged",
          "Files already organised are skipped"
        ],
        "tests": [
          "Dry-run a messy folder",
          "Check nothing moved after dry-run",
          "Dry-run an already organised folder"
        ]
      },
      {
        "id": "proj-file-organizer-m3",
        "order": 3,
        "title": "Executor and collisions",
        "objectives": [
          "Perform the moves",
          "Rename on collision",
          "Write a move log"
        ],
        "instructions": "Implement the executor that creates category folders as needed, moves each file, and renames on collision by appending a number in parentheses. After every run it writes a JSON log recording each source and destination so the run can be undone.",
        "concepts": [
          "File moves",
          "Collision handling",
          "Logging"
        ],
        "hints": [
          "Create destination folders with parents as needed.",
          "Check for an existing file before moving.",
          "Log every move, including renames."
        ],
        "acceptanceCriteria": [
          "Files land in the right category folders",
          "A colliding name is renamed, not overwritten",
          "The log records every move"
        ],
        "tests": [
          "Organise a folder with two same-named files",
          "Check the log file contents",
          "Organise a folder with nested categories"
        ]
      },
      {
        "id": "proj-file-organizer-m4",
        "order": 4,
        "title": "Undo",
        "objectives": [
          "Read the move log",
          "Reverse every move",
          "Clean up empty folders"
        ],
        "instructions": "Implement the undo command: read the latest move log, move each file back to its original path, and remove category folders that are left empty. If a destination file is missing, report it and continue with the rest instead of aborting.",
        "concepts": [
          "Undo design",
          "Error tolerance",
          "Cleanup"
        ],
        "hints": [
          "Reverse the moves in reverse order.",
          "Handle a missing file with a warning, not a crash.",
          "Only remove folders the tool created and that are empty."
        ],
        "acceptanceCriteria": [
          "Undo restores the original layout",
          "Empty category folders are removed",
          "A missing file is reported, not fatal"
        ],
        "tests": [
          "Organise then undo a folder",
          "Delete a moved file then undo",
          "Undo twice in a row"
        ]
      },
      {
        "id": "proj-file-organizer-m5",
        "order": 5,
        "title": "Recursive mode and summary",
        "objectives": [
          "Organise subfolders too",
          "Print a per-category summary",
          "Exclude the log file itself"
        ],
        "instructions": "Add a recursive flag that scans subfolders as well, moving files from anywhere in the tree into the top-level category folders. Add a summary at the end of each run showing how many files moved per category. Make sure the tool never tries to organise its own log file.",
        "concepts": [
          "Recursion",
          "Reporting",
          "Self-exclusion"
        ],
        "hints": [
          "Walk the tree but skip the category folders you create.",
          "Exclude the log file by name.",
          "Count moves per category as you execute."
        ],
        "acceptanceCriteria": [
          "Recursive mode moves nested files",
          "The summary counts are correct",
          "The log file is never moved"
        ],
        "tests": [
          "Organise a nested folder recursively",
          "Check the summary output",
          "Confirm the log file stays put"
        ]
      },
      {
        "id": "proj-file-organizer-m6",
        "order": 6,
        "title": "Testing and documentation",
        "objectives": [
          "Write tests with temporary directories",
          "Test collisions and undo",
          "Document safety guarantees"
        ],
        "instructions": "Write tests that use temporary directories to check scanning, planning, collisions, undo and dry-run behaviour. Run the suite and finish the README with examples and an explicit list of safety guarantees, including never overwriting files.",
        "concepts": [
          "Unit testing",
          "Temporary directories",
          "Documentation"
        ],
        "hints": [
          "Use pytest tmp_path fixtures for file tests.",
          "Test the unhappy paths: collisions, missing files, corrupt logs.",
          "State the guarantees in the README."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Tests never touch real user folders",
          "The README lists the safety guarantees"
        ],
        "tests": [
          "Run the full test suite",
          "Dry-run a real folder and inspect the preview",
          "Read the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Dry-run never changes the disk",
      "No file is ever overwritten",
      "Undo restores the original layout",
      "Recursive mode works",
      "The summary is accurate",
      "Tests use temporary directories only"
    ],
    "finalAssessment": [
      "Dry-run a messy folder and show the preview",
      "Organise it and show the result",
      "Undo it and show the restored layout",
      "Show a collision being renamed",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-expense-tracker",
    "slug": "expense-tracker",
    "level": 1,
    "title": "Expense Tracker",
    "description": "Build a command-line expense tracker that records spending by category, stores it in a CSV or JSON file, and produces monthly summaries and simple reports. It helps a user see where their money goes.",
    "skills": [
      "Python",
      "File I/O",
      "CSV and JSON",
      "Data aggregation",
      "Dates",
      "Reporting",
      "CLI design"
    ],
    "language": "python",
    "functionalRequirements": [
      "Add an expense with amount, category, date and optional note",
      "List expenses with filters by category and date range",
      "Show total spending per category for a month",
      "Show a monthly summary with totals and averages",
      "Edit and delete expenses",
      "Store expenses in a JSON file that persists between runs",
      "Export a monthly report to CSV",
      "Set a monthly budget per category and warn when it is exceeded"
    ],
    "nonFunctionalRequirements": [
      "Expenses persist across restarts",
      "Reports compute correctly from the stored data",
      "Invalid amounts and dates are rejected",
      "The JSON file stays valid after every operation",
      "All money is handled as decimal values, not floats"
    ],
    "architecture": "The tracker has an expense model, a JSON store, a reporting module that aggregates by category and month, and a CLI. Amounts are stored as integer cents or Decimal values to avoid floating point errors. The reporter reads from the store and computes totals, averages and budget comparisons without changing any data.",
    "databaseSchema": "expenses: id, amount_cents INTEGER, category TEXT, date TEXT (YYYY-MM-DD), note TEXT, created_at TEXT",
    "apis": [
      "No external API; the interface is the command line and the JSON data file."
    ],
    "fileStructure": "expense-tracker/\n  main.py\n  expenses/\n    __init__.py\n    models.py\n    store.py\n    reports.py\n    cli.py\n  tests/\n    test_store.py\n    test_reports.py\n  expenses.json\n  README.md",
    "taskBreakdown": [
      "Design the expense model and store",
      "Implement add, list, edit and delete",
      "Implement monthly and category reports",
      "Add budgets and warnings",
      "Add CSV export",
      "Add validation for amounts and dates",
      "Write unit tests",
      "Document the commands"
    ],
    "milestones": [
      {
        "id": "proj-expense-tracker-m1",
        "order": 1,
        "title": "Model and store",
        "objectives": [
          "Define the expense model",
          "Persist expenses to JSON",
          "Load expenses on start"
        ],
        "instructions": "Create an Expense model with id, amount, category, date and note. Store amounts as integer cents to avoid floating point errors. Write a store that saves the list to expenses.json and loads it back, returning an empty list when the file is missing.",
        "concepts": [
          "Data modelling",
          "Integer cents",
          "JSON persistence"
        ],
        "hints": [
          "Convert dollars to cents when saving and back when displaying.",
          "Validate the date format on load.",
          "Keep the store separate from the CLI."
        ],
        "acceptanceCriteria": [
          "Saving and loading round-trips correctly",
          "A missing file loads as empty",
          "Amounts are exact to the cent"
        ],
        "tests": [
          "Add an expense and inspect the JSON",
          "Restart and list expenses",
          "Add 10.10 and 20.20 and check the total"
        ]
      },
      {
        "id": "proj-expense-tracker-m2",
        "order": 2,
        "title": "Add, list, edit, delete",
        "objectives": [
          "Add expenses from the CLI",
          "List with filters",
          "Edit and delete by id"
        ],
        "instructions": "Implement the CLI commands add, list, edit and delete. Listing supports filtering by category and by a date range. Editing changes one field at a time. Deleting asks for confirmation when run interactively and requires a valid id.",
        "concepts": [
          "CRUD operations",
          "Filtering",
          "Command design"
        ],
        "hints": [
          "Find expenses by id for edit and delete.",
          "Apply filters before printing.",
          "Validate every field before saving."
        ],
        "acceptanceCriteria": [
          "Adding shows the expense in the list",
          "Filtering by category works",
          "Deleting removes the expense"
        ],
        "tests": [
          "Add three expenses and list them",
          "List with a category filter",
          "Delete one and list again"
        ]
      },
      {
        "id": "proj-expense-tracker-m3",
        "order": 3,
        "title": "Monthly and category reports",
        "objectives": [
          "Total spending per category",
          "Monthly totals and averages",
          "Daily average for a month"
        ],
        "instructions": "Write a reporting module that computes, for a given month, the total per category, the grand total, and the daily average. The reporter only reads data; it never modifies the store. Print the report as a simple table with amounts aligned.",
        "concepts": [
          "Aggregation",
          "Grouping",
          "Reporting"
        ],
        "hints": [
          "Group by category with a dictionary.",
          "Compute the daily average from the number of days in the month.",
          "Sort categories by total, largest first."
        ],
        "acceptanceCriteria": [
          "Category totals add up to the grand total",
          "The daily average is correct",
          "An empty month reports zero"
        ],
        "tests": [
          "Report on a month with known expenses",
          "Report on an empty month",
          "Check the totals by hand"
        ]
      },
      {
        "id": "proj-expense-tracker-m4",
        "order": 4,
        "title": "Budgets and warnings",
        "objectives": [
          "Set a monthly budget per category",
          "Warn when spending exceeds it",
          "Show remaining budget"
        ],
        "instructions": "Add a budgets command to set a monthly limit per category, stored alongside the expenses. When listing or reporting, show a warning for any category that has exceeded its budget, including how much over it is.",
        "concepts": [
          "Budgets",
          "Warnings",
          "Configuration"
        ],
        "hints": [
          "Store budgets in a separate section of the JSON file.",
          "Compare spending to the budget in the report.",
          "Warn clearly but do not block adding expenses."
        ],
        "acceptanceCriteria": [
          "Setting a budget persists it",
          "Exceeding a budget shows a warning",
          "Remaining budget is shown"
        ],
        "tests": [
          "Set a food budget of 100 and spend 120",
          "Report the month and check the warning",
          "Set a budget for a new category"
        ]
      },
      {
        "id": "proj-expense-tracker-m5",
        "order": 5,
        "title": "CSV export",
        "objectives": [
          "Export a month to CSV",
          "Include headers",
          "Verify the export"
        ],
        "instructions": "Add an export command that writes a month of expenses to a CSV file with headers for date, category, amount and note. The CSV must open correctly in a spreadsheet application, with amounts formatted to two decimal places.",
        "concepts": [
          "CSV format",
          "Export",
          "Formatting"
        ],
        "hints": [
          "Use the csv module, not manual string joining.",
          "Write amounts as dollars with two decimals.",
          "Name the file with the month in it."
        ],
        "acceptanceCriteria": [
          "The CSV has a header row",
          "Every expense for the month is present",
          "Amounts show two decimals"
        ],
        "tests": [
          "Export a month and open the CSV",
          "Export an empty month",
          "Check the row count matches the list"
        ]
      },
      {
        "id": "proj-expense-tracker-m6",
        "order": 6,
        "title": "Testing and polish",
        "objectives": [
          "Write unit tests",
          "Test money math exactly",
          "Finish the README"
        ],
        "instructions": "Write unit tests for the store and the reporting module, including exact-cent arithmetic, empty months, budget warnings and CSV export. Run the suite and finish the README with example commands and a sample report.",
        "concepts": [
          "Unit testing",
          "Exact arithmetic",
          "Documentation"
        ],
        "hints": [
          "Test that 0.10 plus 0.20 equals 0.30 exactly.",
          "Use temporary files for store tests.",
          "Show a sample monthly report in the README."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Money math is exact",
          "The README shows example output"
        ],
        "tests": [
          "Run the full test suite",
          "Add 0.10 and 0.20 and check the total",
          "Follow the README steps"
        ]
      }
    ],
    "reviewChecklist": [
      "Expenses persist across restarts",
      "Reports add up correctly",
      "Money is exact to the cent",
      "Budgets warn when exceeded",
      "CSV export is correct",
      "Tests cover store and reports"
    ],
    "finalAssessment": [
      "Add expenses in two categories",
      "Show the monthly report",
      "Show a budget warning",
      "Export the month to CSV",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-unit-converter",
    "slug": "unit-converter",
    "level": 1,
    "title": "Unit Converter",
    "description": "Build a unit converter that converts between length, weight, temperature and volume units from the command line. It supports batch conversions from a file and explains the conversion it performed.",
    "skills": [
      "Python",
      "Conversion math",
      "Unit systems",
      "CLI design",
      "File input",
      "Error handling",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Convert between length units (mm, cm, m, km, inch, foot, yard, mile)",
      "Convert between weight units (g, kg, lb, oz)",
      "Convert between temperature units (C, F, K) with the correct formulas",
      "Convert between volume units (ml, l, cup, gallon)",
      "Show the conversion formula used",
      "Convert many values at once from a text file",
      "Reject conversions between incompatible unit types",
      "List all supported units grouped by type"
    ],
    "nonFunctionalRequirements": [
      "Conversions are accurate to at least 6 significant figures",
      "Temperature conversions use the correct offset formulas",
      "Incompatible conversions are rejected with a clear message",
      "Batch mode processes every line and reports errors per line",
      "No external packages are needed"
    ],
    "architecture": "The converter is built around a table of conversion factors to a base unit per category (metre, gram, litre), so every conversion goes through the base unit. Temperature is special-cased because it needs an offset as well as a scale. A small parser handles single conversions and batch files, and the CLI prints the result with the formula used.",
    "databaseSchema": "",
    "apis": [
      "No external API; the interface is the command line and optional input files."
    ],
    "fileStructure": "unit-converter/\n  main.py\n  converter/\n    __init__.py\n    units.py\n    convert.py\n    batch.py\n  tests/\n    test_convert.py\n  README.md",
    "taskBreakdown": [
      "Build the unit tables and the core converter",
      "Add temperature conversions",
      "Build the CLI for single conversions",
      "Add the list-units command",
      "Add batch file conversion",
      "Add error handling for bad units and values",
      "Write unit tests with known conversions",
      "Document the supported units"
    ],
    "milestones": [
      {
        "id": "proj-unit-converter-m1",
        "order": 1,
        "title": "Unit tables and core conversion",
        "objectives": [
          "Define units per category",
          "Convert through a base unit",
          "Handle aliases"
        ],
        "instructions": "Create a table of units grouped by category, each with a factor to the category base unit (metre for length, gram for weight, litre for volume). Implement conversion as value times source factor divided by target factor. Support common aliases such as meters for metre.",
        "concepts": [
          "Conversion factors",
          "Base units",
          "Dictionaries"
        ],
        "hints": [
          "Store factors to the base unit, not between every pair.",
          "Normalise unit names to lowercase.",
          "Keep aliases in the same table."
        ],
        "acceptanceCriteria": [
          "1 km converts to 1000 m",
          "12 inch converts to 1 foot",
          "An unknown unit is an error"
        ],
        "tests": [
          "Convert 1 km to m",
          "Convert 12 inch to foot",
          "Convert 5 parsec to m"
        ]
      },
      {
        "id": "proj-unit-converter-m2",
        "order": 2,
        "title": "Temperature conversions",
        "objectives": [
          "Convert Celsius, Fahrenheit and Kelvin",
          "Handle the offset correctly",
          "Reject impossible temperatures"
        ],
        "instructions": "Implement temperature conversion with the proper formulas, converting through Celsius as the intermediate. Reject temperatures below absolute zero with a clear error.",
        "concepts": [
          "Temperature formulas",
          "Offsets",
          "Validation"
        ],
        "hints": [
          "Convert to Celsius first, then to the target.",
          "Absolute zero is -273.15 C, -459.67 F and 0 K.",
          "Do not use the factor-table path for temperature."
        ],
        "acceptanceCriteria": [
          "0 C converts to 32 F",
          "100 C converts to 212 F",
          "-300 C is rejected"
        ],
        "tests": [
          "Convert 0 C to F",
          "Convert 100 C to K",
          "Convert -300 C to F"
        ]
      },
      {
        "id": "proj-unit-converter-m3",
        "order": 3,
        "title": "CLI and formula display",
        "objectives": [
          "Parse conversion commands",
          "Show the formula used",
          "Format results cleanly"
        ],
        "instructions": "Build the CLI so a user can type convert 5 km to miles and get the result with the formula shown. Format numbers sensibly, trimming unnecessary trailing zeroes, and keep the output to one clear line.",
        "concepts": [
          "Command parsing",
          "Output formatting",
          "User experience"
        ],
        "hints": [
          "Parse value, source unit, target unit from the command.",
          "Show the factor or formula applied.",
          "Round display to 6 significant figures."
        ],
        "acceptanceCriteria": [
          "convert 5 km to miles prints the result",
          "The formula is shown",
          "Bad input prints usage help"
        ],
        "tests": [
          "Convert 5 km to miles",
          "Convert 2 kg to lb",
          "Run convert with a missing unit"
        ]
      },
      {
        "id": "proj-unit-converter-m4",
        "order": 4,
        "title": "List units and batch mode",
        "objectives": [
          "List all supported units",
          "Convert a file of values",
          "Report per-line errors"
        ],
        "instructions": "Add a list command that prints every unit grouped by category. Add a batch mode that reads lines of value, source unit and target unit from a file, converts each one, and reports any line that fails without stopping the whole file.",
        "concepts": [
          "Batch processing",
          "File reading",
          "Error reporting"
        ],
        "hints": [
          "Process lines one at a time and collect results.",
          "Report the line number for failures.",
          "Skip blank lines and comment lines starting with #."
        ],
        "acceptanceCriteria": [
          "list shows all units grouped by type",
          "A batch file converts every line",
          "A bad line is reported and skipped"
        ],
        "tests": [
          "Run list",
          "Convert a batch file with 5 lines",
          "Add a bad line to the batch file"
        ]
      },
      {
        "id": "proj-unit-converter-m5",
        "order": 5,
        "title": "Testing and polish",
        "objectives": [
          "Write unit tests",
          "Test known conversions",
          "Finish the README"
        ],
        "instructions": "Write unit tests using well-known conversions (1 mile is 1609.344 metres, 0 C is 32 F, 1 kg is 2.20462 lb) and test the error cases. Run the suite and finish the README with a table of supported units.",
        "concepts": [
          "Unit testing",
          "Known values",
          "Documentation"
        ],
        "hints": [
          "Assert with a small tolerance for floating point results.",
          "Test each category at least twice.",
          "List every unit in the README."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Known conversions are accurate",
          "The README lists all units"
        ],
        "tests": [
          "Run the full test suite",
          "Convert 1 mile to metres",
          "Follow the README examples"
        ]
      },
      {
        "id": "proj-unit-converter-m6",
        "order": 6,
        "title": "Conversion history",
        "objectives": [
          "Save conversions to a history file",
          "Recall past conversions",
          "Clear the history"
        ],
        "instructions": "Add a history file that records each conversion with the input, output and timestamp, plus a history command to list recent conversions and a clear command. History must survive restarts.",
        "concepts": [
          "File persistence",
          "History",
          "Timestamps"
        ],
        "hints": [
          "Append one line per conversion.",
          "Keep the history file next to the program.",
          "Limit the listing to the most recent 20 entries."
        ],
        "acceptanceCriteria": [
          "Conversions are recorded",
          "History survives a restart",
          "Clear empties the history"
        ],
        "tests": [
          "Convert twice then list history",
          "Restart and list history",
          "Clear and list again"
        ]
      }
    ],
    "reviewChecklist": [
      "Conversions are accurate",
      "Temperature uses the correct formulas",
      "Incompatible units are rejected",
      "Batch mode handles errors per line",
      "Tests use known reference values",
      "The README lists every unit"
    ],
    "finalAssessment": [
      "Convert 5 km to miles",
      "Convert 100 C to F",
      "Show the formula for a conversion",
      "Convert a batch file",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-quiz-app",
    "slug": "quiz-application",
    "level": 1,
    "title": "Quiz Application",
    "description": "Build a quiz application that loads questions from a JSON file, asks them one at a time, scores the answers, and shows a report at the end. It supports multiple-choice and true/false questions, a timer per question, and multiple quiz files.",
    "skills": [
      "Python",
      "JSON data files",
      "CLI interaction",
      "Scoring",
      "Timers",
      "Randomisation",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Load questions from a JSON file",
      "Support multiple-choice and true/false questions",
      "Ask questions one at a time and read the answer",
      "Shuffle the question order and the answer options",
      "Score the answers and show the percentage at the end",
      "Enforce an optional time limit per question",
      "Show a review at the end with the correct answers",
      "Support several quiz files and let the user pick one"
    ],
    "nonFunctionalRequirements": [
      "Questions load from any well-formed quiz JSON file",
      "Shuffling changes the order between runs",
      "The score is computed correctly from the answers",
      "A timed-out question counts as wrong, not as a crash",
      "The review shows every question with the right answer"
    ],
    "architecture": "The quiz has a question model, a loader that reads and validates a quiz JSON file, an engine that runs the session (shuffling, asking, timing, scoring), and a CLI that presents questions and prints the final report. The engine is separate from the CLI so it can be tested without user input.",
    "databaseSchema": "questions: id, type (multiple-choice | true-false), question, options, answer, explanation, points",
    "apis": [
      "No external API; the interface is the command line and quiz JSON files."
    ],
    "fileStructure": "quiz-app/\n  main.py\n  quiz/\n    __init__.py\n    models.py\n    loader.py\n    engine.py\n    cli.py\n  quizzes/\n    general.json\n    python.json\n  tests/\n    test_loader.py\n    test_engine.py\n  README.md",
    "taskBreakdown": [
      "Design the question model and quiz JSON format",
      "Implement the loader with validation",
      "Implement the engine with scoring",
      "Build the CLI question flow",
      "Add shuffling and the timer",
      "Add the end-of-quiz review",
      "Write unit tests",
      "Create two sample quizzes and document the format"
    ],
    "milestones": [
      {
        "id": "proj-quiz-app-m1",
        "order": 1,
        "title": "Question model and quiz format",
        "objectives": [
          "Define the question model",
          "Design the quiz JSON format",
          "Create a sample quiz"
        ],
        "instructions": "Design the JSON format for a quiz: a title, a list of questions, each with a type, text, options, the correct answer and an explanation. Create a sample quiz file with at least 5 questions of both types and validate it by hand.",
        "concepts": [
          "JSON design",
          "Data modelling",
          "Schemas"
        ],
        "hints": [
          "Keep the format flat and readable.",
          "Use an index for the correct answer, not the text.",
          "Include an explanation for learning."
        ],
        "acceptanceCriteria": [
          "The sample quiz file is valid JSON",
          "It contains both question types",
          "Every question has an explanation"
        ],
        "tests": [
          "Validate the JSON file",
          "Check every question has an answer",
          "Load it with a quick script"
        ]
      },
      {
        "id": "proj-quiz-app-m2",
        "order": 2,
        "title": "Loader with validation",
        "objectives": [
          "Load a quiz file",
          "Validate its structure",
          "Report useful errors"
        ],
        "instructions": "Write a loader that reads a quiz JSON file and validates it: the file must have a title and questions, each question must have valid options and an answer index in range, and true/false questions must have exactly two options. Bad files produce a clear error naming the problem.",
        "concepts": [
          "JSON parsing",
          "Validation",
          "Error messages"
        ],
        "hints": [
          "Validate before building question objects.",
          "Name the question number in every error.",
          "Check the answer index is within the options."
        ],
        "acceptanceCriteria": [
          "A valid quiz loads correctly",
          "A missing answer is reported",
          "An out-of-range answer index is reported"
        ],
        "tests": [
          "Load the sample quiz",
          "Load a quiz with a missing field",
          "Load a quiz with a bad answer index"
        ]
      },
      {
        "id": "proj-quiz-app-m3",
        "order": 3,
        "title": "Engine and scoring",
        "objectives": [
          "Run a quiz session",
          "Score answers",
          "Track per-question results"
        ],
        "instructions": "Write an engine that takes a list of questions and a function that supplies answers, asks each question in order, records whether each answer was right, and computes the total score and percentage. Keep the engine free of input and output so it can be tested with scripted answers.",
        "concepts": [
          "Separation of concerns",
          "Scoring",
          "Testability"
        ],
        "hints": [
          "Pass the answer supplier in as a function.",
          "Record the result of every question.",
          "Support weighted points per question."
        ],
        "acceptanceCriteria": [
          "All correct answers give 100 percent",
          "Half correct gives 50 percent",
          "Results record each question"
        ],
        "tests": [
          "Run the engine with all correct answers",
          "Run it with half correct",
          "Run it with all wrong"
        ]
      },
      {
        "id": "proj-quiz-app-m4",
        "order": 4,
        "title": "CLI question flow and shuffling",
        "objectives": [
          "Present questions in the CLI",
          "Shuffle questions and options",
          "Read and validate answers"
        ],
        "instructions": "Build the CLI that prints each question with lettered options, reads the user answer, and validates it. Add shuffling of the question order and of the options within each question, keeping track of where the correct answer moved.",
        "concepts": [
          "User input",
          "Randomisation",
          "Option mapping"
        ],
        "hints": [
          "Shuffle a copy of the options and remap the answer index.",
          "Accept answers case-insensitively.",
          "Reject letters outside the option range."
        ],
        "acceptanceCriteria": [
          "Questions appear in a different order each run",
          "Options are shuffled but the answer stays correct",
          "An invalid letter is rejected"
        ],
        "tests": [
          "Run the quiz twice and compare order",
          "Answer every question",
          "Type an invalid letter"
        ]
      },
      {
        "id": "proj-quiz-app-m5",
        "order": 5,
        "title": "Timer and review",
        "objectives": [
          "Add a per-question time limit",
          "Count timeouts as wrong",
          "Show a review with explanations"
        ],
        "instructions": "Add an optional seconds-per-question limit: if the user does not answer in time, the question counts as wrong and the quiz moves on. At the end, print the score, the percentage, and a review listing each question, the user answer, the correct answer and the explanation.",
        "concepts": [
          "Timers",
          "Timeouts",
          "Reporting"
        ],
        "hints": [
          "Use a simple input timeout approach and document its limits.",
          "A timeout must not crash the quiz.",
          "Show the review even when the user quits early."
        ],
        "acceptanceCriteria": [
          "A timeout counts as wrong",
          "The review shows correct answers",
          "The score line shows percentage"
        ],
        "tests": [
          "Run with a 2-second limit and let a question time out",
          "Complete a quiz and read the review",
          "Quit early and check the partial report"
        ]
      },
      {
        "id": "proj-quiz-app-m6",
        "order": 6,
        "title": "Testing and polish",
        "objectives": [
          "Write unit tests",
          "Test the engine without input",
          "Document the quiz format"
        ],
        "instructions": "Write unit tests for the loader and the engine using scripted answers, including shuffling, scoring and timeout handling. Create a second sample quiz, run the full suite, and document the quiz JSON format in the README.",
        "concepts": [
          "Unit testing",
          "Test doubles",
          "Documentation"
        ],
        "hints": [
          "Test the engine with a fake answer function.",
          "Test shuffling by checking the same questions appear.",
          "Document every field of the quiz format."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Two sample quizzes exist",
          "The README documents the format"
        ],
        "tests": [
          "Run the full test suite",
          "Play both sample quizzes",
          "Follow the README to write a new quiz"
        ]
      }
    ],
    "reviewChecklist": [
      "The loader rejects malformed quizzes with clear errors",
      "Scoring is correct",
      "Shuffling preserves the correct answers",
      "Timeouts are handled gracefully",
      "The review is complete",
      "Two sample quizzes are included"
    ],
    "finalAssessment": [
      "Load and play the general quiz",
      "Show the score and review",
      "Play the Python quiz",
      "Show a timeout counting as wrong",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-contact-manager",
    "slug": "basic-contact-manager",
    "level": 1,
    "title": "Basic Contact Manager",
    "description": "Build a contact manager that stores names, phone numbers, email addresses and notes in a JSON file. It supports adding, searching, editing, deleting and listing contacts, with validation for phone numbers and email addresses.",
    "skills": [
      "Python",
      "JSON persistence",
      "Validation",
      "Search",
      "CRUD",
      "CLI design",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Add a contact with name, phone, email and notes",
      "List all contacts sorted by name",
      "Search contacts by name, phone or email",
      "Edit any field of an existing contact",
      "Delete a contact by name or id",
      "Validate email addresses and phone numbers on entry",
      "Prevent duplicate contacts with the same email",
      "Export contacts to CSV"
    ],
    "nonFunctionalRequirements": [
      "Contacts persist across restarts",
      "Search finds partial matches case-insensitively",
      "Invalid emails and phone numbers are rejected",
      "No two contacts share the same email",
      "The JSON file stays valid after every operation"
    ],
    "architecture": "The manager has a contact model, a JSON store, a service layer with the business rules (validation, duplicate checks, search), and a CLI. Validation uses simple regular expressions for email and phone formats. The service layer is tested directly without the CLI.",
    "databaseSchema": "contacts: id, name, phone, email, notes, created_at, updated_at",
    "apis": [
      "No external API; the interface is the command line and the JSON data file."
    ],
    "fileStructure": "contact-manager/\n  main.py\n  contacts/\n    __init__.py\n    models.py\n    store.py\n    service.py\n    validate.py\n    cli.py\n  tests/\n    test_service.py\n    test_validate.py\n  contacts.json\n  README.md",
    "taskBreakdown": [
      "Design the contact model and store",
      "Implement validation for email and phone",
      "Implement the service layer with CRUD",
      "Implement search",
      "Build the CLI",
      "Add CSV export",
      "Write unit tests",
      "Document the commands"
    ],
    "milestones": [
      {
        "id": "proj-contact-manager-m1",
        "order": 1,
        "title": "Model, store and validation",
        "objectives": [
          "Define the contact model",
          "Validate email and phone",
          "Persist contacts"
        ],
        "instructions": "Create a Contact model and a JSON store. Write validators for email addresses (must contain an at sign and a domain) and phone numbers (digits with optional plus, spaces and dashes). Invalid values are rejected with a message naming the bad field.",
        "concepts": [
          "Validation",
          "Regular expressions",
          "JSON persistence"
        ],
        "hints": [
          "Keep validators small and testable.",
          "Validate before saving, never after.",
          "Normalise phone numbers by stripping spaces for storage."
        ],
        "acceptanceCriteria": [
          "A valid email passes validation",
          "An email without a domain fails",
          "A phone with letters fails"
        ],
        "tests": [
          "Validate several emails",
          "Validate several phone numbers",
          "Save and reload a contact"
        ]
      },
      {
        "id": "proj-contact-manager-m2",
        "order": 2,
        "title": "Service layer CRUD",
        "objectives": [
          "Add contacts",
          "Prevent duplicate emails",
          "Edit and delete"
        ],
        "instructions": "Write a service layer that adds, edits, deletes and lists contacts. Adding a contact with an email that already exists is rejected. Editing re-validates the changed fields. Deleting a missing contact reports an error.",
        "concepts": [
          "Service layer",
          "Uniqueness",
          "Business rules"
        ],
        "hints": [
          "Check duplicates by normalised lowercase email.",
          "Assign an incrementing id to each contact.",
          "Return result objects with success and message."
        ],
        "acceptanceCriteria": [
          "Adding a contact works",
          "A duplicate email is rejected",
          "Editing updates the field"
        ],
        "tests": [
          "Add two contacts",
          "Add a third with a duplicate email",
          "Edit a phone number"
        ]
      },
      {
        "id": "proj-contact-manager-m3",
        "order": 3,
        "title": "Search",
        "objectives": [
          "Search by name, phone or email",
          "Support partial matches",
          "Sort results by name"
        ],
        "instructions": "Implement search that matches a query against name, phone and email as a case-insensitive substring. Return the matches sorted by name, and report clearly when nothing matches.",
        "concepts": [
          "Search",
          "Case-insensitive matching",
          "Sorting"
        ],
        "hints": [
          "Lowercase both the query and the fields before comparing.",
          "Search all three fields in one pass.",
          "Sort the results, not the stored list."
        ],
        "acceptanceCriteria": [
          "Searching by part of a name finds the contact",
          "Searching by phone fragment works",
          "No match reports clearly"
        ],
        "tests": [
          "Search for a partial name",
          "Search for a phone fragment",
          "Search for a missing name"
        ]
      },
      {
        "id": "proj-contact-manager-m4",
        "order": 4,
        "title": "CLI and CSV export",
        "objectives": [
          "Build the command loop",
          "Print contacts readably",
          "Export to CSV"
        ],
        "instructions": "Build the CLI with add, list, search, edit, delete and export commands. Add an export command that writes all contacts to a CSV file with headers. Print contacts in a readable format with aligned columns.",
        "concepts": [
          "CLI design",
          "CSV export",
          "Formatting"
        ],
        "hints": [
          "Keep command parsing in one place.",
          "Use the csv module for export.",
          "Show the contact id in listings so edit and delete can use it."
        ],
        "acceptanceCriteria": [
          "All commands work from the CLI",
          "Export produces a valid CSV",
          "Listings show ids"
        ],
        "tests": [
          "Run each command once",
          "Export and open the CSV",
          "List contacts and check formatting"
        ]
      },
      {
        "id": "proj-contact-manager-m5",
        "order": 5,
        "title": "Testing and polish",
        "objectives": [
          "Write unit tests",
          "Test validation and duplicates",
          "Finish the README"
        ],
        "instructions": "Write unit tests for the validators and the service layer, including duplicate emails, partial search, editing and persistence round-trips. Run the suite and finish the README with example commands.",
        "concepts": [
          "Unit testing",
          "Edge cases",
          "Documentation"
        ],
        "hints": [
          "Test validators with a table of valid and invalid inputs.",
          "Use temporary files for store tests.",
          "Document the duplicate-email rule."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Duplicate emails are covered by tests",
          "The README is complete"
        ],
        "tests": [
          "Run the full test suite",
          "Try adding a duplicate email",
          "Follow the README"
        ]
      },
      {
        "id": "proj-contact-manager-m6",
        "order": 6,
        "title": "Groups and favourites",
        "objectives": [
          "Group contacts by label",
          "Mark contacts as favourites",
          "List favourites first"
        ],
        "instructions": "Add labels (such as family or work) to contacts and a favourite flag. Add commands to list by label and to list favourites first. A contact can have several labels.",
        "concepts": [
          "Grouping",
          "Flags",
          "Filtering"
        ],
        "hints": [
          "Store labels as a list on the contact.",
          "Sort favourites before others.",
          "Validate label names."
        ],
        "acceptanceCriteria": [
          "Labels filter correctly",
          "Favourites sort first",
          "A contact can have several labels"
        ],
        "tests": [
          "Label two contacts and filter",
          "Mark one favourite and list",
          "Add a second label to a contact"
        ]
      }
    ],
    "reviewChecklist": [
      "Validation rejects bad emails and phones",
      "Duplicate emails are blocked",
      "Search is case-insensitive and partial",
      "Contacts persist across restarts",
      "CSV export works",
      "Tests cover validators and service"
    ],
    "finalAssessment": [
      "Add three contacts",
      "Search by a partial name",
      "Show a duplicate email being rejected",
      "Export to CSV",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-log-parser",
    "slug": "log-parser",
    "level": 1,
    "title": "Log Parser",
    "description": "Build a log parser that reads web server access logs, extracts the useful fields, and produces summaries: requests per status code, top requested paths, top IP addresses, error rates and traffic by hour. It handles malformed lines gracefully.",
    "skills": [
      "Python",
      "Regular expressions",
      "File parsing",
      "Aggregation",
      "Reporting",
      "CLI design",
      "Testing"
    ],
    "language": "python",
    "functionalRequirements": [
      "Parse Common Log Format access log lines",
      "Extract IP, timestamp, method, path, status and size",
      "Count requests per HTTP status code",
      "List the most requested paths",
      "List the most frequent IP addresses",
      "Compute the error rate (4xx and 5xx)",
      "Show requests per hour",
      "Skip malformed lines and report how many were skipped"
    ],
    "nonFunctionalRequirements": [
      "Parses at least 10,000 lines in a few seconds",
      "Malformed lines are skipped, never fatal",
      "All counts add up to the number of valid lines",
      "The report is readable as plain text",
      "The parser works on any file in Common Log Format"
    ],
    "architecture": "The parser is a pipeline: a line parser uses a regular expression to extract fields into a record, an aggregator counts by status, path, IP and hour in a single pass, and a reporter prints the summary tables. Malformed lines are counted and reported, not discarded silently.",
    "databaseSchema": "",
    "apis": [
      "No external API; the interface is the command line and log files."
    ],
    "fileStructure": "log-parser/\n  main.py\n  logparser/\n    __init__.py\n    parser.py\n    aggregate.py\n    report.py\n  tests/\n    test_parser.py\n    test_aggregate.py\n  sample.log\n  README.md",
    "taskBreakdown": [
      "Write the log line parser with a regex",
      "Implement the aggregators",
      "Build the report printer",
      "Handle malformed lines",
      "Add command-line options for top-N and filters",
      "Generate a large sample log for testing",
      "Write unit tests",
      "Document the log format supported"
    ],
    "milestones": [
      {
        "id": "proj-log-parser-m1",
        "order": 1,
        "title": "Log line parser",
        "objectives": [
          "Write a regex for Common Log Format",
          "Extract all fields",
          "Parse timestamps"
        ],
        "instructions": "Write a regular expression that matches a Common Log Format line and extracts the IP, timestamp, method, path, status code and response size. Parse the timestamp into a datetime. Return None for lines that do not match instead of raising.",
        "concepts": [
          "Regular expressions",
          "Named groups",
          "Datetime parsing"
        ],
        "hints": [
          "Use named groups so the fields are self-documenting.",
          "Handle a dash in the size field as zero.",
          "Test the regex against real-looking lines."
        ],
        "acceptanceCriteria": [
          "A valid line parses all fields",
          "The status is an integer",
          "A malformed line returns None"
        ],
        "tests": [
          "Parse a GET line",
          "Parse a POST line with a 404",
          "Parse a garbage line"
        ]
      },
      {
        "id": "proj-log-parser-m2",
        "order": 2,
        "title": "Aggregators",
        "objectives": [
          "Count by status code",
          "Find top paths and IPs",
          "Bucket requests by hour"
        ],
        "instructions": "Write an aggregator that processes parsed records in one pass, counting requests per status code, per path, per IP and per hour. Keep the counts in dictionaries and expose functions that return the top N of each.",
        "concepts": [
          "Aggregation",
          "Counters",
          "Single pass"
        ],
        "hints": [
          "Use collections.Counter for the counts.",
          "Bucket hours by truncating the timestamp.",
          "Keep the aggregator separate from the report."
        ],
        "acceptanceCriteria": [
          "Status counts sum to the valid line count",
          "Top paths are ordered by count",
          "Hourly buckets cover the log range"
        ],
        "tests": [
          "Aggregate a small sample by hand",
          "Check the totals add up",
          "Ask for the top 3 paths"
        ]
      },
      {
        "id": "proj-log-parser-m3",
        "order": 3,
        "title": "Report printer",
        "objectives": [
          "Print a readable summary",
          "Show error rates",
          "Format tables"
        ],
        "instructions": "Write a reporter that prints a summary: total requests, valid and skipped lines, requests per status, top paths, top IPs, error rate as a percentage, and requests per hour. Format the tables with aligned columns.",
        "concepts": [
          "Reporting",
          "Formatting",
          "Percentages"
        ],
        "hints": [
          "Compute the error rate as 4xx plus 5xx over total.",
          "Align numbers to the right.",
          "Keep the report to one screen for small logs."
        ],
        "acceptanceCriteria": [
          "The report shows all sections",
          "The error rate is correct",
          "Numbers are aligned"
        ],
        "tests": [
          "Run the report on the sample log",
          "Check the error rate by hand",
          "Run it on an empty log"
        ]
      },
      {
        "id": "proj-log-parser-m4",
        "order": 4,
        "title": "Malformed lines and options",
        "objectives": [
          "Skip bad lines safely",
          "Report the skip count",
          "Add top-N and status filters"
        ],
        "instructions": "Make the main flow count and report skipped lines, and never crash on a bad line. Add command-line options for the number of top entries to show and for filtering to a single status code.",
        "concepts": [
          "Defensive parsing",
          "Command-line options",
          "Filtering"
        ],
        "hints": [
          "Count skipped lines and print the count.",
          "Apply the filter before aggregating.",
          "Default the top-N to 10."
        ],
        "acceptanceCriteria": [
          "A log with bad lines still reports",
          "The skip count is shown",
          "Filtering to 404 works"
        ],
        "tests": [
          "Parse a log with 3 bad lines",
          "Filter to status 500",
          "Set top-N to 3"
        ]
      },
      {
        "id": "proj-log-parser-m5",
        "order": 5,
        "title": "Testing and polish",
        "objectives": [
          "Write unit tests",
          "Test with a large generated log",
          "Finish the README"
        ],
        "instructions": "Write unit tests for the parser and aggregator, generate a large sample log (at least 10,000 lines) to check performance, and finish the README with the supported format and example output.",
        "concepts": [
          "Unit testing",
          "Performance checks",
          "Documentation"
        ],
        "hints": [
          "Generate the sample log with a script, not by hand.",
          "Time the run on 10,000 lines.",
          "Show example report output in the README."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "10,000 lines parse in a few seconds",
          "The README shows example output"
        ],
        "tests": [
          "Run the full test suite",
          "Time the large log run",
          "Follow the README"
        ]
      },
      {
        "id": "proj-log-parser-m6",
        "order": 6,
        "title": "Export the report",
        "objectives": [
          "Write the report to a file",
          "Support JSON output",
          "Add a quiet mode"
        ],
        "instructions": "Add an output option that writes the report to a text file, a JSON flag that writes the same data as JSON for scripting, and a quiet mode that prints only the totals. Verify the JSON output parses.",
        "concepts": [
          "File output",
          "JSON",
          "CLI options"
        ],
        "hints": [
          "Reuse the same data for both formats.",
          "Validate the JSON with a parser.",
          "Quiet mode prints one line."
        ],
        "acceptanceCriteria": [
          "The text report file is written",
          "The JSON output parses",
          "Quiet mode prints one line"
        ],
        "tests": [
          "Export to a file and read it",
          "Export as JSON and parse it",
          "Run in quiet mode"
        ]
      }
    ],
    "reviewChecklist": [
      "Malformed lines never crash the parser",
      "All counts are consistent",
      "Top-N and filters work",
      "Performance is acceptable on 10,000 lines",
      "The report is readable",
      "Tests cover parsing and aggregation"
    ],
    "finalAssessment": [
      "Parse the sample log and show the report",
      "Show the top paths and IPs",
      "Show the error rate",
      "Show malformed lines being skipped",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-simple-api-client",
    "slug": "simple-api-client",
    "level": 1,
    "title": "Simple API Client",
    "description": "Build a command-line client for a public JSON API (such as JSONPlaceholder) that fetches resources, displays them nicely, caches responses, and handles network errors, retries and rate limits gracefully.",
    "skills": [
      "Python",
      "HTTP requests",
      "JSON APIs",
      "Caching",
      "Retries",
      "Error handling",
      "CLI design"
    ],
    "language": "python",
    "functionalRequirements": [
      "Fetch a list of resources from a JSON API",
      "Fetch a single resource by id",
      "Display results as a readable table",
      "Cache responses on disk with a time-to-live",
      "Retry failed requests with backoff",
      "Handle 404 and other HTTP errors with clear messages",
      "Support pagination through list endpoints",
      "Save a fetched resource to a JSON file"
    ],
    "nonFunctionalRequirements": [
      "Network failures produce a clear message, not a traceback",
      "Cached responses are used within the TTL",
      "Retries happen for transient failures only",
      "The client works with any JSONPlaceholder-style API",
      "No API key is required"
    ],
    "architecture": "The client has a small HTTP layer built on urllib that handles timeouts and status codes, a cache module that stores responses in a JSON file with timestamps, and a CLI that formats results as tables. Retries use exponential backoff for 5xx errors and network failures, but never for 4xx errors.",
    "databaseSchema": "",
    "apis": [
      "JSONPlaceholder (https://jsonplaceholder.typicode.com): GET /posts, GET /posts/{id}, GET /users, GET /users/{id}, GET /comments?postId={id}."
    ],
    "fileStructure": "api-client/\n  main.py\n  apiclient/\n    __init__.py\n    http.py\n    cache.py\n    format.py\n    cli.py\n  tests/\n    test_cache.py\n    test_format.py\n  README.md",
    "taskBreakdown": [
      "Set up the HTTP layer with urllib",
      "Implement list and get commands",
      "Add table formatting",
      "Add the disk cache with TTL",
      "Add retries with backoff",
      "Add pagination and save-to-file",
      "Write unit tests with mocked HTTP",
      "Document usage and error handling"
    ],
    "milestones": [
      {
        "id": "proj-simple-api-client-m1",
        "order": 1,
        "title": "HTTP layer and first fetch",
        "objectives": [
          "Make a GET request with urllib",
          "Parse JSON responses",
          "Handle HTTP errors"
        ],
        "instructions": "Write an HTTP helper that performs a GET request with a timeout, parses the JSON body, and raises a clear error for non-200 responses. Use it to fetch the post list from JSONPlaceholder and print the raw result.",
        "concepts": [
          "HTTP requests",
          "urllib",
          "JSON"
        ],
        "hints": [
          "Set a timeout so a hung server does not hang the tool.",
          "Raise different errors for 404 and 500.",
          "Keep the HTTP code in one module."
        ],
        "acceptanceCriteria": [
          "Fetching the post list works",
          "A 404 reports a clear error",
          "A timeout is handled"
        ],
        "tests": [
          "Fetch the post list",
          "Fetch a missing post id",
          "Fetch with the network disabled"
        ]
      },
      {
        "id": "proj-simple-api-client-m2",
        "order": 2,
        "title": "Commands and formatting",
        "objectives": [
          "Add list and get commands",
          "Format results as tables",
          "Support users and comments"
        ],
        "instructions": "Build the CLI with list-posts, get-post, list-users and comments commands. Format the output as aligned tables showing id, title or name, and a short preview. Keep the formatting in its own module so it can be tested.",
        "concepts": [
          "CLI design",
          "Table formatting",
          "Multiple resources"
        ],
        "hints": [
          "Truncate long titles for the table.",
          "Show one resource in detail for get.",
          "Reuse one table printer for all lists."
        ],
        "acceptanceCriteria": [
          "list-posts shows a table",
          "get-post shows one post in detail",
          "Comments for a post are listed"
        ],
        "tests": [
          "Run list-posts",
          "Run get-post 1",
          "Run comments for post 1"
        ]
      },
      {
        "id": "proj-simple-api-client-m3",
        "order": 3,
        "title": "Disk cache with TTL",
        "objectives": [
          "Cache responses to disk",
          "Respect a time-to-live",
          "Add a cache clear command"
        ],
        "instructions": "Add a cache that stores each response in a JSON file keyed by URL, with the time it was fetched. Responses younger than the TTL (default 5 minutes) are served from the cache; older ones are refetched. Add a cache-clear command.",
        "concepts": [
          "Caching",
          "Time-to-live",
          "JSON storage"
        ],
        "hints": [
          "Key the cache by the full URL.",
          "Store the fetch time with each entry.",
          "Handle a corrupt cache file by ignoring it."
        ],
        "acceptanceCriteria": [
          "The second identical request is served from cache",
          "An expired entry is refetched",
          "cache-clear empties the cache"
        ],
        "tests": [
          "Fetch the same post twice and time it",
          "Wait for expiry or set a short TTL",
          "Run cache-clear"
        ]
      },
      {
        "id": "proj-simple-api-client-m4",
        "order": 4,
        "title": "Retries and pagination",
        "objectives": [
          "Retry transient failures",
          "Use exponential backoff",
          "Walk through paginated results"
        ],
        "instructions": "Add retries with exponential backoff for network errors and 5xx responses, up to 3 attempts, and never retry 4xx errors. Add pagination support that follows page parameters until all results are collected.",
        "concepts": [
          "Retries",
          "Exponential backoff",
          "Pagination"
        ],
        "hints": [
          "Retry only what might succeed on a retry.",
          "Double the wait between attempts.",
          "Stop paginating on an empty page."
        ],
        "acceptanceCriteria": [
          "A transient failure is retried",
          "A 404 is not retried",
          "Pagination collects all pages"
        ],
        "tests": [
          "Simulate a failing request",
          "Fetch a missing resource",
          "List all posts with pagination"
        ]
      },
      {
        "id": "proj-simple-api-client-m5",
        "order": 5,
        "title": "Testing and polish",
        "objectives": [
          "Write unit tests with mocked HTTP",
          "Test the cache and retries",
          "Finish the README"
        ],
        "instructions": "Write unit tests that mock the HTTP layer to check formatting, caching, TTL expiry, retry behaviour and error messages. Run the suite and finish the README with example commands and a note on the API used.",
        "concepts": [
          "Unit testing",
          "Mocking",
          "Documentation"
        ],
        "hints": [
          "Mock at the HTTP helper boundary.",
          "Test that a 404 is not retried.",
          "Document the cache location and TTL."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "No test needs the network",
          "The README documents every command"
        ],
        "tests": [
          "Run the full test suite",
          "Run the client with the network disabled",
          "Follow the README"
        ]
      },
      {
        "id": "proj-simple-api-client-m6",
        "order": 6,
        "title": "Search and filtering",
        "objectives": [
          "Filter posts by user",
          "Search post titles",
          "Sort results"
        ],
        "instructions": "Add options to filter the post list by user id, search titles for a word, and sort by id or title. Combine the filters in one request and show the result count.",
        "concepts": [
          "Filtering",
          "Search",
          "Sorting"
        ],
        "hints": [
          "Filter client-side from the fetched list.",
          "Search case-insensitively.",
          "Show how many results matched."
        ],
        "acceptanceCriteria": [
          "Filtering by user works",
          "Title search works",
          "Sorting works"
        ],
        "tests": [
          "List posts for user 1",
          "Search for a word",
          "Sort by title"
        ]
      }
    ],
    "reviewChecklist": [
      "Network errors are handled gracefully",
      "Caching respects the TTL",
      "Retries only happen for transient failures",
      "Pagination works",
      "Output is readable tables",
      "Tests mock the network"
    ],
    "finalAssessment": [
      "Fetch and display the post list",
      "Fetch a single post",
      "Show the cache being used",
      "Show a 404 handled gracefully",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-student-management",
    "slug": "student-management-system",
    "level": 2,
    "title": "Student Management System",
    "description": "Build a student management system with a SQLite database that stores students, courses and enrolments. It supports CRUD operations, enrolment with capacity limits, grade recording, GPA calculation and reports, through a CLI.",
    "skills": [
      "Python",
      "SQLite",
      "SQL",
      "Data modelling",
      "CRUD",
      "Reporting",
      "CLI design"
    ],
    "language": "python",
    "functionalRequirements": [
      "Add, edit, delete and list students",
      "Add courses with a capacity limit",
      "Enrol students in courses respecting capacity",
      "Record grades for enrolments",
      "Calculate each student GPA on a 4.0 scale",
      "List all students in a course and all courses for a student",
      "Prevent duplicate enrolments",
      "Export a transcript for a student"
    ],
    "nonFunctionalRequirements": [
      "Data persists in SQLite across restarts",
      "Capacity limits are never exceeded",
      "GPA math is correct",
      "Duplicate enrolments are blocked",
      "All database access uses parameterised queries"
    ],
    "architecture": "The system uses SQLite with three tables (students, courses, enrolments) and foreign keys. A data-access layer wraps the SQL, a service layer enforces the rules (capacity, duplicates, GPA), and the CLI presents the commands. The database file lives next to the program and migrations run at startup.",
    "databaseSchema": "students: id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE, enrolled_on TEXT; courses: id INTEGER PRIMARY KEY, code TEXT UNIQUE, title TEXT, capacity INTEGER, credits INTEGER; enrolments: student_id INTEGER REFERENCES students(id), course_id INTEGER REFERENCES courses(id), grade TEXT, PRIMARY KEY (student_id, course_id)",
    "apis": [
      "No external API; the interface is the CLI and the SQLite database file."
    ],
    "fileStructure": "student-mgmt/\n  main.py\n  sms/\n    __init__.py\n    db.py\n    models.py\n    service.py\n    gpa.py\n    cli.py\n  tests/\n    test_service.py\n    test_gpa.py\n  students.db\n  README.md",
    "taskBreakdown": [
      "Design the schema and set up SQLite",
      "Implement student and course CRUD",
      "Implement enrolment with capacity checks",
      "Implement grade recording",
      "Implement GPA calculation",
      "Implement transcripts and reports",
      "Write unit tests with an in-memory database",
      "Document the commands"
    ],
    "milestones": [
      {
        "id": "proj-student-management-m1",
        "order": 1,
        "title": "Schema and database setup",
        "objectives": [
          "Design the three tables",
          "Create the database",
          "Run migrations at startup"
        ],
        "instructions": "Design the students, courses and enrolments tables with foreign keys and a unique constraint on enrolment pairs. Write a db module that creates the tables if they do not exist and enables foreign key enforcement. Verify the schema with the sqlite3 command-line tool.",
        "concepts": [
          "SQLite",
          "Schema design",
          "Foreign keys"
        ],
        "hints": [
          "Enable foreign keys with PRAGMA foreign_keys.",
          "Use a composite primary key for enrolments.",
          "Keep the schema creation in one idempotent function."
        ],
        "acceptanceCriteria": [
          "The database file is created on first run",
          "All three tables exist",
          "Foreign keys are enforced"
        ],
        "tests": [
          "Run the program and inspect the schema",
          "Insert an enrolment for a missing student",
          "Run the program twice"
        ]
      },
      {
        "id": "proj-student-management-m2",
        "order": 2,
        "title": "Student and course CRUD",
        "objectives": [
          "Add and list students",
          "Add and list courses",
          "Edit and delete records"
        ],
        "instructions": "Implement the service functions and CLI commands to add, list, edit and delete students and courses. Deleting a student removes their enrolments through the foreign key cascade. Validate emails and course codes.",
        "concepts": [
          "CRUD",
          "Service layer",
          "Validation"
        ],
        "hints": [
          "Use parameterised queries everywhere.",
          "Validate email format on add.",
          "Course codes must be unique."
        ],
        "acceptanceCriteria": [
          "Adding a student works",
          "A duplicate email is rejected",
          "Deleting a student removes enrolments"
        ],
        "tests": [
          "Add two students and list them",
          "Add a duplicate email",
          "Delete a student with enrolments"
        ]
      },
      {
        "id": "proj-student-management-m3",
        "order": 3,
        "title": "Enrolment with capacity",
        "objectives": [
          "Enrol a student in a course",
          "Enforce capacity limits",
          "Block duplicate enrolments"
        ],
        "instructions": "Implement enrolment: check the student and course exist, check the course is not full, and check the student is not already enrolled. Each failure reports a clear message. Add commands to list the students in a course and the courses of a student.",
        "concepts": [
          "Business rules",
          "Capacity",
          "Joins"
        ],
        "hints": [
          "Count current enrolments before inserting.",
          "Use a transaction for the check and insert.",
          "Join tables to list related records."
        ],
        "acceptanceCriteria": [
          "Enrolling works",
          "A full course rejects new enrolments",
          "A duplicate enrolment is rejected"
        ],
        "tests": [
          "Enrol a student",
          "Fill a course and try one more",
          "Enrol the same student twice"
        ]
      },
      {
        "id": "proj-student-management-m4",
        "order": 4,
        "title": "Grades and GPA",
        "objectives": [
          "Record grades",
          "Map grades to points",
          "Calculate GPA"
        ],
        "instructions": "Add grade recording for enrolments (A, B, C, D, F). Implement GPA as the credit-weighted average of grade points on a 4.0 scale, ignoring courses without a grade. Add a command to show a student GPA.",
        "concepts": [
          "GPA math",
          "Weighted averages",
          "Grade mapping"
        ],
        "hints": [
          "Map A to 4.0, B to 3.0, C to 2.0, D to 1.0, F to 0.",
          "Weight by course credits.",
          "Ignore ungraded enrolments."
        ],
        "acceptanceCriteria": [
          "GPA is correct for a known set of grades",
          "Ungraded courses do not affect GPA",
          "A student with no grades has no GPA"
        ],
        "tests": [
          "Record grades and compute GPA by hand",
          "Add an ungraded course and recompute",
          "Check a student with no grades"
        ]
      },
      {
        "id": "proj-student-management-m5",
        "order": 5,
        "title": "Transcripts and reports",
        "objectives": [
          "Print a student transcript",
          "List the top students by GPA",
          "List full courses"
        ],
        "instructions": "Add a transcript command that prints a student courses, grades and GPA in a readable format. Add reports for the top students by GPA and for courses that are full. Export a transcript to a text file.",
        "concepts": [
          "Reporting",
          "Sorting",
          "Export"
        ],
        "hints": [
          "Sort the transcript by course code.",
          "Compute GPA once and reuse it.",
          "Format the transcript as a clean text document."
        ],
        "acceptanceCriteria": [
          "The transcript lists courses and grades",
          "Top students are ordered by GPA",
          "Export writes a file"
        ],
        "tests": [
          "Print a transcript",
          "List the top 3 students",
          "Export a transcript to a file"
        ]
      },
      {
        "id": "proj-student-management-m6",
        "order": 6,
        "title": "Testing and polish",
        "objectives": [
          "Write tests with an in-memory database",
          "Test capacity and GPA rules",
          "Finish the README"
        ],
        "instructions": "Write unit tests using an in-memory SQLite database, covering CRUD, capacity limits, duplicate enrolments and GPA math. Run the suite and finish the README with example commands and the schema diagram.",
        "concepts": [
          "Unit testing",
          "In-memory databases",
          "Documentation"
        ],
        "hints": [
          "Use :memory: databases so tests are isolated.",
          "Test the unhappy paths for enrolment.",
          "Document the schema in the README."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Tests do not touch the real database",
          "The README documents the schema"
        ],
        "tests": [
          "Run the full test suite",
          "Run the program from scratch",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "All database access is parameterised",
      "Capacity is never exceeded",
      "GPA math is correct",
      "Transcripts are accurate",
      "Tests use an in-memory database",
      "The README documents the schema"
    ],
    "finalAssessment": [
      "Add students and courses",
      "Enrol students up to capacity",
      "Record grades and show GPA",
      "Print a transcript",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-library-management",
    "slug": "library-management-system",
    "level": 2,
    "title": "Library Management System",
    "description": "Build a library management system with SQLite that tracks books, members and loans. It handles borrowing with due dates, returns with late fines, reservations, and reports on popular books and overdue loans.",
    "skills": [
      "Python",
      "SQLite",
      "SQL",
      "Date arithmetic",
      "Business rules",
      "Reporting",
      "CLI design"
    ],
    "language": "python",
    "functionalRequirements": [
      "Add books with title, author, ISBN and copy count",
      "Register members with a borrowing limit",
      "Borrow a book if a copy is available and the member is under their limit",
      "Return a book and compute a late fine",
      "Reserve a book that is currently unavailable",
      "List overdue loans with the fine owed",
      "Search books by title, author or ISBN",
      "Report the most borrowed books"
    ],
    "nonFunctionalRequirements": [
      "A book cannot be borrowed when no copies are available",
      "Members cannot exceed their borrowing limit",
      "Late fines are computed correctly per day",
      "Data persists in SQLite",
      "All queries use parameterised SQL"
    ],
    "architecture": "The system uses SQLite tables for books, members, loans and reservations. A service layer enforces borrowing rules and computes fines from due dates, and the CLI exposes the operations. Loans record borrowed and due dates; fines are computed at return time from the days overdue.",
    "databaseSchema": "books: id INTEGER PRIMARY KEY, isbn TEXT UNIQUE, title TEXT, author TEXT, copies INTEGER; members: id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE, max_books INTEGER DEFAULT 3; loans: id INTEGER PRIMARY KEY, book_id INTEGER REFERENCES books(id), member_id INTEGER REFERENCES members(id), borrowed_on TEXT, due_on TEXT, returned_on TEXT; reservations: id INTEGER PRIMARY KEY, book_id INTEGER, member_id INTEGER, created_on TEXT",
    "apis": [
      "No external API; the interface is the CLI and the SQLite database file."
    ],
    "fileStructure": "library/\n  main.py\n  library/\n    __init__.py\n    db.py\n    models.py\n    service.py\n    fines.py\n    cli.py\n  tests/\n    test_service.py\n    test_fines.py\n  library.db\n  README.md",
    "taskBreakdown": [
      "Design the schema",
      "Implement book and member CRUD",
      "Implement borrowing and returning",
      "Implement fines",
      "Implement reservations",
      "Implement search and reports",
      "Write unit tests",
      "Document the rules"
    ],
    "milestones": [
      {
        "id": "proj-library-management-m1",
        "order": 1,
        "title": "Schema and setup",
        "objectives": [
          "Design books, members, loans and reservations",
          "Create the database",
          "Seed sample data"
        ],
        "instructions": "Design the four tables with foreign keys, create the database, and add a seed command that inserts a handful of books and members for testing. Verify the schema with the sqlite3 tool.",
        "concepts": [
          "SQLite",
          "Schema design",
          "Seeding"
        ],
        "hints": [
          "Use a composite approach for loans with a nullable returned_on.",
          "Seed data makes manual testing easy.",
          "Keep schema creation idempotent."
        ],
        "acceptanceCriteria": [
          "All four tables exist",
          "Seed data loads",
          "Foreign keys are enforced"
        ],
        "tests": [
          "Run the program and inspect the schema",
          "Run the seed command",
          "Check the seeded books"
        ]
      },
      {
        "id": "proj-library-management-m2",
        "order": 2,
        "title": "Books and members",
        "objectives": [
          "Add books and members",
          "Search the catalogue",
          "Enforce unique ISBN and email"
        ],
        "instructions": "Implement CRUD for books and members, plus search by title, author or ISBN with partial case-insensitive matching. ISBNs and emails must be unique.",
        "concepts": [
          "CRUD",
          "Search",
          "Uniqueness"
        ],
        "hints": [
          "Use LIKE with parameterised queries for search.",
          "Validate ISBN format loosely.",
          "List books with available copy counts."
        ],
        "acceptanceCriteria": [
          "Adding a book works",
          "A duplicate ISBN is rejected",
          "Search finds partial titles"
        ],
        "tests": [
          "Add a book and search for it",
          "Add a duplicate ISBN",
          "Search by author fragment"
        ]
      },
      {
        "id": "proj-library-management-m3",
        "order": 3,
        "title": "Borrowing and returning",
        "objectives": [
          "Borrow with availability and limit checks",
          "Set a 14-day due date",
          "Return a book"
        ],
        "instructions": "Implement borrowing: a copy must be available, the member must be under their limit, and the member must have no overdue loans. Set the due date 14 days out. Implement returning, which marks the loan returned and frees the copy.",
        "concepts": [
          "Business rules",
          "Date arithmetic",
          "Transactions"
        ],
        "hints": [
          "Compute availability as copies minus active loans.",
          "Use a transaction for borrow and return.",
          "Block borrowing for members with overdue loans."
        ],
        "acceptanceCriteria": [
          "Borrowing works",
          "Borrowing the last copy blocks the next borrower",
          "Returning frees the copy"
        ],
        "tests": [
          "Borrow the only copy twice",
          "Return it and borrow again",
          "Borrow with an overdue loan"
        ]
      },
      {
        "id": "proj-library-management-m4",
        "order": 4,
        "title": "Fines",
        "objectives": [
          "Compute late fines",
          "Charge per day overdue",
          "List overdue loans with fines"
        ],
        "instructions": "Implement fine calculation at 1 currency unit per day overdue, computed from the due date to the return date (or today for unreturned loans). Add a command listing overdue loans with the fine owed for each.",
        "concepts": [
          "Date arithmetic",
          "Fines",
          "Reporting"
        ],
        "hints": [
          "Use date objects, not strings, for the math.",
          "A loan returned on its due date owes nothing.",
          "Show fines in the overdue report."
        ],
        "acceptanceCriteria": [
          "A 3-day late return owes 3",
          "An on-time return owes 0",
          "The overdue report lists fines"
        ],
        "tests": [
          "Borrow, fake an old due date, return late",
          "Return on time",
          "List overdue loans"
        ]
      },
      {
        "id": "proj-library-management-m5",
        "order": 5,
        "title": "Reservations and reports",
        "objectives": [
          "Reserve an unavailable book",
          "Notify the next reserver on return",
          "Report popular books"
        ],
        "instructions": "Add reservations: a member can reserve a book with no available copies, and when a copy is returned the earliest reserver is shown as next in line. Add a report of the most borrowed books.",
        "concepts": [
          "Queues",
          "Reservations",
          "Reporting"
        ],
        "hints": [
          "Order reservations by creation time.",
          "Show the next reserver when a return happens.",
          "Count loans per book for popularity."
        ],
        "acceptanceCriteria": [
          "Reserving works",
          "The earliest reserver is next",
          "Popular books are ranked"
        ],
        "tests": [
          "Reserve an unavailable book",
          "Return the book and check the next reserver",
          "Show the popular books report"
        ]
      },
      {
        "id": "proj-library-management-m6",
        "order": 6,
        "title": "Testing and polish",
        "objectives": [
          "Write tests with an in-memory database",
          "Test fines and limits",
          "Finish the README"
        ],
        "instructions": "Write unit tests covering borrowing rules, fines, reservations and search using an in-memory database. Run the suite and finish the README with the borrowing rules and example commands.",
        "concepts": [
          "Unit testing",
          "Business rules",
          "Documentation"
        ],
        "hints": [
          "Freeze dates in tests by passing them in.",
          "Test each borrowing rule separately.",
          "Document the fine rate and loan period."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Fine math is covered by tests",
          "The README lists the rules"
        ],
        "tests": [
          "Run the full test suite",
          "Borrow and return a book end to end",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Borrowing rules are enforced",
      "Fines are computed correctly",
      "Reservations work in order",
      "Data persists in SQLite",
      "Tests use an in-memory database",
      "The README lists the rules"
    ],
    "finalAssessment": [
      "Borrow a book and show the due date",
      "Return it late and show the fine",
      "Show the overdue report",
      "Show the popular books report",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-inventory-system",
    "slug": "inventory-system",
    "level": 2,
    "title": "Inventory System",
    "description": "Build an inventory system for a small shop that tracks products, stock levels, suppliers and purchase orders. It warns on low stock, records stock movements, and reports inventory value and fast-moving products.",
    "skills": [
      "Python",
      "SQLite",
      "SQL",
      "Stock management",
      "Reporting",
      "CSV import",
      "CLI design"
    ],
    "language": "python",
    "functionalRequirements": [
      "Add products with SKU, name, price, quantity and reorder level",
      "Record stock in and stock out with a reason",
      "Warn when stock falls below the reorder level",
      "Record suppliers and link products to them",
      "Create purchase orders to restock",
      "Keep a full audit history of stock movements",
      "Report total inventory value",
      "Import products from a CSV file"
    ],
    "nonFunctionalRequirements": [
      "Stock can never go negative",
      "Every stock change is recorded in the audit history",
      "Low-stock warnings appear in the report",
      "Inventory value math is correct",
      "Data persists in SQLite"
    ],
    "architecture": "The system uses SQLite tables for products, suppliers, purchase orders and stock movements. A service layer enforces the rules (no negative stock, reorder warnings) and records every movement in an audit table. The CLI provides the operations and the reports read from the same tables.",
    "databaseSchema": "products: id INTEGER PRIMARY KEY, sku TEXT UNIQUE, name TEXT, price_cents INTEGER, quantity INTEGER, reorder_level INTEGER, supplier_id INTEGER REFERENCES suppliers(id); suppliers: id INTEGER PRIMARY KEY, name TEXT, email TEXT; movements: id INTEGER PRIMARY KEY, product_id INTEGER REFERENCES products(id), change INTEGER, reason TEXT, created_at TEXT; purchase_orders: id INTEGER PRIMARY KEY, supplier_id INTEGER, status TEXT, created_at TEXT",
    "apis": [
      "No external API; the interface is the CLI, the SQLite database and CSV files."
    ],
    "fileStructure": "inventory/\n  main.py\n  inventory/\n    __init__.py\n    db.py\n    models.py\n    service.py\n    reports.py\n    import_csv.py\n    cli.py\n  tests/\n    test_service.py\n    test_reports.py\n  inventory.db\n  README.md",
    "taskBreakdown": [
      "Design the schema",
      "Implement product and supplier CRUD",
      "Implement stock movements with audit",
      "Implement low-stock warnings",
      "Implement purchase orders",
      "Implement reports and CSV import",
      "Write unit tests",
      "Document the workflow"
    ],
    "milestones": [
      {
        "id": "proj-inventory-system-m1",
        "order": 1,
        "title": "Schema and products",
        "objectives": [
          "Design the tables",
          "Add products",
          "Enforce unique SKUs"
        ],
        "instructions": "Design the products, suppliers, movements and purchase orders tables. Implement product CRUD with unique SKUs and a reorder level per product. Verify the schema with the sqlite3 tool.",
        "concepts": [
          "SQLite",
          "Schema design",
          "Uniqueness"
        ],
        "hints": [
          "Store prices as integer cents.",
          "Use a unique constraint on SKU.",
          "Keep the schema creation idempotent."
        ],
        "acceptanceCriteria": [
          "All tables exist",
          "A duplicate SKU is rejected",
          "Products list correctly"
        ],
        "tests": [
          "Add a product",
          "Add a duplicate SKU",
          "List products"
        ]
      },
      {
        "id": "proj-inventory-system-m2",
        "order": 2,
        "title": "Stock movements and audit",
        "objectives": [
          "Record stock in and out",
          "Block negative stock",
          "Keep an audit trail"
        ],
        "instructions": "Implement stock adjustments that change the quantity and write a row to the movements table with the change, reason and timestamp. A stock-out that would make the quantity negative is rejected. Add a command to show the movement history of a product.",
        "concepts": [
          "Audit trails",
          "Transactions",
          "Validation"
        ],
        "hints": [
          "Update the quantity and insert the movement in one transaction.",
          "Record the reason for every movement.",
          "Never allow negative stock."
        ],
        "acceptanceCriteria": [
          "Stock-in increases the quantity",
          "An excessive stock-out is rejected",
          "The history shows every movement"
        ],
        "tests": [
          "Add stock, then remove some",
          "Try to remove more than available",
          "Show the history"
        ]
      },
      {
        "id": "proj-inventory-system-m3",
        "order": 3,
        "title": "Low-stock warnings and suppliers",
        "objectives": [
          "Warn below reorder level",
          "Manage suppliers",
          "Link products to suppliers"
        ],
        "instructions": "Add a low-stock report listing every product at or below its reorder level, with the supplier for each. Implement supplier CRUD and link products to suppliers.",
        "concepts": [
          "Reporting",
          "Relationships",
          "Alerts"
        ],
        "hints": [
          "Compute low stock as quantity less than or equal to reorder level.",
          "Show the supplier name in the report.",
          "Allow products without a supplier."
        ],
        "acceptanceCriteria": [
          "Low-stock products appear in the report",
          "Well-stocked products do not",
          "The supplier shows in the report"
        ],
        "tests": [
          "Set a low reorder level and check",
          "Add a supplier and link a product",
          "Run the low-stock report"
        ]
      },
      {
        "id": "proj-inventory-system-m4",
        "order": 4,
        "title": "Purchase orders",
        "objectives": [
          "Create a purchase order",
          "Receive stock against it",
          "Track order status"
        ],
        "instructions": "Implement purchase orders: create an order for a supplier with product quantities, and receive it to add the quantities to stock. Orders move from draft to received, and receiving records stock movements.",
        "concepts": [
          "Purchase orders",
          "Workflows",
          "Status"
        ],
        "hints": [
          "Store order lines in a separate table.",
          "Receiving updates stock and the audit trail.",
          "A received order cannot be received again."
        ],
        "acceptanceCriteria": [
          "Creating an order works",
          "Receiving adds stock",
          "Double receiving is blocked"
        ],
        "tests": [
          "Create an order",
          "Receive it and check stock",
          "Try to receive it again"
        ]
      },
      {
        "id": "proj-inventory-system-m5",
        "order": 5,
        "title": "Reports and CSV import",
        "objectives": [
          "Report inventory value",
          "Report fast-moving products",
          "Import products from CSV"
        ],
        "instructions": "Add a report for total inventory value (quantity times price) and for the fastest-moving products by movement volume. Add CSV import that creates or updates products by SKU and reports skipped rows.",
        "concepts": [
          "Reporting",
          "CSV import",
          "Aggregation"
        ],
        "hints": [
          "Compute value in cents to avoid float errors.",
          "Count absolute movement volume for fast movers.",
          "Validate each CSV row and report failures."
        ],
        "acceptanceCriteria": [
          "Inventory value is correct",
          "Fast movers are ranked",
          "CSV import creates products"
        ],
        "tests": [
          "Compute the value by hand and compare",
          "Import a CSV with a bad row",
          "Show the fast movers report"
        ]
      },
      {
        "id": "proj-inventory-system-m6",
        "order": 6,
        "title": "Testing and polish",
        "objectives": [
          "Write tests with an in-memory database",
          "Test stock rules",
          "Finish the README"
        ],
        "instructions": "Write unit tests covering stock movements, negative-stock blocking, low-stock detection, purchase order receiving and CSV import. Run the suite and finish the README with the workflow and example commands.",
        "concepts": [
          "Unit testing",
          "Business rules",
          "Documentation"
        ],
        "hints": [
          "Use an in-memory database for tests.",
          "Test the audit trail explicitly.",
          "Document the reorder workflow."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Negative stock is covered by tests",
          "The README documents the workflow"
        ],
        "tests": [
          "Run the full test suite",
          "Run a full stock cycle",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Stock never goes negative",
      "Every movement is audited",
      "Low-stock warnings work",
      "Purchase orders receive correctly",
      "Inventory value is exact",
      "Tests use an in-memory database"
    ],
    "finalAssessment": [
      "Add products and adjust stock",
      "Show the low-stock report",
      "Create and receive a purchase order",
      "Show the inventory value report",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-rest-api",
    "slug": "rest-api",
    "level": 2,
    "title": "REST API",
    "description": "Build a REST API with Node.js and Express for a task management service, with JSON persistence or SQLite, proper HTTP status codes, validation, pagination, filtering and tests. This is the backend that later projects build on.",
    "skills": [
      "TypeScript",
      "Node.js",
      "Express",
      "REST design",
      "HTTP status codes",
      "Validation",
      "Testing"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Create, read, update and delete tasks over HTTP",
      "Return proper status codes (200, 201, 400, 404)",
      "Validate request bodies and return useful errors",
      "Filter tasks by status and search by title",
      "Paginate list responses with page and limit",
      "Persist tasks in SQLite",
      "Return consistent JSON error responses",
      "Log every request with method, path and duration"
    ],
    "nonFunctionalRequirements": [
      "All endpoints return JSON",
      "Validation errors return 400 with details",
      "Missing resources return 404",
      "Pagination works on large lists",
      "The server starts with a single command"
    ],
    "architecture": "The API is a layered Express application: routes define the endpoints, controllers handle request and response, a service layer holds the business rules, and a repository talks to SQLite. Validation middleware checks request bodies before they reach the service, and an error-handling middleware turns every failure into a consistent JSON error.",
    "databaseSchema": "tasks: id INTEGER PRIMARY KEY, title TEXT NOT NULL, description TEXT, status TEXT DEFAULT \"todo\", priority INTEGER DEFAULT 2, due_date TEXT, created_at TEXT, updated_at TEXT",
    "apis": [
      "The API itself: GET /api/tasks, POST /api/tasks, GET /api/tasks/:id, PUT /api/tasks/:id, PATCH /api/tasks/:id/status, DELETE /api/tasks/:id, GET /api/health."
    ],
    "fileStructure": "rest-api/\n  package.json\n  tsconfig.json\n  src/\n    index.ts\n    app.ts\n    db.ts\n    routes/\n      tasks.ts\n    controllers/\n      tasks.ts\n    services/\n      tasks.ts\n    repositories/\n      tasks.ts\n    middleware/\n      validate.ts\n      errors.ts\n      logger.ts\n    validation/\n      tasks.ts\n  tests/\n    tasks.test.ts\n  README.md",
    "taskBreakdown": [
      "Set up the Express project with TypeScript",
      "Create the database and repository",
      "Implement the list and create endpoints",
      "Implement get, update and delete",
      "Add validation middleware",
      "Add filtering and pagination",
      "Add error handling and logging",
      "Write API tests"
    ],
    "milestones": [
      {
        "id": "proj-rest-api-m1",
        "order": 1,
        "title": "Project setup and first endpoint",
        "objectives": [
          "Set up Express with TypeScript",
          "Create the health endpoint",
          "Run the server"
        ],
        "instructions": "Initialise the project with Express and TypeScript, configure the build, and add a GET /api/health endpoint that returns the status and uptime. Start the server and confirm the endpoint responds with curl.",
        "concepts": [
          "Express",
          "TypeScript",
          "Project setup"
        ],
        "hints": [
          "Use ts-node or a build step for running.",
          "Keep the app creation separate from the server start.",
          "Return JSON from every endpoint."
        ],
        "acceptanceCriteria": [
          "The server starts with one command",
          "GET /api/health returns 200",
          "The response is JSON"
        ],
        "tests": [
          "Start the server",
          "curl the health endpoint",
          "Stop and restart the server"
        ]
      },
      {
        "id": "proj-rest-api-m2",
        "order": 2,
        "title": "Database and repository",
        "objectives": [
          "Create the tasks table",
          "Write the repository",
          "Use parameterised queries"
        ],
        "instructions": "Set up SQLite and write a repository with functions to insert, fetch, update and delete tasks. Use parameterised queries throughout. Test the repository directly before wiring it to HTTP.",
        "concepts": [
          "SQLite",
          "Repository pattern",
          "Parameterised queries"
        ],
        "hints": [
          "Keep SQL in the repository only.",
          "Return plain objects, not database rows.",
          "Use a single database connection per process."
        ],
        "acceptanceCriteria": [
          "Inserting and fetching works",
          "Updating changes the row",
          "Deleting removes the row"
        ],
        "tests": [
          "Insert a task and fetch it",
          "Update the title",
          "Delete it and confirm it is gone"
        ]
      },
      {
        "id": "proj-rest-api-m3",
        "order": 3,
        "title": "List and create endpoints",
        "objectives": [
          "Implement GET /api/tasks",
          "Implement POST /api/tasks",
          "Return 201 on creation"
        ],
        "instructions": "Add the list endpoint returning all tasks and the create endpoint that inserts a task and returns it with status 201. Validate that a title is present and return 400 with details when it is not.",
        "concepts": [
          "REST",
          "Status codes",
          "Validation"
        ],
        "hints": [
          "Return 201 with the created resource.",
          "Validate before touching the database.",
          "Include the new id in the response."
        ],
        "acceptanceCriteria": [
          "GET returns the task list",
          "POST creates a task and returns 201",
          "POST without a title returns 400"
        ],
        "tests": [
          "curl GET /api/tasks",
          "curl POST with a title",
          "curl POST without a title"
        ]
      },
      {
        "id": "proj-rest-api-m4",
        "order": 4,
        "title": "Get, update and delete",
        "objectives": [
          "Implement GET by id",
          "Implement PUT",
          "Implement DELETE"
        ],
        "instructions": "Add the single-task endpoints: GET returns the task or 404, PUT replaces the fields and returns the updated task, DELETE removes it and returns 204. All three return 404 for a missing id.",
        "concepts": [
          "REST",
          "Status codes",
          "Idempotency"
        ],
        "hints": [
          "Return 404 with a JSON error body.",
          "PUT validates the same way as POST.",
          "DELETE returns 204 with no body."
        ],
        "acceptanceCriteria": [
          "GET a missing id returns 404",
          "PUT updates the task",
          "DELETE removes it and returns 204"
        ],
        "tests": [
          "curl GET /api/tasks/999",
          "curl PUT on a task",
          "curl DELETE on a task"
        ]
      },
      {
        "id": "proj-rest-api-m5",
        "order": 5,
        "title": "Filtering, pagination and status updates",
        "objectives": [
          "Filter by status",
          "Search by title",
          "Paginate results"
        ],
        "instructions": "Add query parameters for filtering by status, searching by title, and paginating with page and limit. Add a PATCH endpoint to change only the status. Return the total count alongside the page.",
        "concepts": [
          "Query parameters",
          "Pagination",
          "PATCH"
        ],
        "hints": [
          "Validate page and limit as positive integers.",
          "Return total, page, limit and items.",
          "PATCH only allows the status field."
        ],
        "acceptanceCriteria": [
          "Filtering by status works",
          "Pagination returns the right page",
          "PATCH updates only the status"
        ],
        "tests": [
          "curl with ?status=done",
          "curl with ?page=2&limit=2",
          "curl PATCH the status"
        ]
      },
      {
        "id": "proj-rest-api-m6",
        "order": 6,
        "title": "Error handling, logging and tests",
        "objectives": [
          "Add consistent error responses",
          "Log requests",
          "Write API tests"
        ],
        "instructions": "Add an error-handling middleware that converts every error into a JSON body with a message and a code, and a logger middleware that records method, path, status and duration. Write API tests with supertest covering the happy paths and the error cases.",
        "concepts": [
          "Middleware",
          "Error handling",
          "API testing"
        ],
        "hints": [
          "Handle 404 for unknown routes too.",
          "Log in one line per request.",
          "Test with an in-memory or temporary database."
        ],
        "acceptanceCriteria": [
          "All errors return consistent JSON",
          "Requests are logged",
          "All API tests pass"
        ],
        "tests": [
          "curl an unknown route",
          "Check the server logs",
          "Run the test suite"
        ]
      }
    ],
    "reviewChecklist": [
      "All endpoints return JSON",
      "Status codes are correct",
      "Validation errors are detailed",
      "Pagination and filtering work",
      "Tests cover the endpoints",
      "Logging is in place"
    ],
    "finalAssessment": [
      "Create a task and fetch it",
      "Show validation returning 400",
      "Show pagination working",
      "Show a 404 for a missing task",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-blog-backend",
    "slug": "blog-backend",
    "level": 2,
    "title": "Blog Backend",
    "description": "Build a backend for a blogging platform with posts, comments, tags and authors. It supports publishing, drafts, full-text search, tag filtering and a simple JSON API, backed by SQLite.",
    "skills": [
      "TypeScript",
      "Node.js",
      "Express",
      "SQLite",
      "REST design",
      "Search",
      "Pagination"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Create and publish blog posts with markdown content",
      "Keep drafts separate from published posts",
      "Add comments to posts with moderation status",
      "Tag posts and filter by tag",
      "Search posts by title and content",
      "List posts with pagination",
      "Return posts with their author and comment count",
      "Soft-delete posts instead of removing them"
    ],
    "nonFunctionalRequirements": [
      "Drafts never appear in the public list",
      "Search finds posts by title or content",
      "Comments can be approved or hidden",
      "Pagination works",
      "Deleted posts are hidden but recoverable"
    ],
    "architecture": "The backend is an Express API with SQLite tables for authors, posts, comments and tags, plus a join table for post tags. Posts have a status of draft, published or deleted. A service layer handles publishing rules and search, and the API returns posts with their author and comment counts in one query.",
    "databaseSchema": "authors: id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE; posts: id INTEGER PRIMARY KEY, author_id INTEGER REFERENCES authors(id), title TEXT, slug TEXT UNIQUE, content TEXT, status TEXT DEFAULT \"draft\", created_at TEXT, published_at TEXT; comments: id INTEGER PRIMARY KEY, post_id INTEGER REFERENCES posts(id), author_name TEXT, body TEXT, status TEXT DEFAULT \"pending\", created_at TEXT; tags: id INTEGER PRIMARY KEY, name TEXT UNIQUE; post_tags: post_id INTEGER, tag_id INTEGER, PRIMARY KEY (post_id, tag_id)",
    "apis": [
      "GET /api/posts, GET /api/posts/:slug, POST /api/posts, PUT /api/posts/:id, POST /api/posts/:id/publish, GET /api/posts/:id/comments, POST /api/posts/:id/comments, GET /api/tags."
    ],
    "fileStructure": "blog-backend/\n  package.json\n  tsconfig.json\n  src/\n    index.ts\n    app.ts\n    db.ts\n    routes/\n      posts.ts\n      comments.ts\n      tags.ts\n    services/\n      posts.ts\n    repositories/\n      posts.ts\n  tests/\n    posts.test.ts\n  README.md",
    "taskBreakdown": [
      "Set up the project and schema",
      "Implement posts CRUD and drafts",
      "Implement publishing",
      "Implement comments and moderation",
      "Implement tags",
      "Implement search and pagination",
      "Write API tests",
      "Document the API"
    ],
    "milestones": [
      {
        "id": "proj-blog-backend-m1",
        "order": 1,
        "title": "Schema and setup",
        "objectives": [
          "Design the tables",
          "Create the database",
          "Seed authors and posts"
        ],
        "instructions": "Design the authors, posts, comments, tags and post_tags tables. Create the database with a seed script that inserts two authors and a few posts in draft and published states. Verify the schema and seed data.",
        "concepts": [
          "SQLite",
          "Schema design",
          "Seeding"
        ],
        "hints": [
          "Use a slug derived from the title.",
          "Keep status as a text field with a check constraint.",
          "Seed data makes manual testing easy."
        ],
        "acceptanceCriteria": [
          "All tables exist",
          "Seed data loads",
          "Slugs are unique"
        ],
        "tests": [
          "Inspect the schema",
          "List the seeded posts",
          "Check a draft is not public"
        ]
      },
      {
        "id": "proj-blog-backend-m2",
        "order": 2,
        "title": "Posts CRUD and drafts",
        "objectives": [
          "Create posts as drafts",
          "List only published posts publicly",
          "Edit posts"
        ],
        "instructions": "Implement post creation (always a draft), listing of published posts, fetching a post by slug, and editing. The public list must never include drafts or deleted posts.",
        "concepts": [
          "CRUD",
          "Drafts",
          "Slugs"
        ],
        "hints": [
          "Generate the slug from the title.",
          "Filter the public list by status.",
          "Return 404 for a draft slug on the public endpoint."
        ],
        "acceptanceCriteria": [
          "Creating a post makes a draft",
          "The public list hides drafts",
          "Editing updates the post"
        ],
        "tests": [
          "Create a post and list publicly",
          "Fetch the draft by slug",
          "Edit the title"
        ]
      },
      {
        "id": "proj-blog-backend-m3",
        "order": 3,
        "title": "Publishing",
        "objectives": [
          "Publish a draft",
          "Set the published date",
          "Unpublish a post"
        ],
        "instructions": "Add a publish endpoint that moves a draft to published and stamps the published date, and an unpublish endpoint that returns it to draft. Publishing an already published post is an error.",
        "concepts": [
          "State machines",
          "Publishing",
          "Timestamps"
        ],
        "hints": [
          "Only allow draft to published transitions.",
          "Stamp published_at on publish.",
          "Clear it on unpublish."
        ],
        "acceptanceCriteria": [
          "Publishing makes the post public",
          "Publishing twice is an error",
          "Unpublishing hides it again"
        ],
        "tests": [
          "Publish a draft and list it",
          "Publish it again",
          "Unpublish and list"
        ]
      },
      {
        "id": "proj-blog-backend-m4",
        "order": 4,
        "title": "Comments and moderation",
        "objectives": [
          "Add comments as pending",
          "Approve or hide comments",
          "Show approved comments only"
        ],
        "instructions": "Implement comments on posts: new comments start as pending, a moderator can approve or hide them, and the public post view shows only approved comments with a count.",
        "concepts": [
          "Moderation",
          "Comments",
          "Counts"
        ],
        "hints": [
          "Default new comments to pending.",
          "Count only approved comments in the list.",
          "Return 404 when commenting on a missing post."
        ],
        "acceptanceCriteria": [
          "A new comment is pending",
          "Approving shows it publicly",
          "Hiding removes it from view"
        ],
        "tests": [
          "Comment on a post",
          "Approve the comment",
          "Hide it and check the post"
        ]
      },
      {
        "id": "proj-blog-backend-m5",
        "order": 5,
        "title": "Tags, search and pagination",
        "objectives": [
          "Tag posts",
          "Filter by tag",
          "Search title and content",
          "Paginate"
        ],
        "instructions": "Add tagging with a many-to-many table, an endpoint to list posts by tag, and full-text search over title and content using LIKE. Add pagination to the post list.",
        "concepts": [
          "Many-to-many",
          "Search",
          "Pagination"
        ],
        "hints": [
          "Use a join table for post tags.",
          "Search both title and content.",
          "Return the total count with each page."
        ],
        "acceptanceCriteria": [
          "Filtering by tag works",
          "Search finds matching posts",
          "Pagination works"
        ],
        "tests": [
          "Tag a post and filter by the tag",
          "Search for a word",
          "Paginate the list"
        ]
      },
      {
        "id": "proj-blog-backend-m6",
        "order": 6,
        "title": "Testing and polish",
        "objectives": [
          "Write API tests",
          "Test drafts and moderation",
          "Document the API"
        ],
        "instructions": "Write API tests covering drafts, publishing, comments, moderation, tags, search and pagination. Run the suite and finish the README with the endpoint list and example requests.",
        "concepts": [
          "API testing",
          "Test coverage",
          "Documentation"
        ],
        "hints": [
          "Test that drafts stay hidden.",
          "Test the moderation flow.",
          "Document every endpoint with an example."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Drafts are covered by tests",
          "The README documents the API"
        ],
        "tests": [
          "Run the full test suite",
          "Publish a post end to end",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Drafts never leak to the public list",
      "Publishing rules are enforced",
      "Comments are moderated",
      "Search and tags work",
      "Tests cover the API",
      "The README documents every endpoint"
    ],
    "finalAssessment": [
      "Create and publish a post",
      "Add and approve a comment",
      "Filter posts by tag",
      "Search for a post",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-auth-app",
    "slug": "authentication-application",
    "level": 2,
    "title": "Authentication Application",
    "description": "Build an authentication system with user registration, login, password hashing, JSON Web Tokens, refresh tokens, password reset and role-based access control, backed by SQLite and Express.",
    "skills": [
      "TypeScript",
      "Node.js",
      "Express",
      "SQLite",
      "bcrypt",
      "JWT",
      "RBAC"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Register users with validated email and strong passwords",
      "Hash passwords with bcrypt",
      "Log in and issue an access token and a refresh token",
      "Protect routes with token authentication",
      "Refresh an expired access token with a refresh token",
      "Log out by revoking the refresh token",
      "Reset a password with a time-limited token",
      "Restrict admin routes to users with the admin role"
    ],
    "nonFunctionalRequirements": [
      "Passwords are never stored in plain text",
      "Access tokens expire after 15 minutes",
      "Refresh tokens can be revoked",
      "Reset tokens expire after one hour",
      "Admin routes reject non-admin users with 403"
    ],
    "architecture": "The application is an Express API with a users table and a refresh token table in SQLite. Passwords are hashed with bcrypt. Login issues a short-lived JWT access token and a long-lived refresh token stored hashed in the database. A middleware verifies access tokens, and a role check guards admin routes. Password reset uses a random token with an expiry.",
    "databaseSchema": "users: id INTEGER PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT, name TEXT, role TEXT DEFAULT \"user\", created_at TEXT; refresh_tokens: id INTEGER PRIMARY KEY, user_id INTEGER REFERENCES users(id), token_hash TEXT, expires_at TEXT, revoked INTEGER DEFAULT 0; reset_tokens: id INTEGER PRIMARY KEY, user_id INTEGER, token_hash TEXT, expires_at TEXT, used INTEGER DEFAULT 0",
    "apis": [
      "POST /api/auth/register, POST /api/auth/login, POST /api/auth/refresh, POST /api/auth/logout, POST /api/auth/forgot-password, POST /api/auth/reset-password, GET /api/users/me, GET /api/admin/users."
    ],
    "fileStructure": "auth-app/\n  package.json\n  tsconfig.json\n  src/\n    index.ts\n    app.ts\n    db.ts\n    routes/\n      auth.ts\n      users.ts\n      admin.ts\n    services/\n      auth.ts\n    middleware/\n      authenticate.ts\n      requireRole.ts\n    utils/\n      tokens.ts\n      passwords.ts\n  tests/\n    auth.test.ts\n  README.md",
    "taskBreakdown": [
      "Set up the project and user table",
      "Implement registration with hashing",
      "Implement login and JWT issuing",
      "Add authentication middleware",
      "Add refresh tokens and logout",
      "Add password reset",
      "Add role-based admin routes",
      "Write API tests"
    ],
    "milestones": [
      {
        "id": "proj-auth-app-m1",
        "order": 1,
        "title": "Setup and registration",
        "objectives": [
          "Create the users table",
          "Validate registration input",
          "Hash passwords with bcrypt"
        ],
        "instructions": "Set up the Express project and the users table. Implement registration with validation for email format and password strength (at least 8 characters with a mix of character types). Hash the password with bcrypt and never return the hash in a response.",
        "concepts": [
          "bcrypt",
          "Validation",
          "Password hashing"
        ],
        "hints": [
          "Use a cost factor of 10 or higher.",
          "Reject duplicate emails.",
          "Never log or return a password hash."
        ],
        "acceptanceCriteria": [
          "Registration creates a user",
          "The stored password is a hash",
          "A weak password is rejected"
        ],
        "tests": [
          "Register a user",
          "Inspect the stored hash",
          "Register with a weak password"
        ]
      },
      {
        "id": "proj-auth-app-m2",
        "order": 2,
        "title": "Login and JWT",
        "objectives": [
          "Verify passwords on login",
          "Issue an access token",
          "Set a 15-minute expiry"
        ],
        "instructions": "Implement login: look up the user, compare the password with bcrypt, and on success issue a JWT access token that expires in 15 minutes and contains the user id and role. A wrong password returns 401 without saying whether the email exists.",
        "concepts": [
          "JWT",
          "Authentication",
          "Token expiry"
        ],
        "hints": [
          "Sign tokens with a secret from the environment.",
          "Keep the payload small: id and role only.",
          "Return the same error for a bad email and a bad password."
        ],
        "acceptanceCriteria": [
          "Login returns a token",
          "The token expires in 15 minutes",
          "A wrong password returns 401"
        ],
        "tests": [
          "Log in and decode the token",
          "Log in with a wrong password",
          "Check the token expiry"
        ]
      },
      {
        "id": "proj-auth-app-m3",
        "order": 3,
        "title": "Authentication middleware",
        "objectives": [
          "Verify tokens on protected routes",
          "Attach the user to the request",
          "Return 401 for bad tokens"
        ],
        "instructions": "Write middleware that reads the Bearer token, verifies it, and attaches the user id and role to the request. Add a GET /api/users/me endpoint that returns the current user profile. Missing or invalid tokens return 401.",
        "concepts": [
          "Middleware",
          "Bearer tokens",
          "Protected routes"
        ],
        "hints": [
          "Read the token from the Authorization header.",
          "Return 401 for a missing token.",
          "Attach only the id and role, not the whole user."
        ],
        "acceptanceCriteria": [
          "A valid token reaches the profile",
          "A missing token returns 401",
          "An invalid token returns 401"
        ],
        "tests": [
          "Call /users/me with a token",
          "Call it without a token",
          "Call it with a bad token"
        ]
      },
      {
        "id": "proj-auth-app-m4",
        "order": 4,
        "title": "Refresh tokens and logout",
        "objectives": [
          "Issue refresh tokens on login",
          "Refresh access tokens",
          "Revoke on logout"
        ],
        "instructions": "Add refresh tokens: on login, create a random refresh token, store its hash in the database with an expiry, and return it. Add a refresh endpoint that exchanges a valid refresh token for a new access token, and a logout endpoint that revokes the refresh token.",
        "concepts": [
          "Refresh tokens",
          "Token rotation",
          "Revocation"
        ],
        "hints": [
          "Store only the hash of the refresh token.",
          "Rotate the refresh token on each use.",
          "Revoked tokens must fail refresh."
        ],
        "acceptanceCriteria": [
          "Refresh returns a new access token",
          "Logout revokes the token",
          "A revoked token cannot refresh"
        ],
        "tests": [
          "Log in, refresh, and call the profile",
          "Log out then try to refresh",
          "Refresh twice with the same token"
        ]
      },
      {
        "id": "proj-auth-app-m5",
        "order": 5,
        "title": "Password reset",
        "objectives": [
          "Request a reset token",
          "Reset with a valid token",
          "Expire tokens after one hour"
        ],
        "instructions": "Add a forgot-password endpoint that creates a random reset token with a one-hour expiry (and, in this learning build, prints it instead of emailing it), and a reset endpoint that sets a new password and marks the token used. Used or expired tokens are rejected.",
        "concepts": [
          "Password reset",
          "One-time tokens",
          "Expiry"
        ],
        "hints": [
          "Store only the hash of the reset token.",
          "Mark the token used after a successful reset.",
          "Enforce the same password strength as registration."
        ],
        "acceptanceCriteria": [
          "A reset token works once",
          "An expired token is rejected",
          "The new password logs in"
        ],
        "tests": [
          "Request a reset and use the token",
          "Use the same token twice",
          "Reset with a weak password"
        ]
      },
      {
        "id": "proj-auth-app-m6",
        "order": 6,
        "title": "Roles and testing",
        "objectives": [
          "Add an admin role",
          "Guard admin routes",
          "Write API tests"
        ],
        "instructions": "Add a role field to users and a requireRole middleware that returns 403 for non-admin users on admin routes. Add an admin endpoint listing all users (without password hashes). Write API tests covering registration, login, refresh, logout, reset and role checks.",
        "concepts": [
          "RBAC",
          "Authorization",
          "API testing"
        ],
        "hints": [
          "Check the role after authentication.",
          "Never expose password hashes in any response.",
          "Test the 403 case explicitly."
        ],
        "acceptanceCriteria": [
          "An admin can list users",
          "A normal user gets 403",
          "All tests pass"
        ],
        "tests": [
          "Create an admin and list users",
          "Try as a normal user",
          "Run the test suite"
        ]
      }
    ],
    "reviewChecklist": [
      "Passwords are hashed with bcrypt",
      "Tokens expire as specified",
      "Refresh tokens rotate and revoke",
      "Reset tokens are single-use",
      "Admin routes enforce roles",
      "Tests cover the auth flows"
    ],
    "finalAssessment": [
      "Register and log in a user",
      "Show the protected profile endpoint",
      "Show a 401 without a token",
      "Show a 403 for a non-admin",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-database-cli",
    "slug": "database-driven-cli",
    "level": 2,
    "title": "Database-Driven CLI",
    "description": "Build a command-line tool that manages a SQLite database of movies with directors, genres and ratings. It supports complex queries, import and export, and a small query language for filtering, all from the terminal.",
    "skills": [
      "Python",
      "SQLite",
      "SQL",
      "Joins",
      "Aggregation",
      "CSV",
      "CLI design"
    ],
    "language": "python",
    "functionalRequirements": [
      "Add movies with title, director, year, genre and rating",
      "List movies with sorting by year, rating or title",
      "Filter movies by genre, year range and minimum rating",
      "Search movies by title substring",
      "Show the average rating per genre",
      "Show the top rated movies",
      "Import movies from a CSV file",
      "Export the collection to JSON"
    ],
    "nonFunctionalRequirements": [
      "Queries use joins and aggregation correctly",
      "Filters combine with AND logic",
      "Import skips bad rows and reports them",
      "Data persists in SQLite",
      "The CLI starts quickly and is easy to use"
    ],
    "architecture": "The tool uses a SQLite database with movies, directors and genres tables. A repository layer holds the SQL, including joins for director names and aggregations for genre averages. The CLI parses filter expressions and passes them to the repository, which builds parameterised queries. Import and export use the csv and json modules.",
    "databaseSchema": "directors: id INTEGER PRIMARY KEY, name TEXT UNIQUE; genres: id INTEGER PRIMARY KEY, name TEXT UNIQUE; movies: id INTEGER PRIMARY KEY, title TEXT, director_id INTEGER REFERENCES directors(id), genre_id INTEGER REFERENCES genres(id), year INTEGER, rating REAL",
    "apis": [
      "No external API; the interface is the CLI, the SQLite database and CSV/JSON files."
    ],
    "fileStructure": "movie-cli/\n  main.py\n  movies/\n    __init__.py\n    db.py\n    repository.py\n    service.py\n    import_export.py\n    cli.py\n  tests/\n    test_repository.py\n  movies.db\n  README.md",
    "taskBreakdown": [
      "Design the schema with directors and genres",
      "Implement movie CRUD",
      "Implement filtering and sorting",
      "Implement genre averages and top movies",
      "Implement CSV import and JSON export",
      "Write unit tests",
      "Document the query options"
    ],
    "milestones": [
      {
        "id": "proj-database-cli-m1",
        "order": 1,
        "title": "Schema and CRUD",
        "objectives": [
          "Design movies, directors and genres",
          "Add movies",
          "Normalise directors and genres"
        ],
        "instructions": "Design the three tables and implement movie creation that reuses an existing director or genre by name instead of duplicating them. Add list, edit and delete commands.",
        "concepts": [
          "Normalisation",
          "SQLite",
          "CRUD"
        ],
        "hints": [
          "Look up directors and genres by name first.",
          "Use foreign keys to link them.",
          "List movies with their director and genre names."
        ],
        "acceptanceCriteria": [
          "Adding a movie works",
          "Directors are not duplicated",
          "Deleting a movie works"
        ],
        "tests": [
          "Add two movies by the same director",
          "List movies",
          "Delete one"
        ]
      },
      {
        "id": "proj-database-cli-m2",
        "order": 2,
        "title": "Filtering and sorting",
        "objectives": [
          "Filter by genre, year and rating",
          "Sort by different fields",
          "Combine filters"
        ],
        "instructions": "Implement list options for genre, minimum and maximum year, minimum rating and sort field. Filters combine with AND. Sorting supports title, year and rating in either direction.",
        "concepts": [
          "Query building",
          "Parameterised queries",
          "Sorting"
        ],
        "hints": [
          "Build the WHERE clause from the given filters only.",
          "Use parameters, never string formatting, for values.",
          "Validate the sort field against an allow-list."
        ],
        "acceptanceCriteria": [
          "Filtering by genre works",
          "A year range works",
          "Sorting by rating works"
        ],
        "tests": [
          "List with a genre filter",
          "List with a year range",
          "Sort by rating descending"
        ]
      },
      {
        "id": "proj-database-cli-m3",
        "order": 3,
        "title": "Aggregations",
        "objectives": [
          "Average rating per genre",
          "Top rated movies",
          "Count per decade"
        ],
        "instructions": "Add report commands: average rating per genre, the top 10 movies by rating, and the count of movies per decade. Use SQL aggregation (AVG, COUNT, GROUP BY) rather than computing in Python.",
        "concepts": [
          "SQL aggregation",
          "GROUP BY",
          "Reporting"
        ],
        "hints": [
          "Use AVG and GROUP BY in SQL.",
          "Order the top list by rating then title.",
          "Group decades with integer division on the year."
        ],
        "acceptanceCriteria": [
          "Genre averages are correct",
          "The top 10 list is ordered",
          "Decade counts add up"
        ],
        "tests": [
          "Compute an average by hand and compare",
          "Show the top 10",
          "Show the decade counts"
        ]
      },
      {
        "id": "proj-database-cli-m4",
        "order": 4,
        "title": "Import and export",
        "objectives": [
          "Import movies from CSV",
          "Export to JSON",
          "Report bad rows"
        ],
        "instructions": "Implement CSV import that creates directors and genres as needed, skips rows with missing or invalid fields, and reports how many rows were imported and skipped. Implement JSON export of the whole collection.",
        "concepts": [
          "CSV import",
          "JSON export",
          "Error reporting"
        ],
        "hints": [
          "Validate each row before inserting.",
          "Report skipped rows with line numbers.",
          "Export with the same structure as the list output."
        ],
        "acceptanceCriteria": [
          "Import creates movies",
          "A bad row is skipped and reported",
          "Export produces valid JSON"
        ],
        "tests": [
          "Import a CSV with a bad row",
          "Export and inspect the JSON",
          "Re-import the same file"
        ]
      },
      {
        "id": "proj-database-cli-m5",
        "order": 5,
        "title": "Testing and polish",
        "objectives": [
          "Write tests with an in-memory database",
          "Test filters and aggregations",
          "Finish the README"
        ],
        "instructions": "Write unit tests for the repository covering filtering, sorting, aggregation and import. Run the suite and finish the README with example queries and the schema.",
        "concepts": [
          "Unit testing",
          "SQL testing",
          "Documentation"
        ],
        "hints": [
          "Use an in-memory database for tests.",
          "Test each filter alone and combined.",
          "Show example commands in the README."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Filters are covered by tests",
          "The README documents the queries"
        ],
        "tests": [
          "Run the full test suite",
          "Run a complex filtered query",
          "Follow the README"
        ]
      },
      {
        "id": "proj-database-cli-m6",
        "order": 6,
        "title": "Backup and restore",
        "objectives": [
          "Back up the database file",
          "Restore from a backup",
          "Verify integrity"
        ],
        "instructions": "Add backup and restore commands that copy the SQLite file with a timestamped name and restore it, plus an integrity check command using PRAGMA integrity_check. Restoring asks for confirmation first.",
        "concepts": [
          "Backups",
          "Restore",
          "Integrity"
        ],
        "hints": [
          "Copy the file, do not export and re-import.",
          "Confirm before overwriting the live database.",
          "Report the integrity result clearly."
        ],
        "acceptanceCriteria": [
          "Backup creates a file",
          "Restore brings back the data",
          "Integrity check passes"
        ],
        "tests": [
          "Back up the database",
          "Delete a movie then restore",
          "Run the integrity check"
        ]
      }
    ],
    "reviewChecklist": [
      "Filters combine correctly",
      "Aggregations are done in SQL",
      "Import handles bad rows",
      "Directors and genres are normalised",
      "Tests use an in-memory database",
      "The README documents the queries"
    ],
    "finalAssessment": [
      "Add movies and list them",
      "Filter by genre and rating",
      "Show the genre averages",
      "Import a CSV file",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-web-dashboard",
    "slug": "web-dashboard",
    "level": 2,
    "title": "Web Dashboard",
    "description": "Build a small web dashboard with a React frontend and an Express backend that shows charts and tables for a dataset (for example, sales data). It supports filtering by date range and category, and refreshes data without a page reload.",
    "skills": [
      "TypeScript",
      "React",
      "Express",
      "Charts",
      "Data fetching",
      "Filtering",
      "SQLite"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Show summary cards (total sales, orders, average order value)",
      "Show a sales chart by day",
      "Show a table of recent orders with sorting",
      "Filter by date range and category",
      "Show a breakdown chart by category",
      "Load data from the backend API without reloading the page",
      "Show a loading state and an error state",
      "Seed the database with realistic sample data"
    ],
    "nonFunctionalRequirements": [
      "The dashboard loads in under 2 seconds on local data",
      "Filters update every widget consistently",
      "Charts render correctly from the API data",
      "Errors show a friendly message, not a blank page",
      "The backend and frontend run with two commands"
    ],
    "architecture": "The backend is an Express API over a SQLite database of orders, with endpoints for summary statistics, daily totals, category breakdowns and the order list. The React frontend fetches from these endpoints, holds the filter state in one place, and renders charts with a charting library and tables with plain components. Filtering re-fetches all widgets with the same parameters.",
    "databaseSchema": "orders: id INTEGER PRIMARY KEY, customer TEXT, category TEXT, amount_cents INTEGER, created_at TEXT; products: id INTEGER PRIMARY KEY, name TEXT, category TEXT, price_cents INTEGER",
    "apis": [
      "GET /api/summary, GET /api/sales/daily, GET /api/sales/by-category, GET /api/orders."
    ],
    "fileStructure": "web-dashboard/\n  backend/\n    package.json\n    src/\n      index.ts\n      db.ts\n      routes/\n        stats.ts\n        orders.ts\n      seed.ts\n  frontend/\n    package.json\n    src/\n      App.tsx\n      api.ts\n      components/\n        SummaryCards.tsx\n        SalesChart.tsx\n        CategoryChart.tsx\n        OrdersTable.tsx\n        Filters.tsx\n  README.md",
    "taskBreakdown": [
      "Set up the backend API and seed data",
      "Implement the summary and chart endpoints",
      "Set up the React app and API client",
      "Build the summary cards and filters",
      "Build the charts",
      "Build the orders table",
      "Handle loading and error states",
      "Polish and document"
    ],
    "milestones": [
      {
        "id": "proj-web-dashboard-m1",
        "order": 1,
        "title": "Backend API and seed data",
        "objectives": [
          "Create the orders table",
          "Seed realistic data",
          "Add the summary endpoint"
        ],
        "instructions": "Set up the Express backend with SQLite and a seed script that generates a few hundred realistic orders across categories and dates. Add a summary endpoint returning total sales, order count and average order value, optionally filtered by date range and category.",
        "concepts": [
          "Express",
          "SQLite",
          "Seeding"
        ],
        "hints": [
          "Generate dates spread over the last 90 days.",
          "Store amounts as integer cents.",
          "Accept from, to and category as query parameters."
        ],
        "acceptanceCriteria": [
          "Seed data loads",
          "The summary endpoint works",
          "Filtering changes the totals"
        ],
        "tests": [
          "Run the seed script",
          "curl the summary endpoint",
          "curl it with a date filter"
        ]
      },
      {
        "id": "proj-web-dashboard-m2",
        "order": 2,
        "title": "Chart endpoints",
        "objectives": [
          "Daily sales totals",
          "Category breakdown",
          "Orders list with pagination"
        ],
        "instructions": "Add endpoints for daily sales totals, sales by category, and a paginated order list with sorting. All endpoints accept the same filter parameters so the widgets stay consistent.",
        "concepts": [
          "Aggregation",
          "REST",
          "Consistency"
        ],
        "hints": [
          "Use SQL GROUP BY for the aggregations.",
          "Return the same filter parameters everywhere.",
          "Sort the daily totals by date."
        ],
        "acceptanceCriteria": [
          "Daily totals add up to the summary",
          "Category totals add up",
          "Pagination works"
        ],
        "tests": [
          "curl the daily endpoint",
          "Check the totals match",
          "Paginate the orders"
        ]
      },
      {
        "id": "proj-web-dashboard-m3",
        "order": 3,
        "title": "React setup and summary cards",
        "objectives": [
          "Set up the React app",
          "Fetch from the API",
          "Render summary cards"
        ],
        "instructions": "Create the React app with Vite, write an API client module, and build the summary cards that show total sales, order count and average order value. Show a loading state while fetching.",
        "concepts": [
          "React",
          "Vite",
          "Data fetching"
        ],
        "hints": [
          "Keep the API base URL configurable.",
          "Use useEffect for fetching.",
          "Show a loading message, not a blank page."
        ],
        "acceptanceCriteria": [
          "The app loads and shows the cards",
          "Values match the API",
          "Loading state appears"
        ],
        "tests": [
          "Start the frontend and backend",
          "Check the cards against curl",
          "Throttle the network and watch loading"
        ]
      },
      {
        "id": "proj-web-dashboard-m4",
        "order": 4,
        "title": "Filters and charts",
        "objectives": [
          "Add date and category filters",
          "Render the daily chart",
          "Render the category chart"
        ],
        "instructions": "Add filter controls for date range and category that re-fetch every widget with the same parameters. Add a line or bar chart for daily sales and a breakdown chart for categories using a charting library.",
        "concepts": [
          "State management",
          "Charts",
          "Filtering"
        ],
        "hints": [
          "Hold the filters in the top-level component.",
          "Pass the same filters to every fetch.",
          "Format currency on the chart axes."
        ],
        "acceptanceCriteria": [
          "Changing a filter updates all widgets",
          "The charts render from API data",
          "The category chart matches the totals"
        ],
        "tests": [
          "Change the date range",
          "Filter to one category",
          "Compare the chart to the summary"
        ]
      },
      {
        "id": "proj-web-dashboard-m5",
        "order": 5,
        "title": "Orders table and states",
        "objectives": [
          "Build the orders table",
          "Add sorting",
          "Handle errors gracefully"
        ],
        "instructions": "Build the orders table with sorting by date and amount, plus pagination. Add an error state that shows a friendly message with a retry button when the API is unreachable.",
        "concepts": [
          "Tables",
          "Sorting",
          "Error handling"
        ],
        "hints": [
          "Sort in the backend with query parameters.",
          "Keep the page state in the component.",
          "Show the error message, not a crash."
        ],
        "acceptanceCriteria": [
          "Sorting works",
          "Pagination works",
          "Stopping the backend shows an error state"
        ],
        "tests": [
          "Sort the table by amount",
          "Go to page 2",
          "Stop the backend and reload"
        ]
      },
      {
        "id": "proj-web-dashboard-m6",
        "order": 6,
        "title": "Polish and documentation",
        "objectives": [
          "Polish the layout",
          "Check responsiveness",
          "Write the README"
        ],
        "instructions": "Polish the layout with consistent spacing and a clean design, check the dashboard at mobile width, and write a README explaining how to run both parts and how the data flows.",
        "concepts": [
          "CSS",
          "Responsive design",
          "Documentation"
        ],
        "hints": [
          "Use a simple CSS layout, no heavy framework needed.",
          "Check the layout at 800 pixels wide.",
          "Document both start commands."
        ],
        "acceptanceCriteria": [
          "The layout is clean at desktop and mobile widths",
          "The README is accurate",
          "Both parts start with one command each"
        ],
        "tests": [
          "Resize the browser",
          "Follow the README from scratch",
          "Click through every widget"
        ]
      }
    ],
    "reviewChecklist": [
      "Filters update all widgets consistently",
      "Charts match the API totals",
      "Loading and error states work",
      "The dashboard is responsive",
      "Seed data is realistic",
      "The README documents both parts"
    ],
    "finalAssessment": [
      "Show the dashboard with summary cards",
      "Filter by category and show widgets updating",
      "Sort the orders table",
      "Show the error state with the backend stopped",
      "Show the charts rendering"
    ]
  },
  {
    "id": "proj-url-shortener",
    "slug": "url-shortener",
    "level": 2,
    "title": "URL Shortener",
    "description": "Build a URL shortener service with an Express backend and SQLite: create short links, redirect visitors, track click counts, support custom aliases and expiry, and show statistics per link.",
    "skills": [
      "TypeScript",
      "Node.js",
      "Express",
      "SQLite",
      "REST design",
      "Redirects",
      "Analytics"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Create a short link from a long URL",
      "Generate a short random code",
      "Support custom aliases",
      "Redirect a short code to the original URL with a 302",
      "Count clicks per link",
      "Set an optional expiry date after which the link stops working",
      "Show statistics for a link (clicks, created date)",
      "List all links with pagination"
    ],
    "nonFunctionalRequirements": [
      "Short codes are unique",
      "Redirects are fast (under 50ms locally)",
      "Click counts are accurate",
      "Expired links return 410",
      "Invalid URLs are rejected"
    ],
    "architecture": "The service is an Express API with a SQLite links table. Creating a link validates the URL, generates a short code from a safe alphabet, and stores it. The redirect route looks up the code, increments the click count in the same request, and redirects; expired links return 410 and unknown codes return 404. Statistics come from the same table.",
    "databaseSchema": "links: id INTEGER PRIMARY KEY, code TEXT UNIQUE, url TEXT NOT NULL, alias TEXT, clicks INTEGER DEFAULT 0, created_at TEXT, expires_at TEXT",
    "apis": [
      "POST /api/links, GET /api/links, GET /api/links/:code/stats, GET /:code (redirect)."
    ],
    "fileStructure": "url-shortener/\n  package.json\n  tsconfig.json\n  src/\n    index.ts\n    app.ts\n    db.ts\n    routes/\n      links.ts\n      redirect.ts\n    services/\n      links.ts\n    utils/\n      codes.ts\n      validate.ts\n  tests/\n    links.test.ts\n  README.md",
    "taskBreakdown": [
      "Set up the project and schema",
      "Implement link creation with code generation",
      "Implement the redirect route",
      "Add click counting",
      "Add custom aliases and expiry",
      "Add statistics and listing",
      "Write API tests",
      "Document the API"
    ],
    "milestones": [
      {
        "id": "proj-url-shortener-m1",
        "order": 1,
        "title": "Setup and schema",
        "objectives": [
          "Create the links table",
          "Design the code alphabet",
          "Add the health endpoint"
        ],
        "instructions": "Set up the Express project and the links table with a unique code. Choose a URL-safe alphabet for short codes and add a health endpoint. Verify the server starts.",
        "concepts": [
          "Express",
          "SQLite",
          "Schema design"
        ],
        "hints": [
          "Use a unique constraint on code.",
          "Avoid ambiguous characters like 0 and O in the alphabet.",
          "Keep the code length at 6 characters."
        ],
        "acceptanceCriteria": [
          "The server starts",
          "The table exists",
          "Health returns 200"
        ],
        "tests": [
          "Start the server",
          "Inspect the schema",
          "curl the health endpoint"
        ]
      },
      {
        "id": "proj-url-shortener-m2",
        "order": 2,
        "title": "Link creation",
        "objectives": [
          "Validate URLs",
          "Generate unique codes",
          "Return 201 with the short link"
        ],
        "instructions": "Implement POST /api/links: validate that the URL is well-formed with http or https, generate a random 6-character code, retry on collision, and return the short link with 201.",
        "concepts": [
          "Validation",
          "Random codes",
          "Uniqueness"
        ],
        "hints": [
          "Use crypto.randomBytes for codes.",
          "Retry generation on a collision.",
          "Reject URLs without a scheme."
        ],
        "acceptanceCriteria": [
          "Creating a link returns 201",
          "The short code is 6 characters",
          "An invalid URL returns 400"
        ],
        "tests": [
          "Create a link with curl",
          "Create one with a bad URL",
          "Create 100 links and check uniqueness"
        ]
      },
      {
        "id": "proj-url-shortener-m3",
        "order": 3,
        "title": "Redirect and clicks",
        "objectives": [
          "Redirect with 302",
          "Increment the click count",
          "Return 404 for unknown codes"
        ],
        "instructions": "Implement GET /:code: look up the code, return 404 when unknown, increment the click count, and redirect to the stored URL with a 302. The count must increase on every visit.",
        "concepts": [
          "HTTP redirects",
          "Counting",
          "Status codes"
        ],
        "hints": [
          "Update the count before redirecting.",
          "Use 302, not 301, so browsers do not cache it forever.",
          "Count each redirect exactly once."
        ],
        "acceptanceCriteria": [
          "Visiting the short link redirects",
          "The click count increases",
          "An unknown code returns 404"
        ],
        "tests": [
          "Create a link and visit it",
          "Visit it three times and check stats",
          "Visit an unknown code"
        ]
      },
      {
        "id": "proj-url-shortener-m4",
        "order": 4,
        "title": "Aliases and expiry",
        "objectives": [
          "Accept custom aliases",
          "Reject duplicate aliases",
          "Expire links"
        ],
        "instructions": "Add support for a custom alias in place of a random code, rejecting duplicates with 409. Add an optional expiry date; expired links return 410 Gone on redirect and are hidden from the public list.",
        "concepts": [
          "Custom aliases",
          "Expiry",
          "Status codes"
        ],
        "hints": [
          "Validate aliases against the same safe alphabet.",
          "Return 409 for a duplicate alias.",
          "Check expiry before redirecting."
        ],
        "acceptanceCriteria": [
          "A custom alias works",
          "A duplicate alias returns 409",
          "An expired link returns 410"
        ],
        "tests": [
          "Create a link with an alias",
          "Create the same alias again",
          "Create an expired link and visit it"
        ]
      },
      {
        "id": "proj-url-shortener-m5",
        "order": 5,
        "title": "Statistics and listing",
        "objectives": [
          "Show per-link statistics",
          "List links with pagination",
          "Sort by clicks"
        ],
        "instructions": "Add a statistics endpoint returning clicks, creation date and expiry for a link, and a list endpoint with pagination sorted by creation date or clicks.",
        "concepts": [
          "Statistics",
          "Pagination",
          "Sorting"
        ],
        "hints": [
          "Return the stored URL as well as the counts.",
          "Paginate the list.",
          "Allow sorting by clicks."
        ],
        "acceptanceCriteria": [
          "Statistics show the right counts",
          "Listing paginates",
          "Sorting by clicks works"
        ],
        "tests": [
          "Check stats after clicks",
          "List with page and limit",
          "Sort by clicks"
        ]
      },
      {
        "id": "proj-url-shortener-m6",
        "order": 6,
        "title": "Testing and polish",
        "objectives": [
          "Write API tests",
          "Test redirects and expiry",
          "Finish the README"
        ],
        "instructions": "Write API tests covering creation, validation, redirects, click counting, aliases, expiry and listing. Run the suite and finish the README with example requests.",
        "concepts": [
          "API testing",
          "Test coverage",
          "Documentation"
        ],
        "hints": [
          "Test the redirect with a real HTTP call.",
          "Test expiry with a past date.",
          "Document every endpoint."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Redirects are covered by tests",
          "The README is complete"
        ],
        "tests": [
          "Run the full test suite",
          "Create and visit a link end to end",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Short codes are unique",
      "Redirects work with correct status codes",
      "Click counts are accurate",
      "Expiry returns 410",
      "Tests cover the API",
      "The README documents every endpoint"
    ],
    "finalAssessment": [
      "Create a short link",
      "Visit it and show the redirect",
      "Show the click count increasing",
      "Show an expired link returning 410",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-file-upload-system",
    "slug": "file-upload-system",
    "level": 2,
    "title": "File Upload System",
    "description": "Build a file upload service with an Express backend that accepts uploads, validates file type and size, stores files on disk with metadata in SQLite, serves downloads, and lists uploaded files.",
    "skills": [
      "TypeScript",
      "Node.js",
      "Express",
      "Multer",
      "SQLite",
      "File validation",
      "Streaming"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Accept file uploads over HTTP",
      "Validate file type against an allow-list",
      "Reject files over a size limit",
      "Store files on disk with a unique name",
      "Record metadata (original name, size, type, upload date) in SQLite",
      "List uploaded files with pagination",
      "Download a file by id",
      "Delete a file and its metadata"
    ],
    "nonFunctionalRequirements": [
      "Files over the size limit are rejected with 413",
      "Disallowed types are rejected with 400",
      "Uploaded files are never overwritten",
      "Downloads return the original filename",
      "Deleting removes both the file and the record"
    ],
    "architecture": "The service is an Express API using multer for multipart uploads, with file size and type validation in the multer configuration. Files are stored under an uploads directory with a generated unique name, while the original name, size, MIME type and upload time are stored in SQLite. A download route streams the file back with the original filename, and delete removes both the file and the row.",
    "databaseSchema": "files: id INTEGER PRIMARY KEY, original_name TEXT, stored_name TEXT UNIQUE, mime_type TEXT, size_bytes INTEGER, uploaded_at TEXT",
    "apis": [
      "POST /api/files (multipart), GET /api/files, GET /api/files/:id, GET /api/files/:id/download, DELETE /api/files/:id."
    ],
    "fileStructure": "file-upload/\n  package.json\n  tsconfig.json\n  src/\n    index.ts\n    app.ts\n    db.ts\n    routes/\n      files.ts\n    middleware/\n      upload.ts\n    services/\n      files.ts\n  uploads/\n  tests/\n    files.test.ts\n  README.md",
    "taskBreakdown": [
      "Set up the project and upload middleware",
      "Implement the upload endpoint",
      "Add type and size validation",
      "Implement listing and download",
      "Implement delete",
      "Add pagination and filtering",
      "Write API tests",
      "Document limits and supported types"
    ],
    "milestones": [
      {
        "id": "proj-file-upload-system-m1",
        "order": 1,
        "title": "Setup and upload middleware",
        "objectives": [
          "Configure multer",
          "Set the upload directory",
          "Add the health endpoint"
        ],
        "instructions": "Set up the Express project with multer configured to store files in an uploads directory with unique generated names. Add a health endpoint and verify the server starts.",
        "concepts": [
          "Express",
          "Multer",
          "File storage"
        ],
        "hints": [
          "Generate stored names with a random prefix.",
          "Create the uploads directory at startup.",
          "Keep the upload config in one middleware module."
        ],
        "acceptanceCriteria": [
          "The server starts",
          "The uploads directory exists",
          "Health returns 200"
        ],
        "tests": [
          "Start the server",
          "Check the uploads folder",
          "curl the health endpoint"
        ]
      },
      {
        "id": "proj-file-upload-system-m2",
        "order": 2,
        "title": "Upload endpoint",
        "objectives": [
          "Accept a multipart upload",
          "Store metadata in SQLite",
          "Return 201 with the file record"
        ],
        "instructions": "Implement POST /api/files: accept a single file field, store the file on disk, insert the metadata row, and return the record with 201. The response includes the id, original name, size and MIME type.",
        "concepts": [
          "Multipart uploads",
          "Metadata",
          "Status codes"
        ],
        "hints": [
          "Use multer single-file handling.",
          "Record the metadata in the same request.",
          "Return 201 with the created record."
        ],
        "acceptanceCriteria": [
          "Uploading a file returns 201",
          "The file exists on disk",
          "The metadata row exists"
        ],
        "tests": [
          "Upload a text file with curl",
          "Check the uploads folder",
          "Check the database row"
        ]
      },
      {
        "id": "proj-file-upload-system-m3",
        "order": 3,
        "title": "Type and size validation",
        "objectives": [
          "Allow-list MIME types",
          "Enforce a 5 MB limit",
          "Return clear errors"
        ],
        "instructions": "Add validation: only images, PDFs and plain text are allowed, and files over 5 MB are rejected with 413. Disallowed types return 400 with a message naming the problem. Validation must happen before the file is kept.",
        "concepts": [
          "Validation",
          "MIME types",
          "Size limits"
        ],
        "hints": [
          "Check the MIME type in the multer file filter.",
          "Set the size limit in the multer config.",
          "Remove any partially written file on rejection."
        ],
        "acceptanceCriteria": [
          "An oversized file returns 413",
          "A disallowed type returns 400",
          "A valid file is accepted"
        ],
        "tests": [
          "Upload a 6 MB file",
          "Upload an executable",
          "Upload a valid image"
        ]
      },
      {
        "id": "proj-file-upload-system-m4",
        "order": 4,
        "title": "Listing and download",
        "objectives": [
          "List files with pagination",
          "Download by id",
          "Set the original filename"
        ],
        "instructions": "Add a list endpoint with pagination and a download endpoint that streams the file with a Content-Disposition header carrying the original filename. A missing file returns 404.",
        "concepts": [
          "Streaming",
          "Content-Disposition",
          "Pagination"
        ],
        "hints": [
          "Stream the file instead of loading it into memory.",
          "Set the filename in the download header.",
          "Return 404 when the record or the file is missing."
        ],
        "acceptanceCriteria": [
          "Listing paginates",
          "Downloading returns the file",
          "The downloaded name matches the original"
        ],
        "tests": [
          "Upload three files and list them",
          "Download one and check the name",
          "Download a missing id"
        ]
      },
      {
        "id": "proj-file-upload-system-m5",
        "order": 5,
        "title": "Delete",
        "objectives": [
          "Delete the file and the record",
          "Handle a missing file on disk",
          "Return 204"
        ],
        "instructions": "Implement delete: remove the file from disk and the row from the database, returning 204. If the file is already missing from disk, still remove the record and report success.",
        "concepts": [
          "Deletion",
          "Consistency",
          "Status codes"
        ],
        "hints": [
          "Delete the file first, then the row.",
          "Tolerate a missing file on disk.",
          "Return 204 with no body."
        ],
        "acceptanceCriteria": [
          "Deleting removes the file and the record",
          "Deleting twice returns 404",
          "A missing disk file still deletes the record"
        ],
        "tests": [
          "Upload, delete, and check the disk",
          "Delete the same id again",
          "Remove the file manually then delete"
        ]
      },
      {
        "id": "proj-file-upload-system-m6",
        "order": 6,
        "title": "Testing and polish",
        "objectives": [
          "Write API tests with multipart requests",
          "Test validation and delete",
          "Finish the README"
        ],
        "instructions": "Write API tests using multipart requests to cover upload, validation, listing, download and delete. Run the suite and finish the README with the limits, supported types and example curl commands.",
        "concepts": [
          "API testing",
          "Multipart requests",
          "Documentation"
        ],
        "hints": [
          "Use supertest attach for uploads.",
          "Test with a temporary uploads directory.",
          "Document the 5 MB limit and allowed types."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Validation is covered by tests",
          "The README documents the limits"
        ],
        "tests": [
          "Run the full test suite",
          "Upload and download a file end to end",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Uploads are validated by type and size",
      "Files are stored with unique names",
      "Downloads preserve the original name",
      "Delete removes both file and record",
      "Tests use multipart requests",
      "The README documents the limits"
    ],
    "finalAssessment": [
      "Upload a file",
      "Show the file list",
      "Download the file",
      "Show an oversized file being rejected",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-fullstack-task-platform",
    "slug": "full-stack-task-management-platform",
    "level": 3,
    "title": "Full-Stack Task Management Platform",
    "description": "Build a full-stack task management platform like a small Trello: workspaces, boards, lists and cards, drag-and-drop, assignees, due dates, comments and activity history, with a React frontend and an Express API.",
    "skills": [
      "TypeScript",
      "React",
      "Express",
      "SQLite",
      "REST design",
      "Drag and drop",
      "Authentication"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Create workspaces, boards, lists and cards",
      "Move cards between lists with drag and drop",
      "Assign cards to members and set due dates",
      "Comment on cards",
      "Record an activity history per board",
      "Search cards across a workspace",
      "Require login for all data endpoints",
      "Show overdue cards highlighted"
    ],
    "nonFunctionalRequirements": [
      "Drag and drop persists the new order",
      "Only workspace members can see its boards",
      "Activity history records every move and comment",
      "The UI updates without a full page reload",
      "The API returns consistent errors"
    ],
    "architecture": "The platform has an Express API with SQLite tables for users, workspaces, memberships, boards, lists, cards, comments and activity. Cards carry a position value within their list so drag and drop is a position update. The React frontend uses a drag-and-drop library, holds board state in one place, and calls the API for every change. Authentication is JWT-based and membership is checked on every request.",
    "databaseSchema": "users: id INTEGER PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT, name TEXT; workspaces: id INTEGER PRIMARY KEY, name TEXT, owner_id INTEGER; memberships: workspace_id INTEGER, user_id INTEGER, role TEXT, PRIMARY KEY (workspace_id, user_id); boards: id INTEGER PRIMARY KEY, workspace_id INTEGER, title TEXT; lists: id INTEGER PRIMARY KEY, board_id INTEGER, title TEXT, position INTEGER; cards: id INTEGER PRIMARY KEY, list_id INTEGER, title TEXT, description TEXT, assignee_id INTEGER, due_date TEXT, position INTEGER; comments: id INTEGER PRIMARY KEY, card_id INTEGER, author_id INTEGER, body TEXT, created_at TEXT; activity: id INTEGER PRIMARY KEY, board_id INTEGER, user_id INTEGER, action TEXT, created_at TEXT",
    "apis": [
      "GET /api/workspaces, POST /api/boards, GET /api/boards/:id, POST /api/boards/:id/lists, POST /api/lists/:id/cards, PATCH /api/cards/:id/move, POST /api/cards/:id/comments, GET /api/boards/:id/activity."
    ],
    "fileStructure": "task-platform/\n  backend/\n    package.json\n    src/\n      index.ts\n      app.ts\n      db.ts\n      routes/\n        workspaces.ts\n        boards.ts\n        cards.ts\n      middleware/\n        auth.ts\n        membership.ts\n  frontend/\n    package.json\n    src/\n      App.tsx\n      api.ts\n      components/\n        Board.tsx\n        List.tsx\n        Card.tsx\n        CardDetail.tsx\n  README.md",
    "taskBreakdown": [
      "Set up the backend, schema and auth",
      "Implement workspaces and boards",
      "Implement lists and cards",
      "Implement drag and drop with positions",
      "Implement comments and activity",
      "Build the React board UI",
      "Add search and due-date highlights",
      "Write tests and document"
    ],
    "milestones": [
      {
        "id": "proj-fullstack-task-platform-m1",
        "order": 1,
        "title": "Backend setup, schema and auth",
        "objectives": [
          "Create the tables",
          "Add JWT authentication",
          "Seed a demo user"
        ],
        "instructions": "Set up the Express backend with the full schema and JWT authentication (reuse the pattern from the authentication project). Seed a demo user and workspace. Verify login works and protected routes reject missing tokens.",
        "concepts": [
          "Express",
          "SQLite",
          "JWT"
        ],
        "hints": [
          "Hash passwords with bcrypt.",
          "Protect every data route.",
          "Seed a demo account for manual testing."
        ],
        "acceptanceCriteria": [
          "The server starts",
          "Login returns a token",
          "Protected routes return 401 without one"
        ],
        "tests": [
          "Register and log in",
          "Call a protected route without a token",
          "Inspect the schema"
        ]
      },
      {
        "id": "proj-fullstack-task-platform-m2",
        "order": 2,
        "title": "Workspaces and boards",
        "objectives": [
          "Create workspaces",
          "Manage memberships",
          "Create boards"
        ],
        "instructions": "Implement workspaces with an owner and members, plus boards inside workspaces. Only members can list or create boards in a workspace. Add endpoints to invite a member by email.",
        "concepts": [
          "Membership",
          "Authorization",
          "REST"
        ],
        "hints": [
          "Check membership in middleware.",
          "Owners can invite members.",
          "Return 403 for non-members."
        ],
        "acceptanceCriteria": [
          "Creating a workspace works",
          "A non-member gets 403",
          "Inviting a member works"
        ],
        "tests": [
          "Create a workspace",
          "Access it as another user",
          "Invite a member"
        ]
      },
      {
        "id": "proj-fullstack-task-platform-m3",
        "order": 3,
        "title": "Lists and cards",
        "objectives": [
          "Create lists and cards",
          "Edit cards",
          "Assign and set due dates"
        ],
        "instructions": "Implement lists with positions and cards with title, description, assignee and due date. Cards are created at the end of a list. Add endpoints to edit a card and to delete it.",
        "concepts": [
          "CRUD",
          "Positions",
          "Assignments"
        ],
        "hints": [
          "Assign new cards the next position value.",
          "Validate assignees are workspace members.",
          "Return the card with its list position."
        ],
        "acceptanceCriteria": [
          "Creating a card works",
          "Assigning a non-member fails",
          "Editing updates the card"
        ],
        "tests": [
          "Create a board, list and card",
          "Assign to a non-member",
          "Edit the card title"
        ]
      },
      {
        "id": "proj-fullstack-task-platform-m4",
        "order": 4,
        "title": "Drag and drop with positions",
        "objectives": [
          "Move cards between lists",
          "Reorder within a list",
          "Persist positions"
        ],
        "instructions": "Implement a move endpoint that takes a card, a target list and a target position, and reorders the positions in both lists. The frontend uses a drag-and-drop library to call it. Positions must stay consistent after many moves.",
        "concepts": [
          "Drag and drop",
          "Positioning",
          "Transactions"
        ],
        "hints": [
          "Use fractional or renumbered positions to insert between cards.",
          "Update both lists in one transaction.",
          "Record the move in the activity log."
        ],
        "acceptanceCriteria": [
          "Moving a card works",
          "Reordering within a list works",
          "Positions stay unique"
        ],
        "tests": [
          "Move a card to another list",
          "Reorder cards in a list",
          "Move cards repeatedly and check order"
        ]
      },
      {
        "id": "proj-fullstack-task-platform-m5",
        "order": 5,
        "title": "Comments and activity",
        "objectives": [
          "Comment on cards",
          "Record activity",
          "Show the activity feed"
        ],
        "instructions": "Add comments on cards and an activity feed per board that records card creation, moves, assignments and comments. The feed shows who did what and when.",
        "concepts": [
          "Activity feeds",
          "Comments",
          "Auditing"
        ],
        "hints": [
          "Write activity rows in the same request as the change.",
          "Store a human-readable action string.",
          "Order the feed newest first."
        ],
        "acceptanceCriteria": [
          "Comments appear on the card",
          "Moves appear in the feed",
          "The feed is ordered newest first"
        ],
        "tests": [
          "Comment on a card",
          "Move a card and check the feed",
          "Assign a card and check the feed"
        ]
      },
      {
        "id": "proj-fullstack-task-platform-m6",
        "order": 6,
        "title": "React board UI",
        "objectives": [
          "Render boards, lists and cards",
          "Wire drag and drop",
          "Show card detail"
        ],
        "instructions": "Build the React board view: lists as columns, cards as draggable items, and a card detail panel with description, assignee, due date and comments. Every change calls the API and updates the local state without a reload.",
        "concepts": [
          "React",
          "Drag and drop",
          "State management"
        ],
        "hints": [
          "Hold the board state in one component.",
          "Optimistically update, then confirm with the API.",
          "Show a loading state while fetching."
        ],
        "acceptanceCriteria": [
          "The board renders",
          "Dragging a card moves it",
          "Card detail shows comments"
        ],
        "tests": [
          "Open a board",
          "Drag a card to another list",
          "Open a card and comment"
        ]
      },
      {
        "id": "proj-fullstack-task-platform-m7",
        "order": 7,
        "title": "Search and overdue highlights",
        "objectives": [
          "Search cards in a workspace",
          "Highlight overdue cards",
          "Filter by assignee"
        ],
        "instructions": "Add search across card titles and descriptions in a workspace, a filter by assignee, and a visual highlight for cards past their due date. Search results link to the card on its board.",
        "concepts": [
          "Search",
          "Filtering",
          "UI feedback"
        ],
        "hints": [
          "Search with a LIKE query across title and description.",
          "Compare due dates with today.",
          "Keep the filter state in the URL or component state."
        ],
        "acceptanceCriteria": [
          "Search finds cards",
          "Overdue cards are highlighted",
          "Filtering by assignee works"
        ],
        "tests": [
          "Search for a word",
          "Set a past due date",
          "Filter by assignee"
        ]
      },
      {
        "id": "proj-fullstack-task-platform-m8",
        "order": 8,
        "title": "Testing and documentation",
        "objectives": [
          "Write API tests",
          "Test drag and drop positions",
          "Document the platform"
        ],
        "instructions": "Write API tests covering workspaces, membership checks, card moves, comments and activity. Run the suite and finish the README with the data model, the API list and how to run both parts.",
        "concepts": [
          "API testing",
          "Authorization tests",
          "Documentation"
        ],
        "hints": [
          "Test the 403 cases for non-members.",
          "Test position consistency after moves.",
          "Document the position strategy."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Membership is covered by tests",
          "The README documents the model"
        ],
        "tests": [
          "Run the full test suite",
          "Use the platform end to end",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Drag and drop persists correctly",
      "Membership is enforced",
      "Activity is recorded",
      "The UI is responsive",
      "Tests cover the API",
      "The README documents the model"
    ],
    "finalAssessment": [
      "Create a workspace, board and cards",
      "Drag a card between lists",
      "Comment on a card and show the feed",
      "Search for a card",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-ecommerce-platform",
    "slug": "e-commerce-platform",
    "level": 3,
    "title": "E-commerce Platform",
    "description": "Build a full-stack e-commerce platform with a product catalogue, cart, checkout, orders, payments (simulated), and an admin area for managing products and viewing orders.",
    "skills": [
      "TypeScript",
      "React",
      "Express",
      "SQLite",
      "Stripe (simulated)",
      "REST design",
      "Authentication"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Browse products with search and category filters",
      "View product details with stock information",
      "Add products to a cart and adjust quantities",
      "Check out and create an order",
      "Process a simulated payment",
      "View order history and order status",
      "Admins can add, edit and delete products",
      "Admins can view all orders and update their status"
    ],
    "nonFunctionalRequirements": [
      "Stock is reduced when an order is placed",
      "An order cannot be placed for more than the available stock",
      "Payments are simulated, never real",
      "Only admins can manage products",
      "Order totals are computed exactly in cents"
    ],
    "architecture": "The platform has an Express API with SQLite tables for products, users, carts, orders and order items. The cart lives in the database so it survives reloads. Checkout runs in a transaction: it validates stock, creates the order and its items, reduces stock, and calls a simulated payment provider. The React frontend has a shop, a cart page, a checkout flow and an admin area guarded by role.",
    "databaseSchema": "products: id INTEGER PRIMARY KEY, name TEXT, description TEXT, price_cents INTEGER, stock INTEGER, category TEXT, image_url TEXT; users: id INTEGER PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT, role TEXT; carts: user_id INTEGER, product_id INTEGER, quantity INTEGER, PRIMARY KEY (user_id, product_id); orders: id INTEGER PRIMARY KEY, user_id INTEGER, total_cents INTEGER, status TEXT, created_at TEXT; order_items: id INTEGER PRIMARY KEY, order_id INTEGER, product_id INTEGER, quantity INTEGER, price_cents INTEGER",
    "apis": [
      "GET /api/products, GET /api/products/:id, POST /api/cart, GET /api/cart, POST /api/orders/checkout, GET /api/orders, GET /api/admin/orders, POST /api/admin/products."
    ],
    "fileStructure": "ecommerce/\n  backend/\n    package.json\n    src/\n      index.ts\n      app.ts\n      db.ts\n      routes/\n        products.ts\n        cart.ts\n        orders.ts\n        admin.ts\n      services/\n        checkout.ts\n        payments.ts\n  frontend/\n    package.json\n    src/\n      App.tsx\n      api.ts\n      pages/\n        Shop.tsx\n        ProductDetail.tsx\n        Cart.tsx\n        Checkout.tsx\n        Orders.tsx\n        Admin.tsx\n  README.md",
    "taskBreakdown": [
      "Set up the backend, schema and seed data",
      "Implement the product catalogue",
      "Implement the cart",
      "Implement checkout with simulated payment",
      "Implement order history",
      "Build the React shop and cart",
      "Build checkout and admin UI",
      "Write tests and document"
    ],
    "milestones": [
      {
        "id": "proj-ecommerce-platform-m1",
        "order": 1,
        "title": "Setup, schema and seed data",
        "objectives": [
          "Create the tables",
          "Seed products",
          "Add authentication"
        ],
        "instructions": "Set up the Express backend with the full schema, JWT authentication and roles. Seed the catalogue with realistic products across categories, including stock levels and prices in cents.",
        "concepts": [
          "Express",
          "SQLite",
          "Seeding"
        ],
        "hints": [
          "Store prices as integer cents.",
          "Seed at least 20 products.",
          "Create an admin seed user."
        ],
        "acceptanceCriteria": [
          "The server starts",
          "Seed data loads",
          "Login works for admin and user"
        ],
        "tests": [
          "Inspect the seeded products",
          "Log in as admin",
          "Log in as a user"
        ]
      },
      {
        "id": "proj-ecommerce-platform-m2",
        "order": 2,
        "title": "Product catalogue",
        "objectives": [
          "List products with filters",
          "Search products",
          "Show product details"
        ],
        "instructions": "Implement the product list with category filters, text search and pagination, plus a detail endpoint that returns stock information. The public list never shows products with zero stock as purchasable.",
        "concepts": [
          "Catalogue",
          "Search",
          "Pagination"
        ],
        "hints": [
          "Filter by category and search term.",
          "Paginate the results.",
          "Show stock status on the detail page."
        ],
        "acceptanceCriteria": [
          "Filtering works",
          "Search finds products",
          "Out-of-stock products are flagged"
        ],
        "tests": [
          "List with a category filter",
          "Search for a product",
          "Fetch a product detail"
        ]
      },
      {
        "id": "proj-ecommerce-platform-m3",
        "order": 3,
        "title": "Cart",
        "objectives": [
          "Add to cart",
          "Change quantities",
          "Persist the cart per user"
        ],
        "instructions": "Implement a database-backed cart: add a product, change its quantity, remove it, and fetch the cart with line totals and a grand total. Adding more than the available stock is rejected.",
        "concepts": [
          "Carts",
          "Stock checks",
          "Totals"
        ],
        "hints": [
          "Store the cart in the database, not in memory.",
          "Validate quantity against stock.",
          "Compute totals in cents."
        ],
        "acceptanceCriteria": [
          "Adding to cart works",
          "Overstock is rejected",
          "Totals are correct"
        ],
        "tests": [
          "Add a product to the cart",
          "Add more than the stock",
          "Change a quantity"
        ]
      },
      {
        "id": "proj-ecommerce-platform-m4",
        "order": 4,
        "title": "Checkout and simulated payment",
        "objectives": [
          "Validate stock at checkout",
          "Create the order in a transaction",
          "Simulate payment"
        ],
        "instructions": "Implement checkout: validate every cart line against stock, create the order and its items, reduce stock, clear the cart, and call a simulated payment function that approves test cards and declines a specific test card. All of it runs in one transaction so a failure rolls everything back.",
        "concepts": [
          "Transactions",
          "Checkout",
          "Simulated payments"
        ],
        "hints": [
          "Use a database transaction for the whole checkout.",
          "Reduce stock only on success.",
          "Document the test card numbers."
        ],
        "acceptanceCriteria": [
          "Checkout creates an order",
          "Stock is reduced",
          "A declined card leaves stock unchanged"
        ],
        "tests": [
          "Check out successfully",
          "Check out with the decline test card",
          "Check stock after both"
        ]
      },
      {
        "id": "proj-ecommerce-platform-m5",
        "order": 5,
        "title": "Orders and admin",
        "objectives": [
          "List a user orders",
          "Show order details",
          "Admin order management"
        ],
        "instructions": "Add order history for users and an admin area listing all orders with status updates (paid, shipped, delivered, cancelled). Admins can add, edit and delete products, and set stock levels.",
        "concepts": [
          "Order history",
          "Admin",
          "Status workflow"
        ],
        "hints": [
          "Users see only their own orders.",
          "Admins see all orders.",
          "Status changes are validated transitions."
        ],
        "acceptanceCriteria": [
          "Users see their orders",
          "Admins see all orders",
          "A product edit works"
        ],
        "tests": [
          "Place an order and view history",
          "Update an order status as admin",
          "Edit a product as admin"
        ]
      },
      {
        "id": "proj-ecommerce-platform-m6",
        "order": 6,
        "title": "React shop and cart",
        "objectives": [
          "Build the shop page",
          "Build product detail",
          "Build the cart page"
        ],
        "instructions": "Build the React shop with product cards, filters and search, a product detail page, and a cart page with quantity controls and totals. All data comes from the API.",
        "concepts": [
          "React",
          "Catalogue UI",
          "Cart UI"
        ],
        "hints": [
          "Fetch products with the same filters as the API.",
          "Show stock status on cards.",
          "Update quantities through the API."
        ],
        "acceptanceCriteria": [
          "The shop renders products",
          "Filtering works",
          "The cart updates"
        ],
        "tests": [
          "Browse the shop",
          "Filter by category",
          "Add items and open the cart"
        ]
      },
      {
        "id": "proj-ecommerce-platform-m7",
        "order": 7,
        "title": "Checkout and admin UI",
        "objectives": [
          "Build the checkout flow",
          "Build the admin area",
          "Show order confirmation"
        ],
        "instructions": "Build the checkout page with a simulated card form, an order confirmation page, and the admin area for products and orders. The checkout form uses the documented test card numbers.",
        "concepts": [
          "Checkout UI",
          "Admin UI",
          "Forms"
        ],
        "hints": [
          "Show the test card numbers on the form.",
          "Display the order number after checkout.",
          "Guard the admin pages by role."
        ],
        "acceptanceCriteria": [
          "Checkout completes",
          "The confirmation shows the order",
          "Non-admins cannot open admin pages"
        ],
        "tests": [
          "Check out with the test card",
          "Open the admin area as a user",
          "View an order confirmation"
        ]
      },
      {
        "id": "proj-ecommerce-platform-m8",
        "order": 8,
        "title": "Testing and documentation",
        "objectives": [
          "Write API tests",
          "Test checkout transactions",
          "Document the platform"
        ],
        "instructions": "Write API tests covering the catalogue, cart, checkout success and failure, stock reduction, and admin access. Run the suite and finish the README with the test cards, the data model and how to run both parts.",
        "concepts": [
          "API testing",
          "Transaction tests",
          "Documentation"
        ],
        "hints": [
          "Test that a failed checkout leaves stock unchanged.",
          "Test the 403 cases for admin routes.",
          "Document the simulated payment."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Checkout rollback is covered",
          "The README documents the test cards"
        ],
        "tests": [
          "Run the full test suite",
          "Buy a product end to end",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Checkout is transactional",
      "Stock is never oversold",
      "Payments are simulated only",
      "Admin access is enforced",
      "Totals are exact in cents",
      "Tests cover checkout"
    ],
    "finalAssessment": [
      "Browse the shop and add to cart",
      "Check out with the test card",
      "Show the order and reduced stock",
      "Show the admin area",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-learning-management-system",
    "slug": "learning-management-system",
    "level": 3,
    "title": "Learning Management System",
    "description": "Build a learning management system with courses, lessons, quizzes, enrolments and progress tracking. Students enrol, complete lessons, take quizzes and see their progress; instructors create courses and view student progress.",
    "skills": [
      "TypeScript",
      "React",
      "Express",
      "SQLite",
      "RBAC",
      "Progress tracking",
      "Quizzes"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Instructors create courses with lessons",
      "Lessons support text and video URLs",
      "Students enrol in courses",
      "Students mark lessons complete and progress is tracked",
      "Quizzes with multiple-choice questions grade automatically",
      "Students see their progress per course",
      "Instructors see enrolment and completion reports",
      "Courses can be published or kept as drafts"
    ],
    "nonFunctionalRequirements": [
      "Progress is computed from completed lessons",
      "Only enrolled students can access course content",
      "Quizzes grade immediately and record the score",
      "Draft courses are hidden from students",
      "Instructors only manage their own courses"
    ],
    "architecture": "The LMS is an Express API with SQLite tables for users, courses, lessons, enrolments, lesson progress and quiz attempts. Roles are student and instructor. Progress is the share of lessons completed. Quizzes are stored as questions with options and a correct index, and attempts record the score. The React frontend has a course catalogue, a course player, and an instructor dashboard.",
    "databaseSchema": "users: id INTEGER PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT, name TEXT, role TEXT; courses: id INTEGER PRIMARY KEY, instructor_id INTEGER, title TEXT, description TEXT, status TEXT DEFAULT \"draft\"; lessons: id INTEGER PRIMARY KEY, course_id INTEGER, title TEXT, content TEXT, video_url TEXT, position INTEGER; enrolments: user_id INTEGER, course_id INTEGER, enrolled_at TEXT, PRIMARY KEY (user_id, course_id); lesson_progress: user_id INTEGER, lesson_id INTEGER, completed_at TEXT, PRIMARY KEY (user_id, lesson_id); quizzes: id INTEGER PRIMARY KEY, course_id INTEGER, title TEXT; quiz_questions: id INTEGER PRIMARY KEY, quiz_id INTEGER, question TEXT, options TEXT, answer_index INTEGER; quiz_attempts: id INTEGER PRIMARY KEY, user_id INTEGER, quiz_id INTEGER, score INTEGER, total INTEGER, created_at TEXT",
    "apis": [
      "GET /api/courses, POST /api/courses, GET /api/courses/:id, POST /api/courses/:id/enrol, POST /api/lessons/:id/complete, POST /api/quizzes/:id/attempt, GET /api/courses/:id/progress."
    ],
    "fileStructure": "lms/\n  backend/\n    package.json\n    src/\n      index.ts\n      app.ts\n      db.ts\n      routes/\n        courses.ts\n        lessons.ts\n        quizzes.ts\n  frontend/\n    package.json\n    src/\n      App.tsx\n      api.ts\n      pages/\n        Catalogue.tsx\n        CoursePlayer.tsx\n        Instructor.tsx\n  README.md",
    "taskBreakdown": [
      "Set up the backend, schema and roles",
      "Implement courses and lessons",
      "Implement enrolment and access control",
      "Implement progress tracking",
      "Implement quizzes",
      "Build the React catalogue and player",
      "Build the instructor dashboard",
      "Write tests and document"
    ],
    "milestones": [
      {
        "id": "proj-learning-management-system-m1",
        "order": 1,
        "title": "Setup, schema and roles",
        "objectives": [
          "Create the tables",
          "Add roles",
          "Seed users and a course"
        ],
        "instructions": "Set up the Express backend with the full schema, JWT authentication and student and instructor roles. Seed an instructor, a student and a sample course with lessons.",
        "concepts": [
          "Express",
          "SQLite",
          "RBAC"
        ],
        "hints": [
          "Store quiz options as JSON.",
          "Use a role field on users.",
          "Seed realistic course content."
        ],
        "acceptanceCriteria": [
          "The server starts",
          "Seed data loads",
          "Roles are enforced"
        ],
        "tests": [
          "Log in as instructor and student",
          "Inspect the schema",
          "List courses as a student"
        ]
      },
      {
        "id": "proj-learning-management-system-m2",
        "order": 2,
        "title": "Courses and lessons",
        "objectives": [
          "Create courses as drafts",
          "Add lessons in order",
          "Publish courses"
        ],
        "instructions": "Implement course creation (draft by default), lesson creation with positions, and publishing. Only the owning instructor can edit a course. Students see only published courses.",
        "concepts": [
          "CRUD",
          "Drafts",
          "Ordering"
        ],
        "hints": [
          "Check ownership before edits.",
          "Order lessons by position.",
          "Hide drafts from the student catalogue."
        ],
        "acceptanceCriteria": [
          "Creating a course works",
          "Drafts are hidden from students",
          "Lessons are ordered"
        ],
        "tests": [
          "Create a course and lessons",
          "List as a student",
          "Publish and list again"
        ]
      },
      {
        "id": "proj-learning-management-system-m3",
        "order": 3,
        "title": "Enrolment and access",
        "objectives": [
          "Enrol in a course",
          "Block unenrolled access",
          "List my courses"
        ],
        "instructions": "Implement enrolment and an access check: lesson content is only returned to enrolled students and the owning instructor. Add an endpoint listing the courses a student is enrolled in.",
        "concepts": [
          "Access control",
          "Enrolment",
          "Authorization"
        ],
        "hints": [
          "Check enrolment in middleware for lesson routes.",
          "Return 403 for unenrolled users.",
          "Prevent duplicate enrolments."
        ],
        "acceptanceCriteria": [
          "Enrolling works",
          "An unenrolled student gets 403",
          "Duplicate enrolment is blocked"
        ],
        "tests": [
          "Enrol as a student",
          "Fetch a lesson without enrolling",
          "Enrol twice"
        ]
      },
      {
        "id": "proj-learning-management-system-m4",
        "order": 4,
        "title": "Progress tracking",
        "objectives": [
          "Mark lessons complete",
          "Compute course progress",
          "Show progress to students"
        ],
        "instructions": "Implement lesson completion and progress as the percentage of lessons completed in a course. Add an endpoint returning progress per course for the logged-in student.",
        "concepts": [
          "Progress",
          "Percentages",
          "Tracking"
        ],
        "hints": [
          "Record completion with a timestamp.",
          "Compute progress from counts, not stored values.",
          "Ignore duplicate completions."
        ],
        "acceptanceCriteria": [
          "Completing a lesson updates progress",
          "Progress is a percentage",
          "Duplicate completion is harmless"
        ],
        "tests": [
          "Complete two of four lessons",
          "Check progress is 50 percent",
          "Complete the same lesson twice"
        ]
      },
      {
        "id": "proj-learning-management-system-m5",
        "order": 5,
        "title": "Quizzes",
        "objectives": [
          "Create quizzes with questions",
          "Submit attempts",
          "Grade automatically"
        ],
        "instructions": "Implement quizzes: an instructor adds questions with options and a correct index, a student submits answers, the server grades them and records the score and total. The correct answers are never sent to the student before submission.",
        "concepts": [
          "Quizzes",
          "Auto-grading",
          "Attempts"
        ],
        "hints": [
          "Do not include answer_index in student-facing responses.",
          "Grade on the server, never trust the client.",
          "Record every attempt."
        ],
        "acceptanceCriteria": [
          "Submitting grades correctly",
          "Answers are hidden before submission",
          "Attempts are recorded"
        ],
        "tests": [
          "Create a quiz with 3 questions",
          "Submit all correct answers",
          "Submit with one wrong"
        ]
      },
      {
        "id": "proj-learning-management-system-m6",
        "order": 6,
        "title": "React catalogue and player",
        "objectives": [
          "Build the course catalogue",
          "Build the course player",
          "Show progress"
        ],
        "instructions": "Build the React catalogue of published courses, a course player showing lessons in order with completion checkboxes, and a progress bar. Enrolment happens from the catalogue.",
        "concepts": [
          "React",
          "Course player",
          "Progress UI"
        ],
        "hints": [
          "Fetch progress with the course data.",
          "Update the progress bar on completion.",
          "Show quizzes inside the player."
        ],
        "acceptanceCriteria": [
          "The catalogue lists published courses",
          "The player shows lessons and progress",
          "Enrolling works from the UI"
        ],
        "tests": [
          "Browse the catalogue",
          "Enrol and open the player",
          "Complete a lesson"
        ]
      },
      {
        "id": "proj-learning-management-system-m7",
        "order": 7,
        "title": "Instructor dashboard",
        "objectives": [
          "Show enrolments per course",
          "Show completion reports",
          "Manage quizzes"
        ],
        "instructions": "Build the instructor dashboard showing enrolment counts, average progress and quiz scores per course, plus quiz management. Instructors see only their own courses.",
        "concepts": [
          "Dashboards",
          "Reporting",
          "Instructor tools"
        ],
        "hints": [
          "Aggregate progress in SQL.",
          "Show average quiz scores.",
          "Restrict the dashboard to the owner."
        ],
        "acceptanceCriteria": [
          "The dashboard shows enrolments",
          "Average progress is correct",
          "Another instructor cannot see the course"
        ],
        "tests": [
          "Enrol students and check the dashboard",
          "Submit quiz attempts and check scores",
          "Log in as another instructor"
        ]
      },
      {
        "id": "proj-learning-management-system-m8",
        "order": 8,
        "title": "Testing and documentation",
        "objectives": [
          "Write API tests",
          "Test access control and grading",
          "Document the LMS"
        ],
        "instructions": "Write API tests covering courses, enrolment, access control, progress, quizzes and grading. Run the suite and finish the README with the roles, the data model and how to run both parts.",
        "concepts": [
          "API testing",
          "Authorization tests",
          "Documentation"
        ],
        "hints": [
          "Test the 403 cases for unenrolled students.",
          "Test that answers are hidden.",
          "Document the roles."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Access control is covered",
          "The README documents the roles"
        ],
        "tests": [
          "Run the full test suite",
          "Take a course end to end",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Progress math is correct",
      "Access control is enforced",
      "Quizzes grade on the server",
      "Drafts stay hidden",
      "Tests cover the API",
      "The README documents the roles"
    ],
    "finalAssessment": [
      "Enrol in a course and complete lessons",
      "Show the progress bar",
      "Take a quiz and see the score",
      "Show the instructor dashboard",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-realtime-chat",
    "slug": "real-time-chat",
    "level": 3,
    "title": "Real-Time Chat",
    "description": "Build a real-time chat application with rooms, direct messages, typing indicators, online presence and message history, using WebSockets and a React frontend.",
    "skills": [
      "TypeScript",
      "React",
      "Express",
      "WebSockets",
      "SQLite",
      "Presence",
      "Authentication"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Create chat rooms and join them",
      "Send and receive messages in real time",
      "See who is online in a room",
      "See typing indicators",
      "Send direct messages to another user",
      "Load message history when joining a room",
      "Edit and delete your own messages",
      "Receive messages only for rooms you joined"
    ],
    "nonFunctionalRequirements": [
      "Messages arrive in under 200ms on the local network",
      "History loads when joining",
      "Typing indicators disappear after a few seconds",
      "Only room members receive room messages",
      "Messages persist in SQLite"
    ],
    "architecture": "The backend is an Express API plus a WebSocket server sharing the same HTTP server. Authentication happens over the WebSocket handshake with a JWT. Each connection joins rooms, and the server broadcasts messages, typing events and presence to room members only. Messages are stored in SQLite before broadcasting so history is complete. The React frontend keeps a socket connection and renders messages as they arrive.",
    "databaseSchema": "users: id INTEGER PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT, name TEXT; rooms: id INTEGER PRIMARY KEY, name TEXT, is_direct INTEGER DEFAULT 0; room_members: room_id INTEGER, user_id INTEGER, PRIMARY KEY (room_id, user_id); messages: id INTEGER PRIMARY KEY, room_id INTEGER, user_id INTEGER, body TEXT, edited INTEGER DEFAULT 0, created_at TEXT",
    "apis": [
      "REST: GET /api/rooms, POST /api/rooms, GET /api/rooms/:id/messages. WebSocket events: join, leave, message, typing, presence."
    ],
    "fileStructure": "chat/\n  backend/\n    package.json\n    src/\n      index.ts\n      app.ts\n      db.ts\n      ws.ts\n      routes/\n        rooms.ts\n  frontend/\n    package.json\n    src/\n      App.tsx\n      socket.ts\n      components/\n        RoomList.tsx\n        MessageList.tsx\n        Composer.tsx\n  README.md",
    "taskBreakdown": [
      "Set up the backend, schema and auth",
      "Implement rooms over REST",
      "Add the WebSocket server",
      "Implement real-time messaging",
      "Add typing indicators and presence",
      "Build the React chat UI",
      "Add direct messages and history",
      "Write tests and document"
    ],
    "milestones": [
      {
        "id": "proj-realtime-chat-m1",
        "order": 1,
        "title": "Setup, schema and auth",
        "objectives": [
          "Create the tables",
          "Add JWT authentication",
          "Seed users and a room"
        ],
        "instructions": "Set up the Express backend with the chat schema and JWT authentication. Seed two users and a general room. Verify login works and the rooms endpoint lists rooms.",
        "concepts": [
          "Express",
          "SQLite",
          "JWT"
        ],
        "hints": [
          "Hash passwords with bcrypt.",
          "Seed a general room with both users.",
          "Protect the room endpoints."
        ],
        "acceptanceCriteria": [
          "The server starts",
          "Login works",
          "Rooms list correctly"
        ],
        "tests": [
          "Log in as both users",
          "List rooms",
          "Inspect the schema"
        ]
      },
      {
        "id": "proj-realtime-chat-m2",
        "order": 2,
        "title": "Rooms over REST",
        "objectives": [
          "Create rooms",
          "Join rooms",
          "List room members"
        ],
        "instructions": "Implement room creation, joining and member listing over REST. Only members can fetch a room message history. Direct message rooms are created for a pair of users.",
        "concepts": [
          "REST",
          "Membership",
          "Authorization"
        ],
        "hints": [
          "Check membership before returning history.",
          "Prevent duplicate direct rooms for the same pair.",
          "Return members with each room."
        ],
        "acceptanceCriteria": [
          "Creating a room works",
          "Joining works",
          "A non-member cannot read history"
        ],
        "tests": [
          "Create a room",
          "Join it as the second user",
          "Fetch history as a third user"
        ]
      },
      {
        "id": "proj-realtime-chat-m3",
        "order": 3,
        "title": "WebSocket server",
        "objectives": [
          "Attach a WebSocket server",
          "Authenticate the handshake",
          "Handle join and leave"
        ],
        "instructions": "Attach a WebSocket server to the same HTTP server. Authenticate the connection with a JWT passed in the handshake, and implement join and leave events that add the socket to a room group.",
        "concepts": [
          "WebSockets",
          "Authentication",
          "Rooms"
        ],
        "hints": [
          "Verify the token before accepting the socket.",
          "Keep a map of room to sockets.",
          "Clean up on disconnect."
        ],
        "acceptanceCriteria": [
          "A valid token connects",
          "An invalid token is rejected",
          "Joining a room works"
        ],
        "tests": [
          "Connect with a valid token",
          "Connect with a bad token",
          "Join and leave a room"
        ]
      },
      {
        "id": "proj-realtime-chat-m4",
        "order": 4,
        "title": "Real-time messaging",
        "objectives": [
          "Broadcast messages to a room",
          "Store messages first",
          "Send history on join"
        ],
        "instructions": "Implement the message event: validate the body, store the message in SQLite, then broadcast it to every socket in the room. When a client joins, send the recent message history.",
        "concepts": [
          "Broadcasting",
          "Persistence",
          "Ordering"
        ],
        "hints": [
          "Store before broadcasting so history is complete.",
          "Include the sender name in the broadcast.",
          "Order history by creation time."
        ],
        "acceptanceCriteria": [
          "A message reaches all room members",
          "The message is stored",
          "Joining loads history"
        ],
        "tests": [
          "Send a message from one client",
          "Check the other client receives it",
          "Reconnect and check history"
        ]
      },
      {
        "id": "proj-realtime-chat-m5",
        "order": 5,
        "title": "Typing indicators and presence",
        "objectives": [
          "Broadcast typing events",
          "Expire typing after a few seconds",
          "Show online members"
        ],
        "instructions": "Add typing events that broadcast to the room and expire after 3 seconds without a new event. Track online users per room and broadcast presence changes on connect and disconnect.",
        "concepts": [
          "Typing indicators",
          "Presence",
          "Expiry"
        ],
        "hints": [
          "Send typing events throttled from the client.",
          "Expire typing with a timeout on the server.",
          "Broadcast the online list on changes."
        ],
        "acceptanceCriteria": [
          "Typing shows for other members",
          "Typing expires",
          "Online list updates on disconnect"
        ],
        "tests": [
          "Type in one client and watch the other",
          "Stop typing and wait",
          "Disconnect and check presence"
        ]
      },
      {
        "id": "proj-realtime-chat-m6",
        "order": 6,
        "title": "React chat UI",
        "objectives": [
          "Build the room list",
          "Build the message list",
          "Build the composer"
        ],
        "instructions": "Build the React UI with a room list, a message list that appends live messages, and a composer that sends on Enter and emits typing events. The socket connection is held in a small module.",
        "concepts": [
          "React",
          "WebSockets",
          "Live updates"
        ],
        "hints": [
          "Append incoming messages to state.",
          "Scroll to the bottom on new messages.",
          "Show typing indicators under the list."
        ],
        "acceptanceCriteria": [
          "The UI connects and shows rooms",
          "Messages appear live",
          "Typing shows in the UI"
        ],
        "tests": [
          "Open two browsers and chat",
          "Check the typing indicator",
          "Reload and check history"
        ]
      },
      {
        "id": "proj-realtime-chat-m7",
        "order": 7,
        "title": "Direct messages and edits",
        "objectives": [
          "Add direct messages",
          "Edit and delete own messages",
          "Broadcast edits"
        ],
        "instructions": "Add direct message rooms between two users, plus editing and deleting your own messages, with edits and deletes broadcast to the room so all clients stay in sync.",
        "concepts": [
          "Direct messages",
          "Edits",
          "Sync"
        ],
        "hints": [
          "Only the author can edit or delete.",
          "Broadcast the updated message.",
          "Mark edited messages as edited."
        ],
        "acceptanceCriteria": [
          "Direct messages work",
          "Editing updates all clients",
          "Deleting removes it everywhere"
        ],
        "tests": [
          "Start a direct message",
          "Edit a message",
          "Delete a message"
        ]
      },
      {
        "id": "proj-realtime-chat-m8",
        "order": 8,
        "title": "Testing and documentation",
        "objectives": [
          "Write API tests",
          "Test WebSocket messaging",
          "Document the protocol"
        ],
        "instructions": "Write API tests for rooms and history, plus WebSocket tests that connect two clients and check message delivery. Run the suite and finish the README with the event protocol and how to run both parts.",
        "concepts": [
          "API testing",
          "WebSocket testing",
          "Documentation"
        ],
        "hints": [
          "Test with two socket clients.",
          "Test that non-members cannot join.",
          "Document every event name and payload."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Message delivery is covered",
          "The README documents the protocol"
        ],
        "tests": [
          "Run the full test suite",
          "Chat between two browsers",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Messages arrive in real time",
      "History is complete",
      "Typing and presence work",
      "Only members receive messages",
      "Tests cover sockets and API",
      "The README documents the protocol"
    ],
    "finalAssessment": [
      "Chat between two users live",
      "Show typing indicators",
      "Show presence changes",
      "Show message history on rejoin",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-saas-admin-dashboard",
    "slug": "saas-admin-dashboard",
    "level": 3,
    "title": "SaaS Admin Dashboard",
    "description": "Build a SaaS admin dashboard for managing tenants, users, subscriptions, usage metrics and feature flags, with role-based access, audit logs and charts.",
    "skills": [
      "TypeScript",
      "React",
      "Express",
      "SQLite",
      "RBAC",
      "Multi-tenancy",
      "Audit logs"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Manage tenants (organisations) with their own users",
      "Manage users within a tenant with roles",
      "Track subscription plans and status per tenant",
      "Show usage metrics per tenant (API calls, storage)",
      "Toggle feature flags per tenant",
      "Record an audit log of admin actions",
      "Show charts of signups and usage over time",
      "Super-admins can impersonate a tenant view"
    ],
    "nonFunctionalRequirements": [
      "Tenants never see each other data",
      "Only super-admins manage tenants",
      "Every admin action is audited",
      "Feature flags take effect immediately",
      "Usage metrics are computed from real events"
    ],
    "architecture": "The dashboard is an Express API with SQLite tables for tenants, users, subscriptions, usage events, feature flags and audit logs. Every query is scoped by tenant id, enforced in the repository layer so a missing scope cannot leak data. Roles are super-admin, tenant admin and member. The React frontend has tenant switching, user management, subscription views, charts and an audit log page.",
    "databaseSchema": "tenants: id INTEGER PRIMARY KEY, name TEXT, plan TEXT, created_at TEXT; users: id INTEGER PRIMARY KEY, tenant_id INTEGER, email TEXT, password_hash TEXT, role TEXT; subscriptions: id INTEGER PRIMARY KEY, tenant_id INTEGER UNIQUE, plan TEXT, status TEXT, renews_at TEXT; usage_events: id INTEGER PRIMARY KEY, tenant_id INTEGER, kind TEXT, amount INTEGER, created_at TEXT; feature_flags: id INTEGER PRIMARY KEY, tenant_id INTEGER, name TEXT, enabled INTEGER; audit_log: id INTEGER PRIMARY KEY, tenant_id INTEGER, user_id INTEGER, action TEXT, details TEXT, created_at TEXT",
    "apis": [
      "GET /api/admin/tenants, POST /api/admin/tenants, GET /api/admin/tenants/:id/users, GET /api/admin/tenants/:id/usage, POST /api/admin/tenants/:id/flags, GET /api/admin/audit."
    ],
    "fileStructure": "saas-admin/\n  backend/\n    package.json\n    src/\n      index.ts\n      app.ts\n      db.ts\n      routes/\n        tenants.ts\n        users.ts\n        billing.ts\n        flags.ts\n        audit.ts\n      middleware/\n        auth.ts\n        tenant.ts\n  frontend/\n    package.json\n    src/\n      App.tsx\n      api.ts\n      pages/\n        Tenants.tsx\n        Users.tsx\n        Billing.tsx\n        Usage.tsx\n        Audit.tsx\n  README.md",
    "taskBreakdown": [
      "Set up the backend, schema and roles",
      "Implement tenant management",
      "Implement tenant-scoped users",
      "Implement subscriptions and usage",
      "Implement feature flags",
      "Implement the audit log",
      "Build the React admin UI",
      "Write tests and document"
    ],
    "milestones": [
      {
        "id": "proj-saas-admin-dashboard-m1",
        "order": 1,
        "title": "Setup, schema and roles",
        "objectives": [
          "Create the tables",
          "Add roles",
          "Seed tenants and users"
        ],
        "instructions": "Set up the Express backend with the full schema, JWT authentication and three roles (super-admin, tenant admin, member). Seed two tenants with users and subscriptions.",
        "concepts": [
          "Express",
          "SQLite",
          "RBAC"
        ],
        "hints": [
          "Scope every table by tenant_id.",
          "Create a super-admin seed user.",
          "Hash passwords with bcrypt."
        ],
        "acceptanceCriteria": [
          "The server starts",
          "Seed data loads",
          "Roles are enforced"
        ],
        "tests": [
          "Log in as super-admin",
          "Log in as a tenant admin",
          "Inspect the schema"
        ]
      },
      {
        "id": "proj-saas-admin-dashboard-m2",
        "order": 2,
        "title": "Tenant management",
        "objectives": [
          "Create tenants",
          "List tenants",
          "Super-admin only access"
        ],
        "instructions": "Implement tenant creation and listing, restricted to super-admins. Tenant admins and members cannot access the tenant management endpoints at all.",
        "concepts": [
          "Multi-tenancy",
          "Authorization",
          "REST"
        ],
        "hints": [
          "Check the super-admin role in middleware.",
          "Return 403 for other roles.",
          "Validate the tenant name and plan."
        ],
        "acceptanceCriteria": [
          "A super-admin can create a tenant",
          "A tenant admin gets 403",
          "Listing works"
        ],
        "tests": [
          "Create a tenant as super-admin",
          "Try as a tenant admin",
          "List tenants"
        ]
      },
      {
        "id": "proj-saas-admin-dashboard-m3",
        "order": 3,
        "title": "Tenant-scoped users",
        "objectives": [
          "Manage users within a tenant",
          "Enforce tenant scope",
          "Prevent cross-tenant access"
        ],
        "instructions": "Implement user management scoped to a tenant: a tenant admin manages only their own tenant users, and every query filters by tenant id. Attempting to access another tenant user returns 404.",
        "concepts": [
          "Tenant scoping",
          "Authorization",
          "Data isolation"
        ],
        "hints": [
          "Filter every query by tenant_id.",
          "Return 404, not 403, for cross-tenant ids.",
          "Enforce the scope in the repository layer."
        ],
        "acceptanceCriteria": [
          "A tenant admin sees only their users",
          "Cross-tenant access returns 404",
          "Creating a user works"
        ],
        "tests": [
          "List users as a tenant admin",
          "Fetch a user from another tenant",
          "Create a user"
        ]
      },
      {
        "id": "proj-saas-admin-dashboard-m4",
        "order": 4,
        "title": "Subscriptions and usage",
        "objectives": [
          "Show subscription status",
          "Record usage events",
          "Aggregate usage metrics"
        ],
        "instructions": "Add subscription views per tenant and a usage event recorder. Aggregate usage by kind and day for the charts. Record a usage event on every API call in a middleware.",
        "concepts": [
          "Billing",
          "Usage metrics",
          "Aggregation"
        ],
        "hints": [
          "Store usage as small event rows.",
          "Aggregate with GROUP BY in SQL.",
          "Record usage in middleware, not in each route."
        ],
        "acceptanceCriteria": [
          "Usage aggregates correctly",
          "Subscription status shows",
          "Daily charts have data"
        ],
        "tests": [
          "Generate usage events",
          "Check the usage endpoint",
          "View a subscription"
        ]
      },
      {
        "id": "proj-saas-admin-dashboard-m5",
        "order": 5,
        "title": "Feature flags",
        "objectives": [
          "Toggle flags per tenant",
          "Flags take effect immediately",
          "List flags"
        ],
        "instructions": "Implement feature flags per tenant with an endpoint to toggle them and a middleware that reads the flag for the current tenant. Add a flags page in the UI showing each flag and its state.",
        "concepts": [
          "Feature flags",
          "Toggles",
          "Middleware"
        ],
        "hints": [
          "Store one row per tenant and flag name.",
          "Read flags fresh on each request.",
          "Default unknown flags to off."
        ],
        "acceptanceCriteria": [
          "Toggling works",
          "The flag affects behaviour",
          "Flags list correctly"
        ],
        "tests": [
          "Toggle a flag and check the effect",
          "List flags for a tenant",
          "Check an unknown flag defaults off"
        ]
      },
      {
        "id": "proj-saas-admin-dashboard-m6",
        "order": 6,
        "title": "Audit log",
        "objectives": [
          "Log every admin action",
          "List the audit log",
          "Filter by tenant and action"
        ],
        "instructions": "Add audit logging: every create, update and delete by an admin writes a row with the user, tenant, action and details. Add a list endpoint with filters by tenant and action type.",
        "concepts": [
          "Audit logs",
          "Accountability",
          "Filtering"
        ],
        "hints": [
          "Write audit rows in the same request as the change.",
          "Include the acting user id.",
          "Order newest first."
        ],
        "acceptanceCriteria": [
          "Actions are logged",
          "The log filters work",
          "Entries show who did what"
        ],
        "tests": [
          "Create a user and check the log",
          "Filter by action",
          "Filter by tenant"
        ]
      },
      {
        "id": "proj-saas-admin-dashboard-m7",
        "order": 7,
        "title": "React admin UI",
        "objectives": [
          "Build tenant switching",
          "Build users, billing and usage pages",
          "Build the audit page"
        ],
        "instructions": "Build the React admin UI with tenant switching for super-admins, pages for users, billing, usage charts and the audit log. The UI respects roles: tenant admins never see tenant management.",
        "concepts": [
          "React",
          "Admin UI",
          "Charts"
        ],
        "hints": [
          "Hide navigation items by role.",
          "Use one API client for all pages.",
          "Show charts from the usage endpoints."
        ],
        "acceptanceCriteria": [
          "The UI respects roles",
          "Tenant switching works",
          "Charts render"
        ],
        "tests": [
          "Log in as super-admin and switch tenants",
          "Log in as a tenant admin",
          "Open the usage charts"
        ]
      },
      {
        "id": "proj-saas-admin-dashboard-m8",
        "order": 8,
        "title": "Testing and documentation",
        "objectives": [
          "Write API tests",
          "Test tenant isolation",
          "Document the model"
        ],
        "instructions": "Write API tests covering tenant isolation, role enforcement, feature flags and audit logging. Run the suite and finish the README with the roles, the tenant model and how to run both parts.",
        "concepts": [
          "API testing",
          "Isolation tests",
          "Documentation"
        ],
        "hints": [
          "Test cross-tenant access explicitly.",
          "Test that audit rows are written.",
          "Document the tenant scoping rule."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Isolation is covered by tests",
          "The README documents the model"
        ],
        "tests": [
          "Run the full test suite",
          "Use the dashboard end to end",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Tenant isolation holds",
      "Roles are enforced",
      "Audit log is complete",
      "Feature flags work",
      "Usage metrics are real",
      "Tests cover isolation"
    ],
    "finalAssessment": [
      "Switch tenants as super-admin",
      "Show a tenant admin seeing only their data",
      "Toggle a feature flag",
      "Show the audit log",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-job-processing-system",
    "slug": "job-processing-system",
    "level": 3,
    "title": "Job Processing System",
    "description": "Build a background job processing system with a queue, workers, retries, priorities, scheduled jobs and a monitoring UI. Jobs are things like sending emails, generating reports and resizing images.",
    "skills": [
      "TypeScript",
      "Node.js",
      "Express",
      "SQLite",
      "Queues",
      "Workers",
      "Retries"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Enqueue jobs with a type, payload and priority",
      "Workers pick up jobs in priority order",
      "Jobs move through pending, running, completed and failed states",
      "Failed jobs retry with exponential backoff",
      "Jobs that fail too many times go to a dead-letter list",
      "Schedule jobs to run at a future time",
      "Show job status and history in a monitoring UI",
      "Cancel a pending job"
    ],
    "nonFunctionalRequirements": [
      "Jobs run in priority order",
      "Retries use exponential backoff",
      "A job runs at most once at a time",
      "Dead-lettered jobs are visible and retryable",
      "The UI shows live job states"
    ],
    "architecture": "The system has an Express API and a worker process sharing a SQLite jobs table. Enqueueing inserts a row; workers poll for the oldest pending job with the highest priority, claim it with an atomic update so two workers never take the same job, and run the matching handler. Failures increment the attempt count and schedule a retry with exponential backoff; after the maximum attempts the job is dead-lettered. A small React UI polls the API for job states.",
    "databaseSchema": "jobs: id INTEGER PRIMARY KEY, type TEXT, payload TEXT, priority INTEGER DEFAULT 5, status TEXT DEFAULT \"pending\", attempts INTEGER DEFAULT 0, max_attempts INTEGER DEFAULT 3, run_at TEXT, created_at TEXT, started_at TEXT, finished_at TEXT, error TEXT",
    "apis": [
      "POST /api/jobs, GET /api/jobs, GET /api/jobs/:id, POST /api/jobs/:id/cancel, POST /api/jobs/:id/retry, GET /api/jobs/stats."
    ],
    "fileStructure": "job-system/\n  backend/\n    package.json\n    src/\n      index.ts\n      app.ts\n      db.ts\n      queue.ts\n      worker.ts\n      handlers/\n        email.ts\n        report.ts\n        image.ts\n      routes/\n        jobs.ts\n  frontend/\n    package.json\n    src/\n      App.tsx\n      api.ts\n  README.md",
    "taskBreakdown": [
      "Set up the project, schema and queue",
      "Implement enqueue and list endpoints",
      "Implement the worker with claiming",
      "Implement job handlers",
      "Implement retries and dead letters",
      "Implement scheduling and cancellation",
      "Build the monitoring UI",
      "Write tests and document"
    ],
    "milestones": [
      {
        "id": "proj-job-processing-system-m1",
        "order": 1,
        "title": "Setup, schema and queue",
        "objectives": [
          "Create the jobs table",
          "Implement enqueue",
          "List jobs"
        ],
        "instructions": "Set up the Express backend with the jobs table and the enqueue and list endpoints. Enqueue validates the job type against a known list and stores the payload as JSON.",
        "concepts": [
          "Express",
          "SQLite",
          "Queues"
        ],
        "hints": [
          "Validate the job type.",
          "Store payloads as JSON text.",
          "Default the status to pending."
        ],
        "acceptanceCriteria": [
          "Enqueueing works",
          "Unknown types are rejected",
          "Listing works"
        ],
        "tests": [
          "Enqueue a job",
          "Enqueue an unknown type",
          "List jobs"
        ]
      },
      {
        "id": "proj-job-processing-system-m2",
        "order": 2,
        "title": "Worker with claiming",
        "objectives": [
          "Poll for pending jobs",
          "Claim atomically",
          "Run handlers"
        ],
        "instructions": "Write a worker that polls for the oldest pending job whose run time has arrived, claims it with an atomic update (so two workers cannot take it), runs the matching handler, and marks it completed or failed.",
        "concepts": [
          "Workers",
          "Atomic claims",
          "Polling"
        ],
        "hints": [
          "Claim with an UPDATE that only succeeds when the status is still pending.",
          "Poll every second.",
          "Run the worker as a separate process."
        ],
        "acceptanceCriteria": [
          "A job is picked up and completed",
          "Two workers never take the same job",
          "The status updates"
        ],
        "tests": [
          "Start the worker and enqueue a job",
          "Start two workers and enqueue jobs",
          "Check the job status"
        ]
      },
      {
        "id": "proj-job-processing-system-m3",
        "order": 3,
        "title": "Job handlers",
        "objectives": [
          "Implement email, report and image jobs",
          "Simulate the work",
          "Record results"
        ],
        "instructions": "Implement three handlers: send-email (simulated), generate-report (writes a small file), and resize-image (simulated with a delay). Each handler reads its payload, does the work, and returns a result stored on the job.",
        "concepts": [
          "Handlers",
          "Simulation",
          "Results"
        ],
        "hints": [
          "Keep handlers small and pure where possible.",
          "Simulate slow work with a delay.",
          "Store the handler result on the job row."
        ],
        "acceptanceCriteria": [
          "Each handler type completes",
          "Results are recorded",
          "A bad payload fails cleanly"
        ],
        "tests": [
          "Enqueue one of each type",
          "Check the results",
          "Enqueue a job with a bad payload"
        ]
      },
      {
        "id": "proj-job-processing-system-m4",
        "order": 4,
        "title": "Retries and dead letters",
        "objectives": [
          "Retry with exponential backoff",
          "Dead-letter after max attempts",
          "Retry a dead job manually"
        ],
        "instructions": "Add retry logic: on failure, increment attempts and schedule the next run with exponential backoff (2, 4, 8 seconds). After the maximum attempts, mark the job dead-lettered. Add an endpoint to manually retry a dead job.",
        "concepts": [
          "Retries",
          "Exponential backoff",
          "Dead letters"
        ],
        "hints": [
          "Compute the next run time from the attempt count.",
          "Cap the backoff delay.",
          "Reset attempts on a manual retry."
        ],
        "acceptanceCriteria": [
          "A failing job retries",
          "It eventually dead-letters",
          "Manual retry works"
        ],
        "tests": [
          "Enqueue a job that always fails",
          "Watch it retry",
          "Manually retry the dead job"
        ]
      },
      {
        "id": "proj-job-processing-system-m5",
        "order": 5,
        "title": "Scheduling and cancellation",
        "objectives": [
          "Schedule a job for later",
          "Cancel a pending job",
          "Show scheduled jobs"
        ],
        "instructions": "Add a run_at option to enqueue so jobs can be scheduled for the future, and a cancel endpoint for pending jobs. Scheduled jobs must not run before their time.",
        "concepts": [
          "Scheduling",
          "Cancellation",
          "Time"
        ],
        "hints": [
          "Workers only pick jobs whose run time has arrived.",
          "Only pending jobs can be cancelled.",
          "Use UTC timestamps."
        ],
        "acceptanceCriteria": [
          "A scheduled job waits",
          "Cancelling works",
          "A running job cannot be cancelled"
        ],
        "tests": [
          "Schedule a job 10 seconds out",
          "Cancel a pending job",
          "Try to cancel a running job"
        ]
      },
      {
        "id": "proj-job-processing-system-m6",
        "order": 6,
        "title": "Monitoring UI",
        "objectives": [
          "Show job lists by status",
          "Show job details",
          "Add cancel and retry buttons"
        ],
        "instructions": "Build the React monitoring UI listing jobs by status with counts, a detail view showing attempts and errors, and buttons to cancel and retry. The UI polls the API every few seconds.",
        "concepts": [
          "React",
          "Monitoring",
          "Polling"
        ],
        "hints": [
          "Poll every 3 seconds.",
          "Show attempts and the last error.",
          "Colour-code the statuses."
        ],
        "acceptanceCriteria": [
          "The UI shows live states",
          "Counts are correct",
          "Cancel and retry work from the UI"
        ],
        "tests": [
          "Enqueue jobs and watch the UI",
          "Cancel from the UI",
          "Retry a dead job from the UI"
        ]
      },
      {
        "id": "proj-job-processing-system-m7",
        "order": 7,
        "title": "Priorities and stats",
        "objectives": [
          "Respect job priorities",
          "Show throughput stats",
          "Add a stats endpoint"
        ],
        "instructions": "Add priority handling so higher-priority jobs run first, and a stats endpoint with counts per status and jobs completed in the last hour. Show the stats in the UI.",
        "concepts": [
          "Priorities",
          "Statistics",
          "Ordering"
        ],
        "hints": [
          "Order by priority then creation time.",
          "Compute stats with SQL counts.",
          "Show the stats at the top of the UI."
        ],
        "acceptanceCriteria": [
          "High-priority jobs run first",
          "Stats are correct",
          "The UI shows stats"
        ],
        "tests": [
          "Enqueue low then high priority jobs",
          "Check the stats endpoint",
          "Check the UI stats"
        ]
      },
      {
        "id": "proj-job-processing-system-m8",
        "order": 8,
        "title": "Testing and documentation",
        "objectives": [
          "Write API tests",
          "Test claiming and retries",
          "Document the system"
        ],
        "instructions": "Write tests covering enqueue validation, claiming, retries, dead letters, scheduling and cancellation. Run the suite and finish the README with the job lifecycle, the retry policy and how to run the worker.",
        "concepts": [
          "API testing",
          "Concurrency tests",
          "Documentation"
        ],
        "hints": [
          "Test that two workers cannot claim the same job.",
          "Test the backoff timing.",
          "Document the lifecycle diagram."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Claiming is covered by tests",
          "The README documents the lifecycle"
        ],
        "tests": [
          "Run the full test suite",
          "Run the worker and UI end to end",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Jobs run in priority order",
      "Retries use backoff",
      "Dead letters are visible",
      "Scheduling works",
      "The UI shows live states",
      "Tests cover the queue"
    ],
    "finalAssessment": [
      "Enqueue jobs of each type",
      "Show them completing",
      "Show a failing job retrying",
      "Show the monitoring UI",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-api-gateway",
    "slug": "api-gateway",
    "level": 3,
    "title": "API Gateway",
    "description": "Build an API gateway that routes requests to backend services, enforces API key authentication, rate limits per client, caches GET responses, and logs every request.",
    "skills": [
      "TypeScript",
      "Node.js",
      "Express",
      "SQLite",
      "Rate limiting",
      "Caching",
      "Proxying"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Route requests to backend services by path prefix",
      "Authenticate clients with API keys",
      "Rate limit each client (100 requests per minute)",
      "Cache GET responses for 60 seconds",
      "Add request IDs and forward them to backends",
      "Log every request with client, route and latency",
      "Return 429 when the rate limit is exceeded",
      "Support a health check endpoint"
    ],
    "nonFunctionalRequirements": [
      "Routing preserves the path and query string",
      "Invalid API keys return 401",
      "Rate limits are per client, not global",
      "Cached responses are served without hitting the backend",
      "Logs record every request"
    ],
    "architecture": "The gateway is an Express server with a route table mapping path prefixes to backend base URLs. A middleware chain authenticates the API key against a SQLite table, checks a per-client token bucket rate limiter, serves cached GET responses, and proxies the rest with the http module while adding a request id header. A logging middleware records every request.",
    "databaseSchema": "api_keys: id INTEGER PRIMARY KEY, key TEXT UNIQUE, client_name TEXT, created_at TEXT; rate_limits: key_id INTEGER, window_start TEXT, count INTEGER; cache: cache_key TEXT PRIMARY KEY, body TEXT, status INTEGER, stored_at TEXT; request_logs: id INTEGER PRIMARY KEY, key_id INTEGER, method TEXT, path TEXT, status INTEGER, latency_ms INTEGER, created_at TEXT",
    "apis": [
      "The gateway itself: GET /health, any /api/* route proxied to a backend. Admin: POST /admin/keys, GET /admin/keys, GET /admin/logs."
    ],
    "fileStructure": "api-gateway/\n  package.json\n  tsconfig.json\n  src/\n    index.ts\n    app.ts\n    db.ts\n    routes.ts\n    middleware/\n      auth.ts\n      rateLimit.ts\n      cache.ts\n      logger.ts\n    proxy.ts\n  backends/\n    service-a.js\n    service-b.js\n  tests/\n    gateway.test.ts\n  README.md",
    "taskBreakdown": [
      "Set up the gateway and two demo backends",
      "Implement routing and proxying",
      "Add API key authentication",
      "Add rate limiting",
      "Add response caching",
      "Add request logging",
      "Add admin endpoints for keys and logs",
      "Write tests and document"
    ],
    "milestones": [
      {
        "id": "proj-api-gateway-m1",
        "order": 1,
        "title": "Setup and demo backends",
        "objectives": [
          "Create two demo backend services",
          "Start the gateway",
          "Add the health endpoint"
        ],
        "instructions": "Create two tiny backend services (service A and service B) that return JSON, and set up the gateway project with a health endpoint. Verify the gateway starts and the backends respond.",
        "concepts": [
          "Express",
          "Microservices",
          "Setup"
        ],
        "hints": [
          "Keep the demo backends tiny.",
          "Run each on its own port.",
          "Document the ports."
        ],
        "acceptanceCriteria": [
          "The gateway starts",
          "Both backends respond",
          "Health returns 200"
        ],
        "tests": [
          "Start all three services",
          "curl each backend",
          "curl the gateway health"
        ]
      },
      {
        "id": "proj-api-gateway-m2",
        "order": 2,
        "title": "Routing and proxying",
        "objectives": [
          "Route by path prefix",
          "Forward method, headers and body",
          "Return the backend response"
        ],
        "instructions": "Implement the route table and proxying: requests to /a/* go to service A and /b/* to service B, preserving the method, query string, headers and body. Return the backend status and body unchanged.",
        "concepts": [
          "Proxying",
          "Routing",
          "HTTP"
        ],
        "hints": [
          "Strip the prefix before forwarding.",
          "Forward the request id header.",
          "Handle backend connection errors with 502."
        ],
        "acceptanceCriteria": [
          "Requests reach the right backend",
          "Query strings survive",
          "A down backend returns 502"
        ],
        "tests": [
          "curl through the gateway to service A",
          "curl with a query string",
          "Stop a backend and curl it"
        ]
      },
      {
        "id": "proj-api-gateway-m3",
        "order": 3,
        "title": "API key authentication",
        "objectives": [
          "Issue API keys",
          "Validate keys on each request",
          "Return 401 for bad keys"
        ],
        "instructions": "Add an api_keys table and a middleware that reads the X-API-Key header, looks it up, and returns 401 for a missing or unknown key. Add an admin endpoint to create keys.",
        "concepts": [
          "API keys",
          "Authentication",
          "Middleware"
        ],
        "hints": [
          "Store keys as random hex strings.",
          "Compare keys in constant time where possible.",
          "Skip auth for the health endpoint."
        ],
        "acceptanceCriteria": [
          "A valid key passes",
          "A missing key returns 401",
          "An unknown key returns 401"
        ],
        "tests": [
          "Create a key",
          "Call with the key",
          "Call without a key"
        ]
      },
      {
        "id": "proj-api-gateway-m4",
        "order": 4,
        "title": "Rate limiting",
        "objectives": [
          "Limit to 100 requests per minute per key",
          "Return 429 with Retry-After",
          "Reset each minute"
        ],
        "instructions": "Implement a per-key rate limiter using a fixed window stored in SQLite: count requests per key per minute, return 429 with a Retry-After header when the limit is exceeded, and reset the count each new minute.",
        "concepts": [
          "Rate limiting",
          "Fixed windows",
          "Status codes"
        ],
        "hints": [
          "Count per key, not globally.",
          "Use a fixed one-minute window.",
          "Include Retry-After in the 429 response."
        ],
        "acceptanceCriteria": [
          "The 101st request returns 429",
          "Another key is unaffected",
          "The count resets next minute"
        ],
        "tests": [
          "Send 101 requests quickly",
          "Send requests with a second key",
          "Check the Retry-After header"
        ]
      },
      {
        "id": "proj-api-gateway-m5",
        "order": 5,
        "title": "Response caching",
        "objectives": [
          "Cache GET responses for 60 seconds",
          "Vary the cache by key and URL",
          "Invalidate on write"
        ],
        "instructions": "Add caching for GET responses: store the status and body keyed by API key plus URL, serve from cache within 60 seconds, and skip the cache for non-GET requests. Add a header showing whether the response came from cache.",
        "concepts": [
          "Caching",
          "TTL",
          "Cache keys"
        ],
        "hints": [
          "Key the cache by key plus URL.",
          "Add an X-Cache header with HIT or MISS.",
          "Do not cache errors."
        ],
        "acceptanceCriteria": [
          "The second identical GET is a HIT",
          "A different URL is a MISS",
          "POST is never cached"
        ],
        "tests": [
          "GET twice and check headers",
          "GET a different URL",
          "POST through the gateway"
        ]
      },
      {
        "id": "proj-api-gateway-m6",
        "order": 6,
        "title": "Request logging",
        "objectives": [
          "Log every request",
          "Record latency",
          "List logs in the admin API"
        ],
        "instructions": "Add logging middleware that records the client, method, path, status and latency for every request in SQLite. Add an admin endpoint to list recent logs.",
        "concepts": [
          "Logging",
          "Latency",
          "Admin APIs"
        ],
        "hints": [
          "Log after the response finishes.",
          "Measure latency with a high-resolution timer.",
          "Keep the log query fast with an index."
        ],
        "acceptanceCriteria": [
          "Requests are logged",
          "Latency is recorded",
          "The admin log list works"
        ],
        "tests": [
          "Make requests and check the logs",
          "Check latency values",
          "Filter logs by client"
        ]
      },
      {
        "id": "proj-api-gateway-m7",
        "order": 7,
        "title": "Admin endpoints and tests",
        "objectives": [
          "Manage keys from the admin API",
          "Write gateway tests",
          "Document the gateway"
        ],
        "instructions": "Add admin endpoints to create, list and revoke API keys, protected by a separate admin token. Write tests covering routing, auth, rate limiting, caching and logging. Run the suite and finish the README.",
        "concepts": [
          "Admin APIs",
          "Testing",
          "Documentation"
        ],
        "hints": [
          "Protect admin routes with a token.",
          "Test the rate limit with a small limit in tests.",
          "Document the route table."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Admin routes are protected",
          "The README documents the routes"
        ],
        "tests": [
          "Run the full test suite",
          "Create and revoke a key",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Routing is correct",
      "Auth returns 401 for bad keys",
      "Rate limits are per client",
      "Caching works with HIT and MISS",
      "Logs are complete",
      "Tests cover the gateway"
    ],
    "finalAssessment": [
      "Route to both backends",
      "Show a 401 without a key",
      "Show a 429 after the limit",
      "Show a cache HIT",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-distributed-worker-system",
    "slug": "distributed-worker-system",
    "level": 3,
    "title": "Distributed Worker System",
    "description": "Build a distributed worker system where a coordinator assigns tasks to workers over HTTP, workers report heartbeats, failed workers have their tasks reassigned, and results are collected centrally.",
    "skills": [
      "TypeScript",
      "Node.js",
      "Express",
      "SQLite",
      "Distributed systems",
      "Heartbeats",
      "Leader election"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Workers register with the coordinator",
      "The coordinator assigns tasks to available workers",
      "Workers report heartbeats every few seconds",
      "The coordinator detects dead workers after missed heartbeats",
      "Tasks from dead workers are reassigned",
      "Workers report task results back",
      "The coordinator shows worker and task status",
      "Tasks are idempotent so reassignment is safe"
    ],
    "nonFunctionalRequirements": [
      "A task is never lost when a worker dies",
      "A task is never run by two workers at once",
      "Dead workers are detected within 15 seconds",
      "Results are recorded exactly once per task",
      "The system works with several workers"
    ],
    "architecture": "The system has a coordinator (Express API plus SQLite) and worker processes. Workers register with a name and capabilities, then poll for tasks. Claiming a task is an atomic update so only one worker gets it. Workers heartbeat every 5 seconds; a monitor loop marks workers dead after 15 seconds without a heartbeat and returns their running tasks to pending. Tasks carry an idempotency key so a retried task does not double-apply its result.",
    "databaseSchema": "workers: id INTEGER PRIMARY KEY, name TEXT UNIQUE, capabilities TEXT, last_heartbeat TEXT, status TEXT; tasks: id INTEGER PRIMARY KEY, type TEXT, payload TEXT, status TEXT DEFAULT \"pending\", worker_id INTEGER, attempts INTEGER DEFAULT 0, result TEXT, idempotency_key TEXT UNIQUE",
    "apis": [
      "Coordinator: POST /workers/register, POST /workers/:id/heartbeat, GET /tasks/next, POST /tasks/:id/result, GET /workers, GET /tasks."
    ],
    "fileStructure": "worker-system/\n  coordinator/\n    package.json\n    src/\n      index.ts\n      app.ts\n      db.ts\n      monitor.ts\n      routes/\n        workers.ts\n        tasks.ts\n  worker/\n    package.json\n    src/\n      index.ts\n      client.ts\n      handlers.ts\n  README.md",
    "taskBreakdown": [
      "Set up the coordinator and schema",
      "Implement worker registration and heartbeats",
      "Implement task enqueue and claiming",
      "Implement the worker process",
      "Implement dead worker detection",
      "Implement result reporting",
      "Build the status view",
      "Write tests and document"
    ],
    "milestones": [
      {
        "id": "proj-distributed-worker-system-m1",
        "order": 1,
        "title": "Coordinator setup and schema",
        "objectives": [
          "Create the tables",
          "Add the health endpoint",
          "Seed tasks"
        ],
        "instructions": "Set up the coordinator with the workers and tasks tables and a health endpoint. Add an endpoint to enqueue tasks with a type and payload, and seed a few tasks for testing.",
        "concepts": [
          "Express",
          "SQLite",
          "Setup"
        ],
        "hints": [
          "Use an idempotency key per task.",
          "Default tasks to pending.",
          "Keep the coordinator stateless apart from the database."
        ],
        "acceptanceCriteria": [
          "The coordinator starts",
          "Enqueueing works",
          "Health returns 200"
        ],
        "tests": [
          "Start the coordinator",
          "Enqueue a task",
          "List tasks"
        ]
      },
      {
        "id": "proj-distributed-worker-system-m2",
        "order": 2,
        "title": "Registration and heartbeats",
        "objectives": [
          "Register workers",
          "Record heartbeats",
          "List workers"
        ],
        "instructions": "Implement worker registration with a name and capabilities, and a heartbeat endpoint that updates the last heartbeat time. Add a workers list endpoint showing status.",
        "concepts": [
          "Registration",
          "Heartbeats",
          "Discovery"
        ],
        "hints": [
          "Upsert on registration by name.",
          "Store the heartbeat as a UTC timestamp.",
          "Show the last heartbeat in the list."
        ],
        "acceptanceCriteria": [
          "Registering works",
          "Heartbeats update the time",
          "Workers list correctly"
        ],
        "tests": [
          "Register a worker",
          "Send heartbeats",
          "List workers"
        ]
      },
      {
        "id": "proj-distributed-worker-system-m3",
        "order": 3,
        "title": "Task claiming",
        "objectives": [
          "Workers poll for tasks",
          "Claim atomically",
          "Match capabilities"
        ],
        "instructions": "Implement the next-task endpoint: a worker asks for work, and the coordinator atomically assigns the oldest pending task matching its capabilities. Only one worker can claim a given task.",
        "concepts": [
          "Atomic claims",
          "Capabilities",
          "Polling"
        ],
        "hints": [
          "Claim with a conditional UPDATE.",
          "Filter by the worker capabilities.",
          "Return 204 when no task matches."
        ],
        "acceptanceCriteria": [
          "A worker claims a task",
          "Two workers cannot claim the same task",
          "Capabilities filter correctly"
        ],
        "tests": [
          "Start two workers",
          "Enqueue a task",
          "Check only one claims it"
        ]
      },
      {
        "id": "proj-distributed-worker-system-m4",
        "order": 4,
        "title": "Worker process",
        "objectives": [
          "Poll for work",
          "Run handlers",
          "Report results"
        ],
        "instructions": "Write the worker process: register, heartbeat every 5 seconds, poll for tasks, run the matching handler, and report the result. The worker retries the coordinator on transient failures.",
        "concepts": [
          "Workers",
          "Polling",
          "Handlers"
        ],
        "hints": [
          "Heartbeat in a background interval.",
          "Poll every 2 seconds.",
          "Report the result even on handler failure."
        ],
        "acceptanceCriteria": [
          "The worker completes tasks",
          "Heartbeats keep flowing",
          "Results are recorded"
        ],
        "tests": [
          "Start a worker and enqueue a task",
          "Watch the task complete",
          "Check the result"
        ]
      },
      {
        "id": "proj-distributed-worker-system-m5",
        "order": 5,
        "title": "Dead worker detection",
        "objectives": [
          "Monitor heartbeats",
          "Mark workers dead",
          "Reassign their tasks"
        ],
        "instructions": "Add a monitor loop that runs every 5 seconds, marks workers dead after 15 seconds without a heartbeat, and returns their running tasks to pending so another worker picks them up.",
        "concepts": [
          "Failure detection",
          "Reassignment",
          "Monitoring"
        ],
        "hints": [
          "Compare heartbeat times with UTC now.",
          "Reassign in the same pass as marking dead.",
          "Increment the attempt count on reassignment."
        ],
        "acceptanceCriteria": [
          "A killed worker is marked dead",
          "Its tasks are reassigned",
          "Another worker completes them"
        ],
        "tests": [
          "Start a worker, give it a slow task, kill it",
          "Wait and check the worker status",
          "Check the task is reassigned"
        ]
      },
      {
        "id": "proj-distributed-worker-system-m6",
        "order": 6,
        "title": "Result reporting and idempotency",
        "objectives": [
          "Report results",
          "Enforce idempotency",
          "Show task history"
        ],
        "instructions": "Implement result reporting with the idempotency key: a retried report for the same task does not duplicate the result. Add a task detail view showing attempts and results.",
        "concepts": [
          "Idempotency",
          "Results",
          "Exactly-once"
        ],
        "hints": [
          "Check the idempotency key before applying.",
          "Store the result on the task row.",
          "Record each attempt."
        ],
        "acceptanceCriteria": [
          "A duplicate report is ignored",
          "Results are stored",
          "Attempts are counted"
        ],
        "tests": [
          "Report a result twice",
          "Check the task row",
          "View the task history"
        ]
      },
      {
        "id": "proj-distributed-worker-system-m7",
        "order": 7,
        "title": "Status view and tests",
        "objectives": [
          "Build a status page",
          "Write tests",
          "Document the system"
        ],
        "instructions": "Build a simple status page showing workers and tasks, and write tests covering registration, claiming, dead worker detection and idempotency. Run the suite and finish the README with the architecture and failure model.",
        "concepts": [
          "Monitoring",
          "Testing",
          "Documentation"
        ],
        "hints": [
          "Test claiming with two workers.",
          "Test the heartbeat timeout with a short threshold in tests.",
          "Document the failure model."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "The status page works",
          "The README documents the failure model"
        ],
        "tests": [
          "Run the full test suite",
          "Run two workers end to end",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Tasks are never lost",
      "No task runs twice at once",
      "Dead workers are detected",
      "Results are idempotent",
      "Tests cover the failure cases",
      "The README documents the model"
    ],
    "finalAssessment": [
      "Register two workers",
      "Enqueue tasks and watch them complete",
      "Kill a worker and show reassignment",
      "Show the status page",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-monitoring-dashboard",
    "slug": "monitoring-dashboard",
    "level": 3,
    "title": "Monitoring Dashboard",
    "description": "Build a monitoring dashboard that collects metrics from services, stores time-series data, alerts on thresholds, and shows charts for CPU, memory, request rate and error rate.",
    "skills": [
      "TypeScript",
      "React",
      "Express",
      "SQLite",
      "Metrics",
      "Alerting",
      "Charts"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Services push metrics to the API",
      "Store time-series metrics in SQLite",
      "Show CPU and memory charts per service",
      "Show request rate and error rate charts",
      "Configure alert rules with thresholds",
      "Trigger alerts when a threshold is breached",
      "Show active and resolved alerts",
      "Aggregate metrics into 1-minute buckets"
    ],
    "nonFunctionalRequirements": [
      "Metrics are stored with timestamps",
      "Charts show the last hour by default",
      "Alerts fire within a minute of a breach",
      "Resolved alerts are marked",
      "The dashboard updates live"
    ],
    "architecture": "The system has an Express API that accepts metric pushes from services, stores them in a time-series table, and aggregates them into one-minute buckets for charts. An alert engine runs every 30 seconds, compares recent values with configured rules, and creates or resolves alerts. The React frontend polls the API and renders charts with a charting library.",
    "databaseSchema": "services: id INTEGER PRIMARY KEY, name TEXT UNIQUE; metrics: id INTEGER PRIMARY KEY, service_id INTEGER, name TEXT, value REAL, created_at TEXT; alert_rules: id INTEGER PRIMARY KEY, service_id INTEGER, metric TEXT, operator TEXT, threshold REAL, duration_seconds INTEGER; alerts: id INTEGER PRIMARY KEY, rule_id INTEGER, service_id INTEGER, status TEXT, started_at TEXT, resolved_at TEXT",
    "apis": [
      "POST /api/metrics, GET /api/services/:id/metrics, POST /api/alert-rules, GET /api/alerts, GET /api/services/:id/summary."
    ],
    "fileStructure": "monitoring/\n  backend/\n    package.json\n    src/\n      index.ts\n      app.ts\n      db.ts\n      alertEngine.ts\n      routes/\n        metrics.ts\n        alerts.ts\n  frontend/\n    package.json\n    src/\n      App.tsx\n      api.ts\n      components/\n        ServiceCard.tsx\n        MetricChart.tsx\n        AlertsPanel.tsx\n  simulator/\n    simulate.js\n  README.md",
    "taskBreakdown": [
      "Set up the backend and schema",
      "Implement metric ingestion",
      "Implement aggregation and chart endpoints",
      "Implement alert rules and the engine",
      "Build a metric simulator",
      "Build the React dashboard",
      "Add alert management",
      "Write tests and document"
    ],
    "milestones": [
      {
        "id": "proj-monitoring-dashboard-m1",
        "order": 1,
        "title": "Setup and schema",
        "objectives": [
          "Create the tables",
          "Add the health endpoint",
          "Register a service"
        ],
        "instructions": "Set up the Express backend with the services, metrics, alert rules and alerts tables. Add a service registration endpoint and a health endpoint.",
        "concepts": [
          "Express",
          "SQLite",
          "Time-series"
        ],
        "hints": [
          "Index metrics by service and time.",
          "Store values as REAL.",
          "Keep the schema simple."
        ],
        "acceptanceCriteria": [
          "The server starts",
          "Registering a service works",
          "Health returns 200"
        ],
        "tests": [
          "Start the server",
          "Register a service",
          "Inspect the schema"
        ]
      },
      {
        "id": "proj-monitoring-dashboard-m2",
        "order": 2,
        "title": "Metric ingestion",
        "objectives": [
          "Accept metric pushes",
          "Validate metric names and values",
          "Handle high throughput"
        ],
        "instructions": "Implement the metrics endpoint that accepts batches of metric points with a service name, metric name, value and timestamp. Validate the inputs and insert them efficiently.",
        "concepts": [
          "Ingestion",
          "Batching",
          "Validation"
        ],
        "hints": [
          "Accept batches to reduce request overhead.",
          "Validate metric names against an allow-list.",
          "Use a single transaction per batch."
        ],
        "acceptanceCriteria": [
          "Pushing metrics works",
          "Invalid metrics are rejected",
          "Batches insert correctly"
        ],
        "tests": [
          "Push a batch of metrics",
          "Push an invalid metric",
          "Push a large batch"
        ]
      },
      {
        "id": "proj-monitoring-dashboard-m3",
        "order": 3,
        "title": "Aggregation and charts",
        "objectives": [
          "Aggregate into 1-minute buckets",
          "Serve chart data",
          "Support time ranges"
        ],
        "instructions": "Add endpoints that aggregate metrics into one-minute buckets with average, minimum and maximum, and serve them for a requested time range. The frontend charts use these endpoints.",
        "concepts": [
          "Aggregation",
          "Time buckets",
          "Chart data"
        ],
        "hints": [
          "Bucket with integer division on the timestamp.",
          "Return avg, min and max per bucket.",
          "Default the range to the last hour."
        ],
        "acceptanceCriteria": [
          "Buckets are correct",
          "The range parameter works",
          "Averages match the raw data"
        ],
        "tests": [
          "Push known metrics and check buckets",
          "Request different ranges",
          "Compare averages by hand"
        ]
      },
      {
        "id": "proj-monitoring-dashboard-m4",
        "order": 4,
        "title": "Alert rules and engine",
        "objectives": [
          "Create alert rules",
          "Evaluate rules every 30 seconds",
          "Create and resolve alerts"
        ],
        "instructions": "Implement alert rules with a metric, operator, threshold and duration, plus an engine that runs every 30 seconds, checks the recent values, creates an alert when a rule is breached for the duration, and resolves it when the value recovers.",
        "concepts": [
          "Alerting",
          "Thresholds",
          "State machines"
        ],
        "hints": [
          "Check the average over the duration window.",
          "Create one alert per breach, not one per check.",
          "Resolve when the value is back under the threshold."
        ],
        "acceptanceCriteria": [
          "A breach creates an alert",
          "Recovery resolves it",
          "No duplicate alerts are created"
        ],
        "tests": [
          "Create a rule and push high values",
          "Push normal values and check resolution",
          "Check for duplicate alerts"
        ]
      },
      {
        "id": "proj-monitoring-dashboard-m5",
        "order": 5,
        "title": "Metric simulator",
        "objectives": [
          "Simulate services",
          "Generate realistic metrics",
          "Trigger alerts on demand"
        ],
        "instructions": "Write a simulator that pushes realistic CPU, memory, request rate and error rate metrics for a few fake services, with an option to spike a metric so alerts can be demonstrated.",
        "concepts": [
          "Simulation",
          "Realistic data",
          "Demonstration"
        ],
        "hints": [
          "Vary the values with a random walk.",
          "Push every 5 seconds.",
          "Add a spike flag for demos."
        ],
        "acceptanceCriteria": [
          "The simulator runs",
          "Metrics appear in the dashboard",
          "A spike triggers an alert"
        ],
        "tests": [
          "Run the simulator",
          "Watch the charts",
          "Trigger a spike"
        ]
      },
      {
        "id": "proj-monitoring-dashboard-m6",
        "order": 6,
        "title": "React dashboard",
        "objectives": [
          "Build service cards",
          "Render metric charts",
          "Show alerts"
        ],
        "instructions": "Build the React dashboard with a card per service showing current values, charts for the main metrics, and an alerts panel. Poll the API every 10 seconds.",
        "concepts": [
          "React",
          "Charts",
          "Polling"
        ],
        "hints": [
          "Poll every 10 seconds.",
          "Show the latest value on each card.",
          "Colour alerts by status."
        ],
        "acceptanceCriteria": [
          "The dashboard renders",
          "Charts update live",
          "Alerts appear"
        ],
        "tests": [
          "Open the dashboard",
          "Watch it update",
          "Trigger an alert and see it"
        ]
      },
      {
        "id": "proj-monitoring-dashboard-m7",
        "order": 7,
        "title": "Alert management and tests",
        "objectives": [
          "Acknowledge alerts",
          "Write tests",
          "Document the system"
        ],
        "instructions": "Add alert acknowledgement, write tests for ingestion, aggregation and the alert engine, and finish the README with the metric names, the alert model and how to run everything.",
        "concepts": [
          "Alerting",
          "Testing",
          "Documentation"
        ],
        "hints": [
          "Test the alert engine with fixed data.",
          "Test aggregation math.",
          "Document every metric name."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Acknowledgement works",
          "The README documents the metrics"
        ],
        "tests": [
          "Run the full test suite",
          "Run the simulator and dashboard",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Metrics are stored and aggregated",
      "Alerts fire and resolve correctly",
      "Charts show live data",
      "The simulator works",
      "Tests cover the engine",
      "The README documents the metrics"
    ],
    "finalAssessment": [
      "Push metrics and show the charts",
      "Trigger an alert with a spike",
      "Show the alert resolving",
      "Show the dashboard updating live",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-multiuser-collaboration-app",
    "slug": "multi-user-collaboration-application",
    "level": 3,
    "title": "Multi-User Collaboration Application",
    "description": "Build a collaborative document editor where several users edit the same document at the same time, see each other cursors and presence, and have their changes merged without conflicts, using WebSockets and operational transformation concepts.",
    "skills": [
      "TypeScript",
      "React",
      "Express",
      "WebSockets",
      "SQLite",
      "Collaboration",
      "Presence"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Create and share documents",
      "Edit a document with live updates for all collaborators",
      "Show each collaborator cursor position and name",
      "Show who is currently viewing the document",
      "Save document versions automatically",
      "Show the version history and restore an old version",
      "Resolve concurrent edits without losing text",
      "Require login and document access permissions"
    ],
    "nonFunctionalRequirements": [
      "Edits from one user appear for others in under 300ms",
      "Concurrent edits do not lose text",
      "Cursors show the right user and position",
      "Version history is complete",
      "Only permitted users can open a document"
    ],
    "architecture": "The application has an Express API with SQLite tables for users, documents, permissions and versions, plus a WebSocket server. Editing uses a simple operational transformation approach: each edit is an insert or delete at a position with a client id, and the server transforms concurrent operations against each other before applying and broadcasting them. Presence and cursor positions are broadcast as ephemeral events. Versions are snapshots saved periodically.",
    "databaseSchema": "users: id INTEGER PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT, name TEXT; documents: id INTEGER PRIMARY KEY, title TEXT, owner_id INTEGER, content TEXT, updated_at TEXT; permissions: document_id INTEGER, user_id INTEGER, role TEXT, PRIMARY KEY (document_id, user_id); versions: id INTEGER PRIMARY KEY, document_id INTEGER, content TEXT, created_at TEXT, author_id INTEGER",
    "apis": [
      "REST: GET /api/documents, POST /api/documents, GET /api/documents/:id, POST /api/documents/:id/share. WebSocket events: join, edit, cursor, presence."
    ],
    "fileStructure": "collab/\n  backend/\n    package.json\n    src/\n      index.ts\n      app.ts\n      db.ts\n      ws.ts\n      ot.ts\n      routes/\n        documents.ts\n  frontend/\n    package.json\n    src/\n      App.tsx\n      api.ts\n      editor.ts\n      components/\n        Editor.tsx\n        PresenceBar.tsx\n        History.tsx\n  README.md",
    "taskBreakdown": [
      "Set up the backend, schema and auth",
      "Implement documents and sharing",
      "Add the WebSocket server",
      "Implement operational transformation",
      "Add presence and cursors",
      "Build the React editor",
      "Add version history",
      "Write tests and document"
    ],
    "milestones": [
      {
        "id": "proj-multiuser-collaboration-app-m1",
        "order": 1,
        "title": "Setup, schema and auth",
        "objectives": [
          "Create the tables",
          "Add JWT authentication",
          "Seed users"
        ],
        "instructions": "Set up the Express backend with the documents, permissions and versions tables plus JWT authentication. Seed two users for testing collaboration.",
        "concepts": [
          "Express",
          "SQLite",
          "JWT"
        ],
        "hints": [
          "Hash passwords with bcrypt.",
          "Protect every document route.",
          "Seed two test users."
        ],
        "acceptanceCriteria": [
          "The server starts",
          "Login works",
          "Protected routes return 401"
        ],
        "tests": [
          "Log in as both users",
          "Inspect the schema",
          "Call a protected route without a token"
        ]
      },
      {
        "id": "proj-multiuser-collaboration-app-m2",
        "order": 2,
        "title": "Documents and sharing",
        "objectives": [
          "Create documents",
          "Share with permissions",
          "Enforce access"
        ],
        "instructions": "Implement document creation, listing, and sharing with viewer or editor roles. Only users with permission can open a document, and only editors can change it.",
        "concepts": [
          "Sharing",
          "Permissions",
          "Authorization"
        ],
        "hints": [
          "Check permission on every document route.",
          "Owners have full access.",
          "Return 403 for missing permission."
        ],
        "acceptanceCriteria": [
          "Creating a document works",
          "Sharing works",
          "An unshared user gets 403"
        ],
        "tests": [
          "Create a document",
          "Share it as viewer",
          "Open it as a third user"
        ]
      },
      {
        "id": "proj-multiuser-collaboration-app-m3",
        "order": 3,
        "title": "WebSocket server",
        "objectives": [
          "Attach the WebSocket server",
          "Authenticate connections",
          "Join document rooms"
        ],
        "instructions": "Attach a WebSocket server, authenticate with JWT, and implement joining a document room. Only users with permission can join the room.",
        "concepts": [
          "WebSockets",
          "Authentication",
          "Rooms"
        ],
        "hints": [
          "Verify the token and the permission before joining.",
          "Keep a map of document to sockets.",
          "Clean up on disconnect."
        ],
        "acceptanceCriteria": [
          "A valid user joins",
          "An unshared user cannot join",
          "Disconnect cleans up"
        ],
        "tests": [
          "Join with permission",
          "Join without permission",
          "Disconnect and check presence"
        ]
      },
      {
        "id": "proj-multiuser-collaboration-app-m4",
        "order": 4,
        "title": "Operational transformation",
        "objectives": [
          "Represent edits as operations",
          "Transform concurrent operations",
          "Apply and broadcast"
        ],
        "instructions": "Implement a simple operational transformation: edits are insert or delete operations with a position, and the server transforms an incoming operation against operations applied since the client last synced, then applies and broadcasts it. Document the transform rules.",
        "concepts": [
          "Operational transformation",
          "Concurrency",
          "Consistency"
        ],
        "hints": [
          "Transform positions against concurrent inserts and deletes.",
          "Apply operations in server order.",
          "Broadcast the transformed operation to all clients."
        ],
        "acceptanceCriteria": [
          "Concurrent inserts do not lose text",
          "Concurrent deletes are consistent",
          "All clients converge"
        ],
        "tests": [
          "Simulate two concurrent inserts",
          "Simulate concurrent deletes",
          "Check all clients agree"
        ]
      },
      {
        "id": "proj-multiuser-collaboration-app-m5",
        "order": 5,
        "title": "Presence and cursors",
        "objectives": [
          "Broadcast presence",
          "Broadcast cursor positions",
          "Show collaborator names"
        ],
        "instructions": "Add presence events on join and leave, and cursor events carrying the user name and position. The frontend shows coloured carets with names for each collaborator.",
        "concepts": [
          "Presence",
          "Cursors",
          "Ephemeral events"
        ],
        "hints": [
          "Send cursor events throttled.",
          "Remove cursors on disconnect.",
          "Do not store cursor positions in the database."
        ],
        "acceptanceCriteria": [
          "Cursors show for other users",
          "Presence updates on join and leave",
          "Cursors disappear on disconnect"
        ],
        "tests": [
          "Open the document in two browsers",
          "Move the cursor",
          "Close one browser"
        ]
      },
      {
        "id": "proj-multiuser-collaboration-app-m6",
        "order": 6,
        "title": "React editor",
        "objectives": [
          "Build the editor",
          "Send edits as operations",
          "Render remote cursors"
        ],
        "instructions": "Build the React editor using a textarea or contenteditable element that converts local changes into operations, sends them over the socket, applies remote operations, and renders remote cursors.",
        "concepts": [
          "React",
          "Editors",
          "Real-time sync"
        ],
        "hints": [
          "Convert local changes into insert and delete operations.",
          "Apply remote operations without moving the local cursor badly.",
          "Show remote carets as overlays."
        ],
        "acceptanceCriteria": [
          "Typing appears in the other browser",
          "Remote cursors render",
          "The editor stays usable"
        ],
        "tests": [
          "Type in two browsers",
          "Check the text converges",
          "Check the cursors"
        ]
      },
      {
        "id": "proj-multiuser-collaboration-app-m7",
        "order": 7,
        "title": "Version history",
        "objectives": [
          "Snapshot versions periodically",
          "List versions",
          "Restore an old version"
        ],
        "instructions": "Add automatic version snapshots every 30 seconds when the document changed, plus a history view listing versions with author and time, and a restore action that replaces the current content and broadcasts the change.",
        "concepts": [
          "Versioning",
          "Snapshots",
          "Restore"
        ],
        "hints": [
          "Snapshot only when the content changed.",
          "Store the author of each version.",
          "Broadcast a restore to all clients."
        ],
        "acceptanceCriteria": [
          "Versions are created",
          "History lists them",
          "Restoring works and broadcasts"
        ],
        "tests": [
          "Edit the document and wait",
          "List versions",
          "Restore an old version"
        ]
      },
      {
        "id": "proj-multiuser-collaboration-app-m8",
        "order": 8,
        "title": "Testing and documentation",
        "objectives": [
          "Write API tests",
          "Test operational transformation",
          "Document the protocol"
        ],
        "instructions": "Write tests for document access, sharing, and the operational transformation functions (including concurrent inserts and deletes). Run the suite and finish the README with the OT rules and the event protocol.",
        "concepts": [
          "Testing",
          "OT tests",
          "Documentation"
        ],
        "hints": [
          "Test OT with fixed operation pairs.",
          "Test the permission checks.",
          "Document the transform rules."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "OT convergence is covered",
          "The README documents the protocol"
        ],
        "tests": [
          "Run the full test suite",
          "Edit in two browsers",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Concurrent edits converge",
      "Cursors and presence work",
      "Permissions are enforced",
      "Version history is complete",
      "Tests cover OT",
      "The README documents the protocol"
    ],
    "finalAssessment": [
      "Edit a document in two browsers",
      "Show the cursors",
      "Show concurrent edits converging",
      "Restore an old version",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-production-rest-api",
    "slug": "production-rest-api",
    "level": 4,
    "title": "Production REST API",
    "description": "Design and build a production-grade REST API the way a real engineering team would: layered architecture, authentication and RBAC, rate limiting, structured logging, request validation, database migrations, automated tests, CI, and deployment documentation. The API manages a realistic domain (a project-tracking service) and must survive load testing and failure drills.",
    "skills": [
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JWT",
      "RBAC",
      "Rate limiting",
      "Testing"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Full CRUD for projects, tasks and comments with proper status codes",
      "JWT authentication with refresh tokens and RBAC (admin, manager, member)",
      "Per-user rate limiting with clear 429 responses",
      "Request validation with detailed error bodies",
      "Database migrations that run in order and are reversible",
      "Structured JSON logging with request IDs",
      "Pagination, filtering and sorting on every list endpoint",
      "Health and readiness endpoints for orchestrators"
    ],
    "nonFunctionalRequirements": [
      "P95 latency under 200ms for reads on local data",
      "Rate limiter blocks abusive clients without affecting others",
      "No unhandled error ever leaks a stack trace to clients",
      "Migrations run cleanly on an empty and a populated database",
      "Test coverage above 80 percent on the service layer"
    ],
    "architecture": "The API is layered: routes, controllers, services, repositories, with the database behind a repository interface so it can be swapped in tests. PostgreSQL stores the data with migrations managed by a migration runner. Authentication uses short-lived JWTs plus hashed refresh tokens. A middleware chain handles request IDs, logging, rate limiting and errors in a fixed order. The service ships in a Docker container with a compose file for local development.",
    "databaseSchema": "users: id UUID PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT, role TEXT; projects: id UUID PRIMARY KEY, owner_id UUID REFERENCES users(id), name TEXT, created_at TIMESTAMPTZ; tasks: id UUID PRIMARY KEY, project_id UUID REFERENCES projects(id), title TEXT, status TEXT, assignee_id UUID, due_date DATE; comments: id UUID PRIMARY KEY, task_id UUID REFERENCES tasks(id), author_id UUID, body TEXT, created_at TIMESTAMPTZ",
    "apis": [
      "POST /api/auth/register, POST /api/auth/login, POST /api/auth/refresh, GET /api/projects, POST /api/projects, GET /api/projects/:id/tasks, POST /api/projects/:id/tasks, PATCH /api/tasks/:id, POST /api/tasks/:id/comments, GET /api/health, GET /api/ready."
    ],
    "fileStructure": "production-api/\n  Dockerfile\n  docker-compose.yml\n  package.json\n  tsconfig.json\n  src/\n    index.ts\n    app.ts\n    config.ts\n    db/\n      migrate.ts\n      migrations/\n    middleware/\n      auth.ts\n      rateLimit.ts\n      logger.ts\n      errors.ts\n    modules/\n      auth/\n      projects/\n      tasks/\n  tests/\n    api.test.ts\n    load/\n  README.md\n  DEPLOY.md",
    "taskBreakdown": [
      "Design the domain model and API contract",
      "Set up the project, Docker and migrations",
      "Implement authentication and RBAC",
      "Implement projects, tasks and comments",
      "Add validation, rate limiting and logging",
      "Write the test suite and reach 80 percent coverage",
      "Load test and fix the slowest endpoints",
      "Write deployment documentation and run a failure drill"
    ],
    "milestones": [
      {
        "id": "proj-production-rest-api-m1",
        "order": 1,
        "title": "API contract and project setup",
        "objectives": [
          "Define the API contract",
          "Set up the project and Docker",
          "Create the first migration"
        ],
        "instructions": "Write the API contract as an OpenAPI document covering auth, projects, tasks and comments, including error shapes. Set up the TypeScript project with Express, Docker and docker-compose with PostgreSQL, and write the first migration creating the users table. Verify the server starts and the migration runs.",
        "concepts": [
          "OpenAPI",
          "Docker",
          "Migrations"
        ],
        "hints": [
          "Write the contract before the code.",
          "Keep migrations in numbered files.",
          "Use environment variables for all secrets."
        ],
        "acceptanceCriteria": [
          "The OpenAPI document covers all endpoints",
          "docker-compose starts the API and database",
          "The migration creates the users table"
        ],
        "tests": [
          "Validate the OpenAPI document",
          "Run docker-compose up",
          "Check the users table exists"
        ]
      },
      {
        "id": "proj-production-rest-api-m2",
        "order": 2,
        "title": "Authentication and RBAC",
        "objectives": [
          "Implement registration and login",
          "Issue and refresh JWTs",
          "Enforce roles"
        ],
        "instructions": "Implement registration with bcrypt hashing, login issuing a 15-minute access token and a hashed refresh token, a refresh endpoint, and role middleware. Admins manage everything, managers manage their projects, members only their assigned tasks. Write tests for the 401 and 403 cases.",
        "concepts": [
          "JWT",
          "bcrypt",
          "RBAC"
        ],
        "hints": [
          "Hash refresh tokens before storing them.",
          "Return the same 401 for bad email and bad password.",
          "Check roles after authentication."
        ],
        "acceptanceCriteria": [
          "Login returns both tokens",
          "Refresh rotates the token",
          "A member cannot delete a project"
        ],
        "tests": [
          "Register and log in",
          "Refresh the token",
          "Try an admin action as a member"
        ]
      },
      {
        "id": "proj-production-rest-api-m3",
        "order": 3,
        "title": "Projects, tasks and comments",
        "objectives": [
          "Implement the core CRUD",
          "Enforce ownership",
          "Return consistent JSON"
        ],
        "instructions": "Implement the projects, tasks and comments endpoints with validation, ownership checks and consistent response shapes. List endpoints support pagination, filtering by status and sorting. Verify each endpoint with curl before moving on.",
        "concepts": [
          "REST",
          "Validation",
          "Ownership"
        ],
        "hints": [
          "Validate before touching the database.",
          "Scope queries by the requesting user.",
          "Return 404 for missing resources."
        ],
        "acceptanceCriteria": [
          "All CRUD endpoints work",
          "A user cannot see another user project",
          "Validation errors are detailed"
        ],
        "tests": [
          "Create a project and tasks",
          "Fetch as another user",
          "Create with a missing title"
        ]
      },
      {
        "id": "proj-production-rest-api-m4",
        "order": 4,
        "title": "Rate limiting and logging",
        "objectives": [
          "Add per-user rate limiting",
          "Add structured logging",
          "Add request IDs"
        ],
        "instructions": "Add a token-bucket rate limiter keyed by user id (100 requests per minute) returning 429 with Retry-After, and structured JSON logging with a request id on every line. Add the health and readiness endpoints used by orchestrators.",
        "concepts": [
          "Rate limiting",
          "Structured logging",
          "Observability"
        ],
        "hints": [
          "Limit per user, not globally.",
          "Log method, path, status and latency.",
          "Readiness checks the database connection."
        ],
        "acceptanceCriteria": [
          "The 101st request returns 429",
          "Logs are valid JSON with request IDs",
          "Readiness fails when the database is down"
        ],
        "tests": [
          "Send 101 requests quickly",
          "Inspect a log line",
          "Stop the database and check readiness"
        ]
      },
      {
        "id": "proj-production-rest-api-m5",
        "order": 5,
        "title": "Testing and coverage",
        "objectives": [
          "Write API tests",
          "Reach 80 percent coverage",
          "Test failure cases"
        ],
        "instructions": "Write API tests with supertest against a test database covering the happy paths, validation errors, auth failures and rate limiting. Measure coverage and add tests until the service layer is above 80 percent.",
        "concepts": [
          "API testing",
          "Coverage",
          "Test databases"
        ],
        "hints": [
          "Use a separate test database.",
          "Test the unhappy paths, not just the happy ones.",
          "Run tests in CI on every push."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Service-layer coverage is above 80 percent",
          "Tests run in CI"
        ],
        "tests": [
          "Run the test suite with coverage",
          "Break an endpoint and watch a test fail",
          "Check the CI run"
        ]
      },
      {
        "id": "proj-production-rest-api-m6",
        "order": 6,
        "title": "Load testing and performance",
        "objectives": [
          "Load test the read endpoints",
          "Find and fix slow queries",
          "Verify P95 latency"
        ],
        "instructions": "Load test the list endpoints with a realistic dataset, find slow queries with EXPLAIN, and add the indexes that fix them. Re-run the load test and record the P95 latency before and after.",
        "concepts": [
          "Load testing",
          "EXPLAIN",
          "Indexing"
        ],
        "hints": [
          "Seed at least 10,000 tasks for the test.",
          "Add indexes on foreign keys and filter columns.",
          "Measure, do not guess."
        ],
        "acceptanceCriteria": [
          "P95 read latency is under 200ms",
          "Slow queries are indexed",
          "Before and after numbers are recorded"
        ],
        "tests": [
          "Run the load test",
          "EXPLAIN the slowest query",
          "Re-run and compare"
        ]
      },
      {
        "id": "proj-production-rest-api-m7",
        "order": 7,
        "title": "Failure drills",
        "objectives": [
          "Kill the database and observe",
          "Test restart recovery",
          "Verify no data loss"
        ],
        "instructions": "Run failure drills: stop the database mid-request and confirm the API returns 503 without crashing, restart it and confirm recovery, and kill the API process and confirm docker-compose restarts it. Document what you observed.",
        "concepts": [
          "Failure modes",
          "Graceful degradation",
          "Recovery"
        ],
        "hints": [
          "The API must never crash on a database error.",
          "Return 503, not 500, when a dependency is down.",
          "Document each drill result."
        ],
        "acceptanceCriteria": [
          "Database failure returns 503",
          "Recovery works after restart",
          "No data is lost"
        ],
        "tests": [
          "Stop the database during a request",
          "Restart everything",
          "Check the data is intact"
        ]
      },
      {
        "id": "proj-production-rest-api-m8",
        "order": 8,
        "title": "Deployment documentation",
        "objectives": [
          "Write the deployment guide",
          "Document operations",
          "Final review"
        ],
        "instructions": "Write DEPLOY.md covering environment variables, migrations, backups, log access, scaling notes and rollback steps. Do a final review against the checklist and record the load test results and coverage numbers.",
        "concepts": [
          "Documentation",
          "Operations",
          "Runbooks"
        ],
        "hints": [
          "Document every environment variable.",
          "Include a rollback procedure.",
          "Record the measured numbers."
        ],
        "acceptanceCriteria": [
          "DEPLOY.md is complete",
          "Rollback steps are documented",
          "Numbers are recorded"
        ],
        "tests": [
          "Follow DEPLOY.md from scratch",
          "Check the rollback steps",
          "Verify the recorded numbers"
        ]
      }
    ],
    "reviewChecklist": [
      "No stack traces leak to clients",
      "Rate limiting works per user",
      "Coverage is above 80 percent",
      "P95 latency is under 200ms",
      "Failure drills are documented",
      "DEPLOY.md is complete"
    ],
    "finalAssessment": [
      "Create a project and tasks through the API",
      "Demonstrate rate limiting with 429",
      "Show the load test results",
      "Show a failure drill",
      "Show the test coverage report"
    ]
  },
  {
    "id": "proj-fullstack-saas",
    "slug": "full-stack-saas",
    "level": 4,
    "title": "Full-Stack SaaS",
    "description": "Build a complete multi-tenant SaaS product: marketing landing page, signup with a trial, subscription billing (simulated), tenant workspaces, a dashboard, team invites, and an admin panel. This simulates shipping a real SaaS product end to end.",
    "skills": [
      "TypeScript",
      "React",
      "Express",
      "PostgreSQL",
      "Stripe (simulated)",
      "Multi-tenancy",
      "RBAC",
      "Testing"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Public landing page with pricing",
      "Signup creates a tenant with a 14-day trial",
      "Simulated subscription checkout and plan changes",
      "Tenant workspaces with member invites",
      "Dashboard with usage metrics and charts",
      "Team roles: owner, admin, member",
      "Admin panel for tenants, plans and usage",
      "Audit log of billing and admin actions"
    ],
    "nonFunctionalRequirements": [
      "Tenants never see each other data",
      "Trials expire and downgrade gracefully",
      "Billing is simulated, never real",
      "Invites work by token and expire in 24 hours",
      "The product works end to end in a browser"
    ],
    "architecture": "The SaaS has a React frontend (landing page, auth, dashboard, admin) and an Express API with PostgreSQL. Tenants are the isolation boundary, enforced in the repository layer. Billing is a simulated provider with test cards, plans and a trial clock. Invites are random tokens with expiry. Usage events feed the dashboard charts. The whole product runs with docker-compose.",
    "databaseSchema": "tenants: id UUID PRIMARY KEY, name TEXT, plan TEXT, trial_ends_at TIMESTAMPTZ, status TEXT; users: id UUID PRIMARY KEY, tenant_id UUID, email TEXT UNIQUE, password_hash TEXT, role TEXT; invites: id UUID PRIMARY KEY, tenant_id UUID, email TEXT, token_hash TEXT, expires_at TIMESTAMPTZ, accepted INTEGER DEFAULT 0; subscriptions: id UUID PRIMARY KEY, tenant_id UUID UNIQUE, plan TEXT, status TEXT; usage_events: id UUID PRIMARY KEY, tenant_id UUID, kind TEXT, amount INTEGER, created_at TIMESTAMPTZ; audit_log: id UUID PRIMARY KEY, tenant_id UUID, user_id UUID, action TEXT, created_at TIMESTAMPTZ",
    "apis": [
      "POST /api/auth/signup, POST /api/billing/checkout, GET /api/dashboard, POST /api/tenants/:id/invite, POST /api/invites/:token/accept, GET /api/admin/tenants."
    ],
    "fileStructure": "saas/\n  docker-compose.yml\n  backend/\n    package.json\n    src/\n      index.ts\n      app.ts\n      db.ts\n      routes/\n        auth.ts\n        billing.ts\n        tenants.ts\n        admin.ts\n      services/\n        billing.ts\n  frontend/\n    package.json\n    src/\n      App.tsx\n      pages/\n        Landing.tsx\n        Signup.tsx\n        Dashboard.tsx\n        Billing.tsx\n        Admin.tsx\n  README.md",
    "taskBreakdown": [
      "Design the product and data model",
      "Build auth, tenants and trials",
      "Build the landing page and signup",
      "Implement simulated billing",
      "Build the dashboard and invites",
      "Build the admin panel",
      "Write tests and load test the dashboard",
      "Document the product and run a launch checklist"
    ],
    "milestones": [
      {
        "id": "proj-fullstack-saas-m1",
        "order": 1,
        "title": "Product design and setup",
        "objectives": [
          "Define the plans and trial rules",
          "Set up the monorepo",
          "Create the schema"
        ],
        "instructions": "Define three plans (Free, Pro, Team) with limits, the 14-day trial rules, and the data model. Set up the monorepo with backend, frontend and docker-compose, and create the database schema with migrations.",
        "concepts": [
          "Product design",
          "Monorepo",
          "Schema design"
        ],
        "hints": [
          "Write the plan limits in one config file.",
          "Scope every table by tenant.",
          "Keep migrations numbered and reversible."
        ],
        "acceptanceCriteria": [
          "Plans and limits are documented",
          "The stack starts with compose",
          "The schema is created"
        ],
        "tests": [
          "Review the plan config",
          "Run docker-compose up",
          "Inspect the schema"
        ]
      },
      {
        "id": "proj-fullstack-saas-m2",
        "order": 2,
        "title": "Auth, tenants and trials",
        "objectives": [
          "Signup creates a tenant",
          "Start the trial clock",
          "Enforce tenant isolation"
        ],
        "instructions": "Implement signup that creates a user and a tenant together and starts the 14-day trial. Enforce tenant isolation in the repository layer and add middleware that blocks expired trials from paid features.",
        "concepts": [
          "Multi-tenancy",
          "Trials",
          "Isolation"
        ],
        "hints": [
          "Create the tenant and user in one transaction.",
          "Check the trial on every paid-feature request.",
          "Test isolation explicitly."
        ],
        "acceptanceCriteria": [
          "Signup creates a tenant and trial",
          "Tenants cannot see each other data",
          "Expired trials lose paid features"
        ],
        "tests": [
          "Sign up a new tenant",
          "Access another tenant data",
          "Expire a trial and check access"
        ]
      },
      {
        "id": "proj-fullstack-saas-m3",
        "order": 3,
        "title": "Landing page and billing",
        "objectives": [
          "Build the landing page",
          "Implement simulated checkout",
          "Handle plan changes"
        ],
        "instructions": "Build the landing page with pricing, and the simulated billing checkout using test cards. Plan changes take effect immediately and are recorded in the audit log. Billing is clearly labelled simulated.",
        "concepts": [
          "Landing pages",
          "Simulated billing",
          "Plan changes"
        ],
        "hints": [
          "Never use real payment credentials.",
          "Record every billing change.",
          "Show the trial countdown in the UI."
        ],
        "acceptanceCriteria": [
          "Checkout works with test cards",
          "Plan changes apply",
          "Billing changes are audited"
        ],
        "tests": [
          "Check out with a test card",
          "Change plans",
          "Check the audit log"
        ]
      },
      {
        "id": "proj-fullstack-saas-m4",
        "order": 4,
        "title": "Dashboard and invites",
        "objectives": [
          "Build the dashboard",
          "Implement team invites",
          "Show usage charts"
        ],
        "instructions": "Build the dashboard with usage metrics and charts fed by real usage events. Implement invites by email token that expire in 24 hours, and a team page showing members and roles.",
        "concepts": [
          "Dashboards",
          "Invites",
          "Charts"
        ],
        "hints": [
          "Store only the hash of invite tokens.",
          "Expire invites after 24 hours.",
          "Chart real usage data."
        ],
        "acceptanceCriteria": [
          "The dashboard shows real usage",
          "Invites work and expire",
          "Roles are enforced"
        ],
        "tests": [
          "Invite a member and accept",
          "Use an expired invite",
          "Check the usage charts"
        ]
      },
      {
        "id": "proj-fullstack-saas-m5",
        "order": 5,
        "title": "Admin panel",
        "objectives": [
          "Build the tenant admin view",
          "Manage plans and users",
          "View the audit log"
        ],
        "instructions": "Build the admin panel for super-admins: list tenants, change plans, manage users, and view the audit log filtered by tenant and action. Non-admins get 403.",
        "concepts": [
          "Admin panels",
          "RBAC",
          "Audit logs"
        ],
        "hints": [
          "Restrict the panel to super-admins.",
          "Log every admin action.",
          "Paginate the tenant list."
        ],
        "acceptanceCriteria": [
          "Admins see all tenants",
          "Non-admins get 403",
          "Admin actions are audited"
        ],
        "tests": [
          "Open the admin panel",
          "Try as a tenant user",
          "Check the audit log"
        ]
      },
      {
        "id": "proj-fullstack-saas-m6",
        "order": 6,
        "title": "Testing",
        "objectives": [
          "Write API and UI tests",
          "Test isolation and billing",
          "Reach good coverage"
        ],
        "instructions": "Write API tests for signup, isolation, billing, invites and admin access, plus a browser smoke test of the signup-to-dashboard flow. Run the suite in CI.",
        "concepts": [
          "Testing",
          "Isolation tests",
          "CI"
        ],
        "hints": [
          "Test cross-tenant access explicitly.",
          "Test trial expiry.",
          "Keep one happy-path browser test."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Isolation is covered",
          "The browser smoke test passes"
        ],
        "tests": [
          "Run the test suite",
          "Try cross-tenant access",
          "Run the smoke test"
        ]
      },
      {
        "id": "proj-fullstack-saas-m7",
        "order": 7,
        "title": "Load test and hardening",
        "objectives": [
          "Load test the dashboard",
          "Fix slow queries",
          "Harden the auth flows"
        ],
        "instructions": "Load test the dashboard endpoints with seeded data, add missing indexes, and review the auth flows for common mistakes (weak passwords, missing rate limits, exposed hashes). Fix what you find.",
        "concepts": [
          "Load testing",
          "Security review",
          "Indexing"
        ],
        "hints": [
          "Seed realistic data volumes.",
          "Rate limit auth endpoints.",
          "Never return password hashes."
        ],
        "acceptanceCriteria": [
          "Dashboard P95 is acceptable",
          "Auth endpoints are rate limited",
          "No hashes leak in responses"
        ],
        "tests": [
          "Run the load test",
          "Try 50 bad logins quickly",
          "Inspect API responses for hashes"
        ]
      },
      {
        "id": "proj-fullstack-saas-m8",
        "order": 8,
        "title": "Launch checklist",
        "objectives": [
          "Run the launch checklist",
          "Write operations docs",
          "Demo the product"
        ],
        "instructions": "Run a launch checklist: trial expiry, billing, invites, admin, backups, logs and rollback. Write the operations documentation and record a demo script walking through signup to dashboard.",
        "concepts": [
          "Launch",
          "Operations",
          "Demos"
        ],
        "hints": [
          "Test the trial expiry path.",
          "Document backups and rollback.",
          "Record the demo script."
        ],
        "acceptanceCriteria": [
          "The checklist is complete",
          "Docs cover operations",
          "The demo runs end to end"
        ],
        "tests": [
          "Walk the checklist",
          "Follow the ops docs",
          "Run the demo"
        ]
      }
    ],
    "reviewChecklist": [
      "Tenant isolation holds",
      "Trials and billing work",
      "Invites expire correctly",
      "Admin access is enforced",
      "Tests cover the flows",
      "The launch checklist is complete"
    ],
    "finalAssessment": [
      "Sign up and see the trial",
      "Check out with a test card",
      "Invite a team member",
      "Show the admin panel",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-distributed-job-processing",
    "slug": "distributed-job-processing-system",
    "level": 4,
    "title": "Distributed Job Processing System",
    "description": "Build a production-style distributed job system: a coordinator, multiple workers, a durable queue, priorities, retries with backoff, dead letters, idempotent handlers, and a monitoring UI. Simulate worker failures and prove no job is lost.",
    "skills": [
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Queues",
      "Workers",
      "Observability"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Enqueue jobs with type, payload, priority and idempotency key",
      "Workers claim jobs atomically and heartbeat while working",
      "Retries use exponential backoff with jitter",
      "Jobs failing too often go to a dead-letter queue",
      "Handlers are idempotent",
      "Scheduled jobs run at their time",
      "Monitoring UI shows throughput, latency and failures",
      "Killing a worker never loses a job"
    ],
    "nonFunctionalRequirements": [
      "No job is lost when a worker dies",
      "No job runs twice at once",
      "Dead workers are detected within 15 seconds",
      "Retries back off exponentially with jitter",
      "Throughput and latency are visible in the UI"
    ],
    "architecture": "The coordinator is an Express API over PostgreSQL, using SKIP LOCKED to claim jobs atomically so workers never collide. Workers poll, heartbeat, and report results; a reaper returns jobs from dead workers to the queue. Handlers check the idempotency key before applying effects. A React UI polls for stats and job states. The system runs with docker-compose and a chaos script that kills workers mid-job.",
    "databaseSchema": "jobs: id UUID PRIMARY KEY, type TEXT, payload JSONB, priority INTEGER DEFAULT 5, status TEXT DEFAULT \"pending\", attempts INTEGER DEFAULT 0, max_attempts INTEGER DEFAULT 5, run_at TIMESTAMPTZ, idempotency_key TEXT UNIQUE, result JSONB, error TEXT, created_at TIMESTAMPTZ; workers: id UUID PRIMARY KEY, name TEXT UNIQUE, last_heartbeat TIMESTAMPTZ, status TEXT",
    "apis": [
      "POST /api/jobs, GET /api/jobs, GET /api/jobs/:id, POST /api/jobs/:id/retry, GET /api/stats, GET /api/workers."
    ],
    "fileStructure": "distributed-jobs/\n  docker-compose.yml\n  coordinator/\n    package.json\n    src/\n      index.ts\n      app.ts\n      db.ts\n      reaper.ts\n      routes/\n        jobs.ts\n  worker/\n    package.json\n    src/\n      index.ts\n      handlers.ts\n  frontend/\n    package.json\n    src/\n      App.tsx\n  chaos/\n    kill-worker.sh\n  README.md",
    "taskBreakdown": [
      "Design the queue schema and claiming",
      "Implement the coordinator API",
      "Implement the worker with heartbeats",
      "Implement handlers and idempotency",
      "Add retries, backoff and dead letters",
      "Add the reaper for dead workers",
      "Build the monitoring UI",
      "Run chaos tests and document"
    ],
    "milestones": [
      {
        "id": "proj-distributed-job-processing-m1",
        "order": 1,
        "title": "Queue design and coordinator",
        "objectives": [
          "Design the jobs table",
          "Implement enqueue",
          "Use SKIP LOCKED claiming"
        ],
        "instructions": "Design the jobs table with status, priority, attempts and idempotency key. Implement enqueue with validation and the atomic claim query using SELECT FOR UPDATE SKIP LOCKED. Verify two workers cannot claim the same job.",
        "concepts": [
          "PostgreSQL",
          "SKIP LOCKED",
          "Queue design"
        ],
        "hints": [
          "Claim in a single transaction.",
          "Order by priority then creation time.",
          "Reject unknown job types."
        ],
        "acceptanceCriteria": [
          "Enqueueing works",
          "Two workers cannot claim one job",
          "Priority order is respected"
        ],
        "tests": [
          "Enqueue jobs",
          "Start two workers",
          "Check the claim results"
        ]
      },
      {
        "id": "proj-distributed-job-processing-m2",
        "order": 2,
        "title": "Worker and heartbeats",
        "objectives": [
          "Register workers",
          "Heartbeat every 5 seconds",
          "Report results"
        ],
        "instructions": "Write the worker process: register on start, heartbeat every 5 seconds, poll for jobs, run the handler, and report the result. On shutdown it deregisters cleanly.",
        "concepts": [
          "Workers",
          "Heartbeats",
          "Polling"
        ],
        "hints": [
          "Heartbeat in a background timer.",
          "Poll every second when idle.",
          "Always report the result, even on failure."
        ],
        "acceptanceCriteria": [
          "Workers register and heartbeat",
          "Jobs complete end to end",
          "Results are recorded"
        ],
        "tests": [
          "Start a worker",
          "Enqueue a job",
          "Check the result"
        ]
      },
      {
        "id": "proj-distributed-job-processing-m3",
        "order": 3,
        "title": "Handlers and idempotency",
        "objectives": [
          "Implement three handlers",
          "Make handlers idempotent",
          "Store results"
        ],
        "instructions": "Implement email, report and image handlers. Each handler checks the idempotency key against a processed-keys record before applying its effect, so a retried job never double-sends or double-writes.",
        "concepts": [
          "Idempotency",
          "Handlers",
          "Exactly-once effects"
        ],
        "hints": [
          "Check the key before the effect.",
          "Record the key with the result.",
          "Keep handlers small and testable."
        ],
        "acceptanceCriteria": [
          "Handlers complete",
          "A retried job does not double-apply",
          "Results are stored"
        ],
        "tests": [
          "Run each handler type",
          "Report the same job twice",
          "Check for duplicates"
        ]
      },
      {
        "id": "proj-distributed-job-processing-m4",
        "order": 4,
        "title": "Retries and dead letters",
        "objectives": [
          "Retry with backoff and jitter",
          "Dead-letter after max attempts",
          "Manual retry works"
        ],
        "instructions": "Add retry logic with exponential backoff plus jitter, and dead-lettering after 5 attempts. Add an endpoint to manually retry a dead job, resetting its attempts.",
        "concepts": [
          "Retries",
          "Backoff",
          "Dead letters"
        ],
        "hints": [
          "Add jitter so retries do not synchronise.",
          "Cap the delay.",
          "Reset attempts on manual retry."
        ],
        "acceptanceCriteria": [
          "Failing jobs retry with growing delays",
          "They eventually dead-letter",
          "Manual retry works"
        ],
        "tests": [
          "Enqueue a failing job",
          "Watch the retry delays",
          "Manually retry it"
        ]
      },
      {
        "id": "proj-distributed-job-processing-m5",
        "order": 5,
        "title": "Reaper and failure detection",
        "objectives": [
          "Detect dead workers",
          "Reassign their jobs",
          "Run chaos tests"
        ],
        "instructions": "Add a reaper loop that marks workers dead after 15 seconds without a heartbeat and returns their running jobs to pending. Write a chaos script that kills a worker mid-job and verify the job is picked up by another worker.",
        "concepts": [
          "Failure detection",
          "Reassignment",
          "Chaos testing"
        ],
        "hints": [
          "Run the reaper every 5 seconds.",
          "Increment attempts on reassignment.",
          "Test with real kills, not mocks."
        ],
        "acceptanceCriteria": [
          "A killed worker is detected",
          "Its job is reassigned",
          "The job completes"
        ],
        "tests": [
          "Kill a worker mid-job",
          "Watch the reaper",
          "Check the job completes"
        ]
      },
      {
        "id": "proj-distributed-job-processing-m6",
        "order": 6,
        "title": "Scheduling and priorities",
        "objectives": [
          "Schedule jobs for later",
          "Respect priorities",
          "Cancel pending jobs"
        ],
        "instructions": "Add run_at scheduling so jobs wait until their time, strict priority ordering, and cancellation for pending jobs. Verify a scheduled job does not run early.",
        "concepts": [
          "Scheduling",
          "Priorities",
          "Cancellation"
        ],
        "hints": [
          "Only claim jobs whose run time arrived.",
          "Order by priority first.",
          "Only pending jobs can be cancelled."
        ],
        "acceptanceCriteria": [
          "Scheduled jobs wait",
          "High priority runs first",
          "Cancellation works"
        ],
        "tests": [
          "Schedule a job 30 seconds out",
          "Enqueue mixed priorities",
          "Cancel a pending job"
        ]
      },
      {
        "id": "proj-distributed-job-processing-m7",
        "order": 7,
        "title": "Monitoring UI",
        "objectives": [
          "Show live job states",
          "Show throughput and latency",
          "Add retry and cancel buttons"
        ],
        "instructions": "Build the monitoring UI with job counts by status, throughput and latency charts, a job detail view, and retry and cancel actions. Poll the API every few seconds.",
        "concepts": [
          "Monitoring",
          "Dashboards",
          "Polling"
        ],
        "hints": [
          "Poll every 3 seconds.",
          "Show attempts and last error.",
          "Colour-code statuses."
        ],
        "acceptanceCriteria": [
          "The UI shows live states",
          "Charts render",
          "Actions work from the UI"
        ],
        "tests": [
          "Enqueue jobs and watch",
          "Retry a dead job from the UI",
          "Check the charts"
        ]
      },
      {
        "id": "proj-distributed-job-processing-m8",
        "order": 8,
        "title": "Testing and documentation",
        "objectives": [
          "Write tests",
          "Run the chaos suite",
          "Document the system"
        ],
        "instructions": "Write tests for claiming, retries, idempotency and the reaper, run the chaos suite (kill workers, stop the coordinator, restart everything), and document the failure model and the numbers you measured.",
        "concepts": [
          "Testing",
          "Chaos engineering",
          "Documentation"
        ],
        "hints": [
          "Test claiming with parallel workers.",
          "Document every failure you tested.",
          "Record throughput numbers."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Chaos tests pass",
          "The failure model is documented"
        ],
        "tests": [
          "Run the test suite",
          "Run the chaos script",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "No job is lost in chaos tests",
      "No job runs twice at once",
      "Idempotency holds",
      "Retries back off with jitter",
      "The UI shows live metrics",
      "The failure model is documented"
    ],
    "finalAssessment": [
      "Enqueue jobs and watch them complete",
      "Kill a worker mid-job and show recovery",
      "Show a dead-lettered job",
      "Show the monitoring UI",
      "Show the chaos test results"
    ]
  },
  {
    "id": "proj-realtime-application",
    "slug": "real-time-application",
    "level": 4,
    "title": "Real-Time Application",
    "description": "Build a production-style real-time application: a live collaborative whiteboard with rooms, presence, cursors, drawing sync, undo, and persistence. It must handle reconnects, late joiners and concurrent edits gracefully.",
    "skills": [
      "TypeScript",
      "React",
      "Express",
      "WebSockets",
      "SQLite",
      "Presence",
      "CRDT concepts"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "Create whiteboard rooms and share links",
      "Draw strokes that sync to all participants live",
      "Show live cursors with names and colours",
      "Show who is online in the room",
      "Undo and redo your own strokes",
      "Persist the board so late joiners see it",
      "Reconnect automatically after a dropped connection",
      "Export the board as an image"
    ],
    "nonFunctionalRequirements": [
      "Strokes appear for others in under 200ms",
      "Late joiners receive the full board state",
      "Reconnects restore the session without data loss",
      "Undo only affects your own strokes",
      "The board persists across restarts"
    ],
    "architecture": "The backend is an Express API plus a WebSocket server sharing one HTTP server. Rooms hold strokes in SQLite; the server broadcasts stroke, undo and cursor events to room members. Late joiners receive a snapshot of the board. Clients keep a local operation log and resync on reconnect by requesting operations since their last sequence number. Presence is tracked with heartbeats and expiry.",
    "databaseSchema": "users: id UUID PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT, name TEXT; rooms: id UUID PRIMARY KEY, name TEXT, owner_id UUID, created_at TIMESTAMPTZ; strokes: id UUID PRIMARY KEY, room_id UUID, user_id UUID, points JSONB, colour TEXT, width INTEGER, seq INTEGER, created_at TIMESTAMPTZ; room_members: room_id UUID, user_id UUID, PRIMARY KEY (room_id, user_id)",
    "apis": [
      "REST: POST /api/rooms, GET /api/rooms/:id, GET /api/rooms/:id/strokes. WebSocket events: join, stroke, undo, cursor, presence, sync."
    ],
    "fileStructure": "whiteboard/\n  backend/\n    package.json\n    src/\n      index.ts\n      app.ts\n      db.ts\n      ws.ts\n      rooms.ts\n  frontend/\n    package.json\n    src/\n      App.tsx\n      socket.ts\n      components/\n        Canvas.tsx\n        Toolbar.tsx\n        PresenceBar.tsx\n  README.md",
    "taskBreakdown": [
      "Set up the backend, schema and auth",
      "Implement rooms and persistence",
      "Add the WebSocket server",
      "Implement stroke sync",
      "Add cursors and presence",
      "Build the canvas UI",
      "Add undo, redo and export",
      "Test reconnects and document"
    ],
    "milestones": [
      {
        "id": "proj-realtime-application-m1",
        "order": 1,
        "title": "Setup, schema and auth",
        "objectives": [
          "Create the tables",
          "Add JWT authentication",
          "Seed users"
        ],
        "instructions": "Set up the Express backend with the whiteboard schema and JWT authentication. Seed two users for testing collaboration. Verify login and room creation.",
        "concepts": [
          "Express",
          "SQLite",
          "JWT"
        ],
        "hints": [
          "Hash passwords with bcrypt.",
          "Protect room routes.",
          "Seed two test users."
        ],
        "acceptanceCriteria": [
          "The server starts",
          "Login works",
          "Rooms can be created"
        ],
        "tests": [
          "Log in as both users",
          "Create a room",
          "Inspect the schema"
        ]
      },
      {
        "id": "proj-realtime-application-m2",
        "order": 2,
        "title": "Rooms and persistence",
        "objectives": [
          "Create and share rooms",
          "Store strokes",
          "Load the board state"
        ],
        "instructions": "Implement room creation, sharing by link, and stroke storage with sequence numbers. Add an endpoint returning the full stroke list for a room so late joiners can load it.",
        "concepts": [
          "Persistence",
          "Sequence numbers",
          "Sharing"
        ],
        "hints": [
          "Assign increasing sequence numbers per room.",
          "Store points as JSON.",
          "Return strokes in sequence order."
        ],
        "acceptanceCriteria": [
          "Strokes persist",
          "Late joiners load the board",
          "Sequence numbers increase"
        ],
        "tests": [
          "Draw, restart, and reload",
          "Join late and check the board",
          "Check the sequence order"
        ]
      },
      {
        "id": "proj-realtime-application-m3",
        "order": 3,
        "title": "WebSocket server",
        "objectives": [
          "Attach the WebSocket server",
          "Authenticate connections",
          "Join room groups"
        ],
        "instructions": "Attach a WebSocket server to the HTTP server, authenticate with JWT, and implement joining a room group. Only members can join. Handle disconnects by cleaning up presence.",
        "concepts": [
          "WebSockets",
          "Authentication",
          "Rooms"
        ],
        "hints": [
          "Verify the token before accepting.",
          "Check room membership on join.",
          "Clean up on disconnect."
        ],
        "acceptanceCriteria": [
          "Valid users connect",
          "Non-members cannot join",
          "Disconnect cleans up"
        ],
        "tests": [
          "Connect with a valid token",
          "Join without membership",
          "Disconnect and check presence"
        ]
      },
      {
        "id": "proj-realtime-application-m4",
        "order": 4,
        "title": "Stroke sync",
        "objectives": [
          "Broadcast strokes live",
          "Order strokes by sequence",
          "Handle concurrent drawing"
        ],
        "instructions": "Implement stroke broadcasting: a client sends a completed stroke, the server stores it with the next sequence number and broadcasts it to the room. Clients apply strokes in sequence order.",
        "concepts": [
          "Broadcasting",
          "Ordering",
          "Sync"
        ],
        "hints": [
          "Store before broadcasting.",
          "Include the sequence number.",
          "Apply in order on the client."
        ],
        "acceptanceCriteria": [
          "Strokes appear live",
          "Order is consistent",
          "Concurrent drawing works"
        ],
        "tests": [
          "Draw in two browsers",
          "Draw at the same time",
          "Check both boards match"
        ]
      },
      {
        "id": "proj-realtime-application-m5",
        "order": 5,
        "title": "Cursors and presence",
        "objectives": [
          "Broadcast cursor positions",
          "Show online users",
          "Expire stale presence"
        ],
        "instructions": "Add cursor events with user name and colour, broadcast to the room, and presence tracking with heartbeats that expire after 10 seconds. The UI shows coloured cursors and an online list.",
        "concepts": [
          "Presence",
          "Cursors",
          "Heartbeats"
        ],
        "hints": [
          "Throttle cursor events.",
          "Expire presence after 10 seconds.",
          "Assign a colour per user."
        ],
        "acceptanceCriteria": [
          "Cursors show live",
          "Presence updates",
          "Stale users disappear"
        ],
        "tests": [
          "Move cursors in two browsers",
          "Disconnect one",
          "Wait and check the list"
        ]
      },
      {
        "id": "proj-realtime-application-m6",
        "order": 6,
        "title": "Canvas UI",
        "objectives": [
          "Build the drawing canvas",
          "Add tools and colours",
          "Render remote strokes"
        ],
        "instructions": "Build the React canvas with pen, eraser and colour tools, rendering local and remote strokes. The canvas scales to the window and redraws cleanly on resize.",
        "concepts": [
          "Canvas",
          "React",
          "Drawing"
        ],
        "hints": [
          "Draw with pointer events.",
          "Render strokes as polylines.",
          "Redraw the full board on resize."
        ],
        "acceptanceCriteria": [
          "Drawing works",
          "Remote strokes render",
          "Resize keeps the board"
        ],
        "tests": [
          "Draw with the pen",
          "Change colours",
          "Resize the window"
        ]
      },
      {
        "id": "proj-realtime-application-m7",
        "order": 7,
        "title": "Undo, redo and export",
        "objectives": [
          "Undo your own strokes",
          "Redo",
          "Export as an image"
        ],
        "instructions": "Add undo and redo that only affect the current user strokes, broadcast so all clients stay in sync, and an export that renders the board to a PNG download.",
        "concepts": [
          "Undo",
          "Redo",
          "Export"
        ],
        "hints": [
          "Undo removes only your strokes.",
          "Broadcast undo events.",
          "Render to an offscreen canvas for export."
        ],
        "acceptanceCriteria": [
          "Undo removes your last stroke",
          "Redo restores it",
          "Export downloads a PNG"
        ],
        "tests": [
          "Draw, undo, redo",
          "Undo as another user",
          "Export the board"
        ]
      },
      {
        "id": "proj-realtime-application-m8",
        "order": 8,
        "title": "Reconnects and documentation",
        "objectives": [
          "Auto-reconnect with resync",
          "Test dropped connections",
          "Document the protocol"
        ],
        "instructions": "Implement automatic reconnection with resync: on reconnect the client requests strokes since its last sequence number. Test by dropping the connection mid-draw and verify no strokes are lost. Document the event protocol.",
        "concepts": [
          "Reconnects",
          "Resync",
          "Documentation"
        ],
        "hints": [
          "Track the last sequence number.",
          "Request the missing range on reconnect.",
          "Show a reconnecting indicator."
        ],
        "acceptanceCriteria": [
          "Reconnects restore the session",
          "No strokes are lost",
          "The protocol is documented"
        ],
        "tests": [
          "Drop the connection mid-draw",
          "Reconnect and compare boards",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Strokes sync in under 200ms",
      "Late joiners load the board",
      "Reconnects lose nothing",
      "Undo is per-user",
      "Tests cover sync and reconnect",
      "The protocol is documented"
    ],
    "finalAssessment": [
      "Draw in two browsers live",
      "Show cursors and presence",
      "Drop and restore a connection",
      "Undo and export",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-systems-http-server",
    "slug": "systems-project-http-server",
    "level": 4,
    "title": "Systems Project: HTTP Server in C, Rust or Go",
    "description": "Build a small HTTP server from scratch in a systems language (C, Rust or Go) using only the standard library and OS sockets. It must parse requests, route them, serve static files, handle concurrent clients, and stay correct under load.",
    "skills": [
      "C",
      "Rust",
      "Go",
      "Sockets",
      "HTTP",
      "Concurrency",
      "Systems programming"
    ],
    "language": "go",
    "functionalRequirements": [
      "Listen on a TCP port and accept connections",
      "Parse HTTP request lines, headers and bodies",
      "Route GET requests to handlers",
      "Serve static files with correct content types",
      "Return proper status codes (200, 404, 400, 405)",
      "Handle many concurrent clients",
      "Support keep-alive connections",
      "Log requests with method, path, status and latency"
    ],
    "nonFunctionalRequirements": [
      "Handles at least 100 concurrent clients",
      "Returns correct responses for malformed requests",
      "Never crashes on a bad request",
      "Static files are served with correct MIME types",
      "Memory usage stays flat under load"
    ],
    "architecture": "The server is written in Go using only the standard library net package: a listener accepts connections, each connection is handled in its own goroutine, a small parser reads the request line and headers, a router dispatches to handlers, and a static file handler serves files from a directory with MIME detection. A worker pool bounds concurrency, and every connection is closed cleanly on error.",
    "databaseSchema": "",
    "apis": [
      "The server itself: GET / (static index), GET /static/*, GET /api/health, POST /api/echo."
    ],
    "fileStructure": "http-server/\n  go.mod\n  main.go\n  server/\n    server.go\n    router.go\n    request.go\n    response.go\n    static.go\n  static/\n    index.html\n    style.css\n  tests/\n    server_test.go\n  README.md",
    "taskBreakdown": [
      "Set up the project and a TCP listener",
      "Parse HTTP requests",
      "Implement routing and handlers",
      "Serve static files",
      "Add concurrency with goroutines",
      "Add keep-alive and timeouts",
      "Load test and fix issues",
      "Document the server"
    ],
    "milestones": [
      {
        "id": "proj-systems-http-server-m1",
        "order": 1,
        "title": "TCP listener",
        "objectives": [
          "Create a TCP listener",
          "Accept connections",
          "Echo bytes back"
        ],
        "instructions": "Write a program that listens on a TCP port, accepts connections, and echoes received bytes back to the client. Test it with telnet or netcat before adding any HTTP logic.",
        "concepts": [
          "Sockets",
          "TCP",
          "Listeners"
        ],
        "hints": [
          "Use the standard library only.",
          "Log each accepted connection.",
          "Close connections cleanly."
        ],
        "acceptanceCriteria": [
          "The server listens",
          "A client can connect",
          "Bytes echo back"
        ],
        "tests": [
          "Start the server",
          "Connect with netcat",
          "Send bytes and check the echo"
        ]
      },
      {
        "id": "proj-systems-http-server-m2",
        "order": 2,
        "title": "HTTP request parsing",
        "objectives": [
          "Parse the request line",
          "Parse headers",
          "Handle malformed requests"
        ],
        "instructions": "Implement an HTTP request parser that reads the method, path and version, then the headers, and returns a 400 response for malformed input instead of crashing. Test with curl and with hand-written bad requests.",
        "concepts": [
          "HTTP",
          "Parsing",
          "Error handling"
        ],
        "hints": [
          "Read until the blank line.",
          "Split headers on the first colon.",
          "Return 400 for a bad request line."
        ],
        "acceptanceCriteria": [
          "Valid requests parse correctly",
          "Malformed requests get 400",
          "The server stays up"
        ],
        "tests": [
          "curl a valid request",
          "Send a garbage request",
          "Send a request with bad headers"
        ]
      },
      {
        "id": "proj-systems-http-server-m3",
        "order": 3,
        "title": "Routing and handlers",
        "objectives": [
          "Route by method and path",
          "Implement health and echo",
          "Return proper status codes"
        ],
        "instructions": "Add a router that dispatches by method and path to handlers. Implement GET /api/health returning JSON and POST /api/echo returning the request body. Unknown routes return 404 and wrong methods return 405.",
        "concepts": [
          "Routing",
          "Handlers",
          "Status codes"
        ],
        "hints": [
          "Match exact paths first.",
          "Return JSON with the right content type.",
          "Distinguish 404 from 405."
        ],
        "acceptanceCriteria": [
          "Health returns 200 JSON",
          "Echo returns the body",
          "Unknown routes return 404"
        ],
        "tests": [
          "curl the health endpoint",
          "curl echo with a body",
          "curl an unknown path"
        ]
      },
      {
        "id": "proj-systems-http-server-m4",
        "order": 4,
        "title": "Static file serving",
        "objectives": [
          "Serve files from a directory",
          "Detect MIME types",
          "Prevent directory traversal"
        ],
        "instructions": "Implement static file serving from a directory with MIME type detection and a 404 for missing files. Block directory traversal attempts such as paths containing dot-dot, returning 403.",
        "concepts": [
          "Static files",
          "MIME types",
          "Security"
        ],
        "hints": [
          "Clean the path before joining it.",
          "Reject paths escaping the root.",
          "Set the content type from the extension."
        ],
        "acceptanceCriteria": [
          "Files serve with correct types",
          "Missing files return 404",
          "Traversal returns 403"
        ],
        "tests": [
          "Fetch index.html",
          "Fetch a missing file",
          "Request /static/../secret"
        ]
      },
      {
        "id": "proj-systems-http-server-m5",
        "order": 5,
        "title": "Concurrency",
        "objectives": [
          "Handle clients in parallel",
          "Bound concurrency",
          "Avoid data races"
        ],
        "instructions": "Handle each connection in its own goroutine with a bounded worker pool, and run the race detector over the test suite. Verify the server handles many simultaneous clients.",
        "concepts": [
          "Goroutines",
          "Concurrency",
          "Race detection"
        ],
        "hints": [
          "Use a worker pool or semaphore.",
          "Share no mutable state between handlers.",
          "Run tests with -race."
        ],
        "acceptanceCriteria": [
          "Concurrent clients all get responses",
          "No data races are reported",
          "Memory stays flat"
        ],
        "tests": [
          "Run 100 concurrent curl requests",
          "Run tests with -race",
          "Watch memory under load"
        ]
      },
      {
        "id": "proj-systems-http-server-m6",
        "order": 6,
        "title": "Keep-alive and timeouts",
        "objectives": [
          "Support keep-alive",
          "Add read and write timeouts",
          "Close idle connections"
        ],
        "instructions": "Add keep-alive support using the Connection header, plus read and write timeouts so a slow client cannot hold a connection forever. Idle connections close after the timeout.",
        "concepts": [
          "Keep-alive",
          "Timeouts",
          "Connection handling"
        ],
        "hints": [
          "Parse the Connection header.",
          "Set deadlines on each connection.",
          "Close cleanly on timeout."
        ],
        "acceptanceCriteria": [
          "Keep-alive reuses a connection",
          "Slow clients time out",
          "Idle connections close"
        ],
        "tests": [
          "Send two requests on one connection",
          "Connect and send nothing",
          "Check the connection closes"
        ]
      },
      {
        "id": "proj-systems-http-server-m7",
        "order": 7,
        "title": "Load testing",
        "objectives": [
          "Load test with many clients",
          "Measure latency and throughput",
          "Fix bottlenecks"
        ],
        "instructions": "Load test the server with a benchmarking tool, measure requests per second and latency, and fix any bottleneck you find. Record the numbers.",
        "concepts": [
          "Load testing",
          "Benchmarking",
          "Performance"
        ],
        "hints": [
          "Test static files and the API separately.",
          "Record P95 latency.",
          "Compare before and after fixes."
        ],
        "acceptanceCriteria": [
          "Throughput is measured",
          "P95 latency is recorded",
          "Bottlenecks are fixed"
        ],
        "tests": [
          "Run the benchmark",
          "Find the slowest endpoint",
          "Re-run after fixes"
        ]
      },
      {
        "id": "proj-systems-http-server-m8",
        "order": 8,
        "title": "Testing and documentation",
        "objectives": [
          "Write unit and integration tests",
          "Document the server",
          "Review the code"
        ],
        "instructions": "Write unit tests for the parser and router plus integration tests that start the server and make real requests. Document how to build, run and test the server, and review the code for resource leaks.",
        "concepts": [
          "Testing",
          "Documentation",
          "Code review"
        ],
        "hints": [
          "Test the parser with malformed inputs.",
          "Test the full server over a real socket.",
          "Check every connection is closed."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "The README is complete",
          "No resource leaks"
        ],
        "tests": [
          "Run the test suite",
          "Follow the README from scratch",
          "Check open file descriptors"
        ]
      }
    ],
    "reviewChecklist": [
      "Handles 100 concurrent clients",
      "Malformed requests return 400",
      "No data races",
      "Static files are safe",
      "Load test numbers are recorded",
      "The README is complete"
    ],
    "finalAssessment": [
      "Serve the static site",
      "Show the health and echo endpoints",
      "Show a traversal attempt blocked",
      "Show the load test results",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-compiler-interpreter",
    "slug": "compiler-or-interpreter",
    "level": 4,
    "title": "Compiler or Interpreter",
    "description": "Build a small programming language from scratch: a lexer, a parser producing an AST, an interpreter with variables, functions and control flow, and a REPL. Optionally add a bytecode compiler and a virtual machine.",
    "skills": [
      "Rust",
      "Go",
      "Python",
      "Lexing",
      "Parsing",
      "Interpreters",
      "Language design"
    ],
    "language": "rust",
    "functionalRequirements": [
      "Tokenize source code into tokens",
      "Parse tokens into an abstract syntax tree",
      "Evaluate expressions with correct precedence",
      "Support variables, assignment and scopes",
      "Support if statements and while loops",
      "Support user-defined functions with recursion",
      "Report syntax and runtime errors with line numbers",
      "Provide a REPL for interactive use"
    ],
    "nonFunctionalRequirements": [
      "Programs run correctly, including recursion",
      "Errors name the line and the problem",
      "Operator precedence matches the spec",
      "The REPL works interactively",
      "The language has a documented grammar"
    ],
    "architecture": "The language is implemented as a pipeline: a lexer turns source into tokens, a recursive descent parser builds an AST, and a tree-walking interpreter evaluates it with an environment chain for scopes. Functions are closures capturing their defining environment. Errors carry line numbers from the lexer through to the runtime. A REPL reads, evaluates and prints each line. The optional bytecode stage compiles the AST to instructions for a small stack VM.",
    "databaseSchema": "",
    "apis": [
      "No external API; the interface is the command line, source files and the REPL."
    ],
    "fileStructure": "minilang/\n  Cargo.toml\n  src/\n    main.rs\n    lexer.rs\n    token.rs\n    parser.rs\n    ast.rs\n    interpreter.rs\n    environment.rs\n    repl.rs\n  examples/\n    fib.mini\n    fizzbuzz.mini\n  tests/\n    interpreter_tests.rs\n  README.md\n  GRAMMAR.md",
    "taskBreakdown": [
      "Design the language and grammar",
      "Implement the lexer",
      "Implement the parser and AST",
      "Implement the interpreter for expressions",
      "Add variables, control flow and functions",
      "Add error reporting with line numbers",
      "Build the REPL and example programs",
      "Write tests and document the language"
    ],
    "milestones": [
      {
        "id": "proj-compiler-interpreter-m1",
        "order": 1,
        "title": "Language design and grammar",
        "objectives": [
          "Define the grammar",
          "Choose the syntax",
          "Write example programs"
        ],
        "instructions": "Design the language: numbers, strings, booleans, variables, arithmetic and comparison operators, if and while, and functions. Write the grammar in GRAMMAR.md and two example programs (fibonacci and fizzbuzz) in the new syntax.",
        "concepts": [
          "Language design",
          "Grammars",
          "Syntax"
        ],
        "hints": [
          "Keep the grammar small but complete.",
          "Decide precedence up front.",
          "Write examples before implementing."
        ],
        "acceptanceCriteria": [
          "The grammar is written",
          "Two example programs exist",
          "Precedence is specified"
        ],
        "tests": [
          "Read the grammar",
          "Check the examples parse by hand",
          "Confirm the precedence rules"
        ]
      },
      {
        "id": "proj-compiler-interpreter-m2",
        "order": 2,
        "title": "Lexer",
        "objectives": [
          "Tokenize the source",
          "Handle numbers, strings and keywords",
          "Track line numbers"
        ],
        "instructions": "Implement the lexer that turns source text into tokens: numbers, strings, identifiers, keywords, operators and punctuation, each with a line number. Illegal characters produce an error naming the line.",
        "concepts": [
          "Lexing",
          "Tokens",
          "Error reporting"
        ],
        "hints": [
          "Track line numbers as you scan.",
          "Distinguish keywords from identifiers.",
          "Skip whitespace and comments."
        ],
        "acceptanceCriteria": [
          "Keywords tokenize correctly",
          "Strings handle escapes",
          "An illegal character errors with a line"
        ],
        "tests": [
          "Tokenize an example program",
          "Tokenize a string with escapes",
          "Tokenize a bad character"
        ]
      },
      {
        "id": "proj-compiler-interpreter-m3",
        "order": 3,
        "title": "Parser and AST",
        "objectives": [
          "Parse expressions with precedence",
          "Build the AST",
          "Parse statements"
        ],
        "instructions": "Implement a recursive descent parser that builds an AST for expressions (with precedence climbing), assignments, if and while statements, and function definitions. Syntax errors report the line and the expected token.",
        "concepts": [
          "Parsing",
          "AST",
          "Precedence"
        ],
        "hints": [
          "Use precedence climbing for expressions.",
          "One AST node type per construct.",
          "Report the line on every error."
        ],
        "acceptanceCriteria": [
          "Precedence parses correctly",
          "Statements parse",
          "Syntax errors name the line"
        ],
        "tests": [
          "Parse 1 + 2 * 3 and check the tree",
          "Parse an if statement",
          "Parse a broken program"
        ]
      },
      {
        "id": "proj-compiler-interpreter-m4",
        "order": 4,
        "title": "Interpreter for expressions",
        "objectives": [
          "Evaluate expressions",
          "Handle types",
          "Report runtime errors"
        ],
        "instructions": "Implement the tree-walking interpreter for literals, variables, arithmetic, comparison and logical operators, with runtime errors (such as dividing by zero or using an undefined variable) that name the line.",
        "concepts": [
          "Interpreters",
          "Evaluation",
          "Runtime errors"
        ],
        "hints": [
          "Evaluate the AST recursively.",
          "Check types before operating.",
          "Carry line numbers into errors."
        ],
        "acceptanceCriteria": [
          "Arithmetic evaluates correctly",
          "Division by zero errors with a line",
          "An undefined variable errors"
        ],
        "tests": [
          "Evaluate 1 + 2 * 3",
          "Evaluate 1 / 0",
          "Evaluate an undefined variable"
        ]
      },
      {
        "id": "proj-compiler-interpreter-m5",
        "order": 5,
        "title": "Variables, control flow and functions",
        "objectives": [
          "Implement scopes",
          "Add if and while",
          "Add functions with recursion"
        ],
        "instructions": "Add environments with lexical scoping, if and while statements, and function definitions that capture their environment as closures. Verify recursion works with a fibonacci program.",
        "concepts": [
          "Scoping",
          "Closures",
          "Recursion"
        ],
        "hints": [
          "Chain environments for scopes.",
          "Capture the defining environment in closures.",
          "Return values unwind correctly."
        ],
        "acceptanceCriteria": [
          "Variables shadow correctly",
          "While loops work",
          "Recursive fibonacci returns 55 for fib(10)"
        ],
        "tests": [
          "Run a shadowing test",
          "Run a while loop",
          "Run fib(10)"
        ]
      },
      {
        "id": "proj-compiler-interpreter-m6",
        "order": 6,
        "title": "REPL and examples",
        "objectives": [
          "Build the REPL",
          "Run example programs",
          "Handle multi-line input"
        ],
        "instructions": "Build the REPL that reads a line, evaluates it, and prints the result, keeping variables between lines. Run the example programs from files and confirm the outputs.",
        "concepts": [
          "REPL",
          "Interactive tools",
          "File execution"
        ],
        "hints": [
          "Keep one environment for the REPL session.",
          "Print expression values.",
          "Support running a file as well as the REPL."
        ],
        "acceptanceCriteria": [
          "The REPL keeps variables",
          "Example programs run",
          "Files execute correctly"
        ],
        "tests": [
          "Use the REPL interactively",
          "Run fib.mini",
          "Run fizzbuzz.mini"
        ]
      },
      {
        "id": "proj-compiler-interpreter-m7",
        "order": 7,
        "title": "Bytecode compiler (optional stretch)",
        "objectives": [
          "Compile the AST to bytecode",
          "Build a stack VM",
          "Run programs on the VM"
        ],
        "instructions": "As a stretch goal, add a bytecode compiler that turns the AST into instructions and a small stack-based virtual machine that executes them. The same example programs must run on both the interpreter and the VM.",
        "concepts": [
          "Bytecode",
          "Virtual machines",
          "Compilers"
        ],
        "hints": [
          "Start with expressions only.",
          "Use a simple instruction set.",
          "Keep the VM small."
        ],
        "acceptanceCriteria": [
          "The VM runs the examples",
          "Outputs match the interpreter",
          "The VM is tested"
        ],
        "tests": [
          "Run fib.mini on the VM",
          "Compare outputs",
          "Run the VM tests"
        ]
      },
      {
        "id": "proj-compiler-interpreter-m8",
        "order": 8,
        "title": "Testing and documentation",
        "objectives": [
          "Write interpreter tests",
          "Test error cases",
          "Finish the documentation"
        ],
        "instructions": "Write tests for the lexer, parser and interpreter covering expressions, precedence, scopes, recursion and every error case. Finish the README and GRAMMAR.md with examples.",
        "concepts": [
          "Testing",
          "Documentation",
          "Language reference"
        ],
        "hints": [
          "Test one feature at a time.",
          "Test every error message.",
          "Show example programs in the docs."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Error cases are covered",
          "The docs are complete"
        ],
        "tests": [
          "Run the test suite",
          "Run the examples",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Recursion works",
      "Errors name the line",
      "Precedence is correct",
      "The REPL works",
      "Tests cover the pipeline",
      "The grammar is documented"
    ],
    "finalAssessment": [
      "Run fib(10) and show 55",
      "Run fizzbuzz",
      "Show a syntax error with a line number",
      "Use the REPL",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-mini-database",
    "slug": "mini-database",
    "level": 4,
    "title": "Mini Database",
    "description": "Build a small relational database engine from scratch: a SQL parser, a storage engine with pages, a B-tree index, transactions with write-ahead logging, and a query executor. It must survive a crash without losing committed data.",
    "skills": [
      "Rust",
      "Go",
      "C",
      "Databases",
      "B-trees",
      "WAL",
      "Transactions"
    ],
    "language": "rust",
    "functionalRequirements": [
      "Parse a subset of SQL (CREATE TABLE, INSERT, SELECT, UPDATE, DELETE)",
      "Store rows in fixed-size pages on disk",
      "Index primary keys with a B-tree",
      "Execute SELECT with WHERE, ORDER BY and LIMIT",
      "Support transactions with commit and rollback",
      "Write a write-ahead log and recover from it after a crash",
      "Support simple joins between two tables",
      "Provide a command-line shell for interactive queries"
    ],
    "nonFunctionalRequirements": [
      "Committed data survives a killed process",
      "Uncommitted data is rolled back on recovery",
      "Indexed lookups are faster than full scans",
      "The SQL subset works as documented",
      "The shell is usable interactively"
    ],
    "architecture": "The database is built in layers: a SQL parser producing a small AST, a planner that picks index scans or full scans, a storage engine that manages fixed-size pages in a file with a page cache, a B-tree for primary key indexes, and a transaction manager with a write-ahead log. Recovery replays the log on startup. The shell reads SQL lines and prints result tables.",
    "databaseSchema": "",
    "apis": [
      "No external API; the interface is the command-line shell and SQL files."
    ],
    "fileStructure": "minidb/\n  Cargo.toml\n  src/\n    main.rs\n    sql/\n      lexer.rs\n      parser.rs\n      ast.rs\n    storage/\n      pager.rs\n      btree.rs\n      page.rs\n    tx/\n      wal.rs\n      transaction.rs\n    exec/\n      executor.rs\n      planner.rs\n    shell.rs\n  tests/\n    db_tests.rs\n  README.md",
    "taskBreakdown": [
      "Design the SQL subset and storage format",
      "Implement the page store",
      "Implement the B-tree",
      "Implement the SQL parser",
      "Implement the executor",
      "Add transactions and WAL",
      "Add crash recovery",
      "Write tests and document"
    ],
    "milestones": [
      {
        "id": "proj-mini-database-m1",
        "order": 1,
        "title": "Design and page store",
        "objectives": [
          "Design the page format",
          "Implement the pager",
          "Read and write pages"
        ],
        "instructions": "Design a fixed-size page format (4 KB pages with a header and row slots) and implement a pager that reads and writes pages to a file with an in-memory cache. Verify a page written to disk reads back identically.",
        "concepts": [
          "Storage engines",
          "Pages",
          "Caching"
        ],
        "hints": [
          "Use a fixed page size.",
          "Cache pages in memory.",
          "Flush dirty pages on checkpoint."
        ],
        "acceptanceCriteria": [
          "Pages round-trip correctly",
          "The cache works",
          "The file grows by pages"
        ],
        "tests": [
          "Write and read a page",
          "Check the file size",
          "Test the cache"
        ]
      },
      {
        "id": "proj-mini-database-m2",
        "order": 2,
        "title": "B-tree index",
        "objectives": [
          "Implement B-tree insert",
          "Implement point lookups",
          "Handle splits"
        ],
        "instructions": "Implement a B-tree over pages supporting insert, point lookup and range scan, with node splits when a node fills. Test with thousands of keys and verify lookups are correct.",
        "concepts": [
          "B-trees",
          "Indexes",
          "Splits"
        ],
        "hints": [
          "Start with a simple B-tree and grow it.",
          "Split full nodes on insert.",
          "Test with random key orders."
        ],
        "acceptanceCriteria": [
          "Inserts and lookups work",
          "Splits keep the tree balanced",
          "Range scans return ordered keys"
        ],
        "tests": [
          "Insert 10,000 keys",
          "Look up random keys",
          "Scan a range"
        ]
      },
      {
        "id": "proj-mini-database-m3",
        "order": 3,
        "title": "SQL parser",
        "objectives": [
          "Parse CREATE TABLE and INSERT",
          "Parse SELECT with WHERE",
          "Report syntax errors"
        ],
        "instructions": "Implement a SQL lexer and parser for the documented subset: CREATE TABLE, INSERT, SELECT with WHERE, ORDER BY and LIMIT, UPDATE and DELETE. Syntax errors name the problem.",
        "concepts": [
          "SQL parsing",
          "AST",
          "Error reporting"
        ],
        "hints": [
          "Keep the grammar small.",
          "Build a small AST per statement.",
          "Report the failing token."
        ],
        "acceptanceCriteria": [
          "Statements parse correctly",
          "WHERE clauses parse",
          "Bad SQL errors clearly"
        ],
        "tests": [
          "Parse a CREATE TABLE",
          "Parse a SELECT with WHERE",
          "Parse bad SQL"
        ]
      },
      {
        "id": "proj-mini-database-m4",
        "order": 4,
        "title": "Executor and planner",
        "objectives": [
          "Execute table scans",
          "Use the index for lookups",
          "Implement WHERE, ORDER BY, LIMIT"
        ],
        "instructions": "Implement the executor that runs queries: full scans, index lookups for equality on the primary key, filtering by WHERE, sorting for ORDER BY and LIMIT. Add a simple planner that chooses the index when the WHERE clause allows it.",
        "concepts": [
          "Query execution",
          "Planning",
          "Index selection"
        ],
        "hints": [
          "Use the index for primary key equality.",
          "Filter rows after fetching.",
          "Sort only when ORDER BY is present."
        ],
        "acceptanceCriteria": [
          "SELECT returns correct rows",
          "Index lookups are used",
          "ORDER BY and LIMIT work"
        ],
        "tests": [
          "Run a SELECT with WHERE",
          "Check the plan uses the index",
          "Test ORDER BY and LIMIT"
        ]
      },
      {
        "id": "proj-mini-database-m5",
        "order": 5,
        "title": "Transactions",
        "objectives": [
          "BEGIN, COMMIT and ROLLBACK",
          "Isolate uncommitted data",
          "Handle concurrent transactions simply"
        ],
        "instructions": "Add transactions: BEGIN starts one, COMMIT applies it, ROLLBACK discards it. Uncommitted changes must not be visible to other connections. Use a simple locking approach and document its limits.",
        "concepts": [
          "Transactions",
          "Isolation",
          "Locking"
        ],
        "hints": [
          "Buffer writes in the transaction.",
          "Apply them on commit.",
          "Discard them on rollback."
        ],
        "acceptanceCriteria": [
          "Commit persists data",
          "Rollback discards it",
          "Uncommitted data is invisible"
        ],
        "tests": [
          "Begin, insert, commit",
          "Begin, insert, rollback",
          "Check visibility from another shell"
        ]
      },
      {
        "id": "proj-mini-database-m6",
        "order": 6,
        "title": "Write-ahead log",
        "objectives": [
          "Write every change to the WAL",
          "Flush the WAL before data pages",
          "Replay on startup"
        ],
        "instructions": "Implement the write-ahead log: every change is appended to the log and flushed before the corresponding data page is written. On startup, replay the log to restore committed transactions.",
        "concepts": [
          "WAL",
          "Durability",
          "Recovery"
        ],
        "hints": [
          "Flush the log before the data.",
          "Record transaction boundaries.",
          "Replay in order on startup."
        ],
        "acceptanceCriteria": [
          "Committed data survives a kill",
          "Uncommitted data is lost",
          "Recovery replays correctly"
        ],
        "tests": [
          "Commit, kill the process, restart",
          "Check the data is there",
          "Test an uncommitted transaction"
        ]
      },
      {
        "id": "proj-mini-database-m7",
        "order": 7,
        "title": "Joins and the shell",
        "objectives": [
          "Implement a simple join",
          "Build the interactive shell",
          "Format result tables"
        ],
        "instructions": "Add a nested-loop join for SELECTs across two tables and an interactive shell that reads SQL, runs it, and prints result tables. Support .tables and .exit commands in the shell.",
        "concepts": [
          "Joins",
          "Shells",
          "Formatting"
        ],
        "hints": [
          "Start with nested-loop joins.",
          "Print aligned tables.",
          "Keep shell commands dot-prefixed."
        ],
        "acceptanceCriteria": [
          "Joins return correct rows",
          "The shell works interactively",
          "Tables are formatted"
        ],
        "tests": [
          "Run a join query",
          "Use the shell",
          "Check .tables output"
        ]
      },
      {
        "id": "proj-mini-database-m8",
        "order": 8,
        "title": "Crash tests and documentation",
        "objectives": [
          "Write crash tests",
          "Test recovery thoroughly",
          "Document the engine"
        ],
        "instructions": "Write tests for the B-tree, executor, transactions and recovery, including a crash test that kills the process mid-transaction. Document the SQL subset, the storage format and the recovery guarantees.",
        "concepts": [
          "Testing",
          "Crash testing",
          "Documentation"
        ],
        "hints": [
          "Kill the process at random points.",
          "Verify committed data after each kill.",
          "Document what is and is not guaranteed."
        ],
        "acceptanceCriteria": [
          "All tests pass",
          "Crash tests pass",
          "The docs are complete"
        ],
        "tests": [
          "Run the test suite",
          "Run the crash test 10 times",
          "Follow the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Committed data survives crashes",
      "B-tree lookups are correct",
      "Transactions isolate properly",
      "Joins work",
      "Crash tests pass",
      "The docs are complete"
    ],
    "finalAssessment": [
      "Create a table and insert rows",
      "Run a join query",
      "Kill the process and show recovery",
      "Show an indexed lookup",
      "Show the test suite passing"
    ]
  },
  {
    "id": "proj-capstone",
    "slug": "capstone-project",
    "level": 4,
    "title": "Capstone Project",
    "description": "The capstone: design, build and deploy a complete product of your choice that combines everything learned \u2014 a real backend, a real frontend, authentication, a database, tests, and deployment. You will scope it, plan it, build it in milestones, and present it as a portfolio piece.",
    "skills": [
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "Testing",
      "Deployment",
      "Product design"
    ],
    "language": "typescript",
    "functionalRequirements": [
      "A written product proposal with scope and milestones",
      "A working backend with authentication and a database",
      "A working frontend that uses the backend",
      "Automated tests covering the critical paths",
      "A deployment that is reachable and documented",
      "A README a stranger could use to run the product",
      "A demo video or live walkthrough",
      "A retrospective on what worked and what did not"
    ],
    "nonFunctionalRequirements": [
      "The product solves a real problem for a real user",
      "The deployed version works end to end",
      "Tests cover the critical paths",
      "The README lets a stranger run it",
      "The scope was finished, not just started"
    ],
    "architecture": "The capstone follows a real product process: propose the idea, write the scope and the milestones, build the backend and frontend in vertical slices, test as you go, deploy early, and iterate. The architecture is yours to choose, but it must include a database, authentication, and automated tests. The final deliverable is the deployed product plus a portfolio write-up.",
    "databaseSchema": "",
    "apis": [
      "Defined by the student project; documented in the proposal."
    ],
    "fileStructure": "capstone/\n  proposal.md\n  backend/\n    package.json\n    src/\n  frontend/\n    package.json\n    src/\n  docker-compose.yml\n  README.md\n  RETROSPECTIVE.md",
    "taskBreakdown": [
      "Write the proposal and scope",
      "Design the data model and API",
      "Build the backend foundation",
      "Build the first vertical slice end to end",
      "Build the remaining features",
      "Add tests and harden the product",
      "Deploy and document",
      "Present and retrospect"
    ],
    "milestones": [
      {
        "id": "proj-capstone-m1",
        "order": 1,
        "title": "Proposal and scope",
        "objectives": [
          "Choose a real problem",
          "Write the proposal",
          "Define the milestones"
        ],
        "instructions": "Pick a product that solves a real problem for a real user, write a one-page proposal with the problem, the users, the features and the non-goals, and break the work into dated milestones. Get the scope reviewed before writing code.",
        "concepts": [
          "Product scoping",
          "Proposals",
          "Planning"
        ],
        "hints": [
          "Cut scope until it fits the time available.",
          "Write down the non-goals explicitly.",
          "Get a second opinion on the scope."
        ],
        "acceptanceCriteria": [
          "The proposal is written",
          "The scope fits the timeline",
          "Non-goals are listed"
        ],
        "tests": [
          "Read the proposal aloud",
          "Check the milestones are dated",
          "Confirm the non-goals"
        ]
      },
      {
        "id": "proj-capstone-m2",
        "order": 2,
        "title": "Data model and API design",
        "objectives": [
          "Design the schema",
          "Design the API contract",
          "Choose the stack"
        ],
        "instructions": "Design the database schema and the API contract, and record the stack choices with reasons. Set up the repository, the backend and frontend projects, and the compose file.",
        "concepts": [
          "Data modelling",
          "API design",
          "Architecture"
        ],
        "hints": [
          "Design the schema before coding.",
          "Write the API contract first.",
          "Record why you chose each tool."
        ],
        "acceptanceCriteria": [
          "The schema is designed",
          "The API contract is written",
          "The projects are set up"
        ],
        "tests": [
          "Review the schema",
          "Review the API contract",
          "Start both parts"
        ]
      },
      {
        "id": "proj-capstone-m3",
        "order": 3,
        "title": "Backend foundation",
        "objectives": [
          "Set up auth and the database",
          "Add migrations",
          "Build the first endpoints"
        ],
        "instructions": "Build the backend foundation: authentication, the database with migrations, and the first resource endpoints with tests. Verify the API with curl before building the UI.",
        "concepts": [
          "Backend",
          "Auth",
          "Migrations"
        ],
        "hints": [
          "Build auth first.",
          "Test every endpoint.",
          "Keep the foundation boring and solid."
        ],
        "acceptanceCriteria": [
          "Auth works",
          "Migrations run",
          "The first endpoints work"
        ],
        "tests": [
          "Register and log in",
          "Check the migrations",
          "curl the endpoints"
        ]
      },
      {
        "id": "proj-capstone-m4",
        "order": 4,
        "title": "First vertical slice",
        "objectives": [
          "Build one feature end to end",
          "Wire the frontend to the API",
          "Deploy early"
        ],
        "instructions": "Build the first complete feature from database to UI, wire the frontend to the API, and deploy it. A deployed slice early de-risks the whole project.",
        "concepts": [
          "Vertical slices",
          "Integration",
          "Deployment"
        ],
        "hints": [
          "Ship one feature fully before starting the next.",
          "Deploy now, not at the end.",
          "Test the deployed version."
        ],
        "acceptanceCriteria": [
          "One feature works end to end",
          "The deployment is live",
          "The slice is tested"
        ],
        "tests": [
          "Use the feature in the browser",
          "Check the deployed version",
          "Run the tests"
        ]
      },
      {
        "id": "proj-capstone-m5",
        "order": 5,
        "title": "Remaining features",
        "objectives": [
          "Build the rest of the features",
          "Keep the tests green",
          "Track progress against milestones"
        ],
        "instructions": "Build the remaining features one slice at a time, keeping the tests green and checking progress against the milestone plan. Cut scope if you fall behind rather than shipping broken features.",
        "concepts": [
          "Feature delivery",
          "Scope management",
          "Testing"
        ],
        "hints": [
          "One slice at a time.",
          "Cut scope, never quality.",
          "Update the milestone plan weekly."
        ],
        "acceptanceCriteria": [
          "All planned features work",
          "Tests stay green",
          "The plan is up to date"
        ],
        "tests": [
          "Use every feature",
          "Run the test suite",
          "Review the milestone plan"
        ]
      },
      {
        "id": "proj-capstone-m6",
        "order": 6,
        "title": "Testing and hardening",
        "objectives": [
          "Cover the critical paths",
          "Fix bugs found",
          "Review security basics"
        ],
        "instructions": "Add tests for the critical paths, fix the bugs you find, and review security basics: authentication, authorization, validation, rate limiting and secrets handling. Record the coverage.",
        "concepts": [
          "Testing",
          "Security review",
          "Hardening"
        ],
        "hints": [
          "Test the critical paths first.",
          "Check every endpoint for auth.",
          "Move secrets to the environment."
        ],
        "acceptanceCriteria": [
          "Critical paths are tested",
          "Auth is enforced everywhere",
          "No secrets are in the code"
        ],
        "tests": [
          "Run the test suite with coverage",
          "Try unauthenticated access",
          "Search the code for secrets"
        ]
      },
      {
        "id": "proj-capstone-m7",
        "order": 7,
        "title": "Deployment and documentation",
        "objectives": [
          "Deploy the product",
          "Write the README",
          "Record a demo"
        ],
        "instructions": "Deploy the product, write a README a stranger could follow to run it, and record a short demo video or live walkthrough showing the product solving the original problem.",
        "concepts": [
          "Deployment",
          "Documentation",
          "Demos"
        ],
        "hints": [
          "Document every step to run it.",
          "Test the README from scratch.",
          "Show the real problem being solved."
        ],
        "acceptanceCriteria": [
          "The product is deployed",
          "The README works from scratch",
          "The demo is recorded"
        ],
        "tests": [
          "Follow the README on a clean machine",
          "Use the deployed product",
          "Watch the demo"
        ]
      },
      {
        "id": "proj-capstone-m8",
        "order": 8,
        "title": "Presentation and retrospective",
        "objectives": [
          "Present the product",
          "Write the retrospective",
          "Publish the portfolio piece"
        ],
        "instructions": "Present the product, write a retrospective covering what worked, what did not, and what you would do differently, and publish the project as a portfolio piece with the proposal, the README and the demo.",
        "concepts": [
          "Presentation",
          "Retrospectives",
          "Portfolios"
        ],
        "hints": [
          "Be honest about the failures.",
          "Quantify what you built.",
          "Link the live product."
        ],
        "acceptanceCriteria": [
          "The presentation is given",
          "The retrospective is written",
          "The portfolio piece is published"
        ],
        "tests": [
          "Give the presentation",
          "Read the retrospective",
          "Check the portfolio links"
        ]
      }
    ],
    "reviewChecklist": [
      "The product is deployed and works",
      "Tests cover the critical paths",
      "The README works from scratch",
      "The scope was delivered",
      "The retrospective is honest",
      "The portfolio piece is complete"
    ],
    "finalAssessment": [
      "Present the product live",
      "Show the deployed version",
      "Walk through the README",
      "Show the test suite",
      "Share the retrospective"
    ]
  }
];
