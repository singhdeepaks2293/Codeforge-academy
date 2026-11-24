import { expandTracks } from '../compact.js';
const { courses, assessments } = expandTracks([
  {
    "id": "rust-setup-cargo",
    "slug": "rust-setup-cargo",
    "language": "rust",
    "category": "languages",
    "title": "Rust Setup & Cargo",
    "description": "Install Rust with rustup and learn the Cargo workflow: creating, building, running, and sharing a project.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "Installing Rust with rustup",
      "Using cargo new, build, and run",
      "Reading Cargo.toml",
      "Managing dependencies",
      "Using cargo check",
      "Project layout"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like setting up a workshop before building furniture: get the tools in place first and every project after it is easier.",
    "modules": [
      {
        "id": "rust-setup-cargo-m1",
        "title": "Fundamentals of Rust Setup & Cargo",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-setup-cargo-m1-l1",
            "slug": "rust-setup-cargo-m1-l1",
            "title": "Installing Rust with rustup",
            "concept": "Rust is installed with rustup, a toolchain manager that installs rustc, cargo, and the standard library together. Running the rustup installer gives you a working Rust toolchain and lets you switch between stable, beta, and nightly releases.",
            "syntax": "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
            "exampleCode": "fn main() {\n    println!(\"rustup installed\");\n    println!(\"toolchain: stable\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Running rustc before rustup has finished, so the shell cannot find the compiler yet.",
            "bug": {
              "prompt": "Why does `rustc --version` say command not found right after installing Rust?",
              "buggyCode": "fn main() {\n    println!(\"rustc ready\");\n}",
              "fixedCode": "fn main() {\n    println!(\"rustc ready\");\n    println!(\"restart the shell so PATH includes cargo bin\");\n}",
              "explanation": "A fresh rustup install adds ~/.cargo/bin to PATH, but only shells started after the install see it, so you must restart the shell or source the env file."
            },
            "exercise": {
              "title": "Install check program",
              "type": "write-code",
              "instructions": "Write a program that prints two lines: `rustup installed` and `toolchain: stable`.",
              "starterCode": "fn main() {\n    // TODO: print the two lines\n}",
              "solution": "fn main() {\n    println!(\"rustup installed\");\n    println!(\"toolchain: stable\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "rustup installed\ntoolchain: stable",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "rustup installed",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-setup-cargo-m1-l2",
            "slug": "rust-setup-cargo-m1-l2",
            "title": "Verifying rustc and cargo",
            "concept": "The commands rustc --version and cargo --version print the installed compiler and package-manager versions. Checking both confirms the toolchain is on your PATH and that the two tools agree on the release.",
            "syntax": "rustc --version && cargo --version",
            "exampleCode": "fn main() {\n    println!(\"rustc 1.100.0\");\n    println!(\"cargo 1.100.0\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming cargo works because rustc works, when only one of them is actually on PATH.",
            "bug": {
              "prompt": "A learner runs `rustc --version` successfully but `cargo` is not found. What is the most likely cause?",
              "buggyCode": "fn main() {\n    println!(\"cargo missing\");\n}",
              "fixedCode": "fn main() {\n    println!(\"cargo missing\");\n    println!(\"reinstall with rustup or fix PATH\");\n}",
              "explanation": "rustup installs rustc and cargo together into ~/.cargo/bin, so a missing cargo usually means PATH is incomplete or a partial install happened."
            },
            "exercise": {
              "title": "Version report program",
              "type": "write-code",
              "instructions": "Write a program that prints `rustc 1.100.0` on the first line and `cargo 1.100.0` on the second line.",
              "starterCode": "fn main() {\n    // TODO: print both versions\n}",
              "solution": "fn main() {\n    println!(\"rustc 1.100.0\");\n    println!(\"cargo 1.100.0\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "rustc 1.100.0\ncargo 1.100.0",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "rustc 1.100.0",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-setup-cargo-m1-l3",
            "slug": "rust-setup-cargo-m1-l3",
            "title": "Creating a Cargo Project",
            "concept": "The command cargo new my_app creates a new project with a Cargo.toml manifest and a src/main.rs file. This standard layout is what cargo build, cargo run, and cargo test all expect, so every Rust project starts the same way.",
            "syntax": "cargo new my_app",
            "exampleCode": "fn main() {\n    println!(\"project: my_app\");\n    println!(\"src/main.rs created\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Creating files by hand in a random folder instead of using cargo new, then wondering why cargo cannot find the project.",
            "bug": {
              "prompt": "What does `cargo new my_app` create?",
              "buggyCode": "fn main() {\n    println!(\"nothing\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Cargo.toml and src/main.rs\");\n}",
              "explanation": "cargo new creates the manifest Cargo.toml and the entry file src/main.rs, which together define a binary crate."
            },
            "exercise": {
              "title": "Create project quiz",
              "type": "multiple-choice",
              "instructions": "What does `cargo new my_app` create?",
              "starterCode": "",
              "solution": "A Cargo.toml manifest and a src/main.rs file",
              "solutionExplanation": "cargo new creates Cargo.toml and src/main.rs, the standard layout for a binary crate.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A Cargo.toml manifest and a src/main.rs file",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "A Cargo.toml manifest and a src/main.rs file",
                "Only a compiled binary with no source files",
                "A Python virtual environment",
                "A Docker image of the project"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-setup-cargo-m1-l4",
            "slug": "rust-setup-cargo-m1-l4",
            "title": "Understanding Cargo.toml",
            "concept": "Cargo.toml is the manifest that names your package, sets its version and edition, and lists its dependencies. Cargo reads it on every build, so a typo in the package name or a wrong edition here breaks the whole project.",
            "syntax": "[package]\nname = \"my_app\"\nversion = \"0.1.0\"\nedition = \"2021\"",
            "exampleCode": "fn main() {\n    println!(\"name: my_app\");\n    println!(\"version: 0.1.0\");\n    println!(\"edition: 2021\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Editing the version string but forgetting that the edition controls which language features are available.",
            "bug": {
              "prompt": "The manifest says edition = \"2015\" and a 2021 feature fails to compile. What should change?",
              "buggyCode": "fn main() {\n    println!(\"edition 2015\");\n}",
              "fixedCode": "fn main() {\n    println!(\"edition 2021\");\n}",
              "explanation": "The edition field selects the language rules cargo compiles with, so it must be set to 2021 for modern Rust features."
            },
            "exercise": {
              "title": "Manifest summary program",
              "type": "write-code",
              "instructions": "Write a program that prints `name: my_app`, `version: 0.1.0`, and `edition: 2021` on three lines.",
              "starterCode": "fn main() {\n    // TODO: print the manifest fields\n}",
              "solution": "fn main() {\n    println!(\"name: my_app\");\n    println!(\"version: 0.1.0\");\n    println!(\"edition: 2021\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "name: my_app\nversion: 0.1.0\nedition: 2021",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "name: my_app",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-setup-cargo-m1-l5",
            "slug": "rust-setup-cargo-m1-l5",
            "title": "Building Your Project",
            "concept": "The command cargo build compiles your crate and places the binary in target/debug, while cargo build --release applies optimisations for a final build. A successful build means every file compiled, but it does not run the program.",
            "syntax": "cargo build",
            "exampleCode": "fn main() {\n    println!(\"compiling my_app\");\n    println!(\"build finished\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Looking for the binary in the project root instead of in target/debug after a build.",
            "bug": {
              "prompt": "After `cargo build`, where is the debug binary?",
              "buggyCode": "fn main() {\n    println!(\"project root\");\n}",
              "fixedCode": "fn main() {\n    println!(\"target/debug/my_app\");\n}",
              "explanation": "cargo build puts the debug binary under target/debug, named after the package."
            },
            "exercise": {
              "title": "Build output quiz",
              "type": "multiple-choice",
              "instructions": "After `cargo build`, where is the debug binary?",
              "starterCode": "",
              "solution": "target/debug/my_app",
              "solutionExplanation": "Cargo writes debug binaries to target/debug/<package-name>.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "target/debug/my_app",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "target/debug/my_app",
                "src/my_app",
                "Cargo.toml",
                "The system /usr/bin directory"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-setup-cargo-m2",
        "title": "Applying Rust Setup & Cargo",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-setup-cargo-m2-l1",
            "slug": "rust-setup-cargo-m2-l1",
            "title": "Running with cargo run",
            "concept": "The command cargo run builds the project if needed and then executes the resulting binary. It is the fastest edit-run loop in Rust because you never have to invoke rustc or find the binary yourself.",
            "syntax": "cargo run  # build and run",
            "exampleCode": "fn main() {\n    println!(\"Hello from cargo run!\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Expecting cargo run to recompile after editing a file it does not track, such as a file outside src.",
            "bug": {
              "prompt": "What does `cargo run` do?",
              "buggyCode": "fn main() {\n    println!(\"only compiles\");\n}",
              "fixedCode": "fn main() {\n    println!(\"builds and runs\");\n}",
              "explanation": "cargo run builds the project when sources changed and then runs the binary."
            },
            "exercise": {
              "title": "Run greeting program",
              "type": "write-code",
              "instructions": "Write a program that prints exactly `Hello from cargo run!`.",
              "starterCode": "fn main() {\n    // TODO: print the greeting\n}",
              "solution": "fn main() {\n    println!(\"Hello from cargo run!\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Hello from cargo run!",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Hello from cargo run!",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-setup-cargo-m2-l2",
            "slug": "rust-setup-cargo-m2-l2",
            "title": "Adding a Dependency",
            "concept": "Dependencies are declared in Cargo.toml under [dependencies] with a name and version, and cargo fetches them from crates.io on the next build. Cargo.lock then pins the exact versions used, so other machines build the same code.",
            "syntax": "[dependencies]\nrand = \"0.8\"",
            "exampleCode": "fn main() {\n    println!(\"dependency: rand 0.8\");\n    println!(\"locked in Cargo.lock\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Adding a dependency to the source file instead of Cargo.toml, so cargo never downloads it.",
            "bug": {
              "prompt": "Where do you declare a new dependency?",
              "buggyCode": "fn main() {\n    println!(\"in main.rs\");\n}",
              "fixedCode": "fn main() {\n    println!(\"in Cargo.toml [dependencies]\");\n}",
              "explanation": "Dependencies belong in the [dependencies] section of Cargo.toml; cargo resolves and downloads them from there."
            },
            "exercise": {
              "title": "Dependency list program",
              "type": "write-code",
              "instructions": "Write a program that prints `dependency: rand 0.8` and `locked in Cargo.lock` on two lines.",
              "starterCode": "fn main() {\n    // TODO: print the dependency lines\n}",
              "solution": "fn main() {\n    println!(\"dependency: rand 0.8\");\n    println!(\"locked in Cargo.lock\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "dependency: rand 0.8\nlocked in Cargo.lock",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "dependency: rand 0.8",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-setup-cargo-m2-l3",
            "slug": "rust-setup-cargo-m2-l3",
            "title": "Project Layout and Modules",
            "concept": "A Cargo project keeps its binary entry point at src/main.rs and extra modules in files under src, declared with mod. The compiler starts at the crate root and follows mod declarations, so the file layout mirrors the module tree.",
            "syntax": "mod greet; // loads src/greet.rs",
            "exampleCode": "mod greet {\n    pub fn hello() {\n        println!(\"hello from greet\");\n    }\n}\nfn main() {\n    greet::hello();\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting the `mod` declaration in main.rs, so the file exists but the compiler never sees it.",
            "bug": {
              "prompt": "A file src/greet.rs exists but its function is not found. What is missing?",
              "buggyCode": "fn main() {\n    println!(\"missing file\");\n}",
              "fixedCode": "fn main() {\n    println!(\"missing mod declaration\");\n}",
              "explanation": "A module file is only compiled when the crate root declares it with mod, so src/greet.rs needs `mod greet;`."
            },
            "exercise": {
              "title": "Module layout quiz",
              "type": "multiple-choice",
              "instructions": "A file src/greet.rs exists but its function is not found. What is missing?",
              "starterCode": "",
              "solution": "The `mod greet;` declaration in the crate root",
              "solutionExplanation": "Module files are compiled only when declared with `mod` from the crate root.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The `mod greet;` declaration in the crate root",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "The `mod greet;` declaration in the crate root",
                "A Cargo.lock entry for greet",
                "A second Cargo.toml in src/",
                "An import in Cargo.toml"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-setup-cargo-m2-l4",
            "slug": "rust-setup-cargo-m2-l4",
            "title": "Using cargo check",
            "concept": "The command cargo check compiles your code without producing a binary, so it catches type and borrow errors much faster than a full build. It is the cheapest way to get compiler feedback while you edit.",
            "syntax": "cargo check",
            "exampleCode": "fn main() {\n    let total = 40 + 2;\n    println!(\"checked: {}\", total);\n}",
            "exampleLanguage": "rust",
            "mistake": "Running cargo build every time instead of cargo check, wasting time on linking during early edits.",
            "bug": {
              "prompt": "Why use `cargo check` while editing?",
              "buggyCode": "fn main() {\n    println!(\"it runs tests\");\n}",
              "fixedCode": "fn main() {\n    println!(\"fast error feedback without linking\");\n}",
              "explanation": "cargo check type-checks and borrow-checks without code generation or linking, so errors appear quickly."
            },
            "exercise": {
              "title": "Checked sum program",
              "type": "write-code",
              "instructions": "Write a program that computes 40 + 2 and prints `checked: 42`.",
              "starterCode": "fn main() {\n    // TODO: compute and print\n}",
              "solution": "fn main() {\n    let total = 40 + 2;\n    println!(\"checked: {}\", total);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "checked: 42",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "checked: 42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-setup-cargo-m2-l5",
            "slug": "rust-setup-cargo-m2-l5",
            "title": "Sharing a Release Build",
            "concept": "The command cargo build --release produces an optimised binary in target/release that you can copy to another machine. Release builds take longer but run faster, so they are the right artifact to share, while debug builds are for development.",
            "syntax": "cargo build --release",
            "exampleCode": "fn main() {\n    println!(\"release build ready\");\n    println!(\"target/release/my_app\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Sharing the debug binary and wondering why it runs slowly compared with the release build.",
            "bug": {
              "prompt": "Where does `cargo build --release` put the binary?",
              "buggyCode": "fn main() {\n    println!(\"target/debug\");\n}",
              "fixedCode": "fn main() {\n    println!(\"target/release/my_app\");\n}",
              "explanation": "Release binaries go to target/release, separate from the debug output in target/debug."
            },
            "exercise": {
              "title": "Release report program",
              "type": "write-code",
              "instructions": "Write a program that prints `release build ready` and `target/release/my_app` on two lines.",
              "starterCode": "fn main() {\n    // TODO: print the release lines\n}",
              "solution": "fn main() {\n    println!(\"release build ready\");\n    println!(\"target/release/my_app\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "release build ready\ntarget/release/my_app",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "release build ready",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Cargo project report",
      "type": "write-code",
      "instructions": "Write a program that stores a project name, version, and edition in variables and prints four lines: `project: my_app`, `version: 0.1.0`, `edition: 2021`, and `binary: target/debug/my_app`.",
      "starterCode": "fn main() {\n    // TODO: store the facts and print them\n}",
      "solution": "fn main() {\n    let name = \"my_app\";\n    let version = \"0.1.0\";\n    println!(\"project: {}\", name);\n    println!(\"version: {}\", version);\n    println!(\"edition: 2021\");\n    println!(\"binary: target/debug/my_app\");\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "project: my_app\nversion: 0.1.0\nedition: 2021\nbinary: target/debug/my_app",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "project: my_app",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Cargo Project Report",
      "description": "Build a small program that reports on a Cargo project: its name, version, edition, and build mode.",
      "requirements": [
        "Program prints the project name, version, and edition",
        "Program prints the debug and release binary paths",
        "Program uses variables, not only literal prints, for at least two values",
        "Code compiles with rustc with no warnings about unused values"
      ],
      "rubric": [
        "Output matches the required lines exactly",
        "Project facts are correct and consistent",
        "Code is organised with named variables",
        "Program runs cleanly with no errors"
      ]
    }
  },
  {
    "id": "rust-hello",
    "slug": "rust-hello",
    "language": "rust",
    "category": "languages",
    "title": "Hello Rust",
    "description": "Write and run your first Rust programs: printing, formatting, comments, and debugging output.",
    "difficulty": "Beginner",
    "estimatedHours": 8,
    "skills": [
      "Writing fn main",
      "Using println! and print!",
      "Formatting values",
      "Adding comments",
      "Compiling with rustc",
      "Debugging with dbg!"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to say hello in a new language: one small phrase opens every conversation that follows.",
    "modules": [
      {
        "id": "rust-hello-m1",
        "title": "Fundamentals of Hello Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-hello-m1-l1",
            "slug": "rust-hello-m1-l1",
            "title": "Your First Rust Program",
            "concept": "Every Rust program starts execution in a function called main, and println! prints a line of text to the terminal. A minimal program is just fn main with one println! inside, which is why Hello, world! is the traditional first program.",
            "syntax": "fn main() { println!(\"Hello, world!\"); }",
            "exampleCode": "fn main() {\n    println!(\"Hello, world!\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing the greeting outside fn main, so there is no entry point for the program to start.",
            "bug": {
              "prompt": "What is the entry point of a Rust program?",
              "buggyCode": "fn main() {\n    println!(\"main.rs\");\n}",
              "fixedCode": "fn main() {\n    println!(\"fn main\");\n}",
              "explanation": "Execution always begins in fn main, so a program without it has no starting point."
            },
            "exercise": {
              "title": "Entry point quiz",
              "type": "multiple-choice",
              "instructions": "What is the entry point of every Rust program?",
              "starterCode": "",
              "solution": "fn main",
              "solutionExplanation": "Rust programs always begin execution in fn main.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "fn main",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "fn main",
                "fn start",
                "fn run",
                "fn init"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-hello-m1-l2",
            "slug": "rust-hello-m1-l2",
            "title": "Printing with println!",
            "concept": "The println! macro prints text followed by a newline, and {} placeholders are filled with values in order. You can pass several values, and each {} takes the next argument, which makes formatted output easy to read.",
            "syntax": "println!(\"{} + {} = {}\", 1, 2, 3);",
            "exampleCode": "fn main() {\n    println!(\"{} + {} = {}\", 1, 2, 1 + 2);\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting the ! after println, which turns the macro call into a call to a function that does not exist.",
            "bug": {
              "prompt": "Why does `println(\"hi\")` fail to compile?",
              "buggyCode": "fn main() {\n    println!(\"missing bang\");\n}",
              "fixedCode": "fn main() {\n    println!(\"println needs !\");\n}",
              "explanation": "println is a macro, so it must be written println! with an exclamation mark."
            },
            "exercise": {
              "title": "Sum print program",
              "type": "write-code",
              "instructions": "Write a program that prints `2 + 3 = 5` using {} placeholders and the values 2 and 3.",
              "starterCode": "fn main() {\n    // TODO: print the sum\n}",
              "solution": "fn main() {\n    println!(\"{} + {} = {}\", 2, 3, 2 + 3);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "2 + 3 = 5",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "2 + 3 = 5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-hello-m1-l3",
            "slug": "rust-hello-m1-l3",
            "title": "Printing Without a Newline",
            "concept": "The print! macro works like println! but does not add a newline, so the next output continues on the same line. Use it when you are building one line from several pieces, and finish with println! when the line is complete.",
            "syntax": "print!(\"Hello, \"); println!(\"world!\");",
            "exampleCode": "fn main() {\n    print!(\"Hello, \");\n    println!(\"world!\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Using print! and expecting the cursor to move to a new line on its own.",
            "bug": {
              "prompt": "What is the difference between print! and println!?",
              "buggyCode": "fn main() {\n    println!(\"same\");\n}",
              "fixedCode": "fn main() {\n    println!(\"println adds newline\");\n}",
              "explanation": "println! appends a newline after its output while print! leaves the cursor on the same line."
            },
            "exercise": {
              "title": "One-line greeting",
              "type": "write-code",
              "instructions": "Write a program that uses print! then println! to produce exactly `Hello, world!` on one line.",
              "starterCode": "fn main() {\n    // TODO: build one line\n}",
              "solution": "fn main() {\n    print!(\"Hello, \");\n    println!(\"world!\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Hello, world!",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Hello, world!",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-hello-m1-l4",
            "slug": "rust-hello-m1-l4",
            "title": "Comments in Rust",
            "concept": "A comment starts with // and runs to the end of the line, and the compiler ignores it completely. Comments explain why code does something, not what it does, and good comments save the next reader from guessing.",
            "syntax": "// this is a comment\nlet x = 5;",
            "exampleCode": "fn main() {\n    // greet the user\n    println!(\"Hello, reader!\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Commenting out code to disable it and forgetting it is still there, so the program silently does less.",
            "bug": {
              "prompt": "Which line is a comment in Rust?",
              "buggyCode": "fn main() {\n    println!(\"// not a comment\");\n}",
              "fixedCode": "fn main() {\n    println!(\"// starts a comment\");\n}",
              "explanation": "In Rust // starts a comment that runs to the end of the line and is ignored by the compiler."
            },
            "exercise": {
              "title": "Comment quiz",
              "type": "multiple-choice",
              "instructions": "Which line is a comment in Rust?",
              "starterCode": "",
              "solution": "// greet the user",
              "solutionExplanation": "Rust line comments start with //.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "// greet the user",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "// greet the user",
                "# greet the user",
                "/* greet the user",
                "-- greet the user"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-hello-m1-l5",
            "slug": "rust-hello-m1-l5",
            "title": "Running with rustc Directly",
            "concept": "You can compile a single file with rustc main.rs, which produces an executable you run yourself. This is useful for tiny programs, while cargo is better once a project has dependencies or several files.",
            "syntax": "rustc main.rs && ./main",
            "exampleCode": "fn main() {\n    println!(\"compiled by rustc\");\n    println!(\"running directly\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting to run the produced binary after rustc succeeds, and thinking nothing happened.",
            "bug": {
              "prompt": "What does `rustc main.rs` produce?",
              "buggyCode": "fn main() {\n    println!(\"a library\");\n}",
              "fixedCode": "fn main() {\n    println!(\"an executable\");\n}",
              "explanation": "rustc compiles the file into an executable binary, which you then run yourself."
            },
            "exercise": {
              "title": "Direct compile program",
              "type": "write-code",
              "instructions": "Write a program that prints `compiled by rustc` and `running directly` on two lines.",
              "starterCode": "fn main() {\n    // TODO: print two lines\n}",
              "solution": "fn main() {\n    println!(\"compiled by rustc\");\n    println!(\"running directly\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "compiled by rustc\nrunning directly",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "compiled by rustc",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-hello-m2",
        "title": "Applying Hello Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-hello-m2-l1",
            "slug": "rust-hello-m2-l1",
            "title": "Formatting Values",
            "concept": "Format placeholders can show numbers with padding or precision, for example {:>5} right-aligns in five columns and {:.2} shows two decimal places. Formatting controls how a value looks without changing the value itself.",
            "syntax": "println!(\"{:.2}\", 3.14159);",
            "exampleCode": "fn main() {\n    println!(\"pi is {:.2}\", 3.14159);\n    println!(\"score {:>5}\", 42);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using {:.2} on an integer, which has no fractional part to format.",
            "bug": {
              "prompt": "How do you print 3.14159 with two decimal places?",
              "buggyCode": "fn main() {\n    println!(\"pi is 3.14159\");\n}",
              "fixedCode": "fn main() {\n    println!(\"pi is {:.2}\", 3.14159);\n}",
              "explanation": "The {:.2} format specifier rounds a float to two decimal places when printed."
            },
            "exercise": {
              "title": "Formatted pi program",
              "type": "write-code",
              "instructions": "Write a program that prints `pi is 3.14` using the {:.2} format specifier on 3.14159.",
              "starterCode": "fn main() {\n    // TODO: print pi formatted\n}",
              "solution": "fn main() {\n    println!(\"pi is {:.2}\", 3.14159);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "pi is 3.14",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "pi is 3.14",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-hello-m2-l2",
            "slug": "rust-hello-m2-l2",
            "title": "Multiple Print Statements",
            "concept": "A program runs its statements in order, so several println! calls produce several lines in the same order. Reading output top to bottom tells you the order the statements ran, which is the simplest way to trace a program.",
            "syntax": "println!(\"one\"); println!(\"two\");",
            "exampleCode": "fn main() {\n    println!(\"first\");\n    println!(\"second\");\n    println!(\"third\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming statements run in a different order than written, for example that the last println! runs first.",
            "bug": {
              "prompt": "In what order do these println! calls run?",
              "buggyCode": "fn main() {\n    println!(\"any order\");\n}",
              "fixedCode": "fn main() {\n    println!(\"top to bottom\");\n}",
              "explanation": "Rust runs statements in the order they appear, so output lines appear top to bottom."
            },
            "exercise": {
              "title": "Three-line program",
              "type": "write-code",
              "instructions": "Write a program that prints `alpha`, `beta`, and `gamma` on three lines in that order.",
              "starterCode": "fn main() {\n    // TODO: print three lines\n}",
              "solution": "fn main() {\n    println!(\"alpha\");\n    println!(\"beta\");\n    println!(\"gamma\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "alpha\nbeta\ngamma",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "alpha",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-hello-m2-l3",
            "slug": "rust-hello-m2-l3",
            "title": "Debugging with dbg!",
            "concept": "The dbg! macro prints a value to stderr together with its file and line number, and returns the value so you can wrap an expression with it. It is a quick way to inspect a value while debugging without changing the program's logic.",
            "syntax": "dbg!(2 + 3);",
            "exampleCode": "fn main() {\n    let total = dbg!(2 + 3);\n    println!(\"total is {}\", total);\n}",
            "exampleLanguage": "rust",
            "mistake": "Leaving dbg! calls in finished code, so debug output pollutes the program's real output.",
            "bug": {
              "prompt": "What does dbg! print?",
              "buggyCode": "fn main() {\n    println!(\"only the value\");\n}",
              "fixedCode": "fn main() {\n    println!(\"value plus file and line\");\n}",
              "explanation": "dbg! prints the expression, its value, and the file and line where it was called, to stderr."
            },
            "exercise": {
              "title": "Debug total program",
              "type": "write-code",
              "instructions": "Write a program that uses dbg!(2 + 3) to compute a total and then prints `total is 5`.",
              "starterCode": "fn main() {\n    // TODO: use dbg! and print\n}",
              "solution": "fn main() {\n    let total = dbg!(2 + 3);\n    println!(\"total is {}\", total);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "total is 5",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "total is 5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-hello-m2-l4",
            "slug": "rust-hello-m2-l4",
            "title": "Hello with a Name",
            "concept": "You can pass a variable to println! and it will be printed where the {} placeholder sits. Named arguments like {name} also work, which keeps longer format strings readable.",
            "syntax": "let name = \"Ada\"; println!(\"Hello, {}!\", name);",
            "exampleCode": "fn main() {\n    let name = \"Ada\";\n    println!(\"Hello, {}!\", name);\n    println!(\"Hello, {name}!\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a placeholder with no matching argument, so the compiler reports a missing argument.",
            "bug": {
              "prompt": "How do you print a variable inside println!?",
              "buggyCode": "fn main() {\n    println!(\"concatenate\");\n}",
              "fixedCode": "fn main() {\n    println!(\"use a placeholder\");\n}",
              "explanation": "A {} placeholder in the format string is filled by the matching argument passed to println!."
            },
            "exercise": {
              "title": "Placeholder quiz",
              "type": "multiple-choice",
              "instructions": "How do you print a variable inside println!?",
              "starterCode": "",
              "solution": "With a {} placeholder and the variable as an argument",
              "solutionExplanation": "Placeholders like {} are filled by the arguments after the format string.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "With a {} placeholder and the variable as an argument",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "With a {} placeholder and the variable as an argument",
                "By writing the variable name inside the quotes",
                "With the + operator",
                "println! cannot print variables"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-hello-m2-l5",
            "slug": "rust-hello-m2-l5",
            "title": "Your First Complete Program",
            "concept": "A complete program combines a main function, variables, and several println! calls to do a small job from start to finish. Writing one end to end, then running it and checking every line of output, is the core Rust workflow you will repeat in every track.",
            "syntax": "fn main() { let x = 2; println!(\"{}\", x * 3); }",
            "exampleCode": "fn main() {\n    let name = \"Rust\";\n    let year = 2026;\n    println!(\"{} in {}\", name, year);\n    println!(\"done\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting the closing brace of main, which makes the compiler report errors far from the real mistake.",
            "bug": {
              "prompt": "What is missing if the compiler says it expected `}` at the end of the file?",
              "buggyCode": "fn main() {\n    println!(\"a semicolon\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a closing brace\");\n}",
              "explanation": "Every opening brace needs a matching closing brace, and a missing one at the end of main is the usual cause."
            },
            "exercise": {
              "title": "Complete greeting program",
              "type": "write-code",
              "instructions": "Write a program that stores name \"Rust\" and year 2026, prints `Rust in 2026`, then prints `done`.",
              "starterCode": "fn main() {\n    // TODO: store values and print\n}",
              "solution": "fn main() {\n    let name = \"Rust\";\n    let year = 2026;\n    println!(\"{} in {}\", name, year);\n    println!(\"done\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Rust in 2026\ndone",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Rust in 2026",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Greeting card",
      "type": "write-code",
      "instructions": "Write a program that stores name \"Ada\" and year 2026 in variables and prints `Hello, Ada!`, `Welcome to 2026`, and `Happy coding!` on three lines.",
      "starterCode": "fn main() {\n    // TODO: store name and year, print the card\n}",
      "solution": "fn main() {\n    let name = \"Ada\";\n    let year = 2026;\n    println!(\"Hello, {}!\", name);\n    println!(\"Welcome to {}\", year);\n    println!(\"Happy coding!\");\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "Hello, Ada!\nWelcome to 2026\nHappy coding!",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "Hello, Ada!",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Greeting Card Program",
      "description": "Write a program that prints a personalised greeting card with a name, a year, and a closing line.",
      "requirements": [
        "Program prints a greeting with a name",
        "Program prints the year on its own line",
        "Program prints a closing line",
        "All values come from variables, not only literals in println!"
      ],
      "rubric": [
        "Every required line is printed",
        "Name and year are correct",
        "Variables are used for the data",
        "Output order matches the card layout"
      ]
    }
  },
  {
    "id": "rust-variables-mutability",
    "slug": "rust-variables-mutability",
    "language": "rust",
    "category": "languages",
    "title": "Variables & Mutability",
    "description": "Master let, mut, shadowing, constants, and scope in Rust.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "Declaring variables with let",
      "Using mut correctly",
      "Shadowing variables",
      "Defining constants",
      "Understanding scope",
      "Type inference"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like labelling boxes in a workshop: the label tells you what is inside and whether you are allowed to change it.",
    "modules": [
      {
        "id": "rust-variables-mutability-m1",
        "title": "Fundamentals of Variables & Mutability",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-variables-mutability-m1-l1",
            "slug": "rust-variables-mutability-m1-l1",
            "title": "Declaring Variables with let",
            "concept": "The let keyword creates a new variable and binds it to a value, and Rust infers the type from that value. Once bound, the name refers to that value until it goes out of scope.",
            "syntax": "let score = 10;",
            "exampleCode": "fn main() {\n    let score = 10;\n    println!(\"score is {}\", score);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a variable before declaring it with let, so the compiler says it cannot find the value.",
            "bug": {
              "prompt": "What does `let score = 10;` do?",
              "buggyCode": "fn main() {\n    println!(\"changes score\");\n}",
              "fixedCode": "fn main() {\n    println!(\"creates score\");\n}",
              "explanation": "let introduces a new variable binding; it does not change an existing one."
            },
            "exercise": {
              "title": "Score program",
              "type": "write-code",
              "instructions": "Write a program that declares score = 10 with let and prints `score is 10`.",
              "starterCode": "fn main() {\n    // TODO: declare and print\n}",
              "solution": "fn main() {\n    let score = 10;\n    println!(\"score is {}\", score);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "score is 10",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "score is 10",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-variables-mutability-m1-l2",
            "slug": "rust-variables-mutability-m1-l2",
            "title": "Immutable by Default",
            "concept": "Variables in Rust are immutable by default, so a plain let binding cannot be reassigned. This default catches accidental changes and makes code easier to reason about, because a value stays what it was.",
            "syntax": "let x = 5;\n// x = 6; // error",
            "exampleCode": "fn main() {\n    let x = 5;\n    println!(\"x is {}\", x);\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to reassign an immutable variable and being surprised by the compiler error.",
            "bug": {
              "prompt": "Can you reassign a plain `let` variable?",
              "buggyCode": "fn main() {\n    println!(\"yes always\");\n}",
              "fixedCode": "fn main() {\n    println!(\"no, immutable\");\n}",
              "explanation": "Plain let bindings are immutable, so reassignment needs let mut."
            },
            "exercise": {
              "title": "Immutable value program",
              "type": "write-code",
              "instructions": "Write a program that declares x = 5 and prints `x is 5` without changing x.",
              "starterCode": "fn main() {\n    // TODO: declare and print\n}",
              "solution": "fn main() {\n    let x = 5;\n    println!(\"x is {}\", x);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "x is 5",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "x is 5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-variables-mutability-m1-l3",
            "slug": "rust-variables-mutability-m1-l3",
            "title": "Making Variables Mutable",
            "concept": "Adding mut to a let binding, as in let mut x = 5, allows the variable to be reassigned later. Mutability is explicit, so anyone reading the code can see which values are meant to change.",
            "syntax": "let mut x = 5;\nx = 6;",
            "exampleCode": "fn main() {\n    let mut count = 1;\n    count = count + 1;\n    println!(\"count is {}\", count);\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing `mut` on the assignment instead of on the declaration, as in `x = mut 6;`.",
            "bug": {
              "prompt": "How do you make a variable reassignable?",
              "buggyCode": "fn main() {\n    println!(\"let mut x\");\n}",
              "fixedCode": "fn main() {\n    println!(\"let x mut\");\n}",
              "explanation": "Mutability is declared with let mut at the binding site, before the variable name."
            },
            "exercise": {
              "title": "Counter program",
              "type": "write-code",
              "instructions": "Write a program that starts count at 1, adds 1, and prints `count is 2`.",
              "starterCode": "fn main() {\n    // TODO: use a mutable counter\n}",
              "solution": "fn main() {\n    let mut count = 1;\n    count = count + 1;\n    println!(\"count is {}\", count);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "count is 2",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "count is 2",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-variables-mutability-m1-l4",
            "slug": "rust-variables-mutability-m1-l4",
            "title": "Shadowing Variables",
            "concept": "Declaring a new variable with the same name as an earlier one shadows it: the new binding replaces the old one from that point on. Shadowing also lets you change the type, which mut cannot do, and the old value is simply no longer reachable.",
            "syntax": "let x = 5;\nlet x = x + 1;",
            "exampleCode": "fn main() {\n    let x = 5;\n    let x = x + 1;\n    let x = x * 2;\n    println!(\"x is {}\", x);\n}",
            "exampleLanguage": "rust",
            "mistake": "Thinking shadowing changes the original variable, when it actually creates a new binding.",
            "bug": {
              "prompt": "What does shadowing do?",
              "buggyCode": "fn main() {\n    println!(\"changes type only\");\n}",
              "fixedCode": "fn main() {\n    println!(\"new binding same name\");\n}",
              "explanation": "Shadowing declares a fresh variable with the same name, hiding the earlier binding."
            },
            "exercise": {
              "title": "Shadowing quiz",
              "type": "multiple-choice",
              "instructions": "What happens when you write `let x = 5; let x = x + 1;`?",
              "starterCode": "",
              "solution": "A new binding shadows the old one, so x becomes 6",
              "solutionExplanation": "The second let creates a new binding that shadows the first.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A new binding shadows the old one, so x becomes 6",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "A new binding shadows the old one, so x becomes 6",
                "The compiler errors because x is declared twice",
                "The first x is mutated in place",
                "x becomes a string"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-variables-mutability-m1-l5",
            "slug": "rust-variables-mutability-m1-l5",
            "title": "Constants with const",
            "concept": "A const binding, written const MAX: u32 = 100;, is a compile-time constant that can never change and must have an explicit type. Constants are conventionally written in SCREAMING_SNAKE_CASE and are inlined wherever they are used.",
            "syntax": "const MAX_POINTS: u32 = 100;",
            "exampleCode": "fn main() {\n    const MAX_POINTS: u32 = 100;\n    println!(\"max is {}\", MAX_POINTS);\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to assign a runtime value, like a function result, to a const.",
            "bug": {
              "prompt": "What is true of a const in Rust?",
              "buggyCode": "fn main() {\n    println!(\"can change\");\n}",
              "fixedCode": "fn main() {\n    println!(\"never changes\");\n}",
              "explanation": "A const is fixed at compile time and cannot be reassigned."
            },
            "exercise": {
              "title": "Constant program",
              "type": "write-code",
              "instructions": "Write a program that defines const MAX_POINTS: u32 = 100 and prints `max is 100`.",
              "starterCode": "fn main() {\n    // TODO: define the constant\n}",
              "solution": "fn main() {\n    const MAX_POINTS: u32 = 100;\n    println!(\"max is {}\", MAX_POINTS);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "max is 100",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "max is 100",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-variables-mutability-m2",
        "title": "Applying Variables & Mutability",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-variables-mutability-m2-l1",
            "slug": "rust-variables-mutability-m2-l1",
            "title": "Type Inference",
            "concept": "Rust usually infers a variable's type from its initial value, so let x = 5 gives x the type i32 without an annotation. You can still write the type explicitly, as in let x: i32 = 5, which is useful when the compiler cannot infer it.",
            "syntax": "let x = 5; // i32\nlet y: f64 = 3.0;",
            "exampleCode": "fn main() {\n    let a = 5;\n    let b: f64 = 3.0;\n    println!(\"{} and {}\", a, b);\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming inference picks the type you want, for example expecting a float from let x = 5.",
            "bug": {
              "prompt": "What type does `let x = 5;` give x?",
              "buggyCode": "fn main() {\n    println!(\"f64\");\n}",
              "fixedCode": "fn main() {\n    println!(\"i32\");\n}",
              "explanation": "Integer literals default to i32 when Rust infers the type."
            },
            "exercise": {
              "title": "Inference program",
              "type": "write-code",
              "instructions": "Write a program that declares a = 5 and b: f64 = 3.0 and prints `5 and 3`.",
              "starterCode": "fn main() {\n    // TODO: declare both values\n}",
              "solution": "fn main() {\n    let a = 5;\n    let b: f64 = 3.0;\n    println!(\"{} and {}\", a, b);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "5 and 3",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "5 and 3",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-variables-mutability-m2-l2",
            "slug": "rust-variables-mutability-m2-l2",
            "title": "Variable Scope",
            "concept": "A variable lives only inside the block where it was declared, between its { and }. When the block ends the variable goes out of scope, so code after the block cannot use it.",
            "syntax": "fn main() { let x = 1; { let y = 2; } }",
            "exampleCode": "fn main() {\n    let outer = 1;\n    {\n        let inner = 2;\n        println!(\"{} {}\", outer, inner);\n    }\n    println!(\"outer {}\", outer);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a variable after its block has ended, when it is already out of scope.",
            "bug": {
              "prompt": "Where can a variable declared inside a block be used?",
              "buggyCode": "fn main() {\n    println!(\"anywhere\");\n}",
              "fixedCode": "fn main() {\n    println!(\"inside its block\");\n}",
              "explanation": "A binding is only visible from its declaration to the end of its enclosing block."
            },
            "exercise": {
              "title": "Scope quiz",
              "type": "multiple-choice",
              "instructions": "Where can a variable declared inside a block be used?",
              "starterCode": "",
              "solution": "Only inside that block",
              "solutionExplanation": "Variables are visible only within the block where they are declared.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Only inside that block",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Only inside that block",
                "Anywhere in the program",
                "Only in other functions",
                "Only before the block"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-variables-mutability-m2-l3",
            "slug": "rust-variables-mutability-m2-l3",
            "title": "Reassigning with Operators",
            "concept": "Compound assignment operators like +=, -=, *=, and /= update a mutable variable in place. Writing count += 1 is exactly the same as count = count + 1, but shorter and clearer.",
            "syntax": "let mut n = 3;\nn += 2;",
            "exampleCode": "fn main() {\n    let mut n = 3;\n    n += 2;\n    n *= 2;\n    println!(\"n is {}\", n);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using += on an immutable variable, which fails because the variable cannot change.",
            "bug": {
              "prompt": "What does `n += 2` do?",
              "buggyCode": "fn main() {\n    println!(\"compares\");\n}",
              "fixedCode": "fn main() {\n    println!(\"adds and assigns\");\n}",
              "explanation": "n += 2 adds 2 to n and stores the result back in n."
            },
            "exercise": {
              "title": "Compound assignment program",
              "type": "write-code",
              "instructions": "Write a program that starts n at 3, adds 2, doubles it, and prints `n is 10`.",
              "starterCode": "fn main() {\n    // TODO: use += and *=\n}",
              "solution": "fn main() {\n    let mut n = 3;\n    n += 2;\n    n *= 2;\n    println!(\"n is {}\", n);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "n is 10",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "n is 10",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-variables-mutability-m2-l4",
            "slug": "rust-variables-mutability-m2-l4",
            "title": "Shadowing to Change Type",
            "concept": "Shadowing lets you reuse a name with a different type, for example turning a string into its length. This is a common pattern for parsing input: keep the same meaningful name while the value's type changes.",
            "syntax": "let s = \"42\";\nlet s: usize = s.len();",
            "exampleCode": "fn main() {\n    let text = \"hello\";\n    let text = text.len();\n    println!(\"length is {}\", text);\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying the same trick with mut, which cannot change a variable's type.",
            "bug": {
              "prompt": "Can shadowing change a variable's type?",
              "buggyCode": "fn main() {\n    println!(\"no\");\n}",
              "fixedCode": "fn main() {\n    println!(\"yes\");\n}",
              "explanation": "A shadowed binding is a new variable, so it may have a completely different type."
            },
            "exercise": {
              "title": "Shadow type quiz",
              "type": "multiple-choice",
              "instructions": "Can shadowing change a variable's type?",
              "starterCode": "",
              "solution": "Yes, the new binding may have a different type",
              "solutionExplanation": "Shadowing creates a new binding, so the type may change; mut cannot do that.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Yes, the new binding may have a different type",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Yes, the new binding may have a different type",
                "No, the type is fixed forever",
                "Only from integer to float",
                "Only inside functions"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-variables-mutability-m2-l5",
            "slug": "rust-variables-mutability-m2-l5",
            "title": "Mutable vs Immutable Design",
            "concept": "Choosing mut only where a value really changes makes code safer: the compiler then stops accidental writes everywhere else. A good habit is to start immutable and add mut only when the compiler tells you a reassignment is needed.",
            "syntax": "let mut total = 0;\ntotal += 5;",
            "exampleCode": "fn main() {\n    let base = 10;\n    let mut total = base;\n    total += 5;\n    println!(\"total is {}\", total);\n}",
            "exampleLanguage": "rust",
            "mistake": "Marking everything mut by default, which throws away the safety that immutability provides.",
            "bug": {
              "prompt": "When should you use mut?",
              "buggyCode": "fn main() {\n    println!(\"always\");\n}",
              "fixedCode": "fn main() {\n    println!(\"only when it changes\");\n}",
              "explanation": "Use mut only for values that genuinely need reassignment, and keep the rest immutable."
            },
            "exercise": {
              "title": "Running total program",
              "type": "write-code",
              "instructions": "Write a program that starts total at base 10, adds 5, and prints `total is 15`.",
              "starterCode": "fn main() {\n    // TODO: use base and a mutable total\n}",
              "solution": "fn main() {\n    let base = 10;\n    let mut total = base;\n    total += 5;\n    println!(\"total is {}\", total);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "total is 15",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "total is 15",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Score tracker",
      "type": "write-code",
      "instructions": "Write a program that defines const MAX: u32 = 100, starts score at 0, adds 30 then 25 with +=, shadows score into a doubled value, and prints `score is 110` and `max is 100`.",
      "starterCode": "fn main() {\n    // TODO: track the score\n}",
      "solution": "fn main() {\n    const MAX: u32 = 100;\n    let mut score = 0;\n    score += 30;\n    score += 25;\n    let score = score * 2;\n    println!(\"score is {}\", score);\n    println!(\"max is {}\", MAX);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "score is 110\nmax is 100",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "score is 110",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Score Tracker",
      "description": "Build a program that tracks a game score using immutable and mutable variables, shadowing, and a constant.",
      "requirements": [
        "Program uses a const for the maximum score",
        "Program uses a mutable variable for the current score",
        "Program uses shadowing at least once",
        "Program prints the final score"
      ],
      "rubric": [
        "Constant is defined and used",
        "Mutable score updates correctly",
        "Shadowing is present and correct",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-data-types",
    "slug": "rust-data-types",
    "language": "rust",
    "category": "languages",
    "title": "Data Types in Rust",
    "description": "Learn Rust's scalar and compound types: integers, floats, booleans, chars, tuples, and arrays.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "Using integer and float types",
      "Working with bool and char",
      "Grouping values in tuples",
      "Using fixed-size arrays",
      "Writing type annotations",
      "Numeric operations"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning the sizes of boxes in a warehouse: pick the right size and everything fits safely.",
    "modules": [
      {
        "id": "rust-data-types-m1",
        "title": "Fundamentals of Data Types in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-data-types-m1-l1",
            "slug": "rust-data-types-m1-l1",
            "title": "Scalar Types Overview",
            "concept": "Rust has four scalar types: integers, floating-point numbers, booleans, and characters. Scalar types hold a single value, and the compiler checks that every operation matches the type, which catches many mistakes before the program runs.",
            "syntax": "let n: i32 = 5; let f: f64 = 1.5; let b: bool = true; let c: char = 'a';",
            "exampleCode": "fn main() {\n    let n: i32 = 5;\n    let f: f64 = 1.5;\n    let b: bool = true;\n    let c: char = 'a';\n    println!(\"{} {} {} {}\", n, f, b, c);\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming an integer literal is a float, or adding an integer to a float without converting.",
            "bug": {
              "prompt": "Which of these is a scalar type in Rust?",
              "buggyCode": "fn main() {\n    println!(\"String\");\n}",
              "fixedCode": "fn main() {\n    println!(\"bool\");\n}",
              "explanation": "Scalar types are integers, floats, booleans, and characters; String is a compound heap type."
            },
            "exercise": {
              "title": "Scalar values program",
              "type": "write-code",
              "instructions": "Write a program that declares n: i32 = 5, f: f64 = 1.5, b: bool = true, c: char = 'a' and prints `5 1.5 true a`.",
              "starterCode": "fn main() {\n    // TODO: declare the four scalars\n}",
              "solution": "fn main() {\n    let n: i32 = 5;\n    let f: f64 = 1.5;\n    let b: bool = true;\n    let c: char = 'a';\n    println!(\"{} {} {} {}\", n, f, b, c);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "5 1.5 true a",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "5 1.5 true a",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-data-types-m1-l2",
            "slug": "rust-data-types-m1-l2",
            "title": "Integer Types",
            "concept": "Rust integers come in signed and unsigned sizes: i8, i16, i32, i64, i128, isize and u8, u16, u32, u64, u128, usize. The default i32 is right for most code, and choosing a size is about the range of values you need, not about speed.",
            "syntax": "let small: u8 = 255; let big: i64 = 1_000_000;",
            "exampleCode": "fn main() {\n    let small: u8 = 255;\n    let big: i64 = 1_000_000;\n    println!(\"{} {}\", small, big);\n}",
            "exampleLanguage": "rust",
            "mistake": "Storing 300 in a u8, which can only hold 0 to 255.",
            "bug": {
              "prompt": "What is the largest value a u8 can hold?",
              "buggyCode": "fn main() {\n    println!(\"256\");\n}",
              "fixedCode": "fn main() {\n    println!(\"255\");\n}",
              "explanation": "A u8 holds 8 bits, so its range is 0 to 255."
            },
            "exercise": {
              "title": "Integer range program",
              "type": "write-code",
              "instructions": "Write a program that declares small: u8 = 255 and big: i64 = 1000000 and prints `255 1000000`.",
              "starterCode": "fn main() {\n    // TODO: declare the integers\n}",
              "solution": "fn main() {\n    let small: u8 = 255;\n    let big: i64 = 1_000_000;\n    println!(\"{} {}\", small, big);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "255 1000000",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "255 1000000",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-data-types-m1-l3",
            "slug": "rust-data-types-m1-l3",
            "title": "Floating-Point Numbers",
            "concept": "Rust has f32 and f64 floating-point types, and f64 is the default because it has more precision. Floats store approximations, so 0.1 + 0.2 is not exactly 0.3, and you should never compare floats with == for exact equality.",
            "syntax": "let x: f64 = 0.1 + 0.2;",
            "exampleCode": "fn main() {\n    let x: f64 = 0.1 + 0.2;\n    println!(\"{:.1}\", x);\n}",
            "exampleLanguage": "rust",
            "mistake": "Comparing two floats with == and expecting an exact match.",
            "bug": {
              "prompt": "Why is `0.1 + 0.2 == 0.3` false in Rust?",
              "buggyCode": "fn main() {\n    println!(\"compiler bug\");\n}",
              "fixedCode": "fn main() {\n    println!(\"floats are approximate\");\n}",
              "explanation": "Floating-point numbers are binary approximations, so 0.1 + 0.2 is slightly more than 0.3."
            },
            "exercise": {
              "title": "Float quiz",
              "type": "multiple-choice",
              "instructions": "Why is `0.1 + 0.2 == 0.3` false in Rust?",
              "starterCode": "",
              "solution": "Floating-point values are approximations, so the sum is not exactly 0.3",
              "solutionExplanation": "Floats are binary approximations; compare them with a small tolerance instead of ==.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Floating-point values are approximations, so the sum is not exactly 0.3",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Floating-point values are approximations, so the sum is not exactly 0.3",
                "Rust rounds all floats to integers",
                "The + operator does not work on floats",
                "0.1 and 0.2 are strings"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-data-types-m1-l4",
            "slug": "rust-data-types-m1-l4",
            "title": "Booleans",
            "concept": "The bool type has exactly two values, true and false, and it is the type of every condition in if and while. Booleans are one byte in size, and Rust never treats 0 or 1 as a boolean the way C does.",
            "syntax": "let is_ready: bool = true;",
            "exampleCode": "fn main() {\n    let is_ready = true;\n    let is_done = false;\n    println!(\"{} {}\", is_ready, is_done);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using 1 or 0 where a bool is expected, as in `if 1 { }`.",
            "bug": {
              "prompt": "What values can a bool hold?",
              "buggyCode": "fn main() {\n    println!(\"0 and 1\");\n}",
              "fixedCode": "fn main() {\n    println!(\"true and false\");\n}",
              "explanation": "A bool holds only true or false; integers are a different type in Rust."
            },
            "exercise": {
              "title": "Boolean program",
              "type": "write-code",
              "instructions": "Write a program that declares is_ready = true and is_done = false and prints `true false`.",
              "starterCode": "fn main() {\n    // TODO: declare the booleans\n}",
              "solution": "fn main() {\n    let is_ready = true;\n    let is_done = false;\n    println!(\"{} {}\", is_ready, is_done);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "true false",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "true false",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-data-types-m1-l5",
            "slug": "rust-data-types-m1-l5",
            "title": "Characters",
            "concept": "The char type holds a single Unicode scalar value in four bytes, written in single quotes like 'a' or '🦀'. Unlike C, a Rust char is not a byte: it can hold any letter, digit, or emoji.",
            "syntax": "let crab: char = '🦀';",
            "exampleCode": "fn main() {\n    let letter: char = 'R';\n    let crab: char = '🦀';\n    println!(\"{} {}\", letter, crab);\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing a char with double quotes, which makes it a string instead.",
            "bug": {
              "prompt": "How is a Rust char written?",
              "buggyCode": "fn main() {\n    println!(\"double quotes\");\n}",
              "fixedCode": "fn main() {\n    println!(\"single quotes\");\n}",
              "explanation": "A char literal uses single quotes; double quotes make a string slice."
            },
            "exercise": {
              "title": "Char quiz",
              "type": "multiple-choice",
              "instructions": "How is a Rust char written?",
              "starterCode": "",
              "solution": "In single quotes, like 'a'",
              "solutionExplanation": "Char literals use single quotes; double quotes produce a string.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "In single quotes, like 'a'",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "In single quotes, like 'a'",
                "In double quotes, like \"a\"",
                "With the char keyword only",
                "As a number from 0 to 255"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-data-types-m2",
        "title": "Applying Data Types in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-data-types-m2-l1",
            "slug": "rust-data-types-m2-l1",
            "title": "Tuples",
            "concept": "A tuple groups several values of different types into one value, written (1, \"hi\", true), and you reach its parts with .0, .1, and so on. Tuples are fixed in size, so they are ideal for returning several values from a function.",
            "syntax": "let t: (i32, &str, bool) = (1, \"hi\", true);",
            "exampleCode": "fn main() {\n    let point = (3, 4);\n    println!(\"x={} y={}\", point.0, point.1);\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to push a new element onto a tuple, which has a fixed length.",
            "bug": {
              "prompt": "How do you read the first element of a tuple?",
              "buggyCode": "fn main() {\n    println!(\"t[0]\");\n}",
              "fixedCode": "fn main() {\n    println!(\"t.0\");\n}",
              "explanation": "Tuple fields are accessed by index with dot syntax, starting at .0."
            },
            "exercise": {
              "title": "Tuple program",
              "type": "write-code",
              "instructions": "Write a program that stores point (3, 4) in a tuple and prints `x=3 y=4`.",
              "starterCode": "fn main() {\n    // TODO: use a tuple\n}",
              "solution": "fn main() {\n    let point = (3, 4);\n    println!(\"x={} y={}\", point.0, point.1);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "x=3 y=4",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "x=3 y=4",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-data-types-m2-l2",
            "slug": "rust-data-types-m2-l2",
            "title": "Arrays",
            "concept": "An array holds a fixed number of values of the same type, written [1, 2, 3], and its length is part of its type. Indexing past the end panics at runtime, which is safer than the silent memory corruption other languages allow.",
            "syntax": "let a: [i32; 3] = [1, 2, 3];",
            "exampleCode": "fn main() {\n    let a = [10, 20, 30];\n    println!(\"first {} last {}\", a[0], a[2]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Indexing an array out of bounds and expecting a garbage value instead of a panic.",
            "bug": {
              "prompt": "What happens when you index an array out of bounds in Rust?",
              "buggyCode": "fn main() {\n    println!(\"garbage value\");\n}",
              "fixedCode": "fn main() {\n    println!(\"panic\");\n}",
              "explanation": "Rust checks array bounds at runtime and panics on an out-of-bounds index."
            },
            "exercise": {
              "title": "Array program",
              "type": "write-code",
              "instructions": "Write a program that stores [10, 20, 30] in an array and prints `first 10 last 30`.",
              "starterCode": "fn main() {\n    // TODO: use an array\n}",
              "solution": "fn main() {\n    let a = [10, 20, 30];\n    println!(\"first {} last {}\", a[0], a[2]);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "first 10 last 30",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "first 10 last 30",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-data-types-m2-l3",
            "slug": "rust-data-types-m2-l3",
            "title": "Type Annotations",
            "concept": "A type annotation, written let x: i32 = 5, tells the compiler exactly which type a variable has. Annotations are required when inference cannot decide, for example when parsing a string or collecting an iterator.",
            "syntax": "let parsed: i32 = \"42\".parse().unwrap();",
            "exampleCode": "fn main() {\n    let parsed: i32 = \"42\".parse().unwrap();\n    println!(\"parsed {}\", parsed);\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing the annotation in the wrong place, as in `let: i32 x = 5;`.",
            "bug": {
              "prompt": "Where does a type annotation go?",
              "buggyCode": "fn main() {\n    println!(\"after the name\");\n}",
              "fixedCode": "fn main() {\n    println!(\"before let\");\n}",
              "explanation": "The annotation follows the variable name: let name: Type = value."
            },
            "exercise": {
              "title": "Annotation quiz",
              "type": "multiple-choice",
              "instructions": "Where does a type annotation go?",
              "starterCode": "",
              "solution": "After the variable name, as in `let x: i32 = 5;`",
              "solutionExplanation": "Annotations follow the name: let x: i32 = 5;.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "After the variable name, as in `let x: i32 = 5;`",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "After the variable name, as in `let x: i32 = 5;`",
                "Before the let keyword",
                "After the value",
                "At the end of the line"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-data-types-m2-l4",
            "slug": "rust-data-types-m2-l4",
            "title": "Numeric Operations",
            "concept": "Rust supports + - * / and % on numbers, and integer division truncates toward zero while % gives the remainder. In debug builds, arithmetic that overflows panics, so a wrong calculation fails loudly instead of wrapping silently.",
            "syntax": "let q = 7 / 2; // 3\nlet r = 7 % 2; // 1",
            "exampleCode": "fn main() {\n    println!(\"{} {}\", 7 / 2, 7 % 2);\n    println!(\"{}\", 2 * 3 + 1);\n}",
            "exampleLanguage": "rust",
            "mistake": "Expecting 7 / 2 to be 3.5 when both operands are integers.",
            "bug": {
              "prompt": "What is 7 / 2 in Rust when both are integers?",
              "buggyCode": "fn main() {\n    println!(\"3.5\");\n}",
              "fixedCode": "fn main() {\n    println!(\"3\");\n}",
              "explanation": "Integer division truncates toward zero, so 7 / 2 is 3 and the remainder is 1."
            },
            "exercise": {
              "title": "Arithmetic program",
              "type": "write-code",
              "instructions": "Write a program that prints `3 1` for 7/2 and 7%2, then prints `7` for 2*3+1.",
              "starterCode": "fn main() {\n    // TODO: print the arithmetic\n}",
              "solution": "fn main() {\n    println!(\"{} {}\", 7 / 2, 7 % 2);\n    println!(\"{}\", 2 * 3 + 1);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "3 1\n7",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "3 1",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-data-types-m2-l5",
            "slug": "rust-data-types-m2-l5",
            "title": "The Unit Type",
            "concept": "The unit type () is the type of a function that returns nothing, and it is also the value of an empty block. It has exactly one value, also written (), and it appears whenever a statement has no meaningful result.",
            "syntax": "fn greet() { println!(\"hi\"); } // returns ()",
            "exampleCode": "fn main() {\n    let nothing: () = ();\n    println!(\"unit {:?}\", nothing);\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to print a () value with {} instead of {:?}, since () does not implement Display.",
            "bug": {
              "prompt": "What does a function with no return type return?",
              "buggyCode": "fn main() {\n    println!(\"nothing\");\n}",
              "fixedCode": "fn main() {\n    println!(\"unit ()\");\n}",
              "explanation": "A function without a return type returns the unit value ()."
            },
            "exercise": {
              "title": "Unit program",
              "type": "write-code",
              "instructions": "Write a program that binds nothing: () = () and prints `unit ()` with {:?}.",
              "starterCode": "fn main() {\n    // TODO: use the unit value\n}",
              "solution": "fn main() {\n    let nothing: () = ();\n    println!(\"unit {:?}\", nothing);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "unit ()",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "unit ()",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Type showcase",
      "type": "write-code",
      "instructions": "Write a program that declares n: i32 = 7, f: f64 = 2.5, b = true, c = 'R', a tuple (1, 2), and an array [3, 4], then prints `7 2.5 true R`, `tuple 1 2`, and `array 3 4`.",
      "starterCode": "fn main() {\n    // TODO: declare all the values\n}",
      "solution": "fn main() {\n    let n: i32 = 7;\n    let f: f64 = 2.5;\n    let b = true;\n    let c = 'R';\n    let t = (1, 2);\n    let a = [3, 4];\n    println!(\"{} {} {} {}\", n, f, b, c);\n    println!(\"tuple {} {}\", t.0, t.1);\n    println!(\"array {} {}\", a[0], a[1]);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "7 2.5 true R\ntuple 1 2\narray 3 4",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "7 2.5 true R",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Type Showcase",
      "description": "Build a program that declares one value of each scalar type plus a tuple and an array, and prints them all.",
      "requirements": [
        "Program declares an integer, a float, a bool, and a char",
        "Program declares a tuple and an array",
        "Program prints every value with labels",
        "All types are annotated or correctly inferred"
      ],
      "rubric": [
        "All six kinds of value appear",
        "Labels match the printed values",
        "No type errors",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-functions",
    "slug": "rust-functions",
    "language": "rust",
    "category": "languages",
    "title": "Functions in Rust",
    "description": "Define and call functions, pass parameters, return values, and compose small helpers.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "Defining functions with fn",
      "Passing parameters",
      "Returning values",
      "Using early return",
      "Composing functions",
      "Naming functions well"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to use kitchen tools: each small tool does one job well, and you combine them to cook a meal.",
    "modules": [
      {
        "id": "rust-functions-m1",
        "title": "Fundamentals of Functions in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-functions-m1-l1",
            "slug": "rust-functions-m1-l1",
            "title": "Defining a Function",
            "concept": "A function is declared with fn, a name, parameters in parentheses, and a body in braces, and it is called by its name with arguments. Functions give a name to a reusable piece of work, so main stays short and readable.",
            "syntax": "fn greet() { println!(\"hi\"); }",
            "exampleCode": "fn greet() {\n    println!(\"hi there\");\n}\nfn main() {\n    greet();\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting the parentheses when calling a function, writing `greet;` instead of `greet();`.",
            "bug": {
              "prompt": "How do you call a function named greet?",
              "buggyCode": "fn main() {\n    println!(\"greet\");\n}",
              "fixedCode": "fn main() {\n    println!(\"greet()\");\n}",
              "explanation": "A function call needs parentheses, even with no arguments: greet()."
            },
            "exercise": {
              "title": "Function call quiz",
              "type": "multiple-choice",
              "instructions": "How do you call a function named greet?",
              "starterCode": "",
              "solution": "greet()",
              "solutionExplanation": "Calls use parentheses: greet().",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "greet()",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "greet()",
                "greet",
                "call greet",
                "fn greet"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-functions-m1-l2",
            "slug": "rust-functions-m1-l2",
            "title": "Function Parameters",
            "concept": "Parameters are named values a function receives, each written with a name and a type, like fn add(a: i32, b: i32). The caller passes arguments in the same order, and the function uses the parameter names inside its body.",
            "syntax": "fn add(a: i32, b: i32) -> i32 { a + b }",
            "exampleCode": "fn greet(name: &str) {\n    println!(\"Hello, {}!\", name);\n}\nfn main() {\n    greet(\"Ada\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Passing arguments in the wrong order, so the function computes with swapped values.",
            "bug": {
              "prompt": "What must match between a call and its function definition?",
              "buggyCode": "fn main() {\n    println!(\"names only\");\n}",
              "fixedCode": "fn main() {\n    println!(\"order and types\");\n}",
              "explanation": "Arguments must be passed in the same order and with the same types as the parameters."
            },
            "exercise": {
              "title": "Greet function program",
              "type": "write-code",
              "instructions": "Write a program with a greet(name: &str) function that prints `Hello, Ada!` when called with \"Ada\".",
              "starterCode": "fn greet(name: &str) {\n    // TODO: print the greeting\n}\nfn main() {\n    greet(\"Ada\");\n}",
              "solution": "fn greet(name: &str) {\n    println!(\"Hello, {}!\", name);\n}\nfn main() {\n    greet(\"Ada\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Hello, Ada!",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Hello, Ada!",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-functions-m1-l3",
            "slug": "rust-functions-m1-l3",
            "title": "Return Values",
            "concept": "A function returns a value by writing its type after -> and ending the body with an expression that has no semicolon. The final expression's value becomes the return value, and return can also exit early from anywhere in the body.",
            "syntax": "fn double(x: i32) -> i32 { x * 2 }",
            "exampleCode": "fn double(x: i32) -> i32 {\n    x * 2\n}\nfn main() {\n    println!(\"double of 21 is {}\", double(21));\n}",
            "exampleLanguage": "rust",
            "mistake": "Putting a semicolon after the final expression, which turns it into a statement returning () instead of the value.",
            "bug": {
              "prompt": "What makes the last line of a function its return value?",
              "buggyCode": "fn main() {\n    println!(\"semicolon\");\n}",
              "fixedCode": "fn main() {\n    println!(\"no semicolon\");\n}",
              "explanation": "A final expression without a semicolon is the function's return value."
            },
            "exercise": {
              "title": "Double function program",
              "type": "write-code",
              "instructions": "Write a program with double(x: i32) -> i32 returning x * 2, and print `double of 21 is 42`.",
              "starterCode": "fn double(x: i32) -> i32 {\n    // TODO: return x * 2\n}\nfn main() {\n    println!(\"double of 21 is {}\", double(21));\n}",
              "solution": "fn double(x: i32) -> i32 {\n    x * 2\n}\nfn main() {\n    println!(\"double of 21 is {}\", double(21));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "double of 21 is 42",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "double of 21 is 42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-functions-m1-l4",
            "slug": "rust-functions-m1-l4",
            "title": "Expressions vs Statements",
            "concept": "An expression produces a value, while a statement performs an action and produces nothing; let x = 5; is a statement, but 5 and x + 1 are expressions. Function bodies are expressions, which is why the last line can be the return value.",
            "syntax": "let y = { let x = 3; x + 1 }; // y is 4",
            "exampleCode": "fn main() {\n    let y = {\n        let x = 3;\n        x + 1\n    };\n    println!(\"y is {}\", y);\n}",
            "exampleLanguage": "rust",
            "mistake": "Adding a semicolon to the last line of a block and expecting the block to produce a value.",
            "bug": {
              "prompt": "Which of these is an expression?",
              "buggyCode": "fn main() {\n    println!(\"let x = 5;\");\n}",
              "fixedCode": "fn main() {\n    println!(\"x + 1\");\n}",
              "explanation": "x + 1 produces a value, so it is an expression; let is a statement."
            },
            "exercise": {
              "title": "Expression quiz",
              "type": "multiple-choice",
              "instructions": "Which of these is an expression?",
              "starterCode": "",
              "solution": "x + 1",
              "solutionExplanation": "x + 1 evaluates to a value, so it is an expression; let is a statement.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "x + 1",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "x + 1",
                "let x = 5;",
                "fn main() {}",
                "use std::io;"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-functions-m1-l5",
            "slug": "rust-functions-m1-l5",
            "title": "Early Return",
            "concept": "The return keyword exits a function immediately with a value, which is handy for guard clauses that handle edge cases first. Code after a return in the same path never runs, so early returns keep the main logic unindented.",
            "syntax": "fn abs(x: i32) -> i32 { if x < 0 { return -x; } x }",
            "exampleCode": "fn sign(x: i32) -> i32 {\n    if x > 0 {\n        return 1;\n    }\n    0\n}\nfn main() {\n    println!(\"sign {}\", sign(5));\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting that code after return never runs, and putting essential work after it.",
            "bug": {
              "prompt": "What does return do inside a function?",
              "buggyCode": "fn main() {\n    println!(\"skips a line\");\n}",
              "fixedCode": "fn main() {\n    println!(\"exits with a value\");\n}",
              "explanation": "return exits the function immediately, giving back the value after it."
            },
            "exercise": {
              "title": "Sign function program",
              "type": "write-code",
              "instructions": "Write a program with sign(x: i32) -> i32 that returns 1 for positive input and 0 otherwise, printing `sign 1` for 5.",
              "starterCode": "fn sign(x: i32) -> i32 {\n    // TODO: return 1 when positive\n    0\n}\nfn main() {\n    println!(\"sign {}\", sign(5));\n}",
              "solution": "fn sign(x: i32) -> i32 {\n    if x > 0 {\n        return 1;\n    }\n    0\n}\nfn main() {\n    println!(\"sign {}\", sign(5));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "sign 1",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "sign 1",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-functions-m2",
        "title": "Applying Functions in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-functions-m2-l1",
            "slug": "rust-functions-m2-l1",
            "title": "Multiple Parameters",
            "concept": "A function can take several parameters, separated by commas, each with its own type. Keeping the parameter list short makes a function easier to call correctly, and grouping related values into a struct is better than a long list.",
            "syntax": "fn area(w: i32, h: i32) -> i32 { w * h }",
            "exampleCode": "fn area(w: i32, h: i32) -> i32 {\n    w * h\n}\nfn main() {\n    println!(\"area is {}\", area(6, 7));\n}",
            "exampleLanguage": "rust",
            "mistake": "Passing two arguments of the same type in the wrong order, which compiles but computes the wrong answer.",
            "bug": {
              "prompt": "How are multiple parameters separated?",
              "buggyCode": "fn main() {\n    println!(\"semicolons\");\n}",
              "fixedCode": "fn main() {\n    println!(\"commas\");\n}",
              "explanation": "Parameters are listed with commas between them."
            },
            "exercise": {
              "title": "Area function program",
              "type": "write-code",
              "instructions": "Write a program with area(w: i32, h: i32) -> i32 returning w * h, printing `area is 42` for 6 and 7.",
              "starterCode": "fn area(w: i32, h: i32) -> i32 {\n    // TODO: return w * h\n}\nfn main() {\n    println!(\"area is {}\", area(6, 7));\n}",
              "solution": "fn area(w: i32, h: i32) -> i32 {\n    w * h\n}\nfn main() {\n    println!(\"area is {}\", area(6, 7));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "area is 42",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "area is 42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-functions-m2-l2",
            "slug": "rust-functions-m2-l2",
            "title": "Helper Functions",
            "concept": "Breaking a job into small helper functions makes each piece easy to test and reuse. main can then read like a short summary: read the input, call the helpers, and print the result.",
            "syntax": "fn is_even(n: i32) -> bool { n % 2 == 0 }",
            "exampleCode": "fn is_even(n: i32) -> bool {\n    n % 2 == 0\n}\nfn main() {\n    println!(\"4 even? {}\", is_even(4));\n}",
            "exampleLanguage": "rust",
            "mistake": "Putting all the logic in main and only later discovering the same code is needed in three places.",
            "bug": {
              "prompt": "Why split code into helper functions?",
              "buggyCode": "fn main() {\n    println!(\"to reuse and test\");\n}",
              "fixedCode": "fn main() {\n    println!(\"to slow down\");\n}",
              "explanation": "Small helpers can be reused and tested on their own, and they make main easier to read."
            },
            "exercise": {
              "title": "Even helper program",
              "type": "write-code",
              "instructions": "Write a program with is_even(n: i32) -> bool returning n % 2 == 0, printing `4 even? true`.",
              "starterCode": "fn is_even(n: i32) -> bool {\n    // TODO: check evenness\n}\nfn main() {\n    println!(\"4 even? {}\", is_even(4));\n}",
              "solution": "fn is_even(n: i32) -> bool {\n    n % 2 == 0\n}\nfn main() {\n    println!(\"4 even? {}\", is_even(4));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "4 even? true",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "4 even? true",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-functions-m2-l3",
            "slug": "rust-functions-m2-l3",
            "title": "Function Scope",
            "concept": "Variables declared inside a function, including its parameters, are local to that function. Two functions can use the same parameter name without interfering, because each call gets its own fresh bindings.",
            "syntax": "fn f(x: i32) -> i32 { x + 1 }",
            "exampleCode": "fn add_one(x: i32) -> i32 {\n    x + 1\n}\nfn main() {\n    let x = 10;\n    println!(\"{}\", add_one(x));\n    println!(\"x still {}\", x);\n}",
            "exampleLanguage": "rust",
            "mistake": "Expecting a variable set inside a function to still be visible in main afterwards.",
            "bug": {
              "prompt": "Can main see a variable declared inside another function?",
              "buggyCode": "fn main() {\n    println!(\"yes\");\n}",
              "fixedCode": "fn main() {\n    println!(\"no\");\n}",
              "explanation": "Function locals live only inside that function, so main cannot see them."
            },
            "exercise": {
              "title": "Local scope program",
              "type": "write-code",
              "instructions": "Write a program where add_one(x) returns x + 1, main prints `11`, then prints `x still 10`.",
              "starterCode": "fn add_one(x: i32) -> i32 {\n    // TODO: return x + 1\n}\nfn main() {\n    let x = 10;\n    println!(\"{}\", add_one(x));\n    println!(\"x still {}\", x);\n}",
              "solution": "fn add_one(x: i32) -> i32 {\n    x + 1\n}\nfn main() {\n    let x = 10;\n    println!(\"{}\", add_one(x));\n    println!(\"x still {}\", x);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "11\nx still 10",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "11",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-functions-m2-l4",
            "slug": "rust-functions-m2-l4",
            "title": "Naming Functions",
            "concept": "Rust function names use snake_case, all lowercase with underscores, and a good name is a verb that says what the function does. Clear names make call sites read like sentences, so calculate_total is better than ct.",
            "syntax": "fn calculate_total(price: i32, tax: i32) -> i32 { price + tax }",
            "exampleCode": "fn calculate_total(price: i32, tax: i32) -> i32 {\n    price + tax\n}\nfn main() {\n    println!(\"total {}\", calculate_total(100, 15));\n}",
            "exampleLanguage": "rust",
            "mistake": "Using CamelCase for a function, which the compiler warns about and other Rust programmers find surprising.",
            "bug": {
              "prompt": "Which is the correct Rust style for a function name?",
              "buggyCode": "fn main() {\n    println!(\"calculateTotal\");\n}",
              "fixedCode": "fn main() {\n    println!(\"calculate_total\");\n}",
              "explanation": "Rust uses snake_case for functions: lowercase words joined by underscores."
            },
            "exercise": {
              "title": "Naming quiz",
              "type": "multiple-choice",
              "instructions": "Which is the correct Rust style for a function name?",
              "starterCode": "",
              "solution": "calculate_total",
              "solutionExplanation": "Rust functions use snake_case.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "calculate_total",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "calculate_total",
                "calculateTotal",
                "CalculateTotal",
                "CALCULATE_TOTAL"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-functions-m2-l5",
            "slug": "rust-functions-m2-l5",
            "title": "Composing Functions",
            "concept": "Functions compose: the output of one becomes the input of another, so double(add(2, 3)) means add first, then double. Composing small functions builds complex behaviour from simple, tested pieces.",
            "syntax": "fn add(a: i32, b: i32) -> i32 { a + b }",
            "exampleCode": "fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\nfn double(x: i32) -> i32 {\n    x * 2\n}\nfn main() {\n    println!(\"result {}\", double(add(2, 3)));\n}",
            "exampleLanguage": "rust",
            "mistake": "Reading nested calls outside-in and getting the order of evaluation backwards.",
            "bug": {
              "prompt": "In double(add(2, 3)), which runs first?",
              "buggyCode": "fn main() {\n    println!(\"double\");\n}",
              "fixedCode": "fn main() {\n    println!(\"add\");\n}",
              "explanation": "The inner call runs first: add(2, 3) produces 5, then double(5) produces 10."
            },
            "exercise": {
              "title": "Compose program",
              "type": "write-code",
              "instructions": "Write a program with add and double functions that prints `result 10` for double(add(2, 3)).",
              "starterCode": "fn add(a: i32, b: i32) -> i32 {\n    // TODO\n    0\n}\nfn double(x: i32) -> i32 {\n    // TODO\n    0\n}\nfn main() {\n    println!(\"result {}\", double(add(2, 3)));\n}",
              "solution": "fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\nfn double(x: i32) -> i32 {\n    x * 2\n}\nfn main() {\n    println!(\"result {}\", double(add(2, 3)));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "result 10",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "result 10",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Calculator functions",
      "type": "write-code",
      "instructions": "Write a program with add, subtract, and multiply functions that prints `3 + 4 = 7`, `10 - 3 = 7`, `3 * 4 = 12`, and `combined 14` for multiply(add(3, 4), 2).",
      "starterCode": "fn add(a: i32, b: i32) -> i32 {\n    // TODO\n    0\n}\nfn main() {\n    // TODO\n}",
      "solution": "fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\nfn subtract(a: i32, b: i32) -> i32 {\n    a - b\n}\nfn multiply(a: i32, b: i32) -> i32 {\n    a * b\n}\nfn main() {\n    println!(\"3 + 4 = {}\", add(3, 4));\n    println!(\"10 - 3 = {}\", subtract(10, 3));\n    println!(\"3 * 4 = {}\", multiply(3, 4));\n    println!(\"combined {}\", multiply(add(3, 4), 2));\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "3 + 4 = 7\n10 - 3 = 7\n3 * 4 = 12\ncombined 14",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "3 + 4 = 7",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Calculator Functions",
      "description": "Build a small calculator from named functions: add, subtract, multiply, and a composed calculation.",
      "requirements": [
        "Program defines add, subtract, and multiply functions",
        "Program prints each operation result with a label",
        "Program composes two functions for a combined result",
        "All functions return values without semicolons on the last line"
      ],
      "rubric": [
        "Each function is defined and used",
        "Printed results are correct",
        "Composition is present",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-control-flow",
    "slug": "rust-control-flow",
    "language": "rust",
    "category": "languages",
    "title": "Control Flow in Rust",
    "description": "Make decisions with if, else if, logical operators, and guard clauses.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "Writing if and else",
      "Chaining else if",
      "Using if as a value",
      "Combining conditions with && and ||",
      "Writing guard clauses",
      "Naming boolean conditions"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to follow a road map: at each junction you check a sign and choose a direction.",
    "modules": [
      {
        "id": "rust-control-flow-m1",
        "title": "Fundamentals of Control Flow in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-control-flow-m1-l1",
            "slug": "rust-control-flow-m1-l1",
            "title": "If Expressions",
            "concept": "An if in Rust is an expression: it evaluates a boolean condition and runs one branch or the other. Because both branches must produce the same type, you can assign the result directly, as in let n = if x > 0 { 1 } else { 0 };.",
            "syntax": "let n = if x > 0 { 1 } else { 0 };",
            "exampleCode": "fn main() {\n    let x = 5;\n    if x > 0 {\n        println!(\"positive\");\n    } else {\n        println!(\"not positive\");\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing `if x = 5` with a single equals, which assigns instead of comparing.",
            "bug": {
              "prompt": "What type must an if condition be?",
              "buggyCode": "fn main() {\n    println!(\"any number\");\n}",
              "fixedCode": "fn main() {\n    println!(\"bool\");\n}",
              "explanation": "An if condition must be a bool; Rust does not accept integers as conditions."
            },
            "exercise": {
              "title": "Positive check program",
              "type": "write-code",
              "instructions": "Write a program that prints `positive` when x = 5 is greater than 0, otherwise `not positive`.",
              "starterCode": "fn main() {\n    let x = 5;\n    // TODO: check x\n}",
              "solution": "fn main() {\n    let x = 5;\n    if x > 0 {\n        println!(\"positive\");\n    } else {\n        println!(\"not positive\");\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "positive",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "positive",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-control-flow-m1-l2",
            "slug": "rust-control-flow-m1-l2",
            "title": "Else If Chains",
            "concept": "An else if chain tests several conditions in order and runs the first branch whose condition is true. The final else catches everything else, so the chain always produces exactly one outcome.",
            "syntax": "if n < 0 { \"neg\" } else if n == 0 { \"zero\" } else { \"pos\" }",
            "exampleCode": "fn main() {\n    let n = 0;\n    if n < 0 {\n        println!(\"negative\");\n    } else if n == 0 {\n        println!(\"zero\");\n    } else {\n        println!(\"positive\");\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Putting the most general condition first, so later branches can never run.",
            "bug": {
              "prompt": "In an else if chain, how many branches run?",
              "buggyCode": "fn main() {\n    println!(\"all true ones\");\n}",
              "fixedCode": "fn main() {\n    println!(\"first true one\");\n}",
              "explanation": "The chain stops at the first true condition, so exactly one branch runs."
            },
            "exercise": {
              "title": "Zero check program",
              "type": "write-code",
              "instructions": "Write a program that prints `zero` for n = 0 using an if / else if / else chain.",
              "starterCode": "fn main() {\n    let n = 0;\n    // TODO: classify n\n}",
              "solution": "fn main() {\n    let n = 0;\n    if n < 0 {\n        println!(\"negative\");\n    } else if n == 0 {\n        println!(\"zero\");\n    } else {\n        println!(\"positive\");\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "zero",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "zero",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-control-flow-m1-l3",
            "slug": "rust-control-flow-m1-l3",
            "title": "If as a Value",
            "concept": "Because if is an expression, you can use it on the right side of let and both arms must return the same type. This removes the need for a mutable variable that you set inside the branches.",
            "syntax": "let label = if score >= 50 { \"pass\" } else { \"fail\" };",
            "exampleCode": "fn main() {\n    let score = 75;\n    let label = if score >= 50 { \"pass\" } else { \"fail\" };\n    println!(\"{}\", label);\n}",
            "exampleLanguage": "rust",
            "mistake": "Giving the two arms different types, for example a number in one and a string in the other.",
            "bug": {
              "prompt": "What must the two arms of an if expression return?",
              "buggyCode": "fn main() {\n    println!(\"any types\");\n}",
              "fixedCode": "fn main() {\n    println!(\"same type\");\n}",
              "explanation": "Both arms of an if used as a value must produce the same type."
            },
            "exercise": {
              "title": "Pass check program",
              "type": "write-code",
              "instructions": "Write a program that sets label to \"pass\" when score 75 is at least 50, else \"fail\", and prints `pass`.",
              "starterCode": "fn main() {\n    let score = 75;\n    // TODO: choose the label with if\n}",
              "solution": "fn main() {\n    let score = 75;\n    let label = if score >= 50 { \"pass\" } else { \"fail\" };\n    println!(\"{}\", label);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "pass",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "pass",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-control-flow-m1-l4",
            "slug": "rust-control-flow-m1-l4",
            "title": "Comparison Operators",
            "concept": "Rust compares values with ==, !=, <, <=, > and >=, and each comparison produces a bool. Comparisons work on numbers, chars, and strings, and they follow the usual mathematical meaning.",
            "syntax": "let bigger = 5 > 3; // true",
            "exampleCode": "fn main() {\n    println!(\"{} {} {}\", 5 > 3, 5 == 5, 5 < 3);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using = instead of == inside a condition, which tries to assign and fails to compile.",
            "bug": {
              "prompt": "Which operator tests equality in Rust?",
              "buggyCode": "fn main() {\n    println!(\"=\");\n}",
              "fixedCode": "fn main() {\n    println!(\"==\");\n}",
              "explanation": "= assigns a value while == compares two values and returns a bool."
            },
            "exercise": {
              "title": "Equality quiz",
              "type": "multiple-choice",
              "instructions": "Which operator tests equality in Rust?",
              "starterCode": "",
              "solution": "==",
              "solutionExplanation": "= assigns; == compares and returns a bool.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "==",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "==",
                "=",
                "===",
                "!="
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-control-flow-m1-l5",
            "slug": "rust-control-flow-m1-l5",
            "title": "Logical Operators",
            "concept": "The && operator means both sides must be true, || means at least one side must be true, and ! flips a bool. Both && and || short-circuit, so the right side is skipped when the left side already decides the result.",
            "syntax": "let ok = age >= 18 && has_ticket;",
            "exampleCode": "fn main() {\n    let age = 20;\n    let has_ticket = true;\n    println!(\"{}\", age >= 18 && has_ticket);\n    println!(\"{}\", age < 18 || has_ticket);\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing `&` instead of `&&`, which is the bitwise operator and needs integer operands.",
            "bug": {
              "prompt": "What does && do?",
              "buggyCode": "fn main() {\n    println!(\"either side\");\n}",
              "fixedCode": "fn main() {\n    println!(\"both sides\");\n}",
              "explanation": "&& is true only when both operands are true."
            },
            "exercise": {
              "title": "Entry check program",
              "type": "write-code",
              "instructions": "Write a program that prints `true` for age 20 >= 18 && has_ticket, and `true` for age < 18 || has_ticket.",
              "starterCode": "fn main() {\n    let age = 20;\n    let has_ticket = true;\n    // TODO: print both checks\n}",
              "solution": "fn main() {\n    let age = 20;\n    let has_ticket = true;\n    println!(\"{}\", age >= 18 && has_ticket);\n    println!(\"{}\", age < 18 || has_ticket);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "true\ntrue",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "true",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-control-flow-m2",
        "title": "Applying Control Flow in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-control-flow-m2-l1",
            "slug": "rust-control-flow-m2-l1",
            "title": "Nested If",
            "concept": "An if inside another if tests a second condition only when the first one passed, which expresses decisions that depend on each other. Deep nesting is hard to read, so combine conditions with && when you can.",
            "syntax": "if a { if b { println!(\"both\"); } }",
            "exampleCode": "fn main() {\n    let logged_in = true;\n    let is_admin = true;\n    if logged_in {\n        if is_admin {\n            println!(\"admin panel\");\n        }\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Nesting so deeply that the logic is hard to follow, instead of combining conditions.",
            "bug": {
              "prompt": "When does the inner if of a nested if run?",
              "buggyCode": "fn main() {\n    println!(\"always\");\n}",
              "fixedCode": "fn main() {\n    println!(\"outer true only\");\n}",
              "explanation": "The inner if only runs when the outer condition was true."
            },
            "exercise": {
              "title": "Admin check program",
              "type": "write-code",
              "instructions": "Write a program that prints `admin panel` only when logged_in and is_admin are both true.",
              "starterCode": "fn main() {\n    let logged_in = true;\n    let is_admin = true;\n    // TODO: nested check\n}",
              "solution": "fn main() {\n    let logged_in = true;\n    let is_admin = true;\n    if logged_in {\n        if is_admin {\n            println!(\"admin panel\");\n        }\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "admin panel",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "admin panel",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-control-flow-m2-l2",
            "slug": "rust-control-flow-m2-l2",
            "title": "Guard Clauses",
            "concept": "A guard clause checks an invalid case at the top of a function and returns early, so the rest of the function only handles valid input. Guard clauses flatten code by removing a level of nesting for every case they handle.",
            "syntax": "fn divide(a: i32, b: i32) -> i32 { if b == 0 { return 0; } a / b }",
            "exampleCode": "fn safe_divide(a: i32, b: i32) -> i32 {\n    if b == 0 {\n        return 0;\n    }\n    a / b\n}\nfn main() {\n    println!(\"{}\", safe_divide(10, 2));\n    println!(\"{}\", safe_divide(10, 0));\n}",
            "exampleLanguage": "rust",
            "mistake": "Handling the error case last, deep inside nested ifs, instead of at the top.",
            "bug": {
              "prompt": "What is a guard clause?",
              "buggyCode": "fn main() {\n    println!(\"early return check\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a loop guard\");\n}",
              "explanation": "A guard clause is an early check that returns before the main logic runs."
            },
            "exercise": {
              "title": "Guard quiz",
              "type": "multiple-choice",
              "instructions": "What is a guard clause?",
              "starterCode": "",
              "solution": "An early check that returns before the main logic runs",
              "solutionExplanation": "Guard clauses handle edge cases up front with an early return.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "An early check that returns before the main logic runs",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "An early check that returns before the main logic runs",
                "A loop that guards a variable",
                "A type of match arm",
                "A compiler warning"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-control-flow-m2-l3",
            "slug": "rust-control-flow-m2-l3",
            "title": "Boolean Variables",
            "concept": "Storing a condition in a named bool variable, like let is_adult = age >= 18, makes an if read like plain language. The name documents what the condition means, so the if itself needs no comment.",
            "syntax": "let is_adult = age >= 18;",
            "exampleCode": "fn main() {\n    let age = 20;\n    let is_adult = age >= 18;\n    if is_adult {\n        println!(\"adult\");\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Recomputing the same condition in several places instead of naming it once.",
            "bug": {
              "prompt": "Why store a condition in a bool variable?",
              "buggyCode": "fn main() {\n    println!(\"to name it\");\n}",
              "fixedCode": "fn main() {\n    println!(\"to speed it up\");\n}",
              "explanation": "A named bool documents what the condition means and avoids repeating it."
            },
            "exercise": {
              "title": "Adult check program",
              "type": "write-code",
              "instructions": "Write a program that stores is_adult = age >= 18 for age 20 and prints `adult` when true.",
              "starterCode": "fn main() {\n    let age = 20;\n    // TODO: name the condition and check it\n}",
              "solution": "fn main() {\n    let age = 20;\n    let is_adult = age >= 18;\n    if is_adult {\n        println!(\"adult\");\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "adult",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "adult",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-control-flow-m2-l4",
            "slug": "rust-control-flow-m2-l4",
            "title": "Ternary-Style If",
            "concept": "Rust has no ternary ?: operator; a plain if expression does the same job and is clearer. Writing let x = if c { a } else { b } is the idiomatic Rust way to pick between two values.",
            "syntax": "let m = if a > b { a } else { b };",
            "exampleCode": "fn main() {\n    let a = 7;\n    let b = 3;\n    let m = if a > b { a } else { b };\n    println!(\"max {}\", m);\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to use C-style `a > b ? a : b`, which Rust does not have.",
            "bug": {
              "prompt": "How do you pick between two values in Rust?",
              "buggyCode": "fn main() {\n    println!(\"ternary ?:\");\n}",
              "fixedCode": "fn main() {\n    println!(\"if expression\");\n}",
              "explanation": "Rust uses an if expression for this; there is no ?: operator."
            },
            "exercise": {
              "title": "Ternary quiz",
              "type": "multiple-choice",
              "instructions": "How do you pick between two values in Rust?",
              "starterCode": "",
              "solution": "With an if expression",
              "solutionExplanation": "Rust has no ternary operator; use let x = if c { a } else { b };.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "With an if expression",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "With an if expression",
                "With the ?: operator",
                "With a switch statement",
                "With a loop"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-control-flow-m2-l5",
            "slug": "rust-control-flow-m2-l5",
            "title": "Combining Conditions",
            "concept": "Real decisions combine several comparisons with && and ||, and parentheses control which parts group together. Writing the combined condition once, in a named bool, keeps a long if readable.",
            "syntax": "let can_drive = age >= 16 && has_licence;",
            "exampleCode": "fn main() {\n    let age = 18;\n    let has_licence = true;\n    let can_drive = age >= 16 && has_licence;\n    if can_drive {\n        println!(\"can drive\");\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting parentheses so && and || group in a surprising order.",
            "bug": {
              "prompt": "What does `age >= 16 && has_licence` mean?",
              "buggyCode": "fn main() {\n    println!(\"either is true\");\n}",
              "fixedCode": "fn main() {\n    println!(\"both are true\");\n}",
              "explanation": "&& needs both sides true, so the driver must be old enough and licensed."
            },
            "exercise": {
              "title": "Drive check program",
              "type": "write-code",
              "instructions": "Write a program that prints `can drive` when age 18 >= 16 and has_licence are both true.",
              "starterCode": "fn main() {\n    let age = 18;\n    let has_licence = true;\n    // TODO: combine the conditions\n}",
              "solution": "fn main() {\n    let age = 18;\n    let has_licence = true;\n    let can_drive = age >= 16 && has_licence;\n    if can_drive {\n        println!(\"can drive\");\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "can drive",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "can drive",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Grade classifier",
      "type": "write-code",
      "instructions": "Write a program with a grade(score) function using if/else-if chains (80+ A, 70+ B, 50+ C, else F) that prints `85: A`, `72: B`, `55: C`, `40: F`.",
      "starterCode": "fn grade(score: i32) -> &'static str {\n    // TODO: classify the score\n    \"F\"\n}\nfn main() {\n    // TODO: print each score and grade\n}",
      "solution": "fn grade(score: i32) -> &'static str {\n    if score >= 80 {\n        \"A\"\n    } else if score >= 70 {\n        \"B\"\n    } else if score >= 50 {\n        \"C\"\n    } else {\n        \"F\"\n    }\n}\nfn main() {\n    for score in [85, 72, 55, 40] {\n        println!(\"{}: {}\", score, grade(score));\n    }\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "85: A\n72: B\n55: C\n40: F",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "85: A",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Grade Classifier",
      "description": "Build a program that classifies a score into a grade using if chains and combined conditions.",
      "requirements": [
        "Program classifies 85 as A, 72 as B, 55 as C, and 40 as F",
        "Program prints each score with its grade",
        "Program uses a named bool for the pass condition",
        "Program handles the boundary score 50 correctly"
      ],
      "rubric": [
        "All four grades are correct",
        "Pass condition is named",
        "Boundary is handled",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-loops",
    "slug": "rust-loops",
    "language": "rust",
    "category": "languages",
    "title": "Loops in Rust",
    "description": "Repeat work with loop, while, and for, and control them with break, continue, and labels.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "Writing loop and while",
      "Using for over ranges",
      "Iterating collections",
      "Breaking with a value",
      "Using continue",
      "Labelling nested loops"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to repeat a chorus in a song: the same part plays again until the song says stop.",
    "modules": [
      {
        "id": "rust-loops-m1",
        "title": "Fundamentals of Loops in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-loops-m1-l1",
            "slug": "rust-loops-m1-l1",
            "title": "Loop Forever with loop",
            "concept": "The loop keyword repeats its block forever until a break stops it, which is ideal for servers and games that run until told to stop. Every loop needs a break reachable in practice, or the program never ends.",
            "syntax": "loop { if done { break; } }",
            "exampleCode": "fn main() {\n    let mut n = 0;\n    loop {\n        n += 1;\n        if n == 3 {\n            break;\n        }\n    }\n    println!(\"stopped at {}\", n);\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing loop with no break at all, so the program hangs.",
            "bug": {
              "prompt": "How do you stop a loop block?",
              "buggyCode": "fn main() {\n    println!(\"return\");\n}",
              "fixedCode": "fn main() {\n    println!(\"break\");\n}",
              "explanation": "break exits the innermost loop immediately."
            },
            "exercise": {
              "title": "Loop stop program",
              "type": "write-code",
              "instructions": "Write a program that loops, increments n, breaks at 3, and prints `stopped at 3`.",
              "starterCode": "fn main() {\n    let mut n = 0;\n    // TODO: loop until 3\n}",
              "solution": "fn main() {\n    let mut n = 0;\n    loop {\n        n += 1;\n        if n == 3 {\n            break;\n        }\n    }\n    println!(\"stopped at {}\", n);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "stopped at 3",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "stopped at 3",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-loops-m1-l2",
            "slug": "rust-loops-m1-l2",
            "title": "While Loops",
            "concept": "A while loop repeats its body as long as its condition stays true, checking the condition before each run. It suits situations where you do not know in advance how many times the loop will run.",
            "syntax": "while n < 5 { n += 1; }",
            "exampleCode": "fn main() {\n    let mut n = 0;\n    while n < 3 {\n        n += 1;\n        println!(\"n is {}\", n);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting to change the variable the condition depends on, so the loop never ends.",
            "bug": {
              "prompt": "When does a while loop stop?",
              "buggyCode": "fn main() {\n    println!(\"condition false\");\n}",
              "fixedCode": "fn main() {\n    println!(\"after one run\");\n}",
              "explanation": "The loop checks its condition before each iteration and stops when it becomes false."
            },
            "exercise": {
              "title": "While count program",
              "type": "write-code",
              "instructions": "Write a program that counts n from 0 while n < 3, printing `n is 1`, `n is 2`, `n is 3`.",
              "starterCode": "fn main() {\n    let mut n = 0;\n    // TODO: while loop\n}",
              "solution": "fn main() {\n    let mut n = 0;\n    while n < 3 {\n        n += 1;\n        println!(\"n is {}\", n);\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "n is 1\nn is 2\nn is 3",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "n is 1",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-loops-m1-l3",
            "slug": "rust-loops-m1-l3",
            "title": "For Loops and Ranges",
            "concept": "A for loop walks over a range or a collection, as in for i in 0..3, and the loop variable takes each value in turn. Ranges with .. are exclusive of the end, while ..= includes it.",
            "syntax": "for i in 0..3 { println!(\"{}\", i); }",
            "exampleCode": "fn main() {\n    for i in 0..3 {\n        println!(\"i is {}\", i);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Expecting 0..3 to include 3, when it stops at 2.",
            "bug": {
              "prompt": "Which values does 0..3 produce?",
              "buggyCode": "fn main() {\n    println!(\"0 1 2 3\");\n}",
              "fixedCode": "fn main() {\n    println!(\"0 1 2\");\n}",
              "explanation": "A range with .. excludes its end, so 0..3 gives 0, 1, 2."
            },
            "exercise": {
              "title": "Range quiz",
              "type": "multiple-choice",
              "instructions": "Which values does 0..3 produce?",
              "starterCode": "",
              "solution": "0, 1, 2",
              "solutionExplanation": "The .. range is exclusive of its end.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "0, 1, 2",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "0, 1, 2",
                "0, 1, 2, 3",
                "1, 2, 3",
                "3, 2, 1, 0"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-loops-m1-l4",
            "slug": "rust-loops-m1-l4",
            "title": "Looping Over a Collection",
            "concept": "A for loop over a collection visits each element, as in for item in &items, and borrowing with & avoids moving the values. This is the idiomatic way to process every element of a Vec or an array.",
            "syntax": "for item in &items { println!(\"{}\", item); }",
            "exampleCode": "fn main() {\n    let items = [10, 20, 30];\n    for item in &items {\n        println!(\"item {}\", item);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Looping by value over a collection you still need afterwards, which moves it.",
            "bug": {
              "prompt": "Why write for item in &items instead of for item in items?",
              "buggyCode": "fn main() {\n    println!(\"to borrow\");\n}",
              "fixedCode": "fn main() {\n    println!(\"to copy\");\n}",
              "explanation": "& borrows each element, so the collection can still be used after the loop."
            },
            "exercise": {
              "title": "Collection loop program",
              "type": "write-code",
              "instructions": "Write a program that loops over [10, 20, 30] by reference and prints `item 10`, `item 20`, `item 30`.",
              "starterCode": "fn main() {\n    let items = [10, 20, 30];\n    // TODO: loop over items\n}",
              "solution": "fn main() {\n    let items = [10, 20, 30];\n    for item in &items {\n        println!(\"item {}\", item);\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "item 10\nitem 20\nitem 30",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "item 10",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-loops-m1-l5",
            "slug": "rust-loops-m1-l5",
            "title": "Break with a Value",
            "concept": "A loop is an expression, so break 42 makes the whole loop evaluate to 42. This pattern is handy for search loops: break out with the found value, or keep looping.",
            "syntax": "let x = loop { break 42; };",
            "exampleCode": "fn main() {\n    let mut n = 0;\n    let found = loop {\n        n += 1;\n        if n * n > 20 {\n            break n;\n        }\n    };\n    println!(\"found {}\", found);\n}",
            "exampleLanguage": "rust",
            "mistake": "Breaking without a value when the loop is used as an expression, so the types do not match.",
            "bug": {
              "prompt": "What does `break 42` do inside a loop used as a value?",
              "buggyCode": "fn main() {\n    println!(\"returns 42\");\n}",
              "fixedCode": "fn main() {\n    println!(\"prints 42\");\n}",
              "explanation": "break with a value makes the loop expression evaluate to that value."
            },
            "exercise": {
              "title": "Break value quiz",
              "type": "multiple-choice",
              "instructions": "What does `break 42` do inside a loop used as a value?",
              "starterCode": "",
              "solution": "It makes the loop expression evaluate to 42",
              "solutionExplanation": "A loop is an expression, so break value supplies its value.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It makes the loop expression evaluate to 42",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "It makes the loop expression evaluate to 42",
                "It prints 42 and continues",
                "It skips to the next iteration",
                "It restarts the loop"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-loops-m2",
        "title": "Applying Loops in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-loops-m2-l1",
            "slug": "rust-loops-m2-l1",
            "title": "Continue",
            "concept": "The continue keyword skips the rest of the current iteration and starts the next one, including re-checking a while condition. It is useful for skipping values you do not want to process without nesting the rest of the body.",
            "syntax": "for i in 0..5 { if i == 2 { continue; } println!(\"{}\", i); }",
            "exampleCode": "fn main() {\n    for i in 0..5 {\n        if i == 2 {\n            continue;\n        }\n        println!(\"{}\", i);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Confusing continue with break: continue skips one iteration, break ends the loop.",
            "bug": {
              "prompt": "What does continue do?",
              "buggyCode": "fn main() {\n    println!(\"ends loop\");\n}",
              "fixedCode": "fn main() {\n    println!(\"next iteration\");\n}",
              "explanation": "continue jumps to the next iteration of the loop."
            },
            "exercise": {
              "title": "Skip two program",
              "type": "write-code",
              "instructions": "Write a program that prints 0, 1, 3, 4 by skipping 2 with continue in a 0..5 loop.",
              "starterCode": "fn main() {\n    // TODO: loop with continue\n}",
              "solution": "fn main() {\n    for i in 0..5 {\n        if i == 2 {\n            continue;\n        }\n        println!(\"{}\", i);\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "0\n1\n3\n4",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "0",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-loops-m2-l2",
            "slug": "rust-loops-m2-l2",
            "title": "Counting with a Range",
            "concept": "The range 1..=5 includes both ends, which reads naturally when you count from 1 to 5. Choosing .. or ..= is a common source of off-by-one errors, so always check the first and last values a loop produces.",
            "syntax": "for i in 1..=5 { println!(\"{}\", i); }",
            "exampleCode": "fn main() {\n    let mut total = 0;\n    for i in 1..=5 {\n        total += i;\n    }\n    println!(\"total {}\", total);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using 1..5 when you meant to include 5, and getting a total that is 5 too small.",
            "bug": {
              "prompt": "Which range includes 5 when counting from 1?",
              "buggyCode": "fn main() {\n    println!(\"1..5\");\n}",
              "fixedCode": "fn main() {\n    println!(\"1..=5\");\n}",
              "explanation": "The ..= range is inclusive, so 1..=5 gives 1, 2, 3, 4, 5."
            },
            "exercise": {
              "title": "Sum range program",
              "type": "write-code",
              "instructions": "Write a program that sums 1..=5 in a for loop and prints `total 15`.",
              "starterCode": "fn main() {\n    let mut total = 0;\n    // TODO: sum 1 to 5\n}",
              "solution": "fn main() {\n    let mut total = 0;\n    for i in 1..=5 {\n        total += i;\n    }\n    println!(\"total {}\", total);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "total 15",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "total 15",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-loops-m2-l3",
            "slug": "rust-loops-m2-l3",
            "title": "Nested Loops",
            "concept": "A loop inside another loop runs its full cycle for every iteration of the outer loop, which is how you visit every cell of a grid. Labelled breaks like 'outer: loop can exit the outer loop from inside.",
            "syntax": "for r in 0..2 { for c in 0..2 { println!(\"{} {}\", r, c); } }",
            "exampleCode": "fn main() {\n    for r in 0..2 {\n        for c in 0..2 {\n            println!(\"{} {}\", r, c);\n        }\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting that the inner loop restarts from its beginning on every outer iteration.",
            "bug": {
              "prompt": "How many times does the inner body run for 2 outer and 3 inner iterations?",
              "buggyCode": "fn main() {\n    println!(\"5\");\n}",
              "fixedCode": "fn main() {\n    println!(\"6\");\n}",
              "explanation": "The inner loop runs fully for each outer iteration, so 2 times 3 is 6."
            },
            "exercise": {
              "title": "Nested loop quiz",
              "type": "multiple-choice",
              "instructions": "How many times does the inner body run for 2 outer and 3 inner iterations?",
              "starterCode": "",
              "solution": "6",
              "solutionExplanation": "The inner loop restarts for every outer iteration: 2 x 3 = 6.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "6",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "6",
                "5",
                "3",
                "2"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-loops-m2-l4",
            "slug": "rust-loops-m2-l4",
            "title": "Loop Labels",
            "concept": "A label like 'outer: placed before a loop lets break 'outer exit that specific loop from deep inside nested loops. Labels make the target of a break explicit, which is clearer than restructuring the code to avoid nesting.",
            "syntax": "'outer: loop { break 'outer; }",
            "exampleCode": "fn main() {\n    let mut found = 0;\n    'outer: for r in 0..3 {\n        for c in 0..3 {\n            if r == 1 && c == 1 {\n                found = 11;\n                break 'outer;\n            }\n        }\n    }\n    println!(\"found {}\", found);\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing break without a label and only exiting the inner loop when you meant to stop everything.",
            "bug": {
              "prompt": "What does break 'outer do?",
              "buggyCode": "fn main() {\n    println!(\"exits inner\");\n}",
              "fixedCode": "fn main() {\n    println!(\"exits labelled loop\");\n}",
              "explanation": "A labelled break exits the loop carrying that label, even from inside nested loops."
            },
            "exercise": {
              "title": "Labelled break program",
              "type": "write-code",
              "instructions": "Write a program that searches a 3x3 grid, breaks 'outer at r=1, c=1, and prints `found 11`.",
              "starterCode": "fn main() {\n    let mut found = 0;\n    // TODO: nested loops with a label\n}",
              "solution": "fn main() {\n    let mut found = 0;\n    'outer: for r in 0..3 {\n        for c in 0..3 {\n            if r == 1 && c == 1 {\n                found = 11;\n                break 'outer;\n            }\n        }\n    }\n    println!(\"found {}\", found);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "found 11",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "found 11",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-loops-m2-l5",
            "slug": "rust-loops-m2-l5",
            "title": "Choosing the Right Loop",
            "concept": "Use for when you know the values to visit, while when the count is unknown, and loop when you need a break in the middle. Picking the loop that matches the shape of the problem makes the exit condition obvious and the code shorter.",
            "syntax": "for x in items { /* known set */ }",
            "exampleCode": "fn main() {\n    let mut total = 0;\n    for n in [2, 4, 6] {\n        total += n;\n    }\n    println!(\"total {}\", total);\n}",
            "exampleLanguage": "rust",
            "mistake": "Reaching for loop with a manual counter when a for loop over a range would say the same thing.",
            "bug": {
              "prompt": "Which loop fits visiting every element of a known list?",
              "buggyCode": "fn main() {\n    println!(\"while\");\n}",
              "fixedCode": "fn main() {\n    println!(\"for\");\n}",
              "explanation": "for is designed to visit each item of a collection or range in turn."
            },
            "exercise": {
              "title": "Known list sum program",
              "type": "write-code",
              "instructions": "Write a program that sums [2, 4, 6] with a for loop and prints `total 12`.",
              "starterCode": "fn main() {\n    let mut total = 0;\n    // TODO: for loop over the list\n}",
              "solution": "fn main() {\n    let mut total = 0;\n    for n in [2, 4, 6] {\n        total += n;\n    }\n    println!(\"total {}\", total);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "total 12",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "total 12",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Number cruncher",
      "type": "write-code",
      "instructions": "Write a program that sums 1..=10 into total, sums 1..=10 skipping multiples of 3 into skipped, and prints `total 55` and `skipped 37`.",
      "starterCode": "fn main() {\n    // TODO: two sums with loops\n}",
      "solution": "fn main() {\n    let mut total = 0;\n    let mut skipped = 0;\n    for i in 1..=10 {\n        total += i;\n        if i % 3 != 0 {\n            skipped += i;\n        }\n    }\n    println!(\"total {}\", total);\n    println!(\"skipped {}\", skipped);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "total 55\nskipped 37",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "total 55",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Number Cruncher",
      "description": "Build a program that sums numbers, skips some, and searches a grid using loops.",
      "requirements": [
        "Program sums 1..=10 and prints 55",
        "Program skips multiples of 3 while summing",
        "Program finds a value in a nested loop with a label",
        "Program prints all results with labels"
      ],
      "rubric": [
        "Sum of 1..=10 is 55",
        "Skipped values are excluded",
        "Labelled break is used",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-ownership-basics",
    "slug": "rust-ownership-basics",
    "language": "rust",
    "category": "languages",
    "title": "Ownership Basics",
    "description": "Learn Rust ownership: one owner, moves, copies, clones, and dropping at scope end.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Explaining ownership rules",
      "Distinguishing stack and heap",
      "Moving values",
      "Copying small types",
      "Cloning heap data",
      "Returning ownership"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like lending a book: only one person holds it at a time, and you get it back when they are done.",
    "modules": [
      {
        "id": "rust-ownership-basics-m1",
        "title": "Fundamentals of Ownership Basics",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-ownership-basics-m1-l1",
            "slug": "rust-ownership-basics-m1-l1",
            "title": "What Ownership Means",
            "concept": "Ownership is Rust's system for managing memory without a garbage collector: every value has exactly one owner, and the value is freed when its owner goes out of scope. This rule is checked at compile time, so memory errors become compiler errors instead of crashes.",
            "syntax": "let s = String::from(\"hi\"); // s owns the string",
            "exampleCode": "fn main() {\n    let s = String::from(\"hello\");\n    println!(\"owner holds {}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Thinking ownership is about who wrote the code, rather than which variable is responsible for freeing a value.",
            "bug": {
              "prompt": "How many owners can a value have in Rust?",
              "buggyCode": "fn main() {\n    println!(\"many\");\n}",
              "fixedCode": "fn main() {\n    println!(\"exactly one\");\n}",
              "explanation": "Every value has exactly one owner at a time in Rust."
            },
            "exercise": {
              "title": "Owner quiz",
              "type": "multiple-choice",
              "instructions": "How many owners can a value have in Rust?",
              "starterCode": "",
              "solution": "Exactly one",
              "solutionExplanation": "Ownership rule one: each value has a single owner.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Exactly one",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Exactly one",
                "As many as you like",
                "Two at most",
                "None, values own themselves"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-ownership-basics-m1-l2",
            "slug": "rust-ownership-basics-m1-l2",
            "title": "Stack and Heap",
            "concept": "The stack stores fixed-size values in last-in-first-out order, while the heap stores values whose size is unknown at compile time, like String. Pushing to the stack is fast, and heap values are reached through a pointer stored on the stack.",
            "syntax": "let x = 5; // stack\nlet s = String::from(\"hi\"); // heap",
            "exampleCode": "fn main() {\n    let x = 5;\n    let s = String::from(\"heap\");\n    println!(\"{} {}\", x, s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming a String lives entirely on the stack because its variable is declared like an integer.",
            "bug": {
              "prompt": "Where does a String's text live?",
              "buggyCode": "fn main() {\n    println!(\"stack\");\n}",
              "fixedCode": "fn main() {\n    println!(\"heap\");\n}",
              "explanation": "A String stores its characters on the heap and keeps a pointer, length, and capacity on the stack."
            },
            "exercise": {
              "title": "Stack heap program",
              "type": "write-code",
              "instructions": "Write a program that declares x = 5 on the stack and s = String::from(\"heap\") and prints `5 heap`.",
              "starterCode": "fn main() {\n    // TODO: declare both values\n}",
              "solution": "fn main() {\n    let x = 5;\n    let s = String::from(\"heap\");\n    println!(\"{} {}\", x, s);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "5 heap",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "5 heap",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-ownership-basics-m1-l3",
            "slug": "rust-ownership-basics-m1-l3",
            "title": "Move Semantics",
            "concept": "Assigning a String to another variable moves ownership: the first variable can no longer be used. The heap data is not copied, only the stack pointer is transferred, which is why moves are cheap.",
            "syntax": "let s1 = String::from(\"hi\");\nlet s2 = s1; // s1 moved",
            "exampleCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"moved to {}\", s2);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using s1 after moving it into s2, which the compiler rejects.",
            "bug": {
              "prompt": "After `let s2 = s1;` for a String, what happens to s1?",
              "buggyCode": "fn main() {\n    println!(\"still usable\");\n}",
              "fixedCode": "fn main() {\n    println!(\"moved, unusable\");\n}",
              "explanation": "Assigning a String moves ownership, so the source variable is no longer valid."
            },
            "exercise": {
              "title": "Move program",
              "type": "write-code",
              "instructions": "Write a program that moves s1 = String::from(\"hello\") into s2 and prints `moved to hello`.",
              "starterCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    // TODO: move s1 into s2 and print\n}",
              "solution": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"moved to {}\", s2);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "moved to hello",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "moved to hello",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-ownership-basics-m1-l4",
            "slug": "rust-ownership-basics-m1-l4",
            "title": "Copy Types",
            "concept": "Types that are small and stored entirely on the stack, like integers, booleans, and chars, implement the Copy trait and are copied instead of moved. After let y = x for an i32, both x and y remain usable.",
            "syntax": "let x = 5;\nlet y = x; // x still valid",
            "exampleCode": "fn main() {\n    let x = 5;\n    let y = x;\n    println!(\"{} {}\", x, y);\n}",
            "exampleLanguage": "rust",
            "mistake": "Expecting a String to behave like an integer and still be usable after assignment.",
            "bug": {
              "prompt": "After `let y = x;` where x is an i32, can you still use x?",
              "buggyCode": "fn main() {\n    println!(\"no, moved\");\n}",
              "fixedCode": "fn main() {\n    println!(\"yes, copied\");\n}",
              "explanation": "Integers implement Copy, so assignment copies the value and both variables stay valid."
            },
            "exercise": {
              "title": "Copy quiz",
              "type": "multiple-choice",
              "instructions": "After `let y = x;` where x is an i32, can you still use x?",
              "starterCode": "",
              "solution": "Yes, integers are copied",
              "solutionExplanation": "i32 implements Copy, so assignment copies rather than moves.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Yes, integers are copied",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Yes, integers are copied",
                "No, x was moved",
                "Only inside the same function",
                "Only if x is mutable"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-ownership-basics-m1-l5",
            "slug": "rust-ownership-basics-m1-l5",
            "title": "Clone for Deep Copies",
            "concept": "Calling .clone() on a String makes a deep copy: new heap memory is allocated and the characters are copied into it. Cloning is explicit because it costs time and memory, so Rust makes you ask for it.",
            "syntax": "let s2 = s1.clone(); // both valid",
            "exampleCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1.clone();\n    println!(\"{} {}\", s1, s2);\n}",
            "exampleLanguage": "rust",
            "mistake": "Cloning in a hot loop and wondering why the program is slow.",
            "bug": {
              "prompt": "What does s1.clone() do for a String?",
              "buggyCode": "fn main() {\n    println!(\"moves it\");\n}",
              "fixedCode": "fn main() {\n    println!(\"deep copy\");\n}",
              "explanation": "clone allocates fresh heap memory and copies the characters, so both strings stay valid."
            },
            "exercise": {
              "title": "Clone program",
              "type": "write-code",
              "instructions": "Write a program that clones s1 = String::from(\"hello\") into s2 and prints `hello hello`.",
              "starterCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    // TODO: clone s1 and print both\n}",
              "solution": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1.clone();\n    println!(\"{} {}\", s1, s2);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "hello hello",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "hello hello",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-ownership-basics-m2",
        "title": "Applying Ownership Basics",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-ownership-basics-m2-l1",
            "slug": "rust-ownership-basics-m2-l1",
            "title": "Scope and Drop",
            "concept": "A value is dropped, its memory freed, when its owner goes out of scope at the closing brace of its block. Rust inserts the drop automatically, so you never call free yourself and never forget to.",
            "syntax": "fn main() { let s = String::from(\"hi\"); } // s dropped here",
            "exampleCode": "fn main() {\n    {\n        let s = String::from(\"inner\");\n        println!(\"{}\", s);\n    }\n    println!(\"inner dropped\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to use a value after its block ended, when it has already been dropped.",
            "bug": {
              "prompt": "When is a value's memory freed in Rust?",
              "buggyCode": "fn main() {\n    println!(\"at program end\");\n}",
              "fixedCode": "fn main() {\n    println!(\"when owner leaves scope\");\n}",
              "explanation": "Rust frees a value automatically when its owner goes out of scope."
            },
            "exercise": {
              "title": "Drop scope program",
              "type": "write-code",
              "instructions": "Write a program that creates s = String::from(\"inner\") in a block, prints `inner`, then prints `inner dropped` after the block.",
              "starterCode": "fn main() {\n    // TODO: inner block with a String\n}",
              "solution": "fn main() {\n    {\n        let s = String::from(\"inner\");\n        println!(\"{}\", s);\n    }\n    println!(\"inner dropped\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "inner\ninner dropped",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "inner",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-ownership-basics-m2-l2",
            "slug": "rust-ownership-basics-m2-l2",
            "title": "Ownership and Functions",
            "concept": "Passing a String to a function moves ownership into the function, so the caller cannot use it afterwards. Passing a Copy type like i32 copies it instead, and returning a value from a function moves ownership back to the caller.",
            "syntax": "fn take(s: String) { println!(\"{}\", s); }",
            "exampleCode": "fn take(s: String) {\n    println!(\"took {}\", s);\n}\nfn main() {\n    let s = String::from(\"gift\");\n    take(s);\n    println!(\"given away\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Calling take(s) and then using s, forgetting the function now owns it.",
            "bug": {
              "prompt": "What happens when you pass a String to a function?",
              "buggyCode": "fn main() {\n    println!(\"it is copied\");\n}",
              "fixedCode": "fn main() {\n    println!(\"ownership moves\");\n}",
              "explanation": "Passing a String moves ownership into the function, so the caller loses it."
            },
            "exercise": {
              "title": "Take function program",
              "type": "write-code",
              "instructions": "Write a program with take(s: String) that prints `took gift`, called with String::from(\"gift\"), then prints `given away`.",
              "starterCode": "fn take(s: String) {\n    // TODO: print the taken value\n}\nfn main() {\n    let s = String::from(\"gift\");\n    take(s);\n    println!(\"given away\");\n}",
              "solution": "fn take(s: String) {\n    println!(\"took {}\", s);\n}\nfn main() {\n    let s = String::from(\"gift\");\n    take(s);\n    println!(\"given away\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "took gift\ngiven away",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "took gift",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-ownership-basics-m2-l3",
            "slug": "rust-ownership-basics-m2-l3",
            "title": "Returning Ownership",
            "concept": "A function can return a value it created or received, moving ownership to its caller. This is how a function gives a String back instead of keeping it, and it is the usual way to build a value in a helper.",
            "syntax": "fn make() -> String { String::from(\"new\") }",
            "exampleCode": "fn make() -> String {\n    String::from(\"fresh\")\n}\nfn main() {\n    let s = make();\n    println!(\"got {}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Returning a reference to a local value, which would dangle once the function returns.",
            "bug": {
              "prompt": "How does a function give ownership of a new String to its caller?",
              "buggyCode": "fn main() {\n    println!(\"return it\");\n}",
              "fixedCode": "fn main() {\n    println!(\"clone it first\");\n}",
              "explanation": "Returning the String moves ownership to the caller."
            },
            "exercise": {
              "title": "Make function program",
              "type": "write-code",
              "instructions": "Write a program with make() -> String returning String::from(\"fresh\"), printing `got fresh`.",
              "starterCode": "fn make() -> String {\n    // TODO: return a fresh String\n    String::new()\n}\nfn main() {\n    let s = make();\n    println!(\"got {}\", s);\n}",
              "solution": "fn make() -> String {\n    String::from(\"fresh\")\n}\nfn main() {\n    let s = make();\n    println!(\"got {}\", s);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "got fresh",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "got fresh",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-ownership-basics-m2-l4",
            "slug": "rust-ownership-basics-m2-l4",
            "title": "Ownership in Practice",
            "concept": "In practice you move values when handing them over for good, clone when you need two copies, and borrow when you only need to look. Choosing the right one for each case is most of writing idiomatic Rust.",
            "syntax": "fn len(s: &String) -> usize { s.len() }",
            "exampleCode": "fn main() {\n    let s = String::from(\"practice\");\n    println!(\"len {}\", s.len());\n    println!(\"still {}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Moving a value into a function that only reads it, then fighting the compiler to get it back.",
            "bug": {
              "prompt": "A function only reads a String. What should it take?",
              "buggyCode": "fn main() {\n    println!(\"a String\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a &String\");\n}",
              "explanation": "A function that only reads should borrow with &String, so the caller keeps ownership."
            },
            "exercise": {
              "title": "Borrow practice quiz",
              "type": "multiple-choice",
              "instructions": "A function only reads a String. What should it take?",
              "starterCode": "",
              "solution": "A reference, &String",
              "solutionExplanation": "Borrowing with & lets the function read without taking ownership.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A reference, &String",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "A reference, &String",
                "Ownership of the String",
                "A clone of the String",
                "A raw pointer"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-ownership-basics-m2-l5",
            "slug": "rust-ownership-basics-m2-l5",
            "title": "Ownership Rules Summary",
            "concept": "The three ownership rules are: each value has one owner; there can only be one owner at a time; and the value is dropped when the owner goes out of scope. Every borrow-checker error you meet is one of these rules being enforced.",
            "syntax": "let s = String::from(\"rules\");",
            "exampleCode": "fn main() {\n    let a = String::from(\"one\");\n    let b = a;\n    println!(\"owner is b: {}\", b);\n    println!(\"one owner, one scope\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Treating ownership as a runtime feature you can switch off, instead of a compile-time check.",
            "bug": {
              "prompt": "Which statement is one of the ownership rules?",
              "buggyCode": "fn main() {\n    println!(\"values have many owners\");\n}",
              "fixedCode": "fn main() {\n    println!(\"dropped at scope end\");\n}",
              "explanation": "A value is dropped when its owner goes out of scope."
            },
            "exercise": {
              "title": "Rules program",
              "type": "write-code",
              "instructions": "Write a program that moves a = String::from(\"one\") into b and prints `owner is b: one` and `one owner, one scope`.",
              "starterCode": "fn main() {\n    let a = String::from(\"one\");\n    // TODO: move and print\n}",
              "solution": "fn main() {\n    let a = String::from(\"one\");\n    let b = a;\n    println!(\"owner is b: {}\", b);\n    println!(\"one owner, one scope\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "owner is b: one\none owner, one scope",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "owner is b: one",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Ownership playground",
      "type": "write-code",
      "instructions": "Write a program that moves s1 into s2 and prints `moved: hello`, clones s2 into s3 and prints `cloned: hello hello`, and calls make() returning \"fresh\" and prints `made: fresh`.",
      "starterCode": "fn make() -> String {\n    // TODO\n    String::new()\n}\nfn main() {\n    // TODO\n}",
      "solution": "fn make() -> String {\n    String::from(\"fresh\")\n}\nfn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"moved: {}\", s2);\n    let s3 = s2.clone();\n    println!(\"cloned: {} {}\", s2, s3);\n    let s4 = make();\n    println!(\"made: {}\", s4);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "moved: hello\ncloned: hello hello\nmade: fresh",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "moved: hello",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Ownership Playground",
      "description": "Build a program that moves, clones, and returns Strings, showing which variables stay valid.",
      "requirements": [
        "Program moves a String and shows the new owner",
        "Program clones a String and uses both copies",
        "Program returns a String from a function",
        "Program prints a labelled line for each step"
      ],
      "rubric": [
        "Move is demonstrated",
        "Clone keeps both copies valid",
        "Return moves ownership to the caller",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-borrowing",
    "slug": "rust-borrowing",
    "language": "rust",
    "category": "languages",
    "title": "Borrowing in Rust",
    "description": "Borrow values with & and &mut, follow the borrow rules, and avoid dangling references.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Creating references with &",
      "Borrowing in functions",
      "Using mutable references",
      "Applying the borrow rules",
      "Avoiding dangling references",
      "Understanding non-lexical lifetimes"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like borrowing a library book: you can read it, but you must give it back unchanged unless you have special permission.",
    "modules": [
      {
        "id": "rust-borrowing-m1",
        "title": "Fundamentals of Borrowing in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-borrowing-m1-l1",
            "slug": "rust-borrowing-m1-l1",
            "title": "References with &",
            "concept": "A reference, written &s, lets code use a value without taking ownership of it. The reference borrows the value for a while, and when the reference goes out of scope the original owner keeps the value.",
            "syntax": "let r = &s;",
            "exampleCode": "fn main() {\n    let s = String::from(\"borrowed\");\n    let r = &s;\n    println!(\"{} {}\", s, r);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a value after it was moved, when a reference would have kept it alive.",
            "bug": {
              "prompt": "What does &s create?",
              "buggyCode": "fn main() {\n    println!(\"a copy\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a reference\");\n}",
              "explanation": "&s borrows s without taking ownership."
            },
            "exercise": {
              "title": "Reference program",
              "type": "write-code",
              "instructions": "Write a program that borrows s = String::from(\"borrowed\") as r and prints `borrowed borrowed`.",
              "starterCode": "fn main() {\n    let s = String::from(\"borrowed\");\n    // TODO: borrow s\n}",
              "solution": "fn main() {\n    let s = String::from(\"borrowed\");\n    let r = &s;\n    println!(\"{} {}\", s, r);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "borrowed borrowed",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "borrowed borrowed",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-borrowing-m1-l2",
            "slug": "rust-borrowing-m1-l2",
            "title": "Borrowing in Functions",
            "concept": "A function that takes &String borrows its argument: the caller keeps ownership and can use the value after the call. This is the most common function signature in Rust, because most functions only need to look at their inputs.",
            "syntax": "fn len(s: &String) -> usize { s.len() }",
            "exampleCode": "fn len(s: &String) -> usize {\n    s.len()\n}\nfn main() {\n    let s = String::from(\"hello\");\n    println!(\"len {} still {}\", len(&s), s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Passing s instead of &s to a function that only needs a reference, and losing ownership by accident.",
            "bug": {
              "prompt": "How do you pass a String to a function without giving up ownership?",
              "buggyCode": "fn main() {\n    println!(\"pass s\");\n}",
              "fixedCode": "fn main() {\n    println!(\"pass &s\");\n}",
              "explanation": "Passing &s borrows the string, so the caller keeps it."
            },
            "exercise": {
              "title": "Borrow length program",
              "type": "write-code",
              "instructions": "Write a program with len(s: &String) -> usize that prints `len 5 still hello` for \"hello\".",
              "starterCode": "fn len(s: &String) -> usize {\n    // TODO: return the length\n    0\n}\nfn main() {\n    let s = String::from(\"hello\");\n    println!(\"len {} still {}\", len(&s), s);\n}",
              "solution": "fn len(s: &String) -> usize {\n    s.len()\n}\nfn main() {\n    let s = String::from(\"hello\");\n    println!(\"len {} still {}\", len(&s), s);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "len 5 still hello",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "len 5 still hello",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-borrowing-m1-l3",
            "slug": "rust-borrowing-m1-l3",
            "title": "Mutable References",
            "concept": "A mutable reference, written &mut s, lets code change the borrowed value, but only one mutable reference may exist at a time. This rule is what makes data races impossible: a value is either shared read-only or exclusively writable, never both.",
            "syntax": "let r = &mut s;\nr.push_str(\"!\");",
            "exampleCode": "fn main() {\n    let mut s = String::from(\"hello\");\n    let r = &mut s;\n    r.push_str(\"!\");\n    println!(\"{}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Creating two mutable references to the same value at the same time.",
            "bug": {
              "prompt": "How many mutable references to one value may exist at once?",
              "buggyCode": "fn main() {\n    println!(\"two\");\n}",
              "fixedCode": "fn main() {\n    println!(\"one\");\n}",
              "explanation": "At most one mutable reference may exist at a time."
            },
            "exercise": {
              "title": "Mutable borrow quiz",
              "type": "multiple-choice",
              "instructions": "How many mutable references to one value may exist at once?",
              "starterCode": "",
              "solution": "One",
              "solutionExplanation": "Rust allows exactly one mutable reference at a time.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "One",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "One",
                "Two",
                "As many as you like",
                "None"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-borrowing-m1-l4",
            "slug": "rust-borrowing-m1-l4",
            "title": "Borrow Rules",
            "concept": "The borrow rules are: any number of immutable references, or exactly one mutable reference, but never both at once, and references must always be valid. These rules are checked at compile time, so a program that compiles cannot have a dangling reference.",
            "syntax": "let r1 = &s; let r2 = &s; // ok",
            "exampleCode": "fn main() {\n    let s = String::from(\"rules\");\n    let r1 = &s;\n    let r2 = &s;\n    println!(\"{} {}\", r1, r2);\n}",
            "exampleLanguage": "rust",
            "mistake": "Holding an immutable reference while trying to create a mutable one.",
            "bug": {
              "prompt": "Which combination is allowed?",
              "buggyCode": "fn main() {\n    println!(\"two mutable refs\");\n}",
              "fixedCode": "fn main() {\n    println!(\"many immutable refs\");\n}",
              "explanation": "Many immutable references are fine; two mutable ones are not."
            },
            "exercise": {
              "title": "Two borrows program",
              "type": "write-code",
              "instructions": "Write a program that takes two immutable references to s = String::from(\"rules\") and prints `rules rules`.",
              "starterCode": "fn main() {\n    let s = String::from(\"rules\");\n    // TODO: two immutable borrows\n}",
              "solution": "fn main() {\n    let s = String::from(\"rules\");\n    let r1 = &s;\n    let r2 = &s;\n    println!(\"{} {}\", r1, r2);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "rules rules",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "rules rules",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-borrowing-m1-l5",
            "slug": "rust-borrowing-m1-l5",
            "title": "Dangling References",
            "concept": "A dangling reference points to memory that has already been freed, and Rust refuses to create one. The classic example is returning a reference to a value created inside a function: the value is dropped when the function returns, so the reference would point nowhere.",
            "syntax": "fn dangle() -> &String { &String::from(\"x\") } // error",
            "exampleCode": "fn main() {\n    let s = String::from(\"safe\");\n    let r = &s;\n    println!(\"{} {}\", s, r);\n}",
            "exampleLanguage": "rust",
            "mistake": "Returning a reference to a local variable from a function.",
            "bug": {
              "prompt": "Why does Rust reject returning a reference to a local value?",
              "buggyCode": "fn main() {\n    println!(\"it would dangle\");\n}",
              "fixedCode": "fn main() {\n    println!(\"it is too slow\");\n}",
              "explanation": "The local is dropped when the function returns, so the reference would point at freed memory."
            },
            "exercise": {
              "title": "Dangling quiz",
              "type": "multiple-choice",
              "instructions": "Why does Rust reject returning a reference to a local value?",
              "starterCode": "",
              "solution": "The local is dropped when the function returns, so the reference would dangle",
              "solutionExplanation": "A reference to a dropped local would dangle, so the compiler rejects it.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The local is dropped when the function returns, so the reference would dangle",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "The local is dropped when the function returns, so the reference would dangle",
                "Functions cannot return references",
                "Local values are always moved",
                "The borrow checker is too strict"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-borrowing-m2",
        "title": "Applying Borrowing in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-borrowing-m2-l1",
            "slug": "rust-borrowing-m2-l1",
            "title": "Borrowing and Mutation",
            "concept": "You cannot mutate a value while immutable references to it exist, because readers would see the value change under them. Once the last immutable reference's use ends, a mutable borrow becomes possible again.",
            "syntax": "let r = &s; println!(\"{}\", r); s.push_str(\"x\");",
            "exampleCode": "fn main() {\n    let mut s = String::from(\"hi\");\n    let r = &s;\n    println!(\"{}\", r);\n    s.push_str(\"!\");\n    println!(\"{}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to push to a String while a reference to it is still in use.",
            "bug": {
              "prompt": "When can you mutably borrow a value that was immutably borrowed?",
              "buggyCode": "fn main() {\n    println!(\"any time\");\n}",
              "fixedCode": "fn main() {\n    println!(\"after last use\");\n}",
              "explanation": "A mutable borrow is allowed once the immutable borrow is no longer used."
            },
            "exercise": {
              "title": "Borrow then mutate program",
              "type": "write-code",
              "instructions": "Write a program that prints s = \"hi\" through a reference, then pushes \"!\" and prints `hi!`.",
              "starterCode": "fn main() {\n    let mut s = String::from(\"hi\");\n    // TODO: borrow, print, then mutate\n}",
              "solution": "fn main() {\n    let mut s = String::from(\"hi\");\n    let r = &s;\n    println!(\"{}\", r);\n    s.push_str(\"!\");\n    println!(\"{}\", s);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "hi\nhi!",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "hi",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-borrowing-m2-l2",
            "slug": "rust-borrowing-m2-l2",
            "title": "Non-Lexical Lifetimes",
            "concept": "Rust's borrow checker uses non-lexical lifetimes: a borrow ends at its last use, not at the end of its block. This means a reference that is no longer used stops blocking a mutable borrow, even inside the same scope.",
            "syntax": "let r = &s; println!(\"{}\", r); // borrow ends here",
            "exampleCode": "fn main() {\n    let mut s = String::from(\"nll\");\n    let r = &s;\n    println!(\"first {}\", r);\n    s.push_str(\"!\");\n    println!(\"then {}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming a borrow lasts until the closing brace and restructuring code to work around a borrow that already ended.",
            "bug": {
              "prompt": "When does a borrow end under non-lexical lifetimes?",
              "buggyCode": "fn main() {\n    println!(\"at last use\");\n}",
              "fixedCode": "fn main() {\n    println!(\"at block end\");\n}",
              "explanation": "A borrow ends at its last use, not necessarily at the end of the block."
            },
            "exercise": {
              "title": "NLL program",
              "type": "write-code",
              "instructions": "Write a program that prints s = \"nll\" through a reference, then mutates it and prints `nll!`.",
              "starterCode": "fn main() {\n    let mut s = String::from(\"nll\");\n    // TODO: use a borrow, then mutate\n}",
              "solution": "fn main() {\n    let mut s = String::from(\"nll\");\n    let r = &s;\n    println!(\"first {}\", r);\n    s.push_str(\"!\");\n    println!(\"then {}\", s);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "first nll\nthen nll!",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "first nll",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-borrowing-m2-l3",
            "slug": "rust-borrowing-m2-l3",
            "title": "References to Slices",
            "concept": "You can borrow part of a value, for example &s[0..2] borrows the first two bytes of a string. Slice references let functions work on a portion of data without copying it.",
            "syntax": "let part = &s[0..2];",
            "exampleCode": "fn main() {\n    let s = String::from(\"hello\");\n    let part = &s[0..2];\n    println!(\"part {}\", part);\n}",
            "exampleLanguage": "rust",
            "mistake": "Slicing a string at a byte index that is not a character boundary, which panics.",
            "bug": {
              "prompt": "What does &s[0..2] borrow?",
              "buggyCode": "fn main() {\n    println!(\"whole string\");\n}",
              "fixedCode": "fn main() {\n    println!(\"first two bytes\");\n}",
              "explanation": "&s[0..2] is a slice reference to the first two bytes of the string."
            },
            "exercise": {
              "title": "Slice borrow quiz",
              "type": "multiple-choice",
              "instructions": "What does &s[0..2] borrow?",
              "starterCode": "",
              "solution": "The first two bytes of the string",
              "solutionExplanation": "Indexing a string with a range borrows that byte range as a slice.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The first two bytes of the string",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "The first two bytes of the string",
                "The whole string",
                "The last two bytes",
                "A copy of the string"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-borrowing-m2-l4",
            "slug": "rust-borrowing-m2-l4",
            "title": "Passing References Around",
            "concept": "References can be passed from function to function, and each handoff is still just a borrow. The original owner keeps the value throughout, so the last function in the chain can still return it to the owner.",
            "syntax": "fn a(s: &String) { b(s); }",
            "exampleCode": "fn show(s: &String) {\n    println!(\"show {}\", s);\n}\nfn pass(s: &String) {\n    show(s);\n}\nfn main() {\n    let s = String::from(\"chain\");\n    pass(&s);\n    println!(\"kept {}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Moving the value into the first function of a chain that only needed to read it.",
            "bug": {
              "prompt": "When a chain of functions only reads a String, what should each take?",
              "buggyCode": "fn main() {\n    println!(\"String\");\n}",
              "fixedCode": "fn main() {\n    println!(\"&String\");\n}",
              "explanation": "Each function in the chain should borrow with &String."
            },
            "exercise": {
              "title": "Borrow chain program",
              "type": "write-code",
              "instructions": "Write a program where pass(&String) calls show(&String), printing `show chain` then `kept chain`.",
              "starterCode": "fn show(s: &String) {\n    // TODO\n}\nfn pass(s: &String) {\n    // TODO\n}\nfn main() {\n    let s = String::from(\"chain\");\n    pass(&s);\n    println!(\"kept {}\", s);\n}",
              "solution": "fn show(s: &String) {\n    println!(\"show {}\", s);\n}\nfn pass(s: &String) {\n    show(s);\n}\nfn main() {\n    let s = String::from(\"chain\");\n    pass(&s);\n    println!(\"kept {}\", s);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "show chain\nkept chain",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "show chain",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-borrowing-m2-l5",
            "slug": "rust-borrowing-m2-l5",
            "title": "Borrowing Checklist",
            "concept": "Before you fight the borrow checker, check three things: do you need ownership or just a look, do you need to change the value, and is any other borrow still in use. Answering those three questions resolves most borrow errors.",
            "syntax": "fn read(s: &str) { println!(\"{}\", s); }",
            "exampleCode": "fn main() {\n    let s = String::from(\"checklist\");\n    println!(\"read {}\", s);\n    println!(\"owner still {}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Reaching for clone or unsafe before checking whether a simple reference would do.",
            "bug": {
              "prompt": "What is the first question to ask about a borrow error?",
              "buggyCode": "fn main() {\n    println!(\"do I need ownership\");\n}",
              "fixedCode": "fn main() {\n    println!(\"is it a bug\");\n}",
              "explanation": "Ask whether you need ownership or just a look: most borrow errors are solved with &."
            },
            "exercise": {
              "title": "Checklist program",
              "type": "write-code",
              "instructions": "Write a program that reads s = String::from(\"checklist\") and prints `read checklist` and `owner still checklist`.",
              "starterCode": "fn main() {\n    let s = String::from(\"checklist\");\n    // TODO: print both lines\n}",
              "solution": "fn main() {\n    let s = String::from(\"checklist\");\n    println!(\"read {}\", s);\n    println!(\"owner still {}\", s);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "read checklist\nowner still checklist",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "read checklist",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Borrowing playground",
      "type": "write-code",
      "instructions": "Write a program that starts s = \"hello\", prints it through an immutable borrow as `read: hello`, mutably appends \" world\" and prints `changed: hello world`, then passes &s to a show function printing `shown: hello world`.",
      "starterCode": "fn show(s: &String) {\n    // TODO\n}\nfn main() {\n    // TODO\n}",
      "solution": "fn show(s: &String) {\n    println!(\"shown: {}\", s);\n}\nfn main() {\n    let mut s = String::from(\"hello\");\n    let r = &s;\n    println!(\"read: {}\", r);\n    s.push_str(\" world\");\n    println!(\"changed: {}\", s);\n    show(&s);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "read: hello\nchanged: hello world\nshown: hello world",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "read: hello",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Borrowing Playground",
      "description": "Build a program that borrows a String immutably and mutably in the right order and prints each step.",
      "requirements": [
        "Program borrows a String immutably and prints it",
        "Program mutably borrows the same String and changes it",
        "Program passes a reference through two functions",
        "Program prints the final value"
      ],
      "rubric": [
        "Immutable borrow is used first",
        "Mutable borrow changes the value",
        "Borrow chain works",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-references-slices",
    "slug": "rust-references-slices",
    "language": "rust",
    "category": "languages",
    "title": "References & Slices",
    "description": "Work with references, string slices, array slices, and deref coercion.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Dereferencing references",
      "Using string slices",
      "Slicing arrays",
      "Writing slice functions",
      "Iterating slices",
      "Using deref coercion"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like reading a page through a window: you can see the text without owning the book.",
    "modules": [
      {
        "id": "rust-references-slices-m1",
        "title": "Fundamentals of References & Slices",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-references-slices-m1-l1",
            "slug": "rust-references-slices-m1-l1",
            "title": "References Revisited",
            "concept": "A reference is a pointer that is guaranteed to point at a valid value, and the borrow checker enforces that guarantee. Dereferencing with * reads the value, but most code never needs to because method calls auto-dereference.",
            "syntax": "let x = 5; let r = &x; println!(\"{}\", *r);",
            "exampleCode": "fn main() {\n    let x = 5;\n    let r = &x;\n    println!(\"ref {} value {}\", r, *r);\n}",
            "exampleLanguage": "rust",
            "mistake": "Dereferencing a reference that is already auto-dereferenced by a method call, adding noise.",
            "bug": {
              "prompt": "How do you read the value behind a reference?",
              "buggyCode": "fn main() {\n    println!(\"with *\");\n}",
              "fixedCode": "fn main() {\n    println!(\"with &\");\n}",
              "explanation": "The * operator dereferences a reference to read its value."
            },
            "exercise": {
              "title": "Deref quiz",
              "type": "multiple-choice",
              "instructions": "How do you read the value behind a reference?",
              "starterCode": "",
              "solution": "With the * operator",
              "solutionExplanation": "*r dereferences the reference r.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "With the * operator",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "With the * operator",
                "With the & operator",
                "With .deref() only",
                "References cannot be read"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-references-slices-m1-l2",
            "slug": "rust-references-slices-m1-l2",
            "title": "String Slices",
            "concept": "A string slice, written &str, is a reference to a sequence of UTF-8 characters, and a string literal like \"hello\" is a &'static str. Slices let functions accept both String and literal text by taking &str.",
            "syntax": "let s: &str = \"hello\";",
            "exampleCode": "fn main() {\n    let s = String::from(\"hello world\");\n    let word: &str = &s[0..5];\n    println!(\"word {}\", word);\n}",
            "exampleLanguage": "rust",
            "mistake": "Slicing a string in the middle of a multi-byte character, which panics at runtime.",
            "bug": {
              "prompt": "What type is a string literal?",
              "buggyCode": "fn main() {\n    println!(\"String\");\n}",
              "fixedCode": "fn main() {\n    println!(\"&str\");\n}",
              "explanation": "A string literal has type &'static str, a slice borrowed for the whole program."
            },
            "exercise": {
              "title": "First word program",
              "type": "write-code",
              "instructions": "Write a program that slices the first 5 bytes of \"hello world\" and prints `word hello`.",
              "starterCode": "fn main() {\n    let s = String::from(\"hello world\");\n    // TODO: slice the first word\n}",
              "solution": "fn main() {\n    let s = String::from(\"hello world\");\n    let word: &str = &s[0..5];\n    println!(\"word {}\", word);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "word hello",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "word hello",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-references-slices-m1-l3",
            "slug": "rust-references-slices-m1-l3",
            "title": "Array Slices",
            "concept": "An array slice, written &[i32], is a view into a contiguous run of elements, created with &a[1..3]. Functions that take slices work on arrays, Vecs, and parts of either, which makes them far more reusable.",
            "syntax": "let part: &[i32] = &a[1..3];",
            "exampleCode": "fn main() {\n    let a = [1, 2, 3, 4];\n    let part = &a[1..3];\n    println!(\"{} {}\", part[0], part[1]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting that a slice range is exclusive of its end, and taking one element too few.",
            "bug": {
              "prompt": "What does &a[1..3] contain for a = [1, 2, 3, 4]?",
              "buggyCode": "fn main() {\n    println!(\"[2, 3]\");\n}",
              "fixedCode": "fn main() {\n    println!(\"[1, 2, 3]\");\n}",
              "explanation": "The range 1..3 is exclusive of 3, so the slice is [2, 3]."
            },
            "exercise": {
              "title": "Array slice program",
              "type": "write-code",
              "instructions": "Write a program that slices a[1..3] from [1, 2, 3, 4] and prints `2 3`.",
              "starterCode": "fn main() {\n    let a = [1, 2, 3, 4];\n    // TODO: slice the middle\n}",
              "solution": "fn main() {\n    let a = [1, 2, 3, 4];\n    let part = &a[1..3];\n    println!(\"{} {}\", part[0], part[1]);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "2 3",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "2 3",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-references-slices-m1-l4",
            "slug": "rust-references-slices-m1-l4",
            "title": "Slice Functions",
            "concept": "Writing a function that takes &[i32] instead of &[i32; 4] lets it accept arrays of any length. Slices carry their length with them, so the function can loop over exactly the elements it was given.",
            "syntax": "fn sum(xs: &[i32]) -> i32 { xs.iter().sum() }",
            "exampleCode": "fn sum(xs: &[i32]) -> i32 {\n    xs.iter().sum()\n}\nfn main() {\n    println!(\"sum {}\", sum(&[1, 2, 3]));\n}",
            "exampleLanguage": "rust",
            "mistake": "Taking a fixed-size array parameter and then needing a second function for a different size.",
            "bug": {
              "prompt": "Why take &[i32] instead of &[i32; 4]?",
              "buggyCode": "fn main() {\n    println!(\"any length\");\n}",
              "fixedCode": "fn main() {\n    println!(\"faster\");\n}",
              "explanation": "A slice parameter accepts arrays of any length."
            },
            "exercise": {
              "title": "Slice param quiz",
              "type": "multiple-choice",
              "instructions": "Why take &[i32] instead of &[i32; 4]?",
              "starterCode": "",
              "solution": "It accepts arrays of any length",
              "solutionExplanation": "Slices are length-agnostic, so one function handles any array size.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It accepts arrays of any length",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "It accepts arrays of any length",
                "It is faster",
                "It copies the array",
                "It works only for Vecs"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-references-slices-m1-l5",
            "slug": "rust-references-slices-m1-l5",
            "title": "The str Type",
            "concept": "The unsized type str is the text itself, and you almost always use it behind a reference as &str. String owns its text on the heap, while &str borrows text owned by someone else.",
            "syntax": "fn first(s: &str) -> &str { &s[0..1] }",
            "exampleCode": "fn main() {\n    let text: &str = \"hello\";\n    println!(\"first {}\", &text[0..1]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to declare a plain str variable, which is unsized and cannot live on the stack alone.",
            "bug": {
              "prompt": "What is the difference between String and &str?",
              "buggyCode": "fn main() {\n    println!(\"same thing\");\n}",
              "fixedCode": "fn main() {\n    println!(\"owned vs borrowed\");\n}",
              "explanation": "String owns heap text; &str borrows text owned elsewhere."
            },
            "exercise": {
              "title": "Str slice program",
              "type": "write-code",
              "instructions": "Write a program that stores text: &str = \"hello\" and prints `first h`.",
              "starterCode": "fn main() {\n    let text: &str = \"hello\";\n    // TODO: print the first character\n}",
              "solution": "fn main() {\n    let text: &str = \"hello\";\n    println!(\"first {}\", &text[0..1]);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "first h",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "first h",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-references-slices-m2",
        "title": "Applying References & Slices",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-references-slices-m2-l1",
            "slug": "rust-references-slices-m2-l1",
            "title": "Splitting Strings",
            "concept": "The split method on &str breaks text at a pattern and yields the pieces as slices, without copying. Combined with collect, it turns a line like \"a,b,c\" into a Vec of its parts.",
            "syntax": "let parts: Vec<&str> = \"a,b\".split(',').collect();",
            "exampleCode": "fn main() {\n    let line = \"red,green,blue\";\n    let parts: Vec<&str> = line.split(',').collect();\n    println!(\"{} {} {}\", parts[0], parts[1], parts[2]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting that split yields slices borrowed from the original string, which must outlive them.",
            "bug": {
              "prompt": "What does split(',') return?",
              "buggyCode": "fn main() {\n    println!(\"owned Strings\");\n}",
              "fixedCode": "fn main() {\n    println!(\"slices\");\n}",
              "explanation": "split yields &str slices borrowed from the original string."
            },
            "exercise": {
              "title": "Split program",
              "type": "write-code",
              "instructions": "Write a program that splits \"red,green,blue\" on ',' and prints `red green blue`.",
              "starterCode": "fn main() {\n    let line = \"red,green,blue\";\n    // TODO: split and print the parts\n}",
              "solution": "fn main() {\n    let line = \"red,green,blue\";\n    let parts: Vec<&str> = line.split(',').collect();\n    println!(\"{} {} {}\", parts[0], parts[1], parts[2]);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "red green blue",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "red green blue",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-references-slices-m2-l2",
            "slug": "rust-references-slices-m2-l2",
            "title": "Iterating Slices",
            "concept": "A slice's iter method yields references to each element, and a for loop over &slice visits them in order. This is the standard way to read every element without moving or copying the data.",
            "syntax": "for x in slice.iter() { println!(\"{}\", x); }",
            "exampleCode": "fn main() {\n    let xs = [4, 5, 6];\n    let mut total = 0;\n    for x in xs.iter() {\n        total += x;\n    }\n    println!(\"total {}\", total);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using iter().count() on a slice you then need to iterate again, instead of using len().",
            "bug": {
              "prompt": "What does slice.iter() yield?",
              "buggyCode": "fn main() {\n    println!(\"owned values\");\n}",
              "fixedCode": "fn main() {\n    println!(\"references\");\n}",
              "explanation": "iter() yields a reference to each element in turn."
            },
            "exercise": {
              "title": "Slice sum program",
              "type": "write-code",
              "instructions": "Write a program that sums [4, 5, 6] with iter() and prints `total 15`.",
              "starterCode": "fn main() {\n    let xs = [4, 5, 6];\n    let mut total = 0;\n    // TODO: iterate and sum\n}",
              "solution": "fn main() {\n    let xs = [4, 5, 6];\n    let mut total = 0;\n    for x in xs.iter() {\n        total += x;\n    }\n    println!(\"total {}\", total);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "total 15",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "total 15",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-references-slices-m2-l3",
            "slug": "rust-references-slices-m2-l3",
            "title": "Mutable Slices",
            "concept": "A mutable slice, written &mut [i32], lets code change the elements it views without owning the collection. The same borrow rules apply: while the mutable slice exists, no other access to those elements is allowed.",
            "syntax": "let part = &mut a[0..2]; part[0] = 9;",
            "exampleCode": "fn main() {\n    let mut a = [1, 2, 3];\n    let part = &mut a[0..2];\n    part[0] = 9;\n    println!(\"{} {} {}\", a[0], a[1], a[2]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Holding a mutable slice while also reading the original array.",
            "bug": {
              "prompt": "What can you do through &mut [i32]?",
              "buggyCode": "fn main() {\n    println!(\"only read\");\n}",
              "fixedCode": "fn main() {\n    println!(\"change elements\");\n}",
              "explanation": "A mutable slice lets you write to the elements it covers."
            },
            "exercise": {
              "title": "Mutable slice program",
              "type": "write-code",
              "instructions": "Write a program that sets a[0] to 9 through a mutable slice of [1, 2, 3] and prints `9 2 3`.",
              "starterCode": "fn main() {\n    let mut a = [1, 2, 3];\n    // TODO: mutate through a slice\n}",
              "solution": "fn main() {\n    let mut a = [1, 2, 3];\n    let part = &mut a[0..2];\n    part[0] = 9;\n    println!(\"{} {} {}\", a[0], a[1], a[2]);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "9 2 3",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "9 2 3",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-references-slices-m2-l4",
            "slug": "rust-references-slices-m2-l4",
            "title": "Deref Coercion",
            "concept": "Deref coercion automatically turns &String into &str and &Vec<T> into &[T] when a function expects the slice type. This is why you can pass &my_string to a function that takes &str without writing anything extra.",
            "syntax": "fn greet(s: &str) {}\ngreet(&my_string);",
            "exampleCode": "fn greet(s: &str) {\n    println!(\"hi {}\", s);\n}\nfn main() {\n    let name = String::from(\"Ada\");\n    greet(&name);\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing &*name by hand everywhere, when deref coercion already does it.",
            "bug": {
              "prompt": "Why can you pass &String where &str is expected?",
              "buggyCode": "fn main() {\n    println!(\"deref coercion\");\n}",
              "fixedCode": "fn main() {\n    println!(\"they are same type\");\n}",
              "explanation": "Deref coercion converts &String to &str automatically at the call site."
            },
            "exercise": {
              "title": "Coercion quiz",
              "type": "multiple-choice",
              "instructions": "Why can you pass &String where &str is expected?",
              "starterCode": "",
              "solution": "Deref coercion converts it automatically",
              "solutionExplanation": "Deref coercion turns &String into &str when the function expects &str.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Deref coercion converts it automatically",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Deref coercion converts it automatically",
                "String and &str are the same type",
                "The compiler copies the String",
                "It is not allowed"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-references-slices-m2-l5",
            "slug": "rust-references-slices-m2-l5",
            "title": "Slices in Practice",
            "concept": "Most Rust APIs take slices: functions take &[T] and &str, and collections hand out slices with &v[..] and &s[..]. Reaching for a slice first keeps your functions general and your data uncopied.",
            "syntax": "fn show(xs: &[i32]) { println!(\"{:?}\", xs); }",
            "exampleCode": "fn main() {\n    let v = vec![7, 8, 9];\n    println!(\"all {:?}\", &v[..]);\n    println!(\"first {}\", v[0]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Taking a Vec<T> by value in a function that only reads it, which forces the caller to give it up.",
            "bug": {
              "prompt": "How do you borrow a whole Vec as a slice?",
              "buggyCode": "fn main() {\n    println!(\"&v[..]\");\n}",
              "fixedCode": "fn main() {\n    println!(\"v.clone()\");\n}",
              "explanation": "&v[..] borrows the entire Vec as a slice."
            },
            "exercise": {
              "title": "Vec slice program",
              "type": "write-code",
              "instructions": "Write a program that prints `all [7, 8, 9]` for &v[..] and `first 7` for v[0].",
              "starterCode": "fn main() {\n    let v = vec![7, 8, 9];\n    // TODO: print the slice and first element\n}",
              "solution": "fn main() {\n    let v = vec![7, 8, 9];\n    println!(\"all {:?}\", &v[..]);\n    println!(\"first {}\", v[0]);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "all [7, 8, 9]\nfirst 7",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "all [7, 8, 9]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Text slicer",
      "type": "write-code",
      "instructions": "Write a program that slices \"hello world\" to `hello`, slices [10, 20, 30, 40][1..3] to `20 30`, and splits \"a,b,c\" to print `a b c`.",
      "starterCode": "fn main() {\n    // TODO: slice and split\n}",
      "solution": "fn main() {\n    let s = String::from(\"hello world\");\n    println!(\"word {}\", &s[0..5]);\n    let a = [10, 20, 30, 40];\n    let part = &a[1..3];\n    println!(\"nums {} {}\", part[0], part[1]);\n    let parts: Vec<&str> = \"a,b,c\".split(',').collect();\n    println!(\"parts {} {} {}\", parts[0], parts[1], parts[2]);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "word hello\nnums 20 30\nparts a b c",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "word hello",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Text Slicer",
      "description": "Build a program that slices words from a sentence and numbers from an array, and prints the pieces.",
      "requirements": [
        "Program slices the first word from a sentence",
        "Program slices a middle range from an array",
        "Program splits a comma line into parts",
        "Program prints every piece with a label"
      ],
      "rubric": [
        "First word is correct",
        "Array slice is correct",
        "Split parts are correct",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-structs",
    "slug": "rust-structs",
    "language": "rust",
    "category": "languages",
    "title": "Structs in Rust",
    "description": "Group data into structs, add methods, and print them with Debug.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Defining structs",
      "Accessing fields",
      "Using struct update syntax",
      "Writing methods",
      "Adding constructors",
      "Deriving Debug"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like designing a form: each field has a label and a type, and the form holds one complete record.",
    "modules": [
      {
        "id": "rust-structs-m1",
        "title": "Fundamentals of Structs in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-structs-m1-l1",
            "slug": "rust-structs-m1-l1",
            "title": "Defining a Struct",
            "concept": "A struct groups related values into one named type, with each field having a name and a type. Once defined, you create an instance by naming the struct and giving each field a value.",
            "syntax": "struct Point { x: i32, y: i32 }",
            "exampleCode": "struct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    println!(\"{} {}\", p.x, p.y);\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting a field when creating a struct instance, which the compiler rejects.",
            "bug": {
              "prompt": "How do you create a struct instance?",
              "buggyCode": "fn main() {\n    println!(\"list values\");\n}",
              "fixedCode": "fn main() {\n    println!(\"name each field\");\n}",
              "explanation": "Struct instances are created by naming every field with its value."
            },
            "exercise": {
              "title": "Point program",
              "type": "write-code",
              "instructions": "Write a program that defines struct Point { x, y } and prints `3 4` for Point { x: 3, y: 4 }.",
              "starterCode": "struct Point {\n    // TODO: fields x and y\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    println!(\"{} {}\", p.x, p.y);\n}",
              "solution": "struct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    println!(\"{} {}\", p.x, p.y);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "3 4",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "3 4",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-structs-m1-l2",
            "slug": "rust-structs-m1-l2",
            "title": "Accessing Fields",
            "concept": "Struct fields are read and written with dot syntax, as in point.x, and a mutable struct lets you assign to its fields. Field access is checked at compile time, so a typo in a field name is caught immediately.",
            "syntax": "let x = p.x;\np.x = 9;",
            "exampleCode": "struct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let mut p = Point { x: 3, y: 4 };\n    p.x = 9;\n    println!(\"{} {}\", p.x, p.y);\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to change a field of an immutable struct instance.",
            "bug": {
              "prompt": "How do you change a field of a struct?",
              "buggyCode": "fn main() {\n    println!(\"make it mutable\");\n}",
              "fixedCode": "fn main() {\n    println!(\"recreate it\");\n}",
              "explanation": "The instance must be declared mut, then you assign with dot syntax."
            },
            "exercise": {
              "title": "Move point program",
              "type": "write-code",
              "instructions": "Write a program that creates Point { x: 3, y: 4 }, sets x to 9, and prints `9 4`.",
              "starterCode": "struct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let mut p = Point { x: 3, y: 4 };\n    // TODO: change x\n    println!(\"{} {}\", p.x, p.y);\n}",
              "solution": "struct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let mut p = Point { x: 3, y: 4 };\n    p.x = 9;\n    println!(\"{} {}\", p.x, p.y);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "9 4",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "9 4",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-structs-m1-l3",
            "slug": "rust-structs-m1-l3",
            "title": "Struct Update Syntax",
            "concept": "Struct update syntax, ..other, fills the remaining fields from another instance of the same struct. It is handy when you change one field and keep the rest, but it moves any non-Copy fields out of the source.",
            "syntax": "let p2 = Point { x: 9, ..p1 };",
            "exampleCode": "struct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let p1 = Point { x: 3, y: 4 };\n    let p2 = Point { x: 9, ..p1 };\n    println!(\"{} {}\", p2.x, p2.y);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using ..other and then still using the source, after its non-Copy fields moved.",
            "bug": {
              "prompt": "What does `..p1` do in a struct literal?",
              "buggyCode": "fn main() {\n    println!(\"copies rest\");\n}",
              "fixedCode": "fn main() {\n    println!(\"deletes p1\");\n}",
              "explanation": "..p1 fills the remaining fields from p1."
            },
            "exercise": {
              "title": "Update syntax quiz",
              "type": "multiple-choice",
              "instructions": "What does `..p1` do in a struct literal?",
              "starterCode": "",
              "solution": "It fills the remaining fields from p1",
              "solutionExplanation": "Struct update syntax takes the unspecified fields from another instance.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It fills the remaining fields from p1",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "It fills the remaining fields from p1",
                "It deletes p1",
                "It compares the structs",
                "It clones p1"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-structs-m1-l4",
            "slug": "rust-structs-m1-l4",
            "title": "Tuple Structs",
            "concept": "A tuple struct names a type but gives its fields no names, as in struct Colour(u8, u8, u8). It is useful for a small wrapper around one value, like struct Metres(f64), where a field name would add nothing.",
            "syntax": "struct Colour(u8, u8, u8);",
            "exampleCode": "struct Colour(u8, u8, u8);\nfn main() {\n    let red = Colour(255, 0, 0);\n    println!(\"{} {} {}\", red.0, red.1, red.2);\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to access a tuple struct field by name instead of by index.",
            "bug": {
              "prompt": "How do you read a field of a tuple struct?",
              "buggyCode": "fn main() {\n    println!(\"by index\");\n}",
              "fixedCode": "fn main() {\n    println!(\"by name\");\n}",
              "explanation": "Tuple struct fields are accessed by index: red.0, red.1."
            },
            "exercise": {
              "title": "Colour program",
              "type": "write-code",
              "instructions": "Write a program that defines Colour(u8, u8, u8) and prints `255 0 0` for red.",
              "starterCode": "struct Colour(u8, u8, u8);\nfn main() {\n    let red = Colour(255, 0, 0);\n    // TODO: print the channels\n}",
              "solution": "struct Colour(u8, u8, u8);\nfn main() {\n    let red = Colour(255, 0, 0);\n    println!(\"{} {} {}\", red.0, red.1, red.2);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "255 0 0",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "255 0 0",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-structs-m1-l5",
            "slug": "rust-structs-m1-l5",
            "title": "Unit Structs",
            "concept": "A unit struct has no fields at all, as in struct Marker;, and is used as a marker type or for behaviour attached to a type. Its only value is the struct name itself, and it takes up no space.",
            "syntax": "struct Marker;",
            "exampleCode": "struct Marker;\nfn main() {\n    let _m = Marker;\n    println!(\"marker created\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to store data in a unit struct, which has nowhere to put it.",
            "bug": {
              "prompt": "When is a unit struct useful?",
              "buggyCode": "fn main() {\n    println!(\"as a marker type\");\n}",
              "fixedCode": "fn main() {\n    println!(\"to store data\");\n}",
              "explanation": "Unit structs carry no data; they mark a type or attach behaviour to it."
            },
            "exercise": {
              "title": "Unit struct quiz",
              "type": "multiple-choice",
              "instructions": "When is a unit struct useful?",
              "starterCode": "",
              "solution": "As a marker type with no data",
              "solutionExplanation": "A unit struct has no fields and is used as a marker or for trait behaviour.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "As a marker type with no data",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "As a marker type with no data",
                "To store many fields",
                "To replace enums",
                "To hold a Vec"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-structs-m2",
        "title": "Applying Structs in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-structs-m2-l1",
            "slug": "rust-structs-m2-l1",
            "title": "Methods with impl",
            "concept": "Methods are functions attached to a struct inside an impl block, and they take self, &self, or &mut self as their first parameter. A method that takes &self reads the instance, while &mut self changes it.",
            "syntax": "impl Point { fn x(&self) -> i32 { self.x } }",
            "exampleCode": "struct Point {\n    x: i32,\n    y: i32,\n}\nimpl Point {\n    fn sum(&self) -> i32 {\n        self.x + self.y\n    }\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    println!(\"sum {}\", p.sum());\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting &self in a method, so the function cannot see the instance's fields.",
            "bug": {
              "prompt": "What is the first parameter of a method that reads a struct?",
              "buggyCode": "fn main() {\n    println!(\"&self\");\n}",
              "fixedCode": "fn main() {\n    println!(\"self by value\");\n}",
              "explanation": "Reading methods take &self, borrowing the instance."
            },
            "exercise": {
              "title": "Sum method program",
              "type": "write-code",
              "instructions": "Write a program with a Point::sum(&self) method returning x + y, printing `sum 7` for (3, 4).",
              "starterCode": "struct Point {\n    x: i32,\n    y: i32,\n}\nimpl Point {\n    // TODO: sum method\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    println!(\"sum {}\", p.sum());\n}",
              "solution": "struct Point {\n    x: i32,\n    y: i32,\n}\nimpl Point {\n    fn sum(&self) -> i32 {\n        self.x + self.y\n    }\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    println!(\"sum {}\", p.sum());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "sum 7",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "sum 7",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-structs-m2-l2",
            "slug": "rust-structs-m2-l2",
            "title": "Associated Functions",
            "concept": "An associated function, like Point::new, belongs to the type but takes no self, so it is called on the type itself. Constructors are the classic example: new builds a valid instance from its arguments.",
            "syntax": "impl Point { fn new(x: i32, y: i32) -> Self { Self { x, y } } }",
            "exampleCode": "struct Point {\n    x: i32,\n    y: i32,\n}\nimpl Point {\n    fn new(x: i32, y: i32) -> Self {\n        Self { x, y }\n    }\n}\nfn main() {\n    let p = Point::new(3, 4);\n    println!(\"{} {}\", p.x, p.y);\n}",
            "exampleLanguage": "rust",
            "mistake": "Calling an associated function on an instance, as in p.new(), instead of on the type.",
            "bug": {
              "prompt": "How do you call an associated function like new?",
              "buggyCode": "fn main() {\n    println!(\"on the type\");\n}",
              "fixedCode": "fn main() {\n    println!(\"on an instance\");\n}",
              "explanation": "Associated functions are called on the type: Point::new(3, 4)."
            },
            "exercise": {
              "title": "Constructor program",
              "type": "write-code",
              "instructions": "Write a program with Point::new(x, y) -> Self that constructs Point { x: 3, y: 4 } and prints `3 4`.",
              "starterCode": "struct Point {\n    x: i32,\n    y: i32,\n}\nimpl Point {\n    // TODO: new constructor\n}\nfn main() {\n    let p = Point::new(3, 4);\n    println!(\"{} {}\", p.x, p.y);\n}",
              "solution": "struct Point {\n    x: i32,\n    y: i32,\n}\nimpl Point {\n    fn new(x: i32, y: i32) -> Self {\n        Self { x, y }\n    }\n}\nfn main() {\n    let p = Point::new(3, 4);\n    println!(\"{} {}\", p.x, p.y);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "3 4",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "3 4",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-structs-m2-l3",
            "slug": "rust-structs-m2-l3",
            "title": "Debug Printing",
            "concept": "Deriving Debug with #[derive(Debug)] lets you print a struct with {:?}, which shows every field and its value. Debug output is for developers, while Display, written by hand, is the user-facing format.",
            "syntax": "#[derive(Debug)]\nstruct Point { x: i32, y: i32 }",
            "exampleCode": "#[derive(Debug)]\nstruct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    println!(\"{:?}\", p);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using {} on a struct that only derives Debug, which needs {:?} instead.",
            "bug": {
              "prompt": "How do you print a struct for debugging?",
              "buggyCode": "fn main() {\n    println!(\"print directly\");\n}",
              "fixedCode": "fn main() {\n    println!(\"print with Debug\");\n}",
              "explanation": "Derive Debug and print with {:?}."
            },
            "exercise": {
              "title": "Debug quiz",
              "type": "multiple-choice",
              "instructions": "How do you print a struct for debugging?",
              "starterCode": "",
              "solution": "Derive Debug and print with {:?}",
              "solutionExplanation": "#[derive(Debug)] plus {:?} shows the struct's fields.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Derive Debug and print with {:?}",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Derive Debug and print with {:?}",
                "Print with {} directly",
                "Use println! without a format",
                "Structs cannot be printed"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-structs-m2-l4",
            "slug": "rust-structs-m2-l4",
            "title": "Structs with String Fields",
            "concept": "A struct can own a String field, and then the whole struct owns that text. Moving the struct moves its String too, and borrowing a field borrows just that part of the struct.",
            "syntax": "struct User { name: String, age: u32 }",
            "exampleCode": "struct User {\n    name: String,\n    age: u32,\n}\nfn main() {\n    let u = User { name: String::from(\"Ada\"), age: 36 };\n    println!(\"{} is {}\", u.name, u.age);\n}",
            "exampleLanguage": "rust",
            "mistake": "Storing a &str in a struct without a lifetime, which the compiler rejects because the struct would outlive its data.",
            "bug": {
              "prompt": "What happens to the String field when a struct is moved?",
              "buggyCode": "fn main() {\n    println!(\"it moves too\");\n}",
              "fixedCode": "fn main() {\n    println!(\"it stays\");\n}",
              "explanation": "Moving a struct moves all its fields, including owned Strings."
            },
            "exercise": {
              "title": "User struct program",
              "type": "write-code",
              "instructions": "Write a program that defines User { name: String, age: u32 } and prints `Ada is 36`.",
              "starterCode": "struct User {\n    name: String,\n    age: u32,\n}\nfn main() {\n    let u = User { name: String::from(\"Ada\"), age: 36 };\n    // TODO: print the user\n}",
              "solution": "struct User {\n    name: String,\n    age: u32,\n}\nfn main() {\n    let u = User { name: String::from(\"Ada\"), age: 36 };\n    println!(\"{} is {}\", u.name, u.age);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Ada is 36",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Ada is 36",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-structs-m2-l5",
            "slug": "rust-structs-m2-l5",
            "title": "Structs as Function Arguments",
            "concept": "Passing a struct by reference, &Point, lets a function read it without taking ownership, while passing by value moves it. Small Copy structs can be passed by value cheaply, but large structs should be borrowed.",
            "syntax": "fn show(p: &Point) { println!(\"{} {}\", p.x, p.y); }",
            "exampleCode": "struct Point {\n    x: i32,\n    y: i32,\n}\nfn show(p: &Point) {\n    println!(\"point {} {}\", p.x, p.y);\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    show(&p);\n    println!(\"still {} {}\", p.x, p.y);\n}",
            "exampleLanguage": "rust",
            "mistake": "Passing a large struct by value in a function that only reads it, copying it for no reason.",
            "bug": {
              "prompt": "A function only reads a struct. How should it take it?",
              "buggyCode": "fn main() {\n    println!(\"by reference\");\n}",
              "fixedCode": "fn main() {\n    println!(\"by value\");\n}",
              "explanation": "Borrow with &Point so the caller keeps the struct."
            },
            "exercise": {
              "title": "Show point program",
              "type": "write-code",
              "instructions": "Write a program with show(p: &Point) printing `point 3 4`, then printing `still 3 4` in main.",
              "starterCode": "struct Point {\n    x: i32,\n    y: i32,\n}\nfn show(p: &Point) {\n    // TODO\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    show(&p);\n    println!(\"still {} {}\", p.x, p.y);\n}",
              "solution": "struct Point {\n    x: i32,\n    y: i32,\n}\nfn show(p: &Point) {\n    println!(\"point {} {}\", p.x, p.y);\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    show(&p);\n    println!(\"still {} {}\", p.x, p.y);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "point 3 4\nstill 3 4",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "point 3 4",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Rectangle calculator",
      "type": "write-code",
      "instructions": "Write a program with Rectangle { width: u32, height: u32 }, a new constructor, area() and perimeter() methods, printing `area 12` and `perimeter 14` for 3x4.",
      "starterCode": "struct Rectangle {\n    // TODO\n    width: u32,\n    height: u32,\n}\nimpl Rectangle {\n    // TODO: new, area, perimeter\n}\nfn main() {\n    // TODO\n}",
      "solution": "struct Rectangle {\n    width: u32,\n    height: u32,\n}\nimpl Rectangle {\n    fn new(width: u32, height: u32) -> Self {\n        Self { width, height }\n    }\n    fn area(&self) -> u32 {\n        self.width * self.height\n    }\n    fn perimeter(&self) -> u32 {\n        2 * (self.width + self.height)\n    }\n}\nfn main() {\n    let r = Rectangle::new(3, 4);\n    println!(\"area {}\", r.area());\n    println!(\"perimeter {}\", r.perimeter());\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "area 12\nperimeter 14",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "area 12",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Rectangle Calculator",
      "description": "Build a program with a Rectangle struct, a constructor, and area and perimeter methods.",
      "requirements": [
        "Program defines Rectangle { width, height }",
        "Program adds Rectangle::new",
        "Program adds area and perimeter methods",
        "Program prints area 12 and perimeter 14 for 3x4"
      ],
      "rubric": [
        "Struct is defined with both fields",
        "Constructor works",
        "Methods compute correctly",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-enums",
    "slug": "rust-enums",
    "language": "rust",
    "category": "languages",
    "title": "Enums in Rust",
    "description": "Model one-of-several values with enums, including Option, Result, and data-carrying variants.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Defining enums",
      "Carrying data in variants",
      "Matching on enums",
      "Using Option",
      "Using Result",
      "Writing enum methods"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning a menu: the dish you order is exactly one of the listed options, never a mix.",
    "modules": [
      {
        "id": "rust-enums-m1",
        "title": "Fundamentals of Enums in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-enums-m1-l1",
            "slug": "rust-enums-m1-l1",
            "title": "Defining an Enum",
            "concept": "An enum lists the possible variants of a value, as in enum Direction { North, South, East, West }. A variable of the enum type holds exactly one variant at a time, which makes impossible states unrepresentable.",
            "syntax": "enum Direction { North, South, East, West }",
            "exampleCode": "enum Direction {\n    North,\n    South,\n    East,\n    West,\n}\nfn main() {\n    let d = Direction::North;\n    println!(\"going north: {:?}\", matches!(d, Direction::North));\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a string like \"north\" instead of an enum, so a typo creates a value the code never handles.",
            "bug": {
              "prompt": "What is an enum in Rust?",
              "buggyCode": "fn main() {\n    println!(\"a list of variants\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a list of strings\");\n}",
              "explanation": "An enum is a type whose values are one of a fixed set of named variants."
            },
            "exercise": {
              "title": "Direction program",
              "type": "write-code",
              "instructions": "Write a program that defines enum Direction with North, South, East, West and prints `going north: true` for Direction::North.",
              "starterCode": "enum Direction {\n    // TODO: four variants\n    North,\n    South,\n    East,\n    West,\n}\nfn main() {\n    let d = Direction::North;\n    println!(\"going north: {:?}\", matches!(d, Direction::North));\n}",
              "solution": "enum Direction {\n    North,\n    South,\n    East,\n    West,\n}\nfn main() {\n    let d = Direction::North;\n    println!(\"going north: {:?}\", matches!(d, Direction::North));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "going north: true",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "going north: true",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-enums-m1-l2",
            "slug": "rust-enums-m1-l2",
            "title": "Enum Variants with Data",
            "concept": "Each variant of an enum can carry different data, as in enum Shape { Circle(f64), Rect(f64, f64) }. This lets one type represent several shapes of value, and match pulls the data back out.",
            "syntax": "enum Shape { Circle(f64), Rect(f64, f64) }",
            "exampleCode": "enum Shape {\n    Circle(f64),\n    Rect(f64, f64),\n}\nfn main() {\n    let s = Shape::Circle(2.0);\n    if let Shape::Circle(r) = s {\n        println!(\"radius {}\", r);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting that different variants can hold different types, and trying to read the same field from all of them.",
            "bug": {
              "prompt": "Can different enum variants hold different data?",
              "buggyCode": "fn main() {\n    println!(\"no\");\n}",
              "fixedCode": "fn main() {\n    println!(\"yes\");\n}",
              "explanation": "Each variant can carry its own data, of its own type."
            },
            "exercise": {
              "title": "Shape program",
              "type": "write-code",
              "instructions": "Write a program with enum Shape { Circle(f64), Rect(f64, f64) } that prints `radius 2` for Circle(2.0).",
              "starterCode": "enum Shape {\n    Circle(f64),\n    Rect(f64, f64),\n}\nfn main() {\n    let s = Shape::Circle(2.0);\n    // TODO: print the radius\n}",
              "solution": "enum Shape {\n    Circle(f64),\n    Rect(f64, f64),\n}\nfn main() {\n    let s = Shape::Circle(2.0);\n    if let Shape::Circle(r) = s {\n        println!(\"radius {}\", r);\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "radius 2",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "radius 2",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-enums-m1-l3",
            "slug": "rust-enums-m1-l3",
            "title": "Matching on Enums",
            "concept": "A match on an enum must handle every variant, and the compiler errors if one is missing. This exhaustiveness check is the core benefit of enums: adding a variant forces every match to consider it.",
            "syntax": "match d { Direction::North => \"N\", _ => \"?\" }",
            "exampleCode": "enum Direction {\n    North,\n    South,\n}\nfn main() {\n    let d = Direction::South;\n    let label = match d {\n        Direction::North => \"N\",\n        Direction::South => \"S\",\n    };\n    println!(\"{}\", label);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a wildcard arm to hide a variant you forgot, instead of handling it properly.",
            "bug": {
              "prompt": "What does match require when used on an enum?",
              "buggyCode": "fn main() {\n    println!(\"all variants\");\n}",
              "fixedCode": "fn main() {\n    println!(\"one variant\");\n}",
              "explanation": "match must cover every variant of the enum."
            },
            "exercise": {
              "title": "Match direction program",
              "type": "write-code",
              "instructions": "Write a program that matches Direction::South to \"S\" and prints `S`.",
              "starterCode": "enum Direction {\n    North,\n    South,\n}\nfn main() {\n    let d = Direction::South;\n    // TODO: match and print the label\n}",
              "solution": "enum Direction {\n    North,\n    South,\n}\nfn main() {\n    let d = Direction::South;\n    let label = match d {\n        Direction::North => \"N\",\n        Direction::South => \"S\",\n    };\n    println!(\"{}\", label);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "S",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "S",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-enums-m1-l4",
            "slug": "rust-enums-m1-l4",
            "title": "The Option Enum",
            "concept": "Option<T> is an enum with two variants, Some(T) and None, and it is how Rust represents a value that may be absent. Using Option instead of null means the compiler forces you to handle the missing case.",
            "syntax": "let x: Option<i32> = Some(5);",
            "exampleCode": "fn main() {\n    let x: Option<i32> = Some(5);\n    println!(\"has value: {}\", x.is_some());\n    let y: Option<i32> = None;\n    println!(\"none: {}\", y.is_none());\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a value of type Option<i32> as if it were an i32, without unwrapping it first.",
            "bug": {
              "prompt": "What are the two variants of Option?",
              "buggyCode": "fn main() {\n    println!(\"Some and None\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Ok and Err\");\n}",
              "explanation": "Option is Some(T) for a present value and None for an absent one."
            },
            "exercise": {
              "title": "Option quiz",
              "type": "multiple-choice",
              "instructions": "What are the two variants of Option?",
              "starterCode": "",
              "solution": "Some and None",
              "solutionExplanation": "Option<T> is Some(T) or None.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Some and None",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Some and None",
                "Ok and Err",
                "Yes and No",
                "True and False"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-enums-m1-l5",
            "slug": "rust-enums-m1-l5",
            "title": "The Result Enum",
            "concept": "Result<T, E> is an enum with Ok(T) for success and Err(E) for failure, and it is how Rust functions report errors. Handling both variants with match or ? keeps error paths explicit instead of hidden.",
            "syntax": "let r: Result<i32, &str> = Ok(42);",
            "exampleCode": "fn main() {\n    let r: Result<i32, &str> = Ok(42);\n    println!(\"ok: {}\", r.is_ok());\n    let e: Result<i32, &str> = Err(\"bad\");\n    println!(\"err: {}\", e.is_err());\n}",
            "exampleLanguage": "rust",
            "mistake": "Ignoring the Err variant and assuming every call succeeds.",
            "bug": {
              "prompt": "What are the two variants of Result?",
              "buggyCode": "fn main() {\n    println!(\"Some and None\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Ok and Err\");\n}",
              "explanation": "Result is Ok(T) for success and Err(E) for failure."
            },
            "exercise": {
              "title": "Result program",
              "type": "write-code",
              "instructions": "Write a program that prints `ok: true` for Ok(42) and `err: true` for Err(\"bad\").",
              "starterCode": "fn main() {\n    let r: Result<i32, &str> = Ok(42);\n    let e: Result<i32, &str> = Err(\"bad\");\n    // TODO: print is_ok and is_err\n}",
              "solution": "fn main() {\n    let r: Result<i32, &str> = Ok(42);\n    println!(\"ok: {}\", r.is_ok());\n    let e: Result<i32, &str> = Err(\"bad\");\n    println!(\"err: {}\", e.is_err());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "ok: true\nerr: true",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "ok: true",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-enums-m2",
        "title": "Applying Enums in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-enums-m2-l1",
            "slug": "rust-enums-m2-l1",
            "title": "Enums with Methods",
            "concept": "Like structs, enums can have methods in an impl block, and the method usually matches on self to behave differently per variant. This keeps variant-specific logic with the type instead of scattered through the code.",
            "syntax": "impl Direction { fn is_north(&self) -> bool { matches!(self, Self::North) } }",
            "exampleCode": "enum Direction {\n    North,\n    South,\n}\nimpl Direction {\n    fn label(&self) -> &'static str {\n        match self {\n            Direction::North => \"N\",\n            Direction::South => \"S\",\n        }\n    }\n}\nfn main() {\n    println!(\"{}\", Direction::South.label());\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing a free function that matches on the enum instead of a method, when the logic belongs to the type.",
            "bug": {
              "prompt": "Where do enum methods live?",
              "buggyCode": "fn main() {\n    println!(\"impl block\");\n}",
              "fixedCode": "fn main() {\n    println!(\"inside variant\");\n}",
              "explanation": "Enum methods are defined in an impl block for the enum."
            },
            "exercise": {
              "title": "Enum method program",
              "type": "write-code",
              "instructions": "Write a program with a Direction::label method returning \"N\" or \"S\", printing `S` for South.",
              "starterCode": "enum Direction {\n    North,\n    South,\n}\nimpl Direction {\n    // TODO: label method\n}\nfn main() {\n    println!(\"{}\", Direction::South.label());\n}",
              "solution": "enum Direction {\n    North,\n    South,\n}\nimpl Direction {\n    fn label(&self) -> &'static str {\n        match self {\n            Direction::North => \"N\",\n            Direction::South => \"S\",\n        }\n    }\n}\nfn main() {\n    println!(\"{}\", Direction::South.label());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "S",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "S",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-enums-m2-l2",
            "slug": "rust-enums-m2-l2",
            "title": "Enums vs Structs",
            "concept": "Use a struct when a value always has the same fields, and an enum when a value is one of several different shapes. A struct says and, an enum says or, and picking the right one makes illegal states impossible to build.",
            "syntax": "enum Message { Text(String), Quit }",
            "exampleCode": "enum Message {\n    Text(String),\n    Quit,\n}\nfn main() {\n    let m = Message::Text(String::from(\"hi\"));\n    if let Message::Text(t) = m {\n        println!(\"text {}\", t);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Modelling one-of-several-shapes with a struct full of Option fields, when an enum says it directly.",
            "bug": {
              "prompt": "When should you use an enum instead of a struct?",
              "buggyCode": "fn main() {\n    println!(\"one of shapes\");\n}",
              "fixedCode": "fn main() {\n    println!(\"always same fields\");\n}",
              "explanation": "Enums model one-of-several-shapes; structs model always-the-same-fields."
            },
            "exercise": {
              "title": "Enum vs struct quiz",
              "type": "multiple-choice",
              "instructions": "When should you use an enum instead of a struct?",
              "starterCode": "",
              "solution": "When a value is one of several different shapes",
              "solutionExplanation": "An enum says or; a struct says and.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "When a value is one of several different shapes",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "When a value is one of several different shapes",
                "When a value always has the same fields",
                "When you need a Vec",
                "When you need a String"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-enums-m2-l3",
            "slug": "rust-enums-m2-l3",
            "title": "Nested Enums",
            "concept": "Enum variants can contain other enums, structs, or tuples, so you can build rich data like a message that is either text, a number, or a quit signal. Matching on nested enums peels the layers one at a time.",
            "syntax": "enum Outer { Inner(Inner), Done }",
            "exampleCode": "enum Inner {\n    Num(i32),\n    Word(String),\n}\nenum Outer {\n    Has(Inner),\n    Done,\n}\nfn main() {\n    let o = Outer::Has(Inner::Num(7));\n    if let Outer::Has(Inner::Num(n)) = o {\n        println!(\"num {}\", n);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Matching only the outer layer and forgetting to handle the inner variants.",
            "bug": {
              "prompt": "How do you match a value inside a nested enum?",
              "buggyCode": "fn main() {\n    println!(\"nested patterns\");\n}",
              "fixedCode": "fn main() {\n    println!(\"only outer\");\n}",
              "explanation": "Nested patterns like Outer::Has(Inner::Num(n)) match both layers at once."
            },
            "exercise": {
              "title": "Nested enum program",
              "type": "write-code",
              "instructions": "Write a program with Outer::Has(Inner::Num(7)) that prints `num 7` using a nested pattern.",
              "starterCode": "enum Inner {\n    Num(i32),\n    Word(String),\n}\nenum Outer {\n    Has(Inner),\n    Done,\n}\nfn main() {\n    let o = Outer::Has(Inner::Num(7));\n    // TODO: nested match\n}",
              "solution": "enum Inner {\n    Num(i32),\n    Word(String),\n}\nenum Outer {\n    Has(Inner),\n    Done,\n}\nfn main() {\n    let o = Outer::Has(Inner::Num(7));\n    if let Outer::Has(Inner::Num(n)) = o {\n        println!(\"num {}\", n);\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "num 7",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "num 7",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-enums-m2-l4",
            "slug": "rust-enums-m2-l4",
            "title": "The matches! Macro",
            "concept": "The matches! macro tests whether a value matches a pattern and returns a bool, which is shorter than a full match when you only need true or false. It is handy in tests and in filter conditions.",
            "syntax": "matches!(x, Some(_))",
            "exampleCode": "fn main() {\n    let x: Option<i32> = Some(5);\n    println!(\"{}\", matches!(x, Some(_)));\n    println!(\"{}\", matches!(x, None));\n}",
            "exampleLanguage": "rust",
            "mistake": "Using matches! with a pattern that binds a value you then need, since matches! only returns a bool.",
            "bug": {
              "prompt": "What does matches! return?",
              "buggyCode": "fn main() {\n    println!(\"a bool\");\n}",
              "fixedCode": "fn main() {\n    println!(\"the value\");\n}",
              "explanation": "matches! returns true when the value fits the pattern, false otherwise."
            },
            "exercise": {
              "title": "matches quiz",
              "type": "multiple-choice",
              "instructions": "What does matches! return?",
              "starterCode": "",
              "solution": "A bool",
              "solutionExplanation": "matches! tests a pattern and returns true or false.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A bool",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "A bool",
                "The matched value",
                "An Option",
                "A String"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-enums-m2-l5",
            "slug": "rust-enums-m2-l5",
            "title": "Designing with Enums",
            "concept": "Good enum design starts from the question: what are the distinct cases, and what data does each case carry. When a new case appears, the compiler points at every match that must handle it, which is exactly the safety enums are for.",
            "syntax": "enum TrafficLight { Red, Yellow, Green }",
            "exampleCode": "enum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}\nfn go(l: TrafficLight) -> bool {\n    matches!(l, TrafficLight::Green)\n}\nfn main() {\n    println!(\"go? {}\", go(TrafficLight::Green));\n    println!(\"go? {}\", go(TrafficLight::Red));\n}",
            "exampleLanguage": "rust",
            "mistake": "Adding a variant to an enum and being surprised that every match must be updated, instead of welcoming the check.",
            "bug": {
              "prompt": "What happens when you add a variant to an enum?",
              "buggyCode": "fn main() {\n    println!(\"matches must update\");\n}",
              "fixedCode": "fn main() {\n    println!(\"nothing\");\n}",
              "explanation": "Exhaustive match means the compiler flags every place that must handle the new variant."
            },
            "exercise": {
              "title": "Traffic light program",
              "type": "write-code",
              "instructions": "Write a program with enum TrafficLight { Red, Yellow, Green } and a go function returning true only for Green, printing `go? true` then `go? false`.",
              "starterCode": "enum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}\nfn go(l: TrafficLight) -> bool {\n    // TODO: true only for Green\n    false\n}\nfn main() {\n    println!(\"go? {}\", go(TrafficLight::Green));\n    println!(\"go? {}\", go(TrafficLight::Red));\n}",
              "solution": "enum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}\nfn go(l: TrafficLight) -> bool {\n    matches!(l, TrafficLight::Green)\n}\nfn main() {\n    println!(\"go? {}\", go(TrafficLight::Green));\n    println!(\"go? {}\", go(TrafficLight::Red));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "go? true\ngo? false",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "go? true",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "State machine",
      "type": "write-code",
      "instructions": "Write a program with enum TrafficLight { Red, Yellow, Green }, a next() method (Red->Green, Green->Yellow, Yellow->Red), and a can_go() method true only for Green, printing `Red go=false`, `Green go=true`, `Yellow go=false`.",
      "starterCode": "enum TrafficLight {\n    // TODO\n    Red,\n    Yellow,\n    Green,\n}\nimpl TrafficLight {\n    // TODO: next and can_go\n}\nfn main() {\n    // TODO\n}",
      "solution": "enum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}\nimpl TrafficLight {\n    fn next(&self) -> TrafficLight {\n        match self {\n            TrafficLight::Red => TrafficLight::Green,\n            TrafficLight::Green => TrafficLight::Yellow,\n            TrafficLight::Yellow => TrafficLight::Red,\n        }\n    }\n    fn can_go(&self) -> bool {\n        matches!(self, TrafficLight::Green)\n    }\n}\nfn main() {\n    let l = TrafficLight::Red;\n    println!(\"Red go={}\", l.can_go());\n    let l = l.next();\n    println!(\"Green go={}\", l.can_go());\n    let l = l.next();\n    println!(\"Yellow go={}\", l.can_go());\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "Red go=false\nGreen go=true\nYellow go=false",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "Red go=false",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "State Machine",
      "description": "Build a program that models a traffic light as an enum with methods and transitions.",
      "requirements": [
        "Program defines TrafficLight with Red, Yellow, Green",
        "Program adds a next() method cycling the states",
        "Program adds a can_go() method",
        "Program prints the cycle Red -> Green -> Yellow -> Red"
      ],
      "rubric": [
        "Enum has three variants",
        "next() cycles correctly",
        "can_go is true only for Green",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-pattern-matching",
    "slug": "rust-pattern-matching",
    "language": "rust",
    "category": "languages",
    "title": "Pattern Matching",
    "description": "Match values with patterns: destructuring, ranges, guards, if let, and while let.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Destructuring with let",
      "Writing match arms",
      "Using | and range patterns",
      "Adding match guards",
      "Using if let and while let",
      "Ignoring values with _"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like sorting mail: each letter goes into the slot whose shape matches it.",
    "modules": [
      {
        "id": "rust-pattern-matching-m1",
        "title": "Fundamentals of Pattern Matching",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-pattern-matching-m1-l1",
            "slug": "rust-pattern-matching-m1-l1",
            "title": "Patterns in let",
            "concept": "A pattern describes the shape of a value, and let with a pattern like let (x, y) = (1, 2) pulls the parts out at once. Destructuring in let is the simplest form of pattern matching, and it works for tuples, structs, and enums.",
            "syntax": "let (x, y) = (1, 2);",
            "exampleCode": "fn main() {\n    let (x, y) = (3, 4);\n    println!(\"{} {}\", x, y);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a pattern that does not match the value's shape, for example destructuring a 2-tuple as three names.",
            "bug": {
              "prompt": "What does `let (x, y) = (3, 4);` do?",
              "buggyCode": "fn main() {\n    println!(\"destructures\");\n}",
              "fixedCode": "fn main() {\n    println!(\"compares\");\n}",
              "explanation": "The pattern pulls the tuple's two elements into x and y."
            },
            "exercise": {
              "title": "Destructure program",
              "type": "write-code",
              "instructions": "Write a program that destructures (3, 4) into x and y and prints `3 4`.",
              "starterCode": "fn main() {\n    // TODO: destructure the tuple\n}",
              "solution": "fn main() {\n    let (x, y) = (3, 4);\n    println!(\"{} {}\", x, y);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "3 4",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "3 4",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-pattern-matching-m1-l2",
            "slug": "rust-pattern-matching-m1-l2",
            "title": "Match Basics",
            "concept": "A match compares a value against several patterns in order and runs the arm whose pattern fits first. Each arm is pattern => expression, and match must be exhaustive, so a wildcard _ arm catches everything else.",
            "syntax": "match n { 0 => \"zero\", _ => \"other\" }",
            "exampleCode": "fn main() {\n    let n = 2;\n    let label = match n {\n        0 => \"zero\",\n        1 => \"one\",\n        _ => \"other\",\n    };\n    println!(\"{}\", label);\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting the wildcard arm, so the match is not exhaustive and fails to compile.",
            "bug": {
              "prompt": "What does the _ pattern match?",
              "buggyCode": "fn main() {\n    println!(\"everything\");\n}",
              "fixedCode": "fn main() {\n    println!(\"nothing\");\n}",
              "explanation": "The wildcard _ matches any value, so it catches all remaining cases."
            },
            "exercise": {
              "title": "Match number program",
              "type": "write-code",
              "instructions": "Write a program that matches n = 2 to \"other\" and prints `other`.",
              "starterCode": "fn main() {\n    let n = 2;\n    // TODO: match n\n}",
              "solution": "fn main() {\n    let n = 2;\n    let label = match n {\n        0 => \"zero\",\n        1 => \"one\",\n        _ => \"other\",\n    };\n    println!(\"{}\", label);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "other",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "other",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-pattern-matching-m1-l3",
            "slug": "rust-pattern-matching-m1-l3",
            "title": "Multiple Patterns with |",
            "concept": "Several patterns can share one arm by joining them with |, as in 1 | 2 => \"small\". This keeps a match short when several values deserve the same result.",
            "syntax": "match n { 1 | 2 => \"small\", _ => \"big\" }",
            "exampleCode": "fn main() {\n    let n = 2;\n    let size = match n {\n        1 | 2 => \"small\",\n        _ => \"big\",\n    };\n    println!(\"{}\", size);\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing 1 || 2, which is a boolean expression, instead of the pattern alternative 1 | 2.",
            "bug": {
              "prompt": "How do you give two patterns the same match arm?",
              "buggyCode": "fn main() {\n    println!(\"with |\");\n}",
              "fixedCode": "fn main() {\n    println!(\"with ||\");\n}",
              "explanation": "The | operator joins patterns in a single arm."
            },
            "exercise": {
              "title": "Or pattern quiz",
              "type": "multiple-choice",
              "instructions": "How do you give two patterns the same match arm?",
              "starterCode": "",
              "solution": "With | between the patterns",
              "solutionExplanation": "In patterns, | means or: 1 | 2 matches either value.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "With | between the patterns",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "With | between the patterns",
                "With || between the patterns",
                "With && between the patterns",
                "By writing two arms"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-pattern-matching-m1-l4",
            "slug": "rust-pattern-matching-m1-l4",
            "title": "Range Patterns",
            "concept": "A range pattern like 1..=5 matches any value in that range, which is ideal for grading bands and age groups. Ranges in patterns use ..= for inclusive ends, just like ranges in for loops.",
            "syntax": "match score { 90..=100 => \"A\", _ => \"other\" }",
            "exampleCode": "fn main() {\n    let score = 85;\n    let grade = match score {\n        90..=100 => \"A\",\n        80..=89 => \"B\",\n        _ => \"other\",\n    };\n    println!(\"{}\", grade);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using an exclusive range 80..89 in a pattern, which Rust patterns do not allow.",
            "bug": {
              "prompt": "Which range pattern matches 80 through 89?",
              "buggyCode": "fn main() {\n    println!(\"80..=89\");\n}",
              "fixedCode": "fn main() {\n    println!(\"80..89\");\n}",
              "explanation": "Pattern ranges must be inclusive: 80..=89."
            },
            "exercise": {
              "title": "Grade range program",
              "type": "write-code",
              "instructions": "Write a program that matches score 85 to \"B\" with range patterns and prints `B`.",
              "starterCode": "fn main() {\n    let score = 85;\n    // TODO: match with ranges\n}",
              "solution": "fn main() {\n    let score = 85;\n    let grade = match score {\n        90..=100 => \"A\",\n        80..=89 => \"B\",\n        _ => \"other\",\n    };\n    println!(\"{}\", grade);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "B",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "B",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-pattern-matching-m1-l5",
            "slug": "rust-pattern-matching-m1-l5",
            "title": "Match Guards",
            "concept": "A match guard adds an if condition to an arm, as in n if n % 2 == 0 => \"even\", so the arm only runs when both the pattern and the guard hold. Guards are useful when the pattern alone cannot express the condition.",
            "syntax": "match n { x if x % 2 == 0 => \"even\", _ => \"odd\" }",
            "exampleCode": "fn main() {\n    let n = 4;\n    let kind = match n {\n        x if x % 2 == 0 => \"even\",\n        _ => \"odd\",\n    };\n    println!(\"{}\", kind);\n}",
            "exampleLanguage": "rust",
            "mistake": "Putting the guard before the pattern, as in `if x % 2 == 0 x =>`, which is not valid syntax.",
            "bug": {
              "prompt": "What is a match guard?",
              "buggyCode": "fn main() {\n    println!(\"if after pattern\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a loop guard\");\n}",
              "explanation": "A guard is an extra if condition on a match arm."
            },
            "exercise": {
              "title": "Guard quiz",
              "type": "multiple-choice",
              "instructions": "What is a match guard?",
              "starterCode": "",
              "solution": "An extra if condition on a match arm",
              "solutionExplanation": "A guard like `x if x % 2 == 0` adds a condition to an arm.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "An extra if condition on a match arm",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "An extra if condition on a match arm",
                "A loop condition",
                "A type annotation",
                "A wildcard pattern"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-pattern-matching-m2",
        "title": "Applying Pattern Matching",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-pattern-matching-m2-l1",
            "slug": "rust-pattern-matching-m2-l1",
            "title": "Binding with @",
            "concept": "The @ operator binds a value while also testing it against a pattern, as in n @ 1..=5 => ..., which names the matched value n. It is handy when you need both the range check and the actual number.",
            "syntax": "match n { x @ 1..=5 => x, _ => 0 }",
            "exampleCode": "fn main() {\n    let n = 3;\n    let v = match n {\n        x @ 1..=5 => x * 10,\n        _ => 0,\n    };\n    println!(\"{}\", v);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using @ to bind a value you never use, which the compiler warns about.",
            "bug": {
              "prompt": "What does `x @ 1..=5` do in a pattern?",
              "buggyCode": "fn main() {\n    println!(\"binds and tests\");\n}",
              "fixedCode": "fn main() {\n    println!(\"compares only\");\n}",
              "explanation": "@ binds the matched value to x while also checking it is in the range."
            },
            "exercise": {
              "title": "At-binding program",
              "type": "write-code",
              "instructions": "Write a program that matches n = 3 with x @ 1..=5, multiplies by 10, and prints `30`.",
              "starterCode": "fn main() {\n    let n = 3;\n    // TODO: match with @\n}",
              "solution": "fn main() {\n    let n = 3;\n    let v = match n {\n        x @ 1..=5 => x * 10,\n        _ => 0,\n    };\n    println!(\"{}\", v);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "30",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "30",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-pattern-matching-m2-l2",
            "slug": "rust-pattern-matching-m2-l2",
            "title": "If Let",
            "concept": "An if let runs its body only when a value matches one pattern, which is shorter than a full match when you care about a single case. The optional else covers everything that did not match.",
            "syntax": "if let Some(x) = opt { println!(\"{}\", x); }",
            "exampleCode": "fn main() {\n    let opt: Option<i32> = Some(7);\n    if let Some(x) = opt {\n        println!(\"got {}\", x);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Using if let when you need to handle every variant, where a match is clearer.",
            "bug": {
              "prompt": "When is if let the right tool?",
              "buggyCode": "fn main() {\n    println!(\"one pattern\");\n}",
              "fixedCode": "fn main() {\n    println!(\"all patterns\");\n}",
              "explanation": "if let is for when you care about a single pattern and can ignore the rest."
            },
            "exercise": {
              "title": "If let program",
              "type": "write-code",
              "instructions": "Write a program that uses if let to print `got 7` for Some(7).",
              "starterCode": "fn main() {\n    let opt: Option<i32> = Some(7);\n    // TODO: if let\n}",
              "solution": "fn main() {\n    let opt: Option<i32> = Some(7);\n    if let Some(x) = opt {\n        println!(\"got {}\", x);\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "got 7",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "got 7",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-pattern-matching-m2-l3",
            "slug": "rust-pattern-matching-m2-l3",
            "title": "While Let",
            "concept": "A while let loop keeps running while a value keeps matching a pattern, as in while let Some(x) = stack.pop(). It is the idiomatic way to drain a collection one item at a time until it is empty.",
            "syntax": "while let Some(x) = stack.pop() { println!(\"{}\", x); }",
            "exampleCode": "fn main() {\n    let mut stack = vec![1, 2, 3];\n    while let Some(x) = stack.pop() {\n        println!(\"popped {}\", x);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Using while let on a value that never stops matching, so the loop never ends.",
            "bug": {
              "prompt": "What does while let Some(x) = stack.pop() do?",
              "buggyCode": "fn main() {\n    println!(\"drains stack\");\n}",
              "fixedCode": "fn main() {\n    println!(\"peeks once\");\n}",
              "explanation": "The loop pops and prints until pop returns None, then stops."
            },
            "exercise": {
              "title": "While let quiz",
              "type": "multiple-choice",
              "instructions": "What does while let Some(x) = stack.pop() do?",
              "starterCode": "",
              "solution": "It pops and processes items until the stack is empty",
              "solutionExplanation": "while let repeats while pop returns Some, stopping at None.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It pops and processes items until the stack is empty",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "It pops and processes items until the stack is empty",
                "It pops exactly one item",
                "It pushes items onto the stack",
                "It checks the stack size"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-pattern-matching-m2-l4",
            "slug": "rust-pattern-matching-m2-l4",
            "title": "Ignoring with _",
            "concept": "The _ pattern ignores a value you do not need, and _name ignores it while still giving it a name. Ignoring parts of a pattern keeps a match focused on the data that matters.",
            "syntax": "let (x, _) = (1, 2);",
            "exampleCode": "fn main() {\n    let pair = (5, 99);\n    let (first, _) = pair;\n    println!(\"first {}\", first);\n}",
            "exampleLanguage": "rust",
            "mistake": "Binding a value you never use with a plain name, which triggers an unused-variable warning.",
            "bug": {
              "prompt": "How do you ignore part of a pattern?",
              "buggyCode": "fn main() {\n    println!(\"with _\");\n}",
              "fixedCode": "fn main() {\n    println!(\"with null\");\n}",
              "explanation": "The _ pattern matches and discards a value."
            },
            "exercise": {
              "title": "Ignore program",
              "type": "write-code",
              "instructions": "Write a program that destructures (5, 99) keeping only the first value and prints `first 5`.",
              "starterCode": "fn main() {\n    let pair = (5, 99);\n    // TODO: keep only the first\n}",
              "solution": "fn main() {\n    let pair = (5, 99);\n    let (first, _) = pair;\n    println!(\"first {}\", first);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "first 5",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "first 5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-pattern-matching-m2-l5",
            "slug": "rust-pattern-matching-m2-l5",
            "title": "Exhaustiveness",
            "concept": "A match must be exhaustive: every possible value must be covered by some arm, or the compiler rejects it. Exhaustiveness is what makes adding a new enum variant safe, because every match is forced to deal with it.",
            "syntax": "match x { Some(v) => v, None => 0 }",
            "exampleCode": "fn main() {\n    let opt: Option<i32> = None;\n    let v = match opt {\n        Some(n) => n,\n        None => 0,\n    };\n    println!(\"value {}\", v);\n}",
            "exampleLanguage": "rust",
            "mistake": "Adding a _ arm too early, which hides the variants you actually need to handle.",
            "bug": {
              "prompt": "Why does Rust require exhaustive matches?",
              "buggyCode": "fn main() {\n    println!(\"no missed case\");\n}",
              "fixedCode": "fn main() {\n    println!(\"faster code\");\n}",
              "explanation": "Exhaustiveness guarantees no possible value is left unhandled."
            },
            "exercise": {
              "title": "Exhaustive match program",
              "type": "write-code",
              "instructions": "Write a program that matches None to 0 and prints `value 0`.",
              "starterCode": "fn main() {\n    let opt: Option<i32> = None;\n    // TODO: exhaustive match\n}",
              "solution": "fn main() {\n    let opt: Option<i32> = None;\n    let v = match opt {\n        Some(n) => n,\n        None => 0,\n    };\n    println!(\"value {}\", v);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "value 0",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "value 0",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Classifier program",
      "type": "write-code",
      "instructions": "Write a program that matches 7 with a guard to print `7 is odd`, matches score 85 with ranges to print `grade B`, and uses if let on Some(3) to print `got 3`.",
      "starterCode": "fn main() {\n    // TODO: match, ranges, if let\n}",
      "solution": "fn main() {\n    let n = 7;\n    let kind = match n {\n        x if x % 2 == 0 => \"even\",\n        _ => \"odd\",\n    };\n    println!(\"{} is {}\", n, kind);\n    let score = 85;\n    let grade = match score {\n        90..=100 => \"A\",\n        80..=89 => \"B\",\n        _ => \"other\",\n    };\n    println!(\"grade {}\", grade);\n    let opt: Option<i32> = Some(3);\n    if let Some(x) = opt {\n        println!(\"got {}\", x);\n    }\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "7 is odd\ngrade B\ngot 3",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "7 is odd",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Classifier Program",
      "description": "Build a program that classifies numbers and options with match, guards, and if let.",
      "requirements": [
        "Program classifies 0, 1, 2, and 7 with a match",
        "Program uses a range pattern for a grade",
        "Program uses if let on an Option",
        "Program prints every result with a label"
      ],
      "rubric": [
        "Match arms are correct",
        "Range pattern works",
        "if let works",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-match",
    "slug": "rust-match",
    "language": "rust",
    "category": "languages",
    "title": "Match Expressions",
    "description": "Use match as an expression on numbers, strings, booleans, tuples, Option, and Result.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Using match as a value",
      "Matching numbers and strings",
      "Matching booleans",
      "Matching Option and Result",
      "Matching tuples and enums",
      "Refactoring if chains to match"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like using a switchboard: one input, many labelled outputs, and exactly one lights up.",
    "modules": [
      {
        "id": "rust-match-m1",
        "title": "Fundamentals of Match Expressions",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-match-m1-l1",
            "slug": "rust-match-m1-l1",
            "title": "Match as an Expression",
            "concept": "A match is an expression, so it produces a value that you can assign to a variable. Every arm must return the same type, just like the two arms of an if expression.",
            "syntax": "let s = match n { 0 => \"zero\", _ => \"many\" };",
            "exampleCode": "fn main() {\n    let n = 0;\n    let s = match n {\n        0 => \"zero\",\n        _ => \"many\",\n    };\n    println!(\"{}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Giving arms different types, for example a number in one and a string in another.",
            "bug": {
              "prompt": "What must all arms of a match expression return?",
              "buggyCode": "fn main() {\n    println!(\"same type\");\n}",
              "fixedCode": "fn main() {\n    println!(\"any type\");\n}",
              "explanation": "All arms must return the same type, since the match has one result type."
            },
            "exercise": {
              "title": "Match type quiz",
              "type": "multiple-choice",
              "instructions": "What must all arms of a match expression return?",
              "starterCode": "",
              "solution": "The same type",
              "solutionExplanation": "A match expression has one type, so every arm must produce it.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The same type",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "The same type",
                "Any type",
                "A String",
                "An integer"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-match-m1-l2",
            "slug": "rust-match-m1-l2",
            "title": "Match on Numbers",
            "concept": "Matching on a number lets you name each special case and catch the rest with _, which is clearer than a long if-else chain. The arms are tried in order, so the first matching pattern wins.",
            "syntax": "match n { 1 => \"one\", 2 => \"two\", _ => \"other\" }",
            "exampleCode": "fn main() {\n    for n in [1, 2, 9] {\n        let label = match n {\n            1 => \"one\",\n            2 => \"two\",\n            _ => \"other\",\n        };\n        println!(\"{} {}\", n, label);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Putting the _ arm first, so no later arm can ever run.",
            "bug": {
              "prompt": "In what order are match arms tried?",
              "buggyCode": "fn main() {\n    println!(\"in order\");\n}",
              "fixedCode": "fn main() {\n    println!(\"any order\");\n}",
              "explanation": "Arms are tried top to bottom; the first match wins."
            },
            "exercise": {
              "title": "Number labels program",
              "type": "write-code",
              "instructions": "Write a program that matches 1, 2, 9 to `one`, `two`, `other` and prints `1 one`, `2 two`, `9 other`.",
              "starterCode": "fn main() {\n    for n in [1, 2, 9] {\n        // TODO: match n\n    }\n}",
              "solution": "fn main() {\n    for n in [1, 2, 9] {\n        let label = match n {\n            1 => \"one\",\n            2 => \"two\",\n            _ => \"other\",\n        };\n        println!(\"{} {}\", n, label);\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "1 one\n2 two\n9 other",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "1 one",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-match-m1-l3",
            "slug": "rust-match-m1-l3",
            "title": "Match on Strings",
            "concept": "Matching on &str compares the text against string literal patterns, which reads like a small dispatch table. Each arm handles one command word, and _ handles unknown input.",
            "syntax": "match cmd { \"quit\" => break, _ => {} }",
            "exampleCode": "fn main() {\n    let cmd = \"start\";\n    let action = match cmd {\n        \"start\" => \"starting\",\n        \"stop\" => \"stopping\",\n        _ => \"unknown\",\n    };\n    println!(\"{}\", action);\n}",
            "exampleLanguage": "rust",
            "mistake": "Matching a String by value instead of by &str, which moves it.",
            "bug": {
              "prompt": "What can you match a &str against?",
              "buggyCode": "fn main() {\n    println!(\"string literals\");\n}",
              "fixedCode": "fn main() {\n    println!(\"only numbers\");\n}",
              "explanation": "String literals are patterns for &str values."
            },
            "exercise": {
              "title": "Command program",
              "type": "write-code",
              "instructions": "Write a program that matches cmd \"start\" to `starting` and prints it.",
              "starterCode": "fn main() {\n    let cmd = \"start\";\n    // TODO: match the command\n}",
              "solution": "fn main() {\n    let cmd = \"start\";\n    let action = match cmd {\n        \"start\" => \"starting\",\n        \"stop\" => \"stopping\",\n        _ => \"unknown\",\n    };\n    println!(\"{}\", action);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "starting",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "starting",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-match-m1-l4",
            "slug": "rust-match-m1-l4",
            "title": "Match on Booleans",
            "concept": "Matching on a bool has exactly two arms, true and false, which makes the decision explicit. It is clearer than an if when both outcomes need a value, because match forces you to write both.",
            "syntax": "match ready { true => \"go\", false => \"wait\" }",
            "exampleCode": "fn main() {\n    let ready = true;\n    let action = match ready {\n        true => \"go\",\n        false => \"wait\",\n    };\n    println!(\"{}\", action);\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing only one arm for a bool, which is not exhaustive.",
            "bug": {
              "prompt": "How many arms does a match on a bool need?",
              "buggyCode": "fn main() {\n    println!(\"two\");\n}",
              "fixedCode": "fn main() {\n    println!(\"one\");\n}",
              "explanation": "A bool has two values, so an exhaustive match needs both arms."
            },
            "exercise": {
              "title": "Bool match quiz",
              "type": "multiple-choice",
              "instructions": "How many arms does a match on a bool need?",
              "starterCode": "",
              "solution": "Two: true and false",
              "solutionExplanation": "Exhaustiveness requires both true and false arms.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Two: true and false",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Two: true and false",
                "One: true",
                "Three: true, false, and _",
                "None, bools cannot be matched"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-match-m1-l5",
            "slug": "rust-match-m1-l5",
            "title": "Match with Blocks",
            "concept": "An arm can run a block of several statements in braces, and the block's last expression is the arm's value. Blocks keep a match readable when one case needs several steps.",
            "syntax": "match n { 0 => { println!(\"zero\"); 0 } _ => n }",
            "exampleCode": "fn main() {\n    let n = 0;\n    let v = match n {\n        0 => {\n            println!(\"was zero\");\n            0\n        }\n        _ => n,\n    };\n    println!(\"value {}\", v);\n}",
            "exampleLanguage": "rust",
            "mistake": "Ending the block with a semicolon, so the block returns () instead of the value.",
            "bug": {
              "prompt": "How does a block arm produce its value?",
              "buggyCode": "fn main() {\n    println!(\"last expression\");\n}",
              "fixedCode": "fn main() {\n    println!(\"first line\");\n}",
              "explanation": "A block arm's value is its last expression, without a semicolon."
            },
            "exercise": {
              "title": "Block arm program",
              "type": "write-code",
              "instructions": "Write a program that matches 0 with a block printing `was zero` and returning 0, then prints `value 0`.",
              "starterCode": "fn main() {\n    let n = 0;\n    // TODO: match with a block arm\n}",
              "solution": "fn main() {\n    let n = 0;\n    let v = match n {\n        0 => {\n            println!(\"was zero\");\n            0\n        }\n        _ => n,\n    };\n    println!(\"value {}\", v);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "was zero\nvalue 0",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "was zero",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-match-m2",
        "title": "Applying Match Expressions",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-match-m2-l1",
            "slug": "rust-match-m2-l1",
            "title": "Match on Option",
            "concept": "Matching on Option is the standard way to handle a possibly-absent value: Some(v) gives you the value, None gives you the fallback. This is safer than unwrap, because the None case is handled in the open.",
            "syntax": "match opt { Some(v) => v, None => 0 }",
            "exampleCode": "fn main() {\n    let opt: Option<i32> = Some(9);\n    let v = match opt {\n        Some(n) => n,\n        None => 0,\n    };\n    println!(\"value {}\", v);\n}",
            "exampleLanguage": "rust",
            "mistake": "Unwrapping an Option that may be None, which panics instead of handling the missing case.",
            "bug": {
              "prompt": "How should you handle an Option that may be None?",
              "buggyCode": "fn main() {\n    println!(\"match both\");\n}",
              "fixedCode": "fn main() {\n    println!(\"unwrap always\");\n}",
              "explanation": "Match on Some and None so the missing case is handled."
            },
            "exercise": {
              "title": "Option match program",
              "type": "write-code",
              "instructions": "Write a program that matches Some(9) to 9 and prints `value 9`.",
              "starterCode": "fn main() {\n    let opt: Option<i32> = Some(9);\n    // TODO: match the option\n}",
              "solution": "fn main() {\n    let opt: Option<i32> = Some(9);\n    let v = match opt {\n        Some(n) => n,\n        None => 0,\n    };\n    println!(\"value {}\", v);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "value 9",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "value 9",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-match-m2-l2",
            "slug": "rust-match-m2-l2",
            "title": "Match on Result",
            "concept": "Matching on Result separates the success path from the error path: Ok(v) continues with the value, Err(e) reports or recovers. Writing both arms makes the error handling visible instead of hidden.",
            "syntax": "match r { Ok(v) => v, Err(_) => 0 }",
            "exampleCode": "fn main() {\n    let r: Result<i32, &str> = Err(\"bad\");\n    let v = match r {\n        Ok(n) => n,\n        Err(_) => 0,\n    };\n    println!(\"value {}\", v);\n}",
            "exampleLanguage": "rust",
            "mistake": "Handling only the Ok arm and letting the match fail to compile on the missing Err arm.",
            "bug": {
              "prompt": "What must a match on Result cover?",
              "buggyCode": "fn main() {\n    println!(\"Ok and Err\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Ok only\");\n}",
              "explanation": "A match on Result must handle both Ok and Err."
            },
            "exercise": {
              "title": "Result match program",
              "type": "write-code",
              "instructions": "Write a program that matches Err(\"bad\") to 0 and prints `value 0`.",
              "starterCode": "fn main() {\n    let r: Result<i32, &str> = Err(\"bad\");\n    // TODO: match the result\n}",
              "solution": "fn main() {\n    let r: Result<i32, &str> = Err(\"bad\");\n    let v = match r {\n        Ok(n) => n,\n        Err(_) => 0,\n    };\n    println!(\"value {}\", v);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "value 0",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "value 0",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-match-m2-l3",
            "slug": "rust-match-m2-l3",
            "title": "Match on Tuples",
            "concept": "Matching on a tuple lets you test several values at once, as in match (x, y) { (0, 0) => \"origin\", _ => \"elsewhere\" }. Tuple patterns are the clearest way to write decisions that depend on a combination.",
            "syntax": "match (x, y) { (0, 0) => \"origin\", _ => \"elsewhere\" }",
            "exampleCode": "fn main() {\n    let p = (0, 5);\n    let label = match p {\n        (0, 0) => \"origin\",\n        (0, _) => \"on y axis\",\n        (_, 0) => \"on x axis\",\n        _ => \"elsewhere\",\n    };\n    println!(\"{}\", label);\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting that tuple patterns must list every element, including the ones you ignore with _.",
            "bug": {
              "prompt": "How do you match a tuple's first element being 0?",
              "buggyCode": "fn main() {\n    println!(\"(0, _)\");\n}",
              "fixedCode": "fn main() {\n    println!(\"(0)\");\n}",
              "explanation": "The pattern (0, _) matches a 2-tuple whose first element is 0."
            },
            "exercise": {
              "title": "Tuple match program",
              "type": "write-code",
              "instructions": "Write a program that matches (0, 5) to `on y axis` and prints it.",
              "starterCode": "fn main() {\n    let p = (0, 5);\n    // TODO: match the tuple\n}",
              "solution": "fn main() {\n    let p = (0, 5);\n    let label = match p {\n        (0, 0) => \"origin\",\n        (0, _) => \"on y axis\",\n        (_, 0) => \"on x axis\",\n        _ => \"elsewhere\",\n    };\n    println!(\"{}\", label);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "on y axis",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "on y axis",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-match-m2-l4",
            "slug": "rust-match-m2-l4",
            "title": "Match on Enums with Data",
            "concept": "Matching on an enum with data binds the data in each arm, so Shape::Circle(r) gives you the radius directly. Each arm handles one shape of the value, and the bindings are only in scope inside that arm.",
            "syntax": "match s { Shape::Circle(r) => r, Shape::Rect(w, h) => w * h }",
            "exampleCode": "enum Shape {\n    Circle(f64),\n    Rect(f64, f64),\n}\nfn main() {\n    let s = Shape::Rect(3.0, 4.0);\n    let area = match s {\n        Shape::Circle(r) => 3.14 * r * r,\n        Shape::Rect(w, h) => w * h,\n    };\n    println!(\"area {}\", area);\n}",
            "exampleLanguage": "rust",
            "mistake": "Binding the data with the wrong number of names, for example one name for a two-field variant.",
            "bug": {
              "prompt": "How do you get the data out of an enum variant in a match?",
              "buggyCode": "fn main() {\n    println!(\"bind in pattern\");\n}",
              "fixedCode": "fn main() {\n    println!(\"call a getter\");\n}",
              "explanation": "The pattern binds the variant's data to names, like Shape::Rect(w, h)."
            },
            "exercise": {
              "title": "Enum data quiz",
              "type": "multiple-choice",
              "instructions": "How do you get the data out of an enum variant in a match?",
              "starterCode": "",
              "solution": "By binding it in the pattern, like Shape::Rect(w, h)",
              "solutionExplanation": "Patterns bind variant data to names in each arm.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "By binding it in the pattern, like Shape::Rect(w, h)",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "By binding it in the pattern, like Shape::Rect(w, h)",
                "By calling a getter method",
                "By indexing the variant",
                "Enum data cannot be read"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-match-m2-l5",
            "slug": "rust-match-m2-l5",
            "title": "Refactoring If Chains to Match",
            "concept": "A long if-else chain that compares one value against many constants is clearer as a match. Match shows the value once at the top and lists the cases, while the chain repeats the comparison in every branch.",
            "syntax": "match day { 1 => \"Mon\", 2 => \"Tue\", _ => \"?\" }",
            "exampleCode": "fn main() {\n    let day = 2;\n    let name = match day {\n        1 => \"Mon\",\n        2 => \"Tue\",\n        3 => \"Wed\",\n        _ => \"other\",\n    };\n    println!(\"{}\", name);\n}",
            "exampleLanguage": "rust",
            "mistake": "Keeping a ten-branch if-else chain when a match would show the structure at a glance.",
            "bug": {
              "prompt": "When is match better than an if-else chain?",
              "buggyCode": "fn main() {\n    println!(\"many constants\");\n}",
              "fixedCode": "fn main() {\n    println!(\"one condition\");\n}",
              "explanation": "Match is clearer when one value is compared against many constants."
            },
            "exercise": {
              "title": "Day match program",
              "type": "write-code",
              "instructions": "Write a program that matches day 2 to `Tue` and prints it.",
              "starterCode": "fn main() {\n    let day = 2;\n    // TODO: match the day\n}",
              "solution": "fn main() {\n    let day = 2;\n    let name = match day {\n        1 => \"Mon\",\n        2 => \"Tue\",\n        3 => \"Wed\",\n        _ => \"other\",\n    };\n    println!(\"{}\", name);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Tue",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Tue",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Dispatch program",
      "type": "write-code",
      "instructions": "Write a program that matches cmd \"stop\" to `stopping`, matches n 3 to `three`, and matches Option Some(8) to 8, printing `stopping`, `three`, `value 8`.",
      "starterCode": "fn main() {\n    // TODO: three matches\n}",
      "solution": "fn main() {\n    let cmd = \"stop\";\n    let action = match cmd {\n        \"start\" => \"starting\",\n        \"stop\" => \"stopping\",\n        _ => \"unknown\",\n    };\n    println!(\"{}\", action);\n    let n = 3;\n    let label = match n {\n        1 => \"one\",\n        3 => \"three\",\n        _ => \"other\",\n    };\n    println!(\"{}\", label);\n    let opt: Option<i32> = Some(8);\n    let v = match opt {\n        Some(x) => x,\n        None => 0,\n    };\n    println!(\"value {}\", v);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "stopping\nthree\nvalue 8",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "stopping",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Dispatch Program",
      "description": "Build a program that dispatches commands and values with match expressions.",
      "requirements": [
        "Program matches a command string to an action",
        "Program matches a number to a label",
        "Program matches an Option to a value or a default",
        "Program prints every result with a label"
      ],
      "rubric": [
        "Command dispatch is correct",
        "Number match is correct",
        "Option match is correct",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-result-errors",
    "slug": "rust-result-errors",
    "language": "rust",
    "category": "languages",
    "title": "Error Handling: Result",
    "description": "Handle errors the Rust way with Result, ?, unwrap_or, map, and custom error types.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Using Result<T, E>",
      "Returning Results from functions",
      "Using the ? operator",
      "Propagating errors",
      "Defining custom errors",
      "Using unwrap_or and map"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to carry a spare tyre: you plan for the flat instead of hoping it never happens.",
    "modules": [
      {
        "id": "rust-result-errors-m1",
        "title": "Fundamentals of Error Handling: Result",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-result-errors-m1-l1",
            "slug": "rust-result-errors-m1-l1",
            "title": "What Is a Result",
            "concept": "A Result<T, E> is either Ok(T) holding a success value or Err(E) holding an error, and it is Rust's standard way to report that an operation can fail. Because the error is a value, the compiler forces the caller to deal with it.",
            "syntax": "let r: Result<i32, String> = Ok(1);",
            "exampleCode": "fn main() {\n    let ok: Result<i32, String> = Ok(1);\n    let err: Result<i32, String> = Err(String::from(\"oops\"));\n    println!(\"{} {}\", ok.is_ok(), err.is_err());\n}",
            "exampleLanguage": "rust",
            "mistake": "Treating a Result as if it were the success value, without handling the Err case.",
            "bug": {
              "prompt": "What are the variants of Result<T, E>?",
              "buggyCode": "fn main() {\n    println!(\"Ok and Err\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Some and None\");\n}",
              "explanation": "Result is Ok(T) for success and Err(E) for failure."
            },
            "exercise": {
              "title": "Result basics program",
              "type": "write-code",
              "instructions": "Write a program that prints `true true` for Ok(1).is_ok() and Err(\"oops\").is_err().",
              "starterCode": "fn main() {\n    let ok: Result<i32, String> = Ok(1);\n    let err: Result<i32, String> = Err(String::from(\"oops\"));\n    // TODO: print the checks\n}",
              "solution": "fn main() {\n    let ok: Result<i32, String> = Ok(1);\n    let err: Result<i32, String> = Err(String::from(\"oops\"));\n    println!(\"{} {}\", ok.is_ok(), err.is_err());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "true true",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "true true",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-result-errors-m1-l2",
            "slug": "rust-result-errors-m1-l2",
            "title": "Returning a Result",
            "concept": "A function that can fail returns Result<T, E>, with Ok for the success value and Err for the problem. Callers then match on the result or use ?, and the error type E says what can go wrong.",
            "syntax": "fn parse(s: &str) -> Result<i32, std::num::ParseIntError> { s.parse() }",
            "exampleCode": "fn double(s: &str) -> Result<i32, String> {\n    match s.parse::<i32>() {\n        Ok(n) => Ok(n * 2),\n        Err(_) => Err(String::from(\"not a number\")),\n    }\n}\nfn main() {\n    println!(\"{:?}\", double(\"21\"));\n    println!(\"{:?}\", double(\"no\"));\n}",
            "exampleLanguage": "rust",
            "mistake": "Returning the success value directly and panicking on failure, instead of returning a Result.",
            "bug": {
              "prompt": "What should a function return when it can fail?",
              "buggyCode": "fn main() {\n    println!(\"a Result\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a plain value\");\n}",
              "explanation": "A fallible function returns Result<T, E> so callers handle failure."
            },
            "exercise": {
              "title": "Double parse program",
              "type": "write-code",
              "instructions": "Write a program with double(s: &str) -> Result<i32, String> that doubles \"21\" to Ok(42) and fails on \"no\", printing `Ok(42)` and `Err(\"not a number\")`.",
              "starterCode": "fn double(s: &str) -> Result<i32, String> {\n    // TODO: parse and double, or error\n    Ok(0)\n}\nfn main() {\n    println!(\"{:?}\", double(\"21\"));\n    println!(\"{:?}\", double(\"no\"));\n}",
              "solution": "fn double(s: &str) -> Result<i32, String> {\n    match s.parse::<i32>() {\n        Ok(n) => Ok(n * 2),\n        Err(_) => Err(String::from(\"not a number\")),\n    }\n}\nfn main() {\n    println!(\"{:?}\", double(\"21\"));\n    println!(\"{:?}\", double(\"no\"));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Ok(42)\nErr(\"not a number\")",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Ok(42)",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-result-errors-m1-l3",
            "slug": "rust-result-errors-m1-l3",
            "title": "Unwrap and Expect",
            "concept": "The unwrap method returns the Ok value or panics on Err, and expect does the same with a custom panic message. Both are fine in quick prototypes and tests, but production code should handle the error instead of panicking.",
            "syntax": "let n: i32 = \"42\".parse().unwrap();",
            "exampleCode": "fn main() {\n    let n: i32 = \"42\".parse().unwrap();\n    println!(\"parsed {}\", n);\n    let m: i32 = \"7\".parse().expect(\"a number\");\n    println!(\"expected {}\", m);\n}",
            "exampleLanguage": "rust",
            "mistake": "Calling unwrap on a Result that can fail in real use, turning a recoverable error into a crash.",
            "bug": {
              "prompt": "What does unwrap do on an Err?",
              "buggyCode": "fn main() {\n    println!(\"panics\");\n}",
              "fixedCode": "fn main() {\n    println!(\"returns zero\");\n}",
              "explanation": "unwrap panics when the Result is Err."
            },
            "exercise": {
              "title": "Unwrap quiz",
              "type": "multiple-choice",
              "instructions": "What does unwrap do on an Err?",
              "starterCode": "",
              "solution": "It panics",
              "solutionExplanation": "unwrap returns the Ok value or panics on Err.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It panics",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "It panics",
                "It returns zero",
                "It returns None",
                "It retries the operation"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-result-errors-m1-l4",
            "slug": "rust-result-errors-m1-l4",
            "title": "The ? Operator",
            "concept": "The ? operator inside a function returning Result unwraps an Ok value or returns the Err early to the caller. It turns nested match blocks into a straight line of fallible calls, which is the idiomatic way to write error handling in Rust.",
            "syntax": "fn f() -> Result<i32, String> { let n = g()?; Ok(n) }",
            "exampleCode": "fn parse_it(s: &str) -> Result<i32, String> {\n    let n: i32 = s.parse().map_err(|_| String::from(\"bad number\"))?;\n    Ok(n * 2)\n}\nfn main() {\n    println!(\"{:?}\", parse_it(\"21\"));\n    println!(\"{:?}\", parse_it(\"no\"));\n}",
            "exampleLanguage": "rust",
            "mistake": "Using ? in a function that returns () or a plain value, where there is no Result to return the error into.",
            "bug": {
              "prompt": "What does ? do on an Err?",
              "buggyCode": "fn main() {\n    println!(\"returns early\");\n}",
              "fixedCode": "fn main() {\n    println!(\"panics\");\n}",
              "explanation": "? returns the Err from the current function immediately."
            },
            "exercise": {
              "title": "Question mark program",
              "type": "write-code",
              "instructions": "Write a program with parse_it using ? that prints `Ok(42)` for \"21\" and `Err(\"bad number\")` for \"no\".",
              "starterCode": "fn parse_it(s: &str) -> Result<i32, String> {\n    // TODO: parse with ? and double\n    Ok(0)\n}\nfn main() {\n    println!(\"{:?}\", parse_it(\"21\"));\n    println!(\"{:?}\", parse_it(\"no\"));\n}",
              "solution": "fn parse_it(s: &str) -> Result<i32, String> {\n    let n: i32 = s.parse().map_err(|_| String::from(\"bad number\"))?;\n    Ok(n * 2)\n}\nfn main() {\n    println!(\"{:?}\", parse_it(\"21\"));\n    println!(\"{:?}\", parse_it(\"no\"));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Ok(42)\nErr(\"bad number\")",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Ok(42)",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-result-errors-m1-l5",
            "slug": "rust-result-errors-m1-l5",
            "title": "Matching on Result",
            "concept": "A match on Result handles Ok and Err in separate arms, which is the clearest way to deal with an error at the boundary of your program. The Err arm can log the problem, use a default, or return early.",
            "syntax": "match r { Ok(v) => println!(\"{}\", v), Err(e) => println!(\"error: {}\", e) }",
            "exampleCode": "fn main() {\n    let r: Result<i32, String> = Err(String::from(\"missing\"));\n    match r {\n        Ok(v) => println!(\"got {}\", v),\n        Err(e) => println!(\"error: {}\", e),\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Matching only Ok and forgetting Err, which the compiler rejects as non-exhaustive.",
            "bug": {
              "prompt": "What must a match on Result handle?",
              "buggyCode": "fn main() {\n    println!(\"both arms\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Ok only\");\n}",
              "explanation": "Both Ok and Err arms are required for an exhaustive match."
            },
            "exercise": {
              "title": "Result match quiz",
              "type": "multiple-choice",
              "instructions": "What must a match on Result handle?",
              "starterCode": "",
              "solution": "Both Ok and Err",
              "solutionExplanation": "An exhaustive match on Result needs Ok and Err arms.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Both Ok and Err",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Both Ok and Err",
                "Only Ok",
                "Only Err",
                "Neither, it is optional"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-result-errors-m2",
        "title": "Applying Error Handling: Result",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-result-errors-m2-l1",
            "slug": "rust-result-errors-m2-l1",
            "title": "Propagating Errors",
            "concept": "Error propagation means returning an error to the caller instead of handling it yourself, usually with ?. The caller decides what to do: retry, use a default, or report the problem to the user.",
            "syntax": "fn load() -> Result<String, std::io::Error> { std::fs::read_to_string(\"a.txt\") }",
            "exampleCode": "fn double_file(s: &str) -> Result<i32, String> {\n    let n: i32 = s.parse().map_err(|_| String::from(\"bad\"))?;\n    Ok(n * 2)\n}\nfn main() {\n    match double_file(\"21\") {\n        Ok(v) => println!(\"ok {}\", v),\n        Err(e) => println!(\"err {}\", e),\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Handling an error deep inside a helper by printing and returning a magic value, instead of propagating it.",
            "bug": {
              "prompt": "How do you pass an error up to the caller?",
              "buggyCode": "fn main() {\n    println!(\"with ?\");\n}",
              "fixedCode": "fn main() {\n    println!(\"with unwrap\");\n}",
              "explanation": "? propagates the Err to the caller of the current function."
            },
            "exercise": {
              "title": "Propagate program",
              "type": "write-code",
              "instructions": "Write a program with double_file using ? that prints `ok 42` for \"21\".",
              "starterCode": "fn double_file(s: &str) -> Result<i32, String> {\n    // TODO: parse with ? and double\n    Ok(0)\n}\nfn main() {\n    match double_file(\"21\") {\n        Ok(v) => println!(\"ok {}\", v),\n        Err(e) => println!(\"err {}\", e),\n    }\n}",
              "solution": "fn double_file(s: &str) -> Result<i32, String> {\n    let n: i32 = s.parse().map_err(|_| String::from(\"bad\"))?;\n    Ok(n * 2)\n}\nfn main() {\n    match double_file(\"21\") {\n        Ok(v) => println!(\"ok {}\", v),\n        Err(e) => println!(\"err {}\", e),\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "ok 42",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "ok 42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-result-errors-m2-l2",
            "slug": "rust-result-errors-m2-l2",
            "title": "Custom Error Types",
            "concept": "A custom error type, usually an enum, names every way your code can fail, and implementing Display gives each variant a human-readable message. Callers can then match on the exact failure instead of a bare string.",
            "syntax": "enum AppError { NotFound, BadInput }",
            "exampleCode": "enum AppError {\n    NotFound,\n    BadInput,\n}\nfn find(n: i32) -> Result<i32, AppError> {\n    if n < 0 {\n        Err(AppError::BadInput)\n    } else {\n        Ok(n)\n    }\n}\nfn main() {\n    println!(\"{:?}\", find(5).is_ok());\n    println!(\"{:?}\", find(-1).is_err());\n}",
            "exampleLanguage": "rust",
            "mistake": "Using String for every error, so callers cannot tell one failure from another.",
            "bug": {
              "prompt": "Why define a custom error enum?",
              "buggyCode": "fn main() {\n    println!(\"name each failure\");\n}",
              "fixedCode": "fn main() {\n    println!(\"shorter code\");\n}",
              "explanation": "A custom enum names each failure, so callers can match on the exact problem."
            },
            "exercise": {
              "title": "Custom error program",
              "type": "write-code",
              "instructions": "Write a program with enum AppError { NotFound, BadInput } and find() returning Ok for 5 and Err for -1, printing `true true`.",
              "starterCode": "enum AppError {\n    NotFound,\n    BadInput,\n}\nfn find(n: i32) -> Result<i32, AppError> {\n    // TODO: error on negative\n    Ok(n)\n}\nfn main() {\n    println!(\"{:?}\", find(5).is_ok());\n    println!(\"{:?}\", find(-1).is_err());\n}",
              "solution": "enum AppError {\n    NotFound,\n    BadInput,\n}\nfn find(n: i32) -> Result<i32, AppError> {\n    if n < 0 {\n        Err(AppError::BadInput)\n    } else {\n        Ok(n)\n    }\n}\nfn main() {\n    println!(\"{:?}\", find(5).is_ok());\n    println!(\"{:?}\", find(-1).is_err());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "true\ntrue",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "true",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-result-errors-m2-l3",
            "slug": "rust-result-errors-m2-l3",
            "title": "unwrap_or and Defaults",
            "concept": "The unwrap_or method returns the Ok value or a default you supply, and unwrap_or_else computes the default lazily. These are the right tools when a failure has a sensible fallback and is not worth reporting.",
            "syntax": "let n = r.unwrap_or(0);",
            "exampleCode": "fn main() {\n    let r: Result<i32, String> = Err(String::from(\"x\"));\n    println!(\"{}\", r.unwrap_or(0));\n    let ok: Result<i32, String> = Ok(9);\n    println!(\"{}\", ok.unwrap_or(0));\n}",
            "exampleLanguage": "rust",
            "mistake": "Using unwrap_or to hide an error that the user needed to know about.",
            "bug": {
              "prompt": "What does unwrap_or(0) return for an Err?",
              "buggyCode": "fn main() {\n    println!(\"0\");\n}",
              "fixedCode": "fn main() {\n    println!(\"panics\");\n}",
              "explanation": "unwrap_or returns the default you give it when the Result is Err."
            },
            "exercise": {
              "title": "unwrap_or quiz",
              "type": "multiple-choice",
              "instructions": "What does unwrap_or(0) return for an Err?",
              "starterCode": "",
              "solution": "0",
              "solutionExplanation": "unwrap_or supplies the default on Err.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "0",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "0",
                "It panics",
                "None",
                "The error value"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-result-errors-m2-l4",
            "slug": "rust-result-errors-m2-l4",
            "title": "Mapping Results",
            "concept": "The map method transforms the Ok value of a Result without touching the Err, and map_err transforms the error instead. Mapping keeps error handling in a chain of small steps instead of a nested match.",
            "syntax": "let r2 = r.map(|n| n * 2);",
            "exampleCode": "fn main() {\n    let r: Result<i32, String> = Ok(21);\n    let doubled = r.map(|n| n * 2);\n    println!(\"{:?}\", doubled);\n}",
            "exampleLanguage": "rust",
            "mistake": "Unwrapping a Result just to transform its value, when map would do it without panicking.",
            "bug": {
              "prompt": "What does map do to a Result?",
              "buggyCode": "fn main() {\n    println!(\"transforms Ok\");\n}",
              "fixedCode": "fn main() {\n    println!(\"transforms Err\");\n}",
              "explanation": "map applies a function to the Ok value and leaves Err unchanged."
            },
            "exercise": {
              "title": "Map result program",
              "type": "write-code",
              "instructions": "Write a program that maps Ok(21) with |n| n * 2 and prints `Ok(42)`.",
              "starterCode": "fn main() {\n    let r: Result<i32, String> = Ok(21);\n    // TODO: map the value\n}",
              "solution": "fn main() {\n    let r: Result<i32, String> = Ok(21);\n    let doubled = r.map(|n| n * 2);\n    println!(\"{:?}\", doubled);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Ok(42)",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Ok(42)",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-result-errors-m2-l5",
            "slug": "rust-result-errors-m2-l5",
            "title": "Result in main",
            "concept": "A main function can return Result<(), E>, which lets you use ? at the top level and prints the error with Debug if one escapes. Returning Result from main is the simplest way to write a small program that can fail cleanly.",
            "syntax": "fn main() -> Result<(), String> { Ok(()) }",
            "exampleCode": "fn main() -> Result<(), String> {\n    let n: i32 = \"42\".parse().map_err(|_| String::from(\"bad\"))?;\n    println!(\"parsed {}\", n);\n    Ok(())\n}",
            "exampleLanguage": "rust",
            "mistake": "Using unwrap in main for errors that a Result return would report cleanly.",
            "bug": {
              "prompt": "What can main return to allow ? at the top level?",
              "buggyCode": "fn main() {\n    println!(\"Result<(), E>\");\n}",
              "fixedCode": "fn main() {\n    println!(\"only ()\");\n}",
              "explanation": "main may return Result<(), E>, so ? works at the top level."
            },
            "exercise": {
              "title": "Main result program",
              "type": "write-code",
              "instructions": "Write a program whose main returns Result<(), String>, parses \"42\", and prints `parsed 42`.",
              "starterCode": "fn main() -> Result<(), String> {\n    // TODO: parse with ? and print\n    Ok(())\n}",
              "solution": "fn main() -> Result<(), String> {\n    let n: i32 = \"42\".parse().map_err(|_| String::from(\"bad\"))?;\n    println!(\"parsed {}\", n);\n    Ok(())\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "parsed 42",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "parsed 42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Safe parser",
      "type": "write-code",
      "instructions": "Write a program with parse_and_double(s) -> Result<i32, String> using ? that prints `Ok(84)` for \"42\" and `Err(\"bad number\")` for \"abc\".",
      "starterCode": "fn parse_and_double(s: &str) -> Result<i32, String> {\n    // TODO\n    Ok(0)\n}\nfn main() {\n    // TODO: print both results\n}",
      "solution": "fn parse_and_double(s: &str) -> Result<i32, String> {\n    let n: i32 = s.parse().map_err(|_| String::from(\"bad number\"))?;\n    Ok(n * 2)\n}\nfn main() {\n    println!(\"{:?}\", parse_and_double(\"42\"));\n    println!(\"{:?}\", parse_and_double(\"abc\"));\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "Ok(84)\nErr(\"bad number\")",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "Ok(84)",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Safe Parser",
      "description": "Build a program that parses numbers safely, reports errors, and never panics on bad input.",
      "requirements": [
        "Program parses \"42\" to 42",
        "Program reports \"abc\" as an error, not a panic",
        "Program uses ? in a helper returning Result",
        "Program prints a labelled result for each input"
      ],
      "rubric": [
        "Good input parses",
        "Bad input is an error value",
        "? is used for propagation",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-option",
    "slug": "rust-option",
    "language": "rust",
    "category": "languages",
    "title": "Error Handling: Option",
    "description": "Handle possibly-missing values with Option: match, if let, map, and_then, and combinators.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Using Option<T>",
      "Matching on Option",
      "Using if let",
      "Applying map and and_then",
      "Using or and filter",
      "Choosing Option vs Result"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like checking whether a seat is taken before sitting down: look first, then decide.",
    "modules": [
      {
        "id": "rust-option-m1",
        "title": "Fundamentals of Error Handling: Option",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-option-m1-l1",
            "slug": "rust-option-m1-l1",
            "title": "What Is an Option",
            "concept": "Option<T> represents a value that may or may not be present: Some(T) holds a value and None holds nothing. Rust has no null, so Option is how you say a value might be missing, and the type system makes you handle both cases.",
            "syntax": "let x: Option<i32> = Some(5);\nlet y: Option<i32> = None;",
            "exampleCode": "fn main() {\n    let x: Option<i32> = Some(5);\n    let y: Option<i32> = None;\n    println!(\"{} {}\", x.is_some(), y.is_none());\n}",
            "exampleLanguage": "rust",
            "mistake": "Treating an Option<i32> as an i32 and forgetting to handle None.",
            "bug": {
              "prompt": "How does Rust represent a possibly-missing value?",
              "buggyCode": "fn main() {\n    println!(\"with Option\");\n}",
              "fixedCode": "fn main() {\n    println!(\"with null\");\n}",
              "explanation": "Rust uses Option<T>: Some(T) or None. There is no null."
            },
            "exercise": {
              "title": "Option basics quiz",
              "type": "multiple-choice",
              "instructions": "How does Rust represent a possibly-missing value?",
              "starterCode": "",
              "solution": "With Option<T>: Some(T) or None",
              "solutionExplanation": "Rust has no null; Option is the way to model absence.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "With Option<T>: Some(T) or None",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "With Option<T>: Some(T) or None",
                "With null",
                "With a zero value",
                "With an empty string"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-option-m1-l2",
            "slug": "rust-option-m1-l2",
            "title": "Creating Options",
            "concept": "You create an Option with Some(value) when you have a value and None when you do not. Functions return Option when a lookup can fail to find anything, like finding the first element that matches a test.",
            "syntax": "fn first(xs: &[i32]) -> Option<i32> { xs.first().copied() }",
            "exampleCode": "fn first(xs: &[i32]) -> Option<i32> {\n    xs.first().copied()\n}\nfn main() {\n    println!(\"{:?}\", first(&[3, 4]));\n    println!(\"{:?}\", first(&[]));\n}",
            "exampleLanguage": "rust",
            "mistake": "Returning a magic value like -1 for missing data instead of None.",
            "bug": {
              "prompt": "What does a function return when it may find nothing?",
              "buggyCode": "fn main() {\n    println!(\"Option\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a magic value\");\n}",
              "explanation": "Return Option<T>: Some when found, None when not."
            },
            "exercise": {
              "title": "First element program",
              "type": "write-code",
              "instructions": "Write a program with first(xs) -> Option<i32> printing `Some(3)` for [3, 4] and `None` for [].",
              "starterCode": "fn first(xs: &[i32]) -> Option<i32> {\n    // TODO: return the first element or None\n    None\n}\nfn main() {\n    println!(\"{:?}\", first(&[3, 4]));\n    println!(\"{:?}\", first(&[]));\n}",
              "solution": "fn first(xs: &[i32]) -> Option<i32> {\n    xs.first().copied()\n}\nfn main() {\n    println!(\"{:?}\", first(&[3, 4]));\n    println!(\"{:?}\", first(&[]));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Some(3)\nNone",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Some(3)",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-option-m1-l3",
            "slug": "rust-option-m1-l3",
            "title": "Matching on Option",
            "concept": "A match on Option handles Some(v) and None separately, which is the safest way to use an optional value. The compiler requires both arms, so the missing case can never be forgotten.",
            "syntax": "match opt { Some(v) => v, None => 0 }",
            "exampleCode": "fn main() {\n    let opt: Option<i32> = None;\n    let v = match opt {\n        Some(n) => n,\n        None => 99,\n    };\n    println!(\"value {}\", v);\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing only the Some arm and letting the match fail to compile.",
            "bug": {
              "prompt": "What must a match on Option cover?",
              "buggyCode": "fn main() {\n    println!(\"Some and None\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Some only\");\n}",
              "explanation": "Both Some and None arms are required."
            },
            "exercise": {
              "title": "Option match program",
              "type": "write-code",
              "instructions": "Write a program that matches None to 99 and prints `value 99`.",
              "starterCode": "fn main() {\n    let opt: Option<i32> = None;\n    // TODO: match with a default\n}",
              "solution": "fn main() {\n    let opt: Option<i32> = None;\n    let v = match opt {\n        Some(n) => n,\n        None => 99,\n    };\n    println!(\"value {}\", v);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "value 99",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "value 99",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-option-m1-l4",
            "slug": "rust-option-m1-l4",
            "title": "if let with Option",
            "concept": "An if let Some(x) = opt runs its body only when the Option holds a value, which is the shortest way to use an optional value you expect to be present. An else arm handles the None case when you need it.",
            "syntax": "if let Some(x) = opt { println!(\"{}\", x); }",
            "exampleCode": "fn main() {\n    let opt: Option<String> = Some(String::from(\"hi\"));\n    if let Some(x) = opt {\n        println!(\"got {}\", x);\n    } else {\n        println!(\"nothing\");\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Using if let when both cases matter equally, where a match is clearer.",
            "bug": {
              "prompt": "When is if let the right tool for an Option?",
              "buggyCode": "fn main() {\n    println!(\"one case matters\");\n}",
              "fixedCode": "fn main() {\n    println!(\"both cases matter\");\n}",
              "explanation": "if let fits when you mainly care about the Some case."
            },
            "exercise": {
              "title": "If let quiz",
              "type": "multiple-choice",
              "instructions": "When is if let the right tool for an Option?",
              "starterCode": "",
              "solution": "When you mainly care about the Some case",
              "solutionExplanation": "if let is the short form for handling one pattern, usually Some.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "When you mainly care about the Some case",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "When you mainly care about the Some case",
                "When both cases need equal handling",
                "When the Option is always None",
                "Never, use unwrap instead"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-option-m1-l5",
            "slug": "rust-option-m1-l5",
            "title": "unwrap_or and Defaults",
            "concept": "The unwrap_or method returns the value inside Some or a default you provide for None, and unwrap_or_else computes the default only when needed. Use a default when a missing value has a sensible stand-in.",
            "syntax": "let v = opt.unwrap_or(0);",
            "exampleCode": "fn main() {\n    let a: Option<i32> = Some(5);\n    let b: Option<i32> = None;\n    println!(\"{} {}\", a.unwrap_or(0), b.unwrap_or(0));\n}",
            "exampleLanguage": "rust",
            "mistake": "Using unwrap_or to silently hide a missing value that should have been reported.",
            "bug": {
              "prompt": "What does None.unwrap_or(0) return?",
              "buggyCode": "fn main() {\n    println!(\"0\");\n}",
              "fixedCode": "fn main() {\n    println!(\"panics\");\n}",
              "explanation": "unwrap_or returns the default for None."
            },
            "exercise": {
              "title": "Default program",
              "type": "write-code",
              "instructions": "Write a program that prints `5 0` for Some(5).unwrap_or(0) and None.unwrap_or(0).",
              "starterCode": "fn main() {\n    let a: Option<i32> = Some(5);\n    let b: Option<i32> = None;\n    // TODO: print with defaults\n}",
              "solution": "fn main() {\n    let a: Option<i32> = Some(5);\n    let b: Option<i32> = None;\n    println!(\"{} {}\", a.unwrap_or(0), b.unwrap_or(0));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "5 0",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "5 0",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-option-m2",
        "title": "Applying Error Handling: Option",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-option-m2-l1",
            "slug": "rust-option-m2-l1",
            "title": "Mapping Options",
            "concept": "The map method transforms the value inside Some and leaves None alone, so you can process an optional value without unwrapping it. Chaining maps builds a small pipeline that handles absence automatically.",
            "syntax": "let doubled = opt.map(|n| n * 2);",
            "exampleCode": "fn main() {\n    let opt: Option<i32> = Some(21);\n    println!(\"{:?}\", opt.map(|n| n * 2));\n    let none: Option<i32> = None;\n    println!(\"{:?}\", none.map(|n| n * 2));\n}",
            "exampleLanguage": "rust",
            "mistake": "Unwrapping an Option just to transform its value, when map would do it safely.",
            "bug": {
              "prompt": "What does None.map(f) return?",
              "buggyCode": "fn main() {\n    println!(\"None\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Some(f)\");\n}",
              "explanation": "map on None returns None without calling f."
            },
            "exercise": {
              "title": "Map option program",
              "type": "write-code",
              "instructions": "Write a program that maps Some(21) to `Some(42)` and None to `None`.",
              "starterCode": "fn main() {\n    let opt: Option<i32> = Some(21);\n    let none: Option<i32> = None;\n    // TODO: map both\n}",
              "solution": "fn main() {\n    let opt: Option<i32> = Some(21);\n    println!(\"{:?}\", opt.map(|n| n * 2));\n    let none: Option<i32> = None;\n    println!(\"{:?}\", none.map(|n| n * 2));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Some(42)\nNone",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Some(42)",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-option-m2-l2",
            "slug": "rust-option-m2-l2",
            "title": "and_then Chaining",
            "concept": "The and_then method runs a function that returns an Option on the value inside Some, and returns None unchanged. It chains lookups that can each fail, without nested matches.",
            "syntax": "let r = opt.and_then(|n| if n > 0 { Some(n) } else { None });",
            "exampleCode": "fn main() {\n    let opt: Option<i32> = Some(5);\n    let r = opt.and_then(|n| if n > 0 { Some(n * 2) } else { None });\n    println!(\"{:?}\", r);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using map with a function that returns Option, which gives Option<Option<T>> instead of a flat Option.",
            "bug": {
              "prompt": "What is the difference between map and and_then?",
              "buggyCode": "fn main() {\n    println!(\"and_then flattens\");\n}",
              "fixedCode": "fn main() {\n    println!(\"no difference\");\n}",
              "explanation": "and_then takes a function returning Option and flattens the result."
            },
            "exercise": {
              "title": "And then program",
              "type": "write-code",
              "instructions": "Write a program that uses and_then on Some(5) to print `Some(10)` when the value is positive.",
              "starterCode": "fn main() {\n    let opt: Option<i32> = Some(5);\n    // TODO: and_then to double positives\n}",
              "solution": "fn main() {\n    let opt: Option<i32> = Some(5);\n    let r = opt.and_then(|n| if n > 0 { Some(n * 2) } else { None });\n    println!(\"{:?}\", r);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Some(10)",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Some(10)",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-option-m2-l3",
            "slug": "rust-option-m2-l3",
            "title": "Option Combinators",
            "concept": "Option has a family of combinators: or gives a fallback Option, filter keeps a value only when a test passes, and ok_or turns an Option into a Result. Learning these small tools replaces most manual matches on Option.",
            "syntax": "let v = opt.or(Some(1));",
            "exampleCode": "fn main() {\n    let a: Option<i32> = None;\n    println!(\"{:?}\", a.or(Some(1)));\n    let b: Option<i32> = Some(4);\n    println!(\"{:?}\", b.filter(|n| *n > 5));\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing a full match for a job that or or filter already does in one call.",
            "bug": {
              "prompt": "What does None.or(Some(1)) return?",
              "buggyCode": "fn main() {\n    println!(\"Some(1)\");\n}",
              "fixedCode": "fn main() {\n    println!(\"None\");\n}",
              "explanation": "or returns the fallback when the first Option is None."
            },
            "exercise": {
              "title": "Combinators program",
              "type": "write-code",
              "instructions": "Write a program that prints `Some(1)` for None.or(Some(1)) and `None` for Some(4).filter(|n| *n > 5).",
              "starterCode": "fn main() {\n    let a: Option<i32> = None;\n    let b: Option<i32> = Some(4);\n    // TODO: or and filter\n}",
              "solution": "fn main() {\n    let a: Option<i32> = None;\n    println!(\"{:?}\", a.or(Some(1)));\n    let b: Option<i32> = Some(4);\n    println!(\"{:?}\", b.filter(|n| *n > 5));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Some(1)\nNone",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Some(1)",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-option-m2-l4",
            "slug": "rust-option-m2-l4",
            "title": "Option in Collections",
            "concept": "Methods like first, get, and find return Option because the element may not exist, and pop returns Option because the collection may be empty. Handling the None case is part of using collections correctly.",
            "syntax": "let first = v.first(); // Option<&i32>",
            "exampleCode": "fn main() {\n    let v = vec![10, 20];\n    println!(\"{:?}\", v.get(0));\n    println!(\"{:?}\", v.get(5));\n}",
            "exampleLanguage": "rust",
            "mistake": "Indexing a Vec with [5] and panicking, when get(5) would have returned None.",
            "bug": {
              "prompt": "What does Vec::get return for an out-of-range index?",
              "buggyCode": "fn main() {\n    println!(\"None\");\n}",
              "fixedCode": "fn main() {\n    println!(\"panics\");\n}",
              "explanation": "get returns None for an out-of-range index instead of panicking."
            },
            "exercise": {
              "title": "Get quiz",
              "type": "multiple-choice",
              "instructions": "What does Vec::get return for an out-of-range index?",
              "starterCode": "",
              "solution": "None",
              "solutionExplanation": "get returns Option, so out-of-range gives None.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "None",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "None",
                "It panics",
                "Some(0)",
                "An error string"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-option-m2-l5",
            "slug": "rust-option-m2-l5",
            "title": "Option vs Result",
            "concept": "Option says a value may be absent, while Result says an operation may have failed and why. Use Option for lookups with no error to report, and Result when the caller needs to know what went wrong.",
            "syntax": "fn find() -> Option<i32> { None }\nfn read() -> Result<i32, String> { Err(\"x\".into()) }",
            "exampleCode": "fn main() {\n    let found: Option<i32> = Some(3);\n    println!(\"found: {}\", found.is_some());\n    let read: Result<i32, String> = Err(String::from(\"missing\"));\n    println!(\"read err: {}\", read.is_err());\n}",
            "exampleLanguage": "rust",
            "mistake": "Returning Result when the only failure is not found, which Option expresses more simply.",
            "bug": {
              "prompt": "When should you use Option instead of Result?",
              "buggyCode": "fn main() {\n    println!(\"no error to report\");\n}",
              "fixedCode": "fn main() {\n    println!(\"always\");\n}",
              "explanation": "Use Option when absence is the only outcome and there is no error to explain."
            },
            "exercise": {
              "title": "Option vs Result program",
              "type": "write-code",
              "instructions": "Write a program that prints `found: true` for Some(3) and `read err: true` for an Err result.",
              "starterCode": "fn main() {\n    let found: Option<i32> = Some(3);\n    let read: Result<i32, String> = Err(String::from(\"missing\"));\n    // TODO: print both checks\n}",
              "solution": "fn main() {\n    let found: Option<i32> = Some(3);\n    println!(\"found: {}\", found.is_some());\n    let read: Result<i32, String> = Err(String::from(\"missing\"));\n    println!(\"read err: {}\", read.is_err());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "found: true\nread err: true",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "found: true",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Safe lookup",
      "type": "write-code",
      "instructions": "Write a program that gets index 1 from vec![10, 20, 30] (Some(20)), gets index 9 (None), doubles the found value with map to Some(40), and prints `found Some(20)`, `missing None`, `doubled Some(40)`.",
      "starterCode": "fn main() {\n    // TODO: safe lookups\n}",
      "solution": "fn main() {\n    let v = vec![10, 20, 30];\n    println!(\"found {:?}\", v.get(1).copied());\n    println!(\"missing {:?}\", v.get(9).copied());\n    let doubled = v.get(1).copied().map(|n| n * 2);\n    println!(\"doubled {:?}\", doubled);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "found Some(20)\nmissing None\ndoubled Some(40)",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "found Some(20)",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Safe Lookup",
      "description": "Build a program that looks values up in a Vec, handles missing entries, and chains optional steps.",
      "requirements": [
        "Program returns Some for an existing index and None for a missing one",
        "Program uses unwrap_or for a default",
        "Program maps an Option to a doubled value",
        "Program prints a labelled result for each lookup"
      ],
      "rubric": [
        "Existing lookup is Some",
        "Missing lookup is None",
        "Default and map are used",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-vec",
    "slug": "rust-vec",
    "language": "rust",
    "category": "languages",
    "title": "Collections: Vec",
    "description": "Use Rust's growable Vec: creating, pushing, popping, indexing, iterating, and sorting.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Creating Vecs with vec!",
      "Pushing and popping",
      "Indexing safely with get",
      "Iterating Vecs",
      "Sorting Vecs",
      "Using capacity"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to use a shopping list that grows as you add items: it always fits what you put in it.",
    "modules": [
      {
        "id": "rust-vec-m1",
        "title": "Fundamentals of Collections: Vec",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-vec-m1-l1",
            "slug": "rust-vec-m1-l1",
            "title": "Creating a Vec",
            "concept": "A Vec<T> is a growable list stored on the heap, created with Vec::new() or the vec! macro. Unlike an array, a Vec can grow and shrink at runtime, which makes it the default collection in Rust.",
            "syntax": "let v = vec![1, 2, 3];",
            "exampleCode": "fn main() {\n    let v = vec![1, 2, 3];\n    println!(\"len {} first {}\", v.len(), v[0]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using an array when the size is not known at compile time, instead of a Vec.",
            "bug": {
              "prompt": "How do you create a Vec with 1, 2, 3?",
              "buggyCode": "fn main() {\n    println!(\"vec![1, 2, 3]\");\n}",
              "fixedCode": "fn main() {\n    println!(\"[1, 2, 3]\");\n}",
              "explanation": "The vec! macro builds a Vec; [1, 2, 3] is a fixed array."
            },
            "exercise": {
              "title": "Create vec program",
              "type": "write-code",
              "instructions": "Write a program that creates vec![1, 2, 3] and prints `len 3 first 1`.",
              "starterCode": "fn main() {\n    // TODO: create the vec\n}",
              "solution": "fn main() {\n    let v = vec![1, 2, 3];\n    println!(\"len {} first {}\", v.len(), v[0]);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "len 3 first 1",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "len 3 first 1",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-vec-m1-l2",
            "slug": "rust-vec-m1-l2",
            "title": "Push and Pop",
            "concept": "The push method appends an element to the end of a Vec, growing it if needed, and pop removes and returns the last element as an Option. Together they make a Vec work as a stack.",
            "syntax": "v.push(4); let last = v.pop();",
            "exampleCode": "fn main() {\n    let mut v = vec![1, 2];\n    v.push(3);\n    println!(\"after push {:?}\", v);\n    let last = v.pop();\n    println!(\"popped {:?} len {}\", last, v.len());\n}",
            "exampleLanguage": "rust",
            "mistake": "Pushing to an immutable Vec, which needs mut to change.",
            "bug": {
              "prompt": "What does pop return when the Vec is empty?",
              "buggyCode": "fn main() {\n    println!(\"None\");\n}",
              "fixedCode": "fn main() {\n    println!(\"panics\");\n}",
              "explanation": "pop returns Option<T>: Some for the last element, None when empty."
            },
            "exercise": {
              "title": "Push pop program",
              "type": "write-code",
              "instructions": "Write a program that pushes 3 onto vec![1, 2], prints `after push [1, 2, 3]`, pops it, and prints `popped Some(3) len 2`.",
              "starterCode": "fn main() {\n    let mut v = vec![1, 2];\n    // TODO: push and pop\n}",
              "solution": "fn main() {\n    let mut v = vec![1, 2];\n    v.push(3);\n    println!(\"after push {:?}\", v);\n    let last = v.pop();\n    println!(\"popped {:?} len {}\", last, v.len());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "after push [1, 2, 3]\npopped Some(3) len 2",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "after push [1, 2, 3]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-vec-m1-l3",
            "slug": "rust-vec-m1-l3",
            "title": "Indexing and get",
            "concept": "You can read a Vec element with v[i], which panics if the index is out of range, or with v.get(i), which returns None instead. Prefer get when the index comes from user input or a calculation that might be wrong.",
            "syntax": "let x = v.get(5); // None, no panic",
            "exampleCode": "fn main() {\n    let v = vec![10, 20, 30];\n    println!(\"{:?}\", v.get(1));\n    println!(\"{:?}\", v.get(9));\n}",
            "exampleLanguage": "rust",
            "mistake": "Indexing a Vec with a value that might be out of range, instead of using get.",
            "bug": {
              "prompt": "What is the safe way to read a Vec element by index?",
              "buggyCode": "fn main() {\n    println!(\"get\");\n}",
              "fixedCode": "fn main() {\n    println!(\"indexing\");\n}",
              "explanation": "get returns Option, so an out-of-range index gives None instead of a panic."
            },
            "exercise": {
              "title": "Get quiz",
              "type": "multiple-choice",
              "instructions": "What is the safe way to read a Vec element by index?",
              "starterCode": "",
              "solution": "v.get(i), which returns Option",
              "solutionExplanation": "get returns Some for a valid index and None otherwise.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "v.get(i), which returns Option",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "v.get(i), which returns Option",
                "v[i], which returns Option",
                "v.at(i)",
                "v.find(i)"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-vec-m1-l4",
            "slug": "rust-vec-m1-l4",
            "title": "Iterating a Vec",
            "concept": "A for loop over &v visits each element by reference, and iter() gives an iterator you can chain with map, filter, and sum. Iterating by reference keeps the Vec usable after the loop.",
            "syntax": "for x in &v { println!(\"{}\", x); }",
            "exampleCode": "fn main() {\n    let v = vec![1, 2, 3];\n    let mut total = 0;\n    for x in &v {\n        total += x;\n    }\n    println!(\"total {}\", total);\n}",
            "exampleLanguage": "rust",
            "mistake": "Iterating a Vec by value and then trying to use it afterwards, which moved it.",
            "bug": {
              "prompt": "How do you iterate a Vec without moving it?",
              "buggyCode": "fn main() {\n    println!(\"for x in &v\");\n}",
              "fixedCode": "fn main() {\n    println!(\"for x in v\");\n}",
              "explanation": "Iterating over &v borrows each element, so the Vec stays usable."
            },
            "exercise": {
              "title": "Iterate vec program",
              "type": "write-code",
              "instructions": "Write a program that sums vec![1, 2, 3] with a for loop over &v and prints `total 6`.",
              "starterCode": "fn main() {\n    let v = vec![1, 2, 3];\n    let mut total = 0;\n    // TODO: iterate and sum\n}",
              "solution": "fn main() {\n    let v = vec![1, 2, 3];\n    let mut total = 0;\n    for x in &v {\n        total += x;\n    }\n    println!(\"total {}\", total);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "total 6",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "total 6",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-vec-m1-l5",
            "slug": "rust-vec-m1-l5",
            "title": "Vec Methods: len and is_empty",
            "concept": "The len method returns how many elements a Vec holds, and is_empty is true when it holds none. Checking is_empty before popping or indexing avoids special-casing an empty list.",
            "syntax": "if v.is_empty() { println!(\"none\"); }",
            "exampleCode": "fn main() {\n    let v: Vec<i32> = vec![];\n    println!(\"empty {} len {}\", v.is_empty(), v.len());\n    let w = vec![1];\n    println!(\"empty {} len {}\", w.is_empty(), w.len());\n}",
            "exampleLanguage": "rust",
            "mistake": "Comparing len() == 0 by hand instead of using the clearer is_empty().",
            "bug": {
              "prompt": "What does is_empty return for vec![1]?",
              "buggyCode": "fn main() {\n    println!(\"false\");\n}",
              "fixedCode": "fn main() {\n    println!(\"true\");\n}",
              "explanation": "is_empty is true only when the Vec holds no elements."
            },
            "exercise": {
              "title": "is_empty quiz",
              "type": "multiple-choice",
              "instructions": "What does is_empty return for vec![1]?",
              "starterCode": "",
              "solution": "false",
              "solutionExplanation": "A Vec with one element is not empty.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "false",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "false",
                "true",
                "1",
                "It panics"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-vec-m2",
        "title": "Applying Collections: Vec",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-vec-m2-l1",
            "slug": "rust-vec-m2-l1",
            "title": "Sorting a Vec",
            "concept": "The sort method orders a Vec's elements from smallest to largest, and sort_by lets you choose the order. Sorting happens in place, so the Vec must be mutable.",
            "syntax": "v.sort();  // sort in place",
            "exampleCode": "fn main() {\n    let mut v = vec![3, 1, 2];\n    v.sort();\n    println!(\"{:?}\", v);\n}",
            "exampleLanguage": "rust",
            "mistake": "Sorting an immutable Vec, or expecting sort to return a new Vec instead of sorting in place.",
            "bug": {
              "prompt": "What does v.sort() do?",
              "buggyCode": "fn main() {\n    println!(\"sorts in place\");\n}",
              "fixedCode": "fn main() {\n    println!(\"returns new vec\");\n}",
              "explanation": "sort reorders the Vec in place; the Vec must be mutable."
            },
            "exercise": {
              "title": "Sort program",
              "type": "write-code",
              "instructions": "Write a program that sorts vec![3, 1, 2] in place and prints `[1, 2, 3]`.",
              "starterCode": "fn main() {\n    let mut v = vec![3, 1, 2];\n    // TODO: sort\n}",
              "solution": "fn main() {\n    let mut v = vec![3, 1, 2];\n    v.sort();\n    println!(\"{:?}\", v);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "[1, 2, 3]",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "[1, 2, 3]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-vec-m2-l2",
            "slug": "rust-vec-m2-l2",
            "title": "Removing Elements",
            "concept": "The remove method takes an element out by index and returns it, shifting the later elements down, while retain keeps only the elements that pass a test. Removing from the middle of a large Vec is slower than removing from the end.",
            "syntax": "let x = v.remove(0);",
            "exampleCode": "fn main() {\n    let mut v = vec![1, 2, 3, 4];\n    let first = v.remove(0);\n    println!(\"removed {} now {:?}\", first, v);\n}",
            "exampleLanguage": "rust",
            "mistake": "Removing elements from a Vec while iterating over it by index, which shifts the indices.",
            "bug": {
              "prompt": "What does v.remove(0) return?",
              "buggyCode": "fn main() {\n    println!(\"the element\");\n}",
              "fixedCode": "fn main() {\n    println!(\"nothing\");\n}",
              "explanation": "remove returns the element that was at that index."
            },
            "exercise": {
              "title": "Remove program",
              "type": "write-code",
              "instructions": "Write a program that removes index 0 from vec![1, 2, 3, 4] and prints `removed 1 now [2, 3, 4]`.",
              "starterCode": "fn main() {\n    let mut v = vec![1, 2, 3, 4];\n    // TODO: remove the first element\n}",
              "solution": "fn main() {\n    let mut v = vec![1, 2, 3, 4];\n    let first = v.remove(0);\n    println!(\"removed {} now {:?}\", first, v);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "removed 1 now [2, 3, 4]",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "removed 1 now [2, 3, 4]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-vec-m2-l3",
            "slug": "rust-vec-m2-l3",
            "title": "Vec of Strings",
            "concept": "A Vec<String> holds owned text, and you push String values into it with push or collect from an iterator. Each String owns its own heap buffer, so the Vec can grow without the strings interfering.",
            "syntax": "let mut names: Vec<String> = Vec::new();",
            "exampleCode": "fn main() {\n    let mut names: Vec<String> = Vec::new();\n    names.push(String::from(\"Ada\"));\n    names.push(String::from(\"Bo\"));\n    println!(\"{} {}\", names.len(), names[0]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Pushing a &str into a Vec<String> without converting it, which is a type error.",
            "bug": {
              "prompt": "What type does Vec::new() create without an annotation?",
              "buggyCode": "fn main() {\n    println!(\"unknown until used\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Vec<i32>\");\n}",
              "explanation": "The element type is inferred from how the Vec is used, or it must be annotated."
            },
            "exercise": {
              "title": "Vec type quiz",
              "type": "multiple-choice",
              "instructions": "What type does Vec::new() create without an annotation?",
              "starterCode": "",
              "solution": "The type is inferred from later use, or must be annotated",
              "solutionExplanation": "Vec::new() needs the element type from context or an annotation.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The type is inferred from later use, or must be annotated",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "The type is inferred from later use, or must be annotated",
                "Vec<i32> by default",
                "Vec<String> by default",
                "A fixed array"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-vec-m2-l4",
            "slug": "rust-vec-m2-l4",
            "title": "Vec Capacity",
            "concept": "A Vec reserves capacity for more elements than it currently holds, so push does not reallocate every time. The capacity method reports the reserved space, and with_capacity reserves it up front when you know the size in advance.",
            "syntax": "let v: Vec<i32> = Vec::with_capacity(10);",
            "exampleCode": "fn main() {\n    let v: Vec<i32> = Vec::with_capacity(10);\n    println!(\"len {} cap {}\", v.len(), v.capacity());\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming len and capacity are the same thing, and that a Vec with capacity 10 holds 10 elements.",
            "bug": {
              "prompt": "What is the difference between len and capacity?",
              "buggyCode": "fn main() {\n    println!(\"len used, cap reserved\");\n}",
              "fixedCode": "fn main() {\n    println!(\"same thing\");\n}",
              "explanation": "len counts elements present; capacity counts elements that fit before reallocating."
            },
            "exercise": {
              "title": "Capacity program",
              "type": "write-code",
              "instructions": "Write a program that creates a Vec with capacity 10 and prints `len 0 cap 10`.",
              "starterCode": "fn main() {\n    let v: Vec<i32> = Vec::with_capacity(10);\n    // TODO: print len and capacity\n}",
              "solution": "fn main() {\n    let v: Vec<i32> = Vec::with_capacity(10);\n    println!(\"len {} cap {}\", v.len(), v.capacity());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "len 0 cap 10",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "len 0 cap 10",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-vec-m2-l5",
            "slug": "rust-vec-m2-l5",
            "title": "Vec in Practice",
            "concept": "In practice, Vec is the first collection to reach for: it is fast, simple, and works with every iterator method. Reach for HashMap when you need lookup by key, and for other collections only when Vec's linear search is too slow.",
            "syntax": "let scores = vec![88, 92, 75];",
            "exampleCode": "fn main() {\n    let scores = vec![88, 92, 75];\n    let best = scores.iter().max().unwrap();\n    let total: i32 = scores.iter().sum();\n    println!(\"best {} total {}\", best, total);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a Vec for keyed lookup in a hot loop, when a HashMap would be far faster.",
            "bug": {
              "prompt": "How do you find the largest element of a Vec?",
              "buggyCode": "fn main() {\n    println!(\"iter().max()\");\n}",
              "fixedCode": "fn main() {\n    println!(\"v[0]\");\n}",
              "explanation": "iter().max() returns the largest element as an Option."
            },
            "exercise": {
              "title": "Scores program",
              "type": "write-code",
              "instructions": "Write a program that finds the best and total of vec![88, 92, 75] and prints `best 92 total 255`.",
              "starterCode": "fn main() {\n    let scores = vec![88, 92, 75];\n    // TODO: best and total\n}",
              "solution": "fn main() {\n    let scores = vec![88, 92, 75];\n    let best = scores.iter().max().unwrap();\n    let total: i32 = scores.iter().sum();\n    println!(\"best {} total {}\", best, total);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "best 92 total 255",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "best 92 total 255",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Score manager",
      "type": "write-code",
      "instructions": "Write a program that starts with vec![70, 90, 80], pushes 100, sorts it, removes index 0, and prints `scores [80, 90, 100]`, `count 3`, `best 100`.",
      "starterCode": "fn main() {\n    // TODO: manage the scores\n}",
      "solution": "fn main() {\n    let mut scores = vec![70, 90, 80];\n    scores.push(100);\n    scores.sort();\n    scores.remove(0);\n    println!(\"scores {:?}\", scores);\n    println!(\"count {}\", scores.len());\n    println!(\"best {}\", scores.iter().max().unwrap());\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "scores [80, 90, 100]\ncount 3\nbest 100",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "scores [80, 90, 100]",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Score Manager",
      "description": "Build a program that manages a list of scores with a Vec: add, sort, remove, and summarise.",
      "requirements": [
        "Program adds scores with push",
        "Program sorts the scores",
        "Program removes the lowest score",
        "Program prints the count, best, and total"
      ],
      "rubric": [
        "Push adds the scores",
        "Sort orders them",
        "Remove drops the lowest",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-hashmap",
    "slug": "rust-hashmap",
    "language": "rust",
    "category": "languages",
    "title": "Collections: HashMap",
    "description": "Store and look up key-value pairs with HashMap: insert, get, entry, remove, and iterate.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Creating HashMaps",
      "Inserting and getting values",
      "Counting with entry",
      "Removing entries",
      "Iterating maps",
      "Collecting maps from iterators"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to use a dictionary: look up a word and you get its meaning straight away.",
    "modules": [
      {
        "id": "rust-hashmap-m1",
        "title": "Fundamentals of Collections: HashMap",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-hashmap-m1-l1",
            "slug": "rust-hashmap-m1-l1",
            "title": "What Is a HashMap",
            "concept": "A HashMap<K, V> stores key-value pairs and finds a value by its key in roughly constant time, using a hash function. It is the right collection when you need to look things up by name or id, rather than by position.",
            "syntax": "use std::collections::HashMap;\nlet mut m: HashMap<String, i32> = HashMap::new();",
            "exampleCode": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"Ada\"), 36);\n    println!(\"size {}\", m.len());\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a Vec for lookups by name, scanning the whole list every time.",
            "bug": {
              "prompt": "What is a HashMap for?",
              "buggyCode": "fn main() {\n    println!(\"lookup by key\");\n}",
              "fixedCode": "fn main() {\n    println!(\"ordered list\");\n}",
              "explanation": "A HashMap finds values by key in roughly constant time."
            },
            "exercise": {
              "title": "Create map program",
              "type": "write-code",
              "instructions": "Write a program that creates a HashMap<String, i32>, inserts (\"Ada\", 36), and prints `size 1`.",
              "starterCode": "use std::collections::HashMap;\nfn main() {\n    // TODO: create and insert\n}",
              "solution": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"Ada\"), 36);\n    println!(\"size {}\", m.len());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "size 1",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "size 1",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-hashmap-m1-l2",
            "slug": "rust-hashmap-m1-l2",
            "title": "Insert and Get",
            "concept": "The insert method adds or replaces a key's value, and get returns an Option with the value or None. Checking get before using a value is the safe way to handle a key that might be missing.",
            "syntax": "m.insert(\"a\".to_string(), 1);\nlet v = m.get(\"a\");",
            "exampleCode": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"Ada\"), 36);\n    println!(\"{:?}\", m.get(\"Ada\"));\n    println!(\"{:?}\", m.get(\"Bo\"));\n}",
            "exampleLanguage": "rust",
            "mistake": "Indexing a HashMap with m[\"missing\"], which panics, instead of using get.",
            "bug": {
              "prompt": "What does get return for a missing key?",
              "buggyCode": "fn main() {\n    println!(\"None\");\n}",
              "fixedCode": "fn main() {\n    println!(\"panics\");\n}",
              "explanation": "get returns None for a missing key."
            },
            "exercise": {
              "title": "Get program",
              "type": "write-code",
              "instructions": "Write a program that inserts (\"Ada\", 36) and prints `Some(36)` for get(\"Ada\") and `None` for get(\"Bo\").",
              "starterCode": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"Ada\"), 36);\n    // TODO: print both gets\n}",
              "solution": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"Ada\"), 36);\n    println!(\"{:?}\", m.get(\"Ada\"));\n    println!(\"{:?}\", m.get(\"Bo\"));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Some(36)\nNone",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Some(36)",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-hashmap-m1-l3",
            "slug": "rust-hashmap-m1-l3",
            "title": "Updating Values",
            "concept": "Inserting a key that already exists replaces its old value, and the entry API lets you update a value in place. The entry pattern is the idiomatic way to count things: get the entry for a key, or insert a starting value.",
            "syntax": "m.entry(key).or_insert(0);",
            "exampleCode": "use std::collections::HashMap;\nfn main() {\n    let mut counts: HashMap<String, i32> = HashMap::new();\n    for word in [\"a\", \"b\", \"a\"] {\n        *counts.entry(word.to_string()).or_insert(0) += 1;\n    }\n    println!(\"a={} b={}\", counts[\"a\"], counts[\"b\"]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Inserting a value to count with and overwriting the count each time, instead of incrementing the entry.",
            "bug": {
              "prompt": "How do you count occurrences with a HashMap?",
              "buggyCode": "fn main() {\n    println!(\"entry or_insert\");\n}",
              "fixedCode": "fn main() {\n    println!(\"insert each time\");\n}",
              "explanation": "entry(key).or_insert(0) gives the current count or starts it, then you add one."
            },
            "exercise": {
              "title": "Word count program",
              "type": "write-code",
              "instructions": "Write a program that counts [\"a\", \"b\", \"a\"] with entry().or_insert(0) and prints `a=2 b=1`.",
              "starterCode": "use std::collections::HashMap;\nfn main() {\n    let mut counts: HashMap<String, i32> = HashMap::new();\n    // TODO: count the words\n}",
              "solution": "use std::collections::HashMap;\nfn main() {\n    let mut counts: HashMap<String, i32> = HashMap::new();\n    for word in [\"a\", \"b\", \"a\"] {\n        *counts.entry(word.to_string()).or_insert(0) += 1;\n    }\n    println!(\"a={} b={}\", counts[\"a\"], counts[\"b\"]);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "a=2 b=1",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "a=2 b=1",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-hashmap-m1-l4",
            "slug": "rust-hashmap-m1-l4",
            "title": "Checking Keys",
            "concept": "The contains_key method tells you whether a key is present without returning its value. It is clearer than checking get(...).is_some() when you only need to know if the key exists.",
            "syntax": "if m.contains_key(\"Ada\") { println!(\"yes\"); }",
            "exampleCode": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"Ada\"), 36);\n    println!(\"{} {}\", m.contains_key(\"Ada\"), m.contains_key(\"Bo\"));\n}",
            "exampleLanguage": "rust",
            "mistake": "Using contains_key and then indexing, when get would have done both steps at once.",
            "bug": {
              "prompt": "What does contains_key return?",
              "buggyCode": "fn main() {\n    println!(\"a bool\");\n}",
              "fixedCode": "fn main() {\n    println!(\"the value\");\n}",
              "explanation": "contains_key returns true when the key is present, false otherwise."
            },
            "exercise": {
              "title": "Contains quiz",
              "type": "multiple-choice",
              "instructions": "What does contains_key return?",
              "starterCode": "",
              "solution": "A bool",
              "solutionExplanation": "contains_key returns true if the key is present.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A bool",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "A bool",
                "The value",
                "An Option",
                "The key"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-hashmap-m1-l5",
            "slug": "rust-hashmap-m1-l5",
            "title": "Removing Entries",
            "concept": "The remove method deletes a key and returns its value as an Option, or None when the key was absent. Removing is how you keep a map from growing forever as entries become stale.",
            "syntax": "let old = m.remove(\"Ada\");",
            "exampleCode": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"Ada\"), 36);\n    let old = m.remove(\"Ada\");\n    println!(\"{:?} len {}\", old, m.len());\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming remove panics for a missing key, when it returns None.",
            "bug": {
              "prompt": "What does remove return for a missing key?",
              "buggyCode": "fn main() {\n    println!(\"None\");\n}",
              "fixedCode": "fn main() {\n    println!(\"panics\");\n}",
              "explanation": "remove returns None when the key was not present."
            },
            "exercise": {
              "title": "Remove program",
              "type": "write-code",
              "instructions": "Write a program that inserts (\"Ada\", 36), removes \"Ada\", and prints `Some(36) len 0`.",
              "starterCode": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"Ada\"), 36);\n    // TODO: remove and print\n}",
              "solution": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"Ada\"), 36);\n    let old = m.remove(\"Ada\");\n    println!(\"{:?} len {}\", old, m.len());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Some(36) len 0",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Some(36) len 0",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-hashmap-m2",
        "title": "Applying Collections: HashMap",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-hashmap-m2-l1",
            "slug": "rust-hashmap-m2-l1",
            "title": "Iterating a HashMap",
            "concept": "Iterating a HashMap visits its key-value pairs in an unspecified order, which is the price of fast lookup. If you need a sorted order, collect the keys into a Vec and sort that.",
            "syntax": "for (k, v) in &m { println!(\"{} {}\", k, v); }",
            "exampleCode": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"a\"), 1);\n    m.insert(String::from(\"b\"), 2);\n    let total: i32 = m.values().sum();\n    println!(\"total {} size {}\", total, m.len());\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming iteration order is insertion order, which HashMap does not promise.",
            "bug": {
              "prompt": "Is HashMap iteration order guaranteed?",
              "buggyCode": "fn main() {\n    println!(\"no\");\n}",
              "fixedCode": "fn main() {\n    println!(\"insertion order\");\n}",
              "explanation": "HashMap iteration order is unspecified; do not rely on it."
            },
            "exercise": {
              "title": "Iterate map program",
              "type": "write-code",
              "instructions": "Write a program that sums the values of {a: 1, b: 2} and prints `total 3 size 2`.",
              "starterCode": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"a\"), 1);\n    m.insert(String::from(\"b\"), 2);\n    // TODO: sum the values\n}",
              "solution": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"a\"), 1);\n    m.insert(String::from(\"b\"), 2);\n    let total: i32 = m.values().sum();\n    println!(\"total {} size {}\", total, m.len());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "total 3 size 2",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "total 3 size 2",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-hashmap-m2-l2",
            "slug": "rust-hashmap-m2-l2",
            "title": "Keys and Values",
            "concept": "The keys method yields all the keys and values yields all the values, each as an iterator. Collecting keys into a Vec and sorting it is the standard way to print a map in a stable order.",
            "syntax": "let mut ks: Vec<_> = m.keys().collect(); ks.sort();",
            "exampleCode": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"b\"), 2);\n    m.insert(String::from(\"a\"), 1);\n    let mut ks: Vec<&String> = m.keys().collect();\n    ks.sort();\n    println!(\"{} {}\", ks[0], ks[1]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Collecting keys without sorting and expecting a stable printed order.",
            "bug": {
              "prompt": "How do you print HashMap keys in sorted order?",
              "buggyCode": "fn main() {\n    println!(\"collect and sort\");\n}",
              "fixedCode": "fn main() {\n    println!(\"iterate directly\");\n}",
              "explanation": "Collect the keys into a Vec and sort it, since map order is unspecified."
            },
            "exercise": {
              "title": "Sorted keys quiz",
              "type": "multiple-choice",
              "instructions": "How do you print HashMap keys in sorted order?",
              "starterCode": "",
              "solution": "Collect the keys into a Vec and sort it",
              "solutionExplanation": "HashMap order is unspecified, so collect and sort the keys.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Collect the keys into a Vec and sort it",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Collect the keys into a Vec and sort it",
                "Iterate the map directly",
                "Use m.sort()",
                "HashMaps are always sorted"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-hashmap-m2-l3",
            "slug": "rust-hashmap-m2-l3",
            "title": "Building from Iterators",
            "concept": "The collect method can build a HashMap from an iterator of (key, value) pairs, which is the shortest way to create a map from two lists. Zipping two iterators together gives the pairs collect needs.",
            "syntax": "let m: HashMap<_, _> = keys.into_iter().zip(vals).collect();",
            "exampleCode": "use std::collections::HashMap;\nfn main() {\n    let keys = vec![\"a\", \"b\"];\n    let vals = vec![1, 2];\n    let m: HashMap<&str, i32> = keys.into_iter().zip(vals).collect();\n    println!(\"{} {}\", m[\"a\"], m[\"b\"]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Collecting into a HashMap without annotating the type, so the compiler cannot infer it.",
            "bug": {
              "prompt": "How do you build a HashMap from two lists?",
              "buggyCode": "fn main() {\n    println!(\"zip and collect\");\n}",
              "fixedCode": "fn main() {\n    println!(\"push each pair\");\n}",
              "explanation": "Zip the key and value iterators, then collect into a HashMap."
            },
            "exercise": {
              "title": "Collect map program",
              "type": "write-code",
              "instructions": "Write a program that zips [\"a\", \"b\"] with [1, 2] into a HashMap and prints `1 2`.",
              "starterCode": "use std::collections::HashMap;\nfn main() {\n    let keys = vec![\"a\", \"b\"];\n    let vals = vec![1, 2];\n    // TODO: zip and collect\n}",
              "solution": "use std::collections::HashMap;\nfn main() {\n    let keys = vec![\"a\", \"b\"];\n    let vals = vec![1, 2];\n    let m: HashMap<&str, i32> = keys.into_iter().zip(vals).collect();\n    println!(\"{} {}\", m[\"a\"], m[\"b\"]);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "1 2",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "1 2",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-hashmap-m2-l4",
            "slug": "rust-hashmap-m2-l4",
            "title": "HashMap Ownership",
            "concept": "Keys and values in a HashMap are owned by the map, so inserting a String moves it in and the caller cannot use it afterwards. Using &str keys borrows instead, but then the borrowed data must outlive the map.",
            "syntax": "m.insert(String::from(\"k\"), 1); // String moved",
            "exampleCode": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    let key = String::from(\"Ada\");\n    m.insert(key.clone(), 36);\n    println!(\"{} {}\", key, m[\"Ada\"]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Inserting a String and then using it, forgetting the map now owns it.",
            "bug": {
              "prompt": "What happens to a String key when you insert it?",
              "buggyCode": "fn main() {\n    println!(\"map owns it\");\n}",
              "fixedCode": "fn main() {\n    println!(\"it is copied\");\n}",
              "explanation": "Inserting a String moves it into the map."
            },
            "exercise": {
              "title": "Map ownership quiz",
              "type": "multiple-choice",
              "instructions": "What happens to a String key when you insert it?",
              "starterCode": "",
              "solution": "Ownership moves into the map",
              "solutionExplanation": "The map owns its keys and values, so a String key is moved in.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Ownership moves into the map",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Ownership moves into the map",
                "It is copied",
                "It stays with the caller",
                "It is borrowed"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-hashmap-m2-l5",
            "slug": "rust-hashmap-m2-l5",
            "title": "When to Use a HashMap",
            "concept": "Use a HashMap when lookups by key dominate and order does not matter, and a BTreeMap when you need sorted keys. For a small, fixed set of keys, a Vec of pairs or a match may be simpler and faster.",
            "syntax": "use std::collections::BTreeMap;",
            "exampleCode": "use std::collections::HashMap;\nfn main() {\n    let mut scores: HashMap<String, i32> = HashMap::new();\n    scores.insert(String::from(\"Ada\"), 95);\n    scores.insert(String::from(\"Bo\"), 80);\n    let best = scores.values().max().unwrap();\n    println!(\"best {}\", best);\n}",
            "exampleLanguage": "rust",
            "mistake": "Reaching for a HashMap for a list that is only ever scanned in order.",
            "bug": {
              "prompt": "When is a HashMap the right choice?",
              "buggyCode": "fn main() {\n    println!(\"keyed lookup\");\n}",
              "fixedCode": "fn main() {\n    println!(\"ordered scan\");\n}",
              "explanation": "HashMap is for fast lookup by key; ordered scans suit Vec or BTreeMap."
            },
            "exercise": {
              "title": "Best score program",
              "type": "write-code",
              "instructions": "Write a program that stores Ada 95 and Bo 80 in a HashMap and prints `best 95`.",
              "starterCode": "use std::collections::HashMap;\nfn main() {\n    let mut scores: HashMap<String, i32> = HashMap::new();\n    scores.insert(String::from(\"Ada\"), 95);\n    scores.insert(String::from(\"Bo\"), 80);\n    // TODO: find the best score\n}",
              "solution": "use std::collections::HashMap;\nfn main() {\n    let mut scores: HashMap<String, i32> = HashMap::new();\n    scores.insert(String::from(\"Ada\"), 95);\n    scores.insert(String::from(\"Bo\"), 80);\n    let best = scores.values().max().unwrap();\n    println!(\"best {}\", best);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "best 95",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "best 95",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Phone book",
      "type": "write-code",
      "instructions": "Write a program that inserts Ada 555, Bo 556, Cy 557 into a HashMap, prints `Ada 555` and `missing None`, removes Bo, and prints `size 2`.",
      "starterCode": "use std::collections::HashMap;\nfn main() {\n    // TODO: manage the phone book\n}",
      "solution": "use std::collections::HashMap;\nfn main() {\n    let mut book: HashMap<String, i32> = HashMap::new();\n    book.insert(String::from(\"Ada\"), 555);\n    book.insert(String::from(\"Bo\"), 556);\n    book.insert(String::from(\"Cy\"), 557);\n    println!(\"Ada {}\", book[\"Ada\"]);\n    println!(\"missing {:?}\", book.get(\"Dan\"));\n    book.remove(\"Bo\");\n    println!(\"size {}\", book.len());\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "Ada 555\nmissing None\nsize 2",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "Ada 555",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Phone Book",
      "description": "Build a program that manages a phone book in a HashMap: add, look up, count, and remove entries.",
      "requirements": [
        "Program inserts three contacts",
        "Program looks up an existing and a missing contact",
        "Program removes one contact",
        "Program prints the final size and a sorted key list"
      ],
      "rubric": [
        "Three contacts are inserted",
        "Lookups are correct",
        "Removal works",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-strings",
    "slug": "rust-strings",
    "language": "rust",
    "category": "languages",
    "title": "Strings in Rust",
    "description": "Work with String and &str: creating, appending, formatting, slicing, and searching text.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Distinguishing String and &str",
      "Creating Strings",
      "Appending text",
      "Formatting with format!",
      "Measuring length",
      "Splitting and joining"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to work with rope: you can cut it, join it, and measure it, but you must respect how it is made.",
    "modules": [
      {
        "id": "rust-strings-m1",
        "title": "Fundamentals of Strings in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-strings-m1-l1",
            "slug": "rust-strings-m1-l1",
            "title": "String vs &str",
            "concept": "A String is an owned, growable buffer of UTF-8 text on the heap, while &str is a borrowed view of text owned elsewhere. String literals are &str, and String::from turns a literal into an owned String.",
            "syntax": "let owned = String::from(\"hi\");\nlet borrowed: &str = \"hi\";",
            "exampleCode": "fn main() {\n    let owned = String::from(\"hello\");\n    let borrowed: &str = \"hello\";\n    println!(\"{} {}\", owned, borrowed);\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to grow a &str, which is fixed, instead of using a String.",
            "bug": {
              "prompt": "What is the difference between String and &str?",
              "buggyCode": "fn main() {\n    println!(\"owned vs borrowed\");\n}",
              "fixedCode": "fn main() {\n    println!(\"same type\");\n}",
              "explanation": "String owns its text; &str borrows text owned by someone else."
            },
            "exercise": {
              "title": "Owned borrowed program",
              "type": "write-code",
              "instructions": "Write a program that creates owned String::from(\"hello\") and borrowed \"hello\" and prints `hello hello`.",
              "starterCode": "fn main() {\n    // TODO: owned and borrowed strings\n}",
              "solution": "fn main() {\n    let owned = String::from(\"hello\");\n    let borrowed: &str = \"hello\";\n    println!(\"{} {}\", owned, borrowed);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "hello hello",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "hello hello",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-strings-m1-l2",
            "slug": "rust-strings-m1-l2",
            "title": "Creating Strings",
            "concept": "You can create a String with String::new() for an empty one, String::from(\"text\") for a literal, or \"text\".to_string(). The to_string method works on any type that implements Display, not only on string literals.",
            "syntax": "let s = String::from(\"hello\");",
            "exampleCode": "fn main() {\n    let a = String::from(\"hello\");\n    let b = \"world\".to_string();\n    let c = String::new();\n    println!(\"{} {} empty={}\", a, b, c.is_empty());\n}",
            "exampleLanguage": "rust",
            "mistake": "Calling to_string on a value that does not implement Display.",
            "bug": {
              "prompt": "How do you make an empty String?",
              "buggyCode": "fn main() {\n    println!(\"String::new()\");\n}",
              "fixedCode": "fn main() {\n    println!(\"String::empty()\");\n}",
              "explanation": "String::new() creates an empty String."
            },
            "exercise": {
              "title": "Create strings program",
              "type": "write-code",
              "instructions": "Write a program that prints `hello world empty=true` using String::from, to_string, and String::new().",
              "starterCode": "fn main() {\n    let a = String::from(\"hello\");\n    let b = \"world\".to_string();\n    let c = String::new();\n    // TODO: print all three\n}",
              "solution": "fn main() {\n    let a = String::from(\"hello\");\n    let b = \"world\".to_string();\n    let c = String::new();\n    println!(\"{} {} empty={}\", a, b, c.is_empty());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "hello world empty=true",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "hello world empty=true",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-strings-m1-l3",
            "slug": "rust-strings-m1-l3",
            "title": "Appending with push_str",
            "concept": "The push_str method appends a string slice to a String, and push appends a single char. Both need a mutable String, and they grow the buffer as needed.",
            "syntax": "let mut s = String::from(\"hi\");\ns.push_str(\" there\");",
            "exampleCode": "fn main() {\n    let mut s = String::from(\"hello\");\n    s.push_str(\" world\");\n    s.push('!');\n    println!(\"{}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Passing a String to push_str, which takes &str, instead of a reference.",
            "bug": {
              "prompt": "What does push_str take?",
              "buggyCode": "fn main() {\n    println!(\"&str\");\n}",
              "fixedCode": "fn main() {\n    println!(\"String\");\n}",
              "explanation": "push_str takes a &str; pass a String by reference."
            },
            "exercise": {
              "title": "push_str quiz",
              "type": "multiple-choice",
              "instructions": "What does push_str take?",
              "starterCode": "",
              "solution": "A &str",
              "solutionExplanation": "push_str(&str) appends borrowed text.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A &str",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "A &str",
                "A String by value",
                "A char",
                "An integer"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-strings-m1-l4",
            "slug": "rust-strings-m1-l4",
            "title": "Concatenation with +",
            "concept": "The + operator on Strings moves the left operand and borrows the right one, as in s1 + &s2, because it calls add(self, &str). Using format! instead keeps both strings usable and is usually clearer.",
            "syntax": "let s3 = s1 + &s2;",
            "exampleCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = String::from(\" world\");\n    let s3 = s1 + &s2;\n    println!(\"{}\", s3);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using s1 after s1 + &s2, forgetting that s1 was moved.",
            "bug": {
              "prompt": "After `let s3 = s1 + &s2;`, can you still use s1?",
              "buggyCode": "fn main() {\n    println!(\"no, moved\");\n}",
              "fixedCode": "fn main() {\n    println!(\"yes\");\n}",
              "explanation": "The + operator takes ownership of the left String."
            },
            "exercise": {
              "title": "Concat program",
              "type": "write-code",
              "instructions": "Write a program that concatenates \"hello\" + \" world\" with + and prints `hello world`.",
              "starterCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = String::from(\" world\");\n    // TODO: concatenate with +\n}",
              "solution": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = String::from(\" world\");\n    let s3 = s1 + &s2;\n    println!(\"{}\", s3);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "hello world",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "hello world",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-strings-m1-l5",
            "slug": "rust-strings-m1-l5",
            "title": "Formatting with format!",
            "concept": "The format! macro builds a String from a format string and values, exactly like println! but returning the text instead of printing it. It is the cleanest way to build a message from several pieces.",
            "syntax": "let s = format!(\"{} is {}\", name, age);",
            "exampleCode": "fn main() {\n    let name = \"Ada\";\n    let age = 36;\n    let s = format!(\"{} is {}\", name, age);\n    println!(\"{}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using println! when you need the text as a value, instead of format!.",
            "bug": {
              "prompt": "How do you build a String from values without printing?",
              "buggyCode": "fn main() {\n    println!(\"format!\");\n}",
              "fixedCode": "fn main() {\n    println!(\"println!\");\n}",
              "explanation": "format! returns a String; println! prints to the terminal."
            },
            "exercise": {
              "title": "format quiz",
              "type": "multiple-choice",
              "instructions": "How do you build a String from values without printing?",
              "starterCode": "",
              "solution": "With format!",
              "solutionExplanation": "format! works like println! but returns a String.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "With format!",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "With format!",
                "With println!",
                "With push",
                "With concat"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-strings-m2",
        "title": "Applying Strings in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-strings-m2-l1",
            "slug": "rust-strings-m2-l1",
            "title": "String Length and Bytes",
            "concept": "The len method returns the number of bytes in a String, not the number of characters, because UTF-8 characters take different numbers of bytes. Use chars().count() for the character count, and bytes() to iterate the raw bytes.",
            "syntax": "let s = \"héllo\"; // len 6, 5 chars",
            "exampleCode": "fn main() {\n    let s = \"hello\";\n    println!(\"bytes {} chars {}\", s.len(), s.chars().count());\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming len() counts characters, which fails for non-ASCII text.",
            "bug": {
              "prompt": "What does \"hello\".len() count?",
              "buggyCode": "fn main() {\n    println!(\"bytes\");\n}",
              "fixedCode": "fn main() {\n    println!(\"characters\");\n}",
              "explanation": "len() returns the byte length of the UTF-8 text."
            },
            "exercise": {
              "title": "Length program",
              "type": "write-code",
              "instructions": "Write a program that prints `bytes 5 chars 5` for \"hello\".",
              "starterCode": "fn main() {\n    let s = \"hello\";\n    // TODO: print byte and char counts\n}",
              "solution": "fn main() {\n    let s = \"hello\";\n    println!(\"bytes {} chars {}\", s.len(), s.chars().count());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "bytes 5 chars 5",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "bytes 5 chars 5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-strings-m2-l2",
            "slug": "rust-strings-m2-l2",
            "title": "Iterating Characters",
            "concept": "The chars method yields each Unicode character of a string, and the method works on both String and &str. Iterating chars is the safe way to walk through text, because byte indexing can split a character.",
            "syntax": "for c in s.chars() { println!(\"{}\", c); }",
            "exampleCode": "fn main() {\n    let s = \"abc\";\n    let mut count = 0;\n    for _c in s.chars() {\n        count += 1;\n    }\n    println!(\"chars {}\", count);\n}",
            "exampleLanguage": "rust",
            "mistake": "Indexing a string with s[0] to get the first character, which Rust does not allow.",
            "bug": {
              "prompt": "Why can't you index a String with s[0]?",
              "buggyCode": "fn main() {\n    println!(\"chars vary in bytes\");\n}",
              "fixedCode": "fn main() {\n    println!(\"strings are private\");\n}",
              "explanation": "UTF-8 characters take different byte counts, so a byte index is not a character index."
            },
            "exercise": {
              "title": "Chars program",
              "type": "write-code",
              "instructions": "Write a program that counts the chars of \"abc\" with chars() and prints `chars 3`.",
              "starterCode": "fn main() {\n    let s = \"abc\";\n    // TODO: count characters\n}",
              "solution": "fn main() {\n    let s = \"abc\";\n    let mut count = 0;\n    for _c in s.chars() {\n        count += 1;\n    }\n    println!(\"chars {}\", count);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "chars 3",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "chars 3",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-strings-m2-l3",
            "slug": "rust-strings-m2-l3",
            "title": "Splitting and Joining",
            "concept": "The split method breaks a string at a pattern, and join on a slice of &str glues pieces back together with a separator. Together they are the standard way to parse and rebuild delimited text.",
            "syntax": "let parts: Vec<&str> = s.split(',').collect();",
            "exampleCode": "fn main() {\n    let parts = [\"a\", \"b\", \"c\"];\n    println!(\"{}\", parts.join(\"-\"));\n    let s = \"a-b-c\";\n    let back: Vec<&str> = s.split('-').collect();\n    println!(\"{} {} {}\", back[0], back[1], back[2]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Calling join on a Vec<String> without a slice of references, which needs a different form.",
            "bug": {
              "prompt": "What does [\"a\", \"b\"].join(\"-\") produce?",
              "buggyCode": "fn main() {\n    println!(\"a-b\");\n}",
              "fixedCode": "fn main() {\n    println!(\"[a, b]\");\n}",
              "explanation": "join glues the pieces with the separator between them."
            },
            "exercise": {
              "title": "Join quiz",
              "type": "multiple-choice",
              "instructions": "What does [\"a\", \"b\"].join(\"-\") produce?",
              "starterCode": "",
              "solution": "\"a-b\"",
              "solutionExplanation": "join inserts the separator between the pieces.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "\"a-b\"",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "\"a-b\"",
                "\"a, b\"",
                "[\"a\", \"b\"]",
                "\"ab\""
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-strings-m2-l4",
            "slug": "rust-strings-m2-l4",
            "title": "Checking Content",
            "concept": "The contains method tests whether a string holds a substring, starts_with and ends_with test the edges, and is_empty tests for no content. These small checks replace most hand-written scans of text.",
            "syntax": "if s.contains(\"rust\") { println!(\"yes\"); }",
            "exampleCode": "fn main() {\n    let s = \"hello rust\";\n    println!(\"{} {} {}\", s.contains(\"rust\"), s.starts_with(\"hello\"), s.ends_with(\"rust\"));\n}",
            "exampleLanguage": "rust",
            "mistake": "Using == to test whether a string contains a word, which only matches the whole string.",
            "bug": {
              "prompt": "How do you test whether a string contains \"rust\"?",
              "buggyCode": "fn main() {\n    println!(\"contains\");\n}",
              "fixedCode": "fn main() {\n    println!(\"==\")\n}",
              "explanation": "contains checks for a substring anywhere in the string."
            },
            "exercise": {
              "title": "Content checks program",
              "type": "write-code",
              "instructions": "Write a program that prints `true true true` for \"hello rust\" containing \"rust\", starting with \"hello\", and ending with \"rust\".",
              "starterCode": "fn main() {\n    let s = \"hello rust\";\n    // TODO: check the content\n}",
              "solution": "fn main() {\n    let s = \"hello rust\";\n    println!(\"{} {} {}\", s.contains(\"rust\"), s.starts_with(\"hello\"), s.ends_with(\"rust\"));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "true true true",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "true true true",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-strings-m2-l5",
            "slug": "rust-strings-m2-l5",
            "title": "Trimming and Replacing",
            "concept": "The trim method removes whitespace from both ends of a string, and replace swaps every occurrence of one pattern for another. Both return new values or slices, so the original string is unchanged unless you assign the result back.",
            "syntax": "let t = s.trim();\nlet r = s.replace(\"a\", \"b\");",
            "exampleCode": "fn main() {\n    let s = \"  hello  \";\n    println!(\"'{}'\", s.trim());\n    let r = \"aaa\".replace('a', \"b\");\n    println!(\"{}\", r);\n}",
            "exampleLanguage": "rust",
            "mistake": "Expecting trim to change the string in place, when it returns a new slice instead.",
            "bug": {
              "prompt": "What does trim return?",
              "buggyCode": "fn main() {\n    println!(\"a trimmed slice\");\n}",
              "fixedCode": "fn main() {\n    println!(\"nothing\");\n}",
              "explanation": "trim returns a &str slice of the string without leading and trailing whitespace."
            },
            "exercise": {
              "title": "Trim replace program",
              "type": "write-code",
              "instructions": "Write a program that prints `'hello'` for \"  hello  \".trim() and `bbb` for \"aaa\".replace('a', \"b\").",
              "starterCode": "fn main() {\n    let s = \"  hello  \";\n    // TODO: trim and replace\n}",
              "solution": "fn main() {\n    let s = \"  hello  \";\n    println!(\"'{}'\", s.trim());\n    let r = \"aaa\".replace('a', \"b\");\n    println!(\"{}\", r);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "'hello'\nbbb",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "'hello'",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Text formatter",
      "type": "write-code",
      "instructions": "Write a program that trims \"  Ada  \" to `Ada`, formats \"Ada is 36\" with format!, counts chars of \"hello\" as 5, and prints `name Ada`, `Ada is 36`, `chars 5`.",
      "starterCode": "fn main() {\n    // TODO: trim, format, count\n}",
      "solution": "fn main() {\n    let raw = \"  Ada  \";\n    let name = raw.trim();\n    println!(\"name {}\", name);\n    let sentence = format!(\"{} is {}\", name, 36);\n    println!(\"{}\", sentence);\n    println!(\"chars {}\", \"hello\".chars().count());\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "name Ada\nAda is 36\nchars 5",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "name Ada",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Text Formatter",
      "description": "Build a program that cleans, formats, and reports on a piece of text.",
      "requirements": [
        "Program trims surrounding whitespace",
        "Program builds a formatted sentence with format!",
        "Program counts bytes and characters",
        "Program checks the text contains a word"
      ],
      "rubric": [
        "Trim works",
        "Formatted sentence is correct",
        "Counts are correct",
        "Contains check is correct"
      ]
    }
  },
  {
    "id": "rust-modules",
    "slug": "rust-modules",
    "language": "rust",
    "category": "languages",
    "title": "Modules in Rust",
    "description": "Organise Rust code into modules: paths, visibility, use, re-exports, and file layout.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Declaring modules",
      "Using paths with ::",
      "Controlling visibility with pub",
      "Importing with use",
      "Re-exporting items",
      "Organising a crate"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to organise a library: each shelf holds one subject, and the catalogue tells you where to find it.",
    "modules": [
      {
        "id": "rust-modules-m1",
        "title": "Fundamentals of Modules in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-modules-m1-l1",
            "slug": "rust-modules-m1-l1",
            "title": "Declaring Modules",
            "concept": "A module, declared with mod, groups related items under one name and keeps the code organised. Modules can be written inline in braces or in their own file, and the crate root declares them so the compiler finds them.",
            "syntax": "mod greet { pub fn hello() {} }",
            "exampleCode": "mod greet {\n    pub fn hello() {\n        println!(\"hello from greet\");\n    }\n}\nfn main() {\n    greet::hello();\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting to declare a module file with mod, so its items are invisible to the rest of the crate.",
            "bug": {
              "prompt": "How do you make a module's items visible to the crate?",
              "buggyCode": "fn main() {\n    println!(\"declare with mod\");\n}",
              "fixedCode": "fn main() {\n    println!(\"import the file\");\n}",
              "explanation": "The crate root must declare the module with mod name;."
            },
            "exercise": {
              "title": "Module quiz",
              "type": "multiple-choice",
              "instructions": "How do you make a module's items visible to the crate?",
              "starterCode": "",
              "solution": "Declare it with `mod name;` in the crate root",
              "solutionExplanation": "Modules are declared with mod, which loads the file or inline block.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Declare it with `mod name;` in the crate root",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Declare it with `mod name;` in the crate root",
                "Import the file with include!",
                "List it in Cargo.toml",
                "Name the file the same as the function"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-modules-m1-l2",
            "slug": "rust-modules-m1-l2",
            "title": "Paths and ::",
            "concept": "Items inside a module are reached through a path with ::, as in greet::hello(), starting from the crate root. Absolute paths start with crate::, and relative paths start with self:: or super::.",
            "syntax": "crate::greet::hello();",
            "exampleCode": "mod greet {\n    pub fn hello() {\n        println!(\"hello\");\n    }\n}\nfn main() {\n    crate::greet::hello();\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a relative path that resolves to the wrong module, when crate:: would have been unambiguous.",
            "bug": {
              "prompt": "What does a path starting with crate:: mean?",
              "buggyCode": "fn main() {\n    println!(\"from crate root\");\n}",
              "fixedCode": "fn main() {\n    println!(\"from current module\");\n}",
              "explanation": "crate:: starts the path at the crate root."
            },
            "exercise": {
              "title": "Path program",
              "type": "write-code",
              "instructions": "Write a program that calls crate::greet::hello() and prints `hello`.",
              "starterCode": "mod greet {\n    pub fn hello() {\n        println!(\"hello\");\n    }\n}\nfn main() {\n    // TODO: call with an absolute path\n}",
              "solution": "mod greet {\n    pub fn hello() {\n        println!(\"hello\");\n    }\n}\nfn main() {\n    crate::greet::hello();\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "hello",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "hello",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-modules-m1-l3",
            "slug": "rust-modules-m1-l3",
            "title": "Public and Private",
            "concept": "Items in a module are private by default, so only code in the same module can use them, and pub makes them visible outside. Making the smallest useful surface public keeps the module's internals free to change.",
            "syntax": "pub fn hello() {}",
            "exampleCode": "mod inner {\n    pub fn open() {\n        println!(\"open\");\n    }\n    fn secret() {\n        println!(\"secret\");\n    }\n}\nfn main() {\n    inner::open();\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting pub on a function you want to call from another module.",
            "bug": {
              "prompt": "What does pub do to a function in a module?",
              "buggyCode": "fn main() {\n    println!(\"makes it public\");\n}",
              "fixedCode": "fn main() {\n    println!(\"makes it private\");\n}",
              "explanation": "pub makes an item visible outside its module."
            },
            "exercise": {
              "title": "Public program",
              "type": "write-code",
              "instructions": "Write a program with a public open() function in a module that prints `open`.",
              "starterCode": "mod inner {\n    // TODO: public open function\n}\nfn main() {\n    inner::open();\n}",
              "solution": "mod inner {\n    pub fn open() {\n        println!(\"open\");\n    }\n    fn secret() {\n        println!(\"secret\");\n    }\n}\nfn main() {\n    inner::open();\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "open",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "open",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-modules-m1-l4",
            "slug": "rust-modules-m1-l4",
            "title": "Using use",
            "concept": "The use keyword brings a path into scope, so you can write hello() instead of greet::hello() every time. Use statements go at the top of the file, and they are the standard way to shorten long paths.",
            "syntax": "use crate::greet::hello;",
            "exampleCode": "mod greet {\n    pub fn hello() {\n        println!(\"hello via use\");\n    }\n}\nuse crate::greet::hello;\nfn main() {\n    hello();\n}",
            "exampleLanguage": "rust",
            "mistake": "Importing two items with the same name from different modules, which creates an ambiguous name.",
            "bug": {
              "prompt": "What does `use crate::greet::hello;` do?",
              "buggyCode": "fn main() {\n    println!(\"brings into scope\");\n}",
              "fixedCode": "fn main() {\n    println!(\"runs the function\");\n}",
              "explanation": "use brings a path into scope so it can be used by its short name."
            },
            "exercise": {
              "title": "Use quiz",
              "type": "multiple-choice",
              "instructions": "What does `use crate::greet::hello;` do?",
              "starterCode": "",
              "solution": "It brings the path into scope so you can call hello()",
              "solutionExplanation": "use imports a path into the current scope.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It brings the path into scope so you can call hello()",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "It brings the path into scope so you can call hello()",
                "It runs the function",
                "It creates the module",
                "It exports the function"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-modules-m1-l5",
            "slug": "rust-modules-m1-l5",
            "title": "Nested Modules",
            "concept": "Modules can contain other modules, forming a tree that mirrors the code's structure. A nested module is reached through its parent, as in outer::inner::item(), and each level controls its own visibility.",
            "syntax": "mod outer { pub mod inner { pub fn f() {} } }",
            "exampleCode": "mod outer {\n    pub mod inner {\n        pub fn deep() {\n            println!(\"deep\");\n        }\n    }\n}\nfn main() {\n    outer::inner::deep();\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting pub on the inner module itself, so its public items are still unreachable.",
            "bug": {
              "prompt": "How do you reach a function in a nested module?",
              "buggyCode": "fn main() {\n    println!(\"outer::inner::f()\");\n}",
              "fixedCode": "fn main() {\n    println!(\"inner::f()\");\n}",
              "explanation": "The full path goes through every level: outer::inner::f()."
            },
            "exercise": {
              "title": "Nested program",
              "type": "write-code",
              "instructions": "Write a program that calls outer::inner::deep() and prints `deep`.",
              "starterCode": "mod outer {\n    pub mod inner {\n        pub fn deep() {\n            println!(\"deep\");\n        }\n    }\n}\nfn main() {\n    // TODO: call the nested function\n}",
              "solution": "mod outer {\n    pub mod inner {\n        pub fn deep() {\n            println!(\"deep\");\n        }\n    }\n}\nfn main() {\n    outer::inner::deep();\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "deep",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "deep",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-modules-m2",
        "title": "Applying Modules in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-modules-m2-l1",
            "slug": "rust-modules-m2-l1",
            "title": "Modules in Files",
            "concept": "A module declared as mod greet; loads its code from src/greet.rs, or from src/greet/mod.rs for a module with children. The file layout follows the module tree, so finding code means following the mod declarations.",
            "syntax": "mod greet; // loads src/greet.rs",
            "exampleCode": "mod greet {\n    pub fn hello() {\n        println!(\"hello from file module\");\n    }\n}\nfn main() {\n    greet::hello();\n}",
            "exampleLanguage": "rust",
            "mistake": "Naming the file differently from the module, so the compiler cannot find it.",
            "bug": {
              "prompt": "Where does `mod greet;` load code from?",
              "buggyCode": "fn main() {\n    println!(\"src/greet.rs\");\n}",
              "fixedCode": "fn main() {\n    println!(\"src/main.rs\");\n}",
              "explanation": "mod greet; loads src/greet.rs relative to the declaring file."
            },
            "exercise": {
              "title": "File module program",
              "type": "write-code",
              "instructions": "Write a program with an inline greet module whose hello() prints `hello from file module`.",
              "starterCode": "mod greet {\n    // TODO: hello function\n}\nfn main() {\n    greet::hello();\n}",
              "solution": "mod greet {\n    pub fn hello() {\n        println!(\"hello from file module\");\n    }\n}\nfn main() {\n    greet::hello();\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "hello from file module",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "hello from file module",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-modules-m2-l2",
            "slug": "rust-modules-m2-l2",
            "title": "Re-exporting with pub use",
            "concept": "A pub use re-exports an item from a module, so users of your crate can reach it through a shorter path. Re-exporting is how libraries present a tidy public API while keeping their internal layout private.",
            "syntax": "pub use crate::inner::hello;",
            "exampleCode": "mod inner {\n    pub fn hello() {\n        println!(\"re-exported hello\");\n    }\n}\npub use inner::hello;\nfn main() {\n    hello();\n}",
            "exampleLanguage": "rust",
            "mistake": "Re-exporting everything, which exposes internal helpers as part of the public API.",
            "bug": {
              "prompt": "What does pub use do?",
              "buggyCode": "fn main() {\n    println!(\"re-exports\");\n}",
              "fixedCode": "fn main() {\n    println!(\"hides an item\");\n}",
              "explanation": "pub use makes an imported item public from the current module."
            },
            "exercise": {
              "title": "Re-export program",
              "type": "write-code",
              "instructions": "Write a program that re-exports inner::hello with pub use and prints `re-exported hello`.",
              "starterCode": "mod inner {\n    pub fn hello() {\n        println!(\"re-exported hello\");\n    }\n}\n// TODO: re-export hello\nfn main() {\n    hello();\n}",
              "solution": "mod inner {\n    pub fn hello() {\n        println!(\"re-exported hello\");\n    }\n}\npub use inner::hello;\nfn main() {\n    hello();\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "re-exported hello",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "re-exported hello",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-modules-m2-l3",
            "slug": "rust-modules-m2-l3",
            "title": "The super Keyword",
            "concept": "Inside a nested module, super:: refers to the parent module, so you can call a parent's function without an absolute path. It is the relative-path counterpart to crate::, and it keeps moves of a module working.",
            "syntax": "super::helper();",
            "exampleCode": "mod outer {\n    pub fn helper() {\n        println!(\"helper\");\n    }\n    pub mod inner {\n        pub fn call() {\n            super::helper();\n        }\n    }\n}\nfn main() {\n    outer::inner::call();\n}",
            "exampleLanguage": "rust",
            "mistake": "Using super:: from the crate root, where there is no parent module.",
            "bug": {
              "prompt": "What does super:: refer to?",
              "buggyCode": "fn main() {\n    println!(\"parent module\");\n}",
              "fixedCode": "fn main() {\n    println!(\"crate root\");\n}",
              "explanation": "super:: starts a path at the parent module."
            },
            "exercise": {
              "title": "Super program",
              "type": "write-code",
              "instructions": "Write a program where inner::call() uses super::helper() to print `helper`.",
              "starterCode": "mod outer {\n    pub fn helper() {\n        println!(\"helper\");\n    }\n    pub mod inner {\n        pub fn call() {\n            // TODO: call the parent helper\n        }\n    }\n}\nfn main() {\n    outer::inner::call();\n}",
              "solution": "mod outer {\n    pub fn helper() {\n        println!(\"helper\");\n    }\n    pub mod inner {\n        pub fn call() {\n            super::helper();\n        }\n    }\n}\nfn main() {\n    outer::inner::call();\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "helper",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "helper",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-modules-m2-l4",
            "slug": "rust-modules-m2-l4",
            "title": "Glob Imports",
            "concept": "A glob import, written use module::*, brings every public item of a module into scope at once. It is convenient in tests and for prelude modules, but it can hide where a name came from in normal code.",
            "syntax": "use crate::prelude::*;",
            "exampleCode": "mod math {\n    pub fn double(x: i32) -> i32 {\n        x * 2\n    }\n}\nuse math::*;\nfn main() {\n    println!(\"{}\", double(21));\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a glob import in library code, where an explicit import would show the reader where each name comes from.",
            "bug": {
              "prompt": "What does `use math::*;` import?",
              "buggyCode": "fn main() {\n    println!(\"all public items\");\n}",
              "fixedCode": "fn main() {\n    println!(\"one function\");\n}",
              "explanation": "A glob import brings every public item of the module into scope."
            },
            "exercise": {
              "title": "Glob quiz",
              "type": "multiple-choice",
              "instructions": "What does `use math::*;` import?",
              "starterCode": "",
              "solution": "All public items of the math module",
              "solutionExplanation": "The * glob imports every public item.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "All public items of the math module",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "All public items of the math module",
                "Only the first function",
                "The module itself",
                "Nothing, it is invalid"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-modules-m2-l5",
            "slug": "rust-modules-m2-l5",
            "title": "Organising a Crate",
            "concept": "A well-organised crate has a small lib.rs or main.rs that declares top-level modules, one module per concern, and a public API that is mostly re-exports. Readers should be able to find any feature by following the module tree.",
            "syntax": "mod auth;\nmod store;\nmod web;",
            "exampleCode": "mod auth {\n    pub fn login() {\n        println!(\"logged in\");\n    }\n}\nmod store {\n    pub fn save() {\n        println!(\"saved\");\n    }\n}\nfn main() {\n    auth::login();\n    store::save();\n}",
            "exampleLanguage": "rust",
            "mistake": "Putting everything in main.rs until it is thousands of lines long, instead of splitting by concern.",
            "bug": {
              "prompt": "How should a large crate be organised?",
              "buggyCode": "fn main() {\n    println!(\"one module per concern\");\n}",
              "fixedCode": "fn main() {\n    println!(\"all in main.rs\");\n}",
              "explanation": "Split by concern into modules, with a small root that declares them."
            },
            "exercise": {
              "title": "Organise program",
              "type": "write-code",
              "instructions": "Write a program with auth::login() printing `logged in` and store::save() printing `saved`.",
              "starterCode": "mod auth {\n    // TODO: login\n}\nmod store {\n    // TODO: save\n}\nfn main() {\n    auth::login();\n    store::save();\n}",
              "solution": "mod auth {\n    pub fn login() {\n        println!(\"logged in\");\n    }\n}\nmod store {\n    pub fn save() {\n        println!(\"saved\");\n    }\n}\nfn main() {\n    auth::login();\n    store::save();\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "logged in\nsaved",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "logged in",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Mini library",
      "type": "write-code",
      "instructions": "Write a program with a math module (double(21) -> 42) and a text module (shout(\"hi\") -> \"HI!\"), printing `double 42` and `shout HI!`.",
      "starterCode": "mod math {\n    // TODO: double\n}\nmod text {\n    // TODO: shout\n}\nfn main() {\n    // TODO: use both modules\n}",
      "solution": "mod math {\n    pub fn double(x: i32) -> i32 {\n        x * 2\n    }\n}\nmod text {\n    pub fn shout(s: &str) -> String {\n        format!(\"{}!\", s.to_uppercase())\n    }\n}\nfn main() {\n    println!(\"double {}\", math::double(21));\n    println!(\"shout {}\", text::shout(\"hi\"));\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "double 42\nshout HI!",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "double 42",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Mini Library",
      "description": "Build a program with several modules: math helpers, text helpers, and a main that uses both.",
      "requirements": [
        "Program defines a math module with double",
        "Program defines a text module with shout",
        "Program uses both modules from main",
        "Program prints the results with labels"
      ],
      "rubric": [
        "Math module works",
        "Text module works",
        "Both are used from main",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-crates-packages",
    "slug": "rust-crates-packages",
    "language": "rust",
    "category": "languages",
    "title": "Crates & Packages",
    "description": "Understand crates, packages, dependencies, Cargo.lock, workspaces, and publishing.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "Distinguishing crates and packages",
      "Writing library crates",
      "Writing binary crates",
      "Adding dependencies",
      "Using Cargo.lock",
      "Organising workspaces"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning how a shop stocks its shelves: each crate is a product, and Cargo is the stockroom.",
    "modules": [
      {
        "id": "rust-crates-packages-m1",
        "title": "Fundamentals of Crates & Packages",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-crates-packages-m1-l1",
            "slug": "rust-crates-packages-m1-l1",
            "title": "Crates and Packages",
            "concept": "A crate is a unit of compilation: a binary crate has a main function, a library crate exposes an API, and a package is a Cargo project that contains one or more crates. A package has one library crate at most, plus any number of binary crates.",
            "syntax": "cargo new my_lib --lib",
            "exampleCode": "fn main() {\n    println!(\"package: my_lib\");\n    println!(\"crate: library\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Calling a library crate a package, or a package a crate, when they are different levels of organisation.",
            "bug": {
              "prompt": "What is a package in Cargo?",
              "buggyCode": "fn main() {\n    println!(\"a project with crates\");\n}",
              "fixedCode": "fn main() {\n    println!(\"one file\");\n}",
              "explanation": "A package is a Cargo project containing one or more crates."
            },
            "exercise": {
              "title": "Package program",
              "type": "write-code",
              "instructions": "Write a program that prints `package: my_lib` and `crate: library`.",
              "starterCode": "fn main() {\n    // TODO: print the package facts\n}",
              "solution": "fn main() {\n    println!(\"package: my_lib\");\n    println!(\"crate: library\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "package: my_lib\ncrate: library",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "package: my_lib",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-crates-packages-m1-l2",
            "slug": "rust-crates-packages-m1-l2",
            "title": "Library Crates",
            "concept": "A library crate starts at src/lib.rs and exposes public functions for other crates to use, with no main function. Libraries are how Rust code is shared, and most crates on crates.io are libraries.",
            "syntax": "pub fn add(a: i32, b: i32) -> i32 { a + b }",
            "exampleCode": "pub fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\nfn main() {\n    println!(\"add {}\", add(2, 3));\n}",
            "exampleLanguage": "rust",
            "mistake": "Putting a main function in a library crate, which is the job of a binary crate.",
            "bug": {
              "prompt": "Where does a library crate start?",
              "buggyCode": "fn main() {\n    println!(\"src/lib.rs\");\n}",
              "fixedCode": "fn main() {\n    println!(\"src/main.rs\");\n}",
              "explanation": "A library crate's root is src/lib.rs."
            },
            "exercise": {
              "title": "Library program",
              "type": "write-code",
              "instructions": "Write a program with a public add function that prints `add 5` for 2 + 3.",
              "starterCode": "pub fn add(a: i32, b: i32) -> i32 {\n    // TODO\n    0\n}\nfn main() {\n    println!(\"add {}\", add(2, 3));\n}",
              "solution": "pub fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\nfn main() {\n    println!(\"add {}\", add(2, 3));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "add 5",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "add 5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-crates-packages-m1-l3",
            "slug": "rust-crates-packages-m1-l3",
            "title": "Binary Crates",
            "concept": "A binary crate starts at src/main.rs and compiles into an executable program. A package can have several binary crates in src/bin, each with its own main function, alongside its library.",
            "syntax": "fn main() { println!(\"running\"); }",
            "exampleCode": "fn main() {\n    println!(\"binary crate running\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Expecting a binary crate to be importable like a library, when only library crates expose an API.",
            "bug": {
              "prompt": "Where does a binary crate start?",
              "buggyCode": "fn main() {\n    println!(\"src/main.rs\");\n}",
              "fixedCode": "fn main() {\n    println!(\"src/lib.rs\");\n}",
              "explanation": "A binary crate's root is src/main.rs, which must contain fn main."
            },
            "exercise": {
              "title": "Binary quiz",
              "type": "multiple-choice",
              "instructions": "Where does a binary crate start?",
              "starterCode": "",
              "solution": "src/main.rs",
              "solutionExplanation": "Binary crates start at src/main.rs.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "src/main.rs",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "src/main.rs",
                "src/lib.rs",
                "src/bin.rs",
                "Cargo.toml"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-crates-packages-m1-l4",
            "slug": "rust-crates-packages-m1-l4",
            "title": "Dependencies from crates.io",
            "concept": "External crates are declared in Cargo.toml under [dependencies] with a name and a version requirement, and cargo downloads them from crates.io. The version requirement like \"0.8\" means any compatible 0.8.x release, following semantic versioning.",
            "syntax": "[dependencies]\nserde = \"1.0\"",
            "exampleCode": "fn main() {\n    println!(\"dependency: serde 1.0\");\n    println!(\"source: crates.io\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Pinning an exact version when a compatible range would let cargo pick up bug fixes.",
            "bug": {
              "prompt": "Where are external crates declared?",
              "buggyCode": "fn main() {\n    println!(\"Cargo.toml\");\n}",
              "fixedCode": "fn main() {\n    println!(\"main.rs\");\n}",
              "explanation": "Dependencies are declared in Cargo.toml under [dependencies]."
            },
            "exercise": {
              "title": "Dependency program",
              "type": "write-code",
              "instructions": "Write a program that prints `dependency: serde 1.0` and `source: crates.io`.",
              "starterCode": "fn main() {\n    // TODO: print the dependency facts\n}",
              "solution": "fn main() {\n    println!(\"dependency: serde 1.0\");\n    println!(\"source: crates.io\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "dependency: serde 1.0\nsource: crates.io",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "dependency: serde 1.0",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-crates-packages-m1-l5",
            "slug": "rust-crates-packages-m1-l5",
            "title": "Cargo.lock",
            "concept": "Cargo.lock records the exact version of every dependency, including dependencies of dependencies, so a build is reproducible. Commit Cargo.lock for applications, so every machine builds the same tree; libraries usually leave it out.",
            "syntax": "cargo build # writes Cargo.lock",
            "exampleCode": "fn main() {\n    println!(\"lock: exact versions\");\n    println!(\"commit for apps\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Deleting Cargo.lock and expecting the same versions to be chosen, when cargo may pick newer compatible ones.",
            "bug": {
              "prompt": "What does Cargo.lock record?",
              "buggyCode": "fn main() {\n    println!(\"exact versions\");\n}",
              "fixedCode": "fn main() {\n    println!(\"source code\");\n}",
              "explanation": "Cargo.lock pins the exact version of every dependency in the tree."
            },
            "exercise": {
              "title": "Lock quiz",
              "type": "multiple-choice",
              "instructions": "What does Cargo.lock record?",
              "starterCode": "",
              "solution": "The exact version of every dependency",
              "solutionExplanation": "Cargo.lock pins exact versions for reproducible builds.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The exact version of every dependency",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "The exact version of every dependency",
                "The source code of dependencies",
                "Your package name",
                "The Rust edition"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-crates-packages-m2",
        "title": "Applying Crates & Packages",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-crates-packages-m2-l1",
            "slug": "rust-crates-packages-m2-l1",
            "title": "Semantic Versioning",
            "concept": "Rust crates use semantic versioning: major.minor.patch, where a patch is a bug fix, a minor adds features compatibly, and a major can break the API. A requirement like \"1.2\" allows 1.2.0 and later 1.x releases, but not 2.0.",
            "syntax": "serde = \"1.0\" # allows 1.x, not 2.0",
            "exampleCode": "fn main() {\n    println!(\"1.2 allows 1.9\");\n    println!(\"1.2 blocks 2.0\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming a minor version bump can break your code, when semantic versioning promises it will not.",
            "bug": {
              "prompt": "What does the version requirement \"1.0\" allow?",
              "buggyCode": "fn main() {\n    println!(\"1.x releases\");\n}",
              "fixedCode": "fn main() {\n    println!(\"2.0 too\");\n}",
              "explanation": "A \"1.0\" requirement allows compatible 1.x releases, but not 2.0."
            },
            "exercise": {
              "title": "Semver program",
              "type": "write-code",
              "instructions": "Write a program that prints `1.2 allows 1.9` and `1.2 blocks 2.0`.",
              "starterCode": "fn main() {\n    // TODO: print the semver facts\n}",
              "solution": "fn main() {\n    println!(\"1.2 allows 1.9\");\n    println!(\"1.2 blocks 2.0\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "1.2 allows 1.9\n1.2 blocks 2.0",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "1.2 allows 1.9",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-crates-packages-m2-l2",
            "slug": "rust-crates-packages-m2-l2",
            "title": "Features",
            "concept": "A crate can offer optional features that are switched on in Cargo.toml, as in serde = { version = \"1.0\", features = [\"derive\"] }. Features keep the default build small while letting users opt into extra behaviour.",
            "syntax": "serde = { version = \"1.0\", features = [\"derive\"] }",
            "exampleCode": "fn main() {\n    println!(\"feature: derive\");\n    println!(\"crate: serde 1.0\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Enabling every feature of a dependency, which pulls in code you never use.",
            "bug": {
              "prompt": "How do you enable an optional feature of a dependency?",
              "buggyCode": "fn main() {\n    println!(\"in Cargo.toml\");\n}",
              "fixedCode": "fn main() {\n    println!(\"in main.rs\");\n}",
              "explanation": "Features are enabled in the dependency declaration in Cargo.toml."
            },
            "exercise": {
              "title": "Feature program",
              "type": "write-code",
              "instructions": "Write a program that prints `feature: derive` and `crate: serde 1.0`.",
              "starterCode": "fn main() {\n    // TODO: print the feature facts\n}",
              "solution": "fn main() {\n    println!(\"feature: derive\");\n    println!(\"crate: serde 1.0\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "feature: derive\ncrate: serde 1.0",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "feature: derive",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-crates-packages-m2-l3",
            "slug": "rust-crates-packages-m2-l3",
            "title": "Workspaces",
            "concept": "A Cargo workspace groups several packages under one Cargo.toml with a [workspace] section, so they share one Cargo.lock and one target directory. Workspaces are how large projects keep related crates together without publishing them separately.",
            "syntax": "[workspace]\nmembers = [\"api\", \"core\"]",
            "exampleCode": "fn main() {\n    println!(\"workspace members: api core\");\n    println!(\"shared lock and target\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Making each crate its own separate project with its own lockfile, when a workspace would share one.",
            "bug": {
              "prompt": "What does a workspace share between its member packages?",
              "buggyCode": "fn main() {\n    println!(\"lock and target\");\n}",
              "fixedCode": "fn main() {\n    println!(\"source files\");\n}",
              "explanation": "Workspace members share one Cargo.lock and one target directory."
            },
            "exercise": {
              "title": "Workspace quiz",
              "type": "multiple-choice",
              "instructions": "What does a workspace share between its member packages?",
              "starterCode": "",
              "solution": "One Cargo.lock and one target directory",
              "solutionExplanation": "Workspaces share the lockfile and build output directory.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "One Cargo.lock and one target directory",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "One Cargo.lock and one target directory",
                "Source files",
                "A single main function",
                "A single crate name"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-crates-packages-m2-l4",
            "slug": "rust-crates-packages-m2-l4",
            "title": "Publishing a Crate",
            "concept": "Publishing a crate to crates.io uses cargo publish, which uploads the package after checking it builds and its metadata is complete. Published crates need a description, a licence, and a version, and a published version can never be overwritten.",
            "syntax": "cargo publish",
            "exampleCode": "fn main() {\n    println!(\"publish: cargo publish\");\n    println!(\"versions are permanent\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Publishing a crate with a placeholder description, which crates.io rejects.",
            "bug": {
              "prompt": "What command publishes a crate to crates.io?",
              "buggyCode": "fn main() {\n    println!(\"cargo publish\");\n}",
              "fixedCode": "fn main() {\n    println!(\"cargo upload\");\n}",
              "explanation": "cargo publish uploads the package to crates.io."
            },
            "exercise": {
              "title": "Publish program",
              "type": "write-code",
              "instructions": "Write a program that prints `publish: cargo publish` and `versions are permanent`.",
              "starterCode": "fn main() {\n    // TODO: print the publish facts\n}",
              "solution": "fn main() {\n    println!(\"publish: cargo publish\");\n    println!(\"versions are permanent\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "publish: cargo publish\nversions are permanent",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "publish: cargo publish",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-crates-packages-m2-l5",
            "slug": "rust-crates-packages-m2-l5",
            "title": "Choosing Dependencies",
            "concept": "Choose dependencies by checking their maintenance, documentation, and how much code they pull in, and prefer small, focused crates over large ones that do everything. Every dependency is code you trust but did not write, so fewer, better-chosen dependencies make a healthier project.",
            "syntax": "cargo tree # see the dependency tree",
            "exampleCode": "fn main() {\n    println!(\"check maintenance\");\n    println!(\"check docs\");\n    println!(\"prefer small crates\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Adding a dependency for a ten-line job you could write yourself, and inheriting its whole dependency tree.",
            "bug": {
              "prompt": "What should you check before adding a dependency?",
              "buggyCode": "fn main() {\n    println!(\"maintenance and docs\");\n}",
              "fixedCode": "fn main() {\n    println!(\"download count only\");\n}",
              "explanation": "Check maintenance, documentation, and the size of its dependency tree."
            },
            "exercise": {
              "title": "Choose program",
              "type": "write-code",
              "instructions": "Write a program that prints `check maintenance`, `check docs`, and `prefer small crates`.",
              "starterCode": "fn main() {\n    // TODO: print the checklist\n}",
              "solution": "fn main() {\n    println!(\"check maintenance\");\n    println!(\"check docs\");\n    println!(\"prefer small crates\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "check maintenance\ncheck docs\nprefer small crates",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "check maintenance",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Package report",
      "type": "write-code",
      "instructions": "Write a program that prints `package: shop`, `library: src/lib.rs`, `binary: src/main.rs`, `dep: serde 1.0`, and `1.0 allows 1.9 not 2.0`.",
      "starterCode": "fn main() {\n    // TODO: print the package report\n}",
      "solution": "fn main() {\n    println!(\"package: shop\");\n    println!(\"library: src/lib.rs\");\n    println!(\"binary: src/main.rs\");\n    println!(\"dep: serde 1.0\");\n    println!(\"1.0 allows 1.9 not 2.0\");\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "package: shop\nlibrary: src/lib.rs\nbinary: src/main.rs\ndep: serde 1.0\n1.0 allows 1.9 not 2.0",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "package: shop",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Package Report",
      "description": "Build a program that reports on a package: its crates, dependencies, and version rules.",
      "requirements": [
        "Program prints the package and crate kinds",
        "Program prints a dependency with its version",
        "Program prints the semver rule for that version",
        "Program prints the workspace fact"
      ],
      "rubric": [
        "Package facts are correct",
        "Dependency is correct",
        "Semver rule is correct",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-testing-basics",
    "slug": "rust-testing-basics",
    "language": "rust",
    "category": "languages",
    "title": "Testing Basics in Rust",
    "description": "Write and run tests in Rust: #[test], assertions, edge cases, and integration tests.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "Writing #[test] functions",
      "Using assert! and assert_eq!",
      "Testing edge cases",
      "Using should_panic",
      "Writing integration tests",
      "Running single tests"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like proofreading before sending a letter: check it yourself before anyone else reads it.",
    "modules": [
      {
        "id": "rust-testing-basics-m1",
        "title": "Fundamentals of Testing Basics in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-testing-basics-m1-l1",
            "slug": "rust-testing-basics-m1-l1",
            "title": "Writing a Test",
            "concept": "A test is a function marked #[test] inside a #[cfg(test)] module, and it passes when it runs without panicking. The assert! macro checks a condition, and assert_eq! checks two values are equal, reporting both when they differ.",
            "syntax": "#[test]\nfn it_works() { assert_eq!(2 + 2, 4); }",
            "exampleCode": "fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\n#[cfg(test)]\nmod tests {\n    use super::*;\n    #[test]\n    fn adds_two() {\n        assert_eq!(add(2, 3), 5);\n    }\n}\nfn main() {\n    println!(\"add {}\", add(2, 3));\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing tests that only check the happy path, and never the edge cases.",
            "bug": {
              "prompt": "What does #[test] mark?",
              "buggyCode": "fn main() {\n    println!(\"a test function\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a main function\");\n}",
              "explanation": "#[test] marks a function as a test for cargo test."
            },
            "exercise": {
              "title": "Test quiz",
              "type": "multiple-choice",
              "instructions": "What does #[test] mark?",
              "starterCode": "",
              "solution": "A test function",
              "solutionExplanation": "#[test] marks a function that cargo test runs as a test.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A test function",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "A test function",
                "A main function",
                "A benchmark",
                "A documentation example"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-testing-basics-m1-l2",
            "slug": "rust-testing-basics-m1-l2",
            "title": "Running Tests",
            "concept": "The command cargo test compiles your code in test mode, runs every test, and reports how many passed and failed. A failing test prints the values that differed, which points straight at the broken assumption.",
            "syntax": "cargo test",
            "exampleCode": "fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\nfn main() {\n    println!(\"test add: {}\", add(2, 3) == 5);\n}",
            "exampleLanguage": "rust",
            "mistake": "Running the program with cargo run and expecting it to run the tests too.",
            "bug": {
              "prompt": "What command runs the tests?",
              "buggyCode": "fn main() {\n    println!(\"cargo test\");\n}",
              "fixedCode": "fn main() {\n    println!(\"cargo run\");\n}",
              "explanation": "cargo test builds and runs all tests in the project."
            },
            "exercise": {
              "title": "Test run program",
              "type": "write-code",
              "instructions": "Write a program that prints `test add: true` by checking add(2, 3) == 5.",
              "starterCode": "fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\nfn main() {\n    // TODO: check the addition\n}",
              "solution": "fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\nfn main() {\n    println!(\"test add: {}\", add(2, 3) == 5);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "test add: true",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "test add: true",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-testing-basics-m1-l3",
            "slug": "rust-testing-basics-m1-l3",
            "title": "assert_eq! and assert!",
            "concept": "The assert_eq! macro compares two values with == and prints both when they differ, while assert! checks a single boolean condition. Both panic on failure, which is how a test reports that something is wrong.",
            "syntax": "assert_eq!(add(2, 2), 4);\nassert!(add(1, 1) > 0);",
            "exampleCode": "fn main() {\n    assert_eq!(2 + 2, 4);\n    assert!(3 > 2);\n    println!(\"assertions passed\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Using assert_eq! on values that do not implement Debug, so the failure message cannot print them.",
            "bug": {
              "prompt": "What does assert_eq! print when it fails?",
              "buggyCode": "fn main() {\n    println!(\"both values\");\n}",
              "fixedCode": "fn main() {\n    println!(\"nothing\");\n}",
              "explanation": "assert_eq! prints the left and right values so you can see how they differ."
            },
            "exercise": {
              "title": "Assertions program",
              "type": "write-code",
              "instructions": "Write a program that asserts 2 + 2 == 4 and 3 > 2, then prints `assertions passed`.",
              "starterCode": "fn main() {\n    // TODO: assert and print\n}",
              "solution": "fn main() {\n    assert_eq!(2 + 2, 4);\n    assert!(3 > 2);\n    println!(\"assertions passed\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "assertions passed",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "assertions passed",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-testing-basics-m1-l4",
            "slug": "rust-testing-basics-m1-l4",
            "title": "Testing Edge Cases",
            "concept": "Edge cases are the inputs at the boundaries: zero, empty, the largest value, and the first invalid one. A test suite that covers the edges catches the off-by-one errors that happy-path tests miss.",
            "syntax": "assert_eq!(double(0), 0);",
            "exampleCode": "fn double(x: i32) -> i32 {\n    x * 2\n}\nfn main() {\n    println!(\"{} {} {}\", double(0), double(1), double(-3));\n}",
            "exampleLanguage": "rust",
            "mistake": "Testing only typical inputs and missing the zero and empty cases.",
            "bug": {
              "prompt": "What is an edge case?",
              "buggyCode": "fn main() {\n    println!(\"boundary input\");\n}",
              "fixedCode": "fn main() {\n    println!(\"typical input\");\n}",
              "explanation": "Edge cases are inputs at the boundaries, like zero or empty."
            },
            "exercise": {
              "title": "Edge quiz",
              "type": "multiple-choice",
              "instructions": "What is an edge case?",
              "starterCode": "",
              "solution": "An input at a boundary, like zero or empty",
              "solutionExplanation": "Edge cases sit at the boundaries where bugs hide.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "An input at a boundary, like zero or empty",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "An input at a boundary, like zero or empty",
                "A typical input",
                "A random input",
                "An invalid test"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-testing-basics-m1-l5",
            "slug": "rust-testing-basics-m1-l5",
            "title": "should_panic Tests",
            "concept": "A test marked #[should_panic] passes when the code panics, which is how you test that invalid input is rejected. The expected message can be checked too, with #[should_panic(expected = \"...\")].",
            "syntax": "#[test]\n#[should_panic]\nfn rejects() { divide(1, 0); }",
            "exampleCode": "fn divide(a: i32, b: i32) -> i32 {\n    if b == 0 {\n        panic!(\"divide by zero\");\n    }\n    a / b\n}\nfn main() {\n    println!(\"{}\", divide(10, 2));\n}",
            "exampleLanguage": "rust",
            "mistake": "Using should_panic for a case that should return an error value instead of panicking.",
            "bug": {
              "prompt": "What does #[should_panic] test?",
              "buggyCode": "fn main() {\n    println!(\"code panics\");\n}",
              "fixedCode": "fn main() {\n    println!(\"code succeeds\");\n}",
              "explanation": "should_panic passes when the test code panics."
            },
            "exercise": {
              "title": "Divide program",
              "type": "write-code",
              "instructions": "Write a program with divide() that panics on zero and prints `5` for divide(10, 2).",
              "starterCode": "fn divide(a: i32, b: i32) -> i32 {\n    // TODO: panic on zero\n    a / b\n}\nfn main() {\n    println!(\"{}\", divide(10, 2));\n}",
              "solution": "fn divide(a: i32, b: i32) -> i32 {\n    if b == 0 {\n        panic!(\"divide by zero\");\n    }\n    a / b\n}\nfn main() {\n    println!(\"{}\", divide(10, 2));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "5",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-testing-basics-m2",
        "title": "Applying Testing Basics in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-testing-basics-m2-l1",
            "slug": "rust-testing-basics-m2-l1",
            "title": "Tests Returning Result",
            "concept": "A test can return Result<(), E>, which lets it use ? to propagate errors instead of unwrapping. A test that returns Err fails, so fallible setup code fits naturally into the test body.",
            "syntax": "#[test]\nfn it_parses() -> Result<(), String> { Ok(()) }",
            "exampleCode": "fn main() {\n    let r: Result<i32, String> = \"42\".parse().map_err(|_| String::from(\"bad\"));\n    println!(\"parse ok: {}\", r.is_ok());\n}",
            "exampleLanguage": "rust",
            "mistake": "Unwrapping in tests when returning Result would give a cleaner failure.",
            "bug": {
              "prompt": "What happens when a test returns Err?",
              "buggyCode": "fn main() {\n    println!(\"test fails\");\n}",
              "fixedCode": "fn main() {\n    println!(\"test passes\");\n}",
              "explanation": "A test returning Err is reported as failed."
            },
            "exercise": {
              "title": "Result test program",
              "type": "write-code",
              "instructions": "Write a program that parses \"42\" into a Result and prints `parse ok: true`.",
              "starterCode": "fn main() {\n    // TODO: parse into a Result\n}",
              "solution": "fn main() {\n    let r: Result<i32, String> = \"42\".parse().map_err(|_| String::from(\"bad\"));\n    println!(\"parse ok: {}\", r.is_ok());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "parse ok: true",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "parse ok: true",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-testing-basics-m2-l2",
            "slug": "rust-testing-basics-m2-l2",
            "title": "Integration Tests",
            "concept": "Integration tests live in the tests/ directory and use the library crate like an external user would, through its public API. They catch problems in how the pieces fit together that unit tests inside the crate cannot see.",
            "syntax": "// tests/api.rs\nuse my_lib::add;",
            "exampleCode": "fn main() {\n    println!(\"integration: tests/ dir\");\n    println!(\"uses public API\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Testing private internals from an integration test, which can only see the public API.",
            "bug": {
              "prompt": "Where do integration tests live?",
              "buggyCode": "fn main() {\n    println!(\"tests/ dir\");\n}",
              "fixedCode": "fn main() {\n    println!(\"src/ dir\");\n}",
              "explanation": "Integration tests live in tests/ at the package root."
            },
            "exercise": {
              "title": "Integration program",
              "type": "write-code",
              "instructions": "Write a program that prints `integration: tests/ dir` and `uses public API`.",
              "starterCode": "fn main() {\n    // TODO: print the integration facts\n}",
              "solution": "fn main() {\n    println!(\"integration: tests/ dir\");\n    println!(\"uses public API\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "integration: tests/ dir\nuses public API",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "integration: tests/ dir",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-testing-basics-m2-l3",
            "slug": "rust-testing-basics-m2-l3",
            "title": "Test Organisation",
            "concept": "Unit tests live in a tests module at the bottom of the file they test, with use super::* to reach the code. Keeping tests next to the code they cover makes it easy to find and update them together.",
            "syntax": "#[cfg(test)]\nmod tests { use super::*; }",
            "exampleCode": "fn double(x: i32) -> i32 {\n    x * 2\n}\n#[cfg(test)]\nmod tests {\n    use super::*;\n    #[test]\n    fn doubles() {\n        assert_eq!(double(4), 8);\n    }\n}\nfn main() {\n    println!(\"{}\", double(4));\n}",
            "exampleLanguage": "rust",
            "mistake": "Putting tests in a separate file from the code they test, so they drift apart.",
            "bug": {
              "prompt": "Where do unit tests usually live in Rust?",
              "buggyCode": "fn main() {\n    println!(\"same file\");\n}",
              "fixedCode": "fn main() {\n    println!(\"separate crate\");\n}",
              "explanation": "Unit tests live in a #[cfg(test)] module in the same file."
            },
            "exercise": {
              "title": "Organised test program",
              "type": "write-code",
              "instructions": "Write a program with double() and a #[cfg(test)] module asserting double(4) == 8, printing `8` from main.",
              "starterCode": "fn double(x: i32) -> i32 {\n    x * 2\n}\n#[cfg(test)]\nmod tests {\n    use super::*;\n    #[test]\n    fn doubles() {\n        assert_eq!(double(4), 8);\n    }\n}\nfn main() {\n    // TODO: print double(4)\n}",
              "solution": "fn double(x: i32) -> i32 {\n    x * 2\n}\n#[cfg(test)]\nmod tests {\n    use super::*;\n    #[test]\n    fn doubles() {\n        assert_eq!(double(4), 8);\n    }\n}\nfn main() {\n    println!(\"{}\", double(4));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "8",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "8",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-testing-basics-m2-l4",
            "slug": "rust-testing-basics-m2-l4",
            "title": "Running One Test",
            "concept": "You can run a single test with cargo test name, where name matches the test's name, and -- --nocapture shows println! output from tests. Running one test at a time is the fastest way to debug a failing test.",
            "syntax": "cargo test adds_two -- --nocapture",
            "exampleCode": "fn main() {\n    println!(\"run one: cargo test adds_two\");\n    println!(\"show output: -- --nocapture\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Running the whole suite to debug one test, when cargo test name would run just that one.",
            "bug": {
              "prompt": "How do you run a single test named adds_two?",
              "buggyCode": "fn main() {\n    println!(\"cargo test adds_two\");\n}",
              "fixedCode": "fn main() {\n    println!(\"cargo run adds_two\");\n}",
              "explanation": "cargo test with a name filter runs only matching tests."
            },
            "exercise": {
              "title": "Single test quiz",
              "type": "multiple-choice",
              "instructions": "How do you run a single test named adds_two?",
              "starterCode": "",
              "solution": "cargo test adds_two",
              "solutionExplanation": "cargo test accepts a name filter.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "cargo test adds_two",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "cargo test adds_two",
                "cargo run adds_two",
                "cargo test --all adds_two",
                "rustc adds_two"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-testing-basics-m2-l5",
            "slug": "rust-testing-basics-m2-l5",
            "title": "Test-Driven Habits",
            "concept": "Test-driven development means writing a failing test first, then the smallest code that makes it pass, then refactoring. Even without strict TDD, writing the test before the fix for a bug guarantees the bug stays fixed.",
            "syntax": "fn test() { assert_eq!(f(2), 4); } // write first",
            "exampleCode": "fn f(x: i32) -> i32 {\n    x * 2\n}\nfn main() {\n    println!(\"f(2) = {}\", f(2));\n    println!(\"test first, then code\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing the code first and the test afterwards, so the test only ever confirms what the code already does.",
            "bug": {
              "prompt": "What is the first step in test-driven development?",
              "buggyCode": "fn main() {\n    println!(\"failing test\");\n}",
              "fixedCode": "fn main() {\n    println!(\"write code\");\n}",
              "explanation": "TDD starts with a failing test, then the code that makes it pass."
            },
            "exercise": {
              "title": "TDD program",
              "type": "write-code",
              "instructions": "Write a program with f(x) = x * 2 that prints `f(2) = 4` and `test first, then code`.",
              "starterCode": "fn f(x: i32) -> i32 {\n    // TODO\n    0\n}\nfn main() {\n    println!(\"f(2) = {}\", f(2));\n    println!(\"test first, then code\");\n}",
              "solution": "fn f(x: i32) -> i32 {\n    x * 2\n}\nfn main() {\n    println!(\"f(2) = {}\", f(2));\n    println!(\"test first, then code\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "f(2) = 4\ntest first, then code",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "f(2) = 4",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Tested calculator",
      "type": "write-code",
      "instructions": "Write a program with add, subtract, multiply functions and a #[cfg(test)] module with three tests, printing `7 7 12` for add(3,4), subtract(10,3), multiply(3,4).",
      "starterCode": "fn add(a: i32, b: i32) -> i32 {\n    // TODO\n    0\n}\nfn main() {\n    // TODO: print 7 7 12\n}",
      "solution": "fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\nfn subtract(a: i32, b: i32) -> i32 {\n    a - b\n}\nfn multiply(a: i32, b: i32) -> i32 {\n    a * b\n}\n#[cfg(test)]\nmod tests {\n    use super::*;\n    #[test]\n    fn adds() {\n        assert_eq!(add(3, 4), 7);\n    }\n    #[test]\n    fn subtracts() {\n        assert_eq!(subtract(10, 3), 7);\n    }\n    #[test]\n    fn multiplies() {\n        assert_eq!(multiply(3, 4), 12);\n    }\n}\nfn main() {\n    println!(\"{} {} {}\", add(3, 4), subtract(10, 3), multiply(3, 4));\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "7 7 12",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "7 7 12",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Tested Calculator",
      "description": "Build a program with tested arithmetic functions and a test module covering normal and edge cases.",
      "requirements": [
        "Program defines add, subtract, and multiply",
        "Program has a #[cfg(test)] module with three tests",
        "Program tests an edge case like zero",
        "Program prints the results from main"
      ],
      "rubric": [
        "Three functions are defined",
        "Test module has three tests",
        "Edge case is covered",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-debugging",
    "slug": "rust-debugging",
    "language": "rust",
    "category": "languages",
    "title": "Debugging Rust",
    "description": "Debug Rust programs: reading compiler errors, tracing with dbg! and prints, panics, and backtraces.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "Reading compiler errors",
      "Tracing with dbg!",
      "Understanding panics",
      "Using backtraces",
      "Bisecting bugs",
      "Preventing regressions"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to be a detective: gather clues, test a theory, and change one thing at a time.",
    "modules": [
      {
        "id": "rust-debugging-m1",
        "title": "Fundamentals of Debugging Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-debugging-m1-l1",
            "slug": "rust-debugging-m1-l1",
            "title": "Reading Compiler Errors",
            "concept": "Rust compiler errors point at the exact line and explain what went wrong, often with a suggestion and a note. Reading the whole error, starting with the first one, is the fastest way to fix a program.",
            "syntax": "error[E0308]: mismatched types",
            "exampleCode": "fn main() {\n    let x: i32 = 5;\n    println!(\"x is {}\", x);\n}",
            "exampleLanguage": "rust",
            "mistake": "Fixing the last error first, when the first error often causes the rest.",
            "bug": {
              "prompt": "What should you read first when the compiler reports many errors?",
              "buggyCode": "fn main() {\n    println!(\"first error\");\n}",
              "fixedCode": "fn main() {\n    println!(\"last error\");\n}",
              "explanation": "The first error is usually the real cause; later ones are often knock-on effects."
            },
            "exercise": {
              "title": "Clean compile program",
              "type": "write-code",
              "instructions": "Write a program that declares x: i32 = 5 and prints `x is 5` with no compiler errors.",
              "starterCode": "fn main() {\n    // TODO: declare and print x\n}",
              "solution": "fn main() {\n    let x: i32 = 5;\n    println!(\"x is {}\", x);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "x is 5",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "x is 5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-debugging-m1-l2",
            "slug": "rust-debugging-m1-l2",
            "title": "Using dbg!",
            "concept": "The dbg! macro prints a value to stderr with its file and line, and returns the value, so you can wrap any expression. It is the quickest way to see what a value actually is at a point in the program.",
            "syntax": "let y = dbg!(x * 2);",
            "exampleCode": "fn main() {\n    let x = 21;\n    let y = dbg!(x * 2);\n    println!(\"y is {}\", y);\n}",
            "exampleLanguage": "rust",
            "mistake": "Leaving dbg! calls in the finished program, so stderr is full of debug noise.",
            "bug": {
              "prompt": "What does dbg! print?",
              "buggyCode": "fn main() {\n    println!(\"value and location\");\n}",
              "fixedCode": "fn main() {\n    println!(\"only value\");\n}",
              "explanation": "dbg! prints the expression, its value, and the file and line to stderr."
            },
            "exercise": {
              "title": "Dbg program",
              "type": "write-code",
              "instructions": "Write a program that uses dbg!(x * 2) for x = 21 and prints `y is 42`.",
              "starterCode": "fn main() {\n    let x = 21;\n    // TODO: dbg! and print\n}",
              "solution": "fn main() {\n    let x = 21;\n    let y = dbg!(x * 2);\n    println!(\"y is {}\", y);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "y is 42",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "y is 42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-debugging-m1-l3",
            "slug": "rust-debugging-m1-l3",
            "title": "Printing Values to Trace",
            "concept": "Adding temporary println! calls shows the order code runs in and the values at each step, which is enough to find most logic bugs. Remove the prints once the bug is found, or the output stays noisy.",
            "syntax": "println!(\"here: n = {}\", n);",
            "exampleCode": "fn main() {\n    let mut n = 0;\n    for i in 1..=3 {\n        n += i;\n        println!(\"after {}: n = {}\", i, n);\n    }\n    println!(\"final {}\", n);\n}",
            "exampleLanguage": "rust",
            "mistake": "Adding prints everywhere at once, instead of one at a time near the suspected bug.",
            "bug": {
              "prompt": "Why add a temporary println! while debugging?",
              "buggyCode": "fn main() {\n    println!(\"see values\");\n}",
              "fixedCode": "fn main() {\n    println!(\"fix the bug\");\n}",
              "explanation": "A print shows the actual values at that point, so you can compare them with what you expected."
            },
            "exercise": {
              "title": "Trace quiz",
              "type": "multiple-choice",
              "instructions": "Why add a temporary println! while debugging?",
              "starterCode": "",
              "solution": "To see the actual values at that point",
              "solutionExplanation": "Prints reveal the real values, which you compare with your expectations.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "To see the actual values at that point",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "To see the actual values at that point",
                "To fix the bug automatically",
                "To make the program faster",
                "To satisfy the compiler"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-debugging-m1-l4",
            "slug": "rust-debugging-m1-l4",
            "title": "Understanding Panics",
            "concept": "A panic means the program hit a condition it cannot recover from, like indexing out of bounds or unwrapping None, and it prints a message with the file and line. The panic message tells you what happened; the backtrace tells you where.",
            "syntax": "thread 'main' panicked at src/main.rs:2:5",
            "exampleCode": "fn main() {\n    let v = vec![1, 2];\n    println!(\"safe: {:?}\", v.get(5));\n}",
            "exampleLanguage": "rust",
            "mistake": "Treating every panic as a compiler bug, instead of reading the message it printed.",
            "bug": {
              "prompt": "What does a panic message tell you?",
              "buggyCode": "fn main() {\n    println!(\"what and where\");\n}",
              "fixedCode": "fn main() {\n    println!(\"nothing useful\");\n}",
              "explanation": "A panic prints what failed and the file and line where it happened."
            },
            "exercise": {
              "title": "Safe get program",
              "type": "write-code",
              "instructions": "Write a program that prints `safe: None` for vec![1, 2].get(5) instead of panicking on indexing.",
              "starterCode": "fn main() {\n    let v = vec![1, 2];\n    // TODO: safe access\n}",
              "solution": "fn main() {\n    let v = vec![1, 2];\n    println!(\"safe: {:?}\", v.get(5));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "safe: None",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "safe: None",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-debugging-m1-l5",
            "slug": "rust-debugging-m1-l5",
            "title": "Backtraces",
            "concept": "Setting RUST_BACKTRACE=1 before running a program makes a panic print a stack trace of the calls that led to it. The trace shows the chain of function calls, so you can find which caller passed the bad value.",
            "syntax": "RUST_BACKTRACE=1 cargo run",
            "exampleCode": "fn main() {\n    println!(\"backtrace: RUST_BACKTRACE=1\");\n    println!(\"shows call chain\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Ignoring the backtrace and guessing which function caused the panic.",
            "bug": {
              "prompt": "How do you get a backtrace for a panic?",
              "buggyCode": "fn main() {\n    println!(\"RUST_BACKTRACE=1\");\n}",
              "fixedCode": "fn main() {\n    println!(\"cargo build\");\n}",
              "explanation": "Setting RUST_BACKTRACE=1 makes panics print a stack trace."
            },
            "exercise": {
              "title": "Backtrace quiz",
              "type": "multiple-choice",
              "instructions": "How do you get a backtrace for a panic?",
              "starterCode": "",
              "solution": "Set RUST_BACKTRACE=1 before running",
              "solutionExplanation": "RUST_BACKTRACE=1 enables backtraces on panic.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Set RUST_BACKTRACE=1 before running",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Set RUST_BACKTRACE=1 before running",
                "Run cargo build",
                "Add a println!",
                "Restart the computer"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-debugging-m2",
        "title": "Applying Debugging Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-debugging-m2-l1",
            "slug": "rust-debugging-m2-l1",
            "title": "Bisecting a Bug",
            "concept": "Bisecting means narrowing down where a bug lives by testing half the code at a time, commenting out or simplifying parts until the failure disappears. The last change that makes the failure vanish points at the faulty code.",
            "syntax": "fn main() { println!(\"half works\"); }",
            "exampleCode": "fn main() {\n    let a = 2 + 2;\n    let b = a * 3;\n    println!(\"a {} b {}\", a, b);\n}",
            "exampleLanguage": "rust",
            "mistake": "Changing three things at once and not knowing which one fixed the bug.",
            "bug": {
              "prompt": "What is bisecting a bug?",
              "buggyCode": "fn main() {\n    println!(\"narrow by halves\");\n}",
              "fixedCode": "fn main() {\n    println!(\"rewrite everything\");\n}",
              "explanation": "Bisecting narrows the faulty code by testing half at a time."
            },
            "exercise": {
              "title": "Bisect program",
              "type": "write-code",
              "instructions": "Write a program that computes a = 2 + 2 and b = a * 3 and prints `a 4 b 12`.",
              "starterCode": "fn main() {\n    // TODO: compute a and b\n}",
              "solution": "fn main() {\n    let a = 2 + 2;\n    let b = a * 3;\n    println!(\"a {} b {}\", a, b);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "a 4 b 12",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "a 4 b 12",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-debugging-m2-l2",
            "slug": "rust-debugging-m2-l2",
            "title": "Reproducing a Bug",
            "concept": "A bug you cannot reproduce is a bug you cannot fix reliably, so the first step is a minimal program that shows the failure every time. A minimal reproduction also proves the fix works when the failure goes away.",
            "syntax": "fn main() { /* minimal failing case */ }",
            "exampleCode": "fn main() {\n    let values = [1, 2, 3];\n    println!(\"count {}\", values.len());\n    println!(\"reproduced: small case\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to fix a bug in the full program without a small case that shows it.",
            "bug": {
              "prompt": "What is the first step in fixing a bug?",
              "buggyCode": "fn main() {\n    println!(\"reproduce it\");\n}",
              "fixedCode": "fn main() {\n    println!(\"rewrite code\");\n}",
              "explanation": "Reproduce the bug with a minimal case before changing anything."
            },
            "exercise": {
              "title": "Reproduce program",
              "type": "write-code",
              "instructions": "Write a program that prints `count 3` for [1, 2, 3] and `reproduced: small case`.",
              "starterCode": "fn main() {\n    let values = [1, 2, 3];\n    // TODO: print the count\n}",
              "solution": "fn main() {\n    let values = [1, 2, 3];\n    println!(\"count {}\", values.len());\n    println!(\"reproduced: small case\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "count 3\nreproduced: small case",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "count 3",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-debugging-m2-l3",
            "slug": "rust-debugging-m2-l3",
            "title": "Fixing One Thing at a Time",
            "concept": "Change one thing, run the program, and check the result before changing anything else. If the bug moves or changes, the last change caused it, and if nothing changes, that change was not the cause.",
            "syntax": "fn main() { println!(\"one change\"); }",
            "exampleCode": "fn main() {\n    let mut n = 5;\n    n += 1;\n    println!(\"n {}\", n);\n    println!(\"one change at a time\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Changing the code, the input, and the environment at once, so the result is uninterpretable.",
            "bug": {
              "prompt": "Why change one thing at a time?",
              "buggyCode": "fn main() {\n    println!(\"know the cause\");\n}",
              "fixedCode": "fn main() {\n    println!(\"save time\");\n}",
              "explanation": "One change at a time means you know which change had which effect."
            },
            "exercise": {
              "title": "One change quiz",
              "type": "multiple-choice",
              "instructions": "Why change one thing at a time?",
              "starterCode": "",
              "solution": "So you know which change caused each effect",
              "solutionExplanation": "Isolating changes makes cause and effect clear.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "So you know which change caused each effect",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "So you know which change caused each effect",
                "To save time",
                "Because the compiler requires it",
                "To keep the diff small"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-debugging-m2-l4",
            "slug": "rust-debugging-m2-l4",
            "title": "Using the Debugger",
            "concept": "A debugger like rust-gdb lets you set breakpoints, step through code, and inspect variables at each step. It is slower to set up than prints, but it shows the program's state exactly as it is, without changing the code.",
            "syntax": "rust-gdb ./target/debug/my_app",
            "exampleCode": "fn main() {\n    let x = 10;\n    let y = x + 5;\n    println!(\"{} {}\", x, y);\n}",
            "exampleLanguage": "rust",
            "mistake": "Adding prints to code that a breakpoint would inspect without modifying it.",
            "bug": {
              "prompt": "What can a debugger do that println! cannot?",
              "buggyCode": "fn main() {\n    println!(\"pause and inspect\");\n}",
              "fixedCode": "fn main() {\n    println!(\"print faster\");\n}",
              "explanation": "A debugger pauses execution and inspects live state at a breakpoint."
            },
            "exercise": {
              "title": "Debugger program",
              "type": "write-code",
              "instructions": "Write a program that computes x = 10 and y = x + 5 and prints `10 15`.",
              "starterCode": "fn main() {\n    let x = 10;\n    // TODO: compute y\n}",
              "solution": "fn main() {\n    let x = 10;\n    let y = x + 5;\n    println!(\"{} {}\", x, y);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "10 15",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "10 15",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-debugging-m2-l5",
            "slug": "rust-debugging-m2-l5",
            "title": "Preventing Regressions",
            "concept": "A regression is a bug that comes back, and the way to prevent it is a test that fails when the bug is present. Every bug fix should come with a test, so the suite catches the bug if it ever returns.",
            "syntax": "#[test]\nfn bug_stays_fixed() { assert_eq!(f(2), 4); }",
            "exampleCode": "fn f(x: i32) -> i32 {\n    x * 2\n}\nfn main() {\n    println!(\"f(2) = {}\", f(2));\n    println!(\"regression test added\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Fixing a bug without a test, so the same bug can return silently later.",
            "bug": {
              "prompt": "How do you prevent a fixed bug from coming back?",
              "buggyCode": "fn main() {\n    println!(\"add a test\");\n}",
              "fixedCode": "fn main() {\n    println!(\"add a comment\");\n}",
              "explanation": "A test that fails when the bug is present catches it if it returns."
            },
            "exercise": {
              "title": "Regression program",
              "type": "write-code",
              "instructions": "Write a program with f(x) = x * 2 that prints `f(2) = 4` and `regression test added`.",
              "starterCode": "fn f(x: i32) -> i32 {\n    // TODO\n    0\n}\nfn main() {\n    println!(\"f(2) = {}\", f(2));\n    println!(\"regression test added\");\n}",
              "solution": "fn f(x: i32) -> i32 {\n    x * 2\n}\nfn main() {\n    println!(\"f(2) = {}\", f(2));\n    println!(\"regression test added\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "f(2) = 4\nregression test added",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "f(2) = 4",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Bug hunt",
      "type": "write-code",
      "instructions": "Write a program that sums 1..=5 with a loop, uses dbg! on the total, and prints `total 15`.",
      "starterCode": "fn main() {\n    let mut total = 0;\n    // TODO: sum 1 to 5 with dbg!\n}",
      "solution": "fn main() {\n    let mut total = 0;\n    for i in 1..=5 {\n        total += i;\n    }\n    let total = dbg!(total);\n    println!(\"total {}\", total);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "total 15",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "total 15",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Bug Hunt",
      "description": "Build a program that demonstrates debugging: trace values, find a wrong calculation, and fix it.",
      "requirements": [
        "Program traces a running total with prints",
        "Program uses dbg! on a computed value",
        "Program fixes a wrong total",
        "Program prints the correct final total"
      ],
      "rubric": [
        "Tracing is present",
        "dbg! is used",
        "Fix is correct",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-rustfmt-clippy",
    "slug": "rust-rustfmt-clippy",
    "language": "rust",
    "category": "languages",
    "title": "Rustfmt & Clippy",
    "description": "Keep Rust code clean with rustfmt formatting and Clippy linting.",
    "difficulty": "Beginner",
    "estimatedHours": 8,
    "skills": [
      "Formatting with cargo fmt",
      "Checking formatting in CI",
      "Linting with cargo clippy",
      "Reading lint suggestions",
      "Allowing lints deliberately",
      "Running fmt, clippy, and test together"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to tidy a desk every day: small habits keep the workspace usable.",
    "modules": [
      {
        "id": "rust-rustfmt-clippy-m1",
        "title": "Fundamentals of Rustfmt & Clippy",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-rustfmt-clippy-m1-l1",
            "slug": "rust-rustfmt-clippy-m1-l1",
            "title": "What Is rustfmt",
            "concept": "rustfmt is Rust's official code formatter: it rewrites your code to the standard style, with consistent indentation and line breaks. Running cargo fmt keeps every file in a project looking the same, so style arguments disappear.",
            "syntax": "cargo fmt  # format code",
            "exampleCode": "fn main() {\n    let x = 5;\n    println!(\"formatted {}\", x);\n}",
            "exampleLanguage": "rust",
            "mistake": "Hand-formatting code to match the style guide, when cargo fmt does it in one command.",
            "bug": {
              "prompt": "What does cargo fmt do?",
              "buggyCode": "fn main() {\n    println!(\"formats code\");\n}",
              "fixedCode": "fn main() {\n    println!(\"compiles code\");\n}",
              "explanation": "cargo fmt runs rustfmt, formatting the code to the standard style."
            },
            "exercise": {
              "title": "Format program",
              "type": "write-code",
              "instructions": "Write a program that declares x = 5 and prints `formatted 5`.",
              "starterCode": "fn main() {\n    // TODO: declare and print\n}",
              "solution": "fn main() {\n    let x = 5;\n    println!(\"formatted {}\", x);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "formatted 5",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "formatted 5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-rustfmt-clippy-m1-l2",
            "slug": "rust-rustfmt-clippy-m1-l2",
            "title": "Checking Formatting",
            "concept": "The command cargo fmt --check reports files that are not formatted, without changing them, and exits with an error if any differ. Continuous integration uses --check to make sure every merged change is formatted.",
            "syntax": "cargo fmt --check",
            "exampleCode": "fn main() {\n    println!(\"check: cargo fmt --check\");\n    println!(\"no changes made\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Running cargo fmt in CI instead of --check, which would rewrite files during the check.",
            "bug": {
              "prompt": "What does cargo fmt --check do?",
              "buggyCode": "fn main() {\n    println!(\"reports unformatted\");\n}",
              "fixedCode": "fn main() {\n    println!(\"formats files\");\n}",
              "explanation": "--check reports unformatted files without changing them."
            },
            "exercise": {
              "title": "Check program",
              "type": "write-code",
              "instructions": "Write a program that prints `check: cargo fmt --check` and `no changes made`.",
              "starterCode": "fn main() {\n    // TODO: print the check facts\n}",
              "solution": "fn main() {\n    println!(\"check: cargo fmt --check\");\n    println!(\"no changes made\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "check: cargo fmt --check\nno changes made",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "check: cargo fmt --check",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-rustfmt-clippy-m1-l3",
            "slug": "rust-rustfmt-clippy-m1-l3",
            "title": "rustfmt Style Rules",
            "concept": "rustfmt enforces four-space indentation, a maximum line width, and consistent spacing around operators and braces. You do not need to memorise the rules, because the tool applies them, but knowing them helps you read formatted code.",
            "syntax": "fn main() {\n    let x = 1;\n}",
            "exampleCode": "fn main() {\n    let values = [1, 2, 3];\n    println!(\"count {}\", values.len());\n}",
            "exampleLanguage": "rust",
            "mistake": "Fighting rustfmt by reformatting its output by hand, instead of accepting the standard style.",
            "bug": {
              "prompt": "How many spaces does rustfmt use for indentation?",
              "buggyCode": "fn main() {\n    println!(\"four\");\n}",
              "fixedCode": "fn main() {\n    println!(\"two\");\n}",
              "explanation": "rustfmt uses four spaces per indentation level."
            },
            "exercise": {
              "title": "Style program",
              "type": "write-code",
              "instructions": "Write a program that prints `count 3` for an array of three values.",
              "starterCode": "fn main() {\n    let values = [1, 2, 3];\n    // TODO: print the count\n}",
              "solution": "fn main() {\n    let values = [1, 2, 3];\n    println!(\"count {}\", values.len());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "count 3",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "count 3",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-rustfmt-clippy-m1-l4",
            "slug": "rust-rustfmt-clippy-m1-l4",
            "title": "What Is Clippy",
            "concept": "Clippy is Rust's linter: it analyses your code for common mistakes, inefficient patterns, and style problems, and suggests better code. Running cargo clippy catches bugs that compile cleanly but are probably wrong.",
            "syntax": "cargo clippy",
            "exampleCode": "fn main() {\n    let x = 5;\n    println!(\"clippy checks {}\", x);\n}",
            "exampleLanguage": "rust",
            "mistake": "Ignoring Clippy warnings because the code compiles, when a warning often marks a real bug.",
            "bug": {
              "prompt": "What does Clippy do?",
              "buggyCode": "fn main() {\n    println!(\"lints code\");\n}",
              "fixedCode": "fn main() {\n    println!(\"formats code\");\n}",
              "explanation": "Clippy lints for common mistakes and style problems."
            },
            "exercise": {
              "title": "Clippy quiz",
              "type": "multiple-choice",
              "instructions": "What does Clippy do?",
              "starterCode": "",
              "solution": "It lints code for common mistakes and style problems",
              "solutionExplanation": "Clippy is the Rust linter; rustfmt is the formatter.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It lints code for common mistakes and style problems",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "It lints code for common mistakes and style problems",
                "It formats code",
                "It compiles code",
                "It runs tests"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-rustfmt-clippy-m1-l5",
            "slug": "rust-rustfmt-clippy-m1-l5",
            "title": "Clippy Lints",
            "concept": "Clippy has hundreds of lints, from needless borrows to comparing a float with ==, and each warning explains the problem and suggests a fix. Reading the suggestion, rather than silencing the lint, is how you learn the idiomatic pattern.",
            "syntax": "cargo clippy -- -D warnings",
            "exampleCode": "fn main() {\n    let v = vec![1, 2, 3];\n    println!(\"len {}\", v.len());\n    println!(\"lint: use len\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Silencing a Clippy lint with allow when the suggested fix was the right code.",
            "bug": {
              "prompt": "What should you do with a Clippy warning?",
              "buggyCode": "fn main() {\n    println!(\"read and fix\");\n}",
              "fixedCode": "fn main() {\n    println!(\"silence it\");\n}",
              "explanation": "Read the warning and its suggestion; it usually marks a real improvement."
            },
            "exercise": {
              "title": "Lint program",
              "type": "write-code",
              "instructions": "Write a program that prints `len 3` for vec![1, 2, 3] and `lint: use len`.",
              "starterCode": "fn main() {\n    let v = vec![1, 2, 3];\n    // TODO: print len\n}",
              "solution": "fn main() {\n    let v = vec![1, 2, 3];\n    println!(\"len {}\", v.len());\n    println!(\"lint: use len\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "len 3\nlint: use len",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "len 3",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-rustfmt-clippy-m2",
        "title": "Applying Rustfmt & Clippy",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-rustfmt-clippy-m2-l1",
            "slug": "rust-rustfmt-clippy-m2-l1",
            "title": "Clippy in CI",
            "concept": "Running cargo clippy with -D warnings in continuous integration turns every warning into a build failure, so new lints cannot slip in unnoticed. A clean Clippy run becomes part of the definition of done for a change.",
            "syntax": "cargo clippy --all-targets -- -D warnings",
            "exampleCode": "fn main() {\n    println!(\"ci: clippy -D warnings\");\n    println!(\"warnings fail the build\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Adding -D warnings before the code is clean, and blocking every build on old warnings.",
            "bug": {
              "prompt": "What does -D warnings do for Clippy?",
              "buggyCode": "fn main() {\n    println!(\"warnings fail build\");\n}",
              "fixedCode": "fn main() {\n    println!(\"hides warnings\");\n}",
              "explanation": "-D warnings turns warnings into errors, so they fail the build."
            },
            "exercise": {
              "title": "CI program",
              "type": "write-code",
              "instructions": "Write a program that prints `ci: clippy -D warnings` and `warnings fail the build`.",
              "starterCode": "fn main() {\n    // TODO: print the CI facts\n}",
              "solution": "fn main() {\n    println!(\"ci: clippy -D warnings\");\n    println!(\"warnings fail the build\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "ci: clippy -D warnings\nwarnings fail the build",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "ci: clippy -D warnings",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-rustfmt-clippy-m2-l2",
            "slug": "rust-rustfmt-clippy-m2-l2",
            "title": "Allowing a Lint",
            "concept": "When a lint is genuinely wrong for a piece of code, you can silence it with #[allow(clippy::lint_name)] on the item, with a comment explaining why. Allowing is a deliberate, documented exception, not a way to hide problems.",
            "syntax": "#[allow(clippy::too_many_arguments)]",
            "exampleCode": "fn main() {\n    println!(\"allow: documented exception\");\n    println!(\"explain why in a comment\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Sprinkling allow across the crate to make Clippy quiet, instead of fixing the code.",
            "bug": {
              "prompt": "When should you allow a Clippy lint?",
              "buggyCode": "fn main() {\n    println!(\"genuinely wrong lint\");\n}",
              "fixedCode": "fn main() {\n    println!(\"always\");\n}",
              "explanation": "Allow a lint only when it is wrong for that code, with a comment saying why."
            },
            "exercise": {
              "title": "Allow quiz",
              "type": "multiple-choice",
              "instructions": "When should you allow a Clippy lint?",
              "starterCode": "",
              "solution": "When the lint is genuinely wrong for that code, with a comment explaining why",
              "solutionExplanation": "allow is a documented exception for a lint that does not apply.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "When the lint is genuinely wrong for that code, with a comment explaining why",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "When the lint is genuinely wrong for that code, with a comment explaining why",
                "Always, to keep output clean",
                "Never, lints cannot be allowed",
                "Only in tests"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-rustfmt-clippy-m2-l3",
            "slug": "rust-rustfmt-clippy-m2-l3",
            "title": "Formatting and Linting Together",
            "concept": "A good workflow is cargo fmt, then cargo clippy, then cargo test, in that order, so style, lints, and behaviour are each checked. Running all three before committing keeps the main branch clean.",
            "syntax": "cargo fmt && cargo clippy && cargo test",
            "exampleCode": "fn main() {\n    println!(\"fmt, clippy, test\");\n    println!(\"all clean\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Running the checks only before a release, when small problems have become large ones.",
            "bug": {
              "prompt": "In what order should you run fmt, clippy, and test?",
              "buggyCode": "fn main() {\n    println!(\"fmt clippy test\");\n}",
              "fixedCode": "fn main() {\n    println!(\"test clippy fmt\");\n}",
              "explanation": "Format first, then lint, then test."
            },
            "exercise": {
              "title": "Workflow program",
              "type": "write-code",
              "instructions": "Write a program that prints `fmt, clippy, test` and `all clean`.",
              "starterCode": "fn main() {\n    // TODO: print the workflow\n}",
              "solution": "fn main() {\n    println!(\"fmt, clippy, test\");\n    println!(\"all clean\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "fmt, clippy, test\nall clean",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "fmt, clippy, test",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-rustfmt-clippy-m2-l4",
            "slug": "rust-rustfmt-clippy-m2-l4",
            "title": "Common Clippy Suggestions",
            "concept": "Common Clippy suggestions include using iter().sum() instead of a manual loop, using if let instead of a match with one arm, and removing needless clones. Each suggestion makes the code shorter and usually faster.",
            "syntax": "let total: i32 = v.iter().sum();",
            "exampleCode": "fn main() {\n    let v = vec![1, 2, 3];\n    let total: i32 = v.iter().sum();\n    println!(\"total {}\", total);\n}",
            "exampleLanguage": "rust",
            "mistake": "Rejecting a Clippy suggestion without understanding it, and keeping the longer, slower code.",
            "bug": {
              "prompt": "What does Clippy suggest instead of a manual sum loop?",
              "buggyCode": "fn main() {\n    println!(\"iter().sum()\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a while loop\");\n}",
              "explanation": "iter().sum() replaces a manual accumulation loop."
            },
            "exercise": {
              "title": "Suggestion quiz",
              "type": "multiple-choice",
              "instructions": "What does Clippy suggest instead of a manual sum loop?",
              "starterCode": "",
              "solution": "iter().sum()",
              "solutionExplanation": "Clippy suggests iterator methods like iter().sum().",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "iter().sum()",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "iter().sum()",
                "A while loop",
                "Recursion",
                "A match"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-rustfmt-clippy-m2-l5",
            "slug": "rust-rustfmt-clippy-m2-l5",
            "title": "Clean Code Habits",
            "concept": "Clean Rust code is formatted, lint-free, and tested, and the three checks together take seconds to run. Making them a habit, ideally automatic on save or commit, means you never have to think about style again.",
            "syntax": "cargo fmt --check && cargo clippy -- -D warnings",
            "exampleCode": "fn main() {\n    let total: i32 = [1, 2, 3].iter().sum();\n    println!(\"clean total {}\", total);\n}",
            "exampleLanguage": "rust",
            "mistake": "Treating formatting and linting as optional polish, instead of part of writing the code.",
            "bug": {
              "prompt": "What makes a Rust change clean?",
              "buggyCode": "fn main() {\n    println!(\"fmt clippy test pass\");\n}",
              "fixedCode": "fn main() {\n    println!(\"it compiles\");\n}",
              "explanation": "A clean change is formatted, lint-free, and tested."
            },
            "exercise": {
              "title": "Clean program",
              "type": "write-code",
              "instructions": "Write a program that sums [1, 2, 3] with iter().sum() and prints `clean total 6`.",
              "starterCode": "fn main() {\n    // TODO: sum with iter\n}",
              "solution": "fn main() {\n    let total: i32 = [1, 2, 3].iter().sum();\n    println!(\"clean total {}\", total);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "clean total 6",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "clean total 6",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Clean code check",
      "type": "write-code",
      "instructions": "Write a program with a sum_vec function using iter().sum() and a #[cfg(test)] module, printing `total 15` for [1, 2, 3, 4, 5] and `checks: fmt clippy test`.",
      "starterCode": "fn sum_vec(v: &[i32]) -> i32 {\n    // TODO: sum with iter\n    0\n}\nfn main() {\n    // TODO\n}",
      "solution": "fn sum_vec(v: &[i32]) -> i32 {\n    v.iter().sum()\n}\n#[cfg(test)]\nmod tests {\n    use super::*;\n    #[test]\n    fn sums() {\n        assert_eq!(sum_vec(&[1, 2, 3]), 6);\n    }\n}\nfn main() {\n    println!(\"total {}\", sum_vec(&[1, 2, 3, 4, 5]));\n    println!(\"checks: fmt clippy test\");\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "total 15\nchecks: fmt clippy test",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "total 15",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Clean Code Check",
      "description": "Build a program that is formatted, lint-free, and tested, and reports the checks it passes.",
      "requirements": [
        "Program uses iterator methods instead of manual loops",
        "Program has a test module",
        "Program prints the checks it passes",
        "Program output is exact"
      ],
      "rubric": [
        "Iterator methods are used",
        "Test module is present",
        "Checks are listed",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-string-formatting",
    "slug": "rust-string-formatting",
    "language": "rust",
    "category": "languages",
    "title": "String Formatting in Rust",
    "description": "Format text in Rust: placeholders, named arguments, Debug, padding, precision, and tables.",
    "difficulty": "Beginner",
    "estimatedHours": 8,
    "skills": [
      "Using {} placeholders",
      "Using named arguments",
      "Printing Debug with {:?}",
      "Padding and aligning",
      "Rounding floats",
      "Building tables"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to set type in a printing press: the same words, arranged neatly, are far easier to read.",
    "modules": [
      {
        "id": "rust-string-formatting-m1",
        "title": "Fundamentals of String Formatting in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-string-formatting-m1-l1",
            "slug": "rust-string-formatting-m1-l1",
            "title": "Format Placeholders",
            "concept": "A {} placeholder in a format string is filled by the next argument, in order, and {:?} shows the Debug representation instead. Placeholders are how Rust builds text from values without string concatenation.",
            "syntax": "println!(\"{} is {}\", name, age);",
            "exampleCode": "fn main() {\n    println!(\"{} is {}\", \"Ada\", 36);\n}",
            "exampleLanguage": "rust",
            "mistake": "Passing fewer arguments than placeholders, which the compiler rejects.",
            "bug": {
              "prompt": "What fills a {} placeholder?",
              "buggyCode": "fn main() {\n    println!(\"next argument\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a variable name\");\n}",
              "explanation": "Each {} takes the next argument after the format string."
            },
            "exercise": {
              "title": "Placeholder program",
              "type": "write-code",
              "instructions": "Write a program that prints `Ada is 36` using {} placeholders.",
              "starterCode": "fn main() {\n    // TODO: print with placeholders\n}",
              "solution": "fn main() {\n    println!(\"{} is {}\", \"Ada\", 36);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Ada is 36",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Ada is 36",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-string-formatting-m1-l2",
            "slug": "rust-string-formatting-m1-l2",
            "title": "Named Arguments",
            "concept": "Format strings accept named arguments, as in println!(\"{name} is {age}\", name = \"Ada\", age = 36), and since Rust 2021 you can capture variables directly with {name}. Named arguments make long format strings readable.",
            "syntax": "println!(\"{name} is {age}\", name = \"Ada\", age = 36);",
            "exampleCode": "fn main() {\n    let name = \"Ada\";\n    let age = 36;\n    println!(\"{name} is {age}\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Mixing captured names with positional arguments in a confusing order.",
            "bug": {
              "prompt": "How do you use a variable directly in a format string?",
              "buggyCode": "fn main() {\n    println!(\"$name\");\n}",
              "fixedCode": "fn main() {\n    let name = \"Ada\";\n    println!(\"{name}\");\n}",
              "explanation": "Since Rust 2021, {name} captures the variable name in scope."
            },
            "exercise": {
              "title": "Named program",
              "type": "write-code",
              "instructions": "Write a program that uses captured identifiers to print `Ada is 36`.",
              "starterCode": "fn main() {\n    let name = \"Ada\";\n    let age = 36;\n    // TODO: print with captured names\n}",
              "solution": "fn main() {\n    let name = \"Ada\";\n    let age = 36;\n    println!(\"{name} is {age}\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Ada is 36",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Ada is 36",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-string-formatting-m1-l3",
            "slug": "rust-string-formatting-m1-l3",
            "title": "Debug Formatting",
            "concept": "The {:?} placeholder prints the Debug representation of a value, which shows structs, Vecs, and Options in a readable form. The pretty form {:#?} spreads the output over several lines, which is useful for large values.",
            "syntax": "println!(\"{:?}\", vec![1, 2, 3]);",
            "exampleCode": "fn main() {\n    println!(\"{:?}\", vec![1, 2, 3]);\n    println!(\"{:?}\", Some(5));\n}",
            "exampleLanguage": "rust",
            "mistake": "Using {} on a Vec, which does not implement Display, instead of {:?}.",
            "bug": {
              "prompt": "What does {:?} print?",
              "buggyCode": "fn main() {\n    println!(\"Debug form\");\n}",
              "fixedCode": "fn main() {\n    println!(\"user form\");\n}",
              "explanation": "{:?} prints the Debug representation of a value."
            },
            "exercise": {
              "title": "Debug format quiz",
              "type": "multiple-choice",
              "instructions": "What does {:?} print?",
              "starterCode": "",
              "solution": "The Debug representation of a value",
              "solutionExplanation": "{:?} is Debug formatting; {} is Display.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The Debug representation of a value",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "The Debug representation of a value",
                "The user-facing Display form",
                "The memory address",
                "The type name only"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-string-formatting-m1-l4",
            "slug": "rust-string-formatting-m1-l4",
            "title": "Number Formatting",
            "concept": "Numbers can be formatted in binary with {:b}, octal with {:o}, hexadecimal with {:x}, and with a width like {:5} for padding. Formatting changes only how the number looks, never its value.",
            "syntax": "println!(\"{:x}\", 255); // ff",
            "exampleCode": "fn main() {\n    println!(\"{:b} {:o} {:x}\", 10, 10, 255);\n}",
            "exampleLanguage": "rust",
            "mistake": "Expecting {:x} to change the number's value, when it only changes its display.",
            "bug": {
              "prompt": "What does {:x} do to 255?",
              "buggyCode": "fn main() {\n    println!(\"prints ff\");\n}",
              "fixedCode": "fn main() {\n    println!(\"changes to 255\");\n}",
              "explanation": "{:x} prints the number in lowercase hexadecimal."
            },
            "exercise": {
              "title": "Number format program",
              "type": "write-code",
              "instructions": "Write a program that prints `1010 12 ff` for 10 in binary, 10 in octal, and 255 in hex.",
              "starterCode": "fn main() {\n    // TODO: print in three bases\n}",
              "solution": "fn main() {\n    println!(\"{:b} {:o} {:x}\", 10, 10, 255);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "1010 12 ff",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "1010 12 ff",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-string-formatting-m1-l5",
            "slug": "rust-string-formatting-m1-l5",
            "title": "Padding and Alignment",
            "concept": "A width in a placeholder pads the value to that many characters, and <, >, and ^ align it left, right, or centred. Padding with zeros uses {:05}, which is common for codes and timestamps.",
            "syntax": "println!(\"{:>5}\", 42); // \"   42\"",
            "exampleCode": "fn main() {\n    println!(\"[{:>5}]\", 42);\n    println!(\"[{:<5}]\", 42);\n    println!(\"[{:^5}]\", 42);\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming padding changes the value, when it only adds spaces around it.",
            "bug": {
              "prompt": "What does {:>5} do to 42?",
              "buggyCode": "fn main() {\n    println!(\"right-align in 5\");\n}",
              "fixedCode": "fn main() {\n    println!(\"adds 5\");\n}",
              "explanation": "{:>5} right-aligns the value in a field five characters wide."
            },
            "exercise": {
              "title": "Padding quiz",
              "type": "multiple-choice",
              "instructions": "What does {:>5} do to 42?",
              "starterCode": "",
              "solution": "Right-aligns it in a field 5 characters wide",
              "solutionExplanation": "The width pads the value; > aligns it right.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Right-aligns it in a field 5 characters wide",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Right-aligns it in a field 5 characters wide",
                "Adds 5 to it",
                "Prints it 5 times",
                "Truncates it to 5 digits"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-string-formatting-m2",
        "title": "Applying String Formatting in Rust",
        "level": "beginner",
        "lessons": [
          {
            "id": "rust-string-formatting-m2-l1",
            "slug": "rust-string-formatting-m2-l1",
            "title": "Float Precision",
            "concept": "A float format like {:.2} rounds to two decimal places, and {:8.2} combines a width of eight with two decimals. Precision is essential for money and measurements, where the raw float has far more digits than anyone wants to see.",
            "syntax": "println!(\"{:.2}\", 3.14159); // 3.14",
            "exampleCode": "fn main() {\n    println!(\"{:.2}\", 3.14159);\n    println!(\"{:.0}\", 3.7);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using {:.2} on an integer, which has no decimal places to round.",
            "bug": {
              "prompt": "What does {:.2} do to 3.14159?",
              "buggyCode": "fn main() {\n    println!(\"prints 3.14\");\n}",
              "fixedCode": "fn main() {\n    println!(\"rounds to 3\");\n}",
              "explanation": "{:.2} rounds the float to two decimal places."
            },
            "exercise": {
              "title": "Precision program",
              "type": "write-code",
              "instructions": "Write a program that prints `3.14` for 3.14159 with {:.2} and `4` for 3.7 with {:.0}.",
              "starterCode": "fn main() {\n    // TODO: print with precision\n}",
              "solution": "fn main() {\n    println!(\"{:.2}\", 3.14159);\n    println!(\"{:.0}\", 3.7);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "3.14\n4",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "3.14",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-string-formatting-m2-l2",
            "slug": "rust-string-formatting-m2-l2",
            "title": "Escaping Braces",
            "concept": "To print a literal brace in a format string, double it: {{ prints { and }} prints }. This is necessary because a single { starts a placeholder, so the formatter needs a way to tell the two apart.",
            "syntax": "println!(\"{{hello}}\"); // prints {hello}",
            "exampleCode": "fn main() {\n    println!(\"{{hello}}\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing a single { in a format string and getting a compiler error about an invalid placeholder.",
            "bug": {
              "prompt": "How do you print a literal { in a format string?",
              "buggyCode": "fn main() {\n    println!(\"double it\");\n}",
              "fixedCode": "fn main() {\n    println!(\"backslash it\");\n}",
              "explanation": "{{ in a format string prints a literal {."
            },
            "exercise": {
              "title": "Braces program",
              "type": "write-code",
              "instructions": "Write a program that prints `{hello}` using doubled braces.",
              "starterCode": "fn main() {\n    // TODO: print literal braces\n}",
              "solution": "fn main() {\n    println!(\"{{hello}}\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "{hello}",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "{hello}",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-string-formatting-m2-l3",
            "slug": "rust-string-formatting-m2-l3",
            "title": "format! and write!",
            "concept": "The format! macro returns a String, while write! writes formatted text into any writer, such as a file or a buffer. Both use the same placeholder syntax as println!, so learning one teaches you all three.",
            "syntax": "let s = format!(\"{}!\", \"hi\");",
            "exampleCode": "fn main() {\n    let s = format!(\"{}!\", \"hi\");\n    println!(\"{}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using println! when you need the text as a String value, instead of format!.",
            "bug": {
              "prompt": "What does format! return?",
              "buggyCode": "fn main() {\n    println!(\"a String\");\n}",
              "fixedCode": "fn main() {\n    println!(\"nothing\");\n}",
              "explanation": "format! builds and returns a String."
            },
            "exercise": {
              "title": "format! quiz",
              "type": "multiple-choice",
              "instructions": "What does format! return?",
              "starterCode": "",
              "solution": "A String",
              "solutionExplanation": "format! returns the formatted text as a String.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A String",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "A String",
                "Nothing, it prints",
                "An integer",
                "A Vec"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-string-formatting-m2-l4",
            "slug": "rust-string-formatting-m2-l4",
            "title": "Formatting Tables",
            "concept": "Combining widths and alignment builds neat tables of text, with each column a fixed width. A table of names and scores, for example, uses {:<10} for the name and {:>5} for the score.",
            "syntax": "println!(\"{:<10} {:>5}\", name, score);",
            "exampleCode": "fn main() {\n    println!(\"{:<10} {:>5}\", \"Ada\", 95);\n    println!(\"{:<10} {:>5}\", \"Bo\", 80);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using different widths for the same column in different rows, so the table does not line up.",
            "bug": {
              "prompt": "How do you left-align a name in a 10-wide column?",
              "buggyCode": "fn main() {\n    println!(\"{:>10}\", \"Ada\");\n}",
              "fixedCode": "fn main() {\n    println!(\"{:<10}\", \"Ada\");\n}",
              "explanation": "{:<10} left-aligns in a field ten characters wide."
            },
            "exercise": {
              "title": "Table program",
              "type": "write-code",
              "instructions": "Write a program that prints `Ada           95` and `Bo            80` with {:<10} and {:>5}.",
              "starterCode": "fn main() {\n    // TODO: print the table rows\n}",
              "solution": "fn main() {\n    println!(\"{:<10} {:>5}\", \"Ada\", 95);\n    println!(\"{:<10} {:>5}\", \"Bo\", 80);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Ada           95\nBo            80",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Ada           95",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-string-formatting-m2-l5",
            "slug": "rust-string-formatting-m2-l5",
            "title": "Formatting in Practice",
            "concept": "In practice, format strings do most of Rust's text work: log lines, user messages, file paths, and error messages are all built with println! and format!. Keeping format strings simple and using named arguments makes them easy to read and to translate.",
            "syntax": "let msg = format!(\"user {} logged in\", name);",
            "exampleCode": "fn main() {\n    let name = \"Ada\";\n    let msg = format!(\"user {name} logged in\");\n    println!(\"{}\", msg);\n}",
            "exampleLanguage": "rust",
            "mistake": "Building a message with + and many to_string calls, when one format! would do it.",
            "bug": {
              "prompt": "What is the idiomatic way to build a message from values?",
              "buggyCode": "fn main() {\n    println!(\"format!\");\n}",
              "fixedCode": "fn main() {\n    println!(\"+ and to_string\");\n}",
              "explanation": "format! builds the message in one readable expression."
            },
            "exercise": {
              "title": "Message program",
              "type": "write-code",
              "instructions": "Write a program that builds \"user Ada logged in\" with format! and prints it.",
              "starterCode": "fn main() {\n    let name = \"Ada\";\n    // TODO: build and print the message\n}",
              "solution": "fn main() {\n    let name = \"Ada\";\n    let msg = format!(\"user {name} logged in\");\n    println!(\"{}\", msg);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "user Ada logged in",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "user Ada logged in",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Report formatter",
      "type": "write-code",
      "instructions": "Write a program that prints `Report`, `Ada           95`, `Bo            80`, and `average 87.50` using aligned columns and {:.2}.",
      "starterCode": "fn main() {\n    // TODO: print the report\n}",
      "solution": "fn main() {\n    println!(\"Report\");\n    println!(\"{:<10} {:>5}\", \"Ada\", 95);\n    println!(\"{:<10} {:>5}\", \"Bo\", 80);\n    let avg = (95.0 + 80.0) / 2.0;\n    println!(\"average {:.2}\", avg);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "Report\nAda           95\nBo            80\naverage 87.50",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "Report",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Report Formatter",
      "description": "Build a program that prints a formatted report: a title, a table of scores, and a summary line.",
      "requirements": [
        "Program prints a title line",
        "Program prints a table with aligned columns",
        "Program prints a float with two decimals",
        "Program uses format! for at least one line"
      ],
      "rubric": [
        "Title is printed",
        "Table columns align",
        "Float has two decimals",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-ownership-deep-dive",
    "slug": "rust-ownership-deep-dive",
    "language": "rust",
    "category": "languages",
    "title": "Ownership Deep Dive",
    "description": "Go deeper into ownership: moves, partial moves, Drop, threads, interior mutability, and reborrowing.",
    "difficulty": "Intermediate",
    "estimatedHours": 14,
    "skills": [
      "Explaining move semantics",
      "Using partial moves",
      "Implementing Drop",
      "Moving values into threads",
      "Using RefCell",
      "Splitting borrows"
    ],
    "prerequisites": [
      "Rust"
    ],
    "analogy": "Learning {topic} is like learning the rules of a lending library in detail: who holds each book, when it comes back, and what happens if it is lost.",
    "modules": [
      {
        "id": "rust-ownership-deep-dive-m1",
        "title": "Fundamentals of Ownership Deep Dive",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-ownership-deep-dive-m1-l1",
            "slug": "rust-ownership-deep-dive-m1-l1",
            "title": "Move Semantics in Depth",
            "concept": "A move transfers ownership by copying the stack data, pointer, length, and capacity, and invalidating the source, while the heap data stays put. Moves are cheap because the heap buffer is never copied, which is why Rust can be fast without a garbage collector.",
            "syntax": "let s2 = s1; // s1 invalid",
            "exampleCode": "fn main() {\n    let s1 = String::from(\"move\");\n    let s2 = s1;\n    println!(\"moved {}\", s2);\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming a move copies the heap data, and worrying that moving a large String is slow.",
            "bug": {
              "prompt": "What is copied when a String is moved?",
              "buggyCode": "fn main() {\n    println!(\"stack data only\");\n}",
              "fixedCode": "fn main() {\n    println!(\"heap data\");\n}",
              "explanation": "Only the stack triple (pointer, length, capacity) is copied; the heap buffer stays in place."
            },
            "exercise": {
              "title": "Move depth quiz",
              "type": "multiple-choice",
              "instructions": "What is copied when a String is moved?",
              "starterCode": "",
              "solution": "Only the stack data: pointer, length, and capacity",
              "solutionExplanation": "A move copies the stack part and invalidates the source; heap data does not move.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Only the stack data: pointer, length, and capacity",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Only the stack data: pointer, length, and capacity",
                "The whole heap buffer",
                "Nothing, it is a reference",
                "The String's characters one by one"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-ownership-deep-dive-m1-l2",
            "slug": "rust-ownership-deep-dive-m1-l2",
            "title": "Partial Moves",
            "concept": "You can move one field out of a struct while keeping the rest, which is called a partial move, but the struct as a whole can no longer be used afterwards. Partial moves are common when destructuring a struct to take ownership of one field.",
            "syntax": "let Point { x, .. } = p;",
            "exampleCode": "struct Pair {\n    first: String,\n    second: i32,\n}\nfn main() {\n    let p = Pair { first: String::from(\"a\"), second: 2 };\n    let first = p.first;\n    println!(\"{} {}\", first, p.second);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using the whole struct after a partial move, when only the unmoved fields remain usable.",
            "bug": {
              "prompt": "After moving one String field out of a struct, what can you still use?",
              "buggyCode": "fn main() {\n    println!(\"other fields\");\n}",
              "fixedCode": "fn main() {\n    println!(\"the whole struct\");\n}",
              "explanation": "Only the fields that were not moved remain usable; the struct itself is partially moved."
            },
            "exercise": {
              "title": "Partial move program",
              "type": "write-code",
              "instructions": "Write a program that moves first out of a Pair struct and prints `a 2` using the remaining field.",
              "starterCode": "struct Pair {\n    first: String,\n    second: i32,\n}\nfn main() {\n    let p = Pair { first: String::from(\"a\"), second: 2 };\n    // TODO: move first, print both\n}",
              "solution": "struct Pair {\n    first: String,\n    second: i32,\n}\nfn main() {\n    let p = Pair { first: String::from(\"a\"), second: 2 };\n    let first = p.first;\n    println!(\"{} {}\", first, p.second);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "a 2",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "a 2",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-ownership-deep-dive-m1-l3",
            "slug": "rust-ownership-deep-dive-m1-l3",
            "title": "Copy vs Clone in Depth",
            "concept": "Copy is a marker trait for types that can be duplicated by copying bits, like integers and bool, while Clone is an explicit method that can do arbitrary work, like allocating a new buffer. A type can be Clone without being Copy, but every Copy type must also be Clone.",
            "syntax": "#[derive(Copy, Clone)]\nstruct Point { x: i32, y: i32 }",
            "exampleCode": "#[derive(Copy, Clone, Debug)]\nstruct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    let q = p;\n    println!(\"{:?} {:?}\", p, q);\n}",
            "exampleLanguage": "rust",
            "mistake": "Deriving Copy for a type that owns heap data, which the compiler rejects because Copy types cannot manage resources.",
            "bug": {
              "prompt": "Can a type that owns a String be Copy?",
              "buggyCode": "fn main() {\n    println!(\"no\");\n}",
              "fixedCode": "fn main() {\n    println!(\"yes\");\n}",
              "explanation": "Copy types are duplicated by bit-copying, so they cannot own heap data that needs freeing."
            },
            "exercise": {
              "title": "Copy struct program",
              "type": "write-code",
              "instructions": "Write a program with a Copy Point struct where p stays usable after let q = p, printing `Point { x: 3, y: 4 } Point { x: 3, y: 4 }`.",
              "starterCode": "#[derive(Copy, Clone, Debug)]\nstruct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    // TODO: copy p and print both\n}",
              "solution": "#[derive(Copy, Clone, Debug)]\nstruct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    let q = p;\n    println!(\"{:?} {:?}\", p, q);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Point { x: 3, y: 4 } Point { x: 3, y: 4 }",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Point { x: 3, y: 4 } Point { x: 3, y: 4 }",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-ownership-deep-dive-m1-l4",
            "slug": "rust-ownership-deep-dive-m1-l4",
            "title": "The Drop Trait",
            "concept": "A type can implement Drop to run code when its values are dropped, such as closing a file or releasing a lock. Drop runs automatically at the end of the owner's scope, in the reverse order the values were created.",
            "syntax": "impl Drop for File { fn drop(&mut self) { /* close */ } }",
            "exampleCode": "struct Guard;\nimpl Drop for Guard {\n    fn drop(&mut self) {\n        println!(\"dropped guard\");\n    }\n}\nfn main() {\n    let _g = Guard;\n    println!(\"inside scope\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Calling drop on a value and then using it, when drop consumes the value.",
            "bug": {
              "prompt": "When does a value's Drop code run?",
              "buggyCode": "fn main() {\n    println!(\"at scope end\");\n}",
              "fixedCode": "fn main() {\n    println!(\"at creation\");\n}",
              "explanation": "Drop runs automatically when the value goes out of scope."
            },
            "exercise": {
              "title": "Drop quiz",
              "type": "multiple-choice",
              "instructions": "When does a value's Drop code run?",
              "starterCode": "",
              "solution": "When the value goes out of scope",
              "solutionExplanation": "Drop runs automatically at the end of the owner's scope.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "When the value goes out of scope",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "When the value goes out of scope",
                "When the value is created",
                "When the program starts",
                "Never, Drop is manual"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-ownership-deep-dive-m1-l5",
            "slug": "rust-ownership-deep-dive-m1-l5",
            "title": "Ownership Across Threads",
            "concept": "Ownership makes threads safe: a value moved into a thread is owned by that thread, and the original thread can no longer touch it. The Send trait marks types that can be moved between threads, and Sync marks types that can be shared between them.",
            "syntax": "std::thread::spawn(move || { println!(\"{}\", s); });",
            "exampleCode": "fn main() {\n    let s = String::from(\"thread\");\n    let handle = std::thread::spawn(move || {\n        println!(\"in thread: {}\", s);\n    });\n    handle.join().unwrap();\n    println!(\"done\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Sharing a value between threads by reference without a scope that guarantees it lives long enough.",
            "bug": {
              "prompt": "What does move do in a thread spawn closure?",
              "buggyCode": "fn main() {\n    println!(\"moves ownership in\");\n}",
              "fixedCode": "fn main() {\n    println!(\"copies the value\");\n}",
              "explanation": "move transfers ownership of captured values into the new thread."
            },
            "exercise": {
              "title": "Thread move program",
              "type": "write-code",
              "instructions": "Write a program that moves s = \"thread\" into a spawned thread, prints `in thread: thread`, joins, and prints `done`.",
              "starterCode": "fn main() {\n    let s = String::from(\"thread\");\n    // TODO: spawn a thread with move\n}",
              "solution": "fn main() {\n    let s = String::from(\"thread\");\n    let handle = std::thread::spawn(move || {\n        println!(\"in thread: {}\", s);\n    });\n    handle.join().unwrap();\n    println!(\"done\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "in thread: thread\ndone",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "in thread: thread",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-ownership-deep-dive-m2",
        "title": "Applying Ownership Deep Dive",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-ownership-deep-dive-m2-l1",
            "slug": "rust-ownership-deep-dive-m2-l1",
            "title": "Interior Mutability",
            "concept": "Interior mutability lets you change data through a shared reference, using types like Cell, RefCell, and Mutex. It is the escape hatch for cases where the borrow rules are too strict at compile time, with the checks moved to runtime instead.",
            "syntax": "use std::cell::RefCell;\nlet c = RefCell::new(5);",
            "exampleCode": "use std::cell::RefCell;\nfn main() {\n    let c = RefCell::new(5);\n    *c.borrow_mut() = 6;\n    println!(\"{}\", c.borrow());\n}",
            "exampleLanguage": "rust",
            "mistake": "Borrowing a RefCell mutably twice at runtime, which panics instead of failing at compile time.",
            "bug": {
              "prompt": "What does RefCell check at runtime?",
              "buggyCode": "fn main() {\n    println!(\"borrow rules\");\n}",
              "fixedCode": "fn main() {\n    println!(\"nothing\");\n}",
              "explanation": "RefCell enforces the borrow rules at runtime, panicking on a violation."
            },
            "exercise": {
              "title": "RefCell program",
              "type": "write-code",
              "instructions": "Write a program that uses RefCell::new(5), sets it to 6 with borrow_mut, and prints `6`.",
              "starterCode": "use std::cell::RefCell;\nfn main() {\n    let c = RefCell::new(5);\n    // TODO: mutate through the RefCell\n}",
              "solution": "use std::cell::RefCell;\nfn main() {\n    let c = RefCell::new(5);\n    *c.borrow_mut() = 6;\n    println!(\"{}\", c.borrow());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "6",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "6",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-ownership-deep-dive-m2-l2",
            "slug": "rust-ownership-deep-dive-m2-l2",
            "title": "Reborrowing",
            "concept": "When you pass &mut *r to a function, you reborrow the mutable reference: the function borrows it for a while, then gives it back. Reborrowing is why you can call several methods that take &mut self on the same value in a row.",
            "syntax": "fn use_it(r: &mut i32) { *r += 1; }",
            "exampleCode": "fn add_one(r: &mut i32) {\n    *r += 1;\n}\nfn main() {\n    let mut x = 5;\n    let r = &mut x;\n    add_one(r);\n    println!(\"{}\", x);\n}",
            "exampleLanguage": "rust",
            "mistake": "Moving a mutable reference into a function and then trying to use it again, when reborrowing would have kept it.",
            "bug": {
              "prompt": "What is reborrowing?",
              "buggyCode": "fn main() {\n    println!(\"lend a &mut briefly\");\n}",
              "fixedCode": "fn main() {\n    println!(\"copy a reference\");\n}",
              "explanation": "Reborrowing lends a &mut for a call, then returns it to the caller."
            },
            "exercise": {
              "title": "Reborrow program",
              "type": "write-code",
              "instructions": "Write a program where add_one takes &mut i32, called with a reborrowed reference, printing `6`.",
              "starterCode": "fn add_one(r: &mut i32) {\n    *r += 1;\n}\nfn main() {\n    let mut x = 5;\n    let r = &mut x;\n    // TODO: call add_one\n    println!(\"{}\", x);\n}",
              "solution": "fn add_one(r: &mut i32) {\n    *r += 1;\n}\nfn main() {\n    let mut x = 5;\n    let r = &mut x;\n    add_one(r);\n    println!(\"{}\", x);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "6",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "6",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-ownership-deep-dive-m2-l3",
            "slug": "rust-ownership-deep-dive-m2-l3",
            "title": "Splitting Borrows",
            "concept": "You can borrow different fields of a struct separately, as in let (a, b) = (&mut p.x, &mut p.y), because the borrow checker understands disjoint fields. Splitting borrows is how you update two fields at once without the checker complaining.",
            "syntax": "let a = &mut p.x; let b = &mut p.y;",
            "exampleCode": "struct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let mut p = Point { x: 1, y: 2 };\n    let a = &mut p.x;\n    let b = &mut p.y;\n    *a += 10;\n    *b += 10;\n    println!(\"{} {}\", p.x, p.y);\n}",
            "exampleLanguage": "rust",
            "mistake": "Borrowing the whole struct mutably twice, when borrowing its separate fields would work.",
            "bug": {
              "prompt": "Can you mutably borrow two different fields of one struct at once?",
              "buggyCode": "fn main() {\n    println!(\"yes, disjoint\");\n}",
              "fixedCode": "fn main() {\n    println!(\"no, never\");\n}",
              "explanation": "Disjoint field borrows are allowed, since they do not overlap."
            },
            "exercise": {
              "title": "Split borrow program",
              "type": "write-code",
              "instructions": "Write a program that mutably borrows p.x and p.y separately, adds 10 to each, and prints `11 12`.",
              "starterCode": "struct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let mut p = Point { x: 1, y: 2 };\n    // TODO: split the borrows\n}",
              "solution": "struct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let mut p = Point { x: 1, y: 2 };\n    let a = &mut p.x;\n    let b = &mut p.y;\n    *a += 10;\n    *b += 10;\n    println!(\"{} {}\", p.x, p.y);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "11 12",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "11 12",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-ownership-deep-dive-m2-l4",
            "slug": "rust-ownership-deep-dive-m2-l4",
            "title": "Two-Phase Borrows",
            "concept": "A two-phase borrow lets a method call like v.push(v.len()) work: the shared borrow of v.len() is reserved first, then the mutable borrow for push runs after it ends. The compiler understands this pattern, so code that looks like it borrows twice is accepted.",
            "syntax": "v.push(v.len()); // two-phase borrow",
            "exampleCode": "fn main() {\n    let mut v = vec![1, 2, 3];\n    v.push(v.len());\n    println!(\"{:?}\", v);\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming every expression with two borrows needs restructuring, when two-phase borrows already handle the common case.",
            "bug": {
              "prompt": "Why does v.push(v.len()) compile?",
              "buggyCode": "fn main() {\n    println!(\"two-phase borrow\");\n}",
              "fixedCode": "fn main() {\n    println!(\"it copies v\");\n}",
              "explanation": "The shared borrow for len() ends before the mutable borrow for push begins."
            },
            "exercise": {
              "title": "Two-phase quiz",
              "type": "multiple-choice",
              "instructions": "Why does v.push(v.len()) compile?",
              "starterCode": "",
              "solution": "Two-phase borrows let the shared borrow end before the mutable one starts",
              "solutionExplanation": "Two-phase borrows handle method calls whose arguments borrow the receiver.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Two-phase borrows let the shared borrow end before the mutable one starts",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Two-phase borrows let the shared borrow end before the mutable one starts",
                "Vec is Copy",
                "push does not borrow",
                "len() returns a copy of the Vec"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-ownership-deep-dive-m2-l5",
            "slug": "rust-ownership-deep-dive-m2-l5",
            "title": "Ownership Design Patterns",
            "concept": "Good ownership design follows a few patterns: take ownership when a function consumes a value, borrow when it only reads, return owned values from constructors, and use Rc or Arc when sharing is genuinely needed. Choosing the pattern up front avoids most borrow-checker fights.",
            "syntax": "fn process(items: Vec<String>) { /* owns */ }",
            "exampleCode": "fn main() {\n    let items = vec![String::from(\"a\"), String::from(\"b\")];\n    println!(\"count {}\", items.len());\n    println!(\"first {}\", items[0]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Cloning values everywhere to satisfy the borrow checker, instead of choosing the right ownership pattern.",
            "bug": {
              "prompt": "A function only reads a Vec<String>. What should it take?",
              "buggyCode": "fn main() {\n    println!(\"&[String]\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Vec<String>\");\n}",
              "explanation": "Borrowing with &[String] lets the caller keep the Vec."
            },
            "exercise": {
              "title": "Design program",
              "type": "write-code",
              "instructions": "Write a program that creates items vec![\"a\", \"b\"] and prints `count 2` and `first a`.",
              "starterCode": "fn main() {\n    let items = vec![String::from(\"a\"), String::from(\"b\")];\n    // TODO: print count and first\n}",
              "solution": "fn main() {\n    let items = vec![String::from(\"a\"), String::from(\"b\")];\n    println!(\"count {}\", items.len());\n    println!(\"first {}\", items[0]);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "count 2\nfirst a",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "count 2",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Ownership showcase",
      "type": "write-code",
      "instructions": "Write a program that moves s1 into s2 printing `moved: deep`, partially moves a Pair printing `first: x second: 2`, and uses a Guard whose Drop prints `dropped guard` after `inside scope`.",
      "starterCode": "struct Pair {\n    first: String,\n    second: i32,\n}\nstruct Guard;\nimpl Drop for Guard {\n    fn drop(&mut self) {\n        println!(\"dropped guard\");\n    }\n}\nfn main() {\n    // TODO\n}",
      "solution": "struct Pair {\n    first: String,\n    second: i32,\n}\nstruct Guard;\nimpl Drop for Guard {\n    fn drop(&mut self) {\n        println!(\"dropped guard\");\n    }\n}\nfn main() {\n    let s1 = String::from(\"deep\");\n    let s2 = s1;\n    println!(\"moved: {}\", s2);\n    let p = Pair { first: String::from(\"x\"), second: 2 };\n    let first = p.first;\n    println!(\"first: {} second: {}\", first, p.second);\n    {\n        let _g = Guard;\n        println!(\"inside scope\");\n    }\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "moved: deep\nfirst: x second: 2\ninside scope\ndropped guard",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "moved: deep",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Ownership Showcase",
      "description": "Build a program that moves, partially moves, drops, and shares values, showing the rules in action.",
      "requirements": [
        "Program moves a String and shows the new owner",
        "Program partially moves a struct field",
        "Program uses a Drop type that prints on drop",
        "Program moves a value into a thread"
      ],
      "rubric": [
        "Move is demonstrated",
        "Partial move is demonstrated",
        "Drop runs at scope end",
        "Thread move works"
      ]
    }
  },
  {
    "id": "rust-lifetimes",
    "slug": "rust-lifetimes",
    "language": "rust",
    "category": "languages",
    "title": "Lifetimes in Rust",
    "description": "Understand lifetimes: annotations, elision, structs with lifetimes, and 'static.",
    "difficulty": "Intermediate",
    "estimatedHours": 14,
    "skills": [
      "Explaining lifetimes",
      "Writing lifetime annotations",
      "Using elision rules",
      "Storing references in structs",
      "Using 'static",
      "Fixing lifetime errors"
    ],
    "prerequisites": [
      "Rust"
    ],
    "analogy": "Learning {topic} is like learning to check expiry dates: a reference is only good while the thing it points to is still there.",
    "modules": [
      {
        "id": "rust-lifetimes-m1",
        "title": "Fundamentals of Lifetimes in Rust",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-lifetimes-m1-l1",
            "slug": "rust-lifetimes-m1-l1",
            "title": "What Is a Lifetime",
            "concept": "A lifetime is the span of time a reference is valid, and the borrow checker uses lifetimes to make sure no reference outlives the data it points to. Every reference has a lifetime, even when you do not write one, because the compiler infers it.",
            "syntax": "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { x }",
            "exampleCode": "fn main() {\n    let s = String::from(\"alive\");\n    let r = &s;\n    println!(\"{} {}\", s, r);\n}",
            "exampleLanguage": "rust",
            "mistake": "Thinking a lifetime is a runtime value, when it is a compile-time annotation the compiler checks and erases.",
            "bug": {
              "prompt": "What is a lifetime in Rust?",
              "buggyCode": "fn main() {\n    println!(\"how long a ref is valid\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a runtime timer\");\n}",
              "explanation": "A lifetime is the compile-time span during which a reference is valid."
            },
            "exercise": {
              "title": "Lifetime program",
              "type": "write-code",
              "instructions": "Write a program that borrows s = \"alive\" and prints `alive alive`.",
              "starterCode": "fn main() {\n    let s = String::from(\"alive\");\n    // TODO: borrow and print\n}",
              "solution": "fn main() {\n    let s = String::from(\"alive\");\n    let r = &s;\n    println!(\"{} {}\", s, r);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "alive alive",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "alive alive",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-lifetimes-m1-l2",
            "slug": "rust-lifetimes-m1-l2",
            "title": "Lifetime Annotations",
            "concept": "A lifetime annotation like 'a names a lifetime so you can say that two references live at least as long as each other. In fn longest<'a>(x: &'a str, y: &'a str) -> &'a str, the result lives as long as the shorter of the two inputs.",
            "syntax": "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str",
            "exampleCode": "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() {\n        x\n    } else {\n        y\n    }\n}\nfn main() {\n    println!(\"{}\", longest(\"short\", \"longer text\"));\n}",
            "exampleLanguage": "rust",
            "mistake": "Annotating every reference with a different lifetime when the result must relate to the inputs.",
            "bug": {
              "prompt": "What does 'a in fn longest<'a> name?",
              "buggyCode": "fn main() {\n    println!(\"a lifetime\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a type\");\n}",
              "explanation": "'a is a lifetime parameter, like a generic type parameter but for lifetimes."
            },
            "exercise": {
              "title": "Longest program",
              "type": "write-code",
              "instructions": "Write a program with longest<'a> returning the longer of two &str, printing `longer text` for (\"short\", \"longer text\").",
              "starterCode": "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    // TODO: return the longer\n    x\n}\nfn main() {\n    println!(\"{}\", longest(\"short\", \"longer text\"));\n}",
              "solution": "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() {\n        x\n    } else {\n        y\n    }\n}\nfn main() {\n    println!(\"{}\", longest(\"short\", \"longer text\"));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "longer text",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "longer text",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-lifetimes-m1-l3",
            "slug": "rust-lifetimes-m1-l3",
            "title": "Lifetime Elision",
            "concept": "Lifetime elision is the set of rules that lets you leave lifetime annotations out when the compiler can infer them. The rules are: each input reference gets its own lifetime, and if there is exactly one input lifetime, the output gets it.",
            "syntax": "fn first(s: &str) -> &str { &s[0..1] }",
            "exampleCode": "fn first(s: &str) -> &str {\n    &s[0..1]\n}\nfn main() {\n    println!(\"{}\", first(\"hello\"));\n}",
            "exampleLanguage": "rust",
            "mistake": "Adding explicit lifetimes to a function where elision already gives the right answer.",
            "bug": {
              "prompt": "When can you leave lifetime annotations out?",
              "buggyCode": "fn main() {\n    println!(\"elision rules apply\");\n}",
              "fixedCode": "fn main() {\n    println!(\"never\");\n}",
              "explanation": "Elision covers the common cases, like one input reference and one output."
            },
            "exercise": {
              "title": "Elision quiz",
              "type": "multiple-choice",
              "instructions": "When can you leave lifetime annotations out?",
              "starterCode": "",
              "solution": "When the elision rules determine the lifetimes",
              "solutionExplanation": "Elision infers lifetimes in the common single-input cases.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "When the elision rules determine the lifetimes",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "When the elision rules determine the lifetimes",
                "Never, always annotate",
                "Only in main",
                "Only for String"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-lifetimes-m1-l4",
            "slug": "rust-lifetimes-m1-l4",
            "title": "Lifetimes in Structs",
            "concept": "A struct that holds a reference must declare a lifetime, as in struct Excerpt<'a> { text: &'a str }, because the struct cannot outlive the data it borrows. The lifetime on the struct says the struct is only valid while the borrowed data lives.",
            "syntax": "struct Excerpt<'a> { text: &'a str }",
            "exampleCode": "struct Excerpt<'a> {\n    text: &'a str,\n}\nfn main() {\n    let s = String::from(\"hello world\");\n    let e = Excerpt { text: &s[0..5] };\n    println!(\"{}\", e.text);\n}",
            "exampleLanguage": "rust",
            "mistake": "Storing a reference in a struct without a lifetime parameter, which the compiler rejects.",
            "bug": {
              "prompt": "Why does a struct holding a reference need a lifetime?",
              "buggyCode": "fn main() {\n    println!(\"cannot outlive data\");\n}",
              "fixedCode": "fn main() {\n    println!(\"for speed\");\n}",
              "explanation": "The lifetime guarantees the struct does not outlive the data it borrows."
            },
            "exercise": {
              "title": "Excerpt program",
              "type": "write-code",
              "instructions": "Write a program with struct Excerpt<'a> holding text: &'a str, printing `hello` for the first five bytes of \"hello world\".",
              "starterCode": "struct Excerpt<'a> {\n    text: &'a str,\n}\nfn main() {\n    let s = String::from(\"hello world\");\n    // TODO: build the excerpt\n}",
              "solution": "struct Excerpt<'a> {\n    text: &'a str,\n}\nfn main() {\n    let s = String::from(\"hello world\");\n    let e = Excerpt { text: &s[0..5] };\n    println!(\"{}\", e.text);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "hello",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "hello",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-lifetimes-m1-l5",
            "slug": "rust-lifetimes-m1-l5",
            "title": "The 'static Lifetime",
            "concept": "The 'static lifetime means a reference is valid for the entire run of the program, and string literals have type &'static str. You can also leak a value to get a 'static reference, but that is rarely the right answer.",
            "syntax": "let s: &'static str = \"hello\";",
            "exampleCode": "fn main() {\n    let s: &'static str = \"hello\";\n    println!(\"{}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Annotating a reference as 'static when it only lives for part of the program, which the compiler rejects.",
            "bug": {
              "prompt": "What does 'static mean for a reference?",
              "buggyCode": "fn main() {\n    println!(\"whole program\");\n}",
              "fixedCode": "fn main() {\n    println!(\"one function\");\n}",
              "explanation": "'static means the reference is valid for the entire program run."
            },
            "exercise": {
              "title": "Static quiz",
              "type": "multiple-choice",
              "instructions": "What does 'static mean for a reference?",
              "starterCode": "",
              "solution": "It is valid for the entire run of the program",
              "solutionExplanation": "'static is the longest lifetime: the whole program.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It is valid for the entire run of the program",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "It is valid for the entire run of the program",
                "It is a constant value",
                "It lives on the stack",
                "It cannot be read"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-lifetimes-m2",
        "title": "Applying Lifetimes in Rust",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-lifetimes-m2-l1",
            "slug": "rust-lifetimes-m2-l1",
            "title": "Lifetime Bounds",
            "concept": "A lifetime bound like T: 'a says a type T must live at least as long as 'a, which is needed when a generic type holds references. Bounds on lifetimes are how generic code promises its data will live long enough.",
            "syntax": "fn f<'a, T: 'a>(x: T) -> T { x }",
            "exampleCode": "fn main() {\n    let s = String::from(\"bound\");\n    let r: &str = &s;\n    println!(\"{}\", r);\n}",
            "exampleLanguage": "rust",
            "mistake": "Adding lifetime bounds to a function that does not hold any references.",
            "bug": {
              "prompt": "What does T: 'a mean?",
              "buggyCode": "fn main() {\n    println!(\"T lives as long as a\");\n}",
              "fixedCode": "fn main() {\n    println!(\"T is a lifetime\");\n}",
              "explanation": "T: 'a requires the type T to live at least as long as 'a."
            },
            "exercise": {
              "title": "Bound program",
              "type": "write-code",
              "instructions": "Write a program that borrows s = \"bound\" as &str and prints `bound`.",
              "starterCode": "fn main() {\n    let s = String::from(\"bound\");\n    // TODO: borrow and print\n}",
              "solution": "fn main() {\n    let s = String::from(\"bound\");\n    let r: &str = &s;\n    println!(\"{}\", r);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "bound",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "bound",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-lifetimes-m2-l2",
            "slug": "rust-lifetimes-m2-l2",
            "title": "Multiple Lifetimes",
            "concept": "A function can have several lifetime parameters, like<'a, 'b>, when its references have different scopes. Using two lifetimes instead of one is more precise: it lets the result live as long as the input it actually comes from.",
            "syntax": "fn pick<'a, 'b>(x: &'a str, y: &'b str) -> &'a str { x }",
            "exampleCode": "fn pick<'a, 'b>(x: &'a str, _y: &'b str) -> &'a str {\n    x\n}\nfn main() {\n    println!(\"{}\", pick(\"first\", \"second\"));\n}",
            "exampleLanguage": "rust",
            "mistake": "Using one lifetime for two unrelated references, which over-constrains the function.",
            "bug": {
              "prompt": "When do you need two lifetime parameters?",
              "buggyCode": "fn main() {\n    println!(\"refs differ in scope\");\n}",
              "fixedCode": "fn main() {\n    println!(\"always\");\n}",
              "explanation": "Two lifetimes let each reference keep its own scope."
            },
            "exercise": {
              "title": "Pick program",
              "type": "write-code",
              "instructions": "Write a program with pick<'a, 'b> returning its first argument, printing `first`.",
              "starterCode": "fn pick<'a, 'b>(x: &'a str, _y: &'b str) -> &'a str {\n    // TODO: return x\n    x\n}\nfn main() {\n    println!(\"{}\", pick(\"first\", \"second\"));\n}",
              "solution": "fn pick<'a, 'b>(x: &'a str, _y: &'b str) -> &'a str {\n    x\n}\nfn main() {\n    println!(\"{}\", pick(\"first\", \"second\"));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "first",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "first",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-lifetimes-m2-l3",
            "slug": "rust-lifetimes-m2-l3",
            "title": "Lifetime Errors",
            "concept": "A lifetime error means a reference would outlive its data, and the compiler shows the two spans: where the data is dropped and where the reference is used. The fix is usually to move the data, clone it, or return an owned value instead of a reference.",
            "syntax": "fn dangle() -> &String { &String::from(\"x\") } // error",
            "exampleCode": "fn main() {\n    let s = String::from(\"owned\");\n    let r = &s;\n    println!(\"{} {}\", s, r);\n}",
            "exampleLanguage": "rust",
            "mistake": "Returning a reference to a local value instead of returning the owned value.",
            "bug": {
              "prompt": "What is the usual fix for a dangling reference error?",
              "buggyCode": "fn main() {\n    println!(\"return owned value\");\n}",
              "fixedCode": "fn main() {\n    println!(\"add 'static\");\n}",
              "explanation": "Return the owned value instead of a reference to a local."
            },
            "exercise": {
              "title": "Lifetime error quiz",
              "type": "multiple-choice",
              "instructions": "What is the usual fix for a dangling reference error?",
              "starterCode": "",
              "solution": "Return the owned value instead of a reference to a local",
              "solutionExplanation": "Returning ownership avoids the dangling reference entirely.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Return the owned value instead of a reference to a local",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Return the owned value instead of a reference to a local",
                "Add 'static to the reference",
                "Ignore the error",
                "Use unsafe"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-lifetimes-m2-l4",
            "slug": "rust-lifetimes-m2-l4",
            "title": "Lifetimes and Methods",
            "concept": "Methods on a struct with a lifetime, like impl<'a> Excerpt<'a>, can use that lifetime in their signatures. The elision rules apply to methods too, so &self gives the output the lifetime of the borrow.",
            "syntax": "impl<'a> Excerpt<'a> { fn text(&self) -> &'a str { self.text } }",
            "exampleCode": "struct Excerpt<'a> {\n    text: &'a str,\n}\nimpl<'a> Excerpt<'a> {\n    fn text(&self) -> &'a str {\n        self.text\n    }\n}\nfn main() {\n    let s = String::from(\"hello world\");\n    let e = Excerpt { text: &s[0..5] };\n    println!(\"{}\", e.text());\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing a method that returns a reference with a shorter lifetime than the struct's data, when it could return the full one.",
            "bug": {
              "prompt": "How do you write an impl for a struct with a lifetime?",
              "buggyCode": "fn main() {\n    println!(\"impl<'a> Type<'a>\");\n}",
              "fixedCode": "fn main() {\n    println!(\"impl Type\");\n}",
              "explanation": "The impl block declares the lifetime: impl<'a> Excerpt<'a>."
            },
            "exercise": {
              "title": "Method lifetime program",
              "type": "write-code",
              "instructions": "Write a program with Excerpt::text() returning &'a str, printing `hello` for \"hello world\".",
              "starterCode": "struct Excerpt<'a> {\n    text: &'a str,\n}\nimpl<'a> Excerpt<'a> {\n    // TODO: text method\n}\nfn main() {\n    let s = String::from(\"hello world\");\n    let e = Excerpt { text: &s[0..5] };\n    println!(\"{}\", e.text());\n}",
              "solution": "struct Excerpt<'a> {\n    text: &'a str,\n}\nimpl<'a> Excerpt<'a> {\n    fn text(&self) -> &'a str {\n        self.text\n    }\n}\nfn main() {\n    let s = String::from(\"hello world\");\n    let e = Excerpt { text: &s[0..5] };\n    println!(\"{}\", e.text());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "hello",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "hello",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-lifetimes-m2-l5",
            "slug": "rust-lifetimes-m2-l5",
            "title": "When Lifetimes Matter",
            "concept": "Lifetimes matter most when a function returns a reference or a struct holds one; in most other code, elision handles them invisibly. If a lifetime error appears, it is the compiler telling you a reference would outlive its data, which is a real bug, not red tape.",
            "syntax": "fn first(s: &str) -> &str { &s[0..1] }",
            "exampleCode": "fn main() {\n    let text = \"lifetimes\";\n    println!(\"first {}\", &text[0..1]);\n}",
            "exampleLanguage": "rust",
            "mistake": "Adding lifetime annotations everywhere, when elision already covers the case.",
            "bug": {
              "prompt": "When do lifetimes usually need explicit annotations?",
              "buggyCode": "fn main() {\n    println!(\"returning a ref\");\n}",
              "fixedCode": "fn main() {\n    println!(\"always\");\n}",
              "explanation": "Explicit lifetimes are usually needed when returning a reference or storing one."
            },
            "exercise": {
              "title": "First char program",
              "type": "write-code",
              "instructions": "Write a program that prints `first l` for the first byte of \"lifetimes\".",
              "starterCode": "fn main() {\n    let text = \"lifetimes\";\n    // TODO: print the first character\n}",
              "solution": "fn main() {\n    let text = \"lifetimes\";\n    println!(\"first {}\", &text[0..1]);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "first l",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "first l",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Borrowed text reader",
      "type": "write-code",
      "instructions": "Write a program with longest<'a> and an Excerpt<'a> struct that prints `longest: elephant` for (\"cat\", \"elephant\") and `first: hello` for \"hello world\".",
      "starterCode": "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    // TODO\n    x\n}\nstruct Excerpt<'a> {\n    text: &'a str,\n}\nfn main() {\n    // TODO\n}",
      "solution": "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() {\n        x\n    } else {\n        y\n    }\n}\nstruct Excerpt<'a> {\n    text: &'a str,\n}\nfn main() {\n    println!(\"longest: {}\", longest(\"cat\", \"elephant\"));\n    let s = String::from(\"hello world\");\n    let e = Excerpt { text: &s[0..5] };\n    println!(\"first: {}\", e.text);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "longest: elephant\nfirst: hello",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "longest: elephant",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Borrowed Text Reader",
      "description": "Build a program that finds the longest word and the first word of a sentence using borrowed slices.",
      "requirements": [
        "Program defines longest<'a> returning the longer &str",
        "Program defines a struct holding a borrowed excerpt",
        "Program prints the longest word",
        "Program prints the first word"
      ],
      "rubric": [
        "longest works",
        "Struct holds a reference",
        "Longest word is correct",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-traits",
    "slug": "rust-traits",
    "language": "rust",
    "category": "languages",
    "title": "Traits in Rust",
    "description": "Define and implement traits: default methods, Display, deriving, trait objects, and the orphan rule.",
    "difficulty": "Intermediate",
    "estimatedHours": 15,
    "skills": [
      "Defining traits",
      "Implementing traits",
      "Using default methods",
      "Implementing Display",
      "Deriving traits",
      "Using trait objects"
    ],
    "prerequisites": [
      "Rust"
    ],
    "analogy": "Learning {topic} is like learning a job description: it lists the skills, and any person with those skills can do the job.",
    "modules": [
      {
        "id": "rust-traits-m1",
        "title": "Fundamentals of Traits in Rust",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-traits-m1-l1",
            "slug": "rust-traits-m1-l1",
            "title": "What Is a Trait",
            "concept": "A trait defines behaviour that types can share: a set of method signatures that any type can implement. Traits are Rust's way of doing polymorphism without inheritance, and they are how the standard library defines Display, Clone, and Iterator.",
            "syntax": "trait Greet { fn greet(&self) -> String; }",
            "exampleCode": "trait Greet {\n    fn greet(&self) -> String;\n}\nstruct Person {\n    name: String,\n}\nimpl Greet for Person {\n    fn greet(&self) -> String {\n        format!(\"Hello, {}!\", self.name)\n    }\n}\nfn main() {\n    let p = Person { name: String::from(\"Ada\") };\n    println!(\"{}\", p.greet());\n}",
            "exampleLanguage": "rust",
            "mistake": "Defining a trait for behaviour that only one type will ever implement, when a plain method would do.",
            "bug": {
              "prompt": "What is a trait?",
              "buggyCode": "fn main() {\n    println!(\"shared behaviour\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a data type\");\n}",
              "explanation": "A trait is a set of method signatures that types can implement."
            },
            "exercise": {
              "title": "Greet trait program",
              "type": "write-code",
              "instructions": "Write a program with a Greet trait and a Person implementation printing `Hello, Ada!`.",
              "starterCode": "trait Greet {\n    fn greet(&self) -> String;\n}\nstruct Person {\n    name: String,\n}\nimpl Greet for Person {\n    // TODO: implement greet\n}\nfn main() {\n    let p = Person { name: String::from(\"Ada\") };\n    println!(\"{}\", p.greet());\n}",
              "solution": "trait Greet {\n    fn greet(&self) -> String;\n}\nstruct Person {\n    name: String,\n}\nimpl Greet for Person {\n    fn greet(&self) -> String {\n        format!(\"Hello, {}!\", self.name)\n    }\n}\nfn main() {\n    let p = Person { name: String::from(\"Ada\") };\n    println!(\"{}\", p.greet());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Hello, Ada!",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Hello, Ada!",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-traits-m1-l2",
            "slug": "rust-traits-m1-l2",
            "title": "Implementing a Trait",
            "concept": "You implement a trait for a type with impl Trait for Type, writing a body for each required method. The implementation can live in the same crate as the trait or the type, which is the orphan rule, and it makes the type usable wherever the trait is expected.",
            "syntax": "impl Greet for Person { fn greet(&self) -> String { String::new() } }",
            "exampleCode": "trait Shout {\n    fn shout(&self) -> String;\n}\nstruct Word(String);\nimpl Shout for Word {\n    fn shout(&self) -> String {\n        self.0.to_uppercase()\n    }\n}\nfn main() {\n    println!(\"{}\", Word(String::from(\"hi\")).shout());\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting to implement a required method, which the compiler reports as a missing implementation.",
            "bug": {
              "prompt": "How do you implement a trait for a type?",
              "buggyCode": "fn main() {\n    println!(\"impl Trait for Type\");\n}",
              "fixedCode": "fn main() {\n    println!(\"extend the trait\");\n}",
              "explanation": "Write impl Trait for Type with a body for each required method."
            },
            "exercise": {
              "title": "Shout trait program",
              "type": "write-code",
              "instructions": "Write a program with a Shout trait for Word(String) that prints `HI` for \"hi\".",
              "starterCode": "trait Shout {\n    fn shout(&self) -> String;\n}\nstruct Word(String);\nimpl Shout for Word {\n    // TODO\n}\nfn main() {\n    println!(\"{}\", Word(String::from(\"hi\")).shout());\n}",
              "solution": "trait Shout {\n    fn shout(&self) -> String;\n}\nstruct Word(String);\nimpl Shout for Word {\n    fn shout(&self) -> String {\n        self.0.to_uppercase()\n    }\n}\nfn main() {\n    println!(\"{}\", Word(String::from(\"hi\")).shout());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "HI",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "HI",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-traits-m1-l3",
            "slug": "rust-traits-m1-l3",
            "title": "Default Method Implementations",
            "concept": "A trait can provide a default body for a method, so types that implement the trait get it for free unless they override it. Defaults are useful for methods that can be written in terms of the required ones.",
            "syntax": "trait T { fn f(&self) { println!(\"default\"); } }",
            "exampleCode": "trait Describe {\n    fn describe(&self) -> String {\n        String::from(\"something\")\n    }\n}\nstruct Thing;\nimpl Describe for Thing {}\nfn main() {\n    println!(\"{}\", Thing.describe());\n}",
            "exampleLanguage": "rust",
            "mistake": "Overriding a default method with a worse implementation, when the default was already right.",
            "bug": {
              "prompt": "What happens if a type does not implement a method that has a default?",
              "buggyCode": "fn main() {\n    println!(\"uses default\");\n}",
              "fixedCode": "fn main() {\n    println!(\"compile error\");\n}",
              "explanation": "The type gets the trait's default implementation."
            },
            "exercise": {
              "title": "Default method program",
              "type": "write-code",
              "instructions": "Write a program with a Describe trait whose default describe() returns \"something\", printing `something` for Thing.",
              "starterCode": "trait Describe {\n    fn describe(&self) -> String {\n        String::from(\"something\")\n    }\n}\nstruct Thing;\nimpl Describe for Thing {}\nfn main() {\n    // TODO: print the description\n}",
              "solution": "trait Describe {\n    fn describe(&self) -> String {\n        String::from(\"something\")\n    }\n}\nstruct Thing;\nimpl Describe for Thing {}\nfn main() {\n    println!(\"{}\", Thing.describe());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "something",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "something",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-traits-m1-l4",
            "slug": "rust-traits-m1-l4",
            "title": "The Display Trait",
            "concept": "The Display trait, from std::fmt, controls how a type prints with {}, and implementing it lets your types appear in format strings. Display is for user-facing text, while Debug, derived with #[derive(Debug)], is for developers.",
            "syntax": "impl std::fmt::Display for Point { fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result { write!(f, \"({}, {})\", self.x, self.y) } }",
            "exampleCode": "use std::fmt;\nstruct Point {\n    x: i32,\n    y: i32,\n}\nimpl fmt::Display for Point {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        write!(f, \"({}, {})\", self.x, self.y)\n    }\n}\nfn main() {\n    println!(\"{}\", Point { x: 3, y: 4 });\n}",
            "exampleLanguage": "rust",
            "mistake": "Implementing Display by printing debug output, when Display should be the user-facing form.",
            "bug": {
              "prompt": "Which trait controls printing with {}?",
              "buggyCode": "fn main() {\n    println!(\"Display\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Debug\");\n}",
              "explanation": "Display controls {} formatting; Debug controls {:?}."
            },
            "exercise": {
              "title": "Display quiz",
              "type": "multiple-choice",
              "instructions": "Which trait controls printing with {}?",
              "starterCode": "",
              "solution": "Display",
              "solutionExplanation": "Display is for {} ; Debug is for {:?}.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Display",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Display",
                "Debug",
                "Clone",
                "Copy"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-traits-m1-l5",
            "slug": "rust-traits-m1-l5",
            "title": "Deriving Traits",
            "concept": "The derive attribute, as in #[derive(Debug, Clone)], asks the compiler to generate a trait implementation automatically. Deriving works for the standard traits whose implementation is mechanical, like Debug, Clone, Copy, PartialEq, and Default.",
            "syntax": "#[derive(Debug, Clone, PartialEq)]\nstruct Point { x: i32, y: i32 }",
            "exampleCode": "#[derive(Debug, Clone, PartialEq)]\nstruct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    let q = p.clone();\n    println!(\"{} {:?}\", p == q, p);\n}",
            "exampleLanguage": "rust",
            "mistake": "Deriving Copy for a struct with a String field, which the compiler rejects.",
            "bug": {
              "prompt": "What does #[derive(Debug)] do?",
              "buggyCode": "fn main() {\n    println!(\"generates Debug impl\");\n}",
              "fixedCode": "fn main() {\n    println!(\"prints the struct\");\n}",
              "explanation": "derive asks the compiler to generate the trait implementation."
            },
            "exercise": {
              "title": "Derive program",
              "type": "write-code",
              "instructions": "Write a program with a derived Debug, Clone, PartialEq Point that prints `true Point { x: 3, y: 4 }`.",
              "starterCode": "#[derive(Debug, Clone, PartialEq)]\nstruct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    let q = p.clone();\n    // TODO: print the comparison and p\n}",
              "solution": "#[derive(Debug, Clone, PartialEq)]\nstruct Point {\n    x: i32,\n    y: i32,\n}\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    let q = p.clone();\n    println!(\"{} {:?}\", p == q, p);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "true Point { x: 3, y: 4 }",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "true Point { x: 3, y: 4 }",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-traits-m2",
        "title": "Applying Traits in Rust",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-traits-m2-l1",
            "slug": "rust-traits-m2-l1",
            "title": "Trait Objects with dyn",
            "concept": "A trait object, written Box<dyn Trait>, holds any type that implements the trait, so a Vec of trait objects can mix different types. Trait objects use dynamic dispatch: the method call is resolved at runtime, which costs a little speed for flexibility.",
            "syntax": "let shapes: Vec<Box<dyn Draw>> = vec![];",
            "exampleCode": "trait Draw {\n    fn draw(&self) -> String;\n}\nstruct Circle;\nimpl Draw for Circle {\n    fn draw(&self) -> String {\n        String::from(\"circle\")\n    }\n}\nfn main() {\n    let d: Box<dyn Draw> = Box::new(Circle);\n    println!(\"{}\", d.draw());\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a trait object when generics would work, and paying for dynamic dispatch for no reason.",
            "bug": {
              "prompt": "What does Box<dyn Draw> hold?",
              "buggyCode": "fn main() {\n    println!(\"any Draw type\");\n}",
              "fixedCode": "fn main() {\n    println!(\"only Circle\");\n}",
              "explanation": "A trait object holds any type that implements the trait."
            },
            "exercise": {
              "title": "Trait object program",
              "type": "write-code",
              "instructions": "Write a program with a Draw trait and a Circle implementation, held as Box<dyn Draw>, printing `circle`.",
              "starterCode": "trait Draw {\n    fn draw(&self) -> String;\n}\nstruct Circle;\nimpl Draw for Circle {\n    // TODO\n}\nfn main() {\n    let d: Box<dyn Draw> = Box::new(Circle);\n    println!(\"{}\", d.draw());\n}",
              "solution": "trait Draw {\n    fn draw(&self) -> String;\n}\nstruct Circle;\nimpl Draw for Circle {\n    fn draw(&self) -> String {\n        String::from(\"circle\")\n    }\n}\nfn main() {\n    let d: Box<dyn Draw> = Box::new(Circle);\n    println!(\"{}\", d.draw());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "circle",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "circle",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-traits-m2-l2",
            "slug": "rust-traits-m2-l2",
            "title": "The Orphan Rule",
            "concept": "The orphan rule says you can implement a trait only when the trait or the type is local to your crate, which stops two crates from implementing the same trait for the same type. The workaround is a newtype wrapper: a tuple struct around the foreign type.",
            "syntax": "struct MyVec(Vec<i32>); // newtype",
            "exampleCode": "struct MyString(String);\nfn main() {\n    let m = MyString(String::from(\"wrapped\"));\n    println!(\"{}\", m.0);\n}",
            "exampleLanguage": "rust",
            "mistake": "Trying to implement Display for String directly, which the orphan rule forbids.",
            "bug": {
              "prompt": "What does the orphan rule forbid?",
              "buggyCode": "fn main() {\n    println!(\"foreign trait on foreign type\");\n}",
              "fixedCode": "fn main() {\n    println!(\"local trait on local type\");\n}",
              "explanation": "You cannot implement a foreign trait for a foreign type."
            },
            "exercise": {
              "title": "Orphan quiz",
              "type": "multiple-choice",
              "instructions": "What does the orphan rule forbid?",
              "starterCode": "",
              "solution": "Implementing a foreign trait for a foreign type",
              "solutionExplanation": "At least one of the trait or the type must be local to your crate.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Implementing a foreign trait for a foreign type",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Implementing a foreign trait for a foreign type",
                "Implementing a local trait for a local type",
                "Deriving Debug",
                "Using generics"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-traits-m2-l3",
            "slug": "rust-traits-m2-l3",
            "title": "Supertraits",
            "concept": "A supertrait is a trait that another trait requires, written trait B: A, which means any type implementing B must also implement A. Supertraits are how you say a trait builds on the behaviour of another, like Display requiring no other trait but often paired with Debug.",
            "syntax": "trait Loud: Greet { fn loud(&self) -> String; }",
            "exampleCode": "trait Greet {\n    fn greet(&self) -> String;\n}\ntrait Loud: Greet {\n    fn loud(&self) -> String {\n        self.greet().to_uppercase()\n    }\n}\nstruct Person;\nimpl Greet for Person {\n    fn greet(&self) -> String {\n        String::from(\"hi\")\n    }\n}\nimpl Loud for Person {}\nfn main() {\n    println!(\"{}\", Person.loud());\n}",
            "exampleLanguage": "rust",
            "mistake": "Declaring a supertrait when the methods do not actually need the parent trait.",
            "bug": {
              "prompt": "What does `trait Loud: Greet` mean?",
              "buggyCode": "fn main() {\n    println!(\"Loud needs Greet\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Greet needs Loud\");\n}",
              "explanation": "A type implementing Loud must also implement Greet."
            },
            "exercise": {
              "title": "Supertrait program",
              "type": "write-code",
              "instructions": "Write a program with trait Loud: Greet whose default loud() uppercases greet(), printing `HI` for Person.",
              "starterCode": "trait Greet {\n    fn greet(&self) -> String;\n}\ntrait Loud: Greet {\n    fn loud(&self) -> String {\n        self.greet().to_uppercase()\n    }\n}\nstruct Person;\nimpl Greet for Person {\n    fn greet(&self) -> String {\n        String::from(\"hi\")\n    }\n}\nimpl Loud for Person {}\nfn main() {\n    // TODO: print the loud greeting\n}",
              "solution": "trait Greet {\n    fn greet(&self) -> String;\n}\ntrait Loud: Greet {\n    fn loud(&self) -> String {\n        self.greet().to_uppercase()\n    }\n}\nstruct Person;\nimpl Greet for Person {\n    fn greet(&self) -> String {\n        String::from(\"hi\")\n    }\n}\nimpl Loud for Person {}\nfn main() {\n    println!(\"{}\", Person.loud());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "HI",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "HI",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-traits-m2-l4",
            "slug": "rust-traits-m2-l4",
            "title": "Associated Types",
            "concept": "An associated type, written type Item in a trait, lets the trait name a type that each implementation chooses. Iterators use this: trait Iterator has type Item, so each iterator says what it yields without making the trait generic over the item type.",
            "syntax": "trait Iterator { type Item; fn next(&mut self) -> Option<Self::Item>; }",
            "exampleCode": "fn main() {\n    let v = vec![1, 2, 3];\n    let mut it = v.iter();\n    println!(\"{:?}\", it.next());\n}",
            "exampleLanguage": "rust",
            "mistake": "Making a trait generic over its item type when an associated type would be clearer.",
            "bug": {
              "prompt": "What is an associated type?",
              "buggyCode": "fn main() {\n    println!(\"a type the impl chooses\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a generic parameter\");\n}",
              "explanation": "An associated type is named by the trait and chosen by each implementation."
            },
            "exercise": {
              "title": "Iterator item program",
              "type": "write-code",
              "instructions": "Write a program that takes the first item of vec![1, 2, 3] with iter().next() and prints `Some(1)`.",
              "starterCode": "fn main() {\n    let v = vec![1, 2, 3];\n    // TODO: get the first item\n}",
              "solution": "fn main() {\n    let v = vec![1, 2, 3];\n    let mut it = v.iter();\n    println!(\"{:?}\", it.next());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Some(1)",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Some(1)",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-traits-m2-l5",
            "slug": "rust-traits-m2-l5",
            "title": "Traits in Practice",
            "concept": "In practice, traits are the backbone of Rust libraries: they define what a type can do, generics accept any type that implements a trait, and trait objects hold mixed types. Designing a good trait means a small set of required methods with useful defaults.",
            "syntax": "fn announce<T: Greet>(t: &T) { println!(\"{}\", t.greet()); }",
            "exampleCode": "trait Greet {\n    fn greet(&self) -> String;\n}\nstruct Person {\n    name: String,\n}\nimpl Greet for Person {\n    fn greet(&self) -> String {\n        format!(\"Hello, {}!\", self.name)\n    }\n}\nfn announce<T: Greet>(t: &T) {\n    println!(\"{}\", t.greet());\n}\nfn main() {\n    announce(&Person { name: String::from(\"Ada\") });\n}",
            "exampleLanguage": "rust",
            "mistake": "Making a trait with twenty required methods, when three required and the rest default would be easier to implement.",
            "bug": {
              "prompt": "How do you write a function that accepts any type implementing Greet?",
              "buggyCode": "fn main() {\n    println!(\"generic with bound\");\n}",
              "fixedCode": "fn main() {\n    println!(\"trait object only\");\n}",
              "explanation": "Use a generic with a trait bound: fn f<T: Greet>(t: &T)."
            },
            "exercise": {
              "title": "Announce program",
              "type": "write-code",
              "instructions": "Write a program with announce<T: Greet> that prints `Hello, Ada!` for a Person.",
              "starterCode": "trait Greet {\n    fn greet(&self) -> String;\n}\nstruct Person {\n    name: String,\n}\nimpl Greet for Person {\n    fn greet(&self) -> String {\n        format!(\"Hello, {}!\", self.name)\n    }\n}\nfn announce<T: Greet>(t: &T) {\n    // TODO: print the greeting\n}\nfn main() {\n    announce(&Person { name: String::from(\"Ada\") });\n}",
              "solution": "trait Greet {\n    fn greet(&self) -> String;\n}\nstruct Person {\n    name: String,\n}\nimpl Greet for Person {\n    fn greet(&self) -> String {\n        format!(\"Hello, {}!\", self.name)\n    }\n}\nfn announce<T: Greet>(t: &T) {\n    println!(\"{}\", t.greet());\n}\nfn main() {\n    announce(&Person { name: String::from(\"Ada\") });\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Hello, Ada!",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Hello, Ada!",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Shape drawer",
      "type": "write-code",
      "instructions": "Write a program with a Draw trait, Circle and Square implementations, a draw_all generic function, and a Vec<Box<dyn Draw>>, printing `circle`, `square`, `circle`, `square`.",
      "starterCode": "trait Draw {\n    fn draw(&self) -> String;\n}\nstruct Circle;\nstruct Square;\n// TODO: implement Draw for both\nfn main() {\n    // TODO\n}",
      "solution": "trait Draw {\n    fn draw(&self) -> String;\n}\nstruct Circle;\nstruct Square;\nimpl Draw for Circle {\n    fn draw(&self) -> String {\n        String::from(\"circle\")\n    }\n}\nimpl Draw for Square {\n    fn draw(&self) -> String {\n        String::from(\"square\")\n    }\n}\nfn draw_all<T: Draw>(items: &[T]) {\n    for item in items {\n        println!(\"{}\", item.draw());\n    }\n}\nfn main() {\n    draw_all(&[Circle]);\n    draw_all(&[Square]);\n    let mixed: Vec<Box<dyn Draw>> = vec![Box::new(Circle), Box::new(Square)];\n    for item in &mixed {\n        println!(\"{}\", item.draw());\n    }\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "circle\nsquare\ncircle\nsquare",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "circle",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Shape Drawer",
      "description": "Build a program with a Draw trait implemented by two shapes, used through generics and a trait object.",
      "requirements": [
        "Program defines a Draw trait",
        "Program implements Draw for Circle and Square",
        "Program draws both through a generic function",
        "Program draws both from a Vec of trait objects"
      ],
      "rubric": [
        "Trait is defined",
        "Both shapes implement it",
        "Generic function works",
        "Trait objects work"
      ]
    }
  },
  {
    "id": "rust-trait-bounds",
    "slug": "rust-trait-bounds",
    "language": "rust",
    "category": "languages",
    "title": "Trait Bounds",
    "description": "Constrain generics with trait bounds: multiple bounds, where clauses, impl Trait, and dispatch.",
    "difficulty": "Intermediate",
    "estimatedHours": 15,
    "skills": [
      "Writing trait bounds",
      "Combining bounds with +",
      "Using where clauses",
      "Using impl Trait",
      "Understanding blanket impls",
      "Choosing static vs dynamic dispatch"
    ],
    "prerequisites": [
      "Rust"
    ],
    "analogy": "Learning {topic} is like writing a job advert: the requirements say exactly what the candidate must be able to do.",
    "modules": [
      {
        "id": "rust-trait-bounds-m1",
        "title": "Fundamentals of Trait Bounds",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-trait-bounds-m1-l1",
            "slug": "rust-trait-bounds-m1-l1",
            "title": "What Is a Trait Bound",
            "concept": "A trait bound, written T: Display, says a generic type must implement a trait, so the function can use that trait's methods on values of type T. Bounds are how generic code promises the operations it needs, without knowing the concrete type.",
            "syntax": "fn show<T: std::fmt::Display>(x: T) { println!(\"{}\", x); }",
            "exampleCode": "use std::fmt::Display;\nfn show<T: Display>(x: T) {\n    println!(\"{}\", x);\n}\nfn main() {\n    show(42);\n    show(\"hello\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing a generic function that calls a trait method without bounding the type, so the compiler rejects the call.",
            "bug": {
              "prompt": "What does T: Display require?",
              "buggyCode": "fn main() {\n    println!(\"T implements Display\");\n}",
              "fixedCode": "fn main() {\n    println!(\"T is a String\");\n}",
              "explanation": "The bound requires T to implement Display."
            },
            "exercise": {
              "title": "Show program",
              "type": "write-code",
              "instructions": "Write a program with show<T: Display> that prints `42` and `hello`.",
              "starterCode": "use std::fmt::Display;\nfn show<T: Display>(x: T) {\n    // TODO: print x\n}\nfn main() {\n    show(42);\n    show(\"hello\");\n}",
              "solution": "use std::fmt::Display;\nfn show<T: Display>(x: T) {\n    println!(\"{}\", x);\n}\nfn main() {\n    show(42);\n    show(\"hello\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "42\nhello",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-trait-bounds-m1-l2",
            "slug": "rust-trait-bounds-m1-l2",
            "title": "Multiple Bounds",
            "concept": "A type can have several bounds, written T: Display + Clone, which means it must implement every listed trait. Multiple bounds are common: a function that prints and copies a value needs both.",
            "syntax": "fn f<T: Display + Clone>(x: T) { println!(\"{}\", x.clone()); }",
            "exampleCode": "use std::fmt::Display;\nfn show_clone<T: Display + Clone>(x: T) {\n    println!(\"{} {}\", x, x.clone());\n}\nfn main() {\n    show_clone(7);\n}",
            "exampleLanguage": "rust",
            "mistake": "Adding a bound the function never uses, which over-constrains callers for no reason.",
            "bug": {
              "prompt": "What does T: Display + Clone mean?",
              "buggyCode": "fn main() {\n    println!(\"both traits\");\n}",
              "fixedCode": "fn main() {\n    println!(\"either trait\");\n}",
              "explanation": "The + joins bounds: T must implement both Display and Clone."
            },
            "exercise": {
              "title": "Multiple bounds program",
              "type": "write-code",
              "instructions": "Write a program with show_clone<T: Display + Clone> that prints `7 7` for 7.",
              "starterCode": "use std::fmt::Display;\nfn show_clone<T: Display + Clone>(x: T) {\n    // TODO: print x and its clone\n}\nfn main() {\n    show_clone(7);\n}",
              "solution": "use std::fmt::Display;\nfn show_clone<T: Display + Clone>(x: T) {\n    println!(\"{} {}\", x, x.clone());\n}\nfn main() {\n    show_clone(7);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "7 7",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "7 7",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-trait-bounds-m1-l3",
            "slug": "rust-trait-bounds-m1-l3",
            "title": "Where Clauses",
            "concept": "A where clause moves trait bounds after the function signature, as in fn f<T>(x: T) where T: Display, which keeps long signatures readable. Where clauses are the standard style when a function has several generic types with several bounds each.",
            "syntax": "fn f<T>(x: T) where T: Display { println!(\"{}\", x); }",
            "exampleCode": "use std::fmt::Display;\nfn show_where<T>(x: T)\nwhere\n    T: Display,\n{\n    println!(\"{}\", x);\n}\nfn main() {\n    show_where(99);\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing bounds inline when the signature is already long, making it hard to read.",
            "bug": {
              "prompt": "When should you use a where clause?",
              "buggyCode": "fn main() {\n    println!(\"long bounds\");\n}",
              "fixedCode": "fn main() {\n    println!(\"never\");\n}",
              "explanation": "Use where when the bounds would make the signature hard to read."
            },
            "exercise": {
              "title": "Where quiz",
              "type": "multiple-choice",
              "instructions": "When should you use a where clause?",
              "starterCode": "",
              "solution": "When the trait bounds are long or numerous",
              "solutionExplanation": "Where clauses keep long signatures readable.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "When the trait bounds are long or numerous",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "When the trait bounds are long or numerous",
                "Never, always use inline bounds",
                "Only for lifetimes",
                "Only in structs"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-trait-bounds-m1-l4",
            "slug": "rust-trait-bounds-m1-l4",
            "title": "impl Trait Arguments",
            "concept": "Writing impl Trait as a parameter type, as in fn show(x: impl Display), is shorthand for a generic with a bound, and it is clearer for one-off functions. The caller still passes any type that implements the trait, and the function is still generic underneath.",
            "syntax": "fn show(x: impl Display) { println!(\"{}\", x); }",
            "exampleCode": "use std::fmt::Display;\nfn show(x: impl Display) {\n    println!(\"{}\", x);\n}\nfn main() {\n    show(3);\n    show(\"three\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Using impl Trait when you need to name the type, for example to return it, which impl Trait cannot do in argument position.",
            "bug": {
              "prompt": "What is `impl Display` as a parameter?",
              "buggyCode": "fn main() {\n    println!(\"generic shorthand\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a trait object\");\n}",
              "explanation": "impl Trait in argument position is shorthand for a generic with that bound."
            },
            "exercise": {
              "title": "Impl trait program",
              "type": "write-code",
              "instructions": "Write a program with show(x: impl Display) that prints `3` and `three`.",
              "starterCode": "use std::fmt::Display;\nfn show(x: impl Display) {\n    // TODO\n}\nfn main() {\n    show(3);\n    show(\"three\");\n}",
              "solution": "use std::fmt::Display;\nfn show(x: impl Display) {\n    println!(\"{}\", x);\n}\nfn main() {\n    show(3);\n    show(\"three\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "3\nthree",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "3",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-trait-bounds-m1-l5",
            "slug": "rust-trait-bounds-m1-l5",
            "title": "impl Trait Returns",
            "concept": "A function can return impl Trait, which means it returns some type that implements the trait, without naming the type. This is how functions return iterators and closures, whose types are too long to write by hand.",
            "syntax": "fn make() -> impl Iterator<Item = i32> { 0..3 }",
            "exampleCode": "fn make() -> impl Iterator<Item = i32> {\n    0..3\n}\nfn main() {\n    for n in make() {\n        println!(\"{}\", n);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Returning two different concrete types from different branches of a function returning impl Trait, which the compiler rejects.",
            "bug": {
              "prompt": "What does `-> impl Iterator<Item = i32>` return?",
              "buggyCode": "fn main() {\n    println!(\"some iterator\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a trait object\");\n}",
              "explanation": "It returns one concrete iterator type, hidden behind the trait."
            },
            "exercise": {
              "title": "Impl return quiz",
              "type": "multiple-choice",
              "instructions": "What does `-> impl Iterator<Item = i32>` return?",
              "starterCode": "",
              "solution": "Some single concrete type that implements the trait",
              "solutionExplanation": "impl Trait return hides one concrete type chosen by the function.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Some single concrete type that implements the trait",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Some single concrete type that implements the trait",
                "Any type at runtime",
                "A trait object",
                "A Vec"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-trait-bounds-m2",
        "title": "Applying Trait Bounds",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-trait-bounds-m2-l1",
            "slug": "rust-trait-bounds-m2-l1",
            "title": "Conditional Implementations",
            "concept": "A conditional implementation, like impl<T: Display> Show for Vec<T>, implements a trait only for types that meet a bound. The standard library uses this everywhere: Vec<T> is Clone only when T is Clone, for example.",
            "syntax": "impl<T: Clone> Clone for Vec<T> { /* ... */ }",
            "exampleCode": "fn main() {\n    let v = vec![1, 2, 3];\n    let w = v.clone();\n    println!(\"{:?} {:?}\", v, w);\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming Vec<T> is Clone for every T, when it requires T: Clone.",
            "bug": {
              "prompt": "When is Vec<T> Clone?",
              "buggyCode": "fn main() {\n    println!(\"when T is Clone\");\n}",
              "fixedCode": "fn main() {\n    println!(\"always\");\n}",
              "explanation": "Vec<T> implements Clone only when its element type does."
            },
            "exercise": {
              "title": "Conditional program",
              "type": "write-code",
              "instructions": "Write a program that clones vec![1, 2, 3] and prints `[1, 2, 3] [1, 2, 3]`.",
              "starterCode": "fn main() {\n    let v = vec![1, 2, 3];\n    // TODO: clone and print both\n}",
              "solution": "fn main() {\n    let v = vec![1, 2, 3];\n    let w = v.clone();\n    println!(\"{:?} {:?}\", v, w);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "[1, 2, 3] [1, 2, 3]",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "[1, 2, 3] [1, 2, 3]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-trait-bounds-m2-l2",
            "slug": "rust-trait-bounds-m2-l2",
            "title": "Blanket Implementations",
            "concept": "A blanket implementation implements a trait for every type that meets a bound, like impl<T: Display> ToString for T, which is why every Display type has .to_string(). Blanket implementations are how the standard library adds methods to whole families of types at once.",
            "syntax": "impl<T: Display> ToString for T { /* ... */ }",
            "exampleCode": "fn main() {\n    let s = 42.to_string();\n    println!(\"{}\", s);\n}",
            "exampleLanguage": "rust",
            "mistake": "Implementing a trait for all T when it only makes sense for some, which blocks other implementations.",
            "bug": {
              "prompt": "Why does every Display type have .to_string()?",
              "buggyCode": "fn main() {\n    println!(\"blanket impl\");\n}",
              "fixedCode": "fn main() {\n    println!(\"each type defines it\");\n}",
              "explanation": "A blanket impl gives ToString to every type that implements Display."
            },
            "exercise": {
              "title": "Blanket program",
              "type": "write-code",
              "instructions": "Write a program that converts 42 to a String with to_string() and prints `42`.",
              "starterCode": "fn main() {\n    // TODO: to_string\n}",
              "solution": "fn main() {\n    let s = 42.to_string();\n    println!(\"{}\", s);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "42",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-trait-bounds-m2-l3",
            "slug": "rust-trait-bounds-m2-l3",
            "title": "Bounds on Structs",
            "concept": "A struct can carry a trait bound on its generic type, as in struct Pair<T: Display>, but the bound is usually better placed on the methods that need it. Bounding the struct means every use of it, even ones that never print, must satisfy the bound.",
            "syntax": "struct Holder<T: Clone> { value: T }",
            "exampleCode": "struct Holder<T> {\n    value: T,\n}\nimpl<T: Clone> Holder<T> {\n    fn duplicate(&self) -> T {\n        self.value.clone()\n    }\n}\nfn main() {\n    let h = Holder { value: 5 };\n    println!(\"{}\", h.duplicate());\n}",
            "exampleLanguage": "rust",
            "mistake": "Putting the bound on the struct instead of the method, over-constraining every use of the struct.",
            "bug": {
              "prompt": "Where should a trait bound usually go?",
              "buggyCode": "fn main() {\n    println!(\"on the method\");\n}",
              "fixedCode": "fn main() {\n    println!(\"on the struct\");\n}",
              "explanation": "Bound the method that needs the trait, not the whole struct."
            },
            "exercise": {
              "title": "Struct bound quiz",
              "type": "multiple-choice",
              "instructions": "Where should a trait bound usually go?",
              "starterCode": "",
              "solution": "On the method that needs it",
              "solutionExplanation": "Placing bounds on methods keeps the struct usable for more types.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "On the method that needs it",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "On the method that needs it",
                "Always on the struct",
                "On the module",
                "Nowhere, bounds are optional"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-trait-bounds-m2-l4",
            "slug": "rust-trait-bounds-m2-l4",
            "title": "Static vs Dynamic Dispatch",
            "concept": "Generics use static dispatch: the compiler creates a copy of the function for each type used, which is fast but larger. Trait objects use dynamic dispatch: one function works for any type at runtime, which is smaller but slower per call.",
            "syntax": "fn f<T: Draw>(x: T) {} // static\nfn g(x: &dyn Draw) {} // dynamic",
            "exampleCode": "trait Draw {\n    fn draw(&self) -> String;\n}\nstruct Circle;\nimpl Draw for Circle {\n    fn draw(&self) -> String {\n        String::from(\"circle\")\n    }\n}\nfn draw_static<T: Draw>(x: &T) {\n    println!(\"{}\", x.draw());\n}\nfn main() {\n    draw_static(&Circle);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using trait objects everywhere for speed-critical code, when generics would be faster.",
            "bug": {
              "prompt": "What is static dispatch?",
              "buggyCode": "fn main() {\n    println!(\"one copy per type\");\n}",
              "fixedCode": "fn main() {\n    println!(\"runtime lookup\");\n}",
              "explanation": "Static dispatch compiles a specialised copy of the function for each type."
            },
            "exercise": {
              "title": "Static dispatch program",
              "type": "write-code",
              "instructions": "Write a program with draw_static<T: Draw> that prints `circle` for Circle.",
              "starterCode": "trait Draw {\n    fn draw(&self) -> String;\n}\nstruct Circle;\nimpl Draw for Circle {\n    fn draw(&self) -> String {\n        String::from(\"circle\")\n    }\n}\nfn draw_static<T: Draw>(x: &T) {\n    // TODO\n}\nfn main() {\n    draw_static(&Circle);\n}",
              "solution": "trait Draw {\n    fn draw(&self) -> String;\n}\nstruct Circle;\nimpl Draw for Circle {\n    fn draw(&self) -> String {\n        String::from(\"circle\")\n    }\n}\nfn draw_static<T: Draw>(x: &T) {\n    println!(\"{}\", x.draw());\n}\nfn main() {\n    draw_static(&Circle);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "circle",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "circle",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-trait-bounds-m2-l5",
            "slug": "rust-trait-bounds-m2-l5",
            "title": "Choosing Bounds",
            "concept": "Choose the weakest bound that lets the code work: Display if you only print, Clone if you only copy, and no bound at all if you only store the value. Weak bounds keep a generic function usable by the most types, which is the point of being generic.",
            "syntax": "fn store<T>(x: T) -> T { x } // no bound needed",
            "exampleCode": "fn store<T>(x: T) -> T {\n    x\n}\nfn main() {\n    println!(\"{}\", store(5));\n    println!(\"{}\", store(\"hi\"));\n}",
            "exampleLanguage": "rust",
            "mistake": "Adding Display to a function that never prints, which needlessly restricts its callers.",
            "bug": {
              "prompt": "When should a generic function have no trait bound?",
              "buggyCode": "fn main() {\n    println!(\"when it needs none\");\n}",
              "fixedCode": "fn main() {\n    println!(\"never\");\n}",
              "explanation": "If the function only moves or stores the value, no bound is needed."
            },
            "exercise": {
              "title": "Store program",
              "type": "write-code",
              "instructions": "Write a program with store<T>(x: T) -> T that prints `5` and `hi`.",
              "starterCode": "fn store<T>(x: T) -> T {\n    // TODO\n    x\n}\nfn main() {\n    println!(\"{}\", store(5));\n    println!(\"{}\", store(\"hi\"));\n}",
              "solution": "fn store<T>(x: T) -> T {\n    x\n}\nfn main() {\n    println!(\"{}\", store(5));\n    println!(\"{}\", store(\"hi\"));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "5\nhi",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Generic printer",
      "type": "write-code",
      "instructions": "Write a program with show<T: Display>, show_clone<T: Display + Clone>, and largest<T: PartialOrd + Copy> that prints `42`, `7 7`, and `largest 9` for largest(4, 9).",
      "starterCode": "use std::fmt::Display;\nfn show<T: Display>(x: T) {\n    // TODO\n}\nfn show_clone<T: Display + Clone>(x: T) {\n    // TODO\n}\nfn largest<T: PartialOrd + Copy>(a: T, b: T) -> T {\n    // TODO\n    a\n}\nfn main() {\n    // TODO\n}",
      "solution": "use std::fmt::Display;\nfn show<T: Display>(x: T) {\n    println!(\"{}\", x);\n}\nfn show_clone<T: Display + Clone>(x: T) {\n    println!(\"{} {}\", x, x.clone());\n}\nfn largest<T: PartialOrd + Copy>(a: T, b: T) -> T {\n    if a > b {\n        a\n    } else {\n        b\n    }\n}\nfn main() {\n    show(42);\n    show_clone(7);\n    println!(\"largest {}\", largest(4, 9));\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "42\n7 7\nlargest 9",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "42",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Generic Printer",
      "description": "Build a program that prints, clones, and compares values through generic functions with trait bounds.",
      "requirements": [
        "Program defines show<T: Display>",
        "Program defines show_clone<T: Display + Clone>",
        "Program defines largest<T: PartialOrd + Copy>",
        "Program prints results for integers and strings"
      ],
      "rubric": [
        "show works for two types",
        "show_clone works",
        "largest works",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-generics",
    "slug": "rust-generics",
    "language": "rust",
    "category": "languages",
    "title": "Generics in Rust",
    "description": "Write code that works for many types with generics: functions, structs, enums, and inference.",
    "difficulty": "Intermediate",
    "estimatedHours": 15,
    "skills": [
      "Writing generic functions",
      "Defining generic structs",
      "Using multiple type parameters",
      "Defining generic enums",
      "Writing generic methods",
      "Understanding monomorphisation"
    ],
    "prerequisites": [
      "Rust"
    ],
    "analogy": "Learning {topic} is like learning to write a recipe that works for any ingredient: the steps stay the same, only the ingredient changes.",
    "modules": [
      {
        "id": "rust-generics-m1",
        "title": "Fundamentals of Generics in Rust",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-generics-m1-l1",
            "slug": "rust-generics-m1-l1",
            "title": "What Are Generics",
            "concept": "Generics let you write code that works for many types, by naming a type parameter like T and using it wherever the concrete type would go. The compiler creates a specialised copy for each type used, so generic code is as fast as hand-written code for each type.",
            "syntax": "fn first<T>(xs: &[T]) -> &T { &xs[0] }",
            "exampleCode": "fn first<T>(xs: &[T]) -> &T {\n    &xs[0]\n}\nfn main() {\n    println!(\"{}\", first(&[10, 20]));\n    println!(\"{}\", first(&[\"a\", \"b\"]));\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing the same function twice for i32 and f64, when one generic function would do.",
            "bug": {
              "prompt": "What does the T in fn first<T> mean?",
              "buggyCode": "fn main() {\n    println!(\"a type parameter\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a variable\");\n}",
              "explanation": "T is a type parameter: the caller chooses the concrete type."
            },
            "exercise": {
              "title": "Generic quiz",
              "type": "multiple-choice",
              "instructions": "What does the T in fn first<T> mean?",
              "starterCode": "",
              "solution": "A type parameter chosen by the caller",
              "solutionExplanation": "T stands for a type, filled in at each call site.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A type parameter chosen by the caller",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "A type parameter chosen by the caller",
                "A variable named T",
                "A trait",
                "A lifetime"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-generics-m1-l2",
            "slug": "rust-generics-m1-l2",
            "title": "Generic Functions",
            "concept": "A generic function declares its type parameters in angle brackets after its name, as in fn swap<T>(a: T, b: T) -> (T, T). The compiler infers the types from the arguments, so callers rarely write them out.",
            "syntax": "fn swap<T>(a: T, b: T) -> (T, T) { (b, a) }",
            "exampleCode": "fn swap<T>(a: T, b: T) -> (T, T) {\n    (b, a)\n}\nfn main() {\n    println!(\"{:?}\", swap(1, 2));\n    println!(\"{:?}\", swap(\"a\", \"b\"));\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting that both arguments of swap<T> must be the same type T.",
            "bug": {
              "prompt": "In fn swap<T>(a: T, b: T), what must a and b be?",
              "buggyCode": "fn main() {\n    println!(\"same type\");\n}",
              "fixedCode": "fn main() {\n    println!(\"any types\");\n}",
              "explanation": "Both parameters use the same T, so they must have the same type."
            },
            "exercise": {
              "title": "Swap program",
              "type": "write-code",
              "instructions": "Write a program with swap<T> that prints `(2, 1)` for (1, 2) and `(\"b\", \"a\")` for (\"a\", \"b\").",
              "starterCode": "fn swap<T>(a: T, b: T) -> (T, T) {\n    // TODO\n    (a, b)\n}\nfn main() {\n    println!(\"{:?}\", swap(1, 2));\n    println!(\"{:?}\", swap(\"a\", \"b\"));\n}",
              "solution": "fn swap<T>(a: T, b: T) -> (T, T) {\n    (b, a)\n}\nfn main() {\n    println!(\"{:?}\", swap(1, 2));\n    println!(\"{:?}\", swap(\"a\", \"b\"));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "(2, 1)\n(\"b\", \"a\")",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "(2, 1)",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-generics-m1-l3",
            "slug": "rust-generics-m1-l3",
            "title": "Generic Structs",
            "concept": "A struct can be generic over its fields, as in struct Pair<T> { first: T, second: T }, and each instance chooses the concrete type. Generic structs are how the standard library builds Vec<T>, Option<T>, and HashMap<K, V>.",
            "syntax": "struct Pair<T> { first: T, second: T }",
            "exampleCode": "struct Pair<T> {\n    first: T,\n    second: T,\n}\nfn main() {\n    let p = Pair { first: 1, second: 2 };\n    println!(\"{} {}\", p.first, p.second);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using two different types for the two fields of Pair<T>, which requires Pair<T, U> instead.",
            "bug": {
              "prompt": "What does struct Pair<T> mean?",
              "buggyCode": "fn main() {\n    println!(\"generic over T\");\n}",
              "fixedCode": "fn main() {\n    println!(\"holds i32 only\");\n}",
              "explanation": "Pair is generic: each instance picks a concrete type for T."
            },
            "exercise": {
              "title": "Pair program",
              "type": "write-code",
              "instructions": "Write a program with struct Pair<T> that prints `1 2` for Pair { first: 1, second: 2 }.",
              "starterCode": "struct Pair<T> {\n    first: T,\n    second: T,\n}\nfn main() {\n    let p = Pair { first: 1, second: 2 };\n    // TODO: print the fields\n}",
              "solution": "struct Pair<T> {\n    first: T,\n    second: T,\n}\nfn main() {\n    let p = Pair { first: 1, second: 2 };\n    println!(\"{} {}\", p.first, p.second);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "1 2",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "1 2",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-generics-m1-l4",
            "slug": "rust-generics-m1-l4",
            "title": "Multiple Type Parameters",
            "concept": "A generic can have several type parameters, as in struct Map<K, V>, and each is chosen independently. Multiple parameters are needed whenever a type holds two unrelated kinds of value, like a key and its value.",
            "syntax": "struct Entry<K, V> { key: K, value: V }",
            "exampleCode": "struct Entry<K, V> {\n    key: K,\n    value: V,\n}\nfn main() {\n    let e = Entry { key: \"a\", value: 1 };\n    println!(\"{} {}\", e.key, e.value);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using one parameter for two unrelated types, which forces them to be the same.",
            "bug": {
              "prompt": "When do you need two type parameters?",
              "buggyCode": "fn main() {\n    println!(\"two unrelated types\");\n}",
              "fixedCode": "fn main() {\n    println!(\"always\");\n}",
              "explanation": "Two parameters let the key and value types vary independently."
            },
            "exercise": {
              "title": "Two params quiz",
              "type": "multiple-choice",
              "instructions": "When do you need two type parameters?",
              "starterCode": "",
              "solution": "When a type holds two unrelated kinds of value",
              "solutionExplanation": "Each parameter is chosen independently, so K and V can differ.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "When a type holds two unrelated kinds of value",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "When a type holds two unrelated kinds of value",
                "Always, one is not enough",
                "Only for functions",
                "Only for enums"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-generics-m1-l5",
            "slug": "rust-generics-m1-l5",
            "title": "Generic Enums",
            "concept": "An enum can be generic too, and the standard library's Option<T> and Result<T, E> are the two most important examples. A generic enum lets each variant carry data of the chosen type, or none at all.",
            "syntax": "enum MyOpt<T> { Some(T), None }",
            "exampleCode": "enum MyOpt<T> {\n    Some(T),\n    None,\n}\nfn main() {\n    let x: MyOpt<i32> = MyOpt::Some(5);\n    if let MyOpt::Some(v) = x {\n        println!(\"{}\", v);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting to annotate the type when the compiler cannot infer it from the use.",
            "bug": {
              "prompt": "Which standard enums are generic?",
              "buggyCode": "fn main() {\n    println!(\"Option and Result\");\n}",
              "fixedCode": "fn main() {\n    println!(\"only Option\");\n}",
              "explanation": "Option<T> and Result<T, E> are generic enums."
            },
            "exercise": {
              "title": "Generic enum program",
              "type": "write-code",
              "instructions": "Write a program with enum MyOpt<T> { Some(T), None } that prints `5` for MyOpt::Some(5).",
              "starterCode": "enum MyOpt<T> {\n    Some(T),\n    None,\n}\nfn main() {\n    let x: MyOpt<i32> = MyOpt::Some(5);\n    // TODO: print the value\n}",
              "solution": "enum MyOpt<T> {\n    Some(T),\n    None,\n}\nfn main() {\n    let x: MyOpt<i32> = MyOpt::Some(5);\n    if let MyOpt::Some(v) = x {\n        println!(\"{}\", v);\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "5",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-generics-m2",
        "title": "Applying Generics in Rust",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-generics-m2-l1",
            "slug": "rust-generics-m2-l1",
            "title": "Generic Methods",
            "concept": "An impl block for a generic struct can define methods that work for every T, and a second impl block with a bound can add methods only for types that meet it. This is how Vec<T> has len for all T, but sort only for T: Ord.",
            "syntax": "impl<T> Pair<T> { fn first(&self) -> &T { &self.first } }",
            "exampleCode": "struct Pair<T> {\n    first: T,\n    second: T,\n}\nimpl<T> Pair<T> {\n    fn first(&self) -> &T {\n        &self.first\n    }\n}\nfn main() {\n    let p = Pair { first: 3, second: 4 };\n    println!(\"{}\", p.first());\n}",
            "exampleLanguage": "rust",
            "mistake": "Putting a bound on the whole impl when only one method needs it.",
            "bug": {
              "prompt": "How do you write a method for all T of a generic struct?",
              "buggyCode": "fn main() {\n    println!(\"impl<T> Type<T>\");\n}",
              "fixedCode": "fn main() {\n    println!(\"impl Type\");\n}",
              "explanation": "The impl block repeats the type parameters: impl<T> Pair<T>."
            },
            "exercise": {
              "title": "Generic method program",
              "type": "write-code",
              "instructions": "Write a program with Pair<T>::first(&self) -> &T that prints `3` for Pair { first: 3, second: 4 }.",
              "starterCode": "struct Pair<T> {\n    first: T,\n    second: T,\n}\nimpl<T> Pair<T> {\n    // TODO: first method\n}\nfn main() {\n    let p = Pair { first: 3, second: 4 };\n    println!(\"{}\", p.first());\n}",
              "solution": "struct Pair<T> {\n    first: T,\n    second: T,\n}\nimpl<T> Pair<T> {\n    fn first(&self) -> &T {\n        &self.first\n    }\n}\nfn main() {\n    let p = Pair { first: 3, second: 4 };\n    println!(\"{}\", p.first());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "3",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "3",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-generics-m2-l2",
            "slug": "rust-generics-m2-l2",
            "title": "Type Inference",
            "concept": "The compiler usually infers generic types from the arguments, so you write first(&[1, 2]) instead of first::<i32>(&[1, 2]). When inference cannot decide, the turbofish syntax ::<Type> names the type explicitly.",
            "syntax": "let v = Vec::<i32>::new();",
            "exampleCode": "fn main() {\n    let v = Vec::<i32>::new();\n    println!(\"len {}\", v.len());\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing the type out everywhere, when inference would have filled it in.",
            "bug": {
              "prompt": "What is the turbofish syntax for?",
              "buggyCode": "fn main() {\n    println!(\"name the type\");\n}",
              "fixedCode": "fn main() {\n    println!(\"call a function\");\n}",
              "explanation": "::<Type> names a generic type explicitly when inference cannot decide."
            },
            "exercise": {
              "title": "Turbofish program",
              "type": "write-code",
              "instructions": "Write a program that creates Vec::<i32>::new() and prints `len 0`.",
              "starterCode": "fn main() {\n    // TODO: empty i32 Vec with turbofish\n}",
              "solution": "fn main() {\n    let v = Vec::<i32>::new();\n    println!(\"len {}\", v.len());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "len 0",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "len 0",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-generics-m2-l3",
            "slug": "rust-generics-m2-l3",
            "title": "Monomorphisation",
            "concept": "Monomorphisation is the compiler's trick for generics: it generates a separate copy of the generic code for each concrete type used. The result is fast, with no runtime cost for being generic, at the price of a larger binary when many types are used.",
            "syntax": "fn id<T>(x: T) -> T { x } // one copy per type",
            "exampleCode": "fn id<T>(x: T) -> T {\n    x\n}\nfn main() {\n    println!(\"{} {}\", id(5), id(\"hi\"));\n}",
            "exampleLanguage": "rust",
            "mistake": "Worrying that generics are slow, when monomorphisation makes them as fast as concrete code.",
            "bug": {
              "prompt": "What does monomorphisation do?",
              "buggyCode": "fn main() {\n    println!(\"one copy per type\");\n}",
              "fixedCode": "fn main() {\n    println!(\"runtime lookup\");\n}",
              "explanation": "The compiler generates a specialised copy for each concrete type used."
            },
            "exercise": {
              "title": "Identity program",
              "type": "write-code",
              "instructions": "Write a program with id<T>(x: T) -> T that prints `5 hi` for id(5) and id(\"hi\").",
              "starterCode": "fn id<T>(x: T) -> T {\n    // TODO\n    x\n}\nfn main() {\n    println!(\"{} {}\", id(5), id(\"hi\"));\n}",
              "solution": "fn id<T>(x: T) -> T {\n    x\n}\nfn main() {\n    println!(\"{} {}\", id(5), id(\"hi\"));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "5 hi",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "5 hi",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-generics-m2-l4",
            "slug": "rust-generics-m2-l4",
            "title": "Generic Bounds Recap",
            "concept": "A generic bound like T: Clone lets a generic function use Clone's methods, and bounds are what turn a generic that can only move values into one that can copy, print, or compare them. The weakest bound that works is the best bound.",
            "syntax": "fn dup<T: Clone>(x: &T) -> T { x.clone() }",
            "exampleCode": "fn dup<T: Clone>(x: &T) -> T {\n    x.clone()\n}\nfn main() {\n    println!(\"{}\", dup(&5));\n    println!(\"{}\", dup(&\"hi\"));\n}",
            "exampleLanguage": "rust",
            "mistake": "Bounding a generic with every trait in sight, when only one is used.",
            "bug": {
              "prompt": "What does T: Clone let a generic function do?",
              "buggyCode": "fn main() {\n    println!(\"clone values\");\n}",
              "fixedCode": "fn main() {\n    println!(\"print values\");\n}",
              "explanation": "The Clone bound lets the function call .clone() on values of type T."
            },
            "exercise": {
              "title": "Bound recap quiz",
              "type": "multiple-choice",
              "instructions": "What does T: Clone let a generic function do?",
              "starterCode": "",
              "solution": "Call .clone() on values of type T",
              "solutionExplanation": "A bound unlocks exactly the methods of that trait.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Call .clone() on values of type T",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Call .clone() on values of type T",
                "Print values of type T",
                "Compare values of type T",
                "Sort values of type T"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-generics-m2-l5",
            "slug": "rust-generics-m2-l5",
            "title": "Generics in the Standard Library",
            "concept": "The standard library is built on generics: Vec<T>, HashMap<K, V>, Option<T>, and Result<T, E> are all generic types, and most iterator methods are generic functions. Learning generics is learning to read the standard library's own vocabulary.",
            "syntax": "let m: HashMap<String, i32> = HashMap::new();",
            "exampleCode": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"a\"), 1);\n    println!(\"size {}\", m.len());\n}",
            "exampleLanguage": "rust",
            "mistake": "Reimplementing a generic standard type for one concrete type, instead of using the generic one.",
            "bug": {
              "prompt": "Which of these is a generic standard type?",
              "buggyCode": "fn main() {\n    println!(\"Vec<T>\");\n}",
              "fixedCode": "fn main() {\n    println!(\"String\");\n}",
              "explanation": "Vec<T> is generic over its element type; String is a concrete type."
            },
            "exercise": {
              "title": "Std generics program",
              "type": "write-code",
              "instructions": "Write a program that inserts (\"a\", 1) into a HashMap<String, i32> and prints `size 1`.",
              "starterCode": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    // TODO: insert and print size\n}",
              "solution": "use std::collections::HashMap;\nfn main() {\n    let mut m: HashMap<String, i32> = HashMap::new();\n    m.insert(String::from(\"a\"), 1);\n    println!(\"size {}\", m.len());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "size 1",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "size 1",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Generic toolbox",
      "type": "write-code",
      "instructions": "Write a program with first<T>, swap<T>, and Pair<T> that prints `first 10`, `swap (2, 1)`, and `pair 3 4`.",
      "starterCode": "fn first<T>(xs: &[T]) -> &T {\n    // TODO\n    &xs[0]\n}\nfn swap<T>(a: T, b: T) -> (T, T) {\n    // TODO\n    (a, b)\n}\nstruct Pair<T> {\n    first: T,\n    second: T,\n}\nfn main() {\n    // TODO\n}",
      "solution": "fn first<T>(xs: &[T]) -> &T {\n    &xs[0]\n}\nfn swap<T>(a: T, b: T) -> (T, T) {\n    (b, a)\n}\nstruct Pair<T> {\n    first: T,\n    second: T,\n}\nfn main() {\n    println!(\"first {}\", first(&[10, 20]));\n    println!(\"swap {:?}\", swap(1, 2));\n    let p = Pair { first: 3, second: 4 };\n    println!(\"pair {} {}\", p.first, p.second);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "first 10\nswap (2, 1)\npair 3 4",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "first 10",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Generic Toolbox",
      "description": "Build a program with generic functions and a generic struct that work for integers and strings.",
      "requirements": [
        "Program defines first<T> over slices",
        "Program defines swap<T>",
        "Program defines a generic Pair<T>",
        "Program uses each with two different types"
      ],
      "rubric": [
        "first works for two types",
        "swap works for two types",
        "Pair works for two types",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-closures",
    "slug": "rust-closures",
    "language": "rust",
    "category": "languages",
    "title": "Closures in Rust",
    "description": "Use closures: capturing, move, Fn traits, and closures in iterators and sorting.",
    "difficulty": "Intermediate",
    "estimatedHours": 15,
    "skills": [
      "Writing closures",
      "Capturing variables",
      "Using move closures",
      "Understanding Fn, FnMut, FnOnce",
      "Passing closures to functions",
      "Returning closures"
    ],
    "prerequisites": [
      "Rust"
    ],
    "analogy": "Learning {topic} is like learning to write a note that remembers where it came from: the closure carries its surroundings with it.",
    "modules": [
      {
        "id": "rust-closures-m1",
        "title": "Fundamentals of Closures in Rust",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-closures-m1-l1",
            "slug": "rust-closures-m1-l1",
            "title": "What Is a Closure",
            "concept": "A closure is an anonymous function that can capture variables from its environment, written |x| x + 1. Closures are values, so you can store them in variables, pass them to functions, and return them from functions.",
            "syntax": "let add_one = |x: i32| x + 1;",
            "exampleCode": "fn main() {\n    let add_one = |x: i32| x + 1;\n    println!(\"{}\", add_one(41));\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing a closure with a type annotation the compiler could infer, adding noise.",
            "bug": {
              "prompt": "What is a closure?",
              "buggyCode": "fn main() {\n    println!(\"anonymous function\");\n}",
              "fixedCode": "fn main() {\n    println!(\"a named function\");\n}",
              "explanation": "A closure is an anonymous function value that can capture its environment."
            },
            "exercise": {
              "title": "Closure program",
              "type": "write-code",
              "instructions": "Write a program with a closure add_one = |x: i32| x + 1 that prints `42` for 41.",
              "starterCode": "fn main() {\n    // TODO: define and call the closure\n}",
              "solution": "fn main() {\n    let add_one = |x: i32| x + 1;\n    println!(\"{}\", add_one(41));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "42",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-closures-m1-l2",
            "slug": "rust-closures-m1-l2",
            "title": "Capturing Variables",
            "concept": "A closure captures the variables it uses from its environment, by reference, by mutable reference, or by value, whichever the body needs. The compiler chooses the least demanding capture that works, so a closure that only reads captures by reference.",
            "syntax": "let factor = 2;\nlet double = |x| x * factor;",
            "exampleCode": "fn main() {\n    let factor = 2;\n    let double = |x: i32| x * factor;\n    println!(\"{}\", double(21));\n}",
            "exampleLanguage": "rust",
            "mistake": "Assuming a closure copies captured values, when it usually borrows them.",
            "bug": {
              "prompt": "How does a closure capture a variable it only reads?",
              "buggyCode": "fn main() {\n    println!(\"by reference\");\n}",
              "fixedCode": "fn main() {\n    println!(\"by value\");\n}",
              "explanation": "A closure that only reads captures by immutable reference."
            },
            "exercise": {
              "title": "Capture program",
              "type": "write-code",
              "instructions": "Write a program where a closure captures factor = 2 and prints `42` for double(21).",
              "starterCode": "fn main() {\n    let factor = 2;\n    // TODO: closure capturing factor\n}",
              "solution": "fn main() {\n    let factor = 2;\n    let double = |x: i32| x * factor;\n    println!(\"{}\", double(21));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "42",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-closures-m1-l3",
            "slug": "rust-closures-m1-l3",
            "title": "The move Keyword",
            "concept": "Adding move to a closure forces it to take ownership of the variables it captures, which is required when the closure outlives its environment, such as in a spawned thread. Move closures are the standard way to send work to another thread.",
            "syntax": "let f = move || println!(\"{}\", s);",
            "exampleCode": "fn main() {\n    let s = String::from(\"moved\");\n    let f = move || println!(\"{}\", s);\n    f();\n}",
            "exampleLanguage": "rust",
            "mistake": "Using move when the closure only needs a borrow, and losing the value for no reason.",
            "bug": {
              "prompt": "What does move do to a closure?",
              "buggyCode": "fn main() {\n    println!(\"captures by value\");\n}",
              "fixedCode": "fn main() {\n    println!(\"moves the closure\");\n}",
              "explanation": "move makes the closure take ownership of its captured variables."
            },
            "exercise": {
              "title": "Move closure program",
              "type": "write-code",
              "instructions": "Write a program with a move closure that prints `moved`.",
              "starterCode": "fn main() {\n    let s = String::from(\"moved\");\n    // TODO: move closure printing s\n}",
              "solution": "fn main() {\n    let s = String::from(\"moved\");\n    let f = move || println!(\"{}\", s);\n    f();\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "moved",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "moved",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-closures-m1-l4",
            "slug": "rust-closures-m1-l4",
            "title": "Fn, FnMut, and FnOnce",
            "concept": "Closures implement one of three traits: Fn borrows its captures and can be called many times, FnMut mutably borrows and can be called many times, and FnOnce takes ownership and can be called once. The trait a closure implements follows from how it uses its captures.",
            "syntax": "fn call_twice<F: Fn()>(f: F) { f(); f(); }",
            "exampleCode": "fn call_twice<F: Fn()>(f: F) {\n    f();\n    f();\n}\nfn main() {\n    call_twice(|| println!(\"hello\"));\n}",
            "exampleLanguage": "rust",
            "mistake": "Bounding a parameter with Fn when the closure mutates its captures, which needs FnMut.",
            "bug": {
              "prompt": "Which closure trait allows many calls without mutating captures?",
              "buggyCode": "fn main() {\n    println!(\"Fn\");\n}",
              "fixedCode": "fn main() {\n    println!(\"FnOnce\");\n}",
              "explanation": "Fn borrows captures immutably, so it can be called repeatedly."
            },
            "exercise": {
              "title": "Fn traits quiz",
              "type": "multiple-choice",
              "instructions": "Which closure trait allows many calls without mutating captures?",
              "starterCode": "",
              "solution": "Fn",
              "solutionExplanation": "Fn closures borrow immutably and can run many times.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Fn",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "Fn",
                "FnMut",
                "FnOnce",
                "None of them"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-closures-m1-l5",
            "slug": "rust-closures-m1-l5",
            "title": "Closures as Arguments",
            "concept": "Functions accept closures as generic parameters with a trait bound, as in fn apply<F: Fn(i32) -> i32>(f: F, x: i32). This is how sort_by, map, and filter take custom behaviour from the caller.",
            "syntax": "fn apply<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 { f(x) }",
            "exampleCode": "fn apply<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 {\n    f(x)\n}\nfn main() {\n    println!(\"{}\", apply(|n| n * 3, 14));\n}",
            "exampleLanguage": "rust",
            "mistake": "Taking a closure by value when the function only calls it once, and a reference would do.",
            "bug": {
              "prompt": "How does a function accept a closure?",
              "buggyCode": "fn main() {\n    println!(\"generic with Fn bound\");\n}",
              "fixedCode": "fn main() {\n    println!(\"as a String\");\n}",
              "explanation": "Accept a generic F: Fn(...) parameter."
            },
            "exercise": {
              "title": "Apply program",
              "type": "write-code",
              "instructions": "Write a program with apply<F: Fn(i32) -> i32> that prints `42` for |n| n * 3 applied to 14.",
              "starterCode": "fn apply<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 {\n    // TODO: call f\n    0\n}\nfn main() {\n    println!(\"{}\", apply(|n| n * 3, 14));\n}",
              "solution": "fn apply<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 {\n    f(x)\n}\nfn main() {\n    println!(\"{}\", apply(|n| n * 3, 14));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "42",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-closures-m2",
        "title": "Applying Closures in Rust",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-closures-m2-l1",
            "slug": "rust-closures-m2-l1",
            "title": "Closures in Iterators",
            "concept": "Iterator methods take closures to transform, filter, and combine data, which is the heart of Rust's functional style. A chain like v.iter().filter(|x| **x > 2).map(|x| x * 2).sum() reads like a description of the result.",
            "syntax": "let total: i32 = v.iter().filter(|x| **x > 1).sum();",
            "exampleCode": "fn main() {\n    let v = vec![1, 2, 3, 4];\n    let total: i32 = v.iter().filter(|x| **x > 1).map(|x| x * 2).sum();\n    println!(\"{}\", total);\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing a manual loop for a job that a filter and map chain expresses in one line.",
            "bug": {
              "prompt": "What do iterator methods like map and filter take?",
              "buggyCode": "fn main() {\n    println!(\"closures\");\n}",
              "fixedCode": "fn main() {\n    println!(\"values\");\n}",
              "explanation": "map and filter take closures that describe the transformation."
            },
            "exercise": {
              "title": "Filter map program",
              "type": "write-code",
              "instructions": "Write a program that filters vec![1, 2, 3, 4] to values > 1, doubles them, sums, and prints `18`.",
              "starterCode": "fn main() {\n    let v = vec![1, 2, 3, 4];\n    // TODO: filter, map, sum\n}",
              "solution": "fn main() {\n    let v = vec![1, 2, 3, 4];\n    let total: i32 = v.iter().filter(|x| **x > 1).map(|x| x * 2).sum();\n    println!(\"{}\", total);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "18",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "18",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-closures-m2-l2",
            "slug": "rust-closures-m2-l2",
            "title": "Returning Closures",
            "concept": "A function can return a closure with impl Fn, as in fn make_adder(n: i32) -> impl Fn(i32) -> i32, which builds a specialised function at runtime. The returned closure captures its inputs, so each call to the maker produces a different closure.",
            "syntax": "fn make_adder(n: i32) -> impl Fn(i32) -> i32 { move |x| x + n }",
            "exampleCode": "fn make_adder(n: i32) -> impl Fn(i32) -> i32 {\n    move |x| x + n\n}\nfn main() {\n    let add_five = make_adder(5);\n    println!(\"{}\", add_five(37));\n}",
            "exampleLanguage": "rust",
            "mistake": "Returning a closure that borrows a local variable, which would dangle, instead of moving it in.",
            "bug": {
              "prompt": "How do you return a closure from a function?",
              "buggyCode": "fn main() {\n    println!(\"impl Fn\");\n}",
              "fixedCode": "fn main() {\n    println!(\"as a String\");\n}",
              "explanation": "Return impl Fn(...), usually with move so the closure owns its captures."
            },
            "exercise": {
              "title": "Return closure quiz",
              "type": "multiple-choice",
              "instructions": "How do you return a closure from a function?",
              "starterCode": "",
              "solution": "With impl Fn as the return type",
              "solutionExplanation": "impl Fn hides the closure's anonymous type.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "With impl Fn as the return type",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "With impl Fn as the return type",
                "By naming the closure type",
                "Closures cannot be returned",
                "With a trait object only"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-closures-m2-l3",
            "slug": "rust-closures-m2-l3",
            "title": "Closure Type Inference",
            "concept": "Closures infer their parameter and return types from how they are used, so |x| x + 1 needs no annotations. The first use fixes the types, and a later use with a different type is an error, because each closure has exactly one signature.",
            "syntax": "let f = |x| x + 1; // x: i32 from use",
            "exampleCode": "fn main() {\n    let f = |x| x + 1;\n    println!(\"{} {}\", f(1), f(2));\n}",
            "exampleLanguage": "rust",
            "mistake": "Calling the same closure with an integer and then a float, when its type was already fixed.",
            "bug": {
              "prompt": "How are a closure's parameter types decided?",
              "buggyCode": "fn main() {\n    println!(\"inferred from use\");\n}",
              "fixedCode": "fn main() {\n    println!(\"always annotated\");\n}",
              "explanation": "The compiler infers closure types from their first use."
            },
            "exercise": {
              "title": "Inference program",
              "type": "write-code",
              "instructions": "Write a program with a closure |x| x + 1 that prints `2 3` for f(1) and f(2).",
              "starterCode": "fn main() {\n    let f = |x| x + 1;\n    // TODO: call f twice\n}",
              "solution": "fn main() {\n    let f = |x| x + 1;\n    println!(\"{} {}\", f(1), f(2));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "2 3",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "2 3",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-closures-m2-l4",
            "slug": "rust-closures-m2-l4",
            "title": "Sorting with Closures",
            "concept": "The sort_by method takes a closure that compares two elements, which lets you sort by any rule you like. sort_by_key is shorter when the rule is a single key, as in people.sort_by_key(|p| p.age).",
            "syntax": "v.sort_by(|a, b| b.cmp(a));",
            "exampleCode": "fn main() {\n    let mut v = vec![3, 1, 2];\n    v.sort_by(|a, b| b.cmp(a));\n    println!(\"{:?}\", v);\n}",
            "exampleLanguage": "rust",
            "mistake": "Writing a manual sort loop when sort_by with a closure expresses the order directly.",
            "bug": {
              "prompt": "How do you sort a Vec in descending order?",
              "buggyCode": "fn main() {\n    println!(\"sort_by b.cmp(a)\");\n}",
              "fixedCode": "fn main() {\n    println!(\"sort then reverse\");\n}",
              "explanation": "sort_by(|a, b| b.cmp(a)) orders largest first."
            },
            "exercise": {
              "title": "Sort closure quiz",
              "type": "multiple-choice",
              "instructions": "How do you sort a Vec in descending order?",
              "starterCode": "",
              "solution": "With sort_by(|a, b| b.cmp(a))",
              "solutionExplanation": "Reversing the comparison in sort_by gives descending order.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "With sort_by(|a, b| b.cmp(a))",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "With sort_by(|a, b| b.cmp(a))",
                "With sort() only",
                "With reverse() only",
                "Descending sort is impossible"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-closures-m2-l5",
            "slug": "rust-closures-m2-l5",
            "title": "Closures vs Functions",
            "concept": "A closure can do everything a function can, plus capture its environment, but each closure has a unique anonymous type, so you cannot name it in a struct field without Box<dyn Fn>. Functions are named and reusable; closures are for one-off behaviour passed to another function.",
            "syntax": "let f: fn(i32) -> i32 = |x| x + 1;",
            "exampleCode": "fn main() {\n    let f: fn(i32) -> i32 = |x| x + 1;\n    println!(\"{}\", f(41));\n}",
            "exampleLanguage": "rust",
            "mistake": "Storing a capturing closure in a fn pointer, which only works for closures that capture nothing.",
            "bug": {
              "prompt": "When can a closure be stored as a fn pointer?",
              "buggyCode": "fn main() {\n    println!(\"captures nothing\");\n}",
              "fixedCode": "fn main() {\n    println!(\"always\");\n}",
              "explanation": "Only a closure that captures nothing can coerce to a fn pointer."
            },
            "exercise": {
              "title": "Fn pointer program",
              "type": "write-code",
              "instructions": "Write a program that stores |x| x + 1 as fn(i32) -> i32 and prints `42` for 41.",
              "starterCode": "fn main() {\n    let f: fn(i32) -> i32 = |x| x + 1;\n    // TODO: call f\n}",
              "solution": "fn main() {\n    let f: fn(i32) -> i32 = |x| x + 1;\n    println!(\"{}\", f(41));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "42",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Closure toolkit",
      "type": "write-code",
      "instructions": "Write a program that makes an adder closure add(10), maps vec![1, 2, 3] to doubled values, sorts vec![3, 1, 2] descending, and prints `add 15`, `doubled [2, 4, 6]`, `sorted [3, 2, 1]`.",
      "starterCode": "fn main() {\n    // TODO: closures for add, map, sort\n}",
      "solution": "fn main() {\n    let add = |x: i32| x + 10;\n    println!(\"add {}\", add(5));\n    let v = vec![1, 2, 3];\n    let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();\n    println!(\"doubled {:?}\", doubled);\n    let mut s = vec![3, 1, 2];\n    s.sort_by(|a, b| b.cmp(a));\n    println!(\"sorted {:?}\", s);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "add 15\ndoubled [2, 4, 6]\nsorted [3, 2, 1]",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "add 15",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Closure Toolkit",
      "description": "Build a program that uses closures to transform a list, sort it, and build an adder.",
      "requirements": [
        "Program defines an adder closure capturing a value",
        "Program maps a Vec with a closure",
        "Program sorts a Vec with a closure",
        "Program prints every result"
      ],
      "rubric": [
        "Adder works",
        "Map works",
        "Sort works",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-iterators",
    "slug": "rust-iterators",
    "language": "rust",
    "category": "languages",
    "title": "Iterators in Rust",
    "description": "Process data with iterators: map, filter, fold, collect, zip, and custom iterators.",
    "difficulty": "Intermediate",
    "estimatedHours": 15,
    "skills": [
      "Using next()",
      "Chaining map and filter",
      "Collecting results",
      "Folding values",
      "Using take, skip, zip, and enumerate",
      "Implementing Iterator"
    ],
    "prerequisites": [
      "Rust"
    ],
    "analogy": "Learning {topic} is like learning to run a conveyor belt: each station does one job, and the product comes out finished at the end.",
    "modules": [
      {
        "id": "rust-iterators-m1",
        "title": "Fundamentals of Iterators in Rust",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-iterators-m1-l1",
            "slug": "rust-iterators-m1-l1",
            "title": "What Is an Iterator",
            "concept": "An iterator is a value that produces a sequence of items one at a time through its next method, which returns Some(item) or None when done. Every collection in Rust can produce iterators, and most data processing is a chain of iterator methods.",
            "syntax": "let mut it = v.iter();\nit.next(); // Some(&1)",
            "exampleCode": "fn main() {\n    let v = vec![1, 2, 3];\n    let mut it = v.iter();\n    println!(\"{:?} {:?}\", it.next(), it.next());\n}",
            "exampleLanguage": "rust",
            "mistake": "Calling next on an iterator you already consumed, and being surprised it returns None.",
            "bug": {
              "prompt": "What does next() return when an iterator is exhausted?",
              "buggyCode": "fn main() {\n    println!(\"None\");\n}",
              "fixedCode": "fn main() {\n    println!(\"panics\");\n}",
              "explanation": "next returns None once the iterator has no more items."
            },
            "exercise": {
              "title": "Iterator program",
              "type": "write-code",
              "instructions": "Write a program that takes the first two items of vec![1, 2, 3] with iter().next() and prints `Some(1) Some(2)`.",
              "starterCode": "fn main() {\n    let v = vec![1, 2, 3];\n    let mut it = v.iter();\n    // TODO: print the first two items\n}",
              "solution": "fn main() {\n    let v = vec![1, 2, 3];\n    let mut it = v.iter();\n    println!(\"{:?} {:?}\", it.next(), it.next());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "Some(1) Some(2)",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "Some(1) Some(2)",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-iterators-m1-l2",
            "slug": "rust-iterators-m1-l2",
            "title": "Lazy Iterators",
            "concept": "Iterator adapters like map and filter are lazy: they do nothing until the iterator is consumed by a method like collect, sum, or a for loop. Laziness means you can chain many steps without allocating intermediate collections.",
            "syntax": "let doubled = v.iter().map(|x| x * 2); // nothing runs yet",
            "exampleCode": "fn main() {\n    let v = vec![1, 2, 3];\n    let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();\n    println!(\"{:?}\", doubled);\n}",
            "exampleLanguage": "rust",
            "mistake": "Building a map chain and forgetting to consume it, so nothing ever runs.",
            "bug": {
              "prompt": "When does a map closure actually run?",
              "buggyCode": "fn main() {\n    println!(\"when consumed\");\n}",
              "fixedCode": "fn main() {\n    println!(\"immediately\");\n}",
              "explanation": "Iterator adapters are lazy; they run only when the iterator is consumed."
            },
            "exercise": {
              "title": "Lazy map program",
              "type": "write-code",
              "instructions": "Write a program that maps vec![1, 2, 3] with |x| x * 2, collects, and prints `[2, 4, 6]`.",
              "starterCode": "fn main() {\n    let v = vec![1, 2, 3];\n    // TODO: map and collect\n}",
              "solution": "fn main() {\n    let v = vec![1, 2, 3];\n    let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();\n    println!(\"{:?}\", doubled);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "[2, 4, 6]",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "[2, 4, 6]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-iterators-m1-l3",
            "slug": "rust-iterators-m1-l3",
            "title": "Map and Filter",
            "concept": "The map method transforms each item, and filter keeps only the items that pass a test, and both return new iterators you can chain. Chaining map and filter replaces most manual loops with a readable pipeline.",
            "syntax": "v.iter().filter(|x| **x > 2).map(|x| x * 10)",
            "exampleCode": "fn main() {\n    let v = vec![1, 2, 3, 4];\n    let out: Vec<i32> = v.iter().filter(|x| **x > 2).map(|x| x * 10).collect();\n    println!(\"{:?}\", out);\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting that filter's closure receives a reference to the item, so **x is needed to compare.",
            "bug": {
              "prompt": "What does filter's closure receive?",
              "buggyCode": "fn main() {\n    println!(\"a reference\");\n}",
              "fixedCode": "fn main() {\n    println!(\"the value\");\n}",
              "explanation": "filter passes &Item to its closure, so you dereference to compare."
            },
            "exercise": {
              "title": "Filter quiz",
              "type": "multiple-choice",
              "instructions": "What does filter's closure receive?",
              "starterCode": "",
              "solution": "A reference to each item",
              "solutionExplanation": "filter's predicate takes &Item.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A reference to each item",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "A reference to each item",
                "The item by value",
                "The index",
                "A bool"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-iterators-m1-l4",
            "slug": "rust-iterators-m1-l4",
            "title": "Collect",
            "concept": "The collect method gathers an iterator's items into a collection, usually a Vec, and its target type is inferred from the annotation or the context. Collect is the consumer that turns a lazy chain into a concrete result.",
            "syntax": "let v: Vec<i32> = (0..3).collect();",
            "exampleCode": "fn main() {\n    let v: Vec<i32> = (0..3).collect();\n    println!(\"{:?}\", v);\n}",
            "exampleLanguage": "rust",
            "mistake": "Calling collect without a type annotation, so the compiler cannot tell which collection to build.",
            "bug": {
              "prompt": "What does collect need to know?",
              "buggyCode": "fn main() {\n    println!(\"target type\");\n}",
              "fixedCode": "fn main() {\n    println!(\"nothing\");\n}",
              "explanation": "collect needs the target collection type, from an annotation or context."
            },
            "exercise": {
              "title": "Collect program",
              "type": "write-code",
              "instructions": "Write a program that collects 0..3 into a Vec<i32> and prints `[0, 1, 2]`.",
              "starterCode": "fn main() {\n    // TODO: collect the range\n}",
              "solution": "fn main() {\n    let v: Vec<i32> = (0..3).collect();\n    println!(\"{:?}\", v);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "[0, 1, 2]",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "[0, 1, 2]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-iterators-m1-l5",
            "slug": "rust-iterators-m1-l5",
            "title": "Fold and Reduce",
            "concept": "The fold method combines all items into one value, starting from an initial value and applying a closure to the accumulator and each item. Reduce is fold without the initial value, using the first item as the start.",
            "syntax": "let total = v.iter().fold(0, |acc, x| acc + x);",
            "exampleCode": "fn main() {\n    let v = vec![1, 2, 3, 4];\n    let total = v.iter().fold(0, |acc, x| acc + x);\n    println!(\"total {}\", total);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using fold with the wrong initial value, for example 1 for a sum, which shifts every result.",
            "bug": {
              "prompt": "What is fold's first argument?",
              "buggyCode": "fn main() {\n    println!(\"initial value\");\n}",
              "fixedCode": "fn main() {\n    println!(\"the closure\");\n}",
              "explanation": "fold takes an initial accumulator, then a closure that combines it with each item."
            },
            "exercise": {
              "title": "Fold quiz",
              "type": "multiple-choice",
              "instructions": "What is fold's first argument?",
              "starterCode": "",
              "solution": "The initial accumulator value",
              "solutionExplanation": "fold(start, |acc, x| ...) begins with start.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The initial accumulator value",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "The initial accumulator value",
                "The closure",
                "The iterator",
                "The final result"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "rust-iterators-m2",
        "title": "Applying Iterators in Rust",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-iterators-m2-l1",
            "slug": "rust-iterators-m2-l1",
            "title": "Take and Skip",
            "concept": "The take method limits an iterator to its first n items, and skip drops the first n, which is how you page through data. Both return iterators, so they compose with the rest of the chain.",
            "syntax": "let first_two: Vec<_> = (0..10).take(2).collect();",
            "exampleCode": "fn main() {\n    let first: Vec<i32> = (0..10).take(3).collect();\n    let rest: Vec<i32> = (0..5).skip(2).collect();\n    println!(\"{:?} {:?}\", first, rest);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using take on an iterator that is already shorter than n, and expecting an error instead of a short result.",
            "bug": {
              "prompt": "What does (0..10).take(3) produce?",
              "buggyCode": "fn main() {\n    println!(\"[0, 1, 2]\");\n}",
              "fixedCode": "fn main() {\n    println!(\"[3, 4, 5]\");\n}",
              "explanation": "take limits the iterator to its first three items."
            },
            "exercise": {
              "title": "Take skip program",
              "type": "write-code",
              "instructions": "Write a program that prints `[0, 1, 2] [2, 3, 4]` for take(3) of 0..10 and skip(2) of 0..5.",
              "starterCode": "fn main() {\n    // TODO: take and skip\n}",
              "solution": "fn main() {\n    let first: Vec<i32> = (0..10).take(3).collect();\n    let rest: Vec<i32> = (0..5).skip(2).collect();\n    println!(\"{:?} {:?}\", first, rest);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "[0, 1, 2] [2, 3, 4]",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "[0, 1, 2] [2, 3, 4]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-iterators-m2-l2",
            "slug": "rust-iterators-m2-l2",
            "title": "Enumerate and Zip",
            "concept": "The enumerate method pairs each item with its index, and zip pairs the items of two iterators together. Both are the idiomatic way to loop with an index or over two lists at once, without manual counters.",
            "syntax": "for (i, x) in v.iter().enumerate() { println!(\"{} {}\", i, x); }",
            "exampleCode": "fn main() {\n    let names = [\"a\", \"b\"];\n    let vals = [1, 2];\n    for (n, v) in names.iter().zip(vals.iter()) {\n        println!(\"{} {}\", n, v);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Zipping iterators of different lengths and expecting an error, when zip simply stops at the shorter one.",
            "bug": {
              "prompt": "What does zip do when the iterators have different lengths?",
              "buggyCode": "fn main() {\n    println!(\"stops at shorter\");\n}",
              "fixedCode": "fn main() {\n    println!(\"panics\");\n}",
              "explanation": "zip stops when either iterator is exhausted."
            },
            "exercise": {
              "title": "Zip program",
              "type": "write-code",
              "instructions": "Write a program that zips [\"a\", \"b\"] with [1, 2] and prints `a 1` and `b 2`.",
              "starterCode": "fn main() {\n    let names = [\"a\", \"b\"];\n    let vals = [1, 2];\n    // TODO: zip and print\n}",
              "solution": "fn main() {\n    let names = [\"a\", \"b\"];\n    let vals = [1, 2];\n    for (n, v) in names.iter().zip(vals.iter()) {\n        println!(\"{} {}\", n, v);\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "a 1\nb 2",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "a 1",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-iterators-m2-l3",
            "slug": "rust-iterators-m2-l3",
            "title": "Any, All, and Find",
            "concept": "The any method returns true when some item passes a test, all returns true when every item does, and find returns the first item that passes as an Option. These consumers answer questions about a collection without writing a loop.",
            "syntax": "let has_big = v.iter().any(|x| *x > 10);",
            "exampleCode": "fn main() {\n    let v = vec![1, 5, 9];\n    println!(\"{} {} {:?}\", v.iter().any(|x| *x > 8), v.iter().all(|x| *x > 0), v.iter().find(|x| **x > 4));\n}",
            "exampleLanguage": "rust",
            "mistake": "Using find and then unwrapping without handling the None case.",
            "bug": {
              "prompt": "What does find return when nothing matches?",
              "buggyCode": "fn main() {\n    println!(\"None\");\n}",
              "fixedCode": "fn main() {\n    println!(\"panics\");\n}",
              "explanation": "find returns Option: Some for the first match, None when nothing matches."
            },
            "exercise": {
              "title": "Find quiz",
              "type": "multiple-choice",
              "instructions": "What does find return when nothing matches?",
              "starterCode": "",
              "solution": "None",
              "solutionExplanation": "find returns an Option.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "None",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "None",
                "It panics",
                "The first item",
                "false"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-iterators-m2-l4",
            "slug": "rust-iterators-m2-l4",
            "title": "Iter, Into_iter, and Iter_mut",
            "concept": "The iter method borrows items, into_iter moves them, and iter_mut mutably borrows them, and each is the right choice for a different job. A for loop over &v uses iter, over v uses into_iter, and over &mut v uses iter_mut.",
            "syntax": "for x in v.iter() {} // borrow\nfor x in v {} // move",
            "exampleCode": "fn main() {\n    let mut v = vec![1, 2, 3];\n    for x in v.iter_mut() {\n        *x += 10;\n    }\n    println!(\"{:?}\", v);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using into_iter and then trying to use the collection afterwards, when it was moved.",
            "bug": {
              "prompt": "What does iter_mut yield?",
              "buggyCode": "fn main() {\n    println!(\"mutable references\");\n}",
              "fixedCode": "fn main() {\n    println!(\"owned values\");\n}",
              "explanation": "iter_mut yields &mut T, so you can change each element in place."
            },
            "exercise": {
              "title": "Iter mut program",
              "type": "write-code",
              "instructions": "Write a program that adds 10 to each element of vec![1, 2, 3] with iter_mut and prints `[11, 12, 13]`.",
              "starterCode": "fn main() {\n    let mut v = vec![1, 2, 3];\n    // TODO: mutate with iter_mut\n}",
              "solution": "fn main() {\n    let mut v = vec![1, 2, 3];\n    for x in v.iter_mut() {\n        *x += 10;\n    }\n    println!(\"{:?}\", v);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "[11, 12, 13]",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "[11, 12, 13]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-iterators-m2-l5",
            "slug": "rust-iterators-m2-l5",
            "title": "Custom Iterators",
            "concept": "You can implement Iterator for your own type by writing a next method that returns Option<Self::Item>. Custom iterators plug into every adapter and consumer, so a counter or a range type works with map, filter, and collect for free.",
            "syntax": "struct Counter { n: i32 }\nimpl Iterator for Counter { type Item = i32; fn next(&mut self) -> Option<i32> { self.n += 1; Some(self.n) } }",
            "exampleCode": "struct Counter {\n    n: i32,\n    max: i32,\n}\nimpl Iterator for Counter {\n    type Item = i32;\n    fn next(&mut self) -> Option<i32> {\n        if self.n >= self.max {\n            None\n        } else {\n            self.n += 1;\n            Some(self.n)\n        }\n    }\n}\nfn main() {\n    let vals: Vec<i32> = Counter { n: 0, max: 3 }.collect();\n    println!(\"{:?}\", vals);\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting to return None at the end, so the iterator never terminates.",
            "bug": {
              "prompt": "What must a custom Iterator's next return when done?",
              "buggyCode": "fn main() {\n    println!(\"None\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Some(0)\");\n}",
              "explanation": "next returns None when the iterator is exhausted."
            },
            "exercise": {
              "title": "Custom iterator program",
              "type": "write-code",
              "instructions": "Write a program with a Counter iterator that collects 1..=3 into `[1, 2, 3]`.",
              "starterCode": "struct Counter {\n    n: i32,\n    max: i32,\n}\nimpl Iterator for Counter {\n    type Item = i32;\n    fn next(&mut self) -> Option<i32> {\n        // TODO\n        None\n    }\n}\nfn main() {\n    let vals: Vec<i32> = Counter { n: 0, max: 3 }.collect();\n    println!(\"{:?}\", vals);\n}",
              "solution": "struct Counter {\n    n: i32,\n    max: i32,\n}\nimpl Iterator for Counter {\n    type Item = i32;\n    fn next(&mut self) -> Option<i32> {\n        if self.n >= self.max {\n            None\n        } else {\n            self.n += 1;\n            Some(self.n)\n        }\n    }\n}\nfn main() {\n    let vals: Vec<i32> = Counter { n: 0, max: 3 }.collect();\n    println!(\"{:?}\", vals);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "[1, 2, 3]",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "[1, 2, 3]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Data pipeline",
      "type": "write-code",
      "instructions": "Write a program that filters vec![1, 2, 3, 4, 5] to values > 2, doubles them, collects to `filtered [6, 8, 10]`, and sums to `total 24`.",
      "starterCode": "fn main() {\n    // TODO: iterator pipeline\n}",
      "solution": "fn main() {\n    let v = vec![1, 2, 3, 4, 5];\n    let doubled: Vec<i32> = v.iter().filter(|x| **x > 2).map(|x| x * 2).collect();\n    println!(\"filtered {:?}\", doubled);\n    let total: i32 = doubled.iter().sum();\n    println!(\"total {}\", total);\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "filtered [6, 8, 10]\ntotal 24",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "filtered [6, 8, 10]",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Data Pipeline",
      "description": "Build a program that processes a list of numbers through an iterator pipeline: filter, map, and summarise.",
      "requirements": [
        "Program filters numbers greater than 2",
        "Program doubles the survivors",
        "Program sums the result",
        "Program prints the filtered list and the total"
      ],
      "rubric": [
        "Filter is correct",
        "Map is correct",
        "Sum is correct",
        "Output is exact"
      ]
    }
  },
  {
    "id": "rust-box",
    "slug": "rust-box",
    "language": "rust",
    "category": "languages",
    "title": "Smart Pointers: Box",
    "description": "Use Box to store values on the heap: recursive types, trait objects, and large values.",
    "difficulty": "Intermediate",
    "estimatedHours": 13,
    "skills": [
      "Creating Box values",
      "Dereferencing Box",
      "Building recursive types",
      "Using Box with trait objects",
      "Understanding Box drop",
      "Choosing Box vs reference"
    ],
    "prerequisites": [
      "Rust"
    ],
    "analogy": "Learning {topic} is like learning to use a storage unit: big things live there, and you keep the key in your pocket.",
    "modules": [
      {
        "id": "rust-box-m1",
        "title": "Fundamentals of Smart Pointers: Box",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-box-m1-l1",
            "slug": "rust-box-m1-l1",
            "title": "What Is Box",
            "concept": "A Box<T> is a smart pointer that stores its value on the heap and owns it, with the pointer itself on the stack. Box is used when a value must live on the heap, for example because its size is not known at compile time.",
            "syntax": "let b = Box::new(5);",
            "exampleCode": "fn main() {\n    let b = Box::new(5);\n    println!(\"{}\", *b);\n}",
            "exampleLanguage": "rust",
            "mistake": "Boxing every value, when most values belong on the stack.",
            "bug": {
              "prompt": "Where does Box store its value?",
              "buggyCode": "fn main() {\n    println!(\"on the heap\");\n}",
              "fixedCode": "fn main() {\n    println!(\"on the stack\");\n}",
              "explanation": "Box allocates its value on the heap."
            },
            "exercise": {
              "title": "Box quiz",
              "type": "multiple-choice",
              "instructions": "Where does Box store its value?",
              "starterCode": "",
              "solution": "On the heap",
              "solutionExplanation": "Box::new allocates on the heap.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "On the heap",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "On the heap",
                "On the stack",
                "In a file",
                "In static memory"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-box-m1-l2",
            "slug": "rust-box-m1-l2",
            "title": "Box and Dereferencing",
            "concept": "A Box dereferences with * just like a reference, so *b reads the value it points to. Method calls on a Box auto-dereference too, so a Box<String> behaves like a String for most purposes.",
            "syntax": "let b = Box::new(String::from(\"hi\"));\nprintln!(\"{}\", b.len());",
            "exampleCode": "fn main() {\n    let b = Box::new(42);\n    println!(\"{} {}\", *b, *b + 1);\n}",
            "exampleLanguage": "rust",
            "mistake": "Forgetting to dereference a Box when you need the value itself, rather than the pointer.",
            "bug": {
              "prompt": "How do you read the value inside a Box?",
              "buggyCode": "fn main() {\n    println!(\"with *\");\n}",
              "fixedCode": "fn main() {\n    println!(\"with &\");\n}",
              "explanation": "The * operator dereferences a Box to its value."
            },
            "exercise": {
              "title": "Box deref program",
              "type": "write-code",
              "instructions": "Write a program that creates Box::new(42) and prints `42 43` for *b and b + 1.",
              "starterCode": "fn main() {\n    let b = Box::new(42);\n    // TODO: print the value and value + 1\n}",
              "solution": "fn main() {\n    let b = Box::new(42);\n    println!(\"{} {}\", *b, *b + 1);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "42 43",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "42 43",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-box-m1-l3",
            "slug": "rust-box-m1-l3",
            "title": "Recursive Types with Box",
            "concept": "A recursive type, like a linked list node that contains another node, has infinite size unless the recursion goes through a pointer. Box breaks the cycle: the node holds a Box<Node>, which is a fixed-size pointer to the next node.",
            "syntax": "enum List { Cons(i32, Box<List>), Nil }",
            "exampleCode": "enum List {\n    Cons(i32, Box<List>),\n    Nil,\n}\nfn main() {\n    let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));\n    if let List::Cons(first, _) = list {\n        println!(\"first {}\", first);\n    }\n}",
            "exampleLanguage": "rust",
            "mistake": "Defining a recursive enum without Box, which the compiler rejects as infinitely sized.",
            "bug": {
              "prompt": "Why does a recursive enum need Box?",
              "buggyCode": "fn main() {\n    println!(\"finite size\");\n}",
              "fixedCode": "fn main() {\n    println!(\"for speed\");\n}",
              "explanation": "Box gives the recursion a fixed-size pointer, so the type has a known size."
            },
            "exercise": {
              "title": "List program",
              "type": "write-code",
              "instructions": "Write a program with enum List { Cons(i32, Box<List>), Nil } that builds 1 -> 2 -> Nil and prints `first 1`.",
              "starterCode": "enum List {\n    Cons(i32, Box<List>),\n    Nil,\n}\nfn main() {\n    // TODO: build the list and print the first value\n}",
              "solution": "enum List {\n    Cons(i32, Box<List>),\n    Nil,\n}\nfn main() {\n    let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));\n    if let List::Cons(first, _) = list {\n        println!(\"first {}\", first);\n    }\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "first 1",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "first 1",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-box-m1-l4",
            "slug": "rust-box-m1-l4",
            "title": "Box for Large Values",
            "concept": "Moving a large value copies its stack data, which can be slow, so putting it in a Box means only the pointer moves. Box is the right tool when a value is big and is passed around often.",
            "syntax": "let big = Box::new([0u8; 1000]);",
            "exampleCode": "fn main() {\n    let big = Box::new([0u8; 4]);\n    println!(\"len {}\", big.len());\n}",
            "exampleLanguage": "rust",
            "mistake": "Boxing small values like integers, where the pointer costs more than the value.",
            "bug": {
              "prompt": "When is Box useful for a large value?",
              "buggyCode": "fn main() {\n    println!(\"moves stay cheap\");\n}",
              "fixedCode": "fn main() {\n    println!(\"it shrinks the value\");\n}",
              "explanation": "A Box means only a pointer is moved, however large the value is."
            },
            "exercise": {
              "title": "Large box quiz",
              "type": "multiple-choice",
              "instructions": "When is Box useful for a large value?",
              "starterCode": "",
              "solution": "When the value is moved often, so only the pointer moves",
              "solutionExplanation": "Boxing a large value makes moves cheap.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "When the value is moved often, so only the pointer moves",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "When the value is moved often, so only the pointer moves",
                "When the value must be on the stack",
                "When the value is small",
                "Never, Box is only for recursion"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-box-m1-l5",
            "slug": "rust-box-m1-l5",
            "title": "Box and Trait Objects",
            "concept": "Box<dyn Trait> is the standard way to hold a trait object that owns its data, because the Box owns the heap value and the trait object points at it. A Vec<Box<dyn Draw>> can hold different shapes, each owned by its Box.",
            "syntax": "let shapes: Vec<Box<dyn Draw>> = vec![Box::new(Circle)];",
            "exampleCode": "trait Draw {\n    fn draw(&self) -> String;\n}\nstruct Circle;\nimpl Draw for Circle {\n    fn draw(&self) -> String {\n        String::from(\"circle\")\n    }\n}\nfn main() {\n    let shapes: Vec<Box<dyn Draw>> = vec![Box::new(Circle)];\n    println!(\"{}\", shapes[0].draw());\n}",
            "exampleLanguage": "rust",
            "mistake": "Storing a trait object by value, which is impossible because trait objects are unsized.",
            "bug": {
              "prompt": "How do you store different types that implement Draw in one Vec?",
              "buggyCode": "fn main() {\n    println!(\"Vec<Box<dyn Draw>>\");\n}",
              "fixedCode": "fn main() {\n    println!(\"Vec<Draw>\");\n}",
              "explanation": "Box<dyn Draw> gives each element a known size: a pointer."
            },
            "exercise": {
              "title": "Box trait object program",
              "type": "write-code",
              "instructions": "Write a program with a Vec<Box<dyn Draw>> holding a Circle that prints `circle`.",
              "starterCode": "trait Draw {\n    fn draw(&self) -> String;\n}\nstruct Circle;\nimpl Draw for Circle {\n    fn draw(&self) -> String {\n        String::from(\"circle\")\n    }\n}\nfn main() {\n    // TODO: Vec of boxed trait objects\n}",
              "solution": "trait Draw {\n    fn draw(&self) -> String;\n}\nstruct Circle;\nimpl Draw for Circle {\n    fn draw(&self) -> String {\n        String::from(\"circle\")\n    }\n}\nfn main() {\n    let shapes: Vec<Box<dyn Draw>> = vec![Box::new(Circle)];\n    println!(\"{}\", shapes[0].draw());\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "circle",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "circle",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      },
      {
        "id": "rust-box-m2",
        "title": "Applying Smart Pointers: Box",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rust-box-m2-l1",
            "slug": "rust-box-m2-l1",
            "title": "Box Drop Behaviour",
            "concept": "When a Box goes out of scope, it drops the value it points to and frees the heap memory, just like any other owner. This is why Box is a smart pointer: it adds heap allocation to ordinary ownership, with no extra work for the programmer.",
            "syntax": "fn main() { let b = Box::new(5); } // b dropped here",
            "exampleCode": "fn main() {\n    {\n        let b = Box::new(7);\n        println!(\"boxed {}\", *b);\n    }\n    println!(\"box dropped\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Expecting a Box to keep its value alive after the Box is dropped.",
            "bug": {
              "prompt": "What happens when a Box goes out of scope?",
              "buggyCode": "fn main() {\n    println!(\"value dropped\");\n}",
              "fixedCode": "fn main() {\n    println!(\"value leaks\");\n}",
              "explanation": "The Box drops its heap value and frees the memory."
            },
            "exercise": {
              "title": "Box drop program",
              "type": "write-code",
              "instructions": "Write a program that creates Box::new(7) in a block, prints `boxed 7`, then prints `box dropped` after the block.",
              "starterCode": "fn main() {\n    // TODO: boxed value in a block\n}",
              "solution": "fn main() {\n    {\n        let b = Box::new(7);\n        println!(\"boxed {}\", *b);\n    }\n    println!(\"box dropped\");\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "boxed 7\nbox dropped",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "boxed 7",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-box-m2-l2",
            "slug": "rust-box-m2-l2",
            "title": "Box vs Reference",
            "concept": "A Box owns its value, while a reference borrows a value owned by someone else, and that difference decides which one to use. Reach for a reference when you only need to look, and for a Box when you need to own heap data of unknown size.",
            "syntax": "let b: Box<i32> = Box::new(5); // owns\nlet r: &i32 = &5; // borrows",
            "exampleCode": "fn main() {\n    let b = Box::new(5);\n    let r = &*b;\n    println!(\"{} {}\", *b, r);\n}",
            "exampleLanguage": "rust",
            "mistake": "Using a Box where a reference would do, and paying for a heap allocation for no reason.",
            "bug": {
              "prompt": "What is the difference between Box<T> and &T?",
              "buggyCode": "fn main() {\n    println!(\"owns vs borrows\");\n}",
              "fixedCode": "fn main() {\n    println!(\"same thing\");\n}",
              "explanation": "Box owns its heap value; a reference borrows a value owned elsewhere."
            },
            "exercise": {
              "title": "Box vs ref program",
              "type": "write-code",
              "instructions": "Write a program that creates Box::new(5), borrows it as r, and prints `5 5`.",
              "starterCode": "fn main() {\n    let b = Box::new(5);\n    // TODO: borrow the boxed value\n}",
              "solution": "fn main() {\n    let b = Box::new(5);\n    let r = &*b;\n    println!(\"{} {}\", *b, r);\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "5 5",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "5 5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-box-m2-l3",
            "slug": "rust-box-m2-l3",
            "title": "Box in Function Arguments",
            "concept": "A function that takes Box<T> takes ownership of heap data, which is useful when the caller wants to hand over a large or recursive value. Most functions should take &T or T instead, and only take Box when the heap allocation matters.",
            "syntax": "fn process(b: Box<i32>) { println!(\"{}\", *b); }",
            "exampleCode": "fn process(b: Box<i32>) {\n    println!(\"got {}\", *b);\n}\nfn main() {\n    process(Box::new(9));\n}",
            "exampleLanguage": "rust",
            "mistake": "Taking Box<T> in a function that only reads the value, when &T would do.",
            "bug": {
              "prompt": "When should a function take Box<T>?",
              "buggyCode": "fn main() {\n    println!(\"to own heap data\");\n}",
              "fixedCode": "fn main() {\n    println!(\"to read a value\");\n}",
              "explanation": "Take Box when the function needs to own heap-allocated data."
            },
            "exercise": {
              "title": "Box argument program",
              "type": "write-code",
              "instructions": "Write a program with process(b: Box<i32>) that prints `got 9` for Box::new(9).",
              "starterCode": "fn process(b: Box<i32>) {\n    // TODO\n}\nfn main() {\n    process(Box::new(9));\n}",
              "solution": "fn process(b: Box<i32>) {\n    println!(\"got {}\", *b);\n}\nfn main() {\n    process(Box::new(9));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "got 9",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "got 9",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          },
          {
            "id": "rust-box-m2-l4",
            "slug": "rust-box-m2-l4",
            "title": "Box and Smart Pointers",
            "concept": "Box is the simplest smart pointer: it adds heap allocation and automatic cleanup to a plain pointer, with no reference counting. Other smart pointers, Rc and Arc, add shared ownership, and RefCell adds runtime borrow checking.",
            "syntax": "use std::rc::Rc;\nlet shared = Rc::new(5);",
            "exampleCode": "fn main() {\n    let b = Box::new(5);\n    println!(\"box {}\", *b);\n    println!(\"smart: owns heap data\");\n}",
            "exampleLanguage": "rust",
            "mistake": "Reaching for Rc when a single owner with Box would do.",
            "bug": {
              "prompt": "What makes Box a smart pointer?",
              "buggyCode": "fn main() {\n    println!(\"owns and frees heap\");\n}",
              "fixedCode": "fn main() {\n    println!(\"counts references\");\n}",
              "explanation": "Box owns heap data and frees it automatically when dropped."
            },
            "exercise": {
              "title": "Smart pointer quiz",
              "type": "multiple-choice",
              "instructions": "What makes Box a smart pointer?",
              "starterCode": "",
              "solution": "It owns heap data and frees it automatically on drop",
              "solutionExplanation": "Box adds ownership and automatic cleanup to a heap pointer.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It owns heap data and frees it automatically on drop",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Re-read the lesson concept and eliminate the options that contradict it.",
                "approach": "Compare each option with what the concept says, one at a time.",
                "structure": "The correct option is the one that matches the definition and behaviour from the lesson."
              },
              "options": [
                "It owns heap data and frees it automatically on drop",
                "It counts references",
                "It checks borrows at runtime",
                "It shares data between threads"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "rust-box-m2-l5",
            "slug": "rust-box-m2-l5",
            "title": "Box in Practice",
            "concept": "In practice, Box appears in three places: recursive types, trait objects, and large values that move often. If none of those applies, a plain value or a reference is simpler, and simpler is better.",
            "syntax": "enum Expr { Num(i32), Add(Box<Expr>, Box<Expr>) }",
            "exampleCode": "enum Expr {\n    Num(i32),\n    Add(Box<Expr>, Box<Expr>),\n}\nfn eval(e: &Expr) -> i32 {\n    match e {\n        Expr::Num(n) => *n,\n        Expr::Add(a, b) => eval(a) + eval(b),\n    }\n}\nfn main() {\n    let e = Expr::Add(Box::new(Expr::Num(2)), Box::new(Expr::Num(3)));\n    println!(\"eval {}\", eval(&e));\n}",
            "exampleLanguage": "rust",
            "mistake": "Boxing values that are small and never recursive, adding heap allocations for no benefit.",
            "bug": {
              "prompt": "Which of these needs Box?",
              "buggyCode": "fn main() {\n    println!(\"recursive enum\");\n}",
              "fixedCode": "fn main() {\n    println!(\"small integer\");\n}",
              "explanation": "Recursive types need Box to give the recursion a fixed size."
            },
            "exercise": {
              "title": "Expr program",
              "type": "write-code",
              "instructions": "Write a program with enum Expr { Num(i32), Add(Box<Expr>, Box<Expr>) } and eval() that prints `eval 5` for 2 + 3.",
              "starterCode": "enum Expr {\n    Num(i32),\n    Add(Box<Expr>, Box<Expr>),\n}\nfn eval(e: &Expr) -> i32 {\n    // TODO: evaluate the expression\n    0\n}\nfn main() {\n    let e = Expr::Add(Box::new(Expr::Num(2)), Box::new(Expr::Num(3)));\n    println!(\"eval {}\", eval(&e));\n}",
              "solution": "enum Expr {\n    Num(i32),\n    Add(Box<Expr>, Box<Expr>),\n}\nfn eval(e: &Expr) -> i32 {\n    match e {\n        Expr::Num(n) => *n,\n        Expr::Add(a, b) => eval(a) + eval(b),\n    }\n}\nfn main() {\n    let e = Expr::Add(Box::new(Expr::Num(2)), Box::new(Expr::Num(3)));\n    println!(\"eval {}\", eval(&e));\n}",
              "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
              "tests": [
                {
                  "name": "Prints the expected output",
                  "expectedStdout": "eval 5",
                  "hidden": false
                },
                {
                  "name": "Output contains the key result",
                  "expectedContains": "eval 5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
                "approach": "Work out the expected value on paper first, then write the code that produces it.",
                "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Expression tree",
      "type": "write-code",
      "instructions": "Write a program with enum Expr { Num(i32), Add(Box<Expr>, Box<Expr>) } and eval() that prints `eval 5` for 2 + 3 and `eval 10` for (2 + 3) + 5.",
      "starterCode": "enum Expr {\n    Num(i32),\n    Add(Box<Expr>, Box<Expr>),\n}\nfn eval(e: &Expr) -> i32 {\n    // TODO\n    0\n}\nfn main() {\n    // TODO: build and evaluate both expressions\n}",
      "solution": "enum Expr {\n    Num(i32),\n    Add(Box<Expr>, Box<Expr>),\n}\nfn eval(e: &Expr) -> i32 {\n    match e {\n        Expr::Num(n) => *n,\n        Expr::Add(a, b) => eval(a) + eval(b),\n    }\n}\nfn main() {\n    let e1 = Expr::Add(Box::new(Expr::Num(2)), Box::new(Expr::Num(3)));\n    println!(\"eval {}\", eval(&e1));\n    let e2 = Expr::Add(Box::new(e1), Box::new(Expr::Num(5)));\n    println!(\"eval {}\", eval(&e2));\n}",
      "solutionExplanation": "The solution builds the required value step by step and prints it, so the output matches the expected text exactly.",
      "tests": [
        {
          "name": "Prints the expected output",
          "expectedStdout": "eval 5\neval 10",
          "hidden": false
        },
        {
          "name": "Output contains the key result",
          "expectedContains": "eval 5",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of this lesson and what each construct does before writing code.",
        "approach": "Work out the expected value on paper first, then write the code that produces it.",
        "structure": "Start from fn main, declare the values you need, compute the result, and print it with println!."
      }
    },
    "capstone": {
      "title": "Expression Tree",
      "description": "Build a program that evaluates an arithmetic expression tree built with Box.",
      "requirements": [
        "Program defines Expr with Num and Add variants using Box",
        "Program defines an eval function",
        "Program evaluates 2 + 3 to 5",
        "Program evaluates a nested expression to 10"
      ],
      "rubric": [
        "Recursive enum uses Box",
        "eval works for Num",
        "eval works for Add",
        "Nested evaluation is correct"
      ]
    }
  }
]);
export const TRACKS_700 = courses;
export const SHORT_ASSESSMENTS_700 = assessments;
