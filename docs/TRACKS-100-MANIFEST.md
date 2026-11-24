# CodeForge Academy — 100-track expansion manifest

Target (measured from the seeded DB): **100 courses, 1354 lessons, 1354 exercises**
(1 exercise per lesson). Existing v1: 7 tracks / 354 lessons — DO NOT EDIT the
v1 data files (`c.ts cpp.ts python.ts typescript.ts react.ts rust.ts go.ts`).
New: **93 tracks / 1000 lessons** — 23 tracks × 10 lessons + 70 tracks × 11 lessons.

## Per-track structure
- 5 modules per track. 10-lesson tracks: 5 × 2 lessons. 11-lesson tracks: four
  modules × 2 lessons + one module × 3 lessons.
- Module levels progress beginner → intermediate → advanced across the 5 modules
  (e.g. beginner, beginner, intermediate, intermediate, advanced). Module titles
  must be track-specific (never generic "Module 1").
- Lesson ids: `<slug>-m<module#>-l<lesson#>` (e.g. `java-m1-l1`); slug == id.
  Exercise id: `<lesson-id>-e1`. Module id: `<slug>-m<#>`.

## Authoring: use the builder
`backend/src/curriculum/builder.ts` — write `LessonSpec`s, call `buildCourse`.
Each file exports `TRACKS_<GROUP>: Course[]` and `SHORT_ASSESSMENTS_<GROUP>:
MasteryAssessment[]` (via `buildShortAssessment`). Never hand-write the full
`Lesson` object. Run `npm run build --workspace=backend && node
scripts/check-tracks.mjs` — it must exit 0 for your file (counts aside until
all files land; per-file checks must pass).

## Lesson quality rules (enforced by the checker + a human review)
- Every field real and lesson-specific. Concept openings (first 60 chars) may
  repeat at most 2× across ALL 1354 lessons — vary your opening sentences.
- objectives: 3 items. walkthrough: 3-5 steps. commonMistakes: 3 items.
- knowledgeCheck: 2-3 questions, 4 options each, correct `answer` index.
- debugging exercise: real bug in the track's language, buggyCode ≠ fixedCode.
- Exercise: exactly 1 per lesson. Code exercises: ≥2 tests (≥1 visible +
  ≥1 hidden), stdin-driven, deterministic, no network/file I/O/randomness,
  solution MUST produce the expected outputs (solutions are batch-verified).
- hintNotes: 3 short author-written strings (concept / approach / structure),
  specific to the lesson topic — never copy the same hint text across lessons.
- Example code must be real, runnable code in `exampleLanguage` where the
  runtime exists; for missing toolchains it is real code in that language
  (displayed, run attempt returns honest 503).

## Execution languages and sandbox runtime status (verified 2026-11-24)
Available in this sandbox: python3, node (javascript/typescript), gcc (c/cpp),
rustc via ~/.cargo/bin (rust), java 21 JRE (single-file `java Main.java` — no
javac), perl, bash, git, sqlite3 / node:sqlite (sql), gcc as assembler (asm).
NOT available: go (Docker image ships it), dotnet (csharp), kotlinc (kotlin),
swift, ruby, php, dart, scala, haskell, elixir, lua, R, julia, solidity,
Objective-C toolchain (objc).
Docker image ships: python3, gcc, g++, go, node (+ java + perl after this
expansion — see backend/Dockerfile). Runtimes are detected live; missing ones
return 503 `runtime_unavailable` with install instructions — NEVER fake a pass.

## Code patterns per execution language
- **python**: `input()` reads stdin; `print()` exact output. Tests use stdin + expectedStdout.
- **javascript**: Node ESM? No — executor writes `main.mjs`; use `process.stdin` reading or `console.log`. Prefer reading stdin via `fs.readFileSync(0,'utf-8')`.
- **typescript**: same as JS but typed; transpiled then run with Node.
- **java**: `class Main { public static void main(String[] args) throws Exception { ... } }`
  (non-public class, file Main.java, launched as `java Main.java`). Read stdin with
  `new java.util.Scanner(System.in)`. Print exact expected output.
- **bash**: script file `script.sh`, run with `bash`. Tests check stdout. Use
  `grep -q PATTERN file` / `test -f file` style checks: script creates a file,
  then echoes a marker line, e.g. `echo "DOCKERFILE_OK"`. No sudo, no network.
- **sql**: code is ONE SELECT statement. Test `stdin` holds setup SQL
  (`CREATE TABLE ...; INSERT INTO ...;`). Expected stdout: rows as
  `col1|col2` per line, in query order (add ORDER BY in the solution).
- **asm** (x86-64, assembled+linked by gcc): skeleton —
  ```
  .text
  .globl main
  main:
      push %rbp; mov %rsp, %rbp
      # ... compute, result in %esi, format in %rdi ...
      lea fmt(%rip), %rdi
      mov $VALUE, %esi
      xor %eax, %eax
      call printf
      xor %eax, %eax
      pop %rbp; ret
  .section .rodata
  fmt: .string "%d\n"
  ```
- **perl**: `my $x = <STDIN>; chomp $x; print "...";`
- **html** (HTML & CSS, Web Accessibility): exercises are quiz-style ONLY
  (multiple-choice / predict-output, graded by answer). exampleCode is real
  HTML/CSS (displayed; Run does a static tag-balance validation, not a render).
- **Quiz-style tracks** (tool/concept tracks with no runnable toolchain):
  ≥60% of exercises multiple-choice/predict-output; remaining code exercises
  in the track's real language with real tests (503 in sandbox, runnable on a
  host with the toolchain). Assessment programming exercise: use `python` with
  a clearly-labelled simulation/generation task (e.g. generate an HTML page
  string; model a document store with dicts) when the real language is
  unavailable.

## The 93 new tracks
Format: slug | Title | group | exec language | lessons | runtime in sandbox

### Languages (20) → `backend/src/curriculum/data/tracks-languages.ts`
| java | Java Programming | languages | java | 11 | available (single-file launch) |
| javascript | JavaScript Programming | languages | javascript | 11 | available |
| csharp | C# Programming | languages | csharp | 11 | 503 (dotnet missing) |
| kotlin | Kotlin Programming | languages | kotlin | 11 | 503 |
| swift | Swift Programming | languages | swift | 11 | 503 |
| php | PHP Programming | languages | php | 11 | 503 |
| ruby | Ruby Programming | languages | ruby | 11 | 503 |
| dart | Dart Programming | languages | dart | 11 | 503 |
| scala | Scala Programming | languages | scala | 11 | 503 |
| haskell | Haskell Programming | languages | haskell | 11 | 503 |
| elixir | Elixir Programming | languages | elixir | 11 | 503 |
| lua | Lua Programming | languages | lua | 11 | 503 |
| r-lang | R for Programmers | languages | r | 11 | 503 |
| julia | Julia Programming | languages | julia | 11 | 503 |
| perl | Perl Programming | languages | perl | 11 | available |
| objective-c | Objective-C Programming | languages | objc | 10 | 503 |
| assembly | Assembly Language (x86-64) | languages | asm | 11 | available (gcc) |
| solidity | Solidity & Smart Contracts | languages | solidity | 10 | 503 |
| sql | SQL Fundamentals | languages | sql | 11 | available (node:sqlite) |
| html-css | HTML & CSS | languages | html | 10 | quiz-only + static validation |

### Web & Frontend (14) → `tracks-web.ts`
| vue | Vue.js | web | javascript | 11 | available (JS logic) |
| angular | Angular | web | typescript | 11 | available |
| svelte | Svelte | web | javascript | 11 | available (JS logic) |
| nextjs | Next.js | web | typescript | 11 | available |
| nodejs | Node.js | web | javascript | 11 | available |
| expressjs | Express.js | web | javascript | 11 | available |
| django | Django | web | python | 11 | available |
| flask | Flask | web | python | 11 | available |
| fastapi | FastAPI | web | python | 11 | available |
| spring-boot | Spring Boot | web | java | 11 | available |
| laravel | Laravel | web | php | 11 | 503 |
| aspnet-core | ASP.NET Core | web | csharp | 11 | 503 |
| jquery-dom | jQuery & the DOM | web | javascript | 10 | available |
| web-accessibility | Web Accessibility | web | html | 10 | quiz-only |

### Mobile (6) → `tracks-mobile.ts`
| flutter | Flutter | mobile | dart | 11 | 503 |
| react-native | React Native | mobile | javascript | 11 | available |
| android-kotlin | Android Development (Kotlin) | mobile | kotlin | 11 | 503 |
| ios-swiftui | iOS Development (SwiftUI) | mobile | swift | 11 | 503 |
| maui | Xamarin / .NET MAUI | mobile | csharp | 10 | 503 |
| pwa | Progressive Web Apps | mobile | javascript | 10 | available |

### Data, AI & ML (16) → `tracks-data.ts`
| data-science-python | Data Science with Python | data-ai | python | 11 | available (stdlib only — no pandas/numpy installed) |
| pandas-numpy | Pandas & NumPy | data-ai | python | 11 | available (stdlib equivalents; label library APIs as concepts) |
| machine-learning | Machine Learning | data-ai | python | 11 | available (stdlib math) |
| deep-learning | Deep Learning | data-ai | python | 11 | available (stdlib math) |
| nlp | Natural Language Processing | data-ai | python | 11 | available |
| computer-vision | Computer Vision | data-ai | python | 11 | available (pixel arrays in stdlib) |
| mlops | MLOps | data-ai | python | 11 | available |
| data-engineering | Data Engineering | data-ai | python | 11 | available |
| big-data-spark | Big Data with Spark | data-ai | python | 11 | available (stdlib map/reduce patterns) |
| power-bi | Power BI | data-ai | python | 10 | quiz-style |
| tableau | Tableau | data-ai | python | 10 | quiz-style |
| excel-data | Excel for Data Analysis | data-ai | python | 10 | quiz-style |
| statistics | Statistics for Programmers | data-ai | python | 11 | available |
| prompt-engineering | Prompt Engineering | data-ai | python | 10 | quiz-style |
| llm-applications | LLM Applications | data-ai | python | 11 | available (string/template work, no API calls) |
| reinforcement-learning | Reinforcement Learning | data-ai | python | 11 | available |

### Databases & Backend (10) → `tracks-databases.ts`
| postgresql | PostgreSQL | databases | sql | 11 | available |
| mysql | MySQL | databases | sql | 11 | available |
| mongodb | MongoDB | databases | mongodb | 11 | quiz-style (docs as Python dicts in examples) |
| redis | Redis | databases | redis | 11 | quiz-style |
| sqlite-embedded | SQLite & Embedded Databases | databases | sql | 11 | available |
| graphql | GraphQL | databases | javascript | 11 | available |
| rest-api-design | REST API Design | databases | javascript | 11 | available |
| grpc-microservices | gRPC & Microservices | databases | python | 11 | available |
| message-queues | Message Queues (Kafka/RabbitMQ) | databases | python | 10 | available (deque simulation, labelled) |
| elasticsearch | Elasticsearch | databases | python | 10 | quiz-style + Python dicts for query DSL |

### DevOps, Cloud & Systems (14) → `tracks-devops.ts`
| linux-bash | Linux & Bash | devops | bash | 11 | available |
| git-github | Git & GitHub | devops | bash | 11 | available (git installed) |
| docker | Docker | devops | bash | 11 | available (Dockerfile grep-checks; no daemon) |
| kubernetes | Kubernetes | devops | bash | 11 | available (YAML grep-checks; no cluster) |
| terraform | Terraform | devops | bash | 11 | available (.tf grep-checks; no binary) |
| aws-fundamentals | AWS Fundamentals | devops | python | 11 | quiz-style + Python cost/capacity math |
| azure-fundamentals | Azure Fundamentals | devops | python | 11 | quiz-style |
| gcp-fundamentals | Google Cloud Fundamentals | devops | python | 11 | quiz-style |
| cicd-actions | CI/CD with GitHub Actions | devops | bash | 11 | available (workflow YAML checks) |
| jenkins | Jenkins | devops | bash | 10 | available (Jenkinsfile checks) |
| ansible | Ansible | devops | bash | 10 | available (playbook checks) |
| nginx | Nginx & Web Servers | devops | bash | 10 | available (config checks) |
| networking | Networking Fundamentals | devops | python | 11 | available (sockets, localhost only) |
| cybersecurity | Cybersecurity Fundamentals | devops | python | 11 | available (hashlib etc.) |

### CS Foundations & Career (13) → `tracks-cs.ts`
| operating-systems | Operating Systems | cs-career | c | 11 | available |
| computer-networks | Computer Networks | cs-career | python | 11 | available |
| system-design | System Design | cs-career | python | 11 | quiz-style + Python capacity math |
| ood | Object-Oriented Design | cs-career | python | 11 | available |
| functional-programming | Functional Programming | cs-career | javascript | 11 | available |
| testing-tdd | Testing & TDD | cs-career | python | 11 | available |
| debugging-mastery | Debugging Mastery | cs-career | python | 10 | available |
| algorithms-refresher | Algorithms Refresher | cs-career | python | 10 | available |
| interview-prep | Interview Preparation | cs-career | python | 10 | quiz-style |
| open-source | Open Source Contribution | cs-career | bash | 10 | available (git) |
| freelancing-career | Freelancing & Career | cs-career | python | 10 | quiz-style |
| technical-writing | Technical Writing | cs-career | python | 10 | quiz-style |
| agile-scrum | Agile & Scrum | cs-career | python | 10 | quiz-style |

## Short assessments (one per new track)
10 questions: 5 conceptual, 3 code-reading, 2 debugging + 1 programming
exercise + capstone (title, description, requirements, rubric). Pass 80%.
Programming exercise language: track exec language if runnable, else python
with a labelled simulation/generation task. Existing 7 full assessments stay.
