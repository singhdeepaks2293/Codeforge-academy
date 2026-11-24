# Curriculum

Content lives in `backend/src/curriculum/data/*.ts` as typed data and is seeded into SQLite at startup (`backend/src/db/seed.ts`). The frontend never hardcodes lesson text. Admins can create/publish/unpublish courses and add modules/exercises through the admin curriculum UI. New tracks are authored with the compact `LessonSpec` format in `backend/src/curriculum/builder.ts` (schema compliance by construction: 1 exercise per lesson, exactly 5 hints, ≥2 quiz questions); see `docs/TRACKS-100-MANIFEST.md` for the authoring rules and the full 93-track plan.

## Structure

Every lesson has: title, 3 objectives, introduction, concept explanation, syntax, real-world analogy, complete example, 3–5 step walkthrough, 3 common mistakes, a debugging exercise (buggy code + fixed code + explanation), a mini challenge, a summary, a 2–3 question knowledge check, and exactly 1 interactive exercise with starter code, solution, visible + hidden stdin/stdout tests (code exercises) or 4 options + answer (quiz exercises), and exactly 5 progressive hints (1 conceptual, 2 approach, 3 structural/pseudocode, 4 debugging, 5 full solution with explanation).

## Tracks — 100 total, 1354 lessons, 1354 exercises

Original 7 tracks (full mastery assessment: 40 questions + 5 programming exercises + capstone, pass 80%):

| Track | Modules | Lessons | Assessment |
|---|---|---|---|
| C | 27 | 54 | full mastery |
| C++ | 26 | 52 | full mastery |
| Python | 27 | 54 | full mastery |
| TypeScript | 23 | 46 | full mastery |
| React (TS-based) | 23 | 46 | full mastery |
| Rust | 27 | 54 | full mastery |
| Go | 24 | 48 | full mastery |

New 93 tracks (short assessment: 10 questions — 5 conceptual, 3 code-reading, 2 debugging — + 1 programming exercise + capstone, pass 80%). Runtime column is the sandbox status at build time; the live status is always `GET /api/execute/runtimes`.

### Languages (20 tracks, 217 lessons)

| Track | Lessons | Exec language | Runtime in sandbox |
|---|---|---|---|
| Java Programming | 11 | java | available (single-file launch) |
| JavaScript Programming | 11 | javascript | available |
| C# Programming | 11 | csharp | unavailable — honest 503 |
| Kotlin Programming | 11 | kotlin | unavailable — honest 503 |
| Swift Programming | 11 | swift | unavailable — honest 503 |
| PHP Programming | 11 | php | unavailable — honest 503 |
| Ruby Programming | 11 | ruby | unavailable — honest 503 |
| Dart Programming | 11 | dart | unavailable — honest 503 |
| Scala Programming | 11 | scala | unavailable — honest 503 |
| Haskell Programming | 11 | haskell | unavailable — honest 503 |
| Elixir Programming | 11 | elixir | unavailable — honest 503 |
| Lua Programming | 11 | lua | unavailable — honest 503 |
| R for Programmers | 11 | r | unavailable — honest 503 |
| Julia Programming | 11 | julia | unavailable — honest 503 |
| Perl Programming | 11 | perl | available |
| Objective-C Programming | 10 | objc | unavailable — honest 503 |
| Assembly Language (x86-64) | 11 | asm | available (gcc) |
| Solidity & Smart Contracts | 10 | solidity | unavailable — honest 503 |
| SQL Fundamentals | 11 | sql | available (in-process SQLite) |
| HTML & CSS | 10 | html | quiz-only + static validation |

### Web & Frontend (14 tracks, 152 lessons)

| Track | Lessons | Exec language | Runtime in sandbox |
|---|---|---|---|
| Vue.js | 11 | javascript | available (JS logic; framework concepts in text) |
| Angular | 11 | typescript | available |
| Svelte | 11 | javascript | available (JS logic) |
| Next.js | 11 | typescript | available |
| Node.js | 11 | javascript | available |
| Express.js | 11 | javascript | available |
| Django | 11 | python | available |
| Flask | 11 | python | available |
| FastAPI | 11 | python | available |
| Spring Boot | 11 | java | available |
| Laravel | 11 | php | unavailable — honest 503 |
| ASP.NET Core | 11 | csharp | unavailable — honest 503 |
| jQuery & the DOM | 10 | javascript | available |
| Web Accessibility | 10 | html | quiz-only |

### Mobile (6 tracks, 64 lessons)

| Track | Lessons | Exec language | Runtime in sandbox |
|---|---|---|---|
| Flutter | 11 | dart | unavailable — honest 503 |
| React Native | 11 | javascript | available (JS logic) |
| Android Development (Kotlin) | 11 | kotlin | unavailable — honest 503 |
| iOS Development (SwiftUI) | 11 | swift | unavailable — honest 503 |
| Xamarin / .NET MAUI | 10 | csharp | unavailable — honest 503 |
| Progressive Web Apps | 10 | javascript | available |

### Data, AI & ML (16 tracks, 172 lessons)

| Track | Lessons | Exec language | Runtime in sandbox |
|---|---|---|---|
| Data Science with Python | 11 | python | available (stdlib only) |
| Pandas & NumPy | 11 | python | available (stdlib; library APIs taught as concepts) |
| Machine Learning | 11 | python | available (stdlib math) |
| Deep Learning | 11 | python | available (stdlib math) |
| Natural Language Processing | 11 | python | available |
| Computer Vision | 11 | python | available |
| MLOps | 11 | python | available |
| Data Engineering | 11 | python | available |
| Big Data with Spark | 11 | python | available (stdlib map/reduce patterns) |
| Power BI | 10 | python | quiz-style |
| Tableau | 10 | python | quiz-style |
| Excel for Data Analysis | 10 | python | quiz-style |
| Statistics for Programmers | 11 | python | available |
| Prompt Engineering | 10 | python | quiz-style |
| LLM Applications | 11 | python | available (string work, no API calls) |
| Reinforcement Learning | 11 | python | available |

### Databases & Backend (10 tracks, 108 lessons)

| Track | Lessons | Exec language | Runtime in sandbox |
|---|---|---|---|
| PostgreSQL | 11 | sql | available |
| MySQL | 11 | sql | available |
| MongoDB | 11 | mongodb | quiz-style (documents as Python dicts in examples) |
| Redis | 11 | redis | quiz-style |
| SQLite & Embedded Databases | 11 | sql | available |
| GraphQL | 11 | javascript | available |
| REST API Design | 11 | javascript | available |
| gRPC & Microservices | 11 | python | available |
| Message Queues (Kafka/RabbitMQ) | 10 | python | available (deque simulation, labelled) |
| Elasticsearch | 10 | python | quiz-style + Python dicts for query DSL |

### DevOps, Cloud & Systems (14 tracks, 151 lessons)

| Track | Lessons | Exec language | Runtime in sandbox |
|---|---|---|---|
| Linux & Bash | 11 | bash | available |
| Git & GitHub | 11 | bash | available (git installed) |
| Docker | 11 | bash | available (Dockerfile checks; no daemon) |
| Kubernetes | 11 | bash | available (YAML checks; no cluster) |
| Terraform | 11 | bash | available (.tf checks; no binary) |
| AWS Fundamentals | 11 | python | quiz-style + Python cost math |
| Azure Fundamentals | 11 | python | quiz-style |
| Google Cloud Fundamentals | 11 | python | quiz-style |
| CI/CD with GitHub Actions | 11 | bash | available (workflow YAML checks) |
| Jenkins | 10 | bash | available (Jenkinsfile checks) |
| Ansible | 10 | bash | available (playbook checks) |
| Nginx & Web Servers | 10 | bash | available (config checks) |
| Networking Fundamentals | 11 | python | available (localhost sockets) |
| Cybersecurity Fundamentals | 11 | python | available (hashlib etc.) |

### CS Foundations & Career (13 tracks, 136 lessons)

| Track | Lessons | Exec language | Runtime in sandbox |
|---|---|---|---|
| Operating Systems | 11 | c | available |
| Computer Networks | 11 | python | available |
| System Design | 11 | python | quiz-style + Python capacity math |
| Object-Oriented Design | 11 | python | available |
| Functional Programming | 11 | javascript | available |
| Testing & TDD | 11 | python | available |
| Debugging Mastery | 10 | python | available |
| Algorithms Refresher | 10 | python | available |
| Interview Preparation | 10 | python | quiz-style |
| Open Source Contribution | 10 | bash | available (git) |
| Freelancing & Career | 10 | python | quiz-style |
| Technical Writing | 10 | python | quiz-style |
| Agile & Scrum | 10 | python | quiz-style |

Each track: Beginner → Intermediate → Advanced → end-of-track assessment (pass 80%, retakes allowed, weak topics tracked per attempt). Passing any assessment unlocks the DSA path (configurable via `dsa_requires_mastery` in Admin → System Settings).

## Exercise evaluation honesty

- Code exercises run the learner's code against visible + hidden tests in the real runtime. If the runtime is missing on the host, submission returns 503 `runtime_unavailable` with install instructions — never a fake pass.
- Quiz exercises (multiple-choice / predict-output) are graded by answer on the server. The correct answer is never sent to the client.
- HTML exercises use static tag-balance validation, labelled as such — not a browser render.
- Framework tracks (Vue, Angular, Django, etc.) teach framework concepts in the lesson text; exercises run framework-agnostic logic in the exec language (no framework packages are installed).
- Data/AI tracks use only the Python standard library; pandas/numpy/sklearn/torch APIs are taught as concepts and illustrated with stdlib code, labelled as such.

## DSA

10 levels: Foundations (complexity, problem solving, recursion) → Linear structures → Searching & sorting → Trees → Graphs → Hashing → Dynamic programming → Greedy → Backtracking → Advanced problem solving. Visualizations for merge sort, quick sort, binary search, stack, queue, BST, graph BFS and DP tables. Problem library: 150+ problems across 14 categories (Arrays, Strings, Hashing, Two pointers, Sliding window, Stack, Queue, Linked list, Binary search, Trees, Graphs, DP, Greedy, Backtracking), Easy/Medium/Hard, each with examples, constraints, starter code (Python + JavaScript where sensible), visible + hidden tests, 5 hints, solution discussion and complexity analysis.

## Projects

38 guided projects: 10 small (Level 1), 10 intermediate (Level 2), 10 advanced (Level 3), 8 industry simulations (Level 4: Production REST API, Full-stack SaaS, Distributed Job Processing, Real-time App, Systems HTTP server, Compiler/Interpreter, Mini Database, Capstone). Each project has requirements (functional + non-functional), planning (architecture, schema, APIs, file structure, task breakdown), 6–8 milestones with objectives/instructions/concepts/hints/acceptance criteria/tests (no full solution up front), a code-review checklist and a final assessment. Submissions go to instructors for review.

## Exact counts

See [IMPLEMENTATION_STATUS.md](../IMPLEMENTATION_STATUS.md) — it records the shipped counts measured from the seeded database, not the target.
