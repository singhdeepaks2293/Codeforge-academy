import { expandTracks } from '../compact.js';

const { courses, assessments } = expandTracks([
  {
    id: "ts-trpc",
    slug: "ts-trpc",
    language: "typescript",
    category: "languages",
    title: "tRPC in TypeScript",
    description: "Advanced TypeScript: build end-to-end type-safe APIs with tRPC, from routers and procedures to client integration and deployment",
    difficulty: "Advanced",
    estimatedHours: 18,
    skills: ["tRPC routers", "Procedures", "Input validation with Zod", "tRPC client", "Context and middleware", "Error handling"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like running a restaurant where every order is checked against the menu before the kitchen starts cooking",
    modules: [
      {
        id: "ts-trpc-m1",
        title: "tRPC in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-trpc-m1-l1",
          slug: "ts-trpc-m1-l1",
          title: "Procedures return typed data",
          concept: "A tRPC procedure is a typed function exposed by the server that the client calls like a local function, with the request and response types shared automatically. In this track you apply it while building type-safe API features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 2 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Procedures return typed data values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Procedures return typed data: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the proceduresReturn function",
            type: "build-function",
            instructions: "Write a function named `proceduresReturn` for Procedures return typed data: it takes two numbers and returns their sum. Log the result of calling it with 2 and 3.",
            starterCode: "function proceduresReturn(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(proceduresReturn(2, 3));",
            solution: "function proceduresReturn(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(proceduresReturn(2, 3));",
            solutionExplanation: "The function returns 2 + 3 = 5, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `proceduresReturn` code models Procedures return typed data with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-trpc-m1-l2",
          slug: "ts-trpc-m1-l2",
          title: "Routers group procedures",
          concept: "A tRPC router groups related procedures under one object so the API surface stays organised and composable. Mastering it makes your type-safe API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"routers\", 5));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Routers group procedures can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Routers group procedures logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the routersGroup function",
            type: "build-function",
            instructions: "Write a function named `routersGroup` for Routers group procedures: it takes two numbers and returns their product. Log the result of calling it with 5 and 5.",
            starterCode: "function routersGroup(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(routersGroup(5, 5));",
            solution: "function routersGroup(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(routersGroup(5, 5));",
            solutionExplanation: "The function returns 5 * 5 = 25, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "25", hidden: false },
              { name: "Output contains the expected value", expectedContains: "25", hidden: true }
            ],
            hintNotes: { concept: "The `routersGroup` code models Routers group procedures with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-trpc-m1-l3",
          slug: "ts-trpc-m1-l3",
          title: "Input validation with Zod",
          concept: "tRPC procedures validate their input with a schema validator such as Zod, so invalid requests are rejected before the handler runs. In this track you apply it while building type-safe API features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];",
          exampleCode: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Input validation with Zod.",
          bug: { prompt: "This loop for Input validation with Zod produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Input validation with Zod",
            type: "multiple-choice",
            instructions: "Which statement about Input validation with Zod is correct?",
            starterCode: "",
            solution: "tRPC procedures validate their input with a schema validator such as Zod, so invalid requests are rejected before the handler runs.",
            solutionExplanation: "tRPC procedures validate their input with a schema validator such as Zod, so invalid requests are rejected before the handler runs. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "tRPC procedures validate their input with a schema validator such as Zod, so invalid requests are rejected before the handler runs.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Input validation with Zod really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["tRPC procedures validate their input with a schema validator such as Zod, so invalid requests are rejected before the handler runs.", "Input validation with Zod can only be used once in a program.", "Input validation with Zod requires a separate paid licence to use.", "Input validation with Zod is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-trpc-m1-l4",
          slug: "ts-trpc-m1-l4",
          title: "Queries fetch data",
          concept: "A tRPC query is a read-only procedure that the client calls to fetch data, and its result can be cached and refetched like any query. Mastering it makes your type-safe API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 2, beta: 6 };",
          exampleCode: "const config: Record<string, number> = { alpha: 2, beta: 6 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Queries fetch data, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Queries fetch data changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the queriesFetch function",
            type: "build-function",
            instructions: "Write a function named `queriesFetch` for Queries fetch data: it takes two numbers and returns the first minus the second. Log the result of calling it with 9 and 9.",
            starterCode: "function queriesFetch(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(queriesFetch(9, 9));",
            solution: "function queriesFetch(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(queriesFetch(9, 9));",
            solutionExplanation: "The function returns 9 - 9 = 0, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "0", hidden: false },
              { name: "Output contains the expected value", expectedContains: "0", hidden: true }
            ],
            hintNotes: { concept: "The `queriesFetch` code models Queries fetch data with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-trpc-m1-l5",
          slug: "ts-trpc-m1-l5",
          title: "Mutations change data",
          concept: "A tRPC mutation is a procedure that changes server state, such as creating a record, and it returns the updated result to the caller. In this track you apply it while building type-safe API features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 5 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Mutations change data code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Mutations change data crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the mutationsChange function",
            type: "build-function",
            instructions: "Write a function named `mutationsChange` for Mutations change data: it takes three numbers and returns a * b + c. Log the result of calling it with 5, 3 and 6.",
            starterCode: "function mutationsChange(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(mutationsChange(5, 3, 6));",
            solution: "function mutationsChange(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(mutationsChange(5, 3, 6));",
            solutionExplanation: "The function returns 5 * 3 + 6 = 21, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "21", hidden: false },
              { name: "Output contains the expected value", expectedContains: "21", hidden: true }
            ],
            hintNotes: { concept: "The `mutationsChange` code models Mutations change data with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-trpc-m2",
        title: "tRPC in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-trpc-m2-l1",
          slug: "ts-trpc-m2-l1",
          title: "The tRPC client",
          concept: "The tRPC client is created from the server router's type, so every call is autocompleted and type-checked in the editor. Mastering it makes your type-safe API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"trpc\", 8));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by The tRPC client is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for The tRPC client prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in The tRPC client",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: omega, kappa, lambda, theta, zeta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"omega\", \"kappa\", \"lambda\", \"theta\", \"zeta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 5 items, so items.length is 5.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models The tRPC client with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-trpc-m2-l2",
          slug: "ts-trpc-m2-l2",
          title: "Context carries request state",
          concept: "tRPC context is an object created per request that carries shared state such as the authenticated user into every procedure. In this track you apply it while building type-safe API features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];",
          exampleCode: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Context carries request state values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Context carries request state: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Context carries request state",
            type: "multiple-choice",
            instructions: "Which statement about Context carries request state is correct?",
            starterCode: "",
            solution: "tRPC context is an object created per request that carries shared state such as the authenticated user into every procedure.",
            solutionExplanation: "tRPC context is an object created per request that carries shared state such as the authenticated user into every procedure. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "tRPC context is an object created per request that carries shared state such as the authenticated user into every procedure.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Context carries request state really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Context carries request state can only be used once in a program.", "tRPC context is an object created per request that carries shared state such as the authenticated user into every procedure.", "Context carries request state requires a separate paid licence to use.", "Context carries request state is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-trpc-m2-l3",
          slug: "ts-trpc-m2-l3",
          title: "Error handling in tRPC",
          concept: "tRPC errors carry a typed error code such as NOT_FOUND or UNAUTHORIZED, so the client can react to each failure precisely. Mastering it makes your type-safe API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 5, beta: 3 };",
          exampleCode: "const config: Record<string, number> = { alpha: 5, beta: 3 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Error handling in tRPC can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Error handling in tRPC logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Error handling in tRPC",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"LAMBDA - THETA - ZETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "LAMBDA - THETA - ZETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "LAMBDA - THETA - ZETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Error handling in tRPC with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-trpc-m2-l4",
          slug: "ts-trpc-m2-l4",
          title: "Middleware guards procedures",
          concept: "tRPC middleware runs before a procedure and can reject the call or enrich the context, which is how authentication guards are built. In this track you apply it while building type-safe API features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 8 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Middleware guards procedures.",
          bug: { prompt: "This loop for Middleware guards procedures produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Middleware guards procedures",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(4 * 6 + 2);",
            starterCode: "",
            solution: "26",
            solutionExplanation: "The program computes 4 * 6 + 2 = 26.",
            tests: [
              { name: "Correct answer", expectedContains: "26", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 4 * 6, then add 2.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["26", "24", "12", "22"],
            answerIndex: 0,
          }
        },
        {
          id: "ts-trpc-m2-l5",
          slug: "ts-trpc-m2-l5",
          title: "Deploying a tRPC API",
          concept: "A tRPC API is deployed like any other HTTP server, with the router mounted on an endpoint that the client reaches over fetch. Mastering it makes your type-safe API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"deploying\", 2));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Deploying a tRPC API, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Deploying a tRPC API changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the DeployingTRPC config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `DeployingTRPCConfig` for Deploying a tRPC API with name \"zeta\", retries 2 and enabled false, then log it with JSON.stringify.",
            starterCode: "type DeployingTRPCConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DeployingTRPCConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type DeployingTRPCConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DeployingTRPCConfig = { name: \"zeta\", retries: 2, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"zeta\",\"retries\":2,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"zeta\",\"retries\":2,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"zeta\",\"retries\":2,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Deploying a tRPC API with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: type-safe API progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your type-safe API project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 6 of 8 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 8, done: 6, rate: completionRate(6, 8) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(6, 8) is Math.round((6 / 8) * 100) = 75, so the summary stringifies to {\"tasks\":8,\"done\":6,\"rate\":75}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":8,\"done\":6,\"rate\":75}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":75", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "tRPC in TypeScript Capstone Project",
      description: "Build a small working type-safe API application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core type-safe API features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-prisma",
    slug: "ts-prisma",
    language: "typescript",
    category: "languages",
    title: "Prisma & TypeScript",
    description: "Advanced TypeScript: model data with Prisma, query it with a type-safe client, and evolve the schema with migrations",
    difficulty: "Advanced",
    estimatedHours: 16,
    skills: ["Prisma schema", "Prisma Client", "Migrations", "Relations", "Transactions", "Query optimisation"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like keeping a library catalogue where every book has exactly one correct shelf",
    modules: [
      {
        id: "ts-prisma-m1",
        title: "Prisma & TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-prisma-m1-l1",
          slug: "ts-prisma-m1-l1",
          title: "Prisma schema defines models",
          concept: "A Prisma schema declares models that map to database tables, and Prisma generates a type-safe client from them. In this track you apply it while building database-backed API features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 3 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Prisma schema defines models values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Prisma schema defines models: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the prismaSchema function",
            type: "build-function",
            instructions: "Write a function named `prismaSchema` for Prisma schema defines models: it takes two numbers and returns their sum. Log the result of calling it with 9 and 8.",
            starterCode: "function prismaSchema(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(prismaSchema(9, 8));",
            solution: "function prismaSchema(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(prismaSchema(9, 8));",
            solutionExplanation: "The function returns 9 + 8 = 17, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "17", hidden: false },
              { name: "Output contains the expected value", expectedContains: "17", hidden: true }
            ],
            hintNotes: { concept: "The `prismaSchema` code models Prisma schema defines models with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-prisma-m1-l2",
          slug: "ts-prisma-m1-l2",
          title: "Prisma Client queries",
          concept: "Prisma Client is a generated, type-safe database client whose queries are autocompleted and checked against the schema. Mastering it makes your database-backed API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"prisma\", 6));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Prisma Client queries can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Prisma Client queries logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the prismaClient function",
            type: "build-function",
            instructions: "Write a function named `prismaClient` for Prisma Client queries: it takes two numbers and returns their product. Log the result of calling it with 3 and 10.",
            starterCode: "function prismaClient(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(prismaClient(3, 10));",
            solution: "function prismaClient(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(prismaClient(3, 10));",
            solutionExplanation: "The function returns 3 * 10 = 30, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "30", hidden: false },
              { name: "Output contains the expected value", expectedContains: "30", hidden: true }
            ],
            hintNotes: { concept: "The `prismaClient` code models Prisma Client queries with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-prisma-m1-l3",
          slug: "ts-prisma-m1-l3",
          title: "Migrations evolve the schema",
          concept: "Prisma Migrate turns schema changes into versioned SQL migration files that evolve the database step by step. In this track you apply it while building database-backed API features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];",
          exampleCode: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Migrations evolve the schema.",
          bug: { prompt: "This loop for Migrations evolve the schema produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Migrations evolve the schema",
            type: "multiple-choice",
            instructions: "Which statement about Migrations evolve the schema is correct?",
            starterCode: "",
            solution: "Prisma Migrate turns schema changes into versioned SQL migration files that evolve the database step by step.",
            solutionExplanation: "Prisma Migrate turns schema changes into versioned SQL migration files that evolve the database step by step. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Prisma Migrate turns schema changes into versioned SQL migration files that evolve the database step by step.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Migrations evolve the schema really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Migrations evolve the schema can only be used once in a program.", "Prisma Migrate turns schema changes into versioned SQL migration files that evolve the database step by step.", "Migrations evolve the schema requires a separate paid licence to use.", "Migrations evolve the schema is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-prisma-m1-l4",
          slug: "ts-prisma-m1-l4",
          title: "Relations between models",
          concept: "Prisma relations declare how models connect, such as one user having many posts, and the client can include related records in one query. Mastering it makes your database-backed API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 3, beta: 8 };",
          exampleCode: "const config: Record<string, number> = { alpha: 3, beta: 8 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Relations between models, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Relations between models changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the relationsBetween function",
            type: "build-function",
            instructions: "Write a function named `relationsBetween` for Relations between models: it takes two numbers and returns the first minus the second. Log the result of calling it with 16 and 6.",
            starterCode: "function relationsBetween(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(relationsBetween(16, 6));",
            solution: "function relationsBetween(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(relationsBetween(16, 6));",
            solutionExplanation: "The function returns 16 - 6 = 10, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "10", hidden: false },
              { name: "Output contains the expected value", expectedContains: "10", hidden: true }
            ],
            hintNotes: { concept: "The `relationsBetween` code models Relations between models with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-prisma-m1-l5",
          slug: "ts-prisma-m1-l5",
          title: "Filtering and sorting",
          concept: "Prisma Client queries filter with where, sort with orderBy, and page with take and skip, all type-checked. In this track you apply it while building database-backed API features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 6 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Filtering and sorting code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Filtering and sorting crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the filteringSorting function",
            type: "build-function",
            instructions: "Write a function named `filteringSorting` for Filtering and sorting: it takes three numbers and returns a * b + c. Log the result of calling it with 3, 8 and 3.",
            starterCode: "function filteringSorting(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(filteringSorting(3, 8, 3));",
            solution: "function filteringSorting(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(filteringSorting(3, 8, 3));",
            solutionExplanation: "The function returns 3 * 8 + 3 = 27, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "27", hidden: false },
              { name: "Output contains the expected value", expectedContains: "27", hidden: true }
            ],
            hintNotes: { concept: "The `filteringSorting` code models Filtering and sorting with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-prisma-m2",
        title: "Prisma & TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-prisma-m2-l1",
          slug: "ts-prisma-m2-l1",
          title: "Transactions in Prisma",
          concept: "A Prisma transaction runs several writes as one unit, so either all of them commit or none of them does. Mastering it makes your database-backed API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"transactions\", 9));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Transactions in Prisma is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Transactions in Prisma prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Transactions in Prisma",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: lambda, theta, zeta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"lambda\", \"theta\", \"zeta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 3 items, so items.length is 3.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "3", hidden: false },
              { name: "Output contains the expected value", expectedContains: "3", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Transactions in Prisma with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-prisma-m2-l2",
          slug: "ts-prisma-m2-l2",
          title: "Seeding the database",
          concept: "A Prisma seed script inserts initial data such as an admin user so a fresh database starts in a known state. In this track you apply it while building database-backed API features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];",
          exampleCode: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Seeding the database values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Seeding the database: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Seeding the database",
            type: "multiple-choice",
            instructions: "Which statement about Seeding the database is correct?",
            starterCode: "",
            solution: "A Prisma seed script inserts initial data such as an admin user so a fresh database starts in a known state.",
            solutionExplanation: "A Prisma seed script inserts initial data such as an admin user so a fresh database starts in a known state. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A Prisma seed script inserts initial data such as an admin user so a fresh database starts in a known state.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Seeding the database really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Seeding the database can only be used once in a program.", "Seeding the database requires a separate paid licence to use.", "A Prisma seed script inserts initial data such as an admin user so a fresh database starts in a known state.", "Seeding the database is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-prisma-m2-l3",
          slug: "ts-prisma-m2-l3",
          title: "Raw queries in Prisma",
          concept: "Prisma supports raw SQL queries for cases the query builder cannot express, while still returning typed results. Mastering it makes your database-backed API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 6, beta: 5 };",
          exampleCode: "const config: Record<string, number> = { alpha: 6, beta: 5 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Raw queries in Prisma can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Raw queries in Prisma logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Raw queries in Prisma",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"ZETA, ALPHA, BETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "ZETA, ALPHA, BETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "ZETA, ALPHA, BETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Raw queries in Prisma with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-prisma-m2-l4",
          slug: "ts-prisma-m2-l4",
          title: "Performance with indexes",
          concept: "Database indexes declared in the Prisma schema speed up lookups on filtered columns without changing application code. In this track you apply it while building database-backed API features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 9 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Performance with indexes.",
          bug: { prompt: "This loop for Performance with indexes produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Performance with indexes",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(7 * 7 + 7);",
            starterCode: "",
            solution: "56",
            solutionExplanation: "The program computes 7 * 7 + 7 = 56.",
            tests: [
              { name: "Correct answer", expectedContains: "56", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 7 * 7, then add 7.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["49", "56", "21", "42"],
            answerIndex: 1,
          }
        },
        {
          id: "ts-prisma-m2-l5",
          slug: "ts-prisma-m2-l5",
          title: "Prisma in production",
          concept: "In production Prisma Client uses connection pooling and a single generated client instance shared across requests. Mastering it makes your database-backed API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"prisma\", 3));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Prisma in production, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Prisma in production changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the PrismaProduction config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `PrismaProductionConfig` for Prisma in production with name \"beta\", retries 9 and enabled true, then log it with JSON.stringify.",
            starterCode: "type PrismaProductionConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: PrismaProductionConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type PrismaProductionConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: PrismaProductionConfig = { name: \"beta\", retries: 9, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"beta\",\"retries\":9,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"beta\",\"retries\":9,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"beta\",\"retries\":9,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Prisma in production with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: database-backed API progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your database-backed API project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 9 of 10 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 10, done: 9, rate: completionRate(9, 10) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(9, 10) is Math.round((9 / 10) * 100) = 90, so the summary stringifies to {\"tasks\":10,\"done\":9,\"rate\":90}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":10,\"done\":9,\"rate\":90}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":90", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Prisma & TypeScript Capstone Project",
      description: "Build a small working database-backed API application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core database-backed API features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-drizzle",
    slug: "ts-drizzle",
    language: "typescript",
    category: "languages",
    title: "Drizzle ORM & TypeScript",
    description: "Advanced TypeScript: define schemas as TypeScript with Drizzle, write SQL-like queries, and migrate safely",
    difficulty: "Advanced",
    estimatedHours: 16,
    skills: ["Drizzle schema", "Query builder", "Relations", "Migrations", "Transactions", "Prepared statements"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like writing a recipe book where each ingredient is weighed and labelled before cooking begins",
    modules: [
      {
        id: "ts-drizzle-m1",
        title: "Drizzle ORM & TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-drizzle-m1-l1",
          slug: "ts-drizzle-m1-l1",
          title: "Drizzle schema as code",
          concept: "Drizzle defines database tables as TypeScript code, so the schema lives beside the application and is type-checked. In this track you apply it while building SQL-backed application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 4 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Drizzle schema as code values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Drizzle schema as code: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the drizzleSchema function",
            type: "build-function",
            instructions: "Write a function named `drizzleSchema` for Drizzle schema as code: it takes two numbers and returns their sum. Log the result of calling it with 7 and 5.",
            starterCode: "function drizzleSchema(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(drizzleSchema(7, 5));",
            solution: "function drizzleSchema(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(drizzleSchema(7, 5));",
            solutionExplanation: "The function returns 7 + 5 = 12, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "12", hidden: false },
              { name: "Output contains the expected value", expectedContains: "12", hidden: true }
            ],
            hintNotes: { concept: "The `drizzleSchema` code models Drizzle schema as code with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-drizzle-m1-l2",
          slug: "ts-drizzle-m1-l2",
          title: "The Drizzle query builder",
          concept: "Drizzle's query builder constructs SQL from typed method calls, and the result rows carry the table's TypeScript types. Mastering it makes your SQL-backed application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"drizzle\", 7));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in The Drizzle query builder can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about The Drizzle query builder logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the drizzleQuery function",
            type: "build-function",
            instructions: "Write a function named `drizzleQuery` for The Drizzle query builder: it takes two numbers and returns their product. Log the result of calling it with 10 and 7.",
            starterCode: "function drizzleQuery(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(drizzleQuery(10, 7));",
            solution: "function drizzleQuery(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(drizzleQuery(10, 7));",
            solutionExplanation: "The function returns 10 * 7 = 70, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "70", hidden: false },
              { name: "Output contains the expected value", expectedContains: "70", hidden: true }
            ],
            hintNotes: { concept: "The `drizzleQuery` code models The Drizzle query builder with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-drizzle-m1-l3",
          slug: "ts-drizzle-m1-l3",
          title: "SQL-like syntax in Drizzle",
          concept: "Drizzle's API mirrors SQL closely, with select, from, where and join calls that map directly to SQL clauses. In this track you apply it while building SQL-backed application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];",
          exampleCode: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for SQL-like syntax in Drizzle.",
          bug: { prompt: "This loop for SQL-like syntax in Drizzle produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: SQL-like syntax in Drizzle",
            type: "multiple-choice",
            instructions: "Which statement about SQL-like syntax in Drizzle is correct?",
            starterCode: "",
            solution: "Drizzle's API mirrors SQL closely, with select, from, where and join calls that map directly to SQL clauses.",
            solutionExplanation: "Drizzle's API mirrors SQL closely, with select, from, where and join calls that map directly to SQL clauses. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Drizzle's API mirrors SQL closely, with select, from, where and join calls that map directly to SQL clauses.", hidden: false }
            ],
            hintNotes: { concept: "Think about what SQL-like syntax in Drizzle really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["SQL-like syntax in Drizzle can only be used once in a program.", "SQL-like syntax in Drizzle requires a separate paid licence to use.", "Drizzle's API mirrors SQL closely, with select, from, where and join calls that map directly to SQL clauses.", "SQL-like syntax in Drizzle is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-drizzle-m1-l4",
          slug: "ts-drizzle-m1-l4",
          title: "Relations with Drizzle",
          concept: "Drizzle relations declare foreign keys between tables so queries can fetch nested, related data in one round trip. Mastering it makes your SQL-backed application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 4, beta: 3 };",
          exampleCode: "const config: Record<string, number> = { alpha: 4, beta: 3 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Relations with Drizzle, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Relations with Drizzle changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the relationsDrizzle function",
            type: "build-function",
            instructions: "Write a function named `relationsDrizzle` for Relations with Drizzle: it takes two numbers and returns the first minus the second. Log the result of calling it with 14 and 3.",
            starterCode: "function relationsDrizzle(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(relationsDrizzle(14, 3));",
            solution: "function relationsDrizzle(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(relationsDrizzle(14, 3));",
            solutionExplanation: "The function returns 14 - 3 = 11, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "11", hidden: false },
              { name: "Output contains the expected value", expectedContains: "11", hidden: true }
            ],
            hintNotes: { concept: "The `relationsDrizzle` code models Relations with Drizzle with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-drizzle-m1-l5",
          slug: "ts-drizzle-m1-l5",
          title: "Inserting and updating rows",
          concept: "Drizzle inserts and updates rows with typed values objects, and returning() gives back the written rows. In this track you apply it while building SQL-backed application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 7 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Inserting and updating rows code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Inserting and updating rows crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the insertingUpdating function",
            type: "build-function",
            instructions: "Write a function named `insertingUpdating` for Inserting and updating rows: it takes three numbers and returns a * b + c. Log the result of calling it with 10, 5 and 6.",
            starterCode: "function insertingUpdating(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(insertingUpdating(10, 5, 6));",
            solution: "function insertingUpdating(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(insertingUpdating(10, 5, 6));",
            solutionExplanation: "The function returns 10 * 5 + 6 = 56, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "56", hidden: false },
              { name: "Output contains the expected value", expectedContains: "56", hidden: true }
            ],
            hintNotes: { concept: "The `insertingUpdating` code models Inserting and updating rows with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-drizzle-m2",
        title: "Drizzle ORM & TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-drizzle-m2-l1",
          slug: "ts-drizzle-m2-l1",
          title: "Migrations with Drizzle Kit",
          concept: "Drizzle Kit generates SQL migrations from schema changes so the database can be upgraded reproducibly. Mastering it makes your SQL-backed application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"migrations\", 10));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Migrations with Drizzle Kit is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Migrations with Drizzle Kit prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Migrations with Drizzle Kit",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: zeta, alpha, beta, gamma. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"zeta\", \"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 4 items, so items.length is 4.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "4", hidden: false },
              { name: "Output contains the expected value", expectedContains: "4", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Migrations with Drizzle Kit with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-drizzle-m2-l2",
          slug: "ts-drizzle-m2-l2",
          title: "Transactions in Drizzle",
          concept: "Drizzle transactions wrap several statements so they commit together or roll back together on failure. In this track you apply it while building SQL-backed application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];",
          exampleCode: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Transactions in Drizzle values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Transactions in Drizzle: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Transactions in Drizzle",
            type: "multiple-choice",
            instructions: "Which statement about Transactions in Drizzle is correct?",
            starterCode: "",
            solution: "Drizzle transactions wrap several statements so they commit together or roll back together on failure.",
            solutionExplanation: "Drizzle transactions wrap several statements so they commit together or roll back together on failure. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Drizzle transactions wrap several statements so they commit together or roll back together on failure.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Transactions in Drizzle really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Transactions in Drizzle can only be used once in a program.", "Transactions in Drizzle requires a separate paid licence to use.", "Transactions in Drizzle is not available in TypeScript.", "Drizzle transactions wrap several statements so they commit together or roll back together on failure."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-drizzle-m2-l3",
          slug: "ts-drizzle-m2-l3",
          title: "Prepared statements",
          concept: "Drizzle prepared statements compile a query once and reuse it with different parameters, which is faster and safer. Mastering it makes your SQL-backed application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 7, beta: 7 };",
          exampleCode: "const config: Record<string, number> = { alpha: 7, beta: 7 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Prepared statements can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Prepared statements logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Prepared statements",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"beta\", \"gamma\", \"delta\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"beta\", \"gamma\", \"delta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"BETA - GAMMA - DELTA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "BETA - GAMMA - DELTA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "BETA - GAMMA - DELTA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Prepared statements with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-drizzle-m2-l4",
          slug: "ts-drizzle-m2-l4",
          title: "Aggregations in Drizzle",
          concept: "Drizzle expresses SQL aggregations such as count and sum with typed helper functions over columns. In this track you apply it while building SQL-backed application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 10 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Aggregations in Drizzle.",
          bug: { prompt: "This loop for Aggregations in Drizzle produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Aggregations in Drizzle",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(3 * 2 + 4);",
            starterCode: "",
            solution: "10",
            solutionExplanation: "The program computes 3 * 2 + 4 = 10.",
            tests: [
              { name: "Correct answer", expectedContains: "10", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 3 * 2, then add 4.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["6", "9", "10", "2"],
            answerIndex: 2,
          }
        },
        {
          id: "ts-drizzle-m2-l5",
          slug: "ts-drizzle-m2-l5",
          title: "Drizzle with serverless drivers",
          concept: "Drizzle works with serverless database drivers that speak HTTP, so it runs in edge runtimes without a persistent TCP connection. Mastering it makes your SQL-backed application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"drizzle\", 4));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Drizzle with serverless drivers, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Drizzle with serverless drivers changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the DrizzleServerless config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `DrizzleServerlessConfig` for Drizzle with serverless drivers with name \"delta\", retries 7 and enabled false, then log it with JSON.stringify.",
            starterCode: "type DrizzleServerlessConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DrizzleServerlessConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type DrizzleServerlessConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DrizzleServerlessConfig = { name: \"delta\", retries: 7, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"delta\",\"retries\":7,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"delta\",\"retries\":7,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"delta\",\"retries\":7,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Drizzle with serverless drivers with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: SQL-backed application progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your SQL-backed application project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 3 of 4 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 4, done: 3, rate: completionRate(3, 4) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(3, 4) is Math.round((3 / 4) * 100) = 75, so the summary stringifies to {\"tasks\":4,\"done\":3,\"rate\":75}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":4,\"done\":3,\"rate\":75}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":75", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Drizzle ORM & TypeScript Capstone Project",
      description: "Build a small working SQL-backed application application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core SQL-backed application features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-serverless",
    slug: "ts-serverless",
    language: "typescript",
    category: "languages",
    title: "Serverless TypeScript",
    description: "Advanced TypeScript: design, deploy and operate serverless TypeScript functions on event-driven platforms",
    difficulty: "Advanced",
    estimatedHours: 18,
    skills: ["Serverless functions", "Event triggers", "Cold starts", "API Gateway", "Serverless deployment", "Observability"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like hiring staff on demand: they appear when needed, do one job well, and leave when it is done",
    modules: [
      {
        id: "ts-serverless-m1",
        title: "Serverless TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-serverless-m1-l1",
          slug: "ts-serverless-m1-l1",
          title: "Functions as a service",
          concept: "Serverless platforms run small functions in response to events, so you deploy code without managing any servers. In this track you apply it while building serverless application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 5 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Functions as a service values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Functions as a service: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the functionsService function",
            type: "build-function",
            instructions: "Write a function named `functionsService` for Functions as a service: it takes two numbers and returns their sum. Log the result of calling it with 5 and 10.",
            starterCode: "function functionsService(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(functionsService(5, 10));",
            solution: "function functionsService(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(functionsService(5, 10));",
            solutionExplanation: "The function returns 5 + 10 = 15, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "15", hidden: false },
              { name: "Output contains the expected value", expectedContains: "15", hidden: true }
            ],
            hintNotes: { concept: "The `functionsService` code models Functions as a service with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-serverless-m1-l2",
          slug: "ts-serverless-m1-l2",
          title: "Handlers and events",
          concept: "A serverless handler is a function that receives an event object describing the trigger and returns a response. Mastering it makes your serverless application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"handlers\", 8));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Handlers and events can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Handlers and events logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the handlersEvents function",
            type: "build-function",
            instructions: "Write a function named `handlersEvents` for Handlers and events: it takes two numbers and returns their product. Log the result of calling it with 8 and 4.",
            starterCode: "function handlersEvents(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(handlersEvents(8, 4));",
            solution: "function handlersEvents(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(handlersEvents(8, 4));",
            solutionExplanation: "The function returns 8 * 4 = 32, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "32", hidden: false },
              { name: "Output contains the expected value", expectedContains: "32", hidden: true }
            ],
            hintNotes: { concept: "The `handlersEvents` code models Handlers and events with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-serverless-m1-l3",
          slug: "ts-serverless-m1-l3",
          title: "Cold starts",
          concept: "A cold start is the delay when a serverless platform creates a fresh runtime for a function that has not run recently. In this track you apply it while building serverless application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];",
          exampleCode: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Cold starts.",
          bug: { prompt: "This loop for Cold starts produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Cold starts",
            type: "multiple-choice",
            instructions: "Which statement about Cold starts is correct?",
            starterCode: "",
            solution: "A cold start is the delay when a serverless platform creates a fresh runtime for a function that has not run recently.",
            solutionExplanation: "A cold start is the delay when a serverless platform creates a fresh runtime for a function that has not run recently. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A cold start is the delay when a serverless platform creates a fresh runtime for a function that has not run recently.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Cold starts really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Cold starts can only be used once in a program.", "Cold starts requires a separate paid licence to use.", "Cold starts is not available in TypeScript.", "A cold start is the delay when a serverless platform creates a fresh runtime for a function that has not run recently."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-serverless-m1-l4",
          slug: "ts-serverless-m1-l4",
          title: "Environment configuration",
          concept: "Serverless functions read configuration from environment variables, so secrets and settings change without redeploying code. Mastering it makes your serverless application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 5, beta: 5 };",
          exampleCode: "const config: Record<string, number> = { alpha: 5, beta: 5 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Environment configuration, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Environment configuration changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the environmentConfiguration function",
            type: "build-function",
            instructions: "Write a function named `environmentConfiguration` for Environment configuration: it takes two numbers and returns the first minus the second. Log the result of calling it with 12 and 8.",
            starterCode: "function environmentConfiguration(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(environmentConfiguration(12, 8));",
            solution: "function environmentConfiguration(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(environmentConfiguration(12, 8));",
            solutionExplanation: "The function returns 12 - 8 = 4, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "4", hidden: false },
              { name: "Output contains the expected value", expectedContains: "4", hidden: true }
            ],
            hintNotes: { concept: "The `environmentConfiguration` code models Environment configuration with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-serverless-m1-l5",
          slug: "ts-serverless-m1-l5",
          title: "API Gateway routing",
          concept: "An API gateway maps HTTP routes to serverless functions, turning each function into an endpoint of a public API. In this track you apply it while building serverless application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 8 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by API Gateway routing code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for API Gateway routing crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the aPIGateway function",
            type: "build-function",
            instructions: "Write a function named `aPIGateway` for API Gateway routing: it takes three numbers and returns a * b + c. Log the result of calling it with 8, 10 and 3.",
            starterCode: "function aPIGateway(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(aPIGateway(8, 10, 3));",
            solution: "function aPIGateway(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(aPIGateway(8, 10, 3));",
            solutionExplanation: "The function returns 8 * 10 + 3 = 83, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "83", hidden: false },
              { name: "Output contains the expected value", expectedContains: "83", hidden: true }
            ],
            hintNotes: { concept: "The `aPIGateway` code models API Gateway routing with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-serverless-m2",
        title: "Serverless TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-serverless-m2-l1",
          slug: "ts-serverless-m2-l1",
          title: "Serverless storage",
          concept: "Serverless functions are stateless, so persistent data lives in managed storage such as object stores and databases. Mastering it makes your serverless application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"serverless\", 2));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Serverless storage is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Serverless storage prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Serverless storage",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: beta, gamma, delta, sigma, omega. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"beta\", \"gamma\", \"delta\", \"sigma\", \"omega\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 5 items, so items.length is 5.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Serverless storage with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-serverless-m2-l2",
          slug: "ts-serverless-m2-l2",
          title: "Scheduling with cron",
          concept: "Serverless platforms can run a function on a schedule, such as every hour, using a cron expression as the trigger. In this track you apply it while building serverless application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];",
          exampleCode: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Scheduling with cron values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Scheduling with cron: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Scheduling with cron",
            type: "multiple-choice",
            instructions: "Which statement about Scheduling with cron is correct?",
            starterCode: "",
            solution: "Serverless platforms can run a function on a schedule, such as every hour, using a cron expression as the trigger.",
            solutionExplanation: "Serverless platforms can run a function on a schedule, such as every hour, using a cron expression as the trigger. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Serverless platforms can run a function on a schedule, such as every hour, using a cron expression as the trigger.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Scheduling with cron really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Serverless platforms can run a function on a schedule, such as every hour, using a cron expression as the trigger.", "Scheduling with cron can only be used once in a program.", "Scheduling with cron requires a separate paid licence to use.", "Scheduling with cron is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-serverless-m2-l3",
          slug: "ts-serverless-m2-l3",
          title: "Keeping functions warm",
          concept: "Keeping a function warm means invoking it regularly so the platform reuses a ready runtime and avoids cold starts. Mastering it makes your serverless application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 8, beta: 9 };",
          exampleCode: "const config: Record<string, number> = { alpha: 8, beta: 9 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Keeping functions warm can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Keeping functions warm logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Keeping functions warm",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"delta\", \"sigma\", \"omega\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"delta\", \"sigma\", \"omega\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"DELTA, SIGMA, OMEGA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "DELTA, SIGMA, OMEGA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "DELTA, SIGMA, OMEGA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Keeping functions warm with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-serverless-m2-l4",
          slug: "ts-serverless-m2-l4",
          title: "Monitoring serverless apps",
          concept: "Serverless monitoring relies on structured logs and traces, because there is no server to inspect when something fails. In this track you apply it while building serverless application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 2 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Monitoring serverless apps.",
          bug: { prompt: "This loop for Monitoring serverless apps produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Monitoring serverless apps",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(6 * 3 + 1);",
            starterCode: "",
            solution: "19",
            solutionExplanation: "The program computes 6 * 3 + 1 = 19.",
            tests: [
              { name: "Correct answer", expectedContains: "19", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 6 * 3, then add 1.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["18", "10", "17", "19"],
            answerIndex: 3,
          }
        },
        {
          id: "ts-serverless-m2-l5",
          slug: "ts-serverless-m2-l5",
          title: "Deploying serverless TypeScript",
          concept: "TypeScript serverless projects are bundled into small deployable packages, with only the handler and its dependencies included. Mastering it makes your serverless application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"deploying\", 5));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Deploying serverless TypeScript, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Deploying serverless TypeScript changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the DeployingServerless config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `DeployingServerlessConfig` for Deploying serverless TypeScript with name \"omega\", retries 5 and enabled true, then log it with JSON.stringify.",
            starterCode: "type DeployingServerlessConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DeployingServerlessConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type DeployingServerlessConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DeployingServerlessConfig = { name: \"omega\", retries: 5, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"omega\",\"retries\":5,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"omega\",\"retries\":5,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"omega\",\"retries\":5,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Deploying serverless TypeScript with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: serverless application progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your serverless application project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 1 of 2 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 2, done: 1, rate: completionRate(1, 2) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(1, 2) is Math.round((1 / 2) * 100) = 50, so the summary stringifies to {\"tasks\":2,\"done\":1,\"rate\":50}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":2,\"done\":1,\"rate\":50}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":50", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Serverless TypeScript Capstone Project",
      description: "Build a small working serverless application application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core serverless application features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-microservices",
    slug: "ts-microservices",
    language: "typescript",
    category: "languages",
    title: "Microservices in TypeScript",
    description: "Advanced TypeScript: design, build and operate independent TypeScript microservices that communicate reliably",
    difficulty: "Advanced",
    estimatedHours: 20,
    skills: ["Service boundaries", "Service discovery", "API gateways", "Circuit breakers", "Distributed tracing", "Independent deployment"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like running a city of small specialist shops instead of one giant department store",
    modules: [
      {
        id: "ts-microservices-m1",
        title: "Microservices in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-microservices-m1-l1",
          slug: "ts-microservices-m1-l1",
          title: "Services own their data",
          concept: "Each microservice owns its own database, so services change independently and never share tables directly. In this track you apply it while building microservice system features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 6 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Services own their data values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Services own their data: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the servicesOwn function",
            type: "build-function",
            instructions: "Write a function named `servicesOwn` for Services own their data: it takes two numbers and returns their sum. Log the result of calling it with 3 and 7.",
            starterCode: "function servicesOwn(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(servicesOwn(3, 7));",
            solution: "function servicesOwn(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(servicesOwn(3, 7));",
            solutionExplanation: "The function returns 3 + 7 = 10, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "10", hidden: false },
              { name: "Output contains the expected value", expectedContains: "10", hidden: true }
            ],
            hintNotes: { concept: "The `servicesOwn` code models Services own their data with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-microservices-m1-l2",
          slug: "ts-microservices-m1-l2",
          title: "Service boundaries",
          concept: "A good service boundary groups one business capability, such as payments, behind a single API owned by one team. Mastering it makes your microservice system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"service\", 9));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Service boundaries can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Service boundaries logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the serviceBoundaries function",
            type: "build-function",
            instructions: "Write a function named `serviceBoundaries` for Service boundaries: it takes two numbers and returns their product. Log the result of calling it with 6 and 9.",
            starterCode: "function serviceBoundaries(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(serviceBoundaries(6, 9));",
            solution: "function serviceBoundaries(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(serviceBoundaries(6, 9));",
            solutionExplanation: "The function returns 6 * 9 = 54, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "54", hidden: false },
              { name: "Output contains the expected value", expectedContains: "54", hidden: true }
            ],
            hintNotes: { concept: "The `serviceBoundaries` code models Service boundaries with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-microservices-m1-l3",
          slug: "ts-microservices-m1-l3",
          title: "Synchronous service calls",
          concept: "Synchronous service-to-service calls use HTTP or RPC and wait for a reply, which couples the caller's latency to the callee. In this track you apply it while building microservice system features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];",
          exampleCode: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Synchronous service calls.",
          bug: { prompt: "This loop for Synchronous service calls produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Synchronous service calls",
            type: "multiple-choice",
            instructions: "Which statement about Synchronous service calls is correct?",
            starterCode: "",
            solution: "Synchronous service-to-service calls use HTTP or RPC and wait for a reply, which couples the caller's latency to the callee.",
            solutionExplanation: "Synchronous service-to-service calls use HTTP or RPC and wait for a reply, which couples the caller's latency to the callee. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Synchronous service-to-service calls use HTTP or RPC and wait for a reply, which couples the caller's latency to the callee.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Synchronous service calls really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Synchronous service-to-service calls use HTTP or RPC and wait for a reply, which couples the caller's latency to the callee.", "Synchronous service calls can only be used once in a program.", "Synchronous service calls requires a separate paid licence to use.", "Synchronous service calls is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-microservices-m1-l4",
          slug: "ts-microservices-m1-l4",
          title: "Asynchronous messaging",
          concept: "Asynchronous messaging lets services communicate through queues, so a slow consumer never blocks the producer. Mastering it makes your microservice system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 6, beta: 7 };",
          exampleCode: "const config: Record<string, number> = { alpha: 6, beta: 7 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Asynchronous messaging, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Asynchronous messaging changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the asynchronousMessaging function",
            type: "build-function",
            instructions: "Write a function named `asynchronousMessaging` for Asynchronous messaging: it takes two numbers and returns the first minus the second. Log the result of calling it with 10 and 5.",
            starterCode: "function asynchronousMessaging(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(asynchronousMessaging(10, 5));",
            solution: "function asynchronousMessaging(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(asynchronousMessaging(10, 5));",
            solutionExplanation: "The function returns 10 - 5 = 5, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `asynchronousMessaging` code models Asynchronous messaging with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-microservices-m1-l5",
          slug: "ts-microservices-m1-l5",
          title: "Service discovery",
          concept: "Service discovery is how a service finds the current address of another service, usually through a registry or DNS. In this track you apply it while building microservice system features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 9 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Service discovery code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Service discovery crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the serviceDiscovery function",
            type: "build-function",
            instructions: "Write a function named `serviceDiscovery` for Service discovery: it takes three numbers and returns a * b + c. Log the result of calling it with 6, 7 and 6.",
            starterCode: "function serviceDiscovery(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(serviceDiscovery(6, 7, 6));",
            solution: "function serviceDiscovery(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(serviceDiscovery(6, 7, 6));",
            solutionExplanation: "The function returns 6 * 7 + 6 = 48, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "48", hidden: false },
              { name: "Output contains the expected value", expectedContains: "48", hidden: true }
            ],
            hintNotes: { concept: "The `serviceDiscovery` code models Service discovery with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-microservices-m2",
        title: "Microservices in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-microservices-m2-l1",
          slug: "ts-microservices-m2-l1",
          title: "API gateways",
          concept: "An API gateway is the single entry point for clients, routing requests to services and handling auth, rate limits and logging. Mastering it makes your microservice system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"api\", 3));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by API gateways is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for API gateways prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in API gateways",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: delta, sigma, omega. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"delta\", \"sigma\", \"omega\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 3 items, so items.length is 3.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "3", hidden: false },
              { name: "Output contains the expected value", expectedContains: "3", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models API gateways with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-microservices-m2-l2",
          slug: "ts-microservices-m2-l2",
          title: "Circuit breakers",
          concept: "A circuit breaker stops calling a failing service after repeated errors, giving it time to recover instead of piling on requests. In this track you apply it while building microservice system features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];",
          exampleCode: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Circuit breakers values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Circuit breakers: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Circuit breakers",
            type: "multiple-choice",
            instructions: "Which statement about Circuit breakers is correct?",
            starterCode: "",
            solution: "A circuit breaker stops calling a failing service after repeated errors, giving it time to recover instead of piling on requests.",
            solutionExplanation: "A circuit breaker stops calling a failing service after repeated errors, giving it time to recover instead of piling on requests. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A circuit breaker stops calling a failing service after repeated errors, giving it time to recover instead of piling on requests.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Circuit breakers really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Circuit breakers can only be used once in a program.", "A circuit breaker stops calling a failing service after repeated errors, giving it time to recover instead of piling on requests.", "Circuit breakers requires a separate paid licence to use.", "Circuit breakers is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-microservices-m2-l3",
          slug: "ts-microservices-m2-l3",
          title: "Distributed tracing",
          concept: "Distributed tracing attaches a trace id to a request as it crosses services, so one slow hop can be found in a sea of logs. Mastering it makes your microservice system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 9, beta: 4 };",
          exampleCode: "const config: Record<string, number> = { alpha: 9, beta: 4 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Distributed tracing can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Distributed tracing logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Distributed tracing",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"omega\", \"kappa\", \"lambda\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"omega\", \"kappa\", \"lambda\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"OMEGA - KAPPA - LAMBDA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "OMEGA - KAPPA - LAMBDA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "OMEGA - KAPPA - LAMBDA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Distributed tracing with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-microservices-m2-l4",
          slug: "ts-microservices-m2-l4",
          title: "Versioning service APIs",
          concept: "Service APIs are versioned so old clients keep working while new clients adopt the changed contract. In this track you apply it while building microservice system features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 3 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Versioning service APIs.",
          bug: { prompt: "This loop for Versioning service APIs produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Versioning service APIs",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(9 * 4 + 6);",
            starterCode: "",
            solution: "42",
            solutionExplanation: "The program computes 9 * 4 + 6 = 42.",
            tests: [
              { name: "Correct answer", expectedContains: "42", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 9 * 4, then add 6.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["42", "36", "19", "30"],
            answerIndex: 0,
          }
        },
        {
          id: "ts-microservices-m2-l5",
          slug: "ts-microservices-m2-l5",
          title: "Deploying microservices",
          concept: "Microservices deploy independently, so one service can be released without redeploying the rest of the system. Mastering it makes your microservice system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"deploying\", 6));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Deploying microservices, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Deploying microservices changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the DeployingMicroservices config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `DeployingMicroservicesConfig` for Deploying microservices with name \"lambda\", retries 3 and enabled false, then log it with JSON.stringify.",
            starterCode: "type DeployingMicroservicesConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DeployingMicroservicesConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type DeployingMicroservicesConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DeployingMicroservicesConfig = { name: \"lambda\", retries: 3, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"lambda\",\"retries\":3,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"lambda\",\"retries\":3,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"lambda\",\"retries\":3,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Deploying microservices with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: microservice system progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your microservice system project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 7 of 10 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 10, done: 7, rate: completionRate(7, 10) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(7, 10) is Math.round((7 / 10) * 100) = 70, so the summary stringifies to {\"tasks\":10,\"done\":7,\"rate\":70}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":10,\"done\":7,\"rate\":70}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":70", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Microservices in TypeScript Capstone Project",
      description: "Build a small working microservice system application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core microservice system features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-event-driven",
    slug: "ts-event-driven",
    language: "typescript",
    category: "languages",
    title: "Event-Driven Architecture",
    description: "Advanced TypeScript: design event-driven systems with producers, consumers, brokers and event sourcing",
    difficulty: "Advanced",
    estimatedHours: 18,
    skills: ["Event design", "Message brokers", "Event sourcing", "CQRS", "Idempotent consumers", "Dead-letter queues"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like keeping a diary where every entry is dated and nothing is ever erased",
    modules: [
      {
        id: "ts-event-driven-m1",
        title: "Event-Driven Architecture Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-event-driven-m1-l1",
          slug: "ts-event-driven-m1-l1",
          title: "Events as facts",
          concept: "An event is an immutable record that something happened, such as OrderPlaced, and it can never be edited after the fact. In this track you apply it while building event-driven system features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 7 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Events as facts values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Events as facts: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the eventsFacts function",
            type: "build-function",
            instructions: "Write a function named `eventsFacts` for Events as facts: it takes two numbers and returns their sum. Log the result of calling it with 10 and 4.",
            starterCode: "function eventsFacts(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(eventsFacts(10, 4));",
            solution: "function eventsFacts(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(eventsFacts(10, 4));",
            solutionExplanation: "The function returns 10 + 4 = 14, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "14", hidden: false },
              { name: "Output contains the expected value", expectedContains: "14", hidden: true }
            ],
            hintNotes: { concept: "The `eventsFacts` code models Events as facts with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-event-driven-m1-l2",
          slug: "ts-event-driven-m1-l2",
          title: "Producers and consumers",
          concept: "Producers publish events and consumers react to them, so the two sides never call each other directly. Mastering it makes your event-driven system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"producers\", 10));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Producers and consumers can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Producers and consumers logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the producersConsumers function",
            type: "build-function",
            instructions: "Write a function named `producersConsumers` for Producers and consumers: it takes two numbers and returns their product. Log the result of calling it with 4 and 6.",
            starterCode: "function producersConsumers(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(producersConsumers(4, 6));",
            solution: "function producersConsumers(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(producersConsumers(4, 6));",
            solutionExplanation: "The function returns 4 * 6 = 24, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "24", hidden: false },
              { name: "Output contains the expected value", expectedContains: "24", hidden: true }
            ],
            hintNotes: { concept: "The `producersConsumers` code models Producers and consumers with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-event-driven-m1-l3",
          slug: "ts-event-driven-m1-l3",
          title: "Event brokers",
          concept: "An event broker such as a message queue stores events and delivers them to consumers, even when a consumer is offline. In this track you apply it while building event-driven system features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];",
          exampleCode: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Event brokers.",
          bug: { prompt: "This loop for Event brokers produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Event brokers",
            type: "multiple-choice",
            instructions: "Which statement about Event brokers is correct?",
            starterCode: "",
            solution: "An event broker such as a message queue stores events and delivers them to consumers, even when a consumer is offline.",
            solutionExplanation: "An event broker such as a message queue stores events and delivers them to consumers, even when a consumer is offline. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "An event broker such as a message queue stores events and delivers them to consumers, even when a consumer is offline.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Event brokers really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Event brokers can only be used once in a program.", "An event broker such as a message queue stores events and delivers them to consumers, even when a consumer is offline.", "Event brokers requires a separate paid licence to use.", "Event brokers is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-event-driven-m1-l4",
          slug: "ts-event-driven-m1-l4",
          title: "Event ordering",
          concept: "Events within one partition or stream are delivered in order, which lets consumers rebuild state deterministically. Mastering it makes your event-driven system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 7, beta: 9 };",
          exampleCode: "const config: Record<string, number> = { alpha: 7, beta: 9 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Event ordering, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Event ordering changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the eventOrdering function",
            type: "build-function",
            instructions: "Write a function named `eventOrdering` for Event ordering: it takes two numbers and returns the first minus the second. Log the result of calling it with 17 and 10.",
            starterCode: "function eventOrdering(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(eventOrdering(17, 10));",
            solution: "function eventOrdering(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(eventOrdering(17, 10));",
            solutionExplanation: "The function returns 17 - 10 = 7, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "7", hidden: false },
              { name: "Output contains the expected value", expectedContains: "7", hidden: true }
            ],
            hintNotes: { concept: "The `eventOrdering` code models Event ordering with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-event-driven-m1-l5",
          slug: "ts-event-driven-m1-l5",
          title: "Idempotent consumers",
          concept: "An idempotent consumer produces the same result when it processes the same event twice, which makes redelivery safe. In this track you apply it while building event-driven system features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 10 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Idempotent consumers code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Idempotent consumers crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the idempotentConsumers function",
            type: "build-function",
            instructions: "Write a function named `idempotentConsumers` for Idempotent consumers: it takes three numbers and returns a * b + c. Log the result of calling it with 4, 4 and 3.",
            starterCode: "function idempotentConsumers(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(idempotentConsumers(4, 4, 3));",
            solution: "function idempotentConsumers(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(idempotentConsumers(4, 4, 3));",
            solutionExplanation: "The function returns 4 * 4 + 3 = 19, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "19", hidden: false },
              { name: "Output contains the expected value", expectedContains: "19", hidden: true }
            ],
            hintNotes: { concept: "The `idempotentConsumers` code models Idempotent consumers with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-event-driven-m2",
        title: "Event-Driven Architecture in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-event-driven-m2-l1",
          slug: "ts-event-driven-m2-l1",
          title: "Event sourcing",
          concept: "Event sourcing stores every state change as an event, so the current state is rebuilt by replaying the event log. Mastering it makes your event-driven system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"event\", 4));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Event sourcing is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Event sourcing prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Event sourcing",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: omega, kappa, lambda, theta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"omega\", \"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 4 items, so items.length is 4.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "4", hidden: false },
              { name: "Output contains the expected value", expectedContains: "4", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Event sourcing with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-event-driven-m2-l2",
          slug: "ts-event-driven-m2-l2",
          title: "CQRS in practice",
          concept: "CQRS separates the model used to write data from the model used to read it, so each side can be optimised independently. In this track you apply it while building event-driven system features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];",
          exampleCode: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for CQRS in practice values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about CQRS in practice: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: CQRS in practice",
            type: "multiple-choice",
            instructions: "Which statement about CQRS in practice is correct?",
            starterCode: "",
            solution: "CQRS separates the model used to write data from the model used to read it, so each side can be optimised independently.",
            solutionExplanation: "CQRS separates the model used to write data from the model used to read it, so each side can be optimised independently. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "CQRS separates the model used to write data from the model used to read it, so each side can be optimised independently.", hidden: false }
            ],
            hintNotes: { concept: "Think about what CQRS in practice really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["CQRS in practice can only be used once in a program.", "CQRS in practice requires a separate paid licence to use.", "CQRS separates the model used to write data from the model used to read it, so each side can be optimised independently.", "CQRS in practice is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-event-driven-m2-l3",
          slug: "ts-event-driven-m2-l3",
          title: "Dead-letter queues",
          concept: "A dead-letter queue collects events that repeatedly fail processing, so they can be inspected instead of blocking the stream. Mastering it makes your event-driven system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 10, beta: 6 };",
          exampleCode: "const config: Record<string, number> = { alpha: 10, beta: 6 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Dead-letter queues can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Dead-letter queues logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Dead-letter queues",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"LAMBDA, THETA, ZETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "LAMBDA, THETA, ZETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "LAMBDA, THETA, ZETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Dead-letter queues with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-event-driven-m2-l4",
          slug: "ts-event-driven-m2-l4",
          title: "Event schemas",
          concept: "Event schemas version the shape of each event, so producers and consumers can evolve without breaking each other. In this track you apply it while building event-driven system features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 4 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Event schemas.",
          bug: { prompt: "This loop for Event schemas produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Event schemas",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(5 * 5 + 3);",
            starterCode: "",
            solution: "28",
            solutionExplanation: "The program computes 5 * 5 + 3 = 28.",
            tests: [
              { name: "Correct answer", expectedContains: "28", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 5 * 5, then add 3.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["25", "28", "13", "22"],
            answerIndex: 1,
          }
        },
        {
          id: "ts-event-driven-m2-l5",
          slug: "ts-event-driven-m2-l5",
          title: "Designing event flows",
          concept: "A well-designed event flow names events in the past tense, keeps payloads small, and gives every event one clear owner. Mastering it makes your event-driven system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"designing\", 7));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Designing event flows, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Designing event flows changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the DesigningEvent config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `DesigningEventConfig` for Designing event flows with name \"zeta\", retries 10 and enabled true, then log it with JSON.stringify.",
            starterCode: "type DesigningEventConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DesigningEventConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type DesigningEventConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DesigningEventConfig = { name: \"zeta\", retries: 10, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"zeta\",\"retries\":10,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"zeta\",\"retries\":10,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"zeta\",\"retries\":10,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Designing event flows with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: event-driven system progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your event-driven system project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 18 of 20 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 20, done: 18, rate: completionRate(18, 20) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(18, 20) is Math.round((18 / 20) * 100) = 90, so the summary stringifies to {\"tasks\":20,\"done\":18,\"rate\":90}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":20,\"done\":18,\"rate\":90}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":90", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Event-Driven Architecture Capstone Project",
      description: "Build a small working event-driven system application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core event-driven system features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-realtime-apps",
    slug: "ts-realtime-apps",
    language: "typescript",
    category: "languages",
    title: "Real-Time Apps in TypeScript",
    description: "Advanced TypeScript: build real-time TypeScript applications with WebSockets, rooms, presence and live updates",
    difficulty: "Advanced",
    estimatedHours: 16,
    skills: ["WebSockets", "Rooms and channels", "Presence", "Broadcasting", "Reconnection", "Scaling real-time servers"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like running a radio station where every listener hears the broadcast the moment it airs",
    modules: [
      {
        id: "ts-realtime-apps-m1",
        title: "Real-Time Apps in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-realtime-apps-m1-l1",
          slug: "ts-realtime-apps-m1-l1",
          title: "WebSockets in TypeScript",
          concept: "A WebSocket is a persistent two-way connection between client and server, so either side can push messages at any time. In this track you apply it while building real-time application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 8 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for WebSockets in TypeScript values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about WebSockets in TypeScript: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the webSocketsTypeScript function",
            type: "build-function",
            instructions: "Write a function named `webSocketsTypeScript` for WebSockets in TypeScript: it takes two numbers and returns their sum. Log the result of calling it with 8 and 9.",
            starterCode: "function webSocketsTypeScript(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(webSocketsTypeScript(8, 9));",
            solution: "function webSocketsTypeScript(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(webSocketsTypeScript(8, 9));",
            solutionExplanation: "The function returns 8 + 9 = 17, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "17", hidden: false },
              { name: "Output contains the expected value", expectedContains: "17", hidden: true }
            ],
            hintNotes: { concept: "The `webSocketsTypeScript` code models WebSockets in TypeScript with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-realtime-apps-m1-l2",
          slug: "ts-realtime-apps-m1-l2",
          title: "Rooms and channels",
          concept: "Real-time servers group connections into rooms or channels so a message reaches only the clients that subscribed to it. Mastering it makes your real-time application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"rooms\", 2));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Rooms and channels can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Rooms and channels logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the roomsChannels function",
            type: "build-function",
            instructions: "Write a function named `roomsChannels` for Rooms and channels: it takes two numbers and returns their product. Log the result of calling it with 2 and 3.",
            starterCode: "function roomsChannels(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(roomsChannels(2, 3));",
            solution: "function roomsChannels(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(roomsChannels(2, 3));",
            solutionExplanation: "The function returns 2 * 3 = 6, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "6", hidden: false },
              { name: "Output contains the expected value", expectedContains: "6", hidden: true }
            ],
            hintNotes: { concept: "The `roomsChannels` code models Rooms and channels with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-realtime-apps-m1-l3",
          slug: "ts-realtime-apps-m1-l3",
          title: "Presence tracking",
          concept: "Presence tracks which users are currently online in a room, usually with heartbeat messages that expire when a client disconnects. In this track you apply it while building real-time application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];",
          exampleCode: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Presence tracking.",
          bug: { prompt: "This loop for Presence tracking produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Presence tracking",
            type: "multiple-choice",
            instructions: "Which statement about Presence tracking is correct?",
            starterCode: "",
            solution: "Presence tracks which users are currently online in a room, usually with heartbeat messages that expire when a client disconnects.",
            solutionExplanation: "Presence tracks which users are currently online in a room, usually with heartbeat messages that expire when a client disconnects. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Presence tracks which users are currently online in a room, usually with heartbeat messages that expire when a client disconnects.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Presence tracking really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Presence tracking can only be used once in a program.", "Presence tracking requires a separate paid licence to use.", "Presence tracks which users are currently online in a room, usually with heartbeat messages that expire when a client disconnects.", "Presence tracking is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-realtime-apps-m1-l4",
          slug: "ts-realtime-apps-m1-l4",
          title: "Broadcasting updates",
          concept: "Broadcasting sends one update to every subscriber of a channel, which is how live feeds and chat rooms stay in sync. Mastering it makes your real-time application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 8, beta: 4 };",
          exampleCode: "const config: Record<string, number> = { alpha: 8, beta: 4 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Broadcasting updates, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Broadcasting updates changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the broadcastingUpdates function",
            type: "build-function",
            instructions: "Write a function named `broadcastingUpdates` for Broadcasting updates: it takes two numbers and returns the first minus the second. Log the result of calling it with 15 and 7.",
            starterCode: "function broadcastingUpdates(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(broadcastingUpdates(15, 7));",
            solution: "function broadcastingUpdates(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(broadcastingUpdates(15, 7));",
            solutionExplanation: "The function returns 15 - 7 = 8, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "8", hidden: false },
              { name: "Output contains the expected value", expectedContains: "8", hidden: true }
            ],
            hintNotes: { concept: "The `broadcastingUpdates` code models Broadcasting updates with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-realtime-apps-m1-l5",
          slug: "ts-realtime-apps-m1-l5",
          title: "Reconnection strategies",
          concept: "A robust real-time client reconnects automatically after a dropped connection and re-subscribes to its channels. In this track you apply it while building real-time application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 2 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Reconnection strategies code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Reconnection strategies crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the reconnectionStrategies function",
            type: "build-function",
            instructions: "Write a function named `reconnectionStrategies` for Reconnection strategies: it takes three numbers and returns a * b + c. Log the result of calling it with 2, 9 and 6.",
            starterCode: "function reconnectionStrategies(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(reconnectionStrategies(2, 9, 6));",
            solution: "function reconnectionStrategies(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(reconnectionStrategies(2, 9, 6));",
            solutionExplanation: "The function returns 2 * 9 + 6 = 24, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "24", hidden: false },
              { name: "Output contains the expected value", expectedContains: "24", hidden: true }
            ],
            hintNotes: { concept: "The `reconnectionStrategies` code models Reconnection strategies with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-realtime-apps-m2",
        title: "Real-Time Apps in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-realtime-apps-m2-l1",
          slug: "ts-realtime-apps-m2-l1",
          title: "Handling out-of-order messages",
          concept: "Real-time messages can arrive out of order, so clients sequence them with ids or timestamps before applying them. Mastering it makes your real-time application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"handling\", 5));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Handling out-of-order messages is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Handling out-of-order messages prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Handling out-of-order messages",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: lambda, theta, zeta, alpha, beta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"lambda\", \"theta\", \"zeta\", \"alpha\", \"beta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 5 items, so items.length is 5.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Handling out-of-order messages with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-realtime-apps-m2-l2",
          slug: "ts-realtime-apps-m2-l2",
          title: "Backpressure",
          concept: "Backpressure is the strategy a server uses when clients cannot keep up, such as dropping or batching messages instead of buffering forever. In this track you apply it while building real-time application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];",
          exampleCode: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Backpressure values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Backpressure: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Backpressure",
            type: "multiple-choice",
            instructions: "Which statement about Backpressure is correct?",
            starterCode: "",
            solution: "Backpressure is the strategy a server uses when clients cannot keep up, such as dropping or batching messages instead of buffering forever.",
            solutionExplanation: "Backpressure is the strategy a server uses when clients cannot keep up, such as dropping or batching messages instead of buffering forever. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Backpressure is the strategy a server uses when clients cannot keep up, such as dropping or batching messages instead of buffering forever.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Backpressure really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Backpressure can only be used once in a program.", "Backpressure requires a separate paid licence to use.", "Backpressure is not available in TypeScript.", "Backpressure is the strategy a server uses when clients cannot keep up, such as dropping or batching messages instead of buffering forever."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-realtime-apps-m2-l3",
          slug: "ts-realtime-apps-m2-l3",
          title: "Scaling real-time servers",
          concept: "Real-time servers scale by sharing state through a broker such as Redis, so any server can reach any connected client. Mastering it makes your real-time application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 2, beta: 8 };",
          exampleCode: "const config: Record<string, number> = { alpha: 2, beta: 8 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Scaling real-time servers can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Scaling real-time servers logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Scaling real-time servers",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"ZETA - ALPHA - BETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "ZETA - ALPHA - BETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "ZETA - ALPHA - BETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Scaling real-time servers with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-realtime-apps-m2-l4",
          slug: "ts-realtime-apps-m2-l4",
          title: "Typing real-time messages",
          concept: "Typing every real-time message as a discriminated union lets the compiler prove the client handles each message kind. In this track you apply it while building real-time application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 5 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Typing real-time messages.",
          bug: { prompt: "This loop for Typing real-time messages produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Typing real-time messages",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(8 * 6 + 8);",
            starterCode: "",
            solution: "56",
            solutionExplanation: "The program computes 8 * 6 + 8 = 56.",
            tests: [
              { name: "Correct answer", expectedContains: "56", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 8 * 6, then add 8.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["48", "22", "56", "40"],
            answerIndex: 2,
          }
        },
        {
          id: "ts-realtime-apps-m2-l5",
          slug: "ts-realtime-apps-m2-l5",
          title: "Testing real-time features",
          concept: "Real-time features are tested by connecting two clients and asserting that a message sent by one arrives at the other. Mastering it makes your real-time application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"testing\", 8));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Testing real-time features, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Testing real-time features changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the TestingRealtime config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `TestingRealtimeConfig` for Testing real-time features with name \"beta\", retries 8 and enabled false, then log it with JSON.stringify.",
            starterCode: "type TestingRealtimeConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: TestingRealtimeConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type TestingRealtimeConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: TestingRealtimeConfig = { name: \"beta\", retries: 8, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"beta\",\"retries\":8,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"beta\",\"retries\":8,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"beta\",\"retries\":8,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Testing real-time features with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: real-time application progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your real-time application project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 6 of 8 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 8, done: 6, rate: completionRate(6, 8) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(6, 8) is Math.round((6 / 8) * 100) = 75, so the summary stringifies to {\"tasks\":8,\"done\":6,\"rate\":75}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":8,\"done\":6,\"rate\":75}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":75", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Real-Time Apps in TypeScript Capstone Project",
      description: "Build a small working real-time application application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core real-time application features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-pwa",
    slug: "ts-pwa",
    language: "typescript",
    category: "languages",
    title: "PWA with TypeScript",
    description: "Advanced TypeScript: turn a TypeScript web app into an installable, offline-capable progressive web app",
    difficulty: "Advanced",
    estimatedHours: 16,
    skills: ["Web app manifest", "Service workers", "Cache strategies", "Offline-first data", "Push notifications", "Lighthouse audits"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like building a house that works even when the power goes out",
    modules: [
      {
        id: "ts-pwa-m1",
        title: "PWA with TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-pwa-m1-l1",
          slug: "ts-pwa-m1-l1",
          title: "What makes an app a PWA",
          concept: "A progressive web app is a website that can be installed, works offline, and feels like a native app. In this track you apply it while building progressive web app features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 9 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for What makes an app a PWA values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about What makes an app a PWA: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the whatMakes function",
            type: "build-function",
            instructions: "Write a function named `whatMakes` for What makes an app a PWA: it takes two numbers and returns their sum. Log the result of calling it with 6 and 6.",
            starterCode: "function whatMakes(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(whatMakes(6, 6));",
            solution: "function whatMakes(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(whatMakes(6, 6));",
            solutionExplanation: "The function returns 6 + 6 = 12, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "12", hidden: false },
              { name: "Output contains the expected value", expectedContains: "12", hidden: true }
            ],
            hintNotes: { concept: "The `whatMakes` code models What makes an app a PWA with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-pwa-m1-l2",
          slug: "ts-pwa-m1-l2",
          title: "The web app manifest",
          concept: "The web app manifest is a JSON file that declares the app's name, icons and display mode so it can be installed. Mastering it makes your progressive web app code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"web\", 3));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in The web app manifest can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about The web app manifest logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the webApp function",
            type: "build-function",
            instructions: "Write a function named `webApp` for The web app manifest: it takes two numbers and returns their product. Log the result of calling it with 9 and 8.",
            starterCode: "function webApp(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(webApp(9, 8));",
            solution: "function webApp(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(webApp(9, 8));",
            solutionExplanation: "The function returns 9 * 8 = 72, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "72", hidden: false },
              { name: "Output contains the expected value", expectedContains: "72", hidden: true }
            ],
            hintNotes: { concept: "The `webApp` code models The web app manifest with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-pwa-m1-l3",
          slug: "ts-pwa-m1-l3",
          title: "Service workers",
          concept: "A service worker is a script that runs in the background and intercepts network requests, which is what makes offline support possible. In this track you apply it while building progressive web app features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];",
          exampleCode: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Service workers.",
          bug: { prompt: "This loop for Service workers produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Service workers",
            type: "multiple-choice",
            instructions: "Which statement about Service workers is correct?",
            starterCode: "",
            solution: "A service worker is a script that runs in the background and intercepts network requests, which is what makes offline support possible.",
            solutionExplanation: "A service worker is a script that runs in the background and intercepts network requests, which is what makes offline support possible. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A service worker is a script that runs in the background and intercepts network requests, which is what makes offline support possible.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Service workers really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Service workers can only be used once in a program.", "Service workers requires a separate paid licence to use.", "Service workers is not available in TypeScript.", "A service worker is a script that runs in the background and intercepts network requests, which is what makes offline support possible."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-pwa-m1-l4",
          slug: "ts-pwa-m1-l4",
          title: "Cache strategies",
          concept: "A cache strategy decides which requests the service worker serves from cache and which it fetches from the network. Mastering it makes your progressive web app code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 9, beta: 6 };",
          exampleCode: "const config: Record<string, number> = { alpha: 9, beta: 6 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Cache strategies, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Cache strategies changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the cacheStrategies function",
            type: "build-function",
            instructions: "Write a function named `cacheStrategies` for Cache strategies: it takes two numbers and returns the first minus the second. Log the result of calling it with 13 and 4.",
            starterCode: "function cacheStrategies(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(cacheStrategies(13, 4));",
            solution: "function cacheStrategies(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(cacheStrategies(13, 4));",
            solutionExplanation: "The function returns 13 - 4 = 9, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "9", hidden: false },
              { name: "Output contains the expected value", expectedContains: "9", hidden: true }
            ],
            hintNotes: { concept: "The `cacheStrategies` code models Cache strategies with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-pwa-m1-l5",
          slug: "ts-pwa-m1-l5",
          title: "Offline-first data",
          concept: "Offline-first apps store data locally first and sync it to the server when the connection returns. In this track you apply it while building progressive web app features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 3 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Offline-first data code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Offline-first data crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the offlinefirstData function",
            type: "build-function",
            instructions: "Write a function named `offlinefirstData` for Offline-first data: it takes three numbers and returns a * b + c. Log the result of calling it with 9, 6 and 3.",
            starterCode: "function offlinefirstData(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(offlinefirstData(9, 6, 3));",
            solution: "function offlinefirstData(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(offlinefirstData(9, 6, 3));",
            solutionExplanation: "The function returns 9 * 6 + 3 = 57, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "57", hidden: false },
              { name: "Output contains the expected value", expectedContains: "57", hidden: true }
            ],
            hintNotes: { concept: "The `offlinefirstData` code models Offline-first data with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-pwa-m2",
        title: "PWA with TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-pwa-m2-l1",
          slug: "ts-pwa-m2-l1",
          title: "Install prompts",
          concept: "Browsers show an install prompt for PWAs that meet the criteria, letting users add the app to their home screen. Mastering it makes your progressive web app code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"install\", 6));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Install prompts is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Install prompts prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Install prompts",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: zeta, alpha, beta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"zeta\", \"alpha\", \"beta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 3 items, so items.length is 3.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "3", hidden: false },
              { name: "Output contains the expected value", expectedContains: "3", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Install prompts with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-pwa-m2-l2",
          slug: "ts-pwa-m2-l2",
          title: "Push notifications",
          concept: "Push notifications let a PWA re-engage users with messages delivered by the browser even when the app is closed. In this track you apply it while building progressive web app features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];",
          exampleCode: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Push notifications values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Push notifications: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Push notifications",
            type: "multiple-choice",
            instructions: "Which statement about Push notifications is correct?",
            starterCode: "",
            solution: "Push notifications let a PWA re-engage users with messages delivered by the browser even when the app is closed.",
            solutionExplanation: "Push notifications let a PWA re-engage users with messages delivered by the browser even when the app is closed. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Push notifications let a PWA re-engage users with messages delivered by the browser even when the app is closed.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Push notifications really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Push notifications let a PWA re-engage users with messages delivered by the browser even when the app is closed.", "Push notifications can only be used once in a program.", "Push notifications requires a separate paid licence to use.", "Push notifications is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-pwa-m2-l3",
          slug: "ts-pwa-m2-l3",
          title: "Background sync",
          concept: "Background sync defers work such as form submissions until the device is back online, then replays it automatically. Mastering it makes your progressive web app code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 3, beta: 3 };",
          exampleCode: "const config: Record<string, number> = { alpha: 3, beta: 3 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Background sync can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Background sync logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Background sync",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"beta\", \"gamma\", \"delta\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"beta\", \"gamma\", \"delta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"BETA, GAMMA, DELTA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "BETA, GAMMA, DELTA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "BETA, GAMMA, DELTA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Background sync with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-pwa-m2-l4",
          slug: "ts-pwa-m2-l4",
          title: "App shell architecture",
          concept: "The app shell is the minimal HTML, CSS and JavaScript that renders instantly, with content loaded into it afterwards. In this track you apply it while building progressive web app features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 6 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for App shell architecture.",
          bug: { prompt: "This loop for App shell architecture produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: App shell architecture",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(4 * 7 + 5);",
            starterCode: "",
            solution: "33",
            solutionExplanation: "The program computes 4 * 7 + 5 = 33.",
            tests: [
              { name: "Correct answer", expectedContains: "33", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 4 * 7, then add 5.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["28", "16", "23", "33"],
            answerIndex: 3,
          }
        },
        {
          id: "ts-pwa-m2-l5",
          slug: "ts-pwa-m2-l5",
          title: "Auditing a PWA",
          concept: "Lighthouse audits a PWA against installability, offline support and performance, and reports exactly what is missing. Mastering it makes your progressive web app code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"auditing\", 9));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Auditing a PWA, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Auditing a PWA changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the AuditingPWA config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `AuditingPWAConfig` for Auditing a PWA with name \"delta\", retries 6 and enabled true, then log it with JSON.stringify.",
            starterCode: "type AuditingPWAConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: AuditingPWAConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type AuditingPWAConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: AuditingPWAConfig = { name: \"delta\", retries: 6, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"delta\",\"retries\":6,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"delta\",\"retries\":6,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"delta\",\"retries\":6,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Auditing a PWA with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: progressive web app progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your progressive web app project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 9 of 10 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 10, done: 9, rate: completionRate(9, 10) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(9, 10) is Math.round((9 / 10) * 100) = 90, so the summary stringifies to {\"tasks\":10,\"done\":9,\"rate\":90}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":10,\"done\":9,\"rate\":90}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":90", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "PWA with TypeScript Capstone Project",
      description: "Build a small working progressive web app application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core progressive web app features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-electron",
    slug: "ts-electron",
    language: "typescript",
    category: "languages",
    title: "Electron Apps in TypeScript",
    description: "Advanced TypeScript: build cross-platform desktop applications with Electron and TypeScript",
    difficulty: "Advanced",
    estimatedHours: 20,
    skills: ["Main and renderer processes", "IPC", "Preload scripts", "Native menus", "Packaging", "Auto-updates"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like building a house with a workshop attached: the living room is the web page and the workshop is the operating system",
    modules: [
      {
        id: "ts-electron-m1",
        title: "Electron Apps in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-electron-m1-l1",
          slug: "ts-electron-m1-l1",
          title: "Main and renderer processes",
          concept: "Electron apps have a main process that owns the operating system and renderer processes that show each window's web page. In this track you apply it while building desktop application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 10 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Main and renderer processes values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Main and renderer processes: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the mainRenderer function",
            type: "build-function",
            instructions: "Write a function named `mainRenderer` for Main and renderer processes: it takes two numbers and returns their sum. Log the result of calling it with 4 and 3.",
            starterCode: "function mainRenderer(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(mainRenderer(4, 3));",
            solution: "function mainRenderer(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(mainRenderer(4, 3));",
            solutionExplanation: "The function returns 4 + 3 = 7, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "7", hidden: false },
              { name: "Output contains the expected value", expectedContains: "7", hidden: true }
            ],
            hintNotes: { concept: "The `mainRenderer` code models Main and renderer processes with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-electron-m1-l2",
          slug: "ts-electron-m1-l2",
          title: "IPC between processes",
          concept: "Inter-process communication lets a renderer ask the main process to do privileged work, such as reading files, over typed channels. Mastering it makes your desktop application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"ipc\", 4));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in IPC between processes can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about IPC between processes logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the iPCBetween function",
            type: "build-function",
            instructions: "Write a function named `iPCBetween` for IPC between processes: it takes two numbers and returns their product. Log the result of calling it with 7 and 5.",
            starterCode: "function iPCBetween(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(iPCBetween(7, 5));",
            solution: "function iPCBetween(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(iPCBetween(7, 5));",
            solutionExplanation: "The function returns 7 * 5 = 35, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "35", hidden: false },
              { name: "Output contains the expected value", expectedContains: "35", hidden: true }
            ],
            hintNotes: { concept: "The `iPCBetween` code models IPC between processes with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-electron-m1-l3",
          slug: "ts-electron-m1-l3",
          title: "Preload scripts",
          concept: "A preload script runs before a page loads and safely exposes a small typed API from the main process to the renderer. In this track you apply it while building desktop application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];",
          exampleCode: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Preload scripts.",
          bug: { prompt: "This loop for Preload scripts produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Preload scripts",
            type: "multiple-choice",
            instructions: "Which statement about Preload scripts is correct?",
            starterCode: "",
            solution: "A preload script runs before a page loads and safely exposes a small typed API from the main process to the renderer.",
            solutionExplanation: "A preload script runs before a page loads and safely exposes a small typed API from the main process to the renderer. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A preload script runs before a page loads and safely exposes a small typed API from the main process to the renderer.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Preload scripts really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["A preload script runs before a page loads and safely exposes a small typed API from the main process to the renderer.", "Preload scripts can only be used once in a program.", "Preload scripts requires a separate paid licence to use.", "Preload scripts is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-electron-m1-l4",
          slug: "ts-electron-m1-l4",
          title: "Native menus",
          concept: "Electron builds native application menus from a template, so the app feels at home on Windows, macOS and Linux. Mastering it makes your desktop application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 10, beta: 8 };",
          exampleCode: "const config: Record<string, number> = { alpha: 10, beta: 8 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Native menus, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Native menus changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the nativeMenus function",
            type: "build-function",
            instructions: "Write a function named `nativeMenus` for Native menus: it takes two numbers and returns the first minus the second. Log the result of calling it with 11 and 9.",
            starterCode: "function nativeMenus(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(nativeMenus(11, 9));",
            solution: "function nativeMenus(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(nativeMenus(11, 9));",
            solutionExplanation: "The function returns 11 - 9 = 2, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "2", hidden: false },
              { name: "Output contains the expected value", expectedContains: "2", hidden: true }
            ],
            hintNotes: { concept: "The `nativeMenus` code models Native menus with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-electron-m1-l5",
          slug: "ts-electron-m1-l5",
          title: "Packaging an Electron app",
          concept: "Packaging bundles an Electron app with its runtime into an installer or executable for each target operating system. In this track you apply it while building desktop application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 4 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Packaging an Electron app code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Packaging an Electron app crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the packagingElectron function",
            type: "build-function",
            instructions: "Write a function named `packagingElectron` for Packaging an Electron app: it takes three numbers and returns a * b + c. Log the result of calling it with 7, 3 and 6.",
            starterCode: "function packagingElectron(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(packagingElectron(7, 3, 6));",
            solution: "function packagingElectron(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(packagingElectron(7, 3, 6));",
            solutionExplanation: "The function returns 7 * 3 + 6 = 27, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "27", hidden: false },
              { name: "Output contains the expected value", expectedContains: "27", hidden: true }
            ],
            hintNotes: { concept: "The `packagingElectron` code models Packaging an Electron app with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-electron-m2",
        title: "Electron Apps in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-electron-m2-l1",
          slug: "ts-electron-m2-l1",
          title: "Auto-updates",
          concept: "Electron auto-update downloads a new release in the background and installs it on the next launch. Mastering it makes your desktop application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"autoupdates\", 7));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Auto-updates is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Auto-updates prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Auto-updates",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: beta, gamma, delta, sigma. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"beta\", \"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 4 items, so items.length is 4.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "4", hidden: false },
              { name: "Output contains the expected value", expectedContains: "4", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Auto-updates with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-electron-m2-l2",
          slug: "ts-electron-m2-l2",
          title: "Securing Electron apps",
          concept: "Secure Electron apps disable Node integration in renderers and expose only a minimal API through context isolation. In this track you apply it while building desktop application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];",
          exampleCode: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Securing Electron apps values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Securing Electron apps: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Securing Electron apps",
            type: "multiple-choice",
            instructions: "Which statement about Securing Electron apps is correct?",
            starterCode: "",
            solution: "Secure Electron apps disable Node integration in renderers and expose only a minimal API through context isolation.",
            solutionExplanation: "Secure Electron apps disable Node integration in renderers and expose only a minimal API through context isolation. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Secure Electron apps disable Node integration in renderers and expose only a minimal API through context isolation.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Securing Electron apps really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Securing Electron apps can only be used once in a program.", "Secure Electron apps disable Node integration in renderers and expose only a minimal API through context isolation.", "Securing Electron apps requires a separate paid licence to use.", "Securing Electron apps is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-electron-m2-l3",
          slug: "ts-electron-m2-l3",
          title: "System tray apps",
          concept: "Electron can run an app from the system tray, keeping it available without an open window. Mastering it makes your desktop application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 4, beta: 5 };",
          exampleCode: "const config: Record<string, number> = { alpha: 4, beta: 5 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in System tray apps can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about System tray apps logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for System tray apps",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"delta\", \"sigma\", \"omega\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"delta\", \"sigma\", \"omega\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"DELTA - SIGMA - OMEGA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "DELTA - SIGMA - OMEGA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "DELTA - SIGMA - OMEGA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models System tray apps with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-electron-m2-l4",
          slug: "ts-electron-m2-l4",
          title: "Native dialogs",
          concept: "Electron's dialog module opens native file pickers and message boxes from the main process. In this track you apply it while building desktop application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 7 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Native dialogs.",
          bug: { prompt: "This loop for Native dialogs produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Native dialogs",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(7 * 2 + 2);",
            starterCode: "",
            solution: "16",
            solutionExplanation: "The program computes 7 * 2 + 2 = 16.",
            tests: [
              { name: "Correct answer", expectedContains: "16", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 7 * 2, then add 2.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["16", "14", "11", "12"],
            answerIndex: 0,
          }
        },
        {
          id: "ts-electron-m2-l5",
          slug: "ts-electron-m2-l5",
          title: "Testing Electron apps",
          concept: "Electron apps are tested by driving the real windows with automation tools that click and assert like a user. Mastering it makes your desktop application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"testing\", 10));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Testing Electron apps, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Testing Electron apps changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the TestingElectron config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `TestingElectronConfig` for Testing Electron apps with name \"omega\", retries 4 and enabled false, then log it with JSON.stringify.",
            starterCode: "type TestingElectronConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: TestingElectronConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type TestingElectronConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: TestingElectronConfig = { name: \"omega\", retries: 4, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"omega\",\"retries\":4,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"omega\",\"retries\":4,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"omega\",\"retries\":4,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Testing Electron apps with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: desktop application progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your desktop application project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 3 of 4 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 4, done: 3, rate: completionRate(3, 4) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(3, 4) is Math.round((3 / 4) * 100) = 75, so the summary stringifies to {\"tasks\":4,\"done\":3,\"rate\":75}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":4,\"done\":3,\"rate\":75}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":75", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Electron Apps in TypeScript Capstone Project",
      description: "Build a small working desktop application application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core desktop application features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-react-native",
    slug: "ts-react-native",
    language: "typescript",
    category: "languages",
    title: "React Native with TypeScript",
    description: "Advanced TypeScript: build native iOS and Android apps with React Native and TypeScript",
    difficulty: "Advanced",
    estimatedHours: 18,
    skills: ["Native components", "StyleSheet", "Navigation", "FlatList", "Native modules", "Store builds"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like learning one dance that works on two different stages",
    modules: [
      {
        id: "ts-react-native-m1",
        title: "React Native with TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-react-native-m1-l1",
          slug: "ts-react-native-m1-l1",
          title: "React Native components",
          concept: "React Native renders real native views from React components, so a View becomes a native view on each platform. In this track you apply it while building mobile application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 2 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for React Native components values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about React Native components: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the reactNative function",
            type: "build-function",
            instructions: "Write a function named `reactNative` for React Native components: it takes two numbers and returns their sum. Log the result of calling it with 2 and 8.",
            starterCode: "function reactNative(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(reactNative(2, 8));",
            solution: "function reactNative(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(reactNative(2, 8));",
            solutionExplanation: "The function returns 2 + 8 = 10, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "10", hidden: false },
              { name: "Output contains the expected value", expectedContains: "10", hidden: true }
            ],
            hintNotes: { concept: "The `reactNative` code models React Native components with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-react-native-m1-l2",
          slug: "ts-react-native-m1-l2",
          title: "Styling with StyleSheet",
          concept: "React Native styles components with JavaScript style objects, using flexbox layout instead of CSS. Mastering it makes your mobile application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"styling\", 5));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Styling with StyleSheet can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Styling with StyleSheet logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the stylingStyleSheet function",
            type: "build-function",
            instructions: "Write a function named `stylingStyleSheet` for Styling with StyleSheet: it takes two numbers and returns their product. Log the result of calling it with 5 and 10.",
            starterCode: "function stylingStyleSheet(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(stylingStyleSheet(5, 10));",
            solution: "function stylingStyleSheet(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(stylingStyleSheet(5, 10));",
            solutionExplanation: "The function returns 5 * 10 = 50, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "50", hidden: false },
              { name: "Output contains the expected value", expectedContains: "50", hidden: true }
            ],
            hintNotes: { concept: "The `stylingStyleSheet` code models Styling with StyleSheet with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-react-native-m1-l3",
          slug: "ts-react-native-m1-l3",
          title: "Platform-specific code",
          concept: "React Native picks platform-specific files such as Button.ios.tsx automatically, so iOS and Android can differ where needed. In this track you apply it while building mobile application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];",
          exampleCode: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Platform-specific code.",
          bug: { prompt: "This loop for Platform-specific code produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Platform-specific code",
            type: "multiple-choice",
            instructions: "Which statement about Platform-specific code is correct?",
            starterCode: "",
            solution: "React Native picks platform-specific files such as Button.ios.tsx automatically, so iOS and Android can differ where needed.",
            solutionExplanation: "React Native picks platform-specific files such as Button.ios.tsx automatically, so iOS and Android can differ where needed. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "React Native picks platform-specific files such as Button.ios.tsx automatically, so iOS and Android can differ where needed.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Platform-specific code really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Platform-specific code can only be used once in a program.", "React Native picks platform-specific files such as Button.ios.tsx automatically, so iOS and Android can differ where needed.", "Platform-specific code requires a separate paid licence to use.", "Platform-specific code is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-react-native-m1-l4",
          slug: "ts-react-native-m1-l4",
          title: "Navigation in React Native",
          concept: "React Native navigation uses a stack of screens, and each screen receives typed route parameters from the navigator. Mastering it makes your mobile application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 2, beta: 3 };",
          exampleCode: "const config: Record<string, number> = { alpha: 2, beta: 3 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Navigation in React Native, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Navigation in React Native changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the navigationReact function",
            type: "build-function",
            instructions: "Write a function named `navigationReact` for Navigation in React Native: it takes two numbers and returns the first minus the second. Log the result of calling it with 9 and 6.",
            starterCode: "function navigationReact(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(navigationReact(9, 6));",
            solution: "function navigationReact(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(navigationReact(9, 6));",
            solutionExplanation: "The function returns 9 - 6 = 3, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "3", hidden: false },
              { name: "Output contains the expected value", expectedContains: "3", hidden: true }
            ],
            hintNotes: { concept: "The `navigationReact` code models Navigation in React Native with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-react-native-m1-l5",
          slug: "ts-react-native-m1-l5",
          title: "Lists and FlatList",
          concept: "FlatList renders long lists efficiently by only mounting the rows currently visible on screen. In this track you apply it while building mobile application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 5 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Lists and FlatList code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Lists and FlatList crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the listsFlatList function",
            type: "build-function",
            instructions: "Write a function named `listsFlatList` for Lists and FlatList: it takes three numbers and returns a * b + c. Log the result of calling it with 5, 8 and 3.",
            starterCode: "function listsFlatList(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(listsFlatList(5, 8, 3));",
            solution: "function listsFlatList(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(listsFlatList(5, 8, 3));",
            solutionExplanation: "The function returns 5 * 8 + 3 = 43, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "43", hidden: false },
              { name: "Output contains the expected value", expectedContains: "43", hidden: true }
            ],
            hintNotes: { concept: "The `listsFlatList` code models Lists and FlatList with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-react-native-m2",
        title: "React Native with TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-react-native-m2-l1",
          slug: "ts-react-native-m2-l1",
          title: "Handling gestures",
          concept: "React Native handles touches and gestures through responders and gesture libraries that report swipes, taps and pans. Mastering it makes your mobile application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"handling\", 8));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Handling gestures is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Handling gestures prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Handling gestures",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: delta, sigma, omega, kappa, lambda. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"delta\", \"sigma\", \"omega\", \"kappa\", \"lambda\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 5 items, so items.length is 5.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Handling gestures with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-react-native-m2-l2",
          slug: "ts-react-native-m2-l2",
          title: "Native modules",
          concept: "Native modules let TypeScript code call platform APIs written in Swift, Kotlin or C++ when JavaScript cannot reach them. In this track you apply it while building mobile application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];",
          exampleCode: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Native modules values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Native modules: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Native modules",
            type: "multiple-choice",
            instructions: "Which statement about Native modules is correct?",
            starterCode: "",
            solution: "Native modules let TypeScript code call platform APIs written in Swift, Kotlin or C++ when JavaScript cannot reach them.",
            solutionExplanation: "Native modules let TypeScript code call platform APIs written in Swift, Kotlin or C++ when JavaScript cannot reach them. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Native modules let TypeScript code call platform APIs written in Swift, Kotlin or C++ when JavaScript cannot reach them.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Native modules really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Native modules can only be used once in a program.", "Native modules requires a separate paid licence to use.", "Native modules let TypeScript code call platform APIs written in Swift, Kotlin or C++ when JavaScript cannot reach them.", "Native modules is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-react-native-m2-l3",
          slug: "ts-react-native-m2-l3",
          title: "Async storage",
          concept: "AsyncStorage persists small key-value data on the device, such as a login token or user preferences. Mastering it makes your mobile application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 5, beta: 7 };",
          exampleCode: "const config: Record<string, number> = { alpha: 5, beta: 7 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Async storage can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Async storage logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Async storage",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"omega\", \"kappa\", \"lambda\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"omega\", \"kappa\", \"lambda\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"OMEGA, KAPPA, LAMBDA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "OMEGA, KAPPA, LAMBDA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "OMEGA, KAPPA, LAMBDA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Async storage with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-react-native-m2-l4",
          slug: "ts-react-native-m2-l4",
          title: "Debugging on device",
          concept: "React Native apps are debugged on a real device or emulator with the same inspector and console as web development. In this track you apply it while building mobile application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 8 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Debugging on device.",
          bug: { prompt: "This loop for Debugging on device produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Debugging on device",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(3 * 3 + 7);",
            starterCode: "",
            solution: "16",
            solutionExplanation: "The program computes 3 * 3 + 7 = 16.",
            tests: [
              { name: "Correct answer", expectedContains: "16", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 3 * 3, then add 7.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["9", "16", "13", "2"],
            answerIndex: 1,
          }
        },
        {
          id: "ts-react-native-m2-l5",
          slug: "ts-react-native-m2-l5",
          title: "Building for the stores",
          concept: "Releasing a React Native app means producing signed iOS and Android builds and submitting them to the App Store and Google Play. Mastering it makes your mobile application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"building\", 2));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Building for the stores, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Building for the stores changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the BuildingStores config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `BuildingStoresConfig` for Building for the stores with name \"lambda\", retries 2 and enabled true, then log it with JSON.stringify.",
            starterCode: "type BuildingStoresConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: BuildingStoresConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type BuildingStoresConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: BuildingStoresConfig = { name: \"lambda\", retries: 2, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"lambda\",\"retries\":2,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"lambda\",\"retries\":2,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"lambda\",\"retries\":2,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Building for the stores with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: mobile application progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your mobile application project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 1 of 2 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 2, done: 1, rate: completionRate(1, 2) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(1, 2) is Math.round((1 / 2) * 100) = 50, so the summary stringifies to {\"tasks\":2,\"done\":1,\"rate\":50}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":2,\"done\":1,\"rate\":50}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":50", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "React Native with TypeScript Capstone Project",
      description: "Build a small working mobile application application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core mobile application features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-threejs",
    slug: "ts-threejs",
    language: "typescript",
    category: "languages",
    title: "Three.js & TypeScript",
    description: "Advanced TypeScript: create interactive 3D graphics on the web with Three.js and TypeScript",
    difficulty: "Advanced",
    estimatedHours: 18,
    skills: ["Scenes and cameras", "Geometry and materials", "Lighting", "Animation loops", "Raycasting", "Performance optimisation"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like building a theatre set: the stage, the lights and the actors all have to agree on the scene",
    modules: [
      {
        id: "ts-threejs-m1",
        title: "Three.js & TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-threejs-m1-l1",
          slug: "ts-threejs-m1-l1",
          title: "Scenes and renderers",
          concept: "A Three.js scene holds every 3D object, and the renderer draws the scene from a camera onto a canvas. In this track you apply it while building 3D web application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 3 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Scenes and renderers values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Scenes and renderers: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the scenesRenderers function",
            type: "build-function",
            instructions: "Write a function named `scenesRenderers` for Scenes and renderers: it takes two numbers and returns their sum. Log the result of calling it with 9 and 5.",
            starterCode: "function scenesRenderers(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(scenesRenderers(9, 5));",
            solution: "function scenesRenderers(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(scenesRenderers(9, 5));",
            solutionExplanation: "The function returns 9 + 5 = 14, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "14", hidden: false },
              { name: "Output contains the expected value", expectedContains: "14", hidden: true }
            ],
            hintNotes: { concept: "The `scenesRenderers` code models Scenes and renderers with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-threejs-m1-l2",
          slug: "ts-threejs-m1-l2",
          title: "Geometry and materials",
          concept: "Geometry defines a shape's vertices and materials define how its surface reacts to light. Mastering it makes your 3D web application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"geometry\", 6));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Geometry and materials can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Geometry and materials logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the geometryMaterials function",
            type: "build-function",
            instructions: "Write a function named `geometryMaterials` for Geometry and materials: it takes two numbers and returns their product. Log the result of calling it with 3 and 7.",
            starterCode: "function geometryMaterials(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(geometryMaterials(3, 7));",
            solution: "function geometryMaterials(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(geometryMaterials(3, 7));",
            solutionExplanation: "The function returns 3 * 7 = 21, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "21", hidden: false },
              { name: "Output contains the expected value", expectedContains: "21", hidden: true }
            ],
            hintNotes: { concept: "The `geometryMaterials` code models Geometry and materials with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-threejs-m1-l3",
          slug: "ts-threejs-m1-l3",
          title: "Cameras in Three.js",
          concept: "A perspective camera mimics the human eye, making distant objects smaller, while an orthographic camera keeps sizes constant. In this track you apply it while building 3D web application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];",
          exampleCode: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Cameras in Three.js.",
          bug: { prompt: "This loop for Cameras in Three.js produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Cameras in Three.js",
            type: "multiple-choice",
            instructions: "Which statement about Cameras in Three.js is correct?",
            starterCode: "",
            solution: "A perspective camera mimics the human eye, making distant objects smaller, while an orthographic camera keeps sizes constant.",
            solutionExplanation: "A perspective camera mimics the human eye, making distant objects smaller, while an orthographic camera keeps sizes constant. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A perspective camera mimics the human eye, making distant objects smaller, while an orthographic camera keeps sizes constant.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Cameras in Three.js really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Cameras in Three.js can only be used once in a program.", "Cameras in Three.js requires a separate paid licence to use.", "A perspective camera mimics the human eye, making distant objects smaller, while an orthographic camera keeps sizes constant.", "Cameras in Three.js is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-threejs-m1-l4",
          slug: "ts-threejs-m1-l4",
          title: "Lighting a scene",
          concept: "Lights such as directional and point lights illuminate a scene, and shadows appear only where a light casts them. Mastering it makes your 3D web application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 3, beta: 5 };",
          exampleCode: "const config: Record<string, number> = { alpha: 3, beta: 5 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Lighting a scene, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Lighting a scene changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the lightingScene function",
            type: "build-function",
            instructions: "Write a function named `lightingScene` for Lighting a scene: it takes two numbers and returns the first minus the second. Log the result of calling it with 16 and 3.",
            starterCode: "function lightingScene(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(lightingScene(16, 3));",
            solution: "function lightingScene(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(lightingScene(16, 3));",
            solutionExplanation: "The function returns 16 - 3 = 13, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "13", hidden: false },
              { name: "Output contains the expected value", expectedContains: "13", hidden: true }
            ],
            hintNotes: { concept: "The `lightingScene` code models Lighting a scene with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-threejs-m1-l5",
          slug: "ts-threejs-m1-l5",
          title: "Animation loops",
          concept: "Three.js animates by updating object positions inside a requestAnimationFrame loop and re-rendering each frame. In this track you apply it while building 3D web application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 6 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Animation loops code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Animation loops crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the animationLoops function",
            type: "build-function",
            instructions: "Write a function named `animationLoops` for Animation loops: it takes three numbers and returns a * b + c. Log the result of calling it with 3, 5 and 6.",
            starterCode: "function animationLoops(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(animationLoops(3, 5, 6));",
            solution: "function animationLoops(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(animationLoops(3, 5, 6));",
            solutionExplanation: "The function returns 3 * 5 + 6 = 21, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "21", hidden: false },
              { name: "Output contains the expected value", expectedContains: "21", hidden: true }
            ],
            hintNotes: { concept: "The `animationLoops` code models Animation loops with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-threejs-m2",
        title: "Three.js & TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-threejs-m2-l1",
          slug: "ts-threejs-m2-l1",
          title: "Loading 3D models",
          concept: "Three.js loads external models such as glTF files with loaders that return typed scene objects ready to add. Mastering it makes your 3D web application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"loading\", 9));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Loading 3D models is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Loading 3D models prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Loading 3D models",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: omega, kappa, lambda. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"omega\", \"kappa\", \"lambda\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 3 items, so items.length is 3.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "3", hidden: false },
              { name: "Output contains the expected value", expectedContains: "3", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Loading 3D models with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-threejs-m2-l2",
          slug: "ts-threejs-m2-l2",
          title: "Raycasting",
          concept: "Raycasting casts an invisible ray from the camera through the pointer to find which 3D object the user clicked. In this track you apply it while building 3D web application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];",
          exampleCode: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Raycasting values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Raycasting: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Raycasting",
            type: "multiple-choice",
            instructions: "Which statement about Raycasting is correct?",
            starterCode: "",
            solution: "Raycasting casts an invisible ray from the camera through the pointer to find which 3D object the user clicked.",
            solutionExplanation: "Raycasting casts an invisible ray from the camera through the pointer to find which 3D object the user clicked. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Raycasting casts an invisible ray from the camera through the pointer to find which 3D object the user clicked.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Raycasting really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Raycasting can only be used once in a program.", "Raycasting requires a separate paid licence to use.", "Raycasting is not available in TypeScript.", "Raycasting casts an invisible ray from the camera through the pointer to find which 3D object the user clicked."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-threejs-m2-l3",
          slug: "ts-threejs-m2-l3",
          title: "Textures",
          concept: "Textures are images wrapped onto geometry, and their repeat and filtering settings control how they look up close. Mastering it makes your 3D web application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 6, beta: 9 };",
          exampleCode: "const config: Record<string, number> = { alpha: 6, beta: 9 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Textures can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Textures logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Textures",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"LAMBDA - THETA - ZETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "LAMBDA - THETA - ZETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "LAMBDA - THETA - ZETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Textures with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-threejs-m2-l4",
          slug: "ts-threejs-m2-l4",
          title: "Shadows in Three.js",
          concept: "Shadows in Three.js need a light with shadow casting enabled, a surface that receives them, and a shadow map size. In this track you apply it while building 3D web application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 9 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Shadows in Three.js.",
          bug: { prompt: "This loop for Shadows in Three.js produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Shadows in Three.js",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(6 * 4 + 4);",
            starterCode: "",
            solution: "28",
            solutionExplanation: "The program computes 6 * 4 + 4 = 28.",
            tests: [
              { name: "Correct answer", expectedContains: "28", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 6 * 4, then add 4.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["24", "14", "28", "20"],
            answerIndex: 2,
          }
        },
        {
          id: "ts-threejs-m2-l5",
          slug: "ts-threejs-m2-l5",
          title: "Optimising 3D scenes",
          concept: "Large scenes stay fast by reusing geometries and materials, limiting draw calls, and culling objects outside the camera. Mastering it makes your 3D web application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"optimising\", 3));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Optimising 3D scenes, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Optimising 3D scenes changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the Optimising3D config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `Optimising3DConfig` for Optimising 3D scenes with name \"zeta\", retries 9 and enabled false, then log it with JSON.stringify.",
            starterCode: "type Optimising3DConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: Optimising3DConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type Optimising3DConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: Optimising3DConfig = { name: \"zeta\", retries: 9, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"zeta\",\"retries\":9,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"zeta\",\"retries\":9,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"zeta\",\"retries\":9,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Optimising 3D scenes with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: 3D web application progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your 3D web application project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 7 of 10 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 10, done: 7, rate: completionRate(7, 10) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(7, 10) is Math.round((7 / 10) * 100) = 70, so the summary stringifies to {\"tasks\":10,\"done\":7,\"rate\":70}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":10,\"done\":7,\"rate\":70}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":70", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Three.js & TypeScript Capstone Project",
      description: "Build a small working 3D web application application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core 3D web application features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-d3-visualisation",
    slug: "ts-d3-visualisation",
    language: "typescript",
    category: "languages",
    title: "D3 & Visualisation in TypeScript",
    description: "Advanced TypeScript: build data visualisations with D3, from scales and axes to interactive charts",
    difficulty: "Advanced",
    estimatedHours: 16,
    skills: ["Selections", "Data joins", "Scales", "Axes", "Transitions", "Interactive charts"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like painting with numbers: every brushstroke is placed by the data itself",
    modules: [
      {
        id: "ts-d3-visualisation-m1",
        title: "D3 & Visualisation in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-d3-visualisation-m1-l1",
          slug: "ts-d3-visualisation-m1-l1",
          title: "Selections in D3",
          concept: "D3 selections pick DOM elements and bind data to them, so each datum controls one element's attributes. In this track you apply it while building data visualisation features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 4 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Selections in D3 values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Selections in D3: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the selectionsD3 function",
            type: "build-function",
            instructions: "Write a function named `selectionsD3` for Selections in D3: it takes two numbers and returns their sum. Log the result of calling it with 7 and 10.",
            starterCode: "function selectionsD3(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(selectionsD3(7, 10));",
            solution: "function selectionsD3(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(selectionsD3(7, 10));",
            solutionExplanation: "The function returns 7 + 10 = 17, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "17", hidden: false },
              { name: "Output contains the expected value", expectedContains: "17", hidden: true }
            ],
            hintNotes: { concept: "The `selectionsD3` code models Selections in D3 with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-d3-visualisation-m1-l2",
          slug: "ts-d3-visualisation-m1-l2",
          title: "Data joins",
          concept: "A D3 data join matches data to elements, creating new elements for new data and removing elements whose data is gone. Mastering it makes your data visualisation code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"data\", 7));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Data joins can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Data joins logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the dataJoins function",
            type: "build-function",
            instructions: "Write a function named `dataJoins` for Data joins: it takes two numbers and returns their product. Log the result of calling it with 10 and 4.",
            starterCode: "function dataJoins(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(dataJoins(10, 4));",
            solution: "function dataJoins(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(dataJoins(10, 4));",
            solutionExplanation: "The function returns 10 * 4 = 40, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "40", hidden: false },
              { name: "Output contains the expected value", expectedContains: "40", hidden: true }
            ],
            hintNotes: { concept: "The `dataJoins` code models Data joins with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-d3-visualisation-m1-l3",
          slug: "ts-d3-visualisation-m1-l3",
          title: "Scales in D3",
          concept: "D3 scales map data values to visual values, such as turning a number into a pixel position on an axis. In this track you apply it while building data visualisation features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];",
          exampleCode: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Scales in D3.",
          bug: { prompt: "This loop for Scales in D3 produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Scales in D3",
            type: "multiple-choice",
            instructions: "Which statement about Scales in D3 is correct?",
            starterCode: "",
            solution: "D3 scales map data values to visual values, such as turning a number into a pixel position on an axis.",
            solutionExplanation: "D3 scales map data values to visual values, such as turning a number into a pixel position on an axis. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "D3 scales map data values to visual values, such as turning a number into a pixel position on an axis.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Scales in D3 really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Scales in D3 can only be used once in a program.", "Scales in D3 requires a separate paid licence to use.", "Scales in D3 is not available in TypeScript.", "D3 scales map data values to visual values, such as turning a number into a pixel position on an axis."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-d3-visualisation-m1-l4",
          slug: "ts-d3-visualisation-m1-l4",
          title: "Axes in D3",
          concept: "D3 axes draw tick marks and labels from a scale, so a chart's numbers are readable without manual layout. Mastering it makes your data visualisation code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 4, beta: 7 };",
          exampleCode: "const config: Record<string, number> = { alpha: 4, beta: 7 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Axes in D3, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Axes in D3 changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the axesD3 function",
            type: "build-function",
            instructions: "Write a function named `axesD3` for Axes in D3: it takes two numbers and returns the first minus the second. Log the result of calling it with 14 and 8.",
            starterCode: "function axesD3(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(axesD3(14, 8));",
            solution: "function axesD3(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(axesD3(14, 8));",
            solutionExplanation: "The function returns 14 - 8 = 6, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "6", hidden: false },
              { name: "Output contains the expected value", expectedContains: "6", hidden: true }
            ],
            hintNotes: { concept: "The `axesD3` code models Axes in D3 with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-d3-visualisation-m1-l5",
          slug: "ts-d3-visualisation-m1-l5",
          title: "SVG shapes",
          concept: "D3 builds charts from SVG elements such as rects, paths and circles, each positioned by the bound data. In this track you apply it while building data visualisation features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 7 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by SVG shapes code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for SVG shapes crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the sVGShapes function",
            type: "build-function",
            instructions: "Write a function named `sVGShapes` for SVG shapes: it takes three numbers and returns a * b + c. Log the result of calling it with 10, 10 and 3.",
            starterCode: "function sVGShapes(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(sVGShapes(10, 10, 3));",
            solution: "function sVGShapes(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(sVGShapes(10, 10, 3));",
            solutionExplanation: "The function returns 10 * 10 + 3 = 103, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "103", hidden: false },
              { name: "Output contains the expected value", expectedContains: "103", hidden: true }
            ],
            hintNotes: { concept: "The `sVGShapes` code models SVG shapes with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-d3-visualisation-m2",
        title: "D3 & Visualisation in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-d3-visualisation-m2-l1",
          slug: "ts-d3-visualisation-m2-l1",
          title: "Transitions in D3",
          concept: "D3 transitions animate attribute changes over time, so bars grow and points glide instead of jumping. Mastering it makes your data visualisation code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"transitions\", 10));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Transitions in D3 is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Transitions in D3 prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Transitions in D3",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: lambda, theta, zeta, alpha. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"lambda\", \"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 4 items, so items.length is 4.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "4", hidden: false },
              { name: "Output contains the expected value", expectedContains: "4", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Transitions in D3 with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-d3-visualisation-m2-l2",
          slug: "ts-d3-visualisation-m2-l2",
          title: "Line and area charts",
          concept: "D3 line generators turn arrays of points into SVG path strings, and area generators close the shape to the baseline. In this track you apply it while building data visualisation features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];",
          exampleCode: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Line and area charts values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Line and area charts: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Line and area charts",
            type: "multiple-choice",
            instructions: "Which statement about Line and area charts is correct?",
            starterCode: "",
            solution: "D3 line generators turn arrays of points into SVG path strings, and area generators close the shape to the baseline.",
            solutionExplanation: "D3 line generators turn arrays of points into SVG path strings, and area generators close the shape to the baseline. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "D3 line generators turn arrays of points into SVG path strings, and area generators close the shape to the baseline.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Line and area charts really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["D3 line generators turn arrays of points into SVG path strings, and area generators close the shape to the baseline.", "Line and area charts can only be used once in a program.", "Line and area charts requires a separate paid licence to use.", "Line and area charts is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-d3-visualisation-m2-l3",
          slug: "ts-d3-visualisation-m2-l3",
          title: "Interactive tooltips",
          concept: "Tooltips in D3 listen for pointer events on chart elements and show the datum's details near the cursor. Mastering it makes your data visualisation code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 7, beta: 4 };",
          exampleCode: "const config: Record<string, number> = { alpha: 7, beta: 4 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Interactive tooltips can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Interactive tooltips logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Interactive tooltips",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"ZETA, ALPHA, BETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "ZETA, ALPHA, BETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "ZETA, ALPHA, BETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Interactive tooltips with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-d3-visualisation-m2-l4",
          slug: "ts-d3-visualisation-m2-l4",
          title: "Force layouts",
          concept: "D3 force layouts simulate attraction and repulsion between nodes, settling a network graph into a readable arrangement. In this track you apply it while building data visualisation features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 10 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Force layouts.",
          bug: { prompt: "This loop for Force layouts produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Force layouts",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(9 * 5 + 9);",
            starterCode: "",
            solution: "54",
            solutionExplanation: "The program computes 9 * 5 + 9 = 54.",
            tests: [
              { name: "Correct answer", expectedContains: "54", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 9 * 5, then add 9.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["45", "23", "36", "54"],
            answerIndex: 3,
          }
        },
        {
          id: "ts-d3-visualisation-m2-l5",
          slug: "ts-d3-visualisation-m2-l5",
          title: "Accessible visualisations",
          concept: "Accessible charts pair every visual encoding with text, such as labels and a data table, so screen readers can use them. Mastering it makes your data visualisation code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"accessible\", 4));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Accessible visualisations, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Accessible visualisations changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the AccessibleVisualisations config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `AccessibleVisualisationsConfig` for Accessible visualisations with name \"beta\", retries 7 and enabled true, then log it with JSON.stringify.",
            starterCode: "type AccessibleVisualisationsConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: AccessibleVisualisationsConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type AccessibleVisualisationsConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: AccessibleVisualisationsConfig = { name: \"beta\", retries: 7, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"beta\",\"retries\":7,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"beta\",\"retries\":7,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"beta\",\"retries\":7,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Accessible visualisations with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: data visualisation progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your data visualisation project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 18 of 20 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 20, done: 18, rate: completionRate(18, 20) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(18, 20) is Math.round((18 / 20) * 100) = 90, so the summary stringifies to {\"tasks\":20,\"done\":18,\"rate\":90}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":20,\"done\":18,\"rate\":90}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":90", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "D3 & Visualisation in TypeScript Capstone Project",
      description: "Build a small working data visualisation application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core data visualisation features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-webassembly",
    slug: "ts-webassembly",
    language: "typescript",
    category: "languages",
    title: "WebAssembly & TypeScript",
    description: "Advanced TypeScript: run WebAssembly from TypeScript and use it where native speed matters",
    difficulty: "Advanced",
    estimatedHours: 20,
    skills: ["Wasm modules", "Linear memory", "Wasm bindings", "WASI", "Performance", "Debugging Wasm"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like hiring a specialist contractor who works fast but speaks a different language",
    modules: [
      {
        id: "ts-webassembly-m1",
        title: "WebAssembly & TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-webassembly-m1-l1",
          slug: "ts-webassembly-m1-l1",
          title: "What WebAssembly is",
          concept: "WebAssembly is a compact binary format that browsers run at near-native speed alongside JavaScript. In this track you apply it while building WebAssembly application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 5 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for What WebAssembly is values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about What WebAssembly is: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the whatWebAssembly function",
            type: "build-function",
            instructions: "Write a function named `whatWebAssembly` for What WebAssembly is: it takes two numbers and returns their sum. Log the result of calling it with 5 and 7.",
            starterCode: "function whatWebAssembly(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(whatWebAssembly(5, 7));",
            solution: "function whatWebAssembly(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(whatWebAssembly(5, 7));",
            solutionExplanation: "The function returns 5 + 7 = 12, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "12", hidden: false },
              { name: "Output contains the expected value", expectedContains: "12", hidden: true }
            ],
            hintNotes: { concept: "The `whatWebAssembly` code models What WebAssembly is with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-webassembly-m1-l2",
          slug: "ts-webassembly-m1-l2",
          title: "Compiling to Wasm",
          concept: "Languages such as Rust and C++ compile to WebAssembly modules that a web page can load and call. Mastering it makes your WebAssembly application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"compiling\", 8));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Compiling to Wasm can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Compiling to Wasm logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the compilingWasm function",
            type: "build-function",
            instructions: "Write a function named `compilingWasm` for Compiling to Wasm: it takes two numbers and returns their product. Log the result of calling it with 8 and 9.",
            starterCode: "function compilingWasm(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(compilingWasm(8, 9));",
            solution: "function compilingWasm(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(compilingWasm(8, 9));",
            solutionExplanation: "The function returns 8 * 9 = 72, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "72", hidden: false },
              { name: "Output contains the expected value", expectedContains: "72", hidden: true }
            ],
            hintNotes: { concept: "The `compilingWasm` code models Compiling to Wasm with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-webassembly-m1-l3",
          slug: "ts-webassembly-m1-l3",
          title: "The Wasm module boundary",
          concept: "A WebAssembly module exposes typed functions and memory, and JavaScript calls into it through an instance object. In this track you apply it while building WebAssembly application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];",
          exampleCode: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for The Wasm module boundary.",
          bug: { prompt: "This loop for The Wasm module boundary produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: The Wasm module boundary",
            type: "multiple-choice",
            instructions: "Which statement about The Wasm module boundary is correct?",
            starterCode: "",
            solution: "A WebAssembly module exposes typed functions and memory, and JavaScript calls into it through an instance object.",
            solutionExplanation: "A WebAssembly module exposes typed functions and memory, and JavaScript calls into it through an instance object. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A WebAssembly module exposes typed functions and memory, and JavaScript calls into it through an instance object.", hidden: false }
            ],
            hintNotes: { concept: "Think about what The Wasm module boundary really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["A WebAssembly module exposes typed functions and memory, and JavaScript calls into it through an instance object.", "The Wasm module boundary can only be used once in a program.", "The Wasm module boundary requires a separate paid licence to use.", "The Wasm module boundary is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-webassembly-m1-l4",
          slug: "ts-webassembly-m1-l4",
          title: "Shared memory",
          concept: "WebAssembly linear memory is one large byte array shared with JavaScript, which copies data in and out of it. Mastering it makes your WebAssembly application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 5, beta: 9 };",
          exampleCode: "const config: Record<string, number> = { alpha: 5, beta: 9 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Shared memory, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Shared memory changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the sharedMemory function",
            type: "build-function",
            instructions: "Write a function named `sharedMemory` for Shared memory: it takes two numbers and returns the first minus the second. Log the result of calling it with 12 and 5.",
            starterCode: "function sharedMemory(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(sharedMemory(12, 5));",
            solution: "function sharedMemory(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(sharedMemory(12, 5));",
            solutionExplanation: "The function returns 12 - 5 = 7, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "7", hidden: false },
              { name: "Output contains the expected value", expectedContains: "7", hidden: true }
            ],
            hintNotes: { concept: "The `sharedMemory` code models Shared memory with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-webassembly-m1-l5",
          slug: "ts-webassembly-m1-l5",
          title: "Calling Wasm from TypeScript",
          concept: "TypeScript calls WebAssembly through generated bindings or a hand-written typed wrapper around the instance exports. In this track you apply it while building WebAssembly application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 8 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Calling Wasm from TypeScript code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Calling Wasm from TypeScript crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the callingWasm function",
            type: "build-function",
            instructions: "Write a function named `callingWasm` for Calling Wasm from TypeScript: it takes three numbers and returns a * b + c. Log the result of calling it with 8, 7 and 6.",
            starterCode: "function callingWasm(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(callingWasm(8, 7, 6));",
            solution: "function callingWasm(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(callingWasm(8, 7, 6));",
            solutionExplanation: "The function returns 8 * 7 + 6 = 62, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "62", hidden: false },
              { name: "Output contains the expected value", expectedContains: "62", hidden: true }
            ],
            hintNotes: { concept: "The `callingWasm` code models Calling Wasm from TypeScript with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-webassembly-m2",
        title: "WebAssembly & TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-webassembly-m2-l1",
          slug: "ts-webassembly-m2-l1",
          title: "Passing strings to Wasm",
          concept: "Strings cross the Wasm boundary as bytes in linear memory, usually encoded as UTF-8 with an explicit length. Mastering it makes your WebAssembly application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"passing\", 2));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Passing strings to Wasm is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Passing strings to Wasm prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Passing strings to Wasm",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: zeta, alpha, beta, gamma, delta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"zeta\", \"alpha\", \"beta\", \"gamma\", \"delta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 5 items, so items.length is 5.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Passing strings to Wasm with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-webassembly-m2-l2",
          slug: "ts-webassembly-m2-l2",
          title: "Performance wins with Wasm",
          concept: "WebAssembly wins on heavy computation such as image processing, where its compiled code avoids JavaScript's overhead. In this track you apply it while building WebAssembly application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];",
          exampleCode: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Performance wins with Wasm values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Performance wins with Wasm: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Performance wins with Wasm",
            type: "multiple-choice",
            instructions: "Which statement about Performance wins with Wasm is correct?",
            starterCode: "",
            solution: "WebAssembly wins on heavy computation such as image processing, where its compiled code avoids JavaScript's overhead.",
            solutionExplanation: "WebAssembly wins on heavy computation such as image processing, where its compiled code avoids JavaScript's overhead. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "WebAssembly wins on heavy computation such as image processing, where its compiled code avoids JavaScript's overhead.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Performance wins with Wasm really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Performance wins with Wasm can only be used once in a program.", "WebAssembly wins on heavy computation such as image processing, where its compiled code avoids JavaScript's overhead.", "Performance wins with Wasm requires a separate paid licence to use.", "Performance wins with Wasm is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-webassembly-m2-l3",
          slug: "ts-webassembly-m2-l3",
          title: "WASI",
          concept: "WASI is a standard interface that lets WebAssembly modules access files and clocks outside the browser, like a portable system call layer. Mastering it makes your WebAssembly application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 8, beta: 6 };",
          exampleCode: "const config: Record<string, number> = { alpha: 8, beta: 6 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in WASI can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about WASI logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for WASI",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"beta\", \"gamma\", \"delta\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"beta\", \"gamma\", \"delta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"BETA - GAMMA - DELTA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "BETA - GAMMA - DELTA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "BETA - GAMMA - DELTA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models WASI with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-webassembly-m2-l4",
          slug: "ts-webassembly-m2-l4",
          title: "Debugging Wasm",
          concept: "WebAssembly is debugged through source maps and browser tooling that shows the original source alongside the running module. In this track you apply it while building WebAssembly application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 2 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Debugging Wasm.",
          bug: { prompt: "This loop for Debugging Wasm produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Debugging Wasm",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(5 * 6 + 6);",
            starterCode: "",
            solution: "36",
            solutionExplanation: "The program computes 5 * 6 + 6 = 36.",
            tests: [
              { name: "Correct answer", expectedContains: "36", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 5 * 6, then add 6.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["36", "30", "17", "24"],
            answerIndex: 0,
          }
        },
        {
          id: "ts-webassembly-m2-l5",
          slug: "ts-webassembly-m2-l5",
          title: "When to use Wasm",
          concept: "WebAssembly is worth it for compute-heavy work, but plain TypeScript is simpler and faster to build for ordinary UI logic. Mastering it makes your WebAssembly application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"when\", 5));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with When to use Wasm, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for When to use Wasm changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the WhenUse config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `WhenUseConfig` for When to use Wasm with name \"delta\", retries 5 and enabled false, then log it with JSON.stringify.",
            starterCode: "type WhenUseConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: WhenUseConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type WhenUseConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: WhenUseConfig = { name: \"delta\", retries: 5, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"delta\",\"retries\":5,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"delta\",\"retries\":5,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"delta\",\"retries\":5,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models When to use Wasm with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: WebAssembly application progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your WebAssembly application project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 6 of 8 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 8, done: 6, rate: completionRate(6, 8) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(6, 8) is Math.round((6 / 8) * 100) = 75, so the summary stringifies to {\"tasks\":8,\"done\":6,\"rate\":75}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":8,\"done\":6,\"rate\":75}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":75", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "WebAssembly & TypeScript Capstone Project",
      description: "Build a small working WebAssembly application application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core WebAssembly application features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-compiler-api",
    slug: "ts-compiler-api",
    language: "typescript",
    category: "languages",
    title: "TypeScript Compiler API",
    description: "Advanced TypeScript: use the TypeScript compiler API to parse, analyse and transform code",
    difficulty: "Advanced",
    estimatedHours: 18,
    skills: ["Parsing source files", "AST traversal", "Type checker", "Transformers", "Code generation", "Language services"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like learning to read a book by its grammar instead of its story",
    modules: [
      {
        id: "ts-compiler-api-m1",
        title: "TypeScript Compiler API Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-compiler-api-m1-l1",
          slug: "ts-compiler-api-m1-l1",
          title: "The compiler as a library",
          concept: "The TypeScript compiler is also a library, so programs can parse and type-check code instead of just compiling it. In this track you apply it while building compiler tool features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 6 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for The compiler as a library values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about The compiler as a library: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the compilerLibrary function",
            type: "build-function",
            instructions: "Write a function named `compilerLibrary` for The compiler as a library: it takes two numbers and returns their sum. Log the result of calling it with 3 and 4.",
            starterCode: "function compilerLibrary(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(compilerLibrary(3, 4));",
            solution: "function compilerLibrary(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(compilerLibrary(3, 4));",
            solutionExplanation: "The function returns 3 + 4 = 7, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "7", hidden: false },
              { name: "Output contains the expected value", expectedContains: "7", hidden: true }
            ],
            hintNotes: { concept: "The `compilerLibrary` code models The compiler as a library with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-compiler-api-m1-l2",
          slug: "ts-compiler-api-m1-l2",
          title: "Parsing source files",
          concept: "The compiler API parses a source file into an abstract syntax tree of nodes, each with a kind and position. Mastering it makes your compiler tool code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"parsing\", 9));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Parsing source files can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Parsing source files logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the parsingSource function",
            type: "build-function",
            instructions: "Write a function named `parsingSource` for Parsing source files: it takes two numbers and returns their product. Log the result of calling it with 6 and 6.",
            starterCode: "function parsingSource(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(parsingSource(6, 6));",
            solution: "function parsingSource(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(parsingSource(6, 6));",
            solutionExplanation: "The function returns 6 * 6 = 36, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "36", hidden: false },
              { name: "Output contains the expected value", expectedContains: "36", hidden: true }
            ],
            hintNotes: { concept: "The `parsingSource` code models Parsing source files with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-compiler-api-m1-l3",
          slug: "ts-compiler-api-m1-l3",
          title: "Walking the AST",
          concept: "Walking an AST means visiting each node recursively, which is how tools find every function or identifier in a file. In this track you apply it while building compiler tool features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];",
          exampleCode: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Walking the AST.",
          bug: { prompt: "This loop for Walking the AST produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Walking the AST",
            type: "multiple-choice",
            instructions: "Which statement about Walking the AST is correct?",
            starterCode: "",
            solution: "Walking an AST means visiting each node recursively, which is how tools find every function or identifier in a file.",
            solutionExplanation: "Walking an AST means visiting each node recursively, which is how tools find every function or identifier in a file. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Walking an AST means visiting each node recursively, which is how tools find every function or identifier in a file.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Walking the AST really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Walking the AST can only be used once in a program.", "Walking an AST means visiting each node recursively, which is how tools find every function or identifier in a file.", "Walking the AST requires a separate paid licence to use.", "Walking the AST is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-compiler-api-m1-l4",
          slug: "ts-compiler-api-m1-l4",
          title: "Node kinds",
          concept: "Every AST node has a kind such as Identifier or CallExpression, and the kind decides how the node is handled. Mastering it makes your compiler tool code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 6, beta: 4 };",
          exampleCode: "const config: Record<string, number> = { alpha: 6, beta: 4 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Node kinds, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Node kinds changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the nodeKinds function",
            type: "build-function",
            instructions: "Write a function named `nodeKinds` for Node kinds: it takes two numbers and returns the first minus the second. Log the result of calling it with 10 and 10.",
            starterCode: "function nodeKinds(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(nodeKinds(10, 10));",
            solution: "function nodeKinds(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(nodeKinds(10, 10));",
            solutionExplanation: "The function returns 10 - 10 = 0, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "0", hidden: false },
              { name: "Output contains the expected value", expectedContains: "0", hidden: true }
            ],
            hintNotes: { concept: "The `nodeKinds` code models Node kinds with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-compiler-api-m1-l5",
          slug: "ts-compiler-api-m1-l5",
          title: "The type checker",
          concept: "The type checker answers questions about a node, such as the type of an expression or the declaration an identifier refers to. In this track you apply it while building compiler tool features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 9 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by The type checker code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for The type checker crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the typeChecker function",
            type: "build-function",
            instructions: "Write a function named `typeChecker` for The type checker: it takes three numbers and returns a * b + c. Log the result of calling it with 6, 4 and 3.",
            starterCode: "function typeChecker(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(typeChecker(6, 4, 3));",
            solution: "function typeChecker(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(typeChecker(6, 4, 3));",
            solutionExplanation: "The function returns 6 * 4 + 3 = 27, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "27", hidden: false },
              { name: "Output contains the expected value", expectedContains: "27", hidden: true }
            ],
            hintNotes: { concept: "The `typeChecker` code models The type checker with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-compiler-api-m2",
        title: "TypeScript Compiler API in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-compiler-api-m2-l1",
          slug: "ts-compiler-api-m2-l1",
          title: "Printing and emitting",
          concept: "The compiler API can print an AST back to source text, which is how code generators produce formatted TypeScript. Mastering it makes your compiler tool code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"printing\", 3));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Printing and emitting is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Printing and emitting prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Printing and emitting",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: beta, gamma, delta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"beta\", \"gamma\", \"delta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 3 items, so items.length is 3.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "3", hidden: false },
              { name: "Output contains the expected value", expectedContains: "3", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Printing and emitting with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-compiler-api-m2-l2",
          slug: "ts-compiler-api-m2-l2",
          title: "Creating nodes",
          concept: "Compiler API factory functions create new AST nodes, so tools can build code programmatically instead of string templates. In this track you apply it while building compiler tool features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];",
          exampleCode: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Creating nodes values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Creating nodes: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Creating nodes",
            type: "multiple-choice",
            instructions: "Which statement about Creating nodes is correct?",
            starterCode: "",
            solution: "Compiler API factory functions create new AST nodes, so tools can build code programmatically instead of string templates.",
            solutionExplanation: "Compiler API factory functions create new AST nodes, so tools can build code programmatically instead of string templates. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Compiler API factory functions create new AST nodes, so tools can build code programmatically instead of string templates.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Creating nodes really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Creating nodes can only be used once in a program.", "Creating nodes requires a separate paid licence to use.", "Compiler API factory functions create new AST nodes, so tools can build code programmatically instead of string templates.", "Creating nodes is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-compiler-api-m2-l3",
          slug: "ts-compiler-api-m2-l3",
          title: "Transformers",
          concept: "A transformer rewrites an AST during compilation, changing or adding code before it is emitted. Mastering it makes your compiler tool code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 9, beta: 8 };",
          exampleCode: "const config: Record<string, number> = { alpha: 9, beta: 8 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Transformers can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Transformers logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Transformers",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"delta\", \"sigma\", \"omega\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"delta\", \"sigma\", \"omega\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"DELTA, SIGMA, OMEGA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "DELTA, SIGMA, OMEGA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "DELTA, SIGMA, OMEGA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Transformers with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-compiler-api-m2-l4",
          slug: "ts-compiler-api-m2-l4",
          title: "Language services",
          concept: "The language service powers editor features such as completions and rename by running the compiler incrementally. In this track you apply it while building compiler tool features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 3 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Language services.",
          bug: { prompt: "This loop for Language services produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Language services",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(8 * 7 + 3);",
            starterCode: "",
            solution: "59",
            solutionExplanation: "The program computes 8 * 7 + 3 = 59.",
            tests: [
              { name: "Correct answer", expectedContains: "59", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 8 * 7, then add 3.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["56", "59", "18", "53"],
            answerIndex: 1,
          }
        },
        {
          id: "ts-compiler-api-m2-l5",
          slug: "ts-compiler-api-m2-l5",
          title: "Building a compiler tool",
          concept: "A compiler tool combines parsing, checking and printing to analyse or transform a whole project in one pass. Mastering it makes your compiler tool code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"building\", 6));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Building a compiler tool, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Building a compiler tool changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the BuildingCompiler config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `BuildingCompilerConfig` for Building a compiler tool with name \"omega\", retries 3 and enabled true, then log it with JSON.stringify.",
            starterCode: "type BuildingCompilerConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: BuildingCompilerConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type BuildingCompilerConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: BuildingCompilerConfig = { name: \"omega\", retries: 3, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"omega\",\"retries\":3,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"omega\",\"retries\":3,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"omega\",\"retries\":3,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Building a compiler tool with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: compiler tool progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your compiler tool project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 9 of 10 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 10, done: 9, rate: completionRate(9, 10) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(9, 10) is Math.round((9 / 10) * 100) = 90, so the summary stringifies to {\"tasks\":10,\"done\":9,\"rate\":90}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":10,\"done\":9,\"rate\":90}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":90", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "TypeScript Compiler API Capstone Project",
      description: "Build a small working compiler tool application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core compiler tool features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-custom-lint",
    slug: "ts-custom-lint",
    language: "typescript",
    category: "languages",
    title: "Custom Lint Rules",
    description: "Advanced TypeScript: write custom ESLint rules that enforce your team's own conventions",
    difficulty: "Advanced",
    estimatedHours: 16,
    skills: ["ESLint rule anatomy", "AST visitors", "Auto-fixers", "Rule testing", "Configurable rules", "CI linting"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like being the editor who checks every manuscript against the house style guide",
    modules: [
      {
        id: "ts-custom-lint-m1",
        title: "Custom Lint Rules Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-custom-lint-m1-l1",
          slug: "ts-custom-lint-m1-l1",
          title: "Why custom lint rules",
          concept: "Custom lint rules enforce a team's own conventions automatically, catching patterns a generic linter cannot know about. In this track you apply it while building lint rule features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 7 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Why custom lint rules values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Why custom lint rules: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the whyCustom function",
            type: "build-function",
            instructions: "Write a function named `whyCustom` for Why custom lint rules: it takes two numbers and returns their sum. Log the result of calling it with 10 and 9.",
            starterCode: "function whyCustom(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(whyCustom(10, 9));",
            solution: "function whyCustom(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(whyCustom(10, 9));",
            solutionExplanation: "The function returns 10 + 9 = 19, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "19", hidden: false },
              { name: "Output contains the expected value", expectedContains: "19", hidden: true }
            ],
            hintNotes: { concept: "The `whyCustom` code models Why custom lint rules with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-custom-lint-m1-l2",
          slug: "ts-custom-lint-m1-l2",
          title: "ESLint rule anatomy",
          concept: "An ESLint rule is a visitor that receives AST nodes and reports problems with a message and a fix suggestion. Mastering it makes your lint rule code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"eslint\", 10));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in ESLint rule anatomy can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about ESLint rule anatomy logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the eSLintRule function",
            type: "build-function",
            instructions: "Write a function named `eSLintRule` for ESLint rule anatomy: it takes two numbers and returns their product. Log the result of calling it with 4 and 3.",
            starterCode: "function eSLintRule(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(eSLintRule(4, 3));",
            solution: "function eSLintRule(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(eSLintRule(4, 3));",
            solutionExplanation: "The function returns 4 * 3 = 12, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "12", hidden: false },
              { name: "Output contains the expected value", expectedContains: "12", hidden: true }
            ],
            hintNotes: { concept: "The `eSLintRule` code models ESLint rule anatomy with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-custom-lint-m1-l3",
          slug: "ts-custom-lint-m1-l3",
          title: "Writing a visitor",
          concept: "A rule visitor defines handlers for node types such as CallExpression, and ESLint calls them as it walks the file. In this track you apply it while building lint rule features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];",
          exampleCode: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Writing a visitor.",
          bug: { prompt: "This loop for Writing a visitor produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Writing a visitor",
            type: "multiple-choice",
            instructions: "Which statement about Writing a visitor is correct?",
            starterCode: "",
            solution: "A rule visitor defines handlers for node types such as CallExpression, and ESLint calls them as it walks the file.",
            solutionExplanation: "A rule visitor defines handlers for node types such as CallExpression, and ESLint calls them as it walks the file. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A rule visitor defines handlers for node types such as CallExpression, and ESLint calls them as it walks the file.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Writing a visitor really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Writing a visitor can only be used once in a program.", "Writing a visitor requires a separate paid licence to use.", "A rule visitor defines handlers for node types such as CallExpression, and ESLint calls them as it walks the file.", "Writing a visitor is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-custom-lint-m1-l4",
          slug: "ts-custom-lint-m1-l4",
          title: "Reporting problems",
          concept: "Rules report problems with context.report, giving the location, a message id, and optionally an automatic fix. Mastering it makes your lint rule code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 7, beta: 6 };",
          exampleCode: "const config: Record<string, number> = { alpha: 7, beta: 6 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Reporting problems, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Reporting problems changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the reportingProblems function",
            type: "build-function",
            instructions: "Write a function named `reportingProblems` for Reporting problems: it takes two numbers and returns the first minus the second. Log the result of calling it with 17 and 7.",
            starterCode: "function reportingProblems(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(reportingProblems(17, 7));",
            solution: "function reportingProblems(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(reportingProblems(17, 7));",
            solutionExplanation: "The function returns 17 - 7 = 10, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "10", hidden: false },
              { name: "Output contains the expected value", expectedContains: "10", hidden: true }
            ],
            hintNotes: { concept: "The `reportingProblems` code models Reporting problems with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-custom-lint-m1-l5",
          slug: "ts-custom-lint-m1-l5",
          title: "Auto-fixers",
          concept: "An auto-fixer rewrites the offending code for the user, but it must preserve behaviour or it will break programs. In this track you apply it while building lint rule features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 10 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Auto-fixers code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Auto-fixers crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the autofixers function",
            type: "build-function",
            instructions: "Write a function named `autofixers` for Auto-fixers: it takes three numbers and returns a * b + c. Log the result of calling it with 4, 9 and 6.",
            starterCode: "function autofixers(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(autofixers(4, 9, 6));",
            solution: "function autofixers(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(autofixers(4, 9, 6));",
            solutionExplanation: "The function returns 4 * 9 + 6 = 42, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "42", hidden: false },
              { name: "Output contains the expected value", expectedContains: "42", hidden: true }
            ],
            hintNotes: { concept: "The `autofixers` code models Auto-fixers with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-custom-lint-m2",
        title: "Custom Lint Rules in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-custom-lint-m2-l1",
          slug: "ts-custom-lint-m2-l1",
          title: "Testing lint rules",
          concept: "Lint rules are tested with a rule tester that runs the rule on valid and invalid snippets and asserts the reported errors. Mastering it makes your lint rule code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"testing\", 4));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Testing lint rules is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Testing lint rules prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Testing lint rules",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: delta, sigma, omega, kappa. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"delta\", \"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 4 items, so items.length is 4.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "4", hidden: false },
              { name: "Output contains the expected value", expectedContains: "4", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Testing lint rules with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-custom-lint-m2-l2",
          slug: "ts-custom-lint-m2-l2",
          title: "Configurable rules",
          concept: "Rules accept options in the ESLint config, so one rule can enforce different thresholds in different projects. In this track you apply it while building lint rule features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];",
          exampleCode: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Configurable rules values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Configurable rules: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Configurable rules",
            type: "multiple-choice",
            instructions: "Which statement about Configurable rules is correct?",
            starterCode: "",
            solution: "Rules accept options in the ESLint config, so one rule can enforce different thresholds in different projects.",
            solutionExplanation: "Rules accept options in the ESLint config, so one rule can enforce different thresholds in different projects. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Rules accept options in the ESLint config, so one rule can enforce different thresholds in different projects.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Configurable rules really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Configurable rules can only be used once in a program.", "Configurable rules requires a separate paid licence to use.", "Configurable rules is not available in TypeScript.", "Rules accept options in the ESLint config, so one rule can enforce different thresholds in different projects."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-custom-lint-m2-l3",
          slug: "ts-custom-lint-m2-l3",
          title: "Rule severity",
          concept: "Lint rules run at off, warn or error severity, so teams can adopt a rule gently before making it blocking. Mastering it makes your lint rule code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 10, beta: 3 };",
          exampleCode: "const config: Record<string, number> = { alpha: 10, beta: 3 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Rule severity can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Rule severity logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Rule severity",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"omega\", \"kappa\", \"lambda\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"omega\", \"kappa\", \"lambda\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"OMEGA - KAPPA - LAMBDA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "OMEGA - KAPPA - LAMBDA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "OMEGA - KAPPA - LAMBDA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Rule severity with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-custom-lint-m2-l4",
          slug: "ts-custom-lint-m2-l4",
          title: "Sharing rules as plugins",
          concept: "Lint rules ship as ESLint plugins, so other projects install the package and enable the rules in their config. In this track you apply it while building lint rule features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 4 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Sharing rules as plugins.",
          bug: { prompt: "This loop for Sharing rules as plugins produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Sharing rules as plugins",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(4 * 2 + 3);",
            starterCode: "",
            solution: "11",
            solutionExplanation: "The program computes 4 * 2 + 3 = 11.",
            tests: [
              { name: "Correct answer", expectedContains: "11", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 4 * 2, then add 3.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["8", "9", "11", "5"],
            answerIndex: 2,
          }
        },
        {
          id: "ts-custom-lint-m2-l5",
          slug: "ts-custom-lint-m2-l5",
          title: "Linting in CI",
          concept: "Running the linter in CI blocks merges that introduce violations, keeping the codebase clean without manual review. Mastering it makes your lint rule code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"linting\", 7));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Linting in CI, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Linting in CI changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the LintingCI config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `LintingCIConfig` for Linting in CI with name \"lambda\", retries 10 and enabled false, then log it with JSON.stringify.",
            starterCode: "type LintingCIConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: LintingCIConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type LintingCIConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: LintingCIConfig = { name: \"lambda\", retries: 10, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"lambda\",\"retries\":10,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"lambda\",\"retries\":10,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"lambda\",\"retries\":10,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Linting in CI with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: lint rule progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your lint rule project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 3 of 4 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 4, done: 3, rate: completionRate(3, 4) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(3, 4) is Math.round((3 / 4) * 100) = 75, so the summary stringifies to {\"tasks\":4,\"done\":3,\"rate\":75}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":4,\"done\":3,\"rate\":75}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":75", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Custom Lint Rules Capstone Project",
      description: "Build a small working lint rule application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core lint rule features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-codemods",
    slug: "ts-codemods",
    language: "typescript",
    category: "languages",
    title: "Codemods in TypeScript",
    description: "Advanced TypeScript: write codemods that rewrite TypeScript codebases safely at scale",
    difficulty: "Advanced",
    estimatedHours: 18,
    skills: ["AST transforms", "jscodeshift", "Safe rewrites", "Fixture testing", "API migrations", "Large-scale refactors"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like using a printing press to reprint a whole library with one corrected page",
    modules: [
      {
        id: "ts-codemods-m1",
        title: "Codemods in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-codemods-m1-l1",
          slug: "ts-codemods-m1-l1",
          title: "What a codemod is",
          concept: "A codemod is a script that rewrites source code automatically, applying a large change across a whole codebase at once. In this track you apply it while building codemod features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 8 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for What a codemod is values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about What a codemod is: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the whatCodemod function",
            type: "build-function",
            instructions: "Write a function named `whatCodemod` for What a codemod is: it takes two numbers and returns their sum. Log the result of calling it with 8 and 6.",
            starterCode: "function whatCodemod(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(whatCodemod(8, 6));",
            solution: "function whatCodemod(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(whatCodemod(8, 6));",
            solutionExplanation: "The function returns 8 + 6 = 14, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "14", hidden: false },
              { name: "Output contains the expected value", expectedContains: "14", hidden: true }
            ],
            hintNotes: { concept: "The `whatCodemod` code models What a codemod is with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-codemods-m1-l2",
          slug: "ts-codemods-m1-l2",
          title: "AST-based transforms",
          concept: "Codemods transform code by editing its AST, which is safer than text replacement because it understands the syntax. Mastering it makes your codemod code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"astbased\", 2));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in AST-based transforms can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about AST-based transforms logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the aSTbasedTransforms function",
            type: "build-function",
            instructions: "Write a function named `aSTbasedTransforms` for AST-based transforms: it takes two numbers and returns their product. Log the result of calling it with 2 and 8.",
            starterCode: "function aSTbasedTransforms(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(aSTbasedTransforms(2, 8));",
            solution: "function aSTbasedTransforms(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(aSTbasedTransforms(2, 8));",
            solutionExplanation: "The function returns 2 * 8 = 16, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "16", hidden: false },
              { name: "Output contains the expected value", expectedContains: "16", hidden: true }
            ],
            hintNotes: { concept: "The `aSTbasedTransforms` code models AST-based transforms with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-codemods-m1-l3",
          slug: "ts-codemods-m1-l3",
          title: "Finding code to change",
          concept: "A codemod finds the code to change by matching AST patterns, such as every call to a renamed function. In this track you apply it while building codemod features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];",
          exampleCode: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Finding code to change.",
          bug: { prompt: "This loop for Finding code to change produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Finding code to change",
            type: "multiple-choice",
            instructions: "Which statement about Finding code to change is correct?",
            starterCode: "",
            solution: "A codemod finds the code to change by matching AST patterns, such as every call to a renamed function.",
            solutionExplanation: "A codemod finds the code to change by matching AST patterns, such as every call to a renamed function. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A codemod finds the code to change by matching AST patterns, such as every call to a renamed function.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Finding code to change really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Finding code to change can only be used once in a program.", "Finding code to change requires a separate paid licence to use.", "Finding code to change is not available in TypeScript.", "A codemod finds the code to change by matching AST patterns, such as every call to a renamed function."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-codemods-m1-l4",
          slug: "ts-codemods-m1-l4",
          title: "jscodeshift",
          concept: "jscodeshift is a toolkit for writing codemods, giving a small API for finding, replacing and printing AST nodes. Mastering it makes your codemod code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 8, beta: 8 };",
          exampleCode: "const config: Record<string, number> = { alpha: 8, beta: 8 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with jscodeshift, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for jscodeshift changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the jscodeshift function",
            type: "build-function",
            instructions: "Write a function named `jscodeshift` for jscodeshift: it takes two numbers and returns the first minus the second. Log the result of calling it with 15 and 4.",
            starterCode: "function jscodeshift(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(jscodeshift(15, 4));",
            solution: "function jscodeshift(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(jscodeshift(15, 4));",
            solutionExplanation: "The function returns 15 - 4 = 11, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "11", hidden: false },
              { name: "Output contains the expected value", expectedContains: "11", hidden: true }
            ],
            hintNotes: { concept: "The `jscodeshift` code models jscodeshift with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-codemods-m1-l5",
          slug: "ts-codemods-m1-l5",
          title: "Safe rewrites",
          concept: "A safe codemod only rewrites code it fully understands and leaves anything ambiguous untouched for a human. In this track you apply it while building codemod features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 2 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Safe rewrites code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Safe rewrites crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the safeRewrites function",
            type: "build-function",
            instructions: "Write a function named `safeRewrites` for Safe rewrites: it takes three numbers and returns a * b + c. Log the result of calling it with 2, 6 and 3.",
            starterCode: "function safeRewrites(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(safeRewrites(2, 6, 3));",
            solution: "function safeRewrites(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(safeRewrites(2, 6, 3));",
            solutionExplanation: "The function returns 2 * 6 + 3 = 15, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "15", hidden: false },
              { name: "Output contains the expected value", expectedContains: "15", hidden: true }
            ],
            hintNotes: { concept: "The `safeRewrites` code models Safe rewrites with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-codemods-m2",
        title: "Codemods in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-codemods-m2-l1",
          slug: "ts-codemods-m2-l1",
          title: "Testing codemods",
          concept: "Codemods are tested on before-and-after fixtures, so each transform proves it produces exactly the intended output. Mastering it makes your codemod code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"testing\", 5));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Testing codemods is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Testing codemods prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Testing codemods",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: omega, kappa, lambda, theta, zeta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"omega\", \"kappa\", \"lambda\", \"theta\", \"zeta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 5 items, so items.length is 5.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Testing codemods with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-codemods-m2-l2",
          slug: "ts-codemods-m2-l2",
          title: "Renaming APIs",
          concept: "Renaming an API with a codemod updates every call site and import in one run, instead of weeks of manual edits. In this track you apply it while building codemod features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];",
          exampleCode: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Renaming APIs values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Renaming APIs: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Renaming APIs",
            type: "multiple-choice",
            instructions: "Which statement about Renaming APIs is correct?",
            starterCode: "",
            solution: "Renaming an API with a codemod updates every call site and import in one run, instead of weeks of manual edits.",
            solutionExplanation: "Renaming an API with a codemod updates every call site and import in one run, instead of weeks of manual edits. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Renaming an API with a codemod updates every call site and import in one run, instead of weeks of manual edits.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Renaming APIs really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Renaming an API with a codemod updates every call site and import in one run, instead of weeks of manual edits.", "Renaming APIs can only be used once in a program.", "Renaming APIs requires a separate paid licence to use.", "Renaming APIs is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-codemods-m2-l3",
          slug: "ts-codemods-m2-l3",
          title: "Migrating patterns",
          concept: "Codemods migrate old patterns to new ones, such as converting callbacks to async functions across a project. Mastering it makes your codemod code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 2, beta: 5 };",
          exampleCode: "const config: Record<string, number> = { alpha: 2, beta: 5 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Migrating patterns can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Migrating patterns logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Migrating patterns",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"LAMBDA, THETA, ZETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "LAMBDA, THETA, ZETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "LAMBDA, THETA, ZETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Migrating patterns with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-codemods-m2-l4",
          slug: "ts-codemods-m2-l4",
          title: "Running codemods at scale",
          concept: "Running a codemod at scale means applying it to every package, reviewing the diff, and running the tests before merging. In this track you apply it while building codemod features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 5 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Running codemods at scale.",
          bug: { prompt: "This loop for Running codemods at scale produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Running codemods at scale",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(7 * 3 + 5);",
            starterCode: "",
            solution: "26",
            solutionExplanation: "The program computes 7 * 3 + 5 = 26.",
            tests: [
              { name: "Correct answer", expectedContains: "26", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 7 * 3, then add 5.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["21", "15", "16", "26"],
            answerIndex: 3,
          }
        },
        {
          id: "ts-codemods-m2-l5",
          slug: "ts-codemods-m2-l5",
          title: "Codemods versus manual refactors",
          concept: "Codemods win for mechanical, repeated changes, while judgement-heavy refactors still need a human at the keyboard. Mastering it makes your codemod code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"codemods\", 8));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Codemods versus manual refactors, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Codemods versus manual refactors changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the CodemodsVersus config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `CodemodsVersusConfig` for Codemods versus manual refactors with name \"zeta\", retries 8 and enabled true, then log it with JSON.stringify.",
            starterCode: "type CodemodsVersusConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: CodemodsVersusConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type CodemodsVersusConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: CodemodsVersusConfig = { name: \"zeta\", retries: 8, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"zeta\",\"retries\":8,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"zeta\",\"retries\":8,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"zeta\",\"retries\":8,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Codemods versus manual refactors with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: codemod progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your codemod project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 1 of 2 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 2, done: 1, rate: completionRate(1, 2) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(1, 2) is Math.round((1 / 2) * 100) = 50, so the summary stringifies to {\"tasks\":2,\"done\":1,\"rate\":50}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":2,\"done\":1,\"rate\":50}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":50", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Codemods in TypeScript Capstone Project",
      description: "Build a small working codemod application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core codemod features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-profiling",
    slug: "ts-profiling",
    language: "typescript",
    category: "languages",
    title: "Performance Profiling in TypeScript",
    description: "Advanced TypeScript: profile TypeScript applications and fix the performance problems that matter",
    difficulty: "Advanced",
    estimatedHours: 16,
    skills: ["Performance API", "CPU profiles", "Flame graphs", "Memory snapshots", "Benchmarking", "Production profiling"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like being a detective with a stopwatch, measuring where the time actually goes",
    modules: [
      {
        id: "ts-profiling-m1",
        title: "Performance Profiling in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-profiling-m1-l1",
          slug: "ts-profiling-m1-l1",
          title: "Measuring before optimising",
          concept: "Profiling starts with measurement, because guessing where time goes usually optimises the wrong function. In this track you apply it while building performance profile features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 9 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Measuring before optimising values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Measuring before optimising: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the measuringBefore function",
            type: "build-function",
            instructions: "Write a function named `measuringBefore` for Measuring before optimising: it takes two numbers and returns their sum. Log the result of calling it with 6 and 3.",
            starterCode: "function measuringBefore(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(measuringBefore(6, 3));",
            solution: "function measuringBefore(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(measuringBefore(6, 3));",
            solutionExplanation: "The function returns 6 + 3 = 9, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "9", hidden: false },
              { name: "Output contains the expected value", expectedContains: "9", hidden: true }
            ],
            hintNotes: { concept: "The `measuringBefore` code models Measuring before optimising with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-profiling-m1-l2",
          slug: "ts-profiling-m1-l2",
          title: "The performance API",
          concept: "The Performance API records timestamps and marks, so code can measure exactly how long a section takes. Mastering it makes your performance profile code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"performance\", 3));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in The performance API can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about The performance API logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the performanceAPI function",
            type: "build-function",
            instructions: "Write a function named `performanceAPI` for The performance API: it takes two numbers and returns their product. Log the result of calling it with 9 and 5.",
            starterCode: "function performanceAPI(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(performanceAPI(9, 5));",
            solution: "function performanceAPI(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(performanceAPI(9, 5));",
            solutionExplanation: "The function returns 9 * 5 = 45, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "45", hidden: false },
              { name: "Output contains the expected value", expectedContains: "45", hidden: true }
            ],
            hintNotes: { concept: "The `performanceAPI` code models The performance API with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-profiling-m1-l3",
          slug: "ts-profiling-m1-l3",
          title: "CPU profiles",
          concept: "A CPU profile samples the call stack while code runs, showing which functions consume the most time. In this track you apply it while building performance profile features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];",
          exampleCode: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for CPU profiles.",
          bug: { prompt: "This loop for CPU profiles produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: CPU profiles",
            type: "multiple-choice",
            instructions: "Which statement about CPU profiles is correct?",
            starterCode: "",
            solution: "A CPU profile samples the call stack while code runs, showing which functions consume the most time.",
            solutionExplanation: "A CPU profile samples the call stack while code runs, showing which functions consume the most time. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A CPU profile samples the call stack while code runs, showing which functions consume the most time.", hidden: false }
            ],
            hintNotes: { concept: "Think about what CPU profiles really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["A CPU profile samples the call stack while code runs, showing which functions consume the most time.", "CPU profiles can only be used once in a program.", "CPU profiles requires a separate paid licence to use.", "CPU profiles is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-profiling-m1-l4",
          slug: "ts-profiling-m1-l4",
          title: "Flame graphs",
          concept: "A flame graph stacks function calls by time, so the widest blocks are the functions worth optimising first. Mastering it makes your performance profile code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 9, beta: 3 };",
          exampleCode: "const config: Record<string, number> = { alpha: 9, beta: 3 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Flame graphs, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Flame graphs changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the flameGraphs function",
            type: "build-function",
            instructions: "Write a function named `flameGraphs` for Flame graphs: it takes two numbers and returns the first minus the second. Log the result of calling it with 13 and 9.",
            starterCode: "function flameGraphs(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(flameGraphs(13, 9));",
            solution: "function flameGraphs(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(flameGraphs(13, 9));",
            solutionExplanation: "The function returns 13 - 9 = 4, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "4", hidden: false },
              { name: "Output contains the expected value", expectedContains: "4", hidden: true }
            ],
            hintNotes: { concept: "The `flameGraphs` code models Flame graphs with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-profiling-m1-l5",
          slug: "ts-profiling-m1-l5",
          title: "Memory snapshots",
          concept: "A memory snapshot lists every live object, which reveals leaks as objects that grow with every run. In this track you apply it while building performance profile features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 3 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Memory snapshots code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Memory snapshots crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the memorySnapshots function",
            type: "build-function",
            instructions: "Write a function named `memorySnapshots` for Memory snapshots: it takes three numbers and returns a * b + c. Log the result of calling it with 9, 3 and 6.",
            starterCode: "function memorySnapshots(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(memorySnapshots(9, 3, 6));",
            solution: "function memorySnapshots(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(memorySnapshots(9, 3, 6));",
            solutionExplanation: "The function returns 9 * 3 + 6 = 33, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "33", hidden: false },
              { name: "Output contains the expected value", expectedContains: "33", hidden: true }
            ],
            hintNotes: { concept: "The `memorySnapshots` code models Memory snapshots with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-profiling-m2",
        title: "Performance Profiling in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-profiling-m2-l1",
          slug: "ts-profiling-m2-l1",
          title: "Finding slow renders",
          concept: "Slow renders are found by profiling component updates and checking which props change on every frame. Mastering it makes your performance profile code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"finding\", 6));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Finding slow renders is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Finding slow renders prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Finding slow renders",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: lambda, theta, zeta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"lambda\", \"theta\", \"zeta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 3 items, so items.length is 3.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "3", hidden: false },
              { name: "Output contains the expected value", expectedContains: "3", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Finding slow renders with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-profiling-m2-l2",
          slug: "ts-profiling-m2-l2",
          title: "Benchmarking",
          concept: "A benchmark runs a function many times and reports the average, but it must warm up first or the numbers mislead. In this track you apply it while building performance profile features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];",
          exampleCode: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Benchmarking values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Benchmarking: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Benchmarking",
            type: "multiple-choice",
            instructions: "Which statement about Benchmarking is correct?",
            starterCode: "",
            solution: "A benchmark runs a function many times and reports the average, but it must warm up first or the numbers mislead.",
            solutionExplanation: "A benchmark runs a function many times and reports the average, but it must warm up first or the numbers mislead. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A benchmark runs a function many times and reports the average, but it must warm up first or the numbers mislead.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Benchmarking really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Benchmarking can only be used once in a program.", "A benchmark runs a function many times and reports the average, but it must warm up first or the numbers mislead.", "Benchmarking requires a separate paid licence to use.", "Benchmarking is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-profiling-m2-l3",
          slug: "ts-profiling-m2-l3",
          title: "Async bottlenecks",
          concept: "Async bottlenecks show up as long gaps between awaited steps, usually caused by sequential calls that could run in parallel. Mastering it makes your performance profile code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 3, beta: 7 };",
          exampleCode: "const config: Record<string, number> = { alpha: 3, beta: 7 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Async bottlenecks can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Async bottlenecks logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Async bottlenecks",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"ZETA - ALPHA - BETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "ZETA - ALPHA - BETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "ZETA - ALPHA - BETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Async bottlenecks with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-profiling-m2-l4",
          slug: "ts-profiling-m2-l4",
          title: "Profiling in production",
          concept: "Production profiling samples real traffic with low overhead, so it measures the performance users actually feel. In this track you apply it while building performance profile features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 6 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Profiling in production.",
          bug: { prompt: "This loop for Profiling in production produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Profiling in production",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(3 * 4 + 2);",
            starterCode: "",
            solution: "14",
            solutionExplanation: "The program computes 3 * 4 + 2 = 14.",
            tests: [
              { name: "Correct answer", expectedContains: "14", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 3 * 4, then add 2.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["14", "12", "9", "10"],
            answerIndex: 0,
          }
        },
        {
          id: "ts-profiling-m2-l5",
          slug: "ts-profiling-m2-l5",
          title: "Acting on profile data",
          concept: "Profile data is only useful when it changes a decision, such as caching a result or splitting a heavy task. Mastering it makes your performance profile code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"acting\", 9));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Acting on profile data, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Acting on profile data changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the ActingProfile config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `ActingProfileConfig` for Acting on profile data with name \"beta\", retries 6 and enabled false, then log it with JSON.stringify.",
            starterCode: "type ActingProfileConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: ActingProfileConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type ActingProfileConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: ActingProfileConfig = { name: \"beta\", retries: 6, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"beta\",\"retries\":6,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"beta\",\"retries\":6,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"beta\",\"retries\":6,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Acting on profile data with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: performance profile progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your performance profile project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 7 of 10 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 10, done: 7, rate: completionRate(7, 10) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(7, 10) is Math.round((7 / 10) * 100) = 70, so the summary stringifies to {\"tasks\":10,\"done\":7,\"rate\":70}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":10,\"done\":7,\"rate\":70}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":70", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Performance Profiling in TypeScript Capstone Project",
      description: "Build a small working performance profile application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core performance profile features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-memory",
    slug: "ts-memory",
    language: "typescript",
    category: "languages",
    title: "Memory Management in TypeScript",
    description: "Advanced TypeScript: understand memory in JavaScript and TypeScript, find leaks, and design low-memory code",
    difficulty: "Advanced",
    estimatedHours: 18,
    skills: ["Garbage collection", "Memory leaks", "Weak references", "Detached DOM nodes", "Heap snapshots", "Low-memory design"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like packing a suitcase: everything you keep takes space, and everything you forget is gone",
    modules: [
      {
        id: "ts-memory-m1",
        title: "Memory Management in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-memory-m1-l1",
          slug: "ts-memory-m1-l1",
          title: "Garbage collection",
          concept: "JavaScript's garbage collector frees objects that are no longer reachable, so developers rarely manage memory directly. In this track you apply it while building memory-efficient program features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 10 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Garbage collection values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Garbage collection: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the garbageCollection function",
            type: "build-function",
            instructions: "Write a function named `garbageCollection` for Garbage collection: it takes two numbers and returns their sum. Log the result of calling it with 4 and 8.",
            starterCode: "function garbageCollection(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(garbageCollection(4, 8));",
            solution: "function garbageCollection(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(garbageCollection(4, 8));",
            solutionExplanation: "The function returns 4 + 8 = 12, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "12", hidden: false },
              { name: "Output contains the expected value", expectedContains: "12", hidden: true }
            ],
            hintNotes: { concept: "The `garbageCollection` code models Garbage collection with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-memory-m1-l2",
          slug: "ts-memory-m1-l2",
          title: "Reachability",
          concept: "An object stays alive as long as something reachable references it, even if the program no longer needs it. Mastering it makes your memory-efficient program code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"reachability\", 4));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Reachability can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Reachability logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the reachability function",
            type: "build-function",
            instructions: "Write a function named `reachability` for Reachability: it takes two numbers and returns their product. Log the result of calling it with 7 and 10.",
            starterCode: "function reachability(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(reachability(7, 10));",
            solution: "function reachability(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(reachability(7, 10));",
            solutionExplanation: "The function returns 7 * 10 = 70, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "70", hidden: false },
              { name: "Output contains the expected value", expectedContains: "70", hidden: true }
            ],
            hintNotes: { concept: "The `reachability` code models Reachability with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-memory-m1-l3",
          slug: "ts-memory-m1-l3",
          title: "Memory leaks",
          concept: "A memory leak happens when objects that should be dead stay reachable, so memory grows until the process slows or crashes. In this track you apply it while building memory-efficient program features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];",
          exampleCode: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Memory leaks.",
          bug: { prompt: "This loop for Memory leaks produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Memory leaks",
            type: "multiple-choice",
            instructions: "Which statement about Memory leaks is correct?",
            starterCode: "",
            solution: "A memory leak happens when objects that should be dead stay reachable, so memory grows until the process slows or crashes.",
            solutionExplanation: "A memory leak happens when objects that should be dead stay reachable, so memory grows until the process slows or crashes. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A memory leak happens when objects that should be dead stay reachable, so memory grows until the process slows or crashes.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Memory leaks really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Memory leaks can only be used once in a program.", "A memory leak happens when objects that should be dead stay reachable, so memory grows until the process slows or crashes.", "Memory leaks requires a separate paid licence to use.", "Memory leaks is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-memory-m1-l4",
          slug: "ts-memory-m1-l4",
          title: "Closures and retention",
          concept: "A closure keeps every variable it captures alive, so a long-lived closure can retain a large object by accident. Mastering it makes your memory-efficient program code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 10, beta: 5 };",
          exampleCode: "const config: Record<string, number> = { alpha: 10, beta: 5 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Closures and retention, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Closures and retention changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the closuresRetention function",
            type: "build-function",
            instructions: "Write a function named `closuresRetention` for Closures and retention: it takes two numbers and returns the first minus the second. Log the result of calling it with 11 and 6.",
            starterCode: "function closuresRetention(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(closuresRetention(11, 6));",
            solution: "function closuresRetention(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(closuresRetention(11, 6));",
            solutionExplanation: "The function returns 11 - 6 = 5, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `closuresRetention` code models Closures and retention with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-memory-m1-l5",
          slug: "ts-memory-m1-l5",
          title: "Weak references",
          concept: "A WeakRef holds an object without keeping it alive, so the garbage collector can still free it when nothing else needs it. In this track you apply it while building memory-efficient program features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 4 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Weak references code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Weak references crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the weakReferences function",
            type: "build-function",
            instructions: "Write a function named `weakReferences` for Weak references: it takes three numbers and returns a * b + c. Log the result of calling it with 7, 8 and 3.",
            starterCode: "function weakReferences(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(weakReferences(7, 8, 3));",
            solution: "function weakReferences(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(weakReferences(7, 8, 3));",
            solutionExplanation: "The function returns 7 * 8 + 3 = 59, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "59", hidden: false },
              { name: "Output contains the expected value", expectedContains: "59", hidden: true }
            ],
            hintNotes: { concept: "The `weakReferences` code models Weak references with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-memory-m2",
        title: "Memory Management in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-memory-m2-l1",
          slug: "ts-memory-m2-l1",
          title: "WeakMap and WeakSet",
          concept: "WeakMap and WeakSet store data keyed by objects without preventing those objects from being collected. Mastering it makes your memory-efficient program code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"weakmap\", 7));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by WeakMap and WeakSet is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for WeakMap and WeakSet prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in WeakMap and WeakSet",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: zeta, alpha, beta, gamma. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"zeta\", \"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 4 items, so items.length is 4.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "4", hidden: false },
              { name: "Output contains the expected value", expectedContains: "4", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models WeakMap and WeakSet with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-memory-m2-l2",
          slug: "ts-memory-m2-l2",
          title: "Detached DOM nodes",
          concept: "Detached DOM nodes are elements removed from the page but still referenced by code, and they are a classic browser memory leak. In this track you apply it while building memory-efficient program features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];",
          exampleCode: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Detached DOM nodes values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Detached DOM nodes: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Detached DOM nodes",
            type: "multiple-choice",
            instructions: "Which statement about Detached DOM nodes is correct?",
            starterCode: "",
            solution: "Detached DOM nodes are elements removed from the page but still referenced by code, and they are a classic browser memory leak.",
            solutionExplanation: "Detached DOM nodes are elements removed from the page but still referenced by code, and they are a classic browser memory leak. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Detached DOM nodes are elements removed from the page but still referenced by code, and they are a classic browser memory leak.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Detached DOM nodes really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Detached DOM nodes can only be used once in a program.", "Detached DOM nodes requires a separate paid licence to use.", "Detached DOM nodes are elements removed from the page but still referenced by code, and they are a classic browser memory leak.", "Detached DOM nodes is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-memory-m2-l3",
          slug: "ts-memory-m2-l3",
          title: "Event listener leaks",
          concept: "Event listeners that are never removed keep their target and closure alive, leaking memory on every repeated registration. Mastering it makes your memory-efficient program code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 4, beta: 9 };",
          exampleCode: "const config: Record<string, number> = { alpha: 4, beta: 9 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Event listener leaks can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Event listener leaks logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Event listener leaks",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"beta\", \"gamma\", \"delta\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"beta\", \"gamma\", \"delta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"BETA, GAMMA, DELTA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "BETA, GAMMA, DELTA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "BETA, GAMMA, DELTA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Event listener leaks with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-memory-m2-l4",
          slug: "ts-memory-m2-l4",
          title: "Measuring memory",
          concept: "Memory is measured with heap snapshots and allocation timelines, which show what is growing and where it was allocated. In this track you apply it while building memory-efficient program features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 7 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Measuring memory.",
          bug: { prompt: "This loop for Measuring memory produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Measuring memory",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(6 * 5 + 7);",
            starterCode: "",
            solution: "37",
            solutionExplanation: "The program computes 6 * 5 + 7 = 37.",
            tests: [
              { name: "Correct answer", expectedContains: "37", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 6 * 5, then add 7.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["30", "37", "18", "23"],
            answerIndex: 1,
          }
        },
        {
          id: "ts-memory-m2-l5",
          slug: "ts-memory-m2-l5",
          title: "Designing for low memory",
          concept: "Low-memory code reuses buffers, avoids needless copies, and releases large references as soon as it is done with them. Mastering it makes your memory-efficient program code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"designing\", 10));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Designing for low memory, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Designing for low memory changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the DesigningLow config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `DesigningLowConfig` for Designing for low memory with name \"delta\", retries 4 and enabled true, then log it with JSON.stringify.",
            starterCode: "type DesigningLowConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DesigningLowConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type DesigningLowConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DesigningLowConfig = { name: \"delta\", retries: 4, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"delta\",\"retries\":4,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"delta\",\"retries\":4,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"delta\",\"retries\":4,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Designing for low memory with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: memory-efficient program progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your memory-efficient program project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 18 of 20 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 20, done: 18, rate: completionRate(18, 20) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(18, 20) is Math.round((18 / 20) * 100) = 90, so the summary stringifies to {\"tasks\":20,\"done\":18,\"rate\":90}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":20,\"done\":18,\"rate\":90}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":90", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Memory Management in TypeScript Capstone Project",
      description: "Build a small working memory-efficient program application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core memory-efficient program features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-debugging-adv",
    slug: "ts-debugging-adv",
    language: "typescript",
    category: "languages",
    title: "Advanced Debugging in TypeScript",
    description: "Advanced TypeScript: debug TypeScript like a professional, from breakpoints to production incidents",
    difficulty: "Advanced",
    estimatedHours: 20,
    skills: ["Breakpoints", "Call stack analysis", "Async debugging", "Source maps", "Logpoints", "Regression tests"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like being a detective who reconstructs the crime from the clues left behind",
    modules: [
      {
        id: "ts-debugging-adv-m1",
        title: "Advanced Debugging in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-debugging-adv-m1-l1",
          slug: "ts-debugging-adv-m1-l1",
          title: "Reproducing first",
          concept: "A bug is only debuggable once it reproduces reliably, so the first step is always a minimal reproduction. In this track you apply it while building debugging session features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 2 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Reproducing first values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Reproducing first: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the reproducingFirst function",
            type: "build-function",
            instructions: "Write a function named `reproducingFirst` for Reproducing first: it takes two numbers and returns their sum. Log the result of calling it with 2 and 5.",
            starterCode: "function reproducingFirst(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(reproducingFirst(2, 5));",
            solution: "function reproducingFirst(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(reproducingFirst(2, 5));",
            solutionExplanation: "The function returns 2 + 5 = 7, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "7", hidden: false },
              { name: "Output contains the expected value", expectedContains: "7", hidden: true }
            ],
            hintNotes: { concept: "The `reproducingFirst` code models Reproducing first with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-debugging-adv-m1-l2",
          slug: "ts-debugging-adv-m1-l2",
          title: "Breakpoints",
          concept: "A breakpoint pauses execution at a line, letting you inspect variables and the call stack at that exact moment. Mastering it makes your debugging session code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"breakpoints\", 5));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Breakpoints can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Breakpoints logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the breakpoints function",
            type: "build-function",
            instructions: "Write a function named `breakpoints` for Breakpoints: it takes two numbers and returns their product. Log the result of calling it with 5 and 7.",
            starterCode: "function breakpoints(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(breakpoints(5, 7));",
            solution: "function breakpoints(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(breakpoints(5, 7));",
            solutionExplanation: "The function returns 5 * 7 = 35, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "35", hidden: false },
              { name: "Output contains the expected value", expectedContains: "35", hidden: true }
            ],
            hintNotes: { concept: "The `breakpoints` code models Breakpoints with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-debugging-adv-m1-l3",
          slug: "ts-debugging-adv-m1-l3",
          title: "Conditional breakpoints",
          concept: "A conditional breakpoint pauses only when an expression is true, which finds one bad case in a loop of thousands. In this track you apply it while building debugging session features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];",
          exampleCode: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Conditional breakpoints.",
          bug: { prompt: "This loop for Conditional breakpoints produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Conditional breakpoints",
            type: "multiple-choice",
            instructions: "Which statement about Conditional breakpoints is correct?",
            starterCode: "",
            solution: "A conditional breakpoint pauses only when an expression is true, which finds one bad case in a loop of thousands.",
            solutionExplanation: "A conditional breakpoint pauses only when an expression is true, which finds one bad case in a loop of thousands. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A conditional breakpoint pauses only when an expression is true, which finds one bad case in a loop of thousands.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Conditional breakpoints really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Conditional breakpoints can only be used once in a program.", "Conditional breakpoints requires a separate paid licence to use.", "A conditional breakpoint pauses only when an expression is true, which finds one bad case in a loop of thousands.", "Conditional breakpoints is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-debugging-adv-m1-l4",
          slug: "ts-debugging-adv-m1-l4",
          title: "The call stack",
          concept: "The call stack shows the chain of function calls that led to the current line, which is usually where the bug started. Mastering it makes your debugging session code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 2, beta: 7 };",
          exampleCode: "const config: Record<string, number> = { alpha: 2, beta: 7 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with The call stack, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for The call stack changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the callStack function",
            type: "build-function",
            instructions: "Write a function named `callStack` for The call stack: it takes two numbers and returns the first minus the second. Log the result of calling it with 9 and 3.",
            starterCode: "function callStack(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(callStack(9, 3));",
            solution: "function callStack(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(callStack(9, 3));",
            solutionExplanation: "The function returns 9 - 3 = 6, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "6", hidden: false },
              { name: "Output contains the expected value", expectedContains: "6", hidden: true }
            ],
            hintNotes: { concept: "The `callStack` code models The call stack with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-debugging-adv-m1-l5",
          slug: "ts-debugging-adv-m1-l5",
          title: "Watch expressions",
          concept: "Watch expressions re-evaluate a value at every pause, so you can see exactly when it changes. In this track you apply it while building debugging session features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 5 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Watch expressions code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Watch expressions crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the watchExpressions function",
            type: "build-function",
            instructions: "Write a function named `watchExpressions` for Watch expressions: it takes three numbers and returns a * b + c. Log the result of calling it with 5, 5 and 6.",
            starterCode: "function watchExpressions(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(watchExpressions(5, 5, 6));",
            solution: "function watchExpressions(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(watchExpressions(5, 5, 6));",
            solutionExplanation: "The function returns 5 * 5 + 6 = 31, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "31", hidden: false },
              { name: "Output contains the expected value", expectedContains: "31", hidden: true }
            ],
            hintNotes: { concept: "The `watchExpressions` code models Watch expressions with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-debugging-adv-m2",
        title: "Advanced Debugging in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-debugging-adv-m2-l1",
          slug: "ts-debugging-adv-m2-l1",
          title: "Logpoints",
          concept: "A logpoint prints a value without pausing, which is useful when stopping would change the program's timing. Mastering it makes your debugging session code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"logpoints\", 8));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Logpoints is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Logpoints prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Logpoints",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: beta, gamma, delta, sigma, omega. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"beta\", \"gamma\", \"delta\", \"sigma\", \"omega\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 5 items, so items.length is 5.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Logpoints with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-debugging-adv-m2-l2",
          slug: "ts-debugging-adv-m2-l2",
          title: "Debugging async code",
          concept: "Async bugs are traced through promise chains and async stacks, because the cause often ran long before the failure surfaced. In this track you apply it while building debugging session features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];",
          exampleCode: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Debugging async code values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Debugging async code: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Debugging async code",
            type: "multiple-choice",
            instructions: "Which statement about Debugging async code is correct?",
            starterCode: "",
            solution: "Async bugs are traced through promise chains and async stacks, because the cause often ran long before the failure surfaced.",
            solutionExplanation: "Async bugs are traced through promise chains and async stacks, because the cause often ran long before the failure surfaced. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Async bugs are traced through promise chains and async stacks, because the cause often ran long before the failure surfaced.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Debugging async code really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Debugging async code can only be used once in a program.", "Debugging async code requires a separate paid licence to use.", "Debugging async code is not available in TypeScript.", "Async bugs are traced through promise chains and async stacks, because the cause often ran long before the failure surfaced."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-debugging-adv-m2-l3",
          slug: "ts-debugging-adv-m2-l3",
          title: "Source maps",
          concept: "Source maps connect compiled JavaScript back to the original TypeScript, so breakpoints land on the code you actually wrote. Mastering it makes your debugging session code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 5, beta: 4 };",
          exampleCode: "const config: Record<string, number> = { alpha: 5, beta: 4 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Source maps can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Source maps logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Source maps",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"delta\", \"sigma\", \"omega\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"delta\", \"sigma\", \"omega\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"DELTA - SIGMA - OMEGA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "DELTA - SIGMA - OMEGA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "DELTA - SIGMA - OMEGA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Source maps with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-debugging-adv-m2-l4",
          slug: "ts-debugging-adv-m2-l4",
          title: "Debugging in production",
          concept: "Production bugs are debugged from logs, traces and error reports, since you cannot attach a debugger to a live user. In this track you apply it while building debugging session features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 8 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Debugging in production.",
          bug: { prompt: "This loop for Debugging in production produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Debugging in production",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(9 * 6 + 4);",
            starterCode: "",
            solution: "58",
            solutionExplanation: "The program computes 9 * 6 + 4 = 58.",
            tests: [
              { name: "Correct answer", expectedContains: "58", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 9 * 6, then add 4.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["54", "19", "58", "50"],
            answerIndex: 2,
          }
        },
        {
          id: "ts-debugging-adv-m2-l5",
          slug: "ts-debugging-adv-m2-l5",
          title: "A debugging workflow",
          concept: "A solid debugging workflow is reproduce, isolate, hypothesise, test the fix, and add a regression test so it never returns. Mastering it makes your debugging session code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"debugging\", 2));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with A debugging workflow, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for A debugging workflow changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the DebuggingWorkflow config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `DebuggingWorkflowConfig` for A debugging workflow with name \"omega\", retries 2 and enabled false, then log it with JSON.stringify.",
            starterCode: "type DebuggingWorkflowConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DebuggingWorkflowConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type DebuggingWorkflowConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DebuggingWorkflowConfig = { name: \"omega\", retries: 2, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"omega\",\"retries\":2,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"omega\",\"retries\":2,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"omega\",\"retries\":2,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models A debugging workflow with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: debugging session progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your debugging session project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 6 of 8 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 8, done: 6, rate: completionRate(6, 8) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(6, 8) is Math.round((6 / 8) * 100) = 75, so the summary stringifies to {\"tasks\":8,\"done\":6,\"rate\":75}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":8,\"done\":6,\"rate\":75}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":75", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Advanced Debugging in TypeScript Capstone Project",
      description: "Build a small working debugging session application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core debugging session features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-mastery-patterns",
    slug: "ts-mastery-patterns",
    language: "typescript",
    category: "languages",
    title: "TypeScript Mastery Patterns",
    description: "Advanced TypeScript: master the advanced TypeScript patterns that make illegal states unrepresentable",
    difficulty: "Advanced",
    estimatedHours: 22,
    skills: ["Branded types", "Discriminated unions", "Mapped types", "Conditional types", "Type guards", "Type-safe API design"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like learning chess openings: the patterns let you think several moves ahead",
    modules: [
      {
        id: "ts-mastery-patterns-m1",
        title: "TypeScript Mastery Patterns Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-mastery-patterns-m1-l1",
          slug: "ts-mastery-patterns-m1-l1",
          title: "Branded types",
          concept: "A branded type adds a phantom tag to a primitive, so a UserId can never be passed where an OrderId is expected. In this track you apply it while building TypeScript codebase features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 3 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Branded types values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Branded types: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the brandedTypes function",
            type: "build-function",
            instructions: "Write a function named `brandedTypes` for Branded types: it takes two numbers and returns their sum. Log the result of calling it with 9 and 10.",
            starterCode: "function brandedTypes(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(brandedTypes(9, 10));",
            solution: "function brandedTypes(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(brandedTypes(9, 10));",
            solutionExplanation: "The function returns 9 + 10 = 19, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "19", hidden: false },
              { name: "Output contains the expected value", expectedContains: "19", hidden: true }
            ],
            hintNotes: { concept: "The `brandedTypes` code models Branded types with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-mastery-patterns-m1-l2",
          slug: "ts-mastery-patterns-m1-l2",
          title: "Discriminated unions",
          concept: "A discriminated union is a union of object types sharing one literal tag field, so the compiler narrows each case exactly. Mastering it makes your TypeScript codebase code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"discriminated\", 6));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Discriminated unions can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Discriminated unions logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the discriminatedUnions function",
            type: "build-function",
            instructions: "Write a function named `discriminatedUnions` for Discriminated unions: it takes two numbers and returns their product. Log the result of calling it with 3 and 4.",
            starterCode: "function discriminatedUnions(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(discriminatedUnions(3, 4));",
            solution: "function discriminatedUnions(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(discriminatedUnions(3, 4));",
            solutionExplanation: "The function returns 3 * 4 = 12, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "12", hidden: false },
              { name: "Output contains the expected value", expectedContains: "12", hidden: true }
            ],
            hintNotes: { concept: "The `discriminatedUnions` code models Discriminated unions with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-mastery-patterns-m1-l3",
          slug: "ts-mastery-patterns-m1-l3",
          title: "Exhaustiveness checking",
          concept: "Exhaustiveness checking uses a never assignment in the default branch, so the compiler errors when a new union case is added. In this track you apply it while building TypeScript codebase features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];",
          exampleCode: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Exhaustiveness checking.",
          bug: { prompt: "This loop for Exhaustiveness checking produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Exhaustiveness checking",
            type: "multiple-choice",
            instructions: "Which statement about Exhaustiveness checking is correct?",
            starterCode: "",
            solution: "Exhaustiveness checking uses a never assignment in the default branch, so the compiler errors when a new union case is added.",
            solutionExplanation: "Exhaustiveness checking uses a never assignment in the default branch, so the compiler errors when a new union case is added. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Exhaustiveness checking uses a never assignment in the default branch, so the compiler errors when a new union case is added.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Exhaustiveness checking really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Exhaustiveness checking can only be used once in a program.", "Exhaustiveness checking requires a separate paid licence to use.", "Exhaustiveness checking is not available in TypeScript.", "Exhaustiveness checking uses a never assignment in the default branch, so the compiler errors when a new union case is added."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-mastery-patterns-m1-l4",
          slug: "ts-mastery-patterns-m1-l4",
          title: "Mapped types",
          concept: "A mapped type transforms every property of another type, such as making all of them optional or readonly. Mastering it makes your TypeScript codebase code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 3, beta: 9 };",
          exampleCode: "const config: Record<string, number> = { alpha: 3, beta: 9 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Mapped types, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Mapped types changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the mappedTypes function",
            type: "build-function",
            instructions: "Write a function named `mappedTypes` for Mapped types: it takes two numbers and returns the first minus the second. Log the result of calling it with 16 and 8.",
            starterCode: "function mappedTypes(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(mappedTypes(16, 8));",
            solution: "function mappedTypes(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(mappedTypes(16, 8));",
            solutionExplanation: "The function returns 16 - 8 = 8, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "8", hidden: false },
              { name: "Output contains the expected value", expectedContains: "8", hidden: true }
            ],
            hintNotes: { concept: "The `mappedTypes` code models Mapped types with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-mastery-patterns-m1-l5",
          slug: "ts-mastery-patterns-m1-l5",
          title: "Conditional types",
          concept: "A conditional type picks one of two types based on whether another type extends a pattern, like an if for the type system. In this track you apply it while building TypeScript codebase features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 6 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Conditional types code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Conditional types crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the conditionalTypes function",
            type: "build-function",
            instructions: "Write a function named `conditionalTypes` for Conditional types: it takes three numbers and returns a * b + c. Log the result of calling it with 3, 10 and 3.",
            starterCode: "function conditionalTypes(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(conditionalTypes(3, 10, 3));",
            solution: "function conditionalTypes(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(conditionalTypes(3, 10, 3));",
            solutionExplanation: "The function returns 3 * 10 + 3 = 33, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "33", hidden: false },
              { name: "Output contains the expected value", expectedContains: "33", hidden: true }
            ],
            hintNotes: { concept: "The `conditionalTypes` code models Conditional types with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-mastery-patterns-m2",
        title: "TypeScript Mastery Patterns in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-mastery-patterns-m2-l1",
          slug: "ts-mastery-patterns-m2-l1",
          title: "Template literal types",
          concept: "Template literal types build string types from patterns, so a type can describe strings such as `user-123` precisely. Mastering it makes your TypeScript codebase code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"template\", 9));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Template literal types is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Template literal types prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Template literal types",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: delta, sigma, omega. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"delta\", \"sigma\", \"omega\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 3 items, so items.length is 3.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "3", hidden: false },
              { name: "Output contains the expected value", expectedContains: "3", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Template literal types with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-mastery-patterns-m2-l2",
          slug: "ts-mastery-patterns-m2-l2",
          title: "Type guards",
          concept: "A type guard is a function returning `x is T`, which tells the compiler that a value has type T after the check passes. In this track you apply it while building TypeScript codebase features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];",
          exampleCode: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Type guards values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Type guards: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Type guards",
            type: "multiple-choice",
            instructions: "Which statement about Type guards is correct?",
            starterCode: "",
            solution: "A type guard is a function returning `x is T`, which tells the compiler that a value has type T after the check passes.",
            solutionExplanation: "A type guard is a function returning `x is T`, which tells the compiler that a value has type T after the check passes. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A type guard is a function returning `x is T`, which tells the compiler that a value has type T after the check passes.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Type guards really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["A type guard is a function returning `x is T`, which tells the compiler that a value has type T after the check passes.", "Type guards can only be used once in a program.", "Type guards requires a separate paid licence to use.", "Type guards is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-mastery-patterns-m2-l3",
          slug: "ts-mastery-patterns-m2-l3",
          title: "Builder pattern",
          concept: "The builder pattern chains method calls that each return a more specific type, so an incomplete object cannot be built. Mastering it makes your TypeScript codebase code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 6, beta: 6 };",
          exampleCode: "const config: Record<string, number> = { alpha: 6, beta: 6 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Builder pattern can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Builder pattern logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Builder pattern",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"omega\", \"kappa\", \"lambda\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"omega\", \"kappa\", \"lambda\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"OMEGA, KAPPA, LAMBDA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "OMEGA, KAPPA, LAMBDA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "OMEGA, KAPPA, LAMBDA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Builder pattern with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-mastery-patterns-m2-l4",
          slug: "ts-mastery-patterns-m2-l4",
          title: "Dependency injection",
          concept: "Dependency injection passes collaborators into a class instead of creating them inside, which makes the class testable. In this track you apply it while building TypeScript codebase features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 9 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Dependency injection.",
          bug: { prompt: "This loop for Dependency injection produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Dependency injection",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(5 * 7 + 9);",
            starterCode: "",
            solution: "44",
            solutionExplanation: "The program computes 5 * 7 + 9 = 44.",
            tests: [
              { name: "Correct answer", expectedContains: "44", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 5 * 7, then add 9.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["35", "21", "26", "44"],
            answerIndex: 3,
          }
        },
        {
          id: "ts-mastery-patterns-m2-l5",
          slug: "ts-mastery-patterns-m2-l5",
          title: "Designing type-safe APIs",
          concept: "A type-safe API makes illegal states unrepresentable, so the compiler rejects invalid usage before the code ever runs. Mastering it makes your TypeScript codebase code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"designing\", 3));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Designing type-safe APIs, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Designing type-safe APIs changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the DesigningTypesafe config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `DesigningTypesafeConfig` for Designing type-safe APIs with name \"lambda\", retries 9 and enabled true, then log it with JSON.stringify.",
            starterCode: "type DesigningTypesafeConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DesigningTypesafeConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type DesigningTypesafeConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DesigningTypesafeConfig = { name: \"lambda\", retries: 9, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"lambda\",\"retries\":9,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"lambda\",\"retries\":9,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"lambda\",\"retries\":9,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Designing type-safe APIs with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: TypeScript codebase progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your TypeScript codebase project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 9 of 10 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 10, done: 9, rate: completionRate(9, 10) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(9, 10) is Math.round((9 / 10) * 100) = 90, so the summary stringifies to {\"tasks\":10,\"done\":9,\"rate\":90}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":10,\"done\":9,\"rate\":90}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":90", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "TypeScript Mastery Patterns Capstone Project",
      description: "Build a small working TypeScript codebase application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core TypeScript codebase features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-build-fullstack",
    slug: "ts-build-fullstack",
    language: "typescript",
    category: "languages",
    title: "Building a Full-Stack TypeScript App",
    description: "Advanced TypeScript: plan, build, test and deploy a complete full-stack TypeScript application",
    difficulty: "Advanced",
    estimatedHours: 24,
    skills: ["Shared types", "API design", "Authentication", "Data fetching", "Forms and validation", "Full-stack deployment"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like building a house where the kitchen and the dining room share one set of plans",
    modules: [
      {
        id: "ts-build-fullstack-m1",
        title: "Building a Full-Stack TypeScript App Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-fullstack-m1-l1",
          slug: "ts-build-fullstack-m1-l1",
          title: "Planning the stack",
          concept: "A full-stack plan picks one language and shared types for the client and server, so the boundary between them stays type-safe. In this track you apply it while building full-stack application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 4 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Planning the stack values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Planning the stack: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the planningStack function",
            type: "build-function",
            instructions: "Write a function named `planningStack` for Planning the stack: it takes two numbers and returns their sum. Log the result of calling it with 7 and 7.",
            starterCode: "function planningStack(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(planningStack(7, 7));",
            solution: "function planningStack(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(planningStack(7, 7));",
            solutionExplanation: "The function returns 7 + 7 = 14, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "14", hidden: false },
              { name: "Output contains the expected value", expectedContains: "14", hidden: true }
            ],
            hintNotes: { concept: "The `planningStack` code models Planning the stack with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-fullstack-m1-l2",
          slug: "ts-build-fullstack-m1-l2",
          title: "Shared types",
          concept: "Shared types live in one package imported by both sides, so a change to an API shape breaks the build instead of the user. Mastering it makes your full-stack application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"shared\", 7));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Shared types can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Shared types logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the sharedTypes function",
            type: "build-function",
            instructions: "Write a function named `sharedTypes` for Shared types: it takes two numbers and returns their product. Log the result of calling it with 10 and 9.",
            starterCode: "function sharedTypes(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(sharedTypes(10, 9));",
            solution: "function sharedTypes(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(sharedTypes(10, 9));",
            solutionExplanation: "The function returns 10 * 9 = 90, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "90", hidden: false },
              { name: "Output contains the expected value", expectedContains: "90", hidden: true }
            ],
            hintNotes: { concept: "The `sharedTypes` code models Shared types with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-fullstack-m1-l3",
          slug: "ts-build-fullstack-m1-l3",
          title: "API design",
          concept: "A good API design names resources clearly, uses the right HTTP verbs, and returns consistent error shapes. In this track you apply it while building full-stack application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];",
          exampleCode: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for API design.",
          bug: { prompt: "This loop for API design produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: API design",
            type: "multiple-choice",
            instructions: "Which statement about API design is correct?",
            starterCode: "",
            solution: "A good API design names resources clearly, uses the right HTTP verbs, and returns consistent error shapes.",
            solutionExplanation: "A good API design names resources clearly, uses the right HTTP verbs, and returns consistent error shapes. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A good API design names resources clearly, uses the right HTTP verbs, and returns consistent error shapes.", hidden: false }
            ],
            hintNotes: { concept: "Think about what API design really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["A good API design names resources clearly, uses the right HTTP verbs, and returns consistent error shapes.", "API design can only be used once in a program.", "API design requires a separate paid licence to use.", "API design is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-build-fullstack-m1-l4",
          slug: "ts-build-fullstack-m1-l4",
          title: "Authentication flow",
          concept: "Authentication in a full-stack app means issuing a token at login and verifying it on every protected request. Mastering it makes your full-stack application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 4, beta: 4 };",
          exampleCode: "const config: Record<string, number> = { alpha: 4, beta: 4 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Authentication flow, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Authentication flow changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the authenticationFlow function",
            type: "build-function",
            instructions: "Write a function named `authenticationFlow` for Authentication flow: it takes two numbers and returns the first minus the second. Log the result of calling it with 14 and 5.",
            starterCode: "function authenticationFlow(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(authenticationFlow(14, 5));",
            solution: "function authenticationFlow(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(authenticationFlow(14, 5));",
            solutionExplanation: "The function returns 14 - 5 = 9, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "9", hidden: false },
              { name: "Output contains the expected value", expectedContains: "9", hidden: true }
            ],
            hintNotes: { concept: "The `authenticationFlow` code models Authentication flow with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-fullstack-m1-l5",
          slug: "ts-build-fullstack-m1-l5",
          title: "Data fetching",
          concept: "Data fetching on the client uses typed hooks that cache responses, refetch on focus, and show loading states. In this track you apply it while building full-stack application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 7 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Data fetching code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Data fetching crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the dataFetching function",
            type: "build-function",
            instructions: "Write a function named `dataFetching` for Data fetching: it takes three numbers and returns a * b + c. Log the result of calling it with 10, 7 and 6.",
            starterCode: "function dataFetching(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(dataFetching(10, 7, 6));",
            solution: "function dataFetching(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(dataFetching(10, 7, 6));",
            solutionExplanation: "The function returns 10 * 7 + 6 = 76, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "76", hidden: false },
              { name: "Output contains the expected value", expectedContains: "76", hidden: true }
            ],
            hintNotes: { concept: "The `dataFetching` code models Data fetching with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-build-fullstack-m2",
        title: "Building a Full-Stack TypeScript App in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-fullstack-m2-l1",
          slug: "ts-build-fullstack-m2-l1",
          title: "Forms and validation",
          concept: "Forms validate on the client for speed and on the server for safety, using the same schema on both sides. Mastering it makes your full-stack application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"forms\", 10));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Forms and validation is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Forms and validation prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Forms and validation",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: omega, kappa, lambda, theta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"omega\", \"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 4 items, so items.length is 4.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "4", hidden: false },
              { name: "Output contains the expected value", expectedContains: "4", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Forms and validation with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-fullstack-m2-l2",
          slug: "ts-build-fullstack-m2-l2",
          title: "File uploads",
          concept: "File uploads stream the file to storage and store only its metadata in the database, never the bytes themselves. In this track you apply it while building full-stack application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];",
          exampleCode: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for File uploads values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about File uploads: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: File uploads",
            type: "multiple-choice",
            instructions: "Which statement about File uploads is correct?",
            starterCode: "",
            solution: "File uploads stream the file to storage and store only its metadata in the database, never the bytes themselves.",
            solutionExplanation: "File uploads stream the file to storage and store only its metadata in the database, never the bytes themselves. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "File uploads stream the file to storage and store only its metadata in the database, never the bytes themselves.", hidden: false }
            ],
            hintNotes: { concept: "Think about what File uploads really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["File uploads can only be used once in a program.", "File uploads stream the file to storage and store only its metadata in the database, never the bytes themselves.", "File uploads requires a separate paid licence to use.", "File uploads is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-build-fullstack-m2-l3",
          slug: "ts-build-fullstack-m2-l3",
          title: "Real-time updates",
          concept: "Real-time updates push server changes to the client over a socket, so the UI reflects the database without refreshing. Mastering it makes your full-stack application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 7, beta: 8 };",
          exampleCode: "const config: Record<string, number> = { alpha: 7, beta: 8 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Real-time updates can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Real-time updates logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Real-time updates",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"LAMBDA - THETA - ZETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "LAMBDA - THETA - ZETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "LAMBDA - THETA - ZETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Real-time updates with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-fullstack-m2-l4",
          slug: "ts-build-fullstack-m2-l4",
          title: "Testing full-stack",
          concept: "Full-stack tests cover the API contract, the database behaviour, and the UI flow that ties them together. In this track you apply it while building full-stack application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 10 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Testing full-stack.",
          bug: { prompt: "This loop for Testing full-stack produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Testing full-stack",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(8 * 2 + 7);",
            starterCode: "",
            solution: "23",
            solutionExplanation: "The program computes 8 * 2 + 7 = 23.",
            tests: [
              { name: "Correct answer", expectedContains: "23", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 8 * 2, then add 7.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["23", "16", "17", "9"],
            answerIndex: 0,
          }
        },
        {
          id: "ts-build-fullstack-m2-l5",
          slug: "ts-build-fullstack-m2-l5",
          title: "Deploying full-stack",
          concept: "Deploying a full-stack app means building the client, bundling the server, and running migrations before traffic arrives. Mastering it makes your full-stack application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"deploying\", 4));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Deploying full-stack, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Deploying full-stack changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the DeployingFullstack config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `DeployingFullstackConfig` for Deploying full-stack with name \"zeta\", retries 7 and enabled false, then log it with JSON.stringify.",
            starterCode: "type DeployingFullstackConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DeployingFullstackConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type DeployingFullstackConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DeployingFullstackConfig = { name: \"zeta\", retries: 7, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"zeta\",\"retries\":7,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"zeta\",\"retries\":7,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"zeta\",\"retries\":7,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Deploying full-stack with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: full-stack application progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your full-stack application project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 3 of 4 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 4, done: 3, rate: completionRate(3, 4) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(3, 4) is Math.round((3 / 4) * 100) = 75, so the summary stringifies to {\"tasks\":4,\"done\":3,\"rate\":75}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":4,\"done\":3,\"rate\":75}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":75", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Building a Full-Stack TypeScript App Capstone Project",
      description: "Build a small working full-stack application application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core full-stack application features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-build-design-system",
    slug: "ts-build-design-system",
    language: "typescript",
    category: "languages",
    title: "Building a Design System in TypeScript",
    description: "Advanced TypeScript: design and build a reusable, accessible, themed component design system",
    difficulty: "Advanced",
    estimatedHours: 22,
    skills: ["Design tokens", "Primitive components", "Variants", "Theming", "Accessibility", "Component testing"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like designing a box of LEGO bricks where every piece fits every other piece",
    modules: [
      {
        id: "ts-build-design-system-m1",
        title: "Building a Design System in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-design-system-m1-l1",
          slug: "ts-build-design-system-m1-l1",
          title: "Design tokens",
          concept: "Design tokens are named values for colour, spacing and type, so a brand change updates every component at once. In this track you apply it while building design system features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 5 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Design tokens values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Design tokens: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the designTokens function",
            type: "build-function",
            instructions: "Write a function named `designTokens` for Design tokens: it takes two numbers and returns their sum. Log the result of calling it with 5 and 4.",
            starterCode: "function designTokens(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(designTokens(5, 4));",
            solution: "function designTokens(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(designTokens(5, 4));",
            solutionExplanation: "The function returns 5 + 4 = 9, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "9", hidden: false },
              { name: "Output contains the expected value", expectedContains: "9", hidden: true }
            ],
            hintNotes: { concept: "The `designTokens` code models Design tokens with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-design-system-m1-l2",
          slug: "ts-build-design-system-m1-l2",
          title: "Primitive components",
          concept: "Primitive components such as Button and Input are the smallest building blocks, with typed props for every variant. Mastering it makes your design system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"primitive\", 8));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Primitive components can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Primitive components logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the primitiveComponents function",
            type: "build-function",
            instructions: "Write a function named `primitiveComponents` for Primitive components: it takes two numbers and returns their product. Log the result of calling it with 8 and 6.",
            starterCode: "function primitiveComponents(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(primitiveComponents(8, 6));",
            solution: "function primitiveComponents(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(primitiveComponents(8, 6));",
            solutionExplanation: "The function returns 8 * 6 = 48, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "48", hidden: false },
              { name: "Output contains the expected value", expectedContains: "48", hidden: true }
            ],
            hintNotes: { concept: "The `primitiveComponents` code models Primitive components with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-design-system-m1-l3",
          slug: "ts-build-design-system-m1-l3",
          title: "Component variants",
          concept: "Component variants are named prop combinations, such as primary and danger, that keep styling consistent across the app. In this track you apply it while building design system features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];",
          exampleCode: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Component variants.",
          bug: { prompt: "This loop for Component variants produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Component variants",
            type: "multiple-choice",
            instructions: "Which statement about Component variants is correct?",
            starterCode: "",
            solution: "Component variants are named prop combinations, such as primary and danger, that keep styling consistent across the app.",
            solutionExplanation: "Component variants are named prop combinations, such as primary and danger, that keep styling consistent across the app. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Component variants are named prop combinations, such as primary and danger, that keep styling consistent across the app.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Component variants really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Component variants can only be used once in a program.", "Component variants are named prop combinations, such as primary and danger, that keep styling consistent across the app.", "Component variants requires a separate paid licence to use.", "Component variants is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-build-design-system-m1-l4",
          slug: "ts-build-design-system-m1-l4",
          title: "Theming",
          concept: "Theming swaps a set of design tokens at runtime, so dark mode or a brand theme needs no component changes. Mastering it makes your design system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 5, beta: 6 };",
          exampleCode: "const config: Record<string, number> = { alpha: 5, beta: 6 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Theming, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Theming changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the theming function",
            type: "build-function",
            instructions: "Write a function named `theming` for Theming: it takes two numbers and returns the first minus the second. Log the result of calling it with 12 and 10.",
            starterCode: "function theming(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(theming(12, 10));",
            solution: "function theming(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(theming(12, 10));",
            solutionExplanation: "The function returns 12 - 10 = 2, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "2", hidden: false },
              { name: "Output contains the expected value", expectedContains: "2", hidden: true }
            ],
            hintNotes: { concept: "The `theming` code models Theming with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-design-system-m1-l5",
          slug: "ts-build-design-system-m1-l5",
          title: "Accessibility in components",
          concept: "Accessible components manage focus, keyboard interaction and ARIA attributes, so every user can operate them. In this track you apply it while building design system features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 8 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Accessibility in components code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Accessibility in components crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the accessibilityComponents function",
            type: "build-function",
            instructions: "Write a function named `accessibilityComponents` for Accessibility in components: it takes three numbers and returns a * b + c. Log the result of calling it with 8, 4 and 3.",
            starterCode: "function accessibilityComponents(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(accessibilityComponents(8, 4, 3));",
            solution: "function accessibilityComponents(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(accessibilityComponents(8, 4, 3));",
            solutionExplanation: "The function returns 8 * 4 + 3 = 35, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "35", hidden: false },
              { name: "Output contains the expected value", expectedContains: "35", hidden: true }
            ],
            hintNotes: { concept: "The `accessibilityComponents` code models Accessibility in components with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-build-design-system-m2",
        title: "Building a Design System in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-design-system-m2-l1",
          slug: "ts-build-design-system-m2-l1",
          title: "Documenting components",
          concept: "A design system documents each component with live examples and prop tables, so teams adopt it instead of rebuilding. Mastering it makes your design system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"documenting\", 2));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Documenting components is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Documenting components prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Documenting components",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: lambda, theta, zeta, alpha, beta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"lambda\", \"theta\", \"zeta\", \"alpha\", \"beta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 5 items, so items.length is 5.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Documenting components with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-design-system-m2-l2",
          slug: "ts-build-design-system-m2-l2",
          title: "Versioning components",
          concept: "Components are versioned so a breaking prop change ships as a major release and existing apps keep working. In this track you apply it while building design system features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];",
          exampleCode: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Versioning components values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Versioning components: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Versioning components",
            type: "multiple-choice",
            instructions: "Which statement about Versioning components is correct?",
            starterCode: "",
            solution: "Components are versioned so a breaking prop change ships as a major release and existing apps keep working.",
            solutionExplanation: "Components are versioned so a breaking prop change ships as a major release and existing apps keep working. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Components are versioned so a breaking prop change ships as a major release and existing apps keep working.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Versioning components really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Versioning components can only be used once in a program.", "Versioning components requires a separate paid licence to use.", "Components are versioned so a breaking prop change ships as a major release and existing apps keep working.", "Versioning components is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-build-design-system-m2-l3",
          slug: "ts-build-design-system-m2-l3",
          title: "Testing components",
          concept: "Component tests render each variant and assert its behaviour, catching visual and logic regressions together. Mastering it makes your design system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 8, beta: 3 };",
          exampleCode: "const config: Record<string, number> = { alpha: 8, beta: 3 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Testing components can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Testing components logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Testing components",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"ZETA, ALPHA, BETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "ZETA, ALPHA, BETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "ZETA, ALPHA, BETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Testing components with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-design-system-m2-l4",
          slug: "ts-build-design-system-m2-l4",
          title: "Publishing the system",
          concept: "Publishing a design system means shipping typed packages with styles, so consumers install it like any library. In this track you apply it while building design system features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 2 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Publishing the system.",
          bug: { prompt: "This loop for Publishing the system produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Publishing the system",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(4 * 3 + 3);",
            starterCode: "",
            solution: "15",
            solutionExplanation: "The program computes 4 * 3 + 3 = 15.",
            tests: [
              { name: "Correct answer", expectedContains: "15", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 4 * 3, then add 3.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["12", "15", "10", "9"],
            answerIndex: 1,
          }
        },
        {
          id: "ts-build-design-system-m2-l5",
          slug: "ts-build-design-system-m2-l5",
          title: "Adopting the system",
          concept: "Adoption succeeds when the system solves real team pain, with migration guides and support for the first projects. Mastering it makes your design system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"adopting\", 5));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Adopting the system, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Adopting the system changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the AdoptingSystem config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `AdoptingSystemConfig` for Adopting the system with name \"beta\", retries 5 and enabled true, then log it with JSON.stringify.",
            starterCode: "type AdoptingSystemConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: AdoptingSystemConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type AdoptingSystemConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: AdoptingSystemConfig = { name: \"beta\", retries: 5, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"beta\",\"retries\":5,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"beta\",\"retries\":5,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"beta\",\"retries\":5,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Adopting the system with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: design system progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your design system project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 1 of 2 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 2, done: 1, rate: completionRate(1, 2) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(1, 2) is Math.round((1 / 2) * 100) = 50, so the summary stringifies to {\"tasks\":2,\"done\":1,\"rate\":50}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":2,\"done\":1,\"rate\":50}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":50", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Building a Design System in TypeScript Capstone Project",
      description: "Build a small working design system application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core design system features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-build-cli",
    slug: "ts-build-cli",
    language: "typescript",
    category: "languages",
    title: "Building a CLI in TypeScript",
    description: "Advanced TypeScript: build a polished command-line tool in TypeScript, from argument parsing to distribution",
    difficulty: "Advanced",
    estimatedHours: 22,
    skills: ["Argument parsing", "Subcommands", "Interactive prompts", "Exit codes", "Configuration", "CLI testing"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like learning to give clear orders to a very literal assistant",
    modules: [
      {
        id: "ts-build-cli-m1",
        title: "Building a CLI in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-cli-m1-l1",
          slug: "ts-build-cli-m1-l1",
          title: "CLI anatomy",
          concept: "A CLI reads arguments from the command line, runs a command, and prints results to standard output. In this track you apply it while building command-line tool features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 6 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for CLI anatomy values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about CLI anatomy: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the cLIAnatomy function",
            type: "build-function",
            instructions: "Write a function named `cLIAnatomy` for CLI anatomy: it takes two numbers and returns their sum. Log the result of calling it with 3 and 9.",
            starterCode: "function cLIAnatomy(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(cLIAnatomy(3, 9));",
            solution: "function cLIAnatomy(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(cLIAnatomy(3, 9));",
            solutionExplanation: "The function returns 3 + 9 = 12, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "12", hidden: false },
              { name: "Output contains the expected value", expectedContains: "12", hidden: true }
            ],
            hintNotes: { concept: "The `cLIAnatomy` code models CLI anatomy with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-cli-m1-l2",
          slug: "ts-build-cli-m1-l2",
          title: "Argument parsing",
          concept: "Argument parsing turns raw strings into typed options and flags, with help text generated from the definitions. Mastering it makes your command-line tool code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"argument\", 9));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Argument parsing can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Argument parsing logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the argumentParsing function",
            type: "build-function",
            instructions: "Write a function named `argumentParsing` for Argument parsing: it takes two numbers and returns their product. Log the result of calling it with 6 and 3.",
            starterCode: "function argumentParsing(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(argumentParsing(6, 3));",
            solution: "function argumentParsing(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(argumentParsing(6, 3));",
            solutionExplanation: "The function returns 6 * 3 = 18, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "18", hidden: false },
              { name: "Output contains the expected value", expectedContains: "18", hidden: true }
            ],
            hintNotes: { concept: "The `argumentParsing` code models Argument parsing with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-cli-m1-l3",
          slug: "ts-build-cli-m1-l3",
          title: "Subcommands",
          concept: "Subcommands group related actions under one tool, such as git commit and git push, each with its own options. In this track you apply it while building command-line tool features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];",
          exampleCode: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Subcommands.",
          bug: { prompt: "This loop for Subcommands produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Subcommands",
            type: "multiple-choice",
            instructions: "Which statement about Subcommands is correct?",
            starterCode: "",
            solution: "Subcommands group related actions under one tool, such as git commit and git push, each with its own options.",
            solutionExplanation: "Subcommands group related actions under one tool, such as git commit and git push, each with its own options. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Subcommands group related actions under one tool, such as git commit and git push, each with its own options.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Subcommands really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Subcommands can only be used once in a program.", "Subcommands requires a separate paid licence to use.", "Subcommands group related actions under one tool, such as git commit and git push, each with its own options.", "Subcommands is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-build-cli-m1-l4",
          slug: "ts-build-cli-m1-l4",
          title: "Interactive prompts",
          concept: "Interactive prompts ask the user questions in the terminal, validating answers before the command proceeds. Mastering it makes your command-line tool code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 6, beta: 8 };",
          exampleCode: "const config: Record<string, number> = { alpha: 6, beta: 8 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Interactive prompts, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Interactive prompts changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the interactivePrompts function",
            type: "build-function",
            instructions: "Write a function named `interactivePrompts` for Interactive prompts: it takes two numbers and returns the first minus the second. Log the result of calling it with 10 and 7.",
            starterCode: "function interactivePrompts(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(interactivePrompts(10, 7));",
            solution: "function interactivePrompts(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(interactivePrompts(10, 7));",
            solutionExplanation: "The function returns 10 - 7 = 3, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "3", hidden: false },
              { name: "Output contains the expected value", expectedContains: "3", hidden: true }
            ],
            hintNotes: { concept: "The `interactivePrompts` code models Interactive prompts with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-cli-m1-l5",
          slug: "ts-build-cli-m1-l5",
          title: "Exit codes",
          concept: "A CLI signals success with exit code 0 and failure with a non-zero code, so scripts can react to the result. In this track you apply it while building command-line tool features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 9 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Exit codes code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Exit codes crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the exitCodes function",
            type: "build-function",
            instructions: "Write a function named `exitCodes` for Exit codes: it takes three numbers and returns a * b + c. Log the result of calling it with 6, 9 and 6.",
            starterCode: "function exitCodes(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(exitCodes(6, 9, 6));",
            solution: "function exitCodes(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(exitCodes(6, 9, 6));",
            solutionExplanation: "The function returns 6 * 9 + 6 = 60, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "60", hidden: false },
              { name: "Output contains the expected value", expectedContains: "60", hidden: true }
            ],
            hintNotes: { concept: "The `exitCodes` code models Exit codes with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-build-cli-m2",
        title: "Building a CLI in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-cli-m2-l1",
          slug: "ts-build-cli-m2-l1",
          title: "Configuration files",
          concept: "CLIs load configuration from files and environment variables, with flags overriding files for one-off runs. Mastering it makes your command-line tool code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"configuration\", 3));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Configuration files is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Configuration files prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Configuration files",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: zeta, alpha, beta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"zeta\", \"alpha\", \"beta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 3 items, so items.length is 3.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "3", hidden: false },
              { name: "Output contains the expected value", expectedContains: "3", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Configuration files with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-cli-m2-l2",
          slug: "ts-build-cli-m2-l2",
          title: "Progress output",
          concept: "Long-running CLIs show progress with spinners and bars, and keep machine-readable output clean for piping. In this track you apply it while building command-line tool features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];",
          exampleCode: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Progress output values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Progress output: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Progress output",
            type: "multiple-choice",
            instructions: "Which statement about Progress output is correct?",
            starterCode: "",
            solution: "Long-running CLIs show progress with spinners and bars, and keep machine-readable output clean for piping.",
            solutionExplanation: "Long-running CLIs show progress with spinners and bars, and keep machine-readable output clean for piping. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Long-running CLIs show progress with spinners and bars, and keep machine-readable output clean for piping.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Progress output really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Progress output can only be used once in a program.", "Progress output requires a separate paid licence to use.", "Progress output is not available in TypeScript.", "Long-running CLIs show progress with spinners and bars, and keep machine-readable output clean for piping."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-build-cli-m2-l3",
          slug: "ts-build-cli-m2-l3",
          title: "Error handling in CLIs",
          concept: "Good CLIs print a clear error message and a hint, then exit non-zero, instead of dumping a stack trace. Mastering it makes your command-line tool code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 9, beta: 5 };",
          exampleCode: "const config: Record<string, number> = { alpha: 9, beta: 5 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Error handling in CLIs can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Error handling in CLIs logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Error handling in CLIs",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"beta\", \"gamma\", \"delta\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"beta\", \"gamma\", \"delta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"BETA - GAMMA - DELTA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "BETA - GAMMA - DELTA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "BETA - GAMMA - DELTA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Error handling in CLIs with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-cli-m2-l4",
          slug: "ts-build-cli-m2-l4",
          title: "Distributing a CLI",
          concept: "A CLI ships as an npm package with a bin entry, so users install it once and run it from anywhere. In this track you apply it while building command-line tool features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 3 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Distributing a CLI.",
          bug: { prompt: "This loop for Distributing a CLI produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Distributing a CLI",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(7 * 4 + 8);",
            starterCode: "",
            solution: "36",
            solutionExplanation: "The program computes 7 * 4 + 8 = 36.",
            tests: [
              { name: "Correct answer", expectedContains: "36", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 7 * 4, then add 8.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["28", "19", "36", "20"],
            answerIndex: 2,
          }
        },
        {
          id: "ts-build-cli-m2-l5",
          slug: "ts-build-cli-m2-l5",
          title: "Testing a CLI",
          concept: "CLI tests run the built binary with arguments and assert on its output and exit code, exactly like a user would. Mastering it makes your command-line tool code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"testing\", 6));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Testing a CLI, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Testing a CLI changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the TestingCLI config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `TestingCLIConfig` for Testing a CLI with name \"delta\", retries 3 and enabled false, then log it with JSON.stringify.",
            starterCode: "type TestingCLIConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: TestingCLIConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type TestingCLIConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: TestingCLIConfig = { name: \"delta\", retries: 3, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"delta\",\"retries\":3,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"delta\",\"retries\":3,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"delta\",\"retries\":3,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Testing a CLI with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: command-line tool progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your command-line tool project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 7 of 10 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 10, done: 7, rate: completionRate(7, 10) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(7, 10) is Math.round((7 / 10) * 100) = 70, so the summary stringifies to {\"tasks\":10,\"done\":7,\"rate\":70}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":10,\"done\":7,\"rate\":70}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":70", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Building a CLI in TypeScript Capstone Project",
      description: "Build a small working command-line tool application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core command-line tool features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-build-dashboard",
    slug: "ts-build-dashboard",
    language: "typescript",
    category: "languages",
    title: "Building a Real-Time Dashboard",
    description: "Advanced TypeScript: build a real-time dashboard that turns live data into decisions",
    difficulty: "Advanced",
    estimatedHours: 24,
    skills: ["Dashboard layout", "Live data feeds", "Chart selection", "Aggregations", "Alerts", "Dashboard performance"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like running a control room where every screen shows what is happening right now",
    modules: [
      {
        id: "ts-build-dashboard-m1",
        title: "Building a Real-Time Dashboard Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-dashboard-m1-l1",
          slug: "ts-build-dashboard-m1-l1",
          title: "Dashboard layout",
          concept: "A dashboard layout organises metrics into cards and charts, with the most important numbers visible without scrolling. In this track you apply it while building real-time dashboard features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 7 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Dashboard layout values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Dashboard layout: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the dashboardLayout function",
            type: "build-function",
            instructions: "Write a function named `dashboardLayout` for Dashboard layout: it takes two numbers and returns their sum. Log the result of calling it with 10 and 6.",
            starterCode: "function dashboardLayout(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(dashboardLayout(10, 6));",
            solution: "function dashboardLayout(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(dashboardLayout(10, 6));",
            solutionExplanation: "The function returns 10 + 6 = 16, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "16", hidden: false },
              { name: "Output contains the expected value", expectedContains: "16", hidden: true }
            ],
            hintNotes: { concept: "The `dashboardLayout` code models Dashboard layout with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-dashboard-m1-l2",
          slug: "ts-build-dashboard-m1-l2",
          title: "Live data feeds",
          concept: "Live dashboards subscribe to a data feed and update their widgets as new values arrive. Mastering it makes your real-time dashboard code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"live\", 10));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Live data feeds can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Live data feeds logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the liveData function",
            type: "build-function",
            instructions: "Write a function named `liveData` for Live data feeds: it takes two numbers and returns their product. Log the result of calling it with 4 and 8.",
            starterCode: "function liveData(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(liveData(4, 8));",
            solution: "function liveData(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(liveData(4, 8));",
            solutionExplanation: "The function returns 4 * 8 = 32, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "32", hidden: false },
              { name: "Output contains the expected value", expectedContains: "32", hidden: true }
            ],
            hintNotes: { concept: "The `liveData` code models Live data feeds with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-dashboard-m1-l3",
          slug: "ts-build-dashboard-m1-l3",
          title: "Chart selection",
          concept: "Choosing a chart means matching the data: lines for trends over time, bars for comparisons, and gauges for single values. In this track you apply it while building real-time dashboard features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];",
          exampleCode: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Chart selection.",
          bug: { prompt: "This loop for Chart selection produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Chart selection",
            type: "multiple-choice",
            instructions: "Which statement about Chart selection is correct?",
            starterCode: "",
            solution: "Choosing a chart means matching the data: lines for trends over time, bars for comparisons, and gauges for single values.",
            solutionExplanation: "Choosing a chart means matching the data: lines for trends over time, bars for comparisons, and gauges for single values. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Choosing a chart means matching the data: lines for trends over time, bars for comparisons, and gauges for single values.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Chart selection really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Chart selection can only be used once in a program.", "Chart selection requires a separate paid licence to use.", "Chart selection is not available in TypeScript.", "Choosing a chart means matching the data: lines for trends over time, bars for comparisons, and gauges for single values."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-build-dashboard-m1-l4",
          slug: "ts-build-dashboard-m1-l4",
          title: "Aggregating metrics",
          concept: "Metrics are aggregated into windows such as per-minute averages, so a dashboard shows trends instead of noise. Mastering it makes your real-time dashboard code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 7, beta: 3 };",
          exampleCode: "const config: Record<string, number> = { alpha: 7, beta: 3 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Aggregating metrics, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Aggregating metrics changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the aggregatingMetrics function",
            type: "build-function",
            instructions: "Write a function named `aggregatingMetrics` for Aggregating metrics: it takes two numbers and returns the first minus the second. Log the result of calling it with 17 and 4.",
            starterCode: "function aggregatingMetrics(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(aggregatingMetrics(17, 4));",
            solution: "function aggregatingMetrics(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(aggregatingMetrics(17, 4));",
            solutionExplanation: "The function returns 17 - 4 = 13, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "13", hidden: false },
              { name: "Output contains the expected value", expectedContains: "13", hidden: true }
            ],
            hintNotes: { concept: "The `aggregatingMetrics` code models Aggregating metrics with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-dashboard-m1-l5",
          slug: "ts-build-dashboard-m1-l5",
          title: "Filtering dashboards",
          concept: "Dashboard filters narrow every widget to one slice of data, such as a single region or time range. In this track you apply it while building real-time dashboard features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 10 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Filtering dashboards code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Filtering dashboards crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the filteringDashboards function",
            type: "build-function",
            instructions: "Write a function named `filteringDashboards` for Filtering dashboards: it takes three numbers and returns a * b + c. Log the result of calling it with 4, 6 and 3.",
            starterCode: "function filteringDashboards(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(filteringDashboards(4, 6, 3));",
            solution: "function filteringDashboards(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(filteringDashboards(4, 6, 3));",
            solutionExplanation: "The function returns 4 * 6 + 3 = 27, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "27", hidden: false },
              { name: "Output contains the expected value", expectedContains: "27", hidden: true }
            ],
            hintNotes: { concept: "The `filteringDashboards` code models Filtering dashboards with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-build-dashboard-m2",
        title: "Building a Real-Time Dashboard in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-dashboard-m2-l1",
          slug: "ts-build-dashboard-m2-l1",
          title: "Alerts",
          concept: "Alerts fire when a metric crosses a threshold, turning a dashboard from a display into an early warning system. Mastering it makes your real-time dashboard code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"alerts\", 4));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Alerts is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Alerts prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Alerts",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: beta, gamma, delta, sigma. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"beta\", \"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 4 items, so items.length is 4.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "4", hidden: false },
              { name: "Output contains the expected value", expectedContains: "4", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Alerts with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-dashboard-m2-l2",
          slug: "ts-build-dashboard-m2-l2",
          title: "Handling gaps in data",
          concept: "Missing data shows up as gaps, and a dashboard should mark them as unknown instead of drawing a misleading zero. In this track you apply it while building real-time dashboard features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];",
          exampleCode: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Handling gaps in data values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Handling gaps in data: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Handling gaps in data",
            type: "multiple-choice",
            instructions: "Which statement about Handling gaps in data is correct?",
            starterCode: "",
            solution: "Missing data shows up as gaps, and a dashboard should mark them as unknown instead of drawing a misleading zero.",
            solutionExplanation: "Missing data shows up as gaps, and a dashboard should mark them as unknown instead of drawing a misleading zero. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Missing data shows up as gaps, and a dashboard should mark them as unknown instead of drawing a misleading zero.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Handling gaps in data really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Missing data shows up as gaps, and a dashboard should mark them as unknown instead of drawing a misleading zero.", "Handling gaps in data can only be used once in a program.", "Handling gaps in data requires a separate paid licence to use.", "Handling gaps in data is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-build-dashboard-m2-l3",
          slug: "ts-build-dashboard-m2-l3",
          title: "Dashboard performance",
          concept: "Fast dashboards fetch aggregated data, memoise expensive charts, and update only the widgets whose data changed. Mastering it makes your real-time dashboard code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 10, beta: 7 };",
          exampleCode: "const config: Record<string, number> = { alpha: 10, beta: 7 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Dashboard performance can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Dashboard performance logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Dashboard performance",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"delta\", \"sigma\", \"omega\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"delta\", \"sigma\", \"omega\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"DELTA, SIGMA, OMEGA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "DELTA, SIGMA, OMEGA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "DELTA, SIGMA, OMEGA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Dashboard performance with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-dashboard-m2-l4",
          slug: "ts-build-dashboard-m2-l4",
          title: "Sharing and embedding",
          concept: "Dashboards are shared with links that preserve filters, and embedded in other pages for stakeholders. In this track you apply it while building real-time dashboard features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 4 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Sharing and embedding.",
          bug: { prompt: "This loop for Sharing and embedding produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Sharing and embedding",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(3 * 5 + 5);",
            starterCode: "",
            solution: "20",
            solutionExplanation: "The program computes 3 * 5 + 5 = 20.",
            tests: [
              { name: "Correct answer", expectedContains: "20", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 3 * 5, then add 5.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["15", "13", "10", "20"],
            answerIndex: 3,
          }
        },
        {
          id: "ts-build-dashboard-m2-l5",
          slug: "ts-build-dashboard-m2-l5",
          title: "From prototype to production",
          concept: "A production dashboard adds authentication, caching and error states to the prototype's happy path. Mastering it makes your real-time dashboard code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"from\", 7));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with From prototype to production, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for From prototype to production changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the FromPrototype config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `FromPrototypeConfig` for From prototype to production with name \"omega\", retries 10 and enabled true, then log it with JSON.stringify.",
            starterCode: "type FromPrototypeConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: FromPrototypeConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type FromPrototypeConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: FromPrototypeConfig = { name: \"omega\", retries: 10, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"omega\",\"retries\":10,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"omega\",\"retries\":10,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"omega\",\"retries\":10,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models From prototype to production with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: real-time dashboard progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your real-time dashboard project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 18 of 20 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 20, done: 18, rate: completionRate(18, 20) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(18, 20) is Math.round((18 / 20) * 100) = 90, so the summary stringifies to {\"tasks\":20,\"done\":18,\"rate\":90}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":20,\"done\":18,\"rate\":90}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":90", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Building a Real-Time Dashboard Capstone Project",
      description: "Build a small working real-time dashboard application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core real-time dashboard features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-build-ecommerce",
    slug: "ts-build-ecommerce",
    language: "typescript",
    category: "languages",
    title: "Building an E-Commerce Backend in TypeScript",
    description: "Advanced TypeScript: build the backend of an online store, from catalog and cart to checkout and payments",
    difficulty: "Advanced",
    estimatedHours: 26,
    skills: ["Product catalog", "Carts", "Checkout", "Payments", "Orders", "Inventory"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like running a shop where the till, the shelves and the warehouse all agree on every sale",
    modules: [
      {
        id: "ts-build-ecommerce-m1",
        title: "Building an E-Commerce Backend in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-ecommerce-m1-l1",
          slug: "ts-build-ecommerce-m1-l1",
          title: "Product catalog",
          concept: "A product catalog stores products with variants, prices and stock, and serves them through a typed search API. In this track you apply it while building e-commerce backend features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 8 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Product catalog values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Product catalog: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the productCatalog function",
            type: "build-function",
            instructions: "Write a function named `productCatalog` for Product catalog: it takes two numbers and returns their sum. Log the result of calling it with 8 and 3.",
            starterCode: "function productCatalog(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(productCatalog(8, 3));",
            solution: "function productCatalog(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(productCatalog(8, 3));",
            solutionExplanation: "The function returns 8 + 3 = 11, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "11", hidden: false },
              { name: "Output contains the expected value", expectedContains: "11", hidden: true }
            ],
            hintNotes: { concept: "The `productCatalog` code models Product catalog with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-ecommerce-m1-l2",
          slug: "ts-build-ecommerce-m1-l2",
          title: "Shopping carts",
          concept: "A cart holds the items a customer intends to buy, with prices snapshotted so later changes cannot alter the total. Mastering it makes your e-commerce backend code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"shopping\", 2));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Shopping carts can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Shopping carts logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the shoppingCarts function",
            type: "build-function",
            instructions: "Write a function named `shoppingCarts` for Shopping carts: it takes two numbers and returns their product. Log the result of calling it with 2 and 5.",
            starterCode: "function shoppingCarts(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(shoppingCarts(2, 5));",
            solution: "function shoppingCarts(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(shoppingCarts(2, 5));",
            solutionExplanation: "The function returns 2 * 5 = 10, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "10", hidden: false },
              { name: "Output contains the expected value", expectedContains: "10", hidden: true }
            ],
            hintNotes: { concept: "The `shoppingCarts` code models Shopping carts with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-ecommerce-m1-l3",
          slug: "ts-build-ecommerce-m1-l3",
          title: "Checkout flow",
          concept: "Checkout turns a cart into an order by validating stock, collecting payment, and reserving inventory in one transaction. In this track you apply it while building e-commerce backend features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];",
          exampleCode: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Checkout flow.",
          bug: { prompt: "This loop for Checkout flow produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Checkout flow",
            type: "multiple-choice",
            instructions: "Which statement about Checkout flow is correct?",
            starterCode: "",
            solution: "Checkout turns a cart into an order by validating stock, collecting payment, and reserving inventory in one transaction.",
            solutionExplanation: "Checkout turns a cart into an order by validating stock, collecting payment, and reserving inventory in one transaction. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Checkout turns a cart into an order by validating stock, collecting payment, and reserving inventory in one transaction.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Checkout flow really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Checkout turns a cart into an order by validating stock, collecting payment, and reserving inventory in one transaction.", "Checkout flow can only be used once in a program.", "Checkout flow requires a separate paid licence to use.", "Checkout flow is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-build-ecommerce-m1-l4",
          slug: "ts-build-ecommerce-m1-l4",
          title: "Payments",
          concept: "Payments are handled by a provider that tokenises cards, so card numbers never touch your own servers. Mastering it makes your e-commerce backend code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 8, beta: 5 };",
          exampleCode: "const config: Record<string, number> = { alpha: 8, beta: 5 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Payments, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Payments changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the payments function",
            type: "build-function",
            instructions: "Write a function named `payments` for Payments: it takes two numbers and returns the first minus the second. Log the result of calling it with 15 and 9.",
            starterCode: "function payments(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(payments(15, 9));",
            solution: "function payments(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(payments(15, 9));",
            solutionExplanation: "The function returns 15 - 9 = 6, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "6", hidden: false },
              { name: "Output contains the expected value", expectedContains: "6", hidden: true }
            ],
            hintNotes: { concept: "The `payments` code models Payments with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-ecommerce-m1-l5",
          slug: "ts-build-ecommerce-m1-l5",
          title: "Orders",
          concept: "An order is an immutable record of a purchase, with its own lifecycle from placed to paid to shipped. In this track you apply it while building e-commerce backend features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 2 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Orders code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Orders crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the orders function",
            type: "build-function",
            instructions: "Write a function named `orders` for Orders: it takes three numbers and returns a * b + c. Log the result of calling it with 2, 3 and 6.",
            starterCode: "function orders(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(orders(2, 3, 6));",
            solution: "function orders(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(orders(2, 3, 6));",
            solutionExplanation: "The function returns 2 * 3 + 6 = 12, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "12", hidden: false },
              { name: "Output contains the expected value", expectedContains: "12", hidden: true }
            ],
            hintNotes: { concept: "The `orders` code models Orders with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-build-ecommerce-m2",
        title: "Building an E-Commerce Backend in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-ecommerce-m2-l1",
          slug: "ts-build-ecommerce-m2-l1",
          title: "Inventory tracking",
          concept: "Inventory tracking decrements stock only when an order is confirmed, and releases it again if payment fails. Mastering it makes your e-commerce backend code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"inventory\", 5));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Inventory tracking is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Inventory tracking prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Inventory tracking",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: delta, sigma, omega, kappa, lambda. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"delta\", \"sigma\", \"omega\", \"kappa\", \"lambda\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 5 items, so items.length is 5.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Inventory tracking with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-ecommerce-m2-l2",
          slug: "ts-build-ecommerce-m2-l2",
          title: "Discounts and coupons",
          concept: "Discounts are applied as typed rules at checkout, and each rule is validated against the cart before it changes the total. In this track you apply it while building e-commerce backend features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];",
          exampleCode: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Discounts and coupons values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Discounts and coupons: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Discounts and coupons",
            type: "multiple-choice",
            instructions: "Which statement about Discounts and coupons is correct?",
            starterCode: "",
            solution: "Discounts are applied as typed rules at checkout, and each rule is validated against the cart before it changes the total.",
            solutionExplanation: "Discounts are applied as typed rules at checkout, and each rule is validated against the cart before it changes the total. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Discounts are applied as typed rules at checkout, and each rule is validated against the cart before it changes the total.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Discounts and coupons really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Discounts and coupons can only be used once in a program.", "Discounts are applied as typed rules at checkout, and each rule is validated against the cart before it changes the total.", "Discounts and coupons requires a separate paid licence to use.", "Discounts and coupons is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-build-ecommerce-m2-l3",
          slug: "ts-build-ecommerce-m2-l3",
          title: "Search and filtering",
          concept: "Product search combines text matching with filters for category, price and availability, ranked by relevance. Mastering it makes your e-commerce backend code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 2, beta: 9 };",
          exampleCode: "const config: Record<string, number> = { alpha: 2, beta: 9 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Search and filtering can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Search and filtering logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Search and filtering",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"omega\", \"kappa\", \"lambda\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"omega\", \"kappa\", \"lambda\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"OMEGA - KAPPA - LAMBDA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "OMEGA - KAPPA - LAMBDA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "OMEGA - KAPPA - LAMBDA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Search and filtering with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-ecommerce-m2-l4",
          slug: "ts-build-ecommerce-m2-l4",
          title: "Fraud signals",
          concept: "Fraud checks look for signals such as mismatched billing data and velocity, and hold suspicious orders for review. In this track you apply it while building e-commerce backend features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 5 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Fraud signals.",
          bug: { prompt: "This loop for Fraud signals produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Fraud signals",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(6 * 6 + 2);",
            starterCode: "",
            solution: "38",
            solutionExplanation: "The program computes 6 * 6 + 2 = 38.",
            tests: [
              { name: "Correct answer", expectedContains: "38", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 6 * 6, then add 2.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["38", "36", "14", "34"],
            answerIndex: 0,
          }
        },
        {
          id: "ts-build-ecommerce-m2-l5",
          slug: "ts-build-ecommerce-m2-l5",
          title: "Scaling for sales events",
          concept: "Sales events need cached catalog reads, queued order processing, and load shedding so a traffic spike cannot take the store down. Mastering it makes your e-commerce backend code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"scaling\", 8));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Scaling for sales events, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Scaling for sales events changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the ScalingSales config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `ScalingSalesConfig` for Scaling for sales events with name \"lambda\", retries 8 and enabled false, then log it with JSON.stringify.",
            starterCode: "type ScalingSalesConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: ScalingSalesConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type ScalingSalesConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: ScalingSalesConfig = { name: \"lambda\", retries: 8, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"lambda\",\"retries\":8,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"lambda\",\"retries\":8,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"lambda\",\"retries\":8,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Scaling for sales events with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: e-commerce backend progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your e-commerce backend project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 6 of 8 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 8, done: 6, rate: completionRate(6, 8) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(6, 8) is Math.round((6 / 8) * 100) = 75, so the summary stringifies to {\"tasks\":8,\"done\":6,\"rate\":75}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":8,\"done\":6,\"rate\":75}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":75", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Building an E-Commerce Backend in TypeScript Capstone Project",
      description: "Build a small working e-commerce backend application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core e-commerce backend features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-build-cms",
    slug: "ts-build-cms",
    language: "typescript",
    category: "languages",
    title: "Building a CMS in TypeScript",
    description: "Advanced TypeScript: build a content management system with drafts, publishing, media and roles",
    difficulty: "Advanced",
    estimatedHours: 24,
    skills: ["Content models", "Drafts and publishing", "Version history", "Media library", "Roles and permissions", "Content APIs"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like running a newspaper where every article has a draft, an editor and a printing date",
    modules: [
      {
        id: "ts-build-cms-m1",
        title: "Building a CMS in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-cms-m1-l1",
          slug: "ts-build-cms-m1-l1",
          title: "Content models",
          concept: "A content model defines the fields each kind of content has, such as a title, body and author for an article. In this track you apply it while building content management system features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 9 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Content models values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Content models: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the contentModels function",
            type: "build-function",
            instructions: "Write a function named `contentModels` for Content models: it takes two numbers and returns their sum. Log the result of calling it with 6 and 8.",
            starterCode: "function contentModels(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(contentModels(6, 8));",
            solution: "function contentModels(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(contentModels(6, 8));",
            solutionExplanation: "The function returns 6 + 8 = 14, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "14", hidden: false },
              { name: "Output contains the expected value", expectedContains: "14", hidden: true }
            ],
            hintNotes: { concept: "The `contentModels` code models Content models with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-cms-m1-l2",
          slug: "ts-build-cms-m1-l2",
          title: "The editing experience",
          concept: "A good editor autosaves drafts, shows a live preview, and never loses work when the browser closes. Mastering it makes your content management system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"editing\", 3));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in The editing experience can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about The editing experience logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the editingExperience function",
            type: "build-function",
            instructions: "Write a function named `editingExperience` for The editing experience: it takes two numbers and returns their product. Log the result of calling it with 9 and 10.",
            starterCode: "function editingExperience(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(editingExperience(9, 10));",
            solution: "function editingExperience(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(editingExperience(9, 10));",
            solutionExplanation: "The function returns 9 * 10 = 90, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "90", hidden: false },
              { name: "Output contains the expected value", expectedContains: "90", hidden: true }
            ],
            hintNotes: { concept: "The `editingExperience` code models The editing experience with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-cms-m1-l3",
          slug: "ts-build-cms-m1-l3",
          title: "Drafts and publishing",
          concept: "Drafts are unpublished versions, and publishing copies a draft to the live version while keeping the history. In this track you apply it while building content management system features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];",
          exampleCode: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Drafts and publishing.",
          bug: { prompt: "This loop for Drafts and publishing produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Drafts and publishing",
            type: "multiple-choice",
            instructions: "Which statement about Drafts and publishing is correct?",
            starterCode: "",
            solution: "Drafts are unpublished versions, and publishing copies a draft to the live version while keeping the history.",
            solutionExplanation: "Drafts are unpublished versions, and publishing copies a draft to the live version while keeping the history. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Drafts are unpublished versions, and publishing copies a draft to the live version while keeping the history.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Drafts and publishing really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Drafts and publishing can only be used once in a program.", "Drafts are unpublished versions, and publishing copies a draft to the live version while keeping the history.", "Drafts and publishing requires a separate paid licence to use.", "Drafts and publishing is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-build-cms-m1-l4",
          slug: "ts-build-cms-m1-l4",
          title: "Version history",
          concept: "Version history stores every saved revision, so any earlier version of a page can be restored. Mastering it makes your content management system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 9, beta: 7 };",
          exampleCode: "const config: Record<string, number> = { alpha: 9, beta: 7 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Version history, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Version history changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the versionHistory function",
            type: "build-function",
            instructions: "Write a function named `versionHistory` for Version history: it takes two numbers and returns the first minus the second. Log the result of calling it with 13 and 6.",
            starterCode: "function versionHistory(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(versionHistory(13, 6));",
            solution: "function versionHistory(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(versionHistory(13, 6));",
            solutionExplanation: "The function returns 13 - 6 = 7, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "7", hidden: false },
              { name: "Output contains the expected value", expectedContains: "7", hidden: true }
            ],
            hintNotes: { concept: "The `versionHistory` code models Version history with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-cms-m1-l5",
          slug: "ts-build-cms-m1-l5",
          title: "Media library",
          concept: "A media library stores uploaded files once and references them from content, with resized variants generated on upload. In this track you apply it while building content management system features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 3 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Media library code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Media library crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the mediaLibrary function",
            type: "build-function",
            instructions: "Write a function named `mediaLibrary` for Media library: it takes three numbers and returns a * b + c. Log the result of calling it with 9, 8 and 3.",
            starterCode: "function mediaLibrary(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(mediaLibrary(9, 8, 3));",
            solution: "function mediaLibrary(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(mediaLibrary(9, 8, 3));",
            solutionExplanation: "The function returns 9 * 8 + 3 = 75, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "75", hidden: false },
              { name: "Output contains the expected value", expectedContains: "75", hidden: true }
            ],
            hintNotes: { concept: "The `mediaLibrary` code models Media library with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-build-cms-m2",
        title: "Building a CMS in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-cms-m2-l1",
          slug: "ts-build-cms-m2-l1",
          title: "Roles and permissions",
          concept: "CMS roles decide who can draft, review and publish, so an author cannot publish their own work unchecked. Mastering it makes your content management system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"roles\", 6));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Roles and permissions is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Roles and permissions prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Roles and permissions",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: omega, kappa, lambda. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"omega\", \"kappa\", \"lambda\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 3 items, so items.length is 3.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "3", hidden: false },
              { name: "Output contains the expected value", expectedContains: "3", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Roles and permissions with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-cms-m2-l2",
          slug: "ts-build-cms-m2-l2",
          title: "Content APIs",
          concept: "A headless CMS serves content through a typed API, so any frontend can render the same content. In this track you apply it while building content management system features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];",
          exampleCode: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Content APIs values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Content APIs: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Content APIs",
            type: "multiple-choice",
            instructions: "Which statement about Content APIs is correct?",
            starterCode: "",
            solution: "A headless CMS serves content through a typed API, so any frontend can render the same content.",
            solutionExplanation: "A headless CMS serves content through a typed API, so any frontend can render the same content. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A headless CMS serves content through a typed API, so any frontend can render the same content.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Content APIs really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Content APIs can only be used once in a program.", "Content APIs requires a separate paid licence to use.", "A headless CMS serves content through a typed API, so any frontend can render the same content.", "Content APIs is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-build-cms-m2-l3",
          slug: "ts-build-cms-m2-l3",
          title: "Content search",
          concept: "Content search indexes titles and bodies, so editors and readers find pages by words instead of browsing folders. Mastering it makes your content management system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 3, beta: 4 };",
          exampleCode: "const config: Record<string, number> = { alpha: 3, beta: 4 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Content search can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Content search logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Content search",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"LAMBDA, THETA, ZETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "LAMBDA, THETA, ZETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "LAMBDA, THETA, ZETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Content search with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-cms-m2-l4",
          slug: "ts-build-cms-m2-l4",
          title: "Editorial workflows",
          concept: "Editorial workflows move content through review states, with notifications when an item needs attention. In this track you apply it while building content management system features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 6 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Editorial workflows.",
          bug: { prompt: "This loop for Editorial workflows produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Editorial workflows",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(9 * 7 + 7);",
            starterCode: "",
            solution: "70",
            solutionExplanation: "The program computes 9 * 7 + 7 = 70.",
            tests: [
              { name: "Correct answer", expectedContains: "70", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 9 * 7, then add 7.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["63", "70", "23", "56"],
            answerIndex: 1,
          }
        },
        {
          id: "ts-build-cms-m2-l5",
          slug: "ts-build-cms-m2-l5",
          title: "Multi-site content",
          concept: "Multi-site CMSs share content models across sites while letting each site keep its own pages and settings. Mastering it makes your content management system code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"multisite\", 9));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Multi-site content, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Multi-site content changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the MultisiteContent config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `MultisiteContentConfig` for Multi-site content with name \"zeta\", retries 6 and enabled true, then log it with JSON.stringify.",
            starterCode: "type MultisiteContentConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: MultisiteContentConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type MultisiteContentConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: MultisiteContentConfig = { name: \"zeta\", retries: 6, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"zeta\",\"retries\":6,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"zeta\",\"retries\":6,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"zeta\",\"retries\":6,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Multi-site content with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: content management system progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your content management system project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 9 of 10 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 10, done: 9, rate: completionRate(9, 10) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(9, 10) is Math.round((9 / 10) * 100) = 90, so the summary stringifies to {\"tasks\":10,\"done\":9,\"rate\":90}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":10,\"done\":9,\"rate\":90}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":90", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Building a CMS in TypeScript Capstone Project",
      description: "Build a small working content management system application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core content management system features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-build-chat",
    slug: "ts-build-chat",
    language: "typescript",
    category: "languages",
    title: "Building a Chat Application in TypeScript",
    description: "Advanced TypeScript: build a real-time chat application with rooms, history and moderation",
    difficulty: "Advanced",
    estimatedHours: 22,
    skills: ["Message model", "Real-time delivery", "Message ordering", "Read receipts", "Moderation", "Chat scaling"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like running a post office where every letter is delivered the moment it is sent",
    modules: [
      {
        id: "ts-build-chat-m1",
        title: "Building a Chat Application in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-chat-m1-l1",
          slug: "ts-build-chat-m1-l1",
          title: "Message model",
          concept: "A chat message has an author, a body, a timestamp and a room, and it is immutable once sent. In this track you apply it while building chat application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 10 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Message model values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Message model: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the messageModel function",
            type: "build-function",
            instructions: "Write a function named `messageModel` for Message model: it takes two numbers and returns their sum. Log the result of calling it with 4 and 5.",
            starterCode: "function messageModel(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(messageModel(4, 5));",
            solution: "function messageModel(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(messageModel(4, 5));",
            solutionExplanation: "The function returns 4 + 5 = 9, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "9", hidden: false },
              { name: "Output contains the expected value", expectedContains: "9", hidden: true }
            ],
            hintNotes: { concept: "The `messageModel` code models Message model with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-chat-m1-l2",
          slug: "ts-build-chat-m1-l2",
          title: "Sending and receiving",
          concept: "Sending a message stores it and broadcasts it to the room, so every connected client sees it at once. Mastering it makes your chat application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"sending\", 4));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Sending and receiving can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Sending and receiving logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the sendingReceiving function",
            type: "build-function",
            instructions: "Write a function named `sendingReceiving` for Sending and receiving: it takes two numbers and returns their product. Log the result of calling it with 7 and 7.",
            starterCode: "function sendingReceiving(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(sendingReceiving(7, 7));",
            solution: "function sendingReceiving(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(sendingReceiving(7, 7));",
            solutionExplanation: "The function returns 7 * 7 = 49, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "49", hidden: false },
              { name: "Output contains the expected value", expectedContains: "49", hidden: true }
            ],
            hintNotes: { concept: "The `sendingReceiving` code models Sending and receiving with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-chat-m1-l3",
          slug: "ts-build-chat-m1-l3",
          title: "Message ordering",
          concept: "Chat messages are ordered by a server-assigned sequence number, so two clients always agree on the order. In this track you apply it while building chat application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];",
          exampleCode: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Message ordering.",
          bug: { prompt: "This loop for Message ordering produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Message ordering",
            type: "multiple-choice",
            instructions: "Which statement about Message ordering is correct?",
            starterCode: "",
            solution: "Chat messages are ordered by a server-assigned sequence number, so two clients always agree on the order.",
            solutionExplanation: "Chat messages are ordered by a server-assigned sequence number, so two clients always agree on the order. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Chat messages are ordered by a server-assigned sequence number, so two clients always agree on the order.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Message ordering really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Message ordering can only be used once in a program.", "Message ordering requires a separate paid licence to use.", "Chat messages are ordered by a server-assigned sequence number, so two clients always agree on the order.", "Message ordering is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-build-chat-m1-l4",
          slug: "ts-build-chat-m1-l4",
          title: "Typing indicators",
          concept: "Typing indicators are ephemeral events broadcast to the room, and they expire automatically after a few seconds. Mastering it makes your chat application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 10, beta: 9 };",
          exampleCode: "const config: Record<string, number> = { alpha: 10, beta: 9 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Typing indicators, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Typing indicators changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the typingIndicators function",
            type: "build-function",
            instructions: "Write a function named `typingIndicators` for Typing indicators: it takes two numbers and returns the first minus the second. Log the result of calling it with 11 and 3.",
            starterCode: "function typingIndicators(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(typingIndicators(11, 3));",
            solution: "function typingIndicators(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(typingIndicators(11, 3));",
            solutionExplanation: "The function returns 11 - 3 = 8, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "8", hidden: false },
              { name: "Output contains the expected value", expectedContains: "8", hidden: true }
            ],
            hintNotes: { concept: "The `typingIndicators` code models Typing indicators with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-chat-m1-l5",
          slug: "ts-build-chat-m1-l5",
          title: "Read receipts",
          concept: "Read receipts record the last message each user has seen, which is how unread counts are computed. In this track you apply it while building chat application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 4 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Read receipts code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Read receipts crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the readReceipts function",
            type: "build-function",
            instructions: "Write a function named `readReceipts` for Read receipts: it takes three numbers and returns a * b + c. Log the result of calling it with 7, 5 and 6.",
            starterCode: "function readReceipts(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(readReceipts(7, 5, 6));",
            solution: "function readReceipts(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(readReceipts(7, 5, 6));",
            solutionExplanation: "The function returns 7 * 5 + 6 = 41, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "41", hidden: false },
              { name: "Output contains the expected value", expectedContains: "41", hidden: true }
            ],
            hintNotes: { concept: "The `readReceipts` code models Read receipts with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-build-chat-m2",
        title: "Building a Chat Application in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-chat-m2-l1",
          slug: "ts-build-chat-m2-l1",
          title: "Rooms and direct messages",
          concept: "Rooms group many users while direct messages are rooms with exactly two members and the same message flow. Mastering it makes your chat application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"rooms\", 7));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Rooms and direct messages is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Rooms and direct messages prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Rooms and direct messages",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: lambda, theta, zeta, alpha. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"lambda\", \"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 4 items, so items.length is 4.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "4", hidden: false },
              { name: "Output contains the expected value", expectedContains: "4", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Rooms and direct messages with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-chat-m2-l2",
          slug: "ts-build-chat-m2-l2",
          title: "Message history",
          concept: "Message history is paged from the database newest-first, so a room with years of messages still opens fast. In this track you apply it while building chat application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];",
          exampleCode: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Message history values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Message history: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Message history",
            type: "multiple-choice",
            instructions: "Which statement about Message history is correct?",
            starterCode: "",
            solution: "Message history is paged from the database newest-first, so a room with years of messages still opens fast.",
            solutionExplanation: "Message history is paged from the database newest-first, so a room with years of messages still opens fast. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Message history is paged from the database newest-first, so a room with years of messages still opens fast.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Message history really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Message history can only be used once in a program.", "Message history requires a separate paid licence to use.", "Message history is not available in TypeScript.", "Message history is paged from the database newest-first, so a room with years of messages still opens fast."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-build-chat-m2-l3",
          slug: "ts-build-chat-m2-l3",
          title: "Moderation tools",
          concept: "Moderation tools let admins delete messages and mute users, with an audit log of every action taken. Mastering it makes your chat application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 4, beta: 6 };",
          exampleCode: "const config: Record<string, number> = { alpha: 4, beta: 6 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Moderation tools can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Moderation tools logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Moderation tools",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"ZETA - ALPHA - BETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "ZETA - ALPHA - BETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "ZETA - ALPHA - BETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Moderation tools with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-chat-m2-l4",
          slug: "ts-build-chat-m2-l4",
          title: "File sharing in chat",
          concept: "Chat file sharing uploads the file to storage and sends a message referencing it, with a preview for images. In this track you apply it while building chat application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 7 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for File sharing in chat.",
          bug: { prompt: "This loop for File sharing in chat produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: File sharing in chat",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(5 * 2 + 4);",
            starterCode: "",
            solution: "14",
            solutionExplanation: "The program computes 5 * 2 + 4 = 14.",
            tests: [
              { name: "Correct answer", expectedContains: "14", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 5 * 2, then add 4.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["10", "11", "14", "6"],
            answerIndex: 2,
          }
        },
        {
          id: "ts-build-chat-m2-l5",
          slug: "ts-build-chat-m2-l5",
          title: "Scaling chat",
          concept: "Chat scales by sharding rooms across servers and sharing presence through a broker, so no single server holds every user. Mastering it makes your chat application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"scaling\", 10));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Scaling chat, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Scaling chat changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the ScalingChat config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `ScalingChatConfig` for Scaling chat with name \"beta\", retries 4 and enabled false, then log it with JSON.stringify.",
            starterCode: "type ScalingChatConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: ScalingChatConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type ScalingChatConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: ScalingChatConfig = { name: \"beta\", retries: 4, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"beta\",\"retries\":4,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"beta\",\"retries\":4,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"beta\",\"retries\":4,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Scaling chat with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: chat application progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your chat application project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 3 of 4 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 4, done: 3, rate: completionRate(3, 4) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(3, 4) is Math.round((3 / 4) * 100) = 75, so the summary stringifies to {\"tasks\":4,\"done\":3,\"rate\":75}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":4,\"done\":3,\"rate\":75}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":75", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Building a Chat Application in TypeScript Capstone Project",
      description: "Build a small working chat application application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core chat application features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-build-dataviz",
    slug: "ts-build-dataviz",
    language: "typescript",
    category: "languages",
    title: "Building a Data Visualisation Platform",
    description: "Advanced TypeScript: build a data visualisation platform that turns datasets into insight",
    difficulty: "Advanced",
    estimatedHours: 24,
    skills: ["Chart selection", "Data pipelines", "Interactive charts", "Real-time charts", "Large datasets", "Accessible visualisation"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like telling a story with pictures that update themselves as the facts change",
    modules: [
      {
        id: "ts-build-dataviz-m1",
        title: "Building a Data Visualisation Platform Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-dataviz-m1-l1",
          slug: "ts-build-dataviz-m1-l1",
          title: "Choosing the right chart",
          concept: "The right chart matches the question: distributions need histograms, relationships need scatter plots, and parts of a whole need bars, not pie slices. In this track you apply it while building data visualisation platform features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 2 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Choosing the right chart values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Choosing the right chart: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the choosingRight function",
            type: "build-function",
            instructions: "Write a function named `choosingRight` for Choosing the right chart: it takes two numbers and returns their sum. Log the result of calling it with 2 and 10.",
            starterCode: "function choosingRight(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(choosingRight(2, 10));",
            solution: "function choosingRight(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(choosingRight(2, 10));",
            solutionExplanation: "The function returns 2 + 10 = 12, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "12", hidden: false },
              { name: "Output contains the expected value", expectedContains: "12", hidden: true }
            ],
            hintNotes: { concept: "The `choosingRight` code models Choosing the right chart with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-dataviz-m1-l2",
          slug: "ts-build-dataviz-m1-l2",
          title: "Data pipelines",
          concept: "A visualisation pipeline cleans, aggregates and caches data before it reaches a chart, so rendering stays fast. Mastering it makes your data visualisation platform code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"data\", 5));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Data pipelines can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Data pipelines logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the dataPipelines function",
            type: "build-function",
            instructions: "Write a function named `dataPipelines` for Data pipelines: it takes two numbers and returns their product. Log the result of calling it with 5 and 4.",
            starterCode: "function dataPipelines(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(dataPipelines(5, 4));",
            solution: "function dataPipelines(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(dataPipelines(5, 4));",
            solutionExplanation: "The function returns 5 * 4 = 20, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "20", hidden: false },
              { name: "Output contains the expected value", expectedContains: "20", hidden: true }
            ],
            hintNotes: { concept: "The `dataPipelines` code models Data pipelines with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-dataviz-m1-l3",
          slug: "ts-build-dataviz-m1-l3",
          title: "Scales and axes",
          concept: "Scales map data values to pixels, and axes make that mapping readable, so a chart cannot mislead by accident. In this track you apply it while building data visualisation platform features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];",
          exampleCode: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Scales and axes.",
          bug: { prompt: "This loop for Scales and axes produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Scales and axes",
            type: "multiple-choice",
            instructions: "Which statement about Scales and axes is correct?",
            starterCode: "",
            solution: "Scales map data values to pixels, and axes make that mapping readable, so a chart cannot mislead by accident.",
            solutionExplanation: "Scales map data values to pixels, and axes make that mapping readable, so a chart cannot mislead by accident. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Scales map data values to pixels, and axes make that mapping readable, so a chart cannot mislead by accident.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Scales and axes really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Scales and axes can only be used once in a program.", "Scales and axes requires a separate paid licence to use.", "Scales and axes is not available in TypeScript.", "Scales map data values to pixels, and axes make that mapping readable, so a chart cannot mislead by accident."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-build-dataviz-m1-l4",
          slug: "ts-build-dataviz-m1-l4",
          title: "Interactive charts",
          concept: "Interactive charts respond to hover, zoom and selection, letting users explore the data instead of only viewing it. Mastering it makes your data visualisation platform code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 2, beta: 4 };",
          exampleCode: "const config: Record<string, number> = { alpha: 2, beta: 4 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Interactive charts, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Interactive charts changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the interactiveCharts function",
            type: "build-function",
            instructions: "Write a function named `interactiveCharts` for Interactive charts: it takes two numbers and returns the first minus the second. Log the result of calling it with 9 and 8.",
            starterCode: "function interactiveCharts(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(interactiveCharts(9, 8));",
            solution: "function interactiveCharts(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(interactiveCharts(9, 8));",
            solutionExplanation: "The function returns 9 - 8 = 1, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "1", hidden: false },
              { name: "Output contains the expected value", expectedContains: "1", hidden: true }
            ],
            hintNotes: { concept: "The `interactiveCharts` code models Interactive charts with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-dataviz-m1-l5",
          slug: "ts-build-dataviz-m1-l5",
          title: "Dashboards in dataviz",
          concept: "A visualisation dashboard composes several charts that share filters, so one selection updates the whole picture. In this track you apply it while building data visualisation platform features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 5 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Dashboards in dataviz code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Dashboards in dataviz crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the dashboardsDataviz function",
            type: "build-function",
            instructions: "Write a function named `dashboardsDataviz` for Dashboards in dataviz: it takes three numbers and returns a * b + c. Log the result of calling it with 5, 10 and 3.",
            starterCode: "function dashboardsDataviz(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(dashboardsDataviz(5, 10, 3));",
            solution: "function dashboardsDataviz(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(dashboardsDataviz(5, 10, 3));",
            solutionExplanation: "The function returns 5 * 10 + 3 = 53, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "53", hidden: false },
              { name: "Output contains the expected value", expectedContains: "53", hidden: true }
            ],
            hintNotes: { concept: "The `dashboardsDataviz` code models Dashboards in dataviz with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-build-dataviz-m2",
        title: "Building a Data Visualisation Platform in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-dataviz-m2-l1",
          slug: "ts-build-dataviz-m2-l1",
          title: "Real-time charts",
          concept: "Real-time charts append new points as data arrives and drop old ones, keeping the view window constant. Mastering it makes your data visualisation platform code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"realtime\", 8));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Real-time charts is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Real-time charts prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Real-time charts",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: zeta, alpha, beta, gamma, delta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"zeta\", \"alpha\", \"beta\", \"gamma\", \"delta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 5 items, so items.length is 5.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Real-time charts with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-dataviz-m2-l2",
          slug: "ts-build-dataviz-m2-l2",
          title: "Large datasets",
          concept: "Large datasets are visualised by aggregating first, such as binning millions of rows into hundreds of buckets. In this track you apply it while building data visualisation platform features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];",
          exampleCode: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Large datasets values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Large datasets: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Large datasets",
            type: "multiple-choice",
            instructions: "Which statement about Large datasets is correct?",
            starterCode: "",
            solution: "Large datasets are visualised by aggregating first, such as binning millions of rows into hundreds of buckets.",
            solutionExplanation: "Large datasets are visualised by aggregating first, such as binning millions of rows into hundreds of buckets. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Large datasets are visualised by aggregating first, such as binning millions of rows into hundreds of buckets.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Large datasets really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Large datasets are visualised by aggregating first, such as binning millions of rows into hundreds of buckets.", "Large datasets can only be used once in a program.", "Large datasets requires a separate paid licence to use.", "Large datasets is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-build-dataviz-m2-l3",
          slug: "ts-build-dataviz-m2-l3",
          title: "Storytelling with data",
          concept: "Data storytelling orders charts into a narrative, with annotations that point out what matters and why. Mastering it makes your data visualisation platform code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 5, beta: 8 };",
          exampleCode: "const config: Record<string, number> = { alpha: 5, beta: 8 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Storytelling with data can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Storytelling with data logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Storytelling with data",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"beta\", \"gamma\", \"delta\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"beta\", \"gamma\", \"delta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"BETA, GAMMA, DELTA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "BETA, GAMMA, DELTA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "BETA, GAMMA, DELTA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Storytelling with data with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-dataviz-m2-l4",
          slug: "ts-build-dataviz-m2-l4",
          title: "Exporting and sharing",
          concept: "Charts are shared as links, images or embeds, with the underlying data attached so others can verify the picture. In this track you apply it while building data visualisation platform features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 8 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Exporting and sharing.",
          bug: { prompt: "This loop for Exporting and sharing produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Exporting and sharing",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(8 * 3 + 9);",
            starterCode: "",
            solution: "33",
            solutionExplanation: "The program computes 8 * 3 + 9 = 33.",
            tests: [
              { name: "Correct answer", expectedContains: "33", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 8 * 3, then add 9.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["24", "20", "15", "33"],
            answerIndex: 3,
          }
        },
        {
          id: "ts-build-dataviz-m2-l5",
          slug: "ts-build-dataviz-m2-l5",
          title: "Accessibility in dataviz",
          concept: "Accessible visualisations provide text summaries and data tables, so the insight is available to every user. Mastering it makes your data visualisation platform code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"accessibility\", 2));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Accessibility in dataviz, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Accessibility in dataviz changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the AccessibilityDataviz config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `AccessibilityDatavizConfig` for Accessibility in dataviz with name \"delta\", retries 2 and enabled true, then log it with JSON.stringify.",
            starterCode: "type AccessibilityDatavizConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: AccessibilityDatavizConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type AccessibilityDatavizConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: AccessibilityDatavizConfig = { name: \"delta\", retries: 2, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"delta\",\"retries\":2,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"delta\",\"retries\":2,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"delta\",\"retries\":2,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Accessibility in dataviz with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: data visualisation platform progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your data visualisation platform project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 1 of 2 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 2, done: 1, rate: completionRate(1, 2) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(1, 2) is Math.round((1 / 2) * 100) = 50, so the summary stringifies to {\"tasks\":2,\"done\":1,\"rate\":50}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":2,\"done\":1,\"rate\":50}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":50", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Building a Data Visualisation Platform Capstone Project",
      description: "Build a small working data visualisation platform application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core data visualisation platform features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-build-test-framework",
    slug: "ts-build-test-framework",
    language: "typescript",
    category: "languages",
    title: "Building a Testing Framework in TypeScript",
    description: "Advanced TypeScript: build your own testing framework, from runners and assertions to reporters",
    difficulty: "Advanced",
    estimatedHours: 26,
    skills: ["Test runners", "Assertions", "Test doubles", "Async tests", "Snapshots", "Parallel execution"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like building the machine that checks other machines",
    modules: [
      {
        id: "ts-build-test-framework-m1",
        title: "Building a Testing Framework in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-test-framework-m1-l1",
          slug: "ts-build-test-framework-m1-l1",
          title: "Test runners",
          concept: "A test runner discovers test files, runs them, and reports which passed and which failed. In this track you apply it while building testing framework features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 3 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Test runners values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Test runners: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the testRunners function",
            type: "build-function",
            instructions: "Write a function named `testRunners` for Test runners: it takes two numbers and returns their sum. Log the result of calling it with 9 and 7.",
            starterCode: "function testRunners(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(testRunners(9, 7));",
            solution: "function testRunners(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(testRunners(9, 7));",
            solutionExplanation: "The function returns 9 + 7 = 16, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "16", hidden: false },
              { name: "Output contains the expected value", expectedContains: "16", hidden: true }
            ],
            hintNotes: { concept: "The `testRunners` code models Test runners with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-test-framework-m1-l2",
          slug: "ts-build-test-framework-m1-l2",
          title: "Assertions",
          concept: "An assertion compares an actual value with an expected value and throws a clear error when they differ. Mastering it makes your testing framework code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"assertions\", 6));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Assertions can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Assertions logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the assertions function",
            type: "build-function",
            instructions: "Write a function named `assertions` for Assertions: it takes two numbers and returns their product. Log the result of calling it with 3 and 9.",
            starterCode: "function assertions(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(assertions(3, 9));",
            solution: "function assertions(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(assertions(3, 9));",
            solutionExplanation: "The function returns 3 * 9 = 27, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "27", hidden: false },
              { name: "Output contains the expected value", expectedContains: "27", hidden: true }
            ],
            hintNotes: { concept: "The `assertions` code models Assertions with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-test-framework-m1-l3",
          slug: "ts-build-test-framework-m1-l3",
          title: "Test doubles",
          concept: "Test doubles such as mocks and stubs replace real dependencies, so a test controls exactly what the code under test sees. In this track you apply it while building testing framework features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];",
          exampleCode: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Test doubles.",
          bug: { prompt: "This loop for Test doubles produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Test doubles",
            type: "multiple-choice",
            instructions: "Which statement about Test doubles is correct?",
            starterCode: "",
            solution: "Test doubles such as mocks and stubs replace real dependencies, so a test controls exactly what the code under test sees.",
            solutionExplanation: "Test doubles such as mocks and stubs replace real dependencies, so a test controls exactly what the code under test sees. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Test doubles such as mocks and stubs replace real dependencies, so a test controls exactly what the code under test sees.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Test doubles really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Test doubles such as mocks and stubs replace real dependencies, so a test controls exactly what the code under test sees.", "Test doubles can only be used once in a program.", "Test doubles requires a separate paid licence to use.", "Test doubles is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-build-test-framework-m1-l4",
          slug: "ts-build-test-framework-m1-l4",
          title: "Setup and teardown",
          concept: "Setup and teardown hooks prepare and clean up shared state around each test, so tests do not leak into each other. Mastering it makes your testing framework code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 3, beta: 6 };",
          exampleCode: "const config: Record<string, number> = { alpha: 3, beta: 6 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Setup and teardown, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Setup and teardown changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the setupTeardown function",
            type: "build-function",
            instructions: "Write a function named `setupTeardown` for Setup and teardown: it takes two numbers and returns the first minus the second. Log the result of calling it with 16 and 5.",
            starterCode: "function setupTeardown(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(setupTeardown(16, 5));",
            solution: "function setupTeardown(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(setupTeardown(16, 5));",
            solutionExplanation: "The function returns 16 - 5 = 11, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "11", hidden: false },
              { name: "Output contains the expected value", expectedContains: "11", hidden: true }
            ],
            hintNotes: { concept: "The `setupTeardown` code models Setup and teardown with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-test-framework-m1-l5",
          slug: "ts-build-test-framework-m1-l5",
          title: "Async tests",
          concept: "Async tests return a promise or use await, and the runner waits for it so assertions are not skipped. In this track you apply it while building testing framework features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 6 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Async tests code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Async tests crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the asyncTests function",
            type: "build-function",
            instructions: "Write a function named `asyncTests` for Async tests: it takes three numbers and returns a * b + c. Log the result of calling it with 3, 7 and 6.",
            starterCode: "function asyncTests(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(asyncTests(3, 7, 6));",
            solution: "function asyncTests(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(asyncTests(3, 7, 6));",
            solutionExplanation: "The function returns 3 * 7 + 6 = 27, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "27", hidden: false },
              { name: "Output contains the expected value", expectedContains: "27", hidden: true }
            ],
            hintNotes: { concept: "The `asyncTests` code models Async tests with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-build-test-framework-m2",
        title: "Building a Testing Framework in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-test-framework-m2-l1",
          slug: "ts-build-test-framework-m2-l1",
          title: "Snapshots",
          concept: "Snapshot tests store the first output and fail when it changes, which catches unintended changes to complex output. Mastering it makes your testing framework code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"snapshots\", 9));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Snapshots is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Snapshots prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Snapshots",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: beta, gamma, delta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"beta\", \"gamma\", \"delta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 3 items, so items.length is 3.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "3", hidden: false },
              { name: "Output contains the expected value", expectedContains: "3", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Snapshots with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-test-framework-m2-l2",
          slug: "ts-build-test-framework-m2-l2",
          title: "Test discovery",
          concept: "Test discovery finds test files by pattern, such as files ending in .test.ts, and loads them in isolation. In this track you apply it while building testing framework features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];",
          exampleCode: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Test discovery values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Test discovery: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Test discovery",
            type: "multiple-choice",
            instructions: "Which statement about Test discovery is correct?",
            starterCode: "",
            solution: "Test discovery finds test files by pattern, such as files ending in .test.ts, and loads them in isolation.",
            solutionExplanation: "Test discovery finds test files by pattern, such as files ending in .test.ts, and loads them in isolation. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Test discovery finds test files by pattern, such as files ending in .test.ts, and loads them in isolation.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Test discovery really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Test discovery can only be used once in a program.", "Test discovery finds test files by pattern, such as files ending in .test.ts, and loads them in isolation.", "Test discovery requires a separate paid licence to use.", "Test discovery is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-build-test-framework-m2-l3",
          slug: "ts-build-test-framework-m2-l3",
          title: "Reporters",
          concept: "Reporters format results for humans and machines, from a simple pass/fail list to structured JSON for CI. Mastering it makes your testing framework code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 6, beta: 3 };",
          exampleCode: "const config: Record<string, number> = { alpha: 6, beta: 3 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Reporters can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Reporters logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Reporters",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"delta\", \"sigma\", \"omega\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"delta\", \"sigma\", \"omega\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"DELTA - SIGMA - OMEGA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "DELTA - SIGMA - OMEGA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "DELTA - SIGMA - OMEGA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Reporters with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-test-framework-m2-l4",
          slug: "ts-build-test-framework-m2-l4",
          title: "Parallel execution",
          concept: "Parallel test execution runs files in separate workers, so a large suite finishes in a fraction of the time. In this track you apply it while building testing framework features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 9 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Parallel execution.",
          bug: { prompt: "This loop for Parallel execution produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Parallel execution",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(4 * 4 + 6);",
            starterCode: "",
            solution: "22",
            solutionExplanation: "The program computes 4 * 4 + 6 = 22.",
            tests: [
              { name: "Correct answer", expectedContains: "22", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 4 * 4, then add 6.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["22", "16", "14", "10"],
            answerIndex: 0,
          }
        },
        {
          id: "ts-build-test-framework-m2-l5",
          slug: "ts-build-test-framework-m2-l5",
          title: "Designing a framework API",
          concept: "A good framework API reads like a description of the behaviour, with test names that explain what should happen. Mastering it makes your testing framework code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"designing\", 3));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Designing a framework API, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Designing a framework API changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the DesigningFramework config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `DesigningFrameworkConfig` for Designing a framework API with name \"omega\", retries 9 and enabled false, then log it with JSON.stringify.",
            starterCode: "type DesigningFrameworkConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DesigningFrameworkConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type DesigningFrameworkConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DesigningFrameworkConfig = { name: \"omega\", retries: 9, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"omega\",\"retries\":9,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"omega\",\"retries\":9,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"omega\",\"retries\":9,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Designing a framework API with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: testing framework progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your testing framework project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 7 of 10 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 10, done: 7, rate: completionRate(7, 10) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(7, 10) is Math.round((7 / 10) * 100) = 70, so the summary stringifies to {\"tasks\":10,\"done\":7,\"rate\":70}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":10,\"done\":7,\"rate\":70}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":70", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Building a Testing Framework in TypeScript Capstone Project",
      description: "Build a small working testing framework application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core testing framework features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-build-component-library",
    slug: "ts-build-component-library",
    language: "typescript",
    category: "languages",
    title: "Building a Component Library",
    description: "Advanced TypeScript: build a publishable component library with theming, documentation and releases",
    difficulty: "Advanced",
    estimatedHours: 22,
    skills: ["Compound components", "Polymorphic components", "Tree-shaking", "Theming", "SSR compatibility", "Library releases"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like building a box of parts that anyone can assemble into something new",
    modules: [
      {
        id: "ts-build-component-library-m1",
        title: "Building a Component Library Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-component-library-m1-l1",
          slug: "ts-build-component-library-m1-l1",
          title: "Library structure",
          concept: "A component library is a package of reusable components with typed props, styles and documentation, versioned as one unit. In this track you apply it while building component library features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 4 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Library structure values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Library structure: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the libraryStructure function",
            type: "build-function",
            instructions: "Write a function named `libraryStructure` for Library structure: it takes two numbers and returns their sum. Log the result of calling it with 7 and 4.",
            starterCode: "function libraryStructure(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(libraryStructure(7, 4));",
            solution: "function libraryStructure(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(libraryStructure(7, 4));",
            solutionExplanation: "The function returns 7 + 4 = 11, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "11", hidden: false },
              { name: "Output contains the expected value", expectedContains: "11", hidden: true }
            ],
            hintNotes: { concept: "The `libraryStructure` code models Library structure with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-component-library-m1-l2",
          slug: "ts-build-component-library-m1-l2",
          title: "Compound components",
          concept: "Compound components share state through context, so a Tabs component and its Tab children work together without prop drilling. Mastering it makes your component library code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"compound\", 7));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Compound components can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Compound components logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the compoundComponents function",
            type: "build-function",
            instructions: "Write a function named `compoundComponents` for Compound components: it takes two numbers and returns their product. Log the result of calling it with 10 and 6.",
            starterCode: "function compoundComponents(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(compoundComponents(10, 6));",
            solution: "function compoundComponents(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(compoundComponents(10, 6));",
            solutionExplanation: "The function returns 10 * 6 = 60, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "60", hidden: false },
              { name: "Output contains the expected value", expectedContains: "60", hidden: true }
            ],
            hintNotes: { concept: "The `compoundComponents` code models Compound components with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-component-library-m1-l3",
          slug: "ts-build-component-library-m1-l3",
          title: "Polymorphic components",
          concept: "A polymorphic component renders as different elements through an as prop, so a Button can be an anchor when it links somewhere. In this track you apply it while building component library features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];",
          exampleCode: "const items: string[] = [\"alpha\", \"beta\", \"gamma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Polymorphic components.",
          bug: { prompt: "This loop for Polymorphic components produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Polymorphic components",
            type: "multiple-choice",
            instructions: "Which statement about Polymorphic components is correct?",
            starterCode: "",
            solution: "A polymorphic component renders as different elements through an as prop, so a Button can be an anchor when it links somewhere.",
            solutionExplanation: "A polymorphic component renders as different elements through an as prop, so a Button can be an anchor when it links somewhere. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A polymorphic component renders as different elements through an as prop, so a Button can be an anchor when it links somewhere.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Polymorphic components really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Polymorphic components can only be used once in a program.", "A polymorphic component renders as different elements through an as prop, so a Button can be an anchor when it links somewhere.", "Polymorphic components requires a separate paid licence to use.", "Polymorphic components is not available in TypeScript."],
            answerIndex: 1,
          }
        },
        {
          id: "ts-build-component-library-m1-l4",
          slug: "ts-build-component-library-m1-l4",
          title: "Styling strategies",
          concept: "Component libraries style with CSS-in-JS, utility classes or plain CSS, and the choice decides how consumers customise them. Mastering it makes your component library code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 4, beta: 8 };",
          exampleCode: "const config: Record<string, number> = { alpha: 4, beta: 8 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Styling strategies, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Styling strategies changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the stylingStrategies function",
            type: "build-function",
            instructions: "Write a function named `stylingStrategies` for Styling strategies: it takes two numbers and returns the first minus the second. Log the result of calling it with 14 and 10.",
            starterCode: "function stylingStrategies(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(stylingStrategies(14, 10));",
            solution: "function stylingStrategies(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(stylingStrategies(14, 10));",
            solutionExplanation: "The function returns 14 - 10 = 4, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "4", hidden: false },
              { name: "Output contains the expected value", expectedContains: "4", hidden: true }
            ],
            hintNotes: { concept: "The `stylingStrategies` code models Styling strategies with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-component-library-m1-l5",
          slug: "ts-build-component-library-m1-l5",
          title: "Tree-shaking",
          concept: "Tree-shaking removes unused components from the bundle, so importing one component does not ship the whole library. In this track you apply it while building component library features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 7 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Tree-shaking code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Tree-shaking crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the treeshaking function",
            type: "build-function",
            instructions: "Write a function named `treeshaking` for Tree-shaking: it takes three numbers and returns a * b + c. Log the result of calling it with 10, 4 and 3.",
            starterCode: "function treeshaking(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(treeshaking(10, 4, 3));",
            solution: "function treeshaking(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(treeshaking(10, 4, 3));",
            solutionExplanation: "The function returns 10 * 4 + 3 = 43, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "43", hidden: false },
              { name: "Output contains the expected value", expectedContains: "43", hidden: true }
            ],
            hintNotes: { concept: "The `treeshaking` code models Tree-shaking with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-build-component-library-m2",
        title: "Building a Component Library in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-component-library-m2-l1",
          slug: "ts-build-component-library-m2-l1",
          title: "Theming tokens",
          concept: "Theme tokens let consumers restyle the whole library by changing values, without touching component code. Mastering it makes your component library code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"theming\", 10));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Theming tokens is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Theming tokens prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Theming tokens",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: delta, sigma, omega, kappa. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"delta\", \"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 4 items, so items.length is 4.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "4", hidden: false },
              { name: "Output contains the expected value", expectedContains: "4", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Theming tokens with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-component-library-m2-l2",
          slug: "ts-build-component-library-m2-l2",
          title: "SSR compatibility",
          concept: "Server-rendered components must avoid browser-only APIs during render, or the server render crashes. In this track you apply it while building component library features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];",
          exampleCode: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for SSR compatibility values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about SSR compatibility: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: SSR compatibility",
            type: "multiple-choice",
            instructions: "Which statement about SSR compatibility is correct?",
            starterCode: "",
            solution: "Server-rendered components must avoid browser-only APIs during render, or the server render crashes.",
            solutionExplanation: "Server-rendered components must avoid browser-only APIs during render, or the server render crashes. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Server-rendered components must avoid browser-only APIs during render, or the server render crashes.", hidden: false }
            ],
            hintNotes: { concept: "Think about what SSR compatibility really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["SSR compatibility can only be used once in a program.", "SSR compatibility requires a separate paid licence to use.", "Server-rendered components must avoid browser-only APIs during render, or the server render crashes.", "SSR compatibility is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-build-component-library-m2-l3",
          slug: "ts-build-component-library-m2-l3",
          title: "Documenting a library",
          concept: "Component documentation shows live examples, prop tables and usage guidance, so adoption needs no source reading. Mastering it makes your component library code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 7, beta: 5 };",
          exampleCode: "const config: Record<string, number> = { alpha: 7, beta: 5 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Documenting a library can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Documenting a library logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Documenting a library",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"omega\", \"kappa\", \"lambda\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"omega\", \"kappa\", \"lambda\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"OMEGA, KAPPA, LAMBDA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "OMEGA, KAPPA, LAMBDA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "OMEGA, KAPPA, LAMBDA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Documenting a library with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-component-library-m2-l4",
          slug: "ts-build-component-library-m2-l4",
          title: "Releasing the library",
          concept: "Releasing a library means versioning, changelogs and a build that ships both JavaScript and type declarations. In this track you apply it while building component library features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 10 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Releasing the library.",
          bug: { prompt: "This loop for Releasing the library produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Releasing the library",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(7 * 5 + 3);",
            starterCode: "",
            solution: "38",
            solutionExplanation: "The program computes 7 * 5 + 3 = 38.",
            tests: [
              { name: "Correct answer", expectedContains: "38", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 7 * 5, then add 3.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["35", "38", "15", "32"],
            answerIndex: 1,
          }
        },
        {
          id: "ts-build-component-library-m2-l5",
          slug: "ts-build-component-library-m2-l5",
          title: "Maintaining the library",
          concept: "Maintaining a library means fixing bugs without breaking consumers, with deprecation warnings before any removal. Mastering it makes your component library code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"maintaining\", 4));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Maintaining the library, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Maintaining the library changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the MaintainingLibrary config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `MaintainingLibraryConfig` for Maintaining the library with name \"lambda\", retries 7 and enabled true, then log it with JSON.stringify.",
            starterCode: "type MaintainingLibraryConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: MaintainingLibraryConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type MaintainingLibraryConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: MaintainingLibraryConfig = { name: \"lambda\", retries: 7, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"lambda\",\"retries\":7,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"lambda\",\"retries\":7,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"lambda\",\"retries\":7,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Maintaining the library with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: component library progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your component library project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 18 of 20 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 20, done: 18, rate: completionRate(18, 20) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(18, 20) is Math.round((18 / 20) * 100) = 90, so the summary stringifies to {\"tasks\":20,\"done\":18,\"rate\":90}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":20,\"done\":18,\"rate\":90}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":90", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Building a Component Library Capstone Project",
      description: "Build a small working component library application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core component library features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-build-serverless-api",
    slug: "ts-build-serverless-api",
    language: "typescript",
    category: "languages",
    title: "Building a Serverless API in TypeScript",
    description: "Advanced TypeScript: build a production serverless API in TypeScript, from routing to observability",
    difficulty: "Advanced",
    estimatedHours: 24,
    skills: ["Serverless routing", "Request validation", "Authentication", "Database connections", "Rate limiting", "Observability"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like running a post office that only opens a counter when a letter arrives",
    modules: [
      {
        id: "ts-build-serverless-api-m1",
        title: "Building a Serverless API in TypeScript Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-serverless-api-m1-l1",
          slug: "ts-build-serverless-api-m1-l1",
          title: "Routing without servers",
          concept: "A serverless API maps each HTTP route to a function, so the platform scales each endpoint independently. In this track you apply it while building serverless API features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 5 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Routing without servers values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Routing without servers: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the routingWithout function",
            type: "build-function",
            instructions: "Write a function named `routingWithout` for Routing without servers: it takes two numbers and returns their sum. Log the result of calling it with 5 and 9.",
            starterCode: "function routingWithout(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(routingWithout(5, 9));",
            solution: "function routingWithout(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(routingWithout(5, 9));",
            solutionExplanation: "The function returns 5 + 9 = 14, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "14", hidden: false },
              { name: "Output contains the expected value", expectedContains: "14", hidden: true }
            ],
            hintNotes: { concept: "The `routingWithout` code models Routing without servers with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-serverless-api-m1-l2",
          slug: "ts-build-serverless-api-m1-l2",
          title: "Request validation",
          concept: "Serverless handlers validate request bodies against a schema before doing any work, returning 400 for bad input. Mastering it makes your serverless API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"request\", 8));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Request validation can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Request validation logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the requestValidation function",
            type: "build-function",
            instructions: "Write a function named `requestValidation` for Request validation: it takes two numbers and returns their product. Log the result of calling it with 8 and 3.",
            starterCode: "function requestValidation(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(requestValidation(8, 3));",
            solution: "function requestValidation(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(requestValidation(8, 3));",
            solutionExplanation: "The function returns 8 * 3 = 24, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "24", hidden: false },
              { name: "Output contains the expected value", expectedContains: "24", hidden: true }
            ],
            hintNotes: { concept: "The `requestValidation` code models Request validation with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-serverless-api-m1-l3",
          slug: "ts-build-serverless-api-m1-l3",
          title: "Authentication in serverless APIs",
          concept: "Serverless APIs verify tokens in a shared authoriser, so handlers receive only requests that are already authenticated. In this track you apply it while building serverless API features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];",
          exampleCode: "const items: string[] = [\"gamma\", \"delta\", \"sigma\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Authentication in serverless APIs.",
          bug: { prompt: "This loop for Authentication in serverless APIs produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Authentication in serverless APIs",
            type: "multiple-choice",
            instructions: "Which statement about Authentication in serverless APIs is correct?",
            starterCode: "",
            solution: "Serverless APIs verify tokens in a shared authoriser, so handlers receive only requests that are already authenticated.",
            solutionExplanation: "Serverless APIs verify tokens in a shared authoriser, so handlers receive only requests that are already authenticated. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Serverless APIs verify tokens in a shared authoriser, so handlers receive only requests that are already authenticated.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Authentication in serverless APIs really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Authentication in serverless APIs can only be used once in a program.", "Authentication in serverless APIs requires a separate paid licence to use.", "Serverless APIs verify tokens in a shared authoriser, so handlers receive only requests that are already authenticated.", "Authentication in serverless APIs is not available in TypeScript."],
            answerIndex: 2,
          }
        },
        {
          id: "ts-build-serverless-api-m1-l4",
          slug: "ts-build-serverless-api-m1-l4",
          title: "Connecting to databases",
          concept: "Serverless functions connect to databases through pools or HTTP drivers, because a new connection per invocation is too slow. Mastering it makes your serverless API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 5, beta: 3 };",
          exampleCode: "const config: Record<string, number> = { alpha: 5, beta: 3 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Connecting to databases, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Connecting to databases changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the connectingDatabases function",
            type: "build-function",
            instructions: "Write a function named `connectingDatabases` for Connecting to databases: it takes two numbers and returns the first minus the second. Log the result of calling it with 12 and 7.",
            starterCode: "function connectingDatabases(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(connectingDatabases(12, 7));",
            solution: "function connectingDatabases(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(connectingDatabases(12, 7));",
            solutionExplanation: "The function returns 12 - 7 = 5, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `connectingDatabases` code models Connecting to databases with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-serverless-api-m1-l5",
          slug: "ts-build-serverless-api-m1-l5",
          title: "Cold starts in serverless APIs",
          concept: "Cold starts delay the first request to a function, and small bundles plus provisioned concurrency keep them short. In this track you apply it while building serverless API features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 8 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Cold starts in serverless APIs code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Cold starts in serverless APIs crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the coldStarts function",
            type: "build-function",
            instructions: "Write a function named `coldStarts` for Cold starts in serverless APIs: it takes three numbers and returns a * b + c. Log the result of calling it with 8, 9 and 6.",
            starterCode: "function coldStarts(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(coldStarts(8, 9, 6));",
            solution: "function coldStarts(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(coldStarts(8, 9, 6));",
            solutionExplanation: "The function returns 8 * 9 + 6 = 78, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "78", hidden: false },
              { name: "Output contains the expected value", expectedContains: "78", hidden: true }
            ],
            hintNotes: { concept: "The `coldStarts` code models Cold starts in serverless APIs with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-build-serverless-api-m2",
        title: "Building a Serverless API in TypeScript in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-build-serverless-api-m2-l1",
          slug: "ts-build-serverless-api-m2-l1",
          title: "Pagination",
          concept: "Serverless list endpoints paginate with cursors, so a client fetches one page at a time instead of the whole table. Mastering it makes your serverless API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"pagination\", 2));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Pagination is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Pagination prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Pagination",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: omega, kappa, lambda, theta, zeta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"omega\", \"kappa\", \"lambda\", \"theta\", \"zeta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 5 items, so items.length is 5.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "5", hidden: false },
              { name: "Output contains the expected value", expectedContains: "5", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Pagination with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-serverless-api-m2-l2",
          slug: "ts-build-serverless-api-m2-l2",
          title: "Rate limiting",
          concept: "Rate limiting caps requests per client, protecting the API and the database from abuse and accidents. In this track you apply it while building serverless API features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];",
          exampleCode: "const items: string[] = [\"kappa\", \"lambda\", \"theta\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Rate limiting values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Rate limiting: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Rate limiting",
            type: "multiple-choice",
            instructions: "Which statement about Rate limiting is correct?",
            starterCode: "",
            solution: "Rate limiting caps requests per client, protecting the API and the database from abuse and accidents.",
            solutionExplanation: "Rate limiting caps requests per client, protecting the API and the database from abuse and accidents. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Rate limiting caps requests per client, protecting the API and the database from abuse and accidents.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Rate limiting really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Rate limiting can only be used once in a program.", "Rate limiting requires a separate paid licence to use.", "Rate limiting is not available in TypeScript.", "Rate limiting caps requests per client, protecting the API and the database from abuse and accidents."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-build-serverless-api-m2-l3",
          slug: "ts-build-serverless-api-m2-l3",
          title: "Error responses",
          concept: "Consistent error responses use typed codes and messages, so clients handle failures without parsing free text. Mastering it makes your serverless API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 8, beta: 7 };",
          exampleCode: "const config: Record<string, number> = { alpha: 8, beta: 7 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Error responses can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Error responses logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Error responses",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \" - \".",
            starterCode: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\n// TODO: log the parts in upper case, joined with \" - \"",
            solution: "const parts: string[] = [\"lambda\", \"theta\", \"zeta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\" - \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \" - \" gives \"LAMBDA - THETA - ZETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "LAMBDA - THETA - ZETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "LAMBDA - THETA - ZETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Error responses with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-build-serverless-api-m2-l4",
          slug: "ts-build-serverless-api-m2-l4",
          title: "Observability",
          concept: "Serverless observability comes from structured logs, metrics and traces, since there is no server to inspect. In this track you apply it while building serverless API features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 2 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Observability.",
          bug: { prompt: "This loop for Observability produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Observability",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(3 * 6 + 8);",
            starterCode: "",
            solution: "26",
            solutionExplanation: "The program computes 3 * 6 + 8 = 26.",
            tests: [
              { name: "Correct answer", expectedContains: "26", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 3 * 6, then add 8.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["18", "17", "26", "10"],
            answerIndex: 2,
          }
        },
        {
          id: "ts-build-serverless-api-m2-l5",
          slug: "ts-build-serverless-api-m2-l5",
          title: "Deploying the API",
          concept: "Deploying a serverless API means bundling functions, wiring routes, and promoting the deployment through stages. Mastering it makes your serverless API code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"deploying\", 5));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Deploying the API, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Deploying the API changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the DeployingAPI config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `DeployingAPIConfig` for Deploying the API with name \"zeta\", retries 5 and enabled false, then log it with JSON.stringify.",
            starterCode: "type DeployingAPIConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DeployingAPIConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type DeployingAPIConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: DeployingAPIConfig = { name: \"zeta\", retries: 5, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"zeta\",\"retries\":5,\"enabled\":false}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"zeta\",\"retries\":5,\"enabled\":false}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"zeta\",\"retries\":5,\"enabled\":false}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models Deploying the API with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: serverless API progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your serverless API project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 6 of 8 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 8, done: 6, rate: completionRate(6, 8) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(6, 8) is Math.round((6 / 8) * 100) = 75, so the summary stringifies to {\"tasks\":8,\"done\":6,\"rate\":75}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":8,\"done\":6,\"rate\":75}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":75", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "Building a Serverless API in TypeScript Capstone Project",
      description: "Build a small working serverless API application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core serverless API features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  },
  {
    id: "ts-mastery-capstone",
    slug: "ts-mastery-capstone",
    language: "typescript",
    category: "languages",
    title: "TypeScript Mastery Capstone",
    description: "Advanced TypeScript: bring every TypeScript skill together in one complete, reviewed, shipped application",
    difficulty: "Advanced",
    estimatedHours: 30,
    skills: ["Architecture review", "Type-level design", "Performance audit", "Security review", "Testing strategy", "Shipping"],
    prerequisites: ["TypeScript Programming"],
    analogy: "Learning {topic} is like running a final inspection on a building before handing over the keys",
    modules: [
      {
        id: "ts-mastery-capstone-m1",
        title: "TypeScript Mastery Capstone Fundamentals",
        level: "advanced",
        lessons: [
        {
          id: "ts-mastery-capstone-m1-l1",
          slug: "ts-mastery-capstone-m1-l1",
          title: "Architecture review",
          concept: "A good architecture review checks that modules have one responsibility and that dependencies point in one direction. In this track you apply it while building TypeScript application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 6 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Architecture review values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Architecture review: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Write the architectureReview function",
            type: "build-function",
            instructions: "Write a function named `architectureReview` for Architecture review: it takes two numbers and returns their sum. Log the result of calling it with 3 and 6.",
            starterCode: "function architectureReview(a: number, b: number): number {\n  // TODO: return the sum of a and b\n  return 0;\n}\n\nconsole.log(architectureReview(3, 6));",
            solution: "function architectureReview(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(architectureReview(3, 6));",
            solutionExplanation: "The function returns 3 + 6 = 9, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "9", hidden: false },
              { name: "Output contains the expected value", expectedContains: "9", hidden: true }
            ],
            hintNotes: { concept: "The `architectureReview` code models Architecture review with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-mastery-capstone-m1-l2",
          slug: "ts-mastery-capstone-m1-l2",
          title: "Type-level design",
          concept: "Type-level design means choosing types that make invalid states impossible, so the compiler enforces the rules. Mastering it makes your TypeScript application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"typelevel\", 9));",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Type-level design can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Type-level design logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Write the typelevelDesign function",
            type: "build-function",
            instructions: "Write a function named `typelevelDesign` for Type-level design: it takes two numbers and returns their product. Log the result of calling it with 6 and 8.",
            starterCode: "function typelevelDesign(a: number, b: number): number {\n  // TODO: return the product of a and b\n  return 0;\n}\n\nconsole.log(typelevelDesign(6, 8));",
            solution: "function typelevelDesign(a: number, b: number): number {\n  return a * b;\n}\n\nconsole.log(typelevelDesign(6, 8));",
            solutionExplanation: "The function returns 6 * 8 = 48, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "48", hidden: false },
              { name: "Output contains the expected value", expectedContains: "48", hidden: true }
            ],
            hintNotes: { concept: "The `typelevelDesign` code models Type-level design with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-mastery-capstone-m1-l3",
          slug: "ts-mastery-capstone-m1-l3",
          title: "Performance audit",
          concept: "A performance audit measures real user flows first, then optimises the slowest step instead of the most obvious one. In this track you apply it while building TypeScript application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];",
          exampleCode: "const items: string[] = [\"sigma\", \"omega\", \"kappa\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Performance audit.",
          bug: { prompt: "This loop for Performance audit produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Quiz: Performance audit",
            type: "multiple-choice",
            instructions: "Which statement about Performance audit is correct?",
            starterCode: "",
            solution: "A performance audit measures real user flows first, then optimises the slowest step instead of the most obvious one.",
            solutionExplanation: "A performance audit measures real user flows first, then optimises the slowest step instead of the most obvious one. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "A performance audit measures real user flows first, then optimises the slowest step instead of the most obvious one.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Performance audit really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Performance audit can only be used once in a program.", "Performance audit requires a separate paid licence to use.", "Performance audit is not available in TypeScript.", "A performance audit measures real user flows first, then optimises the slowest step instead of the most obvious one."],
            answerIndex: 3,
          }
        },
        {
          id: "ts-mastery-capstone-m1-l4",
          slug: "ts-mastery-capstone-m1-l4",
          title: "Security review",
          concept: "A security review checks inputs, secrets and permissions, because most vulnerabilities come from trusting data too much. Mastering it makes your TypeScript application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 6, beta: 5 };",
          exampleCode: "const config: Record<string, number> = { alpha: 6, beta: 5 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with Security review, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for Security review changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Write the securityReview function",
            type: "build-function",
            instructions: "Write a function named `securityReview` for Security review: it takes two numbers and returns the first minus the second. Log the result of calling it with 10 and 4.",
            starterCode: "function securityReview(a: number, b: number): number {\n  // TODO: return a minus b\n  return 0;\n}\n\nconsole.log(securityReview(10, 4));",
            solution: "function securityReview(a: number, b: number): number {\n  return a - b;\n}\n\nconsole.log(securityReview(10, 4));",
            solutionExplanation: "The function returns 10 - 4 = 6, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "6", hidden: false },
              { name: "Output contains the expected value", expectedContains: "6", hidden: true }
            ],
            hintNotes: { concept: "The `securityReview` code models Security review with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-mastery-capstone-m1-l5",
          slug: "ts-mastery-capstone-m1-l5",
          title: "Testing strategy",
          concept: "A testing strategy mixes unit, integration and end-to-end tests, with each level covering what the others cannot. In this track you apply it while building TypeScript application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 9 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mutating an object shared by Testing strategy code instead of creating a new copy, so another part of the program sees the change.",
          bug: { prompt: "This code for Testing strategy crashes when the user is missing. Fix it to handle the missing case.", buggyCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + user.name;\n}\nconsole.log(greet(undefined));", fixedCode: "function greet(user: { name: string } | undefined): string {\n  return \"Hello, \" + (user?.name ?? \"guest\");\n}\nconsole.log(greet(undefined));", explanation: "user can be undefined, so accessing user.name directly throws; optional chaining with a fallback handles the missing case." },
          exercise: {
            title: "Write the testingStrategy function",
            type: "build-function",
            instructions: "Write a function named `testingStrategy` for Testing strategy: it takes three numbers and returns a * b + c. Log the result of calling it with 6, 6 and 3.",
            starterCode: "function testingStrategy(a: number, b: number, c: number): number {\n  // TODO: return a * b + c\n  return 0;\n}\n\nconsole.log(testingStrategy(6, 6, 3));",
            solution: "function testingStrategy(a: number, b: number, c: number): number {\n  return a * b + c;\n}\n\nconsole.log(testingStrategy(6, 6, 3));",
            solutionExplanation: "The function returns 6 * 6 + 3 = 39, and console.log prints that value.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "39", hidden: false },
              { name: "Output contains the expected value", expectedContains: "39", hidden: true }
            ],
            hintNotes: { concept: "The `testingStrategy` code models Testing strategy with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      },
      {
        id: "ts-mastery-capstone-m2",
        title: "TypeScript Mastery Capstone in Practice",
        level: "advanced",
        lessons: [
        {
          id: "ts-mastery-capstone-m2-l1",
          slug: "ts-mastery-capstone-m2-l1",
          title: "Refactoring safely",
          concept: "Safe refactoring changes structure without changing behaviour, protected by tests that run before and after. Mastering it makes your TypeScript application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"refactoring\", 3));",
          exampleLanguage: "typescript",
          mistake: "Assuming an array used by Refactoring safely is non-empty and reading index 0 without checking its length first.",
          bug: { prompt: "This code for Refactoring safely prints \"51\" instead of 6. Fix the type error.", buggyCode: "function total(a: string, b: number): string {\n  return a + b;\n}\nconsole.log(total(\"5\", 1));", fixedCode: "function total(a: string, b: number): string {\n  return String(Number(a) + b);\n}\nconsole.log(total(\"5\", 1));", explanation: "Adding a string and a number concatenates, so the result is the string \"51\" instead of 6; converting the string to a number first gives the numeric sum." },
          exercise: {
            title: "Count the items in Refactoring safely",
            type: "write-code",
            instructions: "Create an array named `items` holding these values: lambda, theta, zeta. Log how many items the array holds, using its length property.",
            starterCode: "const items: string[] = [];\nconsole.log(items.length);",
            solution: "const items: string[] = [\"lambda\", \"theta\", \"zeta\"];\nconsole.log(items.length);",
            solutionExplanation: "The array holds 3 items, so items.length is 3.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "3", hidden: false },
              { name: "Output contains the expected value", expectedContains: "3", hidden: true }
            ],
            hintNotes: { concept: "The `items` code models Refactoring safely with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-mastery-capstone-m2-l2",
          slug: "ts-mastery-capstone-m2-l2",
          title: "Code review",
          concept: "Code review catches what tests cannot, such as unclear naming and hidden assumptions, and spreads knowledge across the team. In this track you apply it while building TypeScript application features, and the TypeScript compiler checks your types as you go.",
          syntax: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];",
          exampleCode: "const items: string[] = [\"theta\", \"zeta\", \"alpha\"];\nconsole.log(items.length + \" items: \" + items.join(\", \"));",
          exampleLanguage: "typescript",
          mistake: "Using `any` for Code review values instead of a precise type, which throws away the safety TypeScript provides.",
          bug: { prompt: "Fix the type safety problem in this code about Code review: the function accepts and returns `any`, so the compiler cannot check it.", buggyCode: "function handle(value: any): any {\n  return value;\n}\nconsole.log(handle(\"hello\"));", fixedCode: "function handle(value: string): string {\n  return value;\n}\nconsole.log(handle(\"hello\"));", explanation: "Typing the parameter and return value as string lets the compiler catch wrong arguments instead of failing at runtime." },
          exercise: {
            title: "Quiz: Code review",
            type: "multiple-choice",
            instructions: "Which statement about Code review is correct?",
            starterCode: "",
            solution: "Code review catches what tests cannot, such as unclear naming and hidden assumptions, and spreads knowledge across the team.",
            solutionExplanation: "Code review catches what tests cannot, such as unclear naming and hidden assumptions, and spreads knowledge across the team. The other options are false.",
            tests: [
              { name: "Correct answer", expectedContains: "Code review catches what tests cannot, such as unclear naming and hidden assumptions, and spreads knowledge across the team.", hidden: false }
            ],
            hintNotes: { concept: "Think about what Code review really means from the lesson concept.", approach: "Rule out the options that make extreme claims such as only once, paid licence, or not available.", structure: "Four statements are given; exactly one matches the lesson concept." },
            options: ["Code review catches what tests cannot, such as unclear naming and hidden assumptions, and spreads knowledge across the team.", "Code review can only be used once in a program.", "Code review requires a separate paid licence to use.", "Code review is not available in TypeScript."],
            answerIndex: 0,
          }
        },
        {
          id: "ts-mastery-capstone-m2-l3",
          slug: "ts-mastery-capstone-m2-l3",
          title: "Documentation",
          concept: "Good documentation explains why decisions were made, so the next developer does not undo them by accident. Mastering it makes your TypeScript application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "const config: Record<string, number> = { alpha: 9, beta: 9 };",
          exampleCode: "const config: Record<string, number> = { alpha: 9, beta: 9 };\nconsole.log(config.alpha + config.beta);",
          exampleLanguage: "typescript",
          mistake: "Forgetting that a value in Documentation can be `undefined` and accessing a property on it without a check.",
          bug: { prompt: "This code about Documentation logs the wrong value because a promise is used before it resolves. Fix it.", buggyCode: "async function load(): Promise<number> {\n  return 42;\n}\nconst value = load();\nconsole.log(value + 1);", fixedCode: "async function load(): Promise<number> {\n  return 42;\n}\nasync function main(): Promise<void> {\n  const value = await load();\n  console.log(value + 1);\n}\nvoid main();", explanation: "load() returns a Promise<number>, so you must await it before using the number; otherwise value is a promise object, not 42." },
          exercise: {
            title: "Join the parts for Documentation",
            type: "write-code",
            instructions: "Using the `parts` array, log the parts in upper case, joined with \", \".",
            starterCode: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\n// TODO: log the parts in upper case, joined with \", \"",
            solution: "const parts: string[] = [\"zeta\", \"alpha\", \"beta\"];\nconsole.log(parts.map((p) => p.toUpperCase()).join(\", \"));",
            solutionExplanation: "Mapping each part to upper case and joining with \", \" gives \"ZETA, ALPHA, BETA\".",
            tests: [
              { name: "Produces the expected output", expectedStdout: "ZETA, ALPHA, BETA", hidden: false },
              { name: "Output contains the expected value", expectedContains: "ZETA, ALPHA, BETA", hidden: true }
            ],
            hintNotes: { concept: "The `parts` code models Documentation with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        },
        {
          id: "ts-mastery-capstone-m2-l4",
          slug: "ts-mastery-capstone-m2-l4",
          title: "Shipping",
          concept: "Shipping means a repeatable release: versioned, tested, monitored, and reversible when something goes wrong. In this track you apply it while building TypeScript application features, and the TypeScript compiler checks your types as you go.",
          syntax: "type Result = { ok: boolean; value: number };",
          exampleCode: "type Result = { ok: boolean; value: number };\nconst r: Result = { ok: true, value: 3 };\nconsole.log(r.ok ? r.value : 0);",
          exampleLanguage: "typescript",
          mistake: "Mixing up `=` (assignment) with `===` (comparison) when writing a condition for Shipping.",
          bug: { prompt: "This loop for Shipping produces NaN. Find and fix the off-by-one error.", buggyCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i <= items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", fixedCode: "const items: number[] = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < items.length; i++) {\n  total += items[i];\n}\nconsole.log(total);", explanation: "The loop runs one step too far and adds undefined, which turns the total into NaN; the condition must stop before items.length." },
          exercise: {
            title: "Predict the output: Shipping",
            type: "predict-output",
            instructions: "What does this TypeScript program print?\n\nconsole.log(6 * 7 + 5);",
            starterCode: "",
            solution: "47",
            solutionExplanation: "The program computes 6 * 7 + 5 = 47.",
            tests: [
              { name: "Correct answer", expectedContains: "47", hidden: false }
            ],
            hintNotes: { concept: "Multiplication runs before addition in TypeScript, just like in arithmetic.", approach: "First compute 6 * 7, then add 5.", structure: "One console.log of a single arithmetic expression; work it out step by step." },
            options: ["42", "18", "37", "47"],
            answerIndex: 3,
          }
        },
        {
          id: "ts-mastery-capstone-m2-l5",
          slug: "ts-mastery-capstone-m2-l5",
          title: "The mastery checklist",
          concept: "Mastery is a checklist, not a feeling: typed, tested, documented, performant, secure, and shipped. Mastering it makes your TypeScript application code safer, because mistakes surface at compile time instead of in production.",
          syntax: "function describe(name: string, value: number): string { return name + \" has \" + value; }",
          exampleCode: "function describe(name: string, value: number): string {\n  return name + \" has \" + value;\n}\nconsole.log(describe(\"mastery\", 6));",
          exampleLanguage: "typescript",
          mistake: "Forgetting to `await` a promise when working with The mastery checklist, then using the pending promise as if it were the result.",
          bug: { prompt: "This code for The mastery checklist changes the original array by accident. Fix it so the original stays unchanged.", buggyCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = original;\ncopy.push(\"c\");\nconsole.log(original.length);", fixedCode: "const original: string[] = [\"a\", \"b\"];\nconst copy = [...original];\ncopy.push(\"c\");\nconsole.log(original.length);", explanation: "Assigning an array copies the reference, not the contents, so pushing to copy also changes original; spread creates a real copy." },
          exercise: {
            title: "Build the MasteryChecklist config",
            type: "write-code",
            instructions: "Create a value named `cfg` of type `MasteryChecklistConfig` for The mastery checklist with name \"beta\", retries 3 and enabled true, then log it with JSON.stringify.",
            starterCode: "type MasteryChecklistConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: MasteryChecklistConfig = { name: \"\", retries: 0, enabled: false };\nconsole.log(JSON.stringify(cfg));",
            solution: "type MasteryChecklistConfig = { name: string; retries: number; enabled: boolean };\nconst cfg: MasteryChecklistConfig = { name: \"beta\", retries: 3, enabled: true };\nconsole.log(JSON.stringify(cfg));",
            solutionExplanation: "The config object stringifies to {\"name\":\"beta\",\"retries\":3,\"enabled\":true}.",
            tests: [
              { name: "Produces the expected output", expectedStdout: "{\"name\":\"beta\",\"retries\":3,\"enabled\":true}", hidden: false },
              { name: "Output contains the expected value", expectedContains: "{\"name\":\"beta\",\"retries\":3,\"enabled\":true}", hidden: true }
            ],
            hintNotes: { concept: "The `cfg` code models The mastery checklist with plain typed TypeScript, so the compiler checks every value.", approach: "Write the typed code first, then the console.log call, and compare your output with the expected value.", structure: "A small typed snippet followed by a single console.log line that prints the result." },
          }
        }
        ],
      }
    ],
    capstoneExercise: {
      title: "Capstone: TypeScript application progress summary",
      type: "build-program",
      instructions: "Build a small progress summary for your TypeScript application project: a Summary type with tasks, done and rate, a completionRate function that returns the rounded percentage, and a summary value for 9 of 10 tasks done. Log the summary as JSON.",
      starterCode: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  // TODO: return the percentage of done out of total, rounded\n  return 0;\n}\nconst summary: Summary = { tasks: 0, done: 0, rate: 0 };\nconsole.log(JSON.stringify(summary));",
      solution: "type Summary = { tasks: number; done: number; rate: number };\nfunction completionRate(done: number, total: number): number {\n  return Math.round((done / total) * 100);\n}\nconst summary: Summary = { tasks: 10, done: 9, rate: completionRate(9, 10) };\nconsole.log(JSON.stringify(summary));",
      solutionExplanation: "completionRate(9, 10) is Math.round((9 / 10) * 100) = 90, so the summary stringifies to {\"tasks\":10,\"done\":9,\"rate\":90}.",
      tests: [
        { name: "Produces the expected summary", expectedStdout: "{\"tasks\":10,\"done\":9,\"rate\":90}", hidden: false },
        { name: "Summary contains the completion rate", expectedContains: "\"rate\":90", hidden: true }
      ],
      hintNotes: { concept: "A percentage is done divided by total, times 100, rounded to a whole number.", approach: "Implement completionRate first, then build the summary object from it.", structure: "One type, one function, one summary object, and a single console.log of JSON.stringify(summary)." },
    },
    capstone: {
      title: "TypeScript Mastery Capstone Capstone Project",
      description: "Build a small working TypeScript application application in TypeScript that demonstrates the skills from this track.",
      rubric: ["Types are precise and strict; the project compiles with no `any` and no type errors.", "Core features work end to end for the main happy path and a failure case.", "Errors are handled gracefully with clear, user-facing messages.", "Code is organised, readable, and covered by the automated checks.", "Documentation explains setup, usage, and design decisions."],
      requirements: ["Implement the core TypeScript application features using strict TypeScript types (no `any`).", "Handle errors and edge cases (missing data, failed operations) with clear messages.", "Organise the code into small typed modules with one responsibility each.", "Add at least three automated checks that verify the main behaviour.", "Document how to run the project and what each part does."],
    },
  }
]);

export const TRACKS_700 = courses;
export const SHORT_ASSESSMENTS_700 = assessments;
