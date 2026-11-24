import type { Project } from '../types.js';

export const PROJECTS_INDUSTRY: Project[] = [
  {
    "id": "proj-portfolio-interactive-quiz-app",
    "slug": "interactive-quiz-app",
    "level": 2,
    "title": "Interactive Quiz App",
    "description": "Build a browser quiz app: pick a category, answer timed multiple-choice questions with instant feedback, and see a results screen with a score breakdown and review. It covers the core frontend skills — state, timers, rendering, and persistence — in a polished app you can demo in any browser.",
    "skills": [
      "JavaScript",
      "DOM manipulation",
      "State management",
      "Timers",
      "LocalStorage",
      "CSS",
      "Accessibility",
      "Testing"
    ],
    "language": "javascript",
    "functionalRequirements": [
      "Let the user pick a quiz category and difficulty",
      "Show one question at a time with four options and a 30-second timer",
      "Give instant feedback: correct answers turn green, wrong ones red",
      "Show a progress bar and the current question number",
      "Show a results screen with the score, time taken and per-question review",
      "Save the best score per category in localStorage",
      "Shuffle the question and answer order on every attempt",
      "Work with the keyboard: number keys select an answer"
    ],
    "nonFunctionalRequirements": [
      "The timer stops when an answer is chosen",
      "The correct answer is always shown after a wrong one",
      "The best score survives a page reload",
      "The app is usable with a keyboard alone"
    ],
    "architecture": "A single-page app with no build step: an index.html shell, a CSS file, and a JavaScript module holding the question bank, a small state machine (menu, question, feedback, results), and rendering functions that rebuild only the question area. State is kept in one object and persisted with localStorage.",
    "databaseSchema": "",
    "fileStructure": "interactive-quiz-app/\n  index.html\n  styles.css\n  app.js\n  questions.js\n  README.md",
    "taskBreakdown": [
      "Design the question bank format",
      "Build the menu and category picker",
      "Implement the question screen with timer",
      "Add instant feedback and progress",
      "Build the results screen and review",
      "Add best-score persistence",
      "Polish styling and accessibility",
      "Test in the browser and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-interactive-quiz-app-m1",
        "order": 1,
        "title": "Question bank and menu",
        "objectives": [
          "Define the question format",
          "Build the category menu",
          "Show best scores"
        ],
        "instructions": "Create questions.js with at least 30 questions across three categories, each with a question, four options and the correct answer index. Build the menu screen listing the categories with their best scores from localStorage, and start a quiz on click.",
        "concepts": [
          "Data modelling",
          "DOM rendering",
          "localStorage"
        ],
        "hints": [
          "Keep the question bank in its own file.",
          "Shuffle a copy, never the original bank.",
          "Read best scores defensively; a corrupt value means no best score."
        ],
        "acceptanceCriteria": [
          "The menu lists three categories",
          "Best scores show after a completed quiz",
          "Starting a quiz shows the first question"
        ],
        "tests": [
          "Open the app and check the menu",
          "Complete a quiz and return to the menu",
          "Clear localStorage and reload"
        ]
      },
      {
        "id": "proj-portfolio-interactive-quiz-app-m2",
        "order": 2,
        "title": "Question screen and timer",
        "objectives": [
          "Show one question with four options",
          "Run a 30-second timer",
          "Handle a timeout as a wrong answer"
        ],
        "instructions": "Implement the question screen: the question text, four option buttons, the question counter and a progress bar. Start a 30-second countdown per question that updates the display; when it reaches zero, mark the question wrong and show the correct answer.",
        "concepts": [
          "Timers",
          "Progress indicators",
          "State updates"
        ],
        "hints": [
          "Clear the timer when the question changes.",
          "A timeout counts as wrong but still shows the answer.",
          "Disable the options after an answer."
        ],
        "acceptanceCriteria": [
          "The timer counts down from 30",
          "A timeout marks the question wrong",
          "Options are disabled after answering"
        ],
        "tests": [
          "Answer a question and watch the timer stop",
          "Let the timer run out",
          "Check the progress bar advances"
        ]
      },
      {
        "id": "proj-portfolio-interactive-quiz-app-m3",
        "order": 3,
        "title": "Feedback and results",
        "objectives": [
          "Show instant feedback",
          "Track the score",
          "Build the results screen with review"
        ],
        "instructions": "Implement feedback: colour the chosen option green or red and highlight the correct answer, then show a Next button. After the last question, render the results screen with the score, the time taken, and a review list of every question with the user's answer and the correct answer.",
        "concepts": [
          "Feedback design",
          "Results screens",
          "Review lists"
        ],
        "hints": [
          "Show the correct answer even when the user was right.",
          "Record the time taken from start to finish.",
          "The review must show every question."
        ],
        "acceptanceCriteria": [
          "A correct answer turns green",
          "A wrong answer shows the correct one",
          "The results screen lists every question"
        ],
        "tests": [
          "Answer one right and one wrong",
          "Finish a quiz and check the review",
          "Check the time taken is shown"
        ]
      },
      {
        "id": "proj-portfolio-interactive-quiz-app-m4",
        "order": 4,
        "title": "Persistence, keyboard and polish",
        "objectives": [
          "Save best scores",
          "Add keyboard support",
          "Polish and document"
        ],
        "instructions": "Save the best score per category at the end of a quiz and show it on the menu. Add keyboard support so keys 1-4 select an answer and Enter moves on. Add focus styles, an accessible label for the timer, and finish the README with how to run and extend the app.",
        "concepts": [
          "Persistence",
          "Keyboard accessibility",
          "Focus styles"
        ],
        "hints": [
          "Only overwrite the best score when the new one is higher.",
          "Make the timer readable by screen readers.",
          "Test with the keyboard alone."
        ],
        "acceptanceCriteria": [
          "The best score survives a reload",
          "Keys 1-4 select answers",
          "The README explains how to add questions"
        ],
        "tests": [
          "Complete a quiz twice and check the best score",
          "Play a full quiz by keyboard",
          "Add a question to the bank and play it"
        ]
      }
    ],
    "reviewChecklist": [
      "The timer stops on answer and on timeout",
      "The correct answer is always revealed",
      "Best scores persist across reloads",
      "The app works by keyboard alone",
      "Question and answer order shuffle each attempt"
    ],
    "finalAssessment": [
      "Play a full quiz in the browser",
      "Show the timer and feedback",
      "Show the results screen and review",
      "Reload and show the best score",
      "Play a quiz by keyboard only"
    ],
    "portfolio": true,
    "apis": [
      "Web: open index.html in a browser; no server needed"
    ]
  },
  {
    "id": "proj-portfolio-weather-forecast-app",
    "slug": "weather-forecast-app",
    "level": 2,
    "title": "Weather Forecast App",
    "description": "Build a weather app that fetches live data from a public API: search for a city, see the current conditions and a 5-day forecast, save favourite cities, and switch between Celsius and Fahrenheit. It teaches the full API-driven frontend pattern — fetching, loading states, errors, and caching — in an app that looks and feels real.",
    "skills": [
      "JavaScript",
      "Fetch API",
      "Async and await",
      "DOM manipulation",
      "LocalStorage",
      "Error handling",
      "CSS",
      "Testing"
    ],
    "language": "javascript",
    "functionalRequirements": [
      "Search for a city by name and show its current weather",
      "Show a 5-day forecast with daily highs, lows and icons",
      "Save favourite cities and load them from a list",
      "Switch between Celsius and Fahrenheit",
      "Show a loading state while fetching",
      "Show a clear error for an unknown city or a network failure",
      "Cache the last successful result per city for 10 minutes",
      "Remember the last viewed city across reloads"
    ],
    "nonFunctionalRequirements": [
      "An unknown city shows an error, never a blank screen",
      "Favourites survive a page reload",
      "A cached result is used within 10 minutes",
      "The app never shows stale data as if it were fresh"
    ],
    "architecture": "A single-page app: an index.html shell with a search box, a favourites bar and a results area; a JavaScript module that fetches from a public weather API, caches responses in memory and localStorage with timestamps, and renders the current conditions and forecast cards. All rendering goes through one render function driven by state.",
    "databaseSchema": "",
    "fileStructure": "weather-forecast-app/\n  index.html\n  styles.css\n  app.js\n  api.js\n  README.md",
    "taskBreakdown": [
      "Design the layout and state",
      "Implement the API client and caching",
      "Build the current-weather view",
      "Build the 5-day forecast",
      "Add favourites and unit switching",
      "Handle loading and error states",
      "Polish and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-weather-forecast-app-m1",
        "order": 1,
        "title": "Layout and API client",
        "objectives": [
          "Build the page layout",
          "Fetch weather for a city",
          "Handle API errors"
        ],
        "instructions": "Build the layout: a search form, a favourites bar, and a results area. Implement the API module with fetch, a timeout, and error mapping: a 404 becomes an unknown-city error and a network failure becomes a connection error. Show the raw result in the console first to confirm the shape.",
        "concepts": [
          "Fetch API",
          "Error mapping",
          "Layout"
        ],
        "hints": [
          "Use async and await with try and catch.",
          "Map HTTP errors to user-friendly messages.",
          "Log the raw response while developing."
        ],
        "acceptanceCriteria": [
          "Searching a known city returns data",
          "An unknown city shows an error message",
          "A network failure shows a connection error"
        ],
        "tests": [
          "Search for a real city",
          "Search for a nonsense city name",
          "Block the network and search"
        ]
      },
      {
        "id": "proj-portfolio-weather-forecast-app-m2",
        "order": 2,
        "title": "Current weather and forecast",
        "objectives": [
          "Render current conditions",
          "Render the 5-day forecast",
          "Show loading states"
        ],
        "instructions": "Implement rendering: the current conditions card with temperature, conditions, wind and humidity, and five forecast cards with the day, icon, high and low. Show a loading indicator while fetching and replace it with the result or the error.",
        "concepts": [
          "DOM rendering",
          "Loading states",
          "Data formatting"
        ],
        "hints": [
          "Render through one function driven by state.",
          "Show the loading state before the fetch starts.",
          "Format dates as weekday names."
        ],
        "acceptanceCriteria": [
          "Current conditions show temperature and wind",
          "Five forecast days are shown",
          "A loading indicator appears during fetch"
        ],
        "tests": [
          "Search and watch the loading state",
          "Check all five forecast days appear",
          "Check the dates are weekday names"
        ]
      },
      {
        "id": "proj-portfolio-weather-forecast-app-m3",
        "order": 3,
        "title": "Caching, favourites and units",
        "objectives": [
          "Cache results for 10 minutes",
          "Save favourite cities",
          "Switch units"
        ],
        "instructions": "Implement the cache: store each successful result with a timestamp in localStorage and reuse it within 10 minutes. Add favourites: a star button saves the current city and a favourites bar loads it on click. Add a Celsius/Fahrenheit toggle that converts the displayed values.",
        "concepts": [
          "Caching",
          "localStorage",
          "Unit conversion"
        ],
        "hints": [
          "Store the fetch time with each cached result.",
          "Convert temperatures in one function.",
          "Favourites must survive a reload."
        ],
        "acceptanceCriteria": [
          "A repeat search within 10 minutes uses the cache",
          "A favourite survives a reload",
          "Switching units converts every temperature"
        ],
        "tests": [
          "Search twice and check the network",
          "Add a favourite, reload, and click it",
          "Toggle units and check the forecast"
        ]
      },
      {
        "id": "proj-portfolio-weather-forecast-app-m4",
        "order": 4,
        "title": "Polish, tests and docs",
        "objectives": [
          "Remember the last city",
          "Add keyboard search",
          "Document the app"
        ],
        "instructions": "Remember the last viewed city and load it on startup. Make the search work with Enter and add labels for accessibility. Write a small test page or manual test checklist covering search, errors, caching, favourites and units, and finish the README with setup and the API used.",
        "concepts": [
          "Persistence",
          "Accessibility",
          "Documentation"
        ],
        "hints": [
          "Load the last city on startup.",
          "Test the error states, not just the happy path.",
          "Document the cache duration."
        ],
        "acceptanceCriteria": [
          "The last city loads on startup",
          "Enter submits the search",
          "The README documents the API and cache"
        ],
        "tests": [
          "Reload the page and check the last city",
          "Search with Enter only",
          "Follow the README from scratch"
        ]
      }
    ],
    "reviewChecklist": [
      "Unknown cities show a clear error",
      "Favourites and the last city survive reloads",
      "Cached results are used within 10 minutes",
      "Unit switching converts every temperature",
      "Loading states appear during every fetch"
    ],
    "finalAssessment": [
      "Search for a city and explain the display",
      "Show the 5-day forecast",
      "Add a favourite and reload",
      "Toggle units",
      "Search for an unknown city"
    ],
    "portfolio": true,
    "apis": [
      "External: GET https://api.open-meteo.example/v1/forecast?city=&days=5 — current conditions and forecast",
      "Web: open index.html in a browser"
    ]
  },
  {
    "id": "proj-portfolio-todo-app-localstorage",
    "slug": "todo-app-localstorage",
    "level": 1,
    "title": "To-Do App with Local Storage",
    "description": "Build a polished to-do app that stores tasks in the browser: add, complete, edit and delete tasks, filter by all, active or completed, and keep everything after a reload. It is the classic first frontend project, done with care — clean state handling, keyboard support, and a design that looks finished.",
    "skills": [
      "JavaScript",
      "DOM manipulation",
      "LocalStorage",
      "State management",
      "Event handling",
      "CSS",
      "Accessibility"
    ],
    "language": "javascript",
    "functionalRequirements": [
      "Add a task with the input box or the Enter key",
      "Mark tasks complete and uncomplete with a checkbox",
      "Edit a task by double-clicking it",
      "Delete a task with a button",
      "Filter the list by all, active or completed",
      "Show the count of remaining tasks",
      "Clear all completed tasks with one button",
      "Persist all tasks in localStorage across reloads"
    ],
    "nonFunctionalRequirements": [
      "Tasks survive a page reload",
      "An empty task cannot be added",
      "The remaining count is always correct",
      "The app works with a keyboard alone"
    ],
    "architecture": "A single-page app with no build step: an HTML shell, a CSS file, and one JavaScript module holding the tasks array as the single source of truth. Every change updates the state, saves it to localStorage, and re-renders the list. Rendering is a pure function of state plus the current filter.",
    "databaseSchema": "",
    "fileStructure": "todo-app-localstorage/\n  index.html\n  styles.css\n  app.js\n  README.md",
    "taskBreakdown": [
      "Build the layout and input",
      "Implement adding and rendering",
      "Add complete, edit and delete",
      "Add filters and the remaining count",
      "Add persistence",
      "Polish and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-todo-app-localstorage-m1",
        "order": 1,
        "title": "Layout, adding and rendering",
        "objectives": [
          "Build the page layout",
          "Add tasks from the input",
          "Render the task list"
        ],
        "instructions": "Build the layout with a heading, an input, an add button and an empty list. Implement adding: read the input, ignore empty text, push a task object with an id, text and completed flag, clear the input, and re-render the list.",
        "concepts": [
          "DOM manipulation",
          "Event handling",
          "Rendering"
        ],
        "hints": [
          "Give every task a unique id.",
          "Trim the input before checking it is empty.",
          "Render from state, never by editing the DOM directly."
        ],
        "acceptanceCriteria": [
          "Adding a task shows it in the list",
          "An empty task is not added",
          "The input clears after adding"
        ],
        "tests": [
          "Add three tasks",
          "Try to add an empty task",
          "Add a task with only spaces"
        ]
      },
      {
        "id": "proj-portfolio-todo-app-localstorage-m2",
        "order": 2,
        "title": "Complete, edit and delete",
        "objectives": [
          "Toggle completion",
          "Edit by double-click",
          "Delete a task"
        ],
        "instructions": "Implement the checkbox toggle that flips the completed flag and restyles the task, double-click editing that turns the text into an input and saves on Enter or blur, and a delete button per task. Every change re-renders from state.",
        "concepts": [
          "Event delegation",
          "Inline editing",
          "State updates"
        ],
        "hints": [
          "Use event delegation on the list.",
          "Save an edit on Enter and on blur, but only once.",
          "Escape task text when rendering."
        ],
        "acceptanceCriteria": [
          "Checking a task marks it complete",
          "Double-clicking edits the text",
          "Deleting removes the task"
        ],
        "tests": [
          "Complete a task and uncomplete it",
          "Edit a task's text",
          "Delete a task"
        ]
      },
      {
        "id": "proj-portfolio-todo-app-localstorage-m3",
        "order": 3,
        "title": "Filters, counts and clearing",
        "objectives": [
          "Filter by all, active and completed",
          "Show the remaining count",
          "Clear completed tasks"
        ],
        "instructions": "Implement the three filters that change which tasks render, a remaining count that updates on every change, and a clear-completed button that removes only completed tasks. The active filter is highlighted.",
        "concepts": [
          "Filtering",
          "Derived state",
          "UI state"
        ],
        "hints": [
          "Filtering changes the view, not the data.",
          "The count is derived from state on every render.",
          "Hide the clear button when nothing is completed."
        ],
        "acceptanceCriteria": [
          "Each filter shows the right tasks",
          "The remaining count is correct",
          "Clear completed removes only completed tasks"
        ],
        "tests": [
          "Add tasks, complete one, and try each filter",
          "Check the count after each change",
          "Clear completed and check the list"
        ]
      },
      {
        "id": "proj-portfolio-todo-app-localstorage-m4",
        "order": 4,
        "title": "Persistence and polish",
        "objectives": [
          "Persist tasks in localStorage",
          "Load tasks on startup",
          "Polish and document"
        ],
        "instructions": "Save the tasks array to localStorage on every change and load it on startup, handling a missing or corrupt value by starting with an empty list. Add keyboard support, focus styles and a clean visual design, and finish the README.",
        "concepts": [
          "localStorage",
          "Defensive loading",
          "Accessibility"
        ],
        "hints": [
          "Save on every change, not just on unload.",
          "Parse the stored value inside try and catch.",
          "Test with the keyboard alone."
        ],
        "acceptanceCriteria": [
          "Tasks survive a reload",
          "A corrupt stored value starts empty",
          "The app works by keyboard alone"
        ],
        "tests": [
          "Add tasks, reload, and check they remain",
          "Corrupt the stored value and reload",
          "Use the app by keyboard only"
        ]
      }
    ],
    "reviewChecklist": [
      "Tasks survive a reload",
      "Empty tasks cannot be added",
      "The remaining count is always correct",
      "Filters change the view, not the data",
      "Task text is escaped when rendered"
    ],
    "finalAssessment": [
      "Add, complete, edit and delete tasks",
      "Try each filter",
      "Reload and show the tasks persisted",
      "Demonstrate the remaining count",
      "Use the app by keyboard only"
    ],
    "portfolio": true,
    "apis": [
      "Web: open index.html in a browser; no server needed"
    ]
  },
  {
    "id": "proj-portfolio-memory-card-game",
    "slug": "memory-card-game",
    "level": 2,
    "title": "Memory Card Matching Game",
    "description": "Build a memory matching game: a grid of face-down cards, flip two to find a pair, track moves and time, and celebrate a win with a summary screen. It covers game state, timers, shuffling, and delightful feedback — and it is genuinely fun to play and demo.",
    "skills": [
      "JavaScript",
      "DOM manipulation",
      "Game state",
      "Timers",
      "CSS animations",
      "Shuffling",
      "LocalStorage"
    ],
    "language": "javascript",
    "functionalRequirements": [
      "Show a grid of face-down cards in pairs",
      "Flip a card on click with a flip animation",
      "Keep a matched pair face-up; flip a non-match back after 1 second",
      "Track moves and elapsed time",
      "Offer three difficulties: 8, 12 or 18 pairs",
      "Show a win screen with moves, time and best score",
      "Save the best score per difficulty in localStorage",
      "Add a restart button and a new-game shuffle"
    ],
    "nonFunctionalRequirements": [
      "Only two cards can be face-up at once",
      "A matched pair never flips back",
      "The board is shuffled differently every game",
      "The win screen appears only when all pairs are found"
    ],
    "architecture": "A single-page app: an HTML shell with a header showing moves and time, a grid container, and a win overlay; a JavaScript module holding the game state (cards, flipped cards, matched pairs, moves, timer) and functions to build the deck, shuffle it, handle flips and detect the win. Cards are rendered as buttons with a CSS flip animation.",
    "databaseSchema": "",
    "fileStructure": "memory-card-game/\n  index.html\n  styles.css\n  app.js\n  README.md",
    "taskBreakdown": [
      "Design the deck and layout",
      "Implement the grid and flip animation",
      "Implement matching logic",
      "Add moves, timer and difficulties",
      "Add the win screen and best scores",
      "Polish and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-memory-card-game-m1",
        "order": 1,
        "title": "Deck, grid and flipping",
        "objectives": [
          "Build a shuffled deck",
          "Render the card grid",
          "Flip a card on click"
        ],
        "instructions": "Create the deck: for the chosen difficulty, take N symbols, duplicate each, shuffle with Fisher-Yates, and render one button per card. Clicking a face-down card flips it with a CSS transition. Clicking a face-up card does nothing.",
        "concepts": [
          "Fisher-Yates shuffle",
          "CSS transitions",
          "Event handling"
        ],
        "hints": [
          "Shuffle a copy of the deck.",
          "Use buttons so cards are keyboard accessible.",
          "Ignore clicks while two cards are already flipped."
        ],
        "acceptanceCriteria": [
          "The grid shows the right number of cards",
          "Clicking flips a card",
          "The deck is shuffled differently each game"
        ],
        "tests": [
          "Start a game and count the cards",
          "Flip a card and flip it back by clicking again is not possible",
          "Start two games and compare the layouts"
        ]
      },
      {
        "id": "proj-portfolio-memory-card-game-m2",
        "order": 2,
        "title": "Matching logic",
        "objectives": [
          "Keep matching pairs face-up",
          "Flip non-matches back after 1 second",
          "Prevent a third flip"
        ],
        "instructions": "Implement the match check: when two cards are face-up, compare their symbols. On a match, mark both as matched and leave them up; on a mismatch, wait 1 second and flip both back. While waiting, ignore further clicks.",
        "concepts": [
          "Game state",
          "Timers",
          "State guards"
        ],
        "hints": [
          "Lock the board during the 1-second wait.",
          "Compare symbols, not card positions.",
          "Count a move when the second card is flipped."
        ],
        "acceptanceCriteria": [
          "A matching pair stays face-up",
          "A non-match flips back after 1 second",
          "No third card can flip during the wait"
        ],
        "tests": [
          "Find a matching pair",
          "Flip two different cards and watch them flip back",
          "Click rapidly during the wait"
        ]
      },
      {
        "id": "proj-portfolio-memory-card-game-m3",
        "order": 3,
        "title": "Moves, timer and difficulties",
        "objectives": [
          "Count moves",
          "Run a timer from the first flip",
          "Offer three difficulties"
        ],
        "instructions": "Add a moves counter that increments per pair attempt and a timer that starts on the first flip and stops on the win. Add difficulty buttons for 8, 12 and 18 pairs that rebuild the board, and show the current difficulty in the header.",
        "concepts": [
          "Timers",
          "Counters",
          "Difficulty levels"
        ],
        "hints": [
          "Start the timer on the first flip, not on page load.",
          "Stop the timer on the win.",
          "Rebuilding the board resets moves and time."
        ],
        "acceptanceCriteria": [
          "Moves increment per pair attempt",
          "The timer starts on the first flip",
          "Each difficulty builds the right grid size"
        ],
        "tests": [
          "Play and watch the moves and timer",
          "Switch difficulty mid-game",
          "Check the grid size for each difficulty"
        ]
      },
      {
        "id": "proj-portfolio-memory-card-game-m4",
        "order": 4,
        "title": "Win screen, best scores and polish",
        "objectives": [
          "Detect the win",
          "Show a summary screen",
          "Save best scores per difficulty"
        ],
        "instructions": "Detect the win when all pairs are matched, stop the timer, and show an overlay with the moves, time and best score for the difficulty, updating the best score when beaten. Add a play-again button that starts a fresh shuffled game, and finish the README.",
        "concepts": [
          "Win detection",
          "Overlays",
          "Persistence"
        ],
        "hints": [
          "Only update the best score when the new result is better.",
          "Show moves and time on the win screen.",
          "Play again must reshuffle."
        ],
        "acceptanceCriteria": [
          "The win screen appears on the last match",
          "The best score updates when beaten",
          "Play again starts a fresh board"
        ],
        "tests": [
          "Win a game on the easy difficulty",
          "Win again faster and check the best score",
          "Play again and check the shuffle"
        ]
      }
    ],
    "reviewChecklist": [
      "Only two cards are ever face-up",
      "Matched pairs never flip back",
      "The board shuffles every game",
      "The timer starts on the first flip",
      "Best scores are stored per difficulty"
    ],
    "finalAssessment": [
      "Play a game in the browser",
      "Show a match and a mismatch",
      "Show the moves and timer",
      "Win a game and show the summary",
      "Switch difficulty and play again"
    ],
    "portfolio": true,
    "apis": [
      "Web: open index.html in a browser; no server needed"
    ]
  },
  {
    "id": "proj-portfolio-expense-dashboard",
    "slug": "expense-dashboard",
    "level": 2,
    "title": "Personal Finance Dashboard",
    "description": "Build a finance dashboard in the browser: add income and expenses, see the balance, a monthly spending chart, and category breakdowns, all stored locally. It combines forms, tables, charts drawn with SVG, and local persistence into one dashboard that looks like a real product.",
    "skills": [
      "JavaScript",
      "DOM manipulation",
      "SVG charts",
      "LocalStorage",
      "Data aggregation",
      "Forms",
      "CSS"
    ],
    "language": "javascript",
    "functionalRequirements": [
      "Add income and expense entries with amount, category and date",
      "Show the current balance, total income and total spending",
      "Show a monthly spending bar chart drawn with SVG",
      "Show spending by category with percentages",
      "List recent transactions with edit and delete",
      "Filter transactions by month and category",
      "Persist all data in localStorage",
      "Set a monthly budget and show progress against it"
    ],
    "nonFunctionalRequirements": [
      "The balance always equals income minus spending",
      "Category percentages sum to 100",
      "Data survives a reload",
      "Charts update immediately when a transaction changes"
    ],
    "architecture": "A single-page app: an HTML shell with summary cards, a chart area, a category breakdown and a transaction table; a JavaScript module holding the transactions array as the single source of truth, aggregation functions for monthly and category totals, an SVG chart builder, and localStorage persistence on every change.",
    "databaseSchema": "",
    "fileStructure": "expense-dashboard/\n  index.html\n  styles.css\n  app.js\n  README.md",
    "taskBreakdown": [
      "Design the layout and data model",
      "Implement adding transactions",
      "Build the summary cards and balance",
      "Add the monthly chart and category breakdown",
      "Add filtering, edit and delete",
      "Add budgets and persistence",
      "Polish and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-expense-dashboard-m1",
        "order": 1,
        "title": "Data model and adding transactions",
        "objectives": [
          "Define the transaction format",
          "Build the add form",
          "Render the transaction list"
        ],
        "instructions": "Define a transaction as an object with id, type, amount in cents, category, date and note. Build the form with validation for a positive amount and a valid date, and render the list newest first with income in green and expenses in red.",
        "concepts": [
          "Forms",
          "Validation",
          "Rendering"
        ],
        "hints": [
          "Store money as integer cents.",
          "Validate before adding.",
          "Render the list from state."
        ],
        "acceptanceCriteria": [
          "Adding a transaction shows it in the list",
          "An invalid amount is rejected",
          "Income and expenses are styled differently"
        ],
        "tests": [
          "Add an income and an expense",
          "Add a transaction with amount zero",
          "Add a transaction with a bad date"
        ]
      },
      {
        "id": "proj-portfolio-expense-dashboard-m2",
        "order": 2,
        "title": "Summary cards and balance",
        "objectives": [
          "Compute totals",
          "Show balance, income and spending",
          "Update on every change"
        ],
        "instructions": "Implement the summary: total income, total spending and the balance, computed from the transactions on every render. Verify the balance equals income minus spending after each change.",
        "concepts": [
          "Aggregation",
          "Derived state",
          "Money math"
        ],
        "hints": [
          "Compute totals from state on every render.",
          "Work in cents and format for display.",
          "The balance must update immediately."
        ],
        "acceptanceCriteria": [
          "The balance equals income minus spending",
          "Totals update after adding a transaction",
          "Totals update after deleting one"
        ],
        "tests": [
          "Add transactions and check the totals",
          "Delete a transaction and check the balance",
          "Add an expense larger than the income"
        ]
      },
      {
        "id": "proj-portfolio-expense-dashboard-m3",
        "order": 3,
        "title": "Monthly chart and categories",
        "objectives": [
          "Draw a monthly spending bar chart",
          "Show category breakdowns",
          "Add month filtering"
        ],
        "instructions": "Build an SVG bar chart of spending per month for the last six months and a category breakdown listing each category's total and share of spending. Add a month filter that narrows the transaction list and the category view.",
        "concepts": [
          "SVG charts",
          "Aggregation",
          "Filtering"
        ],
        "hints": [
          "Scale the chart to the largest month.",
          "Category shares must sum to 100.",
          "Filtering changes the view, not the data."
        ],
        "acceptanceCriteria": [
          "The chart shows six months",
          "Category shares sum to 100",
          "Filtering by month narrows the list"
        ],
        "tests": [
          "Add transactions across months and check the chart",
          "Check the category percentages",
          "Filter by a month"
        ]
      },
      {
        "id": "proj-portfolio-expense-dashboard-m4",
        "order": 4,
        "title": "Budgets, persistence and polish",
        "objectives": [
          "Set a monthly budget",
          "Show progress against it",
          "Persist everything"
        ],
        "instructions": "Add a monthly budget per category with a progress bar that turns red when exceeded. Persist transactions and budgets in localStorage on every change and load them on startup. Finish with a clean visual design and the README.",
        "concepts": [
          "Budgets",
          "Progress indicators",
          "Persistence"
        ],
        "hints": [
          "Compute budget progress from the current month only.",
          "Save on every change.",
          "Handle a corrupt stored value by starting empty."
        ],
        "acceptanceCriteria": [
          "Budget progress is correct",
          "Exceeding a budget is highlighted",
          "Data survives a reload"
        ],
        "tests": [
          "Set a budget and exceed it",
          "Reload and check the data",
          "Edit and delete transactions"
        ]
      }
    ],
    "reviewChecklist": [
      "The balance always equals income minus spending",
      "Category shares sum to 100 percent",
      "Charts update on every change",
      "Data survives a reload",
      "Money is stored as integer cents"
    ],
    "finalAssessment": [
      "Add income and expenses and show the summary",
      "Show the monthly chart and category breakdown",
      "Set a budget and exceed it",
      "Filter by month",
      "Reload and show the data persisted"
    ],
    "portfolio": true,
    "apis": [
      "Web: open index.html in a browser; no server needed"
    ]
  },
  {
    "id": "proj-portfolio-markdown-editor-live",
    "slug": "markdown-editor-live",
    "level": 2,
    "title": "Live Markdown Editor",
    "description": "Build a live Markdown editor: type on the left, see the rendered result on the right as you type, with a toolbar, word count, and save and load from localStorage. It teaches the split-pane editor pattern used by real writing tools, plus a small Markdown parser written from scratch.",
    "skills": [
      "JavaScript",
      "Markdown parsing",
      "DOM manipulation",
      "LocalStorage",
      "Debouncing",
      "Split-pane layout",
      "CSS"
    ],
    "language": "javascript",
    "functionalRequirements": [
      "Edit Markdown in a textarea and preview the rendered HTML live",
      "Support headings, bold, italic, links, lists, code blocks and quotes",
      "Provide a toolbar that inserts Markdown syntax around the selection",
      "Show a live word and character count",
      "Save the document to localStorage automatically",
      "Load the saved document on startup",
      "Export the rendered HTML as a file",
      "Sync the preview scroll position with the editor"
    ],
    "nonFunctionalRequirements": [
      "The preview updates as you type",
      "Rendered HTML escapes raw HTML from the input",
      "The document survives a reload",
      "Toolbar buttons wrap the selected text correctly"
    ],
    "architecture": "A single-page app with a split-pane layout: a textarea on the left and a preview div on the right. A JavaScript parser converts a small Markdown subset to HTML with escaping first, a debounced input handler re-renders the preview, and an autosave writes the document to localStorage. The toolbar manipulates the textarea selection.",
    "databaseSchema": "",
    "fileStructure": "markdown-editor-live/\n  index.html\n  styles.css\n  app.js\n  parser.js\n  README.md",
    "taskBreakdown": [
      "Design the layout",
      "Implement the Markdown parser",
      "Build the live preview with debouncing",
      "Add the toolbar",
      "Add autosave and export",
      "Polish and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-markdown-editor-live-m1",
        "order": 1,
        "title": "Layout and basic rendering",
        "objectives": [
          "Build the split-pane layout",
          "Render headings and paragraphs",
          "Update on input"
        ],
        "instructions": "Build the layout with an editor pane and a preview pane side by side. Implement the parser for headings and paragraphs first, wire the textarea input event to re-render the preview, and confirm typing a heading renders it immediately.",
        "concepts": [
          "Split-pane layout",
          "Input events",
          "Parsing"
        ],
        "hints": [
          "Render on every input event to start; optimise later.",
          "Escape HTML before applying Markdown rules.",
          "Keep the parser in its own file."
        ],
        "acceptanceCriteria": [
          "Typing a heading renders it in the preview",
          "Paragraphs render correctly",
          "Raw HTML in the input is escaped"
        ],
        "tests": [
          "Type a heading and a paragraph",
          "Type a <script> tag and check the preview",
          "Resize the window and check the panes"
        ]
      },
      {
        "id": "proj-portfolio-markdown-editor-live-m2",
        "order": 2,
        "title": "Full Markdown support",
        "objectives": [
          "Support bold, italic and links",
          "Support lists, code and quotes",
          "Handle nested formatting"
        ],
        "instructions": "Extend the parser to handle bold, italic, inline code, links, unordered and ordered lists, fenced code blocks and blockquotes. Test each feature against a sample document and check the output HTML.",
        "concepts": [
          "Markdown parsing",
          "Regular expressions",
          "Edge cases"
        ],
        "hints": [
          "Handle inline formatting inside list items.",
          "Fenced code blocks must not be parsed as Markdown.",
          "Test nested bold and italic."
        ],
        "acceptanceCriteria": [
          "Every supported element renders correctly",
          "Code blocks show raw text",
          "Nested formatting works"
        ],
        "tests": [
          "Type a document using every feature",
          "Type a fenced code block with Markdown inside",
          "Type nested bold and italic"
        ]
      },
      {
        "id": "proj-portfolio-markdown-editor-live-m3",
        "order": 3,
        "title": "Toolbar, counts and autosave",
        "objectives": [
          "Build the formatting toolbar",
          "Show word and character counts",
          "Autosave to localStorage"
        ],
        "instructions": "Implement the toolbar: buttons for bold, italic, heading, link, list and code that wrap the current selection or insert a placeholder. Add live word and character counts, and autosave the document to localStorage on every change, loading it on startup.",
        "concepts": [
          "Selection manipulation",
          "Word counting",
          "Autosave"
        ],
        "hints": [
          "Wrap the selection; insert a placeholder when nothing is selected.",
          "Debounce the autosave.",
          "Count words by splitting on whitespace."
        ],
        "acceptanceCriteria": [
          "Toolbar buttons wrap the selection",
          "Word and character counts update live",
          "The document survives a reload"
        ],
        "tests": [
          "Select text and click bold",
          "Click a toolbar button with no selection",
          "Reload and check the document"
        ]
      },
      {
        "id": "proj-portfolio-markdown-editor-live-m4",
        "order": 4,
        "title": "Export, scroll sync and polish",
        "objectives": [
          "Export the rendered HTML",
          "Sync preview scrolling",
          "Polish and document"
        ],
        "instructions": "Add an export button that downloads the rendered HTML as a standalone file with embedded styles. Sync the preview scroll position proportionally with the editor, add a debounced render so typing stays smooth on long documents, and finish the README.",
        "concepts": [
          "File download",
          "Scroll sync",
          "Debouncing"
        ],
        "hints": [
          "Debounce rendering to about 150 ms.",
          "Scroll sync is proportional, not absolute.",
          "The exported file must open on its own."
        ],
        "acceptanceCriteria": [
          "Export produces a standalone HTML file",
          "Scrolling the editor scrolls the preview",
          "Typing stays smooth on a long document"
        ],
        "tests": [
          "Export and open the file",
          "Scroll a long document",
          "Type quickly in a long document"
        ]
      }
    ],
    "reviewChecklist": [
      "The preview updates as you type",
      "Raw HTML is escaped",
      "The document survives a reload",
      "Toolbar buttons wrap the selection",
      "Export produces a standalone file"
    ],
    "finalAssessment": [
      "Type a document using every Markdown feature",
      "Use the toolbar to format text",
      "Show the live word count",
      "Reload and show the document persisted",
      "Export the HTML and open it"
    ],
    "portfolio": true,
    "apis": [
      "Web: open index.html in a browser; no server needed"
    ]
  },
  {
    "id": "proj-portfolio-pomodoro-timer-app",
    "slug": "pomodoro-timer-app",
    "level": 1,
    "title": "Pomodoro Timer App",
    "description": "Build a Pomodoro timer: 25-minute focus sessions, 5-minute breaks, a long break after four sessions, and a task list to attach sessions to. It is a small, complete productivity app — timers, state machines, notifications and persistence — that is easy to finish and satisfying to use.",
    "skills": [
      "JavaScript",
      "Timers",
      "State machines",
      "Notifications",
      "LocalStorage",
      "DOM manipulation",
      "CSS"
    ],
    "language": "javascript",
    "functionalRequirements": [
      "Run a 25-minute focus timer with start, pause and reset",
      "Switch automatically to a 5-minute break after a focus session",
      "Take a 15-minute long break after four focus sessions",
      "Show the current phase and the session count",
      "Play a sound and show a notification when a phase ends",
      "Attach the timer to tasks from a small task list",
      "Record completed sessions per task",
      "Persist tasks and session counts across reloads"
    ],
    "nonFunctionalRequirements": [
      "The timer counts down accurately",
      "Phase transitions happen automatically",
      "A long break follows every fourth focus session",
      "Completed sessions are never lost on reload"
    ],
    "architecture": "A single-page app: a timer display, phase indicator, session dots, controls, and a task list. A JavaScript state machine holds the phase (focus, short break, long break), the remaining seconds and the completed count, driven by setInterval with end-time arithmetic so the countdown stays accurate even if the tab is throttled.",
    "databaseSchema": "",
    "fileStructure": "pomodoro-timer-app/\n  index.html\n  styles.css\n  app.js\n  README.md",
    "taskBreakdown": [
      "Design the layout and phases",
      "Implement the countdown timer",
      "Add phase transitions",
      "Add the task list",
      "Add notifications and persistence",
      "Polish and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-pomodoro-timer-app-m1",
        "order": 1,
        "title": "Layout and countdown",
        "objectives": [
          "Build the timer display",
          "Implement start, pause and reset",
          "Count down accurately"
        ],
        "instructions": "Build the layout with a large time display, a phase label and start, pause and reset buttons. Implement the countdown with setInterval and end-time arithmetic: store the end timestamp and compute the remaining time from it on each tick, so the timer stays accurate.",
        "concepts": [
          "setInterval",
          "End-time arithmetic",
          "DOM updates"
        ],
        "hints": [
          "Compute remaining time from the end timestamp, not by decrementing.",
          "Clear the interval on pause.",
          "Format the display as MM:SS."
        ],
        "acceptanceCriteria": [
          "Start counts down from 25:00",
          "Pause freezes the display",
          "Reset returns to 25:00"
        ],
        "tests": [
          "Start, pause and reset the timer",
          "Let it run for 10 seconds and check the display",
          "Reset mid-session"
        ]
      },
      {
        "id": "proj-portfolio-pomodoro-timer-app-m2",
        "order": 2,
        "title": "Phases and automatic transitions",
        "objectives": [
          "Switch to a break after focus",
          "Take a long break after four sessions",
          "Show the session count"
        ],
        "instructions": "Implement the state machine: when a focus session ends, increment the completed count and switch to a short break, or to a long break after the fourth session. When a break ends, switch back to focus. Show the phase and four session dots that fill as sessions complete.",
        "concepts": [
          "State machines",
          "Phase transitions",
          "Session counting"
        ],
        "hints": [
          "Drive transitions from one function.",
          "The long break follows every fourth focus session.",
          "Reset the session dots after the long break."
        ],
        "acceptanceCriteria": [
          "A focus session ends in a break",
          "The fourth session ends in a long break",
          "A break ends in a focus session"
        ],
        "tests": [
          "Run a focus session to the end (use short test durations)",
          "Complete four sessions",
          "Check the session dots"
        ]
      },
      {
        "id": "proj-portfolio-pomodoro-timer-app-m3",
        "order": 3,
        "title": "Tasks and session tracking",
        "objectives": [
          "Add tasks",
          "Attach the timer to a task",
          "Count sessions per task"
        ],
        "instructions": "Add a task list: add tasks, select the active one, and increment its completed-session count when a focus session ends. Show each task with its session count and allow completing and deleting tasks.",
        "concepts": [
          "Task lists",
          "Active selection",
          "Derived counts"
        ],
        "hints": [
          "Only the active task gains a session.",
          "Sessions count per task, not just globally.",
          "Deleting a task must not break the timer."
        ],
        "acceptanceCriteria": [
          "Adding a task shows it in the list",
          "A completed session increments the active task",
          "Tasks can be completed and deleted"
        ],
        "tests": [
          "Add tasks and select one",
          "Complete a focus session and check the count",
          "Delete the active task"
        ]
      },
      {
        "id": "proj-portfolio-pomodoro-timer-app-m4",
        "order": 4,
        "title": "Notifications, persistence and polish",
        "objectives": [
          "Notify on phase end",
          "Persist tasks and counts",
          "Polish and document"
        ],
        "instructions": "Add a sound with the Web Audio API and a browser notification when a phase ends, asking for permission first. Persist tasks, the active task and session counts in localStorage, and finish with a clean design and the README.",
        "concepts": [
          "Web Audio",
          "Notifications API",
          "Persistence"
        ],
        "hints": [
          "Ask for notification permission on first use.",
          "Generate the sound with Web Audio; no audio file needed.",
          "Save on every change."
        ],
        "acceptanceCriteria": [
          "A phase end plays a sound",
          "A notification appears on phase end",
          "Tasks survive a reload"
        ],
        "tests": [
          "Run a session to the end",
          "Reload and check the tasks",
          "Test with notifications blocked"
        ]
      }
    ],
    "reviewChecklist": [
      "The timer counts down accurately",
      "Phase transitions are automatic",
      "A long break follows every fourth session",
      "Sessions are recorded per task",
      "Tasks survive a reload"
    ],
    "finalAssessment": [
      "Run a focus session and a break",
      "Show the session dots and long break",
      "Attach sessions to a task",
      "Show the notification on phase end",
      "Reload and show the tasks persisted"
    ],
    "portfolio": true,
    "apis": [
      "Web: open index.html in a browser; no server needed"
    ]
  },
  {
    "id": "proj-portfolio-recipe-finder-app",
    "slug": "recipe-finder-app",
    "level": 2,
    "title": "Recipe Finder App",
    "description": "Build a recipe finder that searches a recipe dataset by ingredient, diet and time: type what is in the fridge, get matching recipes with cooking times and difficulty, and save favourites. It teaches search, filtering, and presenting structured data beautifully — the pattern behind most content apps.",
    "skills": [
      "JavaScript",
      "Search and filtering",
      "DOM manipulation",
      "LocalStorage",
      "Data modelling",
      "CSS"
    ],
    "language": "javascript",
    "functionalRequirements": [
      "Search recipes by name or ingredient",
      "Filter by diet: vegetarian, vegan, gluten-free",
      "Filter by maximum cooking time",
      "Show recipe cards with image, time, difficulty and servings",
      "Open a recipe detail view with ingredients and steps",
      "Save favourite recipes and list them",
      "Show how many recipes match the current search",
      "Sort results by time, difficulty or name"
    ],
    "nonFunctionalRequirements": [
      "Searching by an ingredient finds every recipe using it",
      "Filters combine correctly",
      "Favourites survive a reload",
      "The detail view shows every ingredient and step"
    ],
    "architecture": "A single-page app: a recipes.js data file with at least 24 recipes, a search and filter bar, a results grid, and a detail view. A JavaScript module holds the recipes and the current filter state, derives the visible list with filter functions, and renders cards and the detail view from it. Favourites live in localStorage.",
    "databaseSchema": "",
    "fileStructure": "recipe-finder-app/\n  index.html\n  styles.css\n  app.js\n  recipes.js\n  README.md",
    "taskBreakdown": [
      "Design the recipe data format",
      "Build the search and filters",
      "Render recipe cards",
      "Build the detail view",
      "Add favourites and sorting",
      "Polish and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-recipe-finder-app-m1",
        "order": 1,
        "title": "Recipe data and search",
        "objectives": [
          "Define the recipe format",
          "Seed at least 24 recipes",
          "Search by name and ingredient"
        ],
        "instructions": "Define a recipe with id, name, ingredients, steps, time, difficulty, servings, diet tags and an image URL. Seed at least 24 realistic recipes across cuisines, then implement search that matches the query against the name and every ingredient, case-insensitively.",
        "concepts": [
          "Data modelling",
          "Search",
          "Seeding"
        ],
        "hints": [
          "Match against ingredients as well as names.",
          "Search case-insensitively.",
          "Show the match count."
        ],
        "acceptanceCriteria": [
          "At least 24 recipes exist",
          "Searching an ingredient finds its recipes",
          "A search with no matches shows an empty state"
        ],
        "tests": [
          "Search for 'chicken'",
          "Search for an ingredient in one recipe",
          "Search for a nonsense word"
        ]
      },
      {
        "id": "proj-portfolio-recipe-finder-app-m2",
        "order": 2,
        "title": "Filters and sorting",
        "objectives": [
          "Filter by diet",
          "Filter by maximum time",
          "Sort results"
        ],
        "instructions": "Implement the diet filter, the maximum-time filter and sorting by time, difficulty or name. Filters must combine: a vegetarian filter plus a 30-minute limit shows only vegetarian recipes under 30 minutes.",
        "concepts": [
          "Filtering",
          "Combining filters",
          "Sorting"
        ],
        "hints": [
          "Apply all filters to the same list.",
          "Sorting must not mutate the original data.",
          "Show the active filters clearly."
        ],
        "acceptanceCriteria": [
          "Diet filtering returns only matching recipes",
          "Time filtering respects the limit",
          "Filters combine correctly"
        ],
        "tests": [
          "Filter vegetarian under 30 minutes",
          "Sort by time and check the order",
          "Clear all filters"
        ]
      },
      {
        "id": "proj-portfolio-recipe-finder-app-m3",
        "order": 3,
        "title": "Cards and detail view",
        "objectives": [
          "Render recipe cards",
          "Open a detail view",
          "Show ingredients and steps"
        ],
        "instructions": "Render each matching recipe as a card with its image, name, time, difficulty and servings. Clicking a card opens a detail view listing every ingredient with quantities and the steps in order, with a back button to the results.",
        "concepts": [
          "Card layouts",
          "Detail views",
          "Navigation"
        ],
        "hints": [
          "The detail view lists every ingredient and step.",
          "The back button returns to the same filtered results.",
          "Escape all recipe text when rendering."
        ],
        "acceptanceCriteria": [
          "Cards show time, difficulty and servings",
          "The detail view lists all ingredients and steps",
          "Back returns to the results"
        ],
        "tests": [
          "Open a recipe and check its ingredients",
          "Go back and check the filters are kept",
          "Open a recipe with many steps"
        ]
      },
      {
        "id": "proj-portfolio-recipe-finder-app-m4",
        "order": 4,
        "title": "Favourites and polish",
        "objectives": [
          "Save favourites",
          "List favourites",
          "Polish and document"
        ],
        "instructions": "Add a favourite button on cards and in the detail view, a favourites-only view, and persistence in localStorage. Finish with a clean visual design, an empty state for no favourites, and the README.",
        "concepts": [
          "Favourites",
          "Persistence",
          "Empty states"
        ],
        "hints": [
          "Favourites survive a reload.",
          "The favourites view shows only favourites.",
          "Show an empty state when there are none."
        ],
        "acceptanceCriteria": [
          "Favourites survive a reload",
          "The favourites view filters correctly",
          "The README explains how to add recipes"
        ],
        "tests": [
          "Favourite two recipes and reload",
          "Open the favourites view",
          "Add a recipe to the data file"
        ]
      }
    ],
    "reviewChecklist": [
      "Search covers names and ingredients",
      "Filters combine correctly",
      "The detail view shows every ingredient and step",
      "Favourites survive a reload",
      "Sorting never mutates the data"
    ],
    "finalAssessment": [
      "Search for an ingredient and show the results",
      "Combine diet and time filters",
      "Open a recipe detail view",
      "Save a favourite and reload",
      "Sort the results by time"
    ],
    "portfolio": true,
    "apis": [
      "Web: open index.html in a browser; no server needed"
    ]
  },
  {
    "id": "proj-portfolio-kanban-board-app",
    "slug": "kanban-board-app",
    "level": 3,
    "title": "Kanban Board App",
    "description": "Build a Kanban board in the browser: drag cards between To Do, In Progress and Done, add and edit cards, set priorities and due dates, and keep everything in localStorage. It is the most impressive single-page app in the set — drag and drop, state, and persistence working together.",
    "skills": [
      "JavaScript",
      "Drag and drop",
      "DOM manipulation",
      "LocalStorage",
      "State management",
      "Date handling",
      "CSS"
    ],
    "language": "javascript",
    "functionalRequirements": [
      "Show three columns: To Do, In Progress and Done",
      "Add a card with a title, description, priority and due date",
      "Drag cards between columns and reorder them within a column",
      "Edit and delete cards",
      "Show a card count per column",
      "Highlight overdue cards",
      "Filter cards by priority",
      "Persist the board in localStorage"
    ],
    "nonFunctionalRequirements": [
      "Dragging a card updates its column",
      "Card order within a column is preserved",
      "Overdue cards are highlighted",
      "The board survives a reload"
    ],
    "architecture": "A single-page app: an HTML shell with three column containers, a card form, and a filter bar. A JavaScript module holds the cards array as the single source of truth, renders each column from it, implements HTML5 drag and drop with dragover and drop handlers, and persists the board to localStorage on every change.",
    "databaseSchema": "",
    "fileStructure": "kanban-board-app/\n  index.html\n  styles.css\n  app.js\n  README.md",
    "taskBreakdown": [
      "Design the board and data model",
      "Implement columns and card rendering",
      "Add card creation and editing",
      "Implement drag and drop",
      "Add overdue highlighting and filters",
      "Add persistence and polish",
      "Document the app"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-kanban-board-app-m1",
        "order": 1,
        "title": "Board layout and rendering",
        "objectives": [
          "Build three columns",
          "Render cards from state",
          "Show card counts"
        ],
        "instructions": "Build the layout with To Do, In Progress and Done columns and a form to add a card. Implement rendering: each column lists its cards with title, priority badge and due date, and a count in the column header. Seed three example cards.",
        "concepts": [
          "Layout",
          "Rendering",
          "Data modelling"
        ],
        "hints": [
          "Render each column from the same cards array.",
          "Give every card a unique id.",
          "Show the count in the header."
        ],
        "acceptanceCriteria": [
          "Three columns render with their cards",
          "Counts match the cards in each column",
          "Adding a card shows it in To Do"
        ],
        "tests": [
          "Open the app and check the columns",
          "Add a card",
          "Check the column counts"
        ]
      },
      {
        "id": "proj-portfolio-kanban-board-app-m2",
        "order": 2,
        "title": "Card editing and deletion",
        "objectives": [
          "Edit a card",
          "Delete a card",
          "Validate card input"
        ],
        "instructions": "Implement editing: clicking a card opens an edit form prefilled with its values, and saving updates the card. Add a delete button with confirmation. Validate that the title is non-empty and the due date is a valid date.",
        "concepts": [
          "Forms",
          "Editing",
          "Validation"
        ],
        "hints": [
          "Prefill the edit form from the card.",
          "Validate before saving.",
          "Confirm before deleting."
        ],
        "acceptanceCriteria": [
          "Editing updates the card",
          "An empty title is rejected",
          "Deleting removes the card"
        ],
        "tests": [
          "Edit a card's title and priority",
          "Try to save an empty title",
          "Delete a card"
        ]
      },
      {
        "id": "proj-portfolio-kanban-board-app-m3",
        "order": 3,
        "title": "Drag and drop",
        "objectives": [
          "Drag cards between columns",
          "Reorder within a column",
          "Persist the new order"
        ],
        "instructions": "Implement HTML5 drag and drop: cards are draggable, columns accept drops, and dropping a card updates its column; dropping between two cards inserts it at that position. Update the state and re-render, and persist on every drop.",
        "concepts": [
          "HTML5 drag and drop",
          "Drop targets",
          "Ordering"
        ],
        "hints": [
          "Store the dragged card id in the drag event.",
          "Compute the insert position from the mouse position.",
          "Persist after every drop."
        ],
        "acceptanceCriteria": [
          "Dragging to another column moves the card",
          "Dropping between cards reorders them",
          "The order survives a reload"
        ],
        "tests": [
          "Drag a card to Done",
          "Reorder cards within a column",
          "Reload and check the order"
        ]
      },
      {
        "id": "proj-portfolio-kanban-board-app-m4",
        "order": 4,
        "title": "Overdue, filters and persistence",
        "objectives": [
          "Highlight overdue cards",
          "Filter by priority",
          "Persist the board"
        ],
        "instructions": "Highlight cards whose due date has passed and whose column is not Done. Add a priority filter that narrows all three columns. Persist the cards array to localStorage on every change and load it on startup, and finish the README.",
        "concepts": [
          "Date comparison",
          "Filtering",
          "Persistence"
        ],
        "hints": [
          "Compare due dates against today, not the current time.",
          "Done cards are never overdue.",
          "Save on every change."
        ],
        "acceptanceCriteria": [
          "Overdue cards are highlighted",
          "Done cards are never highlighted",
          "The board survives a reload"
        ],
        "tests": [
          "Add an overdue card",
          "Move it to Done and check the highlight",
          "Filter by priority and reload"
        ]
      }
    ],
    "reviewChecklist": [
      "Dragging updates the column and order",
      "Card order survives a reload",
      "Overdue cards are highlighted",
      "Done cards are never overdue",
      "Filters narrow all columns"
    ],
    "finalAssessment": [
      "Add cards and drag them between columns",
      "Reorder cards within a column",
      "Edit and delete a card",
      "Show an overdue card",
      "Reload and show the board persisted"
    ],
    "portfolio": true,
    "apis": [
      "Web: open index.html in a browser; no server needed"
    ]
  },
  {
    "id": "proj-portfolio-live-poll-app",
    "slug": "live-poll-app",
    "level": 3,
    "title": "Live Poll App",
    "description": "Build a live polling app: create a poll with a question and options, vote from any browser tab, and watch the results update in real time with animated bars. It teaches state, persistence, and the broadcast pattern that makes multi-tab apps feel live — with no server at all.",
    "skills": [
      "JavaScript",
      "BroadcastChannel",
      "LocalStorage",
      "DOM manipulation",
      "Charts",
      "State management",
      "CSS"
    ],
    "language": "javascript",
    "functionalRequirements": [
      "Create a poll with a question and 2-6 options",
      "Vote for one option per poll",
      "Show results as animated bars with counts and percentages",
      "Update results live across open tabs using BroadcastChannel",
      "List all polls and switch between them",
      "Let the poll creator close a poll to stop voting",
      "Persist polls and votes in localStorage",
      "Prevent voting twice in the same poll"
    ],
    "nonFunctionalRequirements": [
      "A vote updates the results immediately",
      "Results update live in another open tab",
      "A user cannot vote twice in a poll",
      "Closed polls accept no more votes"
    ],
    "architecture": "A single-page app: a poll list, a create form, a voting view and a results view. A JavaScript module holds the polls in localStorage, tracks which polls this browser has voted in, and uses BroadcastChannel to broadcast vote events so every open tab re-renders its results immediately.",
    "databaseSchema": "",
    "fileStructure": "live-poll-app/\n  index.html\n  styles.css\n  app.js\n  README.md",
    "taskBreakdown": [
      "Design the poll data model",
      "Implement poll creation and listing",
      "Implement voting and results",
      "Add live updates with BroadcastChannel",
      "Add closing and persistence",
      "Polish and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-live-poll-app-m1",
        "order": 1,
        "title": "Polls: create and list",
        "objectives": [
          "Define the poll format",
          "Create a poll",
          "List all polls"
        ],
        "instructions": "Define a poll with id, question, options, votes per option, a created date and an open flag. Build the create form with validation for a question and 2-6 non-empty options, and a list view showing each poll with its question and total votes.",
        "concepts": [
          "Data modelling",
          "Forms",
          "Validation"
        ],
        "hints": [
          "Validate the option count before saving.",
          "Give every poll a unique id.",
          "Show the total votes on each poll."
        ],
        "acceptanceCriteria": [
          "Creating a poll shows it in the list",
          "One option is rejected",
          "Seven options are rejected"
        ],
        "tests": [
          "Create a poll with three options",
          "Try to create a poll with one option",
          "List the polls"
        ]
      },
      {
        "id": "proj-portfolio-live-poll-app-m2",
        "order": 2,
        "title": "Voting and results",
        "objectives": [
          "Vote for an option",
          "Show results as bars",
          "Prevent double voting"
        ],
        "instructions": "Implement voting: clicking an option records one vote and marks the poll as voted in this browser. Render the results as horizontal bars with counts and percentages that sum to 100. After voting, show the results instead of the voting buttons.",
        "concepts": [
          "Voting",
          "Bar charts",
          "Percentages"
        ],
        "hints": [
          "Record the vote before re-rendering.",
          "Percentages must sum to 100.",
          "Store voted polls in localStorage."
        ],
        "acceptanceCriteria": [
          "Voting increments the option count",
          "Percentages sum to 100",
          "Voting again is blocked"
        ],
        "tests": [
          "Vote in a poll and check the count",
          "Vote again in the same poll",
          "Check the percentages"
        ]
      },
      {
        "id": "proj-portfolio-live-poll-app-m3",
        "order": 3,
        "title": "Live updates across tabs",
        "objectives": [
          "Broadcast votes with BroadcastChannel",
          "Re-render on broadcast",
          "Handle a closed channel gracefully"
        ],
        "instructions": "Implement live updates: after recording a vote, post a message on a BroadcastChannel; every open tab listens, reloads the polls from localStorage and re-renders. Guard the code so the app still works in a browser without BroadcastChannel.",
        "concepts": [
          "BroadcastChannel",
          "Cross-tab messaging",
          "Feature detection"
        ],
        "hints": [
          "Broadcast after saving, so other tabs read the new data.",
          "Check that BroadcastChannel exists before using it.",
          "Re-render from storage on every message."
        ],
        "acceptanceCriteria": [
          "A vote in one tab updates another tab",
          "The app works with BroadcastChannel unavailable",
          "Results stay consistent across tabs"
        ],
        "tests": [
          "Open two tabs and vote in one",
          "Vote in both tabs",
          "Check the totals match"
        ]
      },
      {
        "id": "proj-portfolio-live-poll-app-m4",
        "order": 4,
        "title": "Closing, persistence and polish",
        "objectives": [
          "Close a poll",
          "Persist polls and votes",
          "Polish and document"
        ],
        "instructions": "Add a close button for the poll creator that sets the poll closed and stops voting while still showing results. Persist polls and voted state in localStorage, handle a corrupt stored value by starting empty, and finish the README with how to demo the live updates.",
        "concepts": [
          "Poll lifecycle",
          "Persistence",
          "Documentation"
        ],
        "hints": [
          "Closed polls show results but no voting buttons.",
          "Save on every change.",
          "Document the two-tab demo."
        ],
        "acceptanceCriteria": [
          "A closed poll accepts no votes",
          "Polls survive a reload",
          "The README explains the live demo"
        ],
        "tests": [
          "Close a poll and try to vote",
          "Reload and check the polls",
          "Follow the README demo"
        ]
      }
    ],
    "reviewChecklist": [
      "Votes update results immediately",
      "Results update live across tabs",
      "Double voting is blocked",
      "Closed polls accept no votes",
      "Percentages sum to 100"
    ],
    "finalAssessment": [
      "Create a poll and vote in it",
      "Open a second tab and watch the live update",
      "Show the results bars and percentages",
      "Close the poll and try to vote",
      "Reload and show the polls persisted"
    ],
    "portfolio": true,
    "apis": [
      "Web: open index.html in two browser tabs to see live updates; no server needed"
    ]
  },
  {
    "id": "proj-portfolio-image-gallery-filter",
    "slug": "image-gallery-filter",
    "level": 2,
    "title": "Filterable Image Gallery",
    "description": "Build a filterable image gallery: a grid of photos with categories, a search box, a lightbox to view a photo full-size, and keyboard navigation. It is a clean, visual frontend project that shows off layout, filtering, and the lightbox interaction every portfolio site needs.",
    "skills": [
      "JavaScript",
      "CSS Grid",
      "Filtering",
      "Lightbox",
      "Keyboard navigation",
      "DOM manipulation",
      "Lazy loading"
    ],
    "language": "javascript",
    "functionalRequirements": [
      "Show a grid of at least 24 images with titles and categories",
      "Filter the grid by category",
      "Search images by title",
      "Open a lightbox to view an image full-size with its title",
      "Navigate between images in the lightbox with arrows and keys",
      "Close the lightbox with Escape or a close button",
      "Lazy-load images as they scroll into view",
      "Show the image count for the current filter"
    ],
    "nonFunctionalRequirements": [
      "Filtering and search combine correctly",
      "The lightbox shows the right image and title",
      "Arrow keys move through the filtered images only",
      "Images load lazily, not all at once"
    ],
    "architecture": "A single-page app: an images.js data file with at least 24 entries (URL, title, category), a CSS grid, a filter bar and search box, and a lightbox overlay. A JavaScript module holds the images and the current filter, derives the visible list, renders the grid, and manages the lightbox state including the current index and keyboard handlers.",
    "databaseSchema": "",
    "fileStructure": "image-gallery-filter/\n  index.html\n  styles.css\n  app.js\n  images.js\n  README.md",
    "taskBreakdown": [
      "Design the image data format",
      "Build the grid and filters",
      "Implement search",
      "Build the lightbox",
      "Add keyboard navigation and lazy loading",
      "Polish and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-image-gallery-filter-m1",
        "order": 1,
        "title": "Gallery grid and data",
        "objectives": [
          "Define the image format",
          "Seed at least 24 images",
          "Render the grid"
        ],
        "instructions": "Define an image with id, URL, title and category, and seed at least 24 across four categories using a free placeholder image service. Render the grid with CSS Grid, showing each image with its title below it.",
        "concepts": [
          "CSS Grid",
          "Data modelling",
          "Rendering"
        ],
        "hints": [
          "Use a placeholder image service so the gallery works offline of any account.",
          "Give every image a descriptive title.",
          "Keep the data in its own file."
        ],
        "acceptanceCriteria": [
          "At least 24 images render",
          "Four categories are present",
          "Each image shows its title"
        ],
        "tests": [
          "Open the gallery and count the images",
          "Check each category has images",
          "Check the titles are shown"
        ]
      },
      {
        "id": "proj-portfolio-image-gallery-filter-m2",
        "order": 2,
        "title": "Filtering and search",
        "objectives": [
          "Filter by category",
          "Search by title",
          "Show the result count"
        ],
        "instructions": "Implement the category filter buttons and the search box, combining them: the visible images must match both the selected category and the search text. Show the count of visible images, and an empty state when nothing matches.",
        "concepts": [
          "Filtering",
          "Search",
          "Combining filters"
        ],
        "hints": [
          "Apply the category and the search to the same list.",
          "Search case-insensitively.",
          "Show an empty state for no matches."
        ],
        "acceptanceCriteria": [
          "Category filtering shows only that category",
          "Search finds matching titles",
          "Both together narrow correctly"
        ],
        "tests": [
          "Filter by a category",
          "Search for a title word",
          "Combine a category and a search"
        ]
      },
      {
        "id": "proj-portfolio-image-gallery-filter-m3",
        "order": 3,
        "title": "Lightbox",
        "objectives": [
          "Open a lightbox on click",
          "Show the image and title",
          "Close with Escape or the button"
        ],
        "instructions": "Implement the lightbox overlay: clicking an image opens it full-size with its title and category, a close button, and a dark backdrop. Clicking the backdrop or pressing Escape closes it, and the page behind does not scroll while it is open.",
        "concepts": [
          "Overlays",
          "Event handling",
          "Focus management"
        ],
        "hints": [
          "Trap focus inside the lightbox while open.",
          "Prevent the background from scrolling.",
          "Return focus to the thumbnail on close."
        ],
        "acceptanceCriteria": [
          "Clicking an image opens the lightbox",
          "Escape closes it",
          "The background does not scroll while open"
        ],
        "tests": [
          "Open an image and check its title",
          "Close with Escape",
          "Close by clicking the backdrop"
        ]
      },
      {
        "id": "proj-portfolio-image-gallery-filter-m4",
        "order": 4,
        "title": "Keyboard navigation and lazy loading",
        "objectives": [
          "Navigate with arrow keys",
          "Lazy-load images",
          "Polish and document"
        ],
        "instructions": "Add arrow-key navigation inside the lightbox that moves through the currently filtered images only, wrapping at the ends. Add loading=lazy to the grid images so they load as they scroll into view, and finish the README.",
        "concepts": [
          "Keyboard navigation",
          "Lazy loading",
          "Accessibility"
        ],
        "hints": [
          "Navigate within the filtered list, not all images.",
          "Wrap from the last image to the first.",
          "Add alt text to every image."
        ],
        "acceptanceCriteria": [
          "Arrow keys move through filtered images",
          "Navigation wraps at the ends",
          "Images have alt text and lazy loading"
        ],
        "tests": [
          "Filter, open the lightbox and use arrow keys",
          "Check the last image wraps to the first",
          "Inspect an image element for loading=lazy"
        ]
      }
    ],
    "reviewChecklist": [
      "Filtering and search combine correctly",
      "The lightbox shows the right image",
      "Arrow keys move through filtered images only",
      "Images load lazily with alt text",
      "The background does not scroll while the lightbox is open"
    ],
    "finalAssessment": [
      "Filter and search the gallery",
      "Open an image in the lightbox",
      "Navigate with arrow keys",
      "Close with Escape",
      "Show the result count updating"
    ],
    "portfolio": true,
    "apis": [
      "Web: open index.html in a browser; no server needed"
    ]
  },
  {
    "id": "proj-portfolio-currency-converter-app",
    "slug": "currency-converter-app",
    "level": 1,
    "title": "Currency Converter App",
    "description": "Build a currency converter that fetches live exchange rates: enter an amount, pick two currencies, see the converted value and the rate, and switch the currencies with one click. It is the simplest real API app — and a perfect first project for fetching, forms, and formatting numbers.",
    "skills": [
      "JavaScript",
      "Fetch API",
      "Async and await",
      "Number formatting",
      "Forms",
      "LocalStorage",
      "Error handling"
    ],
    "language": "javascript",
    "functionalRequirements": [
      "Convert an amount between two currencies using live rates",
      "Fetch exchange rates from a public API",
      "Swap the two currencies with one button",
      "Show the exchange rate used for the conversion",
      "Format the result with the right currency symbol",
      "Show popular currency pairs as quick buttons",
      "Remember the last used currencies across reloads",
      "Show a clear error when rates cannot be fetched"
    ],
    "nonFunctionalRequirements": [
      "The converted amount uses the fetched rate",
      "Swapping converts back to the original amount",
      "The rate shown matches the calculation",
      "A failed fetch shows an error, not a wrong number"
    ],
    "architecture": "A single-page app: a form with an amount input and two currency selects, a swap button, and a result area. A JavaScript module fetches rates from a public exchange-rate API, caches them for an hour, converts with the fetched rate, and formats the result with Intl.NumberFormat.",
    "databaseSchema": "",
    "fileStructure": "currency-converter-app/\n  index.html\n  styles.css\n  app.js\n  api.js\n  README.md",
    "taskBreakdown": [
      "Design the layout",
      "Implement the rates client",
      "Build the conversion",
      "Add swap and quick pairs",
      "Handle errors and persistence",
      "Polish and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-currency-converter-app-m1",
        "order": 1,
        "title": "Layout and rates client",
        "objectives": [
          "Build the converter form",
          "Fetch exchange rates",
          "Handle fetch errors"
        ],
        "instructions": "Build the layout with an amount input, two currency selects with at least 10 currencies, a swap button and a result area. Implement the rates module with fetch and a timeout, mapping network failures to a clear error message.",
        "concepts": [
          "Fetch API",
          "Forms",
          "Error handling"
        ],
        "hints": [
          "Use async and await with try and catch.",
          "Cache the rates for an hour.",
          "Never show a conversion from a failed fetch."
        ],
        "acceptanceCriteria": [
          "The form renders with 10 currencies",
          "A successful fetch returns rates",
          "A failed fetch shows an error"
        ],
        "tests": [
          "Open the app and check the form",
          "Convert with the network on",
          "Convert with the network blocked"
        ]
      },
      {
        "id": "proj-portfolio-currency-converter-app-m2",
        "order": 2,
        "title": "Conversion and formatting",
        "objectives": [
          "Convert with the fetched rate",
          "Format with the currency symbol",
          "Show the rate used"
        ],
        "instructions": "Implement conversion: multiply the amount by the rate for the target currency, format the result with Intl.NumberFormat using the target currency code, and show the rate as '1 USD = 0.92 EUR' beneath the result.",
        "concepts": [
          "Currency math",
          "Intl.NumberFormat",
          "Formatting"
        ],
        "hints": [
          "Format with the target currency code.",
          "Show the rate that was used.",
          "Round the display to two decimals."
        ],
        "acceptanceCriteria": [
          "Converting 100 USD shows the right EUR amount",
          "The rate line matches the calculation",
          "The result shows the right symbol"
        ],
        "tests": [
          "Convert 100 USD to EUR",
          "Convert 50 EUR to GBP",
          "Check the rate line against the result"
        ]
      },
      {
        "id": "proj-portfolio-currency-converter-app-m3",
        "order": 3,
        "title": "Swap, quick pairs and persistence",
        "objectives": [
          "Swap the currencies",
          "Add quick currency pairs",
          "Remember the last currencies"
        ],
        "instructions": "Implement the swap button to exchange the two selects and reconvert, quick-pair buttons for common pairs such as USD to EUR, and persistence of the last used currencies in localStorage so they load on startup.",
        "concepts": [
          "State",
          "Persistence",
          "UX details"
        ],
        "hints": [
          "Swap and reconvert immediately.",
          "Quick pairs set both selects at once.",
          "Load the last currencies on startup."
        ],
        "acceptanceCriteria": [
          "Swapping converts back to the original amount",
          "A quick pair sets both currencies",
          "Currencies survive a reload"
        ],
        "tests": [
          "Convert, swap, and check the amount",
          "Click a quick pair",
          "Reload and check the selects"
        ]
      },
      {
        "id": "proj-portfolio-currency-converter-app-m4",
        "order": 4,
        "title": "Validation, tests and docs",
        "objectives": [
          "Validate the amount",
          "Test the conversion math",
          "Document the app"
        ],
        "instructions": "Validate the amount: reject empty, negative and non-numeric input with a clear message. Write a small test checklist or test page for conversion math, swap, caching and errors, and finish the README with the API used and the cache duration.",
        "concepts": [
          "Validation",
          "Testing",
          "Documentation"
        ],
        "hints": [
          "Reject negative amounts.",
          "Test the conversion math with a fixed rate.",
          "Document the cache duration."
        ],
        "acceptanceCriteria": [
          "A negative amount is rejected",
          "The conversion math is tested",
          "The README documents the API"
        ],
        "tests": [
          "Enter a negative amount",
          "Enter text as the amount",
          "Follow the README from scratch"
        ]
      }
    ],
    "reviewChecklist": [
      "The result uses the fetched rate",
      "Swapping converts back correctly",
      "The rate line matches the calculation",
      "Failed fetches show an error, never a wrong number",
      "Currencies survive a reload"
    ],
    "finalAssessment": [
      "Convert an amount between two currencies",
      "Swap and convert back",
      "Use a quick pair",
      "Show the rate used",
      "Block the network and show the error"
    ],
    "portfolio": true,
    "apis": [
      "External: GET https://api.exchangerate.example/v1/latest?base=USD — exchange rates (any public rates API with the same shape works)",
      "Web: open index.html in a browser"
    ]
  },
  {
    "id": "proj-portfolio-typing-speed-test",
    "slug": "typing-speed-test",
    "level": 2,
    "title": "Typing Speed Test",
    "description": "Build a typing speed test: a passage appears, you type it, and the app measures words per minute and accuracy live, highlighting correct and incorrect characters as you go. It covers real-time input handling, timers, and statistics — in an app that is fun to use and easy to demo.",
    "skills": [
      "JavaScript",
      "Input handling",
      "Timers",
      "Statistics",
      "DOM manipulation",
      "LocalStorage",
      "CSS"
    ],
    "language": "javascript",
    "functionalRequirements": [
      "Show a random passage of 30-50 words",
      "Highlight each character green or red as it is typed",
      "Start the timer on the first keystroke",
      "Show live words per minute and accuracy",
      "Show a results screen with WPM, accuracy and errors",
      "Save the best WPM in localStorage",
      "Offer a new passage button and a restart",
      "Support three difficulty levels with different passages"
    ],
    "nonFunctionalRequirements": [
      "The timer starts on the first keystroke, not before",
      "WPM is computed from correct characters only",
      "Accuracy reflects every keystroke",
      "The best WPM survives a reload"
    ],
    "architecture": "A single-page app: a passages.js file with at least 12 passages across three difficulties, a display area rendering one span per character, a hidden input capturing keystrokes, and a stats module computing WPM as correct characters divided by 5, divided by minutes, and accuracy as correct keystrokes over total keystrokes.",
    "databaseSchema": "",
    "fileStructure": "typing-speed-test/\n  index.html\n  styles.css\n  app.js\n  passages.js\n  README.md",
    "taskBreakdown": [
      "Design the passages and layout",
      "Implement character highlighting",
      "Add the timer and live stats",
      "Build the results screen",
      "Add difficulties and best scores",
      "Polish and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-typing-speed-test-m1",
        "order": 1,
        "title": "Passages and display",
        "objectives": [
          "Seed at least 12 passages",
          "Render one span per character",
          "Show the passage"
        ],
        "instructions": "Create passages.js with at least 12 passages of 30-50 words across three difficulties. Render the current passage as one span per character so each can be coloured individually, with the next character highlighted by a cursor.",
        "concepts": [
          "Data",
          "Rendering",
          "Spans"
        ],
        "hints": [
          "Keep passages in their own file.",
          "Render one span per character.",
          "Mark the current character with a cursor style."
        ],
        "acceptanceCriteria": [
          "A passage renders with one span per character",
          "Three difficulties exist",
          "The cursor marks the first character"
        ],
        "tests": [
          "Open the app and inspect the passage",
          "Switch difficulty and check the passage changes",
          "Count the spans"
        ]
      },
      {
        "id": "proj-portfolio-typing-speed-test-m2",
        "order": 2,
        "title": "Typing and highlighting",
        "objectives": [
          "Capture keystrokes",
          "Colour characters green or red",
          "Handle backspace"
        ],
        "instructions": "Implement typing with a hidden input that captures keystrokes: on each keystroke, compare the typed character with the expected one and colour the span green or red. Backspace moves the cursor back and clears the colour. Ignore non-character keys.",
        "concepts": [
          "Input events",
          "Character comparison",
          "Backspace handling"
        ],
        "hints": [
          "Compare against the expected character at the cursor.",
          "Backspace must clear the colour.",
          "Ignore keys like Shift and Control."
        ],
        "acceptanceCriteria": [
          "Correct typing turns green",
          "Wrong typing turns red",
          "Backspace clears the last character"
        ],
        "tests": [
          "Type the first word correctly",
          "Type a wrong character",
          "Type then backspace"
        ]
      },
      {
        "id": "proj-portfolio-typing-speed-test-m3",
        "order": 3,
        "title": "Timer and live stats",
        "objectives": [
          "Start the timer on the first keystroke",
          "Compute live WPM",
          "Compute live accuracy"
        ],
        "instructions": "Implement the timer starting on the first keystroke and the live stats: WPM from correct characters divided by 5 and by elapsed minutes, and accuracy from correct keystrokes over total keystrokes. Update both on every keystroke.",
        "concepts": [
          "Timers",
          "WPM calculation",
          "Accuracy"
        ],
        "hints": [
          "Start the timer on the first keystroke only.",
          "WPM uses correct characters only.",
          "Update the stats on every keystroke."
        ],
        "acceptanceCriteria": [
          "The timer starts on the first keystroke",
          "WPM increases as you type correctly",
          "Accuracy drops after a mistake"
        ],
        "tests": [
          "Type the first character and watch the timer",
          "Type correctly and check the WPM",
          "Make mistakes and check the accuracy"
        ]
      },
      {
        "id": "proj-portfolio-typing-speed-test-m4",
        "order": 4,
        "title": "Results, best scores and polish",
        "objectives": [
          "Show a results screen",
          "Save the best WPM",
          "Add a new passage"
        ],
        "instructions": "When the passage is complete, stop the timer and show a results screen with WPM, accuracy, errors and time taken, updating the best WPM when beaten. Add a new-passage button that picks a fresh passage and resets the stats, and finish the README.",
        "concepts": [
          "Results screens",
          "Persistence",
          "Reset"
        ],
        "hints": [
          "Stop the timer when the passage ends.",
          "Only update the best WPM when beaten.",
          "A new passage resets the stats."
        ],
        "acceptanceCriteria": [
          "Completing a passage shows the results",
          "The best WPM updates when beaten",
          "A new passage resets everything"
        ],
        "tests": [
          "Complete a short passage",
          "Beat the best WPM",
          "Start a new passage and check the reset"
        ]
      }
    ],
    "reviewChecklist": [
      "The timer starts on the first keystroke",
      "WPM uses correct characters only",
      "Accuracy reflects every keystroke",
      "The best WPM survives a reload",
      "A new passage resets the stats"
    ],
    "finalAssessment": [
      "Type a passage and watch the highlighting",
      "Show the live WPM and accuracy",
      "Complete a passage and show the results",
      "Show the best WPM",
      "Start a new passage"
    ],
    "portfolio": true,
    "apis": [
      "Web: open index.html in a browser; no server needed"
    ]
  },
  {
    "id": "proj-portfolio-responsive-portfolio-site",
    "slug": "responsive-portfolio-site",
    "level": 1,
    "title": "Responsive Personal Portfolio Site",
    "description": "Build a responsive personal portfolio site with pure HTML and CSS: a hero section, an about section, a project grid, a skills list and a contact section, all adapting cleanly from phone to desktop. It is the single most useful HTML and CSS project — the site itself becomes the portfolio.",
    "skills": [
      "HTML",
      "CSS",
      "Responsive design",
      "Flexbox",
      "CSS Grid",
      "Media queries",
      "Accessibility",
      "Semantic HTML"
    ],
    "language": "html",
    "functionalRequirements": [
      "Build a semantic page with header, main, sections and footer",
      "Add a hero section with a name, role and call to action",
      "Add an about section with a photo and short bio",
      "Add a project grid with at least 6 project cards",
      "Add a skills section and a contact section",
      "Make the layout responsive: one column on phones, multi-column on desktop",
      "Add a sticky navigation bar with anchor links",
      "Meet basic accessibility: alt text, labels, focus styles and colour contrast"
    ],
    "nonFunctionalRequirements": [
      "The site has no horizontal scroll at 360 px wide",
      "The navigation works at every screen size",
      "All images have alt text",
      "The page passes a basic accessibility check"
    ],
    "architecture": "A static site with no JavaScript: index.html using semantic elements, a styles.css with custom properties, Flexbox for the header and hero, CSS Grid for the project cards, and media queries at 600 px and 900 px. The navigation is a sticky header with anchor links and a skip link.",
    "databaseSchema": "",
    "fileStructure": "responsive-portfolio-site/\n  index.html\n  styles.css\n  images/\n    portrait.jpg\n    project-1.jpg\n  README.md",
    "taskBreakdown": [
      "Plan the sections and content",
      "Build the semantic HTML structure",
      "Style the hero and navigation",
      "Build the project grid",
      "Make it responsive",
      "Check accessibility and polish",
      "Document the site"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-responsive-portfolio-site-m1",
        "order": 1,
        "title": "Semantic structure and content",
        "objectives": [
          "Write semantic HTML",
          "Add all five sections",
          "Write the real content"
        ],
        "instructions": "Write index.html with header, nav, main, five sections (hero, about, projects, skills, contact) and a footer, using heading levels in order. Write real content: a short bio, six project descriptions and a skills list — no lorem ipsum.",
        "concepts": [
          "Semantic HTML",
          "Heading order",
          "Content writing"
        ],
        "hints": [
          "Use one h1 only, for the name.",
          "Write real content, not placeholder text.",
          "Add a skip link before the navigation."
        ],
        "acceptanceCriteria": [
          "The page has all five sections",
          "There is exactly one h1",
          "A skip link is present"
        ],
        "tests": [
          "Open the page and check the sections",
          "Inspect the heading order",
          "Tab to the skip link"
        ]
      },
      {
        "id": "proj-portfolio-responsive-portfolio-site-m2",
        "order": 2,
        "title": "Styling: hero, nav and cards",
        "objectives": [
          "Style the hero",
          "Build the sticky navigation",
          "Style the project cards"
        ],
        "instructions": "Write styles.css with custom properties for colours and spacing, style the hero with a large heading and a call-to-action button, make the navigation sticky, and style the project cards with an image, title, description and links.",
        "concepts": [
          "CSS custom properties",
          "Sticky positioning",
          "Card design"
        ],
        "hints": [
          "Define colours as custom properties.",
          "The navigation stays visible while scrolling.",
          "Cards need a visible focus style."
        ],
        "acceptanceCriteria": [
          "The hero looks finished",
          "The navigation sticks on scroll",
          "Cards have focus styles"
        ],
        "tests": [
          "Scroll the page and watch the navigation",
          "Tab through the navigation links",
          "Check the card styling"
        ]
      },
      {
        "id": "proj-portfolio-responsive-portfolio-site-m3",
        "order": 3,
        "title": "Responsive layout",
        "objectives": [
          "Stack sections on phones",
          "Use a grid on desktop",
          "Test at 360, 768 and 1200 px"
        ],
        "instructions": "Make the layout responsive: a single column below 600 px, two columns for the project grid at 600 px and three at 900 px, and a hero that stacks its text and image on small screens. Test at 360, 768 and 1200 px widths and fix any overflow.",
        "concepts": [
          "Media queries",
          "CSS Grid",
          "Responsive testing"
        ],
        "hints": [
          "Use min-width media queries.",
          "Check for horizontal scroll at 360 px.",
          "Images must never overflow their container."
        ],
        "acceptanceCriteria": [
          "No horizontal scroll at 360 px",
          "The grid is 1, 2 then 3 columns",
          "Images scale with their containers"
        ],
        "tests": [
          "Open at 360 px wide",
          "Open at 768 px wide",
          "Open at 1200 px wide"
        ]
      },
      {
        "id": "proj-portfolio-responsive-portfolio-site-m4",
        "order": 4,
        "title": "Accessibility and polish",
        "objectives": [
          "Add alt text and labels",
          "Check colour contrast",
          "Validate the HTML"
        ],
        "instructions": "Add alt text to every image, labels to the contact form fields, and visible focus styles. Check the colour contrast of text against its background, validate the HTML, and finish the README with how to customise the content.",
        "concepts": [
          "Accessibility",
          "Colour contrast",
          "Validation"
        ],
        "hints": [
          "Every image needs alt text.",
          "Check contrast for body text and buttons.",
          "Validate the HTML with a validator."
        ],
        "acceptanceCriteria": [
          "All images have alt text",
          "Contrast passes for body text",
          "The HTML validates"
        ],
        "tests": [
          "Run an accessibility check",
          "Check the contrast ratios",
          "Validate the HTML"
        ]
      }
    ],
    "reviewChecklist": [
      "No horizontal scroll at 360 px",
      "The navigation works at every size",
      "All images have alt text",
      "The HTML validates",
      "The content is real, not placeholder text"
    ],
    "finalAssessment": [
      "Open the site at phone, tablet and desktop widths",
      "Navigate with the sticky header",
      "Tab through the page by keyboard",
      "Check the project grid at each width",
      "Validate the HTML"
    ],
    "portfolio": true
  },
  {
    "id": "proj-portfolio-product-landing-page",
    "slug": "product-landing-page",
    "level": 2,
    "title": "Product Landing Page",
    "description": "Build a landing page for a fictional product with pure HTML and CSS: a hero with a value proposition, feature sections, testimonials, pricing tables and a signup form. It teaches the conversion-focused layout pattern used by real product sites, with careful typography and spacing.",
    "skills": [
      "HTML",
      "CSS",
      "Landing page design",
      "Flexbox",
      "CSS Grid",
      "Typography",
      "Forms",
      "Responsive design"
    ],
    "language": "html",
    "functionalRequirements": [
      "Build a hero with a headline, subheadline and call-to-action button",
      "Add a features section with at least 4 features and icons",
      "Add a how-it-works section with 3 steps",
      "Add testimonials from 3 fictional customers",
      "Add a pricing section with 3 plans and a highlighted plan",
      "Add a signup form with name, email and plan selection",
      "Validate the form with HTML attributes and show clear errors",
      "Make the page responsive from phone to desktop"
    ],
    "nonFunctionalRequirements": [
      "The page has no horizontal scroll at 360 px",
      "The pricing highlight is the middle plan",
      "The form cannot be submitted with an empty or invalid email",
      "The page is readable at every screen size"
    ],
    "architecture": "A static site with no JavaScript: index.html with semantic sections for the hero, features, how-it-works, testimonials, pricing and signup, and styles.css with custom properties, a typographic scale, Flexbox for feature rows and CSS Grid for the pricing table, with media queries at 600 and 900 px.",
    "databaseSchema": "",
    "fileStructure": "product-landing-page/\n  index.html\n  styles.css\n  images/\n    hero.png\n  README.md",
    "taskBreakdown": [
      "Plan the page sections",
      "Build the hero and features",
      "Add testimonials and pricing",
      "Build the signup form",
      "Make it responsive",
      "Polish and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-product-landing-page-m1",
        "order": 1,
        "title": "Structure, hero and features",
        "objectives": [
          "Write semantic HTML",
          "Build the hero",
          "Add four features"
        ],
        "instructions": "Write the page structure with a header, hero, features, how-it-works, testimonials, pricing and signup sections. Build the hero with a headline stating the value proposition, a subheadline and a call-to-action button, and a features section with four features each with an icon, title and description.",
        "concepts": [
          "Semantic HTML",
          "Value proposition",
          "Feature design"
        ],
        "hints": [
          "State the benefit in the headline, not the feature.",
          "Keep feature descriptions to two sentences.",
          "Use real copy, not placeholder text."
        ],
        "acceptanceCriteria": [
          "The hero states the value proposition",
          "Four features are present",
          "The page has all six sections"
        ],
        "tests": [
          "Read the hero aloud",
          "Check the four features",
          "Inspect the page structure"
        ]
      },
      {
        "id": "proj-portfolio-product-landing-page-m2",
        "order": 2,
        "title": "Testimonials and pricing",
        "objectives": [
          "Add three testimonials",
          "Build three pricing plans",
          "Highlight the middle plan"
        ],
        "instructions": "Add a testimonials section with three quotes, names and roles, and a pricing section with three plans showing price, features and a button, with the middle plan visually highlighted as the recommended one.",
        "concepts": [
          "Social proof",
          "Pricing tables",
          "Visual hierarchy"
        ],
        "hints": [
          "Highlight the recommended plan with colour and scale.",
          "Keep the feature lists comparable.",
          "Testimonials need a name and a role."
        ],
        "acceptanceCriteria": [
          "Three testimonials are present",
          "Three plans are present",
          "The middle plan is highlighted"
        ],
        "tests": [
          "Check the testimonials",
          "Compare the three plans",
          "Check the highlight at mobile width"
        ]
      },
      {
        "id": "proj-portfolio-product-landing-page-m3",
        "order": 3,
        "title": "Signup form and validation",
        "objectives": [
          "Build the signup form",
          "Validate with HTML attributes",
          "Show clear errors"
        ],
        "instructions": "Build the signup form with name, email and plan selection, using required, type=email and labels for every field. Style the invalid state so errors are visible, and confirm the form cannot be submitted with an empty or invalid email.",
        "concepts": [
          "HTML forms",
          "Built-in validation",
          "Error states"
        ],
        "hints": [
          "Use type=email for the email field.",
          "Label every field.",
          "Style :invalid so errors are visible."
        ],
        "acceptanceCriteria": [
          "The form has name, email and plan fields",
          "An invalid email blocks submission",
          "Every field has a label"
        ],
        "tests": [
          "Submit with an empty email",
          "Submit with a bad email",
          "Submit a valid form"
        ]
      },
      {
        "id": "proj-portfolio-product-landing-page-m4",
        "order": 4,
        "title": "Responsive design and polish",
        "objectives": [
          "Make it responsive",
          "Check typography and spacing",
          "Validate the HTML"
        ],
        "instructions": "Add media queries so the features stack on phones, the pricing table stacks below 900 px, and the hero text scales down. Check the typographic scale and spacing are consistent, validate the HTML, and finish the README.",
        "concepts": [
          "Media queries",
          "Typography",
          "Validation"
        ],
        "hints": [
          "Stack the pricing cards on small screens.",
          "Keep the type scale consistent.",
          "Validate the HTML."
        ],
        "acceptanceCriteria": [
          "No horizontal scroll at 360 px",
          "Pricing stacks on phones",
          "The HTML validates"
        ],
        "tests": [
          "Open at 360, 768 and 1200 px",
          "Check the pricing layout at each width",
          "Validate the HTML"
        ]
      }
    ],
    "reviewChecklist": [
      "No horizontal scroll at 360 px",
      "The middle pricing plan is highlighted",
      "The form blocks invalid emails",
      "The copy is real, not placeholder text",
      "The HTML validates"
    ],
    "finalAssessment": [
      "Open the page at three widths",
      "Read the hero and features",
      "Compare the pricing plans",
      "Submit the form with a bad email",
      "Validate the HTML"
    ],
    "portfolio": true
  },
  {
    "id": "proj-portfolio-restaurant-website",
    "slug": "restaurant-website",
    "level": 2,
    "title": "Restaurant Website",
    "description": "Build a complete restaurant website with pure HTML and CSS: a hero with the restaurant's story, a menu with sections and prices, a gallery, opening hours, and a reservation form. It is a classic client-style project — the kind a local business would actually pay for.",
    "skills": [
      "HTML",
      "CSS",
      "Responsive design",
      "CSS Grid",
      "Forms",
      "Typography",
      "Accessibility"
    ],
    "language": "html",
    "functionalRequirements": [
      "Build a hero with the restaurant name, tagline and a reservation button",
      "Add an about section telling the restaurant's story",
      "Add a menu with starters, mains and desserts, each with a price",
      "Add a gallery of at least 6 food photos",
      "Add opening hours and a location section",
      "Add a reservation form with date, time, party size and contact details",
      "Validate the reservation form with HTML attributes",
      "Make the site responsive from phone to desktop"
    ],
    "nonFunctionalRequirements": [
      "The menu lists prices for every dish",
      "The site has no horizontal scroll at 360 px",
      "The reservation form cannot be submitted with a past date",
      "All images have alt text"
    ],
    "architecture": "A static site with no JavaScript: index.html with semantic sections for the hero, about, menu, gallery, hours, location and reservation, and styles.css with custom properties, a warm colour palette, CSS Grid for the menu and gallery, and media queries at 600 and 900 px.",
    "databaseSchema": "",
    "fileStructure": "restaurant-website/\n  index.html\n  styles.css\n  images/\n    dish-1.jpg\n  README.md",
    "taskBreakdown": [
      "Plan the sections and menu content",
      "Build the hero and about sections",
      "Build the menu",
      "Add the gallery, hours and location",
      "Build the reservation form",
      "Make it responsive and validate"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-restaurant-website-m1",
        "order": 1,
        "title": "Structure, hero and story",
        "objectives": [
          "Write semantic HTML",
          "Build the hero",
          "Write the restaurant story"
        ],
        "instructions": "Write the page with header, hero, about, menu, gallery, hours, location and reservation sections. Build the hero with the restaurant name, a tagline and a reservation button, and write a short, real story for the about section.",
        "concepts": [
          "Semantic HTML",
          "Storytelling",
          "Hero design"
        ],
        "hints": [
          "Write a real story, not placeholder text.",
          "The hero button links to the reservation form.",
          "Use one h1 only."
        ],
        "acceptanceCriteria": [
          "The hero has the name, tagline and button",
          "The about section tells a story",
          "There is exactly one h1"
        ],
        "tests": [
          "Open the site and read the hero",
          "Click the reservation button",
          "Check the heading order"
        ]
      },
      {
        "id": "proj-portfolio-restaurant-website-m2",
        "order": 2,
        "title": "Menu and gallery",
        "objectives": [
          "Build the menu with prices",
          "Add a 6-photo gallery",
          "Style both sections"
        ],
        "instructions": "Build the menu with three sections — starters, mains and desserts — each dish with a name, description and price. Add a gallery of six food photos in a CSS grid, each with alt text describing the dish.",
        "concepts": [
          "Menu design",
          "CSS Grid",
          "Alt text"
        ],
        "hints": [
          "Every dish needs a price.",
          "Group the menu by course.",
          "Describe each photo in its alt text."
        ],
        "acceptanceCriteria": [
          "Every dish has a price",
          "The gallery has six photos",
          "Every photo has alt text"
        ],
        "tests": [
          "Check every menu price",
          "Count the gallery photos",
          "Inspect the alt text"
        ]
      },
      {
        "id": "proj-portfolio-restaurant-website-m3",
        "order": 3,
        "title": "Hours, location and reservation form",
        "objectives": [
          "Show opening hours",
          "Show the location",
          "Build the reservation form"
        ],
        "instructions": "Add an opening-hours table with different hours for weekdays and weekends, a location section with the address, and a reservation form with name, date, time, party size and phone number, using the right input types and required attributes.",
        "concepts": [
          "Tables",
          "Forms",
          "Input types"
        ],
        "hints": [
          "Use type=date and type=time for the booking.",
          "Label every field.",
          "Show different weekend hours."
        ],
        "acceptanceCriteria": [
          "Hours differ between weekdays and weekends",
          "The form has all five fields",
          "Every field has a label"
        ],
        "tests": [
          "Check the hours table",
          "Fill in the reservation form",
          "Check each field has a label"
        ]
      },
      {
        "id": "proj-portfolio-restaurant-website-m4",
        "order": 4,
        "title": "Responsive design and validation",
        "objectives": [
          "Make it responsive",
          "Validate the form",
          "Validate the HTML"
        ],
        "instructions": "Add media queries so the menu and gallery stack on phones, and confirm the form cannot be submitted with a past date or an empty required field. Validate the HTML and finish the README.",
        "concepts": [
          "Media queries",
          "Form validation",
          "Validation"
        ],
        "hints": [
          "Set a min date on the date field.",
          "Stack the gallery on phones.",
          "Validate the HTML."
        ],
        "acceptanceCriteria": [
          "No horizontal scroll at 360 px",
          "A past date is rejected",
          "The HTML validates"
        ],
        "tests": [
          "Open at 360 px",
          "Try a past reservation date",
          "Validate the HTML"
        ]
      }
    ],
    "reviewChecklist": [
      "Every dish has a price",
      "No horizontal scroll at 360 px",
      "A past reservation date is rejected",
      "All images have alt text",
      "The HTML validates"
    ],
    "finalAssessment": [
      "Open the site at three widths",
      "Read the menu and check the prices",
      "View the gallery",
      "Try to book with a past date",
      "Validate the HTML"
    ],
    "portfolio": true
  },
  {
    "id": "proj-portfolio-css-design-system",
    "slug": "css-design-system",
    "level": 3,
    "title": "CSS Design System",
    "description": "Build a small CSS design system from scratch: design tokens, a typographic scale, buttons, forms, cards, alerts and a navigation bar, all documented on a single style-guide page. It teaches the skill behind every professional frontend — designing in systems, not one-off styles.",
    "skills": [
      "HTML",
      "CSS",
      "Design systems",
      "CSS custom properties",
      "Typography",
      "Component design",
      "Accessibility",
      "Documentation"
    ],
    "language": "html",
    "functionalRequirements": [
      "Define design tokens: colours, spacing, radii and shadows as custom properties",
      "Build a typographic scale with 6 heading sizes and body text",
      "Build button variants: primary, secondary, danger, ghost and disabled",
      "Build form components: inputs, selects, checkboxes and radios",
      "Build cards, alerts and badges",
      "Build a navigation bar and a footer using the system",
      "Document every component on a style-guide page with examples",
      "Support a dark theme with a single class toggle"
    ],
    "nonFunctionalRequirements": [
      "Every component uses tokens, never hardcoded values",
      "The dark theme changes all components",
      "Buttons meet contrast requirements in both themes",
      "The style guide shows every component with its code"
    ],
    "architecture": "A static style-guide site: tokens.css defining the custom properties, components.css with the component styles, and index.html documenting each component with a live example and its markup. A dark theme is a second set of token values under a .dark class on the root element.",
    "databaseSchema": "",
    "fileStructure": "css-design-system/\n  index.html\n  tokens.css\n  components.css\n  README.md",
    "taskBreakdown": [
      "Define the tokens",
      "Build the typographic scale",
      "Build buttons and forms",
      "Build cards, alerts and navigation",
      "Add the dark theme",
      "Document everything on the style guide"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-css-design-system-m1",
        "order": 1,
        "title": "Tokens and typography",
        "objectives": [
          "Define colour, spacing and radius tokens",
          "Build the type scale",
          "Apply tokens to the page"
        ],
        "instructions": "Create tokens.css with custom properties for colours (primary, text, background, border, success, warning, danger), a spacing scale, border radii and shadows. Build the typographic scale with six heading sizes and body text, all derived from the tokens.",
        "concepts": [
          "Design tokens",
          "Custom properties",
          "Type scale"
        ],
        "hints": [
          "Define every colour once, as a token.",
          "Use a consistent spacing scale.",
          "The type scale should be a clear ratio."
        ],
        "acceptanceCriteria": [
          "All colours come from tokens",
          "Six heading sizes exist",
          "No hardcoded colour appears in components"
        ],
        "tests": [
          "Search components.css for hardcoded colours",
          "Check the heading sizes",
          "Change a token and watch the page update"
        ]
      },
      {
        "id": "proj-portfolio-css-design-system-m2",
        "order": 2,
        "title": "Buttons and forms",
        "objectives": [
          "Build five button variants",
          "Style inputs and selects",
          "Style checkboxes and radios"
        ],
        "instructions": "Build the button variants — primary, secondary, danger, ghost and disabled — with hover and focus states, and form components: text inputs, selects, textareas, checkboxes and radios with labels, error states and focus rings.",
        "concepts": [
          "Component design",
          "States",
          "Focus styles"
        ],
        "hints": [
          "Every interactive element needs a focus style.",
          "The disabled button must look and be disabled.",
          "Error states need a message, not just colour."
        ],
        "acceptanceCriteria": [
          "Five button variants exist",
          "All form fields have labels",
          "Focus is visible on every control"
        ],
        "tests": [
          "Tab through the buttons and forms",
          "Check the disabled button",
          "Submit an empty required field"
        ]
      },
      {
        "id": "proj-portfolio-css-design-system-m3",
        "order": 3,
        "title": "Cards, alerts, badges and navigation",
        "objectives": [
          "Build cards",
          "Build alerts and badges",
          "Build the navigation bar"
        ],
        "instructions": "Build card components with a header, body and footer, alert variants for info, success, warning and error, badges in four colours, and a navigation bar with links and a mobile-friendly layout using the system's tokens throughout.",
        "concepts": [
          "Cards",
          "Alerts",
          "Navigation"
        ],
        "hints": [
          "Build components from tokens only.",
          "Alerts need an icon or label, not colour alone.",
          "The navigation must work on phones."
        ],
        "acceptanceCriteria": [
          "Cards, alerts and badges all render",
          "Alerts are distinguishable without colour",
          "The navigation works at 360 px"
        ],
        "tests": [
          "Check each component",
          "View the navigation at 360 px",
          "Check an alert without colour"
        ]
      },
      {
        "id": "proj-portfolio-css-design-system-m4",
        "order": 4,
        "title": "Dark theme and documentation",
        "objectives": [
          "Add the dark theme",
          "Document every component",
          "Check contrast in both themes"
        ],
        "instructions": "Add a dark theme as a second set of token values under a .dark class, with a toggle button on the style guide. Document every component with a live example and its markup, check contrast in both themes, and finish the README.",
        "concepts": [
          "Theming",
          "Documentation",
          "Contrast"
        ],
        "hints": [
          "The dark theme changes tokens, not components.",
          "Document the markup for every component.",
          "Check contrast in both themes."
        ],
        "acceptanceCriteria": [
          "Toggling dark changes every component",
          "Every component is documented with markup",
          "Contrast passes in both themes"
        ],
        "tests": [
          "Toggle the dark theme",
          "Check the contrast ratios",
          "Read the style guide end to end"
        ]
      }
    ],
    "reviewChecklist": [
      "Every component uses tokens only",
      "The dark theme changes all components",
      "Contrast passes in both themes",
      "Every component is documented with markup",
      "Alerts work without colour"
    ],
    "finalAssessment": [
      "Open the style guide and walk through it",
      "Toggle the dark theme",
      "Tab through the buttons and forms",
      "Change a token and watch the system update",
      "Check the contrast in both themes"
    ],
    "portfolio": true
  },
  {
    "id": "proj-portfolio-library-database-design",
    "slug": "library-database-design",
    "level": 2,
    "title": "Library Database Design",
    "description": "Design and build a complete database for a public library: books, authors, members and loans, with constraints that enforce the real rules — a book cannot be loaned twice, a member cannot borrow more than five books, and overdue loans are easy to find. It is the canonical database design project, done with real SQL.",
    "skills": [
      "SQL",
      "Database design",
      "SQLite",
      "Constraints",
      "Foreign keys",
      "Views",
      "Triggers",
      "Stored queries"
    ],
    "language": "sql",
    "functionalRequirements": [
      "Design tables for books, authors, members and loans",
      "Enforce foreign keys between all related tables",
      "Prevent loaning a book that is already on loan",
      "Limit each member to five active loans",
      "Seed the database with realistic data",
      "Write a view of currently loaned books with due dates",
      "Write a query listing overdue loans with fines",
      "Write a report of the most borrowed books and authors"
    ],
    "nonFunctionalRequirements": [
      "No book can be on loan twice at the same time",
      "No member has more than five active loans",
      "Every loan references an existing book and member",
      "Overdue loans are found by a single query"
    ],
    "architecture": "A SQLite database built from a schema.sql file: authors, books, a book_authors junction table, members, and loans with a returned_at column that is NULL while the book is out. Constraints and triggers enforce the lending rules, views expose current loans and overdue items, and a queries.sql file holds the reporting queries.",
    "databaseSchema": "authors: id INTEGER PK, name TEXT, birth_year INTEGER; books: id INTEGER PK, title TEXT, isbn TEXT UNIQUE, published_year INTEGER, copies INTEGER; book_authors: book_id INTEGER FK, author_id INTEGER FK, PRIMARY KEY (book_id, author_id); members: id INTEGER PK, name TEXT, email TEXT UNIQUE, joined_on TEXT; loans: id INTEGER PK, book_id INTEGER FK, member_id INTEGER FK, loaned_on TEXT, due_on TEXT, returned_at TEXT",
    "fileStructure": "library-database/\n  schema.sql\n  seed.sql\n  queries.sql\n  views.sql\n  tests.sql\n  README.md",
    "taskBreakdown": [
      "Design the schema and draw the relationships",
      "Write schema.sql with constraints",
      "Add triggers for the lending rules",
      "Seed realistic data",
      "Write the views and reporting queries",
      "Test the constraints",
      "Document the design in the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-library-database-design-m1",
        "order": 1,
        "title": "Schema design",
        "objectives": [
          "Draw the entity relationships",
          "Write schema.sql",
          "Choose keys and types"
        ],
        "instructions": "Design the schema on paper first: authors, books, members and loans, with a junction table for books with several authors. Write schema.sql with primary keys, foreign keys, a UNIQUE isbn, and NOT NULL on the fields that must always exist. Create the database and confirm all tables exist.",
        "concepts": [
          "ER design",
          "Primary keys",
          "Foreign keys"
        ],
        "hints": [
          "Draw the relationships before writing SQL.",
          "Use a junction table for many-to-many authors.",
          "Enable foreign keys in SQLite."
        ],
        "acceptanceCriteria": [
          "All five tables exist",
          "Foreign keys are declared",
          "ISBN is unique"
        ],
        "tests": [
          "Create the database and list the tables",
          "Inspect the schema",
          "Try to insert a duplicate ISBN"
        ]
      },
      {
        "id": "proj-portfolio-library-database-design-m2",
        "order": 2,
        "title": "Constraints and triggers",
        "objectives": [
          "Prevent double loans",
          "Limit members to five loans",
          "Test the rules"
        ],
        "instructions": "Add the lending rules: a partial unique index or trigger that prevents a second active loan for the same book, and a trigger that rejects a sixth active loan for a member. Test both by attempting the forbidden operations and confirming they fail.",
        "concepts": [
          "Triggers",
          "Partial indexes",
          "Business rules"
        ],
        "hints": [
          "Enforce the rules in the database, not just in the app.",
          "Test the rejection, not just the happy path.",
          "Keep the trigger logic simple and readable."
        ],
        "acceptanceCriteria": [
          "A second active loan for a book is rejected",
          "A sixth active loan is rejected",
          "Returning a book frees the slot"
        ],
        "tests": [
          "Loan a book twice",
          "Loan six books to one member",
          "Return a book and loan it again"
        ]
      },
      {
        "id": "proj-portfolio-library-database-design-m3",
        "order": 3,
        "title": "Views and overdue reports",
        "objectives": [
          "Build a current-loans view",
          "List overdue loans with fines",
          "Rank the most borrowed books"
        ],
        "instructions": "Write views.sql with a current_loans view joining loans, books and members with due dates, and queries for overdue loans with a fine computed per day overdue, the most borrowed books, and the most active members.",
        "concepts": [
          "Views",
          "JOINs",
          "Date arithmetic"
        ],
        "hints": [
          "Compute fines in the query from the due date.",
          "Use LEFT JOIN where a book may have no loans.",
          "Order reports by the metric that matters."
        ],
        "acceptanceCriteria": [
          "The current-loans view shows due dates",
          "Overdue loans list with fines",
          "The most borrowed books rank correctly"
        ],
        "tests": [
          "Run the current-loans view",
          "Run the overdue report",
          "Run the most-borrowed report"
        ]
      },
      {
        "id": "proj-portfolio-library-database-design-m4",
        "order": 4,
        "title": "Seed data, tests and docs",
        "objectives": [
          "Seed realistic data",
          "Test the constraints",
          "Document the design"
        ],
        "instructions": "Write seed.sql with at least 10 authors, 20 books and 15 members, plus loans in various states including overdue ones. Write tests.sql with checks that count rows, verify the constraints and confirm the reports, and document the design decisions in the README.",
        "concepts": [
          "Seed data",
          "SQL testing",
          "Documentation"
        ],
        "hints": [
          "Seed data in every state: on loan, returned, overdue.",
          "Test the constraints with failing inserts.",
          "Document why each rule lives in the database."
        ],
        "acceptanceCriteria": [
          "Seed data loads cleanly",
          "All constraint tests pass",
          "The README documents the design"
        ],
        "tests": [
          "Load the seed data and run the reports",
          "Run the constraint tests",
          "Read the README design notes"
        ]
      }
    ],
    "reviewChecklist": [
      "No book is on loan twice",
      "No member exceeds five active loans",
      "Every foreign key references a real row",
      "Overdue fines are computed from the due date",
      "Reports match hand-checked values"
    ],
    "finalAssessment": [
      "Create the database and show the schema",
      "Attempt a double loan and a sixth loan",
      "Show the current-loans view",
      "Show the overdue report with fines",
      "Run the constraint tests"
    ],
    "portfolio": true,
    "apis": [
      "SQL: sqlite3 library.db < schema.sql",
      "SQL: sqlite3 library.db < seed.sql",
      "SQL: sqlite3 library.db < queries.sql"
    ]
  },
  {
    "id": "proj-portfolio-ecommerce-reporting-queries",
    "slug": "ecommerce-reporting-queries",
    "level": 3,
    "title": "E-Commerce Reporting Queries",
    "description": "Build a reporting layer for an online store's database: a schema with customers, products, orders and order items, plus a library of reporting queries — revenue by month, top products, repeat customers, and cohort retention — that a business could run every week. It is pure SQL analytics, the skill behind every data analyst job.",
    "skills": [
      "SQL",
      "Analytics",
      "Window functions",
      "Aggregations",
      "CTEs",
      "SQLite",
      "Reporting",
      "Data modelling"
    ],
    "language": "sql",
    "functionalRequirements": [
      "Design the store schema: customers, products, orders and order items",
      "Seed realistic data across 12 months",
      "Report monthly revenue and month-over-month growth",
      "Rank the top 10 products by revenue and by units",
      "Find repeat customers and the repeat-purchase rate",
      "Compute average order value by month",
      "Build a cohort retention report by signup month",
      "Write every query as a readable, commented file"
    ],
    "nonFunctionalRequirements": [
      "Monthly revenue matches the sum of order items",
      "Growth is computed against the previous month",
      "Cohorts are grouped by signup month",
      "Every query runs in under a second on the seed data"
    ],
    "architecture": "A SQLite database from schema.sql and seed.sql, with a queries folder of one file per report. Reports use CTEs for readability and window functions for growth and running totals. A README documents each query, what it answers, and how to run it.",
    "databaseSchema": "customers: id INTEGER PK, name TEXT, email TEXT UNIQUE, signed_up_on TEXT; products: id INTEGER PK, name TEXT, category TEXT, price_cents INTEGER; orders: id INTEGER PK, customer_id INTEGER FK, ordered_on TEXT, status TEXT; order_items: id INTEGER PK, order_id INTEGER FK, product_id INTEGER FK, quantity INTEGER, unit_price_cents INTEGER",
    "fileStructure": "ecommerce-reporting/\n  schema.sql\n  seed.sql\n  queries/\n    monthly-revenue.sql\n    top-products.sql\n    repeat-customers.sql\n    average-order-value.sql\n    cohort-retention.sql\n    category-breakdown.sql\n  README.md",
    "taskBreakdown": [
      "Design the schema",
      "Seed 12 months of data",
      "Write the revenue and growth queries",
      "Write the product and customer queries",
      "Build the cohort retention report",
      "Verify every figure",
      "Document the queries"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-ecommerce-reporting-queries-m1",
        "order": 1,
        "title": "Schema and seed data",
        "objectives": [
          "Design the store schema",
          "Seed 12 months of orders",
          "Verify the seed data"
        ],
        "instructions": "Write schema.sql with customers, products, orders and order items with foreign keys, and seed.sql with at least 50 customers, 30 products and 500 orders spread across 12 months, including repeat buyers. Verify the row counts and that every order item references a real product.",
        "concepts": [
          "Schema design",
          "Seed data",
          "Referential integrity"
        ],
        "hints": [
          "Spread orders across all 12 months.",
          "Include repeat buyers deliberately.",
          "Store money as integer cents."
        ],
        "acceptanceCriteria": [
          "All tables are populated",
          "Orders span 12 months",
          "Every order item references a real product"
        ],
        "tests": [
          "Load the seed data and count the rows",
          "Check the date range",
          "Check for orphan order items"
        ]
      },
      {
        "id": "proj-portfolio-ecommerce-reporting-queries-m2",
        "order": 2,
        "title": "Revenue, growth and average order value",
        "objectives": [
          "Report monthly revenue",
          "Compute month-over-month growth",
          "Compute average order value"
        ],
        "instructions": "Write the monthly revenue query grouping by month, the growth query using a window function to compare with the previous month, and the average order value query. Verify the totals against a hand-computed month.",
        "concepts": [
          "GROUP BY",
          "Window functions",
          "LAG"
        ],
        "hints": [
          "Use LAG for the previous month.",
          "Compute revenue from order items, not a stored total.",
          "Verify one month by hand."
        ],
        "acceptanceCriteria": [
          "Monthly revenue matches the hand-checked month",
          "Growth is correct",
          "Average order value is correct"
        ],
        "tests": [
          "Run the revenue query",
          "Verify one month by hand",
          "Run the average-order-value query"
        ]
      },
      {
        "id": "proj-portfolio-ecommerce-reporting-queries-m3",
        "order": 3,
        "title": "Products and customers",
        "objectives": [
          "Rank the top products",
          "Find repeat customers",
          "Break down revenue by category"
        ],
        "instructions": "Write the top-10 products query by revenue and by units, the repeat-customer query counting customers with more than one order and the repeat rate, and the category breakdown with each category's share of revenue.",
        "concepts": [
          "Ranking",
          "HAVING",
          "Repeat rate"
        ],
        "hints": [
          "Rank by revenue and by units separately.",
          "The repeat rate is repeat customers over all customers.",
          "Category shares must sum to 100."
        ],
        "acceptanceCriteria": [
          "The top product is correct",
          "The repeat rate is correct",
          "Category shares sum to 100"
        ],
        "tests": [
          "Run the top-products query",
          "Run the repeat-customer query",
          "Run the category breakdown"
        ]
      },
      {
        "id": "proj-portfolio-ecommerce-reporting-queries-m4",
        "order": 4,
        "title": "Cohort retention and documentation",
        "objectives": [
          "Build the cohort retention report",
          "Verify the cohorts",
          "Document every query"
        ],
        "instructions": "Build the cohort retention report: group customers by signup month, then for each cohort show how many ordered again in the following months. Verify the first cohort by hand, and document every query in the README with the business question it answers.",
        "concepts": [
          "Cohorts",
          "Retention",
          "Documentation"
        ],
        "hints": [
          "Group cohorts by signup month.",
          "Count a customer once per month.",
          "Document the question each query answers."
        ],
        "acceptanceCriteria": [
          "Cohorts are grouped by signup month",
          "Retention figures match hand checks",
          "The README documents every query"
        ],
        "tests": [
          "Run the cohort report",
          "Verify the first cohort by hand",
          "Read the README"
        ]
      }
    ],
    "reviewChecklist": [
      "Monthly revenue matches the order items",
      "Growth uses the previous month",
      "Category shares sum to 100",
      "Cohort retention is hand-verified",
      "Every query is commented and readable"
    ],
    "finalAssessment": [
      "Show the schema and seed data",
      "Run the revenue and growth queries",
      "Show the top products and repeat rate",
      "Show the cohort retention report",
      "Verify one month by hand"
    ],
    "portfolio": true,
    "apis": [
      "SQL: sqlite3 store.db < schema.sql",
      "SQL: sqlite3 store.db < seed.sql",
      "SQL: sqlite3 store.db < queries/monthly-revenue.sql"
    ]
  },
  {
    "id": "proj-portfolio-hr-analytics-schema",
    "slug": "hr-analytics-schema",
    "level": 2,
    "title": "HR Analytics Database",
    "description": "Design a database for a company's HR team: employees, departments, salaries and job history, plus the queries HR actually runs — headcount by department, average salary by role, tenure, and turnover. It teaches relational design with slowly changing data and the aggregate queries behind people analytics.",
    "skills": [
      "SQL",
      "Database design",
      "Aggregations",
      "Date arithmetic",
      "Views",
      "SQLite",
      "Reporting"
    ],
    "language": "sql",
    "functionalRequirements": [
      "Design tables for departments, employees, salaries and job history",
      "Track salary changes over time with effective dates",
      "Seed data for at least 5 departments and 60 employees",
      "Report headcount and average salary by department",
      "Report average tenure by department",
      "Find employees due a salary review",
      "Report turnover by year",
      "Write a view of current employees with their current salary"
    ],
    "nonFunctionalRequirements": [
      "Every employee belongs to a real department",
      "Salary history has no gaps or overlaps per employee",
      "Current salary is the latest effective salary",
      "Turnover is computed from actual leaving dates"
    ],
    "architecture": "A SQLite database from schema.sql: departments, employees with hire and leaving dates, a salaries table with effective-from and effective-to dates, and a job_history table. Views expose current employees with their current salary, and queries.sql holds the HR reports.",
    "databaseSchema": "departments: id INTEGER PK, name TEXT UNIQUE, location TEXT; employees: id INTEGER PK, name TEXT, email TEXT UNIQUE, department_id INTEGER FK, job_title TEXT, hired_on TEXT, left_on TEXT; salaries: id INTEGER PK, employee_id INTEGER FK, amount_cents INTEGER, effective_from TEXT, effective_to TEXT; job_history: id INTEGER PK, employee_id INTEGER FK, job_title TEXT, department_id INTEGER FK, started_on TEXT, ended_on TEXT",
    "fileStructure": "hr-analytics/\n  schema.sql\n  seed.sql\n  views.sql\n  queries.sql\n  tests.sql\n  README.md",
    "taskBreakdown": [
      "Design the schema",
      "Write schema.sql with constraints",
      "Seed departments and employees",
      "Build the current-employee view",
      "Write the HR reports",
      "Test the salary history",
      "Document the design"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-hr-analytics-schema-m1",
        "order": 1,
        "title": "Schema design",
        "objectives": [
          "Design departments, employees and salaries",
          "Write schema.sql",
          "Enforce foreign keys"
        ],
        "instructions": "Design the schema with departments, employees, a salaries history table and a job history table. Write schema.sql with primary keys, foreign keys, a unique email, and a check that a leaving date is not before the hire date. Create the database and confirm the tables.",
        "concepts": [
          "Schema design",
          "Check constraints",
          "Foreign keys"
        ],
        "hints": [
          "Model salary as history, not a single value.",
          "Add a check for leaving after hiring.",
          "Enable foreign keys."
        ],
        "acceptanceCriteria": [
          "All four tables exist",
          "Email is unique",
          "A leaving date before hiring is rejected"
        ],
        "tests": [
          "Create the database and list the tables",
          "Insert an employee with a bad leaving date",
          "Inspect the schema"
        ]
      },
      {
        "id": "proj-portfolio-hr-analytics-schema-m2",
        "order": 2,
        "title": "Seed data and salary history",
        "objectives": [
          "Seed 5 departments and 60 employees",
          "Seed salary changes",
          "Check for gaps in salary history"
        ],
        "instructions": "Write seed.sql with five departments, at least 60 employees across roles and hire dates, and salary changes over time for at least 20 employees. Verify that each employee's salary periods do not overlap and that every employee has a current salary.",
        "concepts": [
          "Seed data",
          "Effective dating",
          "Data quality"
        ],
        "hints": [
          "Give salary changes realistic dates.",
          "Check for overlapping salary periods.",
          "Include employees who have left."
        ],
        "acceptanceCriteria": [
          "At least 60 employees are seeded",
          "No salary periods overlap",
          "Every employee has a current salary"
        ],
        "tests": [
          "Load the seed data and count rows",
          "Check for overlapping salary periods",
          "Find employees with no current salary"
        ]
      },
      {
        "id": "proj-portfolio-hr-analytics-schema-m3",
        "order": 3,
        "title": "Current employees and HR reports",
        "objectives": [
          "Build the current-employee view",
          "Report headcount and average salary",
          "Report tenure"
        ],
        "instructions": "Write views.sql with a current_employees view joining each employee to their latest salary, then queries for headcount and average salary by department, average tenure by department, and employees due a salary review after 12 months without a change.",
        "concepts": [
          "Views",
          "Aggregations",
          "Date arithmetic"
        ],
        "hints": [
          "The current salary is the latest effective one.",
          "Compute tenure from the hire date.",
          "Exclude employees who have left from headcount."
        ],
        "acceptanceCriteria": [
          "The view shows the correct current salary",
          "Headcount excludes leavers",
          "Tenure figures are correct"
        ],
        "tests": [
          "Run the current-employees view",
          "Run the headcount report",
          "Run the tenure report"
        ]
      },
      {
        "id": "proj-portfolio-hr-analytics-schema-m4",
        "order": 4,
        "title": "Turnover, tests and docs",
        "objectives": [
          "Report turnover by year",
          "Test the reports",
          "Document the design"
        ],
        "instructions": "Write the turnover query grouping leavers by year and department, and tests.sql verifying the headcount, the salary history and the turnover figures against hand-checked values. Document the effective-dating design in the README.",
        "concepts": [
          "Turnover",
          "Testing",
          "Documentation"
        ],
        "hints": [
          "Turnover counts leavers by year.",
          "Verify one department by hand.",
          "Document the salary history design."
        ],
        "acceptanceCriteria": [
          "Turnover figures match hand checks",
          "All tests pass",
          "The README documents the design"
        ],
        "tests": [
          "Run the turnover report",
          "Verify one department by hand",
          "Run the tests"
        ]
      }
    ],
    "reviewChecklist": [
      "Every employee belongs to a real department",
      "Salary periods never overlap",
      "Headcount excludes leavers",
      "Turnover matches hand-checked values",
      "Current salary is the latest effective one"
    ],
    "finalAssessment": [
      "Show the schema and seed data",
      "Show the current-employees view",
      "Show headcount and average salary by department",
      "Show the turnover report",
      "Run the tests"
    ],
    "portfolio": true,
    "apis": [
      "SQL: sqlite3 hr.db < schema.sql",
      "SQL: sqlite3 hr.db < seed.sql",
      "SQL: sqlite3 hr.db < queries.sql"
    ]
  },
  {
    "id": "proj-portfolio-sales-data-warehouse",
    "slug": "sales-data-warehouse",
    "level": 3,
    "title": "Sales Data Warehouse",
    "description": "Build a small star-schema data warehouse for sales: dimension tables for products, customers, stores and dates, a fact table for sales, and the analytical queries a warehouse exists for — year-over-year growth, top stores, and product affinity. It is the project that turns SQL skills into data-engineering skills.",
    "skills": [
      "SQL",
      "Data warehousing",
      "Star schema",
      "ETL",
      "Dimensions and facts",
      "Window functions",
      "SQLite",
      "Analytics"
    ],
    "language": "sql",
    "functionalRequirements": [
      "Design a star schema with product, customer, store and date dimensions",
      "Build a sales fact table with foreign keys to every dimension",
      "Load the warehouse from a flat sales CSV with an ETL script",
      "Handle slowly changing product prices with a new dimension row",
      "Report revenue by store, by product category and by month",
      "Compute year-over-year growth with window functions",
      "Find products frequently bought together",
      "Document the grain of the fact table"
    ],
    "nonFunctionalRequirements": [
      "Every fact row references a real dimension row",
      "The fact table grain is one row per sale line",
      "Revenue totals match the source CSV",
      "Year-over-year growth uses the same month last year"
    ],
    "architecture": "A SQLite warehouse built by an ETL script: a Python loader reads the flat sales CSV, upserts dimension rows, and inserts fact rows. The schema is a star: dim_product, dim_customer, dim_store, dim_date and fact_sales. Analytical queries use window functions and self-joins for affinity.",
    "databaseSchema": "dim_product: product_key INTEGER PK, product_id TEXT, name TEXT, category TEXT, price_cents INTEGER, effective_from TEXT, effective_to TEXT; dim_customer: customer_key INTEGER PK, customer_id TEXT, name TEXT, region TEXT; dim_store: store_key INTEGER PK, store_id TEXT, name TEXT, city TEXT; dim_date: date_key INTEGER PK, date TEXT, year INTEGER, month INTEGER, quarter INTEGER; fact_sales: id INTEGER PK, product_key INTEGER FK, customer_key INTEGER FK, store_key INTEGER FK, date_key INTEGER FK, quantity INTEGER, amount_cents INTEGER",
    "fileStructure": "sales-data-warehouse/\n  schema.sql\n  etl/\n    load.py\n  queries/\n    revenue-by-store.sql\n    revenue-by-category.sql\n    year-over-year.sql\n    product-affinity.sql\n  data/\n    sales.csv\n  README.md",
    "taskBreakdown": [
      "Design the star schema",
      "Write schema.sql",
      "Build the ETL loader",
      "Load the warehouse",
      "Write the analytical queries",
      "Verify totals against the source",
      "Document the grain and design"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-sales-data-warehouse-m1",
        "order": 1,
        "title": "Star schema design",
        "objectives": [
          "Design the dimensions and fact",
          "Write schema.sql",
          "Document the grain"
        ],
        "instructions": "Design the star schema: four dimension tables and one fact table, and document the grain — one row per sale line — in the README. Write schema.sql with foreign keys from the fact table to every dimension and create the warehouse.",
        "concepts": [
          "Star schema",
          "Dimensions",
          "Fact grain"
        ],
        "hints": [
          "Document the grain before writing the schema.",
          "Every fact row needs all four foreign keys.",
          "Keep surrogate keys separate from business ids."
        ],
        "acceptanceCriteria": [
          "All five tables exist",
          "The fact table references every dimension",
          "The grain is documented"
        ],
        "tests": [
          "Create the warehouse and list the tables",
          "Inspect the foreign keys",
          "Read the grain documentation"
        ]
      },
      {
        "id": "proj-portfolio-sales-data-warehouse-m2",
        "order": 2,
        "title": "ETL: loading the warehouse",
        "objectives": [
          "Write the loader",
          "Upsert dimensions",
          "Insert fact rows"
        ],
        "instructions": "Write the ETL loader in Python: read the flat sales CSV, upsert dimension rows for products, customers, stores and dates, and insert one fact row per sale line with the right surrogate keys. A second load of the same file must not duplicate fact rows.",
        "concepts": [
          "ETL",
          "Upserts",
          "Surrogate keys"
        ],
        "hints": [
          "Upsert dimensions by business id.",
          "Make the load idempotent.",
          "Store money as integer cents."
        ],
        "acceptanceCriteria": [
          "Loading creates dimension and fact rows",
          "A second load adds no duplicates",
          "Every fact row references real dimensions"
        ],
        "tests": [
          "Load the sample CSV",
          "Load it again and count the rows",
          "Check for orphan fact rows"
        ]
      },
      {
        "id": "proj-portfolio-sales-data-warehouse-m3",
        "order": 3,
        "title": "Analytical queries",
        "objectives": [
          "Report revenue by store and category",
          "Compute year-over-year growth",
          "Find product affinity"
        ],
        "instructions": "Write the analytical queries: revenue by store and by category, year-over-year growth using LAG over the same month last year, and product affinity by self-joining fact rows on the same order to find pairs bought together.",
        "concepts": [
          "Window functions",
          "LAG",
          "Self-joins"
        ],
        "hints": [
          "Compare each month with the same month last year.",
          "Count affinity pairs per order, not per row.",
          "Verify one figure by hand."
        ],
        "acceptanceCriteria": [
          "Revenue by store matches the source",
          "Year-over-year growth is correct",
          "Affinity finds real pairs"
        ],
        "tests": [
          "Run the revenue queries",
          "Run the year-over-year query",
          "Run the affinity query"
        ]
      },
      {
        "id": "proj-portfolio-sales-data-warehouse-m4",
        "order": 4,
        "title": "Slowly changing dimensions and docs",
        "objectives": [
          "Handle a price change as a new dimension row",
          "Verify totals",
          "Document the design"
        ],
        "instructions": "Handle a product price change by closing the old dimension row and opening a new one, so history keeps the old price. Verify the warehouse totals match the source CSV, and document the star schema, the ETL and the slowly changing dimension approach in the README.",
        "concepts": [
          "Slowly changing dimensions",
          "Verification",
          "Documentation"
        ],
        "hints": [
          "Close the old row before opening the new one.",
          "Old facts keep the old price.",
          "Verify totals against the source CSV."
        ],
        "acceptanceCriteria": [
          "A price change creates a new dimension row",
          "Old facts keep the old price",
          "Totals match the source CSV"
        ],
        "tests": [
          "Change a price and reload",
          "Check the old facts",
          "Compare warehouse totals with the CSV"
        ]
      }
    ],
    "reviewChecklist": [
      "Every fact row references real dimensions",
      "The grain is one row per sale line",
      "Loads are idempotent",
      "Totals match the source CSV",
      "Year-over-year compares the same month"
    ],
    "finalAssessment": [
      "Show the star schema",
      "Load the warehouse and check the counts",
      "Run the revenue and growth queries",
      "Show the product affinity results",
      "Demonstrate a price change"
    ],
    "portfolio": true,
    "apis": [
      "SQL: sqlite3 warehouse.db < schema.sql",
      "CLI: python -m etl load --input sales.csv --db warehouse.db",
      "SQL: sqlite3 warehouse.db < queries/year-over-year.sql"
    ]
  },
  {
    "id": "proj-portfolio-hospital-records-database",
    "slug": "hospital-records-database",
    "level": 2,
    "title": "Hospital Records Database",
    "description": "Design a database for a small hospital: patients, doctors, appointments and treatments, with the constraints that keep medical records safe — no double-booked doctors, no appointment without a patient, and a complete audit trail. It is a domain-modelling project where getting the rules right matters.",
    "skills": [
      "SQL",
      "Database design",
      "Constraints",
      "Triggers",
      "Views",
      "SQLite",
      "Data modelling",
      "Audit trails"
    ],
    "language": "sql",
    "functionalRequirements": [
      "Design tables for patients, doctors, appointments and treatments",
      "Prevent double-booking a doctor at the same time",
      "Require every appointment to reference a real patient and doctor",
      "Seed data for at least 10 doctors and 50 patients",
      "Write a view of today's appointments per doctor",
      "Write a query for a patient's full treatment history",
      "Record every change to appointments in an audit table",
      "Report the busiest doctors and the most common treatments"
    ],
    "nonFunctionalRequirements": [
      "No doctor is double-booked",
      "Every appointment references a real patient and doctor",
      "Every change is recorded in the audit table",
      "A patient's history is complete and in order"
    ],
    "architecture": "A SQLite database from schema.sql: patients, doctors, appointments with a status, treatments linked to appointments, and an audit_log table written by triggers. Views expose today's schedule per doctor, and queries.sql holds the patient history and workload reports.",
    "databaseSchema": "patients: id INTEGER PK, name TEXT, date_of_birth TEXT, phone TEXT, created_at TEXT; doctors: id INTEGER PK, name TEXT, speciality TEXT, email TEXT UNIQUE; appointments: id INTEGER PK, patient_id INTEGER FK, doctor_id INTEGER FK, starts_at TEXT, ends_at TEXT, status TEXT; treatments: id INTEGER PK, appointment_id INTEGER FK, description TEXT, cost_cents INTEGER; audit_log: id INTEGER PK, table_name TEXT, row_id INTEGER, action TEXT, changed_at TEXT, details TEXT",
    "fileStructure": "hospital-records/\n  schema.sql\n  seed.sql\n  views.sql\n  queries.sql\n  tests.sql\n  README.md",
    "taskBreakdown": [
      "Design the schema",
      "Write schema.sql with constraints",
      "Add the double-booking trigger",
      "Add the audit triggers",
      "Seed realistic data",
      "Write the views and reports",
      "Test the rules and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-hospital-records-database-m1",
        "order": 1,
        "title": "Schema design",
        "objectives": [
          "Design patients, doctors and appointments",
          "Write schema.sql",
          "Enforce foreign keys"
        ],
        "instructions": "Design the schema with patients, doctors, appointments and treatments, plus an audit log table. Write schema.sql with primary keys, foreign keys, a unique doctor email, and a check that an appointment ends after it starts. Create the database and confirm the tables.",
        "concepts": [
          "Schema design",
          "Check constraints",
          "Foreign keys"
        ],
        "hints": [
          "Model appointments with start and end times.",
          "Add a check that ends_at is after starts_at.",
          "Enable foreign keys."
        ],
        "acceptanceCriteria": [
          "All five tables exist",
          "An appointment ending before it starts is rejected",
          "Foreign keys are declared"
        ],
        "tests": [
          "Create the database and list the tables",
          "Insert a bad appointment",
          "Inspect the schema"
        ]
      },
      {
        "id": "proj-portfolio-hospital-records-database-m2",
        "order": 2,
        "title": "Double-booking and audit rules",
        "objectives": [
          "Prevent double-booking",
          "Audit every change",
          "Test both rules"
        ],
        "instructions": "Add a trigger that rejects an appointment overlapping another appointment for the same doctor, and triggers that write to the audit log on insert, update and delete of appointments. Test both by attempting a double booking and by changing an appointment.",
        "concepts": [
          "Triggers",
          "Overlapping intervals",
          "Audit trails"
        ],
        "hints": [
          "Check for overlapping intervals, not just equal start times.",
          "Audit inserts, updates and deletes.",
          "Test the rejection."
        ],
        "acceptanceCriteria": [
          "A double booking is rejected",
          "A non-overlapping appointment is accepted",
          "Changes appear in the audit log"
        ],
        "tests": [
          "Book two overlapping appointments",
          "Book a back-to-back appointment",
          "Change an appointment and check the log"
        ]
      },
      {
        "id": "proj-portfolio-hospital-records-database-m3",
        "order": 3,
        "title": "Views and patient history",
        "objectives": [
          "Build today's schedule view",
          "Show a patient's full history",
          "Report the busiest doctors"
        ],
        "instructions": "Write views.sql with a today's-schedule view per doctor, and queries for a single patient's complete treatment history in date order, the busiest doctors by appointment count, and the most common treatments.",
        "concepts": [
          "Views",
          "JOINs",
          "Ordering"
        ],
        "hints": [
          "Order patient history by date.",
          "Join treatments through appointments.",
          "Count appointments per doctor for workload."
        ],
        "acceptanceCriteria": [
          "Today's schedule shows the right appointments",
          "A patient history is complete and ordered",
          "The busiest doctor is correct"
        ],
        "tests": [
          "Run the schedule view",
          "Run a patient history",
          "Run the workload report"
        ]
      },
      {
        "id": "proj-portfolio-hospital-records-database-m4",
        "order": 4,
        "title": "Seed data, tests and docs",
        "objectives": [
          "Seed realistic data",
          "Test the constraints",
          "Document the design"
        ],
        "instructions": "Write seed.sql with at least 10 doctors, 50 patients and appointments in the past, today and the future, plus treatments. Write tests.sql verifying the constraints and the reports, and document the design and the rules in the README.",
        "concepts": [
          "Seed data",
          "SQL testing",
          "Documentation"
        ],
        "hints": [
          "Seed appointments in the past, today and future.",
          "Test the double-booking rejection.",
          "Document the audit approach."
        ],
        "acceptanceCriteria": [
          "Seed data loads cleanly",
          "All constraint tests pass",
          "The README documents the rules"
        ],
        "tests": [
          "Load the seed data and run the reports",
          "Run the constraint tests",
          "Read the README"
        ]
      }
    ],
    "reviewChecklist": [
      "No doctor is double-booked",
      "Every appointment references real people",
      "Every change is audited",
      "Patient histories are complete and ordered",
      "Reports match hand-checked values"
    ],
    "finalAssessment": [
      "Show the schema",
      "Attempt a double booking",
      "Show today's schedule for a doctor",
      "Show a patient's full history",
      "Run the constraint tests"
    ],
    "portfolio": true,
    "apis": [
      "SQL: sqlite3 hospital.db < schema.sql",
      "SQL: sqlite3 hospital.db < seed.sql",
      "SQL: sqlite3 hospital.db < queries.sql"
    ]
  },
  {
    "id": "proj-portfolio-university-enrollment-schema",
    "slug": "university-enrollment-schema",
    "level": 2,
    "title": "University Enrollment Database",
    "description": "Design a database for a university: students, courses, enrollments and grades, with the rules that keep academic records consistent — a student cannot enroll twice in the same course, prerequisites are enforced, and GPAs are computed from real grades. It is a clean relational design project with real-world rules.",
    "skills": [
      "SQL",
      "Database design",
      "Constraints",
      "Views",
      "Aggregations",
      "SQLite",
      "GPA calculation"
    ],
    "language": "sql",
    "functionalRequirements": [
      "Design tables for students, courses, enrollments and grades",
      "Prevent duplicate enrollments in the same course",
      "Enforce course capacity limits",
      "Seed data for at least 100 students and 20 courses",
      "Compute each student's GPA from their grades",
      "Report the average grade per course",
      "List students on the dean's list with a GPA above 3.5",
      "Report enrollment counts per course against capacity"
    ],
    "nonFunctionalRequirements": [
      "No student enrolls twice in the same course",
      "No course exceeds its capacity",
      "GPA is computed from actual grades",
      "Every enrollment references a real student and course"
    ],
    "architecture": "A SQLite database from schema.sql: students, courses with a capacity and a prerequisite course, enrollments with a unique student and course pair, and grades linked to enrollments. Views expose student GPAs and course averages, and queries.sql holds the academic reports.",
    "databaseSchema": "students: id INTEGER PK, name TEXT, email TEXT UNIQUE, enrolled_on TEXT; courses: id INTEGER PK, code TEXT UNIQUE, title TEXT, capacity INTEGER, prerequisite_id INTEGER FK; enrollments: id INTEGER PK, student_id INTEGER FK, course_id INTEGER FK, enrolled_on TEXT, UNIQUE (student_id, course_id); grades: id INTEGER PK, enrollment_id INTEGER FK, grade TEXT, points REAL",
    "fileStructure": "university-enrollment/\n  schema.sql\n  seed.sql\n  views.sql\n  queries.sql\n  tests.sql\n  README.md",
    "taskBreakdown": [
      "Design the schema",
      "Write schema.sql with constraints",
      "Seed students and courses",
      "Build the GPA view",
      "Write the academic reports",
      "Test the rules and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-university-enrollment-schema-m1",
        "order": 1,
        "title": "Schema design",
        "objectives": [
          "Design students, courses and enrollments",
          "Write schema.sql",
          "Enforce uniqueness"
        ],
        "instructions": "Design the schema with students, courses, enrollments and grades, including a self-referencing prerequisite on courses. Write schema.sql with primary keys, foreign keys, a unique course code, a unique student email, and a unique pair on enrollments. Create the database and confirm the tables.",
        "concepts": [
          "Schema design",
          "Self-referencing keys",
          "Unique constraints"
        ],
        "hints": [
          "Use a unique pair for enrollments.",
          "Model prerequisites as a self-referencing foreign key.",
          "Enable foreign keys."
        ],
        "acceptanceCriteria": [
          "All four tables exist",
          "A duplicate enrollment is rejected",
          "Course codes are unique"
        ],
        "tests": [
          "Create the database and list the tables",
          "Enroll the same student twice",
          "Insert a duplicate course code"
        ]
      },
      {
        "id": "proj-portfolio-university-enrollment-schema-m2",
        "order": 2,
        "title": "Capacity and prerequisites",
        "objectives": [
          "Enforce course capacity",
          "Enforce prerequisites",
          "Test both rules"
        ],
        "instructions": "Add a trigger that rejects an enrollment when the course is full, and a check that a student has passed the prerequisite course before enrolling. Test both rules with attempts that should fail and ones that should succeed.",
        "concepts": [
          "Triggers",
          "Capacity",
          "Prerequisites"
        ],
        "hints": [
          "Count current enrollments in the trigger.",
          "Check the prerequisite grade, not just enrollment.",
          "Test both the rejection and the acceptance."
        ],
        "acceptanceCriteria": [
          "An enrollment over capacity is rejected",
          "An enrollment without the prerequisite is rejected",
          "A valid enrollment succeeds"
        ],
        "tests": [
          "Fill a course and try one more enrollment",
          "Enroll without the prerequisite",
          "Enroll with the prerequisite passed"
        ]
      },
      {
        "id": "proj-portfolio-university-enrollment-schema-m3",
        "order": 3,
        "title": "GPA and course reports",
        "objectives": [
          "Build the GPA view",
          "Report average grades per course",
          "List the dean's list"
        ],
        "instructions": "Write views.sql with a student GPA view averaging grade points over completed enrollments, then queries for the average grade per course, the dean's list of students with a GPA above 3.5, and enrollment counts per course against capacity.",
        "concepts": [
          "Views",
          "Aggregations",
          "GPA"
        ],
        "hints": [
          "Average only completed grades.",
          "Use the grade points, not the letters.",
          "Order the dean's list by GPA."
        ],
        "acceptanceCriteria": [
          "GPAs match hand-computed values",
          "Course averages are correct",
          "The dean's list is correct"
        ],
        "tests": [
          "Run the GPA view",
          "Verify one student's GPA by hand",
          "Run the dean's list"
        ]
      },
      {
        "id": "proj-portfolio-university-enrollment-schema-m4",
        "order": 4,
        "title": "Seed data, tests and docs",
        "objectives": [
          "Seed realistic data",
          "Test the constraints",
          "Document the design"
        ],
        "instructions": "Write seed.sql with at least 100 students, 20 courses and enrollments with grades across several terms. Write tests.sql verifying the constraints and the GPA calculations, and document the design in the README.",
        "concepts": [
          "Seed data",
          "SQL testing",
          "Documentation"
        ],
        "hints": [
          "Seed grades across several terms.",
          "Test the capacity and prerequisite rules.",
          "Document the GPA calculation."
        ],
        "acceptanceCriteria": [
          "Seed data loads cleanly",
          "All constraint tests pass",
          "The README documents the design"
        ],
        "tests": [
          "Load the seed data and run the reports",
          "Run the constraint tests",
          "Verify a GPA by hand"
        ]
      }
    ],
    "reviewChecklist": [
      "No duplicate enrollments",
      "No course exceeds capacity",
      "GPAs match hand-computed values",
      "Prerequisites are enforced",
      "Every enrollment references real rows"
    ],
    "finalAssessment": [
      "Show the schema",
      "Attempt a duplicate enrollment and an over-capacity one",
      "Show a student's GPA and verify it by hand",
      "Show the dean's list",
      "Run the constraint tests"
    ],
    "portfolio": true,
    "apis": [
      "SQL: sqlite3 university.db < schema.sql",
      "SQL: sqlite3 university.db < seed.sql",
      "SQL: sqlite3 university.db < queries.sql"
    ]
  },
  {
    "id": "proj-portfolio-library-management-java",
    "slug": "library-management-java",
    "level": 2,
    "title": "Library Management Service in Java",
    "description": "Build a small library management service in Java: a console and HTTP service that manages books and members, handles borrowing and returns, and persists data to disk as JSON. It teaches the Java skills hiring managers check first — classes, collections, file I/O, and a clean layered design.",
    "skills": [
      "Java",
      "Object-oriented design",
      "Collections",
      "JSON persistence",
      "HTTP servers",
      "CLI design",
      "Testing",
      "Layered architecture"
    ],
    "language": "java",
    "functionalRequirements": [
      "Add, list, search and remove books",
      "Register members and list them",
      "Borrow a book for a member and record the due date",
      "Return a book and compute a fine when overdue",
      "Prevent borrowing a book that is already on loan",
      "Limit each member to five active loans",
      "Persist all data to a JSON file between runs",
      "Serve the same operations over a small HTTP API"
    ],
    "nonFunctionalRequirements": [
      "A book on loan cannot be borrowed again",
      "No member has more than five active loans",
      "Data survives a restart",
      "Overdue fines are computed from the due date"
    ],
    "architecture": "A Java application with a layered design: model classes for Book, Member and Loan, a repository that reads and writes a JSON file, a service layer enforcing the borrowing rules, a CLI, and a small HTTP server using the built-in com.sun.net.httpserver package. No external dependencies are required.",
    "databaseSchema": "",
    "fileStructure": "library-management-java/\n  src/\n    main/\n      java/\n        library/\n          Main.java\n          model/\n            Book.java\n            Member.java\n            Loan.java\n          store/\n            JsonStore.java\n          service/\n            LibraryService.java\n          cli/\n            Cli.java\n          http/\n            LibraryServer.java\n    test/\n      java/\n        library/\n          LibraryServiceTest.java\n  README.md",
    "taskBreakdown": [
      "Design the model classes",
      "Implement JSON persistence",
      "Build the service with borrowing rules",
      "Add the CLI",
      "Add the HTTP server",
      "Write tests and the README"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-library-management-java-m1",
        "order": 1,
        "title": "Models and JSON persistence",
        "objectives": [
          "Create the model classes",
          "Implement JSON read and write",
          "Persist data between runs"
        ],
        "instructions": "Create the Book, Member and Loan classes with fields, constructors and getters, and a JsonStore that writes the whole library state to a JSON file and reads it back. Use only the standard library for JSON: write a small writer and parser, or use a simple line-based format documented in the code. Verify the data survives a restart.",
        "concepts": [
          "Classes",
          "Encapsulation",
          "File I/O"
        ],
        "hints": [
          "Keep the JSON format simple and documented.",
          "Write to a temporary file then rename, so a crash cannot corrupt the data.",
          "Test the round trip."
        ],
        "acceptanceCriteria": [
          "Books and members persist across restarts",
          "A corrupt file produces a clear error",
          "The JSON file is human-readable"
        ],
        "tests": [
          "Add a book, restart, and list it",
          "Inspect the JSON file",
          "Corrupt the file and start the app"
        ]
      },
      {
        "id": "proj-portfolio-library-management-java-m2",
        "order": 2,
        "title": "Service and borrowing rules",
        "objectives": [
          "Implement the service layer",
          "Enforce the borrowing rules",
          "Compute overdue fines"
        ],
        "instructions": "Implement LibraryService with methods to add books and members, borrow and return, and list loans. Enforce the rules: a book on loan cannot be borrowed, and a member cannot have more than five active loans. On return, compute a fine of 50 cents per day overdue.",
        "concepts": [
          "Service layer",
          "Business rules",
          "Date arithmetic"
        ],
        "hints": [
          "Enforce the rules in the service, not the CLI.",
          "Use LocalDate for due dates.",
          "Return clear errors for rule violations."
        ],
        "acceptanceCriteria": [
          "Borrowing a loaned book is rejected",
          "A sixth loan is rejected",
          "An overdue return computes the right fine"
        ],
        "tests": [
          "Borrow a book twice",
          "Borrow six books as one member",
          "Return a book late and check the fine"
        ]
      },
      {
        "id": "proj-portfolio-library-management-java-m3",
        "order": 3,
        "title": "CLI",
        "objectives": [
          "Build the command-line interface",
          "Add, list, borrow and return",
          "Handle errors clearly"
        ],
        "instructions": "Build the CLI with commands to add and list books and members, borrow and return books, and show overdue loans. Every error prints a clear message and a non-zero exit code, and the help text lists every command.",
        "concepts": [
          "CLI design",
          "Argument parsing",
          "Error handling"
        ],
        "hints": [
          "Print help when no command is given.",
          "Errors go to standard error.",
          "Keep the CLI thin; the service does the work."
        ],
        "acceptanceCriteria": [
          "Every command works from the terminal",
          "Errors print clearly",
          "Help lists every command"
        ],
        "tests": [
          "Run each command",
          "Run with no arguments",
          "Run a command with a bad id"
        ]
      },
      {
        "id": "proj-portfolio-library-management-java-m4",
        "order": 4,
        "title": "HTTP API, tests and docs",
        "objectives": [
          "Serve the operations over HTTP",
          "Write unit tests",
          "Document the service"
        ],
        "instructions": "Add the HTTP server with the built-in HttpServer: endpoints for books, members and loans returning JSON, with 404 for unknown ids and 400 for rule violations. Write unit tests for the service rules with a temporary store, and document the CLI and API in the README.",
        "concepts": [
          "HTTP servers",
          "JSON responses",
          "Unit testing"
        ],
        "hints": [
          "Return JSON from every endpoint.",
          "Map rule violations to 400.",
          "Test the service, not the HTTP layer, for the rules."
        ],
        "acceptanceCriteria": [
          "The API lists books and members",
          "A rule violation returns 400",
          "All tests pass"
        ],
        "tests": [
          "Start the server and call the endpoints",
          "Borrow via HTTP twice",
          "Run the test suite"
        ]
      }
    ],
    "reviewChecklist": [
      "A book on loan cannot be borrowed again",
      "No member exceeds five active loans",
      "Data survives a restart",
      "Overdue fines are computed from the due date",
      "The CLI and HTTP API share the same service"
    ],
    "finalAssessment": [
      "Add books and members from the CLI",
      "Borrow and return a book",
      "Show an overdue fine",
      "Call the HTTP API",
      "Run the test suite"
    ],
    "portfolio": true,
    "apis": [
      "GET /api/books — list books",
      "POST /api/books — add a book",
      "POST /api/loans — borrow a book",
      "POST /api/loans/{id}/return — return a book",
      "GET /api/members — list members"
    ]
  },
  {
    "id": "proj-portfolio-sales-analysis-report-r",
    "slug": "sales-analysis-report-r",
    "level": 2,
    "title": "Sales Analysis Report in R",
    "description": "Build a sales analysis report in R: load a sales CSV, clean it, summarise revenue by month, product and region, and produce charts and a written report with R Markdown. It is the standard first R project for analysts — data in, insight out, in a document a manager can read.",
    "skills": [
      "R",
      "dplyr",
      "ggplot2",
      "Data cleaning",
      "Data visualisation",
      "R Markdown",
      "Reporting"
    ],
    "language": "r",
    "functionalRequirements": [
      "Load a sales CSV with date, product, region and amount columns",
      "Clean the data: parse dates, handle missing values, standardise regions",
      "Summarise monthly revenue and growth",
      "Rank products by revenue",
      "Compare regions with a bar chart",
      "Produce a line chart of monthly revenue",
      "Render an HTML report with R Markdown",
      "Include a data quality section in the report"
    ],
    "nonFunctionalRequirements": [
      "All figures in the report match the source data",
      "Missing values are reported, never silently dropped",
      "The report renders to a standalone HTML file",
      "Charts have titles, labels and a legend where needed"
    ],
    "architecture": "An R project with a data folder, an analysis script that loads and cleans the CSV with dplyr, summarises it, and draws charts with ggplot2, and an R Markdown report that weaves the analysis, tables and charts into a single HTML document rendered with rmarkdown::render.",
    "databaseSchema": "",
    "fileStructure": "sales-analysis-r/\n  data/\n    sales.csv\n  analysis.R\n  report.Rmd\n  README.md",
    "taskBreakdown": [
      "Explore the data",
      "Implement cleaning",
      "Build the summaries",
      "Draw the charts",
      "Write the R Markdown report",
      "Render and verify",
      "Document the project"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-sales-analysis-report-r-m1",
        "order": 1,
        "title": "Loading and exploring the data",
        "objectives": [
          "Load the CSV",
          "Inspect the structure",
          "Count missing values"
        ],
        "instructions": "Load the sales CSV with read.csv, inspect its structure with str and summary, and count missing values per column. Record what you find: the date range, the regions, the products, and the quality problems.",
        "concepts": [
          "read.csv",
          "str and summary",
          "Data exploration"
        ],
        "hints": [
          "Check the column types after loading.",
          "Count missing values per column.",
          "Look at the date range."
        ],
        "acceptanceCriteria": [
          "The data loads with the right types",
          "Missing values are counted per column",
          "The date range is known"
        ],
        "tests": [
          "Load the data and run summary",
          "Count missing values",
          "Check the date range"
        ]
      },
      {
        "id": "proj-portfolio-sales-analysis-report-r-m2",
        "order": 2,
        "title": "Cleaning and summarising",
        "objectives": [
          "Clean dates and regions",
          "Handle missing values",
          "Summarise monthly revenue"
        ],
        "instructions": "Clean the data: parse dates, standardise region names, and handle missing values by reporting them and excluding those rows from revenue with a note. Summarise monthly revenue and growth with dplyr, and rank products by revenue.",
        "concepts": [
          "dplyr",
          "Data cleaning",
          "Summarise"
        ],
        "hints": [
          "Standardise region names before grouping.",
          "Report excluded rows in the analysis.",
          "Verify one month by hand."
        ],
        "acceptanceCriteria": [
          "Monthly revenue matches hand-checked values",
          "Regions are standardised",
          "Excluded rows are counted"
        ],
        "tests": [
          "Summarise monthly revenue",
          "Verify one month by hand",
          "Check the product ranking"
        ]
      },
      {
        "id": "proj-portfolio-sales-analysis-report-r-m3",
        "order": 3,
        "title": "Charts with ggplot2",
        "objectives": [
          "Draw a monthly revenue line chart",
          "Draw a regional bar chart",
          "Label every chart"
        ],
        "instructions": "Draw a line chart of monthly revenue and a bar chart of revenue by region with ggplot2, giving every chart a title, labelled axes and a clear scale. Save the charts as image files as well as embedding them in the report.",
        "concepts": [
          "ggplot2",
          "Line charts",
          "Bar charts"
        ],
        "hints": [
          "Label every axis.",
          "Give every chart a title.",
          "Use a colour-blind-friendly palette."
        ],
        "acceptanceCriteria": [
          "Both charts show the right values",
          "Every chart has a title and labels",
          "Charts are saved as files"
        ],
        "tests": [
          "Draw both charts",
          "Check the values against the summaries",
          "Open the saved images"
        ]
      },
      {
        "id": "proj-portfolio-sales-analysis-report-r-m4",
        "order": 4,
        "title": "R Markdown report and verification",
        "objectives": [
          "Write the report",
          "Render to HTML",
          "Verify the figures"
        ],
        "instructions": "Write report.Rmd with an introduction, the monthly and regional findings, the charts, and a data quality section listing the excluded rows. Render it to HTML and verify every figure in the report against the source data, then document the project in the README.",
        "concepts": [
          "R Markdown",
          "Rendering",
          "Verification"
        ],
        "hints": [
          "Verify every figure in the report.",
          "Include the data quality section.",
          "The HTML must be standalone."
        ],
        "acceptanceCriteria": [
          "The report renders to HTML",
          "Every figure matches the source data",
          "The data quality section lists excluded rows"
        ],
        "tests": [
          "Render the report and open it",
          "Verify three figures by hand",
          "Check the data quality section"
        ]
      }
    ],
    "reviewChecklist": [
      "All figures match the source data",
      "Missing values are reported, not hidden",
      "Charts have titles and labels",
      "The report renders to standalone HTML",
      "Excluded rows are counted"
    ],
    "finalAssessment": [
      "Load and explore the data",
      "Show the monthly summary",
      "Show both charts",
      "Render the report and open it",
      "Verify a figure by hand"
    ],
    "portfolio": true,
    "apis": [
      "CLI: Rscript analysis.R",
      "CLI: Rscript -e \"rmarkdown::render('report.Rmd')\""
    ]
  },
  {
    "id": "proj-portfolio-survey-data-visualization-r",
    "slug": "survey-data-visualization-r",
    "level": 3,
    "title": "Survey Data Visualisation in R",
    "description": "Build a survey analysis in R: load survey responses, clean Likert-scale answers, analyse satisfaction by segment, test whether differences are statistically meaningful, and present the findings as a polished visual report. It is the project that shows R's real strength — statistics plus visualisation in one workflow.",
    "skills": [
      "R",
      "dplyr",
      "ggplot2",
      "Statistics",
      "Likert scales",
      "Data visualisation",
      "R Markdown",
      "Hypothesis testing"
    ],
    "language": "r",
    "functionalRequirements": [
      "Load survey responses from a CSV with Likert-scale questions",
      "Clean the data: handle missing answers and reverse-coded items",
      "Summarise satisfaction by segment such as age group or region",
      "Visualise distributions with diverging bar charts",
      "Test whether segment differences are significant with a t-test or ANOVA",
      "Report the sample size and margin of error for each finding",
      "Render a polished HTML report with R Markdown",
      "Include the limitations of the analysis in the report"
    ],
    "nonFunctionalRequirements": [
      "Reverse-coded items are corrected before analysis",
      "Every finding reports its sample size",
      "Statistical tests are reported with p-values, never hidden",
      "Charts show the full Likert distribution, not just the mean"
    ],
    "architecture": "An R project with a survey CSV, a cleaning script that handles missing answers and reverse-coded items, an analysis script using dplyr for segment summaries and t.test and aov for significance tests, ggplot2 diverging bar charts, and an R Markdown report presenting the findings with sample sizes and limitations.",
    "databaseSchema": "",
    "fileStructure": "survey-visualization-r/\n  data/\n    survey.csv\n  clean.R\n  analysis.R\n  report.Rmd\n  README.md",
    "taskBreakdown": [
      "Explore the survey data",
      "Implement cleaning and reverse coding",
      "Build segment summaries",
      "Draw diverging bar charts",
      "Run significance tests",
      "Write the report and document"
    ],
    "milestones": [
      {
        "id": "proj-portfolio-survey-data-visualization-r-m1",
        "order": 1,
        "title": "Exploring the survey data",
        "objectives": [
          "Load the responses",
          "Inspect the questions and scales",
          "Count missing answers"
        ],
        "instructions": "Load the survey CSV, list the questions and their scales, and count missing answers per question and per respondent. Record the sample size and the response rate before any analysis.",
        "concepts": [
          "Data exploration",
          "Missing data",
          "Sample size"
        ],
        "hints": [
          "Count missing answers per question.",
          "Record the sample size.",
          "Check the scale of each question."
        ],
        "acceptanceCriteria": [
          "The data loads with the right structure",
          "Missing answers are counted",
          "The sample size is known"
        ],
        "tests": [
          "Load the data and inspect it",
          "Count missing answers per question",
          "Check the response rate"
        ]
      },
      {
        "id": "proj-portfolio-survey-data-visualization-r-m2",
        "order": 2,
        "title": "Cleaning and reverse coding",
        "objectives": [
          "Handle missing answers",
          "Reverse-code the right items",
          "Verify the cleaning"
        ],
        "instructions": "Implement cleaning: flag respondents with more than half their answers missing, exclude them with a note, and reverse-code the items marked as reversed so that a high score always means higher satisfaction. Verify the cleaning by checking a reverse-coded item before and after.",
        "concepts": [
          "Reverse coding",
          "Missing data",
          "Verification"
        ],
        "hints": [
          "Reverse-code only the marked items.",
          "Document every exclusion.",
          "Verify one item by hand."
        ],
        "acceptanceCriteria": [
          "Reverse-coded items are corrected",
          "Excluded respondents are counted",
          "A hand check confirms the reversal"
        ],
        "tests": [
          "Check a reverse-coded item before and after",
          "Count the excluded respondents",
          "Verify the cleaning on one row"
        ]
      },
      {
        "id": "proj-portfolio-survey-data-visualization-r-m3",
        "order": 3,
        "title": "Segment analysis and charts",
        "objectives": [
          "Summarise satisfaction by segment",
          "Draw diverging bar charts",
          "Show the full distribution"
        ],
        "instructions": "Summarise mean satisfaction and the share of positive responses by segment with dplyr, and draw diverging bar charts showing the full Likert distribution per segment — not just the mean. Every chart reports its sample size.",
        "concepts": [
          "dplyr",
          "Diverging bar charts",
          "Distributions"
        ],
        "hints": [
          "Show the full distribution, not just the mean.",
          "Report the sample size on every chart.",
          "Use the same scale across segments."
        ],
        "acceptanceCriteria": [
          "Segment summaries are correct",
          "Charts show the full distribution",
          "Every chart reports its sample size"
        ],
        "tests": [
          "Summarise by segment",
          "Draw the charts",
          "Verify one segment by hand"
        ]
      },
      {
        "id": "proj-portfolio-survey-data-visualization-r-m4",
        "order": 4,
        "title": "Significance tests, report and docs",
        "objectives": [
          "Test segment differences",
          "Report p-values and margins of error",
          "Write the report"
        ],
        "instructions": "Run a t-test or ANOVA on the segment differences and report the p-values honestly, including non-significant results. Compute the margin of error for the headline finding, write the R Markdown report with the findings, charts, sample sizes and limitations, and document the project in the README.",
        "concepts": [
          "t-test",
          "ANOVA",
          "Margin of error"
        ],
        "hints": [
          "Report non-significant results too.",
          "State the limitations.",
          "Verify the margin of error calculation."
        ],
        "acceptanceCriteria": [
          "Tests are reported with p-values",
          "Non-significant results are shown",
          "The report states its limitations"
        ],
        "tests": [
          "Run the tests and read the p-values",
          "Render the report and open it",
          "Check the limitations section"
        ]
      }
    ],
    "reviewChecklist": [
      "Reverse-coded items are corrected",
      "Every finding reports its sample size",
      "Non-significant results are reported",
      "Charts show the full distribution",
      "The report states its limitations"
    ],
    "finalAssessment": [
      "Load and explore the survey data",
      "Show the segment summaries",
      "Show the diverging bar charts",
      "Explain the significance tests",
      "Render the report and open it"
    ],
    "portfolio": true,
    "apis": [
      "CLI: Rscript analysis.R",
      "CLI: Rscript -e \"rmarkdown::render('report.Rmd')\""
    ]
  }
];
