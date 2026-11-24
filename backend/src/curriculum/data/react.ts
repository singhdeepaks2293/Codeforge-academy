import type { Course, MasteryAssessment } from '../types.js';

export const REACT_COURSE: Course = {
  "id": "react",
  "slug": "react",
  "language": "react",
  "title": "React",
  "description": "Build modern, interactive user interfaces with React and TypeScript: components, hooks, routing, data fetching, testing and production deployment, with a working project in every stage.",
  "difficulty": "All levels",
  "estimatedHours": 55,
  "skills": [
    "JSX and components",
    "State with useState",
    "Hooks and effects",
    "Forms and routing",
    "Context and state management",
    "Fetching data from APIs",
    "TypeScript with React",
    "Testing components",
    "Performance optimisation"
  ],
  "prerequisites": [
    "Basic TypeScript knowledge"
  ],
  "modules": [
    {
      "id": "react-m1",
      "title": "Introduction",
      "description": "Introduction: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 1,
      "lessons": [
        {
          "id": "react-m1-l1",
          "slug": "react-m1-l1",
          "title": "What Is React?",
          "objectives": [
            "Explain what What Is React? is and when to use it",
            "Write the What Is React? pattern from the syntax in this lesson",
            "Build a small component that uses What Is React? correctly"
          ],
          "introduction": "What Is React? is a core part of building React apps. React is a JavaScript library for building user interfaces from small, reusable pieces called components. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "React is a JavaScript library for building user interfaces from small, reusable pieces called components. Instead of updating the page by hand, you describe what the interface should look like for a given state, and React updates the real DOM for you. It was created at Meta and is now used by millions of websites. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "import { useState } from 'react';\n\nexport default function App() {\n  return <h1>Hello, React!</h1>;\n}",
          "analogy": "Like a set of LEGO bricks for web pages: small pieces snap together into a whole interface.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Hello, React!</h1>\n      <p>What Is React?</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem What Is React? solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Hello, React!' ends up on screen.",
            "Predict what would change if you replaced 'Hello, React!' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the What Is React? syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Hello, React!' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Reading state immediately after setting it and expecting the new value."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Hello, React!' for the What Is React? lesson, but it does not work because of directly mutating state. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const [count, setCount] = useState(0);\n  const add = () => { count = count + 1; };\n  return <button onClick={add}>Count: {count}</button>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Hello, React!</h1>\n      <p>What Is React?</p>\n    </div>\n  );\n}",
            "explanation": "Assigning to the state variable does not notify React; only the setter triggers a re-render. State is changed by assigning to it directly instead of calling the setter, so React never re-renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to What Is React?.",
          "summary": "React is a JavaScript library for building user interfaces from small, reusable pieces called components. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use What Is React? in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of What Is React??",
              "options": [
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps",
                "build user interfaces from reusable components that update when state changes",
                "To run code on the server instead of in the browser"
              ],
              "answer": 2,
              "explanation": "Build user interfaces from reusable components that update when state changes — that is the purpose of What Is React?."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Error: not found",
                "Hello, React!"
              ],
              "answer": 3,
              "explanation": "The example renders 'Hello, React!' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m1-l1-ex1",
              "title": "Build: What Is React?",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Hello, React!' as its main heading, a paragraph with the text 'What Is React?', and a footer that says 'Built with React'. Use the What Is React? pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Hello, React!</h1>\n      <p>What Is React?</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Hello, React!', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Hello, React!",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for What Is React?. Your component must render the text 'Hello, React!' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Hello, React!', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m1-l2",
          "slug": "react-m1-l2",
          "title": "Your First React App",
          "objectives": [
            "Explain what Your First React App is and when to use it",
            "Write the Your First React App pattern from the syntax in this lesson",
            "Build a small component that uses Your First React App correctly"
          ],
          "introduction": "Your First React App is a core part of building React apps. A React app starts from a root component, usually called App, which React renders into a single HTML element on the page. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A React app starts from a root component, usually called App, which React renders into a single HTML element on the page. The build tool bundles your components, styles and assets, and a development server reloads the page whenever you save a file. You edit components and immediately see the result in the browser. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "import { createRoot } from 'react-dom/client';\nimport App from './App';\n\ncreateRoot(document.getElementById('root')!).render(<App />);",
          "analogy": "Like the front door of a house: everything inside the app is reached through that one entry point.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Welcome to React!</h1>\n      <p>Your First React App</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Your First React App solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Welcome to React!' ends up on screen.",
            "Predict what would change if you replaced 'Welcome to React!' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Your First React App syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Welcome to React!' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Passing a new inline function as a prop on every render, breaking memoization."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Welcome to React!' for the Your First React App lesson, but it does not work because of a missing key in a list. Find and fix the bug.",
            "buggyCode": "const items = ['A', 'B', 'C'];\nexport default function App() {\n  return <ul>{items.map(i => <li>{i}</li>)}</ul>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Welcome to React!</h1>\n      <p>Your First React App</p>\n    </div>\n  );\n}",
            "explanation": "Every element produced by map needs a stable key so React can match it across renders. List items are rendered without a key, so React cannot track them correctly when the list changes."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Your First React App.",
          "summary": "A React app starts from a root component, usually called App, which React renders into a single HTML element on the page. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Your First React App in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Your First React App?",
              "options": [
                "To compile TypeScript directly into native mobile apps",
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically",
                "render a root component into the page and reload it live as you edit"
              ],
              "answer": 3,
              "explanation": "Render a root component into the page and reload it live as you edit — that is the purpose of Your First React App."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Welcome to React!",
                "Hello, World!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 0,
              "explanation": "The example renders 'Welcome to React!' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m1-l2-ex1",
              "title": "Build: Your First React App",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Welcome to React!' as its main heading, a paragraph with the text 'Your First React App', and a footer that says 'Built with React'. Use the Your First React App pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Welcome to React!</h1>\n      <p>Your First React App</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Welcome to React!', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Welcome to React!",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Your First React App. Your component must render the text 'Welcome to React!' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Welcome to React!', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m2",
      "title": "Components",
      "description": "Components: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 2,
      "lessons": [
        {
          "id": "react-m2-l1",
          "slug": "react-m2-l1",
          "title": "Function Components",
          "objectives": [
            "Explain what Function Components is and when to use it",
            "Write the Function Components pattern from the syntax in this lesson",
            "Build a small component that uses Function Components correctly"
          ],
          "introduction": "Function Components is a core part of building React apps. A function component is a JavaScript function that returns JSX describing part of the user interface. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A function component is a JavaScript function that returns JSX describing part of the user interface. It can receive data through props and keep its own state, and React calls it again whenever that data changes. Keeping components small and focused makes them easy to test, reuse and reason about. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "function Greeting() {\n  return <h1>Hello from a component!</h1>;\n}\n\nexport default Greeting;",
          "analogy": "Like a single recipe card: one clear job, with its own ingredients and instructions.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Hello from a component!</h1>\n      <p>Function Components</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Function Components solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Hello from a component!' ends up on screen.",
            "Predict what would change if you replaced 'Hello from a component!' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Function Components syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Hello from a component!' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Putting side effects directly in the render body instead of in useEffect."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Hello from a component!' for the Function Components lesson, but it does not work because of a hook called inside a condition. Find and fix the bug.",
            "buggyCode": "export default function App({ show }: { show: boolean }) {\n  if (show) {\n    const [n, setN] = useState(0);\n  }\n  return <h1>Hello from a component!</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Hello from a component!</h1>\n      <p>Function Components</p>\n    </div>\n  );\n}",
            "explanation": "Hooks must be called unconditionally at the top level so their order is the same on every render. A hook is called inside an if statement, breaking the rules of hooks because call order changes between renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Function Components.",
          "summary": "A function component is a JavaScript function that returns JSX describing part of the user interface. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Function Components in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Function Components?",
              "options": [
                "To compile TypeScript directly into native mobile apps",
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically",
                "describe part of the UI as a JavaScript function that returns JSX"
              ],
              "answer": 3,
              "explanation": "Describe part of the UI as a JavaScript function that returns JSX — that is the purpose of Function Components."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Hello from a component!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 1,
              "explanation": "The example renders 'Hello from a component!' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m2-l1-ex1",
              "title": "Build: Function Components",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Hello from a component!' as its main heading, a paragraph with the text 'Function Components', and a footer that says 'Built with React'. Use the Function Components pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Hello from a component!</h1>\n      <p>Function Components</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Hello from a component!', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Hello from a component!",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Function Components. Your component must render the text 'Hello from a component!' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Hello from a component!', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m2-l2",
          "slug": "react-m2-l2",
          "title": "Composing Components",
          "objectives": [
            "Explain what Composing Components is and when to use it",
            "Write the Composing Components pattern from the syntax in this lesson",
            "Build a small component that uses Composing Components correctly"
          ],
          "introduction": "Composing Components is a core part of building React apps. Composition means building a large interface by nesting small components inside larger ones, like a page made of a header, a list and a footer component. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Composition means building a large interface by nesting small components inside larger ones, like a page made of a header, a list and a footer component. Each component only worries about its own piece, so you can change one without touching the others. This is the main way React apps stay organised as they grow. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "function Header() { return <header>Shop</header>; }\nfunction Page() { return <div><Header /><main>Body</main></div>; }",
          "analogy": "Like building a house from prefabricated rooms instead of laying every brick by hand.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Welcome to our shop!</h1>\n      <p>Composing Components</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Composing Components solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Welcome to our shop!' ends up on screen.",
            "Predict what would change if you replaced 'Welcome to our shop!' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Composing Components syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Welcome to our shop!' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Returning two root elements from a component without wrapping them in a fragment."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Welcome to our shop!' for the Composing Components lesson, but it does not work because of a missing return. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const text = 'Welcome to our shop!';\n  <h1>{text}</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Welcome to our shop!</h1>\n      <p>Composing Components</p>\n    </div>\n  );\n}",
            "explanation": "A function component must return its JSX; an expression statement on its own is discarded. The component body computes JSX but never returns it, so React renders nothing."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Composing Components.",
          "summary": "Composition means building a large interface by nesting small components inside larger ones, like a page made of a header, a list and a footer component. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Composing Components in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Composing Components?",
              "options": [
                "build large interfaces by nesting small components inside larger ones",
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically",
                "To replace JavaScript with a new programming language"
              ],
              "answer": 0,
              "explanation": "Build large interfaces by nesting small components inside larger ones — that is the purpose of Composing Components."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Welcome to our shop!",
                "Error: not found"
              ],
              "answer": 2,
              "explanation": "The example renders 'Welcome to our shop!' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m2-l2-ex1",
              "title": "Build: Composing Components",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Welcome to our shop!' as its main heading, a paragraph with the text 'Composing Components', and a footer that says 'Built with React'. Use the Composing Components pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Welcome to our shop!</h1>\n      <p>Composing Components</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Welcome to our shop!', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Welcome to our shop!",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Composing Components. Your component must render the text 'Welcome to our shop!' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Welcome to our shop!', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m3",
      "title": "JSX",
      "description": "JSX: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 3,
      "lessons": [
        {
          "id": "react-m3-l1",
          "slug": "react-m3-l1",
          "title": "JSX Basics",
          "objectives": [
            "Explain what JSX Basics is and when to use it",
            "Write the JSX Basics pattern from the syntax in this lesson",
            "Build a small component that uses JSX Basics correctly"
          ],
          "introduction": "JSX Basics is a core part of building React apps. JSX is a syntax extension that lets you write HTML-like markup inside JavaScript files. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "JSX is a syntax extension that lets you write HTML-like markup inside JavaScript files. It looks like HTML but it is really JavaScript: the build tool turns it into function calls that create React elements. JSX makes the structure of the interface visible right next to the logic that controls it. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const name = 'Ada';\nconst element = <h1>Hello, {name}!</h1>;",
          "analogy": "Like writing a postcard where the address and the message sit on the same card.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Hello, Ada!</h1>\n      <p>JSX Basics</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem JSX Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Hello, Ada!' ends up on screen.",
            "Predict what would change if you replaced 'Hello, Ada!' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the JSX Basics syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Hello, Ada!' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Using a lowercase name for a component, so React treats it as a plain HTML tag."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Hello, Ada!' for the JSX Basics lesson, but it does not work because of a missing closing tag. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  return (\n    <div>\n      <h1>Hello, Ada!\n    </div>\n  );\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Hello, Ada!</h1>\n      <p>JSX Basics</p>\n    </div>\n  );\n}",
            "explanation": "The <h1> element is never closed, so the JSX parser cannot tell where it ends. The component is missing a closing tag, so JSX cannot be parsed and the build fails."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to JSX Basics.",
          "summary": "JSX is a syntax extension that lets you write HTML-like markup inside JavaScript files. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use JSX Basics in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of JSX Basics?",
              "options": [
                "write HTML-like markup inside JavaScript that compiles to React elements",
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically",
                "To replace JavaScript with a new programming language"
              ],
              "answer": 0,
              "explanation": "Write HTML-like markup inside JavaScript that compiles to React elements — that is the purpose of JSX Basics."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Error: not found",
                "Hello, Ada!"
              ],
              "answer": 3,
              "explanation": "The example renders 'Hello, Ada!' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m3-l1-ex1",
              "title": "Build: JSX Basics",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Hello, Ada!' as its main heading, a paragraph with the text 'JSX Basics', and a footer that says 'Built with React'. Use the JSX Basics pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Hello, Ada!</h1>\n      <p>JSX Basics</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Hello, Ada!', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Hello, Ada!",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for JSX Basics. Your component must render the text 'Hello, Ada!' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Hello, Ada!', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m3-l2",
          "slug": "react-m3-l2",
          "title": "JSX Expressions and Attributes",
          "objectives": [
            "Explain what JSX Expressions and Attributes is and when to use it",
            "Write the JSX Expressions and Attributes pattern from the syntax in this lesson",
            "Build a small component that uses JSX Expressions and Attributes correctly"
          ],
          "introduction": "JSX Expressions and Attributes is a core part of building React apps. Inside JSX, curly braces let you embed any JavaScript expression: variables, function calls, calculations and conditional values. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Inside JSX, curly braces let you embed any JavaScript expression: variables, function calls, calculations and conditional values. Attributes work like HTML attributes, except class becomes className and inline styles take a JavaScript object. Expressions keep markup dynamic instead of hard-coded. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const price = 12;\nconst el = <p className=\"price\">Total: {price * 2} coins</p>;",
          "analogy": "Like blanks in a form letter that get filled in with the right name and number for each reader.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Total: 24 coins</h1>\n      <p>JSX Expressions and Attributes</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem JSX Expressions and Attributes solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Total: 24 coins' ends up on screen.",
            "Predict what would change if you replaced 'Total: 24 coins' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the JSX Expressions and Attributes syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Total: 24 coins' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Forgetting the key prop when rendering a list, causing stale UI after updates."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Total: 24 coins' for the JSX Expressions and Attributes lesson, but it does not work because of a lowercase component name. Find and fix the bug.",
            "buggyCode": "function greeting() {\n  return <h1>Total: 24 coins</h1>;\n}\n\nexport default function App() {\n  return <greeting />;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Total: 24 coins</h1>\n      <p>JSX Expressions and Attributes</p>\n    </div>\n  );\n}",
            "explanation": "Component names must start with a capital letter, or JSX treats them as built-in HTML elements. The component name starts with a lowercase letter, so React treats it as a plain HTML tag instead of a component."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to JSX Expressions and Attributes.",
          "summary": "Inside JSX, curly braces let you embed any JavaScript expression: variables, function calls, calculations and conditional values. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use JSX Expressions and Attributes in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of JSX Expressions and Attributes?",
              "options": [
                "To delete unused files from the project automatically",
                "embed JavaScript expressions in markup with curly braces",
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript"
              ],
              "answer": 1,
              "explanation": "Embed JavaScript expressions in markup with curly braces — that is the purpose of JSX Expressions and Attributes."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Total: 24 coins",
                "Hello, World!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 0,
              "explanation": "The example renders 'Total: 24 coins' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m3-l2-ex1",
              "title": "Build: JSX Expressions and Attributes",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Total: 24 coins' as its main heading, a paragraph with the text 'JSX Expressions and Attributes', and a footer that says 'Built with React'. Use the JSX Expressions and Attributes pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Total: 24 coins</h1>\n      <p>JSX Expressions and Attributes</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Total: 24 coins', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Total: 24 coins",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for JSX Expressions and Attributes. Your component must render the text 'Total: 24 coins' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Total: 24 coins', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m4",
      "title": "State",
      "description": "State: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 4,
      "lessons": [
        {
          "id": "react-m4-l1",
          "slug": "react-m4-l1",
          "title": "Introducing useState",
          "objectives": [
            "Explain what Introducing useState is and when to use it",
            "Write the Introducing useState pattern from the syntax in this lesson",
            "Build a small component that uses Introducing useState correctly"
          ],
          "introduction": "Introducing useState is a core part of building React apps. State is data that a component remembers between renders, such as a counter value or whether a panel is open. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "State is data that a component remembers between renders, such as a counter value or whether a panel is open. The useState hook gives you the current value and a setter function; calling the setter asks React to re-render the component with the new value. State is what makes an interface interactive instead of static. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const [count, setCount] = useState(0);\n<button onClick={() => setCount(count + 1)}>Count: {count}</button>",
          "analogy": "Like a scoreboard that remembers the score between plays and updates the display when it changes.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Count: 0</h1>\n      <p>Introducing useState</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Introducing useState solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Count: 0' ends up on screen.",
            "Predict what would change if you replaced 'Count: 0' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Introducing useState syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Count: 0' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Reading state immediately after setting it and expecting the new value."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Count: 0' for the Introducing useState lesson, but it does not work because of directly mutating state. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const [count, setCount] = useState(0);\n  const add = () => { count = count + 1; };\n  return <button onClick={add}>Count: {count}</button>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Count: 0</h1>\n      <p>Introducing useState</p>\n    </div>\n  );\n}",
            "explanation": "Assigning to the state variable does not notify React; only the setter triggers a re-render. State is changed by assigning to it directly instead of calling the setter, so React never re-renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Introducing useState.",
          "summary": "State is data that a component remembers between renders, such as a counter value or whether a panel is open. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Introducing useState in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Introducing useState?",
              "options": [
                "To delete unused files from the project automatically",
                "remember data between renders with the useState hook",
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript"
              ],
              "answer": 1,
              "explanation": "Remember data between renders with the useState hook — that is the purpose of Introducing useState."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Count: 0",
                "Loading...",
                "Error: not found"
              ],
              "answer": 1,
              "explanation": "The example renders 'Count: 0' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m4-l1-ex1",
              "title": "Build: Introducing useState",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Count: 0' as its main heading, a paragraph with the text 'Introducing useState', and a footer that says 'Built with React'. Use the Introducing useState pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Count: 0</h1>\n      <p>Introducing useState</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Count: 0', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Count: 0",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Introducing useState. Your component must render the text 'Count: 0' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Count: 0', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m4-l2",
          "slug": "react-m4-l2",
          "title": "Updating State Correctly",
          "objectives": [
            "Explain what Updating State Correctly is and when to use it",
            "Write the Updating State Correctly pattern from the syntax in this lesson",
            "Build a small component that uses Updating State Correctly correctly"
          ],
          "introduction": "Updating State Correctly is a core part of building React apps. State updates are asynchronous and may be batched, so you should not read state right after setting it and expect the new value. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "State updates are asynchronous and may be batched, so you should not read state right after setting it and expect the new value. When the new value depends on the old one, pass a function to the setter, such as setCount(c => c + 1). React also replaces state rather than merging it, so you must copy objects and arrays when updating them. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "setCount(c => c + 1);\nsetUser({ ...user, name: 'Ada' });",
          "analogy": "Like handing a cashier a new total instead of scribbling over the old receipt.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Count: 1</h1>\n      <p>Updating State Correctly</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Updating State Correctly solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Count: 1' ends up on screen.",
            "Predict what would change if you replaced 'Count: 1' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Updating State Correctly syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Count: 1' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Passing a new inline function as a prop on every render, breaking memoization."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Count: 1' for the Updating State Correctly lesson, but it does not work because of a missing key in a list. Find and fix the bug.",
            "buggyCode": "const items = ['A', 'B', 'C'];\nexport default function App() {\n  return <ul>{items.map(i => <li>{i}</li>)}</ul>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Count: 1</h1>\n      <p>Updating State Correctly</p>\n    </div>\n  );\n}",
            "explanation": "Every element produced by map needs a stable key so React can match it across renders. List items are rendered without a key, so React cannot track them correctly when the list changes."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Updating State Correctly.",
          "summary": "State updates are asynchronous and may be batched, so you should not read state right after setting it and expect the new value. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Updating State Correctly in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Updating State Correctly?",
              "options": [
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript",
                "update state from its previous value with a function and copy objects when changing them",
                "To store data permanently in a database on the server"
              ],
              "answer": 2,
              "explanation": "Update state from its previous value with a function and copy objects when changing them — that is the purpose of Updating State Correctly."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Count: 1",
                "Error: not found"
              ],
              "answer": 2,
              "explanation": "The example renders 'Count: 1' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m4-l2-ex1",
              "title": "Build: Updating State Correctly",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Count: 1' as its main heading, a paragraph with the text 'Updating State Correctly', and a footer that says 'Built with React'. Use the Updating State Correctly pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Count: 1</h1>\n      <p>Updating State Correctly</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Count: 1', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Count: 1",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Updating State Correctly. Your component must render the text 'Count: 1' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Count: 1', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m5",
      "title": "Events",
      "description": "Events: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 5,
      "lessons": [
        {
          "id": "react-m5-l1",
          "slug": "react-m5-l1",
          "title": "Handling Click Events",
          "objectives": [
            "Explain what Handling Click Events is and when to use it",
            "Write the Handling Click Events pattern from the syntax in this lesson",
            "Build a small component that uses Handling Click Events correctly"
          ],
          "introduction": "Handling Click Events is a core part of building React apps. React handles user actions with event handlers: functions you pass to props such as onClick, onChange or onSubmit. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "React handles user actions with event handlers: functions you pass to props such as onClick, onChange or onSubmit. You write the function, React calls it when the event happens, and inside it you usually update state. Handlers keep the interface responding to the user instead of sitting still. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "<button onClick={() => setCount(count + 1)}>Add one</button>",
          "analogy": "Like a doorbell: pressing it does nothing by itself, it rings the bell you wired up inside.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Clicked!</h1>\n      <p>Handling Click Events</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Handling Click Events solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Clicked!' ends up on screen.",
            "Predict what would change if you replaced 'Clicked!' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Handling Click Events syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Clicked!' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Putting side effects directly in the render body instead of in useEffect."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Clicked!' for the Handling Click Events lesson, but it does not work because of a hook called inside a condition. Find and fix the bug.",
            "buggyCode": "export default function App({ show }: { show: boolean }) {\n  if (show) {\n    const [n, setN] = useState(0);\n  }\n  return <h1>Clicked!</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Clicked!</h1>\n      <p>Handling Click Events</p>\n    </div>\n  );\n}",
            "explanation": "Hooks must be called unconditionally at the top level so their order is the same on every render. A hook is called inside an if statement, breaking the rules of hooks because call order changes between renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Handling Click Events.",
          "summary": "React handles user actions with event handlers: functions you pass to props such as onClick, onChange or onSubmit. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Handling Click Events in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Handling Click Events?",
              "options": [
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript",
                "respond to user actions with handler functions passed to event props",
                "To store data permanently in a database on the server"
              ],
              "answer": 2,
              "explanation": "Respond to user actions with handler functions passed to event props — that is the purpose of Handling Click Events."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Error: not found",
                "Clicked!"
              ],
              "answer": 3,
              "explanation": "The example renders 'Clicked!' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m5-l1-ex1",
              "title": "Build: Handling Click Events",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Clicked!' as its main heading, a paragraph with the text 'Handling Click Events', and a footer that says 'Built with React'. Use the Handling Click Events pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Clicked!</h1>\n      <p>Handling Click Events</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Clicked!', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Clicked!",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Handling Click Events. Your component must render the text 'Clicked!' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Clicked!', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m5-l2",
          "slug": "react-m5-l2",
          "title": "Synthetic Events and Event Objects",
          "objectives": [
            "Explain what Synthetic Events and Event Objects is and when to use it",
            "Write the Synthetic Events and Event Objects pattern from the syntax in this lesson",
            "Build a small component that uses Synthetic Events and Event Objects correctly"
          ],
          "introduction": "Synthetic Events and Event Objects is a core part of building React apps. React wraps browser events in a synthetic event object that works the same in every browser. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "React wraps browser events in a synthetic event object that works the same in every browser. The handler receives it as its first argument, so you can read e.target.value from an input or call e.preventDefault() to stop a form reloading the page. One handler can serve many elements by reading which element fired the event. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "function handleChange(e: React.ChangeEvent<HTMLInputElement>) {\n  setText(e.target.value);\n}",
          "analogy": "Like a standardised envelope: whatever the post office, the letter inside is laid out the same way.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Type here...</h1>\n      <p>Synthetic Events and Event Objects</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Synthetic Events and Event Objects solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Type here...' ends up on screen.",
            "Predict what would change if you replaced 'Type here...' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Synthetic Events and Event Objects syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Type here...' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Returning two root elements from a component without wrapping them in a fragment."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Type here...' for the Synthetic Events and Event Objects lesson, but it does not work because of a missing return. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const text = 'Type here...';\n  <h1>{text}</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Type here...</h1>\n      <p>Synthetic Events and Event Objects</p>\n    </div>\n  );\n}",
            "explanation": "A function component must return its JSX; an expression statement on its own is discarded. The component body computes JSX but never returns it, so React renders nothing."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Synthetic Events and Event Objects.",
          "summary": "React wraps browser events in a synthetic event object that works the same in every browser. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Synthetic Events and Event Objects in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Synthetic Events and Event Objects?",
              "options": [
                "To style pages with CSS without writing any JavaScript",
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps",
                "read event details from React's synthetic event object"
              ],
              "answer": 3,
              "explanation": "Read event details from React's synthetic event object — that is the purpose of Synthetic Events and Event Objects."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Type here...",
                "Hello, World!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 0,
              "explanation": "The example renders 'Type here...' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m5-l2-ex1",
              "title": "Build: Synthetic Events and Event Objects",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Type here...' as its main heading, a paragraph with the text 'Synthetic Events and Event Objects', and a footer that says 'Built with React'. Use the Synthetic Events and Event Objects pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Type here...</h1>\n      <p>Synthetic Events and Event Objects</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Type here...', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Type here...",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Synthetic Events and Event Objects. Your component must render the text 'Type here...' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Type here...', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m6",
      "title": "Props",
      "description": "Props: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 6,
      "lessons": [
        {
          "id": "react-m6-l1",
          "slug": "react-m6-l1",
          "title": "Passing Props",
          "objectives": [
            "Explain what Passing Props is and when to use it",
            "Write the Passing Props pattern from the syntax in this lesson",
            "Build a small component that uses Passing Props correctly"
          ],
          "introduction": "Passing Props is a core part of building React apps. Props are the inputs a component receives from its parent, passed as attributes in JSX. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Props are the inputs a component receives from its parent, passed as attributes in JSX. They let one component render different content in different places, such as a Greeting that says hello to Ada in one place and to Grace in another. Props flow one way, from parent down to child, which keeps data flow easy to follow. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "function Greeting({ name }: { name: string }) {\n  return <h1>Hello, {name}!</h1>;\n}\n<Greeting name=\"Ada\" />",
          "analogy": "Like passing a note with instructions to a colleague: they do the job using what you wrote on it.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Hello, Ada!</h1>\n      <p>Passing Props</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Passing Props solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Hello, Ada!' ends up on screen.",
            "Predict what would change if you replaced 'Hello, Ada!' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Passing Props syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Hello, Ada!' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Using a lowercase name for a component, so React treats it as a plain HTML tag."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Hello, Ada!' for the Passing Props lesson, but it does not work because of a missing closing tag. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  return (\n    <div>\n      <h1>Hello, Ada!\n    </div>\n  );\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Hello, Ada!</h1>\n      <p>Passing Props</p>\n    </div>\n  );\n}",
            "explanation": "The <h1> element is never closed, so the JSX parser cannot tell where it ends. The component is missing a closing tag, so JSX cannot be parsed and the build fails."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Passing Props.",
          "summary": "Props are the inputs a component receives from its parent, passed as attributes in JSX. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Passing Props in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Passing Props?",
              "options": [
                "To style pages with CSS without writing any JavaScript",
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps",
                "pass data from a parent component down to a child as props"
              ],
              "answer": 3,
              "explanation": "Pass data from a parent component down to a child as props — that is the purpose of Passing Props."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Hello, Ada!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 1,
              "explanation": "The example renders 'Hello, Ada!' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m6-l1-ex1",
              "title": "Build: Passing Props",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Hello, Ada!' as its main heading, a paragraph with the text 'Passing Props', and a footer that says 'Built with React'. Use the Passing Props pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Hello, Ada!</h1>\n      <p>Passing Props</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Hello, Ada!', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Hello, Ada!",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Passing Props. Your component must render the text 'Hello, Ada!' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Hello, Ada!', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m6-l2",
          "slug": "react-m6-l2",
          "title": "Default Props and Children",
          "objectives": [
            "Explain what Default Props and Children is and when to use it",
            "Write the Default Props and Children pattern from the syntax in this lesson",
            "Build a small component that uses Default Props and Children correctly"
          ],
          "introduction": "Default Props and Children is a core part of building React apps. When a prop is optional, you can give it a default value so the component still works when the parent omits it. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "When a prop is optional, you can give it a default value so the component still works when the parent omits it. The special children prop holds whatever JSX was nested inside the component's tags, which is how wrappers such as cards and panels receive their content. Defaults and children make components flexible without extra configuration. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "function Card({ title = 'Untitled', children }: { title?: string; children: React.ReactNode }) {\n  return <section><h2>{title}</h2>{children}</section>;\n}",
          "analogy": "Like a picture frame that comes with a default photo but lets you swap in your own.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>My Card</h1>\n      <p>Default Props and Children</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Default Props and Children solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'My Card' ends up on screen.",
            "Predict what would change if you replaced 'My Card' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Default Props and Children syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'My Card' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Forgetting the key prop when rendering a list, causing stale UI after updates."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'My Card' for the Default Props and Children lesson, but it does not work because of a lowercase component name. Find and fix the bug.",
            "buggyCode": "function greeting() {\n  return <h1>My Card</h1>;\n}\n\nexport default function App() {\n  return <greeting />;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>My Card</h1>\n      <p>Default Props and Children</p>\n    </div>\n  );\n}",
            "explanation": "Component names must start with a capital letter, or JSX treats them as built-in HTML elements. The component name starts with a lowercase letter, so React treats it as a plain HTML tag instead of a component."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Default Props and Children.",
          "summary": "When a prop is optional, you can give it a default value so the component still works when the parent omits it. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Default Props and Children in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Default Props and Children?",
              "options": [
                "give optional props defaults and receive nested JSX through children",
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps",
                "To run code on the server instead of in the browser"
              ],
              "answer": 0,
              "explanation": "Give optional props defaults and receive nested JSX through children — that is the purpose of Default Props and Children."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "My Card",
                "Error: not found"
              ],
              "answer": 2,
              "explanation": "The example renders 'My Card' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m6-l2-ex1",
              "title": "Build: Default Props and Children",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'My Card' as its main heading, a paragraph with the text 'Default Props and Children', and a footer that says 'Built with React'. Use the Default Props and Children pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>My Card</h1>\n      <p>Default Props and Children</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'My Card', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "My Card",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Default Props and Children. Your component must render the text 'My Card' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'My Card', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m7",
      "title": "Lists",
      "description": "Lists: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 7,
      "lessons": [
        {
          "id": "react-m7-l1",
          "slug": "react-m7-l1",
          "title": "Rendering Lists with map",
          "objectives": [
            "Explain what Rendering Lists with map is and when to use it",
            "Write the Rendering Lists with map pattern from the syntax in this lesson",
            "Build a small component that uses Rendering Lists with map correctly"
          ],
          "introduction": "Rendering Lists with map is a core part of building React apps. To render a list in React you call map on an array and return one element per item, turning data into markup. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "To render a list in React you call map on an array and return one element per item, turning data into markup. Each item usually becomes a list item or a small component, so adding an entry to the array automatically adds it to the page. Mapping keeps the interface driven by data instead of repeated hand-written markup. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const fruits = ['Apple', 'Banana', 'Cherry'];\n<ul>{fruits.map(f => <li key={f}>{f}</li>)}</ul>",
          "analogy": "Like a printing press fed a list of names: each name comes out as its own printed line.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Apple, Banana, Cherry</h1>\n      <p>Rendering Lists with map</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Rendering Lists with map solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Apple, Banana, Cherry' ends up on screen.",
            "Predict what would change if you replaced 'Apple, Banana, Cherry' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Rendering Lists with map syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Apple, Banana, Cherry' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Reading state immediately after setting it and expecting the new value."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Apple, Banana, Cherry' for the Rendering Lists with map lesson, but it does not work because of directly mutating state. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const [count, setCount] = useState(0);\n  const add = () => { count = count + 1; };\n  return <button onClick={add}>Count: {count}</button>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Apple, Banana, Cherry</h1>\n      <p>Rendering Lists with map</p>\n    </div>\n  );\n}",
            "explanation": "Assigning to the state variable does not notify React; only the setter triggers a re-render. State is changed by assigning to it directly instead of calling the setter, so React never re-renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Rendering Lists with map.",
          "summary": "To render a list in React you call map on an array and return one element per item, turning data into markup. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Rendering Lists with map in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Rendering Lists with map?",
              "options": [
                "turn arrays into markup by mapping each item to an element",
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps",
                "To run code on the server instead of in the browser"
              ],
              "answer": 0,
              "explanation": "Turn arrays into markup by mapping each item to an element — that is the purpose of Rendering Lists with map."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Error: not found",
                "Apple, Banana, Cherry"
              ],
              "answer": 3,
              "explanation": "The example renders 'Apple, Banana, Cherry' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m7-l1-ex1",
              "title": "Build: Rendering Lists with map",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Apple, Banana, Cherry' as its main heading, a paragraph with the text 'Rendering Lists with map', and a footer that says 'Built with React'. Use the Rendering Lists with map pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Apple, Banana, Cherry</h1>\n      <p>Rendering Lists with map</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Apple, Banana, Cherry', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Apple, Banana, Cherry",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Rendering Lists with map. Your component must render the text 'Apple, Banana, Cherry' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Apple, Banana, Cherry', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m7-l2",
          "slug": "react-m7-l2",
          "title": "Keys and List Updates",
          "objectives": [
            "Explain what Keys and List Updates is and when to use it",
            "Write the Keys and List Updates pattern from the syntax in this lesson",
            "Build a small component that uses Keys and List Updates correctly"
          ],
          "introduction": "Keys and List Updates is a core part of building React apps. A key is a stable, unique identifier you give each element in a list so React can tell items apart when the list changes. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A key is a stable, unique identifier you give each element in a list so React can tell items apart when the list changes. Without good keys, React may reuse the wrong DOM nodes after a reorder or a deletion, showing stale input values or losing focus. Use a real id from your data, never the array index for a list that changes. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "<ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>",
          "analogy": "Like name tags at a conference: if everyone swaps tags, you greet the wrong person.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Item list ready</h1>\n      <p>Keys and List Updates</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Keys and List Updates solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Item list ready' ends up on screen.",
            "Predict what would change if you replaced 'Item list ready' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Keys and List Updates syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Item list ready' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Passing a new inline function as a prop on every render, breaking memoization."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Item list ready' for the Keys and List Updates lesson, but it does not work because of a missing key in a list. Find and fix the bug.",
            "buggyCode": "const items = ['A', 'B', 'C'];\nexport default function App() {\n  return <ul>{items.map(i => <li>{i}</li>)}</ul>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Item list ready</h1>\n      <p>Keys and List Updates</p>\n    </div>\n  );\n}",
            "explanation": "Every element produced by map needs a stable key so React can match it across renders. List items are rendered without a key, so React cannot track them correctly when the list changes."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Keys and List Updates.",
          "summary": "A key is a stable, unique identifier you give each element in a list so React can tell items apart when the list changes. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Keys and List Updates in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Keys and List Updates?",
              "options": [
                "To compile TypeScript directly into native mobile apps",
                "give each list element a stable unique key so React can update it correctly",
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically"
              ],
              "answer": 1,
              "explanation": "Give each list element a stable unique key so React can update it correctly — that is the purpose of Keys and List Updates."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Item list ready",
                "Hello, World!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 0,
              "explanation": "The example renders 'Item list ready' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m7-l2-ex1",
              "title": "Build: Keys and List Updates",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Item list ready' as its main heading, a paragraph with the text 'Keys and List Updates', and a footer that says 'Built with React'. Use the Keys and List Updates pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Item list ready</h1>\n      <p>Keys and List Updates</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Item list ready', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Item list ready",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Keys and List Updates. Your component must render the text 'Item list ready' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Item list ready', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m8",
      "title": "Beginner Projects",
      "description": "Beginner Projects: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 8,
      "lessons": [
        {
          "id": "react-m8-l1",
          "slug": "react-m8-l1",
          "title": "Project: Counter App",
          "objectives": [
            "Explain what Project: Counter App is and when to use it",
            "Write the Project: Counter App pattern from the syntax in this lesson",
            "Build a small component that uses Project: Counter App correctly"
          ],
          "introduction": "Project: Counter App is a core part of building React apps. A counter is the smallest complete interactive app: a number on screen, a button to increase it, a button to decrease it, and one piece of state holding the value. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A counter is the smallest complete interactive app: a number on screen, a button to increase it, a button to decrease it, and one piece of state holding the value. Building it end to end teaches the full loop of state, events and rendering. It is the pattern every larger interactive feature is built from. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const [count, setCount] = useState(0);\nreturn (<div><p>{count}</p><button onClick={() => setCount(count + 1)}>+</button></div>);",
          "analogy": "Like a tally counter at a fairground: one button, one number, and the number always matches the clicks.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Count: 0</h1>\n      <p>Project: Counter App</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Project: Counter App solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Count: 0' ends up on screen.",
            "Predict what would change if you replaced 'Count: 0' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: Counter App syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Count: 0' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Putting side effects directly in the render body instead of in useEffect."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Count: 0' for the Project: Counter App lesson, but it does not work because of a hook called inside a condition. Find and fix the bug.",
            "buggyCode": "export default function App({ show }: { show: boolean }) {\n  if (show) {\n    const [n, setN] = useState(0);\n  }\n  return <h1>Count: 0</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Count: 0</h1>\n      <p>Project: Counter App</p>\n    </div>\n  );\n}",
            "explanation": "Hooks must be called unconditionally at the top level so their order is the same on every render. A hook is called inside an if statement, breaking the rules of hooks because call order changes between renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Project: Counter App.",
          "summary": "A counter is the smallest complete interactive app: a number on screen, a button to increase it, a button to decrease it, and one piece of state holding the value. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: Counter App in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: Counter App?",
              "options": [
                "To compile TypeScript directly into native mobile apps",
                "combine state and events into a complete interactive counter app",
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically"
              ],
              "answer": 1,
              "explanation": "Combine state and events into a complete interactive counter app — that is the purpose of Project: Counter App."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Count: 0",
                "Loading...",
                "Error: not found"
              ],
              "answer": 1,
              "explanation": "The example renders 'Count: 0' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m8-l1-ex1",
              "title": "Build: Project: Counter App",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Count: 0' as its main heading, a paragraph with the text 'Project: Counter App', and a footer that says 'Built with React'. Use the Project: Counter App pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Count: 0</h1>\n      <p>Project: Counter App</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Count: 0', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Count: 0",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Project: Counter App. Your component must render the text 'Count: 0' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Count: 0', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m8-l2",
          "slug": "react-m8-l2",
          "title": "Project: Todo List Basics",
          "objectives": [
            "Explain what Project: Todo List Basics is and when to use it",
            "Write the Project: Todo List Basics pattern from the syntax in this lesson",
            "Build a small component that uses Project: Todo List Basics correctly"
          ],
          "introduction": "Project: Todo List Basics is a core part of building React apps. A todo list adds items to an array in state, renders them with map, and removes an item when its button is clicked. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A todo list adds items to an array in state, renders them with map, and removes an item when its button is clicked. It combines state, lists, keys, events and controlled input in one small project. Once this works, you have the core skills for most CRUD interfaces: create, read and delete. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const [todos, setTodos] = useState<string[]>([]);\nconst add = (t: string) => setTodos([...todos, t]);",
          "analogy": "Like a shopping list on the fridge: add lines, cross them off, and the list always shows the truth.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>My todos</h1>\n      <p>Project: Todo List Basics</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Project: Todo List Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'My todos' ends up on screen.",
            "Predict what would change if you replaced 'My todos' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: Todo List Basics syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'My todos' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Returning two root elements from a component without wrapping them in a fragment."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'My todos' for the Project: Todo List Basics lesson, but it does not work because of a missing return. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const text = 'My todos';\n  <h1>{text}</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>My todos</h1>\n      <p>Project: Todo List Basics</p>\n    </div>\n  );\n}",
            "explanation": "A function component must return its JSX; an expression statement on its own is discarded. The component body computes JSX but never returns it, so React renders nothing."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Project: Todo List Basics.",
          "summary": "A todo list adds items to an array in state, renders them with map, and removes an item when its button is clicked. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: Todo List Basics in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: Todo List Basics?",
              "options": [
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically",
                "build a todo list that adds, renders and removes items with state",
                "To replace JavaScript with a new programming language"
              ],
              "answer": 2,
              "explanation": "Build a todo list that adds, renders and removes items with state — that is the purpose of Project: Todo List Basics."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "My todos",
                "Error: not found"
              ],
              "answer": 2,
              "explanation": "The example renders 'My todos' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m8-l2-ex1",
              "title": "Build: Project: Todo List Basics",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'My todos' as its main heading, a paragraph with the text 'Project: Todo List Basics', and a footer that says 'Built with React'. Use the Project: Todo List Basics pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>My todos</h1>\n      <p>Project: Todo List Basics</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'My todos', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "My todos",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Project: Todo List Basics. Your component must render the text 'My todos' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'My todos', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m9",
      "title": "Hooks",
      "description": "Hooks: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 9,
      "lessons": [
        {
          "id": "react-m9-l1",
          "slug": "react-m9-l1",
          "title": "The Rules of Hooks",
          "objectives": [
            "Explain what The Rules of Hooks is and when to use it",
            "Write the The Rules of Hooks pattern from the syntax in this lesson",
            "Build a small component that uses The Rules of Hooks correctly"
          ],
          "introduction": "The Rules of Hooks is a core part of building React apps. Hooks may only be called at the top level of a component or another hook, never inside loops, conditions or nested functions, and only from React functions. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Hooks may only be called at the top level of a component or another hook, never inside loops, conditions or nested functions, and only from React functions. These rules exist because React matches each hook call to its stored state by call order. Breaking them makes state jump between hooks, so the lint rule react-hooks/rules-of-hooks catches mistakes early. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "// Good: called at the top level\nconst [name, setName] = useState('');\n// Bad: inside an if statement",
          "analogy": "Like assigned seats in a theatre: everyone must sit in the same seat every night or the usher gets confused.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Rules of Hooks</h1>\n      <p>The Rules of Hooks</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem The Rules of Hooks solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Rules of Hooks' ends up on screen.",
            "Predict what would change if you replaced 'Rules of Hooks' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the The Rules of Hooks syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Rules of Hooks' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Using a lowercase name for a component, so React treats it as a plain HTML tag."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Rules of Hooks' for the The Rules of Hooks lesson, but it does not work because of a missing closing tag. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  return (\n    <div>\n      <h1>Rules of Hooks\n    </div>\n  );\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Rules of Hooks</h1>\n      <p>The Rules of Hooks</p>\n    </div>\n  );\n}",
            "explanation": "The <h1> element is never closed, so the JSX parser cannot tell where it ends. The component is missing a closing tag, so JSX cannot be parsed and the build fails."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to The Rules of Hooks.",
          "summary": "Hooks may only be called at the top level of a component or another hook, never inside loops, conditions or nested functions, and only from React functions. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use The Rules of Hooks in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of The Rules of Hooks?",
              "options": [
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically",
                "call hooks only at the top level of React functions, in the same order every render",
                "To replace JavaScript with a new programming language"
              ],
              "answer": 2,
              "explanation": "Call hooks only at the top level of React functions, in the same order every render — that is the purpose of The Rules of Hooks."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Error: not found",
                "Rules of Hooks"
              ],
              "answer": 3,
              "explanation": "The example renders 'Rules of Hooks' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m9-l1-ex1",
              "title": "Build: The Rules of Hooks",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Rules of Hooks' as its main heading, a paragraph with the text 'The Rules of Hooks', and a footer that says 'Built with React'. Use the The Rules of Hooks pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Rules of Hooks</h1>\n      <p>The Rules of Hooks</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Rules of Hooks', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Rules of Hooks",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for The Rules of Hooks. Your component must render the text 'Rules of Hooks' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Rules of Hooks', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m9-l2",
          "slug": "react-m9-l2",
          "title": "useEffect Basics",
          "objectives": [
            "Explain what useEffect Basics is and when to use it",
            "Write the useEffect Basics pattern from the syntax in this lesson",
            "Build a small component that uses useEffect Basics correctly"
          ],
          "introduction": "useEffect Basics is a core part of building React apps. useEffect runs side effects after a component renders, such as fetching data, setting a document title or starting a timer. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "useEffect runs side effects after a component renders, such as fetching data, setting a document title or starting a timer. You pass a function and a dependency array; the effect re-runs only when a listed value changes, and an empty array means run once after mounting. Effects connect the component to the world outside React. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "useEffect(() => {\n  document.title = `Hello, ${name}`;\n}, [name]);",
          "analogy": "Like a butler who tidies up after the guests arrive and again whenever the guest list changes.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Effect ready</h1>\n      <p>useEffect Basics</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem useEffect Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Effect ready' ends up on screen.",
            "Predict what would change if you replaced 'Effect ready' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the useEffect Basics syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Effect ready' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Forgetting the key prop when rendering a list, causing stale UI after updates."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Effect ready' for the useEffect Basics lesson, but it does not work because of a lowercase component name. Find and fix the bug.",
            "buggyCode": "function greeting() {\n  return <h1>Effect ready</h1>;\n}\n\nexport default function App() {\n  return <greeting />;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Effect ready</h1>\n      <p>useEffect Basics</p>\n    </div>\n  );\n}",
            "explanation": "Component names must start with a capital letter, or JSX treats them as built-in HTML elements. The component name starts with a lowercase letter, so React treats it as a plain HTML tag instead of a component."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to useEffect Basics.",
          "summary": "useEffect runs side effects after a component renders, such as fetching data, setting a document title or starting a timer. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use useEffect Basics in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of useEffect Basics?",
              "options": [
                "To delete unused files from the project automatically",
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript",
                "run side effects after rendering with useEffect and a dependency array"
              ],
              "answer": 3,
              "explanation": "Run side effects after rendering with useEffect and a dependency array — that is the purpose of useEffect Basics."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Effect ready",
                "Hello, World!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 0,
              "explanation": "The example renders 'Effect ready' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m9-l2-ex1",
              "title": "Build: useEffect Basics",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Effect ready' as its main heading, a paragraph with the text 'useEffect Basics', and a footer that says 'Built with React'. Use the useEffect Basics pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Effect ready</h1>\n      <p>useEffect Basics</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Effect ready', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Effect ready",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for useEffect Basics. Your component must render the text 'Effect ready' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Effect ready', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m10",
      "title": "Lifecycle Concepts",
      "description": "Lifecycle Concepts: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 10,
      "lessons": [
        {
          "id": "react-m10-l1",
          "slug": "react-m10-l1",
          "title": "Mounting and Updating",
          "objectives": [
            "Explain what Mounting and Updating is and when to use it",
            "Write the Mounting and Updating pattern from the syntax in this lesson",
            "Build a small component that uses Mounting and Updating correctly"
          ],
          "introduction": "Mounting and Updating is a core part of building React apps. A component mounts when React first creates it, updates when its props or state change, and unmounts when it is removed. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A component mounts when React first creates it, updates when its props or state change, and unmounts when it is removed. Effects with an empty dependency array run on mount, effects with dependencies run on updates, and rendering itself should stay pure. Thinking in mount, update and unmount replaces the old class lifecycle methods. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "useEffect(() => { console.log('mounted'); }, []);\nuseEffect(() => { console.log('updated', count); }, [count]);",
          "analogy": "Like a shop opening in the morning, restocking during the day, and closing at night.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Mounted!</h1>\n      <p>Mounting and Updating</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Mounting and Updating solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Mounted!' ends up on screen.",
            "Predict what would change if you replaced 'Mounted!' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Mounting and Updating syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Mounted!' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Reading state immediately after setting it and expecting the new value."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Mounted!' for the Mounting and Updating lesson, but it does not work because of directly mutating state. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const [count, setCount] = useState(0);\n  const add = () => { count = count + 1; };\n  return <button onClick={add}>Count: {count}</button>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Mounted!</h1>\n      <p>Mounting and Updating</p>\n    </div>\n  );\n}",
            "explanation": "Assigning to the state variable does not notify React; only the setter triggers a re-render. State is changed by assigning to it directly instead of calling the setter, so React never re-renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Mounting and Updating.",
          "summary": "A component mounts when React first creates it, updates when its props or state change, and unmounts when it is removed. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Mounting and Updating in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Mounting and Updating?",
              "options": [
                "To delete unused files from the project automatically",
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript",
                "understand mount, update and unmount as the phases of a component's life"
              ],
              "answer": 3,
              "explanation": "Understand mount, update and unmount as the phases of a component's life — that is the purpose of Mounting and Updating."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Mounted!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 1,
              "explanation": "The example renders 'Mounted!' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m10-l1-ex1",
              "title": "Build: Mounting and Updating",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Mounted!' as its main heading, a paragraph with the text 'Mounting and Updating', and a footer that says 'Built with React'. Use the Mounting and Updating pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Mounted!</h1>\n      <p>Mounting and Updating</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Mounted!', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Mounted!",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Mounting and Updating. Your component must render the text 'Mounted!' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Mounted!', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m10-l2",
          "slug": "react-m10-l2",
          "title": "Cleanup and Unmounting",
          "objectives": [
            "Explain what Cleanup and Unmounting is and when to use it",
            "Write the Cleanup and Unmounting pattern from the syntax in this lesson",
            "Build a small component that uses Cleanup and Unmounting correctly"
          ],
          "introduction": "Cleanup and Unmounting is a core part of building React apps. An effect can return a cleanup function that React runs before the effect re-runs and when the component unmounts. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "An effect can return a cleanup function that React runs before the effect re-runs and when the component unmounts. Cleanup is where you cancel timers, remove listeners and abort fetches, so nothing keeps running after the component is gone. Forgetting cleanup is the most common source of memory leaks and 'setState on unmounted component' warnings. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);",
          "analogy": "Like turning off the lights and locking the door when you leave a room.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Cleaned up!</h1>\n      <p>Cleanup and Unmounting</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Cleanup and Unmounting solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Cleaned up!' ends up on screen.",
            "Predict what would change if you replaced 'Cleaned up!' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Cleanup and Unmounting syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Cleaned up!' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Passing a new inline function as a prop on every render, breaking memoization."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Cleaned up!' for the Cleanup and Unmounting lesson, but it does not work because of a missing key in a list. Find and fix the bug.",
            "buggyCode": "const items = ['A', 'B', 'C'];\nexport default function App() {\n  return <ul>{items.map(i => <li>{i}</li>)}</ul>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Cleaned up!</h1>\n      <p>Cleanup and Unmounting</p>\n    </div>\n  );\n}",
            "explanation": "Every element produced by map needs a stable key so React can match it across renders. List items are rendered without a key, so React cannot track them correctly when the list changes."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Cleanup and Unmounting.",
          "summary": "An effect can return a cleanup function that React runs before the effect re-runs and when the component unmounts. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Cleanup and Unmounting in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Cleanup and Unmounting?",
              "options": [
                "return a cleanup function from effects to stop timers and listeners on unmount",
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript",
                "To store data permanently in a database on the server"
              ],
              "answer": 0,
              "explanation": "Return a cleanup function from effects to stop timers and listeners on unmount — that is the purpose of Cleanup and Unmounting."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Cleaned up!",
                "Error: not found"
              ],
              "answer": 2,
              "explanation": "The example renders 'Cleaned up!' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m10-l2-ex1",
              "title": "Build: Cleanup and Unmounting",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Cleaned up!' as its main heading, a paragraph with the text 'Cleanup and Unmounting', and a footer that says 'Built with React'. Use the Cleanup and Unmounting pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Cleaned up!</h1>\n      <p>Cleanup and Unmounting</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Cleaned up!', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Cleaned up!",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Cleanup and Unmounting. Your component must render the text 'Cleaned up!' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Cleaned up!', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m11",
      "title": "Forms",
      "description": "Forms: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 11,
      "lessons": [
        {
          "id": "react-m11-l1",
          "slug": "react-m11-l1",
          "title": "Controlled Inputs",
          "objectives": [
            "Explain what Controlled Inputs is and when to use it",
            "Write the Controlled Inputs pattern from the syntax in this lesson",
            "Build a small component that uses Controlled Inputs correctly"
          ],
          "introduction": "Controlled Inputs is a core part of building React apps. A controlled input takes its value from state and reports every keystroke through onChange, so React is the single source of truth for what the field contains. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A controlled input takes its value from state and reports every keystroke through onChange, so React is the single source of truth for what the field contains. This makes validation, formatting and clearing the field straightforward, because the displayed value always equals state. Uncontrolled inputs, by contrast, keep their value in the DOM. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const [text, setText] = useState('');\n<input value={text} onChange={e => setText(e.target.value)} />",
          "analogy": "Like a puppet whose strings you hold: the input shows exactly what state tells it to show.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Type here...</h1>\n      <p>Controlled Inputs</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Controlled Inputs solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Type here...' ends up on screen.",
            "Predict what would change if you replaced 'Type here...' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Controlled Inputs syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Type here...' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Putting side effects directly in the render body instead of in useEffect."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Type here...' for the Controlled Inputs lesson, but it does not work because of a hook called inside a condition. Find and fix the bug.",
            "buggyCode": "export default function App({ show }: { show: boolean }) {\n  if (show) {\n    const [n, setN] = useState(0);\n  }\n  return <h1>Type here...</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Type here...</h1>\n      <p>Controlled Inputs</p>\n    </div>\n  );\n}",
            "explanation": "Hooks must be called unconditionally at the top level so their order is the same on every render. A hook is called inside an if statement, breaking the rules of hooks because call order changes between renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Controlled Inputs.",
          "summary": "A controlled input takes its value from state and reports every keystroke through onChange, so React is the single source of truth for what the field contains. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Controlled Inputs in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Controlled Inputs?",
              "options": [
                "keep form inputs controlled by state through value and onChange",
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript",
                "To store data permanently in a database on the server"
              ],
              "answer": 0,
              "explanation": "Keep form inputs controlled by state through value and onChange — that is the purpose of Controlled Inputs."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Error: not found",
                "Type here..."
              ],
              "answer": 3,
              "explanation": "The example renders 'Type here...' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m11-l1-ex1",
              "title": "Build: Controlled Inputs",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Type here...' as its main heading, a paragraph with the text 'Controlled Inputs', and a footer that says 'Built with React'. Use the Controlled Inputs pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Type here...</h1>\n      <p>Controlled Inputs</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Type here...', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Type here...",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Controlled Inputs. Your component must render the text 'Type here...' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Type here...', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m11-l2",
          "slug": "react-m11-l2",
          "title": "Form Validation Basics",
          "objectives": [
            "Explain what Form Validation Basics is and when to use it",
            "Write the Form Validation Basics pattern from the syntax in this lesson",
            "Build a small component that uses Form Validation Basics correctly"
          ],
          "introduction": "Form Validation Basics is a core part of building React apps. Form validation checks user input before it is submitted, showing a message next to each field that fails. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Form validation checks user input before it is submitted, showing a message next to each field that fails. Validate on submit for the final check, and on blur or change for early feedback, but never trust client-side validation alone: the server must check again. Good validation messages say what is wrong and how to fix it. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const [error, setError] = useState('');\nconst submit = () => { if (!email.includes('@')) setError('Enter a valid email'); };",
          "analogy": "Like a bouncer checking tickets at the door: polite, specific, and impossible to talk past.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Form ready</h1>\n      <p>Form Validation Basics</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Form Validation Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Form ready' ends up on screen.",
            "Predict what would change if you replaced 'Form ready' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Form Validation Basics syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Form ready' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Returning two root elements from a component without wrapping them in a fragment."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Form ready' for the Form Validation Basics lesson, but it does not work because of a missing return. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const text = 'Form ready';\n  <h1>{text}</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Form ready</h1>\n      <p>Form Validation Basics</p>\n    </div>\n  );\n}",
            "explanation": "A function component must return its JSX; an expression statement on its own is discarded. The component body computes JSX but never returns it, so React renders nothing."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Form Validation Basics.",
          "summary": "Form validation checks user input before it is submitted, showing a message next to each field that fails. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Form Validation Basics in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Form Validation Basics?",
              "options": [
                "To style pages with CSS without writing any JavaScript",
                "validate form input and show clear messages before submission",
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps"
              ],
              "answer": 1,
              "explanation": "Validate form input and show clear messages before submission — that is the purpose of Form Validation Basics."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Form ready",
                "Hello, World!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 0,
              "explanation": "The example renders 'Form ready' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m11-l2-ex1",
              "title": "Build: Form Validation Basics",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Form ready' as its main heading, a paragraph with the text 'Form Validation Basics', and a footer that says 'Built with React'. Use the Form Validation Basics pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Form ready</h1>\n      <p>Form Validation Basics</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Form ready', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Form ready",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Form Validation Basics. Your component must render the text 'Form ready' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Form ready', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m12",
      "title": "Routing",
      "description": "Routing: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 12,
      "lessons": [
        {
          "id": "react-m12-l1",
          "slug": "react-m12-l1",
          "title": "Client-Side Routing Concepts",
          "objectives": [
            "Explain what Client-Side Routing Concepts is and when to use it",
            "Write the Client-Side Routing Concepts pattern from the syntax in this lesson",
            "Build a small component that uses Client-Side Routing Concepts correctly"
          ],
          "introduction": "Client-Side Routing Concepts is a core part of building React apps. Client-side routing changes what the user sees without asking the server for a new page. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Client-side routing changes what the user sees without asking the server for a new page. A router watches the URL, matches it against your route table, and renders the matching component, while Link elements navigate without a full reload. This gives the feel of a multi-page site with the speed of a single-page app. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\n<Routes><Route path=\"/\" element={<Home />} /></Routes>",
          "analogy": "Like a railway switchyard: the track (URL) decides which platform (page) the train arrives at.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Home page</h1>\n      <p>Client-Side Routing Concepts</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Client-Side Routing Concepts solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Home page' ends up on screen.",
            "Predict what would change if you replaced 'Home page' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Client-Side Routing Concepts syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Home page' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Using a lowercase name for a component, so React treats it as a plain HTML tag."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Home page' for the Client-Side Routing Concepts lesson, but it does not work because of a missing closing tag. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  return (\n    <div>\n      <h1>Home page\n    </div>\n  );\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Home page</h1>\n      <p>Client-Side Routing Concepts</p>\n    </div>\n  );\n}",
            "explanation": "The <h1> element is never closed, so the JSX parser cannot tell where it ends. The component is missing a closing tag, so JSX cannot be parsed and the build fails."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Client-Side Routing Concepts.",
          "summary": "Client-side routing changes what the user sees without asking the server for a new page. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Client-Side Routing Concepts in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Client-Side Routing Concepts?",
              "options": [
                "To style pages with CSS without writing any JavaScript",
                "map URLs to components with a client-side router",
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps"
              ],
              "answer": 1,
              "explanation": "Map URLs to components with a client-side router — that is the purpose of Client-Side Routing Concepts."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Home page",
                "Loading...",
                "Error: not found"
              ],
              "answer": 1,
              "explanation": "The example renders 'Home page' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m12-l1-ex1",
              "title": "Build: Client-Side Routing Concepts",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Home page' as its main heading, a paragraph with the text 'Client-Side Routing Concepts', and a footer that says 'Built with React'. Use the Client-Side Routing Concepts pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Home page</h1>\n      <p>Client-Side Routing Concepts</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Home page', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Home page",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Client-Side Routing Concepts. Your component must render the text 'Home page' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Home page', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m12-l2",
          "slug": "react-m12-l2",
          "title": "Routes, Links and Params",
          "objectives": [
            "Explain what Routes, Links and Params is and when to use it",
            "Write the Routes, Links and Params pattern from the syntax in this lesson",
            "Build a small component that uses Routes, Links and Params correctly"
          ],
          "introduction": "Routes, Links and Params is a core part of building React apps. Routes can carry parameters, such as /users/:id, which the component reads with useParams to load the right data. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Routes can carry parameters, such as /users/:id, which the component reads with useParams to load the right data. Nested routes share a layout, and a catch-all route renders a not-found page for unknown URLs. Links build these URLs for the user, and useNavigate lets code navigate after an action such as a successful login. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "<Route path=\"/users/:id\" element={<User />} />\nconst { id } = useParams();",
          "analogy": "Like a library catalogue number: the number in the address tells you exactly which book to fetch.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>User profile</h1>\n      <p>Routes, Links and Params</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Routes, Links and Params solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'User profile' ends up on screen.",
            "Predict what would change if you replaced 'User profile' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Routes, Links and Params syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'User profile' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Forgetting the key prop when rendering a list, causing stale UI after updates."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'User profile' for the Routes, Links and Params lesson, but it does not work because of a lowercase component name. Find and fix the bug.",
            "buggyCode": "function greeting() {\n  return <h1>User profile</h1>;\n}\n\nexport default function App() {\n  return <greeting />;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>User profile</h1>\n      <p>Routes, Links and Params</p>\n    </div>\n  );\n}",
            "explanation": "Component names must start with a capital letter, or JSX treats them as built-in HTML elements. The component name starts with a lowercase letter, so React treats it as a plain HTML tag instead of a component."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Routes, Links and Params.",
          "summary": "Routes can carry parameters, such as /users/:id, which the component reads with useParams to load the right data. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Routes, Links and Params in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Routes, Links and Params?",
              "options": [
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps",
                "read route parameters and navigate between routes",
                "To run code on the server instead of in the browser"
              ],
              "answer": 2,
              "explanation": "Read route parameters and navigate between routes — that is the purpose of Routes, Links and Params."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "User profile",
                "Error: not found"
              ],
              "answer": 2,
              "explanation": "The example renders 'User profile' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m12-l2-ex1",
              "title": "Build: Routes, Links and Params",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'User profile' as its main heading, a paragraph with the text 'Routes, Links and Params', and a footer that says 'Built with React'. Use the Routes, Links and Params pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>User profile</h1>\n      <p>Routes, Links and Params</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'User profile', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "User profile",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Routes, Links and Params. Your component must render the text 'User profile' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'User profile', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m13",
      "title": "State Management",
      "description": "State Management: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 13,
      "lessons": [
        {
          "id": "react-m13-l1",
          "slug": "react-m13-l1",
          "title": "Lifting State Up",
          "objectives": [
            "Explain what Lifting State Up is and when to use it",
            "Write the Lifting State Up pattern from the syntax in this lesson",
            "Build a small component that uses Lifting State Up correctly"
          ],
          "introduction": "Lifting State Up is a core part of building React apps. When two components need the same data, you move the state up to their closest common parent and pass it down as props. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "When two components need the same data, you move the state up to their closest common parent and pass it down as props. The parent owns the value and the setter, and the children become controlled by it. Lifting state up is the simplest form of shared state and should be your first choice before reaching for heavier tools. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "function Parent() {\n  const [text, setText] = useState('');\n  return <><Input value={text} onChange={setText} /><Preview value={text} /></>;\n}",
          "analogy": "Like moving the thermostat to the hallway so both rooms share one temperature control.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Shared state</h1>\n      <p>Lifting State Up</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Lifting State Up solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Shared state' ends up on screen.",
            "Predict what would change if you replaced 'Shared state' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Lifting State Up syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Shared state' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Reading state immediately after setting it and expecting the new value."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Shared state' for the Lifting State Up lesson, but it does not work because of directly mutating state. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const [count, setCount] = useState(0);\n  const add = () => { count = count + 1; };\n  return <button onClick={add}>Count: {count}</button>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Shared state</h1>\n      <p>Lifting State Up</p>\n    </div>\n  );\n}",
            "explanation": "Assigning to the state variable does not notify React; only the setter triggers a re-render. State is changed by assigning to it directly instead of calling the setter, so React never re-renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Lifting State Up.",
          "summary": "When two components need the same data, you move the state up to their closest common parent and pass it down as props. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Lifting State Up in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Lifting State Up?",
              "options": [
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps",
                "share data between components by moving state to their common parent",
                "To run code on the server instead of in the browser"
              ],
              "answer": 2,
              "explanation": "Share data between components by moving state to their common parent — that is the purpose of Lifting State Up."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Error: not found",
                "Shared state"
              ],
              "answer": 3,
              "explanation": "The example renders 'Shared state' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m13-l1-ex1",
              "title": "Build: Lifting State Up",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Shared state' as its main heading, a paragraph with the text 'Lifting State Up', and a footer that says 'Built with React'. Use the Lifting State Up pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Shared state</h1>\n      <p>Lifting State Up</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Shared state', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Shared state",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Lifting State Up. Your component must render the text 'Shared state' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Shared state', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m13-l2",
          "slug": "react-m13-l2",
          "title": "Context API Basics",
          "objectives": [
            "Explain what Context API Basics is and when to use it",
            "Write the Context API Basics pattern from the syntax in this lesson",
            "Build a small component that uses Context API Basics correctly"
          ],
          "introduction": "Context API Basics is a core part of building React apps. Context lets you share a value, such as the current user or theme, with many components without passing props through every level. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Context lets you share a value, such as the current user or theme, with many components without passing props through every level. You create a context, provide a value near the top of the tree, and consume it with useContext where it is needed. Context is best for data that rarely changes; for fast-changing data it can cause too many re-renders. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const ThemeContext = createContext('light');\nconst theme = useContext(ThemeContext);",
          "analogy": "Like a radio broadcast: one station transmits, and any radio tuned in can hear it.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Theme: light</h1>\n      <p>Context API Basics</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Context API Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Theme: light' ends up on screen.",
            "Predict what would change if you replaced 'Theme: light' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Context API Basics syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Theme: light' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Passing a new inline function as a prop on every render, breaking memoization."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Theme: light' for the Context API Basics lesson, but it does not work because of a missing key in a list. Find and fix the bug.",
            "buggyCode": "const items = ['A', 'B', 'C'];\nexport default function App() {\n  return <ul>{items.map(i => <li>{i}</li>)}</ul>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Theme: light</h1>\n      <p>Context API Basics</p>\n    </div>\n  );\n}",
            "explanation": "Every element produced by map needs a stable key so React can match it across renders. List items are rendered without a key, so React cannot track them correctly when the list changes."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Context API Basics.",
          "summary": "Context lets you share a value, such as the current user or theme, with many components without passing props through every level. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Context API Basics in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Context API Basics?",
              "options": [
                "To compile TypeScript directly into native mobile apps",
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically",
                "share values across the tree with Context instead of prop drilling"
              ],
              "answer": 3,
              "explanation": "Share values across the tree with Context instead of prop drilling — that is the purpose of Context API Basics."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Theme: light",
                "Hello, World!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 0,
              "explanation": "The example renders 'Theme: light' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m13-l2-ex1",
              "title": "Build: Context API Basics",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Theme: light' as its main heading, a paragraph with the text 'Context API Basics', and a footer that says 'Built with React'. Use the Context API Basics pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Theme: light</h1>\n      <p>Context API Basics</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Theme: light', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Theme: light",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Context API Basics. Your component must render the text 'Theme: light' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Theme: light', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m14",
      "title": "API Integration",
      "description": "API Integration: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 14,
      "lessons": [
        {
          "id": "react-m14-l1",
          "slug": "react-m14-l1",
          "title": "Fetching Data with useEffect",
          "objectives": [
            "Explain what Fetching Data with useEffect is and when to use it",
            "Write the Fetching Data with useEffect pattern from the syntax in this lesson",
            "Build a small component that uses Fetching Data with useEffect correctly"
          ],
          "introduction": "Fetching Data with useEffect is a core part of building React apps. Data fetching belongs in an effect: the component mounts, the effect starts the fetch, and when the response arrives you store it in state and React re-renders with the data. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Data fetching belongs in an effect: the component mounts, the effect starts the fetch, and when the response arrives you store it in state and React re-renders with the data. Fetching during render would start a new request on every render. An empty dependency array fetches once; adding an id refetches when the id changes. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "useEffect(() => {\n  fetch('/api/users').then(r => r.json()).then(setUsers);\n}, []);",
          "analogy": "Like ordering food after sitting down: you sit first, then ask the kitchen, then eat when it arrives.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Loading users...</h1>\n      <p>Fetching Data with useEffect</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Fetching Data with useEffect solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Loading users...' ends up on screen.",
            "Predict what would change if you replaced 'Loading users...' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Fetching Data with useEffect syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Loading users...' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Putting side effects directly in the render body instead of in useEffect."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Loading users...' for the Fetching Data with useEffect lesson, but it does not work because of a hook called inside a condition. Find and fix the bug.",
            "buggyCode": "export default function App({ show }: { show: boolean }) {\n  if (show) {\n    const [n, setN] = useState(0);\n  }\n  return <h1>Loading users...</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Loading users...</h1>\n      <p>Fetching Data with useEffect</p>\n    </div>\n  );\n}",
            "explanation": "Hooks must be called unconditionally at the top level so their order is the same on every render. A hook is called inside an if statement, breaking the rules of hooks because call order changes between renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Fetching Data with useEffect.",
          "summary": "Data fetching belongs in an effect: the component mounts, the effect starts the fetch, and when the response arrives you store it in state and React re-renders with the data. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Fetching Data with useEffect in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Fetching Data with useEffect?",
              "options": [
                "To compile TypeScript directly into native mobile apps",
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically",
                "fetch data inside useEffect and store the result in state"
              ],
              "answer": 3,
              "explanation": "Fetch data inside useEffect and store the result in state — that is the purpose of Fetching Data with useEffect."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading users...",
                "Loading...",
                "Error: not found"
              ],
              "answer": 1,
              "explanation": "The example renders 'Loading users...' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m14-l1-ex1",
              "title": "Build: Fetching Data with useEffect",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Loading users...' as its main heading, a paragraph with the text 'Fetching Data with useEffect', and a footer that says 'Built with React'. Use the Fetching Data with useEffect pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Loading users...</h1>\n      <p>Fetching Data with useEffect</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Loading users...', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Loading users...",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Fetching Data with useEffect. Your component must render the text 'Loading users...' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Loading users...', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m14-l2",
          "slug": "react-m14-l2",
          "title": "Loading and Error States",
          "objectives": [
            "Explain what Loading and Error States is and when to use it",
            "Write the Loading and Error States pattern from the syntax in this lesson",
            "Build a small component that uses Loading and Error States correctly"
          ],
          "introduction": "Loading and Error States is a core part of building React apps. A fetch has three states: loading, success and error, and the interface should show something sensible for each. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A fetch has three states: loading, success and error, and the interface should show something sensible for each. Track them with state, render a spinner while loading, the data on success, and a retry button on error. Users who only ever see a blank screen during a slow request will assume the app is broken. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');\nif (status === 'loading') return <p>Loading...</p>;",
          "analogy": "Like a parcel tracker: ordered, on its way, delivered, or a clear message when it goes missing.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Loading...</h1>\n      <p>Loading and Error States</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Loading and Error States solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Loading...' ends up on screen.",
            "Predict what would change if you replaced 'Loading...' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Loading and Error States syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Loading...' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Returning two root elements from a component without wrapping them in a fragment."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Loading...' for the Loading and Error States lesson, but it does not work because of a missing return. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const text = 'Loading...';\n  <h1>{text}</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Loading...</h1>\n      <p>Loading and Error States</p>\n    </div>\n  );\n}",
            "explanation": "A function component must return its JSX; an expression statement on its own is discarded. The component body computes JSX but never returns it, so React renders nothing."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Loading and Error States.",
          "summary": "A fetch has three states: loading, success and error, and the interface should show something sensible for each. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Loading and Error States in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Loading and Error States?",
              "options": [
                "render loading, success and error states for every fetch",
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically",
                "To replace JavaScript with a new programming language"
              ],
              "answer": 0,
              "explanation": "Render loading, success and error states for every fetch — that is the purpose of Loading and Error States."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Loading...",
                "Error: not found"
              ],
              "answer": 2,
              "explanation": "The example renders 'Loading...' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m14-l2-ex1",
              "title": "Build: Loading and Error States",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Loading...' as its main heading, a paragraph with the text 'Loading and Error States', and a footer that says 'Built with React'. Use the Loading and Error States pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Loading...</h1>\n      <p>Loading and Error States</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Loading...', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Loading...",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Loading and Error States. Your component must render the text 'Loading...' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Loading...', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m15",
      "title": "TypeScript and React",
      "description": "TypeScript and React: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 15,
      "lessons": [
        {
          "id": "react-m15-l1",
          "slug": "react-m15-l1",
          "title": "Typing Props and State",
          "objectives": [
            "Explain what Typing Props and State is and when to use it",
            "Write the Typing Props and State pattern from the syntax in this lesson",
            "Build a small component that uses Typing Props and State correctly"
          ],
          "introduction": "Typing Props and State is a core part of building React apps. TypeScript makes React components safer by describing props and state with types, so a missing or wrongly typed prop is caught at compile time instead of crashing in the browser. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "TypeScript makes React components safer by describing props and state with types, so a missing or wrongly typed prop is caught at compile time instead of crashing in the browser. Define a props type or interface, annotate useState with the value type, and let the editor autocomplete prop names for you. Types are documentation the compiler checks. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "type Props = { name: string; age?: number };\nfunction Card({ name, age }: Props) { return <p>{name}</p>; }\nconst [n, setN] = useState<number>(0);",
          "analogy": "Like labelled drawers: everything has a place, and putting the wrong thing in is noticed at once.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Typed card</h1>\n      <p>Typing Props and State</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Typing Props and State solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Typed card' ends up on screen.",
            "Predict what would change if you replaced 'Typed card' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Typing Props and State syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Typed card' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Using a lowercase name for a component, so React treats it as a plain HTML tag."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Typed card' for the Typing Props and State lesson, but it does not work because of a missing closing tag. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  return (\n    <div>\n      <h1>Typed card\n    </div>\n  );\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Typed card</h1>\n      <p>Typing Props and State</p>\n    </div>\n  );\n}",
            "explanation": "The <h1> element is never closed, so the JSX parser cannot tell where it ends. The component is missing a closing tag, so JSX cannot be parsed and the build fails."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Typing Props and State.",
          "summary": "TypeScript makes React components safer by describing props and state with types, so a missing or wrongly typed prop is caught at compile time instead of crashing in the browser. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Typing Props and State in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Typing Props and State?",
              "options": [
                "describe props and state with TypeScript types",
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically",
                "To replace JavaScript with a new programming language"
              ],
              "answer": 0,
              "explanation": "Describe props and state with TypeScript types — that is the purpose of Typing Props and State."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Error: not found",
                "Typed card"
              ],
              "answer": 3,
              "explanation": "The example renders 'Typed card' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m15-l1-ex1",
              "title": "Build: Typing Props and State",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Typed card' as its main heading, a paragraph with the text 'Typing Props and State', and a footer that says 'Built with React'. Use the Typing Props and State pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Typed card</h1>\n      <p>Typing Props and State</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Typed card', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Typed card",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Typing Props and State. Your component must render the text 'Typed card' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Typed card', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m15-l2",
          "slug": "react-m15-l2",
          "title": "Typing Events and Refs",
          "objectives": [
            "Explain what Typing Events and Refs is and when to use it",
            "Write the Typing Events and Refs pattern from the syntax in this lesson",
            "Build a small component that uses Typing Events and Refs correctly"
          ],
          "introduction": "Typing Events and Refs is a core part of building React apps. Event handlers have specific types, such as React.ChangeEvent<HTMLInputElement> for an input change, which gives you a typed e.target.value. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Event handlers have specific types, such as React.ChangeEvent<HTMLInputElement> for an input change, which gives you a typed e.target.value. Refs are typed with useRef<HTMLDivElement>(null) and must be null-checked before use, because the element does not exist until after mounting. Precise types turn runtime surprises into compile-time errors. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const inputRef = useRef<HTMLInputElement>(null);\nconst focus = () => inputRef.current?.focus();",
          "analogy": "Like a wiring diagram: each wire is labelled, so you never plug a live wire into the wrong socket.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Typed events</h1>\n      <p>Typing Events and Refs</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Typing Events and Refs solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Typed events' ends up on screen.",
            "Predict what would change if you replaced 'Typed events' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Typing Events and Refs syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Typed events' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Forgetting the key prop when rendering a list, causing stale UI after updates."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Typed events' for the Typing Events and Refs lesson, but it does not work because of a lowercase component name. Find and fix the bug.",
            "buggyCode": "function greeting() {\n  return <h1>Typed events</h1>;\n}\n\nexport default function App() {\n  return <greeting />;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Typed events</h1>\n      <p>Typing Events and Refs</p>\n    </div>\n  );\n}",
            "explanation": "Component names must start with a capital letter, or JSX treats them as built-in HTML elements. The component name starts with a lowercase letter, so React treats it as a plain HTML tag instead of a component."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Typing Events and Refs.",
          "summary": "Event handlers have specific types, such as React.ChangeEvent<HTMLInputElement> for an input change, which gives you a typed e.target.value. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Typing Events and Refs in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Typing Events and Refs?",
              "options": [
                "To delete unused files from the project automatically",
                "type event handlers and refs so the compiler checks DOM access",
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript"
              ],
              "answer": 1,
              "explanation": "Type event handlers and refs so the compiler checks DOM access — that is the purpose of Typing Events and Refs."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Typed events",
                "Hello, World!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 0,
              "explanation": "The example renders 'Typed events' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m15-l2-ex1",
              "title": "Build: Typing Events and Refs",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Typed events' as its main heading, a paragraph with the text 'Typing Events and Refs', and a footer that says 'Built with React'. Use the Typing Events and Refs pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Typed events</h1>\n      <p>Typing Events and Refs</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Typed events', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Typed events",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Typing Events and Refs. Your component must render the text 'Typed events' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Typed events', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m16",
      "title": "Intermediate Projects",
      "description": "Intermediate Projects: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 16,
      "lessons": [
        {
          "id": "react-m16-l1",
          "slug": "react-m16-l1",
          "title": "Project: Weather Dashboard",
          "objectives": [
            "Explain what Project: Weather Dashboard is and when to use it",
            "Write the Project: Weather Dashboard pattern from the syntax in this lesson",
            "Build a small component that uses Project: Weather Dashboard correctly"
          ],
          "introduction": "Project: Weather Dashboard is a core part of building React apps. A weather dashboard fetches data from an API, stores it in state, and renders the temperature, conditions and a forecast list. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A weather dashboard fetches data from an API, stores it in state, and renders the temperature, conditions and a forecast list. It combines fetching, loading and error states, lists with keys, and conditional rendering in one realistic feature. The same structure appears in almost every data-driven page you will build. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const [weather, setWeather] = useState<Weather | null>(null);\nuseEffect(() => { fetch('/api/weather').then(r => r.json()).then(setWeather); }, []);",
          "analogy": "Like a departure board at an airport: live data in, a clear readable board out.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Weather: sunny, 21C</h1>\n      <p>Project: Weather Dashboard</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Project: Weather Dashboard solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Weather: sunny, 21C' ends up on screen.",
            "Predict what would change if you replaced 'Weather: sunny, 21C' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: Weather Dashboard syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Weather: sunny, 21C' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Reading state immediately after setting it and expecting the new value."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Weather: sunny, 21C' for the Project: Weather Dashboard lesson, but it does not work because of directly mutating state. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const [count, setCount] = useState(0);\n  const add = () => { count = count + 1; };\n  return <button onClick={add}>Count: {count}</button>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Weather: sunny, 21C</h1>\n      <p>Project: Weather Dashboard</p>\n    </div>\n  );\n}",
            "explanation": "Assigning to the state variable does not notify React; only the setter triggers a re-render. State is changed by assigning to it directly instead of calling the setter, so React never re-renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Project: Weather Dashboard.",
          "summary": "A weather dashboard fetches data from an API, stores it in state, and renders the temperature, conditions and a forecast list. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: Weather Dashboard in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: Weather Dashboard?",
              "options": [
                "To delete unused files from the project automatically",
                "build a dashboard that fetches and renders API data",
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript"
              ],
              "answer": 1,
              "explanation": "Build a dashboard that fetches and renders API data — that is the purpose of Project: Weather Dashboard."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Weather: sunny, 21C",
                "Loading...",
                "Error: not found"
              ],
              "answer": 1,
              "explanation": "The example renders 'Weather: sunny, 21C' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m16-l1-ex1",
              "title": "Build: Project: Weather Dashboard",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Weather: sunny, 21C' as its main heading, a paragraph with the text 'Project: Weather Dashboard', and a footer that says 'Built with React'. Use the Project: Weather Dashboard pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Weather: sunny, 21C</h1>\n      <p>Project: Weather Dashboard</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Weather: sunny, 21C', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Weather: sunny, 21C",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Project: Weather Dashboard. Your component must render the text 'Weather: sunny, 21C' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Weather: sunny, 21C', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m16-l2",
          "slug": "react-m16-l2",
          "title": "Project: Shopping Cart",
          "objectives": [
            "Explain what Project: Shopping Cart is and when to use it",
            "Write the Project: Shopping Cart pattern from the syntax in this lesson",
            "Build a small component that uses Project: Shopping Cart correctly"
          ],
          "introduction": "Project: Shopping Cart is a core part of building React apps. A shopping cart keeps an array of items in state, adds products, changes quantities, and computes the total with reduce. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A shopping cart keeps an array of items in state, adds products, changes quantities, and computes the total with reduce. Removing an item filters the array, and updating a quantity maps over it to produce a new array. This project practices the immutable array updates that real state management is built on. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);",
          "analogy": "Like a supermarket till: scan items in, change quantities, and the total always adds up.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Cart total: 0</h1>\n      <p>Project: Shopping Cart</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Project: Shopping Cart solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Cart total: 0' ends up on screen.",
            "Predict what would change if you replaced 'Cart total: 0' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: Shopping Cart syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Cart total: 0' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Passing a new inline function as a prop on every render, breaking memoization."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Cart total: 0' for the Project: Shopping Cart lesson, but it does not work because of a missing key in a list. Find and fix the bug.",
            "buggyCode": "const items = ['A', 'B', 'C'];\nexport default function App() {\n  return <ul>{items.map(i => <li>{i}</li>)}</ul>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Cart total: 0</h1>\n      <p>Project: Shopping Cart</p>\n    </div>\n  );\n}",
            "explanation": "Every element produced by map needs a stable key so React can match it across renders. List items are rendered without a key, so React cannot track them correctly when the list changes."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Project: Shopping Cart.",
          "summary": "A shopping cart keeps an array of items in state, adds products, changes quantities, and computes the total with reduce. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: Shopping Cart in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: Shopping Cart?",
              "options": [
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript",
                "build a shopping cart with add, remove and total calculations",
                "To store data permanently in a database on the server"
              ],
              "answer": 2,
              "explanation": "Build a shopping cart with add, remove and total calculations — that is the purpose of Project: Shopping Cart."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Cart total: 0",
                "Error: not found"
              ],
              "answer": 2,
              "explanation": "The example renders 'Cart total: 0' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m16-l2-ex1",
              "title": "Build: Project: Shopping Cart",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Cart total: 0' as its main heading, a paragraph with the text 'Project: Shopping Cart', and a footer that says 'Built with React'. Use the Project: Shopping Cart pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Cart total: 0</h1>\n      <p>Project: Shopping Cart</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Cart total: 0', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Cart total: 0",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Project: Shopping Cart. Your component must render the text 'Cart total: 0' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Cart total: 0', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m17",
      "title": "Advanced Hooks",
      "description": "Advanced Hooks: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 17,
      "lessons": [
        {
          "id": "react-m17-l1",
          "slug": "react-m17-l1",
          "title": "useReducer",
          "objectives": [
            "Explain what useReducer is and when to use it",
            "Write the useReducer pattern from the syntax in this lesson",
            "Build a small component that uses useReducer correctly"
          ],
          "introduction": "useReducer is a core part of building React apps. useReducer manages complex state with a reducer function: you dispatch actions describing what happened, and the reducer returns the next state. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "useReducer manages complex state with a reducer function: you dispatch actions describing what happened, and the reducer returns the next state. It shines when one state value depends on several others, or when the next state needs several steps to compute. Reducers are pure functions, so they are easy to test in isolation. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "type Action = { type: 'inc' } | { type: 'dec' };\nconst [state, dispatch] = useReducer((s: number, a: Action) => a.type === 'inc' ? s + 1 : s - 1, 0);",
          "analogy": "Like a post office sorting desk: each letter (action) arrives, and the clerk files it by a fixed rule.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Reducer ready</h1>\n      <p>useReducer</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem useReducer solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Reducer ready' ends up on screen.",
            "Predict what would change if you replaced 'Reducer ready' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the useReducer syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Reducer ready' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Putting side effects directly in the render body instead of in useEffect."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Reducer ready' for the useReducer lesson, but it does not work because of a hook called inside a condition. Find and fix the bug.",
            "buggyCode": "export default function App({ show }: { show: boolean }) {\n  if (show) {\n    const [n, setN] = useState(0);\n  }\n  return <h1>Reducer ready</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Reducer ready</h1>\n      <p>useReducer</p>\n    </div>\n  );\n}",
            "explanation": "Hooks must be called unconditionally at the top level so their order is the same on every render. A hook is called inside an if statement, breaking the rules of hooks because call order changes between renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to useReducer.",
          "summary": "useReducer manages complex state with a reducer function: you dispatch actions describing what happened, and the reducer returns the next state. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use useReducer in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of useReducer?",
              "options": [
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript",
                "manage complex state transitions with useReducer and actions",
                "To store data permanently in a database on the server"
              ],
              "answer": 2,
              "explanation": "Manage complex state transitions with useReducer and actions — that is the purpose of useReducer."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Error: not found",
                "Reducer ready"
              ],
              "answer": 3,
              "explanation": "The example renders 'Reducer ready' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m17-l1-ex1",
              "title": "Build: useReducer",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Reducer ready' as its main heading, a paragraph with the text 'useReducer', and a footer that says 'Built with React'. Use the useReducer pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Reducer ready</h1>\n      <p>useReducer</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Reducer ready', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Reducer ready",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for useReducer. Your component must render the text 'Reducer ready' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Reducer ready', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m17-l2",
          "slug": "react-m17-l2",
          "title": "useMemo and useCallback",
          "objectives": [
            "Explain what useMemo and useCallback is and when to use it",
            "Write the useMemo and useCallback pattern from the syntax in this lesson",
            "Build a small component that uses useMemo and useCallback correctly"
          ],
          "introduction": "useMemo and useCallback is a core part of building React apps. useMemo caches an expensive computed value and useCallback caches a function, recomputing only when their dependencies change. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "useMemo caches an expensive computed value and useCallback caches a function, recomputing only when their dependencies change. They matter when a value is costly to compute or when a stable function reference prevents child components from re-rendering. Used everywhere they add clutter; used on hot paths they remove real wasted work. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const total = useMemo(() => items.reduce((s, i) => s + i.price, 0), [items]);\nconst onAdd = useCallback(() => addItem(), [addItem]);",
          "analogy": "Like keeping a photocopy of a long report instead of retyping it every time someone asks.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Memoised!</h1>\n      <p>useMemo and useCallback</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem useMemo and useCallback solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Memoised!' ends up on screen.",
            "Predict what would change if you replaced 'Memoised!' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the useMemo and useCallback syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Memoised!' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Returning two root elements from a component without wrapping them in a fragment."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Memoised!' for the useMemo and useCallback lesson, but it does not work because of a missing return. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const text = 'Memoised!';\n  <h1>{text}</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Memoised!</h1>\n      <p>useMemo and useCallback</p>\n    </div>\n  );\n}",
            "explanation": "A function component must return its JSX; an expression statement on its own is discarded. The component body computes JSX but never returns it, so React renders nothing."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to useMemo and useCallback.",
          "summary": "useMemo caches an expensive computed value and useCallback caches a function, recomputing only when their dependencies change. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use useMemo and useCallback in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of useMemo and useCallback?",
              "options": [
                "To style pages with CSS without writing any JavaScript",
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps",
                "cache expensive values and stable callbacks with useMemo and useCallback"
              ],
              "answer": 3,
              "explanation": "Cache expensive values and stable callbacks with useMemo and useCallback — that is the purpose of useMemo and useCallback."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Memoised!",
                "Hello, World!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 0,
              "explanation": "The example renders 'Memoised!' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m17-l2-ex1",
              "title": "Build: useMemo and useCallback",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Memoised!' as its main heading, a paragraph with the text 'useMemo and useCallback', and a footer that says 'Built with React'. Use the useMemo and useCallback pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Memoised!</h1>\n      <p>useMemo and useCallback</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Memoised!', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Memoised!",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for useMemo and useCallback. Your component must render the text 'Memoised!' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Memoised!', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m18",
      "title": "Performance",
      "description": "Performance: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 18,
      "lessons": [
        {
          "id": "react-m18-l1",
          "slug": "react-m18-l1",
          "title": "Memoization with React.memo",
          "objectives": [
            "Explain what Memoization with React.memo is and when to use it",
            "Write the Memoization with React.memo pattern from the syntax in this lesson",
            "Build a small component that uses Memoization with React.memo correctly"
          ],
          "introduction": "Memoization with React.memo is a core part of building React apps. React.memo wraps a component so React skips re-rendering it when its props have not changed, comparing them shallowly. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "React.memo wraps a component so React skips re-rendering it when its props have not changed, comparing them shallowly. It helps for pure components that render often with the same props, such as rows in a long list. It does nothing if the parent passes a new object or function on every render, which is why it pairs with useMemo and useCallback. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const Row = React.memo(function Row({ name }: { name: string }) {\n  return <li>{name}</li>;\n});",
          "analogy": "Like a painter who only repaints the wall that actually got dirty, not the whole house.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Memoised row</h1>\n      <p>Memoization with React.memo</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Memoization with React.memo solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Memoised row' ends up on screen.",
            "Predict what would change if you replaced 'Memoised row' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Memoization with React.memo syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Memoised row' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Using a lowercase name for a component, so React treats it as a plain HTML tag."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Memoised row' for the Memoization with React.memo lesson, but it does not work because of a missing closing tag. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  return (\n    <div>\n      <h1>Memoised row\n    </div>\n  );\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Memoised row</h1>\n      <p>Memoization with React.memo</p>\n    </div>\n  );\n}",
            "explanation": "The <h1> element is never closed, so the JSX parser cannot tell where it ends. The component is missing a closing tag, so JSX cannot be parsed and the build fails."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Memoization with React.memo.",
          "summary": "React.memo wraps a component so React skips re-rendering it when its props have not changed, comparing them shallowly. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Memoization with React.memo in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Memoization with React.memo?",
              "options": [
                "To style pages with CSS without writing any JavaScript",
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps",
                "skip unnecessary re-renders with React.memo for pure components"
              ],
              "answer": 3,
              "explanation": "Skip unnecessary re-renders with React.memo for pure components — that is the purpose of Memoization with React.memo."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Memoised row",
                "Loading...",
                "Error: not found"
              ],
              "answer": 1,
              "explanation": "The example renders 'Memoised row' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m18-l1-ex1",
              "title": "Build: Memoization with React.memo",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Memoised row' as its main heading, a paragraph with the text 'Memoization with React.memo', and a footer that says 'Built with React'. Use the Memoization with React.memo pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Memoised row</h1>\n      <p>Memoization with React.memo</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Memoised row', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Memoised row",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Memoization with React.memo. Your component must render the text 'Memoised row' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Memoised row', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m18-l2",
          "slug": "react-m18-l2",
          "title": "Code Splitting and Lazy Loading",
          "objectives": [
            "Explain what Code Splitting and Lazy Loading is and when to use it",
            "Write the Code Splitting and Lazy Loading pattern from the syntax in this lesson",
            "Build a small component that uses Code Splitting and Lazy Loading correctly"
          ],
          "introduction": "Code Splitting and Lazy Loading is a core part of building React apps. Code splitting breaks the bundle into chunks loaded on demand, so the first page loads fast and heavy screens load only when visited. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Code splitting breaks the bundle into chunks loaded on demand, so the first page loads fast and heavy screens load only when visited. React.lazy wraps a dynamic import, and Suspense shows a fallback while the chunk loads. Route-level splitting is the highest-value split in most apps, because users rarely visit every page. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const Admin = React.lazy(() => import('./Admin'));\n<Suspense fallback={<p>Loading...</p>}><Admin /></Suspense>",
          "analogy": "Like a library that fetches a book from the stacks only when someone asks for it.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Loading...</h1>\n      <p>Code Splitting and Lazy Loading</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Code Splitting and Lazy Loading solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Loading...' ends up on screen.",
            "Predict what would change if you replaced 'Loading...' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Code Splitting and Lazy Loading syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Loading...' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Forgetting the key prop when rendering a list, causing stale UI after updates."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Loading...' for the Code Splitting and Lazy Loading lesson, but it does not work because of a lowercase component name. Find and fix the bug.",
            "buggyCode": "function greeting() {\n  return <h1>Loading...</h1>;\n}\n\nexport default function App() {\n  return <greeting />;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Loading...</h1>\n      <p>Code Splitting and Lazy Loading</p>\n    </div>\n  );\n}",
            "explanation": "Component names must start with a capital letter, or JSX treats them as built-in HTML elements. The component name starts with a lowercase letter, so React treats it as a plain HTML tag instead of a component."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Code Splitting and Lazy Loading.",
          "summary": "Code splitting breaks the bundle into chunks loaded on demand, so the first page loads fast and heavy screens load only when visited. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Code Splitting and Lazy Loading in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Code Splitting and Lazy Loading?",
              "options": [
                "split bundles with React.lazy and Suspense so pages load on demand",
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps",
                "To run code on the server instead of in the browser"
              ],
              "answer": 0,
              "explanation": "Split bundles with React.lazy and Suspense so pages load on demand — that is the purpose of Code Splitting and Lazy Loading."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Loading...",
                "Error: not found"
              ],
              "answer": 2,
              "explanation": "The example renders 'Loading...' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m18-l2-ex1",
              "title": "Build: Code Splitting and Lazy Loading",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Loading...' as its main heading, a paragraph with the text 'Code Splitting and Lazy Loading', and a footer that says 'Built with React'. Use the Code Splitting and Lazy Loading pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Loading...</h1>\n      <p>Code Splitting and Lazy Loading</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Loading...', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Loading...",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Code Splitting and Lazy Loading. Your component must render the text 'Loading...' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Loading...', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m19",
      "title": "Architecture",
      "description": "Architecture: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 19,
      "lessons": [
        {
          "id": "react-m19-l1",
          "slug": "react-m19-l1",
          "title": "Component Composition Patterns",
          "objectives": [
            "Explain what Component Composition Patterns is and when to use it",
            "Write the Component Composition Patterns pattern from the syntax in this lesson",
            "Build a small component that uses Component Composition Patterns correctly"
          ],
          "introduction": "Component Composition Patterns is a core part of building React apps. Composition patterns such as compound components, render props and the children prop let you build flexible components without a tangle of boolean props. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Composition patterns such as compound components, render props and the children prop let you build flexible components without a tangle of boolean props. A compound component shares state through context while each part stays a normal element, so users of the component arrange its pieces freely. Prefer composition over configuration: many small pieces beat one giant prop list. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "<Tabs><Tabs.List><Tabs.Tab>One</Tabs.Tab></Tabs.List><Tabs.Panel>Content</Tabs.Panel></Tabs>",
          "analogy": "Like a model railway set: the track pieces are standard, and you lay them out however you like.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Tabs ready</h1>\n      <p>Component Composition Patterns</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Component Composition Patterns solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Tabs ready' ends up on screen.",
            "Predict what would change if you replaced 'Tabs ready' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Component Composition Patterns syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Tabs ready' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Reading state immediately after setting it and expecting the new value."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Tabs ready' for the Component Composition Patterns lesson, but it does not work because of directly mutating state. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const [count, setCount] = useState(0);\n  const add = () => { count = count + 1; };\n  return <button onClick={add}>Count: {count}</button>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Tabs ready</h1>\n      <p>Component Composition Patterns</p>\n    </div>\n  );\n}",
            "explanation": "Assigning to the state variable does not notify React; only the setter triggers a re-render. State is changed by assigning to it directly instead of calling the setter, so React never re-renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Component Composition Patterns.",
          "summary": "Composition patterns such as compound components, render props and the children prop let you build flexible components without a tangle of boolean props. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Component Composition Patterns in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Component Composition Patterns?",
              "options": [
                "build flexible components with composition instead of giant prop lists",
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps",
                "To run code on the server instead of in the browser"
              ],
              "answer": 0,
              "explanation": "Build flexible components with composition instead of giant prop lists — that is the purpose of Component Composition Patterns."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Error: not found",
                "Tabs ready"
              ],
              "answer": 3,
              "explanation": "The example renders 'Tabs ready' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m19-l1-ex1",
              "title": "Build: Component Composition Patterns",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Tabs ready' as its main heading, a paragraph with the text 'Component Composition Patterns', and a footer that says 'Built with React'. Use the Component Composition Patterns pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Tabs ready</h1>\n      <p>Component Composition Patterns</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Tabs ready', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Tabs ready",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Component Composition Patterns. Your component must render the text 'Tabs ready' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Tabs ready', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m19-l2",
          "slug": "react-m19-l2",
          "title": "Custom Hooks and Separation of Concerns",
          "objectives": [
            "Explain what Custom Hooks and Separation of Concerns is and when to use it",
            "Write the Custom Hooks and Separation of Concerns pattern from the syntax in this lesson",
            "Build a small component that uses Custom Hooks and Separation of Concerns correctly"
          ],
          "introduction": "Custom Hooks and Separation of Concerns is a core part of building React apps. A custom hook extracts reusable stateful logic, such as fetching or form handling, into a function whose name starts with use. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A custom hook extracts reusable stateful logic, such as fetching or form handling, into a function whose name starts with use. The component keeps rendering, the hook keeps the logic, and both become easier to test. If two components share behaviour but not markup, a custom hook is the right extraction; if they share markup, extract a component. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "function useToggle(initial = false) {\n  const [on, setOn] = useState(initial);\n  return [on, () => setOn(o => !o)] as const;\n}",
          "analogy": "Like a toolbox: each tool does one job well, and you pick the tool instead of rebuilding it each time.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Custom hook ready</h1>\n      <p>Custom Hooks and Separation of Concerns</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Custom Hooks and Separation of Concerns solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Custom hook ready' ends up on screen.",
            "Predict what would change if you replaced 'Custom hook ready' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Custom Hooks and Separation of Concerns syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Custom hook ready' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Passing a new inline function as a prop on every render, breaking memoization."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Custom hook ready' for the Custom Hooks and Separation of Concerns lesson, but it does not work because of a missing key in a list. Find and fix the bug.",
            "buggyCode": "const items = ['A', 'B', 'C'];\nexport default function App() {\n  return <ul>{items.map(i => <li>{i}</li>)}</ul>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Custom hook ready</h1>\n      <p>Custom Hooks and Separation of Concerns</p>\n    </div>\n  );\n}",
            "explanation": "Every element produced by map needs a stable key so React can match it across renders. List items are rendered without a key, so React cannot track them correctly when the list changes."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Custom Hooks and Separation of Concerns.",
          "summary": "A custom hook extracts reusable stateful logic, such as fetching or form handling, into a function whose name starts with use. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Custom Hooks and Separation of Concerns in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Custom Hooks and Separation of Concerns?",
              "options": [
                "To compile TypeScript directly into native mobile apps",
                "extract reusable logic into custom hooks",
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically"
              ],
              "answer": 1,
              "explanation": "Extract reusable logic into custom hooks — that is the purpose of Custom Hooks and Separation of Concerns."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Custom hook ready",
                "Hello, World!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 0,
              "explanation": "The example renders 'Custom hook ready' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m19-l2-ex1",
              "title": "Build: Custom Hooks and Separation of Concerns",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Custom hook ready' as its main heading, a paragraph with the text 'Custom Hooks and Separation of Concerns', and a footer that says 'Built with React'. Use the Custom Hooks and Separation of Concerns pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Custom hook ready</h1>\n      <p>Custom Hooks and Separation of Concerns</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Custom hook ready', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Custom hook ready",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Custom Hooks and Separation of Concerns. Your component must render the text 'Custom hook ready' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Custom hook ready', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m20",
      "title": "Testing",
      "description": "Testing: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 20,
      "lessons": [
        {
          "id": "react-m20-l1",
          "slug": "react-m20-l1",
          "title": "Testing Components with React Testing Library",
          "objectives": [
            "Explain what Testing Components with React Testing Library is and when to use it",
            "Write the Testing Components with React Testing Library pattern from the syntax in this lesson",
            "Build a small component that uses Testing Components with React Testing Library correctly"
          ],
          "introduction": "Testing Components with React Testing Library is a core part of building React apps. React Testing Library renders a component in a test, lets you find elements the way a user would, by text or label, and asserts on what is visible. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "React Testing Library renders a component in a test, lets you find elements the way a user would, by text or label, and asserts on what is visible. Tests should check behaviour, not implementation: click the button and expect the new text, rather than asserting on internal state. User-centred tests survive refactors that implementation tests would break on. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "import { render, screen, fireEvent } from '@testing-library/react';\nrender(<App />);\nfireEvent.click(screen.getByText('Add'));\nexpect(screen.getByText('Count: 1')).toBeInTheDocument();",
          "analogy": "Like a mystery shopper: they judge the shop by what a customer sees, not by the stockroom layout.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Count: 1</h1>\n      <p>Testing Components with React Testing Library</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Testing Components with React Testing Library solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Count: 1' ends up on screen.",
            "Predict what would change if you replaced 'Count: 1' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Testing Components with React Testing Library syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Count: 1' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Putting side effects directly in the render body instead of in useEffect."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Count: 1' for the Testing Components with React Testing Library lesson, but it does not work because of a hook called inside a condition. Find and fix the bug.",
            "buggyCode": "export default function App({ show }: { show: boolean }) {\n  if (show) {\n    const [n, setN] = useState(0);\n  }\n  return <h1>Count: 1</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Count: 1</h1>\n      <p>Testing Components with React Testing Library</p>\n    </div>\n  );\n}",
            "explanation": "Hooks must be called unconditionally at the top level so their order is the same on every render. A hook is called inside an if statement, breaking the rules of hooks because call order changes between renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Testing Components with React Testing Library.",
          "summary": "React Testing Library renders a component in a test, lets you find elements the way a user would, by text or label, and asserts on what is visible. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Testing Components with React Testing Library in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Testing Components with React Testing Library?",
              "options": [
                "To compile TypeScript directly into native mobile apps",
                "test components by user-visible behaviour with React Testing Library",
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically"
              ],
              "answer": 1,
              "explanation": "Test components by user-visible behaviour with React Testing Library — that is the purpose of Testing Components with React Testing Library."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Count: 1",
                "Loading...",
                "Error: not found"
              ],
              "answer": 1,
              "explanation": "The example renders 'Count: 1' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m20-l1-ex1",
              "title": "Build: Testing Components with React Testing Library",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Count: 1' as its main heading, a paragraph with the text 'Testing Components with React Testing Library', and a footer that says 'Built with React'. Use the Testing Components with React Testing Library pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Count: 1</h1>\n      <p>Testing Components with React Testing Library</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Count: 1', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Count: 1",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Testing Components with React Testing Library. Your component must render the text 'Count: 1' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Count: 1', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m20-l2",
          "slug": "react-m20-l2",
          "title": "Testing Hooks and Async Behaviour",
          "objectives": [
            "Explain what Testing Hooks and Async Behaviour is and when to use it",
            "Write the Testing Hooks and Async Behaviour pattern from the syntax in this lesson",
            "Build a small component that uses Testing Hooks and Async Behaviour correctly"
          ],
          "introduction": "Testing Hooks and Async Behaviour is a core part of building React apps. Hooks are tested through a small test component or renderHook, and async updates need waitFor or findBy queries so the test waits for the effect to finish. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Hooks are tested through a small test component or renderHook, and async updates need waitFor or findBy queries so the test waits for the effect to finish. Mock fetch with a fake that returns known data, and assert the loading state first, then the loaded data. Flaky async tests usually come from asserting too early instead of waiting. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const { result } = renderHook(() => useCounter());\nact(() => { result.current.increment(); });\nexpect(result.current.count).toBe(1);",
          "analogy": "Like waiting for bread to rise: you check when it is ready, not the second you put it in the oven.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Hook tested</h1>\n      <p>Testing Hooks and Async Behaviour</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Testing Hooks and Async Behaviour solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Hook tested' ends up on screen.",
            "Predict what would change if you replaced 'Hook tested' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Testing Hooks and Async Behaviour syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Hook tested' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Returning two root elements from a component without wrapping them in a fragment."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Hook tested' for the Testing Hooks and Async Behaviour lesson, but it does not work because of a missing return. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const text = 'Hook tested';\n  <h1>{text}</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Hook tested</h1>\n      <p>Testing Hooks and Async Behaviour</p>\n    </div>\n  );\n}",
            "explanation": "A function component must return its JSX; an expression statement on its own is discarded. The component body computes JSX but never returns it, so React renders nothing."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Testing Hooks and Async Behaviour.",
          "summary": "Hooks are tested through a small test component or renderHook, and async updates need waitFor or findBy queries so the test waits for the effect to finish. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Testing Hooks and Async Behaviour in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Testing Hooks and Async Behaviour?",
              "options": [
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically",
                "test hooks and async effects with renderHook and waitFor",
                "To replace JavaScript with a new programming language"
              ],
              "answer": 2,
              "explanation": "Test hooks and async effects with renderHook and waitFor — that is the purpose of Testing Hooks and Async Behaviour."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Hook tested",
                "Error: not found"
              ],
              "answer": 2,
              "explanation": "The example renders 'Hook tested' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m20-l2-ex1",
              "title": "Build: Testing Hooks and Async Behaviour",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Hook tested' as its main heading, a paragraph with the text 'Testing Hooks and Async Behaviour', and a footer that says 'Built with React'. Use the Testing Hooks and Async Behaviour pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Hook tested</h1>\n      <p>Testing Hooks and Async Behaviour</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Hook tested', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Hook tested",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Testing Hooks and Async Behaviour. Your component must render the text 'Hook tested' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Hook tested', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m21",
      "title": "Security",
      "description": "Security: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 21,
      "lessons": [
        {
          "id": "react-m21-l1",
          "slug": "react-m21-l1",
          "title": "XSS and Safe Rendering",
          "objectives": [
            "Explain what XSS and Safe Rendering is and when to use it",
            "Write the XSS and Safe Rendering pattern from the syntax in this lesson",
            "Build a small component that uses XSS and Safe Rendering correctly"
          ],
          "introduction": "XSS and Safe Rendering is a core part of building React apps. React escapes text by default, so rendering user input as {text} is safe, but dangerouslySetInnerHTML bypasses that protection and can inject scripts. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "React escapes text by default, so rendering user input as {text} is safe, but dangerouslySetInnerHTML bypasses that protection and can inject scripts. Never put untrusted HTML through it, and never build HTML strings from user input. Sanitize any rich text on the server, validate URLs before rendering links, and keep dependencies updated. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "// Safe: React escapes this\n<p>{userComment}</p>\n// Dangerous: never do this with user input\n<div dangerouslySetInnerHTML={{ __html: userComment }} />",
          "analogy": "Like a bank teller who counts the money in front of you instead of trusting the bag's label.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Safe rendering</h1>\n      <p>XSS and Safe Rendering</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem XSS and Safe Rendering solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Safe rendering' ends up on screen.",
            "Predict what would change if you replaced 'Safe rendering' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the XSS and Safe Rendering syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Safe rendering' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Using a lowercase name for a component, so React treats it as a plain HTML tag."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Safe rendering' for the XSS and Safe Rendering lesson, but it does not work because of a missing closing tag. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  return (\n    <div>\n      <h1>Safe rendering\n    </div>\n  );\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Safe rendering</h1>\n      <p>XSS and Safe Rendering</p>\n    </div>\n  );\n}",
            "explanation": "The <h1> element is never closed, so the JSX parser cannot tell where it ends. The component is missing a closing tag, so JSX cannot be parsed and the build fails."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to XSS and Safe Rendering.",
          "summary": "React escapes text by default, so rendering user input as {text} is safe, but dangerouslySetInnerHTML bypasses that protection and can inject scripts. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use XSS and Safe Rendering in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of XSS and Safe Rendering?",
              "options": [
                "To run code on the server instead of in the browser",
                "To delete unused files from the project automatically",
                "avoid XSS by letting React escape text and never injecting raw HTML",
                "To replace JavaScript with a new programming language"
              ],
              "answer": 2,
              "explanation": "Avoid XSS by letting React escape text and never injecting raw HTML — that is the purpose of XSS and Safe Rendering."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Error: not found",
                "Safe rendering"
              ],
              "answer": 3,
              "explanation": "The example renders 'Safe rendering' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m21-l1-ex1",
              "title": "Build: XSS and Safe Rendering",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Safe rendering' as its main heading, a paragraph with the text 'XSS and Safe Rendering', and a footer that says 'Built with React'. Use the XSS and Safe Rendering pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Safe rendering</h1>\n      <p>XSS and Safe Rendering</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Safe rendering', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Safe rendering",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for XSS and Safe Rendering. Your component must render the text 'Safe rendering' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Safe rendering', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m21-l2",
          "slug": "react-m21-l2",
          "title": "Auth Tokens and Protected Routes",
          "objectives": [
            "Explain what Auth Tokens and Protected Routes is and when to use it",
            "Write the Auth Tokens and Protected Routes pattern from the syntax in this lesson",
            "Build a small component that uses Auth Tokens and Protected Routes correctly"
          ],
          "introduction": "Auth Tokens and Protected Routes is a core part of building React apps. Authentication state usually lives in a token stored after login, sent with API requests and checked by the server on every call. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Authentication state usually lives in a token stored after login, sent with API requests and checked by the server on every call. Protected routes render their page only when a valid session exists, redirecting to login otherwise. Store tokens in httpOnly cookies where possible, never in localStorage for sensitive apps, and always verify on the server. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "function Protected({ children }: { children: React.ReactNode }) {\n  return isLoggedIn ? <>{children}</> : <Navigate to=\"/login\" />;\n}",
          "analogy": "Like a keycard door: the card opens it, but the guard inside still checks your name.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Protected area</h1>\n      <p>Auth Tokens and Protected Routes</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Auth Tokens and Protected Routes solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Protected area' ends up on screen.",
            "Predict what would change if you replaced 'Protected area' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Auth Tokens and Protected Routes syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Protected area' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Forgetting the key prop when rendering a list, causing stale UI after updates."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Protected area' for the Auth Tokens and Protected Routes lesson, but it does not work because of a lowercase component name. Find and fix the bug.",
            "buggyCode": "function greeting() {\n  return <h1>Protected area</h1>;\n}\n\nexport default function App() {\n  return <greeting />;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Protected area</h1>\n      <p>Auth Tokens and Protected Routes</p>\n    </div>\n  );\n}",
            "explanation": "Component names must start with a capital letter, or JSX treats them as built-in HTML elements. The component name starts with a lowercase letter, so React treats it as a plain HTML tag instead of a component."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Auth Tokens and Protected Routes.",
          "summary": "Authentication state usually lives in a token stored after login, sent with API requests and checked by the server on every call. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Auth Tokens and Protected Routes in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Auth Tokens and Protected Routes?",
              "options": [
                "To delete unused files from the project automatically",
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript",
                "guard routes and API calls with authentication checks"
              ],
              "answer": 3,
              "explanation": "Guard routes and API calls with authentication checks — that is the purpose of Auth Tokens and Protected Routes."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Protected area",
                "Hello, World!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 0,
              "explanation": "The example renders 'Protected area' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m21-l2-ex1",
              "title": "Build: Auth Tokens and Protected Routes",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Protected area' as its main heading, a paragraph with the text 'Auth Tokens and Protected Routes', and a footer that says 'Built with React'. Use the Auth Tokens and Protected Routes pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Protected area</h1>\n      <p>Auth Tokens and Protected Routes</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Protected area', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Protected area",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Auth Tokens and Protected Routes. Your component must render the text 'Protected area' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Protected area', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m22",
      "title": "Production",
      "description": "Production: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 22,
      "lessons": [
        {
          "id": "react-m22-l1",
          "slug": "react-m22-l1",
          "title": "Builds and Environment Variables",
          "objectives": [
            "Explain what Builds and Environment Variables is and when to use it",
            "Write the Builds and Environment Variables pattern from the syntax in this lesson",
            "Build a small component that uses Builds and Environment Variables correctly"
          ],
          "introduction": "Builds and Environment Variables is a core part of building React apps. A production build minifies and bundles your app, and environment variables configure it per deployment without code changes. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A production build minifies and bundles your app, and environment variables configure it per deployment without code changes. Variables prefixed for the bundler are embedded at build time, so secrets must never go in them: anything in the bundle is visible to the browser. Build once, deploy the same artefact to each environment, and keep secrets on the server. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const apiUrl = import.meta.env.VITE_API_URL;\n// Build: npm run build\n// Preview: npm run preview",
          "analogy": "Like packing a suitcase for a trip: the same bag, with a different destination label each time.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Production build</h1>\n      <p>Builds and Environment Variables</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Builds and Environment Variables solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Production build' ends up on screen.",
            "Predict what would change if you replaced 'Production build' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Builds and Environment Variables syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Production build' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Reading state immediately after setting it and expecting the new value."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Production build' for the Builds and Environment Variables lesson, but it does not work because of directly mutating state. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const [count, setCount] = useState(0);\n  const add = () => { count = count + 1; };\n  return <button onClick={add}>Count: {count}</button>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Production build</h1>\n      <p>Builds and Environment Variables</p>\n    </div>\n  );\n}",
            "explanation": "Assigning to the state variable does not notify React; only the setter triggers a re-render. State is changed by assigning to it directly instead of calling the setter, so React never re-renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Builds and Environment Variables.",
          "summary": "A production build minifies and bundles your app, and environment variables configure it per deployment without code changes. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Builds and Environment Variables in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Builds and Environment Variables?",
              "options": [
                "To delete unused files from the project automatically",
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript",
                "configure production builds with environment variables, never secrets"
              ],
              "answer": 3,
              "explanation": "Configure production builds with environment variables, never secrets — that is the purpose of Builds and Environment Variables."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Production build",
                "Loading...",
                "Error: not found"
              ],
              "answer": 1,
              "explanation": "The example renders 'Production build' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m22-l1-ex1",
              "title": "Build: Builds and Environment Variables",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Production build' as its main heading, a paragraph with the text 'Builds and Environment Variables', and a footer that says 'Built with React'. Use the Builds and Environment Variables pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Production build</h1>\n      <p>Builds and Environment Variables</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Production build', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Production build",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Builds and Environment Variables. Your component must render the text 'Production build' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Production build', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m22-l2",
          "slug": "react-m22-l2",
          "title": "Deployment and Monitoring Basics",
          "objectives": [
            "Explain what Deployment and Monitoring Basics is and when to use it",
            "Write the Deployment and Monitoring Basics pattern from the syntax in this lesson",
            "Build a small component that uses Deployment and Monitoring Basics correctly"
          ],
          "introduction": "Deployment and Monitoring Basics is a core part of building React apps. Deploying means serving the built static files, usually behind a CDN, with the API on its own origin. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Deploying means serving the built static files, usually behind a CDN, with the API on its own origin. Add error monitoring so crashes reach you instead of silently failing for users, and log the app version with each error so you know which release broke. A deploy that nobody watches is a deploy you will hear about from users first. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "npm run build\n# Upload dist/ to hosting, then check error monitoring for the new version.",
          "analogy": "Like a smoke alarm: it does nothing most days, but it must work the one day it matters.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Deployed!</h1>\n      <p>Deployment and Monitoring Basics</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Deployment and Monitoring Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Deployed!' ends up on screen.",
            "Predict what would change if you replaced 'Deployed!' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Deployment and Monitoring Basics syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Deployed!' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Passing a new inline function as a prop on every render, breaking memoization."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Deployed!' for the Deployment and Monitoring Basics lesson, but it does not work because of a missing key in a list. Find and fix the bug.",
            "buggyCode": "const items = ['A', 'B', 'C'];\nexport default function App() {\n  return <ul>{items.map(i => <li>{i}</li>)}</ul>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Deployed!</h1>\n      <p>Deployment and Monitoring Basics</p>\n    </div>\n  );\n}",
            "explanation": "Every element produced by map needs a stable key so React can match it across renders. List items are rendered without a key, so React cannot track them correctly when the list changes."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Deployment and Monitoring Basics.",
          "summary": "Deploying means serving the built static files, usually behind a CDN, with the API on its own origin. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Deployment and Monitoring Basics in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Deployment and Monitoring Basics?",
              "options": [
                "deploy the production build and monitor errors in production",
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript",
                "To store data permanently in a database on the server"
              ],
              "answer": 0,
              "explanation": "Deploy the production build and monitor errors in production — that is the purpose of Deployment and Monitoring Basics."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Deployed!",
                "Error: not found"
              ],
              "answer": 2,
              "explanation": "The example renders 'Deployed!' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m22-l2-ex1",
              "title": "Build: Deployment and Monitoring Basics",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Deployed!' as its main heading, a paragraph with the text 'Deployment and Monitoring Basics', and a footer that says 'Built with React'. Use the Deployment and Monitoring Basics pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Deployed!</h1>\n      <p>Deployment and Monitoring Basics</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Deployed!', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Deployed!",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Deployment and Monitoring Basics. Your component must render the text 'Deployed!' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Deployed!', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "react-m23",
      "title": "Advanced Projects",
      "description": "Advanced Projects: two lessons that build real React skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 23,
      "lessons": [
        {
          "id": "react-m23-l1",
          "slug": "react-m23-l1",
          "title": "Project: Real-Time Chat UI",
          "objectives": [
            "Explain what Project: Real-Time Chat UI is and when to use it",
            "Write the Project: Real-Time Chat UI pattern from the syntax in this lesson",
            "Build a small component that uses Project: Real-Time Chat UI correctly"
          ],
          "introduction": "Project: Real-Time Chat UI is a core part of building React apps. A chat UI combines a message list, a controlled input, optimistic updates that show your message immediately, and a live connection that appends incoming messages. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A chat UI combines a message list, a controlled input, optimistic updates that show your message immediately, and a live connection that appends incoming messages. State holds the messages, the effect opens the connection, and cleanup closes it. Optimistic updates make the interface feel instant even when the network is slow. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const [messages, setMessages] = useState<string[]>([]);\nconst send = (t: string) => setMessages(m => [...m, t]);",
          "analogy": "Like a walkie-talkie: press, speak, and your words appear at the other end without delay.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Chat ready</h1>\n      <p>Project: Real-Time Chat UI</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Project: Real-Time Chat UI solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Chat ready' ends up on screen.",
            "Predict what would change if you replaced 'Chat ready' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: Real-Time Chat UI syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Chat ready' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Putting side effects directly in the render body instead of in useEffect."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Chat ready' for the Project: Real-Time Chat UI lesson, but it does not work because of a hook called inside a condition. Find and fix the bug.",
            "buggyCode": "export default function App({ show }: { show: boolean }) {\n  if (show) {\n    const [n, setN] = useState(0);\n  }\n  return <h1>Chat ready</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Chat ready</h1>\n      <p>Project: Real-Time Chat UI</p>\n    </div>\n  );\n}",
            "explanation": "Hooks must be called unconditionally at the top level so their order is the same on every render. A hook is called inside an if statement, breaking the rules of hooks because call order changes between renders."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Project: Real-Time Chat UI.",
          "summary": "A chat UI combines a message list, a controlled input, optimistic updates that show your message immediately, and a live connection that appends incoming messages. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: Real-Time Chat UI in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: Real-Time Chat UI?",
              "options": [
                "build a chat UI with live messages and optimistic updates",
                "To replace JavaScript with a new programming language",
                "To style pages with CSS without writing any JavaScript",
                "To store data permanently in a database on the server"
              ],
              "answer": 0,
              "explanation": "Build a chat UI with live messages and optimistic updates — that is the purpose of Project: Real-Time Chat UI."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Hello, World!",
                "Loading...",
                "Error: not found",
                "Chat ready"
              ],
              "answer": 3,
              "explanation": "The example renders 'Chat ready' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m23-l1-ex1",
              "title": "Build: Project: Real-Time Chat UI",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Chat ready' as its main heading, a paragraph with the text 'Project: Real-Time Chat UI', and a footer that says 'Built with React'. Use the Project: Real-Time Chat UI pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Chat ready</h1>\n      <p>Project: Real-Time Chat UI</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Chat ready', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Chat ready",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Project: Real-Time Chat UI. Your component must render the text 'Chat ready' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Chat ready', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        },
        {
          "id": "react-m23-l2",
          "slug": "react-m23-l2",
          "title": "Project: Dashboard with Charts and Filters",
          "objectives": [
            "Explain what Project: Dashboard with Charts and Filters is and when to use it",
            "Write the Project: Dashboard with Charts and Filters pattern from the syntax in this lesson",
            "Build a small component that uses Project: Dashboard with Charts and Filters correctly"
          ],
          "introduction": "Project: Dashboard with Charts and Filters is a core part of building React apps. A dashboard filters a dataset in state, derives chart data with useMemo, and renders the filtered rows and summaries. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A dashboard filters a dataset in state, derives chart data with useMemo, and renders the filtered rows and summaries. Filters, search and sorting all flow from one source of truth, so every view agrees. This project pulls together lists, state, memoization and composition into the kind of screen real products are built around. When you use this in a real app, you start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete component, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the data through the component step by step.",
          "syntax": "const filtered = useMemo(() => rows.filter(r => r.name.includes(query)), [rows, query]);",
          "analogy": "Like a control room: one wall of dials, every dial showing the same live picture.",
          "exampleCode": "export default function App() {\n  return (\n    <div>\n      <h1>Dashboard ready</h1>\n      <p>Project: Dashboard with Charts and Filters</p>\n    </div>\n  );\n}",
          "exampleLanguage": "react",
          "walkthrough": [
            "Read the concept above and note what problem Project: Dashboard with Charts and Filters solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example component line by line and trace how 'Dashboard ready' ends up on screen.",
            "Predict what would change if you replaced 'Dashboard ready' with your own text.",
            "Run the example, compare the rendered output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: Dashboard with Charts and Filters syntax, which makes the component fail to compile or render nothing.",
            "Hard-coding 'Dashboard ready' everywhere instead of passing data through props or state, so the component cannot be reused.",
            "Returning two root elements from a component without wrapping them in a fragment."
          ],
          "debuggingExercise": {
            "prompt": "This component was meant to render 'Dashboard ready' for the Project: Dashboard with Charts and Filters lesson, but it does not work because of a missing return. Find and fix the bug.",
            "buggyCode": "export default function App() {\n  const text = 'Dashboard ready';\n  <h1>{text}</h1>;\n}",
            "fixedCode": "export default function App() {\n  return (\n    <div>\n      <h1>Dashboard ready</h1>\n      <p>Project: Dashboard with Charts and Filters</p>\n    </div>\n  );\n}",
            "explanation": "A function component must return its JSX; an expression statement on its own is discarded. The component body computes JSX but never returns it, so React renders nothing."
          },
          "miniChallenge": "Extend the example component so it also renders a second heading with your own message, and a list of three items related to Project: Dashboard with Charts and Filters.",
          "summary": "A dashboard filters a dataset in state, derives chart data with useMemo, and renders the filtered rows and summaries. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: Dashboard with Charts and Filters in your own components.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: Dashboard with Charts and Filters?",
              "options": [
                "To style pages with CSS without writing any JavaScript",
                "build a filterable dashboard with derived data and charts",
                "To store data permanently in a database on the server",
                "To compile TypeScript directly into native mobile apps"
              ],
              "answer": 1,
              "explanation": "Build a filterable dashboard with derived data and charts — that is the purpose of Project: Dashboard with Charts and Filters."
            },
            {
              "question": "What text does the example component in this lesson render as its main heading?",
              "options": [
                "Dashboard ready",
                "Hello, World!",
                "Loading...",
                "Error: not found"
              ],
              "answer": 0,
              "explanation": "The example renders 'Dashboard ready' as its main heading."
            }
          ],
          "exercises": [
            {
              "id": "react-m23-l2-ex1",
              "title": "Build: Project: Dashboard with Charts and Filters",
              "type": "build-program",
              "instructions": "Write a React component called App that renders 'Dashboard ready' as its main heading, a paragraph with the text 'Project: Dashboard with Charts and Filters', and a footer that says 'Built with React'. Use the Project: Dashboard with Charts and Filters pattern from this lesson.",
              "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
              "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Dashboard ready</h1>\n      <p>Project: Dashboard with Charts and Filters</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
              "solutionExplanation": "The solution returns a div with an h1 containing 'Dashboard ready', a paragraph with the lesson title, and a footer. Every tag is closed and App is the default export, so React renders it.",
              "complexity": "O(1) render",
              "tests": [
                {
                  "name": "renders main heading",
                  "expectedContains": "Dashboard ready",
                  "hidden": false
                },
                {
                  "name": "renders React footer",
                  "expectedContains": "Built with React",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the instructions for Project: Dashboard with Charts and Filters. Your component must render the text 'Dashboard ready' on the page, plus a short note that it was built with React."
                },
                {
                  "level": 2,
                  "title": "Plan the component",
                  "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "Return a div containing an h1 with 'Dashboard ready', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const REACT_ASSESSMENT: MasteryAssessment = {
  "courseSlug": "react",
  "passPercent": 80,
  "questions": [
    {
      "id": "react-assess-q1",
      "kind": "conceptual",
      "topic": "What Is React?",
      "question": "Which statement best describes What Is React??",
      "options": [
        "build user interfaces from reusable components that update when state changes",
        "To replace JavaScript with a new programming language",
        "To style pages with CSS without writing any JavaScript",
        "To store data permanently in a database on the server"
      ],
      "answer": 0,
      "explanation": "Build user interfaces from reusable components that update when state changes."
    },
    {
      "id": "react-assess-q2",
      "kind": "conceptual",
      "topic": "Your First React App",
      "question": "Which statement best describes Your First React App?",
      "options": [
        "To style pages with CSS without writing any JavaScript",
        "render a root component into the page and reload it live as you edit",
        "To store data permanently in a database on the server",
        "To compile TypeScript directly into native mobile apps"
      ],
      "answer": 1,
      "explanation": "Render a root component into the page and reload it live as you edit."
    },
    {
      "id": "react-assess-q3",
      "kind": "conceptual",
      "topic": "Function Components",
      "question": "Which statement best describes Function Components?",
      "options": [
        "To store data permanently in a database on the server",
        "To compile TypeScript directly into native mobile apps",
        "describe part of the UI as a JavaScript function that returns JSX",
        "To run code on the server instead of in the browser"
      ],
      "answer": 2,
      "explanation": "Describe part of the UI as a JavaScript function that returns JSX."
    },
    {
      "id": "react-assess-q4",
      "kind": "conceptual",
      "topic": "Composing Components",
      "question": "Which statement best describes Composing Components?",
      "options": [
        "To compile TypeScript directly into native mobile apps",
        "To run code on the server instead of in the browser",
        "To delete unused files from the project automatically",
        "build large interfaces by nesting small components inside larger ones"
      ],
      "answer": 3,
      "explanation": "Build large interfaces by nesting small components inside larger ones."
    },
    {
      "id": "react-assess-q5",
      "kind": "conceptual",
      "topic": "JSX Basics",
      "question": "Which statement best describes JSX Basics?",
      "options": [
        "write HTML-like markup inside JavaScript that compiles to React elements",
        "To run code on the server instead of in the browser",
        "To delete unused files from the project automatically",
        "To replace JavaScript with a new programming language"
      ],
      "answer": 0,
      "explanation": "Write HTML-like markup inside JavaScript that compiles to React elements."
    },
    {
      "id": "react-assess-q6",
      "kind": "conceptual",
      "topic": "JSX Expressions and Attributes",
      "question": "Which statement best describes JSX Expressions and Attributes?",
      "options": [
        "To delete unused files from the project automatically",
        "embed JavaScript expressions in markup with curly braces",
        "To replace JavaScript with a new programming language",
        "To style pages with CSS without writing any JavaScript"
      ],
      "answer": 1,
      "explanation": "Embed JavaScript expressions in markup with curly braces."
    },
    {
      "id": "react-assess-q7",
      "kind": "conceptual",
      "topic": "Introducing useState",
      "question": "Which statement best describes Introducing useState?",
      "options": [
        "To replace JavaScript with a new programming language",
        "To style pages with CSS without writing any JavaScript",
        "remember data between renders with the useState hook",
        "To store data permanently in a database on the server"
      ],
      "answer": 2,
      "explanation": "Remember data between renders with the useState hook."
    },
    {
      "id": "react-assess-q8",
      "kind": "conceptual",
      "topic": "Updating State Correctly",
      "question": "Which statement best describes Updating State Correctly?",
      "options": [
        "To style pages with CSS without writing any JavaScript",
        "To store data permanently in a database on the server",
        "To compile TypeScript directly into native mobile apps",
        "update state from its previous value with a function and copy objects when changing them"
      ],
      "answer": 3,
      "explanation": "Update state from its previous value with a function and copy objects when changing them."
    },
    {
      "id": "react-assess-q9",
      "kind": "conceptual",
      "topic": "Handling Click Events",
      "question": "Which statement best describes Handling Click Events?",
      "options": [
        "respond to user actions with handler functions passed to event props",
        "To store data permanently in a database on the server",
        "To compile TypeScript directly into native mobile apps",
        "To run code on the server instead of in the browser"
      ],
      "answer": 0,
      "explanation": "Respond to user actions with handler functions passed to event props."
    },
    {
      "id": "react-assess-q10",
      "kind": "conceptual",
      "topic": "Synthetic Events and Event Objects",
      "question": "Which statement best describes Synthetic Events and Event Objects?",
      "options": [
        "To compile TypeScript directly into native mobile apps",
        "read event details from React's synthetic event object",
        "To run code on the server instead of in the browser",
        "To delete unused files from the project automatically"
      ],
      "answer": 1,
      "explanation": "Read event details from React's synthetic event object."
    },
    {
      "id": "react-assess-q11",
      "kind": "conceptual",
      "topic": "Passing Props",
      "question": "Which statement best describes Passing Props?",
      "options": [
        "To run code on the server instead of in the browser",
        "To delete unused files from the project automatically",
        "pass data from a parent component down to a child as props",
        "To replace JavaScript with a new programming language"
      ],
      "answer": 2,
      "explanation": "Pass data from a parent component down to a child as props."
    },
    {
      "id": "react-assess-q12",
      "kind": "conceptual",
      "topic": "Default Props and Children",
      "question": "Which statement best describes Default Props and Children?",
      "options": [
        "To delete unused files from the project automatically",
        "To replace JavaScript with a new programming language",
        "To style pages with CSS without writing any JavaScript",
        "give optional props defaults and receive nested JSX through children"
      ],
      "answer": 3,
      "explanation": "Give optional props defaults and receive nested JSX through children."
    },
    {
      "id": "react-assess-q13",
      "kind": "conceptual",
      "topic": "Rendering Lists with map",
      "question": "Which statement best describes Rendering Lists with map?",
      "options": [
        "turn arrays into markup by mapping each item to an element",
        "To replace JavaScript with a new programming language",
        "To style pages with CSS without writing any JavaScript",
        "To store data permanently in a database on the server"
      ],
      "answer": 0,
      "explanation": "Turn arrays into markup by mapping each item to an element."
    },
    {
      "id": "react-assess-q14",
      "kind": "conceptual",
      "topic": "Keys and List Updates",
      "question": "Which statement best describes Keys and List Updates?",
      "options": [
        "To style pages with CSS without writing any JavaScript",
        "give each list element a stable unique key so React can update it correctly",
        "To store data permanently in a database on the server",
        "To compile TypeScript directly into native mobile apps"
      ],
      "answer": 1,
      "explanation": "Give each list element a stable unique key so React can update it correctly."
    },
    {
      "id": "react-assess-q15",
      "kind": "conceptual",
      "topic": "Project: Counter App",
      "question": "Which statement best describes Project: Counter App?",
      "options": [
        "To store data permanently in a database on the server",
        "To compile TypeScript directly into native mobile apps",
        "combine state and events into a complete interactive counter app",
        "To run code on the server instead of in the browser"
      ],
      "answer": 2,
      "explanation": "Combine state and events into a complete interactive counter app."
    },
    {
      "id": "react-assess-q16",
      "kind": "conceptual",
      "topic": "Project: Todo List Basics",
      "question": "Which statement best describes Project: Todo List Basics?",
      "options": [
        "To compile TypeScript directly into native mobile apps",
        "To run code on the server instead of in the browser",
        "To delete unused files from the project automatically",
        "build a todo list that adds, renders and removes items with state"
      ],
      "answer": 3,
      "explanation": "Build a todo list that adds, renders and removes items with state."
    },
    {
      "id": "react-assess-q17",
      "kind": "conceptual",
      "topic": "The Rules of Hooks",
      "question": "Which statement best describes The Rules of Hooks?",
      "options": [
        "call hooks only at the top level of React functions, in the same order every render",
        "To run code on the server instead of in the browser",
        "To delete unused files from the project automatically",
        "To replace JavaScript with a new programming language"
      ],
      "answer": 0,
      "explanation": "Call hooks only at the top level of React functions, in the same order every render."
    },
    {
      "id": "react-assess-q18",
      "kind": "conceptual",
      "topic": "useEffect Basics",
      "question": "Which statement best describes useEffect Basics?",
      "options": [
        "To delete unused files from the project automatically",
        "run side effects after rendering with useEffect and a dependency array",
        "To replace JavaScript with a new programming language",
        "To style pages with CSS without writing any JavaScript"
      ],
      "answer": 1,
      "explanation": "Run side effects after rendering with useEffect and a dependency array."
    },
    {
      "id": "react-assess-q19",
      "kind": "conceptual",
      "topic": "Mounting and Updating",
      "question": "Which statement best describes Mounting and Updating?",
      "options": [
        "To replace JavaScript with a new programming language",
        "To style pages with CSS without writing any JavaScript",
        "understand mount, update and unmount as the phases of a component's life",
        "To store data permanently in a database on the server"
      ],
      "answer": 2,
      "explanation": "Understand mount, update and unmount as the phases of a component's life."
    },
    {
      "id": "react-assess-q20",
      "kind": "conceptual",
      "topic": "Cleanup and Unmounting",
      "question": "Which statement best describes Cleanup and Unmounting?",
      "options": [
        "To style pages with CSS without writing any JavaScript",
        "To store data permanently in a database on the server",
        "To compile TypeScript directly into native mobile apps",
        "return a cleanup function from effects to stop timers and listeners on unmount"
      ],
      "answer": 3,
      "explanation": "Return a cleanup function from effects to stop timers and listeners on unmount."
    },
    {
      "id": "react-assess-q21",
      "kind": "code-reading",
      "topic": "Controlled Inputs",
      "question": "What does this code do?",
      "code": "const [text, setText] = useState('');\n<input value={text} onChange={e => setText(e.target.value)} />",
      "options": [
        "It demonstrates a different React pattern",
        "It demonstrates Controlled Inputs",
        "It is invalid React code that cannot compile",
        "It only works in class components"
      ],
      "answer": 1,
      "explanation": "The snippet is the syntax for Controlled Inputs: keep form inputs controlled by state through value and onChange."
    },
    {
      "id": "react-assess-q22",
      "kind": "code-reading",
      "topic": "Form Validation Basics",
      "question": "What does this code do?",
      "code": "const [error, setError] = useState('');\nconst submit = () => { if (!email.includes('@')) setError('Enter a valid email'); };",
      "options": [
        "It demonstrates a different React pattern",
        "It is invalid React code that cannot compile",
        "It demonstrates Form Validation Basics",
        "It only works in class components"
      ],
      "answer": 2,
      "explanation": "The snippet is the syntax for Form Validation Basics: validate form input and show clear messages before submission."
    },
    {
      "id": "react-assess-q23",
      "kind": "code-reading",
      "topic": "Client-Side Routing Concepts",
      "question": "What does this code do?",
      "code": "import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\n<Routes><Route path=\"/\" element={<Home />} /></Routes>",
      "options": [
        "It demonstrates a different React pattern",
        "It is invalid React code that cannot compile",
        "It only works in class components",
        "It demonstrates Client-Side Routing Concepts"
      ],
      "answer": 3,
      "explanation": "The snippet is the syntax for Client-Side Routing Concepts: map URLs to components with a client-side router."
    },
    {
      "id": "react-assess-q24",
      "kind": "code-reading",
      "topic": "Routes, Links and Params",
      "question": "What does this code do?",
      "code": "<Route path=\"/users/:id\" element={<User />} />\nconst { id } = useParams();",
      "options": [
        "It demonstrates Routes, Links and Params",
        "It demonstrates a different React pattern",
        "It is invalid React code that cannot compile",
        "It only works in class components"
      ],
      "answer": 0,
      "explanation": "The snippet is the syntax for Routes, Links and Params: read route parameters and navigate between routes."
    },
    {
      "id": "react-assess-q25",
      "kind": "code-reading",
      "topic": "Lifting State Up",
      "question": "What does this code do?",
      "code": "function Parent() {\n  const [text, setText] = useState('');\n  return <><Input value={text} onChange={setText} /><Preview value={text} /></>;\n}",
      "options": [
        "It demonstrates a different React pattern",
        "It demonstrates Lifting State Up",
        "It is invalid React code that cannot compile",
        "It only works in class components"
      ],
      "answer": 1,
      "explanation": "The snippet is the syntax for Lifting State Up: share data between components by moving state to their common parent."
    },
    {
      "id": "react-assess-q26",
      "kind": "code-reading",
      "topic": "Context API Basics",
      "question": "What does this code do?",
      "code": "const ThemeContext = createContext('light');\nconst theme = useContext(ThemeContext);",
      "options": [
        "It demonstrates a different React pattern",
        "It is invalid React code that cannot compile",
        "It demonstrates Context API Basics",
        "It only works in class components"
      ],
      "answer": 2,
      "explanation": "The snippet is the syntax for Context API Basics: share values across the tree with Context instead of prop drilling."
    },
    {
      "id": "react-assess-q27",
      "kind": "code-reading",
      "topic": "Fetching Data with useEffect",
      "question": "What does this code do?",
      "code": "useEffect(() => {\n  fetch('/api/users').then(r => r.json()).then(setUsers);\n}, []);",
      "options": [
        "It demonstrates a different React pattern",
        "It is invalid React code that cannot compile",
        "It only works in class components",
        "It demonstrates Fetching Data with useEffect"
      ],
      "answer": 3,
      "explanation": "The snippet is the syntax for Fetching Data with useEffect: fetch data inside useEffect and store the result in state."
    },
    {
      "id": "react-assess-q28",
      "kind": "code-reading",
      "topic": "Loading and Error States",
      "question": "What does this code do?",
      "code": "const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');\nif (status === 'loading') return <p>Loading...</p>;",
      "options": [
        "It demonstrates Loading and Error States",
        "It demonstrates a different React pattern",
        "It is invalid React code that cannot compile",
        "It only works in class components"
      ],
      "answer": 0,
      "explanation": "The snippet is the syntax for Loading and Error States: render loading, success and error states for every fetch."
    },
    {
      "id": "react-assess-q29",
      "kind": "code-reading",
      "topic": "Typing Props and State",
      "question": "What does this code do?",
      "code": "type Props = { name: string; age?: number };\nfunction Card({ name, age }: Props) { return <p>{name}</p>; }\nconst [n, setN] = useState<number>(0);",
      "options": [
        "It demonstrates a different React pattern",
        "It demonstrates Typing Props and State",
        "It is invalid React code that cannot compile",
        "It only works in class components"
      ],
      "answer": 1,
      "explanation": "The snippet is the syntax for Typing Props and State: describe props and state with TypeScript types."
    },
    {
      "id": "react-assess-q30",
      "kind": "code-reading",
      "topic": "Typing Events and Refs",
      "question": "What does this code do?",
      "code": "const inputRef = useRef<HTMLInputElement>(null);\nconst focus = () => inputRef.current?.focus();",
      "options": [
        "It demonstrates a different React pattern",
        "It is invalid React code that cannot compile",
        "It demonstrates Typing Events and Refs",
        "It only works in class components"
      ],
      "answer": 2,
      "explanation": "The snippet is the syntax for Typing Events and Refs: type event handlers and refs so the compiler checks DOM access."
    },
    {
      "id": "react-assess-q31",
      "kind": "debugging",
      "topic": "Project: Weather Dashboard",
      "question": "What is wrong with this component?",
      "code": "export default function App() {\n  return (\n    <div>\n      <h1>Weather: sunny, 21C\n    </div>\n  );\n}",
      "options": [
        "The component imports the wrong library",
        "The component is missing a CSS file",
        "The <h1> element is never closed, so the JSX parser cannot tell where it ends.",
        "The component uses too much memory"
      ],
      "answer": 2,
      "explanation": "The component is missing a closing tag, so JSX cannot be parsed and the build fails."
    },
    {
      "id": "react-assess-q32",
      "kind": "debugging",
      "topic": "Project: Shopping Cart",
      "question": "What is wrong with this component?",
      "code": "function greeting() {\n  return <h1>Cart total: 0</h1>;\n}\n\nexport default function App() {\n  return <greeting />;\n}",
      "options": [
        "The component imports the wrong library",
        "The component is missing a CSS file",
        "The component uses too much memory",
        "Component names must start with a capital letter, or JSX treats them as built-in HTML elements."
      ],
      "answer": 3,
      "explanation": "The component name starts with a lowercase letter, so React treats it as a plain HTML tag instead of a component."
    },
    {
      "id": "react-assess-q33",
      "kind": "debugging",
      "topic": "useReducer",
      "question": "What is wrong with this component?",
      "code": "export default function App() {\n  const [count, setCount] = useState(0);\n  const add = () => { count = count + 1; };\n  return <button onClick={add}>Count: {count}</button>;\n}",
      "options": [
        "Assigning to the state variable does not notify React; only the setter triggers a re-render.",
        "The component imports the wrong library",
        "The component is missing a CSS file",
        "The component uses too much memory"
      ],
      "answer": 0,
      "explanation": "State is changed by assigning to it directly instead of calling the setter, so React never re-renders."
    },
    {
      "id": "react-assess-q34",
      "kind": "debugging",
      "topic": "useMemo and useCallback",
      "question": "What is wrong with this component?",
      "code": "const items = ['A', 'B', 'C'];\nexport default function App() {\n  return <ul>{items.map(i => <li>{i}</li>)}</ul>;\n}",
      "options": [
        "The component imports the wrong library",
        "Every element produced by map needs a stable key so React can match it across renders.",
        "The component is missing a CSS file",
        "The component uses too much memory"
      ],
      "answer": 1,
      "explanation": "List items are rendered without a key, so React cannot track them correctly when the list changes."
    },
    {
      "id": "react-assess-q35",
      "kind": "debugging",
      "topic": "Memoization with React.memo",
      "question": "What is wrong with this component?",
      "code": "export default function App({ show }: { show: boolean }) {\n  if (show) {\n    const [n, setN] = useState(0);\n  }\n  return <h1>Memoised row</h1>;\n}",
      "options": [
        "The component imports the wrong library",
        "The component is missing a CSS file",
        "Hooks must be called unconditionally at the top level so their order is the same on every render.",
        "The component uses too much memory"
      ],
      "answer": 2,
      "explanation": "A hook is called inside an if statement, breaking the rules of hooks because call order changes between renders."
    },
    {
      "id": "react-assess-q36",
      "kind": "debugging",
      "topic": "Code Splitting and Lazy Loading",
      "question": "What is wrong with this component?",
      "code": "export default function App() {\n  const text = 'Loading...';\n  <h1>{text}</h1>;\n}",
      "options": [
        "The component imports the wrong library",
        "The component is missing a CSS file",
        "The component uses too much memory",
        "A function component must return its JSX; an expression statement on its own is discarded."
      ],
      "answer": 3,
      "explanation": "The component body computes JSX but never returns it, so React renders nothing."
    },
    {
      "id": "react-assess-q37",
      "kind": "debugging",
      "topic": "Component Composition Patterns",
      "question": "What is wrong with this component?",
      "code": "export default function App() {\n  return (\n    <div>\n      <h1>Tabs ready\n    </div>\n  );\n}",
      "options": [
        "The <h1> element is never closed, so the JSX parser cannot tell where it ends.",
        "The component imports the wrong library",
        "The component is missing a CSS file",
        "The component uses too much memory"
      ],
      "answer": 0,
      "explanation": "The component is missing a closing tag, so JSX cannot be parsed and the build fails."
    },
    {
      "id": "react-assess-q38",
      "kind": "debugging",
      "topic": "Custom Hooks and Separation of Concerns",
      "question": "What is wrong with this component?",
      "code": "function greeting() {\n  return <h1>Custom hook ready</h1>;\n}\n\nexport default function App() {\n  return <greeting />;\n}",
      "options": [
        "The component imports the wrong library",
        "Component names must start with a capital letter, or JSX treats them as built-in HTML elements.",
        "The component is missing a CSS file",
        "The component uses too much memory"
      ],
      "answer": 1,
      "explanation": "The component name starts with a lowercase letter, so React treats it as a plain HTML tag instead of a component."
    },
    {
      "id": "react-assess-q39",
      "kind": "debugging",
      "topic": "Testing Components with React Testing Library",
      "question": "What is wrong with this component?",
      "code": "export default function App() {\n  const [count, setCount] = useState(0);\n  const add = () => { count = count + 1; };\n  return <button onClick={add}>Count: {count}</button>;\n}",
      "options": [
        "The component imports the wrong library",
        "The component is missing a CSS file",
        "Assigning to the state variable does not notify React; only the setter triggers a re-render.",
        "The component uses too much memory"
      ],
      "answer": 2,
      "explanation": "State is changed by assigning to it directly instead of calling the setter, so React never re-renders."
    },
    {
      "id": "react-assess-q40",
      "kind": "debugging",
      "topic": "Testing Hooks and Async Behaviour",
      "question": "What is wrong with this component?",
      "code": "const items = ['A', 'B', 'C'];\nexport default function App() {\n  return <ul>{items.map(i => <li>{i}</li>)}</ul>;\n}",
      "options": [
        "The component imports the wrong library",
        "The component is missing a CSS file",
        "The component uses too much memory",
        "Every element produced by map needs a stable key so React can match it across renders."
      ],
      "answer": 3,
      "explanation": "List items are rendered without a key, so React cannot track them correctly when the list changes."
    }
  ],
  "programmingExercises": [
    {
      "id": "react-assess-ex1",
      "title": "Counter App",
      "type": "build-program",
      "instructions": "Build a counter component that renders 'Count: 5' as its heading. Also render a paragraph with the component name and a footer saying 'Built with React'.",
      "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
      "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Count: 5</h1>\n      <p>Counter App</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
      "solutionExplanation": "The component renders 'Count: 5' in an h1, the title in a paragraph, and the footer, with all tags closed and App as the default export.",
      "complexity": "O(1) render",
      "tests": [
        {
          "name": "renders heading",
          "expectedContains": "Count: 5",
          "hidden": false
        },
        {
          "name": "renders footer",
          "expectedContains": "Built with React",
          "hidden": true
        }
      ],
      "hints": [
        {
          "level": 1,
          "title": "What is the goal?",
          "content": "Re-read the instructions for Counter App. Your component must render the text 'Count: 5' on the page, plus a short note that it was built with React."
        },
        {
          "level": 2,
          "title": "Plan the component",
          "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "Return a div containing an h1 with 'Count: 5', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
        }
      ]
    },
    {
      "id": "react-assess-ex2",
      "title": "Greeting Card",
      "type": "build-program",
      "instructions": "Build a greeting component that renders 'Welcome, Ada!' as its heading. Also render a paragraph with the component name and a footer saying 'Built with React'.",
      "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
      "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Welcome, Ada!</h1>\n      <p>Greeting Card</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
      "solutionExplanation": "The component renders 'Welcome, Ada!' in an h1, the title in a paragraph, and the footer, with all tags closed and App as the default export.",
      "complexity": "O(1) render",
      "tests": [
        {
          "name": "renders heading",
          "expectedContains": "Welcome, Ada!",
          "hidden": false
        },
        {
          "name": "renders footer",
          "expectedContains": "Built with React",
          "hidden": true
        }
      ],
      "hints": [
        {
          "level": 1,
          "title": "What is the goal?",
          "content": "Re-read the instructions for Greeting Card. Your component must render the text 'Welcome, Ada!' on the page, plus a short note that it was built with React."
        },
        {
          "level": 2,
          "title": "Plan the component",
          "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "Return a div containing an h1 with 'Welcome, Ada!', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
        }
      ]
    },
    {
      "id": "react-assess-ex3",
      "title": "Todo Header",
      "type": "build-program",
      "instructions": "Build a todo header component that renders 'My Todos (3)' as its heading. Also render a paragraph with the component name and a footer saying 'Built with React'.",
      "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
      "solution": "export default function App() {\n  return (\n    <div>\n      <h1>My Todos (3)</h1>\n      <p>Todo Header</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
      "solutionExplanation": "The component renders 'My Todos (3)' in an h1, the title in a paragraph, and the footer, with all tags closed and App as the default export.",
      "complexity": "O(1) render",
      "tests": [
        {
          "name": "renders heading",
          "expectedContains": "My Todos (3)",
          "hidden": false
        },
        {
          "name": "renders footer",
          "expectedContains": "Built with React",
          "hidden": true
        }
      ],
      "hints": [
        {
          "level": 1,
          "title": "What is the goal?",
          "content": "Re-read the instructions for Todo Header. Your component must render the text 'My Todos (3)' on the page, plus a short note that it was built with React."
        },
        {
          "level": 2,
          "title": "Plan the component",
          "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "Return a div containing an h1 with 'My Todos (3)', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
        }
      ]
    },
    {
      "id": "react-assess-ex4",
      "title": "Profile Card",
      "type": "build-program",
      "instructions": "Build a profile component that renders 'Ada Lovelace' as its heading. Also render a paragraph with the component name and a footer saying 'Built with React'.",
      "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
      "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Ada Lovelace</h1>\n      <p>Profile Card</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
      "solutionExplanation": "The component renders 'Ada Lovelace' in an h1, the title in a paragraph, and the footer, with all tags closed and App as the default export.",
      "complexity": "O(1) render",
      "tests": [
        {
          "name": "renders heading",
          "expectedContains": "Ada Lovelace",
          "hidden": false
        },
        {
          "name": "renders footer",
          "expectedContains": "Built with React",
          "hidden": true
        }
      ],
      "hints": [
        {
          "level": 1,
          "title": "What is the goal?",
          "content": "Re-read the instructions for Profile Card. Your component must render the text 'Ada Lovelace' on the page, plus a short note that it was built with React."
        },
        {
          "level": 2,
          "title": "Plan the component",
          "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "Return a div containing an h1 with 'Ada Lovelace', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
        }
      ]
    },
    {
      "id": "react-assess-ex5",
      "title": "Toggle Panel",
      "type": "build-program",
      "instructions": "Build a toggle component that renders 'Panel: open' as its heading. Also render a paragraph with the component name and a footer saying 'Built with React'.",
      "starterCode": "export default function App() {\n  return (\n    <div>\n      <h1>TODO</h1>\n    </div>\n  );\n}",
      "solution": "export default function App() {\n  return (\n    <div>\n      <h1>Panel: open</h1>\n      <p>Toggle Panel</p>\n      <footer>Built with React</footer>\n    </div>\n  );\n}",
      "solutionExplanation": "The component renders 'Panel: open' in an h1, the title in a paragraph, and the footer, with all tags closed and App as the default export.",
      "complexity": "O(1) render",
      "tests": [
        {
          "name": "renders heading",
          "expectedContains": "Panel: open",
          "hidden": false
        },
        {
          "name": "renders footer",
          "expectedContains": "Built with React",
          "hidden": true
        }
      ],
      "hints": [
        {
          "level": 1,
          "title": "What is the goal?",
          "content": "Re-read the instructions for Toggle Panel. Your component must render the text 'Panel: open' on the page, plus a short note that it was built with React."
        },
        {
          "level": 2,
          "title": "Plan the component",
          "content": "Start from the starter code, keep the export default function App, and decide which elements will hold the heading and the note."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "function App() { return <div> <h1>value</h1> <p>lesson title</p> <footer>Built with React</footer> </div>; } Replace the placeholders with the real text."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If nothing renders, check that App is the default export, that every JSX tag is closed, and that the component name starts with a capital letter."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "Return a div containing an h1 with 'Panel: open', a paragraph with the lesson title, and a footer saying 'Built with React'. See the solution code for the exact component."
        }
      ]
    }
  ],
  "capstone": {
    "title": "Task Manager Single-Page App",
    "description": "Build a complete task manager with React and TypeScript: add, complete, filter and delete tasks, with routing between an all-tasks view and a completed-tasks view, data persisted in localStorage, and a clean component structure.",
    "requirements": [
      "Add tasks through a controlled form with validation for empty input",
      "Toggle tasks complete and delete them, updating state immutably",
      "Filter tasks by all, active and completed using client-side routing",
      "Persist tasks in localStorage and restore them on reload",
      "Split the UI into at least five reusable components with typed props",
      "Show loading and empty states, and handle a failed save gracefully"
    ],
    "rubric": [
      "State updates are immutable and the UI always matches state",
      "Components are small, typed, and reused rather than duplicated",
      "Routing, filtering and persistence all work end to end",
      "Forms validate input and show clear error messages",
      "Code is organised, readable, and free of console errors"
    ]
  }
};
